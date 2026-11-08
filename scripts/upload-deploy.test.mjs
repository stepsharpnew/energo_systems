import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const script = join(dirname(fileURLToPath(import.meta.url)), 'upload-deploy.sh')
const secret = 'PRIVATE-KEY-SECRET-MUST-NEVER-APPEAR'
const mock = `#!/usr/bin/env node
const fs=require('node:fs'), cp=require('node:child_process'), path=require('node:path');
const args=process.argv.slice(2), name=path.basename(process.argv[1]), root=process.env.UPLOAD_TEST_ROOT;
fs.appendFileSync(root+'/commands.jsonl',JSON.stringify({name,args})+'\\n');
if(name==='timeout'){let i=0;while(args[i].startsWith('--'))i++;i++;process.exit(cp.spawnSync(args[i],args.slice(i+1),{stdio:'inherit'}).status??1)}
if(name==='ssh-keyscan'){console.log('server.example ssh-ed25519 TEST-HOST-KEY');process.exit(0)}
if(name==='gzip'){
 if(process.env.UPLOAD_TEST_SCENARIO==='gzip_failure'&&args.includes('-1')){fs.readFileSync(0);process.stdout.write('not a gzip archive');process.exit(0)}
 process.exit(cp.spawnSync('/usr/bin/gzip',args,{stdio:'inherit'}).status??1)
}
for(const key of ['BatchMode=yes','IdentitiesOnly=yes','StrictHostKeyChecking=yes','ConnectTimeout=15','ServerAliveInterval=15','ServerAliveCountMax=3'])if(!args.includes(key))throw Error('Missing SSH option '+key);
const key=args[args.indexOf('-i')+1], hosts=args.find(a=>a.startsWith('UserKnownHostsFile=')).split('=')[1];
for(const file of [key,hosts])if((fs.statSync(file).mode&511)!==384)throw Error('Credential file must be mode 600');
if(process.env.SERVER_SSH_KEY)throw Error('Private key must be removed from child environment');
if(name==='scp'){
 if(!args.includes('-O'))throw Error('Classic OpenSSH SCP is required');
 const source=args.at(-2), destination=args.at(-1).split(':').slice(1).join(':').replace('/home/deploy/app',root+'/remote/app');
 if((fs.statSync(destination).mode&511)!==384)throw Error('Remote archive must be reserved mode 600');
 fs.copyFileSync(source,destination);
 if(process.env.UPLOAD_TEST_SCENARIO==='upload_failure'){process.exit(1)}
 if(process.env.UPLOAD_TEST_SCENARIO==='verify_failure')fs.appendFileSync(destination,'corrupt transfer');
 process.exit(0)
}
if(name==='ssh'){
 // Production is GNU/Linux; BSD chmod on the local macOS test runner does
 // not accept GNU's optional -- after the numeric mode.
 const command=args.at(-1).replaceAll('/home/deploy/app',root+'/remote/app').replaceAll('chmod 600 --','chmod 600');
 process.exit(cp.spawnSync('bash',['-c',command],{stdio:'inherit'}).status??1)
}
throw Error('Unexpected command '+name);
`

function run(scenario = 'success', overrides = {}) {
  const root = mkdtempSync(join(tmpdir(), 'energo-upload-test-'))
  try {
    for (const folder of ['bin', 'bundle', 'remote/app/tg_bot/data', 'temporary']) mkdirSync(join(root, folder), { recursive: true })
    for (const name of ['ssh', 'scp', 'ssh-keyscan', 'timeout', 'gzip']) {
      writeFileSync(join(root, 'bin', name), mock)
      chmodSync(join(root, 'bin', name), 0o755)
    }
    writeFileSync(join(root, 'bundle/.env'), 'TOKEN=private-bundle-secret\n', { mode: 0o600 })
    writeFileSync(join(root, 'bundle/current.txt'), 'new application source\n')
    writeFileSync(join(root, 'remote/app/tg_bot/data/existing.json'), 'preserved server data\n')
    const result = spawnSync('bash', [script, 'bundle'], {
      cwd: root, encoding: 'utf8', timeout: 10000,
      env: { ...process.env, PATH: join(root, 'bin') + ':' + process.env.PATH,
        TMPDIR: join(root, 'temporary'), SERVER_HOST: 'server.example', SERVER_USER: 'deploy', SERVER_SSH_KEY: secret,
        GITHUB_RUN_ID: '1234567', GITHUB_RUN_ATTEMPT: '2', UPLOAD_TEST_ROOT: root, UPLOAD_TEST_SCENARIO: scenario, ...overrides },
    })
    assert.ifError(result.error)
    const log = existsSync(join(root, 'commands.jsonl')) ? readFileSync(join(root, 'commands.jsonl'), 'utf8').trim().split('\n').map(JSON.parse) : []
    const serialized = JSON.stringify(log), output = result.stdout + result.stderr
    assert.doesNotMatch(serialized + output, new RegExp(secret + '|private-bundle-secret'))
    assert.doesNotMatch(serialized, /docker|compose|systemctl|sudo|rm -rf/)
    assert.equal(readFileSync(join(root, 'remote/app/tg_bot/data/existing.json'), 'utf8'), 'preserved server data\n')
    const archives = log.filter(row => row.name === 'scp').map(row => row.args.at(-1).split(':').slice(1).join(':').replace('/home/deploy/app', root + '/remote/app'))
    for (const archive of archives) assert.equal(existsSync(archive), false, 'only this upload archive must be cleaned on success or failure')
    const credentials = log.filter(row => row.name === 'ssh' || row.name === 'scp').map(row => row.args[row.args.indexOf('-i') + 1])
    for (const key of credentials) assert.equal(existsSync(key), false, 'temporary private key must be removed')
    return { status: result.status, log, output, extracted: existsSync(join(root, 'remote/app/current.txt')),
      env: existsSync(join(root, 'remote/app/.env')) ? readFileSync(join(root, 'remote/app/.env'), 'utf8') : null }
  } finally { rmSync(root, { recursive: true, force: true }) }
}

test('native SCP uploads a private archive, verifies SHA256 and gzip before extraction, and preserves server data', () => {
  const result = run()
  assert.equal(result.status, 0, result.output)
  assert.equal(result.extracted, true)
  assert.equal(result.env, 'TOKEN=private-bundle-secret\n')
  const upload = result.log.findIndex(row => row.name === 'scp')
  const verify = result.log.findIndex(row => row.name === 'ssh' && row.args.at(-1).includes('sha256sum -c'))
  assert.ok(upload > 0 && verify > upload)
  const command = result.log[verify].args.at(-1)
  assert.ok(command.indexOf('sha256sum -c') < command.indexOf('gzip -t'))
  assert.ok(command.indexOf('gzip -t') < command.indexOf('tar -tzf'))
  assert.ok(command.indexOf('tar -tzf') < command.indexOf('tar -xzf'))
  assert.match(result.output, /Deployment archive: \d+ bytes/)
  assert.match(result.output, /uploaded and verified successfully/)
})

for (const scenario of ['upload_failure', 'verify_failure', 'gzip_failure']) test(`${scenario} never extracts and cleans only its temporary archive and key`, () => {
  const result = run(scenario)
  assert.notEqual(result.status, 0)
  assert.equal(result.extracted, false)
  assert.equal(result.env, null)
  assert.equal(result.log.some(row => row.name === 'scp'), true, 'the failure fixture must reach the upload stage')
  if (scenario === 'upload_failure') assert.equal(result.log.some(row => row.name === 'ssh' && row.args.at(-1).includes('tar -xzf')), false)
  assert.doesNotMatch(result.output, /uploaded and verified successfully/)
})

for (const overrides of [{ SERVER_HOST: 'host;touch injected' }, { SERVER_USER: 'deploy;id' }, { GITHUB_RUN_ID: '1/../../data' }, { GITHUB_RUN_ATTEMPT: '1;id' }]) {
  test(`unsafe transport input is rejected: ${Object.keys(overrides)[0]}`, () => {
    const result = run('success', overrides)
    assert.notEqual(result.status, 0)
    assert.deepEqual(result.log, [])
  })
}

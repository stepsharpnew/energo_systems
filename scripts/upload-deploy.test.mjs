import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, utimesSync, writeFileSync } from 'node:fs'
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
if(name==='rsync'){
 for(const required of ['--no-owner','--no-group','--checksum','--delay-updates','--timeout=60','--info=progress2','--stats'])if(!args.includes(required))throw Error('Missing rsync option '+required);
 if(args.some(a=>a.startsWith('--delete')||a==='--inplace'||a==='--whole-file'))throw Error('Unsafe rsync flag');
 const partial=args.find(a=>a.startsWith('--partial-dir=')).split('=')[1];
 if(partial!=='.deploy-partial-1234567-2')throw Error('Partial directory must be relative and unique to this run');
 const transport=args[args.indexOf('-e')+1];
 for(const required of ['BatchMode=yes','IdentitiesOnly=yes','StrictHostKeyChecking=yes','ServerAliveInterval=15'])if(!transport.includes(required))throw Error('Unsafe SSH transport');
 const key=transport.match(/-i ([^ ]+)/)[1];if((fs.statSync(key).mode&511)!==384)throw Error('Key permissions');
 const source=args.at(-2), destination=args.at(-1).split(':').slice(1).join(':').replace('/home/deploy/app',root+'/remote/app');
 for(const directory of ['front','tg_bot']){const temp=path.join(destination,directory,partial);fs.mkdirSync(temp,{recursive:true,mode:448});fs.writeFileSync(path.join(temp,'index.html'),'partial '+directory,{mode:384})}
 if(process.env.UPLOAD_TEST_SCENARIO==='rsync_failure')process.exit(30);
 // Use the real local rsync engine for checksum/delay-updates/directory
 // semantics; only SSH and progress flags differ on macOS openrsync.
 const realPath=process.env.PATH.split(path.delimiter).filter(directory=>directory!==root+'/bin').join(path.delimiter);
 const result=cp.spawnSync('/usr/bin/rsync',['-a','--checksum','--delay-updates','--partial-dir='+partial,source,destination],{stdio:'inherit',env:{...process.env,PATH:realPath}});
 process.exit(result.status??1)
}
for(const key of ['BatchMode=yes','IdentitiesOnly=yes','StrictHostKeyChecking=yes','ConnectTimeout=15','ServerAliveInterval=15','ServerAliveCountMax=3'])if(!args.includes(key))throw Error('Missing SSH option '+key);
const key=args[args.indexOf('-i')+1], hosts=args.find(a=>a.startsWith('UserKnownHostsFile=')).split('=')[1];
for(const file of [key,hosts])if((fs.statSync(file).mode&511)!==384)throw Error('Credential file must be mode 600');
if(process.env.SERVER_SSH_KEY)throw Error('Private key must be removed from child environment');
if(name==='ssh'&&args.at(-1).includes('command -v rsync')){
 if(process.env.UPLOAD_TEST_SCENARIO==='probe_failure')process.exit(255);
 process.exit(process.env.UPLOAD_TEST_SCENARIO.startsWith('rsync_')?0:42)
}
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
    for (const folder of ['bin', 'bundle/front', 'bundle/tg_bot', 'remote/app/front', 'remote/app/tg_bot/data', 'remote/app/.deploy-partial-other-run', 'temporary']) mkdirSync(join(root, folder), { recursive: true })
    for (const name of ['ssh', 'scp', 'ssh-keyscan', 'timeout', 'gzip', 'rsync']) {
      writeFileSync(join(root, 'bin', name), mock)
      chmodSync(join(root, 'bin', name), 0o755)
    }
    writeFileSync(join(root, 'bundle/.env'), 'TOKEN=private-bundle-secret\n', { mode: 0o600 })
    writeFileSync(join(root, 'bundle/current.txt'), 'new application source\n')
    writeFileSync(join(root, 'bundle/fresh-only.txt'), 'new file\n')
    for (const name of ['front', 'tg_bot']) {
      const source = join(root, 'bundle', name, 'index.html'), destination = join(root, 'remote/app', name, 'index.html')
      writeFileSync(source, 'new ' + name + '\n')
      writeFileSync(destination, 'old ' + name + '\n')
      utimesSync(source, 1000000000, 1000000000)
      utimesSync(destination, 1000000000, 1000000000)
    }
    writeFileSync(join(root, 'remote/app/.deploy-partial-other-run/keep.txt'), 'another run must survive\n')
    const collision = join(root, 'remote/app/front/.deploy-partial-1234567-2')
    if (scenario === 'rsync_collision') writeFileSync(collision, 'existing server file must survive\n')
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
    assert.doesNotMatch(serialized, /docker|compose|systemctl|sudo/)
    for (const entry of log.filter(row => row.name === 'ssh' && row.args.at(-1).includes('rm -rf'))) {
      assert.match(entry.args.at(-1), /find '\/home\/deploy\/app' -type d -name '\.deploy-partial-1234567-2' -prune -exec rm -rf -- \{\} \+/)
    }
    assert.equal(readFileSync(join(root, 'remote/app/tg_bot/data/existing.json'), 'utf8'), 'preserved server data\n')
    assert.equal(readFileSync(join(root, 'remote/app/.deploy-partial-other-run/keep.txt'), 'utf8'), 'another run must survive\n')
    for (const directory of ['front', 'tg_bot']) assert.equal(existsSync(join(root, 'remote/app', directory, '.deploy-partial-1234567-2')), scenario === 'rsync_collision' && directory === 'front')
    assert.deepEqual(readdirSync(join(root, 'temporary')), [], 'temporary credentials must be cleaned even after capability failures')
    const archives = log.filter(row => row.name === 'scp').map(row => row.args.at(-1).split(':').slice(1).join(':').replace('/home/deploy/app', root + '/remote/app'))
    for (const archive of archives) assert.equal(existsSync(archive), false, 'only this upload archive must be cleaned on success or failure')
    const credentials = log.filter(row => row.name === 'ssh' || row.name === 'scp').map(row => row.args[row.args.indexOf('-i') + 1])
    for (const key of credentials) assert.equal(existsSync(key), false, 'temporary private key must be removed')
    return { status: result.status, log, output, extracted: existsSync(join(root, 'remote/app/fresh-only.txt')),
      indexes: Object.fromEntries(['front', 'tg_bot'].map(name => [name, readFileSync(join(root, 'remote/app', name, 'index.html'), 'utf8')])),
      envMode: existsSync(join(root, 'remote/app/.env')) ? statSync(join(root, 'remote/app/.env')).mode & 0o777 : null,
      collision: existsSync(collision) ? readFileSync(collision, 'utf8') : null,
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
  assert.ok(result.log.some(row => row.name === 'timeout' && row.args.includes('scp') && row.args.includes('120s')), 'fallback SCP must fail within two minutes')
  const command = result.log[verify].args.at(-1)
  assert.ok(command.indexOf('sha256sum -c') < command.indexOf('gzip -t'))
  assert.ok(command.indexOf('gzip -t') < command.indexOf('tar -tzf'))
  assert.ok(command.indexOf('tar -tzf') < command.indexOf('tar -xzf'))
  assert.match(result.output, /Deployment archive: \d+ bytes/)
  assert.match(result.output, /uploaded and verified successfully/)
})

test('incremental rsync updates equal-size/equal-mtime files by checksum, preserves repeated basenames and private .env', () => {
  const result = run('rsync_success')
  assert.equal(result.status, 0, result.output)
  assert.equal(result.extracted, true)
  assert.deepEqual(result.indexes, { front: 'new front\n', tg_bot: 'new tg_bot\n' })
  assert.equal(result.env, 'TOKEN=private-bundle-secret\n')
  assert.equal(result.envMode, 0o600)
  assert.equal(result.log.some(row => row.name === 'scp' || row.name === 'gzip'), false, 'rsync must avoid creating/uploading the full archive')
  assert.match(result.output, /synchronized successfully/)
})

test('failed incremental upload keeps old source files and cleans only this run partial directories', () => {
  const result = run('rsync_failure')
  assert.equal(result.status, 30, result.output)
  assert.equal(result.extracted, false)
  assert.deepEqual(result.indexes, { front: 'old front\n', tg_bot: 'old tg_bot\n' })
  assert.equal(result.log.some(row => row.name === 'scp'), false)
  assert.doesNotMatch(result.output, /synchronized successfully/)
})

test('SSH capability failure fails immediately instead of retrying with the full archive', () => {
  const result = run('probe_failure')
  assert.equal(result.status, 255, result.output)
  assert.equal(result.log.some(row => row.name === 'rsync' || row.name === 'scp' || row.name === 'gzip'), false)
  assert.match(result.output, /not retrying with SCP/)
})

test('an existing file with this run partial name is rejected without deletion or transfer', () => {
  const result = run('rsync_collision')
  assert.notEqual(result.status, 0)
  assert.equal(result.collision, 'existing server file must survive\n')
  assert.equal(result.log.some(row => row.name === 'rsync' || row.name === 'scp'), false)
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

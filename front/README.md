# energy-systems-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Form regression checks

```bash
npm test
npm run generate
npx playwright install chromium
npm run test:forms
```

To use an existing Chromium installation, set
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/path/to/chromium` for `test:forms`.
The browser tests use a local copy of the site and the real lead API validation,
with SMTP replaced by a test transport. No real emails are sent. They check
failed submissions, retries, confirmation messages and the destination mailbox.

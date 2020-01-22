// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  mailUrl: 'http://192.168.235.96:3000/sendmail',
  usersUrl: 'http://192.168.235.96:3000/api/users',
  createUsersUrl: 'http://GRF-MISDEV:8889/auth/create',
  computersUrl: 'http://192.168.235.96:3000/api/computers',
  phonesUrl: 'http://192.168.235.96:3000/api/phones',
  formsUrl: 'http://192.168.235.96:3000/api/form',
  reportUrl: 'http://192.168.235.96:3000/api/reports',
  authUrl: 'http://GRF-MISDEV:8888/',
  validationUrl: 'http://GRF-MISDEV:8889/validate'

};

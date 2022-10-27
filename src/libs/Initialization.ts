import path from 'path'

export default {
  locales: ['en', 'pt-BR'],
  directory: path.join(__dirname, '../locales'),
  defaultLocale: 'pt-BR',
  header: 'accept-language',
  queryParameter: 'lang',
  autoReload: true,
  // api: {
  //   __: 't',
  //   __n: 'tn',
  // }
}

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'localeString',
  title: 'Texto (ES/EN)',
  type: 'object',
  fields: [
    defineField({ name: 'es', title: 'Español', type: 'string' }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
  ]
})

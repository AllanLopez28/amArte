import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'localeText',
  title: 'Texto largo (ES/EN)',
  type: 'object',
  fields: [
    defineField({ name: 'es', title: 'Español', type: 'text' }),
    defineField({ name: 'en', title: 'Inglés',  type: 'text' }),
  ],
})

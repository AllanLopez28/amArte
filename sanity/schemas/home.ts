import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero · Título', type: 'localeString' }),
    defineField({ name: 'heroSubtitle', title: 'Hero · Subtítulo', type: 'localeString' }),
    defineField({ name: 'heroCta', title: 'Hero · CTA', type: 'localeString' }),
    defineField({
      name: 'impact',
      title: 'Impacto (cards)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Etiqueta', type: 'localeString' }),
          defineField({ name: 'value', title: 'Valor', type: 'number' }),
        ]
      }],
    }),
  ]
})

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    defineField({ name: 'brand', title: 'Nombre de marca', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroTitle', title: 'Hero: Título', type: 'localeString' }),
    defineField({ name: 'heroSubtitle', title: 'Hero: Subtítulo', type: 'localeText' }),
    defineField({ name: 'heroCta', title: 'Hero: CTA', type: 'localeString' }),
    defineField({
      name: 'impact',
      title: 'Impacto (números)',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'label', title: 'Etiqueta', type: 'localeString' },
        { name: 'value', title: 'Valor', type: 'number' },
      ]}],
    }),
    defineField({
      name: 'featuredTestimonial',
      title: 'Testimonio destacado (referencia)',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
  ],
})

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonios',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string' }),
    defineField({ name: 'role', title: 'Rol / Descripción corta', type: 'string' }),
    defineField({ name: 'quote', title: 'Testimonio', type: 'localeText' }),
    defineField({ name: 'photo', title: 'Foto', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Orden', type: 'number' }),
    defineField({ name: 'featured', title: 'Destacado en Home', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' }
  }
})

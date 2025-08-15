import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'program',
  title: 'Programas',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'localeString' }),
    defineField({ name: 'description', title: 'Descripción', type: 'localeText' }),
    defineField({ name: 'department', title: 'Departamento', type: 'string' }),
    defineField({ name: 'location', title: 'Lugar / Escuela', type: 'string' }),
    defineField({
      name: 'gallery', title: 'Galería',
      type: 'array', of: [{ type: 'image', options: {hotspot: true} }]
    }),
    defineField({
      name: 'stats', title: 'Estadísticas',
      type: 'object', fields: [
        { name: 'participants', title: 'Participantes', type: 'number' },
        { name: 'kits', title: 'Kits entregados', type: 'number' },
        { name: 'duration', title: 'Duración (texto)', type: 'string' },
      ]
    }),
    defineField({ name: 'order', title: 'Orden', type: 'number' }),
  ],
  preview: {
    select: { title: 'title.es', subtitle: 'location', media: 'gallery.0' }
  }
})

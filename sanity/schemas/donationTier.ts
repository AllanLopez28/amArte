import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'donationTier',
  title: 'Montos sugeridos (Donar)',
  type: 'document',
  fields: [
    defineField({ name: 'amount', title: 'Monto (USD)', type: 'number', validation: (Rule) => Rule.min(1) }),
    defineField({
      name: 'period',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Única', value: 'once' },
          { title: 'Mensual', value: 'monthly' },
        ],
        layout: 'radio'
      },
      initialValue: 'once'
    }),
    defineField({ name: 'label', title: 'Etiqueta', type: 'localeString' }), // ej: "Útiles", "Mensualidad completa"
    defineField({ name: 'description', title: 'Descripción', type: 'localeText' }),
    defineField({ name: 'order', title: 'Orden', type: 'number' }),
  ],
  preview: {
    select: {
      title: 'label.es',
      subtitle: 'period',
    },
    prepare(sel) {
      const p = sel.subtitle === 'monthly' ? 'Mensual' : 'Única'
      return { title: sel.title || 'Monto sugerido', subtitle: p }
    }
  }
})

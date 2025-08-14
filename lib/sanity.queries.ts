import {groq} from 'next-sanity'

// Home (i18n)
export const homeQuery = groq`*[_type == "home"][0]{
  "heroTitle": coalesce(heroTitle[$lang], heroTitle.es),
  "heroSubtitle": coalesce(heroSubtitle[$lang], heroSubtitle.es),
  "heroCta": coalesce(heroCta[$lang], heroCta.es),
  impact[]{
    "label": coalesce(label[$lang], label.es),
    value
  }
}`

// Testimonios (opcional)
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc, _createdAt desc){
  name, role,
  "quote": coalesce(quote[$lang], quote.es)
}`

// ✅ Tiers de donación (lo que faltaba)
export const tiersQuery = groq`*[_type == "donationTier"] | order(order asc, amount asc){
  amount, period,
  "label": coalesce(label[$lang], label.es),
  "desc": coalesce(description[$lang], description.es)
}`

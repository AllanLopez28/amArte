import {groq} from 'next-sanity'

// Home + testimonio destacado
export const homeQuery = groq`*[_type == "siteSettings"][0]{
  "heroTitle": coalesce(heroTitle[$lang], heroTitle.es),
  "heroSubtitle": coalesce(heroSubtitle[$lang], heroSubtitle.es),
  "heroCta": coalesce(heroCta[$lang], heroCta.es),
  impact[]{
    "label": coalesce(label[$lang], label.es),
    value
  },
  featuredTestimonial->{
    name, role,
    "quote": coalesce(quote[$lang], quote.es),
    "photoUrl": photo.asset->url
  }
}`

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc, _createdAt desc){
  name, role,
  "quote": coalesce(quote[$lang], quote.es),
  "photoUrl": photo.asset->url
}`

export const programsQuery = groq`*[_type == "program"] | order(order asc, _createdAt desc){
  "title": coalesce(title[$lang], title.es),
  "description": coalesce(description[$lang], description.es),
  department, location,
  stats,
  gallery[]{"url": asset->url}
}`

// ✅ Tiers de donación (para /donar)
export const tiersQuery = groq`*[_type == "donationTier"] | order(order asc, amount asc){
  amount,
  period, // 'once' | 'monthly'
  "label": coalesce(label[$lang], label.es),
  "desc": coalesce(description[$lang], description.es)
}`

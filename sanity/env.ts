// sanity/env.ts
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.SANITY_API_VERSION || '2024-08-01'

// Guardas útiles para detectar errores rápido
if (!projectId || !/^[a-z0-9-]+$/.test(projectId)) {
  throw new Error('Sanity: NEXT_PUBLIC_SANITY_PROJECT_ID inválido. Debe ser a-z, 0-9 o guiones.')
}

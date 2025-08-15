// lib/sanity.client.ts
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // CDN para lecturas rápidas
})

'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/deskStructure'

// agrega esta línea 👇
const apiVersion = '2023-10-01' // o '2024-05-01', cualquier fecha válida de versión

export default defineConfig({
  basePath: '/studio',
  projectId: '<w6hsf9vx>', 
  dataset: 'production',
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})

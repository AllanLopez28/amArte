import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'
import { projectId, dataset } from './env'

export default defineConfig({
  name: 'default',
  title: 'EducaSV',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [deskTool()],
  schema: { types: schemaTypes },
})

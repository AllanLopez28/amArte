import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'EducaSV CMS',
  projectId: 'PROJECT_ID_AQUI',   // <-- reemplaza con tu Project ID
  dataset: 'production',          // o el nombre que elegiste
  basePath: '/studio',
  plugins: [deskTool()],
  schema: {types: schemaTypes},
})

# Sanity — Paso 1 (Home)

## 1) Instalar dependencias
```bash
npm i sanity next-sanity @sanity/client @portabletext/react
```

## 2) Crear proyecto (obtener Project ID)
```bash
npx sanity@latest init
# Create new project > Nombre: EducaSV CMS
# Dataset: production
# Output path: sanity
# Template: Clean
```

## 3) Copiar estos archivos al root del proyecto (sobrescribe si pide)
- `sanity/sanity.config.ts` (edita PROJECT_ID_AQUI)
- `sanity/schemas/*`
- `app/studio/[[...index]]/page.tsx`
- `lib/sanity.client.ts`
- `lib/sanity.queries.ts`
- `app/[locale]/page.tsx`

Edita `sanity/sanity.config.ts` y pon tu **Project ID**.

## 4) Hacer lectura pública (rápido para el MVP)
En Sanity: Project Settings → API → **Public content** → activar *Public (read)*.

## 5) Ejecutar
```bash
npm run dev
# Studio:    http://localhost:3000/studio
# Website:   http://localhost:3000/es
```

## 6) Cargar contenido en /studio
- Crea documento **Home** y rellena:
  - Hero · Título (ES/EN)
  - Hero · Subtítulo (ES/EN)
  - Hero · CTA (ES/EN)
  - Impacto: 3 items con (Etiqueta ES/EN + Valor)

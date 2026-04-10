# CryptoPulse — Frontend

Dashboard de criptomonedas en tiempo real. Muestra precios, gráficos de historial y datos de mercado consumidos desde una API propia.

## Stack

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 16.2 | Framework (App Router) |
| React | 19 | UI |
| TypeScript | 5 | Tipado estático |
| Tailwind CSS | 4 | Estilos |
| Zustand | 5 | Estado global (favoritos) |

## Estructura de rutas

```
/                    → Dashboard — top N criptos por market cap
/crypto/[id]         → Detalle — precio, gráfico histórico y métricas
/search              → Búsqueda de criptos por nombre o símbolo
/favorites           → Lista personal de criptos guardados
```

## Características

- **Market overview**: grid con las principales criptomonedas, precio actual y variación 24h
- **Detalle de activo**: gráfico de precio histórico, market cap, volumen, supply y enlace al explorador
- **Búsqueda**: resultados en tiempo real (mínimo 2 caracteres)
- **Favoritos**: persistencia local con Zustand; los datos se cargan al entrar a la sección
- **Server Components + streaming**: las páginas usan `loading.tsx` y `error.tsx` para estados de carga y error
- **SEO**: metadata dinámica por página con `generateMetadata`

## Instalación y desarrollo

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

```bash
pnpm build        # build de producción
pnpm start        # sirve el build
pnpm lint         # ESLint
```

## Variables de entorno

Crea un archivo `.env.local` en la raíz con:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000   # URL de la API backend
```

## Convenciones

- Alias de imports: `@/` apunta a la raíz del proyecto
- Componentes de servidor por defecto; `'use client'` sólo cuando se necesita interactividad o hooks
- Formatters en `lib/utils/formatters.ts` para precios, porcentajes, market cap y supply

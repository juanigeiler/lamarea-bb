# La Marea B&B - Landing Page

Landing page oficial del Bed & Breakfast **La Marea** en Tigre, Buenos Aires.

## 🏡 Sobre el Proyecto

Sitio web moderno y optimizado para SEO que presenta las comodidades y servicios de La Marea B&B, incluyendo:

- Galería de fotos con categorías (Exterior, Habitaciones, Áreas Comunes, Desayuno)
- Información de amenidades (Pileta, Jardín, Desayuno, WiFi, Parrilla, Cocina)
- Reseñas de huéspedes
- Integración con Google Maps
- Enlaces a redes sociales y WhatsApp
- Schema.org markup para mejor SEO

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Imágenes**: Cloudinary (optimización y CDN)
- **Deploy**: Vercel

## 🚀 Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Servidor de producción
npm start
```

El servidor de desarrollo corre en [http://localhost:3000](http://localhost:3000)

## 🌍 Variables de Entorno

Crea un archivo `.env.local` con:

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
```

## 📁 Estructura del Proyecto

```
/app
  /components
    - Amenities.tsx      # Comodidades del B&B
    - Gallery.tsx        # Galería de fotos con filtros
    - ImageLightbox.tsx  # Modal de imagen
    - Reviews.tsx        # Reseñas y Google Maps
    - StructuredData.tsx # SEO Schema.org
  - page.tsx             # Página principal
  - layout.tsx           # Layout con metadata SEO
  - sitemap.ts           # Sitemap automático
  - robots.ts            # robots.txt

/public
  - logo.png             # Logo del B&B
```

## 🎨 Características

- ✅ Diseño mobile-first responsive
- ✅ Optimización de imágenes con Cloudinary
- ✅ SEO optimizado (metadata, schema.org, sitemap)
- ✅ Lightbox para galería de fotos
- ✅ Sistema de categorías con filtros
- ✅ Integración con Google Maps
- ✅ Botones de contacto (WhatsApp, Instagram)
- ✅ Rating 9.6/10 destacado

## 📝 Deploy en Vercel

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push a `main`

## 📞 Contacto

- **Ubicación**: Avenida Santiago de Liniers 573, Tigre, Buenos Aires
- **Instagram**: [@lamareatigre](https://www.instagram.com/lamareatigre/)
- **WhatsApp**: +54 11 2640-4169
- **Rating**: 9.6/10 en Booking.com

## 📄 Licencia

Proyecto privado © 2025 La Marea B&B

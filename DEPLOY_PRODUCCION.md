# 🚀 Guía de Deployment a Producción

## Dominio: lamareatigre.com.ar

Esta guía asume que ya compraste el dominio **lamareatigre.com.ar** y tenés acceso al panel de administración del registrador (ej: NIC Argentina, DonWeb, etc.).

---

## 📋 Checklist Pre-Deploy

Antes de empezar, asegurate de tener:
- [ ] Dominio comprado: `lamareatigre.com.ar`
- [ ] Acceso al panel del registrador (DNS)
- [ ] Acceso a Vercel
- [ ] Acceso a Google Analytics
- [ ] Acceso a Google Search Console
- [ ] Código subido a GitHub

---

## Paso 1: Configurar Dominio en Vercel (10 minutos)

### 1.1 Agregar dominio en Vercel
1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Click en **Settings** → **Domains**
3. En "Add Domain", escribir: `lamareatigre.com.ar`
4. Click **"Add"**

### 1.2 Configurar DNS en tu registrador
Vercel te mostrará qué registros DNS agregar. Normalmente serán:

**Opción A: Nameservers de Vercel (recomendado)**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Opción B: Registros DNS manuales**
```
Tipo: A
Nombre: @
Valor: 76.76.21.21

Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
```

### 1.3 Aplicar cambios DNS
1. Ve al panel de tu registrador (ej: NIC Argentina)
2. Busca sección **"DNS"** o **"Nameservers"**
3. Agregar los registros que Vercel te indicó
4. **Guardar cambios**
5. **Esperar propagación:** 5 minutos a 48 horas (generalmente 1-2 horas)

### 1.4 Verificar en Vercel
1. Volvé a Vercel → Settings → Domains
2. Cuando propagó, verás un ✅ verde en `lamareatigre.com.ar`
3. Vercel automáticamente genera certificado SSL (HTTPS)

---

## Paso 2: Actualizar Variables de Entorno (5 minutos)

### 2.1 En Vercel Dashboard
1. Settings → **Environment Variables**
2. Agregar o actualizar:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://lamareatigre.com.ar` | URL oficial del sitio |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXX` | Ya configurado |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | `abc123xyz` | Ya configurado |
| `GOOGLE_PLACES_API_KEY` | `AIzaSy...` | Ya configurado |

3. **Importante:** Marcar **Production**, **Preview**, **Development**
4. Click **"Save"**

### 2.2 Redeploy
1. Ve a **Deployments**
2. En el último deployment → 3 puntitos → **"Redeploy"**
3. Esperar 2-3 minutos

---

## Paso 3: Actualizar Metadata en el Código (5 minutos)

### 3.1 Actualizar Open Graph y metadata
Editar `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "La Marea B&B - Bed & Breakfast en Tigre",
  description: "La Marea B&B en Tigre, Buenos Aires. Pileta, jardín, desayuno incluido. Atención familiar y personalizada. Cerca de la estación y Río Luján.",
  keywords: ["bed and breakfast tigre", "b&b tigre", "hospedaje tigre", "alojamiento tigre", "hotel tigre", "turismo tigre", "pileta tigre"],
  authors: [{ name: "La Marea B&B" }],
  icons: {
    icon: '/icon.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  metadataBase: new URL('https://lamareatigre.com.ar'), // AGREGAR ESTA LÍNEA
  alternates: {
    canonical: 'https://lamareatigre.com.ar', // AGREGAR ESTA LÍNEA
  },
  openGraph: {
    title: "La Marea B&B - Bed & Breakfast en Tigre",
    description: "Bed & Breakfast en Tigre con pileta, jardín y desayuno. Atención familiar. Avenida Santiago de Liniers 573, Tigre.",
    url: 'https://lamareatigre.com.ar', // AGREGAR ESTA LÍNEA
    siteName: 'La Marea B&B', // AGREGAR ESTA LÍNEA
    images: [
      {
        url: '/og-image.jpg', // Crear esta imagen (1200x630px)
        width: 1200,
        height: 630,
        alt: 'La Marea B&B - Tigre',
      },
    ],
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Marea B&B - Tigre",
    description: "Bed & Breakfast en Tigre con pileta y jardín. Atención familiar.",
    images: ['/og-image.jpg'], // AGREGAR ESTA LÍNEA
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
```

### 3.2 Commit y push
```bash
git add .
git commit -m "Update metadata for production domain"
git push
```

---

## Paso 4: Crear Imagen Open Graph (10 minutos)

### 4.1 Crear imagen para redes sociales
- **Dimensiones:** 1200x630px
- **Formato:** JPG o PNG
- **Contenido sugerido:**
  - Logo de La Marea
  - Texto: "La Marea B&B - Tigre"
  - Foto de la pileta o fachada
  - Rating: ⭐⭐⭐⭐⭐ 4.9/5

### 4.2 Guardar como `/public/og-image.jpg`

### 4.3 Push al repo
```bash
git add public/og-image.jpg
git commit -m "Add Open Graph image"
git push
```

---

## Paso 5: Actualizar Google Search Console (5 minutos)

### 5.1 Agregar nueva propiedad
1. Ve a https://search.google.com/search-console
2. Click **"Agregar propiedad"**
3. Tipo: **Prefijo de URL**
4. URL: `https://lamareatigre.com.ar`
5. Método de verificación: **Etiqueta HTML**
6. El código ya está en tu sitio (variable de entorno), click **"Verificar"**

### 5.2 Enviar sitemap
1. En la nueva propiedad → **Sitemaps**
2. Agregar: `sitemap.xml`
3. Click **"Enviar"**

### 5.3 (Opcional) Mantener propiedad de Vercel
- Podés mantener ambas (Vercel y dominio custom) para comparar datos
- O configurar redirección 301 de Vercel a dominio custom

---

## Paso 6: Actualizar Google Analytics (2 minutos)

### 6.1 Agregar dominio al flujo de datos
1. Ve a https://analytics.google.com
2. Admin → Flujos de datos
3. Click en tu flujo web
4. En "URL del flujo de datos mejorado": Agregar `lamareatigre.com.ar`

**Nota:** No hace falta crear nueva propiedad, Analytics funciona automáticamente con el nuevo dominio.

---

## Paso 7: Google My Business - ¡AHORA SÍ! (15 minutos)

### 7.1 Reclamar tu negocio
1. Ve a https://business.google.com
2. Buscar: **"La Marea B&B Tigre"**
3. Click **"Reclamar este negocio"** o **"Agregar negocio"**

### 7.2 Completar información
- **Nombre:** La Marea B&B
- **Categoría:** Bed & Breakfast, Hotel
- **Dirección:** Avenida Santiago de Liniers 573, Tigre, Buenos Aires
- **Teléfono:** +54 11 2640-4169
- **Sitio web:** https://lamareatigre.com.ar
- **Horarios:** Agregar horarios de check-in/check-out
- **Descripción:** (Usar la del sitio web)

### 7.3 Verificación
Google te enviará:
- Código por SMS/llamada, o
- Postal (tarda 5-7 días)

### 7.4 Agregar fotos
- Subir las mismas fotos que en la galería web
- Mínimo 10 fotos (exterior, habitaciones, desayuno)

### 7.5 Vincular reviews
- Google automáticamente vinculará reviews existentes
- Tu rating de 4.9 aparecerá en GMB

---

## Paso 8: Actualizar Structured Data (5 minutos)

Editar `app/components/StructuredData.tsx`:

```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "BedAndBreakfast",
  "name": "La Marea B&B",
  "url": "https://lamareatigre.com.ar", // ACTUALIZAR
  "logo": "https://lamareatigre.com.ar/logo.png", // ACTUALIZAR
  "image": "https://lamareatigre.com.ar/og-image.jpg", // ACTUALIZAR
  // ... resto igual
}
```

```bash
git add .
git commit -m "Update structured data with production URL"
git push
```

---

## Paso 9: Verificación Final (10 minutos)

### 9.1 Verificar el sitio funciona
- [ ] Visitar: https://lamareatigre.com.ar
- [ ] Verificar HTTPS (candado verde)
- [ ] Probar en mobile y desktop
- [ ] Verificar que todas las imágenes cargan
- [ ] Probar botones de WhatsApp/Instagram
- [ ] Verificar galería funciona
- [ ] Ver que reviews de Google aparecen

### 9.2 Testear SEO
1. **Google Rich Results Test:**
   - https://search.google.com/test/rich-results
   - Pegar: `https://lamareatigre.com.ar`
   - Verificar que aparece "BedAndBreakfast" schema

2. **Facebook Sharing Debugger:**
   - https://developers.facebook.com/tools/debug/
   - Pegar: `https://lamareatigre.com.ar`
   - Verificar que aparece la imagen Open Graph

3. **Twitter Card Validator:**
   - https://cards-dev.twitter.com/validator
   - Pegar: `https://lamareatigre.com.ar`

### 9.3 Solicitar indexación en Google
1. Search Console → Inspección de URLs
2. Pegar: `https://lamareatigre.com.ar`
3. Click **"Solicitar indexación"**
4. Repetir para páginas clave (si agregás más en el futuro)

---

## Paso 10: Configurar Redirects (Opcional pero recomendado)

### 10.1 Redireccionar Vercel a dominio custom
En Vercel → Settings → Domains:
- Marcar `lamareatigre.com.ar` como **"Primary Domain"**
- Vercel automáticamente redirige `lamarea-bb.vercel.app` → `lamareatigre.com.ar`

### 10.2 Configurar www
Si querés que `www.lamareatigre.com.ar` redirija a `lamareatigre.com.ar`:
1. Agregar ambos dominios en Vercel
2. Marcar sin www como primario

---

## Paso 11: Monitoreo Post-Launch (Primeros 7 días)

### Día 1-3: Verificar indexación
- [ ] Search Console → Cobertura → Ver páginas indexadas
- [ ] Buscar en Google: `site:lamareatigre.com.ar`
- [ ] Verificar Analytics registra visitas

### Día 3-7: Optimizar
- [ ] Ver qué keywords traen tráfico (Search Console)
- [ ] Ajustar meta descriptions si es necesario
- [ ] Verificar que GMB está activo y aparece en Google Maps

### Semana 2+: Contenido
- [ ] Agregar fotos reales de habitaciones (si faltan)
- [ ] Actualizar precios (si se deciden mostrar)
- [ ] Agregar FAQ (preguntas frecuentes)

---

## 📊 KPIs a Trackear

### Google Analytics (primeros 30 días)
- Usuarios únicos
- Páginas vistas
- Tiempo promedio en sitio
- Tasa de rebote
- Clicks en WhatsApp (si configurás evento)

### Google Search Console
- Impresiones (cuántas veces aparecés en Google)
- Clicks desde Google
- CTR (Click Through Rate)
- Posición promedio para keywords clave:
  - "bed and breakfast tigre"
  - "b&b tigre"
  - "hospedaje tigre"

### Google My Business
- Vistas del perfil
- Clicks en "Cómo llegar"
- Clicks en teléfono
- Clicks en sitio web

---

## 🚨 Troubleshooting Común

### "El dominio no conecta después de 48 horas"
1. Verificar DNS: https://dnschecker.org
2. Probar `nslookup lamareatigre.com.ar`
3. Contactar soporte del registrador

### "HTTPS no funciona"
1. Esperar 10-15 minutos (Vercel genera SSL automático)
2. Verificar en Vercel → Domains que diga "Valid Configuration"

### "Google no indexa el sitio"
1. Verificar robots.txt: `https://lamareatigre.com.ar/robots.txt`
2. Verificar sitemap: `https://lamareatigre.com.ar/sitemap.xml`
3. Solicitar indexación manual en Search Console

### "Analytics no registra visitas"
1. Verificar variable de entorno `NEXT_PUBLIC_GA_MEASUREMENT_ID`
2. Ver consola del navegador (F12) para errores
3. Usar Google Tag Assistant: https://tagassistant.google.com

---

## 📝 Checklist Final Pre-Launch

- [ ] Dominio configurado en Vercel ✅
- [ ] DNS propagado (verificar en dnschecker.org) ✅
- [ ] HTTPS funcionando (candado verde) ✅
- [ ] Variables de entorno actualizadas ✅
- [ ] Metadata con URL correcta ✅
- [ ] Open Graph image creada ✅
- [ ] Search Console verificado ✅
- [ ] Sitemap enviado ✅
- [ ] Google My Business reclamado ✅
- [ ] Analytics trackeando ✅
- [ ] Todas las fotos cargando ✅
- [ ] Botones de contacto funcionando ✅
- [ ] Mobile responsive ✅
- [ ] Rich results validados ✅
- [ ] Indexación solicitada ✅

---

## 🎉 Post-Launch

Una vez que todo esté funcionando:

1. **Anunciar en redes sociales:**
   - Instagram: @lamareatigre
   - Facebook (si tienen)
   - WhatsApp a clientes anteriores

2. **Pedir reviews:**
   - Email/WhatsApp a huéspedes recientes
   - Link directo: `https://g.page/r/[TU_GOOGLE_ID]/review`

3. **Monitorear primeras búsquedas:**
   - "la marea tigre"
   - "la marea b&b"
   - "bed and breakfast tigre"

4. **Ajustar estrategia SEO** según datos de Search Console

---

## 📞 Contactos Útiles

- **Vercel Support:** https://vercel.com/support
- **Google Search Console Help:** https://support.google.com/webmasters
- **NIC Argentina (si usás .com.ar):** https://nic.ar

---

## 🔄 Actualizaciones Futuras

Cuando agregues nuevas funcionalidades:
1. Sistema de reservas online
2. Blog de turismo en Tigre
3. Galería de eventos
4. Multi-idioma (inglés)

Actualizar sitemap y solicitar re-indexación.

---

**¡Éxito con el lanzamiento! 🚀**

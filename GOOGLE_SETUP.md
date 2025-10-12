# Configuración de Google Analytics 4 y Search Console

## 📊 Google Analytics 4 (GA4)

### Paso 1: Crear propiedad GA4
1. Ve a https://analytics.google.com
2. Click en "Admin" (engranaje abajo a la izquierda)
3. Click en "Crear propiedad"
4. Nombre: **La Marea B&B**
5. Zona horaria: **Argentina (GMT-3)**
6. Moneda: **Peso argentino (ARS)**
7. Siguiente → Categoría: **Viajes y turismo**
8. Tamaño de empresa: **Pequeña**
9. Click en "Crear"

### Paso 2: Configurar flujo de datos web
1. Selecciona "Web" como plataforma
2. URL del sitio web: **https://lamarea-bb.vercel.app** (o tu dominio custom)
3. Nombre del flujo: **Web - La Marea**
4. Click en "Crear flujo"

### Paso 3: Copiar ID de medición
1. Verás un ID que empieza con **G-XXXXXXXXXX**
2. Cópialo (ej: `G-ABC1234567`)

### Paso 4: Agregar a Vercel
1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Settings → Environment Variables
3. Agregar nueva variable:
   - **Name**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-ABC1234567` (tu ID real)
   - Marcar: Production, Preview, Development
4. Click "Save"

### Paso 5: Redeploy
```bash
git add .
git commit -m "Add Google Analytics 4"
git push
```

O usa el botón "Redeploy" en Vercel.

### ✅ Verificar que funciona
1. Visita tu sitio: https://lamarea-bb.vercel.app
2. En Google Analytics → Informes → Tiempo real
3. Deberías verte como 1 usuario activo

---

## 🔍 Google Search Console

### Paso 1: Agregar propiedad
1. Ve a https://search.google.com/search-console
2. Click en "Agregar propiedad"
3. Selecciona **"Prefijo de URL"** (no dominio)
4. URL: **https://lamarea-bb.vercel.app**
5. Click "Continuar"

### Paso 2: Verificar propiedad (Método: Etiqueta HTML)
1. Google te dará un código como: `google-site-verification=abc123xyz`
2. Copia **solo** la parte `abc123xyz` (sin `google-site-verification=`)

### Paso 3: Agregar a Vercel
1. Ve a Vercel → Settings → Environment Variables
2. Agregar nueva variable:
   - **Name**: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   - **Value**: `abc123xyz` (tu código real)
   - Marcar: Production, Preview, Development
3. Click "Save"

### Paso 4: Redeploy
```bash
git add .
git commit -m "Add Google Search Console verification"
git push
```

### Paso 5: Verificar en Search Console
1. Volvé a Search Console
2. Click en "Verificar"
3. Debería decir "Verificación correcta"

### ✅ Enviar sitemap
1. En Search Console → Sitemaps (menú izquierda)
2. Agregar sitemap: **sitemap.xml**
3. Click "Enviar"

---

## 📝 Resumen de Variables de Entorno en Vercel

Tu proyecto debería tener estas variables:

| Variable | Valor | Para qué sirve |
|----------|-------|----------------|
| `GOOGLE_PLACES_API_KEY` | AIzaSy... | Reviews y rating de Google |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | G-ABC... | Google Analytics 4 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | abc123... | Verificación Search Console |

---

## 🔄 Cuando compres dominio

### Actualizar Analytics
- No hace falta cambiar nada, sigue funcionando automáticamente

### Actualizar Search Console
1. Agregar nueva propiedad con dominio custom
2. Copiar/pegar mismo código de verificación
3. Opcional: Configurar como propiedad preferida

### Google My Business
1. Ahora SÍ podés reclamar el negocio
2. https://business.google.com
3. Buscar "La Marea B&B Tigre"
4. "Reclamar este negocio"
5. Verificación por teléfono/correo/postal

---

## 📈 Qué ver en Analytics (primeros días)

### Tiempo real
- Usuarios activos ahora
- Páginas que están viendo
- De dónde vienen (ciudad, dispositivo)

### Adquisición (después de 1 semana)
- Tráfico orgánico (Google)
- Directo (escribieron la URL)
- Redes sociales (Instagram, Facebook)

### Engagement
- Páginas más vistas
- Tiempo promedio en el sitio
- Conversiones (clicks en WhatsApp, si configurás eventos)

---

## 📊 Qué ver en Search Console (después de 2-3 días)

### Rendimiento
- Impresiones: cuántas veces apareciste en Google
- Clicks: cuántos entraron desde Google
- Keywords: qué buscan para encontrarte
- CTR: % de gente que hace click

### Cobertura
- Páginas indexadas correctamente
- Errores de indexación

---

## 🎯 Próximos Pasos (opcional)

### Configurar eventos en GA4
Para trackear clicks en WhatsApp, botones, etc.

### Google Tag Manager
Para gestionar todos los tags desde un solo lugar.

### Conversiones
Definir qué es una conversión (ej: click en WhatsApp)

---

## ⚠️ Importante

- Los datos de Analytics tardan **24-48 horas** en aparecer completamente
- Search Console tarda **2-3 días** en mostrar datos
- GMB solo funciona con dominio propio (.com.ar, no .vercel.app)

---

¿Dudas? Revisá la consola del navegador (F12) para ver si hay errores de Google Analytics.

# Fase 2 — Arquitectura de Software y Diseño de Sistemas
## Portafolio Profesional · Gadiel · UADY / TIDE Fellows

> **Versión:** 1.0 | **Estado:** Aprobado para Desarrollo | **Prerrequisito:** Fase 1 v1.1 aprobada
> **Metodología:** C4 Model (Context → Container → Component) + ADR (Architecture Decision Records)

---

## ⚠️ Modificaciones respecto al brief original

Antes del documento, se registran tres correcciones técnicas aplicadas al brief de la Fase 2. Cada una está señalada en el cuerpo del documento con el tag `[MOD-XX]`.

| ID | Elemento afectado | Problema detectado | Corrección aplicada |
|---|---|---|---|
| MOD-01 | Sistema de Diseño — Tipografía | **Inter** está descartada por ser la fuente genérica por defecto de proyectos de IA y desarrollo web moderno. Usarla elimina inmediatamente cualquier pretensión de originalidad y "seniority" en el diseño. **SF Pro** es una tipografía propietaria de Apple con licencia que la restringe a productos del ecosistema Apple; no puede usarse legalmente en un sitio web público. | Se reemplaza Inter por **Geist** (tipografía open-source de Vercel, diseñada para interfaces técnicas, disponible en Google Fonts) como fuente de cuerpo. Para display/headings se propone **Instrument Serif** o **Fraunces** como contrapunto editorial. Ambas son libres y de uso web permitido. |
| MOD-02 | Sistema de Diseño — Color de acento | Proponer "WhatsApp Green o azul institucional" como acento único genera un conflicto de identidad: si se elige el verde, el sitio queda visualmente subordinado a la marca de Meta. Si coexisten dos acentos sin jerarquía, el sistema de color se fragmenta y pierde coherencia. | Se define una **arquitectura de color de dos niveles**: un acento primario de identidad (azul pizarrón frío o slate) para todos los CTAs de navegación y proyectos, y el verde de WhatsApp (`#25D366`) como color funcional exclusivo y confinado al botón de WhatsApp. El verde no aparece en ningún otro elemento del sitio. |
| MOD-03 | Stack — Claim de bundle size de Tailwind | El brief afirma que Tailwind "permite un bundle size mínimo". Esto es parcialmente correcto pero requiere precisión: Tailwind por sí solo genera un archivo CSS masivo; el bundle mínimo se logra únicamente con el proceso de **tree-shaking / PurgeCSS** que escanea los archivos de Astro en build time y elimina las clases no usadas. Si no se configura correctamente el `content` array en `tailwind.config.mjs`, el bundle puede superar 3 MB. | Se añade en el ADR-03 la especificación explícita de configuración de Tailwind con Astro para garantizar tree-shaking correcto. El requisito RNF-06 (≤ 300 KB) depende de esta configuración. |

---

## 1. Arquitectura de Información y Flujo de Usuario

### 1.1 Principio de Diseño de Navegación

El sitio sirve a dos audiencias con objetivos radicalmente distintos en la misma URL. La solución no es crear dos sitios, sino diseñar una jerarquía de información que lleve a cada audiencia a su contenido de valor **sin fricción** y **sin mostrarle ruido** del otro perfil.

```
Dueño de PYME:  Hero → Servicios → Proyectos (tarjeta) → Contacto (WhatsApp)
Tech Lead:      Hero → Proyectos (detalle) → Infraestructura → GitHub
```

Ambas rutas son lineales y tienen un solo CTA al final. La sección de Infraestructura actúa como "filtro": un PYME que la encuentre no la leerá (y eso está bien); un tech lead que la encuentre sabrá exactamente dónde está parado.

### 1.2 Sitemap Completo

```
/ (Inicio)
├── #hero               — Propuesta de valor comercial + CTA primario
├── #sobre-mi           — Perfil académico traducido a beneficios de negocio
├── #servicios          — 3 servicios orientados a PYME con CTA por servicio
├── #proyectos          — Vista general con filtros
│   ├── [slug]/         — Vista detalle: Caso de Estudio por proyecto
│   │   ├── RSA-C/      — Caso de estudio con Simulador RSA interactivo
│   │   └── IPv6/       — Caso de estudio con Mapa de Red interactivo
│   └── ...
├── /infraestructura    — Proyecto especial: el portafolio como caso de estudio
│   ├── #vps            — Aprovisionamiento del servidor
│   ├── #nginx          — Configuración del servidor web y headers de seguridad
│   ├── #ssl            — Gestión de certificados con Let's Encrypt
│   ├── #ipv6           — Configuración dual-stack y diagrama de red
│   └── #cicd           — Pipeline de GitHub Actions con diagrama
└── #contacto           — Formulario formal + botón WhatsApp
```

**Nota de implementación:** `/infraestructura` es una ruta de página completa (no una sección ancla) para que sea indexable por Google con su propio `<title>` y meta description orientados a keywords técnicos. Las secciones de la home son anclas (`#`) para permitir navegación one-page en el flujo del PYME.

### 1.3 Flujos de Usuario

#### Flujo A — PYME en Mobile (Conversión Rápida)

```
Aterriza en la home (referido o búsqueda)
    → Hero: lee propuesta de valor en < 10 s
    → Ve botón flotante de WhatsApp (siempre visible)
    → Hace scroll a Servicios: identifica si aplica a su negocio
    → Ve 1-2 tarjetas de proyectos web relevantes
    → Presiona botón WhatsApp → mensaje predefinido → conversación iniciada

Tiempo objetivo: < 90 segundos hasta primer contacto
```

#### Flujo B — PYME en Desktop (Evaluación Formal)

```
Aterriza en la home
    → Hero + Servicios
    → Sección Proyectos: filtra por "Web"
    → Abre 1 caso de estudio: lee Problema → Solución → Resultado
    → Regresa al inicio
    → Scroll hasta Contacto
    → Llena formulario o hace clic en WhatsApp desde el footer de contacto

Tiempo objetivo: < 5 minutos hasta envío de formulario
```

#### Flujo C — Tech Lead (Evaluación Técnica)

```
Aterriza en la home (desde GitHub profile o LinkedIn)
    → Hero: lee título técnico + stack
    → Navega directamente a Proyectos
    → Filtra por "Low-level" → abre RSA en C
    → Lee Simulador RSA + código + GitHub link
    → Navega a /infraestructura
    → Revisa configuración VPS, IPv6, CI/CD
    → Verifica accesibilidad IPv6 del sitio con curl -6
    → Footer: link a GitHub y LinkedIn

Tiempo objetivo: sin límite; profundidad sobre velocidad
```

---

## 2. Architecture Decision Records (ADR)

Los ADR documentan cada decisión tecnológica significativa con su contexto, alternativas evaluadas y consecuencias. Son el artefacto que demuestra que las decisiones de arquitectura se tomaron con criterio, no por defecto.

---

### ADR-01 — Framework: Astro

**Estado:** Aceptado

**Contexto:** Se requiere un framework que genere HTML estático puro (RNF-19), compatible con servidor Nginx en VPS sin runtime de Node en producción (RNF-23), con soporte para MDX para inyectar componentes interactivos en proyectos (RF-07), y con scores de Lighthouse ≥ 95 en Performance (RNF-07).

**Alternativas evaluadas:**

| Framework | HTML estático puro | MDX nativo | Sin Node en prod | Veredicto |
|---|---|---|---|---|
| **Astro** | Sí (output: `static`) | Sí | Sí | ✅ Seleccionado |
| Next.js | Solo con `output: 'export'` | Sí (con plugin) | Sí (export) | ❌ Más complejo para el mismo resultado |
| SvelteKit | Solo con adapter-static | No nativo | Sí | ❌ MDX requiere configuración adicional |
| Nuxt | Solo con `ssr: false` | No | Sí | ❌ Ecosistema Vue innecesario aquí |
| Gatsby | Sí | Sí | Sí | ❌ En desuso activo; GraphQL layer es sobreingeniería |

**Decisión:** Astro con `output: 'static'` en `astro.config.mjs`. El build genera un directorio `dist/` de archivos estáticos listos para ser servidos por Nginx directamente.

**Consecuencias:**
- Sin runtime de Node en el VPS. Nginx sirve archivos estáticos: máximo rendimiento, mínima superficie de ataque.
- Los componentes de Astro (`.astro`) son zero-JS por defecto. JavaScript se añade por directiva explícita (`client:load`, `client:visible`) solo donde se necesita (Simulador RSA, filtro de proyectos).
- Astro Islands permite usar componentes de Preact o Svelte para partes interactivas sin cargar un framework completo para toda la página.

---

### ADR-02 — Estilos: Tailwind CSS v4

**Estado:** Aceptado

**Contexto:** Se requiere un sistema de estilos que produzca un bundle CSS mínimo (RNF-06: ≤ 300 KB total), permita mantener consistencia de diseño a través de tokens, y facilite el diseño responsivo mobile-first (RNF-17).

**Decisión:** Tailwind CSS v4 integrado con el plugin oficial de Astro (`@astrojs/tailwind`).

**Configuración crítica para tree-shaking `[MOD-03]`:**

```javascript
// tailwind.config.mjs
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      // Tokens del sistema de diseño definidos aquí
      // Ver Sección 5 — Sistema de Diseño
    },
  },
}
```

Sin el `content` array correcto, el CSS de producción puede superar 3 MB. Con tree-shaking correcto, el CSS del portafolio debe quedar bajo 15 KB.

**Regla de desarrollo:** No usar clases de Tailwind en strings dinámicos (`className={`text-${color}-500`}`). El scanner de PurgeCSS no las detecta y serán eliminadas en producción.

---

### ADR-03 — Gestión de Contenido: Archivos Locales MDX + JSON

**Estado:** Aceptado

**Contexto:** RNF-20 prohíbe CMS y APIs externas para contenido. Se necesita un sistema que permita inyectar componentes interactivos (Simulador RSA, Mapa IPv6) directamente en el texto de cada proyecto.

**Estructura de datos de proyectos:**

```
src/
└── content/
    └── projects/
        ├── rsa-en-c.mdx          ← Caso de estudio con componente <RSASimulator />
        ├── analisis-ipv6.mdx      ← Caso de estudio con componente <IPv6Map />
        ├── proyecto-web-1.mdx
        └── proyecto-web-2.mdx
```

**Schema de frontmatter (TypeScript):**

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(['web', 'sistemas', 'redes', 'infraestructura']),
    summary: z.string().max(300),         // Para tarjeta (PYME)
    problem: z.string(),                   // Encabezado caso de estudio
    solution: z.string(),
    result: z.string(),
    stack: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    hasInteractiveComponent: z.boolean().default(false),
    publishedAt: z.date(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects };
```

**Flujo de datos (build time, cero latencia en runtime):**

```
MDX files → Astro Content Collections → getCollection('projects')
    → Página /proyectos (tarjetas filtradas)
    → Página /proyectos/[slug] (detalle completo)
```

---

### ADR-04 — Interactividad Selectiva: Astro Islands con Preact

**Estado:** Aceptado

**Contexto:** Los componentes interactivos (Simulador RSA, filtro de proyectos, botón WhatsApp flotante) requieren JavaScript. El resto del sitio no lo necesita.

**Decisión:** Preact como runtime de UI para las "islas" interactivas. Preact pesa ~3 KB (vs React ~45 KB).

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  integrations: [preact(), tailwind()],
});
```

**Directivas de hidratación por componente:**

| Componente | Directiva | Justificación |
|---|---|---|
| `<ProjectFilter />` | `client:load` | Interacción inmediata esperada al llegar a la sección |
| `<RSASimulator />` | `client:visible` | Carga solo cuando el usuario scrollea hasta el componente |
| `<IPv6Map />` | `client:visible` | Idem |
| `<WhatsAppButton />` | `client:load` | Debe estar disponible en cualquier momento |
| `<ContactForm />` | `client:idle` | Carga cuando el browser está ocioso, no bloquea LCP |

---

### ADR-05 — Deployment: GitHub Actions → rsync → Nginx en VPS

**Estado:** Aceptado

**Contexto:** RNF-27 exige un pipeline CI/CD propio que transfiera artefactos al VPS sin depender de plataformas PaaS. El build debe completarse en < 3 minutos.

**Pipeline completo:**

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        # Output: ./dist/

      - name: Deploy via rsync over SSH
        env:
          SSH_PRIVATE_KEY: ${{ secrets.VPS_SSH_KEY }}
          VPS_HOST: ${{ secrets.VPS_HOST }}
          VPS_USER: ${{ secrets.VPS_USER }}
        run: |
          mkdir -p ~/.ssh
          echo "$SSH_PRIVATE_KEY" | tr -d '\r' > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan -H "$VPS_HOST" >> ~/.ssh/known_hosts
          rsync -avz --delete \
            -e "ssh -i ~/.ssh/id_ed25519 -o StrictHostKeyChecking=yes" \
            ./dist/ \
            "$VPS_USER@$VPS_HOST:/var/www/portafolio/"

      - name: Reload Nginx
        env:
          SSH_PRIVATE_KEY: ${{ secrets.VPS_SSH_KEY }}
          VPS_HOST: ${{ secrets.VPS_HOST }}
          VPS_USER: ${{ secrets.VPS_USER }}
        run: |
          ssh -i ~/.ssh/id_ed25519 \
            "$VPS_USER@$VPS_HOST" \
            "sudo systemctl reload nginx"
```

**Secrets requeridos en GitHub Actions:**
- `VPS_SSH_KEY` — clave privada Ed25519 del deployer (no del usuario root)
- `VPS_HOST` — dirección IPv4/IPv6 o dominio del VPS
- `VPS_USER` — usuario no-root con permisos sobre `/var/www/portafolio/`

---

## 3. Diseño de Componentes Visuales Críticos

### 3.1 Simulador RSA — Especificación de Componente

**Propósito:** Traducir el proyecto técnico de cifrado RSA a una experiencia interactiva que un dueño de PYME pueda entender en 30 segundos, cumpliendo HU-02 CA #3.

**Analogía visual elegida:** El candado físico. El texto plano es un mensaje en papel visible. Cifrado = el mensaje pasa por un candado y sale ilegible. Descifrado = la llave correcta abre el candado y restaura el texto. La "llave pública" y "llave privada" se muestran como dos llaves físicamente distintas.

**Interfaz del componente:**

```
┌─────────────────────────────────────────────────────────┐
│  Escribe un mensaje:                                     │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Hola, me interesa tu servicio                     │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  [🔐 Cifrar con llave pública]                           │
│                                                          │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─        │
│                                                          │
│  Mensaje cifrado:                                        │
│  ┌────────────────────────────────────────────────────┐  │
│  │  7f3a9c... [texto ilegible animado]                │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  [🔓 Descifrar con llave privada]  ← Solo tú tienes esta │
│                                                          │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─        │
│                                                          │
│  Resultado:  Hola, me interesa tu servicio ✓            │
│                                                          │
│  ℹ️  El código C real está disponible en GitHub →        │
└─────────────────────────────────────────────────────────┘
```

**Notas de implementación:**

El componente implementa una simulación visual de RSA (no RSA real en el navegador, que implicaría Web Crypto API con claves de 2048+ bits — innecesario para la analogía). El texto cifrado que se muestra es una representación visual convincente: se genera un hash visual del input usando una función de ofuscación simple. Lo que importa es la experiencia, no la criptografía del lado del cliente. El código C real (implementación RSA completa) vive en GitHub y se enlaza explícitamente desde el componente.

**Props del componente (Preact):**

```typescript
interface RSASimulatorProps {
  maxInputLength?: number;          // default: 60 chars
  showGitHubLink?: boolean;         // default: true
  githubUrl: string;
}
```

**Estados del componente:**

```
idle → encrypting (animación 800ms) → encrypted → decrypting (animación 600ms) → decrypted → idle
```

---

### 3.2 Mapa de Red IPv6 — Especificación de Componente

**Propósito:** Mostrar la infraestructura dual-stack del portafolio como un diagrama de red interactivo, convirtiendo la configuración técnica de IPv6 en un argumento visual de modernidad y confiabilidad de infraestructura.

**Audiencia objetivo:** Tech leads y reclutadores (HU-05). Los PYMES que lleguen aquí verán la complejidad y la saltarán — eso es correcto.

**Elementos del diagrama:**

```
Internet
    │
    ├── [IPv4: 203.x.x.x] ──────────┐
    │                               │
    └── [IPv6: 2001:db8::1] ────────┤
                                    │
                              [Firewall UFW]
                              Reglas: 80/443/SSH
                              IPv4 + IPv6
                                    │
                              [Nginx / Caddy]
                              HSTS · CSP · HSTS
                                    │
                         [Portafolio estático /var/www]
                         HTML · CSS · JS (islands)
                                    │
                         ┌──────────┴──────────┐
                     [Let's Encrypt SSL]   [GitHub Actions]
                     Renovación automática  rsync over SSH
```

**Interactividad:** Cada nodo del diagrama es clickeable y muestra un tooltip con el comando real usado para configurarlo. Ejemplo: click en "Firewall UFW" muestra:

```bash
# Reglas de firewall aplicadas
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP → redirige a HTTPS
ufw allow 443/tcp   # HTTPS IPv4
ufw allow 443       # HTTPS IPv6 (dual-stack automático)
ufw enable
```

Esto convierte cada nodo del diagrama en documentación viva del proyecto de infraestructura.

**Implementación:** SVG estático generado en build time (Astro component), con tooltips en JavaScript puro (`client:visible`). No requiere librería de grafos.

---

## 4. Plan de Infraestructura — Hardening y Redes

### 4.1 Secuencia de Aprovisionamiento

El orden importa. Cada paso es un prerrequisito del siguiente y debe completarse y documentarse antes de continuar.

```
Paso 1 — Adquisición del VPS
    Proveedor recomendado: Vultr (1 vCPU, 1 GB RAM, Bandwidth 1TB, 32 GB NVMe SSD, IPv6/IPv4)
    Justificación: IPv6 habilitado por defecto, datacenter en Mexico con buena latencia
    a México, €3.79/mes. Alternativa: DigitalOcean Droplet Basic si se prefiere LATAM.
    Imagen base: Debian 12 (Bookworm) — LTS, estable, ampliamente documentado.

Paso 2 — Acceso inicial y hardening básico
    (ver 4.2)

Paso 3 — Configuración de red IPv6
    (ver 4.3)

Paso 4 — Instalación y configuración de Nginx
    (ver 4.4)

Paso 5 — Certificados SSL con Let's Encrypt
    (ver 4.5)

Paso 6 — Configuración de fail2ban
    (ver 4.6)

Paso 7 — Validación completa del entorno
    (ver 4.7)

Paso 8 — Primera ejecución del pipeline CI/CD
    (ADR-05)
```

---

### 4.2 Hardening Base del Servidor

```bash
# --- Como root, inmediatamente después del primer acceso ---

# 1. Actualizar el sistema
apt update && apt upgrade -y

# 2. Crear usuario deployer (no-root)
adduser deployer
usermod -aG sudo deployer

# 3. Configurar autenticación por llave SSH para deployer
mkdir -p /home/deployer/.ssh
chmod 700 /home/deployer/.ssh
# Copiar la clave pública Ed25519 generada localmente:
# cat ~/.ssh/id_ed25519.pub | ssh root@VPS_IP "cat >> /home/deployer/.ssh/authorized_keys"
chmod 600 /home/deployer/.ssh/authorized_keys
chown -R deployer:deployer /home/deployer/.ssh

# 4. Deshabilitar acceso root por SSH y autenticación por contraseña
nano /etc/ssh/sshd_config
# Modificar:
#   PermitRootLogin no
#   PasswordAuthentication no
#   PubkeyAuthentication yes
#   AuthorizedKeysFile .ssh/authorized_keys
systemctl restart sshd

# 5. Configurar UFW (firewall)
apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp      # SSH
ufw allow 80/tcp      # HTTP
ufw allow 443/tcp     # HTTPS
ufw allow 443/udp     # HTTP/3 (opcional, si Caddy/Nginx con QUIC)
ufw enable

# 6. Instalar herramientas esenciales
apt install -y git curl wget htop vim unzip
```

**Punto de documentación:** Al finalizar este paso, el portafolio debe mostrar en `/infraestructura#hardening` el output real de `ufw status verbose` con anotaciones de cada regla.

---

### 4.3 Configuración de Red IPv6 Dual-Stack

```bash
# Verificar que el VPS tiene IPv6 asignado (Hetzner: sí por defecto)
ip -6 addr show

# Debe mostrar una dirección como:
# inet6 2a01:4f8:xxxx:xxxx::1/64 scope global

# Verificar conectividad IPv6 hacia Internet
ping6 -c 4 2001:4860:4860::8888   # Google DNS IPv6

# Agregar reglas de firewall UFW para IPv6 (ya incluidas arriba, verificar)
ufw status verbose
# Debe mostrar "IPv6: active"

# Verificar desde exterior:
# curl -6 https://tudominio.com
# O usar: https://ipv6-test.com/validate.php?url=https://tudominio.com
```

**Configuración DNS requerida:**

| Tipo | Nombre | Valor |
|---|---|---|
| A | tudominio.com | [IPv4 del VPS] |
| AAAA | tudominio.com | [IPv6 del VPS] |
| A | www.tudominio.com | [IPv4 del VPS] |
| AAAA | www.tudominio.com | [IPv6 del VPS] |

Los registros AAAA son los que habilitan el acceso IPv6 desde el exterior. Sin ellos, la configuración IPv6 del servidor es invisible.

---

### 4.4 Configuración de Nginx con Security Headers

```nginx
# /etc/nginx/sites-available/portafolio

server {
    listen 80;
    listen [::]:80;                    # IPv6 explícito
    server_name tudominio.com www.tudominio.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;         # IPv6 con HTTP/2
    server_name tudominio.com www.tudominio.com;

    root /var/www/portafolio;
    index index.html;

    # SSL — configurado por Certbot (ver 4.5)
    ssl_certificate     /etc/letsencrypt/live/tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tudominio.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security Headers [RNF-14]
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    add_header Content-Security-Policy "
        default-src 'self';
        script-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https:;
        connect-src 'self' https://formspree.io;
        frame-ancestors 'none';
    " always;

    # Performance: Gzip
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;

    # Performance: Cache de assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback para rutas de Astro (archivos .html pre-generados)
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Custom 404
    error_page 404 /404.html;
}
```

**Verificación de headers:** Tras el despliegue, ejecutar:
```bash
curl -I https://tudominio.com
# Verificar presencia de todos los headers de seguridad
```
Herramienta adicional: [securityheaders.com](https://securityheaders.com) debe devolver grado A o A+.

---

### 4.5 Certificados SSL con Let's Encrypt + Certbot

```bash
# Instalación
apt install -y certbot python3-certbot-nginx

# Emisión del certificado (incluye configuración automática de Nginx)
certbot --nginx \
  -d tudominio.com \
  -d www.tudominio.com \
  --email tu@correo.com \
  --agree-tos \
  --no-eff-email

# Verificar renovación automática
systemctl status certbot.timer
# Debe estar activo. Certbot instala un systemd timer que verifica renovación 2x al día.

# Simular renovación para confirmar que funciona:
certbot renew --dry-run
```

**Documentación requerida para `/infraestructura#ssl`:** Incluir el output de `certbot certificates` con las fechas de emisión y expiración (redactar el email antes de publicar), y el resultado de `certbot renew --dry-run`.

---

### 4.6 Fail2ban — Protección contra Fuerza Bruta

```bash
# Instalación
apt install -y fail2ban

# Configuración
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime  = 3600       # Banear por 1 hora
findtime = 600        # Ventana de 10 minutos
maxretry = 5          # Máximo 5 intentos fallidos

[sshd]
enabled = true
port    = ssh
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true

[nginx-botsearch]
enabled  = true
port     = http,https
logpath  = /var/log/nginx/error.log
maxretry = 2
EOF

systemctl enable fail2ban
systemctl start fail2ban

# Verificar estado
fail2ban-client status
fail2ban-client status sshd
```

---

### 4.7 Checklist de Validación de Entorno

Antes del primer deploy de código front-end, todos los ítems deben estar en verde:

```
Infraestructura base
  [ ] VPS accesible por SSH con usuario no-root y llave Ed25519
  [ ] Acceso root por SSH deshabilitado
  [ ] UFW activo con reglas verificadas (ufw status verbose)
  [ ] fail2ban activo (fail2ban-client status)

Red y DNS
  [ ] Registro A del dominio apunta a IPv4 del VPS (dig A tudominio.com)
  [ ] Registro AAAA del dominio apunta a IPv6 del VPS (dig AAAA tudominio.com)
  [ ] Acceso IPv4 verificado: curl -4 https://tudominio.com
  [ ] Acceso IPv6 verificado: curl -6 https://tudominio.com
  [ ] ipv6-test.com reporta acceso dual-stack exitoso

SSL y Nginx
  [ ] Certificado válido (certbot certificates)
  [ ] Renovación automática verificada (certbot renew --dry-run)
  [ ] Redireccionamiento HTTP → HTTPS (curl -I http://tudominio.com)
  [ ] Todos los security headers presentes (curl -I https://tudominio.com)
  [ ] securityheaders.com: grado A o superior

CI/CD
  [ ] GitHub Actions secrets configurados (VPS_SSH_KEY, VPS_HOST, VPS_USER)
  [ ] Pipeline ejecutado con éxito en < 3 minutos
  [ ] rsync transfiere correctamente a /var/www/portafolio/
  [ ] nginx reload ejecutado por el pipeline sin errores

Performance
  [ ] Lighthouse Performance ≥ 95 en desktop
  [ ] Lighthouse Performance ≥ 90 en mobile
  [ ] LCP ≤ 2.5 s en simulación 4G
  [ ] Score Accessibility ≥ 95
```

---

## 5. Sistema de Diseño — Visual Language

### 5.1 Principio Rector

El diseño debe comunicar: *"Este desarrollador tiene criterio de ingeniero y sensibilidad de producto."* No es un portafolio de diseñador gráfico, pero tampoco un repositorio de GitHub con estilos por defecto. El punto de referencia es la interfaz de Xcode o iTerm2: oscuro, denso de información, pero completamente legible y sin ornamentos innecesarios.

---

### 5.2 Tipografía `[MOD-01]`

**Fuentes seleccionadas:**

| Rol | Fuente | Peso(s) | Uso |
|---|---|---|---|
| Display / Headings | **Instrument Serif** (Google Fonts) | 400, 400 italic | H1 del Hero, títulos de casos de estudio. Aporta carácter editorial sin perder seriedad técnica. |
| Body / UI | **Geist** (Vercel, Google Fonts) | 300, 400, 500 | Todo el texto de interfaz, párrafos, etiquetas, navegación. Diseñada específicamente para interfaces técnicas. |
| Código | **Geist Mono** | 400 | Snippets de código en casos de estudio y sección de infraestructura. Misma familia, coherencia visual. |

**Escala tipográfica:**

```
--text-xs:   0.75rem  / 12px  — Etiquetas, metadata, badges de stack
--text-sm:   0.875rem / 14px  — Subtítulos de tarjeta, texto secundario
--text-base: 1rem     / 16px  — Cuerpo de texto, párrafos
--text-lg:   1.125rem / 18px  — Descripción del Hero, resumen de proyecto
--text-xl:   1.25rem  / 20px  — Títulos de sección
--text-2xl:  1.5rem   / 24px  — Títulos de proyectos, H2
--text-4xl:  2.25rem  / 36px  — Hero heading (Instrument Serif)
--text-6xl:  3.75rem  / 60px  — Display en desktop (Instrument Serif, solo Hero)
```

**Carga de fuentes optimizada (evitar layout shift, RNF-03):**

```html
<!-- En <head> de Layout.astro -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500&family=Geist+Mono:wght@400&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

**Uso de `font-display: swap`** ya incluido en la URL de Google Fonts con `display=swap`. Previene texto invisible durante la carga.

---

### 5.3 Paleta de Color `[MOD-02]`

**Modo claro / oscuro:** El sistema soporta ambos modos con CSS custom properties. El modo oscuro es el predeterminado para audiencia técnica; se ofrece toggle.

```css
:root {
  /* Neutrales */
  --color-bg:          #FAFAFA;    /* Fondo principal — casi blanco, no blanco puro */
  --color-bg-subtle:   #F4F4F5;    /* Fondo de tarjetas y secciones */
  --color-bg-muted:    #E4E4E7;    /* Bordes, separadores */
  --color-text-primary:   #09090B; /* Texto principal */
  --color-text-secondary: #71717A; /* Texto secundario, metadata */
  --color-text-muted:     #A1A1AA; /* Placeholders, texto terciario */

  /* Acento primario — identidad del portafolio */
  --color-accent:         #1D4ED8; /* Azul índigo profundo */
  --color-accent-hover:   #1E40AF;
  --color-accent-subtle:  #DBEAFE; /* Fondo de badges de stack */
  --color-accent-text:    #1E40AF; /* Texto sobre fondo accent-subtle */

  /* WhatsApp — funcional, no de identidad [MOD-02] */
  --color-whatsapp:       #25D366;
  --color-whatsapp-hover: #1DAA52;
  --color-whatsapp-text:  #FFFFFF;

  /* Semánticos */
  --color-success: #16A34A;
  --color-error:   #DC2626;

  /* Tipografía */
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-body:    'Geist', system-ui, sans-serif;
  --font-mono:    'Geist Mono', 'Fira Code', monospace;
}

[data-theme="dark"] {
  --color-bg:          #09090B;
  --color-bg-subtle:   #18181B;
  --color-bg-muted:    #27272A;
  --color-text-primary:   #FAFAFA;
  --color-text-secondary: #A1A1AA;
  --color-text-muted:     #52525B;
  --color-accent:         #60A5FA; /* Azul más claro para oscuro */
  --color-accent-hover:   #93C5FD;
  --color-accent-subtle:  #1E3A5F;
  --color-accent-text:    #93C5FD;
}
```

**Regla de uso del color de acento:** `--color-accent` aparece en: links de navegación activos, CTA buttons, badges de tecnología, bordes de tarjeta en hover, y subrayados de énfasis. No aparece en fondos grandes, iconografía decorativa ni encabezados. El acento debe ser escaso — cuando aparece, el ojo lo encuentra de inmediato.

**Regla del verde WhatsApp:** `--color-whatsapp` aparece **exclusivamente** en el botón flotante de WhatsApp y en el botón de WhatsApp dentro del módulo de contacto. En ningún otro elemento del sitio.

---

### 5.4 Espaciado y Layout

```css
/* Escala de espaciado — múltiplos de 4px */
--space-1:  0.25rem  /*  4px */
--space-2:  0.5rem   /*  8px */
--space-3:  0.75rem  /* 12px */
--space-4:  1rem     /* 16px */
--space-6:  1.5rem   /* 24px */
--space-8:  2rem     /* 32px */
--space-12: 3rem     /* 48px */
--space-16: 4rem     /* 64px */
--space-24: 6rem     /* 96px */

/* Contenedor máximo */
--container-max:  1200px;
--container-prose: 720px;  /* Para texto de casos de estudio */

/* Border radius */
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
--radius-full: 9999px;   /* Pills de badges */
```

**Grid de proyectos:**
```css
/* Desktop: 3 columnas */
@media (min-width: 1024px) {
  grid-template-columns: repeat(3, 1fr);
}
/* Tablet: 2 columnas */
@media (min-width: 640px) {
  grid-template-columns: repeat(2, 1fr);
}
/* Mobile: 1 columna */
grid-template-columns: 1fr;
```

---

### 5.5 Componentes Core — Especificaciones

#### Tarjeta de Proyecto

```
┌────────────────────────────────────────────────────┐
│  [Imagen o preview del proyecto]                   │
│  Aspect ratio 16:9                                 │
├────────────────────────────────────────────────────┤
│                                                    │
│  [Badge: Web]  [Badge: C/C++]                      │
│                                                    │
│  Nombre del Proyecto                               │
│  Subtítulo orientado a beneficio de negocio        │
│                                                    │
│  [GitHub ↗]  [Demo ↗]          [Ver caso →]        │
└────────────────────────────────────────────────────┘
```

Estados: default → hover (elevación sutil, borde accent) → focused (ring de teclado visible).

#### Botón WhatsApp Flotante (Mobile)

```css
/* Posición fija, visible siempre */
position: fixed;
bottom: 1.5rem;
right: 1.5rem;
z-index: 50;

/* Tamaño mínimo táctil [HU-06] */
width: 56px;
height: 56px;
border-radius: var(--radius-full);
background: var(--color-whatsapp);

/* Sombra funcional para legibilidad sobre contenido */
box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
```

En desktop, el botón flotante se oculta (`display: none` en `@media (min-width: 1024px)`) y se muestra el botón de WhatsApp dentro del módulo de contacto.

#### Estructura de Caso de Estudio (Vista Detalle)

```
/proyectos/[slug]

┌── Breadcrumb: Inicio > Proyectos > [Nombre]
│
├── ENCABEZADO
│   ├── [Badge de categoría]
│   ├── Título del proyecto (Instrument Serif, text-4xl)
│   └── Stack: [Badge] [Badge] [Badge]
│
├── COMPONENTE INTERACTIVO (si aplica)
│   └── <RSASimulator /> o <IPv6Map />
│
├── ESTRUCTURA "CASO DE ESTUDIO"
│   ├── ## El Problema
│   │   └── Contexto + qué necesitaba resolverse
│   ├── ## La Solución
│   │   └── Qué se construyó + decisiones de diseño clave
│   │       + snippets de código relevantes
│   └── ## El Resultado
│       └── Métricas, logros, aprendizajes
│
├── LINKS
│   ├── [Ver código en GitHub ↗]
│   └── [Ver demo en vivo ↗] (si aplica)
│
└── NAVEGACIÓN ENTRE PROYECTOS
    ├── ← Proyecto anterior
    └── Siguiente proyecto →
```

---

## 6. Estimación de Esfuerzo — Desglose por Sprint

El desarrollo se divide en dos tracks paralelos: **Infraestructura** y **Front-end**. El track de infraestructura debe completarse antes de iniciar el deploy front-end, pero ambos pueden trabajarse en paralelo en las fases de desarrollo local.

| Sprint | Track | Tareas | Esfuerzo estimado |
|---|---|---|---|
| **S0 — Setup** | Infraestructura | Adquisición VPS, DNS, hardening base, UFW, fail2ban | 4–6 h |
| **S0 — Setup** | Front-end | Init Astro + Tailwind + Preact, estructura de carpetas, Content Collections schema | 2–3 h |
| **S1 — Core** | Infraestructura | Nginx config, SSL Let's Encrypt, security headers, IPv6 dual-stack | 4–6 h |
| **S1 — Core** | Front-end | Layout base, sistema de diseño (tokens CSS), Hero, navegación, footer | 6–8 h |
| **S2 — Contenido** | Front-end | Sección Servicios, Sección Sobre mí, 4 tarjetas de proyectos, filtro por categoría | 8–10 h |
| **S3 — Proyectos** | Front-end | Template caso de estudio, MDX proyectos escritos (RSA + IPv6 + 2 web) | 8–12 h |
| **S4 — Componentes** | Front-end | Simulador RSA (Preact), Mapa IPv6 (SVG interactivo), formulario de contacto, botón WhatsApp | 10–14 h |
| **S5 — Infra page** | Front-end | Página `/infraestructura` completa con documentación y diagrama de red | 6–8 h |
| **S6 — CI/CD** | Infraestructura | GitHub Actions pipeline (build → rsync → nginx reload), secrets, primera ejecución | 3–4 h |
| **S7 — QA** | Ambos | Lighthouse CI, pruebas cross-browser, validación IPv6, checklist RNF completo | 4–6 h |
| **Total estimado** | — | — | **55–77 h** |

**Recomendación de secuencia crítica:**
```
S0 (ambos) → S1 Infra → S1 Front → S2 → S3 → S4 → S5 → S6 → S7
```
El CI/CD se configura en S6 cuando ya existe contenido para deployar. Antes de S6, el deploy es manual vía rsync directo.

---

## 7. Próximos Pasos — Fase 3

1. **Inicio del Sprint S0:** Aprovisionamiento del VPS y configuración base documentada con screenshots. El primer artefacto de infraestructura es el output real de `ufw status verbose` y `ssh-keygen -t ed25519`.
2. **Wireframes de alta fidelidad:** Diseño en Figma o Penpot de: Hero, tarjeta de proyecto, vista de caso de estudio, página de infraestructura y módulo de contacto. Cada pantalla en mobile y desktop.
3. **Implementación del Simulador RSA:** El componente interactivo es el más complejo y debe prototipase de forma independiente antes de integrarlo en Astro.
4. **Definición de los 4 proyectos iniciales:** Redactar el contenido MDX de cada proyecto siguiendo la estructura Problema → Solución → Resultado antes de escribir una línea de front-end. El contenido define la arquitectura, no al revés.

---

*Documento generado como parte del proceso de ingeniería de software del portafolio profesional.*
*Autor: Gadiel · UADY Ingeniería de Software · TIDE Fellows 2024*
*Fase 2 v1.0 — Arquitectura de Software y Diseño de Sistemas*

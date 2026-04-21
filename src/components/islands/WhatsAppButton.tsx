// src/components/islands/WhatsAppButton.tsx
//
// Boton flotante de WhatsApp. Isla Preact hidratada con client:load.
//
// Cumple: RF-12, HU-03, HU-06
//
// Visible: siempre en mobile (< 1024px)
// Oculto: en desktop (>= 1024px) — en desktop el boton de WA esta en #contacto
//
// El CSS de visibilidad se maneja con @media en <style> para que funcione
// incluso antes de que Preact hidrate el componente (evita layout shift).
//
// PERSONALIZAR: modifica WHATSAPP_NUMBER y el mensaje.

const WHATSAPP_NUMBER = '+529992197979';
const WHATSAPP_MESSAGE = 'Hola Gadiel, vi tu portafolio y me interesa cotizar un proyecto para mi empresa.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function WhatsAppButton() {
  return (
    <>
      {/*
        El <style> dentro de una isla Preact se inyecta en el <head>.
        En Astro + Vite esto funciona correctamente.
        La alternativa es global.css, pero mantener los estilos del componente
        junto al componente mejora la mantenibilidad.
      */}
      <style>{`
        .whatsapp-float {
          /* Posicion fija — visible en cualquier punto del scroll */
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 50;

          /* Dimensiones — area tactil minima HU-06: >= 44x44px */
          width: 56px;
          height: 56px;
          border-radius: 9999px;

          /* Color funcional WhatsApp */
          background: #25D366;
          color: white;
          border: none;

          /* Layout interno */
          display: flex;
          align-items: center;
          justify-content: center;

          /* Interacciones */
          cursor: pointer;
          text-decoration: none;
          transition: background 150ms ease, transform 150ms ease;

          /*
            Sombra con tono verde — la sombra refuerza el color funcional
            y hace que el boton sea legible sobre cualquier fondo.
          */
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
        }

        .whatsapp-float:hover {
          background: #1DAA52;
          transform: scale(1.05);
        }

        .whatsapp-float:active {
          transform: scale(0.95);
        }

        /*
          En desktop (>= 1024px) el boton flotante desaparece.
          El boton de WhatsApp en el modulo de contacto (#contacto) lo reemplaza.
          Ocultar con display:none es correcto aqui porque el boton de contacto
          en la seccion #contacto TAMBIEN estara disponible en desktop.
        */
        @media (min-width: 1024px) {
          .whatsapp-float {
            display: none;
          }
        }

        /* Tooltip que aparece al hover en desktop
           (aunque el boton esta oculto, por si se muestra en algun breakpoint intermedio) */
        .whatsapp-float::before {
          content: 'WhatsApp';
          position: absolute;
          right: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
          background: #1C1C1E;
          color: white;
          font-family: system-ui, sans-serif;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 6px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 150ms ease;
        }

        .whatsapp-float:hover::before {
          opacity: 1;
        }
      `}</style>

      <a
        href={WHATSAPP_URL}
        class="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        /*
          aria-label descriptivo — lectores de pantalla anuncian la accion completa.
          No uses solo "WhatsApp" como label — describe la accion.
        */
        aria-label="Contactar por WhatsApp (abre en nueva pestana)"
        title="Contactar por WhatsApp"
      >
        {/* Icono de WhatsApp — aria-hidden porque el aria-label del <a> lo cubre */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </>
  );
}

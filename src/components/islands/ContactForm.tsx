import { useState } from 'preact/hooks';

import {
  contactProjectTypes,
  createContactPayload,
  type ContactFormErrors,
  type ContactFormValues,
  type ContactProjectType,
  validateContactForm,
} from '../../lib/contact-form';

const CONTACT_ENDPOINT =
  import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT?.trim() ?? '';
const WHATSAPP_NUMBER = '+529992197979';
const WHATSAPP_MESSAGE =
  'Hola Gadiel, intenté enviarte el formulario de contacto y quiero continuar por WhatsApp.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const projectTypeLabels: Record<ContactProjectType, string> = {
  'sitio-web': 'Sitio web para negocio',
  'landing-page': 'Landing page',
  portafolio: 'Portafolio profesional',
  'mejora-tecnica': 'Mejora técnica',
  otro: 'Otro',
};

const initialValues: ContactFormValues = {
  name: '',
  company: '',
  email: '',
  projectType: '',
  message: '',
  website: '',
};

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  function updateField<K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K]
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    if (field === 'email' || field === 'message') {
      setErrors((current) => {
        const next = { ...current };
        delete next[field as 'email' | 'message'];
        return next;
      });
    }

    if (submissionState !== 'idle') {
      setSubmissionState('idle');
      setFeedbackMessage('');
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();

    const validation = validateContactForm(values);
    setErrors(validation.errors);

    if (validation.isSpam) {
      setErrors({});
      setSubmissionState('success');
      setFeedbackMessage(
        'Gracias. Recibí tu mensaje.'
      );
      setValues(initialValues);
      return;
    }

    if (!validation.isValid) {
      setSubmissionState('error');
      setFeedbackMessage(
        'Revisa los campos marcados e inténtalo de nuevo.'
      );
      return;
    }

    if (!CONTACT_ENDPOINT) {
      setSubmissionState('error');
      setFeedbackMessage(
        'El formulario aún no está conectado en este entorno. Puedes escribirme por WhatsApp o por correo mientras termino esa configuración.'
      );
      return;
    }

    setSubmissionState('submitting');
    setFeedbackMessage('Enviando tu mensaje...');

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...createContactPayload(validation.values),
          _subject: 'Nueva consulta desde el portafolio',
          _replyto: validation.values.email,
          _gotcha: validation.values.website,
        }),
      });

      const responseBody = await response.json().catch(() => null);

      if (!response.ok) {
        const providerError =
          responseBody?.errors?.[0]?.message ??
          'No pude enviar el formulario en este momento.';
        throw new Error(providerError);
      }

      setValues(initialValues);
      setErrors({});
      setSubmissionState('success');
      setFeedbackMessage(
        'Mensaje enviado. Si todo va bien, te responderé por correo muy pronto.'
      );
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'No pude enviar el formulario en este momento.';

      setSubmissionState('error');
      setFeedbackMessage(
        `${message} Si quieres avanzar hoy, escríbeme por WhatsApp.`
      );
    }
  }

  return (
    <>
      <style>{`
        .contact-form-shell {
          display: grid;
          gap: var(--space-6);
          padding: var(--space-8);
          border: 1px solid var(--color-bg-muted);
          border-radius: var(--radius-lg);
          background: var(--color-bg-subtle);
        }

        .contact-form-header,
        .contact-form,
        .contact-form-fieldset,
        .contact-form-actions,
        .contact-form-note {
          display: grid;
          gap: var(--space-4);
        }

        .contact-form-label,
        .contact-form-note-label {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-secondary);
        }

        .contact-form-title {
          font-size: var(--text-2xl);
          line-height: 1.15;
          color: var(--color-text-primary);
        }

        .contact-form-intro,
        .contact-form-note-copy {
          line-height: 1.8;
          color: var(--color-text-secondary);
        }

        .contact-form-grid {
          display: grid;
          gap: var(--space-4);
        }

        .contact-form-field {
          display: grid;
          gap: var(--space-2);
        }

        .contact-form-field label {
          font-size: var(--text-sm);
          color: var(--color-text-primary);
        }

        .contact-form-input,
        .contact-form-select,
        .contact-form-textarea {
          width: 100%;
          border: 1px solid var(--color-bg-muted);
          border-radius: var(--radius-md);
          background: var(--color-bg);
          color: var(--color-text-primary);
          font: inherit;
          padding: var(--space-3) var(--space-4);
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }

        .contact-form-input:focus,
        .contact-form-select:focus,
        .contact-form-textarea:focus {
          outline: none;
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 18%, transparent);
        }

        .contact-form-textarea {
          min-height: 160px;
          resize: vertical;
        }

        .contact-form-input[aria-invalid="true"],
        .contact-form-textarea[aria-invalid="true"] {
          border-color: var(--color-error);
        }

        .contact-form-error {
          font-size: var(--text-sm);
          color: var(--color-error);
        }

        .contact-form-actions {
          gap: var(--space-3);
        }

        .contact-form-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: var(--space-3) var(--space-6);
          border: none;
          border-radius: var(--radius-md);
          background: var(--color-accent);
          color: var(--color-accent-contrast);
          font: inherit;
          font-size: var(--text-sm);
          font-weight: 500;
          cursor: pointer;
          transition: transform 150ms ease, background 150ms ease;
        }

        .contact-form-submit:hover:not(:disabled) {
          background: var(--color-accent-hover);
          transform: translateY(-1px);
        }

        .contact-form-submit:disabled {
          cursor: wait;
          opacity: 0.75;
        }

        .contact-form-status {
          font-size: var(--text-sm);
          line-height: 1.75;
          color: var(--color-text-secondary);
        }

        .contact-form-status--success {
          color: var(--color-success);
        }

        .contact-form-status--error {
          color: var(--color-error);
        }

        .contact-form-fallback {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .contact-form-honeypot {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .contact-form-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .contact-form-field--full {
            grid-column: 1 / -1;
          }

          .contact-form-actions {
            grid-template-columns: auto 1fr;
            align-items: center;
          }
        }
      `}</style>

      <div class="contact-form-shell">
        <div class="contact-form-header">
          <p class="contact-form-label">Formulario</p>
          <h3 class="contact-form-title">Déjame tu mensaje sin salir del sitio.</h3>
          <p class="contact-form-intro">
            Correo y mensaje son obligatorios. Si prefieres ir directo, WhatsApp
            sigue disponible arriba como canal rápido.
          </p>
        </div>

        <form
          class="contact-form"
          method="POST"
          action={CONTACT_ENDPOINT || undefined}
          noValidate
          onSubmit={handleSubmit}
        >
          <div class="contact-form-honeypot" aria-hidden="true">
            <label htmlFor="contact-website">No llenes este campo</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              autoComplete="off"
              tabIndex={-1}
              value={values.website}
              onInput={(event) =>
                updateField(
                  'website',
                  (event.currentTarget as HTMLInputElement).value
                )
              }
            />
          </div>

          <div class="contact-form-grid">
            <div class="contact-form-field">
              <label htmlFor="contact-name">Nombre</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                class="contact-form-input"
                autoComplete="name"
                value={values.name}
                onInput={(event) =>
                  updateField(
                    'name',
                    (event.currentTarget as HTMLInputElement).value
                  )
                }
              />
            </div>

            <div class="contact-form-field">
              <label htmlFor="contact-company">Empresa</label>
              <input
                id="contact-company"
                name="company"
                type="text"
                class="contact-form-input"
                autoComplete="organization"
                value={values.company}
                onInput={(event) =>
                  updateField(
                    'company',
                    (event.currentTarget as HTMLInputElement).value
                  )
                }
              />
            </div>

            <div class="contact-form-field">
              <label htmlFor="contact-email">Correo electrónico</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                class="contact-form-input"
                autoComplete="email"
                value={values.email}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                onInput={(event) =>
                  updateField(
                    'email',
                    (event.currentTarget as HTMLInputElement).value
                  )
                }
              />
              {errors.email && (
                <p id="contact-email-error" class="contact-form-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div class="contact-form-field">
              <label htmlFor="contact-project-type">Tipo de proyecto</label>
              <select
                id="contact-project-type"
                name="projectType"
                class="contact-form-select"
                value={values.projectType}
                onChange={(event) =>
                  updateField(
                    'projectType',
                    (event.currentTarget as HTMLSelectElement).value as
                      | ContactProjectType
                      | ''
                  )
                }
              >
                <option value="">Selecciona una opción</option>
                {contactProjectTypes.map((projectType) => (
                  <option key={projectType} value={projectType}>
                    {projectTypeLabels[projectType]}
                  </option>
                ))}
              </select>
            </div>

            <div class="contact-form-field contact-form-field--full">
              <label htmlFor="contact-message">Mensaje</label>
              <textarea
                id="contact-message"
                name="message"
                class="contact-form-textarea"
                value={values.message}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={
                  errors.message ? 'contact-message-error' : undefined
                }
                onInput={(event) =>
                  updateField(
                    'message',
                    (event.currentTarget as HTMLTextAreaElement).value
                  )
                }
              />
              {errors.message && (
                <p id="contact-message-error" class="contact-form-error">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          <div class="contact-form-actions">
            <button
              type="submit"
              class="contact-form-submit"
              disabled={submissionState === 'submitting'}
            >
              {submissionState === 'submitting'
                ? 'Enviando...'
                : 'Enviar mensaje'}
            </button>

            {feedbackMessage && (
              <p
                class={`contact-form-status contact-form-status--${submissionState}`}
                role={submissionState === 'error' ? 'alert' : 'status'}
              >
                {feedbackMessage}
              </p>
            )}
          </div>
        </form>

        <div class="contact-form-note">
          <p class="contact-form-note-label">Fallback</p>
          <p class="contact-form-note-copy">
            Si el formulario falla o aún no está configurado en este entorno,
            puedes continuar por{' '}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{' '}
            o por correo sin perder el contexto del proyecto.
          </p>
        </div>
      </div>
    </>
  );
}

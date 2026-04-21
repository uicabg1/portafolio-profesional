export const contactProjectTypes = [
  'sitio-web',
  'landing-page',
  'portafolio',
  'mejora-tecnica',
  'otro',
] as const;

export type ContactProjectType = (typeof contactProjectTypes)[number];

export type ContactFormValues = {
  name: string;
  company: string;
  email: string;
  projectType: ContactProjectType | '';
  message: string;
  website: string;
};

export type ContactFormErrors = Partial<
  Record<'email' | 'message', string>
>;

export type ContactFormValidation = {
  values: ContactFormValues;
  errors: ContactFormErrors;
  isValid: boolean;
  isSpam: boolean;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeContactValues(values: ContactFormValues): ContactFormValues {
  return {
    name: values.name.trim(),
    company: values.company.trim(),
    email: values.email.trim().toLowerCase(),
    projectType: values.projectType,
    message: values.message.trim(),
    website: values.website.trim(),
  };
}

export function validateContactForm(values: ContactFormValues): ContactFormValidation {
  const normalized = normalizeContactValues(values);
  const errors: ContactFormErrors = {};
  const isSpam = normalized.website.length > 0;

  if (!normalized.email || !emailPattern.test(normalized.email)) {
    errors.email = 'Ingresa un correo válido.';
  }

  if (!normalized.message) {
    errors.message = 'Cuéntame brevemente qué necesitas.';
  }

  return {
    values: normalized,
    errors,
    isValid: !isSpam && Object.keys(errors).length === 0,
    isSpam,
  };
}

export function createContactPayload(values: ContactFormValues): Record<string, string> {
  const normalized = normalizeContactValues(values);

  return {
    nombre: normalized.name,
    empresa: normalized.company || 'No especificada',
    email: normalized.email,
    tipoProyecto: normalized.projectType || 'No especificado',
    mensaje: normalized.message,
  };
}

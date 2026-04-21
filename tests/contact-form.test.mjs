import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createContactPayload,
  validateContactForm,
} from '../src/lib/contact-form.ts';

test('validateContactForm trims values and accepts a valid submission', () => {
  const result = validateContactForm({
    name: '  Gadiel Uicab  ',
    company: '  UADY  ',
    email: '  gadiel@example.com  ',
    projectType: 'sitio-web',
    message: '  Necesito una landing para mi negocio.  ',
    website: '',
  });

  assert.equal(result.isValid, true);
  assert.equal(result.isSpam, false);
  assert.deepEqual(result.errors, {});
  assert.equal(result.values.name, 'Gadiel Uicab');
  assert.equal(result.values.company, 'UADY');
  assert.equal(result.values.email, 'gadiel@example.com');
  assert.equal(result.values.message, 'Necesito una landing para mi negocio.');
});

test('validateContactForm reports inline errors for invalid email and empty message', () => {
  const result = validateContactForm({
    name: '',
    company: '',
    email: 'correo-invalido',
    projectType: '',
    message: '   ',
    website: '',
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.email, 'Ingresa un correo válido.');
  assert.equal(result.errors.message, 'Cuéntame brevemente qué necesitas.');
});

test('validateContactForm flags honeypot submissions as spam', () => {
  const result = validateContactForm({
    name: 'Bot',
    company: '',
    email: 'bot@example.com',
    projectType: 'otro',
    message: 'Mensaje automatizado',
    website: 'https://spam.example.com',
  });

  assert.equal(result.isValid, false);
  assert.equal(result.isSpam, true);
});

test('createContactPayload returns a provider-friendly record', () => {
  const payload = createContactPayload({
    name: 'Gadiel Uicab',
    company: '',
    email: 'gadiel@example.com',
    projectType: '',
    message: 'Quiero una página profesional.',
    website: '',
  });

  assert.equal(payload.nombre, 'Gadiel Uicab');
  assert.equal(payload.empresa, 'No especificada');
  assert.equal(payload.email, 'gadiel@example.com');
  assert.equal(payload.tipoProyecto, 'No especificado');
  assert.equal(payload.mensaje, 'Quiero una página profesional.');
});

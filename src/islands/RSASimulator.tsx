import { useMemo, useState } from 'preact/hooks';

type Preset = {
  label: string;
  p: string;
  q: string;
  e: string;
  message: string;
};

const presets: Preset[] = [
  { label: 'Demo clásica', p: '61', q: '53', e: '17', message: '65' },
  { label: 'Par compacto', p: '17', q: '23', e: '3', message: '42' },
  { label: 'Segmento de prueba', p: '29', q: '31', e: '11', message: '77' },
];

function gcd(a: bigint, b: bigint): bigint {
  let x = a;
  let y = b;
  while (y !== 0n) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
  let result = 1n;
  let currentBase = base % modulus;
  let currentExponent = exponent;

  while (currentExponent > 0n) {
    if (currentExponent % 2n === 1n) {
      result = (result * currentBase) % modulus;
    }
    currentBase = (currentBase * currentBase) % modulus;
    currentExponent /= 2n;
  }

  return result;
}

function modInverse(value: bigint, modulus: bigint): bigint {
  let oldR = value;
  let remainder = modulus;
  let oldS = 1n;
  let s = 0n;

  while (remainder !== 0n) {
    const quotient = oldR / remainder;

    [oldR, remainder] = [remainder, oldR - quotient * remainder];
    [oldS, s] = [s, oldS - quotient * s];
  }

  return ((oldS % modulus) + modulus) % modulus;
}

function isPrime(value: number): boolean {
  if (!Number.isInteger(value) || value < 2) return false;
  if (value === 2) return true;
  if (value % 2 === 0) return false;

  const limit = Math.floor(Math.sqrt(value));
  for (let candidate = 3; candidate <= limit; candidate += 2) {
    if (value % candidate === 0) return false;
  }

  return true;
}

function parseInteger(input: string): number | null {
  const value = Number(input);
  if (!Number.isInteger(value)) return null;
  return value;
}

function analyzeRsaInputs(
  pInput: string,
  qInput: string,
  eInput: string,
  messageInput: string
) {
  const errors: string[] = [];

  const pNumber = parseInteger(pInput);
  const qNumber = parseInteger(qInput);
  const eNumber = parseInteger(eInput);
  const messageNumber = parseInteger(messageInput);

  if (pNumber === null || !isPrime(pNumber)) {
    errors.push('p debe ser un número primo entero.');
  }

  if (qNumber === null || !isPrime(qNumber)) {
    errors.push('q debe ser un número primo entero.');
  }

  if (pNumber !== null && qNumber !== null && pNumber === qNumber) {
    errors.push('p y q deben ser distintos para evitar una clave débil.');
  }

  if (eNumber === null || eNumber < 3) {
    errors.push('e debe ser un entero mayor o igual a 3.');
  }

  if (messageNumber === null || messageNumber < 0) {
    errors.push('El mensaje debe ser un entero positivo o cero.');
  }

  if (errors.length > 0 || pNumber === null || qNumber === null || eNumber === null || messageNumber === null) {
    return { errors, values: null };
  }

  const p = BigInt(pNumber);
  const q = BigInt(qNumber);
  const e = BigInt(eNumber);
  const message = BigInt(messageNumber);
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);

  if (e >= phi) {
    errors.push('e debe ser menor que phi(n) para construir una clave válida.');
  }

  if (gcd(e, phi) !== 1n) {
    errors.push('e debe ser coprimo con phi(n).');
  }

  if (message >= n) {
    errors.push('El mensaje debe ser menor que n para cifrar dentro del espacio modular.');
  }

  if (errors.length > 0) {
    return { errors, values: null };
  }

  const d = modInverse(e, phi);
  const ciphertext = modPow(message, e, n);
  const decrypted = modPow(ciphertext, d, n);

  return {
    errors,
    values: {
      p,
      q,
      e,
      d,
      n,
      phi,
      message,
      ciphertext,
      decrypted,
    },
  };
}

export default function RSASimulator() {
  const [pInput, setPInput] = useState(presets[0].p);
  const [qInput, setQInput] = useState(presets[0].q);
  const [eInput, setEInput] = useState(presets[0].e);
  const [messageInput, setMessageInput] = useState(presets[0].message);

  const analysis = useMemo(
    () => analyzeRsaInputs(pInput, qInput, eInput, messageInput),
    [pInput, qInput, eInput, messageInput]
  );

  const applyPreset = (preset: Preset) => {
    setPInput(preset.p);
    setQInput(preset.q);
    setEInput(preset.e);
    setMessageInput(preset.message);
  };

  return (
    <>
      <style>{`
        .rsa-shell {
          display: grid;
          gap: 1.5rem;
        }

        .rsa-presets {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .rsa-preset {
          border: 1px solid var(--color-bg-muted);
          border-radius: var(--radius-full);
          background: var(--color-bg);
          color: var(--color-text-secondary);
          padding: 0.55rem 0.95rem;
          cursor: pointer;
          transition: border-color 180ms ease, color 180ms ease, transform 180ms ease;
        }

        .rsa-preset:hover {
          border-color: var(--color-accent);
          color: var(--color-text-primary);
          transform: translateY(-1px);
        }

        .rsa-controls {
          display: grid;
          gap: 1rem;
        }

        .rsa-field {
          display: grid;
          gap: 0.45rem;
        }

        .rsa-field label {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-secondary);
        }

        .rsa-field input {
          width: 100%;
          border: 1px solid var(--color-bg-muted);
          border-radius: var(--radius-md);
          background: var(--color-bg);
          color: var(--color-text-primary);
          padding: 0.85rem 1rem;
          font: inherit;
        }

        .rsa-field small {
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        .rsa-errors {
          display: grid;
          gap: 0.65rem;
          border: 1px solid rgba(220, 38, 38, 0.25);
          border-radius: var(--radius-md);
          background: color-mix(in srgb, var(--color-error) 10%, var(--color-bg) 90%);
          padding: 1rem 1.1rem;
          color: var(--color-text-primary);
        }

        .rsa-errors strong {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
        }

        .rsa-errors ul {
          margin: 0;
          padding-left: 1.2rem;
          display: grid;
          gap: 0.45rem;
        }

        .rsa-output {
          display: grid;
          gap: 1rem;
        }

        .rsa-stats {
          display: grid;
          gap: 1rem;
        }

        .rsa-stat {
          border: 1px solid var(--color-bg-muted);
          border-radius: var(--radius-md);
          background: var(--color-bg);
          padding: 1rem;
          display: grid;
          gap: 0.35rem;
        }

        .rsa-stat span {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-secondary);
        }

        .rsa-stat strong {
          color: var(--color-text-primary);
          font-size: var(--text-base);
          word-break: break-word;
        }

        .rsa-flow {
          display: grid;
          gap: 1rem;
        }

        .rsa-step {
          border: 1px solid var(--color-bg-muted);
          border-radius: var(--radius-md);
          background: var(--color-bg);
          padding: 1rem;
          display: grid;
          gap: 0.5rem;
        }

        .rsa-step h3 {
          margin: 0;
          font-size: var(--text-sm);
          font-family: var(--font-mono);
          color: var(--color-text-primary);
        }

        .rsa-step p {
          margin: 0;
          color: var(--color-text-secondary);
          line-height: 1.7;
        }

        .rsa-formula {
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          background: var(--color-bg-subtle);
          color: var(--color-text-primary);
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          overflow-x: auto;
        }

        @media (min-width: 768px) {
          .rsa-controls {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .rsa-stats {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .rsa-flow {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>

      <div class="rsa-shell">
        <div class="rsa-presets" role="list" aria-label="Escenarios de ejemplo">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              class="rsa-preset"
              onClick={() => applyPreset(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div class="rsa-controls">
          <div class="rsa-field">
            <label htmlFor="rsa-p">Primo p</label>
            <input
              id="rsa-p"
              type="number"
              min="2"
              value={pInput}
              onInput={(event) => setPInput(event.currentTarget.value)}
            />
            <small>Usa primos pequeños para seguir el flujo sin perder legibilidad.</small>
          </div>

          <div class="rsa-field">
            <label htmlFor="rsa-q">Primo q</label>
            <input
              id="rsa-q"
              type="number"
              min="2"
              value={qInput}
              onInput={(event) => setQInput(event.currentTarget.value)}
            />
            <small>La separación entre p y q evita claves triviales en esta demostración.</small>
          </div>

          <div class="rsa-field">
            <label htmlFor="rsa-e">Exponente público e</label>
            <input
              id="rsa-e"
              type="number"
              min="3"
              value={eInput}
              onInput={(event) => setEInput(event.currentTarget.value)}
            />
            <small>Debe ser coprimo con phi(n) para que exista inverso modular.</small>
          </div>

          <div class="rsa-field">
            <label htmlFor="rsa-message">Mensaje m</label>
            <input
              id="rsa-message"
              type="number"
              min="0"
              value={messageInput}
              onInput={(event) => setMessageInput(event.currentTarget.value)}
            />
            <small>El mensaje debe quedar dentro del espacio modular: `0 ≤ m {'<'} n`.</small>
          </div>
        </div>

        {analysis.errors.length > 0 ? (
          <div class="rsa-errors" role="alert">
            <strong>La configuración actual no produce una clave válida.</strong>
            <ul>
              {analysis.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div class="rsa-output">
            <div class="rsa-stats">
              <div class="rsa-stat">
                <span>n = p × q</span>
                <strong>{analysis.values?.n.toString()}</strong>
              </div>
              <div class="rsa-stat">
                <span>phi(n)</span>
                <strong>{analysis.values?.phi.toString()}</strong>
              </div>
              <div class="rsa-stat">
                <span>Clave pública</span>
                <strong>{analysis.values?.e.toString()}</strong>
              </div>
              <div class="rsa-stat">
                <span>Clave privada</span>
                <strong>{analysis.values?.d.toString()}</strong>
              </div>
            </div>

            <div class="rsa-flow">
              <article class="rsa-step">
                <h3>Generación de claves</h3>
                <p>
                  A partir de `p` y `q` se calcula `n`, luego `phi(n)`, y finalmente el inverso
                  modular de `e` para obtener `d`.
                </p>
                <div class="rsa-formula">
                  d ≡ e^-1 mod phi(n) = {analysis.values?.d.toString()}
                </div>
              </article>

              <article class="rsa-step">
                <h3>Cifrado</h3>
                <p>El mensaje se cifra con la clave pública usando exponenciación modular rápida.</p>
                <div class="rsa-formula">
                  c = m^e mod n = {analysis.values?.ciphertext.toString()}
                </div>
              </article>

              <article class="rsa-step">
                <h3>Descifrado</h3>
                <p>La clave privada recupera el mensaje original dentro del mismo dominio modular.</p>
                <div class="rsa-formula">
                  m = c^d mod n = {analysis.values?.decrypted.toString()}
                </div>
              </article>

              <article class="rsa-step">
                <h3>Validación</h3>
                <p>
                  La demostración confirma que el mensaje original y el descifrado coinciden bajo la
                  configuración actual.
                </p>
                <div class="rsa-formula">
                  {analysis.values?.message.toString()} = {analysis.values?.decrypted.toString()}
                </div>
              </article>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

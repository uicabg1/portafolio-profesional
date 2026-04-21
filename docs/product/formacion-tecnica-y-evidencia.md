# Formación técnica y evidencia

## Propósito

Definir qué formación técnica puede comunicarse hoy en el portafolio, qué parte está en progreso y cómo se conecta con la infraestructura real planificada del proyecto.

Este documento complementa:

- [requisitos.md](requisitos.md)
- [backlog.md](backlog.md)
- [../operations/deployment-vps.md](../operations/deployment-vps.md)

## Estado canónico

La formación de LACNIC/TIDE se comunica como **capacidad en progreso con evidencia**.

Eso implica:

- sí puede usarse para respaldar criterio técnico y dirección de aprendizaje
- no debe presentarse como especialización cerrada si el curso aún no termina
- no debe convertirse en oferta comercial activa sin aplicación real documentada

## Evidencia disponible en el repositorio

### Certificación obtenida

- LACNIC IPv6 básico
  Evidencia: [Certificado](<../TIDE Fellows/Introducción IPv6/Certificado.pdf>)

### Formación en progreso

- IPv6 avanzado
  Evidencia base:
  - [Temario](<../TIDE Fellows/IPv6 Avanzado/Temario - IPv6 Avanzado.pdf>)
  - [Material M1](<../TIDE Fellows/IPv6 Avanzado/Material de descarga -IPv6Av2019_M1.pdf>)
  - [Material M2](<../TIDE Fellows/IPv6 Avanzado/Material de descarga -IPv6Av2019_M2.pdf>)
- Introducción a gestión de redes
  Evidencia base:
  - [Temario](<../TIDE Fellows/Introducción a Gestión de Redes/Temario-Gestion-de-Redes.pdf>)
  - [Material M1](<../TIDE Fellows/Introducción a Gestión de Redes/Lacnic - Curso Network Management - M1.pdf>)
  - [Material M2](<../TIDE Fellows/Introducción a Gestión de Redes/Lacnic - Curso Network Management - M2_C.pdf>)

### Material de estudio usado como respaldo conceptual

- [IPv6 M1 - Introducción y situación actual](<../TIDE Fellows/Introducción IPv6/M1 - Introducción a IPv6 y situación actual_2024.pdf>)
- [IPv6 M2 - Direccionamiento](<../TIDE Fellows/Introducción IPv6/M2 - Direccionamiento.pdf>)
- [IPv6 M3 - Autoconfiguración](<../TIDE Fellows/Introducción IPv6/M3 - Autoconfiguración IPv6.pdf>)
- [IPv6 M4 - Mecanismos de transición](<../TIDE Fellows/Introducción IPv6/M4 -Mecanismos de transición.pdf>)

## Qué se puede afirmar hoy

- Existe formación formal en IPv6 respaldada por una certificación básica ya obtenida.
- Existe formación en progreso en IPv6 avanzado y gestión de redes.
- El portafolio ya traduce parte de ese aprendizaje a proyectos, narrativa de infraestructura y criterio operativo.
- Hay interés técnico sostenido en Linux, despliegue, direccionamiento, transición IPv4/IPv6, observabilidad y operación.

## Qué no debe afirmarse hoy

- Especialización cerrada en IPv6 avanzado.
- Experiencia profesional consolidada como operador NOC.
- Oferta comercial activa de hosting propio o despliegue administrado.
- Administración de servidores en producción como servicio ya validado si aún no existe el VPS real del portafolio.

## Aplicación prevista al portafolio

El aprendizaje de LACNIC/TIDE no queda solo como formación teórica. Su aplicación prevista dentro del proyecto es esta:

1. Cerrar Sprint 4 y adquirir un VPS real.
2. Usar el plan más económico de DigitalOcean, aprovechando el crédito de GitHub for Students.
3. Configurar el servidor con:
   - acceso SSH por llave
   - usuario no-root
   - hardening base
   - firewall
   - Nginx
   - HTTPS con Let's Encrypt
   - conectividad dual-stack IPv4/IPv6
4. Documentar ese proceso como caso de estudio real de infraestructura.
5. Usar esa evidencia para habilitar comercialmente servicios complementarios de servidor.

## Servicios habilitados después de Sprint 4

Una vez que exista infraestructura real y documentada, el portafolio podrá comunicar como complemento:

- despliegue técnico administrado
- hosting propio en VPS
- sitios web con setup técnico sólido

Hasta entonces, esa capa debe leerse como hoja de ruta respaldada por evidencia, no como oferta comercial activa.

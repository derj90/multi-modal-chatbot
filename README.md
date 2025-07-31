# AcompañaUMCE - Chat con Adjuntos

Este repositorio es un prototipo de la plataforma **AcompañaUMCE**, pensada como apoyo para estudiantes, docentes y el equipo UDFV de la UMCE. La aplicación está construida con **Next.js** y utiliza el **Vercel AI SDK** para ofrecer un chatbot capaz de recibir y mostrar archivos de texto e imágenes.

## Características principales

- **Inicio de sesión** en `/login` con verificación del dominio `@umce.cl` y una lista temporal de cuentas autorizadas.
- **Chat multi-modal** que permite enviar mensajes y adjuntar archivos (imágenes o texto) al asistente.
- **API** en `app/api/chat/route.ts` que envía las conversaciones a OpenAI.

## Requisitos

1. Node.js 18 o superior.
2. Crear un archivo `.env` a partir de `.env.example` y definir la variable `OPENAI_API_KEY` con tu clave de OpenAI.

## Instalación y uso

```bash
npm install
npm run dev
```

Visita `http://localhost:3000/login` para comenzar la sesión y acceder al chat.

### Comandos útiles

- `npm run lint`: ejecuta ESLint para verificar la calidad del código.

## Estructura de carpetas destacada

- `app/login/page.tsx` – Página de inicio de sesión.
- `authorized-users.json` – Lista temporal de usuarios permitidos.
- `app/(preview)/page.tsx` – Interfaz del chat con soporte de archivos.
- `app/api/chat/route.ts` – Ruta API que se comunica con OpenAI.

## Licencia

Este proyecto se publica bajo la licencia Apache 2.0 incluida en el archivo `LICENSE`.

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fakestoreapi.com"],
  },
  i18n: {
    // Agregamos el listado de lenguages que vamos a soportar
    locales: ["en-US", "es-ES", "pt-BR"],
    // // Elegimos el valor por default cuando accedemos a una ruta que no tenga fijada el valor del locale
    defaultLocale: "es-ES",
  },
};

module.exports = nextConfig;

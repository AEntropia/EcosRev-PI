/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilitar modo standalone para Docker
  output: "standalone",

  // Configurações adicionais se necessário
  reactStrictMode: true,

  // Configurações de ambiente
  env: {
    // Variáveis de ambiente para o frontend
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  },

  // Configurações de redirecionamento e reescrita, se necessário
  async redirects() {
    return [
      // Exemplo de redirecionamento
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ];
  },

  // Configurações de webpack, se necessário
  webpack: (config, { isServer }) => {
    // Configurações personalizadas de webpack
    return config;
  },
};

export default nextConfig;

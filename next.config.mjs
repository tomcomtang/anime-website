/** @type {import('next').NextConfig} */
const nextConfig = {
  // 配置Next.js生成静态输出
  output: 'export',
  
  // 禁用ESLint检查，加速构建
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 禁用TypeScript类型检查，加速构建
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 静态导出时需要禁用图片优化
  images: {
    unoptimized: true,
    domains: ['s4.anilist.co', 'img1.ak.crunchyroll.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img1.ak.crunchyroll.com',
        pathname: '/**',
      },
    ],
  },
  
  // 设置基础路径为根目录
  basePath: '',
  
  // 禁用源映射以加速构建
  productionBrowserSourceMaps: false,
};

export default nextConfig;

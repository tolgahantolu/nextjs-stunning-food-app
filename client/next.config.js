/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",

  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    console.log(webpack.version);
    console.log(defaultLoaders.babel);
    console.log(dev);
    //config.module.rules.push({
    //	test: /\.(ts|tsx|js|jsx)/,
    //	use: [
    //		defaultLoaders.babel,
    //		{
    //			loader: 'babel-loader',
    //			options: {
    //				presets: ['@babel/preset-env', '@babel/preset-react'],
    //			},
    //		},
    //	],
    //});
    return config;
  },
};

module.exports = nextConfig;

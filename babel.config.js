module.exports = (api) => {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            edge: '17',
            firefox: '60',
            chrome: '67',
            safari: '11.1',
          },
          useBuiltIns: 'usage',
          modules: process.env.modules === 'esm' ? false : 'cjs',
        },
      ],
      ['@babel/preset-react'],
    ],
  }
}

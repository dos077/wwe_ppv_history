module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/wwe_ppv_history/' : '/',
};

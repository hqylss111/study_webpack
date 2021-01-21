import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme:{
    '@primary-color':'#C2264E'
  },
  title:'上海华慧防火检测',
  links: [{ rel: 'icon', href: '/logo_hh.ico' }],
  proxy: {
    '/api': {
      'target': 'http://192.168.0.118:8080/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  ssr:{
    devServerRender:false
  }
});

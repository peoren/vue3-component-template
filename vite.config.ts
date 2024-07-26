import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import eslintPlugin  from 'vite-plugin-eslint'
// TODO:添加css处理
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
// TODO:添加图片处理
// // import { viteStaticCopy } from 'vite-plugin-static-copy';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),{
    ...eslintPlugin(),
    apply: 'build',
  },
    { // 不在开发时报错
      ...eslintPlugin({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: 'serve',
      enforce: 'post'
    }, dts({insertTypesEntry: true, rollupTypes: true})],
  // TODO:需要先加入cssInjectedByJsPlugin插件
  // cssInjectedByJsPlugin(),  // 确保样式正确注入
  // viteStaticCopy({
  //   targets: [
  //     {
  //       src: 'src/assets/svg/drag-center-icons/*',
  //       dest: 'assets'
  //     }
  //   ]
  // })
  resolve: {
    // 配置路径别名
    alias: {
      '@': '/src',
    },
  },

  build: {
    lib: {
      // 打包的入口文件
      entry: resolve(__dirname, './src/components/index.ts'),
      name: 'lib',
      // 打包后输出的文件名
      // fileName: 'my-lib',
      fileName: (format) => `'my-lib.${format}.js`,

    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})

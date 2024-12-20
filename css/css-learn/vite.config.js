import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig /* normalizePath */, loadEnv } from 'vite'
import autoprefixer from 'autoprefixer'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import iconPreview from './src/plugins/vite-plugin-icon-preview'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { vitePluginForArco } from '@arco-plugins/vite-vue'
/* import ViteImagemin from 'vite-plugin-imagemin' */

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// 全局 scss 文件的路径
/* // 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/styles/global.scss')) */

// https://vite.dev/config/
export default ({ mode }) => {
  const { VITE_BASE_URL_DEV } = loadEnv(mode, resolve(__dirname))

  return defineConfig({
    // 生产环境打包路径
    base: '/',

    // 插件相关配置
    plugins: [
      vue({
        template: {
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: ['src'],
            img: ['src'],
            image: ['xlink:href', 'href'],
            use: ['xlink:href', 'href'],
          },
        },
      }),
      vitePluginForArco({
        style: 'css',
      }),
      Unocss(),
      iconPreview(), // 自定义图标预览插件
      AutoImport({
        resolvers: [ArcoResolver()],
      }),
      Components({
        resolvers: [ArcoResolver()],
      }),
      createSvgIconsPlugin({
        // 要缓存的图标文件夹
        iconDirs: [resolve(__dirname, 'src/assets/icons')], // 执行 icon name 的格式
        symbolId: 'icon-[name]',
      }),
      /*       ViteImagemin({
        // PNG 图片的压缩配置（无损与有损）
        optipng: {
          optimizationLevel: 7, // 最大化无损压缩
        },
        pngquant: {
          quality: [0.8, 0.9], // 有损压缩设置，质量范围从 0.8 到 0.9
        },
        // SVG 优化配置
        svgo: {
          plugins: [
            {
              name: 'removeViewBox', // 去除 viewBox 属性
            },
            {
              name: 'removeEmptyAttrs', // 不去除空属性
              active: false, // 禁用该插件
            },
          ],
        },
      }), */
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // css 相关配置
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData 的内容会在每个 scss 文件的开头自动注入
        },
      },
      // 进行 PostCSS 配置
      postcss: {
        plugins: [
          autoprefixer({
            // 指定目标浏览器
            overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'], // 主要用来自动为不同的目标浏览器添加样式前缀，解决的是浏览器兼容性的问题
          }),
        ],
      },
    },
    // 服务器代理
    server: {
      proxy: {
        '/api': {
          target: VITE_BASE_URL_DEV, // 服务器请求地址
          changeOrigin: true, // 是否允许跨域
          rewrite: path => path.replace(/^\/api/, ''), //请求地址重写, 请求地址前缀 /api 替换为空
        },
      },
    },
    // 打包配置
    build: {
      assetsInlineLimit: 4 * 1024, // 4kb 以下的文件会被转为 base64，否则会被打包成单独的文件(静态文件提取临界值)
      polyfillModulePreload: true, // 模块预加载
      // 类型: boolean | 'esbuild' | 'terser'
      // 默认为 `esbuild`
      minify: 'esbuild',
      // 产物目标环境
      target: 'modules',
      // 如果 minify 为 terser，可以通过下面的参数配置具体行为
      // https://terser.org/docs/api-reference#minify-options

      chunkSizeWarningLimit: 1024, //  单个 chunk 文件大小的警告阈值
      rollupOptions: {
        output: {
          assetFileName({ name }) {
            const info = name.split('.')
            let ext = info[info.length - 1]
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(name)) {
              ext = 'media'
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(name)) {
              ext = 'img'
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(name)) {
              ext = 'fonts'
            }
            return `${ext}/[hash:16][extname]`
          },
          chunkFileNames: 'js/[hash:16].js',
          entryFileNames: 'js/[hash:16].js',
        },
      },
    },
  })
}

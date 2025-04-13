import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default [
  {
    // 入口文件
    input: 'packages/vue/src/index.ts',
    // 打包出口
    output: [
      {
        // 打包后的文件名
        file: 'packages/vue/dist/vue.js',
        // 打包后的文件格式
        format: 'iife',
        // 打包后的文件是否生成sourceMap
        sourcemap: true,
        // 打包后的文件是否生成全局变量
        name: 'Vue',
      },
    ],
    // 插件
    plugins:[
      typescript(),
      // 模块导入路径补全
      resolve(),
      // 将commonjs转换为esm
      commonjs()
    ]
  },
]

import { resolve } from 'node:path'
import fs from 'node:fs'
import process from 'node:process'

const defaults = {
  entry: '/icons',
  iconDirs: resolve(process.cwd(), './src/assets/icons'),
}

/**
 * @param [options]
 * @param { string } [options.entry] 访问地址
 * @param { string } [options.iconDirs] 图标目录
 * @returns {{configureServer(*): void, name: string}}
 */
export default function (options) {
  const config = Object.assign({}, defaults, options)
  const { entry, iconDirs } = config
  return {
    name: 'icon-preview',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url.startsWith(entry)) return next()

        let fileNames = []
        try {
          const stat = fs.statSync(iconDirs)
          if (stat.isDirectory()) {
            fileNames = fs
              .readdirSync(iconDirs, { encoding: 'utf-8' })
              .filter(item => item.endsWith('.svg'))
          }
        } catch (e) {
          console.error(e)
        }

        const contents = fileNames
          .map(item => {
            const iconName = item.replaceAll('.svg', '')
            return `<li onclick="copyToClipboard('${iconName}')">
              <div class="icon">${fs.readFileSync(resolve(iconDirs, item), 'utf-8')}</div>
              <span class="name">${iconName}</span>
            </li>`
          })
          .join('')

        res.setHeader('Content-Type', 'text/html')
        res.end(`
          <html>
          <head>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/notyf@3.9.0/notyf.min.css">
          </head>
          <body>

            <style>
              * { margin: 0; padding: 0; list-style: none; box-sizing: border-box; }
              body {
                font-family: 'Inter', "-apple-system", BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "noto sans", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
                background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);
                min-height: 100vh;
              }
              ul {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                gap: 12px;
                padding: 20px;
                margin: 0;
              }
              li {
                background-color: white;
                width: 100px;
                height: 120px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                padding: 12px;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                cursor: pointer;
              }
              li:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
              }
              svg {
                width: 1.5em;
                height: 1.5em;
              }
              .icon {
                color: rgb(96, 98, 102);
                fill: currentColor;
                cursor: pointer;
                transition: transform 0.2s;
              }
              .icon:hover {
                transform: scale(1.2);
              }
              .name {
                font-size: 14px;
                color: #444;
                margin-top: 10px;
                font-weight: 500;
              }
            </style>

            <ul>${contents}</ul>

            <script>
              const notyf = new Notyf({
                duration: 3000,
                position: { x: 'center', y: 'bottom' },
              });

              function copyToClipboard(iconName) {
                navigator.clipboard.writeText(iconName).then(() => {
                  notyf.success(\`\${iconName} 已复制！\`);
                }).catch(err => {
                  notyf.error(\`\${iconName} 复制失败！\`);
                });
              }
            </script>

            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/notyf@3.9.0/notyf.min.js"></script>
          </body>
          </html>
        `)
      })
    },
  }
}


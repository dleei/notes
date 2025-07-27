import { resolve } from "node:path";
import fs from "node:fs";
import process from "node:process";
import { ViteDevServer } from 'vite';  

// 默认配置
const defaults = {
  entry: "/icons",
  iconDirs: resolve(process.cwd(), "./src/assets/icons"),
};

interface Options {
  entry?: string;
  iconDirs?: string;
}

/**
 * 生成图标预览插件
 * @param options 配置选项
 * @returns 插件对象
 */
export default function (options: Options) {
  const config = { ...defaults, ...options };
  const { entry, iconDirs } = config;

  return {
    name: "icon-preview",
    /**
     * 配置开发服务器
     * @param server Vite 开发服务器实例
     */
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith(entry)) return next();

        let fileNames: string[] = [];
        try {
          const stat = fs.statSync(iconDirs);
          if (stat.isDirectory()) {
            fileNames = fs
              .readdirSync(iconDirs, { encoding: "utf-8" })
              .filter((item) => item.endsWith(".svg"));
          }
        } catch (e) {
          console.error(e);
        }

        const contents = fileNames
          .map((item) => {
            const iconName = item.replaceAll(".svg", "");
            return `<li data-icon="${iconName}">
              <div class="icon">${fs.readFileSync(resolve(iconDirs, item), "utf-8")}</div>
              <span class="name">${iconName}</span>
            </li>`;
          })
          .join("");

        res.setHeader("Content-Type", "text/html");
        res.end(`
          <html>
          <head>
            <meta charset="UTF-8">
             <title>图标预览</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3.8.0/notyf.min.css">
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
            <script src="https://cdn.jsdelivr.net/npm/notyf@3.8.0/notyf.min.js"></script>
            <script>
              const notyf = new Notyf({
                duration: 2000,
                position: { x: 'right', y: 'top' },
              });

              document.querySelectorAll('li').forEach(li => {
                li.addEventListener('click', () => {
                  const iconName = li.getAttribute('data-icon');
                  navigator.clipboard.writeText(iconName).then(() => {
                    notyf.success(iconName + ' 复制成功!');
                  }).catch(err => {
                    console.error('复制失败: ', err);
                    notyf.error('复制失败，请重试！');
                  });
                });
              });
            </script>
          </body>
          </html>
        `);
      });
    },
  };
}

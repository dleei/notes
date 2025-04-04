import fs from 'fs';
import path from 'path';
import process from 'process';

const registerRoutes = async (app) => {
  /**
   * 读取当前文件夹下所有文件
   */
  const currentPath = new URL(import.meta.url).pathname;

  // 处理 Windows 系统下路径问题
  const fixedPath =
    process.platform === 'win32' ? currentPath.slice(1) : currentPath;
  const __dirname = path.dirname(fixedPath);

  const files = fs.readdirSync(__dirname);

  for (let file of files) {
    if (!file.endsWith('.router.js')) continue;
    const filePath = path.join(__dirname, file);
    // 将文件系统路径转换为 file:// URL 格式
    const fileUrl = new URL(`file://${filePath}`);

    const module = await import(fileUrl.href);
    const router = module.default;
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
};

export default registerRoutes;

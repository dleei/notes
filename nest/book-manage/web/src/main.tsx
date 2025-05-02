import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "normalize.css"; // 清除默认样式
import "virtual:uno.css"; // 引入 UnoCSS 样式
import "virtual:svg-icons-register"; // 引入 SVG 图标
import "@/styles/global.css";

createRoot(document.getElementById("root")!).render(<App />);

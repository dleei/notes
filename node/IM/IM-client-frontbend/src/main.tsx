import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css'
import 'virtual:uno.css'
import 'virtual:svg-icons-register';  // 增加svg图标注册
import './styles/global.css'; // 新建全局样式文件
import App from './App';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

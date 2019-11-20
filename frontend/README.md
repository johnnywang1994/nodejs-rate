## Vue 開發模板


### 指令

  - npm run serve: 開啟開發伺服器，hot reload

  - npm run dev: 開發編譯

  - npm run build: 打包編譯

  - 使用 history 模式路由時，--history-api-fallback 必須加在 webpack-dev-server 指令後，解決畫面重整消失的問題


### 目錄結構

  1. configs: 包含所有 webpack.config 的設定模組

  2. public: 放置 index.html 及其他靜態檔案

  3. src: 放置開發項目


### 配置細節

  1. 預設為使用 SCSS，若需要用 Sass，需前往 configs 目錄下的 sass-loader.js 打開 indent 設定。

  2. 預設配置有 async/await 的 @babel/plugin-transform-runtime。(@babel/runtime 也必須安裝)

  3. 預設已設定好 pug 預處理，可以自由使用。

  4. 有關 devServe 相關設定，放置在 configs 目錄下的 dev-server.js。

  5. 預設使用 @ 引入路徑 src，$c 引入 components 路徑，$a 則為 assets。（根據 vue-loader，在 template 模板中引入 alias 寫法，除了 @ 以外，需要在前面加上 ~ 。）
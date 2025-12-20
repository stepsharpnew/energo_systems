const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 5173,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://tg_bot:3001",
        changeOrigin: true,
        secure: false,
        logLevel: "debug",
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
  chainWebpack: (config) => {
    // Добавляем поддержку .PNG файлов (заглавными буквами)
    // Модифицируем существующее правило для изображений, добавляя поддержку заглавных расширений
    const imagesRule = config.module.rule("images");
    imagesRule.test(
      /\.(png|jpe?g|gif|webp|svg|PNG|JPE?G|GIF|WEBP|SVG)(\?.*)?$/
    );
  },
});

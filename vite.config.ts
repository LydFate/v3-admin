import { defineConfig } from "vite"
import type { UserConfigExport, ConfigEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import fs from "fs"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import dotenv from "dotenv"

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  let NODE_ENV = process.env.NODE_ENV || "development"
  let envFiles = []
  // 根据不同的环境使用不同的环境变量
  if (command === "serve") {
    envFiles = [
      /**default file */
      ".env",
    ]
  } else {
    envFiles = [
      /** default file */
      ".env",
      /** mode file */
      `.env.${NODE_ENV}`,
    ]
  }

  for (const file of envFiles) {
    const envConfig = dotenv.parse(fs.readFileSync(file))
    for (const k in envConfig) {
      process.env[k] = envConfig[k]
    }
  }

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [
      vue(),
      // 自动引入组件
      Components({
        resolvers: [
          AntDesignVueResolver(), // ant-design-vue
          // ElementPlusResolver(), // Element Plus
          // VantResolver(), // Vant
        ],
        // 允许在`./src/components下自动加载标记组件
        extensions: ["vue"],
        // 允许自动导入和注册组件
        include: [/\.vue$/, /\.vue\?vue/],
        dts: "src/components.d.ts",
      }),
      // 自动引入vue、vue-router
      AutoImport({
        imports: ["vue", "vue-router"],
        dts: "src/auto-imports.d.ts",
      }),
    ],
    // 配置文件引用别用 alias
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@c": resolve(__dirname, "src/components"),
        "@api": resolve(__dirname, "src/api"),
        "@store": resolve(__dirname, "src/store"),
        "@router": resolve(__dirname, "src/router"),
        "@hooks": resolve(__dirname, "src/hooks"),
        "@enums": resolve(__dirname, "src/enums"),
        "@utils": resolve(__dirname, "src/utils"),
        "@views": resolve(__dirname, "src/views"),
        "@types": resolve(__dirname, "src/types"),
      },
    },
    server: {
      https: false,
      // Listening on all local IPs
      host: true,
      port: parseInt(process.env.VITE_PORT),
      // Load proxy configuration from .env
      proxy: {
        "/api": {
          target: "http://localhost:3100/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    // 配置less 全局变量
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve(
              "src/design/config.less"
            )}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
  })
}

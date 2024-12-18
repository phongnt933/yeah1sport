import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Tạo plugin custom
export default function viteEnvToWindowPlugin() {
  return {
    name: "vite-plugin-env-to-window", // Tên plugin

    // Hook xử lý khi bắt đầu cấu hình
    configResolved(config) {
      // Đường dẫn đến file .env (ưu tiên file .env.mode nếu tồn tại)
      const mode = config.mode;
      const envFilePath = path.resolve(process.cwd(), `.env.${mode}`);
      const defaultEnvFilePath = path.resolve(process.cwd(), `.env`);

      // Đọc file .env và parse thành object
      let env = {};
      if (fs.existsSync(envFilePath)) {
        env = dotenv.parse(fs.readFileSync(envFilePath));
      } else if (fs.existsSync(defaultEnvFilePath)) {
        env = dotenv.parse(fs.readFileSync(defaultEnvFilePath));
      }

      // Ghi dữ liệu từ file .env vào file public/env-config.js
      const publicEnvConfigPath = path.resolve(
        process.cwd(),
        "public/env-config.js"
      );
      const envConfigContent = `window._env_ = ${JSON.stringify(env)};`;
      fs.writeFileSync(publicEnvConfigPath, envConfigContent);
    },
  };
}

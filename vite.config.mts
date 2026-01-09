// vitest.config.mts
import { defineConfig } from "vitest/config";
// import { fileURLToPath } from "node:url";
// import { dirname, resolve } from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test.local" });

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "node",
  },
});

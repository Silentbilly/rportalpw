import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
  },
  env: {
    rp_username: 'default'
  }
});

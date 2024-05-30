import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    responseTimeout: 30000,
    defaultCommandTimeout: 10000
  },
  env: {
    rp_username: 'default',
    rp_password: '1q2w3e'
  }
});

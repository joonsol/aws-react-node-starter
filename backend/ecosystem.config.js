// backend/ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "starter-backend",
      script: "src/server.js",
      instances: 1,
      exec_mode: "fork",
      env: { NODE_ENV: "production", PORT: 3001 }
    }
  ]
};

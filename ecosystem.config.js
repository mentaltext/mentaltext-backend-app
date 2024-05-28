module.exports = {
  apps: [{
    name: "ts-ddd-prisma-backend",
    script: "./dist/server.js",
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: "2G",
  }]
};

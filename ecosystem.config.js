module.exports = {
  apps: [
    {
      name: "BTP_server",
      script: "./bin/www",
      watch: true,
      ignore_watch: '"upload/*"',
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};

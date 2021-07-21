module.exports = {
  apps : [{
    name: 'server-orchestrator',
    script: 'node app.js',
    env: {
      PORT: 80
    }
  }]
};
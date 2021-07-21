module.exports = {
  apps : [{
    name: 'server-movies',
    script: 'node services/movies/app.js'
  }, {
    name: 'server-series',
    script: 'node services/tvseries/app.js'
  }, {
    name: 'server-orchestrator',
    script: 'node orchestrator/app.js',
  }]
};

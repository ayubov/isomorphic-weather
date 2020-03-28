const dotenvVars = require('dotenv').config().parsed;

const CONST_ENV_VARS = ['NODE_ENV', 'PUBLIC_URL'];

const envs = Object.keys(dotenvVars || {}).reduce(
  (env, key) => {
    env[key] = process.env[key];
    return env;
  },
  {
    NODE_ENV: process.env.NODE_ENV,
    PUBLIC_URL: process.env.PUBLIC_URL,
  }
);

const webpackDefinePlugin = {
  'process.env': Object.keys(envs).reduce((env, key) => {
    if (CONST_ENV_VARS.includes(key)) {
      env[key] = JSON.stringify(envs[key]);
    } else {
      env[key] = `process.env.${key}`;
    }
    return env;
  }, {})
};

const index = JSON.stringify({
  env: envs
  });


module.exports = { envs, index, webpackDefinePlugin }

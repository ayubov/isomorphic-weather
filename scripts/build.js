process.env.NODE_ENV = 'production';
process.env.PUBLIC_URL = process.env.PUBLIC_URL || '';

const chalk = require('chalk');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');;

const createConfig = require('../config/webpackConfigFactory');
const serverConfig = require('../config/webpack.server.prod');
const clientConfig = createConfig('production');

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

fs.emptyDirSync(resolvePath('../build'));
build()
.then(
  result => printResult(result),
  err => {
    console.log(chalk.red('Failed to compile.\n'));
    console.log((err.message || err) + '\n');
    process.exit(1);
  }
);

function build() {
  console.log(chalk.blue('\n\tCreating an optimized production build...\n'));

  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);

  return new Promise((resolve, reject) => {
    clientCompiler.run((err, stats) => {
      if (err) {
        return reject(err);
      } else {
        console.log(chalk.white('✓ Client webpack build complete'));
      }

      serverCompiler.run(err => {
        if (err) {
          return reject(err);
        } else {
          console.log(chalk.white('✓ Server webpack build complete'));
        }

        const messages = formatWebpackMessages(stats.toJson({}, true));

        if (messages.errors.length) {
          return reject(new Error(messages.errors.join('\n\n')));
        }

        resolve({
          stats,
          warnings: messages.warnings
        });
      });
    });
  });
}

function printResult({ warnings }) {
  if (warnings.length) {
    console.log(chalk.yellow('Compiled with warnings.\n'));
    console.log(warnings.join('\n\n'));
  } else {
    console.log(chalk.green('Compiled successfully.\n'));
  }
}

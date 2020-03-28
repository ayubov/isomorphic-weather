import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import App from '../src/components/App';
import { fetchInitData } from './fetchInitData';
import { makeHtml } from './makeHtml';
import stats from '../build/react-loadable.json';
import { ServerDataProvider } from '../src/context/serverData';

const ServerApp = ({ data, context, location }) => {
  return (
    <ServerDataProvider value={data}>
      <StaticRouter location={location} context={context}>
        <App />
      </StaticRouter>
    </ServerDataProvider>
  );
};

export const renderServerSide = (req, res) => {
  Loadable.preloadAll()
    .then(fetchInitData)
    .then(data => renderApp(ServerApp, data, req, res));
};

function renderApp(ServerApp, data, req, res) {
  const context = {};
  const modules = [];

  const markup = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <ServerApp data={data} location={req.url} context={context} />
    </Loadable.Capture>
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    const fullMarkup = makeHtml({
      helmet: Helmet.renderStatic(),
      serverData: data,
      bundles: getBundles(stats, modules),
      markup
    });

    res.status(200).send(fullMarkup);
  }
}

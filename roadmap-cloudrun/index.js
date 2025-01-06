const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(async (req, res) => {
  const url = new URL(req.url, `https://${req.headers.host}`);
  url.hostname = 'polyhedradocs.pages.dev';

  if (url.pathname === '/') {
    url.pathname = '/roadmap/interactive-tech-tree';
  }

  const headers = { ...req.headers };
  delete headers.host;
  delete headers['x-forwarded-for'];
  delete headers['x-forwarded-proto'];
  delete headers['x-forwarded-host'];

  const response = await fetch(new URL(url), {
    method: req.method,
    headers: headers,
    redirect: 'follow'
  });

  // Forward response headers
  Object.entries(response.headers.raw()).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  response.body.pipe(res);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
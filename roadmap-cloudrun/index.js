const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(async (req, res) => {
  try {
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
    delete headers['accept-encoding'];

    console.log('Proxying request to:', url.toString());
    const response = await fetch(new URL(url), {
      method: req.method,
      headers: headers,
      redirect: 'follow'
    });

    // If target returns 404 or other error, forward it
    if (!response.ok) {
      res.status(response.status).send(await response.text());
      return;
    }

    // Forward content-type and other important headers
    ['content-type', 'cache-control', 'etag', 'last-modified'].forEach(header => {
      const value = response.headers.get(header);
      if (value) res.setHeader(header, value);
    });

    const buffer = await response.buffer();
    res.status(response.status).send(buffer);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(502).send('Bad Gateway');
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
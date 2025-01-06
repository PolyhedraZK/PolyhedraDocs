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

    console.log('Fetching:', url.toString());
    const response = await fetch(new URL(url), {
      method: req.method,
      headers: headers,
      redirect: 'follow'
    });

    const buffer = await response.buffer();
    console.log('Response size:', buffer.length);

    // Forward response headers
    Object.entries(response.headers.raw()).forEach(([key, value]) => {
      if (key.toLowerCase() !== 'content-encoding') {
        res.setHeader(key, value);
      }
    });

    res.status(response.status);
    res.send(buffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
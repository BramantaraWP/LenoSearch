import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('URL tidak boleh kosong!');
  }

  try {
    const response = await fetch(targetUrl);
    let html = await response.text();

    // Hapus meta tag X-Frame-Options kalau ada di HTML
    html = html.replace(/<meta[^>]+http-equiv=["']X-Frame-Options["'][^>]*>/gi, '');

    // Hapus Content-Security-Policy tag kalau ada
    html = html.replace(/<meta[^>]+http-equiv=["']Content-Security-Policy["'][^>]*>/gi, '');

    // Kirim response ke iframe
    res.setHeader('Content-Type', 'text/html');
    res.send(html);

  } catch (err) {
    res.status(500).send('Gagal ambil halaman: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running di http://localhost:${PORT}`);
});

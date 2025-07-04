export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL kosong bro!" });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (SafeProxyBot)',
        'Referer': ''
      }
    });

    const html = await response.text();
    res.setHeader("Content-Type", "text/html");
    res.send(html);

  } catch (err) {
    res.status(500).json({ error: "Gagal ambil halaman: " + err.message });
  }
}

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).send("URL kosong!");

  try {
    const response = await fetch(url);
    const html = await response.text();

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (err) {
    res.status(500).send("Gagal ambil halaman: " + err.message);
  }
}

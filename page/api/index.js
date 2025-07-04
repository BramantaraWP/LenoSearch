export default function Home() {
  const blacklist = ["porn", "hentai", "phishing", "scam", "bokep"];

  const isSafe = (query) => {
    return !blacklist.some((bad) => query.toLowerCase().includes(bad));
  };

  const search = () => {
    const query = document.getElementById("search").value.trim();
    if (!query) {
      alert("Ketik dulu bro 🚀");
      return;
    }
    if (!isSafe(query)) {
      alert("❌ Terblokir demi keamanan bro!");
      return;
    }

    const target = query.startsWith("http")
      ? query
      : "https://www.startpage.com/sp/search?query=" + encodeURIComponent(query);

    window.location.href = "/api/proxy?url=" + encodeURIComponent(target);
  };

  return (
    <div style={{ background: "#111", color: "#eee", textAlign: "center", padding: "50px", minHeight: "100vh" }}>
      <h1>Leno SafeSearch Proxy (Vercel)</h1>
      <input
        id="search"
        placeholder="Ketik link / keyword..."
        onKeyDown={(e) => e.key === "Enter" && search()}
        style={{
          padding: "10px",
          border: "none",
          borderRadius: "6px",
          width: "300px",
          marginRight: "10px",
        }}
      />
      <button onClick={search} style={{ padding: "10px 20px" }}>
        🔍
      </button>
      <p style={{ marginTop: "20px", fontSize: "13px", color: "#999" }}>
        SafeSearch aktif, beberapa keyword diblokir bro 🚫
      </p>
    </div>
  );
}

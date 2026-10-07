import { useMemo, useRef, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);

  const canSubmit = useMemo(
    () => originalUrl.trim().length > 0 && !loading,
    [originalUrl, loading]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = originalUrl.trim();

    if (!url) return;
    setError("");
    setCopied(false);
    setShortUrl("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/shorten`,
        { originalUrl: url },
        { timeout: 10000 }
      );
      if (!data?.shortUrl) {
      throw new Error("Invalid response from server");
      }
      setShortUrl(data.shortUrl);
    } 
    catch (err) {
      console.error("Shorten request failed:", err);
  if (axios.isAxiosError(err)) {
    if (err.response?.data?.error) {
      setError(err.response.data.error);
    } else if (err.code === "ECONNABORTED") {
      setError("Request timed out. Try again.");
    } else if (err.request) {
      setError("Cannot reach the server. Check your connection.");
    } else {
      setError("Could not shorten this URL.");
    }
  } else {
    setError("Invalid response from server.");
  }
} finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if(!shortUrl)
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Copy failed. Select the link and copy it manually.");
    }
  };

  const handleDownloadQr = () => {
  const svg = qrRef.current?.querySelector("svg");

  if (!svg) {
    setError("QR code is not available.");
    return;
  }

  const clonedSvg = svg.cloneNode(true);
  clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const svgString = new XMLSerializer().serializeToString(clonedSvg);
  const blob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "short-link-qr.svg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

  const handleReset = () => {
    setOriginalUrl("");
    setShortUrl("");
    setError("");
    setCopied(false);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-primary/10 via-base-200 to-secondary/10 flex items-center justify-center p-4">
      <section className="card w-full max-w-xl bg-base-100 shadow-2xl">
        <div className="card-body gap-5">
          <header>
            <h1 className="text-3xl font-bold">
              Snip<span className="text-primary">Link</span>
            </h1>
            <p className="text-base-content/70 mt-1">
              Paste a long URL and get a short link with a QR code.
            </p>
          </header>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <label htmlFor="url-input" className="sr-only">
              Long URL
            </label>
            <input
              id="url-input"
              type="url"
              className={`input input-bordered w-full ${error ? "input-error" : ""}`}
              placeholder="https://example.com/very/long/path"
              value={originalUrl}
              onChange={(e) => {
                setOriginalUrl(e.target.value)
                setError("");
              }}
              autoFocus
              required
              aria-invalid={Boolean(error)}
            />
            <div className="flex gap-2">
              <button className="btn btn-primary flex-1" type="submit" disabled={!canSubmit}>
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Shortening...
                  </>
                ) : (
                  "Shorten URL"
                )}
              </button>
              {(originalUrl || shortUrl) && (
                <button className="btn btn-ghost" type="button" onClick={handleReset}>
                  Clear
                </button>
              )}
            </div>
          </form>

          <div aria-live="polite">
            {error && (
              <div role="alert" className="alert alert-error">
                <span>{error}</span>
              </div>
            )}
          </div>

          {shortUrl && (
            <div className="space-y-4 border-t border-base-300 pt-4">
              <div className="join w-full">
                <input
                  className="input input-bordered join-item w-full"
                  value={shortUrl}
                  readOnly
                  aria-label="Shortened URL"
                  onFocus={(e) => e.target.select()}
                />
                <button
                  className={`btn join-item ${copied ? "btn-success" : "btn-outline"}`}
                  type="button"
                  onClick={handleCopy}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div ref={qrRef} className="flex justify-center bg-white p-4 rounded-box">
                <QRCode value={shortUrl} size={160} />
              </div>

              <div className="flex gap-2 justify-center">
                <a className="btn btn-sm btn-outline" href={shortUrl} target="_blank" rel="noopener noreferrer">
                  Open link
                </a>
                <button className="btn btn-sm btn-outline" type="button" onClick={handleDownloadQr}>
                  Download QR
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
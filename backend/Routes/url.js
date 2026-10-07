import express from 'express';
import Url from '../Models/Url.js';
import { nanoid } from 'nanoid';

const router = express.Router();

const BASE_URL = (
  process.env.BASE_URL || "https://url-shortner-r09a.onrender.com"
).replace(/\/$/, "");

router.post("/shorten", async (req, res) => {
  try {
    const originalUrl = req.body?.originalUrl?.trim();

    if (!originalUrl) {
      return res.status(400).json({
        error: "URL is required",
      });
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(originalUrl);
    } catch {
      return res.status(400).json({
        error: "Invalid URL",
      });
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        error: "Only HTTP and HTTPS URLs are supported",
      });
    }

    let shortId;
    let exists = true;

    while (exists) {
      shortId = nanoid(7);
      exists = await Url.exists({ shortId });
    }

    const url = await Url.create({
      shortId,
      originalUrl,
      clicks: 0,
    });

    return res.status(201).json({
      shortId: url.shortId,
      shortUrl: `${BASE_URL}/${url.shortId}`,
    });
  } catch (error) {
    console.error("Shorten URL error:", error);

    return res.status(500).json({
      error: "Server error",
    });
  }
});

router.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOneAndUpdate(
      { shortId },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({
        error: "Short URL not found",
      });
    }

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Redirect error:", error);

    return res.status(500).json({
      error: "Server error",
    });
  }
});

export default router;
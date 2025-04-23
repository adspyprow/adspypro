server.js// server.js
const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const PORT = process.env.PORT || 3000;

// Allow CORS so your frontend (adspy.html) can fetch
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/ads', async (req, res) => {
  const { keyword = '', platform = 'tiktok' } = req.query;
  let browser;

  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    let ads = [];

    if (platform === 'tiktok') {
      // TikTok Creative Center (no login required)
      const url = `https://ads.tiktok.com/business/creativecenter/inspiration/search/ad?source=home&publisher=all&adLocation=all&startDate=2022-01-01&endDate=2025-12-31&keyword=${encodeURIComponent(keyword)}`;
      await page.goto(url, { waitUntil: 'networkidle2' });

      // Wait for ads grid to load, then scrape first 10
      await page.waitForSelector('.jsx-xxxxxxx .ad-card'); // adjust selector
      ads = await page.$$eval('.ad-card', cards =>
        cards.slice(0, 10).map(card => ({
          image: card.querySelector('img')?.src || '',
          text: card.querySelector('.ad-title')?.innerText.trim() || '',
          likes: parseInt(card.querySelector('.like-count')?.innerText) || 0,
          shares: parseInt(card.querySelector('.share-count')?.innerText) || 0,
          views: parseInt(card.querySelector('.view-count')?.innerText) || 0,
          clicks: parseInt(card.querySelector('.click-count')?.innerText) || 0
        }))
      );
    } else {
      // Facebook Ad Library (public, no login)
      const url = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&view_all_page_id=&search_type=keyword_unordered&media_type=all&search_terms=${encodeURIComponent(keyword)}`;
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.waitForSelector('[data-pagelet^="AdLibrary"] .adCard'); // adjust selector
      ads = await page.$$eval('.adCard', cards =>
        cards.slice(0, 10).map(card => ({
          image: card.querySelector('img')?.src || '',
          text: card.querySelector('.adCard__message')?.innerText.trim() || '',
          likes: 0, shares: 0, views: 0, clicks: 0
        }))
      );
    }

    res.json(ads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Scraping failed' });
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(PORT, () => {
  console.log(`🕵️‍♂️ AdSpyPro backend listening on http://localhost:${PORT}`);
});

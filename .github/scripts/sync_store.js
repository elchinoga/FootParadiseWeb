  const { chromium } = require('playwright');
  const cheerio = require('cheerio');                                                                                     const fs = require('fs');
  const path = require('path');

  const STORE_URL = 'https://payhip.com/footparadiseart';
  const HTML_FILE = path.join(__dirname, '../../store/index.html');

  async function getStoreProductCodes(page) {
    const found = new Set();
    let pageNum = 1;
    while (true) {
      const url = pageNum === 1 ? STORE_URL : `${STORE_URL}?page=${pageNum}`;
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(5000);
      const codes = await page.evaluate(() => {
        const c = [];
        document.querySelectorAll('a[href*="/b/"]').forEach(a => {
          const m = a.getAttribute('href').match(/\/b\/([A-Za-z0-9]+)/);
          if (m) c.push(m[1]);
        });
        return c;
      });
      if (codes.length === 0) break;
      codes.forEach(c => found.add(c));
      pageNum++;
    }
    return [...found];
  }

  async function getProductDetails(page, code) {
    const url = `https://payhip.com/b/${code}`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2000);

    const details = await page.evaluate(() => {
      for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
        try {
          const data = JSON.parse(script.textContent);
          if (data['@type'] === 'Product') {
            return {
              title: data.name,
              price: data.offers?.price ?? '15',
              image: data.image
            };
          }
        } catch (e) {}
      }
      return null;
    });

    if (!details) return null;

    const img = Array.isArray(details.image) ? details.image[0] : details.image;
    const imgStr = typeof img === 'string' ? img : '';
    const s3Match = imgStr.match(/https:\/\/pe56d\.s3\.amazonaws\.com\/[^\s"'?]+/);
    details.image = s3Match ? s3Match[0] : imgStr;

    return details;
  }

  function getExistingCodes(html) {
    const $ = cheerio.load(html);
    const codes = new Set();
    $('button.btn-buy').each((_, el) => {
      const match = ($(el).attr('onclick') || '').match(/\/b\/([A-Za-z0-9]+)/);
      if (match) codes.add(match[1]);
    });
    return codes;
  }

  function buildArticle(code, details) {
    const price = parseFloat(details.price);
    const priceHtml = price === 0
      ? 'Free'
      : `<span itemprop="priceCurrency" content="USD">$</span><span itemprop="price" content="${price}">${price}</span>
  USD`;

    return `        <article class="store-product" itemscope itemtype="https://schema.org/Product"
  data-title="${details.title.toLowerCase()}">
              <div class="product-image">
                  <img src="${details.image}" alt="Comic: ${details.title}" itemprop="image" loading="lazy">
              </div>
              <div class="product-info">
                  <h2 class="product-title" itemprop="name">${details.title}</h2>
                  <p class="product-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                      ${priceHtml}
                      <link itemprop="availability" href="https://schema.org/InStock">
                  </p>
                  <button class="btn-buy" onclick="openPurchaseModal('https://payhip.com/b/${code}')">
                      <i class="fas fa-shopping-cart" aria-hidden="true"></i> Buy Now
                  </button>
              </div>
          </article>`;
  }

  async function main() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

    try {
      const html = fs.readFileSync(HTML_FILE, 'utf8');
      const existingCodes = getExistingCodes(html);
      console.log(`Productos actuales en el HTML: ${existingCodes.size}`);

      const payhipCodes = await getStoreProductCodes(page);
      console.log(`Productos en Payhip: ${payhipCodes.length}`);

      const newCodes = payhipCodes.filter(c => !existingCodes.has(c));
      console.log(`Nuevos productos a agregar: ${newCodes.length}`);

      if (newCodes.length === 0) {
        console.log('Sin cambios.');
        return;
      }

      let updatedHtml = html;

      for (const code of newCodes) {
        console.log(`Procesando: /b/${code}`);
        const details = await getProductDetails(page, code);
        if (!details) {
          console.log(`No se pudieron obtener detalles para /b/${code}, saltando`);
          continue;
        }
        console.log(`Agregando: ${details.title}`);
        const article = buildArticle(code, details);
        updatedHtml = updatedHtml.replace(
          /(<div class="store-grid"[^>]*>)/,
          `$1\n${article}`
        );
      }

      fs.writeFileSync(HTML_FILE, updatedHtml, 'utf8');
      console.log('store/index.html actualizado.');

    } finally {
      await browser.close();
    }
  }

  main().catch(err => { console.error(err); process.exit(1); });

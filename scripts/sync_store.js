const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const STORE_URL = 'https://payhip.com/footparadiseart';
const HTML_FILE = path.join(__dirname, '../../store/index.html');

async function getStoreProductCodes(page) {
  await page.goto(STORE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  const codes = await page.evaluate(() => {
    const found = new Set();
    document.querySelectorAll('a[href*="/b/"]').forEach(a => {
      const match = a.getAttribute('href').match(/\/b\/([A-Za-z0-9]+)/);
      if (match) found.add(match[1]);
    });
    return [...found];
  });

  return codes;
}

async function getProductDetails(page, code) {
  const url = `https://payhip.com/b/${code}`;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

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

  // Extraer URL de S3 desde el proxy de Cloudflare
  const s3Match = details.image?.match(/https:\/\/pe56d\.s3\.amazonaws\.com\/[^\s"'?]+/);
  details.image = s3Match ? s3Match[0] : details.image;

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
    : `<span itemprop="priceCurrency" content="USD">$</span><span itemprop="price" content="${price}">${price}</span> USD`;

  return `        <article class="store-product" itemscope itemtype="https://schema.org/Product" data-title="${details.title.toLowerCase()}">
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

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = './images';
const THUMBS_DIR = './thumbs';
const THUMB_WIDTH = 400; // Ancho del thumbnail en pixels

// Crear carpeta thumbs si no existe
if (!fs.existsSync(THUMBS_DIR)) {
    fs.mkdirSync(THUMBS_DIR);
}

// Obtener todas las imágenes
const images = fs.readdirSync(IMAGES_DIR).filter(file => 
    /\.(jpg|jpeg|png|webp)$/i.test(file)
);

console.log(`Procesando ${images.length} imágenes...`);

async function processImages() {
    for (const image of images) {
        const inputPath = path.join(IMAGES_DIR, image);
        const outputPath = path.join(THUMBS_DIR, image);
        
        try {
            await sharp(inputPath)
                .resize(THUMB_WIDTH, null, { withoutEnlargement: true })
                .jpeg({ quality: 80 })
                .toFile(outputPath);
            
            const originalSize = fs.statSync(inputPath).size;
            const thumbSize = fs.statSync(outputPath).size;
            const reduction = ((1 - thumbSize / originalSize) * 100).toFixed(1);
            
            console.log(`✓ ${image} - Reducido ${reduction}%`);
        } catch (err) {
            console.log(`✗ Error con ${image}: ${err.message}`);
        }
    }
    console.log('\n¡Listo! Los thumbnails están en la carpeta "thumbs"');
}

processImages();
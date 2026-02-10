/**
 * GALLERY DATA - Completed Commissions
 * =====================================
 * 
 * HOW TO ADD NEW IMAGES:
 * 1. Upload your full image to "gallery/images/"
 * 2. Run "node create-thumbnails.js" to generate the thumbnail
 * 3. Add a new entry to the galleryItems array below
 * 
 * Format:
 *    {
 *        title: "Character Name",
 *        type: "illustration",              // "illustration" or "comic"
 *        thumb: "thumbs/your_image.jpg",    // Thumbnail (small)
 *        full: "images/your_image.jpg"      // Full size image
 *    }
 */

const galleryItems = [
    // ========== ILLUSTRATIONS ==========
    {
        title: "Goku",
        type: "illustration",
        thumb: "thumbs/low_goku_color.jpg",
        full: "images/goku_color.jpg"
    },
    {
        title: "Goku and Gohan",
        type: "illustration",
        thumb: "thumbs/goku and gohan_color.jpg",
        full: "images/goku and gohan_color.jpg"
    },
    {
        title: "Fasha",
        type: "illustration",
        thumb: "thumbs/Fasha_color.jpg",
        full: "images/Fasha_color.jpg"
    },
    {
        title: "Mamoru Chiba",
        type: "illustration",
        thumb: "thumbs/Mamoru Chiba_color.jpg",
        full: "images/Mamoru Chiba_color.jpg"
    },
    {
        title: "Bardock",
        type: "illustration",
        thumb: "thumbs/low_Bardock.jpg",
        full: "images/low_Bardock.jpg"
    },
    {
        title: "Baby Vegeta",
        type: "illustration",
        thumb: "thumbs/low_baby vegeta.jpg",
        full: "images/low_baby vegeta.jpg"
    },
    {
        title: "Saiyan",
        type: "illustration",
        thumb: "thumbs/low_Comm39_Saiyan.jpg",
        full: "images/low_Comm39_Saiyan.jpg"
    },
    {
        title: "Yamcha",
        type: "illustration",
        thumb: "thumbs/low_yamcha_Color.jpg",
        full: "images/low_yamcha_Color.jpg"
    },
    {
        title: "Hiei",
        type: "illustration",
        thumb: "thumbs/low_hiei_color.jpg",
        full: "images/low_hiei_color.jpg"
    },
    {
        title: "Hisoka",
        type: "illustration",
        thumb: "thumbs/low_Hisoka v1.jpg",
        full: "images/low_Hisoka v1.jpg"
    },
    {
        title: "Mark Grayson",
        type: "illustration",
        thumb: "thumbs/low_Mark Grayson_color.jpg",
        full: "images/low_Mark Grayson_color.jpg"
    },
    {
        title: "Mark",
        type: "illustration",
        thumb: "thumbs/low_Mark_color.jpg",
        full: "images/low_Mark_color.jpg"
    },
    {
        title: "Hawkeye",
        type: "illustration",
        thumb: "thumbs/low_Hawkeye_color.jpg",
        full: "images/low_Hawkeye_color.jpg"
    },
    {
        title: "Gaston",
        type: "illustration",
        thumb: "thumbs/low_Gaston_color.jpg",
        full: "images/low_Gaston_color.jpg"
    },
    {
        title: "John Smith",
        type: "illustration",
        thumb: "thumbs/low_John Smith.jpg",
        full: "images/low_John Smith.jpg"
    },
    {
        title: "Luke",
        type: "illustration",
        thumb: "thumbs/low_Luke.jpg",
        full: "images/low_Luke.jpg"
    },
    {
        title: "Kevin y Ben",
        type: "illustration",
        thumb: "thumbs/low_Kevin y Ben.jpg",
        full: "images/low_Kevin y Ben.jpg"
    },
    {
        title: "Dick, Jason and Tim",
        type: "illustration",
        thumb: "thumbs/low_Dick, Jason and Tim.jpg",
        full: "images/low_Dick, Jason and Tim.jpg"
    },
    {
        title: "Jigen",
        type: "illustration",
        thumb: "thumbs/low_jigen_color.jpg",
        full: "images/low_jigen_color.jpg"
    },
    {
        title: "Zenigata",
        type: "illustration",
        thumb: "thumbs/low_Zenigata_color.jpg",
        full: "images/low_Zenigata_color.jpg"
    },
    {
        title: "Murdoc",
        type: "illustration",
        thumb: "thumbs/low_murdoc_color.jpg",
        full: "images/low_murdoc_color.jpg"
    },
    {
        title: "Braceface",
        type: "illustration",
        thumb: "thumbs/low_braceface.jpg",
        full: "images/low_braceface.jpg"
    },
    {
        title: "Richard Duke",
        type: "illustration",
        thumb: "thumbs/low_Richard Duke_color.jpg",
        full: "images/low_Richard Duke_color.jpg"
    },
    {
        title: "Beryl Gardenant",
        type: "illustration",
        thumb: "thumbs/low_Beryl Gardenant.jpg",
        full: "images/low_Beryl Gardenant.jpg"
    },
    {
        title: "Arias & Osora",
        type: "illustration",
        thumb: "thumbs/LOW_Arias - Osora_color.jpg",
        full: "images/LOW_Arias - Osora_color.jpg"
    },
    {
        title: "Nobisuke Nobi",
        type: "illustration",
        thumb: "thumbs/Nobisuke Nobi_low.jpg",
        full: "images/Nobisuke Nobi_low.jpg"
    },
    {
        title: "Black Wagreymon",
        type: "illustration",
        thumb: "thumbs/marca_Black Wagreymon.jpg",
        full: "images/marca_Black Wagreymon.jpg"
    },
    {
        title: "Makoto",
        type: "illustration",
        thumb: "thumbs/marca_Makoto_color.jpg",
        full: "images/marca_Makoto_color.jpg"
    },
    {
        title: "Commission #1",
        type: "illustration",
        thumb: "thumbs/1_color_low.jpg",
        full: "images/1_color.jpg"
    },
    {
        title: "Commission Color",
        type: "illustration",
        thumb: "thumbs/low_color.jpg",
        full: "images/low_color.jpg"
    },
    {
        title: "Commission v2",
        type: "illustration",
        thumb: "thumbs/low_1 v2_color.jpg",
        full: "images/low_1 v2_color.jpg"
    },
    {
        title: "Commission B",
        type: "illustration",
        thumb: "thumbs/LOW_1_B_color.jpg",
        full: "images/LOW_1_B_color.jpg"
    },
    {
        title: "GG",
        type: "illustration",
        thumb: "thumbs/gglow_color.jpg",
        full: "images/gglow_color.jpg"
    },
    
    // ========== COMICS ==========
    {
        title: "Bardock Comic Page",
        type: "comic",
        thumb: "thumbs/comic_Bardock_Pag.jpg",
        full: "images/comic_Bardock_Pag.jpg"
    },
    {
        title: "Comic Page 1",
        type: "comic",
        thumb: "thumbs/comic_Page1.jpg",
        full: "images/comic_Page1.jpg"
    }
    
    // ========== ADD NEW ITEMS BELOW ==========
    // {
    //     title: "New Character",
    //     type: "illustration",
    //     thumb: "thumbs/new_image.jpg",
    //     full: "images/new_image.jpg"
    // },
];

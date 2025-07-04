const galleryCollections = require('../data/galleryCollections');

function contentHandler(req, res, next) {
    console.log("--- Content Handler: Preparing site-wide data ---");

    // The t() function should already be on res.locals from the previous middleware
    const t = res.locals.t;

    // The basePathWithLang should also be available from pathLanguageHandler
    const basePathWithLang = res.locals.basePathWithLang;

    // --- Prepare a site-wide navigation object ---
    const navigationData = {
        collections: []
    };

    // Loop through the defined order of collection slugs
    galleryCollections.collectionSlugs.forEach(slug => {
        const collectionData = galleryCollections.collections[slug];
        if (collectionData) {
            // Translate the paintings for this collection
            const translatedPaintings = collectionData.paintings.map(painting => ({
                id: painting.id,
                title: t(painting.titleKey),
                path: `${basePathWithLang}/view-painting/${painting.id}` // Example path
            }));

            // Add the fully prepared collection object to our navigation data
            navigationData.collections.push({
                slug: slug,
                title: t(collectionData.titleKey),
                path: `${basePathWithLang}/gallery/${slug}`,
                paintings: translatedPaintings
            });
        }
    });

    // Make this complete, translated navigation structure available to ALL templates
    res.locals.navigation = navigationData;

    console.log("--- Finished preparing site-wide data ---");
    next();
}

module.exports = contentHandler;
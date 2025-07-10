// middleware/galleryCollectionsHandler.js
const galleryCollectionsData = require('../data/galleryCollections.js');

function contentHandler(req, res, next) {
    const t = res.locals.t;
    const basePathWithLang = res.locals.basePathWithLang;

     // Safety check to ensure previous middleware ran correctly
    if (typeof t !== 'function' || !basePathWithLang) {
        console.error("CRITICAL: contentHandler is missing required res.locals. Check middleware order.");
        return next(); // Exit early if prerequisites are missing
    }

    const navigationData = { collections: [] };

    // Check if the data file was loaded correctly and has the expected structure
    if (galleryCollectionsData && galleryCollectionsData.collectionSlugs) {
        
        // Loop through each collection slug in the defined order
        galleryCollectionsData.collectionSlugs.forEach(slug => {
            const collectionData = galleryCollectionsData.collections[slug];

            if (collectionData) {
                // --- Step 1: Prepare the list of paintings for this collection ---
                const translatedPaintings = (collectionData.paintings || []).map(painting => {
                    // For each painting, create a new object with fully translated text
                    return {
                        id: painting.id,
                        fileName: painting.fileName,
                        path: `${basePathWithLang}/view-painting/${painting.id}`,
                        
                        // Use the 't' function to translate each key from the data file
                        title: t(painting.titleKey),
                        description: t(painting.description),
                        year: t(painting.year),
                        medium: t(painting.medium),
                        dimensions: t(painting.dimensions)
                    };
                });

                // --- Step 2: Prepare the main collection object ---
                navigationData.collections.push({
                    slug: slug,
                    // Use the 't' function to translate the collection's title
                    title: t(collectionData.titleKey, { defaultValue: slug }),
                    path: `${basePathWithLang}/gallery/${slug}`,
                    ejsFile: collectionData.ejsFile,
                    
                    // Add the array of fully translated paintings to this collection object
                    paintings: translatedPaintings
                });
            } else {
                console.warn(`ContentHandler: No collection data found for slug: '${slug}' in galleryCollections.js`);
            }
        });
    }

    // --- Step 3: Attach the complete data structure to res.locals ---
    // Now, every EJS template has access to a 'navigation' object
    // with all collections and paintings, fully translated.
    res.locals.navigation = navigationData;

    next(); // Pass control to the next middleware or route handler
}

module.exports = contentHandler;
// middleware/galleryCollectionsHandler.js
const galleryCollectionsData = require('../data/galleryCollections.js');

function contentHandler(req, res, next) {
    const t = res.locals.t;
    const basePathWithLang = res.locals.basePathWithLang;
    const navigationData = { collections: [] };

    if (galleryCollectionsData && galleryCollectionsData.collectionSlugs) {
        galleryCollectionsData.collectionSlugs.forEach(slug => {
            const collectionData = galleryCollectionsData.collections[slug];
            if (collectionData) {
                const translatedPaintings = (collectionData.paintings || []).map(painting => ({
                    id: painting.id,
                    title: t(painting.titleKey, { defaultValue: painting.id }),
                    path: `${basePathWithLang}/view-painting/${painting.id}`,
                    fileName: painting.fileName
                }));
                navigationData.collections.push({
                    slug: slug,
                    title: t(collectionData.titleKey, { defaultValue: slug }), // Uses titleKey
                    path: `${basePathWithLang}/gallery/${slug}`,
                    paintings: translatedPaintings
                });
            }
        });
    }
    res.locals.navigation = navigationData;
    next();
}
module.exports = contentHandler;
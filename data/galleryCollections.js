// data/galleryCollections.js
const galleryCollectionsData = {
    "new-collection": { // This key should match the URL parameter
        fr: { title: "Nouvelle collection", ejsFile: 'new-collection' },
        en: { title: "New collection", ejsFile: 'new-collection' }
    },
    "black-collection": {
        fr: { title: 'Collection noire', ejsFile: 'black-collection' },
        en: { title: 'Black collection', ejsFile: 'black-collection' }
    },
    "mor-talla-collection": {
        fr: { title: 'Collection Mor talla', ejsFile: 'mor-talla' },
        en: { title: 'Mor talla collection', ejsFile: 'mor-talla' }
    },
    "family-collection": {
        fr: { title: 'Collection famille', ejsFile: 'family' },
        en: { title: 'Family collection', ejsFile: 'family' }
    },
    "special-edition": {
        fr: { title: 'Hors série', ejsFile: 'special-edition' },
        en: { title: 'Special edition', ejsFile: 'special-edition' }
    }
};

module.exports = galleryCollectionsData;
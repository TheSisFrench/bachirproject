

const galleryCollectionsData = {
    collectionSlugs: ["new-collection", "family-collection", "special-edition", "mor-talla-collection", "black-collection"],
    
    collections: {
        "new-collection": { // This key should match the URL parameter

            titleKey: "collection_new_collection", 
            ejsFile: 'new-collection',
            paintings:  [
                {
                    id: "the-last-masters-laws",
                    titleKey: "the_last_masters_laws",
                    imageClass: "les-dernieres-louas-du-maitre",
                },
                {
                    id: "the-visitors",
                    titleKey: "the_visitors",
                    imageClass: "les-visiteurs"
                },
                {
                    id: "endures",
                    titleKey: "endures",
                    imageClass: "perdure"
                },
            ]
        },
        "family-collection": {

            titleKey: 'collection_family_collection', 
            ejsFile: 'family',
            paintings: [
                {
                    id: "generational-link",
                    titleKey: "generational_link",
                    imageClass: "lien-generationnel"
                },
                {
                    id: "family-picture",
                    titleKey: "family_picture",
                    imageClass: "photo-de-famille"
                },
                {
                    id: "little-sidi",
                    titleKey: "little-sidi",
                    imageClass: "le-petit-sidi"
                },
            ] 
        },

        "special-edition": {
            titleKey: 'collection_special_edition', 
            ejsFile: 'special-edition',
            paintings:  [
                {
                    id: "samba-alar",
                    titleKey: "samba_alar",
                    imageClass: "samba-alar"
                },
                {
                    id: "jamonoy-white-night",
                    titleKey: "jamonoy_white_night",
                    imageClass: "jamonoy-nuit-blanche"
                }
            ]
        },
        "mor-talla-collection": {

            titleKey: 'collection_mor_talla-collection', 
            ejsFile: 'mor-talla',
            paintings: [
                {
                    id: "mor-talla-and-wooden-sticks",
                    titleKey: "mor_talla_and_wooden_sticks",
                    imageClass: "mor-talla-et-les-bouts-de-bois"
                },
                {
                    id: "the-eye-catcher",
                    titleKey: "the_eye_catcher",
                    imageClass: "le-tape-a-loeil"
                },
                {
                    id: "law-of-the-strongest",
                    titleKey: "law_of_the_strongest",
                    imageClass: "la-loi-du-plus-fort"
                }
            ]
        },
        
        "black-collection": {

            titleKey: 'collection_black_collection', 
            ejsFile: 'black-collection',
            paintings: [
                {
                    id: "for-bi-gathering",
                    titleKey: "for_bi_gathring",
                    imageClass: "for-bi-le-ramassage"
                },
                {
                    id: "armchair",
                    titleKey: "armchair",
                    imageClass: "le-fauteuil"
                }
            ]
        },
    }
};

module.exports = galleryCollectionsData;
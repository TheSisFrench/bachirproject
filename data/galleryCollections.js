

const galleryCollectionsData = {
    collectionSlugs: ["new-collection", "family-collection", "special-edition", "mor-talla-collection", "black-collection"],
    
    collections: {
        "new-collection": { // This key should match the URL parameter

            titleKey: "collection_new_collection", 
            ejsFile: 'new-collection',
            paintings:  [
                {
                    id: "the-last-masters-laws",
                    titleKey: "painting_the_last_masters_laws",
                    imageClass: "les-dernieres-louas-du-maitre",
                },
                {
                    id: "the-visitors",
                    titleKey: "painting_the_visitors",
                    imageClass: "les-visiteurs"
                },
                {
                    id: "endures",
                    titleKey: "painting_endures",
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
                    titleKey: "painting_generational_link",
                    imageClass: "lien-generationnel"
                },
                {
                    id: "family-picture",
                    titleKey: "painting_family_picture",
                    imageClass: "photo-de-famille"
                },
                {
                    id: "little-sidi",
                    titleKey: "painting_little-sidi",
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
                    titleKey: "painting_samba_alar",
                    imageClass: "samba-alar"
                },
                {
                    id: "jamonoy-white-night",
                    titleKey: "painting_jamonoy_white_night",
                    imageClass: "jamonoy-nuit-blanche"
                }
            ]
        },
        "mor-talla-collection": {

            titleKey: 'collection_mor_talla_collection', 
            ejsFile: 'mor-talla',
            paintings: [
                {
                    id: "mor-talla-and-wooden-sticks",
                    titleKey: "painting_mor_talla_and_wooden_sticks",
                    imageClass: "mor-talla-et-les-bouts-de-bois"
                },
                {
                    id: "the-eye-catcher",
                    titleKey: "painting_the_eye_catcher",
                    imageClass: "le-tape-a-loeil"
                },
                {
                    id: "law-of-the-strongest",
                    titleKey: "painting_law_of_the_strongest",
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
                    titleKey: "painting_for_bi_gathering",
                    imageClass: "for-bi-le-ramassage"
                },
                {
                    id: "armchair",
                    titleKey: "painting_armchair",
                    imageClass: "le-fauteuil"
                }
            ]
        },
    }
};

module.exports = galleryCollectionsData;
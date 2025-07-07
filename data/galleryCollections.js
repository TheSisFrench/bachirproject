

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
                    fileName: "les_dernieres_louas_du_maitre",
                },
                {
                    id: "the-visitors",
                    titleKey: "painting_the_visitors",
                    fileName: "les_visiteurs"
                },
                {
                    id: "endures",
                    titleKey: "painting_endures",
                    fileName: "perdure"
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
                    fileName: "lien_generationnel"
                },
                {
                    id: "family-picture",
                    titleKey: "painting_family_picture",
                    fileName: "photo_de_famille"
                },
                {
                    id: "little-sidi",
                    titleKey: "painting_little_sidi",
                    fileName: "le_petit_sidi"
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
                    fileName: "samba_alar"
                },
                {
                    id: "jamonoy-white-night",
                    titleKey: "painting_jamonoy_white_night",
                    fileName: "jamonoy_nuit_blanche"
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
                    fileName: "mor_talla_et_les_bouts_de_bois"
                },
                {
                    id: "the-eye-catcher",
                    titleKey: "painting_the_eye_catcher",
                    fileName: "le_tape_a_loeil"
                },
                {
                    id: "law-of-the-strongest",
                    titleKey: "painting_law_of_the_strongest",
                    fileName: "la_loi_du_plus_fort"
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
                    fileName: "for_bi_le_ramassage"
                },
                {
                    id: "armchair",
                    titleKey: "painting_armchair",
                    fileName: "le_fauteuil"
                }
            ]
        },
    }
};

module.exports = galleryCollectionsData;
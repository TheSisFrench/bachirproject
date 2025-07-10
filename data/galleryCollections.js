

const galleryCollectionsData = {
    collectionSlugs: ["new-collection", "family-collection", "special-edition", "mor-talla-collection", "black-collection"],
    
    collections: {
        "new-collection": { // This key should match the URL parameter
            
            titleKey: "collection_new_collection", 
            ejsFile: 'new-collection',
            paintings:  [
                {
                    id: "soliloquy-of-a-shipwreck",
                    titleKey: "painting_soliloquy_of_a_shipwreck",
                    fileName: "soliloque_dun_naufrage.svg",
                    description: "painting_soliloquy_of_a_shipwreck_description",
                    year: "painting_soliloquy_of_a_shipwreck_year",
                    medium: "painting_soliloquy_of_a_shipwreck_medium",
                    dimensions: "painting_soliloquy_of_a_shipwreck_dimensions"
                },
                {
                    id: "the-last-masters-laws",
                    titleKey: "painting_the_last_masters_laws",
                    fileName: "les_dernieres_louas_du_maitre.svg",
                    description: "painting_the_last_masters_laws_description",
                    year: "painting_the_last_masters_laws_year",
                    medium: "painting_the_last_masters_laws_medium",
                    dimensions: "painting_the_last_masters_laws_dimensions"
                },
                {
                    id: "the-visitors",
                    titleKey: "painting_the_visitors",
                    fileName: "les_visiteurs.svg",
                    description: "painting_the_visitors_description",
                    year: "painting_the_visitors_year",
                    medium: "painting_the_visitors_medium",
                    dimensions: "painting_the_visitors_dimensions"
                },
                {
                    id: "endures",
                    titleKey: "painting_endures",
                    fileName: "perdure.svg",
                    description: "painting_endures_description",
                    year: "painting_endures_year",
                    medium: "painting_endures_medium",
                    dimensions: "painting_endures"
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
                    fileName: "lien_generationnel.svg",
                    description: "painting_generational_link_description",
                    year: "painting_generational_link_year",
                    medium: "painting_generational_link_medium",
                    dimensions: "painting_generational_link_dimensions"
                },
                {
                    id: "family-picture",
                    titleKey: "painting_family_picture",
                    fileName: "photo_de_famille.svg",
                    description: "painting_family_picture_description",
                    year: "painting_family_picture_year",
                    medium: "painting_family_picture_medium",
                    dimensions: "painting_family_picture_dimensions"
                },
                {
                    id: "little-sidi",
                    titleKey: "painting_little_sidi",
                    fileName: "le_petit_sidi.svg",
                    description: "painting_little_sidi_description",
                    year: "painting_little_sidi_year",
                    medium: "painting_little_sidi_medium",
                    dimensions: "painting_little_sidi_dimensions"
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
                    fileName: "samba_alar.svg",
                    description: "painting_samba_alar_description",
                    year: "painting_samba_alar_year",
                    medium: "painting_samba_alar_medium",
                    dimensions: "painting_samba_alar_dimensions"
                },
                {
                    id: "jamonoy-white-night",
                    titleKey: "painting_jamonoy_white_night",
                    fileName: "jamonoy_nuit_blanche.svg",
                    description: "painting_jamonoy_white_night",
                    year: "painting_jamonoy_white_night_year",
                    medium: "painting_jamonoy_white_night_medium",
                    dimensions: "painting_jamonoy_white_night_dimensions"
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
                    fileName: "mor_talla_et_les_bouts_de_bois.svg",
                    description: "painting_mor_talla_and_wooden_sticks_description",
                    year: "painting_mor_talla_and_wooden_sticks_year",
                    medium: "painting_mor_talla_and_wooden_sticks_medium",
                    dimensions: "painting_mor_talla_and_wooden_sticks_dimensions"
                },
                {
                    id: "the-eye-catcher",
                    titleKey: "painting_the_eye_catcher",
                    fileName: "le_tape_a_loeil.svg",
                    description: "painting_the_eye_catcher_description",
                    year: "painting_the_eye_catcher_year",
                    medium: "painting_the_eye_catcher_medium",
                    dimensions: "painting_the_eye_catcher_dimensions"
                },
                {
                    id: "law-of-the-strongest",
                    titleKey: "painting_law_of_the_strongest",
                    fileName: "la_loi_du_plus_fort.svg",
                    description: "painting_law_of_the_strongest_description",
                    year: "painting_law_of_the_strongest_year",
                    medium: "painting_law_of_the_strongest_medium",
                    dimensions: "painting_law_of_the_strongest_dimensions"
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
                    fileName: "for_bi_le_ramassage.svg",
                    description: "painting_for_bi_gathering_description",
                    year: "painting_for_bi_gathering_year",
                    medium: "painting_for_bi_gathering_medium",
                    dimensions: "painting_for_bi_gathering_dimensions"
                },
                {
                    id: "armchair",
                    titleKey: "painting_armchair",
                    fileName: "le_fauteuil.svg",
                    description: "painting_armchair_description",
                    year: "painting_armchair_year",
                    medium: "painting_armchair_medium",
                    dimensions: "painting_armchair_dimensions"
                },
                {
                    id: "privation",
                    titleKey: "painting_privation",
                    fileName: "privation.svg",
                    description: "painting_privation_description",
                    year: "painting_privation_year",
                    medium: "painting_privation_medium",
                    dimensions: "painting_privation_dimensions"
                },
                {
                    id: "on-the-plate",
                    titleKey: "painting_on_the_plate",
                    fileName: "sur_le_plat.svg",
                    description: "painting_on_the_plate_description",
                    year: "painting_on_the_plate_year",
                    medium: "painting_on_the_plate_medium",
                    dimensions: "painting_on_the_plate_dimensions"
                },
                {
                    id: "marionnettes",
                    titleKey: "painting_marionnettes",
                    fileName: "les_marionnettes.svg",
                    description: "painting_marionnettes_description",
                    year: "painting_marionnettes_year",
                    medium: "painting_marionnettes_medium",
                    dimensions: "painting_marionnettes_dimensions"
                },
                {
                    id: "soup-kitchen",
                    titleKey: "painting_soup-kitchen",
                    fileName: "la_soupe_populaire.svg",
                    description: "painting_soup_kitchen_description",
                    year: "painting_soup-kitchen_year",
                    medium: "painting_soup-kitchen_medium",
                    dimensions: "painting_soup-kitchen_dimensions"
                },
                {
                    id: "passengers",
                    titleKey: "painting_passengers",
                    fileName: "les_passagers.svg",
                    description: "painting_passengers_description",
                    year: "painting_passengers_year",
                    medium: "painting_passengers_medium",
                    dimensions: "painting_passengers_dimensions"
                },
                {
                    id: "virus-manipulators",
                    titleKey: "painting_virus_manipulators",
                    fileName: "les_manipulateurs_du_virus.svg",
                    description: "painting_virus_manipulators_description",
                    year: "painting_virus_manipulators_year",
                    medium: "painting_virus_manipulators_medium",
                    dimensions: "painting_virus_manipulators_dimensions"
                },
                {
                    id: "the-system",
                    titleKey: "painting_the_system",
                    fileName: "le_systeme.svg",
                    description: "painting_the_system_description",
                    year: "painting_the_system_year",
                    medium: "painting_the_system_medium",
                    dimensions: "painting_the_system_dimensions"
                }
            ]
        },
    }
};

module.exports = galleryCollectionsData;
// helpers/i18nHelper.js
function getLocalizedText(translations, lang, defaultLang = 'en') {
    if (!translations) return {}; // Return empty object or appropriate default

    // If translations structure is { en: { title: 'Hi'}, fr: { title: 'Salut'} }
    if (typeof translations === 'object' && translations[lang]) {
        return translations[lang];
    }
    if (typeof translations === 'object' && translations[defaultLang]) {
        return translations[defaultLang];
    }
    // Fallback if language specific object not found but translations is an object
    if (typeof translations === 'object') {
        const firstLangKey = Object.keys(translations)[0];
        return firstLangKey ? translations[firstLangKey] : {};
    }
    // If translations itself is just a string (not an object of translations)
    if (typeof translations === 'string') {
        return { defaultText: translations }; // Wrap it or handle as needed
    }
    return {}; // Ultimate fallback
}

module.exports = {
    getLocalizedText
};
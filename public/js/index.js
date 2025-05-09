//variables
const paintingTitle = document.querySelector('.painting-title');
const nav = document.querySelector('nav');
const firstSection = document.querySelector('#first-section');
const mainHeader = document.querySelector(".main-header");
const secondSection = document.querySelector("#second-section");
const footer = document.querySelector("footer");
const paintingContainer = document.querySelector('.painting-container');
const thirdSection = document.querySelector('#third-section');
const menu = document.querySelector('.menu');
const menuContainer = document.querySelector('.menu-container');
const navLogoContainer = document.querySelector('.nav-logo-container')
const navSections = document.querySelectorAll('.nav-section');
const blurEffect = document.querySelector('.blur-effect');
const navLogo = document.getElementById('nav-logo');



// root css variables
const rootStyles = getComputedStyle(document.documentElement);

//code for the header


const navHeight = rootStyles.getPropertyValue('--nav-height');
let visibleSection = false;
let actualVisibleSection = '';
let previousSection = '';
let selectionTarget = '';   //the menu selection that is hovered

document.body.addEventListener('mouseover', (event) => {
    const store = document.querySelector('.store');
    const contact = document.querySelector('.contact');


    if (event.target.closest('nav') != null) {

        navSections.forEach(selection =>   {
            let sectionHeight = selection.scrollHeight;            

            //excludes animation when hovering on certain nsv bar elements
            if (event.target === navLogoContainer || event.target === contact  || event.target === store || event.target === navLogo) {
                closeNavExtension();        
            } else if (selection.id === event.target.dataset.target)  {

                if (actualVisibleSection === '') {
                    selectionTarget = event.target
                    nav.style.maxHeight = `${window.innerHeight}px`;
                    selection.style.maxHeight = `${sectionHeight}px`;

                } else if(actualVisibleSection != selection.id) {
                    previousSection = document.getElementById(actualVisibleSection);
                    previousSection.style.maxHeight = "0";
                    selection.style.maxHeight = `${sectionHeight}px`;
                    visibleSection = false;

                    //deleate hover class for nav menu selection
                    keepNavSelectionActive(selectionTarget);
                    selectionTarget = event.target;
                }
                actualVisibleSection = selection.id;
                visibleSection = true;
                keepNavSelectionActive(selectionTarget);
                
                window.addEventListener('scroll', () => {
                    closeNavExtension();
                });
            }     
        }) 
        
    } else if (event.target.closest('nav') === null && visibleSection)  {
        closeNavExtension();  
    }
});

// if mouse leaves the document viewport, cancel nav hover animation 
document.addEventListener('mouseout', (event) =>    {
    if (!event.relatedTarget && !event.toElement)   {
        closeNavExtension();
    }
});

function closeNavExtension()    {
    if (actualVisibleSection)   {
        nav.style.maxHeight = navHeight;
        const openedSection = document.getElementById(actualVisibleSection);
        openedSection.style.maxHeight = "0";
        actualVisibleSection = '';
        visibleSection = false;
        keepNavSelectionActive(selectionTarget);
        selectionTarget = '';
        blurEffect.style.visibility = "hidden";
        blurEffect.style.opacity = "0";
    }
};

//target is the nav extension hovered
function keepNavSelectionActive(target)  {
    if (visibleSection && target.dataset.target != 'contact' && target.dataset.target != 'store')   {
        target.classList.add('to-source-active')
        blurEffect.style.visibility = "visible";
        blurEffect.style.opacity = "1";
    } else if (!visibleSection)  {
        target.classList.remove('to-source-active')
    }
};



//code for footer


//send email button

document.getElementById("sendEmailBtn").addEventListener("click", function () {
    const email = 'lebachart@gmail.com';
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById("message").value.trim();

    // Create the mailto link
    const mailtoLink = `mailto:${email}?subject=Message d'un amateur d'art - ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;

    // Open the user's mail app
    window.location.href = mailtoLink;
});


//return up arrow

//return to the top of the page

function returnUp() {
    document.querySelector('#nav')?.scrollIntoView({
        behavior: 'smooth', 
        block: 'start'
    });

}





// code for home page


if(document.body.classList.contains('home'))    {const slides = document.querySelectorAll('.slideshow-container .slide');
    let currentSlideIndex = 0;
    const intervalTime = 5000; // 5000 milliseconds = 5 seconds (Time slide is visible)
    const transitionDuration = 1000; // Match CSS transition duration (1000ms = 1 second)

    // Function to move to the next slide
    function nextSlide() {
        // Get the currently visible slide element
        const currentSlide = slides[currentSlideIndex];

        // Calculate the index and element of the next slide (handles looping)
        const nextSlideIndex = (currentSlideIndex + 1) % slides.length;
        const nextSlide = slides[nextSlideIndex];
        nextSlide.classList.remove('hidden');

        // --- Initiate the transition ---

        // 1. Add the 'leaving' class to the current slide.
        // This starts its movement from translateX(0) to translateX(-101%).
        // Use a small delay with requestAnimationFrame to ensure the browser
        // registers this class change before the next steps.
         requestAnimationFrame(() => {
             currentSlide.classList.add('leaving');
             nextSlide.classList.add('active');
             currentSlide.classList.remove('active');

         });

        // --- Clean up the old slide after its exit transition ---
        // Use setTimeout to wait for the 'leaving' transition to finish
        setTimeout(() => {
            // 1. Temporarily disable transition for the old slide
            currentSlide.classList.add('no-transition');

            // 2. Remove the 'leaving' class
            // This causes its transform to fall back to the default
            // translateX(101%). Because no-transition is active, this happens instantly.
            currentSlide.classList.remove('leaving');

            // 3. Re-enable transition for the old slide *after* the browser registers the transform change
            // Use rAF or setTimeout(0) to push this to the next rendering tick.
            requestAnimationFrame(() => {
                 currentSlide.classList.remove('no-transition');
            });

            currentSlide.classList.add('hidden')

        }, transitionDuration); // The timeout duration matches the CSS transition duration

        // Update the current slide index for the next interval
        currentSlideIndex = nextSlideIndex;
    }

    // Start the automatic slideshow interval
    setInterval(nextSlide, intervalTime);

    // Optional: Ensure pointer events are enabled only for the active slide initially
     slides.forEach((slide, index) => {
         if (index !== currentSlideIndex) {
             slide.style.pointerEvents = 'none';
         } else {
             slide.style.pointerEvents = 'all';
         }
     });


}






// code use on main.html

//GALLERY

window.addEventListener('DOMContentLoaded', () =>   {
    if (document.body.classList.contains('gallery-page'))   {
        

        //skip to gallery button appears when hover firstSection of main section
        const skipToGalleryContainer = document.querySelector('.skip-to-gallery-container');
        const firstSection = document.getElementById('first-section');
        let firstSectionRect = firstSection.getBoundingClientRect();

        if ((firstSectionRect.bottom - skipToGalleryContainer.offsetHeight) >= 0 && footer.getBoundingClientRect.bottom - skipToGalleryContainer.offsetHeight >=0) {
            skipToGalleryContainer.style.opacity = "1";
            skipToGalleryContainer.style.visibility = "visible";
        }
    }  
});


if (document.body.classList.contains('gallery-page'))   {
    const portfolioContainers = document.querySelectorAll('.portfolio-container');


    window.addEventListener('load', function () {

        portfolioContainers.forEach((portfolioContainer) => {
            const paintingName = portfolioContainer.querySelector('.painting-name');

            Object.keys(paintings).forEach((key) => {
                const painting = paintings[key];
                if(painting.title === paintingName.textContent) {
                    //creer le <p> pour la taille
                    const dimensions = document.createElement('p');
                    dimensions.classList.add('painting-description');
                    dimensions.textContent = painting.dimensions;

                    //creer le <p> pour le medium
                    const medium = document.createElement('p');
                    medium.classList.add('painting-description');
                    medium.textContent = painting.medium.fr;

                    //creer le <p> pour year
                    const year = document.createElement('p');
                    year.classList.add('painting-description');
                    year.textContent = painting.year;

                    //add painting descriptions
                    const paintingDescriptionSec = portfolioContainer.querySelector('.painting-description-section');
                    paintingDescriptionSec.append(dimensions, medium, year)
                    
                    //set the painting image
                    const paintingImg = portfolioContainer.querySelector('.painting-items');
                    paintingImg.src = painting.image;
                }
            })
        })

        
    })
    
}





//PAINTING
//break the main title in lines


const paintingLink = document.querySelectorAll('.painting-link');

paintingLink.forEach(selection =>    {
    selection.addEventListener('click', () =>   {
        localStorage.setItem("paintingName", selection.textContent)
        selection.href = "/index/painting_page.html";
    })
});

window.addEventListener('load', () => {
    if (document.body.classList.contains('painting-page'))    {
        const paintingSelected = localStorage.getItem("paintingName");
        loadPaintingPage(paintingSelected);
    }
    
})


function breakInLines(title) {
    const paintingTitleText = document.querySelector('#painting-title-text');
    // Clear existing tspans
    paintingTitleText.textContent = "";

    // Measure 80% of viewport width
    const maxWidthPx = window.innerWidth * 0.8;

    // Font size in px (matches 15rem = 240px)
    const fontSize = 120;
    const avgCharWidth = fontSize * 0.5; // Roughly 45% of font-size per character
    const maxCharsPerLine = Math.floor(maxWidthPx / avgCharWidth);

    // Split and wrap
    const words = title.split(" ");
    let currentLine = "";
    const lines = [];

    words.forEach(word => {
        if ((currentLine + word).length <= maxCharsPerLine) {
            currentLine += word + " ";
        } else {
            lines.push(currentLine.trim());
            currentLine = word + " ";
        }
    });
    if (currentLine) lines.push(currentLine.trim());

    // Add tspans
    lines.forEach((line, index) => {
        const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspan.setAttribute("x", "50%");
        tspan.setAttribute("dy", index === 0 ? "0" : "1em");
        tspan.textContent = line;
        paintingTitleText.appendChild(tspan);
    });
};

//resizing the painting title while scrolling



let ticking = false;

function handleScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            changeZoomEffectOnScroll(); // zoom effect on .painting-title
            resizePainting();           // zoom effect on .painting
            ticking = false;            // ready for the next scroll frame
        });
        ticking = true; // prevents multiple requestAnimationFrame calls
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });


function changeZoomEffectOnScroll() {
    if (document.body.classList.contains('painting-page'))   {
        const paintingTitle = document.querySelector('.painting-title-text');
    
        const startSticky = nav.offsetHeight; // 
        const endSticky = startSticky + window.innerHeight * 5; // Scroll range
        const scrollPosition = window.scrollY;

        const baseScale = 1;
        const maxScale = 1;
        let scale = baseScale;

        if (scrollPosition >= startSticky && scrollPosition <= endSticky) {
            const progress = (scrollPosition - startSticky) / (endSticky - startSticky);
            scale = baseScale + progress * (maxScale - baseScale);

        } else if (scrollPosition < startSticky) {
            scale = baseScale;
        } else {
            scale = maxScale;
        }

        paintingTitle.style.transform = `scale(${scale})`;
        }
}


window.addEventListener('scroll', handleScroll, { passive: true });
changeZoomEffectOnScroll();





//resize and move the painting when sticky
function resizePainting() {

    if (document.body.classList.contains('painting-page')) {
        const scrollPosition = window.scrollY;

    const baseScalePainting = 1;
    const minScalePainting = 0.7;

    const firstSection = document.querySelector('#first-section');
    const nav = document.querySelector('nav');
    const painting = document.querySelector('.painting');

    const startStickyPainting = nav.offsetHeight + firstSection.offsetHeight;
    const endStickyPainting = startStickyPainting + paintingContainer.offsetHeight - window.innerHeight;

    let scale = baseScalePainting;

    if (scrollPosition >= startStickyPainting && scrollPosition <= endStickyPainting) {
        const progress = (scrollPosition - startStickyPainting) / (endStickyPainting - startStickyPainting);
        scale = baseScalePainting - progress * (baseScalePainting - minScalePainting);
    } else if (scrollPosition > endStickyPainting) {
        scale = minScalePainting;
    } else if (scrollPosition < startStickyPainting) {
        scale = baseScalePainting;
    }

    painting.style.transform = `scale(${scale})`;
    }
    
}

if (document.body.classList.contains('painting-page'))    {
    resizePainting();
}

function showMainHeader ()  {
    const secondSectionRect = secondSection.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();

    if (secondSectionRect.bottom <= window.innerHeight && footerRect.top > window.innerHeight)  {
        mainHeader.style.top = "0";
        mainHeader.style.opacity = "1";
    } else  {
        mainHeader.style.top = "-20vh"
        mainHeader.style.opacity = "0";
    }
}

if(document.body.classList.contains('painting-page'))   {
    window.addEventListener('scroll', showMainHeader);
}






//painting page loading

//paintings

const paintings = {

    // serie la plus recente
    "Les dernières louas du maître":   {
        title: "Les dernières louas du maître",
        image: "/img/les_dernieres_louas_du_maitre.jpg",
        description: {
            fr: "Ce soir là, Baye Cheikh ordonna de confisquer toute l'opinion publique ! Les sourcils froncés, il prit sa monture, masquant son angoisse avec une allure de Chevalier il dicta ses dernières louas...",
            en: "That evening, Baye Cheikh ordered the confiscation of the entire public opinion! With furrowed brows, he mounted his steed, masking his anxiety with the demeanor of a knight, and dictated his final praises..."
        },
        year: "2024",
        medium: {
            fr: "Technique : collage, couteau, acrylique sur toile",
            en: "Medium : Collage, palette knife, acrylic on canvas"
        },
        dimensions: "120 X 150 (cm)"
    },

    "Les visiteurs":    {
        title:"Les visiteurs",
        image: "/img/les_visiteurs.png",
        description:    {
            fr: "Ils sortaient de partout",
            en: "They came out of everywhere"
        },
        year: "2024",
        medium: {
            fr: "Technique : Collage pastel gras, acrylique sur toile",
            en: "Medium : Oil pastel collage, acrylic on canvas"
        },
        dimensions: "120 X 160 (cm)"
    },


    //deuxieme serie (family)
    "Perdure":  {
        title: "Perdure",
        image: "/img/perdure.png",
        description:    {
            fr: "Il m'ont appris à pêcher, et sont partis me décrocher la Lune. Tonton Mor Talla m'a dit d'attendre ici, ils reviendront bientôt. Tonton Mor Talla est gentil. J'attends toujours. Wakh sa guiss.",
            en: "They taught me how to fish, then left to bring me the Moon. Uncle Mor Talla told me to wait — they’ll be back soon. He’s kind. I’m still waiting. Wakh sa guiss."
        },
        year: "2024",
        medium: {
            fr: "Technique : Acrylique sur toile, technique mixte",
            en: "Medium : Acrylic on canvas, mixed media"
        },
        dimensions: "110 X 150 (cm)"
    },

    "Lien générationnel":   {
        title: "Lien générationnel",
        image: "/img/lien_generationnel.svg",
        description: {
            fr: "",
            en: ""
        },
        year: "2024",
        medium: {
            fr: "Technique : Acrylique sur toile, technique mixte",
            en: "Medium : Acrylic on canvas, mixed media"
        },
        dimensions: "140 X 150 (cm)"
    },

    "Photo de famille": {
        title: "Photo de famille",
        image: "/img/photo_de_famille.png",
        description:    {
            fr: "Les enfants sont l'avenir de demain. Ils sont les futurs successeurs de la Cité, les relais de la République. Ils ont droit à l'éducation, à la santé et aux loisirs. Au fil du temps, je m'inquiète beaucoup pour eux ; ils naissent et grandissent en étant témoins de nos mauvaises actions et de nos actes qui nous divisent et nous éloignent de plus en plus les uns des autres. Où allons-nous ? À qui la faute ? À ce rythme, si nous ne nous réveillons pas rapidement, nous n'aurons rien a leur leguer",
            en: "Children are tomorrow's future. They are the future successors of the City, the relays of the Republic. They have a right to education, health and leisure. As time goes by, I worry a lot about them; they are born and grow up witnessing our bad deeds and actions that divide us and drive us further and further apart. Where are we headed? Whose fault is it? At this rate, if we don't wake up soon, we'll have nothing to leave them."
        },
        year: "2023",
        medium: {
            fr: "Technique : Collage, couteau, acrylique du toile",
            en: "Medium : Collage, knife, acrylic on canvas"
        },
        dimensions: "120 X 160 (cm)"
    },

    "Le petit Sidi":    {
        title: "Le petit Sidi",
        image: "/img/le_petit_sidi.svg",
        description:    {
            fr: "",
            en: ""
        },
        year: "2023",
        medium: {
            fr: "Technique : collage, couteau, acrylique sur toile",
            en: "Medium : Collage, palette knife, acrylic on canvas"
        },
        dimensions: "80 X 100 (cm)"
    },


    //collection hors serie

    "Jamonoy Nuit Blanche": {
        title: "Jamonoy nuit blanche",
        image: "/img/jamonoy_nuit_blanche.jpg",
        description: {
            fr :"Ils ont essayé de ramener un peu de calme dans le village. C'était comme au bon vieux temps : femmes, hommes, oncles, tantes, soeurs et frères étaient tous de la partie (Nane lait ballouker - Fourel - Diapizé - Wakhsaguiss)",
            en: "They tried to bring a bit of calm back to the village. It felt just like the good old days — women, men, uncles, aunts, sisters and brothers were all part of it.(Nane lait ballouker – Fourel – Diapizé – Wakhsaguiss)"
        },
        year: "2023",
        medium: {
            fr: "Technique : Acrylique sur toile, technique mixte",
            en: "Medium : Acrylic on canvas, mixed media"
        },
        dimensions: "80 X 100 (cm)",
    },

    "Samba Alar":   {
        title: "Samba Alar",
        image: "/img/samba_alar.svg",
        description: {
            fr: "Si tu veux que je vienne à ta fête faudra me réserver la place de devant. Noublie pas que je ne suis pas n'importe qui.",
            en: "If you want me to come to your party, you better save me a seat in the front. Don’t forget — I’m not just anybody."
        },
        year: "2023",
        medium: {
            fr:"Technique : Collage, couteau, acrylique sur toile",
            en: "Medium : Collage, palette knife, acrylic on canvas"
        },
        dimensions: "90 X 110 (cm)",
    },

    
    //shark header collection (Mor talla serie)
    "Mor Talla et les bouts de bois":   {
        title: "Mor Talla et les bouts de bois",
        image: "/img/mor_talla_et_les_bouts_de_bois.jpg",
        description:    {
            fr: "Mor talla adore les bouts de bois",
            en: "Mor talla loves bits of wood"
        },
        year: "2022-2023",
        medium: {
            fr: "Technique : Acrylique sur toile, technique mixte",
            en: "Medium : Acrylic on canvas, mixed media"
        },
        dimensions: "110 X 150 (cm)"
    },

    "Le tape à l'oeil": {
        title: "Le tape à l'oeil",
        image: "/img/le_tape_a_loeil.jpg",
        description:    {
            fr: "Voilà Mor Talla qui se promène dans les rues du ThiofLand quand tout à coup, il a aperçu cette chaise rose. Qu’est-ce que c’est ? À quoi peut-elle servir ?...",
            en: "Here's Mor Talla, strolling through the streets of ThiofLand, when all of a sudden he caught sight of this pink chair. But what is it? What's it for?..."
        },
        year: "2022-2023",
        medium: {
            fr: "Technique : Acrylique sur toile, technique mixte",
            en: "Medium : Acrylic on canvas, mixed media"
        },
        dimensions: "80 X 100 (cm)"
    },


    "La loi du plus fort":  {
        title: "La loi du plus fort",
        image: "/img/la_loi_du_plus_fort.svg",
        description: {
            fr: "Une fois que Mor Talla savait. C'est quoi la fonction de cette  chsoe rose, avec 4 pieds, et un dossier il pouvait à présent diriger, maintenir le contrôle et appliquer ses règles.",
            en: "Once Mor Talla understood what that pink thing with four legs and a backrest was for, he could now lead, stay in control, and enforce his own rules."
        },
        year: "2022 - 2023",
        medium: {
            fr: "Technique : acrylique sur toile, technique mixte",
            en: "Medium : Acrylic on canvas, mixed media"
        },
        dimensions: "100 X 150 (cm)"
    },


    "For bi le ramassage":  {
        title: "For bi le ramassage",
        image: "/img/for_bi_le_ramassage.png",
        description:    {
            fr: "Morr Talla a ramassé la chaise et a su très tôt quoi en faire .Il l’a réparé ,il sapprête a l'utiliser.",
            en: "Morr Talla picked up the chair and knew very soon what to do with it, he repaired it and is now ready to use it."
        },
        year: "2022-2023",
        medium: {
            fr: "Technique : Acrylique sur toile, technique mixte",
            en: "Medium : Acrylic on canvas, mixed media"
        },
        dimensions: "110 X 120 (cm)"
    },

    "le fauteuil":  {
        title: "Le fauteuil",
        image: "/img/le_fauteuil.png",
        description:    {
            fr: "Le trésor de toute une cité entre les mains d’une seule personne ..",
            en: "The treasure of an entire city in the hands of one person..."
        },
        year: "2021",
        medium: {
            fr: "Technique : Collage, couteau, acrylique du toile",
            en: "Medium : Collage, knife, acrylic on canvas"
        },
        dimensions: "80 X 96 (cm)"
    },
}


let language = 'fr';

function loadPaintingPage(paintingName) {

    const headerPaintingTitle = document.querySelector('.header-painting-title');

    const painting = document.querySelector('.painting');
    const dimensions = document.querySelector('.dimensions');
    const technique = document.querySelector('.technique');
    const year = document.querySelector('.year');
    const paintingDescription = document.querySelector('.painting-description');
    
    headerPaintingTitle.textContent = paintings[paintingName].title;
    painting.src = paintings[paintingName].image;
    dimensions.textContent = paintings[paintingName].dimensions;
    year.textContent = paintings[paintingName].year;

    if(language === 'fr')   {
        technique.textContent = paintings[paintingName].medium.fr;
        paintingDescription.textContent = paintings[paintingName].description.fr        
    } else  {
        technique.textContent = paintings[paintingName].medium.en;
        paintingDescription.textContent = paintings[paintingName].description.en
    };

    breakInLines(paintings[paintingName].title);
};



//presentation page

if (document.body.classList.contains('presentation-page'))  {


    const welcomeMessageContainer = document.querySelector('.welcome-message-container');
    const firstSlide = document.querySelector('.exhibitions-slide');
    const slideDiscoverArtistContainer = document.querySelector('.slides-discover-artist-container')

    window.addEventListener('DOMContentLoaded', () =>  {
        if(document.body.classList.contains('presentation.page'))    {
            console.log('prensentation-page')
        }
    })

    //resize padding slides container

    function resizePadding()    {
        const indentation = rootStyles.getPropertyValue('--width-indentation');
        const maxWidthPx = rootStyles.getPropertyValue('--max-width');
        
        if((window.innerWidth * (parseInt(indentation) / 100)) >= parseInt(maxWidthPx))    {
            slideDiscoverArtistContainer.style.padding = `0 ${(window.innerWidth - parseInt(maxWidthPx)) / 2}px`;
        } else  {
            slideDiscoverArtistContainer.style.padding = `0 ${(100 - parseInt(indentation)) / 2}vw`
        }
    }

    const presentationImg = document.querySelector('.presentation-img')
    const containerHeight = presentationImg.offsetHeight; // The height of the container
    const maxScroll = containerHeight; // Scroll equivalent to the height of the container

    // Define base variables
    const maxBorderWidth = 4; // Maximum border width in rem (base unit)
    const maxBorderRadius = 6; // Maximum border-radius in rem (base unit)

    let startSticky = null;

    function resizeIntroImg() {
        const scrollPosition = window.scrollY;
        const presentationImgRect = presentationImg.getBoundingClientRect();

        // Step 1: Check if the bottom of the element has reached the bottom of the viewport
        if (presentationImgRect.bottom <= window.innerHeight && startSticky === null) {
            startSticky = scrollPosition; // Start the animation from this point
        }

        // Step 2: Calculate scroll progress (fraction of the element's height scrolled)
        if (startSticky !== null) {
            const scrolledDistance = scrollPosition - startSticky; // Distance scrolled since the bottom reached the viewport
            const scrollFraction = Math.min(scrolledDistance / maxScroll, 1); // Ensure it doesn't exceed 1 (100%)

            // Gradually increase and decrease border and border-radius based on scrollFraction
            const borderWidth = scrollFraction * maxBorderWidth;  // Maximum border width of 5rem
            const borderRadius = scrollFraction * maxBorderRadius; // Maximum border-radius of 6rem

            // Apply the calculated styles
            presentationImg.style.border = `${borderWidth}rem solid #fff`;
            presentationImg.style.borderRadius = `${borderRadius}rem`;

            // Step 3: Reset once we scroll back to the top
            if (scrollPosition === 0) {
                startSticky = null; // Reset the start position
                presentationImg.style.border = '0rem solid #fff';
                presentationImg.style.borderRadius = '0px';
            }
        }
    }

    window.addEventListener('resize', resizePadding);
    window.addEventListener('DOMContentLoaded', resizePadding);
    window.addEventListener('scroll', resizeIntroImg);
      




    const frameViewer = document.querySelector('.frame-viewer');
    const totalFrames = 41;

    // Dynamically create and append 40 image frames
    for (let i = 0; i <= totalFrames; i++) {
        const img = document.createElement('img');
        const frameNumber = String(i).padStart(2, '0');
        img.src = `/img/Bachir_signature/BACHIR_signature_${frameNumber}.svg`;
        img.classList.add('svg-frame');
        if (i !== 1) img.classList.add('hidden');
        frameViewer.appendChild(img);
    }

    const frames = document.querySelectorAll('.svg-frame');
    const scrollContainer = document.querySelector('.scroll-movie-container');
    const scrollStart = scrollContainer.offsetTop;
    const scrollEnd = scrollStart + scrollContainer.offsetHeight - window.innerHeight;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        const progress = Math.min(Math.max((scrollY - scrollStart) / (scrollEnd - scrollStart), 0), 1);
        const frameIndex = Math.floor(progress * (totalFrames - 1));

        frames.forEach((frame, i) => {
            frame.classList.toggle('appear', i === frameIndex);
        });
    });




    //seperate senegal letters for explanation
    const fourthSectionContainer = document.querySelector('.fourth-section-container')
    const senegalContainer = document.querySelector('.senegal-container');
    const senegal = document.querySelector('.senegal')
    const senegalExplanation = document.querySelector('.senegal-explanation')

    let initialPadding = 0;
    let maxPadding = 0;
        
    //setting different padding based on viewport width
    if(window.innerWidth >= 1440) {
        maxPadding = 15; // rem
    } else if (window.innerWidth >= 1080 && window.innerWidth < 1440)   {
        maxPadding = 10; // rem
    } else if (window.innerWidth >= 760 && window.innerWidth < 1080) {
        maxPadding = 7; // rem
    } else if (window.innerWidth < 760) {
        maxPadding = 5; // rem
    }
    

    function seperateSenegal() {

        
        function getOffsetTop(element) {
            let offset = 0;
            while (element) {
                offset += element.offsetTop;
                element = element.offsetParent;
            }
            return offset;
        }
        //setting start and end seperation letters animation
        seperateSenegal.startSticky = getOffsetTop(fourthSectionContainer);
        seperateSenegal.endSticky = getOffsetTop(senegalExplanation) - (window.innerWidth * 0.2);

        
        

        if (window.scrollY >= seperateSenegal.startSticky) {
            let scrollRange = seperateSenegal.endSticky - seperateSenegal.startSticky;
            let progress = (window.scrollY - seperateSenegal.startSticky) / scrollRange;
    
            // Clamp progress between 0 and 1
            progress = Math.max(0, Math.min(progress, 1));
    
            const paddingSize = initialPadding + (progress * (maxPadding - initialPadding));
            
            senegalContainer.style.columnGap = `${paddingSize}rem`;
        }
    }
    
    window.addEventListener('scroll', seperateSenegal);
    
    

    //make Sunugal explanation appear
    function appearText()   {

    const senegal = document.querySelector('.senegal');
    const senegalRect = senegal.getBoundingClientRect();
    const senegalTextSection = document.querySelector('.senegal-text-section');
    const senegalTextSectionRect = senegalTextSection.getBoundingClientRect();

        if(senegalRect.bottom === senegalTextSectionRect.bottom)    {
            const senegalTextExplanationContainer = document.querySelector('.senegal-text-explanation-container');
            senegalTextExplanationContainer.style.opacity = "1";
            senegalTextExplanationContainer.style.visibility = "visible";
        }
    }
    

    window.addEventListener('scroll', appearText);
}



  
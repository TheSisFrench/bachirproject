

function scrollDetect () {

    let lastScroll = 0;

    window.onscroll = function ()   {
        let currentScroll = document.documentElement.scrollTop  || document.body.scrollTop 
        const header = document.getElementById('header');
        const blackBorderLeft = document.querySelector('.black-border-left');
        const blackBorderRight = document.querySelector('.black-border-right')

        let scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;


        if (currentScroll > 0 && lastScroll < currentScroll)    {       //durection down
            const headerHeight = header.offsetHeight;
            header.style.top = -1.2 * headerHeight + "px";
            
        } else  {      //direction up
            header.style.top = "0";
        }
        lastScroll = currentScroll;


        if ((window.scrollY + window.innerHeight) >= (imgFullPage.offsetHeight + firstSection.offsetHeight))    {
            blackBorderLeft.classList.add('active');
            blackBorderRight.classList.add('active');
        }   else    {
            blackBorderLeft.classList.remove('active');
            blackBorderRight.classList.remove('active');

        }                    
        
    }
    
}
scrollDetect();


function hover(description)   {
    const creditsDetails = document.querySelector('.credits');
    creditsDetails.innerHTML = description;
    
}



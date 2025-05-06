const path = document.getElementById('path');
        const length = path.getTotalLength();

        // Set up the path for animation
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

const downArrowPath = document.getElementById('down-arrow-path');

window.onload = function()   {

    // Animate the path drawing over 5 seconds

    path.animate([
        { strokeDashoffset: 0 },
        { strokeDashoffset: length }
        ], {
        duration: 1000,  // 2 seconds
        fill: "forwards",
        });


    //render the link on the opening page
    downArrowPath.style.fill = "#f0c146"
};


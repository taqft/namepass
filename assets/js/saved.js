const namePassEl = $('#name-pass');
const clearBtn = $('#clear-btn');

// HTML elements for dark/light mode
const colorModeSwitch = $('#colormode'); // id="colormode"
const navbarBox = $('#navbar'); // id="navbar"
const body = $('#body'); // id="navbar"

// grab existing information from storage
const namePass = JSON.parse(localStorage.getItem(`namePass`)) || `[]`;

// dynamically add all saved information from storage to the screen
for (let i = 0; i < namePass.length; i++) {
    let namePassItem = $('<li>')
        .text(`${i+1}. User: \u00A0 ${namePass[i].user}`)
        .addClass('btn btn-black btn-rounded my-1')
        .attr('style', "font-size: 1.05em; background: linear-gradient(to bottom right, #000099 5%, #66ccff 129%");
    let passNameItem = $('<li>')
        .text(`${namePass[i].pass}`)
        .addClass('btn btn-rounded text-white my-1')
        .attr('style', "background: linear-gradient(to bottom right, #000099 5%, #66ccff 129%");
    namePassEl.append(namePassItem);
    namePassEl.append(passNameItem);
}

const colorModeSelection = JSON.parse(localStorage.getItem(`colormode`)) || JSON.stringify("dark");

// allow dark mode toggle
// bonus: remember your last setting
if (colorModeSelection == "light") {
    navbarBox.removeClass("navbar-dark");
    navbarBox.removeClass("bg-black");
    body.removeClass("bg-dark");
    navbarBox.addClass("navbar-light");
    navbarBox.addClass("bg-light");
    colorModeSwitch.html("🌙");
} else {
    navbarBox.removeClass("navbar-light");
    navbarBox.removeClass("bg-light");
    navbarBox.addClass("navbar-dark");
    navbarBox.addClass("bg-black");
    body.addClass("bg-dark");
    colorModeSwitch.html("☀️");
};

colorModeSwitch.on('click', () => {
    if (colorModeSwitch.html() == "🌙") {
        localStorage.setItem(`colormode`, JSON.stringify("dark"));
        navbarBox.removeClass("navbar-light");
        navbarBox.removeClass("bg-light");
        navbarBox.addClass("navbar-dark");
        navbarBox.addClass("bg-black");
        body.addClass("bg-dark");
        colorModeSwitch.html("☀️");
    } else {
        localStorage.setItem(`colormode`, JSON.stringify("light"));
        navbarBox.removeClass("navbar-dark");
        navbarBox.removeClass("bg-black");
        body.removeClass("bg-dark");
        navbarBox.addClass("navbar-light");
        navbarBox.addClass("bg-light");
        colorModeSwitch.html("🌙");
    };
});

// when the clear everything button is pressed, all saved data is deleted and the page is refreshed
clearBtn.on('click', () => {
    $('li').each(() => {
        $(this).remove();
    });
    // clear localStorage
    localStorage.setItem(`namePass`, "[]");

    window.location.href = 'saved.html';
});

const namePassEl = $('#name-pass');
const clearBtn = $('#clear-btn');


// grab existing information from storage
const namePass = JSON.parse(localStorage.getItem(`namePass`));

// dynamically add all saved information from storage + the new highscore to the screen
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
    namePassEl.append($('<br />'));
    namePassEl.append(passNameItem);
    namePassEl.append($('<br />'));
}

// when the clear everything button is pressed, all saved data is deleted and the page is refreshed
clearBtn.on('click', () => {
    $('li').each(() => {
        $(this).remove();
    });
    // clear localStorage
    localStorage.setItem(`namePass`, "[]");

    window.location.href = 'saved.html';
});

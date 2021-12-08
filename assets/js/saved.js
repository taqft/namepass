const namePassEl = $('#name-pass');
const clearBtn = $('#clear-btn');


// grab existing information from storage
const namePass = JSON.parse(localStorage.getItem(`namePass`));

// dynamically add all saved information from storage + the new highscore to the screen
for (var i = 0; i < namePass.length; i++) {
    var namePassItem = $('<li>')
        .text(`${i+1}. ${namePass[i].username} - ${namePass[i].password}`)
        .addClass('btn btn-dark btn-rounded');
    namePassEl.append(namePassItem);
}

// clear button
clearBtn.on('click', function () {
    $('li').each(function () {
        $(this).remove();
    });
    // clear localStorage
    localStorage.setItem(`namePass`, "[]");
});


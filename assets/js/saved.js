const namePassEl = $('#name-pass');

// grab existing scores from storage
const namePass = JSON.parse(localStorage.getItem(`namePass`));

// dynamically add all highscores from storage + the new highscore to the screen
for (var i = 0; i < namePass.length; i++) {
    var namePassItem = $('<li>')
        .text(`${i+1}. ${namePass[i].username} - ${namePass[i].password}`)
        .addClass('btn btn-dark btn-rounded');
    namePassEl.append(namePassItem);
}
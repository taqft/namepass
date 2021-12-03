// JavaScript logic

// GIVEN I need a new, secure password
// I am presented with a series of prompts for password criteria
// prompted for password criteria
// I select which criteria to include in the password
// prompted for the length of the password
// I choose a length of at least 8 characters and no more than 128 characters
// asked for character types to include in the password
// I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
// I answer each prompt
// my input should be validated and at least one character type should be selected
// a password is generated that matches the selected criteria
// the password is generated
// and displayed on the page


// I need a new username
// I am presented with a series of prompts for username criteria
// I select the criteria for my username
// I am able to select a minimum and maximum length of username between 3 and 30

queryURL = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&minLength=5&maxLength=5&api_key=`

const pullRandomWord = () => {

    fetch(queryURL).then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        })).then(res => {
            if (res.status === 200) {

                console.log(`Status: ${res.status} OK`);
                console.log(res.data);

            } else {
                console.log(`An error occurred. Status: ${res.status}`);
            }
        }));
}

pullRandomWord();

// I can confirm whether to include verbs, nouns, rhyming words, or easy-to-say (low syllable) words
// when all prompts are answered
// a username is generated with the matching criteria


// default options are loaded for each, usernames and passwords
// I am able to press the button and generate both at the same time


// I have the option to save my username + password combo for later
// When I press save, at least one is saved of username and password
// one is required to be saved, but both are not required
// and my info is saved in localStorage
// When I click the button for my saved usernames an passwords
// Then I am redirected to the saved info page
// When I click the back button
// Then I am taken to the homepage


// when the saved info page is opened
// then the usernames and passwords from storage are loaded
// when the clear everything button is pressed, all saved data is deleted
// JavaScript logic

// declare global vars
// username options
const verbInput = $('#verbs'); // id="verbs"
const nounInput = $('#nouns'); // id="nouns"
const maxWordLength = $('#word-max'); // id="word-max"
const commonWordInput = $('#common'); // id="common"
const uncommonWordInput = $('#uncommon'); // id="uncommon"

// verbs and nouns are mutally exclusive
// common and uncommon words are mutually exclusive

// password options
const lowerInput = $('#lowercase'); // id="lowercase"
const upperInput = $('#uppercase'); // id="uppercase"
const numInput = $('#numbers'); // id="numbers"
const specialInput = $('#special'); // id="special"
const passLengthSlider = $('#passLength'); // id="passLength"

// Initialize necessary checkboxes so they are checked when the page loads.
// default options are loaded for each, usernames and passwords
lowerInput.checked = true;
upperInput.checked = true;
numInput.checked = true;
specialInput.checked = true;

verbInput.checked = true;
commonWordInput.checked = true;

// Choose password length 8-128 characters
// Grab the slider value and insert into the input field

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

const generatePassword = () => {

}

// and displayed on the page

// I need a new username
// I am presented with a series of prompts for username criteria
// I select the criteria for my username
// I am able to select a maximum length of username between 3 and 30
// TODO: multiple words? How are usernames constructed based on user input

// BONUS: add input box that corresponds with 
// let maxWordLengthSlider = document.getElementById("word-length-slider"); // id="word-length-slider"
// let maxWordLengthInput = document.getElementById("word-length-input"); // id="word-length-input"
// maxWordLengthInput.value = maxWordLengthSlider.value;

// // Set the input value to the slider value
// maxWordLengthSlider.oninput = () => {
//     maxWordLengthInput.value = this.value;
// }

// // Set the slider value to the input value
// maxWordLengthInput.oninput = () => {
//     maxWordLengthSlider.value = this.value;
// }

// one word
// queryURL = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&minLength=5&maxLength=5&api_key=`

// array of objects of words
queryURL = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=verb&minCorpusCount=1&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=2&api_key=`


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

// I can confirm whether to include verbs, nouns, and the frequency of words (wordnik option)
// when all prompts are answered
// a username is generated with the matching criteria

const generateUsername = () => {

    // check the options selected by the user to use for generating the username
    let partOfSpeech = '';

    if (verbInput.checked) {
        partOfSpeech = 'verb';
    } else {
        partOfSpeech = 'noun';
    } 

}

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
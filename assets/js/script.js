// username options
// verbs and nouns are mutally exclusive
// common and uncommon words are mutually exclusive
const verbInput = $('#verbs'); // id="verbs"
const nounInput = $('#nouns'); // id="nouns"
const maxWordLengthSlider = $('#word-max'); // id="word-max"
const commonWordInput = $('#common'); // id="common"
const uncommonWordInput = $('#uncommon'); // id="uncommon"
const nameLengthEl = $('#name-length-value'); // id="name-length"

// password options
const lowerInput = $('#lowercase'); // id="lowercase"
const upperInput = $('#uppercase'); // id="uppercase"
const numInput = $('#numbers'); // id="numbers"
const specialInput = $('#special'); // id="special"
const passLengthSlider = $('#passLength'); // id="passLength"
const passLengthEl = $('#pass-length-value'); // id="passLength"

// Initialize the necessary checkboxes so they are checked when the page loads.
// default options are loaded for each:
// username
verbInput.attr('checked', true);
commonWordInput.attr('checked', true);

// password
lowerInput.attr('checked', true);
upperInput.attr('checked', true);
numInput.attr('checked', true);
specialInput.attr('checked', true);

// Define UTF codes representing the set of possible password characters per setting
const lowerChars = [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122];
const upperChars = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
const numChars = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
const specialChars = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 58, 59, 60, 61, 62, 63, 64, 91, 92, 93, 94, 95, 96, 123, 124, 125, 126];

// global arrays, objects, variables
let possibleChars = [];
let userPass = {};
let nums = [];

// buttons
const saveButton = $("#btn-save"); // id="btn-save"

// Initialize API parameters
let partOfSpeech = 'verb';
let minimumWordFrequency = '1000';

// Set the input (checkbox) values so they remain mutally exclusive
$('input:checkbox').change(
    function () {

        if ($(this).attr('id') === 'verbs' && nounInput.is(':checked')) {
            nounInput.prop('checked', false);
        } else if ($(this).attr('id') === 'nouns' && verbInput.is(':checked')) {
            verbInput.prop('checked', false);
        } else if ($(this).attr('id') === 'verbs' && !nounInput.is(':checked')) {
            $(this).prop('checked', true);
        } else if ($(this).attr('id') === 'nouns' && !verbInput.is(':checked')) {
            $(this).prop('checked', true);
        }

        if ($(this).attr('id') === 'common' && uncommonWordInput.is(':checked')) {
            uncommonWordInput.prop('checked', false);
        } else if ($(this).attr('id') === 'uncommon' && commonWordInput.is(':checked')) {
            commonWordInput.prop('checked', false);
        } else if ($(this).attr('id') === 'common' && !uncommonWordInput.is(':checked')) {
            $(this).prop('checked', true);
        } else if ($(this).attr('id') === 'uncommon' && !commonWordInput.is(':checked')) {
            $(this).prop('checked', true);
        }

    });

passLengthSlider.on('input', () => {
    passLengthEl.text(passLengthSlider.val());
});

maxWordLengthSlider.on('input', () => {
    nameLengthEl.text(maxWordLengthSlider.val());
});

// monkey-proof generation options, reject if no option is chosen
const validatePassInput = () => {
    // I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
    // my input should be validated and at least one character type should be selected
    if (lowerInput.checked || upperInput.checked || numInput.checked || specialInput.checked) {
        generatePassword();
    } else {
        alert("Please select an option.")
        return;
    }
}

const initPassSettings = () => {

    if (lowerInput.checked) {
        possibleChars = possibleChars.concat(lowerChars);
    } else if (upperInput.checked) {
        possibleChars = possibleChars.concat(upperChars);
    } else if (numInput.checked) {
        possibleChars = possibleChars.concat(numInput);
    } else if (specialInput.checked) {
        possibleChars = possibleChars.concat(specialChars);
    }
}

const generatePassword = () => {

    // Choose password length 8-128 characters
    let passLength = passLengthSlider.value;
    const generatePassword = () => {

        // Choose password length 8-128 characters
        let passLength = 64; // passLengthSlider.value;
        let passText = $('#pw-text'); // id="pw-text"
        let newChar = '';
        let nextChar = '';
        let myString = '';

        passText.innerHTML = '';
        possibleChars = [];
        nums = [];

        initPassSettings();

        let queryURL = `https://www.random.org/decimal-fractions/?num=${passLength}&dec=20&col=1&format=plain&rnd=new`;

        fetch(queryURL).then(response => {
            response.text().then(data => ({
                data: data,
                status: response.status
            })).then(res => {
                if (res.status === 200) {
                    console.log(`Status: ${res.status} OK`);
                    console.log(res.data);
                    nums = res.data.split('\n');
                    console.log(nums);

                    // a password is generated that matches the selected criteria
                    for (let i = 0; i < passLength; i++) {
                        nextChar = Math.floor(nums[i] * (possibleChars.length - 1));
                        newChar = String.fromCharCode(possibleChars[nextChar]);
                        myString += newChar;
                    }

                    console.log(myString);
                }
            })
        });

    }

}

// and displayed on the page

// I need a new username
// I am presented with a series of prompts for username criteria
// I select the criteria for my username
// I am able to select a maximum length of username between 3 and 30
// TODO: multiple words? How are usernames constructed based on user input

// BONUS: add input box that corresponds with slider values
// let maxWordLengthSlider = document.getElementById("word-length-slider"); // id="word-length-slider"
// let maxWordLengthInput = document.getElementById("word-length-input"); // id="word-length-input"
// maxWordLengthInput.value = maxWordLengthSlider.value;

// let the input value follow the slider value and vice-versa
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

// when all prompts are answered

const initUsernameSettings = () => {
    // check the options selected by the user to use for generating the username
    // I can confirm whether to include verbs, nouns, and the dictionary frequency of words (wordnik option)
    if (verbInput.checked) {
        partOfSpeech = 'verb';
    } else {
        partOfSpeech = 'noun';
    }

    if (commonWordInput.checked) {
        minimumWordFrequency = '1000';
    } else {
        minimumWordFrequency = '100';
    }
}

const generateUsername = () => {

    // array of objects of words, only retrieving limit = 2 words for now
    queryURL = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=${partOfSpeech}&minCorpusCount=${minimumWordFrequency}&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=15&limit=2&api_key=`

    initUsernameSettings();

    fetch(queryURL).then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        })).then(res => {
            if (res.status === 200) {

                console.log(`Status: ${res.status} OK`);
                console.log(res.data);

                let firstWord = res.data[0].word;
                let secondWord = res.data[1].word;
                let newUsername = firstWord + secondWord;

                console.log(newUsername);

            } else {
                console.log(`An error occurred. Status: ${res.status}`);
            }
        }));
}

// I am able to press the button and generate both at the same time
// generateUsername();
generatePassword();

function saveNamePass() {

    let namePass = JSON.parse(localStorage.getItem(`namePass`) || "[]");
    namePass.push(userPass);
    localStorage.setItem(`namePass`, JSON.stringify(namePass));

}

// save button logic

 saveButton.on('click', function () {
     let userName = $('textarea[name=Username]').val();
     let password = $('textarea[name=Password]').val();
     userPass = {
         'user': userName,
         'pass': password,
     };
     saveNamePass();
 });

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

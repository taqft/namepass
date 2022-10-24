// username options
// verbs and nouns are mutally exclusive
// common and uncommon words are mutually exclusive
const verbInput = $('#verbs'); // id="verbs"
const nounInput = $('#nouns'); // id="nouns"
const nameLengthSlider = $('#name-max'); // id="word-max"
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

// buttons and text boxes
const userGenerateButton = $('#user-generate'); // id="user-generate"
const userCopyButton = $('#user-copy'); // id="user-copy"
const passGenerateButton = $('#pass-generate'); // id="pass-generate"
const passCopyButton = $('#pass-copy'); // id="pass-copy"
const bothGenerateButton = $('#both-generate'); // id="both-generate"
const saveButton = $("#btn-save"); // id="btn-save"

// Initialize the necessary checkboxes so they are checked when the page loads.
// default options are loaded for each:
// username
verbInput.attr('checked', true);
uncommonWordInput.attr('checked', true);

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
let generatePassActive = true;
let generateUserActive = true;

// Initialize API parameters
let partOfSpeech = 'verb';
let minimumWordFrequency = '10';

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

nameLengthSlider.on('input', () => {
    nameLengthEl.text(nameLengthSlider.val());
});

// monkey-proof generation options, reject if no option is chosen
const validatePassInput = () => {
    // I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
    // my input should be validated and at least one character type should be selected
    if (lowerInput.is(':checked') || upperInput.is(':checked') || numInput.is(':checked') || specialInput.is(':checked')) {
        generatePassword();
    } else {
        alert("Please select an option.")
        return;
    }
}

// initialize the possibleChars array to prep for password generation
const initPassSettings = () => {

    if (lowerInput.is(':checked')) {
        possibleChars = possibleChars.concat(lowerChars);
    }
    if (upperInput.is(':checked')) {
        possibleChars = possibleChars.concat(upperChars);
    }
    if (numInput.is(':checked')) {
        possibleChars = possibleChars.concat(numChars);
    }
    if (specialInput.is(':checked')) {
        possibleChars = possibleChars.concat(specialChars);
    }
}

// Choose password length 8-128 characters
let passLength = passLengthSlider.value;
const generatePassword = () => {

    // Choose password length 8-128 characters
    let passLength = passLengthSlider.val();
    let passTextBox = $('#password');
    let newChar = '';
    let nextChar = '';

    passTextBox.html('Loading...');
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
                // console.log(`Status: ${res.status} OK`);
                // console.log(res.data);

                nums = res.data.split('\n');

                // console.log(nums);
                passTextBox.html('');

                // a password is generated that matches the selected criteria
                for (let i = 0; i < passLength; i++) {
                    nextChar = Math.floor(nums[i] * (possibleChars.length - 1));
                    newChar = String.fromCharCode(possibleChars[nextChar]);
                    passTextBox.append(newChar);
                }

                generatePassActive = true;
            } else if (res.status === 503) {
                passTextBox.html(`An error occurred. Check console.`);
                console.log(`An error occurred: Either the random.org service is unavailable or the free quota has been reached for the day.`);
            } else {
                passTextBox.html(`An error occurred. Check console.`);
                console.log(`An error occurred: ${res.status}`);
            }
        })
    })

}

// BONUS: add input box that corresponds with slider values
// let maxWordLengthSlider = document.getElementById("word-length-slider"); // id="word-length-slider"
// let maxWordLengthInput = document.getElementById("word-length-input"); // id="word-length-input"
// maxWordLengthInput.value = maxWordLengthSlider.value;

const initUsernameSettings = () => {
    // check the options selected by the user to use for generating the username
    // I can confirm whether to include verbs, nouns, and the dictionary frequency of words (wordnik option)
    if (verbInput.is(':checked')) {
        partOfSpeech = 'verb';
    } else {
        partOfSpeech = 'noun';
    }

    if (commonWordInput.is(':checked')) {
        minimumWordFrequency = '10';
    } else {
        minimumWordFrequency = '0';
    }
}

const generateUsername = () => {

    let nameLength = nameLengthSlider.val();
    let wordLength = nameLength / 2;
    let nameTextBox = $('#username');

    nameTextBox.html('Loading...');

    initUsernameSettings();

    // array of objects of words, only retrieving limit = 2 words for now
    queryURL = `https://api.wordnik.com/v4/words.json/randomWords?includePartOfSpeech=${partOfSpeech}&minCorpusCount=${minimumWordFrequency}&maxCorpusCount=-1&minLength=${wordLength}&maxLength=${wordLength}&limit=2&api_key=uno3kb56e0lo7ns6jrd19g1s1cvw2huvtluuyuv41zijilvfu`

    fetch(queryURL).then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        })).then(res => {
            console.log(res);
            if (res.status === 429) {
                nameTextBox.html(`Error: Too many requests!
Please wait a few seconds
and try again.`);
                console.log(`${res.status}: ${res.message}`);
            }
            else if (res.status === 200 && res.data.length === 2) {
                console.log(`Status: ${res.status} OK`);
                console.log(res.data);
                let firstWord = res.data[0].word;
                let secondWord = res.data[1].word;
                let newUsername = firstWord + secondWord;
                nameTextBox.html(newUsername);
            } else if (res.data.length == 1) {
                console.log(`Status: ${res.status} OK`);
                console.log(res.data);
                let firstWord = res.data[0].word;
                let newUsername = firstWord + firstWord;
                nameTextBox.html(newUsername);
            } else if (res.data.length !== 2 && res.data.length !== 1) {
                nameTextBox.html(`An error occurred retrieving words.
Please try again.`);
                console.log(`An error occurred: The wordnik API did not return a word for the selected criteria.
${res.status}: ${res.data.message}`);
            } else {
                nameTextBox.html(`An error occurred. Check console.`);
                console.log(`${res.status}: ${res.data.message}`);
            }
        }));
}

// I have the option to save my username + password combo for later
function saveNamePass() {

    let namePass = JSON.parse(localStorage.getItem(`namePass`) || "[]");
    namePass.push(userPass);
    localStorage.setItem(`namePass`, JSON.stringify(namePass));

}

// save button logic
saveButton.on('click', () => {
    let userName = $('textarea[name=Username]').val();
    let password = $('textarea[name=Password]').val();
    userPass = {
        'user': userName,
        'pass': password,
    };
    saveNamePass();
});

passGenerateButton.on('click', validatePassInput);
userGenerateButton.on('click', generateUsername);
// I am able to press the button and generate both at the same time
bothGenerateButton.on('click', () => {
    generateUsername();
    validatePassInput();
});

userCopyButton.on('click', () => {
    let copyText = $("#username");

    $(copyText).focus();
    $(copyText).select();

    navigator.clipboard.writeText(copyText.html());
})
passCopyButton.on('click', () => {
    let copyText = $('#password');

    $(copyText).focus();
    $(copyText).select();

    navigator.clipboard.writeText(copyText.html());
})

// let ip;
// let ip_api = 'https://api64.ipify.org?format=json';
// let insult = "Loading insult...";
// let insult_api = 'https://evilinsult.com/generate_insult.php?lang=en&type=json';

// async function getIP() {
//     try {
//         let data = await fetch(ip_api);
//         let j_data = await data.json();
//         ip = j_data.ip;
//     } catch (error) {
//         console.error('Error fetching IP:', error);
//     }
// }

// async function getInsult() {
//     try {
//         let data = await fetch(insult_api);
//         let j_data = await data.json();
//         insult = j_data.insult;
//     } catch (error) {
//         console.error('Error fetching insult:', error);
//     }
// }

// function setup() {
//     createCanvas(400, 400);
//     getIP();
//     getInsult(); // Fetch the first insult immediately
//     setInterval(getInsult, 10000); // Fetch a new insult every 5 seconds
// }

// function draw() {
//     background(225);
//     textSize(16);
//     fill(0);
//     text('There has been a zip bomb sent to:', 20, 30);
//     text(ip, 20, 60);
//     text('Insult:', 20, 90);
//     text(insult, 20, 120, width - 40); // Display the insult with word wrap
// }

let ip;
let ip_api = 'https://api64.ipify.org?format=json';
let yesNoImageUrl = "Loading image...";
let yesNoAnswer = "Loading answer...";
let yesNoApi = 'https://yesno.wtf/api';
let face = ""; // Variable to store the current face
let happyFaces = ["😊", "😄", "😁", "😆", "😃", "🙂"]; // Array of happy faces
let sadFaces = ["😢", "😞", "😔", "😟", "😕", "🙁"]; // Array of sad faces

async function getIP() {
    try {
        let data = await fetch(ip_api);
        let j_data = await data.json();
        ip = j_data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
    }
}

async function getYesNoData() {
    try {
        let data = await fetch(yesNoApi);
        let j_data = await data.json();
        yesNoImageUrl = j_data.image;
        yesNoAnswer = j_data.answer;

        // Set the face based on the answer
        if (yesNoAnswer === "yes") {
            face = random(happyFaces); // Randomly select a happy face
        } else if (yesNoAnswer === "no") {
            face = random(sadFaces); // Randomly select a sad face
        } else {
            face = ""; // No face for "maybe" or other responses
        }
    } catch (error) {
        console.error('Error fetching yes/no data:', error);
    }
}

function setup() {
    createCanvas(400, 400);
    getIP();
    getYesNoData(); // Fetch the first image and answer immediately
    setInterval(getYesNoData, 10000); // Fetch new data every 10 seconds
}

function draw() {
    background(225);
    textSize(16);
    fill(0);
    textAlign(LEFT, TOP); // Reset text alignment
    text('will you survive the incoming zip bomb?', 20, 30);
    text(ip, 20, 60);
    text('Answer:', 20, 90);
    text(yesNoAnswer, 20, 120);

    // Display the yes/no/maybe image if it's loaded
    if (yesNoImageUrl !== "Loading image...") {
        loadImage(yesNoImageUrl, img => {
            image(img, 20, 140, 200, 200);
        });
    } else {
        text(yesNoImageUrl, 20, 140, width - 40); // Display loading text
    }

    // Display the face (happy or sad) based on the answer
    if (face) {
        textSize(50);
        textAlign(CENTER, CENTER);
        text(face, width / 2, height - 50); // Display the face at the bottom center
    }
}
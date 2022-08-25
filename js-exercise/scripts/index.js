console.log(1 + 2);
console.log("apple" + "orange");
console.log(1 + 2 + "apple");
console.log("apple" + 1 + 2);
console.log(1 + true);
console.log(0 == false);
console.log(1 === true);
console.log(2 == "2");


var players = ["Sreesanth" , "MS Dhoni" , "Yuvraj Singh", "Gautam Gambhir" , "Virender Sehwag" , "Robin Uthappa" , "Rohit Sharma" , "Dinesh Karthik" , "Irfan Pathan" , "Yusuf Pathan" , "Harbhajan Singh"];

players.shift();

console.log("Remove first player :" , players);

console.log("List of players :" , players.length);

players.push("Piyush Chawla");

console.log("Add player :" , players);

for(let i = 0; i < players.length; i++) {
    let randomNumber = Math.floor(Math.random() * players.length);
    console.log("player name :" +players[i] + " Jersey-Number :" +randomNumber);
}

var newArr = players.map((player => console.log(player.toUpperCase())));


// Display numbers from 1 to 100//

function printnumbers(){
for(let i = 1; i <= 100 ; i++){
    console.log(i);
}
}

printnumbers();

// Display Todays date //

function getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; 
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '/' + mm + '/' + yyyy;
    console.log(formattedToday);
}

getDate()

// Convert Celsius to Farenheit //

function cToF(celsius) {
    var result = (celsius * 1.8) + 32;
console.log("Farenheit:" + result); 
}

cToF(55)

// Display average number //

function averageNum(arr) {
    var sum = 0;
    var total = arr.length
    for(let i = 0; i < total ; i++) {
        sum += arr[i];
    }
console.log(sum / total);
}

averageNum([6,11,7]);

// Reverse a string //

function reverseString(str) {
console.log(str.split("").reverse().join(""));
}

reverseString("Test");




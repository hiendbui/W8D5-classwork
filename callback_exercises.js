class Clock {
    constructor() {
        this.time = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
        this.hours = this.time.getHours();
        this.minutes = this.time.getMinutes();
        this.seconds = this.time.getSeconds();
        this.printTime();
        setInterval(this._tick.bind(this), 1000); //call _tick function; will need to use .bind
    }

    printTime() {
        const formattedHours = this.hours < 10 ? `0${this.hours}:` : `${this.hours}:`;
        const formattedMins = this.minutes < 10 ? `0${this.minutes}:` : `${this.minutes}:`;
        const formattedSecs = this.seconds < 10 ? `0${this.seconds}` : `${this.seconds}`;

        let printedTime = formattedHours + formattedMins + formattedSecs;
        console.log(printedTime);
    }

    _tick() {
        this.seconds += 1;
        if (this.seconds === 60) {
            this.minutes += 1;
            this.seconds = 0;
        };
        if (this.minutes === 60) {
            this.hours += 1;
            this.minutes = 0;
        };
        if (this.hours === 24) {
            this.hours = 0;
        };
        console.clear();
        this.printTime();
    }
}

// let currentTime = new Clock();
// currentTime._tick();


const readline = require('readline');
  
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const addNumbers = function(sum, numsLeft, completionCallback){
    if (numsLeft === 0) {
        reader.close();
        return completionCallback(sum);
    };
    reader.question("Enter number: ", function(ans){ 
        const num = parseInt(ans);
        sum += num;
        console.log(sum);
        addNumbers(sum, numsLeft-1, completionCallback)
        }
    );
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

function askIfGreaterThan(el1,el2,callback) {
    reader.question(`Is ${el1} greater than ${el2}? `, function(ans) {
        if (ans === 'yes') {
            callback(true);
        }
        else {
            callback(false);
        }
    })
}
// askIfGreaterThan(0,3, ans => {
//     if (ans) {
//         console.log("You said 0 is greater than 3")
//     }   
//     else {
//         console.log("You said 3 is greater than 0")
//     }
// })

const innerBubbleSortLoop = function(arr, i, madeAnySwaps, outerBubbleSortLoop){
    if (i === arr.length-1) {
        outerBubbleSortLoop(madeAnySwaps)
    } 

    // madeAnySwaps ||= false;
    if (i < arr.length-1){
        askIfGreaterThan(arr[i],arr[i+1],isGreaterThan => {
            if (isGreaterThan) {
                [arr[i], arr[i + 1]] = [arr[i+1], arr[i]];
                madeAnySwaps = true;
            };
            innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop)
        })
    }
}

// innerBubbleSortLoop([10, 8, 7, 1, 11], 0, false, swap => console.log("In outer bubble sort")) //dummy test case 

function absurdBubbleSort(arr, sortCompletionCallback) {
    function outerBubbleSortLoop(madeAnySwaps) {
        if (madeAnySwaps) {
            innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop)
        } else {
            sortCompletionCallback(arr);
        }
    }
    outerBubbleSortLoop(true)
}

absurdBubbleSort([3, 2, 1, 50, -5], function (arr) {
    console.log("Sorted array: " + JSON.stringify(arr));
    reader.close();
});
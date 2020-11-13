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
        let printedTime = `${this.hours}:${this.minutes}:${this.seconds}`;
        console.log(printedTime);
    }

    _tick() {
        this.seconds += 1;
        if (this.seconds === 60){
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

let currentTime = new Clock();
currentTime._tick();
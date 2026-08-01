const connectBtn = document.getElementById("connect");
const tick = document.getElementById("tick");
const digit = document.getElementById("digit");
const historyDiv = document.getElementById("history");

let ws;
let history = [];

connectBtn.addEventListener("click", () => {

    ws = new WebSocket("wss://ws.derivws.com/websockets/v3?app_id=1089");

    ws.onopen = () => {

        console.log("Connected");

        ws.send(JSON.stringify({
            ticks: "R_100"
        }));

    };

    ws.onmessage = (event) => {

        const data = JSON.parse(event.data);

        if (data.tick) {

            const price = data.tick.quote;

            tick.innerHTML = price;

            const lastDigit = price.toString().slice(-1);

            digit.innerHTML = lastDigit;

            history.unshift(lastDigit);

            if (history.length > 100) {
                history.pop();
            }

            historyDiv.innerHTML = history.join(" ");

        }

    };

    ws.onerror = () => {
        alert("Connection failed");
    };

});

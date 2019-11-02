window.addEventListener("load", (event) => {
    const streamTime = new Date("November 02, 2019 17:00:00 GMT-03:00");
    const domElement = document.getElementById("streaming-time-to-start");
    console.log(domElement);
    setInterval(() => {
        const currentTime = new Date();
        const timeToStart = new Date(streamTime - currentTime);
        const innerText = `${timeToStart.getHours()} horas ${timeToStart.getMinutes()} minutos ${timeToStart.getSeconds()} segundos`;
        domElement.innerText = innerText;
    }, 1000);
});
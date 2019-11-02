window.addEventListener("load", (event) => {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    let streamStart = new Date("November 02, 2019 20:00:00 GMT+02:00");
    let startTime = streamStart.getTime();
    const streamEnd = new Date("November 03, 2019 01:00:00 GMT+02:00");
    const endTime = streamEnd.getTime();
    const domElement = document.getElementById("streaming-time-to-start");
    const videoPlayerElement = document.getElementById("live-streaming-video-player");
    videoPlayerElement.width = screen.width;
    videoPlayerElement.height = screen.height;
    if (currentTime >= startTime && currentTime <= endTime) {
        videoPlayerElement.className = "";
    } else {
        videoPlayerElement.className = "is-hidden";
        if (currentTime >= endTime) {
            streamStart = new Date(streamStart + 1);
            startTime = streamStart.getTime();
        }
        setInterval(() => {
            const timeToStart = new Date(startTime - currentTime);
            domElement.innerText = `${timeToStart.getHours()} horas ${timeToStart.getMinutes()} minutos ${timeToStart.getSeconds()} segundos`;
        }, 1000);
    }
});
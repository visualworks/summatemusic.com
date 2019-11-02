window.addEventListener("load", (event) => {
    const currentTime = new Date();
    let streamTime = new Date("November 02, 2019 16:00:00 GMT-03:00");
    const endTime = new Date("November 02, 2019 21:00:00 GMT-03:00");
    const domElement = document.getElementById("streaming-time-to-start");
    const videoPlayerElement = document.getElementById("live-streaming-video-player");
    videoPlayerElement.width = screen.width;
    videoPlayerElement.height = screen.height;
    if (currentTime >= streamTime && currentTime <= endTime) {
        videoPlayerElement.className = "";
    } else {
        videoPlayerElement.className = "is-hidden";
        if (currentTime <= endTime) {
            streamTime = new Date(streamTime + 1);
        }
        setInterval(() => {
            const timeToStart = new Date(streamTime - currentTime);
            domElement.innerText = `${timeToStart.getHours()} horas ${timeToStart.getMinutes()} minutos ${timeToStart.getSeconds()} segundos`;
        }, 1000);
    }
});
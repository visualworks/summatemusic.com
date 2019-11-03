window.addEventListener("load", (event) => {
    const domElement = document.getElementById("streaming-time-to-start");
    const videoPlayerElement = document.getElementById("live-streaming-video-player");
    videoPlayerElement.width = screen.width;
    videoPlayerElement.height = screen.height;

    const now = new Date();
    const isStreamingTime = (now.getUTCDate() === 3 || now.getUTCDate() === 5) && now.getUTCHours() >= 19 && now.getUTCHours() <= 24;
    const isDayInterval = (now.getUTCDate() > 3 && now.getUTCDate() < 5) || (now.getUTCDate() === 3 && now.getUTCHours() >= 21);
    if (isStreamingTime) {
        videoPlayerElement.className = "";
    } else {
        videoPlayerElement.className = "is-hidden";
        if (isDayInterval) {
            domElement.innerText = "05/11/2019 16:00h";
        } else {
            setInterval(() => {
                const now = new Date();
                const startUTCTime = Date.UTC("2019", "11", "3", "19", "00", "00");
                const nowUTCTime = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                const countdown = new Date(startUTCTime - nowUTCTime);
                domElement.innerText = `${countdown.getUTCHours()} horas ${countdown.getUTCMinutes()} minutos ${countdown.getUTCSeconds()} segundos`;
            }, 1000);
        }
    }
});
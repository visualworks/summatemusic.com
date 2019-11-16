window.addEventListener("load", () => {
    const domElement = document.getElementById("streaming-time-to-start");
    const videoPlayerElement = document.getElementById("live-streaming-video-player");
    videoPlayerElement.width = screen.width;
    videoPlayerElement.height = screen.height;

    const now = new Date();
    const isStreamingTime = (now.getUTCDate() === 16 || now.getUTCDate() === 17) && now.getUTCHours() >= 20 && now.getUTCHours() <= 23;
    const isDayInterval = (now.getUTCDate() > 17 && now.getUTCDate() < 19) || (now.getUTCDate() === 17 && now.getUTCHours() >= 23);
    if (isStreamingTime) {
        videoPlayerElement.className = "";
    } else {
        videoPlayerElement.className = "is-hidden";
        if (isDayInterval) {
            domElement.innerText = "10/11/2019 17:00h";
        } else {
            setInterval(() => {
                const now = new Date();
                const startUTCTime = Date.UTC("2019", "11", "16", "20", "00", "00");
                const nowUTCTime = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                const countdown = new Date(startUTCTime - nowUTCTime);
                domElement.innerText = `${countdown.getUTCHours()} horas ${countdown.getUTCMinutes()} minutos ${countdown.getUTCSeconds()} segundos`;
            }, 1000);
        }
    }
});
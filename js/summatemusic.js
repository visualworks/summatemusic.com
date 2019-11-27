window.addEventListener("load", () => {
    const countdownElement = document.getElementById("streaming-time-to-start");
    const videoPlayerElement = document.getElementById("live-streaming-video-player");
    const streamingBannerElement = document.getElementById("summate-radio-streaming-banner");
    videoPlayerElement.width = screen.width;
    videoPlayerElement.height = screen.height;
    let pastEvents = [];
    let futureEvents = [];
    let currentEvent = [];
    fetch("/js/data.json", {
        method: "GET",
        mode: "same-origin",
        cache: "default"
    }).then((response) => {
        if (!response.ok) {
            console.error(`Response is not ok: ${JSON.stringify(response)}`);
        }
        return response.json();
    }).then((json) => {
        if (json && json.events) {
            let now = new Date();
            json.events.forEach((event) => {
                const eventDate = new Date(event.date);
                if (eventDate.getUTCMonth() < now.getUTCMonth() || (eventDate.getUTCMonth() === now.getUTCMonth() && eventDate.getUTCDate() < now.getUTCDate())) {
                    pastEvents.push(event);
                } else if (eventDate.getUTCMonth() > now.getUTCMonth() || (eventDate.getUTCMonth() === now.getUTCMonth() && eventDate.getUTCDate() > now.getUTCDate())) {
                    futureEvents.push(event);
                } else if(eventDate.getUTCMonth() === now.getUTCMonth() && eventDate.getUTCDate() === now.getUTCDate()) {
                    currentEvent.push(event);
                }
            });
            if (currentEvent.length === 0 && futureEvents.length > 0) {
                const eventDate = futureEvents[0].date.split("-");
                countdownElement.innerText = `${eventDate[2]}/${eventDate[1]} ${futureEvents[0].start}`;
                const banner = new Image();
                banner.src = `/img/${futureEvents[0].banner}`;
                banner.alt = `Summate Radio presents ${futureEvents[0].artist} @ Mostra Casa Design Niterói 2019`;
                banner.title = `Summate Radio presents ${futureEvents[0].artist} @ Mostra Casa Design Niterói 2019`;
                streamingBannerElement.appendChild(banner);
            } else if (currentEvent.length > 0) {
                const banner = new Image();
                banner.src = `/img/${currentEvent[0].banner}`;
                banner.alt = `Summate Radio presents ${currentEvent[0].artist} @ Mostra Casa Design Niterói 2019`;
                banner.title = `Summate Radio presents ${currentEvent[0].artist} @ Mostra Casa Design Niterói 2019`;
                streamingBannerElement.appendChild(banner);

                const eventStart = new Date(`${currentEvent[0].date}T${currentEvent[0].start}:00.000-03:00`);
                const eventEnd = new Date(`${currentEvent[0].date}T${currentEvent[0].end}:00.000-03:00`);
                let nowUTCTime = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                const startUTCTime = Date.UTC(eventStart.getUTCFullYear(), eventStart.getUTCMonth(), eventStart.getUTCDate(), eventStart.getUTCHours(), eventStart.getUTCMinutes(), "00");
                const endUTCTime = Date.UTC(eventEnd.getUTCFullYear(), eventEnd.getUTCMonth(), eventEnd.getUTCDate(), eventEnd.getUTCHours(), eventEnd.getUTCMinutes(), "00");
                const isEventWindow = Boolean(nowUTCTime > startUTCTime && nowUTCTime < endUTCTime);
                const isBeforeEvent = Boolean(nowUTCTime < startUTCTime);
                const isPastEvent = Boolean(nowUTCTime > endUTCTime);
                if (isEventWindow) {
                    videoPlayerElement.className = "";
                    setInterval(() => {
                        now = new Date();
                        nowUTCTime = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                        if (new Date(nowUTCTime) > new Date(eventEnd)) {
                            location.reload();
                        }
                    }, 5000);
                } else if(isBeforeEvent) {
                    videoPlayerElement.className = "is-hidden";
                    setInterval(() => {
                        now = new Date();
                        nowUTCTime = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                        const countdown = new Date(startUTCTime - nowUTCTime);
                        if (new Date(startUTCTime) < new Date(nowUTCTime)) {
                            location.reload();
                        }
                        countdownElement.innerText = `${countdown.getUTCHours()} horas ${countdown.getUTCMinutes()} minutos ${countdown.getUTCSeconds()} segundos`;
                    }, 1000);
                } else if (isPastEvent) {
                    videoPlayerElement.className = "is-hidden";
                    if (futureEvents.length > 0) {
                        const eventDate = futureEvents[0].date.split("-");
                        countdownElement.innerText = `${eventDate[2]}/${eventDate[1]} ${futureEvents[0].start}`;
                    }
                }
            }
        }
    });
});
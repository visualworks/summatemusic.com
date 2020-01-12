window.addEventListener("load", () => {
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
            const events = json.events.map((event) => {
                const listElement = document.createElement("li");
                const eventDate = new Date(event.date);
                listElement.innerText = `${eventDate.getUTCDate()}/${eventDate.getUTCMonth()+1} - ${event.artist}`;
                return listElement;
            });
            document.getElementById("streaming-next-list").append(...events);
        }
    });
});

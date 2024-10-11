function getName() {
    let title_span = document.getElementById("web_title");

    fetch("http://127.0.0.1:5000/name", {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => {
        title_span.innerText = data;
    })
    .catch(error => console.error("Error: ", error));
}
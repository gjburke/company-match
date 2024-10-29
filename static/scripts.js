function getCompanyList() {
	fetch("http://127.0.0.1:5000/company_names", {
    	method: "GET",
	})
	.then(response => response.json())
	.then(data => {
    	const resultsList = document.getElementById("results-list");
    	resultsList.innerHTML = "";

    	data.forEach(companyName => {
        	const listItem = document.createElement("li");
        	listItem.textContent = companyName;
        	resultsList.appendChild(listItem);
    	});
	})
	.catch(error => console.error("Error: ", error));
}



function getCompanyList() {
    fetch("http://127.0.0.1:5000/company_names", {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => {
        const resultsList = document.getElementById("results-list");
        resultsList.innerHTML = "";

        data.forEach(companyName => {
            const listItem = document.createElement("li");
            listItem.textContent = companyName;
            resultsList.appendChild(listItem);
        });
    })
    .catch(error => console.error("Error: ", error));
}

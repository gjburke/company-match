function getCompanyList() {

	const input = document.getElementById('user-input').value.trim();

	const headers = {
		'Content-Type' : 'application/json',
    	'Access-Control-Allow-Origin': 'http://127.0.0.1:5000',
	}
	
	fetch("http://127.0.0.1:5000/company_names", {
    	method: "POST",
		headers: headers,
		body: JSON.stringify({query: input}),
	})
	.then(response => response.json())
	.then(data => {
    	const resultsList = document.getElementById("results-list");
    	resultsList.innerHTML = "";
		resultsList.className = "outputtext";

    	data.forEach(companyName => {
        	const listItem = document.createElement("li");
        	listItem.textContent = companyName;
        	resultsList.appendChild(listItem);
    	});
	})
	.catch(error => console.error("Error: ", error));
}

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

const topics = [
    ["white", "rgb(167, 200, 252)", "Company Culture", "Some companies have certain ideologies that might be important to you, such as sustainability efforts or workplace culture. In order to search for this, use keywords such as: "],
    ["rgb(167, 200, 252)", "rgb(66, 135, 245)", "Practicality", "Location, size, and potential growth in a company are important factors you should look into. To search for these factors use keywards such as: "]
]

function changeFolder(num) {
    const folderScreen = document.getElementById("changingFolder");
	console.log(topics[num])
    folderScreen.style.backgroundColor = topics[num][0];
    //just have one div and change the color,
    //and just change the contents 
    //every time a certain 
    //see if you can pass in a different number which associates it to a different tab
    //get all tabs and make it as a list in java 
    //look up a library 
}

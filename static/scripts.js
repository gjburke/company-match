//Assume data is a list of objects
//Assume the following data structure for storing company info:
// companyInfoObj = {
// 	"companyName" : {"Percent Match": XX, "CompanyDescription": "XXX"},
// 	"companyName" : {"Percent Match": XX, "CompanyDescription": "XXX"},
// }
const companyInfoObj = {
	"Meta" : {"Percent Match": 0.5, "Company Description": "Meta builds the future of human connection and the technology that makes it possible."},
	"NVIDIA" : {"Percent Match": 0.5, "Company Description": "Nvidia Corporation is an American multinational corporation and technology company headquartered in Santa Clara, California, and incorporated in Delaware."},
}

function display_and_render_popup(companyName) {
	document.getElementById("popup").style.display = "flex";
	contentList = document.getElementById("popup-content-list");
	contentList.innerHTML = "";
	const nameLi = document.createElement("li");
	nameLi.setAttribute("class", "popupListItem");
	nameLi.textContent = "Company Name" + " " + ":" + " " + companyName;
	contentList.appendChild(nameLi);

	for (let key in companyInfoObj[companyName]) {
		const listItem = document.createElement("li");
		listItem.setAttribute("class", "popupListItem");
		listItem.textContent = key + " " + ":" + " " + companyInfoObj[companyName][key];
		contentList.appendChild(listItem);
	}
}
function hide_popup() {
	document.getElementById("popup").style.display = "none";
}
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
			listItem.addEventListener("mouseenter", function() {
				listItem.classList.add('hovered');
			});
			listItem.addEventListener("mouseleave", function() {
				listItem.classList.remove('hovered');
			});
			listItem.addEventListener("click", function() {
				listItem.classList.remove('hovered');
				display_and_render_popup(companyName);
			});
        	listItem.textContent = companyName;
			listItem.className = "result-list-item";
        	resultsList.appendChild(listItem);
    	});
	})
	.catch(error => console.error("Error: ", error));
}
function displayResult() {
	document.getElementById("Output-box").style.display = "flex";
}
function getAndDisplayResult() {
	getCompanyList();
	displayResult();
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

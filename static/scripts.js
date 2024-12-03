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
//Assume data is a list of objects
//Assume the following data structure for storing company info:
// companyInfoObj = {
// 	"companyName" : {"Percent Match": XX, "CompanyDescription": "XXX"},
// 	"companyName" : {"Percent Match": XX, "CompanyDescription": "XXX"},
// }
const companyInfoObj = {
	"Meta" : {"Percent Match": 0.5, "CompanyDescription": "Meta builds the future of human connection and the technology that makes it possible."},
	"Nvidia" : {"Percent Match": 0.5, "CompanyDescription": "Nvidia Corporation is an American multinational corporation and technology company headquartered in Santa Clara, California, and incorporated in Delaware."},
}

function display_and_render_popup(companyName) {
	document.getElementById("popup").style.display = "flex";
	contentList = document.getElementById("popup-content-list");
	contentList.innerHTML = "";
	const nameLi = document.createElement("li");
	nameLi.setAttribute("class", "popupListItem");
	nameLi.textContent = "Company Name:" + companyName;
	contentList.appendChild(nameLi);

	for (let key in companyInfoObj[companyName]) {
		const listItem = document.createElement("li");
		listItem.setAttribute("class", "popupListItem");
		const keyDiv = document.createElement("div");
		keyDiv.textContent = key + ":";
		const valueDiv = document.createElement("div");
		valueDiv.textContent = companyInfoObj[companyName][key];
		
		listItem.appendChild(keyDiv);
		listItem.appendChild(valueDiv);
		contentList.appendChild(listItem);
	}
}

function getCompanyList() {
	fetch("http://127.0.0.1:5000/company_names", {
    	method: "GET",
	})
	.then(response => response.json())
	.then(data => {
    	const resultsList = document.getElementById("results-list");
    	resultsList.innerHTML = "";
		//companyInfoList = data;
    	data.forEach(companyName => {
			//structure:
			// <li class="listItem">
			// 	<div>company_name</div>
			// 	<button onclick="display_popup()">More About This Company</button>
			// </li>
        	const listItem = document.createElement("li");
			listItem.setAttribute("class", "listItem");
			const companyNameDiv = document.createElement("div")
			companyNameDiv.textContent = companyName;
			const displayButton = document.createElement("button");
        	displayButton.textContent = "More About This Company";
			displayButton.addEventListener("click", function() {
				display_and_render_popup(companyName);
			});
			listItem.appendChild(companyNameDiv);
			listItem.appendChild(displayButton);

        	resultsList.appendChild(listItem);
    	});
	})
	.catch(error => console.error("Error: ", error));
}

function hide_popup() {
	document.getElementById("popup").style.display = "none";
}
NUM_OF_LIST = 5

function loadNewsList(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', '/news_list/news.json', true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(JSON.parse(xobj.responseText));
		}
	};
	xobj.send(null);
}

loadNewsList(function(newsListJson) {
	insertPoint = document.getElementById("news");
	//console.log(newsListJson)
	newsList = newsListJson["news_list"]
	ul = document.createElement('ul');
	ul.style.listStylePosition = "outside";
	insertPoint.append(ul);
	insertPoint = ul;
	newsList.forEach(function(news, index) {
		if (index >= NUM_OF_LIST)
			return;
		li = document.createElement('li');
		li.style.fontSize = "14pt";
		li.style.textAlign = "left";
		date = '[' + news['month'] + ' / ' + news['day'] + ' / ' +  news['year'] + ']'
		li.innerHTML = date + ' ' + news['desc']
		insertPoint.append(li);
	})
})
	

	



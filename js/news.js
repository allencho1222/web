function loadNewsList(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', '../news_list/news.json', true);
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
	newsList.forEach(function(news) {
		li = document.createElement('li');
		li.style.fontSize = "15pt";
		// for indentation same as research
		li.id="research"
		date = '[' + news['month'] + ' / ' + news['day'] + ' / ' +  news['year'] + ']'
		li.innerHTML = date + ' ' + news['desc']
		insertPoint.append(li);
	})
})
	

	


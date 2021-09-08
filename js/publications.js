var set_years = new Set();
var array_years = new Array();

function loadPaperList(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'https://raw.githubusercontent.com/allencho1222/web/main/publication_list/publications.json', true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(JSON.parse(xobj.responseText));
		}
	};
	xobj.send(null);
}

function createPaperByYear(paperList) {
	paperByYear = {};
	paperList.forEach(function(paper) {
		year = paper['year'];
		set_years.add(year);
		if (paperByYear.hasOwnProperty(year)) {
			paperByYear[year].push(paper);
		} else {
			paperByYear[year] = [];
			paperByYear[year].push(paper);
		}
	});
	array_years = Array.from(set_years);
	array_years.sort().reverse();

	return paperByYear;
}

function createPaperList(year, paperByYear) {
	console.log('hi' + year);
	if (paperByYear.hasOwnProperty(year)) {
		div = document.createElement('div');
		div.className = 'gallery-item-wrapper gallery-item editContent artwork';
		div.id = 'paper_' + year

		
		document.getElementById('papers').appendChild(div);

		yearHeader = document.createElement("h2");
		yearHeader.innerHTML = year;

		line = document.createElement("hr");
		line.className = 'margin-bottom-50';

		ul = document.createElement('ul');

		div.appendChild(yearHeader);
		div.appendChild(line);
		div.appendChild(ul);

		// currently, do not implement active state of link
		
		paperList = paperByYear[year];
		

		for (var i = 0; i < paperList.length; ++i) {
			list = document.createElement('li');
			//list.style.lineHeight = '4';
			div.appendChild(list);

			paper = paperList[i];

			paperTitle = document.createElement("h4");
			paperTitle.innerHTML = '<b>' + paper['title'] + '</b>';
			paperTitle.style.marginBottom = '10px';

			paperAuthors = document.createElement("h5");
			paperAuthors.innerHTML = '';
			paper['authors'].forEach(function(author, index) {
				if (index == paper['authors'].length - 1) {
					//paperAuthors.innerHTML += 'and ' + author;
					paperAuthors.innerHTML += author;
				} else { paperAuthors.innerHTML += author + ', ';
				}
			});
			paperAuthors.style.marginBottom = '10px';

			paperConf = document.createElement('h5');
			paperConf.innerHTML = '<em>' + paper['conference'] + '</em>';
			if (paper.hasOwnProperty('accept_rate')) {
				paperConf.innerHTML += ' (Acceptance rate: ' + paper['accept_rate'] + ')';
			}
			paperConf.style.marginBottom = '10px';

			list.appendChild(paperTitle);
			list.appendChild(paperAuthors);
			list.appendChild(paperConf);

			if (paper['is_best'] == 'true') {
				paperBest = document.createElement('h5');
				paperBest.innerHTML = 'Best Paper Award';
				paperBest.marginBottom = '10px'
				paperBest.style.color = 'red';
				list.appendChild(paperBest);
			} else if (paper['is_best'] == 'half') {
				paperBest = document.createElement('h5');
				paperBest.innerHTML = 'Nominated for the Best Paper Award';
				paperBest.marginBottom = '10px'
				paperBest.style.color = 'red';
				list.appendChild(paperBest);
			}
      lf = document.createElement('br')
      list.appendChild(lf);
			ul.appendChild(list);
		}
		linefeed = document.createElement('br');
		insertPoint.appendChild(linefeed);
	}
}
			

//years = Array.from(document.getElementById("publication_list").getElementsByTagName("li"));


loadPaperList(function(paperListJson) {
	paperByYear = createPaperByYear(paperListJson["publication_list"]);
	//array_years = Array.from(set_years);
	//array_years.sort().reverse();
	console.log(array_years);
	insertPoint = document.getElementById('papers');
	insertPoint.innerHTML = '';
	array_years.forEach(function(year, index) {
		createPaperList(array_years[index], paperByYear);
	});
	linkInsertPoint = document.getElementById('publication_list');
	array_years.forEach(function(year, index) {
		li = document.createElement('li');
		link = document.createElement('a');
		link.href = '#paper_' + year
		link.innerHTML = year
		li.appendChild(link);
		linkInsertPoint.appendChild(li);
	});
		
});




/*
	years.forEach(function(year, index) {
		if (years[index].innerText == 'All') {
			year.addEventListener('click', function() {
				year.className = 'active';
				insertPoint = document.getElementById("papers");
				insertPoint.innerHTML = "";
				years.forEach(function(year, index) {
					if (years[index].innerText != 'All')
						createPaperList(years[index].innerText, paperByYear);
				});
			}, false);
		} else {
			year.addEventListener('click', function() {
				//year.className = 'active';
				years[index].className = 'active'	
				insertPoint = document.getElementById("papers");
				insertPoint.innerHTML = "";
				createPaperList(years[index].innerText, paperByYear);
			}, false);
		}
	});
});
*/


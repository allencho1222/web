faculty_dir = ["hyojin", "gwangsun", "eunhyeok"]
graduate_dir = ["sungjun", "yeongsang", "junho", "yongwon", "hyunuk", "hyungkyu", "jeongmin", "hyungcheol", "jueon", "sein", "juseong"]

function readProfile(student, callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'users/' + student + '/profile.json', true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(JSON.parse(xobj.responseText));
		}
	};
	xobj.send(null);
}

faculty_dir.forEach(function(faculty, index) {
	currentIndex = index;
	if (index % 3 == 0) {
		insertPoint = document.getElementById('faculty');
		row = document.createElement('div');
		row.className = 'row service-v1 margin-bottom-40';
		row.id = 'faculty_row_' + parseInt(index / 3);
		insertPoint.appendChild(row);
	}
		
	readProfile(faculty, function(profile) {
		console.log(faculty);
		insertPoint = document.getElementById('faculty_row_' + parseInt(index / 3));

		div = document.createElement('div');
		if (index % 3 == 0) {
			div.className = 'col-md-4 md-margin-bottom-40';
		} else if (index % 3 == 1) {
			div.className = 'col-md-4';
		} else {
			div.className = 'col-md-4 md-margin-bottom-40';
		}

		img = document.createElement('img');
		//img.className = 'img-responsive';
		img.src = 'users/' + faculty + '/' + profile['img'];
		img.width = '250';
		img.height = '250';

		nameis = document.createElement('h3');
		nameis.innerHTML = profile['name'];
		nameis.paddingBottom = '5px';

    if (profile['homepage']) {
      if (profile['homepage'] != 'n/a') {
        if (profile['homepage'] == 'public_html') {
          homepage = document.createElement('img');
          homepage.src = '/img/homepage.png';
          link = document.createElement('a');
	  link.href = 'users/' + faculty + '/index.html';
          link.style.paddingLeft = "5px";
          link.appendChild(homepage);
        } else {
          homepage = document.createElement('img');
          homepage.src = '/img/homepage.png';
          link = document.createElement('a');
          link.href = profile['homepage'];
          link.style.paddingLeft = "5px";
          link.appendChild(homepage);
        }
      }
    }

		
		pos = document.createElement('h5');
		pos.innerHTML = profile['pos'];
		pos.style.paddingBottom = '1px';
		pos.style.marginBottom = '1px';
		//research = document.createElement('h5');
		//research.innerHTML = '<em>' + profile['research'] + '<em>';
		//research.style.color = "#0f5b97";
		//research.style.paddingBottom = '1px';
		//research.style.marginBottom = '1px';
		email = document.createElement('h5');
		email.innerHTML = profile['email'];
		email.style.paddingBottom = '1px';
		email.style.marginBottom = '1px';

		div.appendChild(img);
		div.appendChild(nameis);
		if (profile['homepage'] == 'public_html' ||
		    profile['homepage'] != 'n/a') {
			nameis.appendChild(link);
		}
		div.appendChild(pos);
		div.appendChild(email);
		//div.appendChild(research);

		insertPoint.append(div);
	});
});

currentIndex = -1;
graduate_dir.forEach(function(graduate, index) {
	console.log(graduate + "html")
	currentIndex = index;
	if (index % 3 == 0) {
		insertPoint = document.getElementById('graduate');
		row = document.createElement('div');
		row.className = 'row service-v1 margin-bottom-40';
		row.id = 'graduate_row_' + parseInt(index / 3);
		insertPoint.appendChild(row);
	}
		
	readProfile(graduate, function(profile) {
		console.log(graduate)
		insertPoint = document.getElementById('graduate_row_' + parseInt(index / 3));

		div = document.createElement('div');
		if (index % 3 == 0) {
			div.className = 'col-md-4 md-margin-bottom-40';
		} else if (index % 3 == 1) {
			div.className = 'col-md-4';
		} else {
			div.className = 'col-md-4 md-margin-bottom-40';
		}

		img = document.createElement('img');
		//img.className = 'img-responsive';
		img.src = 'users/' + graduate + '/' + profile['img'];
		//img.width = '357';
		//img.height = '238';
		img.width = '250';
		img.height = '270';
		
		nameis = document.createElement('h3');
		nameis.innerHTML = profile['name'];
		if (profile['homepage'] != 'n/a') {
			if (profile['homepage'] == 'public_html') {
				homepage = document.createElement('img');
				homepage.src = '/img/homepage.png';
				link = document.createElement('a');
				link.href = 'users/' + graduate + '/index.html';
				link.style.paddingLeft = "5px";
				link.appendChild(homepage);
			} else {
				homepage = document.createElement('img');
				homepage.src = '/img/homepage.png';
				link = document.createElement('a');
				link.href = profile['homepage'];
				link.style.paddingLeft = "5px";
				link.appendChild(homepage);
			}
		}
				
		pos = document.createElement('h5');
		pos.innerHTML = profile['pos'];
		pos.style.paddingBottom = '1px';
		pos.style.marginBottom = '1px';
		research = document.createElement('h5');
		research.innerHTML = '<em>' + profile['research'] + '</em>';
		research.style.paddingBottom = '1px';
		research.style.marginBottom = '1px';
		research.style.color = "#0f5b97";
		advisor = document.createElement('h5');
		advisor.innerHTML = 'Advisor: ' + profile['advisor'];
		advisor.style.paddingBottom = '1px';
		advisor.style.marginBottom = '1px';
		email = document.createElement('h5');
		email.innerHTML = profile['email'];
		email.style.paddingBottom = '1px';
		email.style.marginBottom = '1px';

		div.appendChild(img);
		div.appendChild(nameis);
		if (profile['homepage'] == 'public_html' ||
		    profile['homepage'] != 'n/a') {
			nameis.appendChild(link);
		}
		div.appendChild(pos);
		div.appendChild(advisor);
		div.appendChild(email);
		div.appendChild(research);

		insertPoint.appendChild(div);
		console.log(graduate + " finish")
	});
});

/* leave undergraduate student profile
undergraduate_dir.forEach(function(undergraduate, index) {
	if (index % 3 == 0) {
		insertPoint = document.getElementById('undergraduate');
		row = document.createElement('div');
		row.className = 'row service-v1 margin-bottom-40';
		row.id = 'undergraduate_row_' + parseInt(index / 3);
		insertPoint.appendChild(row);
	}
		
	readProfile(undergraduate, function(profile) {
		console.log(index);
		insertPoint = document.getElementById('undergraduate_row_' + parseInt(index / 3));

		div = document.createElement('div');
		if (index % 3 == 0) {
			div.className = 'col-md-4 md-margin-bottom-40';
		} else if (index % 3 == 1) {
			div.className = 'col-md-4';
		} else {
			div.className = 'col-md-4 md-margin-bottom-40';
		}

		img = document.createElement('img');
		img.className = 'img-responsive';
		img.src = '~' + undergraduate + '/' + profile['img'];
		img.width = '250';
		img.height = '270';
		
		nameis = document.createElement('h3');
		nameis.innerHTML = profile['name'];
		if (profile['homepage'] == 'public_html') {
			homepage = document.createElement('img');
			homepage.src = '/img/homepage.png';
			link = document.createElement('a');
			link.href = '~' + undergraduate;
			link.style.paddingLeft = "5px";
			link.appendChild(homepage);
		}
		pos = document.createElement('h5');
		pos.innerHTML = profile['pos'];
		pos.style.paddingBottom = '1px';
		pos.style.marginBottom = '1px';
		research = document.createElement('h5');
		research.innerHTML = '<em>' + profile['research'] + '</em>';
		research.style.paddingBottom = '1px';
		research.style.marginBottom = '1px';
		research.style.color = "#0f5b97";
		advisor = document.createElement('h5');
		advisor.innerHTML = 'Advisor: ' + profile['advisor'];
		advisor.style.paddingBottom = '1px';
		advisor.style.marginBottom = '1px';
		email = document.createElement('h5');
		email.innerHTML = profile['email'];
		email.style.paddingBottom = '1px';
		email.style.marginBottom = '1px';

		div.appendChild(img);
		div.appendChild(nameis);
		if (profile['homepage'] == 'public_html') {
			nameis.appendChild(link);
		}
		div.appendChild(pos);
		div.appendChild(advisor);
		div.appendChild(email);
		div.appendChild(research);

		insertPoint.append(div);
	});
});
*/



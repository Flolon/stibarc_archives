
if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem("archiveType") === null) {
		console.log("Setting archiveType to new");
        localStorage.setItem("archiveType", "new");
    }
} else {
    console.log("Sorry, your browser does not support Web Storage...");
}

if(localStorage.getItem("archiveType") == "all") {
	archiveTypeP = '&type=' + localStorage.getItem("archiveType");
} else if(getAllUrlParams().type == "all") {
	archiveTypeP = '&type=all';
} else {
	archiveTypeP = '';
}

function $(id) {
    if(id.startsWith(".")){
        return document.getElementsByClassName(id.substring(1));
    }else{
        return document.getElementById(id);
    }
}

function toDate(input) {
    var t = input.split(/[- :]/);
    var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    return(d);
}

function formatDate(input, type = 'en-US') {
    return input.toLocaleString(type);
}

function getAllUrlParams(url) {
	var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
	var obj = {};
	if (queryString) {
		queryString = queryString.split('#')[0];
		var arr = queryString.split('&');
		for (var i = 0; i < arr.length; i++) {
			var a = arr[i].split('=');
			var paramNum = undefined;
			var paramName = a[0].replace(/\[\d*\]/, function (v) {
				paramNum = v.slice(1, -1);
				return '';
			});
			var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
			paramName = paramName;
			paramValue = paramValue;
			if (obj[paramName]) {
				if (typeof obj[paramName] === 'string') {
					obj[paramName] = [obj[paramName]];
				}
				if (typeof paramNum === 'undefined') {
					obj[paramName].push(paramValue);
				}
				else {
					obj[paramName][paramNum] = paramValue;
				}
			}
			else {
				obj[paramName] = paramValue;
			}
		}
	}
	return obj;
}

function buildComment(data, type = false) {
	var poster = data.poster;
	var postId = data.postid;
	var content = data.content
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\r\n/g, "<br>");
	if(data.error == 'time' || data.error == 'old' || data.date == null || data.date == '') {
		var dateMeta = 'class="date metaError" title="Time is not accurate"';
	} else {
		var dateMeta = 'class="date"';
	}
	if(data.date == null || data.date == '') {
		var date = 'Unknown date';
	} else {
		var date = formatDate(toDate(data.date));
	}
	if(data.error == 'old') {
		date += '</span><span class="badge yellow" style="float: right;" title="This post is from an older archive">OLD ARCHIVE';	
	}

	if(type) {
		var commentItem =
			'<div class="comment"> <div class="top"> <a href="./user.html?id=' +
			poster +
			'" class="username">' +
			poster +
			'</a><span>&nbsp;on post&nbsp;<a href="./post.html?id=' +
			postId +
			'" class="postId">' +
			postId +
			'</a></span>&nbsp;at&nbsp;<span ' +
			dateMeta +
			'>' +
			date +
			'</span> </div> <div class="content">' +
			content +
			"</div> </div>";
	} else {
		var commentItem =
			'<div class="comment"> <div class="top"> <a href="./user.html?id=' +
			poster +
			'" class="username">' +
			poster +
			'</a>&nbsp;at&nbsp;<span ' +
			dateMeta +
			'>' +
			date +
			'</span> </div> <div class="content">' +
			content +
			"</div> </div>";
	}

	return commentItem;
}

function goToPost(id) {
	window.location.href = './post.html?id=' + id;
}

function buildPostBlock(data, type = false) {
	var postId = data.postid;
	var title = data.title;
	var poster = data.poster;
	if(data.error == 'time' || data.postdate == null || data.postdate == '') {
		var dateMeta = 'class="date metaError" title="Time is not accurate"';
	} else {
		var dateMeta = 'class="date"';
	}
	if(data.postdate == null || data.postdate == '') {
		var date = 'Unknown date';
	} else {
		var date = formatDate(toDate(data.postdate));
	}
	if(data.deleted == 1) {
		title += '</span><span class="badge red"style="float: right; margin-left: 4px;"  title="Removed from the original site">DELETED';
	}
	if(data.error == 'old') {
		title += '</span><span class="badge yellow" style="float: right;" title="This post is from an older archive">OLD ARCHIVE';	
	}

	if(type) {
		var postItem =
			'<div class="post" tabindex="-1" onclick="goToPost(' +
			postId +
			')"> <a href="post.html?id=' +
			postId +
			'"> <div class="title"><span>' +
			title +
			'</span></div> </a> <div class="meta"> <span ' +
			dateMeta +
			'>' +
			date +
			'</span> </div> </div>';
	} else {
		var postItem =
			'<div class="post" tabindex="-1" onclick="goToPost(' +
			postId +
			')"> <a href="post.html?id=' +
			postId +
			'"> <div class="title"><span>' +
			title +
			'</span></div> </a> <div class="meta"> <span>By:&nbsp;<a class="username" href="user.html?id=' +
			poster +
			'">' +
			poster +
			'</a></span> at <span ' +
			dateMeta +
			'>' +
			date +
			'</span></div> </div>';
	}

	return postItem;
}

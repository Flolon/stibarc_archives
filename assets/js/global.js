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
	if(data.error == 'time') {
		var timeMeta = 'class="date metaError" title="Time is not accurate"';
	} else {
		var timeMeta = 'class="date"';
	}
	var date = formatDate(toDate(data.date));

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
			timeMeta +
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
			timeMeta +
			'>' +
			date +
			'</span> </div> <div class="content">' +
			content +
			"</div> </div>";
	}

	return commentItem;
}
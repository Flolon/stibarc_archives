var postId = getAllUrlParams().id;

function buildPost(data) {
	var title = data.title
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
	var poster = data.poster;
	var date = formatDate(toDate(data.postdate));
	if (
		poster == "herronjo" ||
		poster == "DomHupp" ||
		poster == "Aldeenyo" ||
		poster == "savaka" ||
		poster == "alluthus" ||
		poster == "Bunnbuns"
	) {
		var content = data.content.replace(/\r\n/g, "<br>");
	} else {
		var content = data.content
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/\r\n/g, "<br>");
	}

	$("title").innerHTML = title;
	$("username").innerHTML = poster;
	$("username").href = `./user.html?id=${poster}`;
	$("date").innerHTML = date;
	$("content").innerHTML = content;
}

var req = new XMLHttpRequest();
req.onreadystatechange = function () {
	request = null;
	if (this.readyState == 4 && this.status == 200) {
		var tmp = null;
		var tmp = JSON.parse(req.responseText);
		//console.log(tmp);
		buildPost(tmp[0]);
	}
};

function loadPost() {
	$("ogLink").href = "https://stibarc.com/post.html?id=" + postId;
	$("jsonLink").href = "./json/post/?id=" + postId;
	$("jsonLink2").href = "./json/post/comments/?id=" + postId;
	req.open(
		"GET",
		"https://apis.buncode.com/sa/json/post/?id=" + postId,
		true
	);
	req.send();
}

/* post comments */

function buildComment(data) {
	var poster = data.poster;
	var postId = data.postid;
	var content = data.content
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\r\n/g, "<br>");
	var date = formatDate(toDate(data.date));

	var commentItem =
		'<div class="comment"> <div class="top"> <a href="./user.html?id=' +
		poster +
		'" class="username">' +
		poster +
		'</a>&nbsp;at&nbsp;<span class="date">' +
		date +
		'</span> </div> <div class="content">' +
		content +
		"</div> </div>";

	return commentItem;
}

var req2 = new XMLHttpRequest();
req2.onreadystatechange = function () {
	request = null;
	if (this.readyState == 4 && this.status == 200) {
		var tmp = null;
		var tmp = JSON.parse(req2.responseText);
		console.log(tmp);
		var commentsCount = Object.keys(tmp).length;
		var commentsHTML = "";
		for (var i = 0; i < commentsCount; i++) {
			commentsHTML += buildComment(tmp[i]);
		}
		$("comments").innerHTML = commentsHTML;
		// post count //
		var commentsNum;
		if (commentsCount == 0) {
			commentsNum = "0 Comments";
		} else if (commentsCount == 1) {
			commentsNum = "1 Comment";
		} else {
			commentsNum = commentsCount + " Comments";
		}
		$("commentsNum").innerHTML = commentsNum;
	}
};

function loadPostComments() {
	$("comments").innerHTML = "Loading...";
	$("commentsNum").innerHTML = "";
	req2.open("GET", "https://apis.buncode.com/sa/json/post/comments/?id="+postId, true);
	req2.send();
}

// Window load //
window.onload = function () {
	loadPost();
	loadPostComments();
};
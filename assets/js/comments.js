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
		'</a><span>&nbsp;on post&nbsp;<a href="./post.html?id=' +
		postId +
		'" class="postId">' +
		postId +
		'</a></span>&nbsp;at&nbsp;<span class="date">' +
		date +
		'</span> </div> <div class="content">' +
		content +
		"</div> </div>";

	return commentItem;
}

var req = new XMLHttpRequest();
req.onreadystatechange = function () {
	request = null;
	if (this.readyState == 4 && this.status == 200) {
		var tmp = null;
		var tmp = JSON.parse(req.responseText);
		console.log(tmp);
		var commentsCount = Object.keys(tmp).length;
		var commentsHTML = "";
		for (var i = commentsCount - 1; i > -1; i--) {
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

function loadComments() {
	$("comments").innerHTML = "Loading...";
	$("commentsNum").innerHTML = "";
	req.open("GET", "https://apis.buncode.com/sa/json/comments/", true);
	req.send();
}

// Window load //
window.onload = function () {
	loadComments();
};

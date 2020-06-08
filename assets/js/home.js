function buildPost(data) {
	var postId = data.postid;
	var title = data.title;
	var poster = data.poster;
	var date = formatDate(toDate(data.postdate));

	var postItem =
		'<div class="post"> <a href="post.html?id=' +
		postId +
		'" class="overlay" tabindex="1"> <div class="title">' +
		title +
		'</div> </a> <div class="inner"> <br> <span>By:&nbsp;<a class="username" href="user.html?id=' +
		poster +
		'">' +
		poster +
		'</a></span> at <span class="date">' +
		date +
		"</span> </div> </div>";

	return postItem;
}

var req = new XMLHttpRequest();
req.onreadystatechange = function () {
	request = null;
	if (this.readyState == 4 && this.status == 200) {
		var tmp = null;
		var tmp = JSON.parse(req.responseText);
		var postsCount = Object.keys(tmp).length;
		var latestPostNum = postsCount - 1;
		$("latestPost").innerHTML = buildPost(tmp[latestPostNum]);
		// post count //
		var postsNum;
		if (postsCount == 0) {
			postsNum = "0 Posts";
		} else if (postsCount == 1) {
			postsNum = "1 Post";
		} else {
			postsNum = postsCount + " Posts";
		}
		$("postsNum").innerHTML = postsCount;
	}
};

function loadPosts() {
	$("postsNum").innerHTML = "";
	req.open("GET", "https://apis.buncode.com/sa/json/posts/", true);
	req.send();
}

/* comments */
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

var req2 = new XMLHttpRequest();
req2.onreadystatechange = function () {
	request = null;
	if (this.readyState == 4 && this.status == 200) {
		var tmp = null;
		var tmp = JSON.parse(req2.responseText);
		var commentsCount = Object.keys(tmp).length;
		var latestCommentNum = commentsCount - 1;
		$("latestComment").innerHTML = buildComment(tmp[latestCommentNum]);
		// post count //
		var commentsNum;
		if (commentsCount == 0) {
			commentsNum = "0 Comments";
		} else if (commentsCount == 1) {
			commentsNum = "1 Comment";
		} else {
			commentsNum = commentsCount + " Comments";
		}
		$("commentsNum").innerHTML = commentsCount;
	}
};

function loadComments() {
	$("commentsNum").innerHTML = "";
	req2.open("GET", "https://apis.buncode.com/sa/json/comments/", true);
	req2.send();
}

// Window load //
window.onload = function () {
	loadPosts();
	loadComments();
};

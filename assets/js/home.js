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
	$("postsNum").innerHTML = "";
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
	req.open("GET", "https://apis.buncode.com/sa/json/posts/", true);
	req.send();
}
var req2 = new XMLHttpRequest();
req2.onreadystatechange = function () {
	request = null;
	$("commentsNum").innerHTML = "";
	if (this.readyState == 4 && this.status == 200) {
		var tmp = null;
		var tmp = JSON.parse(req2.responseText);
		var commentsCount = Object.keys(tmp).length;
		var latestCommentNum = commentsCount - 1;
		$("latestComment").innerHTML = buildComment(tmp[latestCommentNum], false);
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
	req2.open("GET", "https://apis.buncode.com/sa/json/comments/", true);
	req2.send();
}

loadPosts();
loadComments();

var req = new XMLHttpRequest();
req.onreadystatechange = function () {
	request = null;
	$("postsNum").innerHTML = "";
	if (this.readyState == 4 && this.status == 200) {
		var tmp = null;
		var tmp = JSON.parse(req.responseText);
		var postsCount = Object.keys(tmp).length;
		var latestPostNum = postsCount - 1;
		$("latestPost").innerHTML = buildPostBlock(tmp[latestPostNum]);
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
		$("latestComment").innerHTML = buildComment(tmp[latestCommentNum], true);
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

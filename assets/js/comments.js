var req = new XMLHttpRequest();
req.onreadystatechange = function () {
	request = null;
	if (this.readyState == 4 && this.status == 200) {
		var tmp = null;
		var tmp = JSON.parse(req.responseText);
		var commentsCount = Object.keys(tmp).length;
		var commentsHTML = "";
		for (var i = commentsCount - 1; i > -1; i--) {
			commentsHTML += buildComment(tmp[i], true);
		}
		$("comments").innerHTML = commentsHTML;
		// comments count //
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
	req.open("GET", "https://apis.buncode.com/sa/json/comments/?type=" + getAllUrlParams().type, true);
	req.send();
}

loadComments();

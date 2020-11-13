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
	if(data.error == 'old') {
		$("badges").innerHTML += '<div class="badge yellow" title="This post is from an older archive">OLD ARCHIVE</div>';
	}
	if(data.deleted == 1) {
		$("badges").innerHTML += '<div class="badge red" title="Removed from the original site">DELETED</div>';
	}
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

var req2 = new XMLHttpRequest();
req2.onreadystatechange = function () {
	request = null;
	if (this.readyState == 4 && this.status == 200) {
		var tmp = null;
		var tmp = JSON.parse(req2.responseText);
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

loadPost();
loadPostComments();
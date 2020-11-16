var postId = getAllUrlParams().id;

function buildPost(data) {
	$("title").innerHTML = data.title
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
	$("username").innerHTML = data.poster;
	$("username").href = `./user.html?id=${data.poster}`;

	if (
		data.poster == "herronjo" ||
		date.poster == "DomHupp" ||
		data.poster == "Aldeenyo" ||
		data.poster == "savaka" ||
		data.poster == "alluthus" ||
		data.poster == "Bunnbuns"
	) {
		$("content").innerHTML = data.content.replace(/\r\n/g, "<br>");
	} else {
		$("content").innerHTML = data.content
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/\r\n/g, "<br>");
	}

	if(data.error == 'time' || data.postdate == null || data.postdate == '') {
		$("date").classList.add("metaError");
		$("date").title = "Time is not accurate";
	}
	if(data.postdate == null || data.postdate == '') {
		$("date").innerHTML = 'Unknown date';
	} else {
		$("date").innerHTML = formatDate(toDate(data.postdate));
	}

	if(data.archive == 'old') {
		$("badges").innerHTML += '<div class="badge yellow" title="This post is from an older archive">OLD ARCHIVE</div>';
	}
	if(data.deleted == 1) {
		$("badges").innerHTML += '<div class="badge red" title="Removed from the original site">DELETED</div>';
	}

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
	$("jsonLink").href = "./json/post/?id=" + postId + archiveTypeP;
	$("jsonLink2").href = "./json/post/comments/?id=" + postId + archiveTypeP;
	req.open(
		"GET",
		"https://apis.buncode.com/sa/json/post/?id=" + postId + archiveTypeP,
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
	req2.open("GET", "https://apis.buncode.com/sa/json/post/comments/?id=" + postId + archiveTypeP, true);
	req2.send();
}

loadPost();
loadPostComments();
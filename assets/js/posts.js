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
		//console.log(tmp);
		//$("posts").innerHTML = '<div class="post-row">E</div>';
		var postsCount = Object.keys(tmp).length;
		var postsHTML = "";
		for (var i = postsCount - 1; i > -1; i--) {
			postsHTML += buildPost(tmp[i]);
		}
		$("posts").innerHTML = postsHTML;
		// post count //
		var postsNum;
		if (postsCount == 0) {
			postsNum = "0 Posts";
		}else if(postsCount == 1){
			postsNum = '1 Post';
		}else {
			postsNum = postsCount + ' Posts';
		}
		$("postsNum").innerHTML = postsNum;
	}
};

function loadPosts() {
	$("posts").innerHTML = "Loading...";
	$("postsNum").innerHTML = "";
	req.open("GET", "https://apis.buncode.com/sa/json/posts/", true);
	req.send();
}

// Window load //
window.onload = function () {
	loadPosts();
};

var req = new XMLHttpRequest();
req.onreadystatechange = function () {
	request = null;
	if (this.readyState == 4 && this.status == 200) {
		var tmp = null;
		var tmp = JSON.parse(req.responseText);
		var postsCount = Object.keys(tmp).length;
		var postsHTML = "";
		for (var i = postsCount - 1; i > -1; i--) {
			postsHTML += buildPostBlock(tmp[i]);
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
	req.open("GET", "https://apis.buncode.com/sa/json/posts/?type=" + getAllUrlParams().type, true);
	req.send();
}

loadPosts();

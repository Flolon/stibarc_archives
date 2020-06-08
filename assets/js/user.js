var username = getAllUrlParams().id;
var currentTab = getAllUrlParams().tab;

function tab(id, updateUri) {
    if(id == 'comments') {
        $('posts').style.display = "none";
        $('postsLink').classList.remove("active");
        $('comments').style.display = "block";
        $('commentsLink').classList.add("active");
	}else {
        $('comments').style.display = "none";
        $('commentsLink').classList.remove("active");
        $('posts').style.display = "block";
        $('postsLink').classList.add("active");
    } 
	if(updateUri) { window.history.pushState(null, id, '?id='+username+'&tab='+id); }
}

function tabFromUrl(){
	tab(currentTab, false);
}

function buildUser(data) {
    $('username').innerHTML = username;
}

/* user posts */

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
		'</div> </a> <div class="inner"> <br> <span class="date">' +
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
		var postsCount = Object.keys(tmp).length;
        var postsHTML = "";
        if(postsCount > 0) {
            for (var i = postsCount - 1; i > -1; i--) {
                postsHTML += buildPost(tmp[i]);
            }
        }else {
            postsHTML = "<span>No posts</span>";
        }
		$("posts").innerHTML = postsHTML;
	}
};

function loadUserPosts() {
    $("posts").innerHTML = "Loading...";
	$("ogLink").href = "https://stibarc.com/user.html?id=" + username;
	$("jsonLink").href = "./json/user/";
	req.open(
		"GET",
		"https://apis.buncode.com/sa/json/user/posts/?id=" + username,
		true
	);
	req.send();
}

/* user comments */

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
		'<div class="comment"> <span>On post&nbsp;<a href="./post.html?id=' +
		postId +
		'" class="postId">' +
		postId +
		'</a></span>&nbsp;at&nbsp;<span class="date">' +
		date +
		'</span> <div class="content">' +
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
		//console.log(tmp);
		var commentsCount = Object.keys(tmp).length;
		var commentsHTML = "";
        if(commentsCount > 0) {
            for (var i = commentsCount - 1; i > -1; i--) {
                commentsHTML += buildComment(tmp[i]);
            }
        }else {
            commentsHTML = "<span>No comments</span>";
        }
		$("comments").innerHTML = commentsHTML;
	}
};

function loadUserComments() {
	$("comments").innerHTML = "Loading...";
	req2.open("GET", "https://apis.buncode.com/sa/json/user/comments/?id="+username, true);
	req2.send();
}

// Window load //
window.onload = function () {
    buildUser();
	loadUserPosts();
	loadUserComments();
	tabFromUrl();
};
window.onpopstate = function(e) {
	tabFromUrl();
}
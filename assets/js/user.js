var username = getAllUrlParams().id;
var currentTab = getAllUrlParams().tab;

function tab(id, updateUri) {
    if(id == 'comments') {
        $('postsTab').style.display = "none";
        $('postsLink').classList.remove("active");
        $('commentsTab').style.display = "block";
        $('commentsLink').classList.add("active");
	}else {
        $('commentsTab').style.display = "none";
        $('commentsLink').classList.remove("active");
        $('postsTab').style.display = "block";
        $('postsLink').classList.add("active");
    } 
	//if(updateUri) { history.pushState({}, '', '?id='+username+'&tab='+id); }
}

function tabFromUrl(){
	tab(currentTab, false);
}

function buildUser() {
    $('username').innerHTML = username;
}

function buildPost(data) {
	var postId = data.postid;
	var title = data.title;
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
		var postsCount = Object.keys(tmp).length;
        var postsHTML = "";
        if(postsCount > 0) {
            for (var i = postsCount - 1; i > -1; i--) {
                postsHTML += buildPost(tmp[i]);
            }
        }else {
            postsHTML = '<b style="color: #2b2b2b;">No posts</b>';
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

var req2 = new XMLHttpRequest();
req2.onreadystatechange = function () {
	request = null;
	if (this.readyState == 4 && this.status == 200) {
		var tmp = null;
		var tmp = JSON.parse(req2.responseText);
		var commentsCount = Object.keys(tmp).length;
		var commentsHTML = "";
        if(commentsCount > 0) {
            for (var i = commentsCount - 1; i > -1; i--) {
                commentsHTML += buildComment(tmp[i], true);
            }
        }else {
            commentsHTML = '<b style="color: #2b2b2b;">No comments</b>';
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

function loadUserComments() {
	$("comments").innerHTML = "Loading...";
	req2.open("GET", "https://apis.buncode.com/sa/json/user/comments/?id="+username, true);
	req2.send();
}

buildUser();
loadUserPosts();
loadUserComments();
tabFromUrl();

window.onpopstate = function(e) {
	tabFromUrl();
}
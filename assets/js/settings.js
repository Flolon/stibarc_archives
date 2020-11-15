
function chageArchiveType(type) {
    localStorage.setItem("archiveType", type);
    if(type == "all") {
        $("useAll").checked = true;
    } else {
        $("useAll").checked = false;
    }
}

function toggleArchiveType() {
    if(localStorage.getItem("archiveType") == "new") {
        chageArchiveType("all");
    } else {
        chageArchiveType("new");
    }
}

chageArchiveType(localStorage.getItem("archiveType"));
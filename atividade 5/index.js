var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }
}

function con(){
    var sidebar = document.getElementsByClassName("nav-lateral");
    if (sidebar[0].style.display === "block") {
        sidebar[0].style.display = "none";
    } else {
        sidebar[0].style.display = "block";
    }
}
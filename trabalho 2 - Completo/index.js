var groups = [];
var messages = [];

var selectedGroup = "";

// Get the modal
var modal = document.getElementById('myModal');
var modal2 = document.getElementById('myModalGroup');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];
btn.onclick = function() {
    if(window.localStorage.getItem("usuario")){
        window.localStorage.clear();
        clearGroups();
        clearMessages();
        btn.textContent = "Entrar";
        var btn2 = document.getElementById("grupoButton");
        btn2.style.display = "none";
    } else {
        modal.style.display = "block";
    }
};

span2.onclick = function(){
    modal2.style.display = "none";
};

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function getGroups(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            groups = JSON.parse(this.responseText);
            makeUL(groups);
        }
    };
    xhttp.open('GET','http://rest.learncode.academy/api/'+window.localStorage.getItem("usuario")+'/groups',true);
    xhttp.send();
}


function clearMessages() {
    var list_m = document.getElementById('mensagem');
    list_m.innerHTML = "";
}

function clearGroups() {
    var list = document.getElementById('amigosList');
    list.innerHTML = "";
}

function getMessages(groupid) {
    messages = [];
    clearMessages();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            messages = JSON.parse(this.responseText);
            makeMsgs(messages);
        }
    };
    xhttp.open('GET', 'http://rest.learncode.academy/api/'+window.localStorage.getItem("usuario")+'/'+groupid, true);
    xhttp.send();
}


function makeUL(array) {
    var list = document.getElementById('amigosList');

    for(var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        var link = document.createElement('a'); //esse é o elemento link
        var img = document.createElement('img');
        img.src = 'person.png';
        img.width = 24;
        img.height = 24;
        link.appendChild(img);
        link.className += " pointer";
        link.appendChild(document.createTextNode(' ' + array[i].groupName));
        link.onclick = (function () {
            var currentI = i;
            return function(){
                getMessages(array[currentI].groupID);
                selectedGroup = array[currentI].groupID;
                document.getElementById('nome-amigo').innerHTML = array[currentI].groupName;
            };
        })();
        item.appendChild(link);
        list.appendChild(item);
    }
    return list;
}


function makeMsgs(msg){
    var list_m = document.getElementById('mensagem');
    for (var j = 0; j < msg.length; j++) {
        var h3 = document.createElement('h3');
        h3.appendChild(document.createTextNode(msg[j].userName));
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(msg[j].message));
        list_m.appendChild(h3);
        list_m.appendChild(p);
    }
}


function sendMsg() {
    var user = window.localStorage.getItem("usuario");
    var msg = document.getElementById("msg").value;

    var envio = {
        userName: user,
        message : msg
    };

    console.log(envio);
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'http://rest.learncode.academy/api/'+window.localStorage.getItem("usuario")+'/'+selectedGroup, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(envio));
    getMessages(selectedGroup);
}

function salvarGroup() {
    var groupID = document.getElementById("groupID").value;
    var groupName = document.getElementById("groupName").value;

    var envio = {
        groupID: groupID,
        groupName: groupName
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'http://rest.learncode.academy/api/'+window.localStorage.getItem("usuario")+'/groups', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(envio));
    clearGroups();
    clearMessages();
    getGroups();
    modal2.style.display = "none";
}


function login(){
    var user = document.getElementById("user").value;
    window.localStorage.setItem("usuario", user);
    var btn = document.getElementById("myBtn");
    btn.textContent = "Logout";
    console.log(window.localStorage.getItem("usuario"));
    getGroups();
    modal.style.display = "none";
    var btn2 = document.getElementById("grupoButton");
    btn2.style.display = "block";
}

function carregar() {
    if(window.localStorage.getItem("usuario")){
        getGroups();
        clearGroups();
        clearMessages();
        var btn = document.getElementById("myBtn");
        btn.textContent = "Logout";
    } else {
        var btn2 = document.getElementById("grupoButton");
        btn2.style.display = "none";
    }
}

function openGroupModal(){
    modal2.style.display = "block";
}

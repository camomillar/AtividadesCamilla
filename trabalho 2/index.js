var groups = [];
var messages = [];


function getGroups(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            groups = JSON.parse(this.responseText);
            console.log(groups);
            makeUL(groups);
        }
    };
    xhttp.open('GET','http://rest.learncode.academy/api/camomillar/groups',true);
    xhttp.send();
}

getGroups();

function clearMessages() {
    var list_m = document.getElementById('mensagem');
    list_m.innerHTML = "";
}

function getMessages(groupid) {
    messages = [];
    clearMessages();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            messages = JSON.parse(this.responseText);
            console.log(messages);
            makeMsgs(messages);
        }
    };
    xhttp.open('GET', 'http://rest.learncode.academy/api/camomillar/'+groupid, true);
    xhttp.send();
}


function makeUL(array) {
    var list = document.getElementById('amigosList');

    for(var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        var link = document.createElement('a');
        var img = document.createElement('img');
        img.src = 'person.png';
        img.width = 24;
        img.height = 24;
        link.appendChild(img);
        link.appendChild(document.createTextNode(' ' + array[i].groupName));
        link.onclick = (function () {
            var currentI = i;
            console.log(currentI);
            return function(){
                getMessages(array[currentI].groupID);
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
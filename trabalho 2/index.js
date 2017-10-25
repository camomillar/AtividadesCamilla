var amigos = ['milla','dandan', 'Kimberly', 'brendon'];
var mensagens = [,
    {
        user: '',
        mensagens: []
    },
    {
        user: amigos[1],
        mensagens: [
            {
                usuario: amigos[0],
                msg: 'oi'
            },
            {
                usuario: amigos[1],
                msg: 'oi'
            },
            {
                usuario: amigos[0],
                msg: 'td bem?'
            }
        ]
    },
    {
        user: amigos[2],
        mensagens: [
            {
                usuario: amigos[2],
                msg: 'oi'
            },
            {
                usuario: amigos[0],
                msg: 'oi'
            },
            {
                usuario: amigos[2],
                msg: 'td bem?'
            }
        ]
    },
    {
        user: amigos[3],
        mensagens: [
            {
                usuario: amigos[0],
                msg: 'oi'
            },
            {
                usuario: amigos[3],
                msg: 'oi'
            },
            {
                usuario: amigos[0],
                msg: 'td bem?'
            }
        ]
    }
];



function makeUL(array) {
    var list = document.getElementById('amigosList');

    for(var i = 1; i < array.length; i++) {
        var item = document.createElement('li');
        var link = document.createElement('a');
        var img = document.createElement('img');
        img.src = 'person.png';
        img.width = 24;
        img.height = 24;
        link.appendChild(img);
        link.appendChild(document.createTextNode(' ' + array[i]));
        link.onclick = makeMsgs(i+1);
        item.appendChild(link);
        list.appendChild(item);
    }
    return list;
}

function makeMsgs(index){
    var list_m = document.getElementById('mensagem');
    console.log(mensagens[index]);
    for (var j = 0; j < mensagens[index].mensagens.length; j++) {
        var h3 = document.createElement('h3');
        h3.appendChild(document.createTextNode(mensagens[index].mensagens[j].usuario));
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(mensagens[index].mensagens[j].msg));
        list_m.appendChild(h3);
        list_m.appendChild(p);
    }
}

makeUL(amigos);

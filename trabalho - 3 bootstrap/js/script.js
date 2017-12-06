var isLogged = false;
var user_Logged = {};
var lista = [];

function cadastrar() {
    var email = $('#email-cadastro').val().toString();
    var senha = $('#senha-cadastro').val().toString();
    var usuario = {
        email: email,
        senha: senha
    };

    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/lojatal/usuarios',
        success: function(data){
            users = data;
            for(var i in users){
                if(users[i].email === usuario.email) {
                    alert("Email ja cadastrado!");
                    return;
                }
            }
            sendUser(usuario);
        },
        error: function(err){
            console.log(err);
            alert("ocorreu um erro!");

        }
    })


}

function login(){
    var user = {
        email: $('#inputEmail3').val().toString(),
        senha: $('#inputPassword3').val().toString()
    };
    var users = [];
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/lojatal/usuarios',
        success: function(data){
            users = data;
            for(var i in users){
                if(users[i].email === user.email && users[i].senha === user.senha) {
                    localStorage.setItem('loggedUser', JSON.stringify(user));
                    onLoad();
                    break;
                }
            }
            if(!localStorage.getItem('loggedUser')){
                alert("Login Inválido");
            }
        },
        error: function(err){
            console.log(err);
            alert("ocorreu um erro!");

        }
    })
}

function logout(){
    window.location.href = 'index.html';
    localStorage.clear();
    onLoad();
}

function onLoad(){
    if(localStorage.getItem('loggedUser')){
        user_Logged = JSON.parse(localStorage.getItem('loggedUser'));
        isLogged = true;
        $('#logout-btn').toggle(isLogged);
        $('.prod').show();
        $('#useremail').toggle(isLogged);
        $('#useremail').text(user_Logged.email);
        $('#entrar-drop').toggle(!isLogged);
        $('#shopping-cart').toggle(isLogged);
        $('#cadastrar-drop').toggle(!isLogged);
    } else {
        $('#entrar-drop').toggle(!isLogged);
        $('#cadastrar-drop').toggle(!isLogged);
        $('#logout-btn').toggle(isLogged);
        $('#shopping-cart').toggle(isLogged);
        $('.prod').hide();
    }
    atualizaLista();
}

function sendUser(usuario){
    $.ajax({
        type: 'POST',
        url: 'http://rest.learncode.academy/api/lojatal/usuarios',
        data: usuario,
        success: function(data){
            alert("Usuário cadastrado!");
        },
        error: function(err){
            alert("ocorreu um erro.");
        }
    });
}

onLoad();

function adicionarItem(id,nomeItem, preco){
    var item = {
        qtd: $('#qtd'+id).val(),
        nome: nomeItem,
        preco: preco
    };
    lista.push(item);
    localStorage.setItem('cesta', JSON.stringify(lista));
    atualizaLista();
}

function atualizaLista() {
    $('#myList').html("");
    if(localStorage.cesta){
        lista = JSON.parse(localStorage.cesta);
    } else {
        var vazia = $("<p></p>").text("lista vazia");
        $('#myList').append(vazia);
        $('#finalizar-btn').hide();
    }
    if(lista.length > 0){
        for (var j in lista){
            var p = $("<p></p>").text(lista[j].qtd +" - "+ lista[j].nome);
            $('#myList').append(p);
        }
        $('#finalizar-btn').show();
    }
}


function finalizar(){
    window.location.href = 'compras.html';
}

function fillTable(){
    if(localStorage.loggedUser){
        getCompras();
        $('#tablebody').html("");
        if(localStorage.cesta) {
            lista = JSON.parse(localStorage.cesta);

            for(var k in lista){
                var tr = $('<tr></tr>');
                var th1 = $("<th></th>").text(lista[k].qtd);
                var th2 = $("<th></th>").text(lista[k].nome);
                var th3 = $("<th></th>").text((parseInt(lista[k].qtd)*parseFloat(lista[k].preco)).toString());
                tr.append(th1,th2,th3);
                $('#tablebody').append(tr);
            }
            $('#totalPagar').text(calcular());
        }
    } else {
        window.location.href = "index.html"
    }

}

function pagar(){
    var compra = {
        data: new Date().toLocaleDateString(),
        hora: new Date().getHours()+":"+new Date().getMinutes(),
        user:  JSON.parse(localStorage.loggedUser).email,
        total: calcular()
    };
    $.ajax({
        type: 'POST',
        url: 'http://rest.learncode.academy/api/lojatal'+compra.user+'/compras',
        data: compra,
        success: function(data){
            alert("Compras Finalizadas!");
            localStorage.removeItem("cesta");
            fillTable();
        },
        error: function(err){
            alert("ocorreu um erro.");
        }
    });
}

function calcular() {
    var total = 0;
    lista = JSON.parse(localStorage.cesta);
    for(var l in lista){
        total = total + (parseInt(lista[l].qtd)*parseFloat(lista[l].preco));
    }
    return total;
}

function getCompras() {
    var u = JSON.parse(localStorage.loggedUser).email;
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/lojatal'+u+'/compras',
        success: function(data){
            $('#comprasbody').html("");
            for(var k in data){
                var tr = $('<tr></tr>');
                var th1 = $("<th></th>").text(data[k].data);
                var th3 = $("<th></th>").text(data[k].hora);
                var th2 = $("<th></th>").text(data[k].total);
                tr.append(th1,th3,th2);
                $('#comprasbody').append(tr);
            }
        }

    });
}

function goHome() {
    window.location.href = "index.html";
}




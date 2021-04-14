let nomeUsuario;

function logar(){
    
    nomeUsuario = { name: document.querySelector(".nome-usuario").value }
    const solicitarLogin = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", nomeUsuario )
    solicitarLogin.then(sucessoLogin)
    solicitarLogin.catch(falhaLogin)
    
}

function sucessoLogin(){
    alert("sucesso no login")
    let logar = document.querySelector(".login")
    logar.classList.add("invisivel")
    setInterval(solicitarMensagensServidor, 3000)
    setInterval(manterLogado, 5000)
}

function falhaLogin(){
    alert("O nome já está em uso, escolha outro nome!")
}

function manterLogado(){
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", nomeUsuario)
}



function solicitarMensagensServidor(){
    const atualizar = axios.get("servidor")
    atualizar.then(atualizarMensagens)
    atualizar.catch(falhaAtualizarMensagens)
}

function sucessoAtualizarMensagens(mensagens){

}

function falhaAtualizarMensagens(){

    let logar = document.querySelector(".login")
    logar.classList.remove("invisivel")
}



function painel(){
    let voltar = document.querySelector(".participantesAtivos")
    voltar.classList.toggle("invisivel")
}
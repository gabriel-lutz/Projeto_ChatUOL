let nomeUsuario;
let arrayDeMensagens = []

function logar(event){
    if(event.keyCode == 13 || event === 'clicado'){
    nomeUsuario = { name: document.querySelector(".nome-usuario").value }
    const solicitarLogin = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", nomeUsuario )
    solicitarLogin.then(sucessoLogin)
    solicitarLogin.catch(falhaLogin)
    }
}

function sucessoLogin(){
    solicitarMensagensServidor()
    let logar = document.querySelector(".login")
    logar.classList.toggle("invisivel")
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
    const atualizar = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages")
    atualizar.then(criarArrayDeMensagens)
    atualizar.catch(falhaSolicitarMensagens)
}

function criarArrayDeMensagens(mensagens){
    arrayDeMensagens = []
    for(let i = 0; i < mensagens.data.length; i++){
        if(mensagens.data[i].type === "status"){
            arrayDeMensagens.push(`
            <li class="status-recebido">
            <p class="mensagem"><span class="horario">(${mensagens.data[i].time})</span> <strong>${mensagens.data[i].from}</strong> ${mensagens.data[i].text}</p> 
            </li>
            `)
        }else if(mensagens.data[i].type === "message"){
            arrayDeMensagens.push(`
            <li class="mensagem-recebida">
            <p class="mensagem"><span class="horario">(${mensagens.data[i].time})</span> <strong>${mensagens.data[i].from}</strong> para <strong>${mensagens.data[i].to}</strong>: ${mensagens.data[i].text} </p> 
            </li>
            `)
        }else if(mensagens.data[i].type === "private_message" && (mensagens.data[i].to === nomeUsuario.name || mensagens.data[i].from === nomeUsuario.name)){
            arrayDeMensagens.push(`
            <li class="reservado-recebido">
            <p class="mensagem"><span class="horario">(${mensagens.data[i].time})</span><strong>${mensagens.data[i].from}</strong> reservadamente para <strong>${mensagens.data[i].to}</strong>: ${mensagens.data[i].text}</p> 
            </li>
            `)
        }
    }
    atualizarMensagensNaTela();
}

function falhaSolicitarMensagens(){
    let logar = document.querySelector(".login")
    logar.classList.remove("invisivel")
}

function atualizarMensagensNaTela(){
    let atualizar = document.querySelector(".chat")
    atualizar.innerHTML = ""
    for(let i = 0; i < arrayDeMensagens.length; i++){
        atualizar.innerHTML += arrayDeMensagens[i] 
    }
    const scrollUltimaMsg = document.querySelector(`li:nth-child(${arrayDeMensagens.length - 1})`);
    scrollUltimaMsg.scrollIntoView();
}

function painel(){
    let voltar = document.querySelector(".participantesAtivos")
    voltar.classList.toggle("invisivel")
}

function enviar(event){
    if(event.keyCode == 13 || event === 'clicado'){
        const mensagem = document.querySelector(".enviar-mensagem").value
        document.querySelector(".enviar-mensagem").value = null
        const pacote = {from: nomeUsuario.name, to: "Todos", text: mensagem, type:"message"}
        postarMensagem = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", pacote)
        postarMensagem.catch(falhouAoEnviarMsg)
    }
}

function falhouAoEnviarMsg(){
    window.location.reload(true)
    alert("Voce não está mais logado no servidor. Logue novamente.")
}
/* =========================================
   SIDEBAR CONTROLS
========================================= */

const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')
  closeAllSubMenus()
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }

  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}


/* =========================================
   THEME TOGGLE (DARK / LIGHT MODE)
========================================= */

const themeToggle = document.getElementById("theme-toggle")

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode")

  if(document.body.classList.contains("dark-mode")){
    themeToggle.textContent = "☀"
  }else{
    themeToggle.textContent = "🌙"
  }

})


/* =========================================
   EMAIL DATABASE
========================================= */

const inboxEmails = [

{
sender: "Yamamoto Naoki",
subject: "Inspeção Emergencial - Estação Seishin 7",
body: `
Amanhã teremos a visita do fiscal responsável pela auditoria das obras da Seishin 7.

Precisamos garantir que todos os pontos levantados estejam sob controle.

Preciso de um relatório detalhado até as 23:59.

_
Yamamoto Naoki
Gerência Operacional
`
},

...Array.from({length:10}, (_,i)=>({

sender:"BETIDLEJPN",
subject:`Payment reminder #${i+1}`,
body:`
Hello,

Our records show you still have an outstanding balance.

Balance due: ¥${(i+1)*5000}

BETIDLEJPN Billing Team
`

}))

]


const sentEmails = [

{
sender:"Você",
to:"Yamamoto Naoki",
subject:"Re: Confirmação da missão",
body:`Naoki-san,

Mensagem recebida.

Já estou a caminho do local e devo chegar em breve.

—`
},

{
sender:"Você",
to:"Yamamoto Naoki",
subject:"Relatório de inspeção e imagens do local",
body:`Naoki-san,

Estou enviando a documentação da inspeção realizada hoje.

Anexos:
- Fotos dos danos
- Relatório de risco estrutural

Recomenda-se uma inspeção mais detalhada.

—`,
attachments:[
{
name:"relatorio.pdf",
file:"src/relatorio.pdf",
download:false
},
{
name:"estrutura.png",
file:"src/estrutura.png",
download:false
},
{
name:"rachadura.png",
file:"src/rachadura.png",
download:false
},
{
name:"topografia.png",
file:"src/topografia.png",
download:false
},
{
name:"trilhos.png",
file:"src/trilhos.png",
download:false
}
]
}

]


const draftEmails = [

{
sender:"Você",
to:"dungeonmaster@dnd.com",
subject:"Se este email chegou até você...",
body:`Mestre,

Se esta mensagem chegou até você, algo provavelmente deu muito errado.

Existe uma grande chance de eu já estar morto.

Caso exista algum tipo de mecânica de reencarnação, eu realmente apreciaria alguns pontos extras em sorte.

—`
},

{
sender:"Você",
to:"SCARSHANTALLAS@dnd.com",
subject:"Arquivo de Lore",
body:`Documentação de lore anexada.

Arquivo:
lore-togashi.pdf
togashi-kia-ren.jpeg

Rascunho salvo para revisão posterior.
`,
attachments:[
{
name:"LORE-TOGASHI.pdf",
file:"src/LORE-TOGASHI.pdf",
download:true
},
{
name:"TOGASHI-KIA-REN.png",
file:"src/togashi-kia-ren.png",
download:true

}]
}

]


/* =========================================
   RENDER EMAIL LISTS
========================================= */

function renderEmailList(list, containerId){

const container = document.getElementById(containerId)

container.innerHTML=""

list.forEach((email)=>{

const item=document.createElement("div")

item.classList.add("email-item")

item.innerHTML=`
<div class="email-sender">${email.sender}</div>
<div class="email-subject">${email.subject}</div>
`

item.onclick=()=>openEmail(email)

container.appendChild(item)

})

}


/* =========================================
   EMAIL VIEW (OPEN MESSAGE)
========================================= */

function openEmail(email){

document.getElementById("email-title").innerText = email.subject

document.getElementById("email-from").innerText =
email.sender + (email.to ? " → " + email.to : "")

document.getElementById("email-body").innerText = email.body

const attachmentContainer = document.getElementById("email-attachments")

attachmentContainer.innerHTML = renderAttachments(email)

hideAllViews()

document.getElementById("email-view").classList.remove("hidden")

}

function renderAttachments(email){

if(!email.attachments) return ""

let html = `<div class="attachments">`

email.attachments.forEach(file =>{

if(file.download){

html += `
<a class="attachment" href="${file.file}" download="${file.name}">
📎 ${file.name}
</a>
`

}else{

html += `
<a class="attachment" href="${file.file}" target="_blank">
📎 ${file.name}
</a>
`

}

})

html += `</div>`

return html

}


/* =========================================
   VIEW NAVIGATION (INBOX / SENT / DRAFT)
========================================= */

function hideAllViews(){

document.getElementById("inbox-view").classList.add("hidden")
document.getElementById("sent-view").classList.add("hidden")
document.getElementById("draft-view").classList.add("hidden")
document.getElementById("email-view").classList.add("hidden")

}


function showInbox(el){

hideAllViews()

document.getElementById("inbox-view").classList.remove("hidden")

setActiveMenu(el)

}


function showSent(el){

hideAllViews()

document.getElementById("sent-view").classList.remove("hidden")

setActiveMenu(el)

}


function showDraft(el){

hideAllViews()

document.getElementById("draft-view").classList.remove("hidden")

setActiveMenu(el)

}


/* =========================================
   INBOX EMAIL COUNTER
========================================= */

function updateInboxCount(){

const countElement = document.getElementById("inbox-count")

if(countElement){
countElement.innerText = inboxEmails.length
}

}

/* =========================================
  SIDEBAR ACTIVE STATE
========================================= */

function setActiveMenu(clickedElement){

  document.querySelectorAll("#sidebar li").forEach(li=>{
    li.classList.remove("active")
  })

  const parentLi = clickedElement.closest("li")

  if(parentLi){
    parentLi.classList.add("active")
  }

}

document.addEventListener("DOMContentLoaded", () => {

  showInbox(document.querySelector("#sidebar li a"))

})


/* =========================================
  INITIALIZE APPLICATION
========================================= */

renderEmailList(inboxEmails,"inbox-list")
renderEmailList(sentEmails,"sent-list")
renderEmailList(draftEmails,"draft-list")

updateInboxCount()




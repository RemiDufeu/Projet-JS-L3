window.addEventListener("DOMContentLoaded", () => {

const pagesData = [
    {path : "/projet/index.html", nom : "Accueil"},
    {path : "/projet/neufLettres.html", nom : "Neuf lettres"},
    {path : "/projet/demineur.html", nom : "Démineur"},
    {path : "/projet/recompenses.html", nom : "Récompenses"}
]

//selection de la div topbar et ajout de la classe CSS
let topbarContainer = document.querySelector("#topbar");
topbarContainer.classList.add("topbarContainer");

//generation de la div contenant le logo
let logoContainer = document.createElement("div");
logoContainer.id = "logo";
logoContainer.innerHTML = "JEUJEU";

// génération des liens de la topbar
let ulLiens = document.createElement("ul");

pagesData.forEach((page) => {
    let liPage = document.createElement("li");

    let aPage = document.createElement("a");
    aPage.innerHTML = page.nom;
    aPage.href = page.path;

    liPage.appendChild(aPage);
    ulLiens.appendChild(liPage);

    //charger le style pour la page active
    let url = window.location.pathname;
    if(url == page.path) {
        liPage.id = "active"
    }
})

topbarContainer.appendChild(logoContainer);
topbarContainer.appendChild(ulLiens);

})

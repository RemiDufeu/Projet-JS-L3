window.addEventListener("DOMContentLoaded", () => {

const scores = [{
    nom : "Alex",
    temp : "2 : 30"
},{
    nom : "Remi",
    temp : "3 : 30"
},{
    nom : "Alien",
    temp : "3 : 30"
},{
    nom : "PAT",
    temp : "3 : 30"
},]

const dernierScoreData = {
    nom : "Pierre",
    temp : "5 : 30"
}


let scoresContainer = document.querySelector("#score")

scores.forEach((score) => {
    let divScore = document.createElement("div")
    divScore.classList.add("scoreCase")
    
    let divNom = document.createElement("div")
    divNom.innerHTML = score.nom

    let divTemp = document.createElement("div")
    divTemp.innerHTML = score.temp

    divScore.appendChild(divNom)
    divScore.appendChild(divTemp)
    scoresContainer.appendChild(divScore)

})

let hr = document.createElement("hr")

scoresContainer.appendChild(hr)

let dernierScore = document.createElement("div")
let spanDernierScore = document.createElement("span")
spanDernierScore.innerHTML = "Dernier score"

dernierScore.appendChild(spanDernierScore)
scoresContainer.appendChild(dernierScore)

let divDernierScore = document.createElement("div")
divDernierScore.classList.add("scoreCase")

let divNom = document.createElement("div")
divNom.innerHTML = dernierScoreData.nom

let divTemp = document.createElement("div")
divTemp.innerHTML = dernierScoreData.temp

scoresContainer.appendChild(divDernierScore)
divDernierScore.appendChild(divNom)
divDernierScore.appendChild(divTemp)


})
class Solution {

    constructor (grilleAbs) {
        this.ulListeMots = document.querySelector("#solution").querySelector("ul")
        this.grilleAbs = grilleAbs

        this.construireSolution()

        this.btnSolution = document.querySelector("#btnSolution")
        this.btnSolution.addEventListener("click", (e) => {
            this.donnerUneSolution()
        })

    }

    supprimerSolution() {
        this.ulListeMots.innerHTML = ''
    }

    construireSolution() {
        for (let i = 0; i<8; i++) {
            let liMot = document.createElement("li")
            this.ulListeMots.appendChild(liMot)
        }
    }

    miseAZeroSolution () {
        this.supprimerSolution()
        this.construireSolution()
    }

    devoilerMotTrouve(){
        let liListe = this.ulListeMots.children
        for (let mot of this.grilleAbs.mots) {
            if (mot.etat === Mot.TROUVE) {
                liListe[this.grilleAbs.mots.indexOf(mot)].style.textDecoration = "line-through"
                liListe[this.grilleAbs.mots.indexOf(mot)].innerText = mot.Mot
            }
        }
    }

    donnerUneSolution(){
        let liListe = this.ulListeMots.children
        let i = 0
        for (let mot of liListe) {
            if (mot.innerText === ""){
                mot.style.textDecoration = 'none'
                mot.innerText = this.grilleAbs.mots[i].Mot
                break
            }
            i++
        }
    }

    activerBouton() {
        this.btnSolution.disabled = false
    }

}
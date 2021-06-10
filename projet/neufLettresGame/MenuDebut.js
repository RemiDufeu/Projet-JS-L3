class MenuDebut {

    /**
     * 
     * @param {GrilleAbs} grilleJeu le jeu qui sera a lancer
     */
    constructor (grilleAbs) {
        this.grilleAbs = grilleAbs
        this.divCible = document.querySelector('#grille')
        this.menuContainer
    }

    construireMenu() {
        this.menuContainer = document.createElement("div")
        this.menuContainer.classList.add("menuDebut")
        let input = document.createElement("input")
        this.divCible.appendChild(this.menuContainer)

        let btnFacile = document.createElement("button")
        btnFacile.innerText = "Facile"
        btnFacile.addEventListener("click", (e) => {
            this.grilleAbs.setDifficulte("Facile")
            this.grilleAbs.demarrerJeu(input.value)
            this.detruireMenu()
        })

        let btnDifficile = document.createElement("button")
        btnDifficile.innerText = "Difficile"
        btnDifficile.addEventListener("click", (e) => {
            this.grilleAbs.setDifficulte("Difficile")
            this.grilleAbs.demarrerJeu(input.value)
            this.detruireMenu()
        })
        let divInput = document.createElement("div")

        let text = document.createElement("p")
        text.innerText = "Pseudonyme"

        input.addEventListener("input", (e) => {
            btnFacile.disabled = input.value ? false : true
            btnDifficile.disabled = input.value ? false : true
        })

        divInput.appendChild(text)
        divInput.appendChild(input)

        this.menuContainer.appendChild(btnFacile)
        this.menuContainer.appendChild(btnDifficile)
        this.menuContainer.appendChild(divInput)

        btnFacile.disabled = true
        btnDifficile.disabled = true
    }

    detruireMenu() {
        this.menuContainer.remove()
    }
}
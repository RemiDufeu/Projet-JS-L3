class MenuFin {

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

        this.divCible.appendChild(this.menuContainer)

        let btnRecommencer = document.createElement("button")
        btnRecommencer.innerText = "Recommencer"
        btnRecommencer.addEventListener("click", (e) => {
            this.grilleAbs.demarrerJeu()
            this.detruireMenu()
        })

        this.menuContainer.appendChild(btnRecommencer)

        let btnMenuDebut = document.createElement("button")
        btnMenuDebut.innerText = "Menu principal"
        btnMenuDebut.addEventListener("click", (e) => {
            this.grilleAbs.menuDebut.construireMenu()
            this.detruireMenu()
        })

        this.menuContainer.appendChild(btnMenuDebut)
    }

    detruireMenu() {
        this.menuContainer.remove()
    }
}
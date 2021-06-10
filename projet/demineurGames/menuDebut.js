class MenuDebut {


    constructor (chronometre) {
        this.divCible = document.querySelector('#grilleDemineur')
        this.menuContainer
        this.chronometre=chronometre
    }
  
    construireMenu() {
        this.menuContainer = document.createElement("div")
        this.menuContainer.classList.add("menuDebut")
  
        this.divCible.appendChild(this.menuContainer)
  
  
        let jeu = document.createElement("button")
        jeu.innerText = "Jouer"
        jeu.addEventListener("click", (e) => {
            this.chronometre.setNom(input.value);
            this.detruireMenu();
            etatJeu="menuPrincipal"
        })
        let divInput = document.createElement("div")
  
        let text = document.createElement("p")
        text.innerText = "Pseudonyme"
  
        let input = document.createElement("input")
        input.addEventListener("input", (e) => {
            jeu.disabled = input.value ? false : true
        })
  
        divInput.appendChild(text)
        divInput.appendChild(input)
  
        
        this.menuContainer.appendChild(jeu)
        this.menuContainer.appendChild(divInput)
  
        
        jeu.disabled = true
    }
  
    detruireMenu() {
        this.menuContainer.remove()
    }
  }
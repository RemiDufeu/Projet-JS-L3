class Score {


    
    constructor (jeu) {
        this.jeu = jeu
        this.getDonnees()
        this.scoresContainer = document.querySelector("#score")
    }

    getDonnees () {
        this.scores = JSON.parse(localStorage.getItem(this.jeu))
        this.scores && this.scores.sort(function(a,b) {return a.temp - b.temp})
        localStorage.getItem(`${this.jeu}Last`) === null ? this.dernierScoreData = { nom : "--", temp : "-- : --" } : this.dernierScoreData = JSON.parse(localStorage.getItem(`${this.jeu}Last`))
    }

    construireTableau() {
        this.getDonnees()

        for (let i = 0; i < 5; i++) {
            let divScore = document.createElement("div")
            divScore.classList.add("scoreCase")
            
            let divNom = document.createElement("div")
            this.scores == null || this.scores[i] === undefined ? divNom.innerHTML = "--" : divNom.innerHTML = this.scores[i].nom

            let divTemp = document.createElement("div")
            this.scores == null || this.scores[i] === undefined ? divTemp.innerHTML = "-- : --" : divTemp.innerHTML = this.scores[i].temp

            divScore.appendChild(divNom)
            divScore.appendChild(divTemp)
            this.scoresContainer.appendChild(divScore)
        }

        let hr = document.createElement("hr")

        this.scoresContainer.appendChild(hr)

        let dernierScore = document.createElement("div")
        let spanDernierScore = document.createElement("span")
        spanDernierScore.innerHTML = "Dernier score"

        dernierScore.appendChild(spanDernierScore)
        this.scoresContainer.appendChild(dernierScore)

        let divDernierScore = document.createElement("div")
        divDernierScore.classList.add("scoreCase")

        let divNom = document.createElement("div")
        divNom.innerHTML = this.dernierScoreData.nom

        let divTemp = document.createElement("div")
        divTemp.innerHTML = this.dernierScoreData.temp

        this.scoresContainer.appendChild(divDernierScore)
        divDernierScore.appendChild(divNom)
        divDernierScore.appendChild(divTemp)
    }

    detruireTableau () {
        this.scoresContainer.innerHTML = ''
    }

    miseAJourTableau () {
        this.detruireTableau()
        this.construireTableau()
    }

}

    

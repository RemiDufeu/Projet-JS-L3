class Compteur{
    
    static neufLettres = "neufLettres"
    static demineur = "demineur"

    constructor(nom){
        this.monChronometre;
        this.compteur = 0;
        this.nom
    }

    init () {
        this.compteur = 0
        this.monChronometre = window.setInterval(()=> {
            this.compteur ++;
            document.querySelector("#temps").innerHTML="Temps : "+this.getCompteur();
        },1000);
    }

    stop () {
        window.clearInterval(this.monChronometre)
    }

    mettreAZero(){
        this.compteur = 0;
        document.querySelector("#temps").innerHTML="Temps : "+this.getCompteur();
    }

    getCompteur() {
        return this.compteur;
    }

    miseAJourScore(jeu) {
        let scoresNeufLettres = []
        localStorage.getItem(jeu) === null ? scoresNeufLettres = [] : scoresNeufLettres = JSON.parse(localStorage.getItem(jeu))
        scoresNeufLettres.push({nom : this.nom , temp : this.compteur })
        localStorage.setItem(jeu, JSON.stringify(scoresNeufLettres))
        localStorage.setItem(`${jeu}Last`, JSON.stringify({nom : this.nom, temp : this.compteur }))
    }
    
    setNom(nom) {
        this.nom = nom
    }
}
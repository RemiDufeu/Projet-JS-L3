class Lettre {

    static SELECTIONNEE = "selectionnée"
    static DESELECTIONNEE = "normal"
    static TROUVE = "trouvée"
    static ANIMATION_TROUVE = "effectue l'animation quand trouvée"

    constructor (lettre, estPremier) {
        this.estPremier = estPremier
        this.lettre = lettre;
        this.etat = Lettre.DESELECTIONNEE
        this.taillePolice = 20
        this.inclinaison = 0
    }

    toString () {
        return this.lettre.toString()
    }

    selection () {
        if (this.etat === Lettre.DESELECTIONNEE) {
            this.etat = Lettre.SELECTIONNEE
        }
    }

    deselection () {
        this.etat = Lettre.DESELECTIONNEE
    }

    setTrouve () {
        this.etat = Lettre.TROUVE
    }

    setAnimationTrouve() {
        this.etat = Lettre.ANIMATION_TROUVE
    }

}
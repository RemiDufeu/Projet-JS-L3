
class Mot {

    static TROUVE = "trouve"
    static NORMAL = "normal"

    constructor (mot9Lettres) {
        this.lettres = []
        this.Mot = ""
        this.etat = Mot.NORMAL
        
        if (mot9Lettres.length === 9) {
            this.Mot = mot9Lettres
        }else {
            this.Mot = "FORMATION" // mot par defaut si le mot ne fait pas 9 lettres
        }

        this.generationPositionsAleatoire()
    }

    setTrouve () {
        this.etat = Mot.TROUVE
        this.lettres.forEach(lettre => {
            lettre.setAnimationTrouve()
        })
    }

    deselectionLettres() {
        this.lettres.forEach(lettre => {
            lettre.deselection()
        })
    }

    generationPositionsAleatoire() {
        let emplacementOk = true

        while (emplacementOk) {
            this.lettres = []
            let lettresArray = this.Mot.split('')
            let indiceCourant = Math.floor(Math.random() * 9);
            let first = true
            lettresArray.forEach((lettre) => {
                this.lettres[indiceCourant] = new Lettre (lettre, first )
                first = false
                switch (indiceCourant) {
                    case 0 :
                        indiceCourant = this.choixAleatoirePosition([1, 3])
                    break
                    case 1 :
                        indiceCourant = this.choixAleatoirePosition([0, 2, 4])
                    break
                    case 2 :
                        indiceCourant = this.choixAleatoirePosition([1, 5])
                    break
                    case 3 :
                        indiceCourant = this.choixAleatoirePosition([0, 4, 6])
                    break
                    case 4 :
                        indiceCourant = this.choixAleatoirePosition([1, 5, 7, 3])
                    break
                    case 5 :
                        indiceCourant = this.choixAleatoirePosition([2, 4, 8])
                    break
                    case 6 :
                        indiceCourant = this.choixAleatoirePosition([3, 7])
                    break
                    case 7 :
                        indiceCourant = this.choixAleatoirePosition([4, 6, 8])
                    break
                    default :
                        indiceCourant = this.choixAleatoirePosition([7, 5])
                    break
                }
            });

            let nonVide = this.lettres.filter(function (el) {
                return el != null;
              });
            nonVide.length === 9 ? emplacementOk = false : emplacementOk = true;
        }
    }

    /**
     * @param {int []} listePositions 
     * @returns {int}
     */

    choixAleatoirePosition (listePositions) {
        let alea = Math.floor(Math.random() * (listePositions.length))
        let positionOK
        this.lettres[listePositions[alea]] == null ? positionOK = true : positionOK = false
        let i = 0
        
        while (positionOK === false ) {
            if (this.lettres[listePositions[i]] == null) {
                alea = i
                positionOK = true
            }
            if (i >=listePositions.length -1) {
                positionOK = true
            }
            i++
        } 

        return listePositions[alea]
    }

    updateTailleLettres() {
        this.lettres.forEach(lettre => {
            if (lettre.etat === Lettre.SELECTIONNEE) {
                if(lettre.taillePolice <= 45 ) {
                    lettre.taillePolice += 0.5
                } 
            } else {
                if(lettre.taillePolice > 20 ) {
                    lettre.taillePolice -= 0.5
                } 
            }
        })
    }

    updateInclinaisonLettres() {
        this.lettres.forEach(lettre => {
            if(lettre.etat === Lettre.ANIMATION_TROUVE) {
                if (lettre.inclinaison < 180*2) {
                    lettre.inclinaison += 6
                } else {
                    lettre.etat = Lettre.TROUVE
                    lettre.inclinaison = 0
                }
            } 
        })
    }
}
class GrilleAbs {
    
    static EN_JEU = "dans une partie"
    static VICTOIRE = "le joueur a trouvé tout les mots"
    static MENU = "dans le menu"

    constructor (compteur, scoreTableau, assets) {
        this.mots = []
        this.ctrl
        this.selectionLettres = ""
        this.motSelection
        this.etat = GrilleAbs.MENU
        this.derniereLettreSelectionnée
        this.compteur = compteur
        this.menuFin
        this.menuDebut
        this.listeMots
        this.scoreTableau = scoreTableau
        this.difficulte
        this.solution
        this.assets = assets
        this.derniereTailleSelection = 0
    }

    /**
     * @param {string[]} mots9Lettres 8 mots de 9 lettres
     */
    setMots () {
        let copieDico = dictionnaire
        this.mots = []
        for (let i = 0; i < 8 ; i++) {
            let max = copieDico.length
            let randomI = Math.floor(Math.random() * max)
            let motCourant = new Mot (copieDico[randomI])
            copieDico.splice(randomI,1)
            this.mots.push(motCourant)
        }
    }

    demarrerJeu(pseudo) {
        this.setMots()
        this.listeMots.activerBouton()
        this.compteur.init()
        pseudo && this.compteur.setNom(pseudo)
        this.etat = GrilleAbs.EN_JEU
        this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.PUSH_MOTS, {mots : this.mots, difficulte : this.difficulte } )
        this.solution.miseAZeroSolution()
    }

    setCtrl (ctrl) {
        this.ctrl = ctrl;
    }

    /**
     * @todo il faut obtenir la lettre correspondant a la position envoyé
     * @param {Coordonnees} coordonnees Les coordonnees envoyés par la pres
     */
    getLettreDepuisCoordonnees (coordonnees) {
        let MotNouvelleSelection = this.MotNouvelleSelection(coordonnees)
        if (MotNouvelleSelection !== null) {
            if (MotNouvelleSelection.etat != Mot.TROUVE) {
                if (MotNouvelleSelection != this.motSelection) {
                    this.motSelection = MotNouvelleSelection
                    this.selectionLettres = ""
                    this.deselectionnerAll()
                }
                this.selectionLettre(coordonnees)
            } else {
                this.deselectionnerAll()
            }  
        }  else {
            this.deselectionnerAll()
        }
    }

    selectionLettre (coordonnees) {
         switch (this.mots.indexOf(this.motSelection)) {
            case 0 :
                 this.setLettreSelectionDepuisClick(coordonnees, new Coordonnees (0,0))
                 break
            case 1 :
                this.setLettreSelectionDepuisClick(coordonnees, new Coordonnees (500/3,0))
                break
            case 2 :
                this.setLettreSelectionDepuisClick(coordonnees, new Coordonnees (500/3 *2,0))
                break
            case 3 :
                this.setLettreSelectionDepuisClick(coordonnees, new Coordonnees (0,500/3))
                break
            case 4 :
                this.setLettreSelectionDepuisClick(coordonnees, new Coordonnees (500/3 *2,500/3))
                break
            case 5 : 
                this.setLettreSelectionDepuisClick(coordonnees, new Coordonnees (0,500/3 *2))
                break
            case 6 :
                this.setLettreSelectionDepuisClick(coordonnees, new Coordonnees (500/3,500/3 *2))
                break
            case 7 : 
                this.setLettreSelectionDepuisClick(coordonnees, new Coordonnees (500/3 *2,500/3 *2))
                break
            default :
                this.selectionLettres = null
         }
    }

    selectionnerLettre (index) {
        let lettre = this.mots[this.mots.indexOf(this.motSelection)].lettres[index]
        if(lettre.etat != Lettre.SELECTIONNEE) {
            lettre.selection()
            this.derniereLettreSelectionnée = lettre
            this.selectionLettres === undefined ? this.selectionLettres = lettre.lettre : this.selectionLettres += lettre.lettre
        } else if (lettre !== this.derniereLettreSelectionnée) {
            this.deselectionnerAll()
        }
    }

    setLettreSelectionDepuisClick(coordonneesDuClick , coordonneesDuMot) {
        let coordonneesDansLaZone = new Coordonnees (coordonneesDuClick.getX() - coordonneesDuMot.getX() ,coordonneesDuClick.getY() - coordonneesDuMot.getY())
        switch (Math.floor(coordonneesDansLaZone.getY() / 500*9)) {
            case 0 :
                switch (Math.floor(coordonneesDansLaZone.getX() / 500*9)) {
                    case 0 :
                        this.selectionnerLettre(0)
                    break
                    case 1: 
                        this.selectionnerLettre(1)
                    break
                    case 2 :
                        this.selectionnerLettre(2)
                    break
                }
            break
            case 1 :
                switch (Math.floor(coordonneesDansLaZone.getX() / 500*9)) {
                    case 0 :
                        this.selectionnerLettre(3)
                    break
                    case 1: 
                        this.selectionnerLettre(4)
                    break
                    case 2 :
                        this.selectionnerLettre(5)
                    break
                }
            break
            case 2 : 
                switch (Math.floor(coordonneesDansLaZone.getX() / 500*9)) {
                    case 0 :
                        this.selectionnerLettre(6)
                    break
                    case 1: 
                        this.selectionnerLettre(7)
                    break
                    case 2 :
                        this.selectionnerLettre(8)
                    break
                }
            break
        }
    }

    /**
     * 
     * @param {Coordonnees} coordonnees position du click
     * fonction pour obtenir le mot concerne par la position de la souris
     */
    MotNouvelleSelection (coordonnees) {
        let motSelection
        switch (Math.floor(coordonnees.getY() / 500 *3)) {
            case 0 :
                switch (Math.floor(coordonnees.getX() / 500 *3)) {
                    case 0 :
                        motSelection = this.mots[0]
                    break
                    case 1: 
                        motSelection = this.mots[1]
                    break
                    case 2 :
                        motSelection = this.mots[2]
                    break
                }
            break
            case 1 :
                switch (Math.floor(coordonnees.getX() / 500 *3)) {
                    case 0 :
                        motSelection = this.mots[3]
                    break
                    case 1: 
                        motSelection = null
                    break
                    case 2 :
                        motSelection = this.mots[4]
                    break
                }
            break
            case 2 : 
                switch (Math.floor(coordonnees.getX() / 500 *3)) {
                    case 0 :
                        motSelection =this.mots[5]
                    break
                    case 1: 
                        motSelection = this.mots[6]
                    break
                    case 2 :
                        motSelection = this.mots[7]
                    break
            }
            break
        }
        return motSelection
    }

    reçoitMessage(message, pieceJointe) {
        if (message === MESSAGE.SOURIS_SELECTION) {
            this.getLettreDepuisCoordonnees(pieceJointe)
        } else if (message === MESSAGE.SOURIS_RELACHE) {
            this.deselectionnerAll()
        }
    }

    chargerAssets(assetsLoaded){
    
        if(assetsLoaded){
     
         this.assets = assetsLoaded;
         
        }
    }

    deselectionnerAll () {
        this.derniereTailleSelection = 0
        this.mots.forEach (mot => {
            if (mot.etat != Mot.TROUVE) {
                mot.deselectionLettres()
            }
        })
        this.selectionLettres = ""
    }

    miseAJourTailleLettres() {
        this.mots.forEach (mot => {
            mot.updateTailleLettres()
        })
    }

    miseAJourInclinaisonLettres() {
        this.mots.forEach (mot => {
            if (mot.etat === Mot.TROUVE) {
                mot.updateInclinaisonLettres()
            }
        })
    }

    miseAJourDonneesJeu() {

        if (this.selectionLettres.length > this.derniereTailleSelection) {
            this.derniereTailleSelection ++
            this.assets.pop.play()
        }

        if(this.selectionLettres.length === 9) {
            if (this.selectionLettres === this.motSelection.Mot && this.motSelection.etat === Mot.NORMAL) {
                this.derniereTailleSelection = 0
                this.motSelection.setTrouve()
                this.listeMots.devoilerMotTrouve()
                this.assets.bell.play()
            }
        }
        
        if(this.detectionVictoire()) {
            this.setVictoire()
        }

        this.miseAJourTailleLettres()
        this.miseAJourInclinaisonLettres()
    }
    
    detectionVictoire () {
        let victoire = true
        this.mots.forEach(mot => {
            if (mot.etat !== Mot.TROUVE) {
                victoire = false
            }
        })
        return victoire
    }

    setCompteur(compteur) {
        this.compteur = compteur
    }

    setVictoire () {
        this.etat = GrilleAbs.VICTOIRE
        this.menuFin.construireMenu()
        this.compteur.stop()
        this.compteur.miseAJourScore(Compteur.neufLettres)
        this.scoreTableau.miseAJourTableau()
    }

    setMenuFin (menuFin) {
        this.menuFin = menuFin
    }

    setMenuDebut (menuDebut) {
        this.menuDebut = menuDebut
    }

    setListeMots(solution) {
        this.listeMots = solution
    }

    setDifficulte(difficulte) {
        this.difficulte = difficulte
    }

    setSolution(solution) {
        this.solution = solution
    }
}
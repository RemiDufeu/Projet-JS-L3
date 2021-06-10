class GrillePres {

    constructor () {
        this.ctrl
        this.canvasMots = document.querySelector("#myCanvasMots")
        this.canvasDessin = document.querySelector("#myCanvasDessin")
        this.taille = 500
    }

    setCtrl (ctrl) {
        this.ctrl = ctrl;
    }

    dessinerLesMots (mots) {
        let ctx = this.canvasMots.getContext("2d")
        ctx.font = 'bold 20px Verdana, Arial, serif'
        let x = 20, y= 35 // coordonnées en haut a gauche du mot (une division de 9 cases)

        mots.forEach(mot => {
            this.dessinerUnMot(mot, x, y, ctx)
            if (x >= this.taille * 2/3) {
                x = 20
                y += this.taille /3
            } else {
                if ( (x ===  20) && (y=== ((this.taille /3) + 35) )) { //pour creer le carrée au milieu
                   x += this.taille * 2/3
                } else {
                    x += this.taille /3
                }
            }
        });
    }
    
    dessinerUnMot (mot, xDepart, yDepart , ctx ) {
        let x = xDepart
        let y = yDepart
        mot.lettres.forEach(lettre => {
            if ( lettre.etat === Lettre.ANIMATION_TROUVE || lettre.etat === Lettre.TROUVE) {
                ctx.fillStyle = "grey"
            } else if (lettre.etat === Lettre.SELECTIONNEE) {
                ctx.fillStyle = "rgb(235, 180, 80)"
            } else if ( lettre.estPremier === true && this.difficulte === "Facile") {
                ctx.fillStyle = "gold"
            } else{
                ctx.fillStyle = "black"
            }
            ctx.font = `bold ${lettre.taillePolice}px Verdana, Arial, serif`
            
            ctx.save()

            ctx.translate(x -lettre.taillePolice /2.5 + 10, y, y +lettre.taillePolice /2.5 -10);
            if (lettre.etat === Lettre.TROUVE) {
                ctx.fillRect(-2.5, -8, 22 , 2)
            }
            
            ctx.rotate(lettre.inclinaison * Math.PI / 180)
            ctx.fillText(lettre.toString(), 0 , 0)
            ctx.restore()

            x += this.taille * 1/9
            if (x >= xDepart + this.taille * 3/9) {
                x = xDepart
                y += this.taille * 1/9
            }
        })
        
    }

    dessinerQuadrillage () {
        let ctx = this.canvasMots.getContext("2d")
        ctx.fillStyle = "black"
        ctx.fillRect(this.taille/3,this.taille/3, this.taille/3, this.taille/3 )
        
        
        //dessin des quadrillage entre les mots
        for (let i = 1; i<3; i++) {
            ctx.fillRect((this.taille/3) * i%3,this.taille/3 * i, this.taille, 3 )
            ctx.fillRect(this.taille/3 * i,(this.taille/3) * i%3, 3, this.taille )
        }

        //dessin des quadrillage entre les lettres
        for (let i = 1; i<9; i++) {
            ctx.fillRect((this.taille/9) * i%9,this.taille/9 * i, this.taille, 0.5 )
            ctx.fillRect(this.taille/9 * i,(this.taille/9) * i%9, 0.5, this.taille )
        }
    }

    demarrerJeu () {
        // pour faire en sorte que le mot ne s'ecrive que quand la souris bouge et que quand le click est appuyé
        this.canvasDessin.addEventListener('mousedown', e => {
            this.canvasDessin.onmousemove = this.traitementDuClick
            this.commencerTraits(e)
        })

        this.canvasDessin.addEventListener('mouseup', e => {
            this.canvasDessin.onmousemove = null
            this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.SOURIS_RELACHE, null)
            this.effacerCanvasDessin()
        })

        this.canvasDessin.addEventListener('mouseleave', e => {
            this.canvasDessin.onmousemove = null
            this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.SOURIS_RELACHE, null)
            this.effacerCanvasDessin()
        })
        
    }

    traitementDuClick = (e) => {
        let mousePos = this.getMousePos(e)
        this.dessinerTraits(e)
        this.envoyerCoordonnees(mousePos)
    }

    commencerTraits(e) {
        let ctx = this.canvasDessin.getContext("2d")
        ctx.lineWidth="3"
        ctx.strokeStyle="red"
        ctx.moveTo(e.offsetX, e.offsetY)
        ctx.beginPath()
    }

    dessinerTraits(e) {
        let ctx = this.canvasDessin.getContext("2d")
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
    }

    getMousePos(evt) {
        var rect = this.canvasMots.getBoundingClientRect();
        return new Coordonnees (evt.clientX - rect.left, evt.clientY - rect.top)
    }


    /**
     * @param {Coordonnees} coordonnees la position X et Y de la souris sur le canvas
     */
    envoyerCoordonnees(coordonnees) {
        this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.SOURIS_SELECTION, coordonnees)
    }

    reçoitMessage(message, pieceJointe) {
        if (message === MESSAGE.PUSH_MOTS) {
            this.dessinerLesMots(pieceJointe.mots)
            this.difficulte = pieceJointe.difficulte
            this.dessinerQuadrillage()
            this.demarrerJeu()
        } else if (message === MESSAGE.REFRESH_RENDU) {
            this.effacerCanvasMots()
            this.dessinerLesMots(pieceJointe)
            this.dessinerQuadrillage()
        } else if (message === MESSAGE.VICTOIRE) {
            this.effacerCanvasMots()
        }
    }
    
    effacerCanvasMots () {
        this.canvasMots.getContext("2d").clearRect(0,0, this.canvasMots.width, this.canvasMots.height)
    }

    effacerCanvasDessin () {
       this.canvasDessin.getContext("2d").closePath()
       this.canvasDessin.getContext("2d").clearRect(0,0, this.canvasDessin.width, this.canvasDessin.height)
    }

}
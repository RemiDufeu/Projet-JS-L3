class GrilleCtrl {

    constructor (abs, pres) {
        this.abs = abs
        this.abs.setCtrl(this)
        this.pres = pres
        this.pres.setCtrl(this)
    }
    
    reçoitMessageDeLAbstraction (message, pieceJointe) {
        if (message === MESSAGE.PUSH_MOTS) {
            this.pres.reçoitMessage(MESSAGE.PUSH_MOTS, pieceJointe)
        } else if (message === MESSAGE.REFRESH_RENDU) {
            this.pres.reçoitMessage(MESSAGE.REFRESH_RENDU, pieceJointe)
        } else if (message === MESSAGE.VICTOIRE) {
            this.pres.reçoitMessage(MESSAGE.VICTOIRE, pieceJointe)
        }
    }

    reçoitMessageDeLaPresentation (message, pieceJointe) {
        if (message === MESSAGE.SOURIS_SELECTION) {
            this.abs.reçoitMessage(MESSAGE.SOURIS_SELECTION, pieceJointe)
        } else if (message === MESSAGE.SOURIS_RELACHE) {
            this.abs.reçoitMessage(MESSAGE.SOURIS_RELACHE, pieceJointe)
        } 

    }
}
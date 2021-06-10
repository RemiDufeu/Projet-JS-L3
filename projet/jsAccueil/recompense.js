function changeTrophe() {
    
    let score=new Score(Compteur.demineur);
    let scoreNeufsLettres = new Score(Compteur.neufLettres);
    if(score.scores !=undefined){
        if(score.scores[0].temp<300){
            document.getElementById("trophe1").src = "../../ressources/images/fontdetrophé.jpg"
        }
        if(score.scores[0].temp<240){
            document.getElementById("trophe2").src = "../../ressources/images/fontdetrophé.jpg"
        }
        if(score.scores[0].temp<180){
            document.getElementById("trophe3").src = "../../ressources/images/fontdetrophé.jpg"
        }
        if(score.scores[0].temp<90){
           document.getElementById("trophe4").src = "../../ressources/images/fontdetrophé.jpg"
        }
    }

    if(scoreNeufsLettres.scores !=undefined){
        if(scoreNeufsLettres.scores[0].temp<120){
            document.getElementById("trophe19l").src = "../../ressources/images/fontdetrophé.jpg"
        }
        if(scoreNeufsLettres.scores[0].temp<60){
            document.getElementById("trophe29l").src = "../../ressources/images/fontdetrophé.jpg"
        }
        if(scoreNeufsLettres.scores[0].temp<30){
            document.getElementById("trophe39l").src = "../../ressources/images/fontdetrophé.jpg"
        }
        
    }

}
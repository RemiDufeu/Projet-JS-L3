function traiteMouseDown(event){

    getMousePos(event);
    
    
     
    
    
    if(etatJeu == "debutant" || etatJeu == "intermediaire" || etatJeu == "expert"){
      
      
      
      caseClique = grille.getCase(mousePos.x, mousePos.y);
    if(event.button==0 &&  caseClique.image!=caseClique.drapeau && caseClique.clique==null){
      caseClique.image=caseClique.imageCache;
      grille.detectionDesCasesVide(mousePos.x, mousePos.y);
      caseClique.clique="clique";
      if(caseClique.type=="bombe"){
        assets.sonBombe.play();
        etatJeu = "perdu";
      }

      else if(grille.PartieFinie()=="finie"){
        assets.sonGuitare.play(); 
      etatJeu = "finie";
      if(jeuEnCour=="expert"){
      compteur.miseAJourScore(Compteur.demineur)
    }
      }
    }
    else if(event.button==2 && caseClique.image!=caseClique.drapeau &&  caseClique.clique==null){
      caseClique.image=caseClique.drapeau;
      caseClique.clique="clique";
    }
    else if(event.button==2 && caseClique.image==caseClique.drapeau){
      caseClique.image=caseClique.imageCase;
      caseClique.clique=null;
    }
  }
  else{
    switch(etatJeu) {
      case "menuPrincipal":
        if(mousePos.x > 125 && mousePos.x < 375 && mousePos.y > 200 && mousePos.y < 250){
          etatJeu = "debutant";
          jeuEnCour = "debutant"
          if(assets) startGame();
          else loadAssets(startGame);
        }
        else if(mousePos.x > 125 && mousePos.x < 375 && mousePos.y > 300 && mousePos.y < 350){
          etatJeu = "intermediaire";
          jeuEnCour = "intermediaire"
          startGame();
        }
        else if(mousePos.x > 125 && mousePos.x < 375 && mousePos.y > 400 && mousePos.y < 450){
          etatJeu = "expert";
          jeuEnCour = "expert"
          startGame();
        }
        break;
        case "perdu":
          if(mousePos.x > 125 && mousePos.x < 375 && mousePos.y > 200 && mousePos.y < 250){
            
            etatJeu = jeuEnCour;
            compteur.mettreAZero();
            startGame();
           
          }
          else if(mousePos.x > 125 && mousePos.x < 375 && mousePos.y > 300 && mousePos.y < 350){
            etatJeu = "menuPrincipal";
            compteur.mettreAZero();
            startGame();
          }
          break;
          case "finie":
          if(mousePos.x > 125 && mousePos.x < 375 && mousePos.y > 200 && mousePos.y < 250){
            
            if(jeuEnCour == "debutant"){
              etatJeu = "intermediaire";
            }
            else if(jeuEnCour = "intermediaire"){
              etatJeu = "expert";
            }
            
            compteur.mettreAZero();
            startGame();
            
          }
          else if(mousePos.x > 125 && mousePos.x < 375 && mousePos.y > 300 && mousePos.y < 350){
            etatJeu = "menuPrincipal";
            compteur.mettreAZero();
            startGame();
            
          }
          break;
    }
  }
  }
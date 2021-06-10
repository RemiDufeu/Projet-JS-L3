
class Grille{

    tabDemineur=[];

    constructor(l, c, canvasLargeur, canvasHauteur,assetsLoaded,bombeEnPlace){
    this.nbLignes = l;
    this.nbColonnes = c;
    this.canvasLargeur = canvasLargeur;
    this.canvasHauteur = canvasHauteur;
    this.largeurColonnes = canvasLargeur / c;
    this.hauteurLignes = canvasHauteur / l;
    this.assets = assetsLoaded;
    this.nbDeBombe = [];
    this.remplirGrille();
    this.remplirGrilleDeBombe(bombeEnPlace);
    this.detectionDesBombes();
    }

    resetGrille(bombeEnPlace,ligne,colonne){
    
    this.nbLignes=ligne;
    this.nbColonnes=colonne;
    this.largeurColonnes = canvasLargeur / ligne;
    this.hauteurLignes = canvasHauteur / colonne;
    this.nbDeBombe = [];
    this.remplirGrille();
    this.remplirGrilleDeBombe(bombeEnPlace);
    this.detectionDesBombes();
    }


      showCase(ctx) {
        ctx.save();
        let x = this.hauteurLignes * -1;
        for (let l = 0; l < this.nbLignes; l++) {
          let y = this.largeurColonnes * -1;
          x += this.hauteurLignes;
          for(let c = 0; c < this.nbColonnes; c++) {
            y += this.largeurColonnes; 
            this.tabDemineur[l][c].draw(ctx,x,y,this.largeurColonnes,this.hauteurLignes);
          }
        }
    
        ctx.restore();
      }

      /**
       * @todo remplie toute la grille de case vide
       */
      remplirGrille() {
        this.tabDemineur = create2DArray(this.nbLignes);
        for(let l=0; l<this.nbLignes; l++){
            for(let c=0; c<this.nbColonnes; c++){
                let type="casevide";
                let caseVide = new Case(type,l,c,this.assets.case,null);
                this.tabDemineur[l][c]=caseVide;
                this.tabDemineur[l][c].imageCache=this.assets.caseVide;
                this.tabDemineur[l][c].drapeau= this.assets.drapeau;
                this.tabDemineur[l][c].imageCase=this.assets.case;
              }
        }
    }

    /**
     * @todo remplie la grille de bombe aléatoirement
     * @param {nbBombe} nbBombe prend on parametre le nombre de bombe a inserer dans la grille
     */
    remplirGrilleDeBombe(nbBombe){
      
      while(nbBombe>this.nbDeBombe.length){
        let col = Math.floor(this.nbLignes * Math.random());
        let lig = Math.floor(this.nbColonnes * Math.random());
        if(this.tabDemineur[lig][col].type === "casevide"){
        this.tabDemineur[lig][col].type = "bombe";
        this.tabDemineur[lig][col].imageCache=this.assets.bombeActive;
        this.nbDeBombe.push( this.tabDemineur[lig][col]);
        }
      }
    }

    /**
     * @param {x} x position x de la souris quand le clique a était effectué
     * @param {y} y position y de la souris quand le clique a était effectué
     * @returns retourne un double tableau pour savoir sur quelle case l'utilisateur a cliqué
     */
    getCase(x,y){
      let l= Math.floor(x / this.largeurColonnes);
      let c= Math.floor(y / this.hauteurLignes);
    
      return this.tabDemineur[l][c];
    }



    /**
     * @todo detecte le nombre de bombe autour de la case pour afficher la valeur du nombre de bombes autour
     */
    detectionDesBombes(){
      for(let l=0; l<this.nbLignes; l++){
        for(let c=0; c<this.nbColonnes; c++){
          let bombeProximite = 0;
          if(this.tabDemineur[l][c].type=="casevide"){
          if(l==0 &&  !(c==0 || c==this.nbColonnes-1)){
            if(this.tabDemineur[l][c+1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l+1][c+1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l+1][c].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l+1][c-1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l][c-1].type === "bombe"){
              bombeProximite++;
          }
        }
          else if(l==this.nbLignes-1 && !(c==0||c==this.nbColonnes-1)){
            if(this.tabDemineur[l-1][c-1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l-1][c].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l-1][c+1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l][c+1].type === "bombe"){
              bombeProximite++;
           }
           if(this.tabDemineur[l][c-1].type === "bombe"){
            bombeProximite++;
            }
          }
          else if(l==0 && c==0){
            if(this.tabDemineur[l][c+1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l+1][c+1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l+1][c].type === "bombe"){
              bombeProximite++;
          }
        }
          else if(l==0 && c==this.nbColonnes-1){
            if(this.tabDemineur[l+1][c].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l+1][c-1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l][c-1].type === "bombe"){
              bombeProximite++;
            }
          }
          else if(l==this.nbLignes-1 && c==0){
            if(this.tabDemineur[l][c+1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l-1][c].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l-1][c+1].type === "bombe"){
              bombeProximite++;
            }
          }
          else if(l==this.nbLignes-1 && c==this.nbColonnes-1){
            if(this.tabDemineur[l-1][c-1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l-1][c].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l][c-1].type === "bombe"){
              bombeProximite++;
            }
          }
          else if(c==0 && !(l==0 || l==this.nbLignes-1)){
            if(this.tabDemineur[l-1][c].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l-1][c+1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l][c+1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l+1][c+1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l+1][c].type === "bombe"){
              bombeProximite++;
            }
          }
          else if(c==this.nbColonnes-1 && !(l==0 || l==this.nbLignes-1)){
            if(this.tabDemineur[l-1][c-1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l-1][c].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l+1][c].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l+1][c-1].type === "bombe"){
              bombeProximite++;
            }
            if(this.tabDemineur[l][c-1].type === "bombe"){
              bombeProximite++;
            }
          }
          else{
          if(this.tabDemineur[l-1][c-1].type === "bombe"){
            bombeProximite++;
          }
          if(this.tabDemineur[l-1][c].type === "bombe"){
            bombeProximite++;
          }
          if(this.tabDemineur[l-1][c+1].type === "bombe"){
            bombeProximite++;
          }
          if(this.tabDemineur[l][c+1].type === "bombe"){
            bombeProximite++;
          }
          if(this.tabDemineur[l+1][c+1].type === "bombe"){
            bombeProximite++;
          }
          if(this.tabDemineur[l+1][c].type === "bombe"){
            bombeProximite++;
          }
          if(this.tabDemineur[l+1][c-1].type === "bombe"){
            bombeProximite++;
          }
          if(this.tabDemineur[l][c-1].type === "bombe"){
            bombeProximite++;
          }
        }
      }
        
  
      
        if(bombeProximite==1){
          this.tabDemineur[l][c].type = "1";
          this.tabDemineur[l][c].imageCache=this.assets.chiffreUn;
        }
        if(bombeProximite==2){
          this.tabDemineur[l][c].type = "2";
          this.tabDemineur[l][c].imageCache=this.assets.chiffreDeux;
        }
        if(bombeProximite==3){
          this.tabDemineur[l][c].type = "3";
          this.tabDemineur[l][c].imageCache=this.assets.chiffreTrois;
        }
        if(bombeProximite==4){
          this.tabDemineur[l][c].type = "4";
          this.tabDemineur[l][c].imageCache=this.assets.chiffreQuatre;
        }
        if(bombeProximite==5){
          this.tabDemineur[l][c].type = "5";
          this.tabDemineur[l][c].imageCache=this.assets.chiffreCinq;
        }
        if(bombeProximite==6){
          this.tabDemineur[l][c].type = "6";
          this.tabDemineur[l][c].imageCache=this.assets.chiffreSix;
        }
      }
    }
  }


  /**
   * @todo quand l'utilisateur clique sur une case vide on regarde si les cases aux alentours sont aussi vide ou non
   * @param {x} x position x de la souris quand le clique a était effectué
   * @param {y} y position y de la souris quand le clique a était effectué
   */
  detectionDesCasesVide(x,y){
    let l= Math.floor(x / this.largeurColonnes);
    let c= Math.floor(y / this.hauteurLignes);
  
    if(this.tabDemineur[l][c].clique==null){
      if(this.tabDemineur[l][c].type=="casevide"){

        if( l!=0 && c!=0 && this.tabDemineur[l-1][c-1].type != "bombe" && this.tabDemineur[l-1][c-1].clique==null){
          this.tabDemineur[l-1][c-1].image=this.tabDemineur[l-1][c-1].imageCache;
          this.tabDemineur[l-1][c-1].clique="clique";
          this.detectionDesCasesVideAllentour(l-1,c-1);
        }
        if(l!=0 && this.tabDemineur[l-1][c].type != "bombe" && this.tabDemineur[l-1][c].clique==null){
          this.tabDemineur[l-1][c].image=this.tabDemineur[l-1][c].imageCache;
          this.tabDemineur[l-1][c].clique="clique";
          this.detectionDesCasesVideAllentour(l-1,c);
        }
        if(l!=0 && c!=this.nbColonnes-1 && this.tabDemineur[l-1][c+1].type != "bombe" && this.tabDemineur[l-1][c+1].clique==null){
          this.tabDemineur[l-1][c+1].image=this.tabDemineur[l-1][c+1].imageCache;
          this.tabDemineur[l-1][c+1].clique="clique";
          this.detectionDesCasesVideAllentour(l-1,c+1);
        }
        if( c!=0 && this.tabDemineur[l][c-1].type != "bombe" && this.tabDemineur[l][c-1].clique==null){
          this.tabDemineur[l][c-1].image=this.tabDemineur[l][c-1].imageCache;
          this.tabDemineur[l][c-1].clique="clique";
          this.detectionDesCasesVideAllentour(l,c-1);
        }
        if(c!=this.nbColonnes-1 && this.tabDemineur[l][c+1].type != "bombe" && this.tabDemineur[l][c+1].clique==null){
          this.tabDemineur[l][c+1].image=this.tabDemineur[l][c+1].imageCache;
          this.tabDemineur[l][c+1].clique="clique";
          this.detectionDesCasesVideAllentour(l,c+1);
        }
  
        if(l!= this.nbLignes-1 && c!=0 && this.tabDemineur[l+1][c-1].type != "bombe" && this.tabDemineur[l+1][c-1].clique==null){
          this.tabDemineur[l+1][c-1].image=this.tabDemineur[l+1][c-1].imageCache;
          this.tabDemineur[l+1][c-1].clique="clique";
          this.detectionDesCasesVideAllentour(l+1,c-1);
        }
        if(l!= this.nbLignes-1 && this.tabDemineur[l+1][c].type != "bombe" && this.tabDemineur[l+1][c].clique==null){
          this.tabDemineur[l+1][c].image=this.tabDemineur[l+1][c].imageCache;
          this.tabDemineur[l+1][c].clique="clique";
          this.detectionDesCasesVideAllentour(l+1,c);
        }
        if(l!= this.nbLignes-1 && c!=this.nbColonnes-1 && this.tabDemineur[l+1][c+1].type != "bombe" && this.tabDemineur[l+1][c+1].clique==null){
          this.tabDemineur[l+1][c+1].image=this.tabDemineur[l+1][c+1].imageCache;
          this.tabDemineur[l+1][c+1].clique="clique";
          this.detectionDesCasesVideAllentour(l+1,c+1);
        }
      }
    }
        
  }


  /**
   * @todo quand l'utilisateur clique sur une case vide on regarde si les cases aux alentours sont aussi vide ou non
   * la méthode s'appelle elle meme tant qu'il y a des cases vides
   * @param {l} l parametre l qui correspond à la ligne 
   * @param {c} c parametre c qui correspond à la collone
   */
  detectionDesCasesVideAllentour(l,c){
  
    if(this.tabDemineur[l][c].type=="casevide"){

      if( l!=0 && c!=0 && this.tabDemineur[l-1][c-1].type != "bombe" && this.tabDemineur[l-1][c-1].clique==null){
        this.tabDemineur[l-1][c-1].image=this.tabDemineur[l-1][c-1].imageCache;
        this.tabDemineur[l-1][c-1].clique="clique";
        this.detectionDesCasesVideAllentour(l-1,c-1);
      }
      if(l!=0 && this.tabDemineur[l-1][c].type != "bombe" && this.tabDemineur[l-1][c].clique==null){
        this.tabDemineur[l-1][c].image=this.tabDemineur[l-1][c].imageCache;
        this.tabDemineur[l-1][c].clique="clique";
        this.detectionDesCasesVideAllentour(l-1,c);
      }
      if(l!=0 && c!=this.nbColonnes-1 && this.tabDemineur[l-1][c+1].type != "bombe" && this.tabDemineur[l-1][c+1].clique==null){
        this.tabDemineur[l-1][c+1].image=this.tabDemineur[l-1][c+1].imageCache;
        this.tabDemineur[l-1][c+1].clique="clique";
        this.detectionDesCasesVideAllentour(l-1,c+1);
      }
      if( c!=0 && this.tabDemineur[l][c-1].type != "bombe" && this.tabDemineur[l][c-1].clique==null){
        this.tabDemineur[l][c-1].image=this.tabDemineur[l][c-1].imageCache;
        this.tabDemineur[l][c-1].clique="clique";
        this.detectionDesCasesVideAllentour(l,c-1);
      }
      if(c!=this.nbColonnes-1 && this.tabDemineur[l][c+1].type != "bombe" && this.tabDemineur[l][c+1].clique==null){
        this.tabDemineur[l][c+1].image=this.tabDemineur[l][c+1].imageCache;
        this.tabDemineur[l][c+1].clique="clique";
        this.detectionDesCasesVideAllentour(l,c+1);
      }

      if(l!= this.nbLignes-1 && c!=0 && this.tabDemineur[l+1][c-1].type != "bombe" && this.tabDemineur[l+1][c-1].clique==null){
        this.tabDemineur[l+1][c-1].image=this.tabDemineur[l+1][c-1].imageCache;
        this.tabDemineur[l+1][c-1].clique="clique";
        this.detectionDesCasesVideAllentour(l+1,c-1);
      }
      if(l!= this.nbLignes-1 && this.tabDemineur[l+1][c].type != "bombe" && this.tabDemineur[l+1][c].clique==null){
        this.tabDemineur[l+1][c].image=this.tabDemineur[l+1][c].imageCache;
        this.tabDemineur[l+1][c].clique="clique";
        this.detectionDesCasesVideAllentour(l+1,c);
      }
      if(l!= this.nbLignes-1 && c!=this.nbColonnes-1 && this.tabDemineur[l+1][c+1].type != "bombe" && this.tabDemineur[l+1][c+1].clique==null){
        this.tabDemineur[l+1][c+1].image=this.tabDemineur[l+1][c+1].imageCache;
        this.tabDemineur[l+1][c+1].clique="clique";
        this.detectionDesCasesVideAllentour(l+1,c+1);
      }
    }
}

/**
 * @todo affiche un drapeau sur une bombe quand on clique sur le bouton "afficher la solution"
 */
donnerUneSolution(){
  let tabDesBombes = [];
  let bombeAReveler;
  let bombe;
  for(let l=0; l<this.nbLignes; l++){
    for(let c=0; c<this.nbColonnes; c++){
      if(this.tabDemineur[l][c].type=="bombe" && this.tabDemineur[l][c].clique==null){
        tabDesBombes.push(this.tabDemineur[l][c]);
      }
    }
  }
  if(tabDesBombes.length>0){
  bombeAReveler= Math.floor(tabDesBombes.length * Math.random());

  bombe=tabDesBombes[bombeAReveler];
  bombe.image=bombe.drapeau;
  bombe.clique="clique";
}
}


/**
 * @todo regarde si toute les cases on etait cliqué sans les bombes
 * @returns retourne le mot finie sur la partie est finie ou non
 */
PartieFinie(){
  let nbDeCase=this.nbLignes*this.nbColonnes-this.nbDeBombe.length;
  let cpt=0;
  for(let l=0; l<this.nbLignes; l++){
    for(let c=0; c<this.nbColonnes; c++){
      if(this.tabDemineur[l][c].type!="bombe" && this.tabDemineur[l][c].clique!=null){
        cpt++;
      }
      
      
    }
  }

  if( nbDeCase== cpt){
    return "finie";
  }
}
}

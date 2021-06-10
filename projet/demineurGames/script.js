
window.onload = init;

let grille;
let mousePos={};
let canvas, ctx, canvasLargeur, canvasHauteur;
let caseClique = null;
let etatJeu = "menuNom";
let jeuEnCour;
let compteur = new Compteur();
let temps;
let score;



function init() {
    console.log("Page et ressources prêtes à l'emploi");
    // appelée quand la page et ses ressources sont prêtes.
    // On dit aussi que le DOM est ready (en fait un peu plus...)
  canvas = document.querySelector("#canvasDemineur");
    ctx = canvas.getContext("2d");
    canvasLargeur = canvas.width;
    canvasHauteur = canvas.height;
    let menuDebut = new MenuDebut(compteur)
    menuDebut.construireMenu()
    score = new Score(Compteur.demineur);
    score.construireTableau();
    loadAssets(startGame);
    
    requestAnimationFrame(animationLoop);
  }


  /**
   * @todo permet de lancer une partie dans le mode de jeu souhaité
   * @param {assetsLoaded} assetsLoaded permet d'envoyer les assets chargé avant a la grille 
   */
  function startGame(assetsLoaded){
    
   if(assetsLoaded){

    assets = assetsLoaded;
    
    }
    
    score.miseAJourTableau();
    switch(etatJeu){
      case "debutant":
        
        if(grille) grille.resetGrille(10,10,10);
        else grille = new Grille(10, 10, canvasLargeur, canvasHauteur, assets,10);
        jeuEnCour=etatJeu;
        compteur.init();
        break;
      case "intermediaire":
        
        if(grille && jeuEnCour!=null) grille.resetGrille(40,16,16);
        else grille = new Grille(16, 16, canvasLargeur, canvasHauteur, assets,40);
        jeuEnCour=etatJeu;
        compteur.init();
      break;
      case "expert":
        
        if(grille && jeuEnCour!=null) grille.resetGrille(90,20,20);
        else grille = new Grille(20, 20, canvasLargeur, canvasHauteur, assets,90);
        jeuEnCour=etatJeu;
        compteur.init();
        break;
    }
   
   
    canvas.onmousedown = traiteMouseDown;
   
  }

  

  function getMousePos(event){
    let rect=canvas.getBoundingClientRect();
  let x= event.clientX - rect.left;
  let y= event.clientY - rect.top;
  
    mousePos = {
      x: x,
      y: y,
    };
  }


  /**
   * @todo appelle la méthode donnerUneSolution quand l'utilisateur a cliquer sur "afficher une solution"
   */
function revelerUneBombe() {
  if(etatJeu != "menuPrincipal" && etatJeu != "finie" && etatJeu != "perdu"){
     grille.donnerUneSolution();
  }
}


function animationLoop() {
  // Efface le canvas
  ctx.clearRect(0, 0, canvasLargeur, canvasHauteur);
  switch (etatJeu) {
    case "debutant":
      updateGame();
      break;
    case "intermediaire":
      updateGame();
      break;
    case "expert":
        updateGame();
        break;
    case "finie":
        finDePartie();
        break;
    case "perdu":
        finDePartiePerdu();
        break;
    case "menuPrincipal":
      afficherMenuPrincipal();
  }

  // on demande à redessiner 60 fois par seconde
  requestAnimationFrame(animationLoop);
}



function updateGame() {

  // On dessine les objets
  
  if(grille!=null){
  //grille.drawGrille(ctx);
  grille.showCase(ctx);
}

}





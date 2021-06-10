function afficherMenuPrincipal() {
    ctx.save();
  
    

   
    ctx.font = "50pt Calibri";
    ctx.fillStyle = "black"
    ctx.fillText("MENU PRINCIPAL", 20, 120);
  
  
    ctx.font = "12pt Calibri";
    ctx.fillStyle = "black"
    ctx.fillText("Selectionner un niveau de difficulté", 132, 150);
  
    ctx.fillStyle="black";
    ctx.fillRect(125,200,250,50);
    ctx.fillStyle = "white"
    ctx.fillText("Débutant", 219, 230);
  
    ctx.fillStyle="black";
    ctx.fillRect(125,300,250,50);
    ctx.fillStyle = "white"
    ctx.fillText("Intermédiaire", 206, 330);
  
    ctx.fillStyle="black";
    ctx.fillRect(125,400,250,50);
    ctx.fillStyle = "white"
    ctx.fillText("Expert", 228, 430);
     
    ctx.restore();
  }
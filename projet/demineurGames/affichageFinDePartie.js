function finDePartie(){
  updateGame();
  ctx.save();
  temps=compteur.stop();
  ctx.font = "50pt Calibri";
  ctx.fillStyle = "black"
  ctx.fillText("Gagne", 160, 120);

  ctx.font = "12pt Calibri";
  ctx.fillStyle="black";
  ctx.fillRect(125,200,250,50);
  ctx.fillStyle = "white"
  if(jeuEnCour=="expert"){
    ctx.fillText("Rejouer", 224, 230);
  }
  else{
  ctx.fillText("Niveau Supérieur", 193, 230);
}

  ctx.fillStyle="black";
  ctx.fillRect(125,300,250,50);
  ctx.fillStyle = "white"
  ctx.fillText("Menu Principal", 200, 330);
  ctx.restore();
}

function finDePartiePerdu(){
  updateGame();
  ctx.save();
  temps=compteur.stop();
  ctx.font = "50pt Calibri";
  ctx.fillStyle = "black"
  ctx.fillText("Perdu", 170, 120);

  ctx.font = "12pt Calibri";
  ctx.fillStyle="black";
  ctx.fillRect(125,200,250,50);
  ctx.fillStyle = "white"
  ctx.fillText("Rejouer", 224, 230);

  ctx.fillStyle="black";
  ctx.fillRect(125,300,250,50);
  ctx.fillStyle = "white"
  ctx.fillText("Menu Principal", 200, 330);

  ctx.restore();
}

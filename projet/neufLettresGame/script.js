window.addEventListener("DOMContentLoaded", () => {
  function chargerAssets(loadsAssets) {
    if (loadsAssets) {
      assets = loadsAssets;
    }

    let chronometre = new Compteur();

    let scoreTableau = new Score(Compteur.neufLettres);
    scoreTableau.construireTableau();

    let grilleAbs = new GrilleAbs(chronometre, scoreTableau, assets);

    let grillePres = new GrillePres();

    let grilleCtrl = new GrilleCtrl(grilleAbs, grillePres);

    let menuDebut = new MenuDebut(grilleAbs);
    menuDebut.construireMenu();

    let menuFin = new MenuFin(grilleAbs);
    let solution = new Solution(grilleAbs);
    grilleAbs.setSolution(solution);

    grilleAbs.setListeMots(solution);
    grilleAbs.setMenuFin(menuFin);
    grilleAbs.setMenuDebut(menuDebut);

    function animationLoop() {
      if (grilleAbs.etat === GrilleAbs.EN_JEU) {
        grilleAbs.miseAJourDonneesJeu();
        grilleCtrl.reçoitMessageDeLAbstraction(
          MESSAGE.REFRESH_RENDU,
          grilleAbs.mots
        );
      } else if (grilleAbs.etat === GrilleAbs.VICTOIRE) {
        grilleCtrl.reçoitMessageDeLAbstraction(
          MESSAGE.VICTOIRE,
          grilleAbs.mots
        );
      }

      // on demande à redessiner 60 fois par seconde
      requestAnimationFrame(animationLoop);
    }

    animationLoop();
  }

  loadAssets(chargerAssets);
});

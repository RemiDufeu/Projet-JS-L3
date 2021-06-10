
    
    function ouvrirFermerSpoiler() {
        let clique = document.querySelector("#cliquerPourLesRegles");
        let texte = document.querySelector("#texteAAfficher");
        
        clique.classList.toggle("rotateArrow")

        texte.classList.toggle("cacheTexte")
    }

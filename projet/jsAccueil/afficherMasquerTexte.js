
    
    function ouvrirFermerSpoiler(mot,texteAfficher) {
        let clique = document.querySelector(mot);
        let texte = document.querySelector(texteAfficher);
        
        clique.classList.toggle("rotateArrow")

        texte.classList.toggle("cacheTexte")
    }

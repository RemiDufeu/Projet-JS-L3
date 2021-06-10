class Case {

    constructor(type,ligne,colonne,image,clique){
    this.type = type;
    this.ligne = ligne;
    this.colonne = colonne;
    this.image = image; // pour canvas
    this.imageCache;
    this.imageCase;
    this.clique=clique;
    this.drapeau;

    }

    draw(ctx, x, y,h,l) {
        ctx.save();
        ctx.drawImage(this.image,x,y,h,l);
        
        ctx.restore();
      }


    

}
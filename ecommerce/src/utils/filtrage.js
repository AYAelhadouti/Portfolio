export function filtrerProduits(produits, filtres) {
  return produits.filter((produit) => {
    const keysSimples = ["categorie", "marque", "condition", "moteur", "couleur"];
    for (const key of keysSimples) {
      if (filtres[key].length > 0 && !filtres[key].includes(produit[key])) {
        return false;
      }
    }
    if (filtres.cabines > 0 && produit.cabines < filtres.cabines) {
      return false;
    }
    if (produit.prix > filtres.prix) {
      return false;
    }
    return true;
  });
}
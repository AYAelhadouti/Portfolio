// src/utils/filtrage.js
/**
 * Filtre les produits selon les filtres actifs.
 * Retourne seulement les produits passant TOUS les filtres.
 * Logique : AND entre facettes différentes, OR dans une même facette.
 */
export function filtrerProduits(produits, filtres) {
  return produits.filter((produit) => {
    // 1. Facettes checkbox simples
    const keysSimples = ["categorie", "marque", "condition", "moteur", "couleur"];
    for (const key of keysSimples) {
      if (filtres[key].length > 0 && !filtres[key].includes(produit[key])) {
        return false;
      }
    }
    // 2. Cabines minimum (radio)
    if (filtres.cabines > 0 && produit.cabines < filtres.cabines) {
      return false;
    }
    // 3. Prix maximum (range)
    if (produit.prix > filtres.prix) {
      return false;
    }
    return true;
  });
}

export function formatPrix(prix) {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(prix);
}

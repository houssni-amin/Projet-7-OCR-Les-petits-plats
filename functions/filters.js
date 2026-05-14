import { renderRecipesCards } from "./cards.js"
import { activeTags, allRecipes } from "./store.js"

export function applyFilters() {
	// Conversion de l'état Set en Array
	const tagsArray = Array.from(activeTags)

	// Si aucun filtre n'est actif
	if (tagsArray.length === 0) {
		renderRecipesCards(allRecipes)
		return
	}

	const finalRecipes = allRecipes.filter((recipe) => {
		// Condition stricte "ET" : la recette doit valider TOUS les tags actifs
		return tagsArray.every((tag) => {
			// Recherche de niveau 1 (Strings simples)
			const inTitle = recipe.name.toLowerCase().includes(tag)
			const inDesc = recipe.description.toLowerCase().includes(tag)
			const inApp = recipe.appliance.toLowerCase().includes(tag)

			// Recherche de niveau 2 (Tableaux via .some)
			const inIngr = recipe.ingredients.some((i) =>
				i.ingredient.toLowerCase().includes(tag),
			)

			const inUst = recipe.ustensils.some((u) => u.toLowerCase().includes(tag))

			// Validation finale du tag (Condition "OU" entre les différents champs)
			return inTitle || inDesc || inApp || inIngr || inUst
		})
	})

	// Mise à jour de la vue
	renderRecipesCards(finalRecipes)
}

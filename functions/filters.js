import { renderRecipesCards } from "./cards.js"
import { updateDropdownLists } from "./dropdowns.js"
import { activeTags, allRecipes, mainSearchQuery } from "./store.js"

export function applyFilters() {
	// Conversion de l'état Set en Array
	const tagsArray = Array.from(activeTags)

	if (tagsArray.length === 0 && mainSearchQuery === "") {
		renderRecipesCards(allRecipes)
		updateDropdownLists(allRecipes)
		return
	}

	const finalRecipes = []

	// Itération principale sur l'ensemble des données
	for (let i = 0; i < allRecipes.length; i++) {
		const recipe = allRecipes[i]

		// Chaque recette commence avec true pour les tags
		let recipeHasAllTags = true

		if (mainSearchQuery !== "") {
			let matchMain = false

			// Le mot est-il dans le Titre ou la Description
			if (
				recipe.name.toLowerCase().indexOf(mainSearchQuery) !== -1 ||
				recipe.description.toLowerCase().indexOf(mainSearchQuery) !== -1
			) {
				matchMain = true
			}

			// Si on n'a rien trouvé
			if (!matchMain) {
				for (let m = 0; m < recipe.ingredients.length; m++) {
					if (
						recipe.ingredients[m].ingredient
							.toLowerCase()
							.indexOf(mainSearchQuery) !== -1
					) {
						matchMain = true
						break
					}
				}
			}

			// Si après les deux niveaux de recherche le mot reste introuvable, on disqualifie la recette
			if (!matchMain) {
				recipeHasAllTags = false
			}
		}

		// L'évaluation des tags ne se fait que si la recette est passée a true
		if (recipeHasAllTags) {
			for (let j = 0; j < tagsArray.length; j++) {
				const tag = tagsArray[j]

				// On présume qu'on n'a pas encore trouvé ce mot dans la recette
				let tagFound = false

				// Recherche de niveau 1 (Strings simples via indexOf)
				if (
					recipe.name.toLowerCase().indexOf(tag) !== -1 ||
					recipe.description.toLowerCase().indexOf(tag) !== -1 ||
					recipe.appliance.toLowerCase().indexOf(tag) !== -1
				) {
					tagFound = true
				}

				// Recherche de niveau 2 (Ingrédients), QUE si on n'a pas déjà trouvé le mot juste au-dessus, avec optimisation d'arrêt
				if (!tagFound) {
					for (let k = 0; k < recipe.ingredients.length; k++) {
						if (
							recipe.ingredients[k].ingredient.toLowerCase().indexOf(tag) !== -1
						) {
							tagFound = true
							break
						}
					}
				}

				// Recherche de niveau 3 (Ustensiles), QUE si on n'a pas déjà trouvé le mot juste au-dessus, avec optimisation d'arrêt
				if (!tagFound) {
					for (let l = 0; l < recipe.ustensils.length; l++) {
						if (recipe.ustensils[l].toLowerCase().indexOf(tag) !== -1) {
							tagFound = true
							break
						}
					}
				}

				// Disqualification si le tag est introuvable
				if (!tagFound) {
					recipeHasAllTags = false
					break
				}
			}
		}

		// Validation et ajout de la recette
		if (recipeHasAllTags) {
			finalRecipes.push(recipe)
		}
	}

	// Mise à jour de la vue
	renderRecipesCards(finalRecipes)
	updateDropdownLists(finalRecipes)
}

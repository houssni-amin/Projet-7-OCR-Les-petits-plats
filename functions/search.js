import { applyFilters } from "./filters.js"
import { setMainSearchQuery } from "./store.js"

// Traite la saisie de la barre de recherche
export function handleMainSearch(inputValue) {
	const value = inputValue.trim().toLowerCase()

	if (value.length >= 3) {
		setMainSearchQuery(value)
	} else {
		// Si l'utilisateur efface des lettres et repasse sous la barre des 3 caractères, on vide le store pour annuler la recherche
		setMainSearchQuery("")
	}

	applyFilters()
}

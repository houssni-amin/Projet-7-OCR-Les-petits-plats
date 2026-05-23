export const activeTags = new Set()

export let allRecipes = []

// Initialisation des données au démarrage
export function setAllRecipes(data) {
	allRecipes = data
}

export const recipeCounter = document.createElement("div")
recipeCounter.className = "font-anton text-2xl"

export const tagsContainer = document.createElement("div")
tagsContainer.className = "w-full flex gap-4 flex-wrap mt-4"

// Valeur tapée dans la barre de recherche
export let mainSearchQuery = ""

// Mise à jour la valeur de la recherche
export function setMainSearchQuery(query) {
	mainSearchQuery = query
}

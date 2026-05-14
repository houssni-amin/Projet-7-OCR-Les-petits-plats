import { main, renderRecipesCards } from "./functions/cards.js"
import {
	buildFilterDropdownsContainer,
	closeAllFilters,
} from "./functions/dropdowns.js"
import { buildHeader } from "./functions/header.js"
import { allRecipes, setAllRecipes } from "./functions/store.js"
import { addTagFilter } from "./functions/tags.js"

async function displayRecipes() {
	const { recipes } = await import("./recipes.js")

	// Ajout au store global
	setAllRecipes(recipes)

	// Extraction des mots-clés uniques pour les filtres
	const ingredientsSet = new Set()
	const appareilsSet = new Set()
	const ustensilesSet = new Set()

	recipes.forEach((recipe) => {
		recipe.ingredients.forEach((i) => {
			ingredientsSet.add(i.ingredient.toLowerCase())
		})

		appareilsSet.add(recipe.appliance.toLowerCase())

		recipe.ustensils.forEach((u) => {
			ustensilesSet.add(u.toLowerCase())
		})
	})

	// Fonction utilitaire pour peupler les menus déroulants
	const fillList = (setItems, listId) => {
		const listContainer = document.querySelector(`#list-${listId}`)
		listContainer.innerHTML = ""

		Array.from(setItems)
			.sort()
			.forEach((mot) => {
				const p = document.createElement("p")
				p.innerText = mot
				p.className =
					"text-sm text-black py-1 px-2 cursor-pointer hover:bg-[#FFD15B] rounded capitalize transition-colors"

				p.addEventListener("click", () => {
					addTagFilter(mot)
					closeAllFilters()
				})

				listContainer.appendChild(p)
			})
	}

	// Remplissage des 3 listes
	fillList(ingredientsSet, "ingredients")
	fillList(appareilsSet, "appareils")
	fillList(ustensilesSet, "ustensiles")

	// Affichage initial
	renderRecipesCards(allRecipes)
}

const app = document.getElementById("app")
app.className = "min-h-screen flex flex-col"

app.appendChild(buildHeader())
app.appendChild(buildFilterDropdownsContainer())
app.appendChild(main)

displayRecipes()

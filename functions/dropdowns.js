import { recipeCounter, tagsContainer } from "./store.js"
import { addTagFilter } from "./tags.js"

export function closeAllFilters() {
	document.querySelectorAll("[id^='dropdown-']").forEach((el) => {
		el.classList.add("hidden")
	})
	document.querySelectorAll("[id^='btn-']").forEach((el) => {
		el.classList.remove("rounded-b-none")
	})
	document.querySelectorAll("[id^='chevron-']").forEach((el) => {
		el.classList.remove("rotate-180")
	})
}

// Création d'un menu déroulant individuel
export function createFilterButton(label, id) {
	const container = document.createElement("div")
	container.className = "relative mr-4"

	container.innerHTML = /* html */ `
    <button id="btn-${id}" class="bg-white w-44 h-16 rounded-xl px-4 flex items-center justify-between cursor-pointer font-bold text-lg transition-all duration-200 hover:bg-[#FFD15B] z-20 relative text-left">
        <span>${label}</span>
        <svg id="chevron-${id}" class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
    </button>

    <div id="dropdown-${id}" class="hidden absolute top-0 left-0 bg-white w-44 pt-16 rounded-xl shadow-xl z-10 overflow-hidden">

        <div class="px-3 pb-2">
          <div class="flex items-center border border-neutral-300 rounded-[2px] px-2 py-1 bg-white">
            <input type="text" id="search-${id}" class="w-full border-0 focus:ring-0 outline-none bg-transparent text-sm text-gray-500 placeholder:text-neutral-400" placeholder="Rechercher...">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="5" r="4.75" stroke="#7A7A7A" stroke-width="0.5"/>
              <line x1="9.17678" y1="9.32322" x2="13.6768" y2="13.8232" stroke="#7A7A7A" stroke-width="0.5"/>
            </svg>
          </div>
        </div>

        <div id="list-${id}" class="max-h-48 overflow-y-auto px-3 pb-3 flex flex-col gap-1 scrollbar-hide">
        </div>
    </div>
  `

	const btn = container.querySelector(`#btn-${id}`)
	const dropdown = container.querySelector(`#dropdown-${id}`)
	const chevron = container.querySelector(`#chevron-${id}`)
	const input = container.querySelector(`#search-${id}`)
	const list = container.querySelector(`#list-${id}`)

	// Ouverture/Fermeture du menu
	btn.addEventListener("click", (e) => {
		e.stopPropagation()
		const isClosed = dropdown.classList.contains("hidden")

		closeAllFilters()

		if (isClosed) {
			dropdown.classList.remove("hidden")
			btn.classList.add("rounded-b-none")
			chevron.classList.add("rotate-180")
			input.focus()
		}
	})

	// Empêcher la fermeture au clic à l'intérieur du menu
	dropdown.addEventListener("click", (e) => e.stopPropagation())

	// Moteur de recherche interne au menu
	input.addEventListener("input", (e) => {
		const value = e.target.value.toLowerCase()
		const items = list.querySelectorAll("p")

		items.forEach((item) => {
			const text = item.innerText.toLowerCase()
			item.style.display = text.includes(value) ? "block" : "none"
		})
	})

	return container
}

// Construction de la barre des filtres (Menus + Tags + Compteur)
export function buildFilterDropdownsContainer() {
	const filterSection = document.createElement("div")
	filterSection.className =
		"w-full bg-[#E5E5E5] px-[10%] pt-5 pb-10 flex flex-wrap gap-y-4 justify-between items-center relative"

	const filtersContainer = document.createElement("div")
	filtersContainer.className = "flex gap-4 flex-wrap"

	// Fermeture globale au clic à l'extérieur
	document.addEventListener("click", closeAllFilters)

	const filterIngredients = createFilterButton("Ingrédients", "ingredients")
	const filterAppareils = createFilterButton("Appareils", "appareils")
	const filterUstensiles = createFilterButton("Ustensiles", "ustensiles")

	filtersContainer.appendChild(filterIngredients)
	filtersContainer.appendChild(filterAppareils)
	filtersContainer.appendChild(filterUstensiles)

	filterSection.appendChild(filtersContainer)
	filterSection.appendChild(recipeCounter)
	filterSection.appendChild(tagsContainer)

	return filterSection
}

// Actualise le contenu des menus déroulants
export function updateDropdownLists(recipesToDisplay) {
	const ingredientsSet = new Set()
	const appareilsSet = new Set()
	const ustensilesSet = new Set()

	// Extraction des données à partir des recettes restantes
	recipesToDisplay.forEach((recipe) => {
		recipe.ingredients.forEach((i) => {
			ingredientsSet.add(i.ingredient.toLowerCase())
		})

		appareilsSet.add(recipe.appliance.toLowerCase())

		recipe.ustensils.forEach((u) => {
			ustensilesSet.add(u.toLowerCase())
		})
	})

	// Fonction utilitaire interne pour regénérer le HTML d'une liste spécifique
	const fillList = (setItems, listId) => {
		const listContainer = document.querySelector(`#list-${listId}`)

		listContainer.innerHTML = ""

		Array.from(setItems)
			.sort()
			.forEach((mot) => {
				// Création de l'élément visuel pour chaque mot-clé
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

	fillList(ingredientsSet, "ingredients")
	fillList(appareilsSet, "appareils")
	fillList(ustensilesSet, "ustensiles")
}

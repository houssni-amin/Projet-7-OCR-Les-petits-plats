const app = document.getElementById("app")
app.className = "min-h-screen flex flex-col"

// ------- HEADER -------

const header = document.createElement("header")
header.className =
	"relative w-full h-[667px] bg-[linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url('./header-bg.jpg')] bg-cover bg-center flex flex-col items-center justify-center"

const logo = document.createElement("img")
logo.src = "/Logo.png"
logo.className = "absolute top-15 left-15 w-60"

const h1 = document.createElement("h1")
h1.innerHTML =
	"CHERCHEZ PARMI PLUS DE 1500 RECETTES </br> DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES"
h1.className = "text-[#FFD15B] font-anton text-5xl text-center mb-8 leading-18"

const searchBar = document.createElement("div")
searchBar.className = "w-full max-w-[950px] px-4"
searchBar.innerHTML = /* html */ `
<div class="relative flex items-center">
    <input
        type="text"
        placeholder="Rechercher une recette, un ingrédient, ..."
class="w-full h-16 bg-white rounded-xl px-6 text-lg text-gray-500 outline-none border-none rounded-lg flex items-center justify-center"
    />
    <button class="group absolute top-2 right-2 bg-black w-12 h-12 rounded-lg flex justify-center items-center hover:bg-[#FFD15B] transition-colors cursor-pointer">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9.5" stroke="white" class="group-hover:stroke-black transition-colors"/>
            <line x1="18.3536" y1="18.6464" x2="27.3536" y2="27.6464" stroke="white" class="group-hover:stroke-black transition-colors"/>
        </svg>
    </button>
</div>
`
header.appendChild(logo)
header.appendChild(h1)
header.appendChild(searchBar)

// ----- SECTION DES FILTRES (DROPDOWNS) -----

const filterSection = document.createElement("div")
filterSection.className =
	"w-full bg-[#E5E5E5] px-[10%] pt-5 pb-10 flex flex-wrap gap-y-4 justify-between items-center relative"

const filtersContainer = document.createElement("div")
filtersContainer.className = "flex gap-4 flex-wrap"

// Conteneur dynamique qui accueillera les Tags sélectionnés.
const tagsContainer = document.createElement("div")
tagsContainer.className = "w-full flex gap-4 flex-wrap mt-4"

// Fonction qui permet de générer des composants menus déroulants réutilisables.
function createFilterButton(label, id, placeholderText) {
	const container = document.createElement("div")
	container.className = "relative mr-4"

	// Template du menu qui inclut le bouton, la recherche interne et la liste.
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
            <input type="text" id="search-${id}" class="w-full border-0 focus:ring-0 outline-none bg-transparent text-sm text-gray-500 placeholder:text-neutral-400" placeholder="${placeholderText}">
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

	// Ciblage des éléments internes du composant pour la gestion des événements.
	const btn = container.querySelector(`#btn-${id}`)
	const dropdown = container.querySelector(`#dropdown-${id}`)
	const chevron = container.querySelector(`#chevron-${id}`)
	const input = container.querySelector(`#search-${id}`)
	const list = container.querySelector(`#list-${id}`)

	// Gestion (Ouverture/Fermeture) des dropdown.
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

	// Bloque la propagation quand on click à l'intérieur.
	dropdown.addEventListener("click", (e) => e.stopPropagation())

	// Recherche d'un mot à l'intérieur du menu déroulant.
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

// Fonction pour fermer tout les dropdowns.
function closeAllFilters() {
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

// Fermeture globale si l'utilisateur clique en dehors d'un dropdown.
document.addEventListener("click", closeAllFilters)

// Instanciation des 3 menus de filtrage.
const filterIngredients = createFilterButton(
	"Ingrédients",
	"ingredients",
	"Rechercher...",
)
const filterAppareils = createFilterButton(
	"Appareils",
	"appareils",
	"Rechercher...",
)
const filterUstensiles = createFilterButton(
	"Ustensiles",
	"ustensiles",
	"Rechercher...",
)

filtersContainer.appendChild(filterIngredients)
filtersContainer.appendChild(filterAppareils)
filtersContainer.appendChild(filterUstensiles)

// Indicateur du nombre de résultats.
const recipeCounter = document.createElement("div")
recipeCounter.className = "font-anton text-2xl"

filterSection.appendChild(filtersContainer)
filterSection.appendChild(recipeCounter)
filterSection.appendChild(tagsContainer)

// ----- MOTEUR DE FILTRAGE PAR TAGS -----

let allRecipes = []
const activeTags = new Set() // Utilisation d'un Set pour garantir l'unicité des tags.

// Algorithme de tri principal utilisant la programmation fonctionnelle.
function applyFilters() {
	const tagsArray = Array.from(activeTags)

	const finalRecipes = allRecipes.filter((recipe) => {
		// La recette doit correspondre à TOUS les tags sélectionnés (.every).
		return tagsArray.every((tag) => {
			// On cherche la correspondance du tag dans les tableaux (.some) ou les strings (.includes).
			const inIngr = recipe.ingredients.some((i) =>
				i.ingredient.toLowerCase().includes(tag),
			)
			const inApp = recipe.appliance.toLowerCase().includes(tag)
			const inUst = recipe.ustensils.some((u) => u.toLowerCase().includes(tag))

			return inIngr || inApp || inUst
		})
	})

	// Mise à jour de l'interface avec les données filtré.
	renderRecipesCards(finalRecipes)
}

// Fonction gérant l'ajout d'un filtre et la création de son composant visuel (tag).
function addTag(mot) {
	if (activeTags.has(mot)) return

	activeTags.add(mot)

	const badge = document.createElement("div")
	badge.className =
		"bg-[#FFD15B] py-2 px-4 rounded-[10px] flex items-center gap-3 font-medium"
	badge.innerHTML = `<span class="text-sm capitalize">${mot}</span><button class="cursor-pointer">✕</button>`

	// Gestion de la suppression : mise à jour des tag.
	badge.querySelector("button").addEventListener("click", () => {
		badge.remove()
		activeTags.delete(mot)
		applyFilters()
	})

	tagsContainer.appendChild(badge)
	applyFilters()
}

// ----- RENDU DES CARTES (UI) -----

const main = document.createElement("main")
main.className =
	"w-full bg-[#E5E5E5] flex-grow pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-[10%]"

// Fonction de rendu dynamique, reçoit un tableau de données et reconstruit le DOM.
function renderRecipesCards(recipesArray) {
	main.innerHTML = "" // Purge de la grille avant chaque nouveau rendu.
	recipeCounter.innerText = `${recipesArray.length} recettes`

	// Gestion du cas d'erreur (aucun résultat).
	if (recipesArray.length === 0) {
		main.innerHTML = `<p class="col-span-full text-center text-xl font-bold mt-10">Aucune recette ne correspond à vos filtres.</p>`
		return
	}

	// Itération sur le jeu de données pour construire chaque composant Carte.
	recipesArray.forEach((recipe) => {
		const container = document.createElement("div")
		container.className =
			"max-w-[380px] h-auto flex flex-col bg-white rounded-xl overflow-hidden shadow-md relative"

		const time = document.createElement("p")
		time.innerText = `${recipe.time}min`
		time.className =
			"absolute top-5 right-5 bg-[#FFD15B] py-1 px-5 rounded-full"

		const image = document.createElement("img")
		image.src = `./pictures/${recipe.image}`
		image.className = "object-cover w-full h-[250px]"

		const textContainer = document.createElement("div")
		textContainer.className = "m-5"

		const name = document.createElement("h2")
		name.innerText = recipe.name
		name.className = " font-bold mb-6 text-lg font-anton "

		const recetteTitle = document.createElement("p")
		recetteTitle.innerText = "RECETTE"
		recetteTitle.className = "mb-2 font-bold text-neutral-500 text-xs"

		const description = document.createElement("p")
		description.innerText = recipe.description
		description.className = "line-clamp-4 font-normal text-sm"

		const ingredientsTitle = document.createElement("p")
		ingredientsTitle.innerText = "INGRÉDIENTS"
		ingredientsTitle.className = "mt-8 mb-2 font-bold text-neutral-500 text-xs"

		const ingredientsGrid = document.createElement("div")
		ingredientsGrid.className = "grid grid-cols-2 gap-y-4"

		// Sous-itération pour structurer proprement la liste des ingrédients.
		recipe.ingredients.forEach((item) => {
			const ingredientsBlock = document.createElement("div")

			const ingredientName = document.createElement("p")
			ingredientName.innerText = item.ingredient
			ingredientName.className = "text-sm font-medium font-normal"

			const ingredientQty = document.createElement("p")
			const quantity = item.quantity ? item.quantity : ""
			const unit = item.unit ? item.unit : ""
			ingredientQty.innerText = `${quantity} ${unit}`
			ingredientQty.className = "text-sm text-neutral-500"

			ingredientsBlock.appendChild(ingredientName)
			ingredientsBlock.appendChild(ingredientQty)
			ingredientsGrid.appendChild(ingredientsBlock)
		})

		textContainer.appendChild(name)
		textContainer.appendChild(recetteTitle)
		textContainer.appendChild(description)
		textContainer.appendChild(ingredientsTitle)
		textContainer.appendChild(ingredientsGrid)

		container.appendChild(time)
		container.appendChild(image)
		container.appendChild(textContainer)

		main.appendChild(container)
	})
}

// ----- INITIALISATION DES DONNÉES -----

// Point d'entrée asynchrone : gère l'importation des données externes.
async function displayRecipes() {
	const { recipes } = await import("./recipes.js")

	// Sauvegarde dans ma mémoire globale.
	allRecipes = recipes

	// Liste tous les mots sans doublon pour remplir les dropdowns.
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

	// Remplissage des dropdowns.
	const fillList = (setItems, listId) => {
		const listContainer = document.querySelector(`#list-${listId}`)
		listContainer.innerHTML = ""

		Array.from(setItems)
			.sort() // Tri par ordre alphabétique
			.forEach((mot) => {
				const p = document.createElement("p")
				p.innerText = mot
				p.className =
					"text-sm text-black py-1 px-2 cursor-pointer hover:bg-[#FFD15B] rounded capitalize transition-colors"

				// On lie l'événement d'ajout de tag directement aux éléments de la liste.
				p.addEventListener("click", () => {
					addTag(mot)
					closeAllFilters()
				})

				listContainer.appendChild(p)
			})
	}

	fillList(ingredientsSet, "ingredients")
	fillList(appareilsSet, "appareils")
	fillList(ustensilesSet, "ustensiles")

	renderRecipesCards(allRecipes)
}

// ----- MONTAGE FINAL -----

app.innerHTML = ""
app.appendChild(header)
app.appendChild(filterSection)
app.appendChild(main)

displayRecipes()

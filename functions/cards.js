import { recipeCounter } from "./store.js"

export const main = document.createElement("main")
main.className =
	"w-full bg-[#E5E5E5] flex-grow pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-[10%]"

export function renderRecipesCards(recipesArray) {
	main.innerHTML = ""

	recipeCounter.innerText = `${recipesArray.length} recettes`

	if (recipesArray.length === 0) {
		main.innerHTML = `<p class="col-span-full text-center text-xl font-bold mt-10">Aucune recette ne correspond à vos filtres.</p>`
		return
	}

	// Itération sur les données pour créer les cartes
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

		// Sous-itération pour les ingrédients
		recipe.ingredients.forEach((item) => {
			const ingredientsBlock = document.createElement("div")

			const ingredientName = document.createElement("p")
			ingredientName.innerText = item.ingredient
			ingredientName.className = "text-sm font-medium font-normal"

			const ingredientQty = document.createElement("p")

			// Sécurisation des données absentes
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

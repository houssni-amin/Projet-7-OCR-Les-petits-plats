const app = document.getElementById("app")

// --- HEADER ---
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

// --- FILTERS & METERS ---
const filterSection = document.createElement("div")
filterSection.className =
  "w-full bg-[#E5E5E5] px-[10%] pt-5 pb-10 flex justify-between items-center"

const filtersContainer = document.createElement("div")
filtersContainer.className = "flex gap-20"

function createFilterButton(label) {
  const container = document.createElement("div")
  container.innerHTML = `
    <button class="bg-white w-48 h-16 rounded-xl px-4 flex items-center justify-between cursor-pointer shadow-sm hover:bg-gray-50 transition-colors">
        <span class="text-lg font-normal">${label}</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
    </button>
  `
  return container
}

const filterIngredients = createFilterButton("Ingrédients")
const filterAppareils = createFilterButton("Appareils")
const filterUstensiles = createFilterButton("Ustensiles")

filtersContainer.appendChild(filterIngredients)
filtersContainer.appendChild(filterAppareils)
filtersContainer.appendChild(filterUstensiles)

const recipeCounter = document.createElement("div")
recipeCounter.className = "font-anton text-2xl"

filterSection.appendChild(filtersContainer)
filterSection.appendChild(recipeCounter)

// --- MAIN ---
const main = document.createElement("main")
main.className = "w-full bg-[#E5E5E5] grid grid-cols-3 gap-10 px-[10%]"

async function displayRecipes() {
  const { recipes } = await import("./recipes.js")

  recipeCounter.innerText = `${recipes.length} recettes`

  recipes.forEach((recipe) => {
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

app.appendChild(header)
app.appendChild(filterSection)
app.appendChild(main)

displayRecipes()

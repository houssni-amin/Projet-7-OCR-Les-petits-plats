const app = document.getElementById("app")

//HEADER
const header = document.createElement("header")
header.className =
  "relative w-full h-[667px] bg-[linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url('./header-bg.jpg')] bg-cover bg-center flex flex-col items-center justify-center"

const logo = document.createElement("img")
logo.src = "/Logo.png"
logo.className = "absolute top-15 left-15 w-60"

const h1 = document.createElement("h1")
h1.innerHTML =
  "CHERCHEZ PARMI PLUS DE 1500 RECETTES </br> DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES"
h1.className = "text-[#FFD15B] font-anton text-5xl text-center mb-8 leading-18"

const searchBar = document.createElement("div")
searchBar.className = "w-full max-w-[950px] px-4"
searchBar.innerHTML = /* html */ `
<div class="relative felx items-center">
<input
type="text"
placeholder="Rechercher une recette, un ingrédient, ..."
class="w-full h-16 bg-white rounded-xl px-6 text-lg text-gray-500 outline-none border-none rounded-lg flex items-center justify-center"
/>
<button class="absolute top-2 right-2 bg-black w-12 h-12 rounded-lg flex justify-center items-center">
<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10" cy="10" r="9.5" stroke="white"/>
<line x1="18.3536" y1="18.6464" x2="27.3536" y2="27.6464" stroke="white"/>
</svg>
</button>
</div>
`
header.appendChild(logo)
header.appendChild(h1)
header.appendChild(searchBar)

//MAIN
const main = document.createElement("main")
main.className = "w-full bg-[#E5E5E5] grid grid-cols-3 gap-10 py-10 px-[10%]"

async function displayRecipes() {
  const { recipes } = await import("./recipes.js")

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

    const recette = document.createElement("p")
    recette.innerText = "RECETTE"
    recette.className = "mb-2 font-bold text-neutral-500 text-xs"

    const description = document.createElement("p")
    description.innerText = recipe.description
    description.className = "line-clamp-4 font-normal text-sm"

    const ingredients = document.createElement("p")
    ingredients.innerText = "INGRÉDIENTS"
    ingredients.className = "mt-8 mb-2 font-bold text-neutral-500 text-xs "

    const ingredientsGrid = document.createElement("div")
    ingredientsGrid.className = "grid grid-cols-2 gap-y-4"

    recipe.ingredients.forEach((item) => {
      const ingredientsBlock = document.createElement("div")
      ingredientsBlock.className = "flex flex-col"

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
    textContainer.appendChild(recette)
    textContainer.appendChild(description)
    textContainer.appendChild(ingredients)
    textContainer.appendChild(ingredientsGrid)

    container.appendChild(time)
    container.appendChild(image)
    container.appendChild(textContainer)

    main.appendChild(container)
  })
}
displayRecipes()

app.appendChild(header)
app.appendChild(main)

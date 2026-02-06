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

app.appendChild(header)

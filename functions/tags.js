import { applyFilters } from "./filters.js"
import { activeTags, tagsContainer } from "./store.js"

export function addTagFilter(mot) {
	// Évite les doublons
	if (activeTags.has(mot)) return

	// Mise à jour de l'état global
	activeTags.add(mot)

	// Création du composant visuel
	const badge = document.createElement("div")
	badge.className =
		"bg-[#FFD15B] py-2 px-4 rounded-[10px] flex items-center gap-3 font-medium"

	badge.innerHTML = `<span class="text-sm capitalize">${mot}</span><button class="cursor-pointer">✕</button>`

	// Gestion de la suppression du tag
	badge.querySelector("button").addEventListener("click", () => {
		// Nettoyage visuel et mémoire, puis relance du tri
		badge.remove()
		activeTags.delete(mot)
		applyFilters()
	})

	tagsContainer.appendChild(badge)

	// Déclenchement du recalcul des recettes
	applyFilters()
}

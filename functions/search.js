import { addTagFilter } from "./tags.js"

export function transformSearchTextToTag(searchInput) {
	const value = searchInput.value.trim().toLowerCase()
	if (value.length > 0) {
		addTagFilter(value)
		searchInput.value = ""
	}
}

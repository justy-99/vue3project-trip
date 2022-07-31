import request from "../request";

const hotSuggestsURL = `/home/hotSuggests`
const CategoriesURL = `/home/categories`


export function getHomeHotSuggests(data) {
  return request.get(hotSuggestsURL)
}

export function getHomeCategories() {
  return request.get(CategoriesURL)
}
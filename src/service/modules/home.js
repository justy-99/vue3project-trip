import request from "../request";

const hotSuggestsURL = `/home/hotSuggests`
const dategoriesURL = `/home/categories`
const houseListURL = `/home/houselist`

export function getHomeHotSuggests(data) {
  return request.get(hotSuggestsURL)
}

export function getHomeCategories() {
  return request.get(dategoriesURL)
}

export function getHomeHouselist(data) {
  return request.get(houseListURL, data)
}

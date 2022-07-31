import request from "../request";

const hotSuggestsURL = `/home/hotSuggests`

export function getHomeHotSuggests(data) {
  return request.get(hotSuggestsURL)
}
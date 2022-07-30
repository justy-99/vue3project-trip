import request from "../request";

const allCityURL = `/city/all`

export function getCityAll(data) {
  return request.get(allCityURL)
}
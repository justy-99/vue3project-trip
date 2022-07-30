import request from "../request";

const CITYAllURL = `/city/all`

export function getCityAll() {
  return request.get(CITYAllURL)
}
import request from "../request";

const detailInfosUrl = '/detail/infos'

export function getDetailInfos(data) {
  return request.get(detailInfosUrl,data)
}
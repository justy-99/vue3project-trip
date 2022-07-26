// 动态加载外部js
export default (src) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.type = "text/javascript"
    script.onload = () => {
      resolve()
    }
    script.onerror = () => {
      reject()
    }
    script.src = src
    document.body.appendChild(script)
  })
}
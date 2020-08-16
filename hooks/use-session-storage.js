import { useEffect } from '../deps/web_modules/preact/hooks.js'

const arrayBufferToBase64 = arrayBuffer => {
  const bytes = (new Uint8Array(arrayBuffer))
  const binary = bytes.reduce(
    (acc, next) => acc += String.fromCharCode(next),
    ''
  )
  return btoa(binary)
}

const base64ToArrayBuffer = base64 => {
  const binary = atob(base64)
  const bytes = (new Uint8Array(binary.length)).map(
    (_, index) => binary.charCodeAt(index)
  )
  return bytes.buffer
}

export const useSessionStorage = (arrayBuffer, setArrayBuffer, key) => {
  useEffect(() => {
    const fromSessionStorage = sessionStorage.getItem(key)
    if (!arrayBuffer && fromSessionStorage) {
      setArrayBuffer(base64ToArrayBuffer(fromSessionStorage))
    }
  })

  useEffect(() => {
    if (arrayBuffer) {
      sessionStorage.setItem(key, arrayBufferToBase64(arrayBuffer))
    }
  }, [arrayBuffer])
}









// const a = new ArrayBuffer(1024)
// const a_view = new Uint8Array(a)

// a_view.forEach((_, index) => {
//   a_view[index] = Math.floor(Math.random * 256)
// })

// const b = base64ToArrayBuffer(arrayBufferToBase64(a))

// console.log(compareArrayBuffers(a, b))

// function compareArrayBuffers(a,b) {
//   const _a = new Uint8Array(a)
//   const _b = new Uint8Array(b)
  
//   if (_a.length !== _b.length) return false
  
//   return _a.reduce((acc, v, i) => {
//       return acc && v === _b[i]
//   }, true)
// }
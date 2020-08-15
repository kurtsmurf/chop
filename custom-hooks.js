import { useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module'

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

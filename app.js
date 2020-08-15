import { h, render } from 'https://unpkg.com/preact@latest?module'
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module'

const fileToArrayBuffer = (file, takeArrayBuffer) => {
  const reader = new FileReader()
  reader.onloadend = e => takeArrayBuffer(e.target.result)
  reader.readAsArrayBuffer(file)
}

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

const ChooseFile = ({ takeFile }) => (
  h(
    'input',
    {
      type: 'file',
      accept: 'audio/*',
      onChange: e => takeFile(e.target.files[0])
    }
  )
)

const useSessionStorage = (arrayBuffer, setArrayBuffer) => {
  useEffect(() => {
    const fromSessionStorage = sessionStorage.getItem('array-buffer')
    if (!arrayBuffer && fromSessionStorage) {
      setArrayBuffer(base64ToArrayBuffer(fromSessionStorage))
    }
  })

  useEffect(() => {
    if (arrayBuffer) {
      sessionStorage.setItem('array-buffer', arrayBufferToBase64(arrayBuffer))
    }
  }, [arrayBuffer])
}

const App = () => {
  const [arrayBuffer, setArrayBuffer] = useState(undefined)

  useSessionStorage(arrayBuffer, setArrayBuffer)

  console.log(arrayBuffer)

  const takeFile = file => {
    fileToArrayBuffer(
      file,
      arrayBuffer => setArrayBuffer(arrayBuffer)
    )
  }

  return h(ChooseFile, { takeFile })
}

render(
  h(App),
  document.getElementById('root')
)
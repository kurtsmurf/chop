import { h, render } from 'https://unpkg.com/preact@latest?module'
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module'
import { useSessionStorage } from './custom-hooks.js'

const fileToArrayBuffer = (file, takeArrayBuffer) => {
  const reader = new FileReader()
  reader.onloadend = e => takeArrayBuffer(e.target.result)
  reader.readAsArrayBuffer(file)
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

const App = () => {
  const [arrayBuffer, setArrayBuffer] = useState(undefined)

  useSessionStorage(arrayBuffer, setArrayBuffer, 'array-buffer')

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
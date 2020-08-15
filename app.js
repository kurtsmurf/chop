import { h, render } from 'https://unpkg.com/preact@latest?module'
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module'
import { useSessionStorage } from './custom-hooks.js'
import { ChooseFile } from './choose-file.js'

const App = () => {
  const [arrayBuffer, setArrayBuffer] = useState(null)

  useSessionStorage(arrayBuffer, setArrayBuffer, 'array-buffer')

  console.log(arrayBuffer)

  return h(ChooseFile, { takeArrayBuffer: setArrayBuffer })
}

render(
  h(App),
  document.getElementById('root')
)
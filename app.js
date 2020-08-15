import { h, render } from 'https://unpkg.com/preact@latest?module'
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module'
import { useSessionStorage } from './hooks/use-session-storage.js'
import { ChooseFile } from './components/choose-file.js'
import { PlayAudio } from './components/play-audio.js'

const App = () => {
  const [arrayBuffer, setArrayBuffer] = useState(null)

  // Was getting this error after adding PlayAudio:
  // Uncaught TypeError: Cannot perform Construct on a detached ArrayBuffer
  // Got around it by passing copy of arrayBuffer instead of arrayBuffer
  // Why does that work?
  const ab_copy = arrayBuffer && arrayBuffer.slice(0)

  useSessionStorage(ab_copy, setArrayBuffer, 'array-buffer')

  console.log(arrayBuffer)

  return (
    h(
      'div',
      {},
      h(ChooseFile, { takeArrayBuffer: setArrayBuffer }),
      h(PlayAudio, { arrayBuffer })
    )
  )
}

render(
  h(App),
  document.getElementById('root')
)
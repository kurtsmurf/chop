import { h, render } from './deps/web_modules/preact.js'
import { useState } from './deps/web_modules/preact/hooks.js'
import { useSessionStorage } from './hooks/use-session-storage.js'
import { ChooseFile } from './components/choose-file.js'
import { PlayAudio } from './components/play-audio.js'


const TopLevel = ({ arrayBuffer, setArrayBuffer }) =>
  h(
    'div',
    { className: 'app' },
    h(ChooseFile, { takeArrayBuffer: setArrayBuffer }),
    h(PlayAudio, { arrayBuffer })
  )





const App = () => {
  const [arrayBuffer, setArrayBuffer] = useState(null)

  // Was getting this error after adding PlayAudio:
  // Uncaught TypeError: Cannot perform Construct on a detached ArrayBuffer
  // Got around it by passing copy of arrayBuffer instead of arrayBuffer
  // Why does that work?
  const ab_copy = arrayBuffer && arrayBuffer.slice(0)

  useSessionStorage(ab_copy, setArrayBuffer, 'array-buffer')

  return h(TopLevel, { arrayBuffer, setArrayBuffer })
}

render(h(App), document.getElementById('root'))
import { h, render } from './deps/web_modules/preact.js'
import { useState } from './deps/web_modules/preact/hooks.js'
import { useSessionStorage } from './hooks/use-session-storage.js'
import { TopLevel } from './components/top-level.js'

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
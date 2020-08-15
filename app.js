import { h, render } from 'https://unpkg.com/preact@latest?module'
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module'

const ChooseFile = ({addFile}) => (
  h(
    'input',
    {
      type: 'file',
      accept: 'audio/*',
      onChange: e => addFile(e.target.files[0])
    }
  )
)

const App = () => {
  const [files, setFiles] = useState([])

  const addFile = file => setFiles([...files, file])

  return h(ChooseFile, { addFile })
}

render(
  h(App),
  document.getElementById('root')
)
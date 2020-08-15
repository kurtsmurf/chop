import { h, render } from 'https://unpkg.com/preact@latest?module'
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module'

const audioContext = new AudioContext()

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

const fileToAudioBuffer = (file, takeAudioBuffer) => {
  const reader = new FileReader()

  reader.onloadend = async e => {
    const arrayBuffer = event.target.result
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

    takeAudioBuffer(audioBuffer)
  }

  reader.readAsArrayBuffer(file)
}

const App = () => {
  const [audioBuffer, setAudioBuffer] = useState(undefined)

  console.log(audioBuffer)

  const takeFile = file => {
    fileToAudioBuffer(file, audioBuffer => {
      setAudioBuffer(audioBuffer)
    })
  }

  return h(ChooseFile, { takeFile })
}

render(
  h(App),
  document.getElementById('root')
)
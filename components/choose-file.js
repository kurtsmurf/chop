import { h } from '../deps/web_modules/preact.js'

const fileToArrayBuffer = (file, takeArrayBuffer) => {
  const reader = new FileReader()
  reader.onloadend = e => takeArrayBuffer(e.target.result)
  reader.readAsArrayBuffer(file)
}

export const ChooseFile = ({ takeArrayBuffer }) => {
  const takeFile = file => {
    fileToArrayBuffer(
      file,
      arrayBuffer => takeArrayBuffer(arrayBuffer)
    )
  }

  return (
    h(
      'div',
      { className: 'choose-file' },
      h(
        'input',
        {
          type: 'file',
          accept: 'audio/*',
          onChange: e => takeFile(e.target.files[0])
        }
      )
    )
  )
}

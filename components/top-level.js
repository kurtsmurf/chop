import { h } from '../deps/web_modules/preact.js'
import { ChooseFile } from './choose-file.js'
import { PlayAudio } from './play-audio.js'

export const TopLevel = (
  { arrayBuffer, setArrayBuffer }
) => (
  h(
    'div',
    { className: 'app' },
    h(ChooseFile, { takeArrayBuffer: setArrayBuffer }),
    h(PlayAudio, { arrayBuffer })
  )
)
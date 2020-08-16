import { h } from '../deps/web_modules/preact.js'
import { useState, useEffect } from '../deps/web_modules/preact/hooks.js'

const audioContext = new AudioContext()

const playAudio = audioBuffer => {
  audioContext.resume()

  const bufferSourceNode = audioContext.createBufferSource()
  bufferSourceNode.buffer = audioBuffer
  bufferSourceNode.loop = true
  bufferSourceNode.connect(audioContext.destination)
  bufferSourceNode.start()

  return () => { bufferSourceNode.stop() }
}

export const PlayAudio = ({ arrayBuffer }) => {
  const [audioBuffer, setAudioBuffer] = useState(null)

  useEffect(() => {
    if (arrayBuffer) {
      audioContext.decodeAudioData(arrayBuffer).then(setAudioBuffer)
    }
  }, [arrayBuffer])


  // className: 'play-audio',


  return (
    h(
      'div',
      { className: 'play-audio' },
      h(
        'button',
        { onClick: () => playAudio(audioBuffer) },
        'Play',
      ),
    )
  )
}
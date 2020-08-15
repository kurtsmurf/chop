import { h } from 'https://unpkg.com/preact@latest?module'
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module'

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

  return (
    h(
      'button',
      {
        onClick: () => playAudio(audioBuffer)
      },
      'Play'
    )
  )
}
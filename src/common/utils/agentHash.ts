import XXH from 'xxhashjs'

export const initAgentHash = (window: Window) => {
  if (typeof window !== 'undefined') {
    try {
      const canvas = window.document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (context) {
        context.rotate(0.045)
        context.shadowBlur = 10
        context.shadowColor = '#d7f9d5'
        context.fillRect(1, 1, 120, 11)
        context.fillRect(0, 0, 120, 10)
        context.font = "14px 'Arial'"
        context.textBaseline = 'top'
        context.fillStyle = '#ddd'
        context.fillText('MattersAgentHash', 0, 0)
        context.fillStyle = '#333'
        context.fillText('MattersAgentHash', 2, 2)
        const dataURL = canvas.toDataURL().replace('data:image/png;base64,', '')
        const hash = XXH.h64(dataURL, 0).toString(10)
        return hash
      }
    } catch (error) {
      // catch silently
    }
  }
  return null
}

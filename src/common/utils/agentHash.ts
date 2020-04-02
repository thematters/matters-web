import XXH from 'xxhashjs'

export const initAgentHash = (window: Window) => {
  if (typeof window !== 'undefined') {
    try {
      const canvas = window.document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (context) {
        context.font = "8px 'Arial'"
        context.fillText('AgentHash', 0, 0)
        context.fillRect(0, 0, 10, 10)
        context.rotate(1.5)
        const dataURL = canvas.toDataURL().replace('data:image/png;base64,', '')
        const hash = XXH.h64(dataURL, 0).toString(16)
        return hash
      }
    } catch (error) {
      // catch silently
    }
  }
  return null
}

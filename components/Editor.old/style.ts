export default {
  contentBox: {
    padding: '0 2rem 0',
    boxSizing: 'border-box',
    height: '100vh',
    overflow: 'auto'
  } as React.CSSProperties,
  header: {
    padding: '1rem 0 1.2rem',
    fontSize: '1.6rem',
    color: 'rgb(51, 51, 51)',
    next: (isComplete: boolean) => {
      return {
        color: isComplete ? 'rgb(74, 124, 110)' : 'rgba(74, 124, 110, .4)',
        marginLeft: '2.4rem'
      }
    }
  },
  form: {
    upstreamBox: {
      borderBottom: '1px solid rgba(0, 0, 0, .16)'
    },
    input: (fontSize: number, color: string, hasBorder: boolean) => {
      return {
        display: 'block',
        padding: '1.7rem 2rem 1.6rem 0',
        fontSize: `${fontSize}rem`,
        border: 0,
        width: '100%',
        height: '6rem',
        borderBottom: hasBorder ? '1px solid rgba(0, 0, 0, .16)' : 0,
        boxSizing: 'border-box',
        appearance: 'none',
        outline: 'none',
        color,
        resize: 'none',
        borderRadius: 0
      } as React.CSSProperties
    },
    stopLink: {
      fontSize: '1.4rem',
      color: 'rgba(74, 124, 110)',
      textAlign: 'right'
    } as React.CSSProperties,
    textarea: {
      margin: '1.6rem 0',
      fontSize: '1.5rem',
      appearance: 'none',
      outline: 'none',
      width: '100%',
      height: '65vh',
      overflow: 'auto',
      paddingBottom: '3rem',
      boxSizing: 'border-box'
    } as React.CSSProperties
  }
}

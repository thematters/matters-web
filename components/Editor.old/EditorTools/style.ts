export default {
  tools: {
    base: (isIphoneX: boolean) => {
      return {
        padding: isIphoneX ? '1rem 0 3rem 0' : '1rem 0',
        borderTop: '1px solid rgba(0, 0, 0, .12)',
        bottom: 0,
        width: '100%',
        boxSizing: 'border-box',
        position: 'fixed',
        left: 0,
        zIndex: 100,
        background: '#fff'
      } as React.CSSProperties
    },
    header: {
      padding: '0 2rem',
      img: (styles: React.CSSProperties) => {
        return styles
      }
    },
    content: {
      maxHeight: '54vh',
      padding: '1.6rem 1.1rem 0',
      boxSizing: 'border-box',
      overflowY: 'auto',
      contentItem: (full: boolean) => {
        return {
          display: 'inline-block',
          width: full ? '100%' : '25%',
          textAlign: 'center',
          padding: '.9rem',
          boxSizing: 'border-box'
        } as React.CSSProperties
      },
      contentBox: (active: boolean) => {
        return {
          background: active ? 'rgb(67, 125, 109)' : 'rgb(246, 246, 246)',
          height: '4.8rem',
          fontSize: '1.6rem',
          borderRadius: '.4rem',
          color: active ? 'rgb(255, 255, 255)' : 'rgb(51, 51, 51)'
        } as React.CSSProperties
      },
      contentImg: {
        width: '3.2rem'
      }
    },
    contentModel: {
      padding: '4rem 4.6rem',
      fontSize: '1.2rem',

      imgBox: {
        width: '6.4rem',
        height: '6.4rem',
        background: 'rgb(246, 246, 246)',
        borderRadius: '100%',
        marginBottom: '.8rem',

        img: {
          width: '2.5rem'
        }
      }
    }
  }
}

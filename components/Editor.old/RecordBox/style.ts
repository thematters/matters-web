export default {
  tools: {
    shadow: {
      position: 'fixed',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, .24)',
      zIndex: 1
    },
    content: {
      position: 'relative',
      width: '92%',
      background: '#fff',
      borderRadius: '.2rem',
      boxShadow: '0px 9px 27px rgba(0, 0, 0, 0.12)',
      padding: '2.4rem 2rem 0',
      textAlign: 'center',
      boxSizing: 'border-box',
      margin: '4rem auto 4rem',
      zIndex: 10
    },
    title: {
      color: 'rgb(51, 51, 51)',
      fontSize: '1.6rem',
      margin: 0,
      lineHeight: 1
    },
    buttonBox: {
      margin: '3.5rem 0 3.2rem',
      position: 'relative',
      buttonLine: {
        width: '7.2rem',
        height: '7.2rem',
        borderRadius: '100%',
        border: '1px solid rgba(0, 0, 0, .16)',
        margin: '0 auto .8rem',
        padding: '.5rem',
        boxSizing: 'border-box'
      },
      button: {
        width: '100%',
        height: '100%',
        borderRadius: '100%',
        background: 'rgb(200, 92, 65)'
      },
      buttonText: {
        color: 'rgb(0, 0, 0)',
        fontSize: '1.2rem',
        fontWeight: 500
      },
      draftBox: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50)',
        fontSize: '1.4rem',
        color: 'rgb(74, 124, 110)',
        fontWeight: 500,
        padding: '0 2rem'
      },
      playBox: {
        background:
          'linear-gradient(rgb(242, 250, 247), rgb(236, 250, 247), rgb(222, 243, 237, .6))',
        padding: '1.6rem',
        title: {
          margin: '0 0 .5rem',
          fontSize: '1.6rem',
          color: 'rgb(51, 51, 51)'
        },
        time: {
          fontSize: '1.2rem',
          color: 'rgb(179, 179, 179)',
          textAlign: 'left'
        },
        icon: {
          fontSize: '3.2rem',
          color: 'rgb(74, 124, 110)'
        },
        handle: {
          color: 'rgb(74, 124, 110)',
          fontSize: '1.4rem',
          marginTop: '1.6rem',
          fontWeight: 500
        }
      }
    },
    cancelButton: (play: boolean) => {
      const cls = {
        color: 'rgb(51, 51, 51)',
        fontSize: '1.6rem',
        padding: '1.1rem 0 1.3rem',
        borderTop: '1px solid rgba(0, 0, 0, .1)'
      }
      if (play) {
        cls.color = 'rgba(51, 51, 51, .4)'
      }

      return cls
    }
  }
}

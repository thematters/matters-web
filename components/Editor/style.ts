export default {
  notice: {
    box: {
      background: '#0d6763',
      borderRadius: '.4rem',
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.08)',
      padding: '1.6rem 2.4rem',
      color: '#fff',
      fontSize: '1.4rem',
      lineHeight: 1.71
    },
    title: {
      display: 'inline-block',
      lineHeight: '1.5',
      marginBottom: '.4rem',
      fontSize: '1.6rem'
    },
    notice: {
      color: 'rgba(255, 255, 255, .5)'
    },
    cancle: {
      cursor: 'pointer'
    }
  },
  contentBox: {
    pc: {
      padding: '24px 0 64px',
      fontSize: 16
    },
    mobile: {
      padding: '0 2rem 0',
      width: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    } as React.CSSProperties
  },
  rightPaddingTop: {
    paddingTop: '3.2rem'
  },
  titleInput: {
    border: 0,
    borderBottom: '.05rem solid rgba(0, 0, 0, 0.16)',
    padding: '4rem 0 1.6rem 0',
    fontSize: '2.4rem',
    color: '#333333',
    fontWeight: 600,
    width: '100%',
    marginBottom: '2.4rem'
  },
  tools: {
    box: {
      position: 'absolute',
      top: '12rem',
      left: '1rem',
      width: '3.3rem',
      height: '3.3rem',
      borderRadius: '50%',
      background: '#fff',
      transition: 'all .3s'
    } as React.CSSProperties,
    add: {
      position: 'absolute',
      width: '33px',
      height: '33px',
      cursor: 'pointer'
    } as React.CSSProperties,
    children: {
      position: 'absolute',
      left: '0',
      top: '6.3rem'
    } as React.CSSProperties,
    img: (opacity = 1) => {
      return {
        width: '3.3rem',
        height: '3.3rem',
        marginRight: '1.6rem',
        opacity,
        cursor: 'pointer',
        background: '#fff',
        borderRadius: '50%',
        flexShrink: 0
      }
    },
    imgBox: {
      box: {
        position: 'absolute',
        left: '-4.9rem',
        top: '100%',
        marginTop: '1.6rem',
        borderRadius: '2px',
        width: '36em',
        boxSizing: 'border-box'
      },
      notice: {
        fontSize: '1.2rem',
        color: '#808080',
        marginBottom: '.8rem'
      },
      noticeGrey: {
        color: '#b3b3b3'
      },
      input: {
        border: 0,
        width: '100%',
        fontSize: '1.4rem',
        color: '#333',
        position: 'absolute',
        left: '4.9rem',
        top: '100%',
        marginTop: '1.6rem',
        borderRadius: '2px',
        boxSizing: 'border-box'
      } as React.CSSProperties
    }
  }
}

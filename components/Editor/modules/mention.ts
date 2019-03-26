import { Quill } from 'react-quill'

import { REGEXP_DISPLAY_NAME } from '~/common/utils'

// import Keys from './constants/keys';

// import '../blots/mention';

// const numberIsNaN = require('./imports/numberisnan.js')

class Mention {
  mentionDenotationChars: string[]
  quill: Quill
  mentionCharPos: any
  maxChars: number
  offsetTop: number
  offsetLeft: number
  isolateCharacter: boolean
  showDenotationChar: boolean
  onMentionChange: (value: string) => void
  mentionContainer: HTMLElement

  constructor(quill: Quill, options: any) {
    this.mentionCharPos = null

    this.mentionDenotationChars = ['@']
    this.maxChars = 31
    this.offsetTop = 16
    this.offsetLeft = 0
    this.isolateCharacter = false
    this.showDenotationChar = true

    this.quill = quill

    this.onMentionChange = options.onMentionChange
    this.mentionContainer = options.mentionContainer

    console.log(options)

    quill.on('text-change', this.onTextChange.bind(this))
    quill.on('selection-change', this.onSelectionChange.bind(this))
  }

  showMentionContainer() {
    this.mentionContainer.style.visibility = 'hidden'
    this.mentionContainer.style.display = ''
    this.setMentionContainerPosition()
  }

  hideMentionContainer() {
    this.mentionContainer.style.display = 'none'
  }

  public insertItem(data: any) {
    const render = data

    if (render === null) {
      return
    }

    if (!this.showDenotationChar) {
      render.denotationChar = ''
    }

    // this.quill.deleteText(
    //   this.mentionCharPos,
    //   cursorPos - this.mentionCharPos,
    //   'user'
    // )
    this.quill.insertEmbed(this.mentionCharPos, 'mention', render, 'user')
    this.quill.insertText(this.mentionCharPos + 1, ' ', 'user')
    this.quill.setSelection(this.mentionCharPos + 2, 'user')
  }

  hasValidChars(s: string) {
    return REGEXP_DISPLAY_NAME.test(s)
  }

  containerBottomIsNotVisible(topPos: number, containerPos: any) {
    const mentionContainerBottom =
      topPos + this.mentionContainer.offsetHeight + containerPos.top
    return mentionContainerBottom > window.pageYOffset + window.innerHeight
  }

  containerRightIsNotVisible(leftPos: number, containerPos: any) {
    const rightPos =
      leftPos + this.mentionContainer.offsetWidth + containerPos.left
    const browserWidth =
      window.pageXOffset + document.documentElement.clientWidth
    return rightPos > browserWidth
  }

  setMentionContainerPosition() {
    // @ts-ignore
    const containerPos = this.quill.container.getBoundingClientRect()
    const mentionCharPos = this.quill.getBounds(this.mentionCharPos)
    const containerHeight = this.mentionContainer.offsetHeight

    let topPos = this.offsetTop
    let leftPos = this.offsetLeft

    /**
     * handle horizontal positioning
     */
    leftPos += mentionCharPos.left
    if (this.containerRightIsNotVisible(leftPos, containerPos)) {
      const containerWidth = this.mentionContainer.offsetWidth + this.offsetLeft
      const quillWidth = containerPos.width
      leftPos = quillWidth - containerWidth
    }

    /**
     * handle vertical positioning
     */
    topPos += mentionCharPos.bottom
    console.log(mentionCharPos.bottom)
    if (this.containerBottomIsNotVisible(topPos, containerPos)) {
      let overMentionCharPos = this.offsetTop * -1
      overMentionCharPos += mentionCharPos.top
      topPos = overMentionCharPos - containerHeight
    }

    this.mentionContainer.style.top = `${topPos}px`
    this.mentionContainer.style.left = `${leftPos}px`
    this.mentionContainer.style.visibility = 'visible'
  }

  handleChange() {
    const range = this.quill.getSelection()
    console.log('range', range)
    if (range == null) {
      return
    }

    const cursorPos = range.index
    const startPos = Math.max(0, cursorPos - this.maxChars)
    const beforeCursorPos = this.quill.getText(startPos, cursorPos - startPos)
    const mentionCharIndex = this.mentionDenotationChars.reduce((prev, cur) => {
      const previousIndex = prev
      const mentionIndex = beforeCursorPos.lastIndexOf(cur)
      return mentionIndex > previousIndex ? mentionIndex : previousIndex
    }, -1)

    console.log(mentionCharIndex)

    if (mentionCharIndex <= -1) {
      this.hideMentionContainer()
      return
    }

    if (
      this.isolateCharacter &&
      !(
        mentionCharIndex === 0 ||
        !!beforeCursorPos[mentionCharIndex - 1].match(/\s/g)
      )
    ) {
      this.hideMentionContainer()
      return
    }

    const mentionCharPos =
      cursorPos - (beforeCursorPos.length - mentionCharIndex)
    const textAfter = beforeCursorPos.substring(mentionCharIndex + 1)

    this.mentionCharPos = mentionCharPos

    if (!this.hasValidChars(textAfter)) {
      this.hideMentionContainer()
      return
    }
    console.log('textAfter', textAfter)

    // const mentionChar = beforeCursorPos[mentionCharIndex]
    this.onMentionChange(textAfter)
    this.showMentionContainer()
  }

  onTextChange(delta: any, oldDelta: any, source: string) {
    if (source === 'user') {
      this.handleChange()
    }
  }

  onSelectionChange(range: any) {
    if (range && range.length === 0) {
      this.handleChange()
    } else {
      this.hideMentionContainer()
    }
  }
}

export default Mention

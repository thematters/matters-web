import { Quill } from 'react-quill'

import { REGEXP_DISPLAY_NAME } from '~/common/utils'

/**
 * https://github.com/afconsult/quill-mention
 */
class Mention {
  mentionDenotationChars: string[]
  quill: Quill
  mentionCharPos: any
  cursorPos: number | null
  maxChars: number
  offsetTop: number
  offsetLeft: number
  isolateCharacter: boolean

  mentionContainer: HTMLElement
  onMentionChange: (value: string) => void

  constructor(quill: Quill, options: any) {
    this.mentionCharPos = null
    this.cursorPos = null

    this.mentionDenotationChars = ['@']
    this.maxChars = 31
    this.offsetTop = 16
    this.offsetLeft = 0
    this.isolateCharacter = false

    this.quill = quill

    this.onMentionChange = options.onMentionChange
    this.mentionContainer = options.mentionContainer

    options.onInit(this)
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

  insertMention(data: { displayName: string; userName: string }) {
    if (!data || !this.cursorPos) {
      return
    }

    this.quill.deleteText(
      this.mentionCharPos,
      this.cursorPos - this.mentionCharPos,
      'user'
    )
    this.quill.insertEmbed(this.mentionCharPos, 'mention', data, 'user')
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
    if (range == null) {
      return
    }

    this.cursorPos = range.index
    const startPos = Math.max(0, this.cursorPos - this.maxChars)
    const beforeCursorPos = this.quill.getText(
      startPos,
      this.cursorPos - startPos
    )
    const mentionCharIndex = this.mentionDenotationChars.reduce((prev, cur) => {
      const previousIndex = prev
      const mentionIndex = beforeCursorPos.lastIndexOf(cur)
      return mentionIndex > previousIndex ? mentionIndex : previousIndex
    }, -1)

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
      this.cursorPos - (beforeCursorPos.length - mentionCharIndex)
    const textAfter = beforeCursorPos.substring(mentionCharIndex + 1)
    this.mentionCharPos = mentionCharPos

    if (!this.hasValidChars(textAfter)) {
      this.hideMentionContainer()
      return
    }

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

Quill.register('modules/mention', Mention)

export default Mention

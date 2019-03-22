import classNames from 'classnames'
import _debounce from 'lodash/debounce'
import React from 'react'
import ReactQuill, { Quill } from 'react-quill'

import contentStyles from '~/common/styles/utils/content.comment.css'
import bubbleStyles from '~/common/styles/vendors/quill.bubble.css'

import * as config from './config'
import styles from './styles.css'

interface Props {
  content?: string
  handleChange: (props: any) => any
  handleBlur?: (props: any) => any
  placeholder?: string
}

interface State {
  focus: boolean
}

class CommentEditor extends React.Component<Props, State> {
  private quill: Quill | null = null
  private reactQuillRef = React.createRef<ReactQuill>()

  constructor(props: Props) {
    super(props)

    this.state = { focus: false }
  }

  public componentDidMount() {
    this.attachQuillRefs()
    this.resetLinkInputPlaceholder()
  }

  public attachQuillRefs = () => {
    if (
      !this.reactQuillRef ||
      !this.reactQuillRef.current ||
      typeof this.reactQuillRef.current.getEditor !== 'function'
    ) {
      return
    }
    this.quill = this.reactQuillRef.current.getEditor()
  }

  /**
   * https://github.com/quilljs/quill/issues/1107#issuecomment-259938173
   */
  public resetLinkInputPlaceholder = () => {
    if (!this.quill) {
      return
    }

    try {
      // @ts-ignore
      const input = this.quill.theme.tooltip.root.querySelector(
        'input[data-link]'
      )
      input.dataset.link = '輸入連結地址' // TODO: i18n
    } catch (e) {
      //
    }
  }

  public render() {
    const { content, handleChange, placeholder } = this.props
    const containerClasses = classNames({
      container: true,
      focus: this.state.focus
    })

    return (
      <>
        <div className={containerClasses}>
          <ReactQuill
            // readOnly={isSubmitting}
            theme="bubble"
            modules={config.modules}
            formats={config.formats}
            ref={this.reactQuillRef}
            value={content}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={() => this.setState({ focus: true })}
            onBlur={() => this.setState({ focus: false })}
          />
        </div>

        <style jsx>{styles}</style>
        <style jsx global>
          {bubbleStyles}
        </style>
        <style jsx global>
          {contentStyles}
        </style>
      </>
    )
  }
}

export default CommentEditor

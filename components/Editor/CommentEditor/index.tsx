import classNames from 'classnames'
import _debounce from 'lodash/debounce'
import React from 'react'
import ReactQuill, { Quill } from 'react-quill'

import { LanguageConsumer } from '~/components/Language'

import contentStyles from '~/common/styles/utils/content.comment.css'
import bubbleStyles from '~/common/styles/vendors/quill.bubble.css'
import { translate } from '~/common/utils'

import * as config from './config'
import styles from './styles.css'

interface Props {
  content?: string
  handleChange: (props: any) => any
  handleBlur?: (props: any) => any
  lang: Language
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

      input.dataset.link = translate({
        zh_hant: '輸入連結地址',
        zh_hans: '输入链接地址',
        lang: this.props.lang
      })
    } catch (e) {
      //
    }
  }

  public render() {
    const { content, handleChange, lang } = this.props
    const containerClasses = classNames({
      container: true,
      focus: this.state.focus
    })

    return (
      <>
        <div className={containerClasses} id="comment-editor">
          <ReactQuill
            theme="bubble"
            modules={config.modules}
            formats={config.formats}
            ref={this.reactQuillRef}
            value={content}
            placeholder={translate({
              zh_hant: '發表你的評論…',
              zh_hans: '发表你的评论…',
              lang
            })}
            onChange={handleChange}
            onFocus={() => this.setState({ focus: true })}
            onBlur={() => this.setState({ focus: false })}
            bounds="#comment-editor"
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

export default (props: Omit<Props, 'lang'>) => (
  <LanguageConsumer>
    {({ lang }) => <CommentEditor lang={lang} {...props} />}
  </LanguageConsumer>
)

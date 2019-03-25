import classNames from 'classnames'
import _debounce from 'lodash/debounce'
import React from 'react'
import ReactQuill, { Quill } from 'react-quill'

import { LanguageConsumer } from '~/components/Language'

import contentStyles from '~/common/styles/utils/content.article.css'
import bubbleStyles from '~/common/styles/vendors/quill.bubble.css'
import { translate } from '~/common/utils'

import { EditorDraft } from './__generated__/EditorDraft'
import blots from './blots'
import * as config from './configs/default'
import SideToolbar from './SideToolbar'
import styles from './styles.css'

interface Props {
  onSave: any
  draft: EditorDraft
  lang: Language
}

interface State {
  content: string
  sideToolbar: {
    show: boolean
    top: number
  }
}

/**
 * Register Custom Blots
 */
blots.register()

class Editor extends React.Component<Props, State> {
  private quill: Quill | null = null
  private reactQuillRef = React.createRef<ReactQuill>()

  constructor(props: Props) {
    super(props)

    this.state = {
      content: this.props.draft.content || '',
      sideToolbar: {
        show: false,
        top: 0
      }
    }

    this.saveDraft = _debounce(this.saveDraft.bind(this), 3000)
  }

  public componentDidMount() {
    this.attachQuillRefs()
    this.resetLinkInputPlaceholder()
  }

  public componentDidUpdate(prevProps: Props) {
    // this.attachQuillRefs()
    // this.resetLinkInputPlaceholder()

    if (prevProps.draft.id === this.props.draft.id) {
      return
    }

    this.setState({
      content: this.props.draft.content || '',
      sideToolbar: {
        show: false,
        top: 0
      }
    })
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

  public saveDraft() {
    // TODO: skip if same content as before saved
    this.props.onSave({ content: this.state.content })
  }

  public handleChange = (content: string) => {
    this.setState({ content }, this.saveDraft)
  }

  public handleOnChangeSelection = (
    range: {
      index: number
      length: number
    },
    source: string,
    editor: any
  ) => {
    if (!range) {
      return
    }

    const bounds = editor.getBounds(range)
    const nextChar = editor.getText(range.index, 1).replace(/\s/, '')
    const isNewLine = bounds.left === 0 && !nextChar

    // hide sideToolbar
    if (!isNewLine && this.state.sideToolbar.show) {
      this.setState({
        sideToolbar: { show: false, top: bounds.top || 0 }
      })
    }

    // show sideToolbar
    if (isNewLine) {
      this.setState({ sideToolbar: { show: true, top: bounds.top } })
    }
  }

  public render() {
    const { draft, onSave, lang } = this.props
    const isPending = draft.publishState === 'pending'
    const isPublished = draft.publishState === 'published'
    const containerClasses = classNames({
      container: true,
      'u-area-disable': isPending || isPublished
    })

    return (
      <>
        <div className={containerClasses}>
          <ReactQuill
            readOnly={isPending || isPublished}
            theme="bubble"
            modules={config.modules}
            formats={config.formats}
            ref={this.reactQuillRef}
            value={this.state.content}
            placeholder={translate({
              zh_hant: '請輸入正文…',
              zh_hans: '请输入正文…',
              lang
            })}
            onChange={this.handleChange}
            onChangeSelection={this.handleOnChangeSelection}
            onBlur={this.saveDraft}
          />
          <SideToolbar
            {...this.state.sideToolbar}
            quill={this.quill}
            onSave={onSave}
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
    {({ lang }) => <Editor lang={lang} {...props} />}
  </LanguageConsumer>
)

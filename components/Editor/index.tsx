import classNames from 'classnames'
import _debounce from 'lodash/debounce'
import _get from 'lodash/get'
import _includes from 'lodash/includes'
import React from 'react'
import { QueryResult } from 'react-apollo'
import ReactQuill, { Quill } from 'react-quill'

import UserList from '~/components/Dropdown/UserList'
import { Query } from '~/components/GQL'
import {
  SearchUsers,
  SearchUsers_search_edges_node_User
} from '~/components/GQL/queries/__generated__/SearchUsers'
import SEARCH_USERS from '~/components/GQL/queries/searchUsers'
import { LanguageConsumer } from '~/components/Language'
import { Spinner } from '~/components/Spinner'

import contentStyles from '~/common/styles/utils/content.article.css'
import bubbleStyles from '~/common/styles/vendors/quill.bubble.css'
import { translate } from '~/common/utils'

import { EditorDraft } from './__generated__/EditorDraft'
import * as config from './configs/default'
import SideToolbar from './SideToolbar'
import styles from './styles.css'
import createImageMatcher from './utils/createImageMatcher'
import lineBreakMatcher from './utils/lineBreakMatcher'

interface Props {
  onSave: any
  draft: EditorDraft
  lang: Language
  upload: (input: {
    file?: any
    url?: string
  }) => Promise<void | {
    id: string
    path: string
  }>
  uploading: boolean
}

interface State {
  content: string
  sideToolbar: {
    show: boolean
    top: number
  }
  search: string
  mentionInstance: any
}

class Editor extends React.Component<Props, State> {
  private quill: Quill | null = null
  private reactQuillRef = React.createRef<ReactQuill>()
  private mentionContainerRef = React.createRef<HTMLElement>()

  constructor(props: Props) {
    super(props)

    this.state = {
      content: this.props.draft.content || '',
      sideToolbar: {
        show: false,
        top: 0
      },
      search: '',
      mentionInstance: null
    }

    this.saveDraft = _debounce(this.saveDraft.bind(this), 3000)
  }

  componentDidMount() {
    this.attachQuillRefs()
    this.resetLinkInputPlaceholder()
  }

  componentDidUpdate(prevProps: Props) {
    this.attachQuillRefs()
    this.resetLinkInputPlaceholder()

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

  attachQuillRefs = () => {
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
  resetLinkInputPlaceholder = () => {
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

  saveDraft() {
    // TODO: skip if same content as before saved
    this.props.onSave({ content: this.state.content })
  }

  handleChange = (content: string) => {
    this.setState({ content }, this.saveDraft)
  }

  handleOnChangeSelection = (
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
    const [blot] = this.quill ? this.quill.getLeaf(range.index) : [null]

    // hide sideToolbar
    if (this.isCustomBlot(blot)) {
      this.setState({
        sideToolbar: { show: false, top: bounds.top || 0 }
      })
    } else if (!isNewLine && this.state.sideToolbar.show) {
      this.setState({
        sideToolbar: { show: false, top: bounds.top || 0 }
      })
    } else if (isNewLine) {
      // show sideToolbar
      this.setState({ sideToolbar: { show: true, top: bounds.top } })
    }
  }

  public isCustomBlot(blot: any): boolean {
    const types = ['embedClipboard']
    if (blot && blot.statics && _includes(types, blot.statics.blotName)) {
      return true
    }
    return false
  }

  onMentionChange = (search: string) => {
    this.setState({ search })
  }

  onMentionModuleInit = (instance: any) => {
    this.setState({ mentionInstance: instance })
  }

  render() {
    const { draft, onSave, lang } = this.props
    const { search, mentionInstance } = this.state
    const isPending = draft.publishState === 'pending'
    const isPublished = draft.publishState === 'published'
    const containerClasses = classNames({
      container: true,
      'u-area-disable': isPending || isPublished
    })

    if (this.quill) {
      this.quill.clipboard.addMatcher('BR', lineBreakMatcher)
      this.quill.clipboard.addMatcher(
        'IMG',
        createImageMatcher(this.props.upload, this.quill)
      )
    }

    return (
      <Query query={SEARCH_USERS} variables={{ search }} skip={!search}>
        {({ data, loading }: QueryResult & { data: SearchUsers }) => {
          const users = _get(data, 'search.edges', []).map(
            ({ node }: { node: SearchUsers_search_edges_node_User }) => node
          )

          return (
            <>
              <div className={containerClasses}>
                <ReactQuill
                  readOnly={isPending || isPublished}
                  theme="bubble"
                  modules={{
                    ...config.modules,
                    mention: {
                      mentionContainer:
                        this.mentionContainerRef &&
                        this.mentionContainerRef.current,
                      onMentionChange: this.onMentionChange,
                      onInit: this.onMentionModuleInit
                    }
                  }}
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

                <section
                  className="mention-container"
                  ref={this.mentionContainerRef}
                  hidden={users.length <= 0}
                >
                  {loading && <Spinner />}
                  {!loading && (
                    <UserList
                      users={users}
                      onClick={(user: SearchUsers_search_edges_node_User) => {
                        mentionInstance.insertMention({
                          id: user.id,
                          displayName: user.displayName,
                          userName: user.userName
                        })
                      }}
                    />
                  )}
                </section>
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
        }}
      </Query>
    )
  }
}

export default (props: Omit<Props, 'lang'>) => (
  <LanguageConsumer>
    {({ lang }) => <Editor lang={lang} {...props} />}
  </LanguageConsumer>
)

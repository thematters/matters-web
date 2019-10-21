import { QueryLazyOptions } from '@apollo/react-hooks'
import classNames from 'classnames'
import _debounce from 'lodash/debounce'
import _includes from 'lodash/includes'
import React, { useContext } from 'react'
import { QueryResult, useLazyQuery } from 'react-apollo'
import ReactQuill, { Quill } from 'react-quill'
import { useDebouncedCallback } from 'use-debounce/lib'

import UserList from '~/components/Dropdown/UserList'
import {
  SearchUsers,
  SearchUsers_search_edges_node_User
} from '~/components/GQL/queries/__generated__/SearchUsers'
import SEARCH_USERS from '~/components/GQL/queries/searchUsers'
import { LanguageContext } from '~/components/Language'
import { Spinner } from '~/components/Spinner'

import { INPUT_DEBOUNCE } from '~/common/enums'
import contentStyles from '~/common/styles/utils/content.article.css'
import bubbleStyles from '~/common/styles/vendors/quill.bubble.css'
import { initAudioPlayers, translate, trimLineBreaks } from '~/common/utils'

import { EditorDraft } from './__generated__/EditorDraft'
import * as config from './configs/default'
import SideToolbar from './SideToolbar'
import styles from './styles.css'
import createImageMatcher from './utils/createImageMatcher'

interface Props {
  onSave: (input: {
    title?: string | null
    content?: string | null
    coverAssetId?: string | null
  }) => Promise<void>
  draft: EditorDraft
  lang: Language
  upload: DraftAssetUpload
  searchUsers: {
    query: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void
    result: QueryResult<SearchUsers, Record<string, any>>
  }
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

    this.saveDraft = _debounce(this.saveDraft.bind(this), INPUT_DEBOUNCE)
  }

  componentDidMount() {
    this.attachQuillRefs()
    this.resetLinkInputPlaceholder()
    initAudioPlayers()
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    this.attachQuillRefs()
    this.resetLinkInputPlaceholder()
    initAudioPlayers()

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
    const content = this.state.content
    const draft = {
      content: trimLineBreaks(content)
    }
    this.props.onSave(draft)
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
    const types = ['embedClipboard', 'embedCode', 'embedVideo']
    if (blot && blot.statics && _includes(types, blot.statics.blotName)) {
      return true
    }
    return false
  }

  onMentionChange = (search: string) => {
    const { searchUsers } = this.props
    const prevSearch = this.state.search

    this.setState({ search }, () => {
      // toggle search users for mention
      if (prevSearch !== search) {
        searchUsers.query({
          variables: { search }
        })
      }
    })
  }

  onMentionModuleInit = (instance: any) => {
    this.setState({ mentionInstance: instance })
  }

  onImageDrop = async (file: any): Promise<{ [key: string]: any }> => {
    if (this.props.upload) {
      return this.props.upload({ file })
    }
    return {}
  }

  render() {
    const { draft, onSave, lang, upload, searchUsers } = this.props
    const { mentionInstance } = this.state
    const isPending = draft.publishState === 'pending'
    const isPublished = draft.publishState === 'published'
    const containerClasses = classNames({
      container: true,
      'u-area-disable': isPending || isPublished
    })

    const { data, loading } = searchUsers.result
    const users = ((data && data.search.edges) || []).map(
      ({ node }) => node
    ) as SearchUsers_search_edges_node_User[]

    if (this.quill) {
      this.quill.clipboard.addMatcher('IMG', createImageMatcher(upload))
    }

    return (
      <div className={containerClasses} id="article-editor">
        <ReactQuill
          readOnly={isPending || isPublished}
          theme="bubble"
          modules={{
            ...config.modules,
            mention: {
              mentionContainer:
                this.mentionContainerRef && this.mentionContainerRef.current,
              onMentionChange: this.onMentionChange,
              onInit: this.onMentionModuleInit
            },
            imageDrop: {
              language: lang,
              onImageDrop: this.onImageDrop
            }
          }}
          formats={config.foramts}
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
          upload={upload}
          onSave={onSave}
        />

        <section
          className="mention-container"
          ref={this.mentionContainerRef}
          hidden={users.length <= 0 && !loading}
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

        <style jsx>{styles}</style>
        <style jsx global>
          {bubbleStyles}
        </style>
        <style jsx global>
          {contentStyles}
        </style>
      </div>
    )
  }
}

export default (props: Omit<Props, 'lang' | 'searchUsers'>) => {
  const { lang } = useContext(LanguageContext)
  const [search, result] = useLazyQuery<SearchUsers>(SEARCH_USERS)
  const [debouncedSearch] = useDebouncedCallback(search, INPUT_DEBOUNCE)

  return (
    <Editor
      lang={lang}
      searchUsers={{
        query: debouncedSearch,
        result
      }}
      {...props}
    />
  )
}

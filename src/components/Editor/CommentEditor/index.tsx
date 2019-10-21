import { QueryLazyOptions } from '@apollo/react-hooks'
import classNames from 'classnames'
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

import { INPUT_DEBOUNCE, TEXT } from '~/common/enums'
import contentStyles from '~/common/styles/utils/content.comment.css'
import bubbleStyles from '~/common/styles/vendors/quill.bubble.css'
import { translate } from '~/common/utils'

import * as config from '../configs/comment'
import styles from './styles.css'

interface Props {
  content?: string
  expand?: boolean
  handleChange: (props: any) => any
  handleBlur?: (props: any) => any
  lang: Language
  searchUsers: {
    query: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void
    result: QueryResult<SearchUsers, Record<string, any>>
  }
}

interface State {
  focus: boolean
  search: string
  mentionInstance: any
}

class CommentEditor extends React.Component<Props, State> {
  private quill: Quill | null = null
  private reactQuillRef = React.createRef<ReactQuill>()
  private mentionContainerRef = React.createRef<HTMLElement>()

  constructor(props: Props) {
    super(props)
    this.state = { focus: false, search: '', mentionInstance: null }
  }

  componentDidMount() {
    this.attachQuillRefs()
    this.resetLinkInputPlaceholder()
  }

  componentDidUpdate() {
    this.attachQuillRefs()
    this.resetLinkInputPlaceholder()
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

  render() {
    const { content, expand, handleChange, lang, searchUsers } = this.props
    const { focus, mentionInstance } = this.state
    const containerClasses = classNames({
      container: true,
      focus
    })
    const placeholder = translate({
      zh_hant: TEXT.zh_hant.commentPlaceholder,
      zh_hans: TEXT.zh_hans.commentPlaceholder,
      lang
    })

    const { data, loading } = searchUsers.result
    const users = ((data && data.search.edges) || []).map(
      ({ node }) => node
    ) as SearchUsers_search_edges_node_User[]

    if (!expand) {
      return (
        <>
          <input
            className="collapsed-input"
            placeholder={placeholder}
            aria-label={placeholder}
          />

          <style jsx>{styles}</style>
        </>
      )
    }

    return (
      <div className={containerClasses} id="comment-editor">
        <ReactQuill
          theme="bubble"
          modules={{
            ...config.modules,
            mention: {
              mentionContainer:
                this.mentionContainerRef && this.mentionContainerRef.current,
              onMentionChange: this.onMentionChange,
              onInit: this.onMentionModuleInit
            }
          }}
          formats={config.foramts}
          ref={this.reactQuillRef}
          value={content}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
          bounds="#comment-editor"
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
    <CommentEditor
      lang={lang}
      searchUsers={{
        query: debouncedSearch,
        result
      }}
      {...props}
    />
  )
}

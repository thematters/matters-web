import classNames from 'classnames'
import _debounce from 'lodash/debounce'
import _get from 'lodash/get'
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

import contentStyles from '~/common/styles/utils/content.comment.css'
import bubbleStyles from '~/common/styles/vendors/quill.bubble.css'
import { translate } from '~/common/utils'

import * as config from '../configs/comment'
import styles from './styles.css'

interface Props {
  content?: string
  handleChange: (props: any) => any
  handleBlur?: (props: any) => any
  lang: Language
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
    this.setState({ search })
  }

  onMentionModuleInit = (instance: any) => {
    this.setState({ mentionInstance: instance })
  }

  render() {
    const { focus, search, mentionInstance } = this.state
    const { content, handleChange, lang } = this.props
    const containerClasses = classNames({
      container: true,
      focus
    })

    return (
      <Query query={SEARCH_USERS} variables={{ search }} skip={!search}>
        {({ data, loading }: QueryResult & { data: SearchUsers }) => {
          const users = _get(data, 'search.edges', []).map(
            ({ node }: { node: SearchUsers_search_edges_node_User }) => node
          )
          console.log('content', content)
          return (
            <>
              <div className={containerClasses} id="comment-editor">
                <ReactQuill
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
    {({ lang }) => <CommentEditor lang={lang} {...props} />}
  </LanguageConsumer>
)

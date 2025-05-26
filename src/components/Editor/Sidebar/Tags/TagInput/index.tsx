import { useApolloClient, useQuery } from '@apollo/client'
import { useFormik } from 'formik'
import _uniqBy from 'lodash/uniqBy'
import { useEffect, useState } from 'react'
import AutosizeInput from 'react-input-autosize'
import { useIntl } from 'react-intl'
import { useDebounce } from 'use-debounce'

import { ReactComponent as IconCirclePlus } from '@/public/static/icons/24px/circle-plus.svg'
import { ReactComponent as IconHashTag } from '@/public/static/icons/24px/hashtag.svg'
import { ARTICLE_TAGS_MAX_COUNT } from '~/common/enums/article'
import { INPUT_DEBOUNCE } from '~/common/enums/time'
import { normalizeTag, validateTagName } from '~/common/utils'
import {
  Dropdown,
  Icon,
  ListTag,
  Menu,
  SpinnerBlock,
  toast,
  toDigestTagPlaceholder,
} from '~/components'
import { QUICK_RESULT } from '~/components/Search/SearchQuickResult/gql'
import {
  DigestTagFragment,
  EditorRecentTagsQuery,
  QuickResultQuery,
} from '~/gql/graphql'

import { EDITOR_RECENT_TAGS } from './gql'
import styles from './styles.module.css'

type TagInputProps = {
  tags: DigestTagFragment[]
  onAddTag: (tag: string) => void
  saving?: boolean
}

const TagInput = ({ tags, onAddTag, saving }: TagInputProps) => {
  const formId = 'search-input-tag-form'
  const intl = useIntl()
  const [searchKey, setSearchKey] = useState('')
  const [debouncedSearchKey] = useDebounce(searchKey, INPUT_DEBOUNCE)
  const textAriaLabel = intl.formatMessage({
    defaultMessage: 'Input tags',
    id: 'xk1AW6',
  })

  const client = useApolloClient()
  const [data, setData] = useState<QuickResultQuery>()
  const [searchLoading, setSearchLoading] = useState(false)
  const clearData = () => setData(undefined)

  const { edges: tagEdges } = data?.tag || {}
  const hasTags = tagEdges && tagEdges.length > 0

  useEffect(() => {
    ;(async () => {
      clearData()
      setSearchLoading(true)
      // Why not useLazyQuery 👇🔗
      // https://github.com/apollographql/apollo-client/issues/5912
      const response = await client.query({
        query: QUICK_RESULT,
        variables: {
          key: searchKey,
        },
        fetchPolicy: 'no-cache',
      })
      setData(response.data)
      setSearchLoading(response.loading)
    })()
  }, [searchKey])

  const { values, handleChange, handleSubmit, setFieldValue, handleBlur } =
    useFormik<{
      tag: string
    }>({
      initialValues: { tag: '' },
      onSubmit: (values) => {
        const msg = validateTagName(values.tag, intl)
        if (msg) {
          toast.error({
            message: msg,
          })
          return
        }
        onAddTag(values.tag)
      },
    })

  const { data: recentTagsData, loading: recentTagsLoading } =
    useQuery<EditorRecentTagsQuery>(EDITOR_RECENT_TAGS)

  // recent tags
  const userTagsEdges = recentTagsData?.viewer?.tags.edges || []

  let recentTags = [...userTagsEdges]?.map((edge) => edge.node)
  // remove duplicated tags
  recentTags = _uniqBy(recentTags, (tag) => tag.content)
  // remove selected tags
  recentTags = recentTags.filter(
    (tag) => !tags.find((t) => t.content === tag.content)
  )

  return (
    <Dropdown
      focusLock={false}
      content={
        <div>
          <Menu>
            {searchKey === '' &&
              recentTags.slice(0, ARTICLE_TAGS_MAX_COUNT).map((tag) => (
                <Menu.Item
                  key={tag.id}
                  spacing={[8, 16]}
                  bgActiveColor="greyHover"
                  onClick={() => {
                    setFieldValue('tag', tag.content)
                    handleSubmit()
                  }}
                >
                  <ListTag tag={tag} hasCount={false} is="span" iconSize={20} />
                </Menu.Item>
              ))}
            {searchKey !== '' && !hasTags && !searchLoading && (
              <Menu.Item
                key={debouncedSearchKey}
                spacing={[8, 16]}
                bgActiveColor="greyHover"
                onClick={() => {
                  setFieldValue('tag', debouncedSearchKey)
                  handleSubmit()
                }}
              >
                <ListTag
                  tag={toDigestTagPlaceholder(normalizeTag(debouncedSearchKey))}
                  hasCount={false}
                  is="span"
                  icon={
                    <Icon icon={IconCirclePlus} color="greyDarker" size={20} />
                  }
                />
              </Menu.Item>
            )}
            {searchKey !== '' &&
              hasTags &&
              tagEdges.map(
                ({ node, cursor }, i) =>
                  node.__typename === 'Tag' && (
                    <Menu.Item
                      key={node.id}
                      spacing={[8, 16]}
                      bgActiveColor="greyHover"
                      onClick={() => {
                        setFieldValue('tag', node.content)
                        handleSubmit()
                      }}
                    >
                      <ListTag
                        tag={node}
                        hasCount={false}
                        is="span"
                        iconSize={20}
                      />
                    </Menu.Item>
                  )
              )}
          </Menu>
        </div>
      }
      placement="bottom-start"
      visible={
        (debouncedSearchKey === '' &&
          !recentTagsLoading &&
          recentTags.length > 0 &&
          !saving) ||
        (debouncedSearchKey !== '' && !searchLoading && !saving)
      }
    >
      {({ ref }) => (
        <form
          id={formId}
          className={styles.form}
          onSubmit={handleSubmit}
          ref={ref}
          action=""
          autoComplete="off"
        >
          <Icon icon={IconHashTag} color="greyDark" />
          <AutosizeInput
            type="text"
            name="tag"
            id="search-input-tag"
            autoCorrect="off"
            autoFocus
            value={values.tag}
            disabled={saving}
            aria-label={textAriaLabel}
            placeholder={intl.formatMessage({
              defaultMessage: 'Input tags',
              id: 'xk1AW6',
            })}
            className={styles.input}
            onBlur={handleBlur}
            onChange={(e) => {
              setSearchKey(e.target.value)
              handleChange(e)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSubmit()
              }
            }}
          />
          {saving && <SpinnerBlock size={16} noSpacing />}
        </form>
      )}
    </Dropdown>
  )
}

export default TagInput

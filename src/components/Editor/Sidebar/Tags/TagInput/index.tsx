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

type DropdownMenuProps = {
  searchKey: string
  debouncedSearchKey: string
  searchResults: QuickResultQuery['tag'] | undefined
  searchLoading: boolean
  recentTags: DigestTagFragment[]
  onSelectTag: (tagContent: string) => void
}

const renderRecentTags = (
  recentTags: DigestTagFragment[],
  onSelectTag: (tagContent: string) => void
) => {
  return recentTags.slice(0, ARTICLE_TAGS_MAX_COUNT).map((tag) => (
    <Menu.Item
      key={tag.id}
      spacing={[8, 16]}
      bgActiveColor="greyHover"
      onClick={() => onSelectTag(tag.content)}
    >
      <ListTag tag={tag} hasCount={false} is="span" iconSize={20} />
    </Menu.Item>
  ))
}

const renderCreateNewTag = (
  debouncedSearchKey: string,
  onSelectTag: (tagContent: string) => void
) => {
  return (
    <Menu.Item
      key={debouncedSearchKey}
      spacing={[8, 16]}
      bgActiveColor="greyHover"
      onClick={() => onSelectTag(debouncedSearchKey)}
    >
      <ListTag
        tag={toDigestTagPlaceholder(normalizeTag(debouncedSearchKey))}
        hasCount={false}
        is="span"
        icon={<Icon icon={IconCirclePlus} color="greyDarker" size={20} />}
      />
    </Menu.Item>
  )
}

const renderSearchResults = (
  searchResults: QuickResultQuery['tag'] | undefined,
  onSelectTag: (tagContent: string) => void
) => {
  const { edges: tagEdges } = searchResults || {}

  return tagEdges?.map(({ node }) =>
    node.__typename === 'Tag' ? (
      <Menu.Item
        key={node.id}
        spacing={[8, 16]}
        bgActiveColor="greyHover"
        onClick={() => onSelectTag(node.content)}
      >
        <ListTag tag={node} hasCount={false} is="span" iconSize={20} />
      </Menu.Item>
    ) : null
  )
}

const DropdownMenu = ({
  searchKey,
  debouncedSearchKey,
  searchResults,
  searchLoading,
  recentTags,
  onSelectTag,
}: DropdownMenuProps) => {
  const { edges: tagEdges } = searchResults || {}
  const hasSearchResults = tagEdges && tagEdges.length > 0
  const isSearching = searchKey !== ''
  const shouldShowCreateOption =
    isSearching && !hasSearchResults && !searchLoading

  return (
    <Menu>
      {!isSearching && renderRecentTags(recentTags, onSelectTag)}
      {shouldShowCreateOption &&
        renderCreateNewTag(debouncedSearchKey, onSelectTag)}
      {isSearching &&
        hasSearchResults &&
        renderSearchResults(searchResults, onSelectTag)}
    </Menu>
  )
}

const TagInput = ({ tags, onAddTag, saving }: TagInputProps) => {
  const intl = useIntl()
  const client = useApolloClient()

  const [searchKey, setSearchKey] = useState('')
  const [debouncedSearchKey] = useDebounce(searchKey, INPUT_DEBOUNCE)
  const [searchData, setSearchData] = useState<QuickResultQuery>()
  const [searchLoading, setSearchLoading] = useState(false)

  const formik = useFormik<{ tag: string }>({
    initialValues: { tag: '' },
    onSubmit: (values) => {
      const validationMessage = validateTagName(values.tag, intl)
      if (validationMessage) {
        toast.error({ message: validationMessage })
        return
      }
      onAddTag(values.tag)
    },
  })

  const { data: recentTagsData, loading: recentTagsLoading } =
    useQuery<EditorRecentTagsQuery>(EDITOR_RECENT_TAGS)

  useEffect(() => {
    const searchTags = async () => {
      setSearchData(undefined)
      setSearchLoading(true)

      try {
        const response = await client.query({
          query: QUICK_RESULT,
          variables: { key: searchKey },
          fetchPolicy: 'no-cache',
        })
        setSearchData(response.data)
      } finally {
        setSearchLoading(false)
      }
    }

    if (searchKey) {
      searchTags()
    }
  }, [searchKey, client])

  const processedRecentTags = (() => {
    const userTagsEdges = recentTagsData?.viewer?.tags.edges || []
    let recentTags = userTagsEdges.map((edge) => edge.node)

    recentTags = _uniqBy(recentTags, (tag) => tag.content)
    return recentTags.filter(
      (tag) => !tags.find((t) => t.content === tag.content)
    )
  })()

  const handleSelectTag = (tagContent: string) => {
    formik.setFieldValue('tag', tagContent)
    formik.handleSubmit()
  }

  const isDropdownVisible =
    (debouncedSearchKey === '' &&
      !recentTagsLoading &&
      processedRecentTags.length > 0 &&
      !saving) ||
    (debouncedSearchKey !== '' && !searchLoading && !saving)

  const inputAriaLabel = intl.formatMessage({
    defaultMessage: 'Input tags',
    id: 'xk1AW6',
  })

  const dropdownContent = (
    <DropdownMenu
      searchKey={searchKey}
      debouncedSearchKey={debouncedSearchKey}
      searchResults={searchData?.tag}
      searchLoading={searchLoading}
      recentTags={processedRecentTags}
      onSelectTag={handleSelectTag}
    />
  )

  return (
    <Dropdown
      focusLock={false}
      content={dropdownContent}
      placement="bottom-start"
      visible={isDropdownVisible}
    >
      {({ ref }) => (
        <form
          className={styles.form}
          onSubmit={formik.handleSubmit}
          ref={ref}
          autoComplete="off"
        >
          <Icon icon={IconHashTag} color="greyDark" />
          <AutosizeInput
            type="text"
            name="tag"
            id="search-input-tag"
            autoCorrect="off"
            autoFocus
            value={formik.values.tag}
            disabled={saving}
            aria-label={inputAriaLabel}
            placeholder={inputAriaLabel}
            className={styles.input}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              setSearchKey(e.target.value)
              formik.handleChange(e)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                formik.handleSubmit()
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

import { Translate } from '~/components/Context'

import { TextId } from '~/common/enums'

import {
  SearchSelectArticle,
  SearchSelectArticles,
  SearchSelectTag,
  SearchSelectTags,
  SearchSelectUser,
  SearchSelectUsers,
} from '../Nodes'
import { SearchType, SelectNode } from '../SearchingArea'
import styles from './styles.css'

export interface StagingNode {
  node: SelectNode
  selected: boolean
}

interface SearchingAreaProps {
  nodes: StagingNode[]
  searchType: SearchType
  hint: TextId
  inStagingArea: boolean
  toggleSelectNode: (node: SelectNode) => void
}

const SearchingArea: React.FC<SearchingAreaProps> = ({
  nodes,
  searchType,
  hint,
  inStagingArea,
  toggleSelectNode,
}) => {
  const isArticle = searchType === 'Article'
  const isTag = searchType === 'Tag'
  const isUser = searchType === 'User'

  const filterNodes = (type: SearchType) =>
    nodes.filter(({ node }) => node.__typename === type)

  /**
   * Render
   */
  return (
    <>
      {inStagingArea && nodes.length <= 0 && hint && (
        <section className="hint">
          <Translate id={hint} />
        </section>
      )}

      {inStagingArea && isArticle && (
        <SearchSelectArticles
          articles={filterNodes('Article') as SearchSelectArticle[]}
          onClick={toggleSelectNode}
          inStagingArea
          // TODO: load more
        />
      )}

      {inStagingArea && isTag && (
        <SearchSelectTags
          tags={filterNodes('Tag') as SearchSelectTag[]}
          onClick={toggleSelectNode}
          inStagingArea
          // TODO: load more
        />
      )}

      {inStagingArea && isUser && (
        <SearchSelectUsers
          users={filterNodes('User') as SearchSelectUser[]}
          onClick={toggleSelectNode}
          inStagingArea
          // TODO: load more
        />
      )}

      <style jsx>{styles}</style>
    </>
  )
}

export default SearchingArea

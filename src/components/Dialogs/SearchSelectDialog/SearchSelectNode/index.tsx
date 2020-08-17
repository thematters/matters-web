import { SelectNode } from '../SearchingArea'
import Article from './Article'
import Tag from './Tag'
import User from './User'

interface SearchSelectNodeProps {
  node: SelectNode
  selected?: boolean
  onClick: (node: SelectNode) => void
  inStagingArea?: boolean
}

const SearchSelectNode: React.FC<SearchSelectNodeProps> = ({
  node,
  ...props
}) => {
  return (
    <>
      {node.__typename === 'Article' && <Article article={node} {...props} />}
      {node.__typename === 'Tag' && <Tag tag={node} {...props} />}
      {node.__typename === 'User' && <User user={node} {...props} />}
    </>
  )
}

export default SearchSelectNode

import { Fragment } from 'react'

import { List, Translate } from '~/components'

import { TextId } from '~/common/enums'

import { SearchSelectArticle, SearchSelectTag, SearchSelectUser } from '../Node'
import { SelectNode } from '../SearchingArea'
import areaStyles from '../styles.css'
import styles from './styles.css'

export interface StagingNode {
  node: SelectNode
  selected: boolean
}

interface StagingAreaProps {
  nodes: StagingNode[]
  hint: TextId
  inStagingArea: boolean
  toggleSelectNode: (node: SelectNode) => void
}

const StagingArea: React.FC<StagingAreaProps> = ({
  nodes,
  hint,
  inStagingArea,
  toggleSelectNode,
}) => {
  if (!inStagingArea) {
    return null
  }

  return (
    <section className="area">
      {nodes.length <= 0 && hint && (
        <section className="hint">
          <Translate id={hint} />
        </section>
      )}

      {nodes.length > 0 && (
        <List>
          {nodes.map(({ node, selected }) => (
            <Fragment key={node.id}>
              {node.__typename === 'Article' && (
                <SearchSelectArticle
                  article={node}
                  selected={selected}
                  onClick={toggleSelectNode}
                  inStagingArea
                />
              )}
              {node.__typename === 'Tag' && (
                <SearchSelectTag
                  tag={node}
                  selected={selected}
                  onClick={toggleSelectNode}
                  inStagingArea
                />
              )}
              {node.__typename === 'User' && (
                <SearchSelectUser
                  user={node}
                  selected={selected}
                  onClick={toggleSelectNode}
                  inStagingArea
                />
              )}
            </Fragment>
          ))}
        </List>
      )}

      <style jsx>{styles}</style>
      <style jsx>{areaStyles}</style>
    </section>
  )
}

export default StagingArea

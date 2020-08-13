import classNames from 'classnames'
import { Fragment } from 'react'

import { IconCheckedMedium, IconCheckMedium, Menu, Tag } from '~/components'

import styles from '../styles.css'

import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

export interface SearchSelectTag {
  node: DigestTag
  selected?: boolean
}

interface SearchSelectTagsProps {
  tags: SearchSelectTag[]
  onClick: (tag: DigestTag) => void
  inStagingArea?: boolean
}

export const SearchSelectTags: React.FC<SearchSelectTagsProps> = ({
  tags,
  onClick,
  inStagingArea,
}) => {
  const nodeClass = classNames({
    node: true,
    selectable: inStagingArea,
  })

  return (
    <Menu spacingY={0}>
      {tags.map(({ node, selected }) => (
        <Fragment key={node.id}>
          <Menu.Divider />
          <Menu.Item spacing={['base', 'base']} onClick={() => onClick(node)}>
            <section className={nodeClass}>
              <Tag tag={node} type="list" hasCount={!inStagingArea} />

              <span className="icon-select">
                {inStagingArea && selected && (
                  <IconCheckedMedium color="green" size="md" />
                )}
                {inStagingArea && !selected && (
                  <IconCheckMedium color="grey-light" size="md" />
                )}
              </span>

              <style jsx> {styles}</style>
            </section>
          </Menu.Item>
        </Fragment>
      ))}
    </Menu>
  )
}

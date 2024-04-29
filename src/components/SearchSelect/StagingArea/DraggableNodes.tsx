import { useContext } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'

import { ReactComponent as IconDrag } from '@/public/static/icons/24px/drag.svg'
import { translate } from '~/common/utils'
import { Icon, LanguageContext } from '~/components'

import { SelectNode } from '../SearchingArea'
import SearchSelectNode from '../SearchSelectNode'
import areaStyles from '../styles.module.css'

interface StagingNode {
  node: SelectNode
  selected: boolean
}

interface DraggableNodesProps {
  nodes: StagingNode[]
  setNodes: (nodes: StagingNode[]) => void
  toggleSelectNode: (node: SelectNode) => void
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const DraggableNodes: React.FC<DraggableNodesProps> = ({
  nodes,
  setNodes,
  toggleSelectNode,
}) => {
  const { lang } = useContext(LanguageContext)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    if (sourceIndex === destinationIndex) {
      return
    }

    const newNodes = reorder(
      nodes,
      result.source.index,
      result.destination.index
    )
    setNodes(newNodes)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-staging-nodes">
        {(dropProvided) => (
          <ul
            className={areaStyles.nodes}
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            {nodes.map(({ node, selected }, index) => (
              <Draggable draggableId={node.id} index={index} key={node.id}>
                {(dragProvided) => (
                  <li
                    className={node.__typename}
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                  >
                    <span
                      className={areaStyles.dragHandler}
                      aria-label={translate({
                        zh_hant: '拖拽',
                        zh_hans: '拖拽',
                        en: 'Drag',
                        lang,
                      })}
                    >
                      <Icon icon={IconDrag} color="greyLight" />
                    </span>

                    <SearchSelectNode
                      node={node}
                      selected={selected}
                      onClick={toggleSelectNode}
                      inStagingArea
                    />
                  </li>
                )}
              </Draggable>
            ))}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DraggableNodes

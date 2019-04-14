import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { ArticleDigest } from '~/components/ArticleDigest'
import { DropdownDigestArticle } from '~/components/ArticleDigest/DropdownDigest/__generated__/DropdownDigestArticle'
import { Icon } from '~/components/Icon'

import ICON_DELETE_BLACK_CIRCLE from '~/static/icons/delete-black-circle.svg?sprite'
import ICON_DRAG from '~/static/icons/drag.svg?sprite'

import CollectForm from './CollectForm'
import styles from './styles.css'

interface CollectionEditorProps {
  articles: DropdownDigestArticle[]
  onEdit: (articleIds: string[]) => void
}

const CollectionEditor = ({ articles, onEdit }: CollectionEditorProps) => {
  const onAdd = (articleId: string) => {
    const prevArticleIds = articles.map(({ id }) => id)
    onEdit([...prevArticleIds, articleId])
  }
  //  const applyDrag = (arr, dragResult) => {
  //   const { removedIndex, addedIndex, payload } = dragResult;
  //   if (removedIndex === null && addedIndex === null) return arr;

  //   const result = [...arr];
  //   let itemToAdd = payload;

  //   if (removedIndex !== null) {
  //     itemToAdd = result.splice(removedIndex, 1)[0];
  //   }

  //   if (addedIndex !== null) {
  //     result.splice(addedIndex, 0, itemToAdd);
  //   }

  //   return result;
  // };
  const onDragEnd = () => {
    console.log('')
  }

  return (
    <>
      <CollectForm onAdd={onAdd} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-1">
          {(dropProvided, dropSnapshot) => (
            <ul ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
              {articles.map((article, index) => (
                <Draggable draggableId={article.id} index={index}>
                  {(dragProvided, dragSnapshot) => (
                    <li
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      <span className="drag-handler" aria-label="拖拽">
                        <Icon
                          id={ICON_DRAG.id}
                          viewBox={ICON_DRAG.viewBox}
                          size="small"
                        />
                      </span>
                      <ArticleDigest.Dropdown article={article} hasArrow />
                      <button
                        type="button"
                        className="delete-handler"
                        aria-label="刪除"
                      >
                        <Icon
                          id={ICON_DELETE_BLACK_CIRCLE.id}
                          viewBox={ICON_DELETE_BLACK_CIRCLE.viewBox}
                          size="small"
                        />
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <style jsx>{styles}</style>
    </>
  )
}

export default CollectionEditor

import classNames from 'classnames'
import _isEqual from 'lodash/isEqual'
import React from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'

import { ArticleDigest, Icon } from '~/components'

import CollectForm from './CollectForm'
import styles from './styles.css'

import { DropdownDigestArticle } from '~/components/ArticleDigest/DropdownDigest/__generated__/DropdownDigestArticle'

interface State {
  articles: DropdownDigestArticle[]
}

interface Props {
  articles: DropdownDigestArticle[]
  onEdit: (articles: DropdownDigestArticle[]) => void
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

class CollectionEditor extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      articles: this.props.articles
    }
  }

  componentDidUpdate() {
    const { articles } = this.state
    const prevArticleIds = articles.map(({ id }) => id)
    const articleIds = this.props.articles.map(({ id }) => id)

    if (_isEqual(prevArticleIds, articleIds)) {
      return
    }

    this.setState({ articles: this.props.articles })
  }

  onAdd = (article: any) => {
    this.props.onEdit([...this.state.articles, article])
  }

  onDelete = (article: any) => {
    this.props.onEdit(this.state.articles.filter(({ id }) => id !== article.id))
  }

  onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    if (sourceIndex === destinationIndex) {
      return
    }

    const newItems = reorder(
      this.state.articles,
      result.source.index,
      result.destination.index
    )
    this.setState({ articles: newItems })
    this.props.onEdit(newItems)
  }

  render() {
    const { articles } = this.state

    return (
      <>
        <CollectForm onAdd={this.onAdd} />

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable-1">
            {(dropProvided, dropSnapshot) => (
              <ul ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                {articles.map((article, index) => (
                  <Draggable
                    draggableId={article.id}
                    index={index}
                    key={article.id}
                  >
                    {(dragProvided, dragSnapshot) => (
                      <li
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        className={classNames({
                          dragging: dragSnapshot.isDragging
                        })}
                      >
                        <span className="drag-handler" aria-label="拖拽">
                          <Icon.Drag />
                        </span>

                        <ArticleDigest.Dropdown
                          article={article}
                          titleTextSize="md-s"
                          borderRadius="xtight"
                          bgColor="grey-lighter"
                          spacing={['tight', 'tight']}
                          disabled
                          extraButton={
                            <ArticleDigest.Dropdown.OpenExternalLink
                              article={article}
                            />
                          }
                        />

                        <button
                          type="button"
                          className="delete-handler"
                          aria-label="刪除"
                          onClick={() => this.onDelete(article)}
                        >
                          <Icon.DeleteBlackCircle />
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}

                {dropProvided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        <style jsx>{styles}</style>
      </>
    )
  }
}

export default CollectionEditor

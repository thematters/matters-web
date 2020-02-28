import classNames from 'classnames'
import _isEqual from 'lodash/isEqual'
import React from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'

import { ArticleDigestDropdown, Button, Icon } from '~/components'

import CollectForm from './CollectForm'
import styles from './styles.css'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'

interface State {
  articles: ArticleDigestDropdownArticle[]
}

interface Props {
  articles: ArticleDigestDropdownArticle[]
  onEdit: (articles: ArticleDigestDropdownArticle[]) => void
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

class CollectionEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      articles: this.props.articles
    }
  }

  componentDidUpdate() {
    // only update state from prop only if added or deleted
    if (this.state.articles.length === this.props.articles.length) {
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
                          <Icon.Sort color="grey" />
                        </span>

                        <ArticleDigestDropdown
                          article={article}
                          titleTextSize="md-s"
                          disabled
                          extraButton={
                            <ArticleDigestDropdown.OpenExternalLink
                              article={article}
                            />
                          }
                          borderRadius="xtight"
                          bgColor="grey-lighter"
                          spacing={['tight', 'tight']}
                        />

                        <span className="delete-handler">
                          <Button
                            spacing={['base', 0]}
                            aria-label="刪除"
                            onClick={() => this.onDelete(article)}
                          >
                            <Icon.Clear color="black" />
                          </Button>
                        </span>
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

import {
  ArticleDigestDropdown,
  Button,
  IconClose16,
  Translate,
} from '~/components'
import { SelectArticle } from '~/components/SearchSelect/SearchingArea'
import { CustomStagingAreaProps } from '~/components/SearchSelect/StagingArea'

import ConfirmDialog from './ConfirmDialog'
import styles from './styles.css'

const ArticleCustomStagingArea = ({
  nodes: articles,
  setNodes: setArticles,
  hint,
}: CustomStagingAreaProps) => {
  const removeArticle = (article: SelectArticle) => {
    const newArticles = articles.filter((a) => a.node.id !== article.id)
    setArticles(newArticles)
  }

  const hasArticles = articles.length > 0

  if (!hasArticles) {
    return (
      <section className="customArticleArea">
        <section className="hint emptyHint">
          <Translate id={hint} />
        </section>

        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section className="customArticleArea">
      <p className="hint">
        <Translate en="Collected" zh_hans="已关联" zh_hant="已關聯" />
      </p>

      <ul className="nodes">
        {articles.map(
          ({ node }) =>
            node.__typename === 'Article' && (
              <li key={node.id} className="node">
                <ArticleDigestDropdown
                  article={node}
                  titleTextSize="md"
                  spacing={[0, 0]}
                  bgColor="none"
                  lineClamp={false}
                  disabled
                />
                <ConfirmDialog
                  removeArticle={() => {
                    removeArticle(node as SelectArticle)
                  }}
                >
                  {({ openDialog }) => (
                    <Button onClick={openDialog}>
                      <IconClose16 size="md-s" color="grey" />
                    </Button>
                  )}
                </ConfirmDialog>
              </li>
            )
        )}
      </ul>
      <style jsx> {styles}</style>
    </section>
  )
}

export default ArticleCustomStagingArea

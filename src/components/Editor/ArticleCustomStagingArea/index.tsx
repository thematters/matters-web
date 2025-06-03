import IconTimes from '@/public/static/icons/24px/times.svg'
import { ArticleDigestDropdown, Button, Icon, Translate } from '~/components'
import { SelectArticle } from '~/components/SearchSelect/SearchingArea'
import { CustomStagingAreaProps } from '~/components/SearchSelect/StagingArea'

import ConfirmDialog from './ConfirmDialog'
import styles from './styles.module.css'

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
      <section className={styles.customArticleArea}>
        <section className={`${styles.hint} ${styles.emptyHint}`}>
          {hint}
        </section>
      </section>
    )
  }

  return (
    <section className={styles.customArticleArea}>
      <p className={styles.hint}>
        <Translate en="Collected" zh_hans="已关联" zh_hant="已關聯" />
      </p>

      <ul className={styles.nodes}>
        {articles.map(
          ({ node }) =>
            node.__typename === 'Article' && (
              <li key={node.id} className={styles.node}>
                <ArticleDigestDropdown
                  article={node}
                  titleTextSize={16}
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
                      <Icon icon={IconTimes} size={20} color="grey" />
                    </Button>
                  )}
                </ConfirmDialog>
              </li>
            )
        )}
      </ul>
    </section>
  )
}

export default ArticleCustomStagingArea

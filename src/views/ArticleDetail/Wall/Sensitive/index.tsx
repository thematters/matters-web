import { FormattedMessage } from 'react-intl'

import { Button, TextIcon, Translate } from '~/components'

import styles from './styles.css'

interface SensitiveWallProps {
  sensitiveByAuthor: boolean
  sensitiveByAdmin: boolean
  expandAll: () => void
}

const SensitiveWall = ({
  sensitiveByAuthor,
  sensitiveByAdmin,
  expandAll,
}: SensitiveWallProps) => {
  return (
    <section className="container">
      <p className="bg-blur-content">
        <FormattedMessage
          defaultMessage="Caution: The following content may include age-restricted or explicit content, violence, gore, etc. Some may experience discomfort and psychological distress."
          description="src/views/ArticleDetail/Wall/Sensitive/index.tsx"
        />
      </p>
      <section className="message">
        <section className="header">
          <FormattedMessage
            defaultMessage="This post may include sensitive content and has been marked by the {actor} as restricted content. Are you sure you want to expand the full text?"
            description="src/views/ArticleDetail/Wall/Sensitive/index.tsx"
            values={{
              actor: sensitiveByAuthor ? (
                <Translate en="author" zh_hans="作者" zh_hant="作者" />
              ) : (
                <Translate en="site" zh_hans="站方" zh_hant="站方" />
              ),
            }}
          />
        </section>
        <section className="content">
          <FormattedMessage
            defaultMessage="Caution: The following content may include age-restricted or explicit content, violence, gore, etc. Some may experience discomfort and psychological distress."
            description="src/views/ArticleDetail/Wall/Sensitive/index.tsx"
          />
        </section>
        <section className="footer">
          <Button
            spacing={['xtight', 'base']}
            bgColor="green"
            onClick={expandAll}
          >
            <TextIcon color="white" weight="md" size="md">
              <Translate
                en="Expand All"
                zh_hans="展开全文"
                zh_hant="展開全文"
              />
            </TextIcon>
          </Button>
        </section>
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

export default SensitiveWall

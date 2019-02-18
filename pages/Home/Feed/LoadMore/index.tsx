import styles from './styles.css'

import { Button, Translate } from '~/components'

export default ({ onClick }: { onClick: () => void }) => (
  <div className="container">
    <Button
      bgColor="green-lighter"
      outlineColor="green"
      spacing="loose"
      onClick={onClick}
    >
      <Translate
        translations={{
          zh_hans: '查看更多',
          zh_hant: '查看更多'
        }}
      />
    </Button>
    <style jsx>{styles}</style>
  </div>
)

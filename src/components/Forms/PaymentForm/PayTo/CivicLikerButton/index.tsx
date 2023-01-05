import { EXTERNAL_LINKS } from '~/common/enums'
import { Button, IconExternalLink16, TextIcon, Translate } from '~/components'

import styles from './styles.css'

type CivicLikerButtonProps = {
  likerId: string
}

const CivicLikerButton: React.FC<CivicLikerButtonProps> = ({ likerId }) => {
  return (
    <section className="container">
      <Button
        bgColor="white"
        size={['100%', '2rem']}
        htmlHref={EXTERNAL_LINKS.CIVIC_LIKER(likerId)}
        htmlTarget="_blank"
      >
        <TextIcon
          color="likecoin-green"
          size="md"
          textPlacement="left"
          icon={<IconExternalLink16 />}
        >
          <Translate
            zh_hant="成為讚賞公民支持作者"
            zh_hans="成为赞赏公民支持作者"
            en="Support author as Liker citizen"
          />
        </TextIcon>
      </Button>

      <style jsx>{styles}</style>
    </section>
  )
}

export default CivicLikerButton

import IconExternal from '@/public/static/icons/24px/external.svg'
import { EXTERNAL_LINKS } from '~/common/enums'
import { Button, Icon, TextIcon, Translate } from '~/components'

import styles from './styles.module.css'

type CivicLikerButtonProps = {
  likerId: string
}

const CivicLikerButton: React.FC<CivicLikerButtonProps> = ({ likerId }) => {
  return (
    <section className={styles.container}>
      <Button
        bgColor="white"
        size={['100%', '2rem']}
        htmlHref={EXTERNAL_LINKS.CIVIC_LIKER(likerId)}
        htmlTarget="_blank"
      >
        <TextIcon
          color="likecoinGreen"
          size={16}
          placement="left"
          icon={<Icon icon={IconExternal} />}
        >
          <Translate
            zh_hant="成為讚賞公民支持作者"
            zh_hans="成为赞赏公民支持作者"
            en="Support author as Liker citizen"
          />
        </TextIcon>
      </Button>
    </section>
  )
}

export default CivicLikerButton

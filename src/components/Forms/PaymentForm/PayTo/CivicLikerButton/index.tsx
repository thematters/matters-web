import {
  Button,
  IconExternalLink16,
  TextIcon,
  Translate,
  withIcon,
} from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'

import { ReactComponent as IconLikeCoin } from '@/public/static/icons/likecoin.svg'

import styles from './styles.css'

type CivicLikerButtonProps = {
  likerId: string
}

const CivicLikerButton: React.FC<CivicLikerButtonProps> = ({ likerId }) => {
  return (
    <section className="container">
      {withIcon(IconLikeCoin)({ size: 'xl-m' })}

      <Button
        bgColor="white"
        borderColor="likecoin-green"
        size={['100%', '3rem']}
        htmlHref={EXTERNAL_LINKS.CIVIC_LIKER(likerId)}
        htmlTarget="_blank"
      >
        <TextIcon
          color="likecoin-green"
          size="md"
          weight="md"
          textPlacement="left"
          icon={<IconExternalLink16 size="xs" />}
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

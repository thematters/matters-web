import { ReactComponent as IconPlus } from '@/public/static/icons/24px/plus.svg'
import { Card, Icon, TextIcon, Translate } from '~/components'
import { UserDigestMiniUserFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface InviteEmailProps {
  user: UserDigestMiniUserFragment
  onClick: (user: UserDigestMiniUserFragment) => void
}

const InviteEmail: React.FC<InviteEmailProps> = ({ user, onClick }) => {
  return (
    <Card spacing={['base', 'base']} onClick={() => onClick(user)}>
      <section className={styles.addEmail}>
        <TextIcon icon={<Icon icon={IconPlus} />} color="green" size="md">
          <Translate
            zh_hant="傳送邀請到"
            zh_hans="发送邀请到"
            en="Send an invitation to"
          />
        </TextIcon>

        <span className={styles.content}>&nbsp;{user.displayName}</span>
      </section>
    </Card>
  )
}

export default InviteEmail

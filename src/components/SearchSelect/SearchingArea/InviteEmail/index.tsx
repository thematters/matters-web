import { Card, IconAdd16, TextIcon, Translate } from '~/components'

import styles from './styles.css'

import { UserDigestMiniUser } from '~/components/UserDigest/Mini/__generated__/UserDigestMiniUser'

interface InviteEmailProps {
  user: UserDigestMiniUser
  onClick: (user: UserDigestMiniUser) => void
}

const InviteEmail: React.FC<InviteEmailProps> = ({ user, onClick }) => {
  return (
    <Card spacing={['base', 'base']} onClick={() => onClick(user)}>
      <section className="add-email">
        <TextIcon icon={<IconAdd16 />} color="green" size="md">
          <Translate
            zh_hant="傳送邀請到"
            zh_hans="发送邀请到"
            en="Send an invitation to"
          />
        </TextIcon>

        <span className="content">&nbsp;{user.displayName}</span>

        <style jsx> {styles}</style>
      </section>
    </Card>
  )
}

export default InviteEmail

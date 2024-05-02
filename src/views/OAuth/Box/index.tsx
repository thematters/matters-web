import { Avatar } from '~/components/Avatar'

import styles from './styles.module.css'

interface Props {
  avatar?: string | null
  title?: React.ReactNode | string
  titleAlign?: 'left' | 'center'
}

export const Box: React.FC<React.PropsWithChildren<Props>> = ({
  avatar,
  title,
  titleAlign = 'center',
  children,
}) => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <Avatar size={72} src={avatar} />
        <h1 className={titleAlign}>{title}</h1>
      </header>

      {children}
    </section>
  )
}

import { Avatar } from '~/components/Avatar'

import styles from './styles.css'

interface Props {
  avatar?: string
  title?: React.ReactNode | string
  titleAlign?: 'left' | 'center'
}

export const Box: React.FC<Props> = ({
  avatar,
  title,
  titleAlign = 'center',
  children,
}) => {
  return (
    <section className="container">
      <header>
        <Avatar size="xxl" src={avatar} />
        <h1 className={titleAlign}>{title}</h1>
      </header>

      {children}

      <style jsx>{styles}</style>
    </section>
  )
}

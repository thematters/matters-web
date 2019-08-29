import { Avatar } from '~/components/Avatar'

import styles from './styles.css'

interface Props {
  avatar: string
  title: React.ReactNode | string
  titleAlign?: 'left' | 'center'
}

export const Box: React.FC<Props> = ({
  avatar,
  title,
  titleAlign = 'center',
  children
}) => {
  return (
    <section className="container l-col-4 l-col-sm-6 l-offset-sm-1 l-col-md-4 l-offset-md-2 l-col-lg-6 l-offset-lg-3">
      <header>
        <Avatar size="large" src={avatar} />
        <h1 className={titleAlign}>{title}</h1>
      </header>

      {children}

      <style jsx>{styles}</style>
    </section>
  )
}

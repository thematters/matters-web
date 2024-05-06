import { SVGProps } from 'react'

import { TextIcon, withIcon } from '~/components'

import styles from './styles.module.css'

type SectionHeadProps = {
  icon: React.FC<SVGProps<HTMLOrSVGElement>>
  title: React.ReactNode
}

const SectionHead: React.FC<React.PropsWithChildren<SectionHeadProps>> = ({
  icon,
  title,
  children,
}) => {
  return (
    <section className={styles.head}>
      <h2 className={styles.h2}>
        <TextIcon
          icon={withIcon(icon)({ size: 24 })}
          size={18}
          spacing={12}
          weight="medium"
        >
          {title}
        </TextIcon>
      </h2>

      {children}
    </section>
  )
}

export default SectionHead

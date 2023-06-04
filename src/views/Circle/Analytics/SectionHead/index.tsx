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
          icon={withIcon(icon)({ size: 'md' })}
          size="xm"
          spacing="tight"
          weight="md"
        >
          {title}
        </TextIcon>
      </h2>

      {children}
    </section>
  )
}

export default SectionHead

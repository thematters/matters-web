import { SVGProps } from 'react'

import { TextIcon, withIcon } from '~/components'

import styles from './styles.css'

type SectionHeadProps = {
  icon: React.FC<SVGProps<HTMLOrSVGElement>>
  title: React.ReactNode
}

const SectionHead: React.FC<SectionHeadProps> = ({ icon, title }) => {
  return (
    <section className="head">
      <TextIcon
        icon={withIcon(icon)({ size: 'md' })}
        size="xm"
        spacing="tight"
        weight="md"
      >
        {title}
      </TextIcon>

      <style jsx>{styles}</style>
    </section>
  )
}

export default SectionHead

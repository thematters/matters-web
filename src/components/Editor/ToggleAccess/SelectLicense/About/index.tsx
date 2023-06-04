import { IconExternalLink16 } from '~/components'

import styles from './styles.css'

const About = ({ desc, url }: { desc: string; url: string }) => {
  return (
    <>
      <a href={url} target="_blank">
        {desc}
      </a>
      <IconExternalLink16 color="grey" size="xs" />
      <style jsx>{styles}</style>
    </>
  )
}

export default About

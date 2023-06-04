import styles from './styles.css'

const About = ({ desc, url }: { desc: string; url: string }) => {
  return (
    <>
      <a href={url} target="_blank">
        {desc}
      </a>
      <style jsx>{styles}</style>
    </>
  )
}

export default About

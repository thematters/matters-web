import styles from './styles.css';

const Content: React.FC = ({ children }) => (
  <section>
    {children}

    <style jsx>{styles}</style>
  </section>
);

export default Content;

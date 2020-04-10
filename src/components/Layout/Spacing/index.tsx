import styles from './styles.css';

const Spacing: React.FC = ({ children }) => {
  return (
    <section>
      {children}

      <style jsx>{styles}</style>
    </section>
  );
};

export default Spacing;

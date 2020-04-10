import styles from './styles.css';

export interface HeaderProps {
  label?: string | React.ReactNode;
  htmlFor?: string;
  extraButton?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ label, htmlFor, extraButton }) => {
  if (!label && !extraButton) {
    return null;
  }

  return (
    <header>
      <label htmlFor={htmlFor}>{label}</label>

      {extraButton}

      <style jsx>{styles}</style>
    </header>
  );
};

export default Header;

import { FC } from 'react';
import { Link } from 'react-router-dom';

import companyLogoImg from '../../images/logo/qencode-logo.webp';

import styles from './CompanyLogo.module.scss';

export const CompanyLogo: FC = () => {
  return (
    <Link to="/">
      <img
        className={styles.companyLogo}
        src={companyLogoImg}
        alt="qencode-company-logo"
      />
    </Link>
  );
};

// eslint-disable-next-line import/no-extraneous-dependencies
import { Outlet } from 'react-router-dom';
import { FC } from 'react';

import { CompanyLogo } from '../CompanyLogo';

import styles from './LoginApp.module.scss';

export const LoginApp: FC = () => {
  return (
    <div className={styles.loginApp}>
      <CompanyLogo />

      <Outlet />
    </div>
  );
};

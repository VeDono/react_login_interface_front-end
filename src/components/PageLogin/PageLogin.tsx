import { FC } from 'react';

import { BtnLoginBy } from '../BtnLoginBy';
import { LoginForm } from '../LoginForm';

import styles from './PageLogin.module.scss';
import googleIcon from '../../images/icons/google-icon.png';
import githubIcon from '../../images/icons/github-icon.png';

export const PageLogin: FC = () => {
  return (
    <div className={styles.pageLogin}>
      <h2 className={styles.pageLogin__title}>Log in to your account</h2>

      <div className={styles.pageLogin__btnsSSO}>
        <BtnLoginBy>
          <img
            className={`${styles['pageLogin__btnsSSO-img']}`}
            src={googleIcon}
            alt="service-logo-icon"
          />
          <span className={`${styles['pageLogin__btnsSSO-title']}`}>
            Google
          </span>
        </BtnLoginBy>

        <BtnLoginBy>
          <img
            className={`${styles['pageLogin__btnsSSO-img']}`}
            src={githubIcon}
            alt="service-logo-icon"
          />
          <span className={`${styles['pageLogin__btnsSSO-title']}`}>
            Github
          </span>
        </BtnLoginBy>
      </div>

      <div className={styles.pageLogin__divider}>
        <span className={`${styles['pageLogin__divider-text']}`}>OR</span>
      </div>

      <LoginForm />
    </div>
  );
};

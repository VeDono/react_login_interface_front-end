// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, useNavigate } from 'react-router-dom';
import { FC, useState } from 'react';
import cn from 'classnames';
import { AxiosError } from 'axios';

import styles from './PagePasswordForgot.module.scss';
import { BtnSubmit } from '../BtnSubmit';
import { isEmailValid } from '../../utils/isEmailValid';
import { PasswordResetData } from '../../types/PasswordResetData';
import { authApiClient } from '../../api/authApiClient';

export const PagePasswordForgot: FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [isEmailWrong, setIsEmailWrong] = useState(false);

  const navigate = useNavigate();

  const emailInputOnBlur = () => {
    setIsEmailWrong(!isEmailValid(emailInput));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const passwordResetData: PasswordResetData = {
      email: emailInput,
    };

    authApiClient
      .resetPassword(passwordResetData)
      .then((response) => {
        if (response.status === 200) {
          // eslint-disable-next-line no-alert
          alert(response.data.detail);
          navigate('/new-password');
        }
      })
      // eslint-disable-next-line no-alert
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          // eslint-disable-next-line no-alert
          alert('Email is not found. Please, check entered email 😥');
        } else if (err.response?.status === 429) {
          // eslint-disable-next-line no-alert
          alert('You make to many requests per short time 😥');
        } else {
          // eslint-disable-next-line no-alert
          alert(err.message);
        }
      });
  };

  return (
    <div className={styles.pagePasswordForgot}>
      <h2 className={styles.pagePasswordForgot__title}>Forgot Password?</h2>

      <form
        onSubmit={handleSubmit}
        className={styles.pagePasswordForgot__forgotForm}
      >
        <div className={styles.pagePasswordForgot__emailContainer}>
          <span
            className={cn(styles.pagePasswordForgot__emailWrongMessage, {
              [styles['pagePasswordForgot__emailWrongMessage--show']]:
                isEmailWrong,
            })}
          >
            Invalid email
          </span>

          <input
            className={cn([styles['pagePasswordForgot__forgotForm-input']], {
              [styles['pagePasswordForgot__forgotForm-input--wrong']]:
                isEmailWrong,
            })}
            type="email"
            required
            onBlur={emailInputOnBlur}
            onChange={(event) => setEmailInput(event.target.value)}
            placeholder="Enter your email"
            autoComplete="current-email"
          />
        </div>

        <BtnSubmit>Send</BtnSubmit>

        <Link to="/">
          <button
            type="button"
            className={styles.pagePasswordForgot__btnCancel}
          >
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
};

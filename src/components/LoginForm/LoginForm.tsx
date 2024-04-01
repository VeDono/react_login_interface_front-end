// eslint-disable-next-line import/no-extraneous-dependencies
import { AxiosError, AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { FC, useState } from 'react';
import cn from 'classnames';

import { authApiClient } from '../../api/authApiClient';
import { LoginData } from '../../types/LoginData';

import styles from './LoginForm.module.scss';

import eyeIcon from '../../images/icons/input-eye-icon.svg';
import eyeActiveIcon from '../../images/icons/input-eye-icon-active.svg';
import { BtnSubmit } from '../BtnSubmit';

import { isEmailValid } from '../../utils/isEmailValid';
import { isPasswordValid } from '../../utils/isPasswordValid';

export const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isEmailWrong, setIsEmailWrong] = useState<boolean | null>(null);
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);

  // eslint-disable-next-line prettier/prettier
  const isPasswordAvailable = isEmailWrong !== null && !isEmailWrong && !isEmailWrong;

  const emailInputOnBlur = () => {
    setIsEmailWrong(!isEmailValid(emailInput));
  };

  const passwordInputOnBlur = () => {
    setIsPasswordWrong(!isPasswordValid(passwordInput));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginData: LoginData = {
      email: emailInput,
      password: passwordInput,
    };

    if (isEmailValid(emailInput) && isPasswordValid(passwordInput)) {
      authApiClient
        .login(loginData)
        .then((response: AxiosResponse) => {
          localStorage.setItem('token', response.data.access_token);
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 401 || err.response?.status === 422) {
            // eslint-disable-next-line no-alert
            return alert('Password or email invalid 😥');
          }

          // eslint-disable-next-line no-alert
          return alert(err);
        });
    } else {
      emailInputOnBlur();
      passwordInputOnBlur();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <div className={styles.loginForm__emailContainer}>
        <span
          className={cn(styles.loginForm__emailWrongMessage, {
            [styles['loginForm__emailWrongMessage--show']]: isEmailWrong,
          })}
        >
          Invalid email
        </span>

        <input
          className={cn(
            styles.loginForm__input,
            styles['loginForm__input-email'],
            {
              [styles['loginForm__input-email--wrong']]: isEmailWrong,
            },
          )}
          type="email"
          value={emailInput}
          required
          onBlur={emailInputOnBlur}
          onChange={(event) => setEmailInput(event.target.value)}
          placeholder="Work email"
          autoComplete="current-email"
        />
      </div>

      <div
        className={cn(styles.loginForm__passwordContainer, {
          [styles['loginForm__passwordContainer--show']]: isPasswordAvailable,
        })}
      >
        <span
          className={cn(styles.loginForm__passwordWrongMessage, {
            [styles['loginForm__passwordWrongMessage--show']]: isPasswordWrong,
          })}
        >
          Password less than 8 symbols
        </span>

        <input
          className={cn(
            styles.loginForm__input,
            [[styles['loginForm__input-password']]],
            {
              [styles['loginForm__input-password--wrong']]: isPasswordWrong,
            },
          )}
          type={cn({ text: showPassword, password: !showPassword })}
          value={passwordInput}
          autoComplete="current-password"
          required
          onBlur={passwordInputOnBlur}
          onChange={(event) => setPasswordInput(event.target.value)}
          placeholder="Password"
          disabled={!isPasswordAvailable}
        />

        <button
          type="button"
          onClick={handleShowPassword}
          className={styles.loginForm__eyeIcon}
        >
          <img
            src={showPassword ? eyeActiveIcon : eyeIcon}
            alt="toggle visibility"
          />
        </button>
      </div>

      <Link
        to="recovery-password"
        className={cn(styles.loginForm__forgotPassword, {
          [styles['loginForm__forgotPassword--show']]: isPasswordAvailable,
        })}
      >
        Forgot your password?
      </Link>

      <BtnSubmit>Log in to Qencode</BtnSubmit>

      <p className={styles.loginForm__signUp}>
        Is your company new to Qencode?{' '}
        <span className={`${styles['loginForm__signUp-link']}`}>Sign up</span>
      </p>
    </form>
  );
};

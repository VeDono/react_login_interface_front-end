import { FC, useState } from 'react';
import cn from 'classnames';

import styles from './PagePasswordCreate.module.scss';

import eyeIcon from '../../images/icons/input-eye-icon.svg';
import eyeActiveIcon from '../../images/icons/input-eye-icon-active.svg';
import { BtnSubmit } from '../BtnSubmit';
import { isPasswordValid } from '../../utils/isPasswordValid';

import { authApiClient } from '../../api/authApiClient';
import { NewPasswordData } from '../../types/NewPasswordData';

export const PagePasswordCreate: FC = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const [showPassword, setShowPassword] = useState(false);
  const [enteredPasswordInput, setEnteredPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [isEnteredPasswordWrong, setIsEnteredPasswordWrong] = useState(false);
  const [isConfirmPasswordWrong, setIsConfirmPasswordWrong] = useState(false);

  const enteredPasswordInputOnBlur = () => {
    setIsEnteredPasswordWrong(!isPasswordValid(enteredPasswordInput));
  };

  const confirmPasswordInputOnBlur = () => {
    setIsConfirmPasswordWrong(!isPasswordValid(confirmPasswordInput));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = urlParams.get('token');
    const secret = urlParams.get('secret');

    if (!token || !secret) {
      // eslint-disable-next-line no-alert
      alert(
        'URL for creating new password invalid 😥\n\nCheck you email for currect URL 👀',
      );

      return;
    }

    if (enteredPasswordInput !== confirmPasswordInput) {
      // eslint-disable-next-line no-alert
      alert('Passwords do not match');

      return;
    }

    const newPasswordData: NewPasswordData = {
      token,
      secret,
      password: enteredPasswordInput,
      password_confirm: confirmPasswordInput,
    };

    if (
      // eslint-disable-next-line prettier/prettier
      isPasswordValid(enteredPasswordInput)
      // eslint-disable-next-line prettier/prettier
      && isPasswordValid(confirmPasswordInput)
    ) {
      authApiClient
        .setNewPassword(newPasswordData)
        .then((response) => {
          if (response.data.error === 0) {
            // eslint-disable-next-line no-alert
            alert('Password reset successfully 🤝');
          } else {
            // eslint-disable-next-line no-alert
            alert(response.data.detail);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert(error);
        });
    } else {
      setIsEnteredPasswordWrong(!isPasswordValid(enteredPasswordInput));
      setIsConfirmPasswordWrong(!isPasswordValid(confirmPasswordInput));
    }
  };

  return (
    <div className={styles.pagePasswordCreate}>
      <h2 className={styles.pagePasswordCreate__title}>Create new Password?</h2>

      <form
        onSubmit={handleSubmit}
        className={styles.pagePasswordCreate__newPasswordForm}
      >
        <input
          type="text"
          className={
            styles['pagePasswordCreate__newPasswordForm-input--hidden']
          }
          autoComplete="username"
        />

        <p
          className={`${styles['pagePasswordCreate__newPasswordForm-containerSlug']}`}
        >
          Password
        </p>

        <div
          className={`${styles['pagePasswordCreate__newPasswordForm-passwordContainer']}
          ${styles['pagePasswordCreate__newPasswordForm-passwordContainer--enter']}`}
        >
          <span
            className={cn(
              styles[
                'pagePasswordCreate__newPasswordForm-passwordWrongMessage'
              ],
              {
                [styles[
                  'pagePasswordCreate__newPasswordForm-passwordWrongMessage--show'
                ]]: isEnteredPasswordWrong,
              },
            )}
          >
            Password less than 8 symbols
          </span>

          <input
            className={cn(styles['pagePasswordCreate__newPasswordForm-input'], {
              [styles['pagePasswordCreate__newPasswordForm-input--wrong']]:
                isEnteredPasswordWrong,
            })}
            type={cn({ text: showPassword, password: !showPassword })}
            placeholder="Password"
            autoComplete="new-password"
            value={enteredPasswordInput}
            required
            onBlur={enteredPasswordInputOnBlur}
            onChange={(event) => setEnteredPasswordInput(event.target.value)}
          />

          <button
            type="button"
            onClick={handleShowPassword}
            className={`${styles['pagePasswordCreate__newPasswordForm-eyeIcon']}`}
          >
            <img
              src={showPassword ? eyeActiveIcon : eyeIcon}
              alt="toggle visibility"
            />
          </button>
        </div>

        <p
          className={`${styles['pagePasswordCreate__newPasswordForm-containerSlug']}`}
        >
          Confirm Password
        </p>

        <div
          className={`${styles['pagePasswordCreate__newPasswordForm-passwordContainer']}
          ${styles['pagePasswordCreate__newPasswordForm-passwordContainer--confirm']}`}
        >
          <span
            className={cn(
              styles[
                'pagePasswordCreate__newPasswordForm-passwordWrongMessage'
              ],
              {
                [styles[
                  'pagePasswordCreate__newPasswordForm-passwordWrongMessage--show'
                ]]: isConfirmPasswordWrong,
              },
            )}
          >
            Password less than 8 symbols
          </span>

          <input
            className={cn(styles['pagePasswordCreate__newPasswordForm-input'], {
              [styles['pagePasswordCreate__newPasswordForm-input--wrong']]:
                isConfirmPasswordWrong,
            })}
            type={cn({ text: showPassword, password: !showPassword })}
            placeholder="Password"
            autoComplete="new-password"
            value={confirmPasswordInput}
            onChange={(event) => setConfirmPasswordInput(event.target.value)}
            onBlur={confirmPasswordInputOnBlur}
            required
          />

          <button
            type="button"
            onClick={handleShowPassword}
            className={`${styles['pagePasswordCreate__newPasswordForm-eyeIcon']}`}
          >
            <img
              src={showPassword ? eyeActiveIcon : eyeIcon}
              alt="toggle visibility"
            />
          </button>
        </div>

        <BtnSubmit>Reset Password</BtnSubmit>
      </form>
    </div>
  );
};

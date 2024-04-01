import { FC, ReactNode } from 'react';

import styles from './BtnSubmit.module.scss';

interface Props {
  children: ReactNode;
}

export const BtnSubmit: FC<Props> = ({ children }) => {
  return (
    <button type="submit" className={styles.btnSubmit}>
      {children}
    </button>
  );
};

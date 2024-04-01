import { FC, ReactNode } from 'react';

import styles from './BtnLoginBy.module.scss';

interface Props {
  children: ReactNode;
}

export const BtnLoginBy: FC<Props> = ({ children }) => {
  return (
    <button className={styles.btnLoginBy} type="button">
      {children}
    </button>
  );
};

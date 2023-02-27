import styles from './NotFound.module.scss';
import NotFoundImage from './../../images/page-not-found.jpg';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={classNames({
      [styles.Not_Found__container]: true
    })}>
      <div className={styles.Not_Found__voltar}>
        <button onClick={() => navigate(-1)}>
          {'<<'}
        </button>
      </div>
      <img className={styles.Not_Found__image} src={NotFoundImage} alt="página não encontrada" />
    </div>
  );
}
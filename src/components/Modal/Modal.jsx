import { useEffect } from 'react';
import css from 'styles.module.css';

export const Modal = ({ photo, onCloseModal }) => {
  useEffect(() => {
    const onKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  return (
    <div onClick={onOverlayClick} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={photo.webformatURL} alt={photo.tags} />
      </div>
    </div>
  );
};

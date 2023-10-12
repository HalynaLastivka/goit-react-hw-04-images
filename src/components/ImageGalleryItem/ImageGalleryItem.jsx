import css from 'styles.module.css';

export const ImageGalleryItem = ({ photos, onOpenModal }) => {
  const handleImageClick = photo => () => {
    onOpenModal(photo);
  };

  const arrayPhotos = photos;
  return (
    <ul className={css.ImageGallery}>
      {arrayPhotos.map(photo => {
        return (
          <li key={photo.id} className={css.ImageGalleryItem}>
            <img
              className={css.ImageGalleryItemimage}
              src={photo.webformatURL}
              alt={photo.tags}
              onClick={handleImageClick(photo)}
            />
          </li>
        );
      })}
    </ul>
  );
};

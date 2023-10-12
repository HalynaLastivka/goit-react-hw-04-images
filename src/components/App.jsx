import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';
import Loader from './Loader/Loader';
import { fetchFinder } from 'services/api';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import css from 'styles.module.css';

export const App = () => {
  const [photos, setPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedPostId, setSearchedPostId] = useState(null);
  const [page, setPage] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [modal, setModal] = useState({ isOpen: false, data: null });

  useEffect(() => {
    if (searchedPostId !== null) {
      fetchFinderPhoto();
    }
  }, [searchedPostId]);

  const handleSearchSubmit = event => {
    event.preventDefault();

    const searchedPostId = event.currentTarget.elements.searchPostId.value;
    if (searchedPostId.trim() !== '') {
      setSearchedPostId(searchedPostId);
      setPage(0);
      setPhotos(null);
      setTotalHits(0);

      event.currentTarget.reset();
    } else {
      alert('Поле search не може бути порожнім');
    }
  };

  const fetchFinderPhoto = async () => {
    try {
      setIsLoading(true);

      const photosArray = await fetchFinder(searchedPostId, page + 1);

      if (photosArray.hits) {
        setPage(prevState => prevState + 1);
        setPhotos(prevState => [
          ...(prevState && prevState.length > 0 ? prevState : []),
          ...photosArray.hits,
        ]);
        setTotalHits(photosArray.total);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onOpenModal = modalData => {
    setModal({
      isOpen: true,
      data: modalData,
    });
  };

  const onCloseModal = () => {
    setModal({
      isOpen: false,
      data: null,
    });
  };

  const showPosts = Array.isArray(photos) && photos.length > 0;

  const showLoad = page * 12 < totalHits ? true : false;

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchSubmit} searchPostId={searchedPostId} />
      {isLoading && <Loader />}
      {error && <p className="error">{error}</p>}
      {showPosts ? (
        <ImageGalleryItem photos={photos} onOpenModal={onOpenModal} />
      ) : (
        searchedPostId && !isLoading && <p>Not found :(</p>
      )}
      {showPosts && showLoad && <Button onClick={fetchFinderPhoto} />}

      {modal.isOpen && <Modal onCloseModal={onCloseModal} photo={modal.data} />}
    </div>
  );
};

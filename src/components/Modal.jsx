import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { addMovie, getMovie, updateMovie } from "../store/slice/movieThunk";
import { useDispatch, useSelector } from "react-redux";

const Modal = ({ onClose, movieId }) => {
  const { movie } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    rating: 0,
    image: "",
  });

  useEffect(() => {
    if (movieId) {
      dispatch(getMovie(movieId));
    }
  }, [dispatch, movieId]);

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        rating: movie.rating,
        image: movie.image,
      });
    }
  }, [movie]);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };

      reader.readAsDataURL(file);

      console.log(reader.result, "axaxaxax");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (movie) {
      dispatch(updateMovie({ movieId, formData }));
    } else {
      dispatch(addMovie(formData));
    }
    onClose();
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <Title>Добавить фильм</Title>
        <Form onSubmit={handleSubmit}>
          <FormLabel>Название</FormLabel>
          <FormInput
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <FormLabel>Рейтинг</FormLabel>
          <FormInput
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />

          <FormLabel htmlFor="upload-photo">
            Фото
            <FormInput
              type="file"
              id="upload-photo"
              accept="image/*"
              name="file"
              onChange={handleChangeImage}
              style={{ display: "none" }}
            />
            {formData.image ? (
              <ImageContainer>
                <img
                  className="image"
                  src={formData.image}
                  alt="Selected"
                  style={{ maxWidth: "300px" }}
                />
              </ImageContainer>
            ) : (
              <>
                <IoCloudUpload style={{ color: "black" }} />
              </>
            )}
          </FormLabel>

          <ButtonContainer>
            <CancelButton onClick={onClose}>Отмена</CancelButton>

            <AddButton type="submit">Добавить</AddButton>
          </ButtonContainer>
        </Form>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func,
  movieId: PropTypes.number,
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Title = styled.h4`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333333;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: #333;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-right: 0.5rem;
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

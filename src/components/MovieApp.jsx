import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, getMovies } from "../store/slice/movieThunk";
import Header from "../layout/Header";
import styled from "styled-components";
import Modal from "./Modal";

const MovieApp = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingMovieId, setEditingMovieId] = useState(null);

  const { movies } = useSelector((state) => state.movies);

  console.log(movies);
  const toggleModalHandler = (movieId) => {
    setOpenEditModal((prev) => !prev);
    if (movieId) {
      setEditingMovieId(movieId);
    } else {
      setEditingMovieId(null);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const deleteHandler = (id) => dispatch(deleteMovie(id));

  return (
    <div>
      <Header />

      {openEditModal && (
        <Modal onClose={toggleModalHandler} movieId={editingMovieId} />
      )}

      <MoviesContainer>
        {movies.map((movie) => (
          <MovieCard key={movie.id}>
            <MovieImage src={movie.image} />
            <MovieContent>
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieRating>{movie.rating}</MovieRating>
            </MovieContent>
            <ButtonsContainer>
              <Button onClick={() => deleteHandler(movie.id)}>Delete</Button>
              <Button onClick={() => toggleModalHandler(movie.id)}>
                Update
              </Button>
            </ButtonsContainer>
          </MovieCard>
        ))}
      </MoviesContainer>
    </div>
  );
};

export default MovieApp;

const MoviesContainer = styled.div`
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const MovieCard = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const MovieContent = styled.div`
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MovieTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const MovieRating = styled.p`
  font-size: 14px;
  color: #666;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

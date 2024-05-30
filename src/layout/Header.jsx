import { useState } from "react";
import styled from "styled-components";
import Modal from "../components/Modal";

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModalhandler = () => setIsOpenModal((prev) => !prev);

  return (
    <HeaderWrapper>
      <Title>Movie app</Title>

      {isOpenModal && <Modal onClose={toggleModalhandler} />}

      <AddButton onClick={toggleModalhandler}>Add Movie</AddButton>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

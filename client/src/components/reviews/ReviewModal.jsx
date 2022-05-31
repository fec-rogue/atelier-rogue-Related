import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';


const Modal = styled.div`
  opacity: 1;
  flex: 1;
  z-index: 1;
  justifyContent: undefined;
  alignItems: undefined;
  background-color: #E8EEEE;
  position: absolute;
  left: 35%;
  width: 600px;
  height: 500px;
  backdropColor: red;
  backdropOpacity: 1
  `;

const Exit = styled.button`
  display: block;
  margin-left: auto;
  margin-right: 0;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
`;

const ReviewModal = ({setModal}) => {

  const handleClick = (e) => {
    setModal(false);
  }

  return (
    <Modal>
      <Exit type="button" onClick={handleClick}>X</Exit>
      <Title>Add a Review</Title>
    </Modal>
  )
}

export default ReviewModal;
import styled from 'styled-components';
import React, { useEffect, useState, useContext, useRef } from 'react';
import {DescriptionsContext} from './Overview.jsx';
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";


//TODO:
// hovering over item with magnifying glass will magnify image
// clicking expanding will expand image
// expanded image will still be able to scroll through image gallery

function MainCarousel() {

  const {displayed} = useContext(DescriptionsContext);
  const {expanded, setExpanded} = useContext(DescriptionsContext);
  const {curPhoto, setCurPhoto} = useContext(DescriptionsContext);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (curPhoto !== '') {
      setIndex(curPhoto);
    }
  }, [curPhoto])

  // buttons should disappear when last img is reached// first img is reached
  // buttons should work with left and right arrow keys
  const updateIndex = (indx) => {
    if (indx < 0) {
      setIndex(displayed.photos.length-1);
      setCurPhoto(displayed.photos.length-1)
    } else if (indx > displayed.photos.length-1) {
      setIndex(0)
      setCurPhoto(0);
    } else {
      setIndex(indx);
      setCurPhoto(indx);
    }
  };

  const handleExpanded = () => {
    setExpanded(!expanded);
  }

  return (Object.keys(displayed).length === 0) ?
  (null) :
  (<CarouselDiv>
       <InnerDiv>
          <PrevDiv>
            <UpDownBtns onClick={() => {updateIndex(index-1)}} >Prev</UpDownBtns>
          </PrevDiv>
          <ImgContainer >
            <CarouselItem
              src={displayed.photos[curPhoto].url}
              onClick={handleExpanded}>
            </CarouselItem>
          </ImgContainer>
          <NextDiv>
            <UpDownBtns onClick={() => {updateIndex(index+1)}}>Next</UpDownBtns>
          </NextDiv>
        </InnerDiv>
    </CarouselDiv>
  )

};

const ImgContainer = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
`;
const CarouselDiv = styled.div`
  max-width: 100%;
  height: auto;
  transition: all ease-in-out 0.5s;
`;
const InnerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const CarouselItem = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: all ease-in-out 0.03s;
  &:hover {
    cursor: zoom-in;
  }
`;

const PrevDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
  transition: all ease-in-out 0.1s;
  position: absolute;
  top: 50%;
  text-align: center;
  right: 16px;

`;
const NextDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
  transition: all ease-in-out 0.1s;
  position: absolute;
  top: 50%;
  text-align: center;
  left: 16px;

`;

const UpDownBtns = styled.button`
`;

export default MainCarousel;
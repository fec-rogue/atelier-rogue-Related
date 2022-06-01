import styled from 'styled-components';
import React, { useEffect, useState, useContext, useRef } from 'react';
import {DescriptionsContext} from './Overview.jsx';


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
         <div>
          <UpDownDiv>
            <UpDownBtns onClick={() => {updateIndex(index-1)}} >Prev</UpDownBtns>
          </UpDownDiv>
         </div>
          <ImgContainer >
            <CarouselItem
              src={displayed.photos[curPhoto].url}
              onClick={handleExpanded}>
            </CarouselItem>
          </ImgContainer>
         <RightImgDiv>
          <UpDownDiv>
            <UpDownBtns onClick={() => {updateIndex(index+1)}}>Next</UpDownBtns>
          </UpDownDiv>
         </RightImgDiv>
        </InnerDiv>
    </CarouselDiv>
  )

};

const ZoomedImg = styled.div`
  pointerEvents: none;
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};
  opacity: ${props => props.opacity};
  border: 1px solid lightgray;
  background-color: #fafafa;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  &:hover {
    cursor: zoom-in;
  }
`;
const ImgContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
`;
const CarouselDiv = styled.div`
  display: inline-flex;
  max-width: 100%;
  height: auto;
  background-color: #fafafa;
  transition: all ease-in-out 0.5s;
`;
const InnerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CarouselItem = styled.img`
  position: relative;
  width: 100%;
  height: auto;
  transition: all ease-in-out 0.03s;
  &:hover {
    cursor: zoom-in;
  }
`;
const UpDownDiv = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: gray;
  transition: all ease-in-out 0.1s;
`;
const RightImgDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const UpDownBtns = styled.button`
`;

export default MainCarousel;
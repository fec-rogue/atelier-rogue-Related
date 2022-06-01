import styled from 'styled-components';
import React, { useEffect, useState, useContext, useRef } from 'react';
import {DescriptionsContext} from './Overview.jsx';


//TODO:
// hovering over item with magnifying glass will magnify image
// clicking expanding will expand image
// expanded image will still be able to scroll through image gallery

function MainCarouselC({cur, setCur, expanded, setExpanded}) {

  const {displayed} = useContext(DescriptionsContext);
  const [index, setIndex] = useState(cur);

  // zoom in zoom out
  const [isZoomed, setZoom] = useState(false);
  const [[x, y], setPosition] = useState([0,0]);
  const [[w, h], setZoomSize] = useState([0,0]);
  const zoomRef = useRef(null);

  // buttons should disappear when last img is reached// first img is reached
  // buttons should work with left and right arrow keys
  const updateIndex = (indx) => {
    if (indx < 0) {
      setIndex(displayed.photos.length-1);
      setCur(displayed.photos.length-1)
    } else if (indx > displayed.photos.length-1) {
      setIndex(0)
      setCur(0);
    } else {
      setIndex(indx);
      setCur(indx);
    }
  };

  const handleMouseEnter = (e) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setZoomSize([width, height]);
    setZoom(true);
  };

  const handleMouseLeave = () => {
    setZoom(false);
  };

  const handleMouseMove = (e) => {
    const {top, left} = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setPosition([x,y]);
  };

  const handleExpanded = () => {
    console.log('clicked expanded');
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
          <ImgContainer
            ref={zoomRef}
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => {handleMouseMove(e)}}
          >
            <CarouselItem
              src={displayed.photos[cur].url}
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

export default MainCarouselC;
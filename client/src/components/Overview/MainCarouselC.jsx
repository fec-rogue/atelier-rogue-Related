import styled from 'styled-components';
import React, { useEffect, useState, useContext, useRef } from 'react';
import {DescriptionsContext} from './Overview.jsx';
import {BiFullscreen} from "react-icons/bi";

//TODO:
// hovering over item with magnifying glass will magnify image
// clicking expanding will expand image
// expanded image will still be able to scroll through image gallery

function MainCarouselC({cur, setCur}) {

  const {displayed} = useContext(DescriptionsContext);
  const [index, setIndex] = useState(cur);
  const [expanded, setExpanded] = useState(false);

  // zoom in zoom out
  const [opacity, setOpacity] = useState(0);
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

  const expandImg = () => {
    console.log('clicked expand');
    setModal(true);
  };

  const handleMouseEnter = (e) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setZoomSize([width, height]);
    setOpacity(1);
  }
  const handleMouseLeave = () => {
    setOpacity(0);
  }

  const handleMouseMove = (e) => {
    const {top, left} = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;

    setPosition([x,y]);
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
              src={displayed.photos[cur].url}>
            </CarouselItem>
            <ZoomedImg
            img={displayed.photos[cur].url}
            opacity={opacity}
            height={h}
            width={w}
            style={{
              backgroundSize: `${w * 2}px ${h * 2}px`,
              backgroundPositionX: `${-x * 2 / (1.68)}px`,
              backgroundPositionY: `${-y * 2 / (1.68)}px`
            }}
            >
            </ZoomedImg>
          </ImgContainer>
         <RightImgDiv>
           <FullBtn>
             <BiFullscreen onClick={expandImg}/>
           </FullBtn>
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
  height: ${(props) => `${props.height}px` || '0px'};
  width: ${(props) => `${props.width}px` || '0px'};
  opacity: ${props => props.opacity};
  border: 1px solid lightgray;
  background-color: white;
  background-image: url(${(props) => props.img || '/dist/images/NPA.jpeg'});
  background-repeat: no-repeat;
`;

const ImgContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  :hover {
    box-shadow: 0 14px 24px rgba(0, 0, 0, 0.55), 0 14px 18px rgba(0, 0, 0, 0.55);
  }
`;

const CarouselDiv = styled.div`
  display: inline-flex;
  max-width: 100%;
  height: auto;
  background-color: white;
  transition: all ease-in-out 0.5s;
  .magnify {
    cursor: zoom-in;
  }
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
const FullBtn = styled.button`
  align-self: flex-start;
`;
const UpDownBtns = styled.button`
`;

export default MainCarouselC;
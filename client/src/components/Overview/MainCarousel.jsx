import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import {DescriptionsContext} from './Overview.jsx'


function MainCarousel({cur, setCur}) {

  const {displayed} = useContext(DescriptionsContext);
  const [index, setIndex] = useState(cur);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

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

  const getHeight = (url) => {
    const img = new Image();
    img.src = url;
    img.onload = function() {setHeight(this.height)};
    return height;
  };

  const getWidth = (url) => {
    const img = new Image();
    img.src = url;
    img.onload = function() {setWidth(this.width)};
    return width;
  }

  return (Object.keys(displayed).length === 0) ?
  (null) :
  (<CarouselDiv>
      <UpDownDiv>
        <UpDownBtns onClick={() => {updateIndex(index-1)}} >Prev</UpDownBtns>
      </UpDownDiv>
       <InnerDiv>
          {displayed.photos.map((img, indx) => {
            return (indx === cur) ?
            (<CarouselItem key={indx} src={img.url}></CarouselItem>)
            : null
          })}
        </InnerDiv>
      <UpDownDiv>
        <UpDownBtns onClick={() => {updateIndex(index+1)}}>Next</UpDownBtns>
      </UpDownDiv>
    </CarouselDiv>
  )

};


const CarouselDiv = styled.div`
  display: flex;
  flex-grow: 1;
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
  max-height: auto;
  max-width: 100%;
`;

const UpDownDiv = styled.div`
  display: flex;
  flex: 8%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: gray;
  transition: all ease-in-out 0.1s;
`;

const UpDownBtns = styled.button`
`;

export default MainCarousel;
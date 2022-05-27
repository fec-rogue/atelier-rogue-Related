import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import {DescriptionsContext} from './Overview.jsx'

function Carousel() {
  const {displayed, setDisplayed, styles} = useContext(DescriptionsContext);
  const [width, setWidth] = useState(100);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      setActiveIndex(displayed.photos.length-1);
    } else if (newIndex >= displayed.photos.length) {
      setActiveIndex(0);
    } else {
      setActiveIndex(newIndex);
    }
  }

  return (Object.keys(displayed).length === 0) ?
  (null) :
  (<CarouselDiv>
      <UpDownDiv>
        <UpDownBtns onClick={() => {updateIndex(activeIndex-1)}} >Prev</UpDownBtns>
      </UpDownDiv>
      <PicDiv>
        <InnerDiv style={{transform: `translateY(-${activeIndex * 100}%)`}}>
          {displayed.photos.map((img, indx) => {
            return (
              <CarouselItem key={indx} style={{width: `${width}%`}}>
                <CarouselPic src={img.thumbnail_url}></CarouselPic>
              </CarouselItem>
            )
          })}
        </InnerDiv>
      </PicDiv>
      <UpDownDiv>
        <UpDownBtns onClick={() => {updateIndex(activeIndex+1)}}>Next</UpDownBtns>
      </UpDownDiv>
    </CarouselDiv>
  )

};


const CarouselDiv = styled.div`
  overflow: hidden;
`;
const InnerDiv = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
`;

const PicDiv = styled.div`
  display: flex;
`;

const CarouselItem = styled.div`
  display: flex-inline;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CarouselPic = styled.img`
  padding: 3px;
  object-fit: contain;
`;

const UpDownDiv = styled.div`
  flex-direction: column;
  justify-content: center;
`;

const UpDownBtns = styled.button`
  margin: 5px;
`;

export default Carousel;
import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import {DescriptionsContext} from './Overview.jsx'

function Carousel() {
  // change displayed to an index to make life easier
  const {displayed, setDisplayed} = useContext(DescriptionsContext);
  const [range, setRange] = useState({min: 0, max:6});

  useEffect(() => {
    if (Object.keys(displayed).length > 0) {
      setRange((displayed.photos.length > 7) ? {min: 0, max: 6} : {min:0, max: displayed.photos.length -1})
    }
  }, [displayed])

  const prev = () => {
    if (range.min > 0) {
      setRange({min: range.min -1, max: range.max-1});
    }
  }

  const next = () => {
    if (range.max < displayed.photos.length) {
      setRange({min: range.min +1, max: range.max+1});
    }
  }

  // make a range

  return (Object.keys(displayed).length === 0) ?
  (null) :
  (<CarouselDiv>
      <UpDownDiv>
        <UpDownBtns onClick={prev} >Prev</UpDownBtns>
      </UpDownDiv>
      <PicDiv>
        <InnerDiv>
          {displayed.photos.map((img, indx) => {
            return (indx >= range.min && indx <= range.max) ?
            (<CarouselItem className={img === displayed ? 'selected' : ''}key={indx}
              img={img.thumbnail_url}>
              </CarouselItem>)
            : null
          })}
        </InnerDiv>
      </PicDiv>
      <UpDownDiv>
        <UpDownBtns onClick={next}>Next</UpDownBtns>
      </UpDownDiv>
    </CarouselDiv>
  )

};


const CarouselDiv = styled.div`
  cursor: default;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: 130px;
  max-height: 800px;
  background-color: white;
  transition: all ease-in-out 0.05s;
  .selected {
    border-bottom: 6px solid red;
    transition: all ease-in-out 0.05s;
  }
`;
const InnerDiv = styled.div`
  overflow: hidden;

`;

const PicDiv = styled.div`

`;

const CarouselItem = styled.div`
  display: flex;
  flex: 1;
  border: 1px solid black;
  min-width: 75px;
  min-height: 75px;
  max-height: 75px;
  margin: 10px 0px;
  background-image: url(${(props) => props.img || ''});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
  transition: all ease-in-out 0.03s;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    transition: all ease-in-out 0.03s;
    transform: scale(0.96);
    cursor: pointer;
  }
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

export default Carousel;
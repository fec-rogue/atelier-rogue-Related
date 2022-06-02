import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import {DescriptionsContext} from './Overview.jsx'
import {PropIdContext} from '../App.jsx';
import {FaChevronUp, FaChevronDown} from "react-icons/fa";
//TODO:
// thumbnail should scroll to make current selection visible
function ThumbnailCarousel() {

  const {displayed} = useContext(DescriptionsContext);
  const {curPhoto, setCurPhoto} = useContext(PropIdContext);
  const [range, setRange] = useState({min: 0, max:6});

  useEffect(() => {
    if (Object.keys(displayed).length > 0) {
      setRange((displayed.photos.length > 7) ? {min: 0, max: 6} : {min:0, max: displayed.photos.length -1})
    }
  }, [displayed]);

  const prev = () => {
    if (range.min > 0) {
      setRange({min: range.min -1, max: range.max-1});
    }
  };

  const next = () => {
    if (range.max < displayed.photos.length - 1) {
      setRange({min: range.min +1, max: range.max+1});
    }
  };

  return (Object.keys(displayed).length === 0) ?
  (null) :
  (<ThumbnailCarouselDiv>
      <UpDownDiv>
        <UpDownBtns onClick={prev} >
          <FaChevronUp
              size={28}
              style={{color:'white'}}/>
            </UpDownBtns>
      </UpDownDiv>
      <div>
        <InnerDiv>
          {displayed.photos.map((img, indx) => {
            return (indx >= range.min && indx <= range.max) ?
            (<ThumbnailCarouselItem
              className={indx === curPhoto ? 'selected' : ''}
              key={indx}
              img={img.thumbnail_url} onClick={() => {
                setCurPhoto(indx)
                }}>
              </ThumbnailCarouselItem>)
            : null
          })}
        </InnerDiv>
      </div>
      <UpDownDiv>
        <UpDownBtns onClick={next}>
          <FaChevronDown
            size={28}
            style={{color:'white'}}/>
            </UpDownBtns>
      </UpDownDiv>
    </ThumbnailCarouselDiv>
  )

};


const ThumbnailCarouselDiv = styled.div`
  cursor: default;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: 130px;
  max-height: 800px;
  transition: all ease-in-out 0.05s;
  .selected {
    border-bottom: 6px solid white;
    transition: all ease-in-out 0.05s;
  }
`;
const InnerDiv = styled.div`
  overflow: hidden;
`;

const ThumbnailCarouselItem = styled.div`
  display: flex;
  flex: 1;
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
  }
`;

const UpDownDiv = styled.div`
  display: flex;
  flex: 8%;
  height: 100%;
  align-items: center;
  justify-content: center;
  transition: all ease-in-out 0.1s;
`;

const UpDownBtns = styled.button`
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
    opacity: 50%;
  }
`;

export default ThumbnailCarousel;
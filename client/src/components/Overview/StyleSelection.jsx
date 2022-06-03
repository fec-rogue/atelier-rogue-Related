import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {DescriptionsContext} from './Overview.jsx';
import {PropIdContext} from '../App.jsx';

// TODO: checkmark overlaid on selected style, hover function for user readability
function StyleSelection() {

  const {styles, setProductStyles, displayed, setDisplayed} = useContext(DescriptionsContext);
  const {setCurPhoto, styleIndx, setStyleIndx} = useContext(PropIdContext);

  // updates style beind displayed
  const handleStyleChange = (e, key, ind) => {
    if (e.style_id !== displayed.style_id) {
      setDisplayed(e);
      setCurPhoto(0);
      let pos = ind*4 + key;
      setStyleIndx(pos);
    }
  };
   // react doesn't like that setDisplayed is being set with the "icon" variable from the styles array
  return (
    <Field>
      <Block>
        {styles.map((rows, ind) => {
          return (
            <StyleDiv key={ind}>
              {rows.map((icon, key) => {
              return (
                <StyleCircle key={key}>
                  <label
                  data-variant='image-circle'
                  data-type='image'>
                    <RadioButtons
                    type='radio'
                    name='color'
                    value={icon.style_id}
                    id={icon.name}
                    ind={ind}
                    checked={icon.style_id === displayed.style_id}
                    onChange={() => {handleStyleChange(icon, key, ind)}}/>
                      <StyleColor
                      img={icon.photos[0].thumbnail_url}
                      className={icon.style_id === displayed.style_id ? 'selected' : 'none'}/>
                    </label>
                </StyleCircle>
                )
              })}
            </StyleDiv>
          )
          })}
      </Block>
  </Field>
  )

}

const Block = styled.div`
  display: block;
`;

const StyleDiv = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
const StyleCircle = styled.li`
  flex-direction: row;
  margin: 5px;
`;

const StyleColor = styled.div`
  border-radius: 100px;
  border: 0.5px solid #FCFBF4;
  padding: 3px;
  width: 50px;
  height: 50px;
  background-image: url(${(props) => props.img || ''});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
  &:hover {
    cursor: pointer;
    transition: all ease-in-out 0.03s;
    transform: scale(0.96);
    border: 0.5px solid teal;
  }
  &.selected{
    border: 2px solid teal;
    transform: scale(1.2);
    transition: all ease-in-out 0.03s;
    box-shadow: 0 4px 2px -2px gray;
  }

`;

const RadioButtons = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
`;

const Field = styled.fieldset`
  display: block;
  border: 0;
`;


export default StyleSelection
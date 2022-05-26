import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {DescriptionsContext} from './Overview.jsx'

// TODO: checkmark overlaid on selected style, hover function for user readability
function StyleSelection() {
  const {styles, setProductStyles} = useContext(DescriptionsContext);
  const {displayed, setDisplayed} = useContext(DescriptionsContext);

  var handleStyleChange = function(e) {
    if (e.style_id !== displayed.style_id) {
      setDisplayed(e);
    }
  };
   // react doesn't like that setDisplayed is being set with the "icon" variable from the styles array
  return (
    <Field>
      <Block>
        {styles.map((rows, key) => {
          return (
            <StyleDiv key={key}>
              {rows.map((icon, key) => {
              return (
                <StyleCircle key={key}>
                  <label data-variant='image-circle' data-type='image'>
                    {icon.style_id === displayed.style_id ? <RadioButtons type='radio' name='color' value={icon.style_id} id={icon.name} checked onChange={() => {handleStyleChange(icon)}}/>
                    : <RadioButtons type='radio' name='color' value={icon.style_id} id={icon.name} onChange={() => {handleStyleChange(icon)}}/>}
                      <StyleColor src={icon.photos[0].thumbnail_url}></StyleColor>
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
  displaye: block;
`;
const ProductDetailDiv = styled.div`
  display: flex;
`;

const TitleBlock = styled.div`
  display: block;
  border-bottom: 0.5px solid;
`;

const SizeAndColor = styled.div`
  display: block;
  border-bottom: 0.5px solid;
`;

const StyleDiv = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
const StyleCircle = styled.li`
  flex-direction: row;
  margin: 5px;
`;

const StyleColor = styled.img`
  border-radius: 100px;
  border: 1px solid;
  padding: 3px;
  width: 50px;
  height: 50px;
  object-fit: cover;
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
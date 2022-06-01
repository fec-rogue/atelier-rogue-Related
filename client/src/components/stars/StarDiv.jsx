import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';


const StarDiv = styled.div`
display: inline-block;
margin-bottom: 0px;
margin-right: 5px;
background: linear-gradient(90deg, orange 0 ${(props) => props.rating / 5 * 100}%, grey ${(props) => props.rating / 5 * 100}% 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`

export default StarDiv;
import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';


const DynamicSingleStar = styled.div`
display: inline-block;
background: linear-gradient(90deg, orange 0 ${(props) => props.rating}%, grey ${(props) => props.rating}% 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
cursor: pointer;
`

export default DynamicSingleStar;
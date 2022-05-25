import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';


const ComparisonBar = styled.div`
width: 220px;
height: 10px;
padding: 0 0 0 0;
border: 0 0 0 0;
margin-bottom: 20px;
margin-top: 5px;
background: linear-gradient(90deg, green 0 ${(props) => props.percent}%, grey ${(props) => props.percent}% 100%);
`;

export default ComparisonBar;
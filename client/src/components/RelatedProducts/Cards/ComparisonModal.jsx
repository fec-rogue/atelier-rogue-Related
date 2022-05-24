import { React , useState, useEffect } from 'react';
import styled from 'styled-components';

const Comparison ({ twoCards }) => {
  if(twoCards) {
    const card1 = twoCards[0];
    const card2 = twoCards[1];
  }
  const featureArr = card1.features.concat(card2.features);

  const features = [];
  featureArr.forEach((eachFeacture) => {
    if(features.indexOf(featureArr[i].feature) === -1) {
      features.push(featureArr[i].feature);
    }
  })
  const card1Arr = [];
  card1.features.map((item) => card1Arr.push(item));

  const card2Arr = [];
  card2.features.map((item) => card2Arr.push(item));

  return(
    <table>
      <thead>
        <tr>
          <HeadL>{card1.name}</HeadL>
          <th></th>
          <HeadR>{card2.name}</HeadR>
        </tr>
      </thead>
      <tbody>
        {features.map((item, index) => {
          <tr key={index}>
            <featureL>
              {card1Arr.map((item1) => (
                (item1.feature === item) ? (item1.value) ? `${item1.value}` : '✓' : ' '
              ))}
            </featureL>
            <Value>{item}</Value>

            <featureR>
              {card2Arr.map((item1) => (
                (item1.feature === item) ? (item1.value) ? `${item1.value}` : '✓' : ' '
              ))}
            <featureR/>
          </tr>
        })}
      </tbody>
    </table>
  )
}

export default Comparison;
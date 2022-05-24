import { React , useState, useEffect } from 'react';
import styled from 'styled-components';

const Comparison = ({ twoCards, closeModal }) => {
  // console.log('closeModal', closeModal);
  let card1;
  let card2;
  if(twoCards) {
    card1 = twoCards[0];
    console.log('card1', card1);
    card2 = twoCards[1];
    console.log('card2', card2);
    // console.log('twoCards', twoCards);
  }
  const featureArr = card1.features.concat(card2.features);
  // console.log('featureArr', featureArr);

  const features = [];
  featureArr.forEach((eachFeacture) => {
    if(features.indexOf(eachFeacture.feature) === -1) {
      features.push(eachFeacture.feature);
    }
  })
  console.log('features', features);

  const card1Arr = [];
  card1.features.map((item) => card1Arr.push(item));
  console.log('card1Arr', card1Arr);

  const card2Arr = [];
  card2.features.map((item) => card2Arr.push(item));

  console.log('card2Arr', card2Arr);

  return(
    <div>
    HIIII Comparison!!
  </div>
    // <table>
    //   <thead>
    //     <tr>
    //       <HeadL>{card1.name}</HeadL>
    //       <th></th>
    //       <HeadR>{card2.name}</HeadR>
    //     </tr>
    //   </thead>

    //   <tbody>
    //     {features.map((item, index) => {
    //        console.log('HIT TABLE!!')
    //       return(
    //       <tr key={index}>
    //         <featureL>
    //           {card1Arr.map((item1) => (
    //             (item1.feature === item) ? `${item1.value} ✓` : item1.value
    //           ))}
    //         </featureL>
    //         <Value>{item}</Value>

    //         <featureR>
    //           {card2Arr.map((item2) => (
    //             (item2.feature === item) ? `${item2.value} ✓` : item2.value
    //           ))}
    //         </featureR>
    //       </tr>
    //     )
    //     })}
    //   </tbody>
    //   <button onClick={() => closeModal(false)}></button>
    // </table>
  )
}


const featureL = styled.td`
  position: flex;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  font-style: italic;
  color: ${(props) => props.theme.colors.primary};
`;

const featureR = styled.td`
  position: flex;
  text-align: center;
  padding-right: 20px;
  padding-left: 20px;
  font-style: italic;
  color: ${(props) => props.theme.colors.primary};
`;

const Value = styled.td`
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
  `;

const HeadL = styled.th`
  padding-left: 20px;
  color: ${(props) => props.theme.colors.primary};
`;

const HeadR = styled.th`
  padding-right: 20px;
  color: ${(props) => props.theme.colors.primary};
`;
export default Comparison;
import React  from 'react';
import { useEffect  } from "react";
import styled from 'styled-components';
import {AiOutlineClose} from "react-icons/ai";

const Comparison = ({ twoCards, close }) => {
  // console.log('twocards', twoCards)
  let card1;
  let card2;
  if(twoCards) {
    card1 = twoCards[0];
    // console.log('card1', card1);
    card2 = twoCards[1];
    // console.log('card2', card2);
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
  // console.log('features', features);

  const card1Arr = [];
  card1.features.map((item) => card1Arr.push(item));
  // console.log('card1Arr', card1Arr);

  const card2Arr = [];
  card2.features.map((item) => card2Arr.push(item));

  // console.log('card2Arr', card2Arr);

  useEffect( ()=> {
    document.addEventListener( 'mousedown', ()=>{
      close(false)
    })
  })


  return(
    <TableWrapper>
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
          return(
          <tr key={index}>
            <FeatureL>
              {card1Arr.map((item1) => (
                (item1.feature === item) ? `✓` : null
              ))}
            </FeatureL>
            <Value>{item}</Value>

            <FeatureR>
              {card2Arr.map((item2) => (
                (item2.feature === item) ? `✓` : null

              ))}
            </FeatureR>
          </tr>
        )
        })}
      </tbody>

     </table>
    </TableWrapper>
  )
}
const TableWrapper = styled.div`
  width:500px;
   height:300px;
   font-size:18px;
   z-index:1;
   y-overflow: hidden;
   border-radius:12px;
   border:3px solid black;
   background-color:#FFF;
   display:flex;
   align-items: center;
   justify-content: center;
   padding:15px;

`
const FeatureL = styled.td`
  position: flex;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  overflow-y:auto;
`;

const FeatureR = styled.td`
  position: flex;
  text-align: center;
  padding-right: 20px;
  padding-left: 20px;
  overflow-y:auto;
`;

const Value = styled.td`
  text-align: center;
  `;

const HeadL = styled.th`
  padding-left: 20px;
  text-align: center;
`;

const HeadR = styled.th`
  padding-right: 20px;
  text-align: center;
`;


export default Comparison;
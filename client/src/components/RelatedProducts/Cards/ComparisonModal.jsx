import React  from 'react';
import styled from 'styled-components';

const Comparison = ({ twoCards, close }) => {
  console.log('twocards', twoCards)
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

  return(
    <TableWrapper>
       <button onClick={() => close(false)}>Close</button>
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
          //  console.log('HIT TABLE!!')
          return(
          <tr key={index}>
            <FeatureL>
              {card1Arr.map((item1) => (
                // (item1.feature === item) ? `${item1.value} ✓` : item1.value
                (item1.feature === item)
                ? (item1.value)
                  ? `${item1.value}`
                  : '✓'
                : ' '
              ))}
            </FeatureL>
            <Value>{item}</Value>

            <FeatureR>
              {card2Arr.map((item2) => (
                // (item2.feature === item) ? `${item2.value} ✓` : item2.value
                (item2.feature === item)
                ? (item2.value)
                  ? `${item2.value}`
                  : '✓'
                : ' '
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
  width:1000px;
   height:200px;
   font-size:12px;
   z-index:1;
   border-radius:12px;
   border:3px solid red;
   background-color:grey;
   box-shadow:rgba(0, 0, 0, 0.35) 0px 5px 15px;
   display:flex;
   padding:15px;
`
const FeatureL = styled.td`
  position: flex;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  font-style: italic;
`;

const FeatureR = styled.td`
  position: flex;
  text-align: center;
  padding-right: 20px;
  padding-left: 20px;
  font-style: italic;
`;

const Value = styled.td`
  text-align: center;
  `;

const HeadL = styled.th`
  padding-left: 20px;
`;

const HeadR = styled.th`
  padding-right: 20px;
`;


export default Comparison;
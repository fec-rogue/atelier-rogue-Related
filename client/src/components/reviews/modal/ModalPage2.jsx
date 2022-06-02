import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';


const LineOne = styled.div`
  padding: 15px 20px 0 20px;
`;

const SummaryContainer = styled.div`
  padding-left: 20px;
  padding-top: 5px;
`;

const SummaryInput = styled.input`
  height: 20%;
  width: 95%;
`;

const LineTwo = styled.div`
padding: 15px 20px 0 20px;
height: 40%;
`;

const LineThree = styled.div`
padding: 15px 20px 0 20px;
margin-top: 20px;
`;

const LineFour = styled.div`
padding: 15px 20px 0 20px;
margin-top: 15px;
display: flex;
justify-content: space-between;
`

const Minimum = styled.div`
  font-size: 13px;
  display: inline-block;
`;

const CurrentCount = styled.div`
  font-size: 13px;
  display: inline-block;
`;

const Count = styled.span`
  font-size: 13px;

`;

const BodyInput = styled.textarea`
  height: 85%;
  width: 98%;
`;

const UploadText = styled.div`
  font-size: 14px;
`;

const SubmitButton = styled.button`
height: 40px;
width: 80px;
`;

const BackButton = styled.button`
height: 40px;
width: 80px;
`;




const ModalPage2 = ({allCharacteristics, setAllCharacteristics, setNext}) => {
  const [summaryCount, setSummaryCount] = useState(0);
  const [bodyCount, setBodyCount] = useState(0);

  const handleSummaryChange = (e) => {
    setSummaryCount(e.target.value.length);
    setAllCharacteristics({...allCharacteristics, summary: e.target.value});
  }

  const handleBodyChange = (e) => {
    setBodyCount(e.target.value.length);
    setAllCharacteristics({...allCharacteristics, body: e.target.value})
  }

  const handleFileChange = (e) => {
    // e.preventDefault();
    // const formData = new FormData();
    // formData.append
    // console.log(e.target.files);
  }

  const handleSubmitClick = (e) => {
    // console.log(allCharacteristics);
    axios.post('http://localhost:3000/reviews', allCharacteristics)
      .then((results) => {
        console.log(results);
      })
  }

  const handleBackClick = (e) => {
    setNext(false);
  }


  return (
    <>
      <LineOne>Review Summary</LineOne>
      <SummaryContainer>
        <SummaryInput type="text" value={allCharacteristics.summary} onChange={handleSummaryChange}
        placeholder="Ex: Best purchase ever!"></SummaryInput>
        <Minimum>(60 characters max)&nbsp;</Minimum>
        <CurrentCount>- character count&nbsp;</CurrentCount>
        <Count style={summaryCount > 60 ? {'color' : 'red'} : null }>{summaryCount}</Count>
      </SummaryContainer>
      <LineTwo>
        <div>Review Body</div>
        <BodyInput type="text" value={allCharacteristics.body} onChange={handleBodyChange}
        placeholder="Why did you like the product or not?"></BodyInput>
        <Minimum>(1000 characters max, 50 characters minumum)&nbsp;</Minimum>
        <CurrentCount>- character count&nbsp;</CurrentCount>
        <Count style={bodyCount > 1000 || bodyCount < 50 ? {'color' : 'red'} : null }>{bodyCount}</Count>
      </LineTwo>
      <LineThree>
        <UploadText>Upload Photos</UploadText>
        <input type="file" multiple onChange={handleFileChange}></input>
      </LineThree>
      <LineFour>
        <BackButton type="button" onClick={handleBackClick}>Back</BackButton>
      <SubmitButton type="button" onClick={handleSubmitClick}>Submit</SubmitButton>
      </LineFour>
    </>
  )
}

export default ModalPage2;
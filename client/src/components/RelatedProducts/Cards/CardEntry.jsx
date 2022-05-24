import React from 'react';
import styled from 'styled-components';

const Carditem = styled.div`
  height: 400px;
  width: 200px;
  position: relative;
`
const Cardimage = styled.img`
  width: 100%;
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const CardEntry = ({defaultsStyles, category, name, price, index, current}) => {
  // console.log('defaultsStylesURL', defaultsStyles[0] && defaultsStyles[0].photos[0].url);
  return(
      <Carditem>
        {defaultsStyles[0] && index === current ? <Cardimage src={defaultsStyles[0].photos[0].url}/> : <Cardimage src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" />}
        <CardInfo>
          Category: {category}
          Name: {name}
          Price: {price}
        </CardInfo>
      </Carditem>

  )
}

export default CardEntry;
import React from 'react';

const CardEntry = ({defaultsStyles, category, name, price}) => {

 return(
    <div>
      {defaultsStyles[0] && <img src={defaultsStyles[0].photos[0].url}/>}
      category: {category}
      name: {name}
      price: {price}
    </div>
      )
}


export default CardEntry;
import React from 'react';

const CardEntry = ({defaultsStyles, defaultsCategory}) => {
  // console.log('defaultsStyles', defaultsStyles);
  console.log('defaultsCategory', defaultsCategory);
 return(
    <div>
      {defaultsStyles[0] && <img src={defaultsStyles[0].photos[0].url}/>}
    </div>
      )
}


export default CardEntry;
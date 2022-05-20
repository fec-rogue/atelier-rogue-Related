import React from 'react';
import { useEffect, useState } from "react";
import axios from 'Axios';

function Overview() {
  const [products, setProducts] = useState({productsList: [], displayedProd: {}});

  useEffect(() => {
    axios.get('/products')
    .then((response) => {
      setProducts(prevState => {
        return {displayedProd: response.data[0], productsList: response.data}
      })
    })

  }, [])

  return(
    <div>
      <p>Products:</p>
      {products.productsList.map((item, key) => {
        return  <pre key={key}>{JSON.stringify(item)}</pre>
      })}



    </div>
  )
}

export default Overview;

// pass productsList to carosal to render out each picture
// pass displayedProduct to ProductPic and ProductDetails
import React from 'react';
import { lazy, Suspense, useState, createContext, useEffect} from "react";
import Overview from "./Overview/Overview.jsx";
import axios from 'axios';
import RelatedProducts from "./RelatedProducts/RelatedProducts.jsx"
import Reviews from "./reviews/Reviews.jsx";
/*
Example usage of lazy:
const Detail = lazy(() => import("./Detail.jsx"));
const Form = lazy(() => import("./Form.jsx"));
const Admin = lazy(() => import("./Admin.jsx"));
const FourOhFour = lazy(() => import("./404.jsx"));
*/
// IMPORT overviews, relatedProducts and Reviews
// learn how to store sessions(?) in caches so when user refreshes results aren't lost
// useContext to set default product_id across all pages

export const PropIdContext = createContext();

const App = () => {
  const [id, setId] = useState('40344');
  const [allRatings, setAllRatings] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/reviews/meta', {params: {product_id: 40344}})
    .then((results) => {
      const recommends = results.data.recommended;
      const percentage = (Number(recommends.true) / (Number(recommends.false) + Number(recommends.true)) * 100)
      setAllRatings({ratings: results.data.ratings, percentage: Math.round(percentage) + '%'});
      return results.data.ratings
    })
    }, [id]);


  return (
    <PropIdContext.Provider value={{id, setId, allRatings, setAllRatings}}>
      <div>
        <Overview />
      </div>
      <div>
        <RelatedProducts />
      </div>
      <div>
        <Reviews />
      </div>
    </PropIdContext.Provider>
  )
}

export default App;


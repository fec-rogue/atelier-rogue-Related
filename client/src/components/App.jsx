import React from 'react';
import { lazy, Suspense, useState, createContext, useEffect} from "react";
import styled, {createGlobalStyle} from 'styled-components';
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
export const FavoriteContext = createContext();

const App = () => {
  const [id, setId] = useState('40351');
  const [allRatings, setAllRatings] = useState(0);

  useEffect(() => {
    axios.get('/reviews/meta', {params: {product_id: id}})
    .then((results) => {
      const recommends = results.data.recommended;
      const percentage = (Number(recommends.true) / (Number(recommends.false) + Number(recommends.true)) * 100)
      let sum = 0;
      for (var props in results.data.ratings) {
        sum+= parseInt(results.data.ratings[props]);
      }
      setAllRatings({ratings: results.data.ratings, percentage: Math.round(percentage) + '%', avg: sum});
      return results.data.ratings
    })
    }, [id]);


  //need to grab overview data
  return (
    <AppContainer>
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
    </AppContainer>
  )
}

const AppContainer = styled.div`
  display: block;
  background-color: #ded3c5;
  font-family: 'Abel', sans-serif;
  margin: 0;
`;


export default App;


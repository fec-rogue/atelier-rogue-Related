import React from 'react';
import { lazy, Suspense, useState, createContext, useEffect } from "react";
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
  return (
    <PropIdContext.Provider value={id, setId}>
      <Overview />
      <RelatedProducts />
      <Reviews />
    </PropIdContext.Provider>
  )
}

export default App;


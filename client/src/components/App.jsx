import React from 'react';
import { lazy, Suspense, useState } from "react";
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';
/*
Example usage of lazy:
const Detail = lazy(() => import("./Detail.jsx"));
const Form = lazy(() => import("./Form.jsx"));
const Admin = lazy(() => import("./Admin.jsx"));
const FourOhFour = lazy(() => import("./404.jsx"));
*/
// IMPORT overviews, relatedProducts and Reviews

const App = () => {
  return (
    <div>
    <RelatedProducts />
    </div>
  )
}

export default App;


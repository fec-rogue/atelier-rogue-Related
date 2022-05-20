import React from 'react';
import { lazy, Suspense, useState } from "react";
import Overview from "./Overview/Overview.jsx"
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
      Hello World
      <Overview></Overview>
      </div>
  )
}

export default App;


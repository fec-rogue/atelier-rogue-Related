import React from 'react';
import { lazy, Suspense, useState, createContext, useEffect} from "react";
import styled, {createGlobalStyle} from 'styled-components';
import Overview from "./Overview/Overview.jsx";
import axios from 'axios';
import RelatedProducts from "./RelatedProducts/RelatedProducts.jsx"
import Reviews from "./reviews/Reviews.jsx";
import { FiSun, FiMoon } from 'react-icons/fi';


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
  const [curPhoto, setCurPhoto] = useState('');

  const storedTheme = localStorage.getItem('theme');
  if (!storedTheme) {
    localStorage.setItem('theme', 'light');
  }
  const [currentTheme, setCurrentTheme] = useState(storedTheme || 'light');
  const handleThemeChange = () => {
    const newTheme = (currentTheme === 'light') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setCurrentTheme(newTheme);
  };


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

    const themeStyle = () => {
      if(window.localStorage.theme === undefined) {
        return {
          "display": "block",
          "backgroundColor": "#FCFBF4",
          "fontFamily": "'Montserrat', sans-serif",
          "margin": "0"
        }
      }

      if(window.localStorage.theme === 'dark') {
        return {
          "body": '#363537',
          "text": '#FAFAFA',
          "toggleBorder": '#6B8096',
          "fontFamily": "'Montserrat', sans-serif",
          "backgroundColor": '#999'
        }
      }

      if(window.localStorage.theme === 'light') {
        return {
          "display": "block",
          "backgroundColor": "#FCFBF4",
          "fontFamily": "'Montserrat', sans-serif",
          "margin": "0"
        }
      }
    }

  return (
    <AppContainer style={(themeStyle())}>

      <PropIdContext.Provider value={{id, setId, allRatings, setAllRatings, curPhoto, setCurPhoto}}>
        <div>
          <Overview />
        </div>
        <div>
          <RelatedProducts />
        </div>
        <div>
          <Reviews />
        </div>
        <ThemeChanger onClick={handleThemeChange}>
          {currentTheme === 'light' ? <FiMoon style={{color: 'teal'}}/> : <FiSun style={{color: 'teal'}}/>}  Theme
          </ThemeChanger>
      </PropIdContext.Provider>
    </AppContainer>
  )
}

const AppContainer = styled.div`
`;
const ThemeChanger = styled.span`
  display: inline-block;
  padding: 20px 0 0 20px;
  cursor: pointer;
  margin: 10px;
`;


export default App;


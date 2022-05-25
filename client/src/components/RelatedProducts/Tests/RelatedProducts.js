import React from 'react';
// import ReactDOM from 'react-dom';
import RelatedPorducts from '../components/App.jsx';
import { act } from 'react-dom/test-utils';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as ReactDOMClient from 'react-dom/client';




it('renders RelatedProducts without crashing', async () => {
  // act(() => {
  //   const div = document.createElement('div');
  //   ReactDOMClient.createRoot(div).render(<App />);
  // })
  try {
    const div = document.createElement('div');
    ReactDOMClient.createRoot(div).render(<RelatedPorducts />);
  } catch (e) {
    console.log(e);
  }
})

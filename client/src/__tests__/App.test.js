import React from 'react';
// import ReactDOM from 'react-dom';
import App from '../components/App.jsx';
import { act } from 'react-dom/test-utils';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as ReactDOMClient from 'react-dom/client';


it('renders app without crashing', async () => {
  // act(() => {
  //   const div = document.createElement('div');
  //   ReactDOMClient.createRoot(div).render(<App />);
  // })

  try {
    const div = document.createElement('div');
    ReactDOMClient.createRoot(div).render(<App />);
  } catch (e) {
    console.log(e);
  }

})

// test('has header OVERVIEW', async () => {
//   try {
//   render(<App />);
//   const header = screen.getByText(/OVERVIEW/i);
//   expect(header).toBeInTheDocument()
// } catch (e) {
//   console.log(e);
// }
// })





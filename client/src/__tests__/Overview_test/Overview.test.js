import React from 'react';
// import ReactDOM from 'react-dom';
import Overview from '../../components/Overview/Overview.jsx';
import { act } from 'react-dom/test-utils';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as ReactDOMClient from 'react-dom/client';

it('renders overview without crashing', async () => {

  act(() => {
    const div = document.createElement('div');
    ReactDOMClient.createRoot(div).render(<Overview />);
  })
  // try {
  //   const div = document.createElement('div');
  //   ReactDOMClient.createRoot(div).render(<Overview/>);
  // } catch (e) {
  //   console.log(e);
  // }
})
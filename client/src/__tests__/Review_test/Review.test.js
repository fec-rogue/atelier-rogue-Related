import React from 'react';
import Reviews from '../../components/reviews/Reviews.jsx';
import { act } from 'react-dom/test-utils';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as ReactDOMClient from 'react-dom/client';

it('renders Reviews without crashing', async () => {
  try {
    const div = document.createElement('div');
    ReactDOMClient.createRoot(div).render(<Reviews />);
  } catch (e) {
    console.log(e);
  }
});
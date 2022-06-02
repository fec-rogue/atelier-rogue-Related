# Atelier Rogue

Atelier Rogue is a front-end e-commerce platform that utilizes HackReactor's legacy API to seed
Utilizing modern technologies such as React hooks and Styled components, the team was able to create four unique sections of the page fitting the clients requirements as well as some optional additions:

- - short video

- Getting Started
  (steps such as npm install, set up .env, run webpack, run serve)
- Technologies Used:

  - Setup and Workflow
  - Frontend Development
    React, Axios
  - Backend Development
    express
  - Deployment
  - Testing
    Jest

- Overview
  Related Items & Comparison dislays two sets of related products.

  - Contributor: Jessica Yu
  - Related Products Cards displays product cards of similar related items that the user might like:
    and the components includes features of:

    - a Scrollable list of product cards
      - Product Preview Image
        - images in a carousel of thumbnail images
      - Each product card includes information of:
        - Product Category
        - Product Name
        - Price
        - Start Ratings (# of Reviews)
    - A pull up feature of comparison Modal
    - Conditionally rendered scroll buttons

  - Outfit cards allow users to save and track individual products based on their interest.This component includes:

    - Add to Outfit card which adds the current product to Your Outfit list
      - No duplicate outfit
      - The list should persist per customer even if they exit the website and return later
    - Remove card icon('X') that removes the product from the list

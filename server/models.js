require("dotenv").config();
const axios = require('axios');
const path = require("path");

let options = {
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/',
  headers: {
    'User-Agent': 'request',
    'Authorization': process.env.TOKEN
  }
};

exports.getProducts = (cb) => {
  axios.get(`${options.url}products`, {headers: options.headers})
    .then(cb)
    .catch((err) => {
      console.log('getProducts err: ', err);
      cb(err);
    });
};

exports.getProductInfo = (id, cb) => {
  axios.get(`${options.url}products/${id}`, { headers: options.headers })
    .then((result) => {
      console.log('succes getting productinfo by id!!', result);
      cb(result.data);
    })
    .catch((err) => {
      console.log('getProductInfo err: ', err);
      cb(err);
    });
};

exports.getProductStyles = (id, cb) => {
  axios.get(`${options.url}products/:${id}/styles`, {params: {product_id: id}, headers: options.headers})
    .then(result => {
      console.log('getProductStyles models result: ', result);
      cb(result);
    })
    .catch((err) => {
      console.log('getProductStyles err: ', err); cb(err);
    });
};

exports.getRelatedProducts = (id, cb) => {
  axios.get(`${options.url}products/:${id}/related`, {headers: options.headers})
    .then(result => {
      console.log('getRelatedProducts models result: ', result);
      cb(result);
    })
    .catch((err) => {
      console.log('getRelatedProducts err: ', err);
      cb(err);
    });
};

exports.getReviews = (cb) => {
  axios.get(options.url + 'reviews/', options.headers)
    .then(cb)
    .catch((error) => {
      console.log('error at getReviews with,', error);
    });
};

exports.getMetaData = (cb) => {
  axios.get(options.url + 'reviews/meta', options.headers)
    .then(cb)
    .catch((error) => {
      console.log('error at getMetaData with,', error);
    });
};

exports.postReview = (data, cb) => {
  axios.post(options.url + 'reviews', data, options.headers)
    .then(cb)
    .catch((error) => {
      console.log('error posting at postReview,', error);
    });
};

exports.helpfulReview = (id, data, cb) => {
  axios.post(options.url + `reviews/:${id}/helpful`, data, options.headers)
    .then(cb)
    .catch((error) => {
      console.log('error posting at postReview,', error);
    });
};

exports.reportReview = (id, data, cb) => {
  axios.post(options.url + `/reviews/:${id}/report`, data, options.headers)
    .then(cb)
    .catch((error) => {
      console.log('error posting at postReview,', error);
    });
};

exports.getCart = (cb) => {
  axios.get(`${options.url}cart`, options.headers)
    .then(cb)
    .catch((err) => {
      console.log('error while getting Cart data', err);
    });
};

exports.createCart = (data, cb) => {
  axios.post(`${options.url}cart`, data, options.headers)
    .then(cb)
    .catch((err) => {
      console.log('error while posting Cart data', err);
    });
};

exports.createInterations = (data, cb) => {
  axios.post(`${options.url}interactions`, data, options.headers)
    .then(cb)
    .catch((err) => {
      console.log('error while posting Interaction data', err);
    });
};
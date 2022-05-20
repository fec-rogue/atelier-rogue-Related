const models = require('./models.js');

// Product Routes
exports.getProducts = (req, res) => {
  models.getProducts((result) => {
    res.json(result.data);
  });
};

exports.getProductInfo = (req, res) => {
  var id = req.query.product_id;
  models.getProductInfo(id, (result) => {
    res.status(200).send(result.data);
  });
};


exports.getProductStyles = (req, res) => {
  var id = req.params.product_id;
  models.getProductStyles(id, (result) => {
    res.json(result);
  });
};


exports.getRelatedProduct = (req, res) => {
  var id = req.params.product_id;
  models.getRelatedProduct(id, (result) => {
    res.json(result);
  });
};


// Review routes
exports.getReviews = (req, res) => {
  let id = req.params.product_id;
  models.getReviews(id, (result) => {
    res.json(result.data);
  });
};

exports.getMetaData = (req, res) => {
  let id = req.params.product_id;
  models.getMetaData(id, (result) => {
    res.json(result.data);
  });
};

exports.postReview = (req, res) => {
  let data = {
    product_id: req.body.product_id,
    rating: req.body.rating,
    summary: req.body.summary,
    body: req.body.body,
    recommend: req.body.recommend,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos,
    characteristics: req.body.characteristics
  };
  models.postReview(data, (result) => {
    res.json('posted successfully');
  });
};

exports.helpfulReview = (req, res) => {
  let id = req.params.product_id;
  models.helpfulReview(id, data, (result) => {
    res.json('updated successfully');
  });
};

exports.reportReview = (req, res) => {
  let id = req.params.product_id;
  models.reportReview(data, (result) => {
    res.json('reported successfully');
  });
};

// Cart routes

exports.getCart = (req, res) => {
  // console.log('getCart data', req.body);
  models.getCart((result) => {
    res.json(result);
  });
};

exports.createCart = (req, res) => {
  console.log('create Cart data', req.body);
  var params = {'sku_id': req.body.sku_id};
  models.createCart(params, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send('successully create new Cart!');
    }
  });
};

// Interactions routes
exports.createInterations = (req, res) => {
  console.log('create interation data', req.body);
  var params = {
    'element': req.body.element,
    'widget': req.body.widget,
    'time': req.body.time
  };
  models.createInterations(params, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send('successully create new Interaction!');
    }
  });
};
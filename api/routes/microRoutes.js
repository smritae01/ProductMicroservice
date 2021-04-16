'use strict';
module.exports = function(app) {

  var prod = require('../controllers/microController');

  // prod Routes
  app.route('/rest/v1/products')
    .get(prod.list_all_tasks)


  app.route('/rest/v1/users/:id/cart')
  .get(prod.get_cart)
  .put(prod.update_cart)

};

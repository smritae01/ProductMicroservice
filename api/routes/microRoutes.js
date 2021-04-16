'use strict';
module.exports = function(app) {

  var prod = require('../controllers/microController');

  // prod Routes
  app.route('/rest/v1/products')
    .get(prod.list_all_tasks)


  // app.route('/products/:productId')
  //   .get(prod.read_a_task)
  //   .put(prod.update_a_task)
  //   .delete(prod.delete_a_task);

  app.route('/rest/v1/users/:id/cart')
  .get(prod.get_cart)
  .put(prod.put_cart)

};

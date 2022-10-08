const express = require('express');
const menuRoute = require('./menu.route');

const router = express.Router();

const moduleRoutes = [
  {
    path: '/dining/menu',
    route: menuRoute,
    module: 'dining',
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

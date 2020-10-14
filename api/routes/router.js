const express = require('express');
const router = new express.Router();
const CTRL  = require('../controller/controller');

router.route('/addUser').post(CTRL.addUser);// Add new user
router.route('/FetchAllUsers').get(CTRL.FetchAllUsers);//FetchAllUsers

module.exports = router;
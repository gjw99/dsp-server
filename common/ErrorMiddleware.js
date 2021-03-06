/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */
'use strict';

/**
 * Common error handling middleware
 *
 * @author      TSCCODER
 * @version     1.0
 */

const logger = require('./logger');
const errors = require('common-errors');
const httpStatus = require('http-status');

const DEFAULT_MESSAGE = 'Internal server error';

/**
 * The error middleware function
 *
 * @param  {Object}     err       the error that is thrown in the application
 * @param  {Object}     req       the express request instance
 * @param  {Object}     res       the express response instance
 * @param  {Function}   next      the next middleware in the chain
 */
function middleware(err, req, res, next) {                        // eslint-disable-line no-unused-vars
  logger.logFullError(err, req.method, req.url);
  if (err.isJoi) {
    res.status(httpStatus.BAD_REQUEST).json({
      error: 'invalid request',
      message: err.details,
    });
  } else {
    const httpError = new errors.HttpStatusError(err);
    if (err.statusCode >= httpStatus.INTERNAL_SERVER_ERROR) {
      httpError.message = DEFAULT_MESSAGE;
    }
    res.status(httpError.statusCode).json({ message: httpError.message || DEFAULT_MESSAGE });
  }
}

module.exports = function () {
  return middleware;
};

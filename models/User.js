/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */
'use strict';
/**
 * The User model
 *
 * @author      TSCCODER
 * @version     1.0
 */

const mongoose = require('../datasource').getMongoose();
const _ = require('lodash');
const timestamps = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  socialNetworkType: { type: String },
  socialNetworkId: { type: String },
  socialNetworkAccessToken: { type: String },
});

UserSchema.plugin(timestamps);

if (!UserSchema.options.toObject) {
  UserSchema.options.toObject = { };
}

/**
 * Transform the given document to be sent to client
 *
 * @param  {Object}   doc         the document to transform
 * @param  {Object}   ret         the already converted object
 * @param  {Object}   options     the transform options
 */
UserSchema.options.toObject.transform = function (doc, ret, options) {    // eslint-disable-line no-unused-vars
  const sanitized = _.omit(ret, '__v', '_id', 'password');
  sanitized.id = doc._id;
  return sanitized;
};

module.exports = {
  UserSchema,
};

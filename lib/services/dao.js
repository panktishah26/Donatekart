"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongodb = require("mongodb");
var _mongojs = _interopRequireDefault(require("mongojs"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(source, true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(source).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

const uri = "mongodb+srv://meggi:megha123@cluster0-runta.mongodb.net/test?retryWrites=true&w=majority";
const client = new _mongodb.MongoClient(uri, { useNewUrlParser: true, keepAlive: true });
const DB = `LetUsCare`;

const TYPES_PK = {
  User: 'userId',
  NGO: 'ngoId',
  Login: 'loginId',
  Events: 'eventId',
  Interest: `interestId`,
  Transaction: 'txnId' };var _default =


{
  save: function () {var _ref = _asyncToGenerator(function* (type, data) {
      yield client.connect();
      const db = client.db(DB);
      const seq = yield db.collection('Sequence').find({}).toArray();
      const payload = _objectSpread({},
      data, {
        [TYPES_PK[type]]: seq[0][type.toLowerCase()] });

      const _seq = _objectSpread({},
      seq, {
        [type.toLowerCase()]: seq[0][type.toLowerCase()] + 1 });

      yield db.collection(type).insert(payload);
      yield db.collection('Sequence').update({ _id: "0" }, { '$set': { [type.toLowerCase()]: seq[0][type.toLowerCase()] + 1 } });
      return payload;
    });return function save(_x, _x2) {return _ref.apply(this, arguments);};}(),
  get: function () {var _ref2 = _asyncToGenerator(function* (type, filter) {
      yield client.connect();
      const db = client.db(DB);
      console.log(`finding by ${JSON.stringify(filter)}`);
      const out = yield db.collection(type).find(filter).toArray();
      return out[0];
    });return function get(_x3, _x4) {return _ref2.apply(this, arguments);};}(),
  getAll: function () {var _ref3 = _asyncToGenerator(function* (type, filter) {
      yield client.connect();
      const db = client.db(DB);
      console.log(`finding by ${JSON.stringify(filter)}`);
      const out = yield db.collection(type).find(filter).toArray();
      return out;
    });return function getAll(_x5, _x6) {return _ref3.apply(this, arguments);};}(),
  update: function () {var _ref4 = _asyncToGenerator(function* (type, data, id) {
      yield client.connect();
      const db = client.db(DB);
      console.log(`updating by ${JSON.stringify(id)}`);
      yield db.collection(type).update({ [TYPES_PK[type]]: parseInt(id) }, { '$set': data });
      return data;
    });return function update(_x7, _x8, _x9) {return _ref4.apply(this, arguments);};}() };exports.default = _default;module.exports = exports.default;
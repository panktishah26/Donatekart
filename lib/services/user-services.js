"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _dao = require("./dao");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(source, true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(source).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}






const createUser = /*#__PURE__*/function () {var _ref = _asyncToGenerator(function* (req, res) {
    const {
      email,
      firstname,
      lastname,
      password,
      type,
      description,
      ngoname,
      logo } =
    req.body;
    if (type === 'p') {
      const data = yield (0, _dao.save)('User', {
        email,
        firstname,
        lastname,
        type });

      yield (0, _dao.save)('Login', {
        email,
        password });

      res.cookie('auth-user', JSON.stringify({
        userId: data.userId,
        email }));

      res.write(JSON.stringify(_objectSpread({
        status: "SUCCESS" },
      data)));

    } else if (type === 'n') {
      debugger;
      const data = yield (0, _dao.save)('User', {
        email,
        firstname,
        lastname,
        type });

      const ngoData = yield (0, _dao.save)('NGO', {
        email,
        logo,
        firstname,
        lastname,
        description,
        ngoname,
        userId: data.userId });

      yield (0, _dao.save)('Login', {
        email,
        password });

      res.cookie('auth-user', JSON.stringify({
        userId: data.userId,
        email }));

      res.write(JSON.stringify(_objectSpread({
        status: "SUCCESS" },
      data, {},
      ngoData)));

    }

    res.end();
  });return function createUser(_x, _x2) {return _ref.apply(this, arguments);};}();

const getAuthUser = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator(function* (req, res) {
    if (req.cookies['auth-user']) {
      console.log(req.cookies['auth-user']);
      console.log({
        userId: JSON.parse(req.cookies['auth-user']).userId });

      let ngoData = {};
      const data = yield (0, _dao.get)('User', {
        userId: JSON.parse(req.cookies['auth-user']).userId });

      if (data.type === 'n') {
        ngoData = yield (0, _dao.get)('NGO', {
          userId: JSON.parse(req.cookies['auth-user']).userId });

      }
      res.write(JSON.stringify(_objectSpread({
        status: "SUCCESS" },
      ngoData, {},
      data)));

      res.end();
    } else {
      res.write(JSON.stringify({
        status: "FAILURE" }));

      res.end();
    }
  });return function getAuthUser(_x3, _x4) {return _ref2.apply(this, arguments);};}();

const addEvent = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator(function* (req, res) {
    const {
      description,
      subject } =
    req.body;
    if (req.cookies['auth-user']) {
      console.log(req.cookies['auth-user']);
      console.log({
        userId: JSON.parse(req.cookies['auth-user']).userId });

      let ngoData = {};
      let eventData = {};
      const data = yield (0, _dao.get)('User', {
        userId: JSON.parse(req.cookies['auth-user']).userId });

      if (data.type === 'n') {
        ngoData = yield (0, _dao.get)('NGO', {
          userId: JSON.parse(req.cookies['auth-user']).userId });

        eventData = yield (0, _dao.save)('Events', {
          subject,
          description,
          ngoName: ngoData.ngoname,
          userId: data.userId });

      }
      res.write(JSON.stringify(_objectSpread({
        status: "SUCCESS" },
      ngoData, {},
      data, {},
      eventData)));

      res.end();
    } else {
      res.write(JSON.stringify({
        status: "FAILURE" }));

      res.end();
    }
  });return function addEvent(_x5, _x6) {return _ref3.apply(this, arguments);};}();

const signin = /*#__PURE__*/function () {var _ref4 = _asyncToGenerator(function* (req, res) {
    const {
      email,
      password } =
    req.body;
    const data = yield (0, _dao.get)('User', {
      email });

    if (data) {
      const loginData = yield (0, _dao.get)('Login', {
        email });

      console.log(loginData);
      console.log(password);
      console.log(loginData.password === password);
      if (loginData && loginData.password === password) {
        res.cookie('auth-user', JSON.stringify({
          userId: data.userId,
          email }));

        res.write(JSON.stringify({
          status: "SUCCESS" }));

      } else {
        res.write(JSON.stringify({
          status: "FAILURE" }));

      }
    } else {
      res.write(JSON.stringify({
        status: "FAILURE" }));

    }
    res.end();
  });return function signin(_x7, _x8) {return _ref4.apply(this, arguments);};}();

const logout = /*#__PURE__*/function () {var _ref5 = _asyncToGenerator(function* (req, res) {
    if (req.cookies['auth-user']) {
      console.log(req.cookies['auth-user']);
      res.clearCookie('auth-user');
      res.write(JSON.stringify({
        status: "SUCCESS" }));

    } else {
      res.write(JSON.stringify({
        status: "FAILURE" }));


    }
    res.end();
  });return function logout(_x9, _x10) {return _ref5.apply(this, arguments);};}();

const findNgos = /*#__PURE__*/function () {var _ref6 = _asyncToGenerator(function* (req, res) {
    const {
      ngoname } =
    req.body;
    console.log(ngoname);
    const out = yield (0, _dao.getAll)('NGO', {
      ngoname: new RegExp(ngoname, 'i') });

    console.log(out);
    if (out) {
      res.write(JSON.stringify({
        status: "SUCCESS",
        ngos: out }));

    } else {
      res.write(JSON.stringify({
        status: "FAILURE" }));

    }
    res.end();
  });return function findNgos(_x11, _x12) {return _ref6.apply(this, arguments);};}();

const addInterest = /*#__PURE__*/function () {var _ref7 = _asyncToGenerator(function* (req, res) {
    if (req.cookies['auth-user']) {
      console.log(req.cookies['auth-user']);
      const userId = JSON.parse(req.cookies['auth-user']).userId;
      const {
        ngoId } =
      req.body;
      console.log(ngoId);
      const out = yield (0, _dao.get)('User', {
        userId });

      console.log(out);
      if (out && out.interestId) {
        const interest = yield (0, _dao.get)('Interest', {
          interestId: out.interestId });

        if (interest) {
          if (interest.ngos.indexOf(ngoId) < 0) {
            interest.ngos.push(ngoId);
            yield (0, _dao.update)('Interest', interest, out.interestId);
          }
        }
        res.write(JSON.stringify({
          status: "SUCCESS",
          interest }));

      } else if (out) {
        const interests = [];
        interests.push(ngoId);
        const data = yield (0, _dao.save)('Interest', {
          ngos: interests });

        yield (0, _dao.update)('User', {
          interestId: data.interestId },
        userId);
        res.write(JSON.stringify({
          status: "SUCCESS",
          interest: data }));

      } else {
        res.write(JSON.stringify({
          status: "FAILURE" }));

      }
    } else {
      res.write(JSON.stringify({
        status: "FAILURE" }));

    }
    res.end();
  });return function addInterest(_x13, _x14) {return _ref7.apply(this, arguments);};}();

const getInterestedEvents = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator(function* (req, res) {
    if (req.cookies['auth-user']) {
      console.log(req.cookies['auth-user']);
      const userId = JSON.parse(req.cookies['auth-user']).userId;
      const out = yield (0, _dao.get)('User', {
        userId });

      if (out && out.interestId) {
        const events = [];
        const interests = yield (0, _dao.get)('Interest', {
          interestId: out.interestId });

        if (interests && interests.ngos && interests.ngos.length > 0) {
          yield Promise.all(interests.ngos.map( /*#__PURE__*/function () {var _ref9 = _asyncToGenerator(function* (ngoId) {
              //debugger
              const _ngo = yield (0, _dao.get)('NGO', {
                ngoId: parseInt(ngoId) });

              const _events = yield (0, _dao.getAll)('Events', {
                userId: _ngo.userId });

              if (_events) {
                _events.forEach(_evnt => {
                  events.push(_evnt);
                });
              }
            });return function (_x17) {return _ref9.apply(this, arguments);};}()));
          res.write(JSON.stringify({
            status: "SUCCESS",
            events }));

        } else {
          res.write(JSON.stringify({
            status: "SUCCESS",
            events: [] }));

        }
      } else {
        res.write(JSON.stringify({
          status: "SUCCESS",
          events: [] }));

      }
    } else {
      res.write(JSON.stringify({
        status: "FAILURE",
        events: [] }));

    }
    res.end();
  });return function getInterestedEvents(_x15, _x16) {return _ref8.apply(this, arguments);};}();

const getFavNgos = /*#__PURE__*/function () {var _ref10 = _asyncToGenerator(function* (req, res) {
    if (req.cookies['auth-user']) {
      console.log(req.cookies['auth-user']);
      console.log({
        userId: JSON.parse(req.cookies['auth-user']).userId });

      const data = yield (0, _dao.get)('User', {
        userId: JSON.parse(req.cookies['auth-user']).userId });

      const interest = yield (0, _dao.get)('Interest', {
        interestId: data.interestId });

      console.log(interest);
      const _ngos = [];
      interest.ngos.forEach(key => _ngos.push(parseInt(key)));
      const ngos = yield (0, _dao.getAll)('NGO', {
        'ngoId': {
          '$in': _ngos } });


      console.log(ngos);
      res.write(JSON.stringify(_objectSpread({
        status: "SUCCESS" },
      data, {
        ngos })));

      res.end();
    } else {
      res.write(JSON.stringify({
        status: "FAILURE" }));

      res.end();
    }
  });return function getFavNgos(_x18, _x19) {return _ref10.apply(this, arguments);};}();

const findNgoById = /*#__PURE__*/function () {var _ref11 = _asyncToGenerator(function* (req, res) {
    const {
      ngoId } =
    req.body;
    let userInt = undefined;
    if (req.cookies['auth-user']) {
      const data = yield (0, _dao.get)('User', {
        userId: JSON.parse(req.cookies['auth-user']).userId });

      userInt = yield (0, _dao.get)('Interest', {
        interestId: data.interestId });

      userInt = (userInt.ngos || []).map(key => parseInt(key));
    }
    const out = yield (0, _dao.get)('NGO', {
      ngoId: parseInt(ngoId) });

    console.log(out);
    if (out) {
      res.write(JSON.stringify({
        status: "SUCCESS",
        ngo: out,
        userInt }));

    } else {
      res.write(JSON.stringify({
        status: "FAILURE" }));

    }
    res.end();
  });return function findNgoById(_x20, _x21) {return _ref11.apply(this, arguments);};}();

const makeDonation = /*#__PURE__*/function () {var _ref12 = _asyncToGenerator(function* (req, res) {
    const {
      amt,
      ngoId } =
    req.body;
    if (req.cookies['auth-user']) {
      console.log(req.cookies['auth-user']);
      console.log({
        userId: JSON.parse(req.cookies['auth-user']).userId });

      const data = yield (0, _dao.get)('User', {
        userId: JSON.parse(req.cookies['auth-user']).userId });

      const txnData = yield (0, _dao.save)('Transaction', {
        amt,
        userId: data.userId,
        ngoId,
        status: 'PENDING' });

      console.log(txnData);
      res.write(JSON.stringify({
        status: "SUCCESS",
        txnData }));


    }
    res.end();
  });return function makeDonation(_x22, _x23) {return _ref12.apply(this, arguments);};}();

const getDonation = /*#__PURE__*/function () {var _ref13 = _asyncToGenerator(function* (req, res) {
    const {
      userId,
      txnId } =
    req.body;
    debugger;
    if (req.cookies['auth-user']) {
      if (parseInt(JSON.parse(req.cookies['auth-user']).userId) !== parseInt(userId)) {
        debugger;
        res.write(JSON.stringify({
          status: "FAILURE" }));

        res.end();
        return;
      }
      debugger;
      console.log(req.cookies['auth-user']);
      console.log({
        userId: JSON.parse(req.cookies['auth-user']).userId });

      const data = yield (0, _dao.get)('User', {
        userId: JSON.parse(req.cookies['auth-user']).userId });

      const txnData = yield (0, _dao.get)('Transaction', {
        userId: JSON.parse(req.cookies['auth-user']).userId,
        txnId: parseInt(txnId) });

      const ngoData = yield (0, _dao.get)('NGO', {
        ngoId: parseInt(txnData.ngoId) });

      res.write(JSON.stringify({
        status: "SUCCESS",
        userData: data,
        txnData,
        ngoData }));

    }
    res.end();
  });return function getDonation(_x24, _x25) {return _ref13.apply(this, arguments);};}();

const checkout = /*#__PURE__*/function () {var _ref14 = _asyncToGenerator(function* (req, res) {
    const {
      address,
      address2,
      cardname,
      cardno,
      country,
      cvv,
      email,
      exp,
      firstname,
      lastname,
      paymentMethod,
      state,
      zip,
      userId,
      txnId } =
    req.body;
    if (req.cookies['auth-user']) {
      if (parseInt(JSON.parse(req.cookies['auth-user']).userId) !== parseInt(userId)) {
        debugger;
        res.write(JSON.stringify({
          status: "FAILURE" }));

        res.end();
        return;
      }
      const payload = {
        address,
        address2,
        cardname,
        cardno,
        country,
        cvv,
        email,
        exp,
        firstname,
        lastname,
        paymentMethod,
        state,
        zip,
        userId,
        txnId: parseInt(txnId),
        status: 'CONFIRMED' };

      const out = yield (0, _dao.update)('Transaction', payload, txnId);
      res.write(JSON.stringify({
        status: "SUCCESS",
        txnData: out }));

    }
    res.end();
  });return function checkout(_x26, _x27) {return _ref14.apply(this, arguments);};}();

const getPendingDonations = /*#__PURE__*/function () {var _ref15 = _asyncToGenerator(function* (req, res) {
    if (req.cookies['auth-user']) {
      console.log(req.cookies['auth-user']);
      console.log({
        userId: JSON.parse(req.cookies['auth-user']).userId });

      const ngoData = yield (0, _dao.get)('NGO', {
        userId: parseInt(JSON.parse(req.cookies['auth-user']).userId) });

      console.log(ngoData);
      const txnData = yield (0, _dao.getAll)('Transaction', {
        ngoId: ngoData.ngoId.toString(),
        status: "CONFIRMED" });

      res.write(JSON.stringify({
        status: "SUCCESS",
        txnData }));

    }
    res.end();
  });return function getPendingDonations(_x28, _x29) {return _ref15.apply(this, arguments);};}();

const acceptDonation = /*#__PURE__*/function () {var _ref16 = _asyncToGenerator(function* (req, res) {
    const {
      txnId } =
    req.body;
    if (req.cookies['auth-user']) {
      console.log(req.cookies['auth-user']);
      console.log({
        userId: JSON.parse(req.cookies['auth-user']).userId });

      yield (0, _dao.update)('Transaction', {
        status: "ACCEPTED" },
      txnId);
      res.write(JSON.stringify({
        status: "SUCCESS" }));

    }
    res.end();
  });return function acceptDonation(_x30, _x31) {return _ref16.apply(this, arguments);};}();

const donationsForUser = /*#__PURE__*/function () {var _ref17 = _asyncToGenerator(function* (req, res) {
    if (req.cookies['auth-user']) {
      console.log(req.cookies['auth-user']);
      console.log({
        userId: JSON.parse(req.cookies['auth-user']).userId });

      const data = yield (0, _dao.getAll)('Transaction', {
        status: "ACCEPTED",
        userId: JSON.parse(req.cookies['auth-user']).userId.toString() });

      console.log(data);
      res.write(JSON.stringify({
        status: "SUCCESS",
        txns: data }));

    }
    res.end();
  });return function donationsForUser(_x32, _x33) {return _ref17.apply(this, arguments);};}();var _default =
{
  createUser,
  getAuthUser,
  addEvent,
  signin,
  logout,
  findNgos,
  addInterest,
  getInterestedEvents,
  getFavNgos,
  findNgoById,
  makeDonation,
  getDonation,
  checkout,
  getPendingDonations,
  acceptDonation,
  donationsForUser };exports.default = _default;module.exports = exports.default;
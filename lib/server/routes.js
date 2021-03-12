"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _express = _interopRequireDefault(require("express"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _userServices = require("../services/user-services");

var _renderPage = _interopRequireDefault(require("../render/render-page"));
var _path = _interopRequireDefault(require("path"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const router = _express.default.Router();var _default =

app => {
  const setupServices = () => {
    router.post('/api/user/crte', _userServices.createUser);
    router.post('/api/user/getAuthUser', _userServices.getAuthUser);
    router.post('/api/user/addInterest', _userServices.addInterest);
    router.post('/api/user/getInterestedEvents', _userServices.getInterestedEvents);
    router.post('/api/user/addNgo', _userServices.createUser);
    router.post('/api/user/addEvent', _userServices.addEvent);
    router.post('/api/user/getFavNgos', _userServices.getFavNgos);
    router.post('/api/user/findNgo', _userServices.findNgos);
    router.post('/api/user/findNgoById', _userServices.findNgoById);
    router.post('/api/logout', _userServices.logout);
    router.post('/api/signin', _userServices.signin);
    router.post('/api/user/donate', _userServices.makeDonation);
    router.post('/api/user/getDonation', _userServices.getDonation);
    router.post('/api/user/checkout', _userServices.checkout);
    router.post('/api/user/getPendingDonations', _userServices.getPendingDonations);
    router.post('/api/user/acceptDonation', _userServices.acceptDonation);
    router.post('/api/user/donationsForUser', _userServices.donationsForUser);
  };
  const setupRender = () => {
    router.get('/*', _renderPage.default);
  };
  const setupStatic = () => {
    app.use('/styles', _express.default.static(_path.default.join(__dirname, '../../', 'styles')));
    app.use('/js', _express.default.static(_path.default.join(__dirname, '../../', 'views', 'js')));
    app.use('/imgs', _express.default.static(_path.default.join(__dirname, '../../', 'img')));
  };
  app.use(_express.default.json());
  app.use((0, _cookieParser.default)());
  app.use(_express.default.urlencoded());
  setupStatic();
  setupRender();
  setupServices();
  app.use(router);
};exports.default = _default;module.exports = exports.default;
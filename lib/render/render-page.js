"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _path2 = _interopRequireDefault(require("path"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
const render = (req, res) => {
  const _path = req.path;
  console.log(_path);
  const isValid = res => {
    if (!(req.cookies['auth-user'] && JSON.parse(req.cookies['auth-user']).userId)) {
      res.redirect('/');
      //res.sendFile(path.resolve(__dirname, `../../`, 'views', 'home.html'))
      return false;
    }
    return true;
  };
  switch (_path) {
    case `/home`:
      res.sendFile(_path2.default.resolve(__dirname, `../../`, 'views', 'home.html'));
      break;
    case `/signin`:
      res.sendFile(_path2.default.resolve(__dirname, `../../`, 'views', 'signin.html'));
      break;
    case `/signup`:
      res.sendFile(_path2.default.resolve(__dirname, `../../`, 'views', 'signup.html'));
      break;
    case `/donate`:
      if (isValid(res))
      res.sendFile(_path2.default.resolve(__dirname, `../../`, 'views', 'donation.html'));
      break;
    case `/profile`:
      if (isValid(res))
      res.sendFile(_path2.default.resolve(__dirname, `../../`, 'views', 'profile.html'));
      break;
    case `/search`:
      if (isValid(res))
      res.sendFile(_path2.default.resolve(__dirname, `../../`, 'views', 'profile.html'));
      break;
    case `/add_ngo`:
      res.sendFile(_path2.default.resolve(__dirname, `../../`, 'views', 'ngo_reg.html'));
      break;
    case `/ngo_profile`:
      if (isValid(res))
      res.sendFile(_path2.default.resolve(__dirname, `../../`, 'views', 'ngo_profile.html'));
      break;
    case `/soon`:
      res.sendFile(_path2.default.resolve(__dirname, `../../`, 'views', 'soon.html'));
      break;
    default:
      res.sendFile(_path2.default.resolve(__dirname, `../../`, 'views', 'home.html'));}

};var _default =

render;exports.default = _default;module.exports = exports.default;
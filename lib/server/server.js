"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.start = void 0;var _http = _interopRequireDefault(require("http"));
var _express = _interopRequireDefault(require("express"));
var _routes = _interopRequireDefault(require("./routes"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const app = (0, _express.default)();
const PORT_NUM = 9000;

const start = () => {
  const server = _http.default.createServer(app);
  (0, _routes.default)(app);
  server.listen(PORT_NUM, () => {console.log(`now listening on ${PORT_NUM}`);});
};exports.start = start;
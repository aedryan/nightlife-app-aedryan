(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/404/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFound = function (_React$Component) {
	_inherits(NotFound, _React$Component);

	function NotFound() {
		_classCallCheck(this, NotFound);

		return _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).apply(this, arguments));
	}

	_createClass(NotFound, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				'404 Not Found'
			);
		}
	}]);

	return NotFound;
}(_react2.default.Component);

exports.default = NotFound;

});

require.register("components/header-nav/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderNav = function (_React$Component) {
    _inherits(HeaderNav, _React$Component);

    function HeaderNav(props) {
        _classCallCheck(this, HeaderNav);

        var _this = _possibleConstructorReturn(this, (HeaderNav.__proto__ || Object.getPrototypeOf(HeaderNav)).call(this, props));

        _this.state = {
            username: props.username
        };
        return _this;
    }

    _createClass(HeaderNav, [{
        key: "getLoginElem",
        value: function getLoginElem() {
            if (this.props.loggedIn) {
                return _react2.default.createElement(
                    "div",
                    { className: "dropdown" },
                    _react2.default.createElement(
                        "a",
                        { className: "dropdown-toggle", type: "button", id: "dropdownMenu1", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "true" },
                        _react2.default.createElement(
                            "span",
                            null,
                            this.state.username
                        ),
                        _react2.default.createElement("span", { className: "caret" })
                    ),
                    _react2.default.createElement(
                        "ul",
                        { className: "dropdown-menu", "aria-labelledby": "dropdownMenu1" },
                        _react2.default.createElement(
                            "li",
                            null,
                            _react2.default.createElement(
                                "a",
                                { href: "/auth/logout" },
                                "Log Out"
                            )
                        )
                    )
                );
            } else {
                return _react2.default.createElement(
                    "a",
                    { href: "/auth/facebook" },
                    "Log in with Facebook"
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { id: "header-nav" },
                _react2.default.createElement(
                    "a",
                    { href: "/home" },
                    "Home"
                ),
                _react2.default.createElement(
                    "h1",
                    null,
                    "Nightlife"
                ),
                this.getLoginElem()
            );
        }
    }]);

    return HeaderNav;
}(_react2.default.Component);

exports.default = HeaderNav;

});

require.register("components/home/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
	_inherits(Home, _React$Component);

	function Home(props) {
		_classCallCheck(this, Home);

		var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(Home, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ id: "home" },
				_react2.default.createElement(
					"h2",
					null,
					"Nightlife"
				)
			);
		}
	}]);

	return Home;
}(_react2.default.Component);

exports.default = Home;

});

require.register("index.js", function(exports, require, module) {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _routes = require('routes');

var _routes2 = _interopRequireDefault(_routes);

var _headerNav = require('components/header-nav');

var _headerNav2 = _interopRequireDefault(_headerNav);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createBrowserHistory2.default)();

document.addEventListener('DOMContentLoaded', function () {

  _http2.default.get('/db/user', function (res) {
    var rawData = '';

    res.on('data', function (chunk) {
      rawData += chunk;
    });

    res.on('end', function () {
      var data = rawData;
      var loggedIn = (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === "object";
      var username = data ? data.name : '';
      var userID = data ? data.id : '';

      _reactDom2.default.render(_react2.default.createElement(
        'div',
        { id: 'app' },
        _react2.default.createElement(_headerNav2.default, { loggedIn: loggedIn, username: username }),
        _react2.default.createElement(_routes2.default, { history: history, loggedIn: loggedIn, userID: userID })
      ), document.querySelector('#root'));
    });
  });
});

});

require.register("routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _home = require('components/home');

var _home2 = _interopRequireDefault(_home);

var _ = require('components/404');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = function Routes(props) {
    return _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        props,
        _react2.default.createElement(
            'div',
            { className: 'main-content' },
            _react2.default.createElement(
                _reactRouterDom.Switch,
                null,
                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', render: function render() {
                        return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/home' });
                    } }),
                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/home', render: function render() {
                        return _react2.default.createElement(_home2.default, { loggedIn: props.loggedIn });
                    } }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '*', component: _2.default })
            )
        )
    );
};

exports.default = Routes;

});

require.alias("buffer/index.js", "buffer");
require.alias("events/events.js", "events");
require.alias("stream-http/index.js", "http");
require.alias("process/browser.js", "process");
require.alias("punycode/punycode.js", "punycode");
require.alias("querystring-es3/index.js", "querystring");
require.alias("stream-browserify/index.js", "stream");
require.alias("url/url.js", "url");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map
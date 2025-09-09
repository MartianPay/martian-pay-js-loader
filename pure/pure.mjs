import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';

var SCRIPT_URL = "http://localhost:6003/js/app.js";
var SCRIPT_URL_REGEX = new RegExp(SCRIPT_URL);
var EXISTING_SCRIPT_MESSAGE = 'loadMartian.setLoadParameters was called but an existing Martian.js script already exists in the document; existing script parameters will be used';
var martianPromise = null;
var loadCalled = false;
var loadParameters = null;
var getMartianPromise = function getMartianPromise() {
  if (martianPromise) {
    return martianPromise;
  }
  var p = loadScript(loadParameters);
  martianPromise = p.catch(function (error) {
    // clear cache on error
    martianPromise = null;
    return Promise.reject(error);
  });
  return martianPromise;
};
var findScript = function findScript() {
  var scripts = document.querySelectorAll("script[src^=\"".concat(SCRIPT_URL, "\"]"));
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];
    if (!SCRIPT_URL_REGEX.test(script.src)) {
      continue;
    }
    return script;
  }
  return null;
};
var injectScript = function injectScript(params) {
  var queryString = params && !params.advancedFraudSignals ? '?advancedFraudSignals=false' : '';
  var script = document.createElement('script');
  script.src = "".concat(SCRIPT_URL).concat(queryString);
  var headOrBody = document.head || document.body;
  if (!headOrBody) {
    throw new Error('Expected document.body not to be null. Martian.js requires a <body> element.');
  }
  headOrBody.appendChild(script);
  return script;
};
var registerWrapper = function registerWrapper(martian, startTime) {
  if (!martian || !martian._registerWrapper) {
    return;
  }
  martian._registerWrapper({
    name: 'martian-js',
    version: "0.0.4",
    startTime: startTime
  });
};
var onErrorListener = null;
var onLoadListener = null;
var onError = function onError(reject) {
  return function () {
    reject(new Error('Failed to load Martian.js'));
  };
};
var onLoad = function onLoad(resolve, reject) {
  return function () {
    if (window.martian) {
      resolve(window.martian);
    } else {
      reject(new Error('Martian.js not available'));
    }
  };
};
var loadScript = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(params) {
    return _regeneratorRuntime.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(martianPromise !== null)) {
            _context.next = 1;
            break;
          }
          return _context.abrupt("return", martianPromise);
        case 1:
          martianPromise = new Promise(function (resolve, reject) {
            if (typeof window === 'undefined' || typeof document === 'undefined') {
              // Resolve to null when imported server side. This makes the module
              // safe to import in an isomorphic code base.
              resolve(null);
              return;
            }
            if (window.martian && params) {
              console.warn(EXISTING_SCRIPT_MESSAGE);
            }
            if (window.martian) {
              resolve(window.martian);
              return;
            }
            try {
              var script = findScript();
              if (script && params) {
                console.warn(EXISTING_SCRIPT_MESSAGE);
              } else if (!script) {
                script = injectScript(params);
              } else if (script && onLoadListener !== null && onErrorListener !== null) {
                var _script$parentNode;
                // remove event listeners
                script.removeEventListener('load', onLoadListener);
                script.removeEventListener('error', onErrorListener);
                // if script exists, but we are reloading due to an error,
                // reload script to trigger 'load' event
                (_script$parentNode = script.parentNode) === null || _script$parentNode === void 0 || _script$parentNode.removeChild(script);
                script = injectScript(params);
              }
              onLoadListener = onLoad(resolve, reject);
              onErrorListener = onError(reject);
              script.addEventListener('load', onLoadListener);
              script.addEventListener('error', onErrorListener);
            } catch (error) {
              reject(error);
              return;
            }
          });
          // Resets martianPromise on error
          return _context.abrupt("return", martianPromise.catch(function (error) {
            martianPromise = null;
            return Promise.reject(error);
          }));
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function loadScript(_x) {
    return _ref.apply(this, arguments);
  };
}();
var initMartian = function initMartian(maybeMartian, args, startTime) {
  if (maybeMartian === null) {
    return null;
  }
  var martian = maybeMartian.apply(undefined, args);
  registerWrapper(martian, startTime);
  return martian;
};
var loadMartian = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var _len,
      args,
      _key,
      startTime,
      _args2 = arguments;
    return _regeneratorRuntime.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          for (_len = _args2.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = _args2[_key];
          }
          loadCalled = true;
          startTime = Date.now();
          return _context2.abrupt("return", getMartianPromise().then(function (maybeMartian) {
            return initMartian(maybeMartian, args, startTime);
          }));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function loadMartian() {
    return _ref2.apply(this, arguments);
  };
}();
// Add setLoadParameters function for pure module
var setLoadParameters = function setLoadParameters(params) {
  if (loadCalled) {
    console.warn('loadMartian.setLoadParameters was called after loadMartian was called. This has no effect.');
    return;
  }
  loadParameters = params;
};
// Attach setLoadParameters to loadMartian for convenience
loadMartian.setLoadParameters = setLoadParameters;

export { loadMartian, setLoadParameters };

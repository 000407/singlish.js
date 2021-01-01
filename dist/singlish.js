(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 97:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./src/singlish.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Singlish = /*#__PURE__*/function () {
  function Singlish() {
    _classCallCheck(this, Singlish);
  }

  _createClass(Singlish, [{
    key: "parse",
    value: function parse(text) {
      var literals = Singlish.LITERALS;
      var i = 0;

      while (true) {
        if (i >= 50) break;
        var yansaya = 0,
            rakaransha = 0,
            repaya = 0,
            hal_able = 1;
        var initMatches = text.match(Singlish.MARKUP_PATTERN);

        if (!initMatches) {
          // console.log('END?');
          return text;
        }

        if (initMatches[0].match(VOWELS)) {
          var translit = initMatches[0].match(VOWELS)[0];
          text = text.replace(translit, literals[translit]);
        } else if (initMatches[0].match(Singlish.CONSONANTS)) {
          var m = initMatches[0].match(Singlish.CONSONANTS);
          var consonant = null;

          if (initMatches[0].match(Singlish.NASALISED)) {
            // console.log('NASALISED', mN);
            consonant = initMatches[0].match(Singlish.NASALISED)[0];
          } else if (initMatches[0].match(Singlish.SP_CHARS)) {
            // console.log('SP_CHARS', mSC);
            consonant = initMatches[0].match(Singlish.SP_CHARS)[0];
          } else if (initMatches[0].match(Singlish.SP_CEREBRALS)) {
            // console.log('SP_CEREBRALS', mSR);
            consonant = initMatches[0].match(Singlish.SP_CEREBRALS)[0];
          } else if (initMatches[0].match(Singlish.CEREBRALS)) {
            // console.log('CEREBRALS', mC);
            consonant = initMatches[0].match(Singlish.CEREBRALS)[0];
          } else if (initMatches[0].match(Singlish.SP_CONSONANTS)) {
            // console.log('SP_CONSONANTS', mSO);
            consonant = initMatches[0].match(Singlish.SP_CONSONANTS)[0];
          } else {
            // console.log('CONSONANTS', m);
            consonant = m[0];
          }

          var i_1 = text.indexOf(consonant) + consonant.length;
          var modifier = 0;
          var translit = consonant;

          if (text.charCodeAt(i_1) == 32) {
            hal_able = 1;
          } else if (text.substr(i_1).match(Singlish.SP_CHARS)) {
            modifier = text.substr(i_1).match(Singlish.SP_CHARS)[0];
            translit += modifier;
            hal_able = 0;
          } else if (text.charAt(i_1).match(Singlish.CONSONANTS)) {
            if (text.charAt(i_1) == 'r') {
              rakaransha = 1;
              translit += 'r';

              if (text.substr(i_1 + 1).match(Singlish.VOWELS)) {
                modifier = text.substr(i_1 + 1).match(Singlish.VOWELS)[0];
                translit += modifier;
                hal_able = 0;
              }
            }
          } else {
            if (text.charAt(i_1) == 'Y') {
              yansaya = 1;
              translit += 'Y';
            }

            if (text.substr(i_1).match(Singlish.VOWELS)) {
              modifier = text.substr(i_1).match(Singlish.VOWELS)[0];
              translit += modifier;
              hal_able = 0;
            }
          }

          if (consonant.match(/\\[nh]/)) {
            hal_able = 0;
          }

          if (consonant.startsWith('R')) {
            repaya = 1;
            consonant = consonant.replace(/^./, '');
          }

          var sinhala = (repaya ? literals['R'] : '') + literals[consonant] + (yansaya ? literals['Y'] : '') + (rakaransha ? literals['rr'] : '') + literals['modifiers'][modifier ? modifier : hal_able ? 'hal' : 'none'];
          text = text.replace(translit, sinhala);
        } else {
          var translit = initMatches[0];
          text = text.replace(translit, literals[translit]);
        }

        i++;
      }
    }
  }], [{
    key: "MARKUP_PATTERN",
    get: function get() {
      return /(\\)?[a-zA-Z]+/;
    }
  }, {
    key: "CONSONANTS",
    get: function get() {
      return /^((\\[nhNRJ])|(R?[bBcCdDfgGhjJkKlLmnNpPqsStTvwy])|(r))/;
    }
  }, {
    key: "SP_CONSONANTS",
    get: function get() {
      return /^\\[nhNRJ]/;
    }
  }, {
    key: "CEREBRALS",
    get: function get() {
      return /^[bcCdDgkpsStT]h/;
    }
  }, {
    key: "SP_CEREBRALS",
    get: function get() {
      return /^[GK]N/;
    }
  }, {
    key: "NASALISED",
    get: function get() {
      return /^(nnd(h)?|nng|mmb)/;
    }
  }, {
    key: "VOWELS",
    get: function get() {
      return /^((a[au]?)|(ee?)|(ii?)|(oo?)|(uu?)|(Aa?)|I)/;
    }
  }, {
    key: "SP_CHARS",
    get: function get() {
      return /^Ruu?/;
    }
  }, {
    key: "LITERALS",
    get: function get() {
      return {
        aa: "\u0D86",
        Aa: "\u0D88",
        ii: "\u0D8A",
        uu: "\u0D8C",
        ee: "\u0D92",
        oo: "\u0D95",
        au: "\u0D96",
        a: "\u0D85",
        A: "\u0D87",
        i: "\u0D89",
        u: "\u0D8B",
        e: "\u0D91",
        o: "\u0D94",
        I: "\u0D93",
        modifiers: {
          oo: "\u0DDD",
          aa: "\u0DCF",
          Aa: "\u0DD1",
          ii: "\u0DD3",
          ee: "\u0DDA",
          uu: "\u0DD6",
          au: "\u0DDE",
          a: '',
          A: "\u0DD0",
          i: "\u0DD2",
          e: "\u0DD9",
          u: "\u0DD4",
          o: "\u0DDC",
          I: "\u0DDB",
          hal: "\u0DCA",
          //Special characters
          Ru: "\u0DD8",
          Ruu: "\u0DF2",
          none: ''
        },
        //Special consonants
        '\\n': "\u0D82",
        '\\h': "\u0D83",
        '\\N': "\u0D9E",
        '\\R': "\u0D8D",
        '\\J': "\u0DA6",
        //Consonants
        k: "\u0D9A",
        K: "\u0D9B",
        g: "\u0D9C",
        G: "\u0D9D",
        nng: "\u0D9F",
        ch: "\u0DA0",
        Ch: "\u0DA1",
        j: "\u0DA2",
        J: "\u0DA3",
        KN: "\u0DA4",
        GN: "\u0DA5",
        t: "\u0DA7",
        T: "\u0DA8",
        d: "\u0DA9",
        D: "\u0DAA",
        N: "\u0DAB",
        nnd: "\u0DAC",
        th: "\u0DAD",
        Th: "\u0DAE",
        dh: "\u0DAF",
        Dh: "\u0DB0",
        n: "\u0DB1",
        nndh: "\u0DB3",
        p: "\u0DB4",
        P: "\u0DB5",
        b: "\u0DB6",
        B: "\u0DB7",
        m: "\u0DB8",
        mmb: "\u0DB9",
        y: "\u0DBA",
        r: "\u0DBB",
        l: "\u0DBD",
        v: "\u0DC0",
        w: "\u0DC0",
        sh: "\u0DC1",
        Sh: "\u0DC2",
        s: "\u0DC3",
        h: "\u0DC4",
        L: "\u0DC5",
        Lu: "\u0DC5\u0DD4",
        f: "\u0DC6",
        kr: "\u0D9A\u0DCA\u200D\u0DBB",
        Y: "\u0DCA\u200D\u0DBA",
        rr: "\u0DCA\u200D\u0DBB",
        R: "\u0DBB\u0DCA\u200D"
      };
    }
  }]);

  return Singlish;
}();


;// CONCATENATED MODULE: ./src/index.js


(function (window) {
  window.Singlish = new Singlish();
})(window);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(97);
/******/ })()
;
});
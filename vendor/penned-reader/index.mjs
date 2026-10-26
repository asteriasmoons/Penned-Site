/* Generated from penned-editor/src/public-document.js. */
import {createRequire as readerRequire} from "node:module"; const require = readerRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/fast-formula-parser/grammar/type/collection.js
var require_collection = __commonJS({
  "node_modules/fast-formula-parser/grammar/type/collection.js"(exports2, module2) {
    var Collection = class {
      constructor(data, refs) {
        if (data == null && refs == null) {
          this._data = [];
          this._refs = [];
        } else {
          if (data.length !== refs.length)
            throw Error("Collection: data length should match references length.");
          this._data = data;
          this._refs = refs;
        }
      }
      get data() {
        return this._data;
      }
      get refs() {
        return this._refs;
      }
      get length() {
        return this._data.length;
      }
      /**
       * Add data and references to this collection.
       * @param {{}} obj - data
       * @param {{}} ref - reference
       */
      add(obj, ref) {
        this._data.push(obj);
        this._refs.push(ref);
      }
    };
    module2.exports = Collection;
  }
});

// node_modules/fast-formula-parser/formulas/helpers.js
var require_helpers = __commonJS({
  "node_modules/fast-formula-parser/formulas/helpers.js"(exports2, module2) {
    var FormulaError = require_error();
    var Collection = require_collection();
    var Types = {
      NUMBER: 0,
      ARRAY: 1,
      BOOLEAN: 2,
      STRING: 3,
      RANGE_REF: 4,
      // can be 'A:C' or '1:4', not only 'A1:C3'
      CELL_REF: 5,
      COLLECTIONS: 6,
      // Unions of references
      NUMBER_NO_BOOLEAN: 10
    };
    var Factorials = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368e3, 20922789888e3, 355687428096e3, 6402373705728e3, 121645100408832e3, 243290200817664e4, 5109094217170944e4, 11240007277776077e5, 2585201673888498e7, 6204484017332394e8, 15511210043330986e9, 40329146112660565e10, 10888869450418352e12, 30488834461171387e13, 8841761993739702e15, 26525285981219107e16, 8222838654177922e18, 2631308369336935e20, 8683317618811886e21, 29523279903960416e22, 10333147966386145e24, 37199332678990125e25, 13763753091226346e27, 5230226174666011e29, 20397882081197444e30, 8159152832478977e32, 3345252661316381e34, 140500611775288e37, 6041526306337383e37, 2658271574788449e39, 11962222086548019e40, 5502622159812089e42, 25862324151116818e43, 12413915592536073e45, 6082818640342675e47, 30414093201713376e48, 15511187532873822e50, 8065817517094388e52, 42748832840600255e53, 2308436973392414e56, 12696403353658276e57, 7109985878048635e59, 40526919504877214e60, 23505613312828785e62, 13868311854568984e64, 832098711274139e67, 5075802138772248e68, 3146997326038794e70, 198260831540444e73, 12688693218588417e73, 8247650592082472e75, 5443449390774431e77, 3647111091818868e79, 24800355424368305e80, 1711224524281413e83, 11978571669969892e84, 8504785885678623e86, 61234458376886085e87, 44701154615126844e89, 3307885441519386e92, 248091408113954e95, 18854947016660504e95, 14518309202828587e97, 11324281178206297e99, 8946182130782976e101, 7156945704626381e103, 5797126020747368e105, 4753643337012842e107, 3945523969720659e109, 3314240134565353e111, 281710411438055e114, 24227095383672734e114, 2107757298379528e117, 18548264225739844e118, 1650795516090846e121, 14857159644817615e122, 1352001527678403e125, 12438414054641308e126, 11567725070816416e128, 1087366156656743e131, 1032997848823906e133, 9916779348709496e134, 9619275968248212e136, 9426890448883248e138, 9332621544394415e140, 9332621544394415e142];
    var ReversedTypes = {};
    Object.keys(Types).forEach((key) => {
      ReversedTypes[Types[key]] = key;
    });
    var FormulaHelpers = class {
      constructor() {
        this.Types = Types;
        this.type2Number = {
          number: Types.NUMBER,
          boolean: Types.BOOLEAN,
          string: Types.STRING,
          object: -1
        };
      }
      checkFunctionResult(result) {
        const type = typeof result;
        if (type === "number") {
          if (isNaN(result)) {
            return FormulaError.VALUE;
          } else if (!isFinite(result)) {
            return FormulaError.NUM;
          }
        }
        if (result === void 0 || result === null)
          return FormulaError.NULL;
        return result;
      }
      /**
       * Flatten an array
       * @param {Array} arr1
       * @returns {*}
       */
      flattenDeep(arr1) {
        return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(this.flattenDeep(val)) : acc.concat(val), []);
      }
      /**
       *
       * @param obj
       * @param isArray - if it is an array: [1,2,3], will extract the first element
       * @param allowBoolean - Allow parse boolean into number
       * @returns {number|FormulaError}
       */
      acceptNumber(obj, isArray2 = true, allowBoolean = true) {
        if (obj instanceof FormulaError)
          return obj;
        let number;
        if (typeof obj === "number")
          number = obj;
        else if (typeof obj === "boolean") {
          if (allowBoolean) {
            number = Number(obj);
          } else {
            throw FormulaError.VALUE;
          }
        } else if (typeof obj === "string") {
          if (obj.length === 0) {
            throw FormulaError.VALUE;
          }
          number = Number(obj);
          if (number !== number) {
            throw FormulaError.VALUE;
          }
        } else if (Array.isArray(obj)) {
          if (!isArray2) {
            if (obj[0].length === 1) {
              number = this.acceptNumber(obj[0][0]);
            } else {
              throw FormulaError.VALUE;
            }
          } else {
            number = this.acceptNumber(obj[0][0]);
          }
        } else {
          throw Error("Unknown type in FormulaHelpers.acceptNumber");
        }
        return number;
      }
      /**
       * Flatten parameters to 1D array.
       * @see {@link FormulaHelpers.accept}
       * @param {Array} params - Parameter that needs to flatten.
       * @param {Types|null} valueType - The type each item should be,
       *                          null if allows any type. This only applies to literals.
       * @param {boolean} allowUnion - Allow union, e.g. (A1:C1, E4:F3)
       * @param {function} hook - Invoked after parsing each item.
       *                         of the array.
       * @param {*} [defValue=null] - The value if an param is omitted. i.e. SUM(1,2,,,,,)
       * @param {number} [minSize=1] - The minimum size of the parameters
       */
      flattenParams(params, valueType, allowUnion, hook, defValue = null, minSize = 1) {
        if (params.length < minSize)
          throw FormulaError.ARG_MISSING([valueType]);
        if (defValue == null) {
          defValue = valueType === Types.NUMBER ? 0 : valueType == null ? null : "";
        }
        params.forEach((param) => {
          const { isCellRef, isRangeRef, isArray: isArray2 } = param;
          const isUnion = param.value instanceof Collection;
          const isLiteral = !isCellRef && !isRangeRef && !isArray2 && !isUnion;
          const info = { isLiteral, isCellRef, isRangeRef, isArray: isArray2, isUnion };
          if (isLiteral) {
            if (param.omitted)
              param = defValue;
            else
              param = this.accept(param, valueType, defValue);
            hook(param, info);
          } else if (isCellRef) {
            hook(param.value, info);
          } else if (isUnion) {
            if (!allowUnion) throw FormulaError.VALUE;
            param = param.value.data;
            param = this.flattenDeep(param);
            param.forEach((item) => {
              hook(item, info);
            });
          } else if (isRangeRef || isArray2) {
            param = this.flattenDeep(param.value);
            param.forEach((item) => {
              hook(item, info);
            });
          }
        });
      }
      /**
       * Check if the param valid, return the parsed param.
       * If type is not given, return the un-parsed param.
       * @param {*} param
       * @param {number|null} [type] - The expected type
       *           NUMBER: Expect a single number,
       *           ARRAY: Expect an flatten array,
       *           BOOLEAN: Expect a single boolean,
       *           STRING: Expect a single string,
       *           COLLECTIONS: Expect an Array of the above types
       *           null: Do not parse the value, return it directly.
       *           The collection is not a flatted array.
       * @param {*} [defValue] - Default value if the param is not given.
       *               if undefined, this param is required, a Error will throw if not given.
       *               if null, and param is undefined, null will be returned.
       * @param {boolean} [flat=true] - If the array should be flattened,
       *                      only applicable when type is ARRAY.
       *                      If false, collection is disallowed.
       * @param {boolean} allowSingleValue - If pack single value into 2d array,
       *                     only applicable when type is ARRAY.
       * @return {string|number|boolean|{}|Array}
       */
      accept(param, type = null, defValue, flat = true, allowSingleValue = false) {
        if (Array.isArray(type))
          type = type[0];
        if (param == null && defValue === void 0) {
          throw FormulaError.ARG_MISSING([type]);
        } else if (param == null)
          return defValue;
        if (typeof param !== "object" || Array.isArray(param))
          return param;
        const isArray2 = param.isArray;
        if (param.value != null) param = param.value;
        if (type == null)
          return param;
        if (param instanceof FormulaError)
          throw param;
        if (type === Types.ARRAY) {
          if (Array.isArray(param)) {
            return flat ? this.flattenDeep(param) : param;
          } else if (param instanceof Collection) {
            throw FormulaError.VALUE;
          } else if (allowSingleValue) {
            return flat ? [param] : [[param]];
          }
          throw FormulaError.VALUE;
        } else if (type === Types.COLLECTIONS) {
          return param;
        }
        if (isArray2) {
          param = param[0][0];
        }
        const paramType = this.type(param);
        if (type === Types.STRING) {
          if (paramType === Types.BOOLEAN)
            param = param ? "TRUE" : "FALSE";
          else
            param = `${param}`;
        } else if (type === Types.BOOLEAN) {
          if (paramType === Types.STRING)
            throw FormulaError.VALUE;
          if (paramType === Types.NUMBER)
            param = Boolean(param);
        } else if (type === Types.NUMBER) {
          param = this.acceptNumber(param, false);
        } else if (type === Types.NUMBER_NO_BOOLEAN) {
          param = this.acceptNumber(param, false, false);
        } else {
          throw FormulaError.VALUE;
        }
        return param;
      }
      type(variable) {
        let type = this.type2Number[typeof variable];
        if (type === -1) {
          if (Array.isArray(variable))
            type = Types.ARRAY;
          else if (variable.ref) {
            if (variable.ref.from) {
              type = Types.RANGE_REF;
            } else {
              type = Types.CELL_REF;
            }
          } else if (variable instanceof Collection)
            type = Types.COLLECTIONS;
        }
        return type;
      }
      isRangeRef(param) {
        return param.ref && param.ref.from;
      }
      isCellRef(param) {
        return param.ref && !param.ref.from;
      }
      /**
       * Helper function for SUMIF, AVERAGEIF,...
       * @param context
       * @param range1
       * @param range2
       */
      retrieveRanges(context, range1, range2) {
        range2 = Address.extend(range1, range2);
        range1 = this.retrieveArg(context, range1);
        range1 = H.accept(range1, Types.ARRAY, void 0, false, true);
        if (range2 !== range1) {
          range2 = this.retrieveArg(context, range2);
          range2 = H.accept(range2, Types.ARRAY, void 0, false, true);
        } else
          range2 = range1;
        return [range1, range2];
      }
      retrieveArg(context, arg) {
        if (arg === null)
          return { value: 0, isArray: false, omitted: true };
        const res = context.utils.extractRefValue(arg);
        return { value: res.val, isArray: res.isArray, ref: arg.ref };
      }
    };
    var H = new FormulaHelpers();
    var WildCard = {
      /**
       * @param {string|*} obj
       * @returns {*}
       */
      isWildCard: (obj) => {
        if (typeof obj === "string")
          return /[*?]/.test(obj);
        return false;
      },
      toRegex: (lookupText, flags) => {
        return RegExp(lookupText.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/([^~]??)[?]/g, "$1.").replace(/([^~]??)[*]/g, "$1.*").replace(/~([?*])/g, "$1"), flags);
      }
    };
    var Criteria = {
      /**
       * Parse criteria, support comparison and wild card match.
       * @param {string|number} criteria
       * @return {{op: string, value: string|number|boolean|RegExp, match: boolean|undefined}} - The parsed criteria.
       */
      parse: (criteria) => {
        const type = typeof criteria;
        if (type === "string") {
          const upper = criteria.toUpperCase();
          if (upper === "TRUE" || upper === "FALSE") {
            return { op: "=", value: upper === "TRUE" };
          }
          const res = criteria.match(/(<>|>=|<=|>|<|=)(.*)/);
          if (res) {
            let op = res[1], value;
            if (isNaN(res[2])) {
              const upper2 = res[2].toUpperCase();
              if (upper2 === "TRUE" || upper2 === "FALSE") {
                value = upper2 === "TRUE";
              } else if (/#NULL!|#DIV\/0!|#VALUE!|#NAME\?|#NUM!|#N\/A|#REF!/.test(res[2])) {
                value = new FormulaError(res[2]);
              } else {
                value = res[2];
                if (WildCard.isWildCard(value)) {
                  return { op: "wc", value: WildCard.toRegex(value), match: op === "=" };
                }
              }
            } else {
              value = Number(res[2]);
            }
            return { op, value };
          } else if (WildCard.isWildCard(criteria)) {
            return { op: "wc", value: WildCard.toRegex(criteria), match: true };
          } else {
            return { op: "=", value: criteria };
          }
        } else if (type === "boolean" || type === "number" || (Array.isArray(criteria) || criteria instanceof FormulaError)) {
          return { op: "=", value: criteria };
        } else {
          throw Error(`Criteria.parse: type ${typeof criteria} not support`);
        }
      }
    };
    var Address = {
      columnNumberToName: (number) => {
        let dividend = number;
        let name = "";
        let modulo = 0;
        while (dividend > 0) {
          modulo = (dividend - 1) % 26;
          name = String.fromCharCode("A".charCodeAt(0) + modulo) + name;
          dividend = Math.floor((dividend - modulo) / 26);
        }
        return name;
      },
      columnNameToNumber: (columnName) => {
        columnName = columnName.toUpperCase();
        const len = columnName.length;
        let number = 0;
        for (let i = 0; i < len; i++) {
          const code = columnName.charCodeAt(i);
          if (!isNaN(code)) {
            number += (code - 64) * 26 ** (len - i - 1);
          }
        }
        return number;
      },
      /**
       * Extend range2 to match with the dimension in range1.
       * @param {{ref: {}}} range1
       * @param {{ref: {}}} [range2]
       */
      extend: (range1, range2) => {
        if (range2 == null) {
          return range1;
        }
        let rowOffset, colOffset;
        if (H.isCellRef(range1)) {
          rowOffset = 0;
          colOffset = 0;
        } else if (H.isRangeRef(range1)) {
          rowOffset = range1.ref.to.row - range1.ref.from.row;
          colOffset = range1.ref.to.col - range1.ref.from.col;
        } else throw Error("Address.extend should not reach here.");
        if (H.isCellRef(range2)) {
          if (rowOffset > 0 || colOffset > 0)
            range2 = {
              ref: {
                from: { col: range2.ref.col, row: range2.ref.row },
                to: { row: range2.ref.row + rowOffset, col: range2.ref.col + colOffset }
              }
            };
        } else {
          range2.ref.to.row = range2.ref.from.row + rowOffset;
          range2.ref.to.col = range2.ref.from.col + colOffset;
        }
        return range2;
      }
    };
    module2.exports = {
      FormulaHelpers: H,
      Types,
      ReversedTypes,
      Factorials,
      WildCard,
      Criteria,
      Address
    };
  }
});

// node_modules/fast-formula-parser/formulas/error.js
var require_error = __commonJS({
  "node_modules/fast-formula-parser/formulas/error.js"(exports2, module2) {
    var FormulaError = class _FormulaError extends Error {
      /**
       * @param {string} error - error code, i.e. #NUM!
       * @param {string} [msg] - detailed error message
       * @param {object|Error} [details]
       * @returns {FormulaError}
       */
      constructor(error, msg, details) {
        super(msg);
        if (msg == null && details == null && _FormulaError.errorMap.has(error))
          return _FormulaError.errorMap.get(error);
        else if (msg == null && details == null) {
          this._error = error;
          _FormulaError.errorMap.set(error, this);
        } else {
          this._error = error;
        }
        this.details = details;
      }
      /**
       * Get the error name.
       * @returns {string} formula error
       */
      get error() {
        return this._error;
      }
      get name() {
        return this._error;
      }
      /**
       * Return true if two errors are same.
       * @param {FormulaError} err
       * @returns {boolean} if two errors are same.
       */
      equals(err) {
        return err instanceof _FormulaError && err._error === this._error;
      }
      /**
       * Return the formula error in string representation.
       * @returns {string} the formula error in string representation.
       */
      toString() {
        return this._error;
      }
    };
    FormulaError.errorMap = /* @__PURE__ */ new Map();
    FormulaError.DIV0 = new FormulaError("#DIV/0!");
    FormulaError.NA = new FormulaError("#N/A");
    FormulaError.NAME = new FormulaError("#NAME?");
    FormulaError.NULL = new FormulaError("#NULL!");
    FormulaError.NUM = new FormulaError("#NUM!");
    FormulaError.REF = new FormulaError("#REF!");
    FormulaError.VALUE = new FormulaError("#VALUE!");
    FormulaError.NOT_IMPLEMENTED = (functionName) => {
      return new FormulaError("#NAME?", `Function ${functionName} is not implemented.`);
    };
    FormulaError.TOO_MANY_ARGS = (functionName) => {
      return new FormulaError("#N/A", `Function ${functionName} has too many arguments.`);
    };
    FormulaError.ARG_MISSING = (args) => {
      const { Types } = require_helpers();
      return new FormulaError("#N/A", `Argument type ${args.map((arg) => Types[arg]).join(", ")} is missing.`);
    };
    FormulaError.ERROR = (msg, details) => {
      return new FormulaError("#ERROR!", msg, details);
    };
    module2.exports = FormulaError;
  }
});

// node_modules/fast-formula-parser/ssf/ssf.js
var require_ssf = __commonJS({
  "node_modules/fast-formula-parser/ssf/ssf.js"(exports2, module2) {
    var SSF = class {
    };
    SSF.version = "0.10.3";
    function _strrev(x) {
      let o = "", i = x.length - 1;
      while (i >= 0) o += x.charAt(i--);
      return o;
    }
    function fill(c, l) {
      let o = "";
      while (o.length < l) o += c;
      return o;
    }
    function pad0(v, d) {
      let t = "" + v;
      return t.length >= d ? t : fill("0", d - t.length) + t;
    }
    function pad_(v, d) {
      let t = "" + v;
      return t.length >= d ? t : fill(" ", d - t.length) + t;
    }
    function rpad_(v, d) {
      let t = "" + v;
      return t.length >= d ? t : t + fill(" ", d - t.length);
    }
    function pad0r1(v, d) {
      let t = "" + Math.round(v);
      return t.length >= d ? t : fill("0", d - t.length) + t;
    }
    function pad0r2(v, d) {
      let t = "" + v;
      return t.length >= d ? t : fill("0", d - t.length) + t;
    }
    var p2_32 = Math.pow(2, 32);
    function pad0r(v, d) {
      if (v > p2_32 || v < -p2_32) return pad0r1(v, d);
      const i = Math.round(v);
      return pad0r2(i, d);
    }
    function isgeneral(s, i) {
      i = i || 0;
      return s.length >= 7 + i && (s.charCodeAt(i) | 32) === 103 && (s.charCodeAt(i + 1) | 32) === 101 && (s.charCodeAt(i + 2) | 32) === 110 && (s.charCodeAt(i + 3) | 32) === 101 && (s.charCodeAt(i + 4) | 32) === 114 && (s.charCodeAt(i + 5) | 32) === 97 && (s.charCodeAt(i + 6) | 32) === 108;
    }
    var days = [
      ["Sun", "Sunday"],
      ["Mon", "Monday"],
      ["Tue", "Tuesday"],
      ["Wed", "Wednesday"],
      ["Thu", "Thursday"],
      ["Fri", "Friday"],
      ["Sat", "Saturday"]
    ];
    var months = [
      ["J", "Jan", "January"],
      ["F", "Feb", "February"],
      ["M", "Mar", "March"],
      ["A", "Apr", "April"],
      ["M", "May", "May"],
      ["J", "Jun", "June"],
      ["J", "Jul", "July"],
      ["A", "Aug", "August"],
      ["S", "Sep", "September"],
      ["O", "Oct", "October"],
      ["N", "Nov", "November"],
      ["D", "Dec", "December"]
    ];
    function init_table(t) {
      t[0] = "General";
      t[1] = "0";
      t[2] = "0.00";
      t[3] = "#,##0";
      t[4] = "#,##0.00";
      t[9] = "0%";
      t[10] = "0.00%";
      t[11] = "0.00E+00";
      t[12] = "# ?/?";
      t[13] = "# ??/??";
      t[14] = "m/d/yy";
      t[15] = "d-mmm-yy";
      t[16] = "d-mmm";
      t[17] = "mmm-yy";
      t[18] = "h:mm AM/PM";
      t[19] = "h:mm:ss AM/PM";
      t[20] = "h:mm";
      t[21] = "h:mm:ss";
      t[22] = "m/d/yy h:mm";
      t[37] = "#,##0 ;(#,##0)";
      t[38] = "#,##0 ;[Red](#,##0)";
      t[39] = "#,##0.00;(#,##0.00)";
      t[40] = "#,##0.00;[Red](#,##0.00)";
      t[45] = "mm:ss";
      t[46] = "[h]:mm:ss";
      t[47] = "mmss.0";
      t[48] = "##0.0E+0";
      t[49] = "@";
      t[56] = '"\u4E0A\u5348/\u4E0B\u5348 "hh"\u6642"mm"\u5206"ss"\u79D2 "';
      t[65535] = "General";
    }
    var table_fmt = {};
    init_table(table_fmt);
    function frac(x, D, mixed) {
      const sgn = x < 0 ? -1 : 1;
      let B = x * sgn;
      let P_2 = 0, P_1 = 1, P = 0;
      let Q_2 = 1, Q_1 = 0, Q = 0;
      let A = Math.floor(B);
      while (Q_1 < D) {
        A = Math.floor(B);
        P = A * P_1 + P_2;
        Q = A * Q_1 + Q_2;
        if (B - A < 5e-8) break;
        B = 1 / (B - A);
        P_2 = P_1;
        P_1 = P;
        Q_2 = Q_1;
        Q_1 = Q;
      }
      if (Q > D) {
        if (Q_1 > D) {
          Q = Q_2;
          P = P_2;
        } else {
          Q = Q_1;
          P = P_1;
        }
      }
      if (!mixed) return [0, sgn * P, Q];
      const q = Math.floor(sgn * P / Q);
      return [q, sgn * P - q * Q, Q];
    }
    function parse_date_code(v, opts, b2) {
      if (v > 2958465 || v < 0) return null;
      let date = v | 0, time = Math.floor(86400 * (v - date)), dow = 0;
      let dout = [];
      const out = { D: date, T: time, u: 86400 * (v - date) - time, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
      if (Math.abs(out.u) < 1e-6) out.u = 0;
      if (opts && opts.date1904) date += 1462;
      if (out.u > 0.9999) {
        out.u = 0;
        if (++time === 86400) {
          out.T = time = 0;
          ++date;
          ++out.D;
        }
      }
      if (date === 60) {
        dout = b2 ? [1317, 10, 29] : [1900, 2, 29];
        dow = 3;
      } else if (date === 0) {
        dout = b2 ? [1317, 8, 29] : [1900, 1, 0];
        dow = 6;
      } else {
        if (date > 60) --date;
        const d = new Date(1900, 0, 1);
        d.setDate(d.getDate() + date - 1);
        dout = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
        dow = d.getDay();
        if (date < 60) dow = (dow + 6) % 7;
        if (b2) dow = fix_hijri(d, dout);
      }
      out.y = dout[0];
      out.m = dout[1];
      out.d = dout[2];
      out.S = time % 60;
      time = Math.floor(time / 60);
      out.M = time % 60;
      time = Math.floor(time / 60);
      out.H = time;
      out.q = dow;
      return out;
    }
    SSF.parse_date_code = parse_date_code;
    var basedate = new Date(1899, 11, 31, 0, 0, 0);
    var dnthresh = basedate.getTime();
    var base1904 = new Date(1900, 2, 1, 0, 0, 0);
    function datenum_local(v, date1904) {
      let epoch = v.getTime();
      if (date1904) epoch -= 1461 * 24 * 60 * 60 * 1e3;
      else if (v >= base1904) epoch += 24 * 60 * 60 * 1e3;
      return (epoch - (dnthresh + (v.getTimezoneOffset() - basedate.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
    }
    function general_fmt_int(v) {
      return v.toString(10);
    }
    SSF._general_int = general_fmt_int;
    var general_fmt_num = /* @__PURE__ */ function make_general_fmt_num() {
      const gnr1 = /\.(\d*[1-9])0+$/, gnr2 = /\.0*$/, gnr4 = /\.(\d*[1-9])0+/, gnr5 = /\.0*[Ee]/, gnr6 = /(E[+-])(\d)$/;
      function gfn2(v) {
        const w = v < 0 ? 12 : 11;
        let o = gfn5(v.toFixed(12));
        if (o.length <= w) return o;
        o = v.toPrecision(10);
        if (o.length <= w) return o;
        return v.toExponential(5);
      }
      function gfn3(v) {
        let o = v.toFixed(11).replace(gnr1, ".$1");
        if (o.length > (v < 0 ? 12 : 11)) o = v.toPrecision(6);
        return o;
      }
      function gfn4(o) {
        for (let i = 0; i !== o.length; ++i) if ((o.charCodeAt(i) | 32) === 101) return o.replace(gnr4, ".$1").replace(gnr5, "E").replace("e", "E").replace(gnr6, "$10$2");
        return o;
      }
      function gfn5(o) {
        return o.indexOf(".") > -1 ? o.replace(gnr2, "").replace(gnr1, ".$1") : o;
      }
      return function general_fmt_num2(v) {
        let V = Math.floor(Math.log(Math.abs(v)) * Math.LOG10E), o;
        if (V >= -4 && V <= -1) o = v.toPrecision(10 + V);
        else if (Math.abs(V) <= 9) o = gfn2(v);
        else if (V === 10) o = v.toFixed(10).substr(0, 12);
        else o = gfn3(v);
        return gfn5(gfn4(o));
      };
    }();
    SSF._general_num = general_fmt_num;
    function general_fmt(v, opts) {
      switch (typeof v) {
        case "string":
          return v;
        case "boolean":
          return v ? "TRUE" : "FALSE";
        case "number":
          return (v | 0) === v ? general_fmt_int(v) : general_fmt_num(v);
        case "undefined":
          return "";
        case "object":
          if (v == null) return "";
          if (v instanceof Date) return format(14, datenum_local(v, opts && opts.date1904), opts);
      }
      throw new Error("unsupported value in General format: " + v);
    }
    SSF._general = general_fmt;
    function fix_hijri() {
      return 0;
    }
    function write_date(type, fmt, val, ss0) {
      let o = "", ss = 0, tt = 0, y = val.y, out, outl = 0;
      switch (type) {
        case 98:
          y = val.y + 543;
        case 121:
          switch (fmt.length) {
            case 1:
            case 2:
              out = y % 100;
              outl = 2;
              break;
            default:
              out = y % 1e4;
              outl = 4;
              break;
          }
          break;
        case 109:
          switch (fmt.length) {
            case 1:
            case 2:
              out = val.m;
              outl = fmt.length;
              break;
            case 3:
              return months[val.m - 1][1];
            case 5:
              return months[val.m - 1][0];
            default:
              return months[val.m - 1][2];
          }
          break;
        case 100:
          switch (fmt.length) {
            case 1:
            case 2:
              out = val.d;
              outl = fmt.length;
              break;
            case 3:
              return days[val.q][0];
            default:
              return days[val.q][1];
          }
          break;
        case 104:
          switch (fmt.length) {
            case 1:
            case 2:
              out = 1 + (val.H + 11) % 12;
              outl = fmt.length;
              break;
            default:
              throw "bad hour format: " + fmt;
          }
          break;
        case 72:
          switch (fmt.length) {
            case 1:
            case 2:
              out = val.H;
              outl = fmt.length;
              break;
            default:
              throw "bad hour format: " + fmt;
          }
          break;
        case 77:
          switch (fmt.length) {
            case 1:
            case 2:
              out = val.M;
              outl = fmt.length;
              break;
            default:
              throw "bad minute format: " + fmt;
          }
          break;
        case 115:
          if (fmt !== "s" && fmt !== "ss" && fmt !== ".0" && fmt !== ".00" && fmt !== ".000") throw "bad second format: " + fmt;
          if (val.u === 0 && (fmt === "s" || fmt === "ss")) return pad0(val.S, fmt.length);
          if (ss0 >= 2) tt = ss0 === 3 ? 1e3 : 100;
          else tt = ss0 === 1 ? 10 : 1;
          ss = Math.round(tt * (val.S + val.u));
          if (ss >= 60 * tt) ss = 0;
          if (fmt === "s") return ss === 0 ? "0" : "" + ss / tt;
          o = pad0(ss, 2 + ss0);
          if (fmt === "ss") return o.substr(0, 2);
          return "." + o.substr(2, fmt.length - 1);
        case 90:
          switch (fmt) {
            case "[h]":
            case "[hh]":
              out = val.D * 24 + val.H;
              break;
            case "[m]":
            case "[mm]":
              out = (val.D * 24 + val.H) * 60 + val.M;
              break;
            case "[s]":
            case "[ss]":
              out = ((val.D * 24 + val.H) * 60 + val.M) * 60 + Math.round(val.S + val.u);
              break;
            default:
              throw "bad abstime format: " + fmt;
          }
          outl = fmt.length === 3 ? 1 : 2;
          break;
        case 101:
          out = y;
          outl = 1;
      }
      if (outl > 0) return pad0(out, outl);
      else return "";
    }
    function commaify(s) {
      const w = 3;
      if (s.length <= w) return s;
      let j = s.length % w, o = s.substr(0, j);
      for (; j !== s.length; j += w) o += (o.length > 0 ? "," : "") + s.substr(j, w);
      return o;
    }
    var write_num = /* @__PURE__ */ function make_write_num() {
      const pct1 = /%/g;
      function write_num_pct(type, fmt, val) {
        const sfmt = fmt.replace(pct1, ""), mul = fmt.length - sfmt.length;
        return write_num(type, sfmt, val * Math.pow(10, 2 * mul)) + fill("%", mul);
      }
      function write_num_cm(type, fmt, val) {
        let idx = fmt.length - 1;
        while (fmt.charCodeAt(idx - 1) === 44) --idx;
        return write_num(type, fmt.substr(0, idx), val / Math.pow(10, 3 * (fmt.length - idx)));
      }
      function write_num_exp(fmt, val) {
        let o;
        let idx = fmt.indexOf("E") - fmt.indexOf(".") - 1;
        if (fmt.match(/^#+0.0E\+0$/)) {
          if (val === 0) return "0.0E+0";
          else if (val < 0) return "-" + write_num_exp(fmt, -val);
          let period = fmt.indexOf(".");
          if (period === -1) period = fmt.indexOf("E");
          let ee = Math.floor(Math.log(val) * Math.LOG10E) % period;
          if (ee < 0) ee += period;
          o = (val / Math.pow(10, ee)).toPrecision(idx + 1 + (period + ee) % period);
          if (o.indexOf("e") === -1) {
            const fakee = Math.floor(Math.log(val) * Math.LOG10E);
            if (o.indexOf(".") === -1) o = o.charAt(0) + "." + o.substr(1) + "E+" + (fakee - o.length + ee);
            else o += "E+" + (fakee - ee);
            while (o.substr(0, 2) === "0.") {
              o = o.charAt(0) + o.substr(2, period) + "." + o.substr(2 + period);
              o = o.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
            }
            o = o.replace(/\+-/, "-");
          }
          o = o.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function($$, $1, $2, $3) {
            return $1 + $2 + $3.substr(0, (period + ee) % period) + "." + $3.substr(ee) + "E";
          });
        } else o = val.toExponential(idx);
        if (fmt.match(/E\+00$/) && o.match(/e[+-]\d$/)) o = o.substr(0, o.length - 1) + "0" + o.charAt(o.length - 1);
        if (fmt.match(/E\-/) && o.match(/e\+/)) o = o.replace(/e\+/, "e");
        return o.replace("e", "E");
      }
      const frac1 = /# (\?+)( ?)\/( ?)(\d+)/;
      function write_num_f1(r, aval, sign) {
        const den = parseInt(r[4], 10), rr = Math.round(aval * den), base = Math.floor(rr / den);
        let myn = rr - base * den, myd = den;
        return sign + (base === 0 ? "" : "" + base) + " " + (myn === 0 ? fill(" ", r[1].length + 1 + r[4].length) : pad_(myn, r[1].length) + r[2] + "/" + r[3] + pad0(myd, r[4].length));
      }
      function write_num_f2(r, aval, sign) {
        return sign + (aval === 0 ? "" : "" + aval) + fill(" ", r[1].length + 2 + r[4].length);
      }
      const dec1 = /^#*0*\.([0#]+)/;
      const closeparen = /\).*[0#]/;
      const phone = /\(###\) ###\\?-####/;
      function hashq(str) {
        let o = "", cc;
        for (let i = 0; i !== str.length; ++i) switch (cc = str.charCodeAt(i)) {
          case 35:
            break;
          case 63:
            o += " ";
            break;
          case 48:
            o += "0";
            break;
          default:
            o += String.fromCharCode(cc);
        }
        return o;
      }
      function rnd(val, d) {
        const dd = Math.pow(10, d);
        return "" + Math.round(val * dd) / dd;
      }
      function dec(val, d) {
        if (d < ("" + Math.round((val - Math.floor(val)) * Math.pow(10, d))).length) {
          return 0;
        }
        return Math.round((val - Math.floor(val)) * Math.pow(10, d));
      }
      function carry(val, d) {
        if (d < ("" + Math.round((val - Math.floor(val)) * Math.pow(10, d))).length) {
          return 1;
        }
        return 0;
      }
      function flr(val) {
        if (val < 2147483647 && val > -2147483648) return "" + (val >= 0 ? val | 0 : val - 1 | 0);
        return "" + Math.floor(val);
      }
      function write_num_flt(type, fmt, val) {
        if (type.charCodeAt(0) === 40 && !fmt.match(closeparen)) {
          const ffmt = fmt.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
          if (val >= 0) return write_num_flt("n", ffmt, val);
          return "(" + write_num_flt("n", ffmt, -val) + ")";
        }
        if (fmt.charCodeAt(fmt.length - 1) === 44) return write_num_cm(type, fmt, val);
        if (fmt.indexOf("%") !== -1) return write_num_pct(type, fmt, val);
        if (fmt.indexOf("E") !== -1) return write_num_exp(fmt, val);
        if (fmt.charCodeAt(0) === 36) return "$" + write_num_flt(type, fmt.substr(fmt.charAt(1) == " " ? 2 : 1), val);
        let o;
        let r, ri, ff, aval = Math.abs(val), sign = val < 0 ? "-" : "";
        if (fmt.match(/^00+$/)) return sign + pad0r(aval, fmt.length);
        if (fmt.match(/^[#?]+$/)) {
          o = pad0r(val, 0);
          if (o === "0") o = "";
          return o.length > fmt.length ? o : hashq(fmt.substr(0, fmt.length - o.length)) + o;
        }
        if (r = fmt.match(frac1)) return write_num_f1(r, aval, sign);
        if (fmt.match(/^#+0+$/)) return sign + pad0r(aval, fmt.length - fmt.indexOf("0"));
        if (r = fmt.match(dec1)) {
          o = rnd(val, r[1].length).replace(/^([^\.]+)$/, "$1." + hashq(r[1])).replace(/\.$/, "." + hashq(r[1])).replace(/\.(\d*)$/, function($$, $1) {
            return "." + $1 + fill("0", hashq(r[1]).length - $1.length);
          });
          return fmt.indexOf("0.") !== -1 ? o : o.replace(/^0\./, ".");
        }
        fmt = fmt.replace(/^#+([0.])/, "$1");
        if (r = fmt.match(/^(0*)\.(#*)$/)) {
          return sign + rnd(aval, r[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, r[1].length ? "0." : ".");
        }
        if (r = fmt.match(/^#{1,3},##0(\.?)$/)) return sign + commaify(pad0r(aval, 0));
        if (r = fmt.match(/^#,##0\.([#0]*0)$/)) {
          return val < 0 ? "-" + write_num_flt(type, fmt, -val) : commaify("" + (Math.floor(val) + carry(val, r[1].length))) + "." + pad0(dec(val, r[1].length), r[1].length);
        }
        if (r = fmt.match(/^#,#*,#0/)) return write_num_flt(type, fmt.replace(/^#,#*,/, ""), val);
        if (r = fmt.match(/^([0#]+)(\\?-([0#]+))+$/)) {
          o = _strrev(write_num_flt(type, fmt.replace(/[\\-]/g, ""), val));
          ri = 0;
          return _strrev(_strrev(fmt.replace(/\\/g, "")).replace(/[0#]/g, function(x) {
            return ri < o.length ? o.charAt(ri++) : x === "0" ? "0" : "";
          }));
        }
        if (fmt.match(phone)) {
          o = write_num_flt(type, "##########", val);
          return "(" + o.substr(0, 3) + ") " + o.substr(3, 3) + "-" + o.substr(6);
        }
        let oa = "";
        if (r = fmt.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) {
          ri = Math.min(r[4].length, 7);
          ff = frac(aval, Math.pow(10, ri) - 1, false);
          o = "" + sign;
          oa = write_num("n", r[1], ff[1]);
          if (oa.charAt(oa.length - 1) === " ") oa = oa.substr(0, oa.length - 1) + "0";
          o += oa + r[2] + "/" + r[3];
          oa = rpad_(ff[2], ri);
          if (oa.length < r[4].length) oa = hashq(r[4].substr(r[4].length - oa.length)) + oa;
          o += oa;
          return o;
        }
        if (r = fmt.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) {
          ri = Math.min(Math.max(r[1].length, r[4].length), 7);
          ff = frac(aval, Math.pow(10, ri) - 1, true);
          return sign + (ff[0] || (ff[1] ? "" : "0")) + " " + (ff[1] ? pad_(ff[1], ri) + r[2] + "/" + r[3] + rpad_(ff[2], ri) : fill(" ", 2 * ri + 1 + r[2].length + r[3].length));
        }
        if (r = fmt.match(/^[#0?]+$/)) {
          o = pad0r(val, 0);
          if (fmt.length <= o.length) return o;
          return hashq(fmt.substr(0, fmt.length - o.length)) + o;
        }
        if (r = fmt.match(/^([#0?]+)\.([#0]+)$/)) {
          o = "" + val.toFixed(Math.min(r[2].length, 10)).replace(/([^0])0+$/, "$1");
          ri = o.indexOf(".");
          const lres = fmt.indexOf(".") - ri, rres = fmt.length - o.length - lres;
          return hashq(fmt.substr(0, lres) + o + fmt.substr(fmt.length - rres));
        }
        if (r = fmt.match(/^00,000\.([#0]*0)$/)) {
          ri = dec(val, r[1].length);
          return val < 0 ? "-" + write_num_flt(type, fmt, -val) : commaify(flr(val)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function($$) {
            return "00," + ($$.length < 3 ? pad0(0, 3 - $$.length) : "") + $$;
          }) + "." + pad0(ri, r[1].length);
        }
        switch (fmt) {
          case "###,##0.00":
            return write_num_flt(type, "#,##0.00", val);
          case "###,###":
          case "##,###":
          case "#,###":
            const x = commaify(pad0r(aval, 0));
            return x !== "0" ? sign + x : "";
          case "###,###.00":
            return write_num_flt(type, "###,##0.00", val).replace(/^0\./, ".");
          case "#,###.00":
            return write_num_flt(type, "#,##0.00", val).replace(/^0\./, ".");
          default:
        }
        throw new Error("unsupported format |" + fmt + "|");
      }
      function write_num_cm2(type, fmt, val) {
        let idx = fmt.length - 1;
        while (fmt.charCodeAt(idx - 1) === 44) --idx;
        return write_num(type, fmt.substr(0, idx), val / Math.pow(10, 3 * (fmt.length - idx)));
      }
      function write_num_pct2(type, fmt, val) {
        const sfmt = fmt.replace(pct1, ""), mul = fmt.length - sfmt.length;
        return write_num(type, sfmt, val * Math.pow(10, 2 * mul)) + fill("%", mul);
      }
      function write_num_exp2(fmt, val) {
        let o;
        let idx = fmt.indexOf("E") - fmt.indexOf(".") - 1;
        if (fmt.match(/^#+0.0E\+0$/)) {
          if (val === 0) return "0.0E+0";
          else if (val < 0) return "-" + write_num_exp2(fmt, -val);
          let period = fmt.indexOf(".");
          if (period === -1) period = fmt.indexOf("E");
          let ee = Math.floor(Math.log(val) * Math.LOG10E) % period;
          if (ee < 0) ee += period;
          o = (val / Math.pow(10, ee)).toPrecision(idx + 1 + (period + ee) % period);
          if (!o.match(/[Ee]/)) {
            const fakee = Math.floor(Math.log(val) * Math.LOG10E);
            if (o.indexOf(".") === -1) o = o.charAt(0) + "." + o.substr(1) + "E+" + (fakee - o.length + ee);
            else o += "E+" + (fakee - ee);
            o = o.replace(/\+-/, "-");
          }
          o = o.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function($$, $1, $2, $3) {
            return $1 + $2 + $3.substr(0, (period + ee) % period) + "." + $3.substr(ee) + "E";
          });
        } else o = val.toExponential(idx);
        if (fmt.match(/E\+00$/) && o.match(/e[+-]\d$/)) o = o.substr(0, o.length - 1) + "0" + o.charAt(o.length - 1);
        if (fmt.match(/E\-/) && o.match(/e\+/)) o = o.replace(/e\+/, "e");
        return o.replace("e", "E");
      }
      function write_num_int(type, fmt, val) {
        if (type.charCodeAt(0) === 40 && !fmt.match(closeparen)) {
          const ffmt = fmt.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
          if (val >= 0) return write_num_int("n", ffmt, val);
          return "(" + write_num_int("n", ffmt, -val) + ")";
        }
        if (fmt.charCodeAt(fmt.length - 1) === 44) return write_num_cm2(type, fmt, val);
        if (fmt.indexOf("%") !== -1) return write_num_pct2(type, fmt, val);
        if (fmt.indexOf("E") !== -1) return write_num_exp2(fmt, val);
        if (fmt.charCodeAt(0) === 36) return "$" + write_num_int(type, fmt.substr(fmt.charAt(1) == " " ? 2 : 1), val);
        let o;
        let r, ri, ff, aval = Math.abs(val), sign = val < 0 ? "-" : "";
        if (fmt.match(/^00+$/)) return sign + pad0(aval, fmt.length);
        if (fmt.match(/^[#?]+$/)) {
          o = "" + val;
          if (val === 0) o = "";
          return o.length > fmt.length ? o : hashq(fmt.substr(0, fmt.length - o.length)) + o;
        }
        if (r = fmt.match(frac1)) return write_num_f2(r, aval, sign);
        if (fmt.match(/^#+0+$/)) return sign + pad0(aval, fmt.length - fmt.indexOf("0"));
        if (r = fmt.match(dec1)) {
          o = ("" + val).replace(/^([^\.]+)$/, "$1." + hashq(r[1])).replace(/\.$/, "." + hashq(r[1]));
          o = o.replace(/\.(\d*)$/, function($$, $1) {
            return "." + $1 + fill("0", hashq(r[1]).length - $1.length);
          });
          return fmt.indexOf("0.") !== -1 ? o : o.replace(/^0\./, ".");
        }
        fmt = fmt.replace(/^#+([0.])/, "$1");
        if (r = fmt.match(/^(0*)\.(#*)$/)) {
          return sign + ("" + aval).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, r[1].length ? "0." : ".");
        }
        if (r = fmt.match(/^#{1,3},##0(\.?)$/)) return sign + commaify("" + aval);
        if (r = fmt.match(/^#,##0\.([#0]*0)$/)) {
          return val < 0 ? "-" + write_num_int(type, fmt, -val) : commaify("" + val) + "." + fill("0", r[1].length);
        }
        if (r = fmt.match(/^#,#*,#0/)) return write_num_int(type, fmt.replace(/^#,#*,/, ""), val);
        if (r = fmt.match(/^([0#]+)(\\?-([0#]+))+$/)) {
          o = _strrev(write_num_int(type, fmt.replace(/[\\-]/g, ""), val));
          ri = 0;
          return _strrev(_strrev(fmt.replace(/\\/g, "")).replace(/[0#]/g, function(x) {
            return ri < o.length ? o.charAt(ri++) : x === "0" ? "0" : "";
          }));
        }
        if (fmt.match(phone)) {
          o = write_num_int(type, "##########", val);
          return "(" + o.substr(0, 3) + ") " + o.substr(3, 3) + "-" + o.substr(6);
        }
        let oa = "";
        if (r = fmt.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) {
          ri = Math.min(r[4].length, 7);
          ff = frac(aval, Math.pow(10, ri) - 1, false);
          o = "" + sign;
          oa = write_num("n", r[1], ff[1]);
          if (oa.charAt(oa.length - 1) == " ") oa = oa.substr(0, oa.length - 1) + "0";
          o += oa + r[2] + "/" + r[3];
          oa = rpad_(ff[2], ri);
          if (oa.length < r[4].length) oa = hashq(r[4].substr(r[4].length - oa.length)) + oa;
          o += oa;
          return o;
        }
        if (r = fmt.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) {
          ri = Math.min(Math.max(r[1].length, r[4].length), 7);
          ff = frac(aval, Math.pow(10, ri) - 1, true);
          return sign + (ff[0] || (ff[1] ? "" : "0")) + " " + (ff[1] ? pad_(ff[1], ri) + r[2] + "/" + r[3] + rpad_(ff[2], ri) : fill(" ", 2 * ri + 1 + r[2].length + r[3].length));
        }
        if (r = fmt.match(/^[#0?]+$/)) {
          o = "" + val;
          if (fmt.length <= o.length) return o;
          return hashq(fmt.substr(0, fmt.length - o.length)) + o;
        }
        if (r = fmt.match(/^([#0]+)\.([#0]+)$/)) {
          o = "" + val.toFixed(Math.min(r[2].length, 10)).replace(/([^0])0+$/, "$1");
          ri = o.indexOf(".");
          let lres = fmt.indexOf(".") - ri, rres = fmt.length - o.length - lres;
          return hashq(fmt.substr(0, lres) + o + fmt.substr(fmt.length - rres));
        }
        if (r = fmt.match(/^00,000\.([#0]*0)$/)) {
          return val < 0 ? "-" + write_num_int(type, fmt, -val) : commaify("" + val).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function($$) {
            return "00," + ($$.length < 3 ? pad0(0, 3 - $$.length) : "") + $$;
          }) + "." + pad0(0, r[1].length);
        }
        switch (fmt) {
          case "###,###":
          case "##,###":
          case "#,###":
            const x = commaify("" + aval);
            return x !== "0" ? sign + x : "";
          default:
            if (fmt.match(/\.[0#?]*$/)) return write_num_int(type, fmt.slice(0, fmt.lastIndexOf(".")), val) + hashq(fmt.slice(fmt.lastIndexOf(".")));
        }
        throw new Error("unsupported format |" + fmt + "|");
      }
      return function write_num2(type, fmt, val) {
        return (val | 0) === val ? write_num_int(type, fmt, val) : write_num_flt(type, fmt, val);
      };
    }();
    function split_fmt(fmt) {
      const out = [];
      let in_str = false, j = 0;
      for (let i = 0; i < fmt.length; ++i) switch (
        /*cc=*/
        fmt.charCodeAt(i)
      ) {
        case 34:
          in_str = !in_str;
          break;
        case 95:
        case 42:
        case 92:
          ++i;
          break;
        case 59:
          out[out.length] = fmt.substr(j, i - j);
          j = i + 1;
      }
      out[out.length] = fmt.substr(j);
      if (in_str === true) throw new Error("Format |" + fmt + "| unterminated string ");
      return out;
    }
    SSF._split = split_fmt;
    var abstime = /\[[HhMmSs]*\]/;
    function fmt_is_date(fmt) {
      let i = 0, c = "", o = "";
      while (i < fmt.length) {
        switch (c = fmt.charAt(i)) {
          case "G":
            if (isgeneral(fmt, i)) i += 6;
            i++;
            break;
          case '"':
            for (
              ;
              /*cc=*/
              fmt.charCodeAt(++i) !== 34 && i < fmt.length;
            ) ++i;
            ++i;
            break;
          case "\\":
            i += 2;
            break;
          case "_":
            i += 2;
            break;
          case "@":
            ++i;
            break;
          case "B":
          case "b":
            if (fmt.charAt(i + 1) === "1" || fmt.charAt(i + 1) === "2") return true;
          case "M":
          case "D":
          case "Y":
          case "H":
          case "S":
          case "E":
          case "m":
          case "d":
          case "y":
          case "h":
          case "s":
          case "e":
          case "g":
            return true;
          case "A":
          case "a":
            if (fmt.substr(i, 3).toUpperCase() === "A/P") return true;
            if (fmt.substr(i, 5).toUpperCase() === "AM/PM") return true;
            ++i;
            break;
          case "[":
            o = c;
            while (fmt.charAt(i++) !== "]" && i < fmt.length) o += fmt.charAt(i);
            if (o.match(abstime)) return true;
            break;
          case ".":
          case "0":
          case "#":
            while (i < fmt.length && ("0#?.,E+-%".indexOf(c = fmt.charAt(++i)) > -1 || c == "\\" && fmt.charAt(i + 1) == "-" && "0#".indexOf(fmt.charAt(i + 2)) > -1)) {
            }
            break;
          case "?":
            while (fmt.charAt(++i) === c) {
            }
            break;
          case "*":
            ++i;
            if (fmt.charAt(i) === " " || fmt.charAt(i) === "*") ++i;
            break;
          case "(":
          case ")":
            ++i;
            break;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            while (i < fmt.length && "0123456789".indexOf(fmt.charAt(++i)) > -1) {
            }
            break;
          case " ":
            ++i;
            break;
          default:
            ++i;
            break;
        }
      }
      return false;
    }
    SSF.is_date = fmt_is_date;
    function eval_fmt(fmt, v, opts, flen) {
      let out = [], o = "", i = 0, c = "", lst = "t", dt, j, cc;
      let hr = "H";
      while (i < fmt.length) {
        switch (c = fmt.charAt(i)) {
          case "G":
            if (!isgeneral(fmt, i)) throw new Error("unrecognized character " + c + " in " + fmt);
            out[out.length] = { t: "G", v: "General" };
            i += 7;
            break;
          case '"':
            for (o = ""; (cc = fmt.charCodeAt(++i)) !== 34 && i < fmt.length; ) o += String.fromCharCode(cc);
            out[out.length] = { t: "t", v: o };
            ++i;
            break;
          case "\\":
            const w = fmt.charAt(++i), t = w === "(" || w === ")" ? w : "t";
            out[out.length] = { t, v: w };
            ++i;
            break;
          case "_":
            out[out.length] = { t: "t", v: " " };
            i += 2;
            break;
          case "@":
            out[out.length] = { t: "T", v };
            ++i;
            break;
          case "B":
          case "b":
            if (fmt.charAt(i + 1) === "1" || fmt.charAt(i + 1) === "2") {
              if (dt == null) {
                dt = parse_date_code(v, opts, fmt.charAt(i + 1) === "2");
                if (dt == null) return "";
              }
              out[out.length] = { t: "X", v: fmt.substr(i, 2) };
              lst = c;
              i += 2;
              break;
            }
          case "M":
          case "D":
          case "Y":
          case "H":
          case "S":
          case "E":
            c = c.toLowerCase();
          case "m":
          case "d":
          case "y":
          case "h":
          case "s":
          case "e":
          case "g":
            if (v < 0) return "";
            if (dt == null) {
              dt = parse_date_code(v, opts);
              if (dt == null) return "";
            }
            o = c;
            while (++i < fmt.length && fmt.charAt(i).toLowerCase() === c) o += c;
            if (c === "m" && lst.toLowerCase() === "h") c = "M";
            if (c === "h") c = hr;
            out[out.length] = { t: c, v: o };
            lst = c;
            break;
          case "A":
          case "a":
            const q = { t: c, v: c };
            if (dt == null) dt = parse_date_code(v, opts);
            if (fmt.substr(i, 3).toUpperCase() === "A/P") {
              if (dt != null) q.v = dt.H >= 12 ? "P" : "A";
              q.t = "T";
              hr = "h";
              i += 3;
            } else if (fmt.substr(i, 5).toUpperCase() === "AM/PM") {
              if (dt != null) q.v = dt.H >= 12 ? "PM" : "AM";
              q.t = "T";
              i += 5;
              hr = "h";
            } else {
              q.t = "t";
              ++i;
            }
            if (dt == null && q.t === "T") return "";
            out[out.length] = q;
            lst = c;
            break;
          case "[":
            o = c;
            while (fmt.charAt(i++) !== "]" && i < fmt.length) o += fmt.charAt(i);
            if (o.slice(-1) !== "]") throw 'unterminated "[" block: |' + o + "|";
            if (o.match(abstime)) {
              if (dt == null) {
                dt = parse_date_code(v, opts);
                if (dt == null) return "";
              }
              out[out.length] = { t: "Z", v: o.toLowerCase() };
              lst = o.charAt(1);
            } else if (o.indexOf("$") > -1) {
              o = (o.match(/\$([^-\[\]]*)/) || [])[1] || "$";
              if (!fmt_is_date(fmt)) out[out.length] = { t: "t", v: o };
            }
            break;
          case ".":
            if (dt != null) {
              o = c;
              while (++i < fmt.length && (c = fmt.charAt(i)) === "0") o += c;
              out[out.length] = { t: "s", v: o };
              break;
            }
          case "0":
          case "#":
            o = c;
            while (++i < fmt.length && "0#?.,E+-%".indexOf(c = fmt.charAt(i)) > -1 || c == "\\" && fmt.charAt(i + 1) == "-" && i < fmt.length - 2 && "0#".indexOf(fmt.charAt(i + 2)) > -1) o += c;
            out[out.length] = { t: "n", v: o };
            break;
          case "?":
            o = c;
            while (fmt.charAt(++i) === c) o += c;
            out[out.length] = { t: c, v: o };
            lst = c;
            break;
          case "*":
            ++i;
            if (fmt.charAt(i) === " " || fmt.charAt(i) === "*") ++i;
            break;
          case "(":
          case ")":
            out[out.length] = { t: flen === 1 || typeof v === "number" && v < 0 ? "t" : c, v: c };
            ++i;
            break;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            o = c;
            while (i < fmt.length && "0123456789".indexOf(fmt.charAt(++i)) > -1) o += fmt.charAt(i);
            out[out.length] = { t: "D", v: o };
            break;
          case " ":
            out[out.length] = { t: c, v: c };
            ++i;
            break;
          default:
            if (",$-+/():!^&'~{}<>=\u20ACacfijklopqrtuvwxzP".indexOf(c) === -1) throw new Error("unrecognized character " + c + " in " + fmt);
            out[out.length] = { t: "t", v: c };
            ++i;
            break;
        }
      }
      let bt = 0, ss0 = 0, ssm;
      for (i = out.length - 1, lst = "t"; i >= 0; --i) {
        switch (out[i].t) {
          case "h":
          case "H":
            out[i].t = hr;
            lst = "h";
            if (bt < 1) bt = 1;
            break;
          case "s":
            if (ssm = out[i].v.match(/\.0+$/)) ss0 = Math.max(ss0, ssm[0].length - 1);
            if (bt < 3) bt = 3;
          case "d":
          case "y":
          case "M":
          case "e":
            lst = out[i].t;
            break;
          case "m":
            if (lst === "s") {
              out[i].t = "M";
              if (bt < 2) bt = 2;
            }
            break;
          case "X":
            break;
          case "Z":
            if (bt < 1 && out[i].v.match(/[Hh]/)) bt = 1;
            if (bt < 2 && out[i].v.match(/[Mm]/)) bt = 2;
            if (bt < 3 && out[i].v.match(/[Ss]/)) bt = 3;
        }
      }
      switch (bt) {
        case 0:
          break;
        case 1:
          if (dt.u >= 0.5) {
            dt.u = 0;
            ++dt.S;
          }
          if (dt.S >= 60) {
            dt.S = 0;
            ++dt.M;
          }
          if (dt.M >= 60) {
            dt.M = 0;
            ++dt.H;
          }
          break;
        case 2:
          if (dt.u >= 0.5) {
            dt.u = 0;
            ++dt.S;
          }
          if (dt.S >= 60) {
            dt.S = 0;
            ++dt.M;
          }
          break;
      }
      let nstr = "", jj;
      for (i = 0; i < out.length; ++i) {
        switch (out[i].t) {
          case "t":
          case "T":
          case " ":
          case "D":
            break;
          case "X":
            out[i].v = "";
            out[i].t = ";";
            break;
          case "d":
          case "m":
          case "y":
          case "h":
          case "H":
          case "M":
          case "s":
          case "e":
          case "b":
          case "Z":
            out[i].v = write_date(out[i].t.charCodeAt(0), out[i].v, dt, ss0);
            out[i].t = "t";
            break;
          case "n":
          case "(":
          case "?":
            jj = i + 1;
            while (out[jj] != null && ((c = out[jj].t) === "?" || c === "D" || (c === " " || c === "t") && out[jj + 1] != null && (out[jj + 1].t === "?" || out[jj + 1].t === "t" && out[jj + 1].v === "/") || out[i].t === "(" && (c === " " || c === "n" || c === ")") || c === "t" && (out[jj].v === "/" || out[jj].v === " " && out[jj + 1] != null && out[jj + 1].t === "?"))) {
              out[i].v += out[jj].v;
              out[jj] = { v: "", t: ";" };
              ++jj;
            }
            nstr += out[i].v;
            i = jj - 1;
            break;
          case "G":
            out[i].t = "t";
            out[i].v = general_fmt(v, opts);
            break;
        }
      }
      let vv = "", myv, ostr;
      if (nstr.length > 0) {
        if (nstr.charCodeAt(0) === 40) {
          myv = v < 0 && nstr.charCodeAt(0) === 45 ? -v : v;
          ostr = write_num("(", nstr, myv);
        } else {
          myv = v < 0 && flen > 1 ? -v : v;
          ostr = write_num("n", nstr, myv);
          if (myv < 0 && out[0] && out[0].t === "t") {
            ostr = ostr.substr(1);
            out[0].v = "-" + out[0].v;
          }
        }
        jj = ostr.length - 1;
        let decpt = out.length;
        for (i = 0; i < out.length; ++i) if (out[i] != null && out[i].t !== "t" && out[i].v.indexOf(".") > -1) {
          decpt = i;
          break;
        }
        let lasti = out.length;
        if (decpt === out.length && ostr.indexOf("E") === -1) {
          for (i = out.length - 1; i >= 0; --i) {
            if (out[i] == null || "n?(".indexOf(out[i].t) === -1) continue;
            if (jj >= out[i].v.length - 1) {
              jj -= out[i].v.length;
              out[i].v = ostr.substr(jj + 1, out[i].v.length);
            } else if (jj < 0) out[i].v = "";
            else {
              out[i].v = ostr.substr(0, jj + 1);
              jj = -1;
            }
            out[i].t = "t";
            lasti = i;
          }
          if (jj >= 0 && lasti < out.length) out[lasti].v = ostr.substr(0, jj + 1) + out[lasti].v;
        } else if (decpt !== out.length && ostr.indexOf("E") === -1) {
          jj = ostr.indexOf(".") - 1;
          for (i = decpt; i >= 0; --i) {
            if (out[i] == null || "n?(".indexOf(out[i].t) === -1) continue;
            j = out[i].v.indexOf(".") > -1 && i === decpt ? out[i].v.indexOf(".") - 1 : out[i].v.length - 1;
            vv = out[i].v.substr(j + 1);
            for (; j >= 0; --j) {
              if (jj >= 0 && (out[i].v.charAt(j) === "0" || out[i].v.charAt(j) === "#")) vv = ostr.charAt(jj--) + vv;
            }
            out[i].v = vv;
            out[i].t = "t";
            lasti = i;
          }
          if (jj >= 0 && lasti < out.length) out[lasti].v = ostr.substr(0, jj + 1) + out[lasti].v;
          jj = ostr.indexOf(".") + 1;
          for (i = decpt; i < out.length; ++i) {
            if (out[i] == null || "n?(".indexOf(out[i].t) === -1 && i !== decpt) continue;
            j = out[i].v.indexOf(".") > -1 && i === decpt ? out[i].v.indexOf(".") + 1 : 0;
            vv = out[i].v.substr(0, j);
            for (; j < out[i].v.length; ++j) {
              if (jj < ostr.length) vv += ostr.charAt(jj++);
            }
            out[i].v = vv;
            out[i].t = "t";
            lasti = i;
          }
        }
      }
      for (i = 0; i < out.length; ++i) if (out[i] != null && "n(?".indexOf(out[i].t) > -1) {
        myv = flen > 1 && v < 0 && i > 0 && out[i - 1].v === "-" ? -v : v;
        out[i].v = write_num(out[i].t, out[i].v, myv);
        out[i].t = "t";
      }
      let retval = "";
      for (i = 0; i !== out.length; ++i) if (out[i] != null) retval += out[i].v;
      return retval;
    }
    SSF._eval = eval_fmt;
    var cfregex = /\[[=<>]/;
    var cfregex2 = /\[([=<>]*)(-?\d+\.?\d*)\]/;
    function chkcond(v, rr) {
      if (rr == null) return false;
      const thresh = parseFloat(rr[2]);
      switch (rr[1]) {
        case "=":
          if (v === thresh) return true;
          break;
        case ">":
          if (v > thresh) return true;
          break;
        case "<":
          if (v < thresh) return true;
          break;
        case "<>":
          if (v !== thresh) return true;
          break;
        case ">=":
          if (v >= thresh) return true;
          break;
        case "<=":
          if (v <= thresh) return true;
          break;
      }
      return false;
    }
    function choose_fmt(f, v) {
      let fmt = split_fmt(f);
      let l = fmt.length, lat = fmt[l - 1].indexOf("@");
      if (l < 4 && lat > -1) --l;
      if (fmt.length > 4) throw new Error("cannot find right format for |" + fmt.join("|") + "|");
      if (typeof v !== "number") return [4, fmt.length === 4 || lat > -1 ? fmt[fmt.length - 1] : "@"];
      switch (fmt.length) {
        case 1:
          fmt = lat > -1 ? ["General", "General", "General", fmt[0]] : [fmt[0], fmt[0], fmt[0], "@"];
          break;
        case 2:
          fmt = lat > -1 ? [fmt[0], fmt[0], fmt[0], fmt[1]] : [fmt[0], fmt[1], fmt[0], "@"];
          break;
        case 3:
          fmt = lat > -1 ? [fmt[0], fmt[1], fmt[0], fmt[2]] : [fmt[0], fmt[1], fmt[2], "@"];
          break;
        case 4:
          break;
      }
      const ff = v > 0 ? fmt[0] : v < 0 ? fmt[1] : fmt[2];
      if (fmt[0].indexOf("[") === -1 && fmt[1].indexOf("[") === -1) return [l, ff];
      if (fmt[0].match(cfregex) != null || fmt[1].match(cfregex) != null) {
        const m1 = fmt[0].match(cfregex2);
        const m2 = fmt[1].match(cfregex2);
        return chkcond(v, m1) ? [l, fmt[0]] : chkcond(v, m2) ? [l, fmt[1]] : [l, fmt[m1 != null && m2 != null ? 2 : 1]];
      }
      return [l, ff];
    }
    function format(fmt, v, o) {
      if (o == null) o = {};
      let sfmt = "";
      switch (typeof fmt) {
        case "string":
          if (fmt === "m/d/yy" && o.dateNF) sfmt = o.dateNF;
          else sfmt = fmt;
          break;
        case "number":
          if (fmt === 14 && o.dateNF) sfmt = o.dateNF;
          else sfmt = (o.table != null ? o.table : table_fmt)[fmt];
          break;
      }
      if (isgeneral(sfmt, 0)) return general_fmt(v, o);
      if (v instanceof Date) v = datenum_local(v, o.date1904);
      const f = choose_fmt(sfmt, v);
      if (isgeneral(f[1])) return general_fmt(v, o);
      if (v === true) v = "TRUE";
      else if (v === false) v = "FALSE";
      else if (v === "" || v == null) return "";
      return eval_fmt(f[1], v, o, f[0]);
    }
    function load_entry(fmt, idx) {
      if (typeof idx !== "number") {
        idx = +idx || -1;
        for (let i = 0; i < 392; ++i) {
          if (table_fmt[i] === void 0) {
            if (idx < 0) idx = i;
            continue;
          }
          if (table_fmt[i] === fmt) {
            idx = i;
            break;
          }
        }
        if (idx < 0) idx = 391;
      }
      table_fmt[idx] = fmt;
      return idx;
    }
    SSF.load = load_entry;
    SSF._table = table_fmt;
    SSF.get_table = function get_table() {
      return table_fmt;
    };
    SSF.load_table = function load_table(tbl) {
      for (let i = 0; i !== 392; ++i)
        if (tbl[i] !== void 0) load_entry(tbl[i], i);
    };
    SSF.init_table = init_table;
    SSF.format = format;
    module2.exports = SSF;
  }
});

// node_modules/bahttext/src/index.js
var require_src = __commonJS({
  "node_modules/bahttext/src/index.js"(exports2, module2) {
    var defaultResult = "\u0E28\u0E39\u0E19\u0E22\u0E4C\u0E1A\u0E32\u0E17\u0E16\u0E49\u0E27\u0E19";
    var singleUnitStrs = [
      "",
      "\u0E2B\u0E19\u0E36\u0E48\u0E07",
      "\u0E2A\u0E2D\u0E07",
      "\u0E2A\u0E32\u0E21",
      "\u0E2A\u0E35\u0E48",
      "\u0E2B\u0E49\u0E32",
      "\u0E2B\u0E01",
      "\u0E40\u0E08\u0E47\u0E14",
      "\u0E41\u0E1B\u0E14",
      "\u0E40\u0E01\u0E49\u0E32"
    ];
    var placeNameStrs = [
      "",
      "\u0E2A\u0E34\u0E1A",
      "\u0E23\u0E49\u0E2D\u0E22",
      "\u0E1E\u0E31\u0E19",
      "\u0E2B\u0E21\u0E37\u0E48\u0E19",
      "\u0E41\u0E2A\u0E19",
      "\u0E25\u0E49\u0E32\u0E19"
    ];
    function num2Word(nums) {
      let result = "";
      const len = nums.length;
      const maxLen = 7;
      if (len > maxLen) {
        const overflowIndex = len - maxLen + 1;
        const overflowNums = nums.slice(0, overflowIndex);
        const remainingNumbs = nums.slice(overflowIndex);
        return num2Word(overflowNums) + "\u0E25\u0E49\u0E32\u0E19" + num2Word(remainingNumbs);
      } else {
        for (let i = 0; i < len; i++) {
          const digit = nums[i];
          if (digit > 0) {
            result += singleUnitStrs[digit] + placeNameStrs[len - i - 1];
          }
        }
      }
      return result;
    }
    function grammarFix(str) {
      let result = str;
      result = result.replace("\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E2A\u0E34\u0E1A", "\u0E2A\u0E34\u0E1A");
      result = result.replace("\u0E2A\u0E2D\u0E07\u0E2A\u0E34\u0E1A", "\u0E22\u0E35\u0E48\u0E2A\u0E34\u0E1A");
      const neungLen = 5;
      if (result.length > neungLen && result.length - result.lastIndexOf("\u0E2B\u0E19\u0E36\u0E48\u0E07") === neungLen) {
        result = result.substr(0, result.length - neungLen) + "\u0E40\u0E2D\u0E47\u0E14";
      }
      return result;
    }
    function combine(baht, satang) {
      let result = "";
      if (baht === "" && satang === "") {
        result = defaultResult;
      } else if (baht !== "" && satang === "") {
        result = baht + "\u0E1A\u0E32\u0E17\u0E16\u0E49\u0E27\u0E19";
      } else if (baht === "" && satang !== "") {
        result = satang + "\u0E2A\u0E15\u0E32\u0E07\u0E04\u0E4C";
      } else {
        result = baht + "\u0E1A\u0E32\u0E17" + satang + "\u0E2A\u0E15\u0E32\u0E07\u0E04\u0E4C";
      }
      return result;
    }
    function bahttext(num) {
      let result = defaultResult;
      if (isNaN(num)) return result;
      if (num >= Number.MAX_SAFE_INTEGER) return result;
      const bahtStr = Math.floor(num).toString();
      const satangStr = Math.round(num % 1 * 100).toString();
      const bahtArr = Array.from(bahtStr).map(Number);
      const satangArr = Array.from(satangStr).map(Number);
      let baht = num2Word(bahtArr);
      let satang = num2Word(satangArr);
      baht = grammarFix(baht);
      satang = grammarFix(satang);
      result = combine(baht, satang);
      return result;
    }
    if (typeof module2 !== "undefined" && module2.exports != null) {
      module2.exports = bahttext;
    }
  }
});

// node_modules/fast-formula-parser/formulas/functions/text.js
var require_text = __commonJS({
  "node_modules/fast-formula-parser/formulas/functions/text.js"(exports2, module2) {
    var FormulaError = require_error();
    var { FormulaHelpers, Types, WildCard } = require_helpers();
    var H = FormulaHelpers;
    var ssf = require_ssf();
    var bahttext = require_src();
    var charsets = {
      latin: { halfRE: /[!-~]/g, fullRE: /[！-～]/g, delta: 65248 },
      hangul1: { halfRE: /[ﾡ-ﾾ]/g, fullRE: /[ᆨ-ᇂ]/g, delta: -60921 },
      hangul2: { halfRE: /[ￂ-ￜ]/g, fullRE: /[ᅡ-ᅵ]/g, delta: -61025 },
      kana: {
        delta: 0,
        half: "\uFF61\uFF62\uFF63\uFF64\uFF65\uFF66\uFF67\uFF68\uFF69\uFF6A\uFF6B\uFF6C\uFF6D\uFF6E\uFF6F\uFF70\uFF71\uFF72\uFF73\uFF74\uFF75\uFF76\uFF77\uFF78\uFF79\uFF7A\uFF7B\uFF7C\uFF7D\uFF7E\uFF7F\uFF80\uFF81\uFF82\uFF83\uFF84\uFF85\uFF86\uFF87\uFF88\uFF89\uFF8A\uFF8B\uFF8C\uFF8D\uFF8E\uFF8F\uFF90\uFF91\uFF92\uFF93\uFF94\uFF95\uFF96\uFF97\uFF98\uFF99\uFF9A\uFF9B\uFF9C\uFF9D\uFF9E\uFF9F",
        full: "\u3002\u300C\u300D\u3001\u30FB\u30F2\u30A1\u30A3\u30A5\u30A7\u30A9\u30E3\u30E5\u30E7\u30C3\u30FC\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F3\u309B\u309C"
      },
      extras: {
        delta: 0,
        half: "\xA2\xA3\xAC\xAF\xA6\xA5\u20A9 |\u2190\u2191\u2192\u2193\u25A0\xB0",
        full: "\uFFE0\uFFE1\uFFE2\uFFE3\uFFE4\uFFE5\uFFE6\u3000\uFFE8\uFFE9\uFFEA\uFFEB\uFFEC\uFFED\uFFEE"
      }
    };
    var toFull = (set) => (c) => set.delta ? String.fromCharCode(c.charCodeAt(0) + set.delta) : [...set.full][[...set.half].indexOf(c)];
    var toHalf = (set) => (c) => set.delta ? String.fromCharCode(c.charCodeAt(0) - set.delta) : [...set.half][[...set.full].indexOf(c)];
    var re = (set, way) => set[way + "RE"] || new RegExp("[" + set[way] + "]", "g");
    var sets = Object.keys(charsets).map((i) => charsets[i]);
    var toFullWidth = (str0) => sets.reduce((str, set) => str.replace(re(set, "half"), toFull(set)), str0);
    var toHalfWidth = (str0) => sets.reduce((str, set) => str.replace(re(set, "full"), toHalf(set)), str0);
    var TextFunctions = {
      ASC: (text2) => {
        text2 = H.accept(text2, Types.STRING);
        return toHalfWidth(text2);
      },
      BAHTTEXT: (number) => {
        number = H.accept(number, Types.NUMBER);
        try {
          return bahttext(number);
        } catch (e) {
          throw Error(`Error in https://github.com/jojoee/bahttext 
${e.toString()}`);
        }
      },
      CHAR: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (number > 255 || number < 1)
          throw FormulaError.VALUE;
        return String.fromCharCode(number);
      },
      CLEAN: (text2) => {
        text2 = H.accept(text2, Types.STRING);
        return text2.replace(/[\x00-\x1F]/g, "");
      },
      CODE: (text2) => {
        text2 = H.accept(text2, Types.STRING);
        if (text2.length === 0)
          throw FormulaError.VALUE;
        return text2.charCodeAt(0);
      },
      CONCAT: (...params) => {
        let text2 = "";
        H.flattenParams(params, Types.STRING, false, (item) => {
          item = H.accept(item, Types.STRING);
          text2 += item;
        });
        return text2;
      },
      CONCATENATE: (...params) => {
        let text2 = "";
        if (params.length === 0)
          throw Error("CONCATENATE need at least one argument.");
        params.forEach((param) => {
          param = H.accept(param, Types.STRING);
          text2 += param;
        });
        return text2;
      },
      DBCS: (text2) => {
        text2 = H.accept(text2, Types.STRING);
        return toFullWidth(text2);
      },
      DOLLAR: (number, decimals) => {
        number = H.accept(number, Types.NUMBER);
        decimals = H.accept(decimals, Types.NUMBER, 2);
        const decimalString = Array(decimals).fill("0").join("");
        return ssf.format(`$#,##0.${decimalString}_);($#,##0.${decimalString})`, number).trim();
      },
      EXACT: (text1, text2) => {
        text1 = H.accept(text1, [Types.STRING]);
        text2 = H.accept(text2, [Types.STRING]);
        return text1 === text2;
      },
      FIND: (findText, withinText, startNum) => {
        findText = H.accept(findText, Types.STRING);
        withinText = H.accept(withinText, Types.STRING);
        startNum = H.accept(startNum, Types.NUMBER, 1);
        if (startNum < 1 || startNum > withinText.length)
          throw FormulaError.VALUE;
        const res = withinText.indexOf(findText, startNum - 1);
        if (res === -1)
          throw FormulaError.VALUE;
        return res + 1;
      },
      FINDB: (...params) => {
        return TextFunctions.FIND(...params);
      },
      FIXED: (number, decimals, noCommas) => {
        number = H.accept(number, Types.NUMBER);
        decimals = H.accept(decimals, Types.NUMBER, 2);
        noCommas = H.accept(noCommas, Types.BOOLEAN, false);
        const decimalString = Array(decimals).fill("0").join("");
        const comma = noCommas ? "" : "#,";
        return ssf.format(`${comma}##0.${decimalString}_);(${comma}##0.${decimalString})`, number).trim();
      },
      LEFT: (text2, numChars) => {
        text2 = H.accept(text2, Types.STRING);
        numChars = H.accept(numChars, Types.NUMBER, 1);
        if (numChars < 0)
          throw FormulaError.VALUE;
        if (numChars > text2.length)
          return text2;
        return text2.slice(0, numChars);
      },
      LEFTB: (...params) => {
        return TextFunctions.LEFT(...params);
      },
      LEN: (text2) => {
        text2 = H.accept(text2, Types.STRING);
        return text2.length;
      },
      LENB: (...params) => {
        return TextFunctions.LEN(...params);
      },
      LOWER: (text2) => {
        text2 = H.accept(text2, Types.STRING);
        return text2.toLowerCase();
      },
      MID: (text2, startNum, numChars) => {
        text2 = H.accept(text2, Types.STRING);
        startNum = H.accept(startNum, Types.NUMBER);
        numChars = H.accept(numChars, Types.NUMBER);
        if (startNum > text2.length)
          return "";
        if (startNum < 1 || numChars < 1)
          throw FormulaError.VALUE;
        return text2.slice(startNum - 1, startNum + numChars - 1);
      },
      MIDB: (...params) => {
        return TextFunctions.MID(...params);
      },
      NUMBERVALUE: (text2, decimalSeparator, groupSeparator) => {
        text2 = H.accept(text2, Types.STRING);
        decimalSeparator = H.accept(decimalSeparator, Types.STRING, ".");
        groupSeparator = H.accept(groupSeparator, Types.STRING, ",");
        if (text2.length === 0)
          return 0;
        if (decimalSeparator.length === 0 || groupSeparator.length === 0)
          throw FormulaError.VALUE;
        decimalSeparator = decimalSeparator[0];
        groupSeparator = groupSeparator[0];
        if (decimalSeparator === groupSeparator || text2.indexOf(decimalSeparator) < text2.lastIndexOf(groupSeparator))
          throw FormulaError.VALUE;
        const res = text2.replace(groupSeparator, "").replace(decimalSeparator, ".").replace(/[^\-0-9.%()]/g, "").match(/([(-]*)([0-9]*[.]*[0-9]+)([)]?)([%]*)/);
        if (!res)
          throw FormulaError.VALUE;
        const leftParenOrMinus = res[1].length, rightParen = res[3].length, percent = res[4].length;
        let number = Number(res[2]);
        if (leftParenOrMinus > 1 || leftParenOrMinus && !rightParen || !leftParenOrMinus && rightParen || isNaN(number))
          throw FormulaError.VALUE;
        number = number / 100 ** percent;
        return leftParenOrMinus ? -number : number;
      },
      PHONETIC: () => {
      },
      PROPER: (text2) => {
        text2 = H.accept(text2, [Types.STRING]);
        text2 = text2.toLowerCase();
        text2 = text2.charAt(0).toUpperCase() + text2.slice(1);
        return text2.replace(
          /(?:[^a-zA-Z])([a-zA-Z])/g,
          (letter) => letter.toUpperCase()
        );
      },
      REPLACE: (old_text, start_num, num_chars, new_text) => {
        old_text = H.accept(old_text, [Types.STRING]);
        start_num = H.accept(start_num, [Types.NUMBER]);
        num_chars = H.accept(num_chars, [Types.NUMBER]);
        new_text = H.accept(new_text, [Types.STRING]);
        let arr = old_text.split("");
        arr.splice(start_num - 1, num_chars, new_text);
        return arr.join("");
      },
      REPLACEB: (...params) => {
        return TextFunctions.REPLACE(...params);
      },
      REPT: (text2, number_times) => {
        text2 = H.accept(text2, Types.STRING);
        number_times = H.accept(number_times, Types.NUMBER);
        let str = "";
        for (let i = 0; i < number_times; i++) {
          str += text2;
        }
        return str;
      },
      RIGHT: (text2, numChars) => {
        text2 = H.accept(text2, Types.STRING);
        numChars = H.accept(numChars, Types.NUMBER, 1);
        if (numChars < 0)
          throw FormulaError.VALUE;
        const len = text2.length;
        if (numChars > len)
          return text2;
        return text2.slice(len - numChars);
      },
      RIGHTB: (...params) => {
        return TextFunctions.RIGHT(...params);
      },
      SEARCH: (findText, withinText, startNum) => {
        findText = H.accept(findText, Types.STRING);
        withinText = H.accept(withinText, Types.STRING);
        startNum = H.accept(startNum, Types.NUMBER, 1);
        if (startNum < 1 || startNum > withinText.length)
          throw FormulaError.VALUE;
        let findTextRegex = WildCard.isWildCard(findText) ? WildCard.toRegex(findText, "i") : findText;
        const res = withinText.slice(startNum - 1).search(findTextRegex);
        if (res === -1)
          throw FormulaError.VALUE;
        return res + startNum;
      },
      SEARCHB: (...params) => {
        return TextFunctions.SEARCH(...params);
      },
      SUBSTITUTE: (...params) => {
      },
      T: (value) => {
        value = H.accept(value);
        if (typeof value === "string")
          return value;
        return "";
      },
      TEXT: (value, formatText) => {
        value = H.accept(value, Types.NUMBER);
        formatText = H.accept(formatText, Types.STRING);
        try {
          return ssf.format(formatText, value);
        } catch (e) {
          console.error(e);
          throw FormulaError.VALUE;
        }
      },
      TEXTJOIN: (...params) => {
      },
      TRIM: (text2) => {
        text2 = H.accept(text2, [Types.STRING]);
        return text2.replace(/^\s+|\s+$/g, "");
      },
      UNICHAR: (number) => {
        number = H.accept(number, [Types.NUMBER]);
        if (number <= 0)
          throw FormulaError.VALUE;
        return String.fromCharCode(number);
      },
      UNICODE: (text2) => {
        return TextFunctions.CODE(text2);
      }
    };
    module2.exports = TextFunctions;
  }
});

// node_modules/fast-formula-parser/formulas/operators.js
var require_operators = __commonJS({
  "node_modules/fast-formula-parser/formulas/operators.js"(exports2, module2) {
    var FormulaError = require_error();
    var { FormulaHelpers } = require_helpers();
    var Prefix = {
      unaryOp: (prefixes, value, isArray2) => {
        let sign = 1;
        prefixes.forEach((prefix) => {
          if (prefix === "+") {
          } else if (prefix === "-") {
            sign = -sign;
          } else {
            throw new Error(`Unrecognized prefix: ${prefix}`);
          }
        });
        if (value == null) {
          value = 0;
        }
        if (sign === 1) {
          return value;
        }
        try {
          value = FormulaHelpers.acceptNumber(value, isArray2);
        } catch (e) {
          if (e instanceof FormulaError) {
            if (Array.isArray(value))
              value = value[0][0];
          } else
            throw e;
        }
        if (typeof value === "number" && isNaN(value)) return FormulaError.VALUE;
        return -value;
      }
    };
    var Postfix = {
      percentOp: (value, postfix, isArray2) => {
        try {
          value = FormulaHelpers.acceptNumber(value, isArray2);
        } catch (e) {
          if (e instanceof FormulaError)
            return e;
          throw e;
        }
        if (postfix === "%") {
          return value / 100;
        }
        throw new Error(`Unrecognized postfix: ${postfix}`);
      }
    };
    var type2Number = { "boolean": 3, "string": 2, "number": 1 };
    var Infix = {
      compareOp: (value1, infix, value2, isArray1, isArray2) => {
        if (value1 == null) value1 = 0;
        if (value2 == null) value2 = 0;
        if (isArray1) {
          value1 = value1[0][0];
        }
        if (isArray2) {
          value2 = value2[0][0];
        }
        const type1 = typeof value1, type2 = typeof value2;
        if (type1 === type2) {
          switch (infix) {
            case "=":
              return value1 === value2;
            case ">":
              return value1 > value2;
            case "<":
              return value1 < value2;
            case "<>":
              return value1 !== value2;
            case "<=":
              return value1 <= value2;
            case ">=":
              return value1 >= value2;
          }
        } else {
          switch (infix) {
            case "=":
              return false;
            case ">":
              return type2Number[type1] > type2Number[type2];
            case "<":
              return type2Number[type1] < type2Number[type2];
            case "<>":
              return true;
            case "<=":
              return type2Number[type1] <= type2Number[type2];
            case ">=":
              return type2Number[type1] >= type2Number[type2];
          }
        }
        throw Error("Infix.compareOp: Should not reach here.");
      },
      concatOp: (value1, infix, value2, isArray1, isArray2) => {
        if (value1 == null) value1 = "";
        if (value2 == null) value2 = "";
        if (isArray1) {
          value1 = value1[0][0];
        }
        if (isArray2) {
          value2 = value2[0][0];
        }
        const type1 = typeof value1, type2 = typeof value2;
        if (type1 === "boolean")
          value1 = value1 ? "TRUE" : "FALSE";
        if (type2 === "boolean")
          value2 = value2 ? "TRUE" : "FALSE";
        return "" + value1 + value2;
      },
      mathOp: (value1, infix, value2, isArray1, isArray2) => {
        if (value1 == null) value1 = 0;
        if (value2 == null) value2 = 0;
        try {
          value1 = FormulaHelpers.acceptNumber(value1, isArray1);
          value2 = FormulaHelpers.acceptNumber(value2, isArray2);
        } catch (e) {
          if (e instanceof FormulaError)
            return e;
          throw e;
        }
        switch (infix) {
          case "+":
            return value1 + value2;
          case "-":
            return value1 - value2;
          case "*":
            return value1 * value2;
          case "/":
            if (value2 === 0)
              return FormulaError.DIV0;
            return value1 / value2;
          case "^":
            return value1 ** value2;
        }
        throw Error("Infix.mathOp: Should not reach here.");
      }
    };
    module2.exports = {
      Prefix,
      Postfix,
      Infix,
      Operators: {
        compareOp: ["<", ">", "=", "<>", "<=", ">="],
        concatOp: ["&"],
        mathOp: ["+", "-", "*", "/", "^"]
      }
    };
  }
});

// node_modules/fast-formula-parser/formulas/functions/math.js
var require_math = __commonJS({
  "node_modules/fast-formula-parser/formulas/functions/math.js"(exports2, module2) {
    var FormulaError = require_error();
    var { FormulaHelpers, Types, Factorials, Criteria } = require_helpers();
    var { Infix } = require_operators();
    var H = FormulaHelpers;
    var f = [];
    var fd = [];
    function factorial(n) {
      if (n <= 100)
        return Factorials[n];
      if (f[n] > 0)
        return f[n];
      return f[n] = factorial(n - 1) * n;
    }
    function factorialDouble(n) {
      if (n === 1 || n === 0)
        return 1;
      if (n === 2)
        return 2;
      if (fd[n] > 0)
        return fd[n];
      return fd[n] = factorialDouble(n - 2) * n;
    }
    var MathFunctions = {
      ABS: (number) => {
        number = H.accept(number, Types.NUMBER);
        return Math.abs(number);
      },
      AGGREGATE: (functionNum, options, ref1, ...refs) => {
      },
      ARABIC: (text2) => {
        text2 = H.accept(text2, Types.STRING).toUpperCase();
        if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text2)) {
          throw new FormulaError("#VALUE!", "Invalid roman numeral in ARABIC evaluation.");
        }
        let r = 0;
        text2.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function(i) {
          r += {
            M: 1e3,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1
          }[i];
        });
        return r;
      },
      BASE: (number, radix, minLength) => {
        number = H.accept(number, Types.NUMBER);
        if (number < 0 || number >= 2 ** 53)
          throw FormulaError.NUM;
        radix = H.accept(radix, Types.NUMBER);
        if (radix < 2 || radix > 36)
          throw FormulaError.NUM;
        minLength = H.accept(minLength, Types.NUMBER, 0);
        if (minLength < 0) {
          throw FormulaError.NUM;
        }
        const result = number.toString(radix).toUpperCase();
        return new Array(Math.max(minLength + 1 - result.length, 0)).join("0") + result;
      },
      CEILING: (number, significance) => {
        number = H.accept(number, Types.NUMBER);
        significance = H.accept(significance, Types.NUMBER);
        if (significance === 0)
          return 0;
        if (number / significance % 1 === 0)
          return number;
        const absSignificance = Math.abs(significance);
        const times = Math.floor(Math.abs(number) / absSignificance);
        if (number < 0) {
          const roundDown = significance < 0;
          return roundDown ? -absSignificance * (times + 1) : -absSignificance * times;
        } else {
          return (times + 1) * absSignificance;
        }
      },
      "CEILING.MATH": (number, significance, mode) => {
        number = H.accept(number, Types.NUMBER);
        significance = H.accept(significance, Types.NUMBER, number > 0 ? 1 : -1);
        mode = H.accept(mode, Types.NUMBER, 0);
        if (number >= 0) {
          return MathFunctions.CEILING(number, significance);
        }
        const offset = mode ? significance : 0;
        return MathFunctions.CEILING(number, significance) - offset;
      },
      "CEILING.PRECISE": (number, significance) => {
        number = H.accept(number, Types.NUMBER);
        significance = H.accept(significance, Types.NUMBER, 1);
        return MathFunctions.CEILING(number, Math.abs(significance));
      },
      COMBIN: (number, numberChosen) => {
        number = H.accept(number, Types.NUMBER);
        numberChosen = H.accept(numberChosen, Types.NUMBER);
        if (number < 0 || numberChosen < 0 || number < numberChosen)
          throw FormulaError.NUM;
        const nFactorial = MathFunctions.FACT(number), kFactorial = MathFunctions.FACT(numberChosen);
        return nFactorial / kFactorial / MathFunctions.FACT(number - numberChosen);
      },
      COMBINA: (number, numberChosen) => {
        number = H.accept(number, Types.NUMBER);
        numberChosen = H.accept(numberChosen, Types.NUMBER);
        if ((number === 0 || number === 1) && numberChosen === 0)
          return 1;
        if (number < 0 || numberChosen < 0)
          throw FormulaError.NUM;
        return MathFunctions.COMBIN(number + numberChosen - 1, number - 1);
      },
      DECIMAL: (text2, radix) => {
        text2 = H.accept(text2, Types.STRING);
        radix = H.accept(radix, Types.NUMBER);
        radix = Math.trunc(radix);
        if (radix < 2 || radix > 36)
          throw FormulaError.NUM;
        const res = parseInt(text2, radix);
        if (isNaN(res))
          throw FormulaError.NUM;
        return res;
      },
      DEGREES: (radians) => {
        radians = H.accept(radians, Types.NUMBER);
        return radians * (180 / Math.PI);
      },
      EVEN: (number) => {
        return MathFunctions.CEILING(number, -2);
      },
      EXP: (number) => {
        number = H.accept(number, Types.NUMBER);
        return Math.exp(number);
      },
      FACT: (number) => {
        number = H.accept(number, Types.NUMBER);
        number = Math.trunc(number);
        if (number > 170 || number < 0)
          throw FormulaError.NUM;
        if (number <= 100)
          return Factorials[number];
        return factorial(number);
      },
      FACTDOUBLE: (number) => {
        number = H.accept(number, Types.NUMBER);
        number = Math.trunc(number);
        if (number < -1)
          throw FormulaError.NUM;
        if (number === -1)
          return 1;
        return factorialDouble(number);
      },
      FLOOR: (number, significance) => {
        number = H.accept(number, Types.NUMBER);
        significance = H.accept(significance, Types.NUMBER);
        if (significance === 0)
          return 0;
        if (number > 0 && significance < 0)
          throw FormulaError.NUM;
        if (number / significance % 1 === 0)
          return number;
        const absSignificance = Math.abs(significance);
        const times = Math.floor(Math.abs(number) / absSignificance);
        if (number < 0) {
          const roundDown = significance < 0;
          return roundDown ? -absSignificance * times : -absSignificance * (times + 1);
        } else {
          return times * absSignificance;
        }
      },
      "FLOOR.MATH": (number, significance, mode) => {
        number = H.accept(number, Types.NUMBER);
        significance = H.accept(significance, Types.NUMBER, number > 0 ? 1 : -1);
        mode = H.accept(mode, Types.NUMBER, 0);
        if (mode === 0 || number >= 0) {
          return MathFunctions.FLOOR(number, Math.abs(significance));
        }
        return MathFunctions.FLOOR(number, significance) + significance;
      },
      "FLOOR.PRECISE": (number, significance) => {
        number = H.accept(number, Types.NUMBER);
        significance = H.accept(significance, Types.NUMBER, 1);
        return MathFunctions.FLOOR(number, Math.abs(significance));
      },
      GCD: (...params) => {
        const arr = [];
        H.flattenParams(
          params,
          null,
          false,
          (param) => {
            param = typeof param === "boolean" ? NaN : Number(param);
            if (!isNaN(param)) {
              if (param < 0 || param > 9007199254740990)
                throw FormulaError.NUM;
              arr.push(Math.trunc(param));
            } else
              throw FormulaError.VALUE;
          },
          0
        );
        let i, y, n = params.length, x = Math.abs(arr[0]);
        for (i = 1; i < n; i++) {
          y = Math.abs(arr[i]);
          while (x && y) {
            x > y ? x %= y : y %= x;
          }
          x += y;
        }
        return x;
      },
      INT: (number) => {
        number = H.accept(number, Types.NUMBER);
        return Math.floor(number);
      },
      "ISO.CEILING": (...params) => {
        return MathFunctions["CEILING.PRECISE"](...params);
      },
      LCM: (...params) => {
        const arr = [];
        H.flattenParams(
          params,
          null,
          false,
          (param) => {
            param = typeof param === "boolean" ? NaN : Number(param);
            if (!isNaN(param)) {
              if (param < 0 || param > 9007199254740990)
                throw FormulaError.NUM;
              arr.push(Math.trunc(param));
            } else
              throw FormulaError.VALUE;
          },
          1
        );
        let n = arr.length, a = Math.abs(arr[0]);
        for (let i = 1; i < n; i++) {
          let b = Math.abs(arr[i]), c = a;
          while (a && b) {
            a > b ? a %= b : b %= a;
          }
          a = Math.abs(c * arr[i]) / (a + b);
        }
        return a;
      },
      LN: (number) => {
        number = H.accept(number, Types.NUMBER);
        return Math.log(number);
      },
      LOG: (number, base) => {
        number = H.accept(number, Types.NUMBER);
        base = H.accept(base, Types.NUMBER, 10);
        return Math.log(number) / Math.log(base);
      },
      LOG10: (number) => {
        number = H.accept(number, Types.NUMBER);
        return Math.log10(number);
      },
      MDETERM: (array) => {
        array = H.accept(array, Types.ARRAY, void 0, false, true);
        if (array[0].length !== array.length)
          throw FormulaError.VALUE;
        const numRow = array.length, numCol = array[0].length;
        let det = 0, diagLeft, diagRight;
        if (numRow === 1) {
          return array[0][0];
        } else if (numRow === 2) {
          return array[0][0] * array[1][1] - array[0][1] * array[1][0];
        }
        for (let col = 0; col < numCol; col++) {
          diagLeft = array[0][col];
          diagRight = array[0][col];
          for (let row = 1; row < numRow; row++) {
            diagRight *= array[row][((col + row) % numCol + numCol) % numCol];
            diagLeft *= array[row][((col - row) % numCol + numCol) % numCol];
          }
          det += diagRight - diagLeft;
        }
        return det;
      },
      MINVERSE: (array) => {
      },
      MMULT: (array1, array2) => {
        array1 = H.accept(array1, Types.ARRAY, void 0, false, true);
        array2 = H.accept(array2, Types.ARRAY, void 0, false, true);
        const aNumRows = array1.length, aNumCols = array1[0].length, bNumRows = array2.length, bNumCols = array2[0].length, m = new Array(aNumRows);
        if (aNumCols !== bNumRows)
          throw FormulaError.VALUE;
        for (let r = 0; r < aNumRows; r++) {
          m[r] = new Array(bNumCols);
          for (let c = 0; c < bNumCols; c++) {
            m[r][c] = 0;
            for (let i = 0; i < aNumCols; i++) {
              const v1 = array1[r][i], v2 = array2[i][c];
              if (typeof v1 !== "number" || typeof v2 !== "number") throw FormulaError.VALUE;
              m[r][c] += array1[r][i] * array2[i][c];
            }
          }
        }
        return m;
      },
      MOD: (number, divisor) => {
        number = H.accept(number, Types.NUMBER);
        divisor = H.accept(divisor, Types.NUMBER);
        if (divisor === 0)
          throw FormulaError.DIV0;
        return number - divisor * MathFunctions.INT(number / divisor);
      },
      MROUND: (number, multiple) => {
        number = H.accept(number, Types.NUMBER);
        multiple = H.accept(multiple, Types.NUMBER);
        if (multiple === 0)
          return 0;
        if (number > 0 && multiple < 0 || number < 0 && multiple > 0)
          throw FormulaError.NUM;
        if (number / multiple % 1 === 0)
          return number;
        return Math.round(number / multiple) * multiple;
      },
      MULTINOMIAL: (...numbers) => {
        let numerator = 0, denominator = 1;
        H.flattenParams(numbers, Types.NUMBER, false, (number) => {
          if (number < 0)
            throw FormulaError.NUM;
          numerator += number;
          denominator *= factorial(number);
        });
        return factorial(numerator) / denominator;
      },
      MUNIT: (dimension) => {
        dimension = H.accept(dimension, Types.NUMBER);
        const matrix = [];
        for (let row = 0; row < dimension; row++) {
          const rowArr = [];
          for (let col = 0; col < dimension; col++) {
            if (row === col)
              rowArr.push(1);
            else
              rowArr.push(0);
          }
          matrix.push(rowArr);
        }
        return matrix;
      },
      ODD: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (number === 0)
          return 1;
        let temp = Math.ceil(Math.abs(number));
        temp = temp & 1 ? temp : temp + 1;
        return number > 0 ? temp : -temp;
      },
      PI: () => {
        return Math.PI;
      },
      POWER: (number, power) => {
        number = H.accept(number, Types.NUMBER);
        power = H.accept(power, Types.NUMBER);
        return number ** power;
      },
      PRODUCT: (...numbers) => {
        let product = 1;
        H.flattenParams(numbers, null, true, (number, info) => {
          const parsedNumber = Number(number);
          if (info.isLiteral && !isNaN(parsedNumber)) {
            product *= parsedNumber;
          } else {
            if (typeof number === "number")
              product *= number;
          }
        }, 1);
        return product;
      },
      QUOTIENT: (numerator, denominator) => {
        numerator = H.accept(numerator, Types.NUMBER);
        denominator = H.accept(denominator, Types.NUMBER);
        return Math.trunc(numerator / denominator);
      },
      RADIANS: (degrees) => {
        degrees = H.accept(degrees, Types.NUMBER);
        return degrees / 180 * Math.PI;
      },
      RAND: () => {
        return Math.random();
      },
      RANDBETWEEN: (bottom, top) => {
        bottom = H.accept(bottom, Types.NUMBER);
        top = H.accept(top, Types.NUMBER);
        return Math.floor(Math.random() * (top - bottom + 1) + bottom);
      },
      ROMAN: (number, form) => {
        number = H.accept(number, Types.NUMBER);
        form = H.accept(form, Types.NUMBER, 0);
        if (form !== 0)
          throw Error("ROMAN: only allows form=0 (classic form).");
        const digits = String(number).split("");
        const key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
        let roman = "", i = 3;
        while (i--) {
          roman = (key[+digits.pop() + i * 10] || "") + roman;
        }
        return new Array(+digits.join("") + 1).join("M") + roman;
      },
      ROUND: (number, digits) => {
        number = H.accept(number, Types.NUMBER);
        digits = H.accept(digits, Types.NUMBER);
        const multiplier = Math.pow(10, Math.abs(digits));
        const sign = number > 0 ? 1 : -1;
        if (digits > 0) {
          return sign * Math.round(Math.abs(number) * multiplier) / multiplier;
        } else if (digits === 0) {
          return sign * Math.round(Math.abs(number));
        } else {
          return sign * Math.round(Math.abs(number) / multiplier) * multiplier;
        }
      },
      ROUNDDOWN: (number, digits) => {
        number = H.accept(number, Types.NUMBER);
        digits = H.accept(digits, Types.NUMBER);
        const multiplier = Math.pow(10, Math.abs(digits));
        const sign = number > 0 ? 1 : -1;
        if (digits > 0) {
          const offset = 1 / multiplier * 0.5;
          return sign * Math.round((Math.abs(number) - offset) * multiplier) / multiplier;
        } else if (digits === 0) {
          const offset = 0.5;
          return sign * Math.round(Math.abs(number) - offset);
        } else {
          const offset = multiplier * 0.5;
          return sign * Math.round((Math.abs(number) - offset) / multiplier) * multiplier;
        }
      },
      ROUNDUP: (number, digits) => {
        number = H.accept(number, Types.NUMBER);
        digits = H.accept(digits, Types.NUMBER);
        const multiplier = Math.pow(10, Math.abs(digits));
        const sign = number > 0 ? 1 : -1;
        if (digits > 0) {
          const offset = 1 / multiplier * 0.5;
          return sign * Math.round((Math.abs(number) + offset) * multiplier) / multiplier;
        } else if (digits === 0) {
          const offset = 0.5;
          return sign * Math.round(Math.abs(number) + offset);
        } else {
          const offset = multiplier * 0.5;
          return sign * Math.round((Math.abs(number) + offset) / multiplier) * multiplier;
        }
      },
      SERIESSUM: (x, n, m, coefficients) => {
        x = H.accept(x, Types.NUMBER);
        n = H.accept(n, Types.NUMBER);
        m = H.accept(m, Types.NUMBER);
        let i = 0, result;
        H.flattenParams([coefficients], Types.NUMBER, false, (coefficient) => {
          if (typeof coefficient !== "number") {
            throw FormulaError.VALUE;
          }
          if (i === 0) {
            result = coefficient * Math.pow(x, n);
          } else {
            result += coefficient * Math.pow(x, n + i * m);
          }
          i++;
        });
        return result;
      },
      SIGN: (number) => {
        number = H.accept(number, Types.NUMBER);
        return number > 0 ? 1 : number === 0 ? 0 : -1;
      },
      SQRT: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (number < 0)
          throw FormulaError.NUM;
        return Math.sqrt(number);
      },
      SQRTPI: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (number < 0)
          throw FormulaError.NUM;
        return Math.sqrt(number * Math.PI);
      },
      SUBTOTAL: () => {
      },
      SUM: (...params) => {
        let result = 0;
        H.flattenParams(
          params,
          Types.NUMBER,
          true,
          (item, info) => {
            if (info.isLiteral) {
              result += item;
            } else {
              if (typeof item === "number")
                result += item;
            }
          }
        );
        return result;
      },
      /**
       * This functions requires instance of {@link FormulaParser}.
       */
      SUMIF: (context, range, criteria, sumRange) => {
        const ranges = H.retrieveRanges(context, range, sumRange);
        range = ranges[0];
        sumRange = ranges[1];
        criteria = H.retrieveArg(context, criteria);
        const isCriteriaArray = criteria.isArray;
        criteria = Criteria.parse(H.accept(criteria));
        let sum = 0;
        range.forEach((row, rowNum) => {
          row.forEach((value, colNum) => {
            const valueToAdd = sumRange[rowNum][colNum];
            if (typeof valueToAdd !== "number")
              return;
            if (criteria.op === "wc") {
              if (criteria.match === criteria.value.test(value)) {
                sum += valueToAdd;
              }
            } else if (Infix.compareOp(value, criteria.op, criteria.value, Array.isArray(value), isCriteriaArray)) {
              sum += valueToAdd;
            }
          });
        });
        return sum;
      },
      SUMIFS: () => {
      },
      SUMPRODUCT: (array1, ...arrays) => {
        array1 = H.accept(array1, Types.ARRAY, void 0, false, true);
        arrays.forEach((array) => {
          array = H.accept(array, Types.ARRAY, void 0, false, true);
          if (array1[0].length !== array[0].length || array1.length !== array.length)
            throw FormulaError.VALUE;
          for (let i = 0; i < array1.length; i++) {
            for (let j = 0; j < array1[0].length; j++) {
              if (typeof array1[i][j] !== "number")
                array1[i][j] = 0;
              if (typeof array[i][j] !== "number")
                array[i][j] = 0;
              array1[i][j] *= array[i][j];
            }
          }
        });
        let result = 0;
        array1.forEach((row) => {
          row.forEach((value) => {
            result += value;
          });
        });
        return result;
      },
      SUMSQ: (...params) => {
        let result = 0;
        H.flattenParams(
          params,
          Types.NUMBER,
          true,
          (item, info) => {
            if (info.isLiteral) {
              result += item ** 2;
            } else {
              if (typeof item === "number")
                result += item ** 2;
            }
          }
        );
        return result;
      },
      SUMX2MY2: (arrayX, arrayY) => {
        const x = [], y = [];
        let sum = 0;
        H.flattenParams([arrayX], null, false, (item, info) => {
          x.push(item);
        });
        H.flattenParams([arrayY], null, false, (item, info) => {
          y.push(item);
        });
        if (x.length !== y.length)
          throw FormulaError.NA;
        for (let i = 0; i < x.length; i++) {
          if (typeof x[i] === "number" && typeof y[i] === "number")
            sum += x[i] ** 2 - y[i] ** 2;
        }
        return sum;
      },
      SUMX2PY2: (arrayX, arrayY) => {
        const x = [], y = [];
        let sum = 0;
        H.flattenParams([arrayX], null, false, (item, info) => {
          x.push(item);
        });
        H.flattenParams([arrayY], null, false, (item, info) => {
          y.push(item);
        });
        if (x.length !== y.length)
          throw FormulaError.NA;
        for (let i = 0; i < x.length; i++) {
          if (typeof x[i] === "number" && typeof y[i] === "number")
            sum += x[i] ** 2 + y[i] ** 2;
        }
        return sum;
      },
      SUMXMY2: (arrayX, arrayY) => {
        const x = [], y = [];
        let sum = 0;
        H.flattenParams([arrayX], null, false, (item, info) => {
          x.push(item);
        });
        H.flattenParams([arrayY], null, false, (item, info) => {
          y.push(item);
        });
        if (x.length !== y.length)
          throw FormulaError.NA;
        for (let i = 0; i < x.length; i++) {
          if (typeof x[i] === "number" && typeof y[i] === "number")
            sum += (x[i] - y[i]) ** 2;
        }
        return sum;
      },
      TRUNC: (number) => {
        number = H.accept(number, Types.NUMBER);
        return Math.trunc(number);
      }
    };
    module2.exports = MathFunctions;
  }
});

// node_modules/fast-formula-parser/formulas/functions/trigonometry.js
var require_trigonometry = __commonJS({
  "node_modules/fast-formula-parser/formulas/functions/trigonometry.js"(exports2, module2) {
    var FormulaError = require_error();
    var { FormulaHelpers, Types } = require_helpers();
    var H = FormulaHelpers;
    var MAX_NUMBER = 2 ** 27 - 1;
    var TrigFunctions = {
      ACOS: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (number > 1 || number < -1)
          throw FormulaError.NUM;
        return Math.acos(number);
      },
      ACOSH: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (number < 1)
          throw FormulaError.NUM;
        return Math.acosh(number);
      },
      ACOT: (number) => {
        number = H.accept(number, Types.NUMBER);
        return Math.PI / 2 - Math.atan(number);
      },
      ACOTH: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (Math.abs(number) <= 1)
          throw FormulaError.NUM;
        return Math.atanh(1 / number);
      },
      ASIN: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (number > 1 || number < -1)
          throw FormulaError.NUM;
        return Math.asin(number);
      },
      ASINH: (number) => {
        number = H.accept(number, Types.NUMBER);
        return Math.asinh(number);
      },
      ATAN: (number) => {
        number = H.accept(number, Types.NUMBER);
        return Math.atan(number);
      },
      ATAN2: (x, y) => {
        x = H.accept(x, Types.NUMBER);
        y = H.accept(y, Types.NUMBER);
        if (y === 0 && x === 0)
          throw FormulaError.DIV0;
        return Math.atan2(y, x);
      },
      ATANH: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (Math.abs(number) > 1)
          throw FormulaError.NUM;
        return Math.atanh(number);
      },
      COS: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (Math.abs(number) > MAX_NUMBER)
          throw FormulaError.NUM;
        return Math.cos(number);
      },
      COSH: (number) => {
        number = H.accept(number, Types.NUMBER);
        return Math.cosh(number);
      },
      COT: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (Math.abs(number) > MAX_NUMBER)
          throw FormulaError.NUM;
        if (number === 0)
          throw FormulaError.DIV0;
        return 1 / Math.tan(number);
      },
      COTH: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (number === 0)
          throw FormulaError.DIV0;
        return 1 / Math.tanh(number);
      },
      CSC: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (Math.abs(number) > MAX_NUMBER)
          throw FormulaError.NUM;
        return 1 / Math.sin(number);
      },
      CSCH: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (number === 0)
          throw FormulaError.DIV0;
        return 1 / Math.sinh(number);
      },
      SEC: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (Math.abs(number) > MAX_NUMBER)
          throw FormulaError.NUM;
        return 1 / Math.cos(number);
      },
      SECH: (number) => {
        number = H.accept(number, Types.NUMBER);
        return 1 / Math.cosh(number);
      },
      SIN: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (Math.abs(number) > MAX_NUMBER)
          throw FormulaError.NUM;
        return Math.sin(number);
      },
      SINH: (number) => {
        number = H.accept(number, Types.NUMBER);
        return Math.sinh(number);
      },
      TAN: (number) => {
        number = H.accept(number, Types.NUMBER);
        if (Math.abs(number) > MAX_NUMBER)
          throw FormulaError.NUM;
        return Math.tan(number);
      },
      TANH: (number) => {
        number = H.accept(number, Types.NUMBER);
        return Math.tanh(number);
      }
    };
    module2.exports = TrigFunctions;
  }
});

// node_modules/fast-formula-parser/formulas/functions/logical.js
var require_logical = __commonJS({
  "node_modules/fast-formula-parser/formulas/functions/logical.js"(exports2, module2) {
    var FormulaError = require_error();
    var { FormulaHelpers, Types } = require_helpers();
    var H = FormulaHelpers;
    function getNumLogicalValue(params) {
      let numTrue = 0, numFalse = 0;
      H.flattenParams(params, null, true, (val) => {
        const type = typeof val;
        if (type === "string") {
          if (val === "TRUE")
            val = true;
          else if (val === "FALSE")
            val = false;
        } else if (type === "number")
          val = Boolean(val);
        if (typeof val === "boolean") {
          if (val === true)
            numTrue++;
          else
            numFalse++;
        }
      });
      return [numTrue, numFalse];
    }
    var LogicalFunctions = {
      AND: (...params) => {
        const [numTrue, numFalse] = getNumLogicalValue(params);
        if (numTrue === 0 && numFalse === 0)
          return FormulaError.VALUE;
        return numTrue > 0 && numFalse === 0;
      },
      FALSE: () => {
        return false;
      },
      // Special
      IF: (context, logicalTest, valueIfTrue, valueIfFalse) => {
        logicalTest = H.accept(logicalTest, Types.BOOLEAN);
        valueIfTrue = H.accept(valueIfTrue);
        valueIfFalse = H.accept(valueIfFalse, null, false);
        return logicalTest ? valueIfTrue : valueIfFalse;
      },
      IFERROR: (value, valueIfError) => {
        return value.value instanceof FormulaError ? H.accept(valueIfError) : H.accept(value);
      },
      IFNA: function(value, valueIfNa) {
        if (arguments.length > 2)
          throw FormulaError.TOO_MANY_ARGS("IFNA");
        return FormulaError.NA.equals(value.value) ? H.accept(valueIfNa) : H.accept(value);
      },
      IFS: (...params) => {
        if (params.length % 2 !== 0)
          return new FormulaError("#N/A", "IFS expects all arguments after position 0 to be in pairs.");
        for (let i = 0; i < params.length / 2; i++) {
          const logicalTest = H.accept(params[i * 2], Types.BOOLEAN);
          const valueIfTrue = H.accept(params[i * 2 + 1]);
          if (logicalTest)
            return valueIfTrue;
        }
        return FormulaError.NA;
      },
      NOT: (logical) => {
        logical = H.accept(logical, Types.BOOLEAN);
        return !logical;
      },
      OR: (...params) => {
        const [numTrue, numFalse] = getNumLogicalValue(params);
        if (numTrue === 0 && numFalse === 0)
          return FormulaError.VALUE;
        return numTrue > 0;
      },
      SWITCH: (...params) => {
      },
      TRUE: () => {
        return true;
      },
      XOR: (...params) => {
        const [numTrue, numFalse] = getNumLogicalValue(params);
        if (numTrue === 0 && numFalse === 0)
          return FormulaError.VALUE;
        return numTrue % 2 === 1;
      }
    };
    module2.exports = LogicalFunctions;
  }
});

// node_modules/bessel/bessel.js
var require_bessel = __commonJS({
  "node_modules/bessel/bessel.js"(exports2) {
    var BESSEL;
    (function(factory) {
      if (typeof DO_NOT_EXPORT_BESSEL === "undefined") {
        if ("object" === typeof exports2) {
          factory(exports2);
        } else if ("function" === typeof define && define.amd) {
          define(function() {
            var module3 = {};
            factory(module3);
            return module3;
          });
        } else {
          factory(BESSEL = {});
        }
      } else {
        factory(BESSEL = {});
      }
    })(function(BESSEL2) {
      BESSEL2.version = "1.0.2";
      var M = Math;
      function _horner(arr, v) {
        for (var i = 0, z = 0; i < arr.length; ++i) z = v * z + arr[i];
        return z;
      }
      function _bessel_iter(x, n, f0, f1, sign) {
        if (n === 0) return f0;
        if (n === 1) return f1;
        var tdx = 2 / x, f2 = f1;
        for (var o = 1; o < n; ++o) {
          f2 = f1 * o * tdx + sign * f0;
          f0 = f1;
          f1 = f2;
        }
        return f2;
      }
      function _bessel_wrap(bessel0, bessel1, name, nonzero, sign) {
        return function bessel(x, n) {
          if (nonzero) {
            if (x === 0) return nonzero == 1 ? -Infinity : Infinity;
            else if (x < 0) return NaN;
          }
          if (n === 0) return bessel0(x);
          if (n === 1) return bessel1(x);
          if (n < 0) return NaN;
          n |= 0;
          var b0 = bessel0(x), b1 = bessel1(x);
          return _bessel_iter(x, n, b0, b1, sign);
        };
      }
      var besselj = function() {
        var W = 0.636619772;
        var b0_a1a = [57568490574, -13362590354, 6516196407e-1, -1121442418e-2, 77392.33017, -184.9052456].reverse();
        var b0_a2a = [57568490411, 1029532985, 9494680718e-3, 59272.64853, 267.8532712, 1].reverse();
        var b0_a1b = [1, -0.001098628627, 2734510407e-14, -2073370639e-15, 2093887211e-16].reverse();
        var b0_a2b = [-0.01562499995, 1430488765e-13, -6911147651e-15, 7621095161e-16, -934935152e-16].reverse();
        function bessel0(x) {
          var a = 0, a1 = 0, a2 = 0, y = x * x;
          if (x < 8) {
            a1 = _horner(b0_a1a, y);
            a2 = _horner(b0_a2a, y);
            a = a1 / a2;
          } else {
            var xx = x - 0.785398164;
            y = 64 / y;
            a1 = _horner(b0_a1b, y);
            a2 = _horner(b0_a2b, y);
            a = M.sqrt(W / x) * (M.cos(xx) * a1 - M.sin(xx) * a2 * 8 / x);
          }
          return a;
        }
        var b1_a1a = [72362614232, -7895059235, 2423968531e-1, -2972611439e-3, 15704.4826, -30.16036606].reverse();
        var b1_a2a = [144725228442, 2300535178, 1858330474e-2, 99447.43394, 376.9991397, 1].reverse();
        var b1_a1b = [1, 183105e-8, -3516396496e-14, 2457520174e-15, -240337019e-15].reverse();
        var b1_a2b = [0.04687499995, -2002690873e-13, 8449199096e-15, -88228987e-14, 105787412e-15].reverse();
        function bessel1(x) {
          var a = 0, a1 = 0, a2 = 0, y = x * x, xx = M.abs(x) - 2.356194491;
          if (Math.abs(x) < 8) {
            a1 = x * _horner(b1_a1a, y);
            a2 = _horner(b1_a2a, y);
            a = a1 / a2;
          } else {
            y = 64 / y;
            a1 = _horner(b1_a1b, y);
            a2 = _horner(b1_a2b, y);
            a = M.sqrt(W / M.abs(x)) * (M.cos(xx) * a1 - M.sin(xx) * a2 * 8 / M.abs(x));
            if (x < 0) a = -a;
          }
          return a;
        }
        return function besselj2(x, n) {
          n = Math.round(n);
          if (!isFinite(x)) return isNaN(x) ? x : 0;
          if (n < 0) return (n % 2 ? -1 : 1) * besselj2(x, -n);
          if (x < 0) return (n % 2 ? -1 : 1) * besselj2(-x, n);
          if (n === 0) return bessel0(x);
          if (n === 1) return bessel1(x);
          if (x === 0) return 0;
          var ret = 0;
          if (x > n) {
            ret = _bessel_iter(x, n, bessel0(x), bessel1(x), -1);
          } else {
            var m = 2 * M.floor((n + M.floor(M.sqrt(40 * n))) / 2);
            var jsum = false;
            var bjp = 0, sum = 0;
            var bj = 1, bjm = 0;
            var tox = 2 / x;
            for (var j = m; j > 0; j--) {
              bjm = j * tox * bj - bjp;
              bjp = bj;
              bj = bjm;
              if (M.abs(bj) > 1e10) {
                bj *= 1e-10;
                bjp *= 1e-10;
                ret *= 1e-10;
                sum *= 1e-10;
              }
              if (jsum) sum += bj;
              jsum = !jsum;
              if (j == n) ret = bjp;
            }
            sum = 2 * sum - bj;
            ret /= sum;
          }
          return ret;
        };
      }();
      var bessely = function() {
        var W = 0.636619772;
        var b0_a1a = [-2957821389, 7062834065, -5123598036e-1, 1087988129e-2, -86327.92757, 228.4622733].reverse();
        var b0_a2a = [40076544269, 7452499648e-1, 7189466438e-3, 47447.2647, 226.1030244, 1].reverse();
        var b0_a1b = [1, -0.001098628627, 2734510407e-14, -2073370639e-15, 2093887211e-16].reverse();
        var b0_a2b = [-0.01562499995, 1430488765e-13, -6911147651e-15, 7621095161e-16, -934945152e-16].reverse();
        function bessel0(x) {
          var a = 0, a1 = 0, a2 = 0, y = x * x, xx = x - 0.785398164;
          if (x < 8) {
            a1 = _horner(b0_a1a, y);
            a2 = _horner(b0_a2a, y);
            a = a1 / a2 + W * besselj(x, 0) * M.log(x);
          } else {
            y = 64 / y;
            a1 = _horner(b0_a1b, y);
            a2 = _horner(b0_a2b, y);
            a = M.sqrt(W / x) * (M.sin(xx) * a1 + M.cos(xx) * a2 * 8 / x);
          }
          return a;
        }
        var b1_a1a = [-4900604943e3, 127527439e4, -51534381390, 7349264551e-1, -4237922726e-3, 8511.937935].reverse();
        var b1_a2a = [249958057e5, 424441966400, 3733650367, 2245904002e-2, 102042.605, 354.9632885, 1].reverse();
        var b1_a1b = [1, 183105e-8, -3516396496e-14, 2457520174e-15, -240337019e-15].reverse();
        var b1_a2b = [0.04687499995, -2002690873e-13, 8449199096e-15, -88228987e-14, 105787412e-15].reverse();
        function bessel1(x) {
          var a = 0, a1 = 0, a2 = 0, y = x * x, xx = x - 2.356194491;
          if (x < 8) {
            a1 = x * _horner(b1_a1a, y);
            a2 = _horner(b1_a2a, y);
            a = a1 / a2 + W * (besselj(x, 1) * M.log(x) - 1 / x);
          } else {
            y = 64 / y;
            a1 = _horner(b1_a1b, y);
            a2 = _horner(b1_a2b, y);
            a = M.sqrt(W / x) * (M.sin(xx) * a1 + M.cos(xx) * a2 * 8 / x);
          }
          return a;
        }
        return _bessel_wrap(bessel0, bessel1, "BESSELY", 1, -1);
      }();
      var besseli = function() {
        var b0_a = [1, 3.5156229, 3.0899424, 1.2067492, 0.2659732, 0.0360768, 45813e-7].reverse();
        var b0_b = [0.39894228, 0.01328592, 225319e-8, -157565e-8, 916281e-8, -0.02057706, 0.02635537, -0.01647633, 392377e-8].reverse();
        function bessel0(x) {
          if (x <= 3.75) return _horner(b0_a, x * x / (3.75 * 3.75));
          return M.exp(M.abs(x)) / M.sqrt(M.abs(x)) * _horner(b0_b, 3.75 / M.abs(x));
        }
        var b1_a = [0.5, 0.87890594, 0.51498869, 0.15084934, 0.02658733, 301532e-8, 32411e-8].reverse();
        var b1_b = [0.39894228, -0.03988024, -362018e-8, 163801e-8, -0.01031555, 0.02282967, -0.02895312, 0.01787654, -420059e-8].reverse();
        function bessel1(x) {
          if (x < 3.75) return x * _horner(b1_a, x * x / (3.75 * 3.75));
          return (x < 0 ? -1 : 1) * M.exp(M.abs(x)) / M.sqrt(M.abs(x)) * _horner(b1_b, 3.75 / M.abs(x));
        }
        return function besseli2(x, n) {
          n = Math.round(n);
          if (n === 0) return bessel0(x);
          if (n === 1) return bessel1(x);
          if (n < 0) return NaN;
          if (M.abs(x) === 0) return 0;
          if (x == Infinity) return Infinity;
          var ret = 0, j, tox = 2 / M.abs(x), bip = 0, bi = 1, bim = 0;
          var m = 2 * M.round((n + M.round(M.sqrt(40 * n))) / 2);
          for (j = m; j > 0; j--) {
            bim = j * tox * bi + bip;
            bip = bi;
            bi = bim;
            if (M.abs(bi) > 1e10) {
              bi *= 1e-10;
              bip *= 1e-10;
              ret *= 1e-10;
            }
            if (j == n) ret = bip;
          }
          ret *= besseli2(x, 0) / bi;
          return x < 0 && n % 2 ? -ret : ret;
        };
      }();
      var besselk = function() {
        var b0_a = [-0.57721566, 0.4227842, 0.23069756, 0.0348859, 262698e-8, 1075e-7, 74e-7].reverse();
        var b0_b = [1.25331414, -0.07832358, 0.02189568, -0.01062446, 587872e-8, -25154e-7, 53208e-8].reverse();
        function bessel0(x) {
          if (x <= 2) return -M.log(x / 2) * besseli(x, 0) + _horner(b0_a, x * x / 4);
          return M.exp(-x) / M.sqrt(x) * _horner(b0_b, 2 / x);
        }
        var b1_a = [1, 0.15443144, -0.67278579, -0.18156897, -0.01919402, -110404e-8, -4686e-8].reverse();
        var b1_b = [1.25331414, 0.23498619, -0.0365562, 0.01504268, -780353e-8, 325614e-8, -68245e-8].reverse();
        function bessel1(x) {
          if (x <= 2) return M.log(x / 2) * besseli(x, 1) + 1 / x * _horner(b1_a, x * x / 4);
          return M.exp(-x) / M.sqrt(x) * _horner(b1_b, 2 / x);
        }
        return _bessel_wrap(bessel0, bessel1, "BESSELK", 2, 1);
      }();
      BESSEL2.besselj = besselj;
      BESSEL2.bessely = bessely;
      BESSEL2.besseli = besseli;
      BESSEL2.besselk = besselk;
    });
  }
});

// node_modules/jstat/dist/jstat.js
var require_jstat = __commonJS({
  "node_modules/jstat/dist/jstat.js"(exports2, module2) {
    (function(window, factory) {
      if (typeof exports2 === "object") {
        module2.exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define(factory);
      } else {
        window.jStat = factory();
      }
    })(exports2, function() {
      var jStat = function(Math2, undefined2) {
        var concat = Array.prototype.concat;
        var slice = Array.prototype.slice;
        var toString = Object.prototype.toString;
        function calcRdx(n, m) {
          var val = n > m ? n : m;
          return Math2.pow(
            10,
            17 - ~~(Math2.log(val > 0 ? val : -val) * Math2.LOG10E)
          );
        }
        var isArray2 = Array.isArray || function isArray3(arg) {
          return toString.call(arg) === "[object Array]";
        };
        function isFunction2(arg) {
          return toString.call(arg) === "[object Function]";
        }
        function isNumber(num) {
          return typeof num === "number" ? num - num === 0 : false;
        }
        function toVector(arr) {
          return concat.apply([], arr);
        }
        function jStat2() {
          return new jStat2._init(arguments);
        }
        jStat2.fn = jStat2.prototype;
        jStat2._init = function _init(args) {
          if (isArray2(args[0])) {
            if (isArray2(args[0][0])) {
              if (isFunction2(args[1]))
                args[0] = jStat2.map(args[0], args[1]);
              for (var i = 0; i < args[0].length; i++)
                this[i] = args[0][i];
              this.length = args[0].length;
            } else {
              this[0] = isFunction2(args[1]) ? jStat2.map(args[0], args[1]) : args[0];
              this.length = 1;
            }
          } else if (isNumber(args[0])) {
            this[0] = jStat2.seq.apply(null, args);
            this.length = 1;
          } else if (args[0] instanceof jStat2) {
            return jStat2(args[0].toArray());
          } else {
            this[0] = [];
            this.length = 1;
          }
          return this;
        };
        jStat2._init.prototype = jStat2.prototype;
        jStat2._init.constructor = jStat2;
        jStat2.utils = {
          calcRdx,
          isArray: isArray2,
          isFunction: isFunction2,
          isNumber,
          toVector
        };
        jStat2._random_fn = Math2.random;
        jStat2.setRandom = function setRandom(fn) {
          if (typeof fn !== "function")
            throw new TypeError("fn is not a function");
          jStat2._random_fn = fn;
        };
        jStat2.extend = function extend(obj) {
          var i, j;
          if (arguments.length === 1) {
            for (j in obj)
              jStat2[j] = obj[j];
            return this;
          }
          for (i = 1; i < arguments.length; i++) {
            for (j in arguments[i])
              obj[j] = arguments[i][j];
          }
          return obj;
        };
        jStat2.rows = function rows(arr) {
          return arr.length || 1;
        };
        jStat2.cols = function cols(arr) {
          return arr[0].length || 1;
        };
        jStat2.dimensions = function dimensions(arr) {
          return {
            rows: jStat2.rows(arr),
            cols: jStat2.cols(arr)
          };
        };
        jStat2.row = function row(arr, index) {
          if (isArray2(index)) {
            return index.map(function(i) {
              return jStat2.row(arr, i);
            });
          }
          return arr[index];
        };
        jStat2.rowa = function rowa(arr, i) {
          return jStat2.row(arr, i);
        };
        jStat2.col = function col(arr, index) {
          if (isArray2(index)) {
            var submat = jStat2.arange(arr.length).map(function() {
              return new Array(index.length);
            });
            index.forEach(function(ind, i2) {
              jStat2.arange(arr.length).forEach(function(j) {
                submat[j][i2] = arr[j][ind];
              });
            });
            return submat;
          }
          var column = new Array(arr.length);
          for (var i = 0; i < arr.length; i++)
            column[i] = [arr[i][index]];
          return column;
        };
        jStat2.cola = function cola(arr, i) {
          return jStat2.col(arr, i).map(function(a) {
            return a[0];
          });
        };
        jStat2.diag = function diag(arr) {
          var nrow = jStat2.rows(arr);
          var res = new Array(nrow);
          for (var row = 0; row < nrow; row++)
            res[row] = [arr[row][row]];
          return res;
        };
        jStat2.antidiag = function antidiag(arr) {
          var nrow = jStat2.rows(arr) - 1;
          var res = new Array(nrow);
          for (var i = 0; nrow >= 0; nrow--, i++)
            res[i] = [arr[i][nrow]];
          return res;
        };
        jStat2.transpose = function transpose(arr) {
          var obj = [];
          var objArr, rows, cols, j, i;
          if (!isArray2(arr[0]))
            arr = [arr];
          rows = arr.length;
          cols = arr[0].length;
          for (i = 0; i < cols; i++) {
            objArr = new Array(rows);
            for (j = 0; j < rows; j++)
              objArr[j] = arr[j][i];
            obj.push(objArr);
          }
          return obj.length === 1 ? obj[0] : obj;
        };
        jStat2.map = function map2(arr, func, toAlter) {
          var row, nrow, ncol, res, col;
          if (!isArray2(arr[0]))
            arr = [arr];
          nrow = arr.length;
          ncol = arr[0].length;
          res = toAlter ? arr : new Array(nrow);
          for (row = 0; row < nrow; row++) {
            if (!res[row])
              res[row] = new Array(ncol);
            for (col = 0; col < ncol; col++)
              res[row][col] = func(arr[row][col], row, col);
          }
          return res.length === 1 ? res[0] : res;
        };
        jStat2.cumreduce = function cumreduce(arr, func, toAlter) {
          var row, nrow, ncol, res, col;
          if (!isArray2(arr[0]))
            arr = [arr];
          nrow = arr.length;
          ncol = arr[0].length;
          res = toAlter ? arr : new Array(nrow);
          for (row = 0; row < nrow; row++) {
            if (!res[row])
              res[row] = new Array(ncol);
            if (ncol > 0)
              res[row][0] = arr[row][0];
            for (col = 1; col < ncol; col++)
              res[row][col] = func(res[row][col - 1], arr[row][col]);
          }
          return res.length === 1 ? res[0] : res;
        };
        jStat2.alter = function alter(arr, func) {
          return jStat2.map(arr, func, true);
        };
        jStat2.create = function create(rows, cols, func) {
          var res = new Array(rows);
          var i, j;
          if (isFunction2(cols)) {
            func = cols;
            cols = rows;
          }
          for (i = 0; i < rows; i++) {
            res[i] = new Array(cols);
            for (j = 0; j < cols; j++)
              res[i][j] = func(i, j);
          }
          return res;
        };
        function retZero() {
          return 0;
        }
        jStat2.zeros = function zeros(rows, cols) {
          if (!isNumber(cols))
            cols = rows;
          return jStat2.create(rows, cols, retZero);
        };
        function retOne() {
          return 1;
        }
        jStat2.ones = function ones(rows, cols) {
          if (!isNumber(cols))
            cols = rows;
          return jStat2.create(rows, cols, retOne);
        };
        jStat2.rand = function rand(rows, cols) {
          if (!isNumber(cols))
            cols = rows;
          return jStat2.create(rows, cols, jStat2._random_fn);
        };
        function retIdent(i, j) {
          return i === j ? 1 : 0;
        }
        jStat2.identity = function identity(rows, cols) {
          if (!isNumber(cols))
            cols = rows;
          return jStat2.create(rows, cols, retIdent);
        };
        jStat2.symmetric = function symmetric(arr) {
          var size = arr.length;
          var row, col;
          if (arr.length !== arr[0].length)
            return false;
          for (row = 0; row < size; row++) {
            for (col = 0; col < size; col++)
              if (arr[col][row] !== arr[row][col])
                return false;
          }
          return true;
        };
        jStat2.clear = function clear(arr) {
          return jStat2.alter(arr, retZero);
        };
        jStat2.seq = function seq(min, max, length, func) {
          if (!isFunction2(func))
            func = false;
          var arr = [];
          var hival = calcRdx(min, max);
          var step = (max * hival - min * hival) / ((length - 1) * hival);
          var current = min;
          var cnt;
          for (cnt = 0; current <= max && cnt < length; cnt++, current = (min * hival + step * hival * cnt) / hival) {
            arr.push(func ? func(current, cnt) : current);
          }
          return arr;
        };
        jStat2.arange = function arange(start, end, step) {
          var rl = [];
          var i;
          step = step || 1;
          if (end === undefined2) {
            end = start;
            start = 0;
          }
          if (start === end || step === 0) {
            return [];
          }
          if (start < end && step < 0) {
            return [];
          }
          if (start > end && step > 0) {
            return [];
          }
          if (step > 0) {
            for (i = start; i < end; i += step) {
              rl.push(i);
            }
          } else {
            for (i = start; i > end; i += step) {
              rl.push(i);
            }
          }
          return rl;
        };
        jStat2.slice = /* @__PURE__ */ function() {
          function _slice(list, start, end, step) {
            var i;
            var rl = [];
            var length = list.length;
            if (start === undefined2 && end === undefined2 && step === undefined2) {
              return jStat2.copy(list);
            }
            start = start || 0;
            end = end || list.length;
            start = start >= 0 ? start : length + start;
            end = end >= 0 ? end : length + end;
            step = step || 1;
            if (start === end || step === 0) {
              return [];
            }
            if (start < end && step < 0) {
              return [];
            }
            if (start > end && step > 0) {
              return [];
            }
            if (step > 0) {
              for (i = start; i < end; i += step) {
                rl.push(list[i]);
              }
            } else {
              for (i = start; i > end; i += step) {
                rl.push(list[i]);
              }
            }
            return rl;
          }
          function slice2(list, rcSlice) {
            var colSlice, rowSlice;
            rcSlice = rcSlice || {};
            if (isNumber(rcSlice.row)) {
              if (isNumber(rcSlice.col))
                return list[rcSlice.row][rcSlice.col];
              var row = jStat2.rowa(list, rcSlice.row);
              colSlice = rcSlice.col || {};
              return _slice(row, colSlice.start, colSlice.end, colSlice.step);
            }
            if (isNumber(rcSlice.col)) {
              var col = jStat2.cola(list, rcSlice.col);
              rowSlice = rcSlice.row || {};
              return _slice(col, rowSlice.start, rowSlice.end, rowSlice.step);
            }
            rowSlice = rcSlice.row || {};
            colSlice = rcSlice.col || {};
            var rows = _slice(list, rowSlice.start, rowSlice.end, rowSlice.step);
            return rows.map(function(row2) {
              return _slice(row2, colSlice.start, colSlice.end, colSlice.step);
            });
          }
          return slice2;
        }();
        jStat2.sliceAssign = function sliceAssign(A, rcSlice, B) {
          var nl, ml;
          if (isNumber(rcSlice.row)) {
            if (isNumber(rcSlice.col))
              return A[rcSlice.row][rcSlice.col] = B;
            rcSlice.col = rcSlice.col || {};
            rcSlice.col.start = rcSlice.col.start || 0;
            rcSlice.col.end = rcSlice.col.end || A[0].length;
            rcSlice.col.step = rcSlice.col.step || 1;
            nl = jStat2.arange(
              rcSlice.col.start,
              Math2.min(A.length, rcSlice.col.end),
              rcSlice.col.step
            );
            var m = rcSlice.row;
            nl.forEach(function(n2, i) {
              A[m][n2] = B[i];
            });
            return A;
          }
          if (isNumber(rcSlice.col)) {
            rcSlice.row = rcSlice.row || {};
            rcSlice.row.start = rcSlice.row.start || 0;
            rcSlice.row.end = rcSlice.row.end || A.length;
            rcSlice.row.step = rcSlice.row.step || 1;
            ml = jStat2.arange(
              rcSlice.row.start,
              Math2.min(A[0].length, rcSlice.row.end),
              rcSlice.row.step
            );
            var n = rcSlice.col;
            ml.forEach(function(m2, j) {
              A[m2][n] = B[j];
            });
            return A;
          }
          if (B[0].length === undefined2) {
            B = [B];
          }
          rcSlice.row.start = rcSlice.row.start || 0;
          rcSlice.row.end = rcSlice.row.end || A.length;
          rcSlice.row.step = rcSlice.row.step || 1;
          rcSlice.col.start = rcSlice.col.start || 0;
          rcSlice.col.end = rcSlice.col.end || A[0].length;
          rcSlice.col.step = rcSlice.col.step || 1;
          ml = jStat2.arange(
            rcSlice.row.start,
            Math2.min(A.length, rcSlice.row.end),
            rcSlice.row.step
          );
          nl = jStat2.arange(
            rcSlice.col.start,
            Math2.min(A[0].length, rcSlice.col.end),
            rcSlice.col.step
          );
          ml.forEach(function(m2, i) {
            nl.forEach(function(n2, j) {
              A[m2][n2] = B[i][j];
            });
          });
          return A;
        };
        jStat2.diagonal = function diagonal(diagArray) {
          var mat = jStat2.zeros(diagArray.length, diagArray.length);
          diagArray.forEach(function(t, i) {
            mat[i][i] = t;
          });
          return mat;
        };
        jStat2.copy = function copy(A) {
          return A.map(function(row) {
            if (isNumber(row))
              return row;
            return row.map(function(t) {
              return t;
            });
          });
        };
        var jProto = jStat2.prototype;
        jProto.length = 0;
        jProto.push = Array.prototype.push;
        jProto.sort = Array.prototype.sort;
        jProto.splice = Array.prototype.splice;
        jProto.slice = Array.prototype.slice;
        jProto.toArray = function toArray() {
          return this.length > 1 ? slice.call(this) : slice.call(this)[0];
        };
        jProto.map = function map2(func, toAlter) {
          return jStat2(jStat2.map(this, func, toAlter));
        };
        jProto.cumreduce = function cumreduce(func, toAlter) {
          return jStat2(jStat2.cumreduce(this, func, toAlter));
        };
        jProto.alter = function alter(func) {
          jStat2.alter(this, func);
          return this;
        };
        (function(funcs) {
          for (var i = 0; i < funcs.length; i++) (function(passfunc) {
            jProto[passfunc] = function(func) {
              var self2 = this, results;
              if (func) {
                setTimeout(function() {
                  func.call(self2, jProto[passfunc].call(self2));
                });
                return this;
              }
              results = jStat2[passfunc](this);
              return isArray2(results) ? jStat2(results) : results;
            };
          })(funcs[i]);
        })("transpose clear symmetric rows cols dimensions diag antidiag".split(" "));
        (function(funcs) {
          for (var i = 0; i < funcs.length; i++) (function(passfunc) {
            jProto[passfunc] = function(index, func) {
              var self2 = this;
              if (func) {
                setTimeout(function() {
                  func.call(self2, jProto[passfunc].call(self2, index));
                });
                return this;
              }
              return jStat2(jStat2[passfunc](this, index));
            };
          })(funcs[i]);
        })("row col".split(" "));
        (function(funcs) {
          for (var i = 0; i < funcs.length; i++) (function(passfunc) {
            jProto[passfunc] = function() {
              return jStat2(jStat2[passfunc].apply(null, arguments));
            };
          })(funcs[i]);
        })("create zeros ones rand identity".split(" "));
        return jStat2;
      }(Math);
      (function(jStat2, Math2) {
        var isFunction2 = jStat2.utils.isFunction;
        function ascNum(a, b) {
          return a - b;
        }
        function clip(arg, min, max) {
          return Math2.max(min, Math2.min(arg, max));
        }
        jStat2.sum = function sum(arr) {
          var sum2 = 0;
          var i = arr.length;
          while (--i >= 0)
            sum2 += arr[i];
          return sum2;
        };
        jStat2.sumsqrd = function sumsqrd(arr) {
          var sum = 0;
          var i = arr.length;
          while (--i >= 0)
            sum += arr[i] * arr[i];
          return sum;
        };
        jStat2.sumsqerr = function sumsqerr(arr) {
          var mean = jStat2.mean(arr);
          var sum = 0;
          var i = arr.length;
          var tmp;
          while (--i >= 0) {
            tmp = arr[i] - mean;
            sum += tmp * tmp;
          }
          return sum;
        };
        jStat2.sumrow = function sumrow(arr) {
          var sum = 0;
          var i = arr.length;
          while (--i >= 0)
            sum += arr[i];
          return sum;
        };
        jStat2.product = function product(arr) {
          var prod = 1;
          var i = arr.length;
          while (--i >= 0)
            prod *= arr[i];
          return prod;
        };
        jStat2.min = function min(arr) {
          var low = arr[0];
          var i = 0;
          while (++i < arr.length)
            if (arr[i] < low)
              low = arr[i];
          return low;
        };
        jStat2.max = function max(arr) {
          var high = arr[0];
          var i = 0;
          while (++i < arr.length)
            if (arr[i] > high)
              high = arr[i];
          return high;
        };
        jStat2.unique = function unique(arr) {
          var hash = {}, _arr = [];
          for (var i = 0; i < arr.length; i++) {
            if (!hash[arr[i]]) {
              hash[arr[i]] = true;
              _arr.push(arr[i]);
            }
          }
          return _arr;
        };
        jStat2.mean = function mean(arr) {
          return jStat2.sum(arr) / arr.length;
        };
        jStat2.meansqerr = function meansqerr(arr) {
          return jStat2.sumsqerr(arr) / arr.length;
        };
        jStat2.geomean = function geomean(arr) {
          var logs = arr.map(Math2.log);
          var meanOfLogs = jStat2.mean(logs);
          return Math2.exp(meanOfLogs);
        };
        jStat2.median = function median(arr) {
          var arrlen = arr.length;
          var _arr = arr.slice().sort(ascNum);
          return !(arrlen & 1) ? (_arr[arrlen / 2 - 1] + _arr[arrlen / 2]) / 2 : _arr[arrlen / 2 | 0];
        };
        jStat2.cumsum = function cumsum(arr) {
          return jStat2.cumreduce(arr, function(a, b) {
            return a + b;
          });
        };
        jStat2.cumprod = function cumprod(arr) {
          return jStat2.cumreduce(arr, function(a, b) {
            return a * b;
          });
        };
        jStat2.diff = function diff(arr) {
          var diffs = [];
          var arrLen = arr.length;
          var i;
          for (i = 1; i < arrLen; i++)
            diffs.push(arr[i] - arr[i - 1]);
          return diffs;
        };
        jStat2.rank = function(arr) {
          var i;
          var distinctNumbers = [];
          var numberCounts = {};
          for (i = 0; i < arr.length; i++) {
            var number = arr[i];
            if (numberCounts[number]) {
              numberCounts[number]++;
            } else {
              numberCounts[number] = 1;
              distinctNumbers.push(number);
            }
          }
          var sortedDistinctNumbers = distinctNumbers.sort(ascNum);
          var numberRanks = {};
          var currentRank = 1;
          for (i = 0; i < sortedDistinctNumbers.length; i++) {
            var number = sortedDistinctNumbers[i];
            var count = numberCounts[number];
            var first2 = currentRank;
            var last2 = currentRank + count - 1;
            var rank = (first2 + last2) / 2;
            numberRanks[number] = rank;
            currentRank += count;
          }
          return arr.map(function(number2) {
            return numberRanks[number2];
          });
        };
        jStat2.mode = function mode(arr) {
          var arrLen = arr.length;
          var _arr = arr.slice().sort(ascNum);
          var count = 1;
          var maxCount = 0;
          var numMaxCount = 0;
          var mode_arr = [];
          var i;
          for (i = 0; i < arrLen; i++) {
            if (_arr[i] === _arr[i + 1]) {
              count++;
            } else {
              if (count > maxCount) {
                mode_arr = [_arr[i]];
                maxCount = count;
                numMaxCount = 0;
              } else if (count === maxCount) {
                mode_arr.push(_arr[i]);
                numMaxCount++;
              }
              count = 1;
            }
          }
          return numMaxCount === 0 ? mode_arr[0] : mode_arr;
        };
        jStat2.range = function range(arr) {
          return jStat2.max(arr) - jStat2.min(arr);
        };
        jStat2.variance = function variance(arr, flag) {
          return jStat2.sumsqerr(arr) / (arr.length - (flag ? 1 : 0));
        };
        jStat2.pooledvariance = function pooledvariance(arr) {
          var sumsqerr = arr.reduce(function(a, samples) {
            return a + jStat2.sumsqerr(samples);
          }, 0);
          var count = arr.reduce(function(a, samples) {
            return a + samples.length;
          }, 0);
          return sumsqerr / (count - arr.length);
        };
        jStat2.deviation = function(arr) {
          var mean = jStat2.mean(arr);
          var arrlen = arr.length;
          var dev = new Array(arrlen);
          for (var i = 0; i < arrlen; i++) {
            dev[i] = arr[i] - mean;
          }
          return dev;
        };
        jStat2.stdev = function stdev(arr, flag) {
          return Math2.sqrt(jStat2.variance(arr, flag));
        };
        jStat2.pooledstdev = function pooledstdev(arr) {
          return Math2.sqrt(jStat2.pooledvariance(arr));
        };
        jStat2.meandev = function meandev(arr) {
          var mean = jStat2.mean(arr);
          var a = [];
          for (var i = arr.length - 1; i >= 0; i--) {
            a.push(Math2.abs(arr[i] - mean));
          }
          return jStat2.mean(a);
        };
        jStat2.meddev = function meddev(arr) {
          var median = jStat2.median(arr);
          var a = [];
          for (var i = arr.length - 1; i >= 0; i--) {
            a.push(Math2.abs(arr[i] - median));
          }
          return jStat2.median(a);
        };
        jStat2.coeffvar = function coeffvar(arr) {
          return jStat2.stdev(arr) / jStat2.mean(arr);
        };
        jStat2.quartiles = function quartiles(arr) {
          var arrlen = arr.length;
          var _arr = arr.slice().sort(ascNum);
          return [
            _arr[Math2.round(arrlen / 4) - 1],
            _arr[Math2.round(arrlen / 2) - 1],
            _arr[Math2.round(arrlen * 3 / 4) - 1]
          ];
        };
        jStat2.quantiles = function quantiles(arr, quantilesArray, alphap, betap) {
          var sortedArray = arr.slice().sort(ascNum);
          var quantileVals = [quantilesArray.length];
          var n = arr.length;
          var i, p, m, aleph, k, gamma;
          if (typeof alphap === "undefined")
            alphap = 3 / 8;
          if (typeof betap === "undefined")
            betap = 3 / 8;
          for (i = 0; i < quantilesArray.length; i++) {
            p = quantilesArray[i];
            m = alphap + p * (1 - alphap - betap);
            aleph = n * p + m;
            k = Math2.floor(clip(aleph, 1, n - 1));
            gamma = clip(aleph - k, 0, 1);
            quantileVals[i] = (1 - gamma) * sortedArray[k - 1] + gamma * sortedArray[k];
          }
          return quantileVals;
        };
        jStat2.percentile = function percentile(arr, k, exclusive) {
          var _arr = arr.slice().sort(ascNum);
          var realIndex = k * (_arr.length + (exclusive ? 1 : -1)) + (exclusive ? 0 : 1);
          var index = parseInt(realIndex);
          var frac = realIndex - index;
          if (index + 1 < _arr.length) {
            return _arr[index - 1] + frac * (_arr[index] - _arr[index - 1]);
          } else {
            return _arr[index - 1];
          }
        };
        jStat2.percentileOfScore = function percentileOfScore(arr, score, kind) {
          var counter = 0;
          var len = arr.length;
          var strict = false;
          var value, i;
          if (kind === "strict")
            strict = true;
          for (i = 0; i < len; i++) {
            value = arr[i];
            if (strict && value < score || !strict && value <= score) {
              counter++;
            }
          }
          return counter / len;
        };
        jStat2.histogram = function histogram(arr, binCnt) {
          binCnt = binCnt || 4;
          var first2 = jStat2.min(arr);
          var binWidth = (jStat2.max(arr) - first2) / binCnt;
          var len = arr.length;
          var bins = [];
          var i;
          for (i = 0; i < binCnt; i++)
            bins[i] = 0;
          for (i = 0; i < len; i++)
            bins[Math2.min(Math2.floor((arr[i] - first2) / binWidth), binCnt - 1)] += 1;
          return bins;
        };
        jStat2.covariance = function covariance(arr1, arr2) {
          var u = jStat2.mean(arr1);
          var v = jStat2.mean(arr2);
          var arr1Len = arr1.length;
          var sq_dev = new Array(arr1Len);
          var i;
          for (i = 0; i < arr1Len; i++)
            sq_dev[i] = (arr1[i] - u) * (arr2[i] - v);
          return jStat2.sum(sq_dev) / (arr1Len - 1);
        };
        jStat2.corrcoeff = function corrcoeff(arr1, arr2) {
          return jStat2.covariance(arr1, arr2) / jStat2.stdev(arr1, 1) / jStat2.stdev(arr2, 1);
        };
        jStat2.spearmancoeff = function(arr1, arr2) {
          arr1 = jStat2.rank(arr1);
          arr2 = jStat2.rank(arr2);
          return jStat2.corrcoeff(arr1, arr2);
        };
        jStat2.stanMoment = function stanMoment(arr, n) {
          var mu = jStat2.mean(arr);
          var sigma = jStat2.stdev(arr);
          var len = arr.length;
          var skewSum = 0;
          for (var i = 0; i < len; i++)
            skewSum += Math2.pow((arr[i] - mu) / sigma, n);
          return skewSum / arr.length;
        };
        jStat2.skewness = function skewness(arr) {
          return jStat2.stanMoment(arr, 3);
        };
        jStat2.kurtosis = function kurtosis(arr) {
          return jStat2.stanMoment(arr, 4) - 3;
        };
        var jProto = jStat2.prototype;
        (function(funcs) {
          for (var i = 0; i < funcs.length; i++) (function(passfunc) {
            jProto[passfunc] = function(fullbool, func) {
              var arr = [];
              var i2 = 0;
              var tmpthis = this;
              if (isFunction2(fullbool)) {
                func = fullbool;
                fullbool = false;
              }
              if (func) {
                setTimeout(function() {
                  func.call(tmpthis, jProto[passfunc].call(tmpthis, fullbool));
                });
                return this;
              }
              if (this.length > 1) {
                tmpthis = fullbool === true ? this : this.transpose();
                for (; i2 < tmpthis.length; i2++)
                  arr[i2] = jStat2[passfunc](tmpthis[i2]);
                return arr;
              }
              return jStat2[passfunc](this[0], fullbool);
            };
          })(funcs[i]);
        })("cumsum cumprod".split(" "));
        (function(funcs) {
          for (var i = 0; i < funcs.length; i++) (function(passfunc) {
            jProto[passfunc] = function(fullbool, func) {
              var arr = [];
              var i2 = 0;
              var tmpthis = this;
              if (isFunction2(fullbool)) {
                func = fullbool;
                fullbool = false;
              }
              if (func) {
                setTimeout(function() {
                  func.call(tmpthis, jProto[passfunc].call(tmpthis, fullbool));
                });
                return this;
              }
              if (this.length > 1) {
                if (passfunc !== "sumrow")
                  tmpthis = fullbool === true ? this : this.transpose();
                for (; i2 < tmpthis.length; i2++)
                  arr[i2] = jStat2[passfunc](tmpthis[i2]);
                return fullbool === true ? jStat2[passfunc](jStat2.utils.toVector(arr)) : arr;
              }
              return jStat2[passfunc](this[0], fullbool);
            };
          })(funcs[i]);
        })("sum sumsqrd sumsqerr sumrow product min max unique mean meansqerr geomean median diff rank mode range variance deviation stdev meandev meddev coeffvar quartiles histogram skewness kurtosis".split(" "));
        (function(funcs) {
          for (var i = 0; i < funcs.length; i++) (function(passfunc) {
            jProto[passfunc] = function() {
              var arr = [];
              var i2 = 0;
              var tmpthis = this;
              var args = Array.prototype.slice.call(arguments);
              var callbackFunction;
              if (isFunction2(args[args.length - 1])) {
                callbackFunction = args[args.length - 1];
                var argsToPass = args.slice(0, args.length - 1);
                setTimeout(function() {
                  callbackFunction.call(
                    tmpthis,
                    jProto[passfunc].apply(tmpthis, argsToPass)
                  );
                });
                return this;
              } else {
                callbackFunction = void 0;
                var curriedFunction = function curriedFunction2(vector) {
                  return jStat2[passfunc].apply(tmpthis, [vector].concat(args));
                };
              }
              if (this.length > 1) {
                tmpthis = tmpthis.transpose();
                for (; i2 < tmpthis.length; i2++)
                  arr[i2] = curriedFunction(tmpthis[i2]);
                return arr;
              }
              return curriedFunction(this[0]);
            };
          })(funcs[i]);
        })("quantiles percentileOfScore".split(" "));
      })(jStat, Math);
      (function(jStat2, Math2) {
        jStat2.gammaln = function gammaln(x) {
          var j = 0;
          var cof = [
            76.18009172947146,
            -86.50532032941678,
            24.01409824083091,
            -1.231739572450155,
            0.001208650973866179,
            -5395239384953e-18
          ];
          var ser = 1.000000000190015;
          var xx, y, tmp;
          tmp = (y = xx = x) + 5.5;
          tmp -= (xx + 0.5) * Math2.log(tmp);
          for (; j < 6; j++)
            ser += cof[j] / ++y;
          return Math2.log(2.5066282746310007 * ser / xx) - tmp;
        };
        jStat2.loggam = function loggam(x) {
          var x0, x2, xp, gl, gl0;
          var k, n;
          var a = [
            0.08333333333333333,
            -0.002777777777777778,
            7936507936507937e-19,
            -5952380952380952e-19,
            8417508417508418e-19,
            -0.001917526917526918,
            0.00641025641025641,
            -0.02955065359477124,
            0.1796443723688307,
            -1.3924322169059
          ];
          x0 = x;
          n = 0;
          if (x == 1 || x == 2) {
            return 0;
          }
          if (x <= 7) {
            n = Math2.floor(7 - x);
            x0 = x + n;
          }
          x2 = 1 / (x0 * x0);
          xp = 2 * Math2.PI;
          gl0 = a[9];
          for (k = 8; k >= 0; k--) {
            gl0 *= x2;
            gl0 += a[k];
          }
          gl = gl0 / x0 + 0.5 * Math2.log(xp) + (x0 - 0.5) * Math2.log(x0) - x0;
          if (x <= 7) {
            for (k = 1; k <= n; k++) {
              gl -= Math2.log(x0 - 1);
              x0 -= 1;
            }
          }
          return gl;
        };
        jStat2.gammafn = function gammafn(x) {
          var p = [
            -1.716185138865495,
            24.76565080557592,
            -379.80425647094563,
            629.3311553128184,
            866.9662027904133,
            -31451.272968848367,
            -36144.413418691176,
            66456.14382024054
          ];
          var q = [
            -30.8402300119739,
            315.35062697960416,
            -1015.1563674902192,
            -3107.771671572311,
            22538.11842098015,
            4755.846277527881,
            -134659.9598649693,
            -115132.2596755535
          ];
          var fact = false;
          var n = 0;
          var xden = 0;
          var xnum = 0;
          var y = x;
          var i, z, yi, res;
          if (x > 171.6243769536076) {
            return Infinity;
          }
          if (y <= 0) {
            res = y % 1 + 36e-17;
            if (res) {
              fact = (!(y & 1) ? 1 : -1) * Math2.PI / Math2.sin(Math2.PI * res);
              y = 1 - y;
            } else {
              return Infinity;
            }
          }
          yi = y;
          if (y < 1) {
            z = y++;
          } else {
            z = (y -= n = (y | 0) - 1) - 1;
          }
          for (i = 0; i < 8; ++i) {
            xnum = (xnum + p[i]) * z;
            xden = xden * z + q[i];
          }
          res = xnum / xden + 1;
          if (yi < y) {
            res /= yi;
          } else if (yi > y) {
            for (i = 0; i < n; ++i) {
              res *= y;
              y++;
            }
          }
          if (fact) {
            res = fact / res;
          }
          return res;
        };
        jStat2.gammap = function gammap(a, x) {
          return jStat2.lowRegGamma(a, x) * jStat2.gammafn(a);
        };
        jStat2.lowRegGamma = function lowRegGamma(a, x) {
          var aln = jStat2.gammaln(a);
          var ap = a;
          var sum = 1 / a;
          var del = sum;
          var b = x + 1 - a;
          var c = 1 / 1e-30;
          var d = 1 / b;
          var h = d;
          var i = 1;
          var ITMAX = -~(Math2.log(a >= 1 ? a : 1 / a) * 8.5 + a * 0.4 + 17);
          var an;
          if (x < 0 || a <= 0) {
            return NaN;
          } else if (x < a + 1) {
            for (; i <= ITMAX; i++) {
              sum += del *= x / ++ap;
            }
            return sum * Math2.exp(-x + a * Math2.log(x) - aln);
          }
          for (; i <= ITMAX; i++) {
            an = -i * (i - a);
            b += 2;
            d = an * d + b;
            c = b + an / c;
            d = 1 / d;
            h *= d * c;
          }
          return 1 - h * Math2.exp(-x + a * Math2.log(x) - aln);
        };
        jStat2.factorialln = function factorialln(n) {
          return n < 0 ? NaN : jStat2.gammaln(n + 1);
        };
        jStat2.factorial = function factorial(n) {
          return n < 0 ? NaN : jStat2.gammafn(n + 1);
        };
        jStat2.combination = function combination(n, m) {
          return n > 170 || m > 170 ? Math2.exp(jStat2.combinationln(n, m)) : jStat2.factorial(n) / jStat2.factorial(m) / jStat2.factorial(n - m);
        };
        jStat2.combinationln = function combinationln(n, m) {
          return jStat2.factorialln(n) - jStat2.factorialln(m) - jStat2.factorialln(n - m);
        };
        jStat2.permutation = function permutation(n, m) {
          return jStat2.factorial(n) / jStat2.factorial(n - m);
        };
        jStat2.betafn = function betafn(x, y) {
          if (x <= 0 || y <= 0)
            return void 0;
          return x + y > 170 ? Math2.exp(jStat2.betaln(x, y)) : jStat2.gammafn(x) * jStat2.gammafn(y) / jStat2.gammafn(x + y);
        };
        jStat2.betaln = function betaln(x, y) {
          return jStat2.gammaln(x) + jStat2.gammaln(y) - jStat2.gammaln(x + y);
        };
        jStat2.betacf = function betacf(x, a, b) {
          var fpmin = 1e-30;
          var m = 1;
          var qab = a + b;
          var qap = a + 1;
          var qam = a - 1;
          var c = 1;
          var d = 1 - qab * x / qap;
          var m2, aa, del, h;
          if (Math2.abs(d) < fpmin)
            d = fpmin;
          d = 1 / d;
          h = d;
          for (; m <= 100; m++) {
            m2 = 2 * m;
            aa = m * (b - m) * x / ((qam + m2) * (a + m2));
            d = 1 + aa * d;
            if (Math2.abs(d) < fpmin)
              d = fpmin;
            c = 1 + aa / c;
            if (Math2.abs(c) < fpmin)
              c = fpmin;
            d = 1 / d;
            h *= d * c;
            aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
            d = 1 + aa * d;
            if (Math2.abs(d) < fpmin)
              d = fpmin;
            c = 1 + aa / c;
            if (Math2.abs(c) < fpmin)
              c = fpmin;
            d = 1 / d;
            del = d * c;
            h *= del;
            if (Math2.abs(del - 1) < 3e-7)
              break;
          }
          return h;
        };
        jStat2.gammapinv = function gammapinv(p, a) {
          var j = 0;
          var a1 = a - 1;
          var EPS = 1e-8;
          var gln = jStat2.gammaln(a);
          var x, err, t, u, pp, lna1, afac;
          if (p >= 1)
            return Math2.max(100, a + 100 * Math2.sqrt(a));
          if (p <= 0)
            return 0;
          if (a > 1) {
            lna1 = Math2.log(a1);
            afac = Math2.exp(a1 * (lna1 - 1) - gln);
            pp = p < 0.5 ? p : 1 - p;
            t = Math2.sqrt(-2 * Math2.log(pp));
            x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
            if (p < 0.5)
              x = -x;
            x = Math2.max(
              1e-3,
              a * Math2.pow(1 - 1 / (9 * a) - x / (3 * Math2.sqrt(a)), 3)
            );
          } else {
            t = 1 - a * (0.253 + a * 0.12);
            if (p < t)
              x = Math2.pow(p / t, 1 / a);
            else
              x = 1 - Math2.log(1 - (p - t) / (1 - t));
          }
          for (; j < 12; j++) {
            if (x <= 0)
              return 0;
            err = jStat2.lowRegGamma(a, x) - p;
            if (a > 1)
              t = afac * Math2.exp(-(x - a1) + a1 * (Math2.log(x) - lna1));
            else
              t = Math2.exp(-x + a1 * Math2.log(x) - gln);
            u = err / t;
            x -= t = u / (1 - 0.5 * Math2.min(1, u * ((a - 1) / x - 1)));
            if (x <= 0)
              x = 0.5 * (x + t);
            if (Math2.abs(t) < EPS * x)
              break;
          }
          return x;
        };
        jStat2.erf = function erf(x) {
          var cof = [
            -1.3026537197817094,
            0.6419697923564902,
            0.019476473204185836,
            -0.00956151478680863,
            -946595344482036e-18,
            366839497852761e-18,
            42523324806907e-18,
            -20278578112534e-18,
            -1624290004647e-18,
            130365583558e-17,
            15626441722e-18,
            -85238095915e-18,
            6529054439e-18,
            5059343495e-18,
            -991364156e-18,
            -227365122e-18,
            96467911e-18,
            2394038e-18,
            -6886027e-18,
            894487e-18,
            313092e-18,
            -112708e-18,
            381e-18,
            7106e-18,
            -1523e-18,
            -94e-18,
            121e-18,
            -28e-18
          ];
          var j = cof.length - 1;
          var isneg = false;
          var d = 0;
          var dd = 0;
          var t, ty, tmp, res;
          if (x < 0) {
            x = -x;
            isneg = true;
          }
          t = 2 / (2 + x);
          ty = 4 * t - 2;
          for (; j > 0; j--) {
            tmp = d;
            d = ty * d - dd + cof[j];
            dd = tmp;
          }
          res = t * Math2.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
          return isneg ? res - 1 : 1 - res;
        };
        jStat2.erfc = function erfc(x) {
          return 1 - jStat2.erf(x);
        };
        jStat2.erfcinv = function erfcinv(p) {
          var j = 0;
          var x, err, t, pp;
          if (p >= 2)
            return -100;
          if (p <= 0)
            return 100;
          pp = p < 1 ? p : 2 - p;
          t = Math2.sqrt(-2 * Math2.log(pp / 2));
          x = -0.70711 * ((2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t);
          for (; j < 2; j++) {
            err = jStat2.erfc(x) - pp;
            x += err / (1.1283791670955126 * Math2.exp(-x * x) - x * err);
          }
          return p < 1 ? x : -x;
        };
        jStat2.ibetainv = function ibetainv(p, a, b) {
          var EPS = 1e-8;
          var a1 = a - 1;
          var b1 = b - 1;
          var j = 0;
          var lna, lnb, pp, t, u, err, x, al, h, w, afac;
          if (p <= 0)
            return 0;
          if (p >= 1)
            return 1;
          if (a >= 1 && b >= 1) {
            pp = p < 0.5 ? p : 1 - p;
            t = Math2.sqrt(-2 * Math2.log(pp));
            x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
            if (p < 0.5)
              x = -x;
            al = (x * x - 3) / 6;
            h = 2 / (1 / (2 * a - 1) + 1 / (2 * b - 1));
            w = x * Math2.sqrt(al + h) / h - (1 / (2 * b - 1) - 1 / (2 * a - 1)) * (al + 5 / 6 - 2 / (3 * h));
            x = a / (a + b * Math2.exp(2 * w));
          } else {
            lna = Math2.log(a / (a + b));
            lnb = Math2.log(b / (a + b));
            t = Math2.exp(a * lna) / a;
            u = Math2.exp(b * lnb) / b;
            w = t + u;
            if (p < t / w)
              x = Math2.pow(a * w * p, 1 / a);
            else
              x = 1 - Math2.pow(b * w * (1 - p), 1 / b);
          }
          afac = -jStat2.gammaln(a) - jStat2.gammaln(b) + jStat2.gammaln(a + b);
          for (; j < 10; j++) {
            if (x === 0 || x === 1)
              return x;
            err = jStat2.ibeta(x, a, b) - p;
            t = Math2.exp(a1 * Math2.log(x) + b1 * Math2.log(1 - x) + afac);
            u = err / t;
            x -= t = u / (1 - 0.5 * Math2.min(1, u * (a1 / x - b1 / (1 - x))));
            if (x <= 0)
              x = 0.5 * (x + t);
            if (x >= 1)
              x = 0.5 * (x + t + 1);
            if (Math2.abs(t) < EPS * x && j > 0)
              break;
          }
          return x;
        };
        jStat2.ibeta = function ibeta(x, a, b) {
          var bt = x === 0 || x === 1 ? 0 : Math2.exp(jStat2.gammaln(a + b) - jStat2.gammaln(a) - jStat2.gammaln(b) + a * Math2.log(x) + b * Math2.log(1 - x));
          if (x < 0 || x > 1)
            return false;
          if (x < (a + 1) / (a + b + 2))
            return bt * jStat2.betacf(x, a, b) / a;
          return 1 - bt * jStat2.betacf(1 - x, b, a) / b;
        };
        jStat2.randn = function randn(n, m) {
          var u, v, x, y, q;
          if (!m)
            m = n;
          if (n)
            return jStat2.create(n, m, function() {
              return jStat2.randn();
            });
          do {
            u = jStat2._random_fn();
            v = 1.7156 * (jStat2._random_fn() - 0.5);
            x = u - 0.449871;
            y = Math2.abs(v) + 0.386595;
            q = x * x + y * (0.196 * y - 0.25472 * x);
          } while (q > 0.27597 && (q > 0.27846 || v * v > -4 * Math2.log(u) * u * u));
          return v / u;
        };
        jStat2.randg = function randg(shape, n, m) {
          var oalph = shape;
          var a1, a2, u, v, x, mat;
          if (!m)
            m = n;
          if (!shape)
            shape = 1;
          if (n) {
            mat = jStat2.zeros(n, m);
            mat.alter(function() {
              return jStat2.randg(shape);
            });
            return mat;
          }
          if (shape < 1)
            shape += 1;
          a1 = shape - 1 / 3;
          a2 = 1 / Math2.sqrt(9 * a1);
          do {
            do {
              x = jStat2.randn();
              v = 1 + a2 * x;
            } while (v <= 0);
            v = v * v * v;
            u = jStat2._random_fn();
          } while (u > 1 - 0.331 * Math2.pow(x, 4) && Math2.log(u) > 0.5 * x * x + a1 * (1 - v + Math2.log(v)));
          if (shape == oalph)
            return a1 * v;
          do {
            u = jStat2._random_fn();
          } while (u === 0);
          return Math2.pow(u, 1 / oalph) * a1 * v;
        };
        (function(funcs) {
          for (var i = 0; i < funcs.length; i++) (function(passfunc) {
            jStat2.fn[passfunc] = function() {
              return jStat2(
                jStat2.map(this, function(value) {
                  return jStat2[passfunc](value);
                })
              );
            };
          })(funcs[i]);
        })("gammaln gammafn factorial factorialln".split(" "));
        (function(funcs) {
          for (var i = 0; i < funcs.length; i++) (function(passfunc) {
            jStat2.fn[passfunc] = function() {
              return jStat2(jStat2[passfunc].apply(null, arguments));
            };
          })(funcs[i]);
        })("randn".split(" "));
      })(jStat, Math);
      (function(jStat2, Math2) {
        (function(list) {
          for (var i = 0; i < list.length; i++) (function(func) {
            jStat2[func] = function f(a, b, c) {
              if (!(this instanceof f))
                return new f(a, b, c);
              this._a = a;
              this._b = b;
              this._c = c;
              return this;
            };
            jStat2.fn[func] = function(a, b, c) {
              var newthis = jStat2[func](a, b, c);
              newthis.data = this;
              return newthis;
            };
            jStat2[func].prototype.sample = function(arr) {
              var a = this._a;
              var b = this._b;
              var c = this._c;
              if (arr)
                return jStat2.alter(arr, function() {
                  return jStat2[func].sample(a, b, c);
                });
              else
                return jStat2[func].sample(a, b, c);
            };
            (function(vals) {
              for (var i2 = 0; i2 < vals.length; i2++) (function(fnfunc) {
                jStat2[func].prototype[fnfunc] = function(x) {
                  var a = this._a;
                  var b = this._b;
                  var c = this._c;
                  if (!x && x !== 0)
                    x = this.data;
                  if (typeof x !== "number") {
                    return jStat2.fn.map.call(x, function(x2) {
                      return jStat2[func][fnfunc](x2, a, b, c);
                    });
                  }
                  return jStat2[func][fnfunc](x, a, b, c);
                };
              })(vals[i2]);
            })("pdf cdf inv".split(" "));
            (function(vals) {
              for (var i2 = 0; i2 < vals.length; i2++) (function(fnfunc) {
                jStat2[func].prototype[fnfunc] = function() {
                  return jStat2[func][fnfunc](this._a, this._b, this._c);
                };
              })(vals[i2]);
            })("mean median mode variance".split(" "));
          })(list[i]);
        })("beta centralF cauchy chisquare exponential gamma invgamma kumaraswamy laplace lognormal noncentralt normal pareto studentt weibull uniform binomial negbin hypgeom poisson triangular tukey arcsine".split(" "));
        jStat2.extend(jStat2.beta, {
          pdf: function pdf(x, alpha, beta) {
            if (x > 1 || x < 0)
              return 0;
            if (alpha == 1 && beta == 1)
              return 1;
            if (alpha < 512 && beta < 512) {
              return Math2.pow(x, alpha - 1) * Math2.pow(1 - x, beta - 1) / jStat2.betafn(alpha, beta);
            } else {
              return Math2.exp((alpha - 1) * Math2.log(x) + (beta - 1) * Math2.log(1 - x) - jStat2.betaln(alpha, beta));
            }
          },
          cdf: function cdf(x, alpha, beta) {
            return x > 1 || x < 0 ? (x > 1) * 1 : jStat2.ibeta(x, alpha, beta);
          },
          inv: function inv(x, alpha, beta) {
            return jStat2.ibetainv(x, alpha, beta);
          },
          mean: function mean(alpha, beta) {
            return alpha / (alpha + beta);
          },
          median: function median(alpha, beta) {
            return jStat2.ibetainv(0.5, alpha, beta);
          },
          mode: function mode(alpha, beta) {
            return (alpha - 1) / (alpha + beta - 2);
          },
          // return a random sample
          sample: function sample(alpha, beta) {
            var u = jStat2.randg(alpha);
            return u / (u + jStat2.randg(beta));
          },
          variance: function variance(alpha, beta) {
            return alpha * beta / (Math2.pow(alpha + beta, 2) * (alpha + beta + 1));
          }
        });
        jStat2.extend(jStat2.centralF, {
          // This implementation of the pdf function avoids float overflow
          // See the way that R calculates this value:
          // https://svn.r-project.org/R/trunk/src/nmath/df.c
          pdf: function pdf(x, df1, df2) {
            var p, q, f;
            if (x < 0)
              return 0;
            if (df1 <= 2) {
              if (x === 0 && df1 < 2) {
                return Infinity;
              }
              if (x === 0 && df1 === 2) {
                return 1;
              }
              return 1 / jStat2.betafn(df1 / 2, df2 / 2) * Math2.pow(df1 / df2, df1 / 2) * Math2.pow(x, df1 / 2 - 1) * Math2.pow(1 + df1 / df2 * x, -(df1 + df2) / 2);
            }
            p = df1 * x / (df2 + x * df1);
            q = df2 / (df2 + x * df1);
            f = df1 * q / 2;
            return f * jStat2.binomial.pdf((df1 - 2) / 2, (df1 + df2 - 2) / 2, p);
          },
          cdf: function cdf(x, df1, df2) {
            if (x < 0)
              return 0;
            return jStat2.ibeta(df1 * x / (df1 * x + df2), df1 / 2, df2 / 2);
          },
          inv: function inv(x, df1, df2) {
            return df2 / (df1 * (1 / jStat2.ibetainv(x, df1 / 2, df2 / 2) - 1));
          },
          mean: function mean(df1, df2) {
            return df2 > 2 ? df2 / (df2 - 2) : void 0;
          },
          mode: function mode(df1, df2) {
            return df1 > 2 ? df2 * (df1 - 2) / (df1 * (df2 + 2)) : void 0;
          },
          // return a random sample
          sample: function sample(df1, df2) {
            var x1 = jStat2.randg(df1 / 2) * 2;
            var x2 = jStat2.randg(df2 / 2) * 2;
            return x1 / df1 / (x2 / df2);
          },
          variance: function variance(df1, df2) {
            if (df2 <= 4)
              return void 0;
            return 2 * df2 * df2 * (df1 + df2 - 2) / (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4));
          }
        });
        jStat2.extend(jStat2.cauchy, {
          pdf: function pdf(x, local, scale) {
            if (scale < 0) {
              return 0;
            }
            return scale / (Math2.pow(x - local, 2) + Math2.pow(scale, 2)) / Math2.PI;
          },
          cdf: function cdf(x, local, scale) {
            return Math2.atan((x - local) / scale) / Math2.PI + 0.5;
          },
          inv: function(p, local, scale) {
            return local + scale * Math2.tan(Math2.PI * (p - 0.5));
          },
          median: function median(local) {
            return local;
          },
          mode: function mode(local) {
            return local;
          },
          sample: function sample(local, scale) {
            return jStat2.randn() * Math2.sqrt(1 / (2 * jStat2.randg(0.5))) * scale + local;
          }
        });
        jStat2.extend(jStat2.chisquare, {
          pdf: function pdf(x, dof) {
            if (x < 0)
              return 0;
            return x === 0 && dof === 2 ? 0.5 : Math2.exp((dof / 2 - 1) * Math2.log(x) - x / 2 - dof / 2 * Math2.log(2) - jStat2.gammaln(dof / 2));
          },
          cdf: function cdf(x, dof) {
            if (x < 0)
              return 0;
            return jStat2.lowRegGamma(dof / 2, x / 2);
          },
          inv: function(p, dof) {
            return 2 * jStat2.gammapinv(p, 0.5 * dof);
          },
          mean: function(dof) {
            return dof;
          },
          // TODO: this is an approximation (is there a better way?)
          median: function median(dof) {
            return dof * Math2.pow(1 - 2 / (9 * dof), 3);
          },
          mode: function mode(dof) {
            return dof - 2 > 0 ? dof - 2 : 0;
          },
          sample: function sample(dof) {
            return jStat2.randg(dof / 2) * 2;
          },
          variance: function variance(dof) {
            return 2 * dof;
          }
        });
        jStat2.extend(jStat2.exponential, {
          pdf: function pdf(x, rate) {
            return x < 0 ? 0 : rate * Math2.exp(-rate * x);
          },
          cdf: function cdf(x, rate) {
            return x < 0 ? 0 : 1 - Math2.exp(-rate * x);
          },
          inv: function(p, rate) {
            return -Math2.log(1 - p) / rate;
          },
          mean: function(rate) {
            return 1 / rate;
          },
          median: function(rate) {
            return 1 / rate * Math2.log(2);
          },
          mode: function mode() {
            return 0;
          },
          sample: function sample(rate) {
            return -1 / rate * Math2.log(jStat2._random_fn());
          },
          variance: function(rate) {
            return Math2.pow(rate, -2);
          }
        });
        jStat2.extend(jStat2.gamma, {
          pdf: function pdf(x, shape, scale) {
            if (x < 0)
              return 0;
            return x === 0 && shape === 1 ? 1 / scale : Math2.exp((shape - 1) * Math2.log(x) - x / scale - jStat2.gammaln(shape) - shape * Math2.log(scale));
          },
          cdf: function cdf(x, shape, scale) {
            if (x < 0)
              return 0;
            return jStat2.lowRegGamma(shape, x / scale);
          },
          inv: function(p, shape, scale) {
            return jStat2.gammapinv(p, shape) * scale;
          },
          mean: function(shape, scale) {
            return shape * scale;
          },
          mode: function mode(shape, scale) {
            if (shape > 1) return (shape - 1) * scale;
            return void 0;
          },
          sample: function sample(shape, scale) {
            return jStat2.randg(shape) * scale;
          },
          variance: function variance(shape, scale) {
            return shape * scale * scale;
          }
        });
        jStat2.extend(jStat2.invgamma, {
          pdf: function pdf(x, shape, scale) {
            if (x <= 0)
              return 0;
            return Math2.exp(-(shape + 1) * Math2.log(x) - scale / x - jStat2.gammaln(shape) + shape * Math2.log(scale));
          },
          cdf: function cdf(x, shape, scale) {
            if (x <= 0)
              return 0;
            return 1 - jStat2.lowRegGamma(shape, scale / x);
          },
          inv: function(p, shape, scale) {
            return scale / jStat2.gammapinv(1 - p, shape);
          },
          mean: function(shape, scale) {
            return shape > 1 ? scale / (shape - 1) : void 0;
          },
          mode: function mode(shape, scale) {
            return scale / (shape + 1);
          },
          sample: function sample(shape, scale) {
            return scale / jStat2.randg(shape);
          },
          variance: function variance(shape, scale) {
            if (shape <= 2)
              return void 0;
            return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2));
          }
        });
        jStat2.extend(jStat2.kumaraswamy, {
          pdf: function pdf(x, alpha, beta) {
            if (x === 0 && alpha === 1)
              return beta;
            else if (x === 1 && beta === 1)
              return alpha;
            return Math2.exp(Math2.log(alpha) + Math2.log(beta) + (alpha - 1) * Math2.log(x) + (beta - 1) * Math2.log(1 - Math2.pow(x, alpha)));
          },
          cdf: function cdf(x, alpha, beta) {
            if (x < 0)
              return 0;
            else if (x > 1)
              return 1;
            return 1 - Math2.pow(1 - Math2.pow(x, alpha), beta);
          },
          inv: function inv(p, alpha, beta) {
            return Math2.pow(1 - Math2.pow(1 - p, 1 / beta), 1 / alpha);
          },
          mean: function(alpha, beta) {
            return beta * jStat2.gammafn(1 + 1 / alpha) * jStat2.gammafn(beta) / jStat2.gammafn(1 + 1 / alpha + beta);
          },
          median: function median(alpha, beta) {
            return Math2.pow(1 - Math2.pow(2, -1 / beta), 1 / alpha);
          },
          mode: function mode(alpha, beta) {
            if (!(alpha >= 1 && beta >= 1 && (alpha !== 1 && beta !== 1)))
              return void 0;
            return Math2.pow((alpha - 1) / (alpha * beta - 1), 1 / alpha);
          },
          variance: function variance() {
            throw new Error("variance not yet implemented");
          }
        });
        jStat2.extend(jStat2.lognormal, {
          pdf: function pdf(x, mu, sigma) {
            if (x <= 0)
              return 0;
            return Math2.exp(-Math2.log(x) - 0.5 * Math2.log(2 * Math2.PI) - Math2.log(sigma) - Math2.pow(Math2.log(x) - mu, 2) / (2 * sigma * sigma));
          },
          cdf: function cdf(x, mu, sigma) {
            if (x < 0)
              return 0;
            return 0.5 + 0.5 * jStat2.erf((Math2.log(x) - mu) / Math2.sqrt(2 * sigma * sigma));
          },
          inv: function(p, mu, sigma) {
            return Math2.exp(-1.4142135623730951 * sigma * jStat2.erfcinv(2 * p) + mu);
          },
          mean: function mean(mu, sigma) {
            return Math2.exp(mu + sigma * sigma / 2);
          },
          median: function median(mu) {
            return Math2.exp(mu);
          },
          mode: function mode(mu, sigma) {
            return Math2.exp(mu - sigma * sigma);
          },
          sample: function sample(mu, sigma) {
            return Math2.exp(jStat2.randn() * sigma + mu);
          },
          variance: function variance(mu, sigma) {
            return (Math2.exp(sigma * sigma) - 1) * Math2.exp(2 * mu + sigma * sigma);
          }
        });
        jStat2.extend(jStat2.noncentralt, {
          pdf: function pdf(x, dof, ncp) {
            var tol = 1e-14;
            if (Math2.abs(ncp) < tol)
              return jStat2.studentt.pdf(x, dof);
            if (Math2.abs(x) < tol) {
              return Math2.exp(jStat2.gammaln((dof + 1) / 2) - ncp * ncp / 2 - 0.5 * Math2.log(Math2.PI * dof) - jStat2.gammaln(dof / 2));
            }
            return dof / x * (jStat2.noncentralt.cdf(x * Math2.sqrt(1 + 2 / dof), dof + 2, ncp) - jStat2.noncentralt.cdf(x, dof, ncp));
          },
          cdf: function cdf(x, dof, ncp) {
            var tol = 1e-14;
            var min_iterations = 200;
            if (Math2.abs(ncp) < tol)
              return jStat2.studentt.cdf(x, dof);
            var flip = false;
            if (x < 0) {
              flip = true;
              ncp = -ncp;
            }
            var prob = jStat2.normal.cdf(-ncp, 0, 1);
            var value = tol + 1;
            var lastvalue = value;
            var y = x * x / (x * x + dof);
            var j = 0;
            var p = Math2.exp(-ncp * ncp / 2);
            var q = Math2.exp(-ncp * ncp / 2 - 0.5 * Math2.log(2) - jStat2.gammaln(3 / 2)) * ncp;
            while (j < min_iterations || lastvalue > tol || value > tol) {
              lastvalue = value;
              if (j > 0) {
                p *= ncp * ncp / (2 * j);
                q *= ncp * ncp / (2 * (j + 1 / 2));
              }
              value = p * jStat2.beta.cdf(y, j + 0.5, dof / 2) + q * jStat2.beta.cdf(y, j + 1, dof / 2);
              prob += 0.5 * value;
              j++;
            }
            return flip ? 1 - prob : prob;
          }
        });
        jStat2.extend(jStat2.normal, {
          pdf: function pdf(x, mean, std) {
            return Math2.exp(-0.5 * Math2.log(2 * Math2.PI) - Math2.log(std) - Math2.pow(x - mean, 2) / (2 * std * std));
          },
          cdf: function cdf(x, mean, std) {
            return 0.5 * (1 + jStat2.erf((x - mean) / Math2.sqrt(2 * std * std)));
          },
          inv: function(p, mean, std) {
            return -1.4142135623730951 * std * jStat2.erfcinv(2 * p) + mean;
          },
          mean: function(mean) {
            return mean;
          },
          median: function median(mean) {
            return mean;
          },
          mode: function(mean) {
            return mean;
          },
          sample: function sample(mean, std) {
            return jStat2.randn() * std + mean;
          },
          variance: function(mean, std) {
            return std * std;
          }
        });
        jStat2.extend(jStat2.pareto, {
          pdf: function pdf(x, scale, shape) {
            if (x < scale)
              return 0;
            return shape * Math2.pow(scale, shape) / Math2.pow(x, shape + 1);
          },
          cdf: function cdf(x, scale, shape) {
            if (x < scale)
              return 0;
            return 1 - Math2.pow(scale / x, shape);
          },
          inv: function inv(p, scale, shape) {
            return scale / Math2.pow(1 - p, 1 / shape);
          },
          mean: function mean(scale, shape) {
            if (shape <= 1)
              return void 0;
            return shape * Math2.pow(scale, shape) / (shape - 1);
          },
          median: function median(scale, shape) {
            return scale * (shape * Math2.SQRT2);
          },
          mode: function mode(scale) {
            return scale;
          },
          variance: function(scale, shape) {
            if (shape <= 2)
              return void 0;
            return scale * scale * shape / (Math2.pow(shape - 1, 2) * (shape - 2));
          }
        });
        jStat2.extend(jStat2.studentt, {
          pdf: function pdf(x, dof) {
            dof = dof > 1e100 ? 1e100 : dof;
            return 1 / (Math2.sqrt(dof) * jStat2.betafn(0.5, dof / 2)) * Math2.pow(1 + x * x / dof, -((dof + 1) / 2));
          },
          cdf: function cdf(x, dof) {
            var dof2 = dof / 2;
            return jStat2.ibeta((x + Math2.sqrt(x * x + dof)) / (2 * Math2.sqrt(x * x + dof)), dof2, dof2);
          },
          inv: function(p, dof) {
            var x = jStat2.ibetainv(2 * Math2.min(p, 1 - p), 0.5 * dof, 0.5);
            x = Math2.sqrt(dof * (1 - x) / x);
            return p > 0.5 ? x : -x;
          },
          mean: function mean(dof) {
            return dof > 1 ? 0 : void 0;
          },
          median: function median() {
            return 0;
          },
          mode: function mode() {
            return 0;
          },
          sample: function sample(dof) {
            return jStat2.randn() * Math2.sqrt(dof / (2 * jStat2.randg(dof / 2)));
          },
          variance: function variance(dof) {
            return dof > 2 ? dof / (dof - 2) : dof > 1 ? Infinity : void 0;
          }
        });
        jStat2.extend(jStat2.weibull, {
          pdf: function pdf(x, scale, shape) {
            if (x < 0 || scale < 0 || shape < 0)
              return 0;
            return shape / scale * Math2.pow(x / scale, shape - 1) * Math2.exp(-Math2.pow(x / scale, shape));
          },
          cdf: function cdf(x, scale, shape) {
            return x < 0 ? 0 : 1 - Math2.exp(-Math2.pow(x / scale, shape));
          },
          inv: function(p, scale, shape) {
            return scale * Math2.pow(-Math2.log(1 - p), 1 / shape);
          },
          mean: function(scale, shape) {
            return scale * jStat2.gammafn(1 + 1 / shape);
          },
          median: function median(scale, shape) {
            return scale * Math2.pow(Math2.log(2), 1 / shape);
          },
          mode: function mode(scale, shape) {
            if (shape <= 1)
              return 0;
            return scale * Math2.pow((shape - 1) / shape, 1 / shape);
          },
          sample: function sample(scale, shape) {
            return scale * Math2.pow(-Math2.log(jStat2._random_fn()), 1 / shape);
          },
          variance: function variance(scale, shape) {
            return scale * scale * jStat2.gammafn(1 + 2 / shape) - Math2.pow(jStat2.weibull.mean(scale, shape), 2);
          }
        });
        jStat2.extend(jStat2.uniform, {
          pdf: function pdf(x, a, b) {
            return x < a || x > b ? 0 : 1 / (b - a);
          },
          cdf: function cdf(x, a, b) {
            if (x < a)
              return 0;
            else if (x < b)
              return (x - a) / (b - a);
            return 1;
          },
          inv: function(p, a, b) {
            return a + p * (b - a);
          },
          mean: function mean(a, b) {
            return 0.5 * (a + b);
          },
          median: function median(a, b) {
            return jStat2.mean(a, b);
          },
          mode: function mode() {
            throw new Error("mode is not yet implemented");
          },
          sample: function sample(a, b) {
            return a / 2 + b / 2 + (b / 2 - a / 2) * (2 * jStat2._random_fn() - 1);
          },
          variance: function variance(a, b) {
            return Math2.pow(b - a, 2) / 12;
          }
        });
        function betinc(x, a, b, eps) {
          var a0 = 0;
          var b0 = 1;
          var a1 = 1;
          var b1 = 1;
          var m9 = 0;
          var a2 = 0;
          var c9;
          while (Math2.abs((a1 - a2) / a1) > eps) {
            a2 = a1;
            c9 = -(a + m9) * (a + b + m9) * x / (a + 2 * m9) / (a + 2 * m9 + 1);
            a0 = a1 + c9 * a0;
            b0 = b1 + c9 * b0;
            m9 = m9 + 1;
            c9 = m9 * (b - m9) * x / (a + 2 * m9 - 1) / (a + 2 * m9);
            a1 = a0 + c9 * a1;
            b1 = b0 + c9 * b1;
            a0 = a0 / b1;
            b0 = b0 / b1;
            a1 = a1 / b1;
            b1 = 1;
          }
          return a1 / a;
        }
        jStat2.extend(jStat2.binomial, {
          pdf: function pdf(k, n, p) {
            return p === 0 || p === 1 ? n * p === k ? 1 : 0 : jStat2.combination(n, k) * Math2.pow(p, k) * Math2.pow(1 - p, n - k);
          },
          cdf: function cdf(x, n, p) {
            var betacdf;
            var eps = 1e-10;
            if (x < 0)
              return 0;
            if (x >= n)
              return 1;
            if (p < 0 || p > 1 || n <= 0)
              return NaN;
            x = Math2.floor(x);
            var z = p;
            var a = x + 1;
            var b = n - x;
            var s = a + b;
            var bt = Math2.exp(jStat2.gammaln(s) - jStat2.gammaln(b) - jStat2.gammaln(a) + a * Math2.log(z) + b * Math2.log(1 - z));
            if (z < (a + 1) / (s + 2))
              betacdf = bt * betinc(z, a, b, eps);
            else
              betacdf = 1 - bt * betinc(1 - z, b, a, eps);
            return Math2.round((1 - betacdf) * (1 / eps)) / (1 / eps);
          }
        });
        jStat2.extend(jStat2.negbin, {
          pdf: function pdf(k, r, p) {
            if (k !== k >>> 0)
              return false;
            if (k < 0)
              return 0;
            return jStat2.combination(k + r - 1, r - 1) * Math2.pow(1 - p, k) * Math2.pow(p, r);
          },
          cdf: function cdf(x, r, p) {
            var sum = 0, k = 0;
            if (x < 0) return 0;
            for (; k <= x; k++) {
              sum += jStat2.negbin.pdf(k, r, p);
            }
            return sum;
          }
        });
        jStat2.extend(jStat2.hypgeom, {
          pdf: function pdf(k, N, m, n) {
            if (k !== k | 0) {
              return false;
            } else if (k < 0 || k < m - (N - n)) {
              return 0;
            } else if (k > n || k > m) {
              return 0;
            } else if (m * 2 > N) {
              if (n * 2 > N) {
                return jStat2.hypgeom.pdf(N - m - n + k, N, N - m, N - n);
              } else {
                return jStat2.hypgeom.pdf(n - k, N, N - m, n);
              }
            } else if (n * 2 > N) {
              return jStat2.hypgeom.pdf(m - k, N, m, N - n);
            } else if (m < n) {
              return jStat2.hypgeom.pdf(k, N, n, m);
            } else {
              var scaledPDF = 1;
              var samplesDone = 0;
              for (var i = 0; i < k; i++) {
                while (scaledPDF > 1 && samplesDone < n) {
                  scaledPDF *= 1 - m / (N - samplesDone);
                  samplesDone++;
                }
                scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1));
              }
              for (; samplesDone < n; samplesDone++) {
                scaledPDF *= 1 - m / (N - samplesDone);
              }
              return Math2.min(1, Math2.max(0, scaledPDF));
            }
          },
          cdf: function cdf(x, N, m, n) {
            if (x < 0 || x < m - (N - n)) {
              return 0;
            } else if (x >= n || x >= m) {
              return 1;
            } else if (m * 2 > N) {
              if (n * 2 > N) {
                return jStat2.hypgeom.cdf(N - m - n + x, N, N - m, N - n);
              } else {
                return 1 - jStat2.hypgeom.cdf(n - x - 1, N, N - m, n);
              }
            } else if (n * 2 > N) {
              return 1 - jStat2.hypgeom.cdf(m - x - 1, N, m, N - n);
            } else if (m < n) {
              return jStat2.hypgeom.cdf(x, N, n, m);
            } else {
              var scaledCDF = 1;
              var scaledPDF = 1;
              var samplesDone = 0;
              for (var i = 0; i < x; i++) {
                while (scaledCDF > 1 && samplesDone < n) {
                  var factor = 1 - m / (N - samplesDone);
                  scaledPDF *= factor;
                  scaledCDF *= factor;
                  samplesDone++;
                }
                scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1));
                scaledCDF += scaledPDF;
              }
              for (; samplesDone < n; samplesDone++) {
                scaledCDF *= 1 - m / (N - samplesDone);
              }
              return Math2.min(1, Math2.max(0, scaledCDF));
            }
          }
        });
        jStat2.extend(jStat2.poisson, {
          pdf: function pdf(k, l) {
            if (l < 0 || k % 1 !== 0 || k < 0) {
              return 0;
            }
            return Math2.pow(l, k) * Math2.exp(-l) / jStat2.factorial(k);
          },
          cdf: function cdf(x, l) {
            var sumarr = [], k = 0;
            if (x < 0) return 0;
            for (; k <= x; k++) {
              sumarr.push(jStat2.poisson.pdf(k, l));
            }
            return jStat2.sum(sumarr);
          },
          mean: function(l) {
            return l;
          },
          variance: function(l) {
            return l;
          },
          sampleSmall: function sampleSmall(l) {
            var p = 1, k = 0, L = Math2.exp(-l);
            do {
              k++;
              p *= jStat2._random_fn();
            } while (p > L);
            return k - 1;
          },
          sampleLarge: function sampleLarge(l) {
            var lam = l;
            var k;
            var U, V, slam, loglam, a, b, invalpha, vr, us;
            slam = Math2.sqrt(lam);
            loglam = Math2.log(lam);
            b = 0.931 + 2.53 * slam;
            a = -0.059 + 0.02483 * b;
            invalpha = 1.1239 + 1.1328 / (b - 3.4);
            vr = 0.9277 - 3.6224 / (b - 2);
            while (1) {
              U = Math2.random() - 0.5;
              V = Math2.random();
              us = 0.5 - Math2.abs(U);
              k = Math2.floor((2 * a / us + b) * U + lam + 0.43);
              if (us >= 0.07 && V <= vr) {
                return k;
              }
              if (k < 0 || us < 0.013 && V > us) {
                continue;
              }
              if (Math2.log(V) + Math2.log(invalpha) - Math2.log(a / (us * us) + b) <= -lam + k * loglam - jStat2.loggam(k + 1)) {
                return k;
              }
            }
          },
          sample: function sample(l) {
            if (l < 10)
              return this.sampleSmall(l);
            else
              return this.sampleLarge(l);
          }
        });
        jStat2.extend(jStat2.triangular, {
          pdf: function pdf(x, a, b, c) {
            if (b <= a || c < a || c > b) {
              return NaN;
            } else {
              if (x < a || x > b) {
                return 0;
              } else if (x < c) {
                return 2 * (x - a) / ((b - a) * (c - a));
              } else if (x === c) {
                return 2 / (b - a);
              } else {
                return 2 * (b - x) / ((b - a) * (b - c));
              }
            }
          },
          cdf: function cdf(x, a, b, c) {
            if (b <= a || c < a || c > b)
              return NaN;
            if (x <= a)
              return 0;
            else if (x >= b)
              return 1;
            if (x <= c)
              return Math2.pow(x - a, 2) / ((b - a) * (c - a));
            else
              return 1 - Math2.pow(b - x, 2) / ((b - a) * (b - c));
          },
          inv: function inv(p, a, b, c) {
            if (b <= a || c < a || c > b) {
              return NaN;
            } else {
              if (p <= (c - a) / (b - a)) {
                return a + (b - a) * Math2.sqrt(p * ((c - a) / (b - a)));
              } else {
                return a + (b - a) * (1 - Math2.sqrt((1 - p) * (1 - (c - a) / (b - a))));
              }
            }
          },
          mean: function mean(a, b, c) {
            return (a + b + c) / 3;
          },
          median: function median(a, b, c) {
            if (c <= (a + b) / 2) {
              return b - Math2.sqrt((b - a) * (b - c)) / Math2.sqrt(2);
            } else if (c > (a + b) / 2) {
              return a + Math2.sqrt((b - a) * (c - a)) / Math2.sqrt(2);
            }
          },
          mode: function mode(a, b, c) {
            return c;
          },
          sample: function sample(a, b, c) {
            var u = jStat2._random_fn();
            if (u < (c - a) / (b - a))
              return a + Math2.sqrt(u * (b - a) * (c - a));
            return b - Math2.sqrt((1 - u) * (b - a) * (b - c));
          },
          variance: function variance(a, b, c) {
            return (a * a + b * b + c * c - a * b - a * c - b * c) / 18;
          }
        });
        jStat2.extend(jStat2.arcsine, {
          pdf: function pdf(x, a, b) {
            if (b <= a) return NaN;
            return x <= a || x >= b ? 0 : 2 / Math2.PI * Math2.pow(Math2.pow(b - a, 2) - Math2.pow(2 * x - a - b, 2), -0.5);
          },
          cdf: function cdf(x, a, b) {
            if (x < a)
              return 0;
            else if (x < b)
              return 2 / Math2.PI * Math2.asin(Math2.sqrt((x - a) / (b - a)));
            return 1;
          },
          inv: function(p, a, b) {
            return a + (0.5 - 0.5 * Math2.cos(Math2.PI * p)) * (b - a);
          },
          mean: function mean(a, b) {
            if (b <= a) return NaN;
            return (a + b) / 2;
          },
          median: function median(a, b) {
            if (b <= a) return NaN;
            return (a + b) / 2;
          },
          mode: function mode() {
            throw new Error("mode is not yet implemented");
          },
          sample: function sample(a, b) {
            return (a + b) / 2 + (b - a) / 2 * Math2.sin(2 * Math2.PI * jStat2.uniform.sample(0, 1));
          },
          variance: function variance(a, b) {
            if (b <= a) return NaN;
            return Math2.pow(b - a, 2) / 8;
          }
        });
        function laplaceSign(x) {
          return x / Math2.abs(x);
        }
        jStat2.extend(jStat2.laplace, {
          pdf: function pdf(x, mu, b) {
            return b <= 0 ? 0 : Math2.exp(-Math2.abs(x - mu) / b) / (2 * b);
          },
          cdf: function cdf(x, mu, b) {
            if (b <= 0) {
              return 0;
            }
            if (x < mu) {
              return 0.5 * Math2.exp((x - mu) / b);
            } else {
              return 1 - 0.5 * Math2.exp(-(x - mu) / b);
            }
          },
          mean: function(mu) {
            return mu;
          },
          median: function(mu) {
            return mu;
          },
          mode: function(mu) {
            return mu;
          },
          variance: function(mu, b) {
            return 2 * b * b;
          },
          sample: function sample(mu, b) {
            var u = jStat2._random_fn() - 0.5;
            return mu - b * laplaceSign(u) * Math2.log(1 - 2 * Math2.abs(u));
          }
        });
        function tukeyWprob(w, rr, cc) {
          var nleg = 12;
          var ihalf = 6;
          var C1 = -30;
          var C2 = -50;
          var C3 = 60;
          var bb = 8;
          var wlar = 3;
          var wincr1 = 2;
          var wincr2 = 3;
          var xleg = [
            0.9815606342467192,
            0.9041172563704749,
            0.7699026741943047,
            0.5873179542866175,
            0.3678314989981802,
            0.1252334085114689
          ];
          var aleg = [
            0.04717533638651183,
            0.10693932599531843,
            0.16007832854334622,
            0.20316742672306592,
            0.2334925365383548,
            0.24914704581340277
          ];
          var qsqz = w * 0.5;
          if (qsqz >= bb)
            return 1;
          var pr_w = 2 * jStat2.normal.cdf(qsqz, 0, 1, 1, 0) - 1;
          if (pr_w >= Math2.exp(C2 / cc))
            pr_w = Math2.pow(pr_w, cc);
          else
            pr_w = 0;
          var wincr;
          if (w > wlar)
            wincr = wincr1;
          else
            wincr = wincr2;
          var blb = qsqz;
          var binc = (bb - qsqz) / wincr;
          var bub = blb + binc;
          var einsum = 0;
          var cc1 = cc - 1;
          for (var wi = 1; wi <= wincr; wi++) {
            var elsum = 0;
            var a = 0.5 * (bub + blb);
            var b = 0.5 * (bub - blb);
            for (var jj = 1; jj <= nleg; jj++) {
              var j, xx;
              if (ihalf < jj) {
                j = nleg - jj + 1;
                xx = xleg[j - 1];
              } else {
                j = jj;
                xx = -xleg[j - 1];
              }
              var c = b * xx;
              var ac = a + c;
              var qexpo = ac * ac;
              if (qexpo > C3)
                break;
              var pplus = 2 * jStat2.normal.cdf(ac, 0, 1, 1, 0);
              var pminus = 2 * jStat2.normal.cdf(ac, w, 1, 1, 0);
              var rinsum = pplus * 0.5 - pminus * 0.5;
              if (rinsum >= Math2.exp(C1 / cc1)) {
                rinsum = aleg[j - 1] * Math2.exp(-(0.5 * qexpo)) * Math2.pow(rinsum, cc1);
                elsum += rinsum;
              }
            }
            elsum *= 2 * b * cc / Math2.sqrt(2 * Math2.PI);
            einsum += elsum;
            blb = bub;
            bub += binc;
          }
          pr_w += einsum;
          if (pr_w <= Math2.exp(C1 / rr))
            return 0;
          pr_w = Math2.pow(pr_w, rr);
          if (pr_w >= 1)
            return 1;
          return pr_w;
        }
        function tukeyQinv(p, c, v) {
          var p0 = 0.322232421088;
          var q0 = 0.099348462606;
          var p1 = -1;
          var q1 = 0.588581570495;
          var p2 = -0.342242088547;
          var q2 = 0.531103462366;
          var p3 = -0.204231210125;
          var q3 = 0.10353775285;
          var p4 = -453642210148e-16;
          var q4 = 0.0038560700634;
          var c1 = 0.8832;
          var c2 = 0.2368;
          var c3 = 1.214;
          var c4 = 1.208;
          var c5 = 1.4142;
          var vmax = 120;
          var ps = 0.5 - 0.5 * p;
          var yi = Math2.sqrt(Math2.log(1 / (ps * ps)));
          var t = yi + ((((yi * p4 + p3) * yi + p2) * yi + p1) * yi + p0) / ((((yi * q4 + q3) * yi + q2) * yi + q1) * yi + q0);
          if (v < vmax) t += (t * t * t + t) / v / 4;
          var q = c1 - c2 * t;
          if (v < vmax) q += -c3 / v + c4 * t / v;
          return t * (q * Math2.log(c - 1) + c5);
        }
        jStat2.extend(jStat2.tukey, {
          cdf: function cdf(q, nmeans, df) {
            var rr = 1;
            var cc = nmeans;
            var nlegq = 16;
            var ihalfq = 8;
            var eps1 = -30;
            var eps2 = 1e-14;
            var dhaf = 100;
            var dquar = 800;
            var deigh = 5e3;
            var dlarg = 25e3;
            var ulen1 = 1;
            var ulen2 = 0.5;
            var ulen3 = 0.25;
            var ulen4 = 0.125;
            var xlegq = [
              0.9894009349916499,
              0.9445750230732326,
              0.8656312023878318,
              0.755404408355003,
              0.6178762444026438,
              0.45801677765722737,
              0.2816035507792589,
              0.09501250983763744
            ];
            var alegq = [
              0.027152459411754096,
              0.062253523938647894,
              0.09515851168249279,
              0.12462897125553388,
              0.14959598881657674,
              0.16915651939500254,
              0.18260341504492358,
              0.1894506104550685
            ];
            if (q <= 0)
              return 0;
            if (df < 2 || rr < 1 || cc < 2) return NaN;
            if (!Number.isFinite(q))
              return 1;
            if (df > dlarg)
              return tukeyWprob(q, rr, cc);
            var f2 = df * 0.5;
            var f2lf = f2 * Math2.log(df) - df * Math2.log(2) - jStat2.gammaln(f2);
            var f21 = f2 - 1;
            var ff4 = df * 0.25;
            var ulen;
            if (df <= dhaf) ulen = ulen1;
            else if (df <= dquar) ulen = ulen2;
            else if (df <= deigh) ulen = ulen3;
            else ulen = ulen4;
            f2lf += Math2.log(ulen);
            var ans = 0;
            for (var i = 1; i <= 50; i++) {
              var otsum = 0;
              var twa1 = (2 * i - 1) * ulen;
              for (var jj = 1; jj <= nlegq; jj++) {
                var j, t1;
                if (ihalfq < jj) {
                  j = jj - ihalfq - 1;
                  t1 = f2lf + f21 * Math2.log(twa1 + xlegq[j] * ulen) - (xlegq[j] * ulen + twa1) * ff4;
                } else {
                  j = jj - 1;
                  t1 = f2lf + f21 * Math2.log(twa1 - xlegq[j] * ulen) + (xlegq[j] * ulen - twa1) * ff4;
                }
                var qsqz;
                if (t1 >= eps1) {
                  if (ihalfq < jj) {
                    qsqz = q * Math2.sqrt((xlegq[j] * ulen + twa1) * 0.5);
                  } else {
                    qsqz = q * Math2.sqrt((-(xlegq[j] * ulen) + twa1) * 0.5);
                  }
                  var wprb = tukeyWprob(qsqz, rr, cc);
                  var rotsum = wprb * alegq[j] * Math2.exp(t1);
                  otsum += rotsum;
                }
              }
              if (i * ulen >= 1 && otsum <= eps2)
                break;
              ans += otsum;
            }
            if (otsum > eps2) {
              throw new Error("tukey.cdf failed to converge");
            }
            if (ans > 1)
              ans = 1;
            return ans;
          },
          inv: function(p, nmeans, df) {
            var rr = 1;
            var cc = nmeans;
            var eps = 1e-4;
            var maxiter = 50;
            if (df < 2 || rr < 1 || cc < 2) return NaN;
            if (p < 0 || p > 1) return NaN;
            if (p === 0) return 0;
            if (p === 1) return Infinity;
            var x0 = tukeyQinv(p, cc, df);
            var valx0 = jStat2.tukey.cdf(x0, nmeans, df) - p;
            var x1;
            if (valx0 > 0)
              x1 = Math2.max(0, x0 - 1);
            else
              x1 = x0 + 1;
            var valx1 = jStat2.tukey.cdf(x1, nmeans, df) - p;
            var ans;
            for (var iter = 1; iter < maxiter; iter++) {
              ans = x1 - valx1 * (x1 - x0) / (valx1 - valx0);
              valx0 = valx1;
              x0 = x1;
              if (ans < 0) {
                ans = 0;
                valx1 = -p;
              }
              valx1 = jStat2.tukey.cdf(ans, nmeans, df) - p;
              x1 = ans;
              var xabs = Math2.abs(x1 - x0);
              if (xabs < eps)
                return ans;
            }
            throw new Error("tukey.inv failed to converge");
          }
        });
      })(jStat, Math);
      (function(jStat2, Math2) {
        var push = Array.prototype.push;
        var isArray2 = jStat2.utils.isArray;
        function isUsable(arg) {
          return isArray2(arg) || arg instanceof jStat2;
        }
        jStat2.extend({
          // add a vector/matrix to a vector/matrix or scalar
          add: function add(arr, arg) {
            if (isUsable(arg)) {
              if (!isUsable(arg[0])) arg = [arg];
              return jStat2.map(arr, function(value, row, col) {
                return value + arg[row][col];
              });
            }
            return jStat2.map(arr, function(value) {
              return value + arg;
            });
          },
          // subtract a vector or scalar from the vector
          subtract: function subtract(arr, arg) {
            if (isUsable(arg)) {
              if (!isUsable(arg[0])) arg = [arg];
              return jStat2.map(arr, function(value, row, col) {
                return value - arg[row][col] || 0;
              });
            }
            return jStat2.map(arr, function(value) {
              return value - arg;
            });
          },
          // matrix division
          divide: function divide(arr, arg) {
            if (isUsable(arg)) {
              if (!isUsable(arg[0])) arg = [arg];
              return jStat2.multiply(arr, jStat2.inv(arg));
            }
            return jStat2.map(arr, function(value) {
              return value / arg;
            });
          },
          // matrix multiplication
          multiply: function multiply(arr, arg) {
            var row, col, nrescols, sum, nrow, ncol, res, rescols;
            if (arr.length === void 0 && arg.length === void 0) {
              return arr * arg;
            }
            nrow = arr.length, ncol = arr[0].length, res = jStat2.zeros(nrow, nrescols = isUsable(arg) ? arg[0].length : ncol), rescols = 0;
            if (isUsable(arg)) {
              for (; rescols < nrescols; rescols++) {
                for (row = 0; row < nrow; row++) {
                  sum = 0;
                  for (col = 0; col < ncol; col++)
                    sum += arr[row][col] * arg[col][rescols];
                  res[row][rescols] = sum;
                }
              }
              return nrow === 1 && rescols === 1 ? res[0][0] : res;
            }
            return jStat2.map(arr, function(value) {
              return value * arg;
            });
          },
          // outer([1,2,3],[4,5,6])
          // ===
          // [[1],[2],[3]] times [[4,5,6]]
          // ->
          // [[4,5,6],[8,10,12],[12,15,18]]
          outer: function outer(A, B) {
            return jStat2.multiply(A.map(function(t) {
              return [t];
            }), [B]);
          },
          // Returns the dot product of two matricies
          dot: function dot(arr, arg) {
            if (!isUsable(arr[0])) arr = [arr];
            if (!isUsable(arg[0])) arg = [arg];
            var left = arr[0].length === 1 && arr.length !== 1 ? jStat2.transpose(arr) : arr, right = arg[0].length === 1 && arg.length !== 1 ? jStat2.transpose(arg) : arg, res = [], row = 0, nrow = left.length, ncol = left[0].length, sum, col;
            for (; row < nrow; row++) {
              res[row] = [];
              sum = 0;
              for (col = 0; col < ncol; col++)
                sum += left[row][col] * right[row][col];
              res[row] = sum;
            }
            return res.length === 1 ? res[0] : res;
          },
          // raise every element by a scalar
          pow: function pow(arr, arg) {
            return jStat2.map(arr, function(value) {
              return Math2.pow(value, arg);
            });
          },
          // exponentiate every element
          exp: function exp(arr) {
            return jStat2.map(arr, function(value) {
              return Math2.exp(value);
            });
          },
          // generate the natural log of every element
          log: function exp(arr) {
            return jStat2.map(arr, function(value) {
              return Math2.log(value);
            });
          },
          // generate the absolute values of the vector
          abs: function abs(arr) {
            return jStat2.map(arr, function(value) {
              return Math2.abs(value);
            });
          },
          // computes the p-norm of the vector
          // In the case that a matrix is passed, uses the first row as the vector
          norm: function norm(arr, p) {
            var nnorm = 0, i = 0;
            if (isNaN(p)) p = 2;
            if (isUsable(arr[0])) arr = arr[0];
            for (; i < arr.length; i++) {
              nnorm += Math2.pow(Math2.abs(arr[i]), p);
            }
            return Math2.pow(nnorm, 1 / p);
          },
          // computes the angle between two vectors in rads
          // In case a matrix is passed, this uses the first row as the vector
          angle: function angle(arr, arg) {
            return Math2.acos(jStat2.dot(arr, arg) / (jStat2.norm(arr) * jStat2.norm(arg)));
          },
          // augment one matrix by another
          // Note: this function returns a matrix, not a jStat object
          aug: function aug(a, b) {
            var newarr = [];
            var i;
            for (i = 0; i < a.length; i++) {
              newarr.push(a[i].slice());
            }
            for (i = 0; i < newarr.length; i++) {
              push.apply(newarr[i], b[i]);
            }
            return newarr;
          },
          // The inv() function calculates the inverse of a matrix
          // Create the inverse by augmenting the matrix by the identity matrix of the
          // appropriate size, and then use G-J elimination on the augmented matrix.
          inv: function inv(a) {
            var rows = a.length;
            var cols = a[0].length;
            var b = jStat2.identity(rows, cols);
            var c = jStat2.gauss_jordan(a, b);
            var result = [];
            var i = 0;
            var j;
            for (; i < rows; i++) {
              result[i] = [];
              for (j = cols; j < c[0].length; j++)
                result[i][j - cols] = c[i][j];
            }
            return result;
          },
          // calculate the determinant of a matrix
          det: function det(a) {
            if (a.length === 2) {
              return a[0][0] * a[1][1] - a[0][1] * a[1][0];
            }
            var determinant = 0;
            for (var i = 0; i < a.length; i++) {
              var submatrix = [];
              for (var row = 1; row < a.length; row++) {
                submatrix[row - 1] = [];
                for (var col = 0; col < a.length; col++) {
                  if (col < i) {
                    submatrix[row - 1][col] = a[row][col];
                  } else if (col > i) {
                    submatrix[row - 1][col - 1] = a[row][col];
                  }
                }
              }
              var sign = i % 2 ? -1 : 1;
              determinant += det(submatrix) * a[0][i] * sign;
            }
            return determinant;
          },
          gauss_elimination: function gauss_elimination(a, b) {
            var i = 0, j = 0, n = a.length, m = a[0].length, factor = 1, sum = 0, x = [], maug, pivot, temp, k;
            a = jStat2.aug(a, b);
            maug = a[0].length;
            for (i = 0; i < n; i++) {
              pivot = a[i][i];
              j = i;
              for (k = i + 1; k < m; k++) {
                if (pivot < Math2.abs(a[k][i])) {
                  pivot = a[k][i];
                  j = k;
                }
              }
              if (j != i) {
                for (k = 0; k < maug; k++) {
                  temp = a[i][k];
                  a[i][k] = a[j][k];
                  a[j][k] = temp;
                }
              }
              for (j = i + 1; j < n; j++) {
                factor = a[j][i] / a[i][i];
                for (k = i; k < maug; k++) {
                  a[j][k] = a[j][k] - factor * a[i][k];
                }
              }
            }
            for (i = n - 1; i >= 0; i--) {
              sum = 0;
              for (j = i + 1; j <= n - 1; j++) {
                sum = sum + x[j] * a[i][j];
              }
              x[i] = (a[i][maug - 1] - sum) / a[i][i];
            }
            return x;
          },
          gauss_jordan: function gauss_jordan(a, b) {
            var m = jStat2.aug(a, b);
            var h = m.length;
            var w = m[0].length;
            var c = 0;
            var x, y, y2;
            for (y = 0; y < h; y++) {
              var maxrow = y;
              for (y2 = y + 1; y2 < h; y2++) {
                if (Math2.abs(m[y2][y]) > Math2.abs(m[maxrow][y]))
                  maxrow = y2;
              }
              var tmp = m[y];
              m[y] = m[maxrow];
              m[maxrow] = tmp;
              for (y2 = y + 1; y2 < h; y2++) {
                c = m[y2][y] / m[y][y];
                for (x = y; x < w; x++) {
                  m[y2][x] -= m[y][x] * c;
                }
              }
            }
            for (y = h - 1; y >= 0; y--) {
              c = m[y][y];
              for (y2 = 0; y2 < y; y2++) {
                for (x = w - 1; x > y - 1; x--) {
                  m[y2][x] -= m[y][x] * m[y2][y] / c;
                }
              }
              m[y][y] /= c;
              for (x = h; x < w; x++) {
                m[y][x] /= c;
              }
            }
            return m;
          },
          // solve equation
          // Ax=b
          // A is upper triangular matrix
          // A=[[1,2,3],[0,4,5],[0,6,7]]
          // b=[1,2,3]
          // triaUpSolve(A,b) // -> [2.666,0.1666,1.666]
          // if you use matrix style
          // A=[[1,2,3],[0,4,5],[0,6,7]]
          // b=[[1],[2],[3]]
          // will return [[2.666],[0.1666],[1.666]]
          triaUpSolve: function triaUpSolve(A, b) {
            var size = A[0].length;
            var x = jStat2.zeros(1, size)[0];
            var parts;
            var matrix_mode = false;
            if (b[0].length != void 0) {
              b = b.map(function(i) {
                return i[0];
              });
              matrix_mode = true;
            }
            jStat2.arange(size - 1, -1, -1).forEach(function(i) {
              parts = jStat2.arange(i + 1, size).map(function(j) {
                return x[j] * A[i][j];
              });
              x[i] = (b[i] - jStat2.sum(parts)) / A[i][i];
            });
            if (matrix_mode)
              return x.map(function(i) {
                return [i];
              });
            return x;
          },
          triaLowSolve: function triaLowSolve(A, b) {
            var size = A[0].length;
            var x = jStat2.zeros(1, size)[0];
            var parts;
            var matrix_mode = false;
            if (b[0].length != void 0) {
              b = b.map(function(i) {
                return i[0];
              });
              matrix_mode = true;
            }
            jStat2.arange(size).forEach(function(i) {
              parts = jStat2.arange(i).map(function(j) {
                return A[i][j] * x[j];
              });
              x[i] = (b[i] - jStat2.sum(parts)) / A[i][i];
            });
            if (matrix_mode)
              return x.map(function(i) {
                return [i];
              });
            return x;
          },
          // A -> [L,U]
          // A=LU
          // L is lower triangular matrix
          // U is upper triangular matrix
          lu: function lu(A) {
            var size = A.length;
            var L = jStat2.identity(size);
            var R = jStat2.zeros(A.length, A[0].length);
            var parts;
            jStat2.arange(size).forEach(function(t) {
              R[0][t] = A[0][t];
            });
            jStat2.arange(1, size).forEach(function(l) {
              jStat2.arange(l).forEach(function(i) {
                parts = jStat2.arange(i).map(function(jj) {
                  return L[l][jj] * R[jj][i];
                });
                L[l][i] = (A[l][i] - jStat2.sum(parts)) / R[i][i];
              });
              jStat2.arange(l, size).forEach(function(j) {
                parts = jStat2.arange(l).map(function(jj) {
                  return L[l][jj] * R[jj][j];
                });
                R[l][j] = A[parts.length][j] - jStat2.sum(parts);
              });
            });
            return [L, R];
          },
          // A -> T
          // A=TT'
          // T is lower triangular matrix
          cholesky: function cholesky(A) {
            var size = A.length;
            var T = jStat2.zeros(A.length, A[0].length);
            var parts;
            jStat2.arange(size).forEach(function(i) {
              parts = jStat2.arange(i).map(function(t) {
                return Math2.pow(T[i][t], 2);
              });
              T[i][i] = Math2.sqrt(A[i][i] - jStat2.sum(parts));
              jStat2.arange(i + 1, size).forEach(function(j) {
                parts = jStat2.arange(i).map(function(t) {
                  return T[i][t] * T[j][t];
                });
                T[j][i] = (A[i][j] - jStat2.sum(parts)) / T[i][i];
              });
            });
            return T;
          },
          gauss_jacobi: function gauss_jacobi(a, b, x, r) {
            var i = 0;
            var j = 0;
            var n = a.length;
            var l = [];
            var u = [];
            var d = [];
            var xv, c, h, xk;
            for (; i < n; i++) {
              l[i] = [];
              u[i] = [];
              d[i] = [];
              for (j = 0; j < n; j++) {
                if (i > j) {
                  l[i][j] = a[i][j];
                  u[i][j] = d[i][j] = 0;
                } else if (i < j) {
                  u[i][j] = a[i][j];
                  l[i][j] = d[i][j] = 0;
                } else {
                  d[i][j] = a[i][j];
                  l[i][j] = u[i][j] = 0;
                }
              }
            }
            h = jStat2.multiply(jStat2.multiply(jStat2.inv(d), jStat2.add(l, u)), -1);
            c = jStat2.multiply(jStat2.inv(d), b);
            xv = x;
            xk = jStat2.add(jStat2.multiply(h, x), c);
            i = 2;
            while (Math2.abs(jStat2.norm(jStat2.subtract(xk, xv))) > r) {
              xv = xk;
              xk = jStat2.add(jStat2.multiply(h, xv), c);
              i++;
            }
            return xk;
          },
          gauss_seidel: function gauss_seidel(a, b, x, r) {
            var i = 0;
            var n = a.length;
            var l = [];
            var u = [];
            var d = [];
            var j, xv, c, h, xk;
            for (; i < n; i++) {
              l[i] = [];
              u[i] = [];
              d[i] = [];
              for (j = 0; j < n; j++) {
                if (i > j) {
                  l[i][j] = a[i][j];
                  u[i][j] = d[i][j] = 0;
                } else if (i < j) {
                  u[i][j] = a[i][j];
                  l[i][j] = d[i][j] = 0;
                } else {
                  d[i][j] = a[i][j];
                  l[i][j] = u[i][j] = 0;
                }
              }
            }
            h = jStat2.multiply(jStat2.multiply(jStat2.inv(jStat2.add(d, l)), u), -1);
            c = jStat2.multiply(jStat2.inv(jStat2.add(d, l)), b);
            xv = x;
            xk = jStat2.add(jStat2.multiply(h, x), c);
            i = 2;
            while (Math2.abs(jStat2.norm(jStat2.subtract(xk, xv))) > r) {
              xv = xk;
              xk = jStat2.add(jStat2.multiply(h, xv), c);
              i = i + 1;
            }
            return xk;
          },
          SOR: function SOR(a, b, x, r, w) {
            var i = 0;
            var n = a.length;
            var l = [];
            var u = [];
            var d = [];
            var j, xv, c, h, xk;
            for (; i < n; i++) {
              l[i] = [];
              u[i] = [];
              d[i] = [];
              for (j = 0; j < n; j++) {
                if (i > j) {
                  l[i][j] = a[i][j];
                  u[i][j] = d[i][j] = 0;
                } else if (i < j) {
                  u[i][j] = a[i][j];
                  l[i][j] = d[i][j] = 0;
                } else {
                  d[i][j] = a[i][j];
                  l[i][j] = u[i][j] = 0;
                }
              }
            }
            h = jStat2.multiply(
              jStat2.inv(jStat2.add(d, jStat2.multiply(l, w))),
              jStat2.subtract(
                jStat2.multiply(d, 1 - w),
                jStat2.multiply(u, w)
              )
            );
            c = jStat2.multiply(jStat2.multiply(jStat2.inv(jStat2.add(
              d,
              jStat2.multiply(l, w)
            )), b), w);
            xv = x;
            xk = jStat2.add(jStat2.multiply(h, x), c);
            i = 2;
            while (Math2.abs(jStat2.norm(jStat2.subtract(xk, xv))) > r) {
              xv = xk;
              xk = jStat2.add(jStat2.multiply(h, xv), c);
              i++;
            }
            return xk;
          },
          householder: function householder(a) {
            var m = a.length;
            var n = a[0].length;
            var i = 0;
            var w = [];
            var p = [];
            var alpha, r, k, j, factor;
            for (; i < m - 1; i++) {
              alpha = 0;
              for (j = i + 1; j < n; j++)
                alpha += a[j][i] * a[j][i];
              factor = a[i + 1][i] > 0 ? -1 : 1;
              alpha = factor * Math2.sqrt(alpha);
              r = Math2.sqrt((alpha * alpha - a[i + 1][i] * alpha) / 2);
              w = jStat2.zeros(m, 1);
              w[i + 1][0] = (a[i + 1][i] - alpha) / (2 * r);
              for (k = i + 2; k < m; k++) w[k][0] = a[k][i] / (2 * r);
              p = jStat2.subtract(
                jStat2.identity(m, n),
                jStat2.multiply(jStat2.multiply(w, jStat2.transpose(w)), 2)
              );
              a = jStat2.multiply(p, jStat2.multiply(a, p));
            }
            return a;
          },
          // A -> [Q,R]
          // Q is orthogonal matrix
          // R is upper triangular
          QR: function() {
            var sum = jStat2.sum;
            var range = jStat2.arange;
            function qr2(x) {
              var n = x.length;
              var p = x[0].length;
              var r = jStat2.zeros(p, p);
              x = jStat2.copy(x);
              var i, j, k;
              for (j = 0; j < p; j++) {
                r[j][j] = Math2.sqrt(sum(range(n).map(function(i2) {
                  return x[i2][j] * x[i2][j];
                })));
                for (i = 0; i < n; i++) {
                  x[i][j] = x[i][j] / r[j][j];
                }
                for (k = j + 1; k < p; k++) {
                  r[j][k] = sum(range(n).map(function(i2) {
                    return x[i2][j] * x[i2][k];
                  }));
                  for (i = 0; i < n; i++) {
                    x[i][k] = x[i][k] - x[i][j] * r[j][k];
                  }
                }
              }
              return [x, r];
            }
            return qr2;
          }(),
          lstsq: /* @__PURE__ */ function() {
            function R_I(A) {
              A = jStat2.copy(A);
              var size = A.length;
              var I = jStat2.identity(size);
              jStat2.arange(size - 1, -1, -1).forEach(function(i) {
                jStat2.sliceAssign(
                  I,
                  { row: i },
                  jStat2.divide(jStat2.slice(I, { row: i }), A[i][i])
                );
                jStat2.sliceAssign(
                  A,
                  { row: i },
                  jStat2.divide(jStat2.slice(A, { row: i }), A[i][i])
                );
                jStat2.arange(i).forEach(function(j) {
                  var c = jStat2.multiply(A[j][i], -1);
                  var Aj = jStat2.slice(A, { row: j });
                  var cAi = jStat2.multiply(jStat2.slice(A, { row: i }), c);
                  jStat2.sliceAssign(A, { row: j }, jStat2.add(Aj, cAi));
                  var Ij = jStat2.slice(I, { row: j });
                  var cIi = jStat2.multiply(jStat2.slice(I, { row: i }), c);
                  jStat2.sliceAssign(I, { row: j }, jStat2.add(Ij, cIi));
                });
              });
              return I;
            }
            function qr_solve(A, b) {
              var array_mode = false;
              if (b[0].length === void 0) {
                b = b.map(function(x2) {
                  return [x2];
                });
                array_mode = true;
              }
              var QR = jStat2.QR(A);
              var Q = QR[0];
              var R = QR[1];
              var attrs = A[0].length;
              var Q1 = jStat2.slice(Q, { col: { end: attrs } });
              var R1 = jStat2.slice(R, { row: { end: attrs } });
              var RI = R_I(R1);
              var Q2 = jStat2.transpose(Q1);
              if (Q2[0].length === void 0) {
                Q2 = [Q2];
              }
              var x = jStat2.multiply(jStat2.multiply(RI, Q2), b);
              if (x.length === void 0) {
                x = [[x]];
              }
              if (array_mode)
                return x.map(function(i) {
                  return i[0];
                });
              return x;
            }
            return qr_solve;
          }(),
          jacobi: function jacobi(a) {
            var condition = 1;
            var n = a.length;
            var e = jStat2.identity(n, n);
            var ev = [];
            var b, i, j, p, q, maxim, theta, s;
            while (condition === 1) {
              maxim = a[0][1];
              p = 0;
              q = 1;
              for (i = 0; i < n; i++) {
                for (j = 0; j < n; j++) {
                  if (i != j) {
                    if (maxim < Math2.abs(a[i][j])) {
                      maxim = Math2.abs(a[i][j]);
                      p = i;
                      q = j;
                    }
                  }
                }
              }
              if (a[p][p] === a[q][q])
                theta = a[p][q] > 0 ? Math2.PI / 4 : -Math2.PI / 4;
              else
                theta = Math2.atan(2 * a[p][q] / (a[p][p] - a[q][q])) / 2;
              s = jStat2.identity(n, n);
              s[p][p] = Math2.cos(theta);
              s[p][q] = -Math2.sin(theta);
              s[q][p] = Math2.sin(theta);
              s[q][q] = Math2.cos(theta);
              e = jStat2.multiply(e, s);
              b = jStat2.multiply(jStat2.multiply(jStat2.inv(s), a), s);
              a = b;
              condition = 0;
              for (i = 1; i < n; i++) {
                for (j = 1; j < n; j++) {
                  if (i != j && Math2.abs(a[i][j]) > 1e-3) {
                    condition = 1;
                  }
                }
              }
            }
            for (i = 0; i < n; i++) ev.push(a[i][i]);
            return [e, ev];
          },
          rungekutta: function rungekutta(f, h, p, t_j, u_j, order) {
            var k1, k2, u_j1, k3, k4;
            if (order === 2) {
              while (t_j <= p) {
                k1 = h * f(t_j, u_j);
                k2 = h * f(t_j + h, u_j + k1);
                u_j1 = u_j + (k1 + k2) / 2;
                u_j = u_j1;
                t_j = t_j + h;
              }
            }
            if (order === 4) {
              while (t_j <= p) {
                k1 = h * f(t_j, u_j);
                k2 = h * f(t_j + h / 2, u_j + k1 / 2);
                k3 = h * f(t_j + h / 2, u_j + k2 / 2);
                k4 = h * f(t_j + h, u_j + k3);
                u_j1 = u_j + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
                u_j = u_j1;
                t_j = t_j + h;
              }
            }
            return u_j;
          },
          romberg: function romberg(f, a, b, order) {
            var i = 0;
            var h = (b - a) / 2;
            var x = [];
            var h1 = [];
            var g = [];
            var m, a1, j, k, I;
            while (i < order / 2) {
              I = f(a);
              for (j = a, k = 0; j <= b; j = j + h, k++) x[k] = j;
              m = x.length;
              for (j = 1; j < m - 1; j++) {
                I += (j % 2 !== 0 ? 4 : 2) * f(x[j]);
              }
              I = h / 3 * (I + f(b));
              g[i] = I;
              h /= 2;
              i++;
            }
            a1 = g.length;
            m = 1;
            while (a1 !== 1) {
              for (j = 0; j < a1 - 1; j++)
                h1[j] = (Math2.pow(4, m) * g[j + 1] - g[j]) / (Math2.pow(4, m) - 1);
              a1 = h1.length;
              g = h1;
              h1 = [];
              m++;
            }
            return g;
          },
          richardson: function richardson(X, f, x, h) {
            function pos(X2, x2) {
              var i2 = 0;
              var n = X2.length;
              var p;
              for (; i2 < n; i2++)
                if (X2[i2] === x2) p = i2;
              return p;
            }
            var h_min = Math2.abs(x - X[pos(X, x) + 1]);
            var i = 0;
            var g = [];
            var h1 = [];
            var y1, y2, m, a, j;
            while (h >= h_min) {
              y1 = pos(X, x + h);
              y2 = pos(X, x);
              g[i] = (f[y1] - 2 * f[y2] + f[2 * y2 - y1]) / (h * h);
              h /= 2;
              i++;
            }
            a = g.length;
            m = 1;
            while (a != 1) {
              for (j = 0; j < a - 1; j++)
                h1[j] = (Math2.pow(4, m) * g[j + 1] - g[j]) / (Math2.pow(4, m) - 1);
              a = h1.length;
              g = h1;
              h1 = [];
              m++;
            }
            return g;
          },
          simpson: function simpson(f, a, b, n) {
            var h = (b - a) / n;
            var I = f(a);
            var x = [];
            var j = a;
            var k = 0;
            var i = 1;
            var m;
            for (; j <= b; j = j + h, k++)
              x[k] = j;
            m = x.length;
            for (; i < m - 1; i++) {
              I += (i % 2 !== 0 ? 4 : 2) * f(x[i]);
            }
            return h / 3 * (I + f(b));
          },
          hermite: function hermite(X, F, dF, value) {
            var n = X.length;
            var p = 0;
            var i = 0;
            var l = [];
            var dl = [];
            var A = [];
            var B = [];
            var j;
            for (; i < n; i++) {
              l[i] = 1;
              for (j = 0; j < n; j++) {
                if (i != j) l[i] *= (value - X[j]) / (X[i] - X[j]);
              }
              dl[i] = 0;
              for (j = 0; j < n; j++) {
                if (i != j) dl[i] += 1 / (X[i] - X[j]);
              }
              A[i] = (1 - 2 * (value - X[i]) * dl[i]) * (l[i] * l[i]);
              B[i] = (value - X[i]) * (l[i] * l[i]);
              p += A[i] * F[i] + B[i] * dF[i];
            }
            return p;
          },
          lagrange: function lagrange(X, F, value) {
            var p = 0;
            var i = 0;
            var j, l;
            var n = X.length;
            for (; i < n; i++) {
              l = F[i];
              for (j = 0; j < n; j++) {
                if (i != j) l *= (value - X[j]) / (X[i] - X[j]);
              }
              p += l;
            }
            return p;
          },
          cubic_spline: function cubic_spline(X, F, value) {
            var n = X.length;
            var i = 0, j;
            var A = [];
            var B = [];
            var alpha = [];
            var c = [];
            var h = [];
            var b = [];
            var d = [];
            for (; i < n - 1; i++)
              h[i] = X[i + 1] - X[i];
            alpha[0] = 0;
            for (i = 1; i < n - 1; i++) {
              alpha[i] = 3 / h[i] * (F[i + 1] - F[i]) - 3 / h[i - 1] * (F[i] - F[i - 1]);
            }
            for (i = 1; i < n - 1; i++) {
              A[i] = [];
              B[i] = [];
              A[i][i - 1] = h[i - 1];
              A[i][i] = 2 * (h[i - 1] + h[i]);
              A[i][i + 1] = h[i];
              B[i][0] = alpha[i];
            }
            c = jStat2.multiply(jStat2.inv(A), B);
            for (j = 0; j < n - 1; j++) {
              b[j] = (F[j + 1] - F[j]) / h[j] - h[j] * (c[j + 1][0] + 2 * c[j][0]) / 3;
              d[j] = (c[j + 1][0] - c[j][0]) / (3 * h[j]);
            }
            for (j = 0; j < n; j++) {
              if (X[j] > value) break;
            }
            j -= 1;
            return F[j] + (value - X[j]) * b[j] + jStat2.sq(value - X[j]) * c[j] + (value - X[j]) * jStat2.sq(value - X[j]) * d[j];
          },
          gauss_quadrature: function gauss_quadrature() {
            throw new Error("gauss_quadrature not yet implemented");
          },
          PCA: function PCA(X) {
            var m = X.length;
            var n = X[0].length;
            var i = 0;
            var j, temp1;
            var u = [];
            var D = [];
            var result = [];
            var temp2 = [];
            var Y = [];
            var Bt = [];
            var B = [];
            var C = [];
            var V = [];
            var Vt = [];
            for (i = 0; i < m; i++) {
              u[i] = jStat2.sum(X[i]) / n;
            }
            for (i = 0; i < n; i++) {
              B[i] = [];
              for (j = 0; j < m; j++) {
                B[i][j] = X[j][i] - u[j];
              }
            }
            B = jStat2.transpose(B);
            for (i = 0; i < m; i++) {
              C[i] = [];
              for (j = 0; j < m; j++) {
                C[i][j] = jStat2.dot([B[i]], [B[j]]) / (n - 1);
              }
            }
            result = jStat2.jacobi(C);
            V = result[0];
            D = result[1];
            Vt = jStat2.transpose(V);
            for (i = 0; i < D.length; i++) {
              for (j = i; j < D.length; j++) {
                if (D[i] < D[j]) {
                  temp1 = D[i];
                  D[i] = D[j];
                  D[j] = temp1;
                  temp2 = Vt[i];
                  Vt[i] = Vt[j];
                  Vt[j] = temp2;
                }
              }
            }
            Bt = jStat2.transpose(B);
            for (i = 0; i < m; i++) {
              Y[i] = [];
              for (j = 0; j < Bt.length; j++) {
                Y[i][j] = jStat2.dot([Vt[i]], [Bt[j]]);
              }
            }
            return [X, D, Vt, Y];
          }
        });
        (function(funcs) {
          for (var i = 0; i < funcs.length; i++) (function(passfunc) {
            jStat2.fn[passfunc] = function(arg, func) {
              var tmpthis = this;
              if (func) {
                setTimeout(function() {
                  func.call(tmpthis, jStat2.fn[passfunc].call(tmpthis, arg));
                }, 15);
                return this;
              }
              if (typeof jStat2[passfunc](this, arg) === "number")
                return jStat2[passfunc](this, arg);
              else
                return jStat2(jStat2[passfunc](this, arg));
            };
          })(funcs[i]);
        })("add divide multiply subtract dot pow exp log abs norm angle".split(" "));
      })(jStat, Math);
      (function(jStat2, Math2) {
        var slice = [].slice;
        var isNumber = jStat2.utils.isNumber;
        var isArray2 = jStat2.utils.isArray;
        jStat2.extend({
          // 2 different parameter lists:
          // (value, mean, sd)
          // (value, array, flag)
          zscore: function zscore() {
            var args = slice.call(arguments);
            if (isNumber(args[1])) {
              return (args[0] - args[1]) / args[2];
            }
            return (args[0] - jStat2.mean(args[1])) / jStat2.stdev(args[1], args[2]);
          },
          // 3 different paramter lists:
          // (value, mean, sd, sides)
          // (zscore, sides)
          // (value, array, sides, flag)
          ztest: function ztest() {
            var args = slice.call(arguments);
            var z;
            if (isArray2(args[1])) {
              z = jStat2.zscore(args[0], args[1], args[3]);
              return args[2] === 1 ? jStat2.normal.cdf(-Math2.abs(z), 0, 1) : jStat2.normal.cdf(-Math2.abs(z), 0, 1) * 2;
            } else {
              if (args.length > 2) {
                z = jStat2.zscore(args[0], args[1], args[2]);
                return args[3] === 1 ? jStat2.normal.cdf(-Math2.abs(z), 0, 1) : jStat2.normal.cdf(-Math2.abs(z), 0, 1) * 2;
              } else {
                z = args[0];
                return args[1] === 1 ? jStat2.normal.cdf(-Math2.abs(z), 0, 1) : jStat2.normal.cdf(-Math2.abs(z), 0, 1) * 2;
              }
            }
          }
        });
        jStat2.extend(jStat2.fn, {
          zscore: function zscore(value, flag) {
            return (value - this.mean()) / this.stdev(flag);
          },
          ztest: function ztest(value, sides, flag) {
            var zscore = Math2.abs(this.zscore(value, flag));
            return sides === 1 ? jStat2.normal.cdf(-zscore, 0, 1) : jStat2.normal.cdf(-zscore, 0, 1) * 2;
          }
        });
        jStat2.extend({
          // 2 parameter lists
          // (value, mean, sd, n)
          // (value, array)
          tscore: function tscore() {
            var args = slice.call(arguments);
            return args.length === 4 ? (args[0] - args[1]) / (args[2] / Math2.sqrt(args[3])) : (args[0] - jStat2.mean(args[1])) / (jStat2.stdev(args[1], true) / Math2.sqrt(args[1].length));
          },
          // 3 different paramter lists:
          // (value, mean, sd, n, sides)
          // (tscore, n, sides)
          // (value, array, sides)
          ttest: function ttest() {
            var args = slice.call(arguments);
            var tscore;
            if (args.length === 5) {
              tscore = Math2.abs(jStat2.tscore(args[0], args[1], args[2], args[3]));
              return args[4] === 1 ? jStat2.studentt.cdf(-tscore, args[3] - 1) : jStat2.studentt.cdf(-tscore, args[3] - 1) * 2;
            }
            if (isNumber(args[1])) {
              tscore = Math2.abs(args[0]);
              return args[2] == 1 ? jStat2.studentt.cdf(-tscore, args[1] - 1) : jStat2.studentt.cdf(-tscore, args[1] - 1) * 2;
            }
            tscore = Math2.abs(jStat2.tscore(args[0], args[1]));
            return args[2] == 1 ? jStat2.studentt.cdf(-tscore, args[1].length - 1) : jStat2.studentt.cdf(-tscore, args[1].length - 1) * 2;
          }
        });
        jStat2.extend(jStat2.fn, {
          tscore: function tscore(value) {
            return (value - this.mean()) / (this.stdev(true) / Math2.sqrt(this.cols()));
          },
          ttest: function ttest(value, sides) {
            return sides === 1 ? 1 - jStat2.studentt.cdf(Math2.abs(this.tscore(value)), this.cols() - 1) : jStat2.studentt.cdf(-Math2.abs(this.tscore(value)), this.cols() - 1) * 2;
          }
        });
        jStat2.extend({
          // Paramter list is as follows:
          // (array1, array2, array3, ...)
          // or it is an array of arrays
          // array of arrays conversion
          anovafscore: function anovafscore() {
            var args = slice.call(arguments), expVar, sample, sampMean, sampSampMean, tmpargs, unexpVar, i, j;
            if (args.length === 1) {
              tmpargs = new Array(args[0].length);
              for (i = 0; i < args[0].length; i++) {
                tmpargs[i] = args[0][i];
              }
              args = tmpargs;
            }
            sample = new Array();
            for (i = 0; i < args.length; i++) {
              sample = sample.concat(args[i]);
            }
            sampMean = jStat2.mean(sample);
            expVar = 0;
            for (i = 0; i < args.length; i++) {
              expVar = expVar + args[i].length * Math2.pow(jStat2.mean(args[i]) - sampMean, 2);
            }
            expVar /= args.length - 1;
            unexpVar = 0;
            for (i = 0; i < args.length; i++) {
              sampSampMean = jStat2.mean(args[i]);
              for (j = 0; j < args[i].length; j++) {
                unexpVar += Math2.pow(args[i][j] - sampSampMean, 2);
              }
            }
            unexpVar /= sample.length - args.length;
            return expVar / unexpVar;
          },
          // 2 different paramter setups
          // (array1, array2, array3, ...)
          // (anovafscore, df1, df2)
          anovaftest: function anovaftest() {
            var args = slice.call(arguments), df1, df2, n, i;
            if (isNumber(args[0])) {
              return 1 - jStat2.centralF.cdf(args[0], args[1], args[2]);
            }
            var anovafscore = jStat2.anovafscore(args);
            df1 = args.length - 1;
            n = 0;
            for (i = 0; i < args.length; i++) {
              n = n + args[i].length;
            }
            df2 = n - df1 - 1;
            return 1 - jStat2.centralF.cdf(anovafscore, df1, df2);
          },
          ftest: function ftest(fscore, df1, df2) {
            return 1 - jStat2.centralF.cdf(fscore, df1, df2);
          }
        });
        jStat2.extend(jStat2.fn, {
          anovafscore: function anovafscore() {
            return jStat2.anovafscore(this.toArray());
          },
          anovaftes: function anovaftes() {
            var n = 0;
            var i;
            for (i = 0; i < this.length; i++) {
              n = n + this[i].length;
            }
            return jStat2.ftest(this.anovafscore(), this.length - 1, n - this.length);
          }
        });
        jStat2.extend({
          // 2 parameter lists
          // (mean1, mean2, n1, n2, sd)
          // (array1, array2, sd)
          qscore: function qscore() {
            var args = slice.call(arguments);
            var mean1, mean2, n1, n2, sd;
            if (isNumber(args[0])) {
              mean1 = args[0];
              mean2 = args[1];
              n1 = args[2];
              n2 = args[3];
              sd = args[4];
            } else {
              mean1 = jStat2.mean(args[0]);
              mean2 = jStat2.mean(args[1]);
              n1 = args[0].length;
              n2 = args[1].length;
              sd = args[2];
            }
            return Math2.abs(mean1 - mean2) / (sd * Math2.sqrt((1 / n1 + 1 / n2) / 2));
          },
          // 3 different parameter lists:
          // (qscore, n, k)
          // (mean1, mean2, n1, n2, sd, n, k)
          // (array1, array2, sd, n, k)
          qtest: function qtest() {
            var args = slice.call(arguments);
            var qscore;
            if (args.length === 3) {
              qscore = args[0];
              args = args.slice(1);
            } else if (args.length === 7) {
              qscore = jStat2.qscore(args[0], args[1], args[2], args[3], args[4]);
              args = args.slice(5);
            } else {
              qscore = jStat2.qscore(args[0], args[1], args[2]);
              args = args.slice(3);
            }
            var n = args[0];
            var k = args[1];
            return 1 - jStat2.tukey.cdf(qscore, k, n - k);
          },
          tukeyhsd: function tukeyhsd(arrays) {
            var sd = jStat2.pooledstdev(arrays);
            var means = arrays.map(function(arr) {
              return jStat2.mean(arr);
            });
            var n = arrays.reduce(function(n2, arr) {
              return n2 + arr.length;
            }, 0);
            var results = [];
            for (var i = 0; i < arrays.length; ++i) {
              for (var j = i + 1; j < arrays.length; ++j) {
                var p = jStat2.qtest(means[i], means[j], arrays[i].length, arrays[j].length, sd, n, arrays.length);
                results.push([[i, j], p]);
              }
            }
            return results;
          }
        });
        jStat2.extend({
          // 2 different parameter setups
          // (value, alpha, sd, n)
          // (value, alpha, array)
          normalci: function normalci() {
            var args = slice.call(arguments), ans = new Array(2), change;
            if (args.length === 4) {
              change = Math2.abs(jStat2.normal.inv(args[1] / 2, 0, 1) * args[2] / Math2.sqrt(args[3]));
            } else {
              change = Math2.abs(jStat2.normal.inv(args[1] / 2, 0, 1) * jStat2.stdev(args[2]) / Math2.sqrt(args[2].length));
            }
            ans[0] = args[0] - change;
            ans[1] = args[0] + change;
            return ans;
          },
          // 2 different parameter setups
          // (value, alpha, sd, n)
          // (value, alpha, array)
          tci: function tci() {
            var args = slice.call(arguments), ans = new Array(2), change;
            if (args.length === 4) {
              change = Math2.abs(jStat2.studentt.inv(args[1] / 2, args[3] - 1) * args[2] / Math2.sqrt(args[3]));
            } else {
              change = Math2.abs(jStat2.studentt.inv(args[1] / 2, args[2].length - 1) * jStat2.stdev(args[2], true) / Math2.sqrt(args[2].length));
            }
            ans[0] = args[0] - change;
            ans[1] = args[0] + change;
            return ans;
          },
          significant: function significant(pvalue, alpha) {
            return pvalue < alpha;
          }
        });
        jStat2.extend(jStat2.fn, {
          normalci: function normalci(value, alpha) {
            return jStat2.normalci(value, alpha, this.toArray());
          },
          tci: function tci(value, alpha) {
            return jStat2.tci(value, alpha, this.toArray());
          }
        });
        function differenceOfProportions(p1, n1, p2, n2) {
          if (p1 > 1 || p2 > 1 || p1 <= 0 || p2 <= 0) {
            throw new Error("Proportions should be greater than 0 and less than 1");
          }
          var pooled = (p1 * n1 + p2 * n2) / (n1 + n2);
          var se = Math2.sqrt(pooled * (1 - pooled) * (1 / n1 + 1 / n2));
          return (p1 - p2) / se;
        }
        jStat2.extend(jStat2.fn, {
          oneSidedDifferenceOfProportions: function oneSidedDifferenceOfProportions(p1, n1, p2, n2) {
            var z = differenceOfProportions(p1, n1, p2, n2);
            return jStat2.ztest(z, 1);
          },
          twoSidedDifferenceOfProportions: function twoSidedDifferenceOfProportions(p1, n1, p2, n2) {
            var z = differenceOfProportions(p1, n1, p2, n2);
            return jStat2.ztest(z, 2);
          }
        });
      })(jStat, Math);
      jStat.models = /* @__PURE__ */ function() {
        function sub_regress(exog) {
          var var_count = exog[0].length;
          var modelList = jStat.arange(var_count).map(function(endog_index) {
            var exog_index = jStat.arange(var_count).filter(function(i) {
              return i !== endog_index;
            });
            return ols(
              jStat.col(exog, endog_index).map(function(x) {
                return x[0];
              }),
              jStat.col(exog, exog_index)
            );
          });
          return modelList;
        }
        function ols(endog, exog) {
          var nobs = endog.length;
          var df_model = exog[0].length - 1;
          var df_resid = nobs - df_model - 1;
          var coef = jStat.lstsq(exog, endog);
          var predict = jStat.multiply(exog, coef.map(function(x) {
            return [x];
          })).map(function(p) {
            return p[0];
          });
          var resid = jStat.subtract(endog, predict);
          var ybar = jStat.mean(endog);
          var SSE = jStat.sum(predict.map(function(f) {
            return Math.pow(f - ybar, 2);
          }));
          var SSR = jStat.sum(endog.map(function(y, i) {
            return Math.pow(y - predict[i], 2);
          }));
          var SST = SSE + SSR;
          var R2 = SSE / SST;
          return {
            exog,
            endog,
            nobs,
            df_model,
            df_resid,
            coef,
            predict,
            resid,
            ybar,
            SST,
            SSE,
            SSR,
            R2
          };
        }
        function t_test(model) {
          var subModelList = sub_regress(model.exog);
          var sigmaHat = Math.sqrt(model.SSR / model.df_resid);
          var seBetaHat = subModelList.map(function(mod) {
            var SST = mod.SST;
            var R2 = mod.R2;
            return sigmaHat / Math.sqrt(SST * (1 - R2));
          });
          var tStatistic = model.coef.map(function(coef, i) {
            return (coef - 0) / seBetaHat[i];
          });
          var pValue = tStatistic.map(function(t) {
            var leftppf = jStat.studentt.cdf(t, model.df_resid);
            return (leftppf > 0.5 ? 1 - leftppf : leftppf) * 2;
          });
          var c = jStat.studentt.inv(0.975, model.df_resid);
          var interval95 = model.coef.map(function(coef, i) {
            var d = c * seBetaHat[i];
            return [coef - d, coef + d];
          });
          return {
            se: seBetaHat,
            t: tStatistic,
            p: pValue,
            sigmaHat,
            interval95
          };
        }
        function F_test(model) {
          var F_statistic = model.R2 / model.df_model / ((1 - model.R2) / model.df_resid);
          var fcdf = function(x, n1, n2) {
            return jStat.beta.cdf(x / (n2 / n1 + x), n1 / 2, n2 / 2);
          };
          var pvalue = 1 - fcdf(F_statistic, model.df_model, model.df_resid);
          return { F_statistic, pvalue };
        }
        function ols_wrap(endog, exog) {
          var model = ols(endog, exog);
          var ttest = t_test(model);
          var ftest = F_test(model);
          var adjust_R2 = 1 - (1 - model.R2) * ((model.nobs - 1) / model.df_resid);
          model.t = ttest;
          model.f = ftest;
          model.adjust_R2 = adjust_R2;
          return model;
        }
        return { ols: ols_wrap };
      }();
      jStat.extend({
        buildxmatrix: function buildxmatrix() {
          var matrixRows = new Array(arguments.length);
          for (var i = 0; i < arguments.length; i++) {
            var array = [1];
            matrixRows[i] = array.concat(arguments[i]);
          }
          return jStat(matrixRows);
        },
        builddxmatrix: function builddxmatrix() {
          var matrixRows = new Array(arguments[0].length);
          for (var i = 0; i < arguments[0].length; i++) {
            var array = [1];
            matrixRows[i] = array.concat(arguments[0][i]);
          }
          return jStat(matrixRows);
        },
        buildjxmatrix: function buildjxmatrix(jMat) {
          var pass = new Array(jMat.length);
          for (var i = 0; i < jMat.length; i++) {
            pass[i] = jMat[i];
          }
          return jStat.builddxmatrix(pass);
        },
        buildymatrix: function buildymatrix(array) {
          return jStat(array).transpose();
        },
        buildjymatrix: function buildjymatrix(jMat) {
          return jMat.transpose();
        },
        matrixmult: function matrixmult(A, B) {
          var i, j, k, result, sum;
          if (A.cols() == B.rows()) {
            if (B.rows() > 1) {
              result = [];
              for (i = 0; i < A.rows(); i++) {
                result[i] = [];
                for (j = 0; j < B.cols(); j++) {
                  sum = 0;
                  for (k = 0; k < A.cols(); k++) {
                    sum += A.toArray()[i][k] * B.toArray()[k][j];
                  }
                  result[i][j] = sum;
                }
              }
              return jStat(result);
            }
            result = [];
            for (i = 0; i < A.rows(); i++) {
              result[i] = [];
              for (j = 0; j < B.cols(); j++) {
                sum = 0;
                for (k = 0; k < A.cols(); k++) {
                  sum += A.toArray()[i][k] * B.toArray()[j];
                }
                result[i][j] = sum;
              }
            }
            return jStat(result);
          }
        },
        //regress and regresst to be fixed
        regress: function regress(jMatX, jMatY) {
          var innerinv = jStat.xtranspxinv(jMatX);
          var xtransp = jMatX.transpose();
          var next = jStat.matrixmult(jStat(innerinv), xtransp);
          return jStat.matrixmult(next, jMatY);
        },
        regresst: function regresst(jMatX, jMatY, sides) {
          var beta = jStat.regress(jMatX, jMatY);
          var compile = {};
          compile.anova = {};
          var jMatYBar = jStat.jMatYBar(jMatX, beta);
          compile.yBar = jMatYBar;
          var yAverage = jMatY.mean();
          compile.anova.residuals = jStat.residuals(jMatY, jMatYBar);
          compile.anova.ssr = jStat.ssr(jMatYBar, yAverage);
          compile.anova.msr = compile.anova.ssr / (jMatX[0].length - 1);
          compile.anova.sse = jStat.sse(jMatY, jMatYBar);
          compile.anova.mse = compile.anova.sse / (jMatY.length - (jMatX[0].length - 1) - 1);
          compile.anova.sst = jStat.sst(jMatY, yAverage);
          compile.anova.mst = compile.anova.sst / (jMatY.length - 1);
          compile.anova.r2 = 1 - compile.anova.sse / compile.anova.sst;
          if (compile.anova.r2 < 0) compile.anova.r2 = 0;
          compile.anova.fratio = compile.anova.msr / compile.anova.mse;
          compile.anova.pvalue = jStat.anovaftest(
            compile.anova.fratio,
            jMatX[0].length - 1,
            jMatY.length - (jMatX[0].length - 1) - 1
          );
          compile.anova.rmse = Math.sqrt(compile.anova.mse);
          compile.anova.r2adj = 1 - compile.anova.mse / compile.anova.mst;
          if (compile.anova.r2adj < 0) compile.anova.r2adj = 0;
          compile.stats = new Array(jMatX[0].length);
          var covar = jStat.xtranspxinv(jMatX);
          var sds, ts, ps;
          for (var i = 0; i < beta.length; i++) {
            sds = Math.sqrt(compile.anova.mse * Math.abs(covar[i][i]));
            ts = Math.abs(beta[i] / sds);
            ps = jStat.ttest(ts, jMatY.length - jMatX[0].length - 1, sides);
            compile.stats[i] = [beta[i], sds, ts, ps];
          }
          compile.regress = beta;
          return compile;
        },
        xtranspx: function xtranspx(jMatX) {
          return jStat.matrixmult(jMatX.transpose(), jMatX);
        },
        xtranspxinv: function xtranspxinv(jMatX) {
          var inner = jStat.matrixmult(jMatX.transpose(), jMatX);
          var innerinv = jStat.inv(inner);
          return innerinv;
        },
        jMatYBar: function jMatYBar(jMatX, beta) {
          var yBar = jStat.matrixmult(jMatX, beta);
          return new jStat(yBar);
        },
        residuals: function residuals(jMatY, jMatYBar) {
          return jStat.matrixsubtract(jMatY, jMatYBar);
        },
        ssr: function ssr(jMatYBar, yAverage) {
          var ssr2 = 0;
          for (var i = 0; i < jMatYBar.length; i++) {
            ssr2 += Math.pow(jMatYBar[i] - yAverage, 2);
          }
          return ssr2;
        },
        sse: function sse(jMatY, jMatYBar) {
          var sse2 = 0;
          for (var i = 0; i < jMatY.length; i++) {
            sse2 += Math.pow(jMatY[i] - jMatYBar[i], 2);
          }
          return sse2;
        },
        sst: function sst(jMatY, yAverage) {
          var sst2 = 0;
          for (var i = 0; i < jMatY.length; i++) {
            sst2 += Math.pow(jMatY[i] - yAverage, 2);
          }
          return sst2;
        },
        matrixsubtract: function matrixsubtract(A, B) {
          var ans = new Array(A.length);
          for (var i = 0; i < A.length; i++) {
            ans[i] = new Array(A[i].length);
            for (var j = 0; j < A[i].length; j++) {
              ans[i][j] = A[i][j] - B[i][j];
            }
          }
          return jStat(ans);
        }
      });
      jStat.jStat = jStat;
      return jStat;
    });
  }
});

// node_modules/fast-formula-parser/formulas/functions/engineering.js
var require_engineering = __commonJS({
  "node_modules/fast-formula-parser/formulas/functions/engineering.js"(exports2, module2) {
    var FormulaError = require_error();
    var TextFunctions = require_text();
    var { FormulaHelpers, Types } = require_helpers();
    var H = FormulaHelpers;
    var bessel = require_bessel();
    var jStat = require_jstat();
    var MAX_OCT = 536870911;
    var MIN_OCT = -536870912;
    var MAX_BIN = 511;
    var MIN_BIN = -512;
    var numberRegex = /^\s?[+-]?\s?[0-9]+[.]?[0-9]*([eE][+\-][0-9]+)?\s?$/;
    var IMWithoutRealRegex = /^\s?([+-]?\s?([0-9]+[.]?[0-9]*([eE][+\-][0-9]+)?)?)\s?[ij]\s?$/;
    var IMRegex = /^\s?([+-]?\s?[0-9]+[.]?[0-9]*([eE][+\-][0-9]+)?)\s?([+-]?\s?([0-9]+[.]?[0-9]*([eE][+\-][0-9]+)?)?)\s?[ij]\s?$/;
    function parseIM(textOrNumber) {
      textOrNumber = H.accept(textOrNumber);
      let real = 0, im = 0, unit = "i";
      if (typeof textOrNumber === "number")
        return { real: textOrNumber, im, unit };
      if (typeof textOrNumber === "boolean")
        throw FormulaError.VALUE;
      let match = textOrNumber.match(numberRegex);
      if (match) {
        real = Number(match[0]);
        return { real, im, unit };
      }
      match = textOrNumber.match(IMWithoutRealRegex);
      if (match) {
        im = Number(/^\s?[+-]?\s?$/.test(match[1]) ? match[1] + "1" : match[1]);
        unit = match[0].slice(-1);
        return { real, im, unit };
      }
      match = textOrNumber.match(IMRegex);
      if (match) {
        real = Number(match[1]);
        im = Number(/^\s?[+-]?\s?$/.test(match[3]) ? match[3] + "1" : match[3]);
        unit = match[0].slice(-1);
        return { real, im, unit };
      }
      throw FormulaError.NUM;
    }
    var EngineeringFunctions = {
      BESSELI: (x, n) => {
        x = H.accept(x, Types.NUMBER_NO_BOOLEAN);
        n = H.accept(n, Types.NUMBER_NO_BOOLEAN);
        n = Math.trunc(n);
        if (n < 0) {
          throw FormulaError.NUM;
        }
        return bessel.besseli(x, n);
      },
      BESSELJ: (x, n) => {
        x = H.accept(x, Types.NUMBER_NO_BOOLEAN);
        n = H.accept(n, Types.NUMBER_NO_BOOLEAN);
        n = Math.trunc(n);
        if (n < 0) {
          throw FormulaError.NUM;
        }
        return bessel.besselj(x, n);
      },
      BESSELK: (x, n) => {
        x = H.accept(x, Types.NUMBER_NO_BOOLEAN);
        n = H.accept(n, Types.NUMBER_NO_BOOLEAN);
        n = Math.trunc(n);
        if (n < 0) {
          throw FormulaError.NUM;
        }
        return bessel.besselk(x, n);
      },
      BESSELY: (x, n) => {
        x = H.accept(x, Types.NUMBER_NO_BOOLEAN);
        n = H.accept(n, Types.NUMBER_NO_BOOLEAN);
        n = Math.trunc(n);
        if (n < 0) {
          throw FormulaError.NUM;
        }
        return bessel.bessely(x, n);
      },
      BIN2DEC: (number) => {
        number = H.accept(number, Types.NUMBER_NO_BOOLEAN);
        let numberStr = number.toString();
        if (numberStr.length > 10) {
          throw FormulaError.NUM;
        }
        if (numberStr.length === 10 && numberStr.substring(0, 1) === "1") {
          return parseInt(numberStr.substring(1), 2) + MIN_BIN;
        } else {
          return parseInt(numberStr, 2);
        }
      },
      BIN2HEX: (number, places) => {
        number = H.accept(number, Types.NUMBER_NO_BOOLEAN);
        places = H.accept(places, Types.NUMBER_NO_BOOLEAN, null);
        const numberStr = number.toString();
        if (numberStr.length > 10) {
          throw FormulaError.NUM;
        }
        if (numberStr.length === 10 && numberStr.substring(0, 1) === "1") {
          return (parseInt(numberStr.substring(1), 2) + 1099511627264).toString(16).toUpperCase();
        }
        const result = parseInt(number, 2).toString(16);
        if (places == null) {
          return result.toUpperCase();
        } else {
          if (places < 0) {
            throw FormulaError.NUM;
          }
          places = Math.trunc(places);
          if (places >= result.length) {
            return (TextFunctions.REPT("0", places - result.length) + result).toUpperCase();
          } else {
            throw FormulaError.NUM;
          }
        }
      },
      BIN2OCT: (number, places) => {
        number = H.accept(number, Types.NUMBER_NO_BOOLEAN);
        places = H.accept(places, Types.NUMBER, null);
        let numberStr = number.toString();
        if (numberStr.length > 10) {
          throw FormulaError.NUM;
        }
        if (numberStr.length === 10 && numberStr.substr(0, 1) === "1") {
          return (parseInt(numberStr.substr(1), 2) + 1073741312).toString(8);
        }
        let result = parseInt(number, 2).toString(8);
        if (places == null) {
          return result.toUpperCase();
        } else {
          if (places < 0) {
            throw FormulaError.NUM;
          }
          places = Math.trunc(places);
          if (places >= result.length) {
            return TextFunctions.REPT("0", places - result.length) + result;
          } else {
            throw FormulaError.NUM;
          }
        }
      },
      BITAND: (number1, number2) => {
        number1 = H.accept(number1, Types.NUMBER);
        number2 = H.accept(number2, Types.NUMBER);
        if (number1 < 0 || number2 < 0) {
          throw FormulaError.NUM;
        }
        if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
          throw FormulaError.NUM;
        }
        if (number1 > 281474976710655 || number2 > 281474976710655) {
          throw FormulaError.NUM;
        }
        return number1 & number2;
      },
      BITLSHIFT: (number, shiftAmount) => {
        number = H.accept(number, Types.NUMBER);
        shiftAmount = H.accept(shiftAmount, Types.NUMBER);
        shiftAmount = Math.trunc(shiftAmount);
        if (Math.abs(shiftAmount) > 53) {
          throw FormulaError.NUM;
        }
        if (number < 0 || Math.floor(number) !== number || number > 281474976710655) {
          throw FormulaError.NUM;
        }
        const result = shiftAmount >= 0 ? number * 2 ** shiftAmount : Math.trunc(number / 2 ** -shiftAmount);
        if (result > 281474976710655)
          throw FormulaError.NUM;
        else
          return result;
      },
      BITOR: (number1, number2) => {
        number1 = H.accept(number1, Types.NUMBER);
        number2 = H.accept(number2, Types.NUMBER);
        if (number1 < 0 || number2 < 0) {
          throw FormulaError.NUM;
        }
        if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
          throw FormulaError.NUM;
        }
        if (number1 > 281474976710655 || number2 > 281474976710655) {
          throw FormulaError.NUM;
        }
        return number1 | number2;
      },
      BITRSHIFT: (number, shiftAmount) => {
        number = H.accept(number, Types.NUMBER);
        shiftAmount = H.accept(shiftAmount, Types.NUMBER);
        return EngineeringFunctions.BITLSHIFT(number, -shiftAmount);
      },
      BITXOR: (number1, number2) => {
        number1 = H.accept(number1, Types.NUMBER);
        number2 = H.accept(number2, Types.NUMBER);
        if (number1 < 0 || number1 > 281474976710655 || Math.floor(number1) !== number1) {
          throw FormulaError.NUM;
        }
        if (number2 < 0 || number2 > 281474976710655 || Math.floor(number2) !== number2) {
          throw FormulaError.NUM;
        }
        return number1 ^ number2;
      },
      COMPLEX: (realNum, iNum, suffix) => {
        realNum = H.accept(realNum, Types.NUMBER_NO_BOOLEAN);
        iNum = H.accept(iNum, Types.NUMBER_NO_BOOLEAN);
        suffix = H.accept(suffix, Types.STRING, "i");
        if (suffix !== "i" && suffix !== "j") {
          throw FormulaError.VALUE;
        }
        if (realNum === 0 && iNum === 0) {
          return 0;
        } else if (realNum === 0) {
          if (iNum === 1) {
            return suffix;
          } else if (iNum === -1) {
            return "-" + suffix;
          } else {
            return iNum.toString() + suffix;
          }
        } else if (iNum === 0) {
          return realNum.toString();
        } else {
          let sign = iNum > 0 ? "+" : "";
          if (iNum === 1) {
            return realNum.toString() + sign + suffix;
          } else if (iNum === -1) {
            return realNum.toString() + sign + "-" + suffix;
          } else {
            return realNum.toString() + sign + iNum.toString() + suffix;
          }
        }
      },
      DEC2BIN: (number, places) => {
        number = H.accept(number, Types.NUMBER);
        places = H.accept(places, Types.NUMBER, null);
        if (number < MIN_BIN || number > MAX_BIN) {
          throw FormulaError.NUM;
        }
        if (number < 0) {
          return "1" + TextFunctions.REPT("0", 9 - (512 + number).toString(2).length) + (512 + number).toString(2);
        }
        let result = parseInt(number, 10).toString(2);
        if (places == null) {
          return result;
        } else {
          places = Math.trunc(places);
          if (places <= 0) {
            throw FormulaError.NUM;
          }
          if (places < result.length)
            throw FormulaError.NUM;
          return TextFunctions.REPT("0", places - result.length) + result;
        }
      },
      DEC2HEX: (number, places) => {
        number = H.accept(number, Types.NUMBER);
        places = H.accept(places, Types.NUMBER, null);
        if (number < -549755813888 || number > 549755813888) {
          throw FormulaError.NUM;
        }
        if (number < 0) {
          return (1099511627776 + number).toString(16).toUpperCase();
        }
        let result = parseInt(number, 10).toString(16);
        if (places == null) {
          return result.toUpperCase();
        } else {
          places = Math.trunc(places);
          if (places <= 0) {
            throw FormulaError.NUM;
          }
          if (places < result.length)
            throw FormulaError.NUM;
          return TextFunctions.REPT("0", places - result.length) + result.toUpperCase();
        }
      },
      DEC2OCT: (number, places) => {
        number = H.accept(number, Types.NUMBER);
        places = H.accept(places, Types.NUMBER, null);
        if (number < -536870912 || number > 536870912) {
          throw FormulaError.NUM;
        }
        if (number < 0) {
          return (number + 1073741824).toString(8);
        }
        let result = parseInt(number, 10).toString(8);
        if (places == null) {
          return result.toUpperCase();
        } else {
          places = Math.trunc(places);
          if (places <= 0) {
            throw FormulaError.NUM;
          }
          if (places < result.length)
            throw FormulaError.NUM;
          return TextFunctions.REPT("0", places - result.length) + result;
        }
      },
      DELTA: (number1, number2) => {
        number1 = H.accept(number1, Types.NUMBER_NO_BOOLEAN);
        number2 = H.accept(number2, Types.NUMBER_NO_BOOLEAN, 0);
        return number1 === number2 ? 1 : 0;
      },
      ERF: (lowerLimit, upperLimit) => {
        lowerLimit = H.accept(lowerLimit, Types.NUMBER_NO_BOOLEAN);
        upperLimit = H.accept(upperLimit, Types.NUMBER_NO_BOOLEAN, 0);
        return jStat.erf(lowerLimit);
      },
      ERFC: (x) => {
        x = H.accept(x, Types.NUMBER_NO_BOOLEAN);
        return jStat.erfc(x);
      },
      GESTEP: (number, step) => {
        number = H.accept(number, Types.NUMBER_NO_BOOLEAN);
        step = H.accept(step, Types.NUMBER_NO_BOOLEAN, 0);
        return number >= step ? 1 : 0;
      },
      HEX2BIN: (number, places) => {
        number = H.accept(number, Types.STRING);
        places = H.accept(places, Types.NUMBER, null);
        if (number.length > 10 || !/^[0-9a-fA-F]*$/.test(number)) {
          throw FormulaError.NUM;
        }
        let ifNegative = number.length === 10 && number.substr(0, 1).toLowerCase() === "f";
        let toDecimal = ifNegative ? parseInt(number, 16) - 1099511627776 : parseInt(number, 16);
        if (toDecimal < MIN_BIN || toDecimal > MAX_BIN) {
          throw FormulaError.NUM;
        }
        if (ifNegative) {
          return "1" + TextFunctions.REPT("0", 9 - (toDecimal + 512).toString(2).length) + (toDecimal + 512).toString(2);
        }
        let toBinary = toDecimal.toString(2);
        if (places == null) {
          return toBinary;
        } else {
          places = Math.trunc(places);
          if (places <= 0 || places < toBinary.length) {
            throw FormulaError.NUM;
          }
          return TextFunctions.REPT("0", places - toBinary.length) + toBinary;
        }
      },
      HEX2DEC: (number) => {
        number = H.accept(number, Types.STRING);
        if (number.length > 10 || !/^[0-9a-fA-F]*$/.test(number)) {
          throw FormulaError.NUM;
        }
        let result = parseInt(number, 16);
        return result >= 549755813888 ? result - 1099511627776 : result;
      },
      HEX2OCT: (number, places) => {
        number = H.accept(number, Types.STRING);
        if (number.length > 10 || !/^[0-9a-fA-F]*$/.test(number)) {
          throw FormulaError.NUM;
        }
        let toDecimal = EngineeringFunctions.HEX2DEC(number);
        if (toDecimal > MAX_OCT || toDecimal < MIN_OCT) {
          throw FormulaError.NUM;
        }
        return EngineeringFunctions.DEC2OCT(toDecimal, places);
      },
      IMABS: (iNumber) => {
        const { real, im } = parseIM(iNumber);
        return Math.sqrt(Math.pow(real, 2) + Math.pow(im, 2));
      },
      IMAGINARY: (iNumber) => {
        return parseIM(iNumber).im;
      },
      IMARGUMENT: (iNumber) => {
        const { real, im } = parseIM(iNumber);
        if (real === 0 && im === 0) {
          throw FormulaError.DIV0;
        }
        if (real === 0 && im > 0) {
          return Math.PI / 2;
        }
        if (real === 0 && im < 0) {
          return -Math.PI / 2;
        }
        if (real < 0 && im === 0) {
          return Math.PI;
        }
        if (real > 0 && im === 0) {
          return 0;
        }
        if (real > 0) {
          return Math.atan(im / real);
        } else if (real < 0 && im > 0) {
          return Math.atan(im / real) + Math.PI;
        } else {
          return Math.atan(im / real) - Math.PI;
        }
      },
      IMCONJUGATE: (iNumber) => {
        const { real, im, unit } = parseIM(iNumber);
        return im !== 0 ? EngineeringFunctions.COMPLEX(real, -im, unit) : "" + real;
      },
      IMCOS: (iNumber) => {
        const { real, im, unit } = parseIM(iNumber);
        let realInput = Math.cos(real) * (Math.exp(im) + Math.exp(-im)) / 2;
        let imaginaryInput = -Math.sin(real) * (Math.exp(im) - Math.exp(-im)) / 2;
        return EngineeringFunctions.COMPLEX(realInput, imaginaryInput, unit);
      },
      IMCOSH: (iNumber) => {
        const { real, im, unit } = parseIM(iNumber);
        let realInput = Math.cos(im) * (Math.exp(real) + Math.exp(-real)) / 2;
        let imaginaryInput = -Math.sin(im) * (Math.exp(real) - Math.exp(-real)) / 2;
        return EngineeringFunctions.COMPLEX(realInput, -imaginaryInput, unit);
      },
      IMCOT: (iNumber) => {
        iNumber = H.accept(iNumber);
        let real = EngineeringFunctions.IMCOS(iNumber);
        let imaginary = EngineeringFunctions.IMSIN(iNumber);
        return EngineeringFunctions.IMDIV(real, imaginary);
      },
      IMCSC: (iNumber) => {
        iNumber = H.accept(iNumber);
        return EngineeringFunctions.IMDIV("1", EngineeringFunctions.IMSIN(iNumber));
      },
      IMCSCH: (iNumber) => {
        iNumber = H.accept(iNumber);
        return EngineeringFunctions.IMDIV("1", EngineeringFunctions.IMSINH(iNumber));
      },
      IMDIV: (iNumber1, iNumber2) => {
        const res1 = parseIM(iNumber1);
        const a = res1.real, b = res1.im, unit1 = res1.unit;
        const res2 = parseIM(iNumber2);
        const c = res2.real, d = res2.im, unit2 = res2.unit;
        if (c === 0 && d === 0 || unit1 !== unit2) {
          throw FormulaError.NUM;
        }
        let unit = unit1;
        let denominator = Math.pow(c, 2) + Math.pow(d, 2);
        return EngineeringFunctions.COMPLEX((a * c + b * d) / denominator, (b * c - a * d) / denominator, unit);
      },
      IMEXP: (iNumber) => {
        const { real, im, unit } = parseIM(iNumber);
        let e = Math.exp(real);
        return EngineeringFunctions.COMPLEX(e * Math.cos(im), e * Math.sin(im), unit);
      },
      IMLN: (iNumber) => {
        const { real, im, unit } = parseIM(iNumber);
        return EngineeringFunctions.COMPLEX(
          Math.log(Math.sqrt(Math.pow(real, 2) + Math.pow(im, 2))),
          Math.atan(im / real),
          unit
        );
      },
      IMLOG10: (iNumber) => {
        const { real, im, unit } = parseIM(iNumber);
        let realInput = Math.log(Math.sqrt(Math.pow(real, 2) + Math.pow(im, 2))) / Math.log(10);
        let imaginaryInput = Math.atan(im / real) / Math.log(10);
        return EngineeringFunctions.COMPLEX(realInput, imaginaryInput, unit);
      },
      IMLOG2: (iNumber) => {
        const { real, im, unit } = parseIM(iNumber);
        let realInput = Math.log(Math.sqrt(Math.pow(real, 2) + Math.pow(im, 2))) / Math.log(2);
        let imaginaryInput = Math.atan(im / real) / Math.log(2);
        return EngineeringFunctions.COMPLEX(realInput, imaginaryInput, unit);
      },
      IMPOWER: (iNumber, number) => {
        let { unit } = parseIM(iNumber);
        number = H.accept(number, Types.NUMBER_NO_BOOLEAN);
        let p = Math.pow(EngineeringFunctions.IMABS(iNumber), number);
        let t = EngineeringFunctions.IMARGUMENT(iNumber);
        let real = p * Math.cos(number * t);
        let imaginary = p * Math.sin(number * t);
        return EngineeringFunctions.COMPLEX(real, imaginary, unit);
      },
      IMPRODUCT: (...params) => {
        let result;
        let i = 0;
        H.flattenParams(params, null, false, (item) => {
          if (i === 0) {
            result = H.accept(item);
            parseIM(result);
          } else {
            const res1 = parseIM(result);
            const a = res1.real, b = res1.im, unit1 = res1.unit;
            const res2 = parseIM(item);
            const c = res2.real, d = res2.im, unit2 = res2.unit;
            if (unit1 !== unit2)
              throw FormulaError.VALUE;
            result = EngineeringFunctions.COMPLEX(a * c - b * d, a * d + b * c);
          }
          i++;
        }, 1);
        return result;
      },
      IMREAL: (iNumber) => {
        return parseIM(iNumber).real;
      },
      IMSEC: (iNumber) => {
        return EngineeringFunctions.IMDIV("1", EngineeringFunctions.IMCOS(iNumber));
      },
      IMSECH: (iNumber) => {
        return EngineeringFunctions.IMDIV("1", EngineeringFunctions.IMCOSH(iNumber));
      },
      IMSIN: (iNumber) => {
        const { real, im, unit } = parseIM(iNumber);
        let realInput = Math.sin(real) * (Math.exp(im) + Math.exp(-im)) / 2;
        let imaginaryInput = Math.cos(real) * (Math.exp(im) - Math.exp(-im)) / 2;
        return EngineeringFunctions.COMPLEX(realInput, imaginaryInput, unit);
      },
      IMSINH: (iNumber) => {
        const { real, im, unit } = parseIM(iNumber);
        let realInput = Math.cos(im) * (Math.exp(real) - Math.exp(-real)) / 2;
        let imaginaryInput = Math.sin(im) * (Math.exp(real) + Math.exp(-real)) / 2;
        return EngineeringFunctions.COMPLEX(realInput, imaginaryInput, unit);
      },
      IMSQRT: (iNumber) => {
        const { unit } = parseIM(iNumber);
        let power = Math.sqrt(EngineeringFunctions.IMABS(iNumber));
        let argument = EngineeringFunctions.IMARGUMENT(iNumber);
        return EngineeringFunctions.COMPLEX(power * Math.cos(argument / 2), power * Math.sin(argument / 2), unit);
      },
      IMSUB: (iNumber1, iNumber2) => {
        const res1 = parseIM(iNumber1);
        const a = res1.real, b = res1.im, unit1 = res1.unit;
        const res2 = parseIM(iNumber2);
        const c = res2.real, d = res2.im, unit2 = res2.unit;
        if (unit1 !== unit2) {
          throw FormulaError.VALUE;
        }
        return EngineeringFunctions.COMPLEX(a - c, b - d, unit1);
      },
      IMSUM: (...params) => {
        let realSum = 0, imSum = 0, prevUnit;
        H.flattenParams(params, null, false, (item) => {
          const { real, im, unit } = parseIM(item);
          if (!prevUnit) prevUnit = unit;
          if (prevUnit !== unit)
            throw FormulaError.VALUE;
          realSum += real;
          imSum += im;
        });
        return EngineeringFunctions.COMPLEX(realSum, imSum, prevUnit);
      },
      IMTAN: (iNumber) => {
        const { unit } = parseIM(iNumber);
        return EngineeringFunctions.IMDIV(EngineeringFunctions.IMSIN(iNumber), EngineeringFunctions.IMCOS(iNumber), unit);
      },
      // FIXME: need to check the test cases
      OCT2BIN: (number, places) => {
        number = H.accept(number, Types.STRING);
        places = H.accept(places, Types.NUMBER, null);
        if (number.length > 10) {
          throw FormulaError.NUM;
        }
        if (places > 10) {
          throw FormulaError.NUM;
        }
        if (places !== null && places < 0) {
          throw FormulaError.NUM;
        }
        places = Math.trunc(places);
        let isNegative = number.length === 10 && number.substring(0, 1) === "7";
        let toDecimal = EngineeringFunctions.OCT2DEC(number);
        if (toDecimal < MIN_BIN || toDecimal > MAX_BIN) {
          return FormulaError.NUM;
        }
        if (isNegative) {
          return "1" + TextFunctions.REPT("0", 9 - (512 + toDecimal).toString(2).length) + (512 + toDecimal).toString(2);
        }
        let result = toDecimal.toString(2);
        if (places === 0) {
          return result;
        }
        if (places < result.length) {
          throw FormulaError.NUM;
        }
        return TextFunctions.REPT("0", places - result.length) + result;
      },
      OCT2DEC: (number) => {
        number = H.accept(number, Types.STRING);
        if (number.length > 10) {
          throw FormulaError.NUM;
        }
        for (const n of number) {
          if (n < "0" || n > "7") {
            throw FormulaError.NUM;
          }
        }
        let result = parseInt(number, 8);
        return result >= 536870912 ? result - 1073741824 : result;
      },
      OCT2HEX: (number, places) => {
        number = H.accept(number, Types.STRING);
        places = H.accept(places, Types.NUMBER_NO_BOOLEAN, null);
        if (number.length > 10) {
          throw FormulaError.NUM;
        }
        for (const n of number) {
          if (n < "0" || n > "7") {
            throw FormulaError.NUM;
          }
        }
        places = Math.trunc(places);
        if (places < 0 || places > 10) {
          throw FormulaError.NUM;
        }
        let toDecimal = EngineeringFunctions.OCT2DEC(number);
        let toHex = EngineeringFunctions.DEC2HEX(toDecimal);
        if (places === 0) {
          return toHex;
        }
        if (places < toHex.length) {
          throw FormulaError.NUM;
        } else {
          return TextFunctions.REPT("0", places - toHex.length) + toHex;
        }
      }
    };
    module2.exports = EngineeringFunctions;
  }
});

// node_modules/fast-formula-parser/formulas/functions/reference.js
var require_reference = __commonJS({
  "node_modules/fast-formula-parser/formulas/functions/reference.js"(exports2, module2) {
    var FormulaError = require_error();
    var { FormulaHelpers, Types, WildCard, Address } = require_helpers();
    var Collection = require_collection();
    var H = FormulaHelpers;
    var ReferenceFunctions = {
      ADDRESS: (rowNumber, columnNumber, absNum, a1, sheetText) => {
        rowNumber = H.accept(rowNumber, Types.NUMBER);
        columnNumber = H.accept(columnNumber, Types.NUMBER);
        absNum = H.accept(absNum, Types.NUMBER, 1);
        a1 = H.accept(a1, Types.BOOLEAN, true);
        sheetText = H.accept(sheetText, Types.STRING, "");
        if (rowNumber < 1 || columnNumber < 1 || absNum < 1 || absNum > 4)
          throw FormulaError.VALUE;
        let result = "";
        if (sheetText.length > 0) {
          if (/[^A-Za-z_.\d\u007F-\uFFFF]/.test(sheetText)) {
            result += `'${sheetText}'!`;
          } else {
            result += sheetText + "!";
          }
        }
        if (a1) {
          result += absNum === 1 || absNum === 3 ? "$" : "";
          result += Address.columnNumberToName(columnNumber);
          result += absNum === 1 || absNum === 2 ? "$" : "";
          result += rowNumber;
        } else {
          result += "R";
          result += absNum === 4 || absNum === 3 ? `[${rowNumber}]` : rowNumber;
          result += "C";
          result += absNum === 4 || absNum === 2 ? `[${columnNumber}]` : columnNumber;
        }
        return result;
      },
      AREAS: (refs) => {
        refs = H.accept(refs);
        if (refs instanceof Collection) {
          return refs.length;
        }
        return 1;
      },
      CHOOSE: (indexNum, ...values2) => {
      },
      // Special
      COLUMN: (context, obj) => {
        if (obj == null) {
          if (context.position.col != null)
            return context.position.col;
          else
            throw Error("FormulaParser.parse is called without position parameter.");
        } else {
          if (typeof obj !== "object" || Array.isArray(obj))
            throw FormulaError.VALUE;
          if (H.isCellRef(obj)) {
            return obj.ref.col;
          } else if (H.isRangeRef(obj)) {
            return obj.ref.from.col;
          } else {
            throw Error("ReferenceFunctions.COLUMN should not reach here.");
          }
        }
      },
      // Special
      COLUMNS: (context, obj) => {
        if (obj == null) {
          throw Error("COLUMNS requires one argument");
        }
        if (typeof obj != "object" || Array.isArray(obj))
          throw FormulaError.VALUE;
        if (H.isCellRef(obj)) {
          return 1;
        } else if (H.isRangeRef(obj)) {
          return Math.abs(obj.ref.from.col - obj.ref.to.col) + 1;
        } else {
          throw Error("ReferenceFunctions.COLUMNS should not reach here.");
        }
      },
      HLOOKUP: (lookupValue, tableArray, rowIndexNum, rangeLookup) => {
        lookupValue = H.accept(lookupValue);
        try {
          tableArray = H.accept(tableArray, Types.ARRAY, void 0, false);
        } catch (e) {
          if (e instanceof FormulaError)
            throw FormulaError.NA;
          throw e;
        }
        rowIndexNum = H.accept(rowIndexNum, Types.NUMBER);
        rangeLookup = H.accept(rangeLookup, Types.BOOLEAN, true);
        if (rowIndexNum < 1)
          throw FormulaError.VALUE;
        if (tableArray[rowIndexNum - 1] === void 0)
          throw FormulaError.REF;
        const lookupType = typeof lookupValue;
        if (rangeLookup) {
          let prevValue = lookupType === typeof tableArray[0][0] ? tableArray[0][0] : null;
          for (let i = 1; i < tableArray[0].length; i++) {
            const currValue = tableArray[0][i];
            const type = typeof currValue;
            if (type !== lookupType)
              continue;
            if (prevValue > lookupValue && currValue > lookupValue) {
              throw FormulaError.NA;
            }
            if (currValue === lookupValue)
              return tableArray[rowIndexNum - 1][i];
            if (prevValue != null && currValue > lookupValue && prevValue <= lookupValue) {
              return tableArray[rowIndexNum - 1][i - 1];
            }
            prevValue = currValue;
          }
          if (prevValue == null)
            throw FormulaError.NA;
          return prevValue;
        } else {
          let index = -1;
          if (WildCard.isWildCard(lookupValue)) {
            index = tableArray[0].findIndex((item) => {
              return WildCard.toRegex(lookupValue, "i").test(item);
            });
          } else {
            index = tableArray[0].findIndex((item) => {
              return item === lookupValue;
            });
          }
          if (index === -1) throw FormulaError.NA;
          return tableArray[rowIndexNum - 1][index];
        }
      },
      // Special
      INDEX: (context, ranges, rowNum, colNum, areaNum) => {
        rowNum = context.utils.extractRefValue(rowNum);
        rowNum = { value: rowNum.val, isArray: rowNum.isArray };
        rowNum = H.accept(rowNum, Types.NUMBER);
        rowNum = Math.trunc(rowNum);
        if (colNum == null) {
          colNum = 1;
        } else {
          colNum = context.utils.extractRefValue(colNum);
          colNum = { value: colNum.val, isArray: colNum.isArray };
          colNum = H.accept(colNum, Types.NUMBER, 1);
          colNum = Math.trunc(colNum);
        }
        if (areaNum == null) {
          areaNum = 1;
        } else {
          areaNum = context.utils.extractRefValue(areaNum);
          areaNum = { value: areaNum.val, isArray: areaNum.isArray };
          areaNum = H.accept(areaNum, Types.NUMBER, 1);
          areaNum = Math.trunc(areaNum);
        }
        let range = ranges;
        if (ranges instanceof Collection) {
          range = ranges.refs[areaNum - 1];
        } else if (areaNum > 1) {
          throw FormulaError.REF;
        }
        if (rowNum === 0 && colNum === 0) {
          return range;
        }
        if (rowNum === 0) {
          if (H.isRangeRef(range)) {
            if (range.ref.to.col - range.ref.from.col < colNum - 1)
              throw FormulaError.REF;
            range.ref.from.col += colNum - 1;
            range.ref.to.col = range.ref.from.col;
            return range;
          } else if (Array.isArray(range)) {
            const res = [];
            range.forEach((row) => res.push([row[colNum - 1]]));
            return res;
          }
        }
        if (colNum === 0) {
          if (H.isRangeRef(range)) {
            if (range.ref.to.row - range.ref.from.row < rowNum - 1)
              throw FormulaError.REF;
            range.ref.from.row += rowNum - 1;
            range.ref.to.row = range.ref.from.row;
            return range;
          } else if (Array.isArray(range)) {
            return range[colNum - 1];
          }
        }
        if (rowNum !== 0 && colNum !== 0) {
          if (H.isRangeRef(range)) {
            range = range.ref;
            if (range.to.row - range.from.row < rowNum - 1 || range.to.col - range.from.col < colNum - 1)
              throw FormulaError.REF;
            return { ref: { row: range.from.row + rowNum - 1, col: range.from.col + colNum - 1 } };
          } else if (H.isCellRef(range)) {
            range = range.ref;
            if (rowNum > 1 || colNum > 1)
              throw FormulaError.REF;
            return { ref: { row: range.row + rowNum - 1, col: range.col + colNum - 1 } };
          } else if (Array.isArray(range)) {
            if (range.length < rowNum || range[0].length < colNum)
              throw FormulaError.REF;
            return range[rowNum - 1][colNum - 1];
          }
        }
      },
      MATCH: () => {
      },
      // Special
      ROW: (context, obj) => {
        if (obj == null) {
          if (context.position.row != null)
            return context.position.row;
          else
            throw Error("FormulaParser.parse is called without position parameter.");
        } else {
          if (typeof obj !== "object" || Array.isArray(obj))
            throw FormulaError.VALUE;
          if (H.isCellRef(obj)) {
            return obj.ref.row;
          } else if (H.isRangeRef(obj)) {
            return obj.ref.from.row;
          } else {
            throw Error("ReferenceFunctions.ROW should not reach here.");
          }
        }
      },
      // Special
      ROWS: (context, obj) => {
        if (obj == null) {
          throw Error("ROWS requires one argument");
        }
        if (typeof obj != "object" || Array.isArray(obj))
          throw FormulaError.VALUE;
        if (H.isCellRef(obj)) {
          return 1;
        } else if (H.isRangeRef(obj)) {
          return Math.abs(obj.ref.from.row - obj.ref.to.row) + 1;
        } else {
          throw Error("ReferenceFunctions.ROWS should not reach here.");
        }
      },
      TRANSPOSE: (array) => {
        array = H.accept(array, Types.ARRAY, void 0, false);
        const result = [];
        for (let i = 0; i < array[0].length; i++) {
          result[i] = [];
          for (let j = 0; j < array.length; j++) {
            result[i][j] = array[j][i];
          }
        }
        return result;
      },
      VLOOKUP: (lookupValue, tableArray, colIndexNum, rangeLookup) => {
        lookupValue = H.accept(lookupValue);
        try {
          tableArray = H.accept(tableArray, Types.ARRAY, void 0, false);
        } catch (e) {
          if (e instanceof FormulaError)
            throw FormulaError.NA;
          throw e;
        }
        colIndexNum = H.accept(colIndexNum, Types.NUMBER);
        rangeLookup = H.accept(rangeLookup, Types.BOOLEAN, true);
        if (colIndexNum < 1)
          throw FormulaError.VALUE;
        if (tableArray[0][colIndexNum - 1] === void 0)
          throw FormulaError.REF;
        const lookupType = typeof lookupValue;
        if (rangeLookup) {
          let prevValue = lookupType === typeof tableArray[0][0] ? tableArray[0][0] : null;
          for (let i = 1; i < tableArray.length; i++) {
            const currRow = tableArray[i];
            const currValue = tableArray[i][0];
            const type = typeof currValue;
            if (type !== lookupType)
              continue;
            if (prevValue > lookupValue && currValue > lookupValue) {
              throw FormulaError.NA;
            }
            if (currValue === lookupValue)
              return currRow[colIndexNum - 1];
            if (prevValue != null && currValue > lookupValue && prevValue <= lookupValue) {
              return tableArray[i - 1][colIndexNum - 1];
            }
            prevValue = currValue;
          }
          if (prevValue == null)
            throw FormulaError.NA;
          return prevValue;
        } else {
          let index = -1;
          if (WildCard.isWildCard(lookupValue)) {
            index = tableArray.findIndex((currRow) => {
              return WildCard.toRegex(lookupValue, "i").test(currRow[0]);
            });
          } else {
            index = tableArray.findIndex((currRow) => {
              return currRow[0] === lookupValue;
            });
          }
          if (index === -1) throw FormulaError.NA;
          return tableArray[index][colIndexNum - 1];
        }
      }
    };
    module2.exports = ReferenceFunctions;
  }
});

// node_modules/fast-formula-parser/formulas/functions/information.js
var require_information = __commonJS({
  "node_modules/fast-formula-parser/formulas/functions/information.js"(exports2, module2) {
    var FormulaError = require_error();
    var { FormulaHelpers, Types } = require_helpers();
    var H = FormulaHelpers;
    var error2Number = {
      "#NULL!": 1,
      "#DIV/0!": 2,
      "#VALUE!": 3,
      "#REF!": 4,
      "#NAME?": 5,
      "#NUM!": 6,
      "#N/A": 7
    };
    var InfoFunctions = {
      CELL: (infoType, reference) => {
      },
      "ERROR.TYPE": (value) => {
        value = H.accept(value);
        if (value instanceof FormulaError)
          return error2Number[value.toString()];
        throw FormulaError.NA;
      },
      INFO: () => {
      },
      ISBLANK: (value) => {
        if (!value.ref)
          return false;
        return value.value == null || value.value === "";
      },
      ISERR: (value) => {
        value = H.accept(value);
        return value instanceof FormulaError && value.toString() !== "#N/A";
      },
      ISERROR: (value) => {
        value = H.accept(value);
        return value instanceof FormulaError;
      },
      ISEVEN: (number) => {
        number = H.accept(number, Types.NUMBER);
        number = Math.trunc(number);
        return number % 2 === 0;
      },
      ISLOGICAL: (value) => {
        value = H.accept(value);
        return typeof value === "boolean";
      },
      ISNA: (value) => {
        value = H.accept(value);
        return value instanceof FormulaError && value.toString() === "#N/A";
      },
      ISNONTEXT: (value) => {
        value = H.accept(value);
        return typeof value !== "string";
      },
      ISNUMBER: (value) => {
        value = H.accept(value);
        return typeof value === "number";
      },
      ISREF: (value) => {
        if (!value.ref)
          return false;
        if (H.isCellRef(value) && (value.ref.row > 1048576 || value.ref.col > 16384)) {
          return false;
        }
        if (H.isRangeRef(value) && (value.ref.from.row > 1048576 || value.ref.from.col > 16384 || value.ref.to.row > 1048576 || value.ref.to.col > 16384)) {
          return false;
        }
        value = H.accept(value);
        return !(value instanceof FormulaError && value.toString() === "#REF!");
      },
      ISTEXT: (value) => {
        value = H.accept(value);
        return typeof value === "string";
      },
      N: (value) => {
        value = H.accept(value);
        const type = typeof value;
        if (type === "number")
          return value;
        else if (type === "boolean")
          return Number(value);
        else if (value instanceof FormulaError)
          throw value;
        return 0;
      },
      NA: () => {
        throw FormulaError.NA;
      },
      TYPE: (value) => {
        if (value.ref) {
          if (H.isRangeRef(value)) {
            return 16;
          } else if (H.isCellRef(value)) {
            value = H.accept(value);
            if (typeof value === "string" && value.length === 0)
              return 1;
          }
        }
        value = H.accept(value);
        const type = typeof value;
        if (type === "number")
          return 1;
        else if (type === "string")
          return 2;
        else if (type === "boolean")
          return 4;
        else if (value instanceof FormulaError)
          return 16;
        else if (Array.isArray(value))
          return 64;
      }
    };
    module2.exports = InfoFunctions;
  }
});

// node_modules/fast-formula-parser/formulas/functions/distribution.js
var require_distribution = __commonJS({
  "node_modules/fast-formula-parser/formulas/functions/distribution.js"(exports2, module2) {
    var FormulaError = require_error();
    var { FormulaHelpers, Types } = require_helpers();
    var H = FormulaHelpers;
    var jStat = require_jstat();
    var MathFunctions = require_math();
    var SQRT2PI = 2.5066282746310002;
    var DistributionFunctions = {
      "BETA.DIST": (x, alpha, beta, cumulative, a, b) => {
        x = H.accept(x, Types.NUMBER);
        alpha = H.accept(alpha, Types.NUMBER);
        beta = H.accept(beta, Types.NUMBER);
        cumulative = H.accept(cumulative, Types.BOOLEAN);
        a = H.accept(a, Types.NUMBER, 0);
        b = H.accept(b, Types.NUMBER, 1);
        if (alpha <= 0 || beta <= 0 || x < a || x > b || a === b)
          throw FormulaError.NUM;
        x = (x - a) / (b - a);
        return cumulative ? jStat.beta.cdf(x, alpha, beta) : jStat.beta.pdf(x, alpha, beta) / (b - a);
      },
      "BETA.INV": (probability, alpha, beta, a, b) => {
        probability = H.accept(probability, Types.NUMBER);
        alpha = H.accept(alpha, Types.NUMBER);
        beta = H.accept(beta, Types.NUMBER);
        a = H.accept(a, Types.NUMBER, 0);
        b = H.accept(b, Types.NUMBER, 1);
        if (alpha <= 0 || beta <= 0 || probability <= 0 || probability > 1)
          throw FormulaError.NUM;
        return jStat.beta.inv(probability, alpha, beta) * (b - a) + a;
      },
      "BINOM.DIST": (numberS, trials, probabilityS, cumulative) => {
        numberS = H.accept(numberS, Types.NUMBER);
        trials = H.accept(trials, Types.NUMBER);
        probabilityS = H.accept(probabilityS, Types.NUMBER);
        cumulative = H.accept(cumulative, Types.BOOLEAN);
        if (trials < 0 || probabilityS < 0 || probabilityS > 1 || numberS < 0 || numberS > trials)
          throw FormulaError.NUM;
        return cumulative ? jStat.binomial.cdf(numberS, trials, probabilityS) : jStat.binomial.pdf(numberS, trials, probabilityS);
      },
      "BINOM.DIST.RANGE": (trials, probabilityS, numberS, numberS2) => {
        trials = H.accept(trials, Types.NUMBER);
        probabilityS = H.accept(probabilityS, Types.NUMBER);
        numberS = H.accept(numberS, Types.NUMBER);
        numberS2 = H.accept(numberS2, Types.NUMBER, numberS);
        if (trials < 0 || probabilityS < 0 || probabilityS > 1 || numberS < 0 || numberS > trials || numberS2 < numberS || numberS2 > trials)
          throw FormulaError.NUM;
        let result = 0;
        for (let i = numberS; i <= numberS2; i++) {
          result += MathFunctions.COMBIN(trials, i) * Math.pow(probabilityS, i) * Math.pow(1 - probabilityS, trials - i);
        }
        return result;
      },
      "BINOM.INV": (trials, probabilityS, alpha) => {
        trials = H.accept(trials, Types.NUMBER);
        probabilityS = H.accept(probabilityS, Types.NUMBER);
        alpha = H.accept(alpha, Types.NUMBER);
        if (trials < 0 || probabilityS < 0 || probabilityS > 1 || alpha < 0 || alpha > 1)
          throw FormulaError.NUM;
        let x = 0;
        while (x <= trials) {
          if (jStat.binomial.cdf(x, trials, probabilityS) >= alpha) {
            return x;
          }
          x++;
        }
      },
      "CHISQ.DIST": (x, degFreedom, cumulative) => {
        x = H.accept(x, Types.NUMBER);
        degFreedom = H.accept(degFreedom, Types.NUMBER);
        cumulative = H.accept(cumulative, Types.NUMBER);
        degFreedom = Math.trunc(degFreedom);
        if (x < 0 || degFreedom < 1 || degFreedom > 10 ** 10)
          throw FormulaError.NUM;
        return cumulative ? jStat.chisquare.cdf(x, degFreedom) : jStat.chisquare.pdf(x, degFreedom);
      },
      "CHISQ.DIST.RT": (x, degFreedom) => {
        x = H.accept(x, Types.NUMBER);
        degFreedom = H.accept(degFreedom, Types.NUMBER);
        degFreedom = Math.trunc(degFreedom);
        if (x < 0 || degFreedom < 1 || degFreedom > 10 ** 10)
          throw FormulaError.NUM;
        return 1 - jStat.chisquare.cdf(x, degFreedom);
      },
      "CHISQ.INV": (probability, degFreedom) => {
        probability = H.accept(probability, Types.NUMBER);
        degFreedom = H.accept(degFreedom, Types.NUMBER);
        degFreedom = Math.trunc(degFreedom);
        if (probability < 0 || probability > 1 || degFreedom < 1 || degFreedom > 10 ** 10)
          throw FormulaError.NUM;
        return jStat.chisquare.inv(probability, degFreedom);
      },
      "CHISQ.INV.RT": (probability, degFreedom) => {
        probability = H.accept(probability, Types.NUMBER);
        degFreedom = H.accept(degFreedom, Types.NUMBER);
        degFreedom = Math.trunc(degFreedom);
        if (probability < 0 || probability > 1 || degFreedom < 1 || degFreedom > 10 ** 10)
          throw FormulaError.NUM;
        return jStat.chisquare.inv(1 - probability, degFreedom);
      },
      "CHISQ.TEST": (actualRange, expectedRange) => {
        const actual = H.accept(actualRange, Types.ARRAY, void 0, false, false);
        const expected = H.accept(expectedRange, Types.ARRAY, void 0, false, false);
        if (actual.length !== expected.length || actual[0].length !== expected[0].length || actual.length === 1 && actual[0].length === 1)
          throw FormulaError.NA;
        const row = actual.length;
        const col = actual[0].length;
        let dof = (row - 1) * (col - 1);
        if (row === 1)
          dof = col - 1;
        else
          dof = row - 1;
        let xsqr = 0;
        for (let i = 0; i < row; i++) {
          for (let j = 0; j < col; j++) {
            if (typeof actual[i][j] !== "number" || typeof expected[i][j] !== "number")
              continue;
            if (expected[i][j] === 0) throw FormulaError.DIV0;
            xsqr += Math.pow(actual[i][j] - expected[i][j], 2) / expected[i][j];
          }
        }
        let p = Math.exp(-0.5 * xsqr);
        if (dof % 2 === 1) {
          p = p * Math.sqrt(2 * xsqr / Math.PI);
        }
        let k = dof;
        while (k >= 2) {
          p = p * xsqr / k;
          k = k - 2;
        }
        let t = p, a = dof;
        while (t > 1e-15 * p) {
          a = a + 2;
          t = t * xsqr / a;
          p = p + t;
        }
        return 1 - p;
      },
      "CONFIDENCE.NORM": (alpha, std, size) => {
        alpha = H.accept(alpha, Types.NUMBER);
        std = H.accept(std, Types.NUMBER);
        size = H.accept(size, Types.NUMBER);
        size = Math.trunc(size);
        if (alpha <= 0 || alpha >= 1 || std <= 0 || size < 1)
          throw FormulaError.NUM;
        return jStat.normalci(1, alpha, std, size)[1] - 1;
      },
      "CONFIDENCE.T": (alpha, std, size) => {
        alpha = H.accept(alpha, Types.NUMBER);
        std = H.accept(std, Types.NUMBER);
        size = H.accept(size, Types.NUMBER);
        size = Math.trunc(size);
        if (alpha <= 0 || alpha >= 1 || std <= 0 || size < 1)
          throw FormulaError.NUM;
        if (size === 1)
          throw FormulaError.DIV0;
        return jStat.tci(1, alpha, std, size)[1] - 1;
      },
      CORREL: (array1, array2) => {
        array1 = H.accept(array1, Types.ARRAY, void 0, true, true);
        array2 = H.accept(array2, Types.ARRAY, void 0, true, true);
        if (array1.length !== array2.length)
          throw FormulaError.NA;
        const filterArr1 = [], filterArr2 = [];
        for (let i = 0; i < array1.length; i++) {
          if (typeof array1[i] !== "number" || typeof array2[i] !== "number")
            continue;
          filterArr1.push(array1[i]);
          filterArr2.push(array2[i]);
        }
        if (filterArr1.length <= 1)
          throw FormulaError.DIV0;
        return jStat.corrcoeff(filterArr1, filterArr2);
      },
      "COVARIANCE.P": (array1, array2) => {
        array1 = H.accept(array1, Types.ARRAY, void 0, true, true);
        array2 = H.accept(array2, Types.ARRAY, void 0, true, true);
        if (array1.length !== array2.length)
          throw FormulaError.NA;
        const filterArr1 = [], filterArr2 = [];
        for (let i = 0; i < array1.length; i++) {
          if (typeof array1[i] !== "number" || typeof array2[i] !== "number")
            continue;
          filterArr1.push(array1[i]);
          filterArr2.push(array2[i]);
        }
        const mean1 = jStat.mean(filterArr1), mean2 = jStat.mean(filterArr2);
        let result = 0;
        for (let i = 0; i < filterArr1.length; i++) {
          result += (filterArr1[i] - mean1) * (filterArr2[i] - mean2);
        }
        return result / filterArr1.length;
      },
      "COVARIANCE.S": (array1, array2) => {
        array1 = H.accept(array1, Types.ARRAY, void 0, true, true);
        array2 = H.accept(array2, Types.ARRAY, void 0, true, true);
        if (array1.length !== array2.length)
          throw FormulaError.NA;
        const filterArr1 = [], filterArr2 = [];
        for (let i = 0; i < array1.length; i++) {
          if (typeof array1[i] !== "number" || typeof array2[i] !== "number")
            continue;
          filterArr1.push(array1[i]);
          filterArr2.push(array2[i]);
        }
        if (filterArr1.length <= 1)
          throw FormulaError.DIV0;
        return jStat.covariance(filterArr1, filterArr2);
      },
      DEVSQ: (...numbers) => {
        let sum = 0, x = [];
        H.flattenParams(numbers, Types.NUMBER, true, (item, info) => {
          if (typeof item === "number") {
            sum += item;
            x.push(item);
          }
        });
        const mean = sum / x.length;
        sum = 0;
        for (let i = 0; i < x.length; i++) {
          sum += (x[i] - mean) ** 2;
        }
        return sum;
      },
      "EXPON.DIST": (x, lambda, cumulative) => {
        x = H.accept(x, Types.NUMBER);
        lambda = H.accept(lambda, Types.NUMBER);
        cumulative = H.accept(cumulative, Types.BOOLEAN);
        if (x < 0 || lambda <= 0)
          throw FormulaError.NUM;
        return cumulative ? jStat.exponential.cdf(x, lambda) : jStat.exponential.pdf(x, lambda);
      },
      "F.DIST": (x, d1, d2, cumulative) => {
        x = H.accept(x, Types.NUMBER);
        d1 = H.accept(d1, Types.NUMBER);
        d2 = H.accept(d2, Types.NUMBER);
        cumulative = H.accept(cumulative, Types.BOOLEAN);
        if (x < 0 || d1 < 1 || d2 < 1) {
          throw FormulaError.NUM;
        }
        d1 = Math.trunc(d1);
        d2 = Math.trunc(d2);
        return cumulative ? jStat.centralF.cdf(x, d1, d2) : jStat.centralF.pdf(x, d1, d2);
      },
      "F.DIST.RT": (x, d1, d2) => {
        x = H.accept(x, Types.NUMBER);
        d1 = H.accept(d1, Types.NUMBER);
        d2 = H.accept(d2, Types.NUMBER);
        if (x < 0 || d1 < 1 || d2 < 1) {
          throw FormulaError.NUM;
        }
        d1 = Math.trunc(d1);
        d2 = Math.trunc(d2);
        return 1 - jStat.centralF.cdf(x, d1, d2);
      },
      "F.INV": (probability, d1, d2) => {
        probability = H.accept(probability, Types.NUMBER);
        d1 = H.accept(d1, Types.NUMBER);
        d2 = H.accept(d2, Types.NUMBER);
        if (probability < 0 || probability > 1) {
          throw FormulaError.NUM;
        }
        if (d1 < 1 || d2 < 1) {
          throw FormulaError.NUM;
        }
        d1 = Math.trunc(d1);
        d2 = Math.trunc(d2);
        return jStat.centralF.inv(probability, d1, d2);
      },
      "F.INV.RT": (probability, d1, d2) => {
        probability = H.accept(probability, Types.NUMBER);
        d1 = H.accept(d1, Types.NUMBER);
        d2 = H.accept(d2, Types.NUMBER);
        if (probability < 0 || probability > 1) {
          throw FormulaError.NUM;
        }
        if (d1 < 1 || d1 >= Math.pow(10, 10)) {
          throw FormulaError.NUM;
        }
        if (d2 < 1 || d2 >= Math.pow(10, 10)) {
          throw FormulaError.NUM;
        }
        d1 = Math.trunc(d1);
        d2 = Math.trunc(d2);
        return jStat.centralF.inv(1 - probability, d1, d2);
      },
      /**
       * https://en.wikipedia.org/wiki/F-test_of_equality_of_variances
       */
      "F.TEST": (array1, array2) => {
        array1 = H.accept(array1, Types.ARRAY, void 0, true, true);
        array2 = H.accept(array2, Types.ARRAY, void 0, true, true);
        const x1 = [], x2 = [];
        let x1Mean = 0, x2Mean = 0;
        for (let i = 0; i < Math.max(array1.length, array2.length); i++) {
          if (typeof array1[i] === "number") {
            x1.push(array1[i]);
            x1Mean += array1[i];
          }
          if (typeof array2[i] === "number") {
            x2.push(array2[i]);
            x2Mean += array2[i];
          }
        }
        if (x1.length <= 1 || x2.length <= 1)
          throw FormulaError.DIV0;
        x1Mean /= x1.length;
        x2Mean /= x2.length;
        let s1 = 0, s2 = 0;
        for (let i = 0; i < x1.length; i++) {
          s1 += (x1Mean - x1[i]) ** 2;
        }
        s1 /= x1.length - 1;
        for (let i = 0; i < x2.length; i++) {
          s2 += (x2Mean - x2[i]) ** 2;
        }
        s2 /= x2.length - 1;
        return jStat.centralF.cdf(s1 / s2, x1.length - 1, x2.length - 1) * 2;
      },
      FISHER: (x) => {
        x = H.accept(x, Types.NUMBER);
        if (x <= -1 || x >= 1) {
          throw FormulaError.NUM;
        }
        return Math.log((1 + x) / (1 - x)) / 2;
      },
      FISHERINV: (x) => {
        x = H.accept(x, Types.NUMBER);
        let e2y = Math.exp(2 * x);
        return (e2y - 1) / (e2y + 1);
      },
      // FIXME
      FORECAST: (x, knownYs, knownXs) => {
        x = H.accept(x, Types.NUMBER);
        knownYs = H.accept(knownYs, Types.ARRAY, void 0, true, true);
        knownXs = H.accept(knownXs, Types.ARRAY, void 0, true, true);
        if (knownXs.length !== knownYs.length)
          throw FormulaError.NA;
        const filteredY = [], filteredX = [];
        let xAllEqual = true;
        for (let i = 0; i < knownYs.length; i++) {
          if (typeof knownYs[i] !== "number" || typeof knownXs[i] !== "number")
            continue;
          filteredY.push(knownYs[i]);
          filteredX.push(knownXs[i]);
          if (knownXs[i] !== knownXs[0])
            xAllEqual = false;
        }
        if (xAllEqual)
          throw FormulaError.DIV0;
        const yMean = jStat.mean(filteredY);
        const xMean = jStat.mean(filteredX);
        let numerator = 0, denominator = 0;
        for (let i = 0; i < filteredY.length; i++) {
          numerator += (filteredX[i] - xMean) * (filteredY[i] - yMean);
          denominator += (filteredX[i] - xMean) ** 2;
        }
        const b = numerator / denominator;
        const a = yMean - b * xMean;
        return a + b * x;
      },
      "FORECAST.ETS": () => {
      },
      "FORECAST.ETS.CONFINT": () => {
      },
      "FORECAST.ETS.SEASONALITY": () => {
      },
      "FORECAST.ETS.STAT": () => {
      },
      "FORECAST.LINEAR": (...params) => {
        return DistributionFunctions.FORECAST(...params);
      },
      FREQUENCY: (dataArray, binsArray) => {
        dataArray = H.accept(dataArray, Types.ARRAY, void 0, true, true);
        binsArray = H.accept(binsArray, Types.ARRAY, void 0, true, true);
        const binsArrayFiltered = [];
        for (let i = 0; i < binsArray.length; i++) {
          if (typeof binsArray[i] !== "number")
            continue;
          binsArrayFiltered.push(binsArray[i]);
        }
        binsArrayFiltered.sort();
        binsArrayFiltered.push(Infinity);
        const result = [];
        for (let j = 0; j < binsArrayFiltered.length; j++) {
          result[j] = [];
          result[j][0] = 0;
          for (let i = 0; i < dataArray.length; i++) {
            if (typeof dataArray[i] !== "number") {
              continue;
            }
            const curr = dataArray[i];
            if (curr <= binsArrayFiltered[j]) {
              result[j][0]++;
              dataArray[i] = null;
            }
          }
        }
        return result;
      },
      GAMMA: (x) => {
        x = H.accept(x, Types.NUMBER);
        if (x === 0 || x < 0 && x === Math.trunc(x)) {
          throw FormulaError.NUM;
        }
        return jStat.gammafn(x);
      },
      "GAMMA.DIST": (x, alpha, beta, cumulative) => {
        x = H.accept(x, Types.NUMBER);
        alpha = H.accept(alpha, Types.NUMBER);
        beta = H.accept(beta, Types.NUMBER);
        cumulative = H.accept(cumulative, Types.BOOLEAN);
        if (x < 0 || alpha <= 0 || beta <= 0) {
          throw FormulaError.NUM;
        }
        return cumulative ? jStat.gamma.cdf(x, alpha, beta, true) : jStat.gamma.pdf(x, alpha, beta, false);
      },
      "GAMMA.INV": (probability, alpha, beta) => {
        probability = H.accept(probability, Types.NUMBER);
        alpha = H.accept(alpha, Types.NUMBER);
        beta = H.accept(beta, Types.NUMBER);
        if (probability < 0 || probability > 1 || alpha <= 0 || beta <= 0) {
          throw FormulaError.NUM;
        }
        return jStat.gamma.inv(probability, alpha, beta);
      },
      GAMMALN: (x) => {
        x = H.accept(x, Types.NUMBER);
        if (x <= 0) {
          throw FormulaError.NUM;
        }
        return jStat.gammaln(x);
      },
      "GAMMALN.PRECISE": (x) => {
        x = H.accept(x, Types.NUMBER);
        if (x <= 0) {
          throw FormulaError.NUM;
        }
        return jStat.gammaln(x);
      },
      GAUSS: (z) => {
        z = H.accept(z, Types.NUMBER);
        return jStat.normal.cdf(z, 0, 1) - 0.5;
      },
      GEOMEAN: (...numbers) => {
        const filterArr = [];
        H.flattenParams(numbers, Types.NUMBER, true, (item, info) => {
          if (typeof item === "number") {
            filterArr.push(item);
          }
        });
        return jStat.geomean(filterArr);
      },
      GROWTH: (knownY, knownX, newX, useConst) => {
        knownY = H.accept(knownY, Types.ARRAY, void 0, true, true);
        for (let i = 0; i < knownY.length; i++) {
          if (typeof knownY[i] !== "number")
            throw FormulaError.VALUE;
        }
        knownX = H.accept(knownX, Types.ARRAY, null, true, true);
        const isKnownXOmitted = knownX == null;
        if (knownX == null) {
          knownX = [];
          for (let i = 1; i <= knownY.length; i++) {
            knownX.push(i);
          }
        } else {
          if (knownX.length !== knownY.length)
            throw FormulaError.REF;
          for (let i = 0; i < knownX.length; i++) {
            if (typeof knownX[i] !== "number")
              throw FormulaError.VALUE;
          }
        }
        newX = H.accept(newX, Types.ARRAY, null, false, true);
        if (newX == null && isKnownXOmitted) {
          newX = [];
          for (let i = 1; i <= knownY.length; i++) {
            newX.push(i);
          }
          newX = [newX];
        } else if (newX == null) {
          newX = Array.isArray(knownX[0]) ? knownX : [knownX];
        }
        useConst = H.accept(useConst, Types.BOOLEAN, true);
        const n = knownY.length;
        let avg_x = 0, avg_y = 0, avg_xy = 0, avg_xx = 0;
        for (let i = 0; i < n; i++) {
          const x = knownX[i];
          const y = Math.log(knownY[i]);
          avg_x += x;
          avg_y += y;
          avg_xy += x * y;
          avg_xx += x * x;
        }
        avg_x /= n;
        avg_y /= n;
        avg_xy /= n;
        avg_xx /= n;
        let beta;
        let alpha;
        if (useConst) {
          beta = (avg_xy - avg_x * avg_y) / (avg_xx - avg_x * avg_x);
          alpha = avg_y - beta * avg_x;
        } else {
          beta = avg_xy / avg_xx;
          alpha = 0;
        }
        const new_y = [];
        for (let i = 0; i < newX.length; i++) {
          new_y[i] = [];
          for (let j = 0; j < newX[0].length; j++) {
            if (typeof newX[i][j] !== "number")
              throw FormulaError.VALUE;
            new_y[i][j] = Math.exp(alpha + beta * newX[i][j]);
          }
        }
        return new_y;
      },
      HARMEAN: (...numbers) => {
        let cnt = 0, denominator = 0;
        H.flattenParams(numbers, Types.NUMBER, true, (item, info) => {
          if (typeof item === "number") {
            denominator += 1 / item;
            cnt++;
          }
        });
        return cnt / denominator;
      },
      "HYPGEOM.DIST": (sample_s, number_sample, population_s, number_pop, cumulative) => {
        sample_s = H.accept(sample_s, Types.NUMBER);
        number_sample = H.accept(number_sample, Types.NUMBER);
        population_s = H.accept(population_s, Types.NUMBER);
        number_pop = H.accept(number_pop, Types.NUMBER);
        cumulative = H.accept(cumulative, Types.BOOLEAN);
        sample_s = Math.trunc(sample_s);
        number_sample = Math.trunc(number_sample);
        population_s = Math.trunc(population_s);
        number_pop = Math.trunc(number_pop);
        if (number_pop <= 0 || sample_s < 0 || number_sample <= 0 || population_s <= 0) {
          throw FormulaError.NUM;
        }
        if (number_sample > number_pop) {
          throw FormulaError.NUM;
        }
        if (population_s > number_pop) {
          throw FormulaError.NUM;
        }
        if (number_sample < sample_s || population_s < sample_s) {
          throw FormulaError.NUM;
        }
        if (sample_s < number_sample - number_pop + population_s) {
          throw FormulaError.NUM;
        }
        function pdf(x, n, M, N) {
          return MathFunctions.COMBIN(M, x) * MathFunctions.COMBIN(N - M, n - x) / MathFunctions.COMBIN(N, n);
        }
        function cdf(x, n, M, N) {
          let result = 0;
          for (let i = 0; i <= x; i++) {
            result += pdf(i, n, M, N);
          }
          return result;
        }
        return cumulative ? cdf(sample_s, number_sample, population_s, number_pop) : pdf(sample_s, number_sample, population_s, number_pop);
      },
      INTERCEPT: (knownYs, knownXs) => {
        knownYs = H.accept(knownYs, Types.ARRAY, void 0, true, true);
        knownXs = H.accept(knownXs, Types.ARRAY, void 0, true, true);
        if (knownXs.length !== knownYs.length)
          throw FormulaError.NA;
        const filteredY = [], filteredX = [];
        for (let i = 0; i < knownYs.length; i++) {
          if (typeof knownYs[i] !== "number" || typeof knownXs[i] !== "number")
            continue;
          filteredY.push(knownYs[i]);
          filteredX.push(knownXs[i]);
        }
        if (filteredY.length <= 1)
          throw FormulaError.DIV0;
        const yMean = jStat.mean(filteredY);
        const xMean = jStat.mean(filteredX);
        let numerator = 0, denominator = 0;
        for (let i = 0; i < filteredY.length; i++) {
          numerator += (filteredX[i] - xMean) * (filteredY[i] - yMean);
          denominator += (filteredX[i] - xMean) ** 2;
        }
        const b = numerator / denominator;
        return yMean - b * xMean;
      },
      KURT: (...numbers) => {
        let mean = 0, range = [];
        H.flattenParams(numbers, Types.NUMBER, true, (item, info) => {
          if (typeof item === "number") {
            mean += item;
            range.push(item);
          }
        });
        const n = range.length;
        mean /= n;
        let sigma = 0;
        for (let i = 0; i < n; i++) {
          sigma += Math.pow(range[i] - mean, 4);
        }
        sigma = sigma / Math.pow(jStat.stdev(range, true), 4);
        return n * (n + 1) / ((n - 1) * (n - 2) * (n - 3)) * sigma - 3 * (n - 1) * (n - 1) / ((n - 2) * (n - 3));
      },
      LINEST: () => {
      },
      LOGEST: () => {
      },
      "LOGNORM.DIST": (x, mean, standard_dev, cumulative) => {
        x = H.accept(x, Types.NUMBER);
        mean = H.accept(mean, Types.NUMBER);
        standard_dev = H.accept(standard_dev, Types.NUMBER);
        cumulative = H.accept(cumulative, Types.BOOLEAN);
        if (x <= 0 || standard_dev <= 0) {
          throw FormulaError.NUM;
        }
        return cumulative ? jStat.lognormal.cdf(x, mean, standard_dev) : jStat.lognormal.pdf(x, mean, standard_dev);
      },
      "LOGNORM.INV": (probability, mean, standard_dev) => {
        probability = H.accept(probability, Types.NUMBER);
        mean = H.accept(mean, Types.NUMBER);
        standard_dev = H.accept(standard_dev, Types.NUMBER);
        if (probability <= 0 || probability >= 1) {
          throw FormulaError.NUM;
        }
        if (standard_dev <= 0) {
          throw FormulaError.NUM;
        }
        return jStat.lognormal.inv(probability, mean, standard_dev);
      },
      "MODE.MULT": () => {
      },
      "MODE.SNGL": () => {
      },
      "NEGBINOM.DIST": (number_f, number_s, probability_s, cumulative) => {
        number_f = H.accept(number_f, Types.NUMBER);
        number_s = H.accept(number_s, Types.NUMBER);
        probability_s = H.accept(probability_s, Types.NUMBER);
        cumulative = H.accept(cumulative, Types.BOOLEAN);
        number_f = Math.trunc(number_f);
        number_s = Math.trunc(number_s);
        if (probability_s < 0 || probability_s > 1) {
          throw FormulaError.NUM;
        }
        if (number_f < 0 || number_s < 1) {
          throw FormulaError.NUM;
        }
        return cumulative ? jStat.negbin.cdf(number_f, number_s, probability_s) : jStat.negbin.pdf(number_f, number_s, probability_s);
      },
      "NORM.DIST": (x, mean, standard_dev, cumulative) => {
        x = H.accept(x, Types.NUMBER);
        mean = H.accept(mean, Types.NUMBER);
        standard_dev = H.accept(standard_dev, Types.NUMBER);
        cumulative = H.accept(cumulative, Types.BOOLEAN);
        if (standard_dev <= 0) {
          throw FormulaError.NUM;
        }
        return cumulative ? jStat.normal.cdf(x, mean, standard_dev) : jStat.normal.pdf(x, mean, standard_dev);
      },
      "NORM.INV": (probability, mean, standard_dev) => {
        probability = H.accept(probability, Types.NUMBER);
        mean = H.accept(mean, Types.NUMBER);
        standard_dev = H.accept(standard_dev, Types.NUMBER);
        if (probability <= 0 || probability >= 1) {
          throw FormulaError.NUM;
        }
        if (standard_dev <= 0) {
          throw FormulaError.NUM;
        }
        return jStat.normal.inv(probability, mean, standard_dev);
      },
      "NORM.S.DIST": (z, cumulative) => {
        z = H.accept(z, Types.NUMBER);
        cumulative = H.accept(cumulative, Types.BOOLEAN);
        return cumulative ? jStat.normal.cdf(z, 0, 1) : jStat.normal.pdf(z, 0, 1);
      },
      "NORM.S.INV": (probability) => {
        probability = H.accept(probability, Types.NUMBER);
        if (probability <= 0 || probability >= 1) {
          throw FormulaError.NUM;
        }
        return jStat.normal.inv(probability, 0, 1);
      },
      PEARSON: () => {
      },
      "PERCENTILE.EXC": () => {
      },
      "PERCENTILE.INC": () => {
      },
      "PERCENTRANK.EXC": () => {
      },
      "PERCENTRANK.INC": () => {
      },
      PERMUTATIONA: () => {
      },
      PHI: (x) => {
        x = H.accept(x, Types.NUMBER);
        return Math.exp(-0.5 * x * x) / SQRT2PI;
      },
      "POISSON.DIST": (x, mean, cumulative) => {
        x = H.accept(x, Types.NUMBER);
        mean = H.accept(mean, Types.NUMBER);
        cumulative = H.accept(cumulative, Types.BOOLEAN);
        if (x < 0 || mean < 0) {
          throw FormulaError.NUM;
        }
        x = Math.trunc(x);
        return cumulative ? jStat.poisson.cdf(x, mean) : jStat.poisson.pdf(x, mean);
      },
      "PROB": () => {
      },
      "QUARTILE.EXC": () => {
      },
      "QUARTILE.INC": () => {
      },
      "RANK.AVG": () => {
      },
      "RANK.EQ": () => {
      },
      RSQ: () => {
      },
      SKEW: () => {
      },
      "SKEW.P": () => {
      },
      SLOPE: () => {
      },
      STANDARDIZE: (x, mean, standard_dev) => {
        x = H.accept(x, Types.NUMBER);
        mean = H.accept(mean, Types.NUMBER);
        standard_dev = H.accept(standard_dev, Types.NUMBER);
        if (standard_dev <= 0) {
          throw FormulaError.NUM;
        }
        return (x - mean) / standard_dev;
      },
      "STDEV.P": () => {
      },
      "STDEV.S": () => {
      },
      STDEVA: () => {
      },
      STDEVPA: () => {
      },
      STEYX: () => {
      },
      "T.DIST": (x, deg_freedom, cumulative) => {
        x = H.accept(x, Types.NUMBER);
        deg_freedom = H.accept(deg_freedom, Types.NUMBER);
        cumulative = H.accept(cumulative, Types.BOOLEAN);
        if (deg_freedom < 1) {
          throw FormulaError.NUM;
        }
        return cumulative ? jStat.studentt.cdf(x, deg_freedom) : jStat.studentt.pdf(x, deg_freedom);
      },
      "T.DIST.2T": (x, deg_freedom) => {
        x = H.accept(x, Types.NUMBER);
        deg_freedom = H.accept(deg_freedom, Types.NUMBER);
        if (deg_freedom < 1 || x < 0) {
          throw FormulaError.NUM;
        }
        return (1 - jStat.studentt.cdf(x, deg_freedom)) * 2;
      },
      "T.DIST.RT": (x, deg_freedom) => {
        x = H.accept(x, Types.NUMBER);
        deg_freedom = H.accept(deg_freedom, Types.NUMBER);
        if (deg_freedom < 1) {
          throw FormulaError.NUM;
        }
        return 1 - jStat.studentt.cdf(x, deg_freedom);
      },
      "T.INV": (probability, deg_freedom) => {
        probability = H.accept(probability, Types.NUMBER);
        deg_freedom = H.accept(deg_freedom, Types.NUMBER);
        if (probability <= 0 || probability > 1 || deg_freedom < 1) {
          throw FormulaError.NUM;
        }
        deg_freedom = deg_freedom % 1 === 0 ? deg_freedom : Math.trunc(deg_freedom);
        return jStat.studentt.inv(probability, deg_freedom);
      },
      "T.INV.2T": (probability, deg_freedom) => {
        probability = H.accept(probability, Types.NUMBER);
        deg_freedom = H.accept(deg_freedom, Types.NUMBER);
        if (probability <= 0 || probability > 1 || deg_freedom < 1) {
          throw FormulaError.NUM;
        }
        deg_freedom = deg_freedom % 1 === 0 ? deg_freedom : Math.trunc(deg_freedom);
        return Math.abs(jStat.studentt.inv(probability / 2, deg_freedom));
      },
      "T.TEST": () => {
      },
      TREND: () => {
      },
      TRIMMEAN: () => {
      },
      "VAR.P": () => {
      },
      "VAR.S": () => {
      },
      "VARA": () => {
      },
      "VARPA": () => {
      },
      "WEIBULL.DIST": (x, alpha, beta, cumulative) => {
        x = H.accept(x, Types.NUMBER);
        alpha = H.accept(alpha, Types.NUMBER);
        beta = H.accept(beta, Types.NUMBER);
        cumulative = H.accept(cumulative, Types.BOOLEAN);
        if (x < 0 || alpha <= 0 || beta <= 0) {
          throw FormulaError.NUM;
        }
        return cumulative ? 1 - Math.exp(-Math.pow(x / beta, alpha)) : Math.pow(x, alpha - 1) * Math.exp(-Math.pow(x / beta, alpha)) * alpha / Math.pow(beta, alpha);
      },
      "Z.TEST": () => {
      }
    };
    module2.exports = {
      DistributionFunctions
    };
  }
});

// node_modules/fast-formula-parser/formulas/functions/statistical.js
var require_statistical = __commonJS({
  "node_modules/fast-formula-parser/formulas/functions/statistical.js"(exports2, module2) {
    var FormulaError = require_error();
    var { FormulaHelpers, Types, Criteria, Address } = require_helpers();
    var { Infix } = require_operators();
    var H = FormulaHelpers;
    var { DistributionFunctions } = require_distribution();
    var StatisticalFunctions = {
      AVEDEV: (...numbers) => {
        let sum = 0;
        const arr = [];
        H.flattenParams(numbers, Types.NUMBER, true, (item, info) => {
          if (typeof item === "number") {
            sum += item;
            arr.push(item);
          }
        });
        const avg = sum / arr.length;
        sum = 0;
        for (let i = 0; i < arr.length; i++) {
          sum += Math.abs(arr[i] - avg);
        }
        return sum / arr.length;
      },
      AVERAGE: (...numbers) => {
        let sum = 0, cnt = 0;
        H.flattenParams(numbers, Types.NUMBER, true, (item, info) => {
          if (typeof item === "number") {
            sum += item;
            cnt++;
          }
        });
        return sum / cnt;
      },
      AVERAGEA: (...numbers) => {
        let sum = 0, cnt = 0;
        H.flattenParams(numbers, Types.NUMBER, true, (item, info) => {
          const type = typeof item;
          if (type === "number") {
            sum += item;
            cnt++;
          } else if (type === "string") {
            cnt++;
          }
        });
        return sum / cnt;
      },
      // special
      AVERAGEIF: (context, range, criteria, averageRange) => {
        const ranges = H.retrieveRanges(context, range, averageRange);
        range = ranges[0];
        averageRange = ranges[1];
        criteria = H.retrieveArg(context, criteria);
        const isCriteriaArray = criteria.isArray;
        criteria = Criteria.parse(H.accept(criteria));
        let sum = 0, cnt = 0;
        range.forEach((row, rowNum) => {
          row.forEach((value, colNum) => {
            const valueToAdd = averageRange[rowNum][colNum];
            if (typeof valueToAdd !== "number")
              return;
            if (criteria.op === "wc") {
              if (criteria.match === criteria.value.test(value)) {
                sum += valueToAdd;
                cnt++;
              }
            } else if (Infix.compareOp(value, criteria.op, criteria.value, Array.isArray(value), isCriteriaArray)) {
              sum += valueToAdd;
              cnt++;
            }
          });
        });
        if (cnt === 0) throw FormulaError.DIV0;
        return sum / cnt;
      },
      AVERAGEIFS: () => {
      },
      COUNT: (...ranges) => {
        let cnt = 0;
        H.flattenParams(
          ranges,
          null,
          true,
          (item, info) => {
            if (info.isLiteral && !isNaN(item)) {
              cnt++;
            } else {
              if (typeof item === "number")
                cnt++;
            }
          }
        );
        return cnt;
      },
      COUNTIF: (range, criteria) => {
        range = H.accept(range, Types.ARRAY, void 0, false, true);
        const isCriteriaArray = criteria.isArray;
        criteria = H.accept(criteria);
        let cnt = 0;
        criteria = Criteria.parse(criteria);
        range.forEach((row) => {
          row.forEach((value) => {
            if (criteria.op === "wc") {
              if (criteria.match === criteria.value.test(value))
                cnt++;
            } else if (Infix.compareOp(value, criteria.op, criteria.value, Array.isArray(value), isCriteriaArray)) {
              cnt++;
            }
          });
        });
        return cnt;
      },
      LARGE: () => {
      },
      MAX: () => {
      },
      MAXA: () => {
      },
      MAXIFS: () => {
      },
      MEDIAN: () => {
      },
      MIN: () => {
      },
      MINA: () => {
      },
      MINIFS: () => {
      },
      PERMUT: () => {
      },
      PERMUTATIONA: () => {
      },
      SMALL: () => {
      }
    };
    module2.exports = Object.assign(StatisticalFunctions, DistributionFunctions);
  }
});

// node_modules/fast-formula-parser/formulas/functions/date.js
var require_date = __commonJS({
  "node_modules/fast-formula-parser/formulas/functions/date.js"(exports2, module2) {
    var FormulaError = require_error();
    var { FormulaHelpers, Types } = require_helpers();
    var H = FormulaHelpers;
    var MS_PER_DAY = 1e3 * 60 * 60 * 24;
    var d1900 = new Date(Date.UTC(1900, 0, 1));
    var WEEK_STARTS = [
      void 0,
      0,
      1,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      1,
      2,
      3,
      4,
      5,
      6,
      0
    ];
    var WEEK_TYPES = [
      void 0,
      [1, 2, 3, 4, 5, 6, 7],
      [7, 1, 2, 3, 4, 5, 6],
      [6, 0, 1, 2, 3, 4, 5],
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      [7, 1, 2, 3, 4, 5, 6],
      [6, 7, 1, 2, 3, 4, 5],
      [5, 6, 7, 1, 2, 3, 4],
      [4, 5, 6, 7, 1, 2, 3],
      [3, 4, 5, 6, 7, 1, 2],
      [2, 3, 4, 5, 6, 7, 1],
      [1, 2, 3, 4, 5, 6, 7]
    ];
    var WEEKEND_TYPES = [
      void 0,
      [6, 0],
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      void 0,
      void 0,
      void 0,
      [0],
      [1],
      [2],
      [3],
      [4],
      [5],
      [6]
    ];
    var timeRegex = /^\s*(\d\d?)\s*(:\s*\d\d?)?\s*(:\s*\d\d?)?\s*(pm|am)?\s*$/i;
    var dateRegex1 = /^\s*((\d\d?)\s*([-\/])\s*(\d\d?))([\d:.apm\s]*)$/i;
    var dateRegex2 = /^\s*((\d\d?)\s*([-/])\s*(jan\w*|feb\w*|mar\w*|apr\w*|may\w*|jun\w*|jul\w*|aug\w*|sep\w*|oct\w*|nov\w*|dec\w*))([\d:.apm\s]*)$/i;
    var dateRegex3 = /^\s*((jan\w*|feb\w*|mar\w*|apr\w*|may\w*|jun\w*|jul\w*|aug\w*|sep\w*|oct\w*|nov\w*|dec\w*)\s*([-/])\s*(\d\d?))([\d:.apm\s]*)$/i;
    function parseSimplifiedDate(text2) {
      const fmt1 = text2.match(dateRegex1);
      const fmt2 = text2.match(dateRegex2);
      const fmt3 = text2.match(dateRegex3);
      if (fmt1) {
        text2 = fmt1[1] + fmt1[3] + (/* @__PURE__ */ new Date()).getFullYear() + fmt1[5];
      } else if (fmt2) {
        text2 = fmt2[1] + fmt2[3] + (/* @__PURE__ */ new Date()).getFullYear() + fmt2[5];
      } else if (fmt3) {
        text2 = fmt3[1] + fmt3[3] + (/* @__PURE__ */ new Date()).getFullYear() + fmt3[5];
      }
      return new Date(Date.parse(`${text2} UTC`));
    }
    function parseTime(text2) {
      const res = text2.match(timeRegex);
      if (!res) return;
      const minutes = res[2] ? res[2] : ":00";
      const seconds = res[3] ? res[3] : ":00";
      const ampm = res[4] ? " " + res[4] : "";
      const date = new Date(Date.parse(`1/1/1900 ${res[1] + minutes + seconds + ampm} UTC`));
      let now = /* @__PURE__ */ new Date();
      now = new Date(Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()
      ));
      return new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds()
      ));
    }
    function toSerial(date) {
      const addOn = date > -22038912e5 ? 2 : 1;
      return Math.floor((date - d1900) / 864e5) + addOn;
    }
    function toDate(serial) {
      if (serial < 0) {
        throw FormulaError.VALUE;
      }
      if (serial <= 60) {
        return new Date(d1900.getTime() + (serial - 1) * 864e5);
      }
      return new Date(d1900.getTime() + (serial - 2) * 864e5);
    }
    function parseDateWithExtra(serialOrString) {
      if (serialOrString instanceof Date) return { date: serialOrString };
      serialOrString = H.accept(serialOrString);
      let isDateGiven = true, date;
      if (!isNaN(serialOrString)) {
        serialOrString = Number(serialOrString);
        date = toDate(serialOrString);
      } else {
        date = parseTime(serialOrString);
        if (!date) {
          date = parseSimplifiedDate(serialOrString);
        } else {
          isDateGiven = false;
        }
      }
      return { date, isDateGiven };
    }
    function parseDate(serialOrString) {
      return parseDateWithExtra(serialOrString).date;
    }
    function compareDateIgnoreTime(date1, date2) {
      return date1.getUTCFullYear() === date2.getUTCFullYear() && date1.getUTCMonth() === date2.getUTCMonth() && date1.getUTCDate() === date2.getUTCDate();
    }
    function isLeapYear(year) {
      if (year === 1900) {
        return true;
      }
      return new Date(year, 1, 29).getMonth() === 1;
    }
    var DateFunctions = {
      DATE: (year, month, day) => {
        year = H.accept(year, Types.NUMBER);
        month = H.accept(month, Types.NUMBER);
        day = H.accept(day, Types.NUMBER);
        if (year < 0 || year >= 1e4)
          throw FormulaError.NUM;
        if (year < 1900) {
          year += 1900;
        }
        return toSerial(Date.UTC(year, month - 1, day));
      },
      DATEDIF: (startDate, endDate, unit) => {
        startDate = parseDate(startDate);
        endDate = parseDate(endDate);
        unit = H.accept(unit, Types.STRING).toLowerCase();
        if (startDate > endDate)
          throw FormulaError.NUM;
        const yearDiff = endDate.getUTCFullYear() - startDate.getUTCFullYear();
        const monthDiff = endDate.getUTCMonth() - startDate.getUTCMonth();
        const dayDiff = endDate.getUTCDate() - startDate.getUTCDate();
        let offset;
        switch (unit) {
          case "y":
            offset = monthDiff < 0 || monthDiff === 0 && dayDiff < 0 ? -1 : 0;
            return offset + yearDiff;
          case "m":
            offset = dayDiff < 0 ? -1 : 0;
            return yearDiff * 12 + monthDiff + offset;
          case "d":
            return Math.floor(endDate - startDate) / MS_PER_DAY;
          case "md":
            startDate.setUTCFullYear(endDate.getUTCFullYear());
            if (dayDiff < 0) {
              startDate.setUTCMonth(endDate.getUTCMonth() - 1);
            } else {
              startDate.setUTCMonth(endDate.getUTCMonth());
            }
            return Math.floor(endDate - startDate) / MS_PER_DAY;
          case "ym":
            offset = dayDiff < 0 ? -1 : 0;
            return (offset + yearDiff * 12 + monthDiff) % 12;
          case "yd":
            if (monthDiff < 0 || monthDiff === 0 && dayDiff < 0) {
              startDate.setUTCFullYear(endDate.getUTCFullYear() - 1);
            } else {
              startDate.setUTCFullYear(endDate.getUTCFullYear());
            }
            return Math.floor(endDate - startDate) / MS_PER_DAY;
        }
      },
      /**
       * Limitation: Year must be four digit, only support ISO 8016 date format.
       * Does not support date without year, i.e. "5-JUL".
       * @param {string} dateText
       */
      DATEVALUE: (dateText) => {
        dateText = H.accept(dateText, Types.STRING);
        const { date, isDateGiven } = parseDateWithExtra(dateText);
        if (!isDateGiven) return 0;
        const serial = toSerial(date);
        if (serial < 0 || serial > 2958465)
          throw FormulaError.VALUE;
        return serial;
      },
      DAY: (serialOrString) => {
        const date = parseDate(serialOrString);
        return date.getUTCDate();
      },
      DAYS: (endDate, startDate) => {
        endDate = parseDate(endDate);
        startDate = parseDate(startDate);
        let offset = 0;
        if (startDate < -22038912e5 && -22038912e5 < endDate) {
          offset = 1;
        }
        return Math.floor(endDate - startDate) / MS_PER_DAY + offset;
      },
      DAYS360: (startDate, endDate, method) => {
        startDate = parseDate(startDate);
        endDate = parseDate(endDate);
        method = H.accept(method, Types.BOOLEAN, false);
        if (startDate.getUTCDate() === 31) {
          startDate.setUTCDate(30);
        }
        if (!method && startDate.getUTCDate() < 30 && endDate.getUTCDate() > 30) {
          endDate.setUTCMonth(endDate.getUTCMonth() + 1, 1);
        } else {
          if (endDate.getUTCDate() === 31) {
            endDate.setUTCDate(30);
          }
        }
        const yearDiff = endDate.getUTCFullYear() - startDate.getUTCFullYear();
        const monthDiff = endDate.getUTCMonth() - startDate.getUTCMonth();
        const dayDiff = endDate.getUTCDate() - startDate.getUTCDate();
        return monthDiff * 30 + dayDiff + yearDiff * 12 * 30;
      },
      EDATE: (startDate, months) => {
        startDate = parseDate(startDate);
        months = H.accept(months, Types.NUMBER);
        startDate.setUTCMonth(startDate.getUTCMonth() + months);
        return toSerial(startDate);
      },
      EOMONTH: (startDate, months) => {
        startDate = parseDate(startDate);
        months = H.accept(months, Types.NUMBER);
        startDate.setUTCMonth(startDate.getUTCMonth() + months + 1, 0);
        return toSerial(startDate);
      },
      HOUR: (serialOrString) => {
        const date = parseDate(serialOrString);
        return date.getUTCHours();
      },
      ISOWEEKNUM: (serialOrString) => {
        const date = parseDate(serialOrString);
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay();
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil(((d - yearStart) / 864e5 + 1) / 7);
      },
      MINUTE: (serialOrString) => {
        const date = parseDate(serialOrString);
        return date.getUTCMinutes();
      },
      MONTH: (serialOrString) => {
        const date = parseDate(serialOrString);
        return date.getUTCMonth() + 1;
      },
      NETWORKDAYS: (startDate, endDate, holidays) => {
        startDate = parseDate(startDate);
        endDate = parseDate(endDate);
        let sign = 1;
        if (startDate > endDate) {
          sign = -1;
          const temp = startDate;
          startDate = endDate;
          endDate = temp;
        }
        const holidaysArr = [];
        if (holidays != null) {
          H.flattenParams([holidays], Types.NUMBER, false, (item) => {
            holidaysArr.push(parseDate(item));
          });
        }
        let numWorkDays = 0;
        while (startDate <= endDate) {
          if (startDate.getUTCDay() !== 0 && startDate.getUTCDay() !== 6) {
            let found = false;
            for (let i = 0; i < holidaysArr.length; i++) {
              if (compareDateIgnoreTime(startDate, holidaysArr[i])) {
                found = true;
                break;
              }
            }
            if (!found) numWorkDays++;
          }
          startDate.setUTCDate(startDate.getUTCDate() + 1);
        }
        return sign * numWorkDays;
      },
      "NETWORKDAYS.INTL": (startDate, endDate, weekend, holidays) => {
        startDate = parseDate(startDate);
        endDate = parseDate(endDate);
        let sign = 1;
        if (startDate > endDate) {
          sign = -1;
          const temp = startDate;
          startDate = endDate;
          endDate = temp;
        }
        weekend = H.accept(weekend, null, 1);
        if (weekend === "1111111")
          return 0;
        if (typeof weekend === "string" && Number(weekend).toString() !== weekend) {
          if (weekend.length !== 7) throw FormulaError.VALUE;
          weekend = weekend.charAt(6) + weekend.slice(0, 6);
          const weekendArr = [];
          for (let i = 0; i < weekend.length; i++) {
            if (weekend.charAt(i) === "1")
              weekendArr.push(i);
          }
          weekend = weekendArr;
        } else {
          if (typeof weekend !== "number")
            throw FormulaError.VALUE;
          weekend = WEEKEND_TYPES[weekend];
        }
        const holidaysArr = [];
        if (holidays != null) {
          H.flattenParams([holidays], Types.NUMBER, false, (item) => {
            holidaysArr.push(parseDate(item));
          });
        }
        let numWorkDays = 0;
        while (startDate <= endDate) {
          let skip = false;
          for (let i = 0; i < weekend.length; i++) {
            if (weekend[i] === startDate.getUTCDay()) {
              skip = true;
              break;
            }
          }
          if (!skip) {
            let found = false;
            for (let i = 0; i < holidaysArr.length; i++) {
              if (compareDateIgnoreTime(startDate, holidaysArr[i])) {
                found = true;
                break;
              }
            }
            if (!found) numWorkDays++;
          }
          startDate.setUTCDate(startDate.getUTCDate() + 1);
        }
        return sign * numWorkDays;
      },
      NOW: () => {
        const now = /* @__PURE__ */ new Date();
        return toSerial(Date.UTC(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds(),
          now.getMilliseconds()
        )) + (3600 * now.getHours() + 60 * now.getMinutes() + now.getSeconds()) / 86400;
      },
      SECOND: (serialOrString) => {
        const date = parseDate(serialOrString);
        return date.getUTCSeconds();
      },
      TIME: (hour, minute, second) => {
        hour = H.accept(hour, Types.NUMBER);
        minute = H.accept(minute, Types.NUMBER);
        second = H.accept(second, Types.NUMBER);
        if (hour < 0 || hour > 32767 || minute < 0 || minute > 32767 || second < 0 || second > 32767)
          throw FormulaError.NUM;
        return (3600 * hour + 60 * minute + second) / 86400;
      },
      TIMEVALUE: (timeText) => {
        timeText = parseDate(timeText);
        return (3600 * timeText.getUTCHours() + 60 * timeText.getUTCMinutes() + timeText.getUTCSeconds()) / 86400;
      },
      TODAY: () => {
        const now = /* @__PURE__ */ new Date();
        return toSerial(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
      },
      WEEKDAY: (serialOrString, returnType) => {
        const date = parseDate(serialOrString);
        returnType = H.accept(returnType, Types.NUMBER, 1);
        const day = date.getUTCDay();
        const weekTypes = WEEK_TYPES[returnType];
        if (!weekTypes)
          throw FormulaError.NUM;
        return weekTypes[day];
      },
      WEEKNUM: (serialOrString, returnType) => {
        const date = parseDate(serialOrString);
        returnType = H.accept(returnType, Types.NUMBER, 1);
        if (returnType === 21) {
          return DateFunctions.ISOWEEKNUM(serialOrString);
        }
        const weekStart = WEEK_STARTS[returnType];
        const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        const offset = yearStart.getUTCDay() < weekStart ? 1 : 0;
        return Math.ceil(((date - yearStart) / 864e5 + 1) / 7) + offset;
      },
      WORKDAY: (startDate, days, holidays) => {
        return DateFunctions["WORKDAY.INTL"](startDate, days, 1, holidays);
      },
      "WORKDAY.INTL": (startDate, days, weekend, holidays) => {
        startDate = parseDate(startDate);
        days = H.accept(days, Types.NUMBER);
        weekend = H.accept(weekend, null, 1);
        if (weekend === "1111111")
          throw FormulaError.VALUE;
        if (typeof weekend === "string" && Number(weekend).toString() !== weekend) {
          if (weekend.length !== 7)
            throw FormulaError.VALUE;
          weekend = weekend.charAt(6) + weekend.slice(0, 6);
          const weekendArr = [];
          for (let i = 0; i < weekend.length; i++) {
            if (weekend.charAt(i) === "1")
              weekendArr.push(i);
          }
          weekend = weekendArr;
        } else {
          if (typeof weekend !== "number")
            throw FormulaError.VALUE;
          weekend = WEEKEND_TYPES[weekend];
          if (weekend == null)
            throw FormulaError.NUM;
        }
        const holidaysArr = [];
        if (holidays != null) {
          H.flattenParams([holidays], Types.NUMBER, false, (item) => {
            holidaysArr.push(parseDate(item));
          });
        }
        startDate.setUTCDate(startDate.getUTCDate() + 1);
        let cnt = 0;
        while (cnt < days) {
          let skip = false;
          for (let i = 0; i < weekend.length; i++) {
            if (weekend[i] === startDate.getUTCDay()) {
              skip = true;
              break;
            }
          }
          if (!skip) {
            let found = false;
            for (let i = 0; i < holidaysArr.length; i++) {
              if (compareDateIgnoreTime(startDate, holidaysArr[i])) {
                found = true;
                break;
              }
            }
            if (!found) cnt++;
          }
          startDate.setUTCDate(startDate.getUTCDate() + 1);
        }
        return toSerial(startDate) - 1;
      },
      YEAR: (serialOrString) => {
        const date = parseDate(serialOrString);
        return date.getUTCFullYear();
      },
      // Warning: may have bugs
      YEARFRAC: (startDate, endDate, basis) => {
        startDate = parseDate(startDate);
        endDate = parseDate(endDate);
        if (startDate > endDate) {
          const temp = startDate;
          startDate = endDate;
          endDate = temp;
        }
        basis = H.accept(basis, Types.NUMBER, 0);
        basis = Math.trunc(basis);
        if (basis < 0 || basis > 4)
          throw FormulaError.VALUE;
        let sd = startDate.getUTCDate();
        const sm = startDate.getUTCMonth() + 1;
        const sy = startDate.getUTCFullYear();
        let ed = endDate.getUTCDate();
        const em = endDate.getUTCMonth() + 1;
        const ey = endDate.getUTCFullYear();
        switch (basis) {
          case 0:
            if (sd === 31 && ed === 31) {
              sd = 30;
              ed = 30;
            } else if (sd === 31) {
              sd = 30;
            } else if (sd === 30 && ed === 31) {
              ed = 30;
            }
            return Math.abs(ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / 360;
          case 1:
            if (ey - sy < 2) {
              const yLength = isLeapYear(sy) && sy !== 1900 ? 366 : 365;
              const days = DateFunctions.DAYS(endDate, startDate);
              return days / yLength;
            } else {
              const years = ey - sy + 1;
              const days = (new Date(ey + 1, 0, 1) - new Date(sy, 0, 1)) / 1e3 / 60 / 60 / 24;
              const average = days / years;
              return DateFunctions.DAYS(endDate, startDate) / average;
            }
          case 2:
            return Math.abs(DateFunctions.DAYS(endDate, startDate) / 360);
          case 3:
            return Math.abs(DateFunctions.DAYS(endDate, startDate) / 365);
          case 4:
            return Math.abs(ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / 360;
        }
      }
    };
    module2.exports = DateFunctions;
  }
});

// node_modules/fast-formula-parser/formulas/functions/web.js
var require_web = __commonJS({
  "node_modules/fast-formula-parser/formulas/functions/web.js"(exports2, module2) {
    var FormulaError = require_error();
    var { FormulaHelpers, Types } = require_helpers();
    var H = FormulaHelpers;
    var WebFunctions = {
      ENCODEURL: (text2) => {
        return encodeURIComponent(H.accept(text2, Types.STRING));
      },
      FILTERXML: () => {
      },
      WEBSERVICE: (context, url) => {
        throw FormulaError.ERROR("WEBSERVICE is not supported in sync mode.");
        if (typeof fetch === "function") {
          url = H.accept(url, Types.STRING);
          return fetch(url).then((res) => res.text());
        } else {
          throw FormulaError.ERROR("WEBSERVICE only available to browser with fetch.If you want to use WEBSERVICE in Node.js, please override this function: \nnew FormulaParser({\n    functionsNeedContext: {\n        WEBSERVICE: (context, url) => {...}}\n})");
        }
      }
    };
    module2.exports = WebFunctions;
  }
});

// node_modules/chevrotain/lib/src/version.js
var require_version = __commonJS({
  "node_modules/chevrotain/lib/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.VERSION = void 0;
    exports2.VERSION = "7.1.2";
  }
});

// node_modules/chevrotain/lib/src/utils/utils.js
var require_utils = __commonJS({
  "node_modules/chevrotain/lib/src/utils/utils.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.peek = exports.toFastProperties = exports.applyMixins = exports.isES2015MapSupported = exports.PRINT_WARNING = exports.PRINT_ERROR = exports.packArray = exports.IDENTITY = exports.NOOP = exports.merge = exports.groupBy = exports.defaults = exports.assignNoOverwrite = exports.assign = exports.zipObject = exports.sortBy = exports.indexOf = exports.some = exports.difference = exports.every = exports.isObject = exports.isRegExp = exports.isArray = exports.partial = exports.uniq = exports.compact = exports.reduce = exports.findAll = exports.find = exports.cloneObj = exports.cloneArr = exports.contains = exports.has = exports.pick = exports.reject = exports.filter = exports.dropRight = exports.drop = exports.isFunction = exports.isUndefined = exports.isString = exports.forEach = exports.last = exports.first = exports.flatten = exports.map = exports.mapValues = exports.values = exports.keys = exports.isEmpty = void 0;
    exports.timer = void 0;
    function isEmpty(arr) {
      return arr && arr.length === 0;
    }
    exports.isEmpty = isEmpty;
    function keys(obj) {
      if (obj === void 0 || obj === null) {
        return [];
      }
      return Object.keys(obj);
    }
    exports.keys = keys;
    function values(obj) {
      var vals = [];
      var keys2 = Object.keys(obj);
      for (var i = 0; i < keys2.length; i++) {
        vals.push(obj[keys2[i]]);
      }
      return vals;
    }
    exports.values = values;
    function mapValues(obj, callback) {
      var result = [];
      var objKeys = keys(obj);
      for (var idx = 0; idx < objKeys.length; idx++) {
        var currKey = objKeys[idx];
        result.push(callback.call(null, obj[currKey], currKey));
      }
      return result;
    }
    exports.mapValues = mapValues;
    function map(arr, callback) {
      var result = [];
      for (var idx = 0; idx < arr.length; idx++) {
        result.push(callback.call(null, arr[idx], idx));
      }
      return result;
    }
    exports.map = map;
    function flatten(arr) {
      var result = [];
      for (var idx = 0; idx < arr.length; idx++) {
        var currItem = arr[idx];
        if (Array.isArray(currItem)) {
          result = result.concat(flatten(currItem));
        } else {
          result.push(currItem);
        }
      }
      return result;
    }
    exports.flatten = flatten;
    function first(arr) {
      return isEmpty(arr) ? void 0 : arr[0];
    }
    exports.first = first;
    function last(arr) {
      var len = arr && arr.length;
      return len ? arr[len - 1] : void 0;
    }
    exports.last = last;
    function forEach(collection, iteratorCallback) {
      if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
          iteratorCallback.call(null, collection[i], i);
        }
      } else if (isObject(collection)) {
        var colKeys = keys(collection);
        for (var i = 0; i < colKeys.length; i++) {
          var key = colKeys[i];
          var value = collection[key];
          iteratorCallback.call(null, value, key);
        }
      } else {
        throw Error("non exhaustive match");
      }
    }
    exports.forEach = forEach;
    function isString(item) {
      return typeof item === "string";
    }
    exports.isString = isString;
    function isUndefined(item) {
      return item === void 0;
    }
    exports.isUndefined = isUndefined;
    function isFunction(item) {
      return item instanceof Function;
    }
    exports.isFunction = isFunction;
    function drop(arr, howMuch) {
      if (howMuch === void 0) {
        howMuch = 1;
      }
      return arr.slice(howMuch, arr.length);
    }
    exports.drop = drop;
    function dropRight(arr, howMuch) {
      if (howMuch === void 0) {
        howMuch = 1;
      }
      return arr.slice(0, arr.length - howMuch);
    }
    exports.dropRight = dropRight;
    function filter(arr, predicate) {
      var result = [];
      if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i];
          if (predicate.call(null, item)) {
            result.push(item);
          }
        }
      }
      return result;
    }
    exports.filter = filter;
    function reject(arr, predicate) {
      return filter(arr, function(item) {
        return !predicate(item);
      });
    }
    exports.reject = reject;
    function pick(obj, predicate) {
      var keys2 = Object.keys(obj);
      var result = {};
      for (var i = 0; i < keys2.length; i++) {
        var currKey = keys2[i];
        var currItem = obj[currKey];
        if (predicate(currItem)) {
          result[currKey] = currItem;
        }
      }
      return result;
    }
    exports.pick = pick;
    function has(obj, prop) {
      if (isObject(obj)) {
        return obj.hasOwnProperty(prop);
      }
      return false;
    }
    exports.has = has;
    function contains(arr, item) {
      return find(arr, function(currItem) {
        return currItem === item;
      }) !== void 0 ? true : false;
    }
    exports.contains = contains;
    function cloneArr(arr) {
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        newArr.push(arr[i]);
      }
      return newArr;
    }
    exports.cloneArr = cloneArr;
    function cloneObj(obj) {
      var clonedObj = {};
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          clonedObj[key] = obj[key];
        }
      }
      return clonedObj;
    }
    exports.cloneObj = cloneObj;
    function find(arr, predicate) {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (predicate.call(null, item)) {
          return item;
        }
      }
      return void 0;
    }
    exports.find = find;
    function findAll(arr, predicate) {
      var found = [];
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (predicate.call(null, item)) {
          found.push(item);
        }
      }
      return found;
    }
    exports.findAll = findAll;
    function reduce(arrOrObj, iterator, initial) {
      var isArr = Array.isArray(arrOrObj);
      var vals = isArr ? arrOrObj : values(arrOrObj);
      var objKeys = isArr ? [] : keys(arrOrObj);
      var accumulator = initial;
      for (var i = 0; i < vals.length; i++) {
        accumulator = iterator.call(null, accumulator, vals[i], isArr ? i : objKeys[i]);
      }
      return accumulator;
    }
    exports.reduce = reduce;
    function compact(arr) {
      return reject(arr, function(item) {
        return item === null || item === void 0;
      });
    }
    exports.compact = compact;
    function uniq(arr, identity) {
      if (identity === void 0) {
        identity = function(item) {
          return item;
        };
      }
      var identities = [];
      return reduce(arr, function(result, currItem) {
        var currIdentity = identity(currItem);
        if (contains(identities, currIdentity)) {
          return result;
        } else {
          identities.push(currIdentity);
          return result.concat(currItem);
        }
      }, []);
    }
    exports.uniq = uniq;
    function partial(func) {
      var restArgs = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        restArgs[_i - 1] = arguments[_i];
      }
      var firstArg = [null];
      var allArgs = firstArg.concat(restArgs);
      return Function.bind.apply(func, allArgs);
    }
    exports.partial = partial;
    function isArray(obj) {
      return Array.isArray(obj);
    }
    exports.isArray = isArray;
    function isRegExp(obj) {
      return obj instanceof RegExp;
    }
    exports.isRegExp = isRegExp;
    function isObject(obj) {
      return obj instanceof Object;
    }
    exports.isObject = isObject;
    function every(arr, predicate) {
      for (var i = 0; i < arr.length; i++) {
        if (!predicate(arr[i], i)) {
          return false;
        }
      }
      return true;
    }
    exports.every = every;
    function difference(arr, values2) {
      return reject(arr, function(item) {
        return contains(values2, item);
      });
    }
    exports.difference = difference;
    function some(arr, predicate) {
      for (var i = 0; i < arr.length; i++) {
        if (predicate(arr[i])) {
          return true;
        }
      }
      return false;
    }
    exports.some = some;
    function indexOf(arr, value) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
          return i;
        }
      }
      return -1;
    }
    exports.indexOf = indexOf;
    function sortBy(arr, orderFunc) {
      var result = cloneArr(arr);
      result.sort(function(a, b) {
        return orderFunc(a) - orderFunc(b);
      });
      return result;
    }
    exports.sortBy = sortBy;
    function zipObject(keys2, values2) {
      if (keys2.length !== values2.length) {
        throw Error("can't zipObject with different number of keys and values!");
      }
      var result = {};
      for (var i = 0; i < keys2.length; i++) {
        result[keys2[i]] = values2[i];
      }
      return result;
    }
    exports.zipObject = zipObject;
    function assign(target) {
      var sources = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
      }
      for (var i = 0; i < sources.length; i++) {
        var curSource = sources[i];
        var currSourceKeys = keys(curSource);
        for (var j = 0; j < currSourceKeys.length; j++) {
          var currKey = currSourceKeys[j];
          target[currKey] = curSource[currKey];
        }
      }
      return target;
    }
    exports.assign = assign;
    function assignNoOverwrite(target) {
      var sources = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
      }
      for (var i = 0; i < sources.length; i++) {
        var curSource = sources[i];
        var currSourceKeys = keys(curSource);
        for (var j = 0; j < currSourceKeys.length; j++) {
          var currKey = currSourceKeys[j];
          if (!has(target, currKey)) {
            target[currKey] = curSource[currKey];
          }
        }
      }
      return target;
    }
    exports.assignNoOverwrite = assignNoOverwrite;
    function defaults() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
      }
      return assignNoOverwrite.apply(null, [{}].concat(sources));
    }
    exports.defaults = defaults;
    function groupBy(arr, groupKeyFunc) {
      var result = {};
      forEach(arr, function(item) {
        var currGroupKey = groupKeyFunc(item);
        var currGroupArr = result[currGroupKey];
        if (currGroupArr) {
          currGroupArr.push(item);
        } else {
          result[currGroupKey] = [item];
        }
      });
      return result;
    }
    exports.groupBy = groupBy;
    function merge(obj1, obj2) {
      var result = cloneObj(obj1);
      var keys2 = keys(obj2);
      for (var i = 0; i < keys2.length; i++) {
        var key = keys2[i];
        var value = obj2[key];
        result[key] = value;
      }
      return result;
    }
    exports.merge = merge;
    function NOOP() {
    }
    exports.NOOP = NOOP;
    function IDENTITY(item) {
      return item;
    }
    exports.IDENTITY = IDENTITY;
    function packArray(holeyArr) {
      var result = [];
      for (var i = 0; i < holeyArr.length; i++) {
        var orgValue = holeyArr[i];
        result.push(orgValue !== void 0 ? orgValue : void 0);
      }
      return result;
    }
    exports.packArray = packArray;
    function PRINT_ERROR(msg) {
      if (console && console.error) {
        console.error("Error: " + msg);
      }
    }
    exports.PRINT_ERROR = PRINT_ERROR;
    function PRINT_WARNING(msg) {
      if (console && console.warn) {
        console.warn("Warning: " + msg);
      }
    }
    exports.PRINT_WARNING = PRINT_WARNING;
    function isES2015MapSupported() {
      return typeof Map === "function";
    }
    exports.isES2015MapSupported = isES2015MapSupported;
    function applyMixins(derivedCtor, baseCtors) {
      baseCtors.forEach(function(baseCtor) {
        var baseProto = baseCtor.prototype;
        Object.getOwnPropertyNames(baseProto).forEach(function(propName) {
          if (propName === "constructor") {
            return;
          }
          var basePropDescriptor = Object.getOwnPropertyDescriptor(baseProto, propName);
          if (basePropDescriptor && (basePropDescriptor.get || basePropDescriptor.set)) {
            Object.defineProperty(derivedCtor.prototype, propName, basePropDescriptor);
          } else {
            derivedCtor.prototype[propName] = baseCtor.prototype[propName];
          }
        });
      });
    }
    exports.applyMixins = applyMixins;
    function toFastProperties(toBecomeFast) {
      function FakeConstructor() {
      }
      FakeConstructor.prototype = toBecomeFast;
      var fakeInstance = new FakeConstructor();
      function fakeAccess() {
        return typeof fakeInstance.bar;
      }
      fakeAccess();
      fakeAccess();
      return toBecomeFast;
      eval(toBecomeFast);
    }
    exports.toFastProperties = toFastProperties;
    function peek(arr) {
      return arr[arr.length - 1];
    }
    exports.peek = peek;
    function timer(func) {
      var start = (/* @__PURE__ */ new Date()).getTime();
      var val = func();
      var end = (/* @__PURE__ */ new Date()).getTime();
      var total = end - start;
      return { time: total, value: val };
    }
    exports.timer = timer;
  }
});

// node_modules/regexp-to-ast/lib/regexp-to-ast.js
var require_regexp_to_ast = __commonJS({
  "node_modules/regexp-to-ast/lib/regexp-to-ast.js"(exports2, module2) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define([], factory);
      } else if (typeof module2 === "object" && module2.exports) {
        module2.exports = factory();
      } else {
        root.regexpToAst = factory();
      }
    })(
      typeof self !== "undefined" ? (
        // istanbul ignore next
        self
      ) : exports2,
      function() {
        function RegExpParser() {
        }
        RegExpParser.prototype.saveState = function() {
          return {
            idx: this.idx,
            input: this.input,
            groupIdx: this.groupIdx
          };
        };
        RegExpParser.prototype.restoreState = function(newState) {
          this.idx = newState.idx;
          this.input = newState.input;
          this.groupIdx = newState.groupIdx;
        };
        RegExpParser.prototype.pattern = function(input) {
          this.idx = 0;
          this.input = input;
          this.groupIdx = 0;
          this.consumeChar("/");
          var value = this.disjunction();
          this.consumeChar("/");
          var flags = {
            type: "Flags",
            loc: { begin: this.idx, end: input.length },
            global: false,
            ignoreCase: false,
            multiLine: false,
            unicode: false,
            sticky: false
          };
          while (this.isRegExpFlag()) {
            switch (this.popChar()) {
              case "g":
                addFlag(flags, "global");
                break;
              case "i":
                addFlag(flags, "ignoreCase");
                break;
              case "m":
                addFlag(flags, "multiLine");
                break;
              case "u":
                addFlag(flags, "unicode");
                break;
              case "y":
                addFlag(flags, "sticky");
                break;
            }
          }
          if (this.idx !== this.input.length) {
            throw Error(
              "Redundant input: " + this.input.substring(this.idx)
            );
          }
          return {
            type: "Pattern",
            flags,
            value,
            loc: this.loc(0)
          };
        };
        RegExpParser.prototype.disjunction = function() {
          var alts = [];
          var begin = this.idx;
          alts.push(this.alternative());
          while (this.peekChar() === "|") {
            this.consumeChar("|");
            alts.push(this.alternative());
          }
          return { type: "Disjunction", value: alts, loc: this.loc(begin) };
        };
        RegExpParser.prototype.alternative = function() {
          var terms = [];
          var begin = this.idx;
          while (this.isTerm()) {
            terms.push(this.term());
          }
          return { type: "Alternative", value: terms, loc: this.loc(begin) };
        };
        RegExpParser.prototype.term = function() {
          if (this.isAssertion()) {
            return this.assertion();
          } else {
            return this.atom();
          }
        };
        RegExpParser.prototype.assertion = function() {
          var begin = this.idx;
          switch (this.popChar()) {
            case "^":
              return {
                type: "StartAnchor",
                loc: this.loc(begin)
              };
            case "$":
              return { type: "EndAnchor", loc: this.loc(begin) };
            case "\\":
              switch (this.popChar()) {
                case "b":
                  return {
                    type: "WordBoundary",
                    loc: this.loc(begin)
                  };
                case "B":
                  return {
                    type: "NonWordBoundary",
                    loc: this.loc(begin)
                  };
              }
              throw Error("Invalid Assertion Escape");
            case "(":
              this.consumeChar("?");
              var type;
              switch (this.popChar()) {
                case "=":
                  type = "Lookahead";
                  break;
                case "!":
                  type = "NegativeLookahead";
                  break;
              }
              ASSERT_EXISTS(type);
              var disjunction = this.disjunction();
              this.consumeChar(")");
              return {
                type,
                value: disjunction,
                loc: this.loc(begin)
              };
          }
          ASSERT_NEVER_REACH_HERE();
        };
        RegExpParser.prototype.quantifier = function(isBacktracking) {
          var range;
          var begin = this.idx;
          switch (this.popChar()) {
            case "*":
              range = {
                atLeast: 0,
                atMost: Infinity
              };
              break;
            case "+":
              range = {
                atLeast: 1,
                atMost: Infinity
              };
              break;
            case "?":
              range = {
                atLeast: 0,
                atMost: 1
              };
              break;
            case "{":
              var atLeast = this.integerIncludingZero();
              switch (this.popChar()) {
                case "}":
                  range = {
                    atLeast,
                    atMost: atLeast
                  };
                  break;
                case ",":
                  var atMost;
                  if (this.isDigit()) {
                    atMost = this.integerIncludingZero();
                    range = {
                      atLeast,
                      atMost
                    };
                  } else {
                    range = {
                      atLeast,
                      atMost: Infinity
                    };
                  }
                  this.consumeChar("}");
                  break;
              }
              if (isBacktracking === true && range === void 0) {
                return void 0;
              }
              ASSERT_EXISTS(range);
              break;
          }
          if (isBacktracking === true && range === void 0) {
            return void 0;
          }
          ASSERT_EXISTS(range);
          if (this.peekChar(0) === "?") {
            this.consumeChar("?");
            range.greedy = false;
          } else {
            range.greedy = true;
          }
          range.type = "Quantifier";
          range.loc = this.loc(begin);
          return range;
        };
        RegExpParser.prototype.atom = function() {
          var atom;
          var begin = this.idx;
          switch (this.peekChar()) {
            case ".":
              atom = this.dotAll();
              break;
            case "\\":
              atom = this.atomEscape();
              break;
            case "[":
              atom = this.characterClass();
              break;
            case "(":
              atom = this.group();
              break;
          }
          if (atom === void 0 && this.isPatternCharacter()) {
            atom = this.patternCharacter();
          }
          ASSERT_EXISTS(atom);
          atom.loc = this.loc(begin);
          if (this.isQuantifier()) {
            atom.quantifier = this.quantifier();
          }
          return atom;
        };
        RegExpParser.prototype.dotAll = function() {
          this.consumeChar(".");
          return {
            type: "Set",
            complement: true,
            value: [cc("\n"), cc("\r"), cc("\u2028"), cc("\u2029")]
          };
        };
        RegExpParser.prototype.atomEscape = function() {
          this.consumeChar("\\");
          switch (this.peekChar()) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              return this.decimalEscapeAtom();
            case "d":
            case "D":
            case "s":
            case "S":
            case "w":
            case "W":
              return this.characterClassEscape();
            case "f":
            case "n":
            case "r":
            case "t":
            case "v":
              return this.controlEscapeAtom();
            case "c":
              return this.controlLetterEscapeAtom();
            case "0":
              return this.nulCharacterAtom();
            case "x":
              return this.hexEscapeSequenceAtom();
            case "u":
              return this.regExpUnicodeEscapeSequenceAtom();
            default:
              return this.identityEscapeAtom();
          }
        };
        RegExpParser.prototype.decimalEscapeAtom = function() {
          var value = this.positiveInteger();
          return { type: "GroupBackReference", value };
        };
        RegExpParser.prototype.characterClassEscape = function() {
          var set;
          var complement = false;
          switch (this.popChar()) {
            case "d":
              set = digitsCharCodes;
              break;
            case "D":
              set = digitsCharCodes;
              complement = true;
              break;
            case "s":
              set = whitespaceCodes;
              break;
            case "S":
              set = whitespaceCodes;
              complement = true;
              break;
            case "w":
              set = wordCharCodes;
              break;
            case "W":
              set = wordCharCodes;
              complement = true;
              break;
          }
          ASSERT_EXISTS(set);
          return { type: "Set", value: set, complement };
        };
        RegExpParser.prototype.controlEscapeAtom = function() {
          var escapeCode;
          switch (this.popChar()) {
            case "f":
              escapeCode = cc("\f");
              break;
            case "n":
              escapeCode = cc("\n");
              break;
            case "r":
              escapeCode = cc("\r");
              break;
            case "t":
              escapeCode = cc("	");
              break;
            case "v":
              escapeCode = cc("\v");
              break;
          }
          ASSERT_EXISTS(escapeCode);
          return { type: "Character", value: escapeCode };
        };
        RegExpParser.prototype.controlLetterEscapeAtom = function() {
          this.consumeChar("c");
          var letter = this.popChar();
          if (/[a-zA-Z]/.test(letter) === false) {
            throw Error("Invalid ");
          }
          var letterCode = letter.toUpperCase().charCodeAt(0) - 64;
          return { type: "Character", value: letterCode };
        };
        RegExpParser.prototype.nulCharacterAtom = function() {
          this.consumeChar("0");
          return { type: "Character", value: cc("\0") };
        };
        RegExpParser.prototype.hexEscapeSequenceAtom = function() {
          this.consumeChar("x");
          return this.parseHexDigits(2);
        };
        RegExpParser.prototype.regExpUnicodeEscapeSequenceAtom = function() {
          this.consumeChar("u");
          return this.parseHexDigits(4);
        };
        RegExpParser.prototype.identityEscapeAtom = function() {
          var escapedChar = this.popChar();
          return { type: "Character", value: cc(escapedChar) };
        };
        RegExpParser.prototype.classPatternCharacterAtom = function() {
          switch (this.peekChar()) {
            case "\n":
            case "\r":
            case "\u2028":
            case "\u2029":
            case "\\":
            case "]":
              throw Error("TBD");
            default:
              var nextChar = this.popChar();
              return { type: "Character", value: cc(nextChar) };
          }
        };
        RegExpParser.prototype.characterClass = function() {
          var set = [];
          var complement = false;
          this.consumeChar("[");
          if (this.peekChar(0) === "^") {
            this.consumeChar("^");
            complement = true;
          }
          while (this.isClassAtom()) {
            var from = this.classAtom();
            var isFromSingleChar = from.type === "Character";
            if (isFromSingleChar && this.isRangeDash()) {
              this.consumeChar("-");
              var to = this.classAtom();
              var isToSingleChar = to.type === "Character";
              if (isToSingleChar) {
                if (to.value < from.value) {
                  throw Error("Range out of order in character class");
                }
                set.push({ from: from.value, to: to.value });
              } else {
                insertToSet(from.value, set);
                set.push(cc("-"));
                insertToSet(to.value, set);
              }
            } else {
              insertToSet(from.value, set);
            }
          }
          this.consumeChar("]");
          return { type: "Set", complement, value: set };
        };
        RegExpParser.prototype.classAtom = function() {
          switch (this.peekChar()) {
            case "]":
            case "\n":
            case "\r":
            case "\u2028":
            case "\u2029":
              throw Error("TBD");
            case "\\":
              return this.classEscape();
            default:
              return this.classPatternCharacterAtom();
          }
        };
        RegExpParser.prototype.classEscape = function() {
          this.consumeChar("\\");
          switch (this.peekChar()) {
            case "b":
              this.consumeChar("b");
              return { type: "Character", value: cc("\b") };
            case "d":
            case "D":
            case "s":
            case "S":
            case "w":
            case "W":
              return this.characterClassEscape();
            case "f":
            case "n":
            case "r":
            case "t":
            case "v":
              return this.controlEscapeAtom();
            case "c":
              return this.controlLetterEscapeAtom();
            case "0":
              return this.nulCharacterAtom();
            case "x":
              return this.hexEscapeSequenceAtom();
            case "u":
              return this.regExpUnicodeEscapeSequenceAtom();
            default:
              return this.identityEscapeAtom();
          }
        };
        RegExpParser.prototype.group = function() {
          var capturing = true;
          this.consumeChar("(");
          switch (this.peekChar(0)) {
            case "?":
              this.consumeChar("?");
              this.consumeChar(":");
              capturing = false;
              break;
            default:
              this.groupIdx++;
              break;
          }
          var value = this.disjunction();
          this.consumeChar(")");
          var groupAst = {
            type: "Group",
            capturing,
            value
          };
          if (capturing) {
            groupAst.idx = this.groupIdx;
          }
          return groupAst;
        };
        RegExpParser.prototype.positiveInteger = function() {
          var number = this.popChar();
          if (decimalPatternNoZero.test(number) === false) {
            throw Error("Expecting a positive integer");
          }
          while (decimalPattern.test(this.peekChar(0))) {
            number += this.popChar();
          }
          return parseInt(number, 10);
        };
        RegExpParser.prototype.integerIncludingZero = function() {
          var number = this.popChar();
          if (decimalPattern.test(number) === false) {
            throw Error("Expecting an integer");
          }
          while (decimalPattern.test(this.peekChar(0))) {
            number += this.popChar();
          }
          return parseInt(number, 10);
        };
        RegExpParser.prototype.patternCharacter = function() {
          var nextChar = this.popChar();
          switch (nextChar) {
            case "\n":
            case "\r":
            case "\u2028":
            case "\u2029":
            case "^":
            case "$":
            case "\\":
            case ".":
            case "*":
            case "+":
            case "?":
            case "(":
            case ")":
            case "[":
            case "|":
              throw Error("TBD");
            default:
              return { type: "Character", value: cc(nextChar) };
          }
        };
        RegExpParser.prototype.isRegExpFlag = function() {
          switch (this.peekChar(0)) {
            case "g":
            case "i":
            case "m":
            case "u":
            case "y":
              return true;
            default:
              return false;
          }
        };
        RegExpParser.prototype.isRangeDash = function() {
          return this.peekChar() === "-" && this.isClassAtom(1);
        };
        RegExpParser.prototype.isDigit = function() {
          return decimalPattern.test(this.peekChar(0));
        };
        RegExpParser.prototype.isClassAtom = function(howMuch) {
          if (howMuch === void 0) {
            howMuch = 0;
          }
          switch (this.peekChar(howMuch)) {
            case "]":
            case "\n":
            case "\r":
            case "\u2028":
            case "\u2029":
              return false;
            default:
              return true;
          }
        };
        RegExpParser.prototype.isTerm = function() {
          return this.isAtom() || this.isAssertion();
        };
        RegExpParser.prototype.isAtom = function() {
          if (this.isPatternCharacter()) {
            return true;
          }
          switch (this.peekChar(0)) {
            case ".":
            case "\\":
            case "[":
            case "(":
              return true;
            default:
              return false;
          }
        };
        RegExpParser.prototype.isAssertion = function() {
          switch (this.peekChar(0)) {
            case "^":
            case "$":
              return true;
            case "\\":
              switch (this.peekChar(1)) {
                case "b":
                case "B":
                  return true;
                default:
                  return false;
              }
            case "(":
              return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!");
            default:
              return false;
          }
        };
        RegExpParser.prototype.isQuantifier = function() {
          var prevState = this.saveState();
          try {
            return this.quantifier(true) !== void 0;
          } catch (e) {
            return false;
          } finally {
            this.restoreState(prevState);
          }
        };
        RegExpParser.prototype.isPatternCharacter = function() {
          switch (this.peekChar()) {
            case "^":
            case "$":
            case "\\":
            case ".":
            case "*":
            case "+":
            case "?":
            case "(":
            case ")":
            case "[":
            case "|":
            case "/":
            case "\n":
            case "\r":
            case "\u2028":
            case "\u2029":
              return false;
            default:
              return true;
          }
        };
        RegExpParser.prototype.parseHexDigits = function(howMany) {
          var hexString = "";
          for (var i2 = 0; i2 < howMany; i2++) {
            var hexChar = this.popChar();
            if (hexDigitPattern.test(hexChar) === false) {
              throw Error("Expecting a HexDecimal digits");
            }
            hexString += hexChar;
          }
          var charCode = parseInt(hexString, 16);
          return { type: "Character", value: charCode };
        };
        RegExpParser.prototype.peekChar = function(howMuch) {
          if (howMuch === void 0) {
            howMuch = 0;
          }
          return this.input[this.idx + howMuch];
        };
        RegExpParser.prototype.popChar = function() {
          var nextChar = this.peekChar(0);
          this.consumeChar();
          return nextChar;
        };
        RegExpParser.prototype.consumeChar = function(char) {
          if (char !== void 0 && this.input[this.idx] !== char) {
            throw Error(
              "Expected: '" + char + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx
            );
          }
          if (this.idx >= this.input.length) {
            throw Error("Unexpected end of input");
          }
          this.idx++;
        };
        RegExpParser.prototype.loc = function(begin) {
          return { begin, end: this.idx };
        };
        var hexDigitPattern = /[0-9a-fA-F]/;
        var decimalPattern = /[0-9]/;
        var decimalPatternNoZero = /[1-9]/;
        function cc(char) {
          return char.charCodeAt(0);
        }
        function insertToSet(item, set) {
          if (item.length !== void 0) {
            item.forEach(function(subItem) {
              set.push(subItem);
            });
          } else {
            set.push(item);
          }
        }
        function addFlag(flagObj, flagKey) {
          if (flagObj[flagKey] === true) {
            throw "duplicate flag " + flagKey;
          }
          flagObj[flagKey] = true;
        }
        function ASSERT_EXISTS(obj) {
          if (obj === void 0) {
            throw Error("Internal Error - Should never get here!");
          }
        }
        function ASSERT_NEVER_REACH_HERE() {
          throw Error("Internal Error - Should never get here!");
        }
        var i;
        var digitsCharCodes = [];
        for (i = cc("0"); i <= cc("9"); i++) {
          digitsCharCodes.push(i);
        }
        var wordCharCodes = [cc("_")].concat(digitsCharCodes);
        for (i = cc("a"); i <= cc("z"); i++) {
          wordCharCodes.push(i);
        }
        for (i = cc("A"); i <= cc("Z"); i++) {
          wordCharCodes.push(i);
        }
        var whitespaceCodes = [
          cc(" "),
          cc("\f"),
          cc("\n"),
          cc("\r"),
          cc("	"),
          cc("\v"),
          cc("	"),
          cc("\xA0"),
          cc("\u1680"),
          cc("\u2000"),
          cc("\u2001"),
          cc("\u2002"),
          cc("\u2003"),
          cc("\u2004"),
          cc("\u2005"),
          cc("\u2006"),
          cc("\u2007"),
          cc("\u2008"),
          cc("\u2009"),
          cc("\u200A"),
          cc("\u2028"),
          cc("\u2029"),
          cc("\u202F"),
          cc("\u205F"),
          cc("\u3000"),
          cc("\uFEFF")
        ];
        function BaseRegExpVisitor() {
        }
        BaseRegExpVisitor.prototype.visitChildren = function(node) {
          for (var key in node) {
            var child = node[key];
            if (node.hasOwnProperty(key)) {
              if (child.type !== void 0) {
                this.visit(child);
              } else if (Array.isArray(child)) {
                child.forEach(function(subChild) {
                  this.visit(subChild);
                }, this);
              }
            }
          }
        };
        BaseRegExpVisitor.prototype.visit = function(node) {
          switch (node.type) {
            case "Pattern":
              this.visitPattern(node);
              break;
            case "Flags":
              this.visitFlags(node);
              break;
            case "Disjunction":
              this.visitDisjunction(node);
              break;
            case "Alternative":
              this.visitAlternative(node);
              break;
            case "StartAnchor":
              this.visitStartAnchor(node);
              break;
            case "EndAnchor":
              this.visitEndAnchor(node);
              break;
            case "WordBoundary":
              this.visitWordBoundary(node);
              break;
            case "NonWordBoundary":
              this.visitNonWordBoundary(node);
              break;
            case "Lookahead":
              this.visitLookahead(node);
              break;
            case "NegativeLookahead":
              this.visitNegativeLookahead(node);
              break;
            case "Character":
              this.visitCharacter(node);
              break;
            case "Set":
              this.visitSet(node);
              break;
            case "Group":
              this.visitGroup(node);
              break;
            case "GroupBackReference":
              this.visitGroupBackReference(node);
              break;
            case "Quantifier":
              this.visitQuantifier(node);
              break;
          }
          this.visitChildren(node);
        };
        BaseRegExpVisitor.prototype.visitPattern = function(node) {
        };
        BaseRegExpVisitor.prototype.visitFlags = function(node) {
        };
        BaseRegExpVisitor.prototype.visitDisjunction = function(node) {
        };
        BaseRegExpVisitor.prototype.visitAlternative = function(node) {
        };
        BaseRegExpVisitor.prototype.visitStartAnchor = function(node) {
        };
        BaseRegExpVisitor.prototype.visitEndAnchor = function(node) {
        };
        BaseRegExpVisitor.prototype.visitWordBoundary = function(node) {
        };
        BaseRegExpVisitor.prototype.visitNonWordBoundary = function(node) {
        };
        BaseRegExpVisitor.prototype.visitLookahead = function(node) {
        };
        BaseRegExpVisitor.prototype.visitNegativeLookahead = function(node) {
        };
        BaseRegExpVisitor.prototype.visitCharacter = function(node) {
        };
        BaseRegExpVisitor.prototype.visitSet = function(node) {
        };
        BaseRegExpVisitor.prototype.visitGroup = function(node) {
        };
        BaseRegExpVisitor.prototype.visitGroupBackReference = function(node) {
        };
        BaseRegExpVisitor.prototype.visitQuantifier = function(node) {
        };
        return {
          RegExpParser,
          BaseRegExpVisitor,
          VERSION: "0.5.0"
        };
      }
    );
  }
});

// node_modules/chevrotain/lib/src/scan/reg_exp_parser.js
var require_reg_exp_parser = __commonJS({
  "node_modules/chevrotain/lib/src/scan/reg_exp_parser.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.clearRegExpParserCache = exports2.getRegExpAst = void 0;
    var regexp_to_ast_1 = require_regexp_to_ast();
    var regExpAstCache = {};
    var regExpParser = new regexp_to_ast_1.RegExpParser();
    function getRegExpAst(regExp) {
      var regExpStr = regExp.toString();
      if (regExpAstCache.hasOwnProperty(regExpStr)) {
        return regExpAstCache[regExpStr];
      } else {
        var regExpAst = regExpParser.pattern(regExpStr);
        regExpAstCache[regExpStr] = regExpAst;
        return regExpAst;
      }
    }
    exports2.getRegExpAst = getRegExpAst;
    function clearRegExpParserCache() {
      regExpAstCache = {};
    }
    exports2.clearRegExpParserCache = clearRegExpParserCache;
  }
});

// node_modules/chevrotain/lib/src/scan/reg_exp.js
var require_reg_exp = __commonJS({
  "node_modules/chevrotain/lib/src/scan/reg_exp.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.canMatchCharCode = exports2.firstCharOptimizedIndices = exports2.getOptimizedStartCodesIndices = exports2.failedOptimizationPrefixMsg = void 0;
    var regexp_to_ast_1 = require_regexp_to_ast();
    var utils_1 = require_utils();
    var reg_exp_parser_1 = require_reg_exp_parser();
    var lexer_1 = require_lexer();
    var complementErrorMessage = "Complement Sets are not supported for first char optimization";
    exports2.failedOptimizationPrefixMsg = 'Unable to use "first char" lexer optimizations:\n';
    function getOptimizedStartCodesIndices(regExp, ensureOptimizations) {
      if (ensureOptimizations === void 0) {
        ensureOptimizations = false;
      }
      try {
        var ast = reg_exp_parser_1.getRegExpAst(regExp);
        var firstChars = firstCharOptimizedIndices(ast.value, {}, ast.flags.ignoreCase);
        return firstChars;
      } catch (e) {
        if (e.message === complementErrorMessage) {
          if (ensureOptimizations) {
            utils_1.PRINT_WARNING("" + exports2.failedOptimizationPrefixMsg + ("	Unable to optimize: < " + regExp.toString() + " >\n") + "	Complement Sets cannot be automatically optimized.\n	This will disable the lexer's first char optimizations.\n	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.");
          }
        } else {
          var msgSuffix = "";
          if (ensureOptimizations) {
            msgSuffix = "\n	This will disable the lexer's first char optimizations.\n	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.";
          }
          utils_1.PRINT_ERROR(exports2.failedOptimizationPrefixMsg + "\n" + ("	Failed parsing: < " + regExp.toString() + " >\n") + ("	Using the regexp-to-ast library version: " + regexp_to_ast_1.VERSION + "\n") + "	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues" + msgSuffix);
        }
      }
      return [];
    }
    exports2.getOptimizedStartCodesIndices = getOptimizedStartCodesIndices;
    function firstCharOptimizedIndices(ast, result, ignoreCase) {
      switch (ast.type) {
        case "Disjunction":
          for (var i = 0; i < ast.value.length; i++) {
            firstCharOptimizedIndices(ast.value[i], result, ignoreCase);
          }
          break;
        case "Alternative":
          var terms = ast.value;
          for (var i = 0; i < terms.length; i++) {
            var term = terms[i];
            switch (term.type) {
              case "EndAnchor":
              case "GroupBackReference":
              case "Lookahead":
              case "NegativeLookahead":
              case "StartAnchor":
              case "WordBoundary":
              case "NonWordBoundary":
                continue;
            }
            var atom = term;
            switch (atom.type) {
              case "Character":
                addOptimizedIdxToResult(atom.value, result, ignoreCase);
                break;
              case "Set":
                if (atom.complement === true) {
                  throw Error(complementErrorMessage);
                }
                utils_1.forEach(atom.value, function(code) {
                  if (typeof code === "number") {
                    addOptimizedIdxToResult(code, result, ignoreCase);
                  } else {
                    var range = code;
                    if (ignoreCase === true) {
                      for (var rangeCode = range.from; rangeCode <= range.to; rangeCode++) {
                        addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                      }
                    } else {
                      for (var rangeCode = range.from; rangeCode <= range.to && rangeCode < lexer_1.minOptimizationVal; rangeCode++) {
                        addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                      }
                      if (range.to >= lexer_1.minOptimizationVal) {
                        var minUnOptVal = range.from >= lexer_1.minOptimizationVal ? range.from : lexer_1.minOptimizationVal;
                        var maxUnOptVal = range.to;
                        var minOptIdx = lexer_1.charCodeToOptimizedIndex(minUnOptVal);
                        var maxOptIdx = lexer_1.charCodeToOptimizedIndex(maxUnOptVal);
                        for (var currOptIdx = minOptIdx; currOptIdx <= maxOptIdx; currOptIdx++) {
                          result[currOptIdx] = currOptIdx;
                        }
                      }
                    }
                  }
                });
                break;
              case "Group":
                firstCharOptimizedIndices(atom.value, result, ignoreCase);
                break;
              default:
                throw Error("Non Exhaustive Match");
            }
            var isOptionalQuantifier = atom.quantifier !== void 0 && atom.quantifier.atLeast === 0;
            if (
              // A group may be optional due to empty contents /(?:)/
              // or if everything inside it is optional /((a)?)/
              atom.type === "Group" && isWholeOptional(atom) === false || // If this term is not a group it may only be optional if it has an optional quantifier
              atom.type !== "Group" && isOptionalQuantifier === false
            ) {
              break;
            }
          }
          break;
        default:
          throw Error("non exhaustive match!");
      }
      return utils_1.values(result);
    }
    exports2.firstCharOptimizedIndices = firstCharOptimizedIndices;
    function addOptimizedIdxToResult(code, result, ignoreCase) {
      var optimizedCharIdx = lexer_1.charCodeToOptimizedIndex(code);
      result[optimizedCharIdx] = optimizedCharIdx;
      if (ignoreCase === true) {
        handleIgnoreCase(code, result);
      }
    }
    function handleIgnoreCase(code, result) {
      var char = String.fromCharCode(code);
      var upperChar = char.toUpperCase();
      if (upperChar !== char) {
        var optimizedCharIdx = lexer_1.charCodeToOptimizedIndex(upperChar.charCodeAt(0));
        result[optimizedCharIdx] = optimizedCharIdx;
      } else {
        var lowerChar = char.toLowerCase();
        if (lowerChar !== char) {
          var optimizedCharIdx = lexer_1.charCodeToOptimizedIndex(lowerChar.charCodeAt(0));
          result[optimizedCharIdx] = optimizedCharIdx;
        }
      }
    }
    function findCode(setNode, targetCharCodes) {
      return utils_1.find(setNode.value, function(codeOrRange) {
        if (typeof codeOrRange === "number") {
          return utils_1.contains(targetCharCodes, codeOrRange);
        } else {
          var range_1 = codeOrRange;
          return utils_1.find(targetCharCodes, function(targetCode) {
            return range_1.from <= targetCode && targetCode <= range_1.to;
          }) !== void 0;
        }
      });
    }
    function isWholeOptional(ast) {
      if (ast.quantifier && ast.quantifier.atLeast === 0) {
        return true;
      }
      if (!ast.value) {
        return false;
      }
      return utils_1.isArray(ast.value) ? utils_1.every(ast.value, isWholeOptional) : isWholeOptional(ast.value);
    }
    var CharCodeFinder = (
      /** @class */
      function(_super) {
        __extends(CharCodeFinder2, _super);
        function CharCodeFinder2(targetCharCodes) {
          var _this = _super.call(this) || this;
          _this.targetCharCodes = targetCharCodes;
          _this.found = false;
          return _this;
        }
        CharCodeFinder2.prototype.visitChildren = function(node) {
          if (this.found === true) {
            return;
          }
          switch (node.type) {
            case "Lookahead":
              this.visitLookahead(node);
              return;
            case "NegativeLookahead":
              this.visitNegativeLookahead(node);
              return;
          }
          _super.prototype.visitChildren.call(this, node);
        };
        CharCodeFinder2.prototype.visitCharacter = function(node) {
          if (utils_1.contains(this.targetCharCodes, node.value)) {
            this.found = true;
          }
        };
        CharCodeFinder2.prototype.visitSet = function(node) {
          if (node.complement) {
            if (findCode(node, this.targetCharCodes) === void 0) {
              this.found = true;
            }
          } else {
            if (findCode(node, this.targetCharCodes) !== void 0) {
              this.found = true;
            }
          }
        };
        return CharCodeFinder2;
      }(regexp_to_ast_1.BaseRegExpVisitor)
    );
    function canMatchCharCode(charCodes, pattern) {
      if (pattern instanceof RegExp) {
        var ast = reg_exp_parser_1.getRegExpAst(pattern);
        var charCodeFinder = new CharCodeFinder(charCodes);
        charCodeFinder.visit(ast);
        return charCodeFinder.found;
      } else {
        return utils_1.find(pattern, function(char) {
          return utils_1.contains(charCodes, char.charCodeAt(0));
        }) !== void 0;
      }
    }
    exports2.canMatchCharCode = canMatchCharCode;
  }
});

// node_modules/chevrotain/lib/src/scan/lexer.js
var require_lexer = __commonJS({
  "node_modules/chevrotain/lib/src/scan/lexer.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.charCodeToOptimizedIndex = exports2.minOptimizationVal = exports2.buildLineBreakIssueMessage = exports2.LineTerminatorOptimizedTester = exports2.isShortPattern = exports2.isCustomPattern = exports2.cloneEmptyGroups = exports2.performWarningRuntimeChecks = exports2.performRuntimeChecks = exports2.addStickyFlag = exports2.addStartOfInput = exports2.findUnreachablePatterns = exports2.findModesThatDoNotExist = exports2.findInvalidGroupType = exports2.findDuplicatePatterns = exports2.findUnsupportedFlags = exports2.findStartOfInputAnchor = exports2.findEmptyMatchRegExps = exports2.findEndOfInputAnchor = exports2.findInvalidPatterns = exports2.findMissingPatterns = exports2.validatePatterns = exports2.analyzeTokenTypes = exports2.enableSticky = exports2.disableSticky = exports2.SUPPORT_STICKY = exports2.MODES = exports2.DEFAULT_MODE = void 0;
    var regexp_to_ast_1 = require_regexp_to_ast();
    var lexer_public_1 = require_lexer_public();
    var utils_1 = require_utils();
    var reg_exp_1 = require_reg_exp();
    var reg_exp_parser_1 = require_reg_exp_parser();
    var PATTERN = "PATTERN";
    exports2.DEFAULT_MODE = "defaultMode";
    exports2.MODES = "modes";
    exports2.SUPPORT_STICKY = typeof new RegExp("(?:)").sticky === "boolean";
    function disableSticky() {
      exports2.SUPPORT_STICKY = false;
    }
    exports2.disableSticky = disableSticky;
    function enableSticky() {
      exports2.SUPPORT_STICKY = true;
    }
    exports2.enableSticky = enableSticky;
    function analyzeTokenTypes(tokenTypes, options) {
      options = utils_1.defaults(options, {
        useSticky: exports2.SUPPORT_STICKY,
        debug: false,
        safeMode: false,
        positionTracking: "full",
        lineTerminatorCharacters: ["\r", "\n"],
        tracer: function(msg, action) {
          return action();
        }
      });
      var tracer = options.tracer;
      tracer("initCharCodeToOptimizedIndexMap", function() {
        initCharCodeToOptimizedIndexMap();
      });
      var onlyRelevantTypes;
      tracer("Reject Lexer.NA", function() {
        onlyRelevantTypes = utils_1.reject(tokenTypes, function(currType) {
          return currType[PATTERN] === lexer_public_1.Lexer.NA;
        });
      });
      var hasCustom = false;
      var allTransformedPatterns;
      tracer("Transform Patterns", function() {
        hasCustom = false;
        allTransformedPatterns = utils_1.map(onlyRelevantTypes, function(currType) {
          var currPattern = currType[PATTERN];
          if (utils_1.isRegExp(currPattern)) {
            var regExpSource = currPattern.source;
            if (regExpSource.length === 1 && // only these regExp meta characters which can appear in a length one regExp
            regExpSource !== "^" && regExpSource !== "$" && regExpSource !== "." && !currPattern.ignoreCase) {
              return regExpSource;
            } else if (regExpSource.length === 2 && regExpSource[0] === "\\" && // not a meta character
            !utils_1.contains([
              "d",
              "D",
              "s",
              "S",
              "t",
              "r",
              "n",
              "t",
              "0",
              "c",
              "b",
              "B",
              "f",
              "v",
              "w",
              "W"
            ], regExpSource[1])) {
              return regExpSource[1];
            } else {
              return options.useSticky ? addStickyFlag(currPattern) : addStartOfInput(currPattern);
            }
          } else if (utils_1.isFunction(currPattern)) {
            hasCustom = true;
            return { exec: currPattern };
          } else if (utils_1.has(currPattern, "exec")) {
            hasCustom = true;
            return currPattern;
          } else if (typeof currPattern === "string") {
            if (currPattern.length === 1) {
              return currPattern;
            } else {
              var escapedRegExpString = currPattern.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
              var wrappedRegExp = new RegExp(escapedRegExpString);
              return options.useSticky ? addStickyFlag(wrappedRegExp) : addStartOfInput(wrappedRegExp);
            }
          } else {
            throw Error("non exhaustive match");
          }
        });
      });
      var patternIdxToType;
      var patternIdxToGroup;
      var patternIdxToLongerAltIdx;
      var patternIdxToPushMode;
      var patternIdxToPopMode;
      tracer("misc mapping", function() {
        patternIdxToType = utils_1.map(onlyRelevantTypes, function(currType) {
          return currType.tokenTypeIdx;
        });
        patternIdxToGroup = utils_1.map(onlyRelevantTypes, function(clazz) {
          var groupName = clazz.GROUP;
          if (groupName === lexer_public_1.Lexer.SKIPPED) {
            return void 0;
          } else if (utils_1.isString(groupName)) {
            return groupName;
          } else if (utils_1.isUndefined(groupName)) {
            return false;
          } else {
            throw Error("non exhaustive match");
          }
        });
        patternIdxToLongerAltIdx = utils_1.map(onlyRelevantTypes, function(clazz) {
          var longerAltType = clazz.LONGER_ALT;
          if (longerAltType) {
            var longerAltIdx = utils_1.indexOf(onlyRelevantTypes, longerAltType);
            return longerAltIdx;
          }
        });
        patternIdxToPushMode = utils_1.map(onlyRelevantTypes, function(clazz) {
          return clazz.PUSH_MODE;
        });
        patternIdxToPopMode = utils_1.map(onlyRelevantTypes, function(clazz) {
          return utils_1.has(clazz, "POP_MODE");
        });
      });
      var patternIdxToCanLineTerminator;
      tracer("Line Terminator Handling", function() {
        var lineTerminatorCharCodes = getCharCodes(options.lineTerminatorCharacters);
        patternIdxToCanLineTerminator = utils_1.map(onlyRelevantTypes, function(tokType) {
          return false;
        });
        if (options.positionTracking !== "onlyOffset") {
          patternIdxToCanLineTerminator = utils_1.map(onlyRelevantTypes, function(tokType) {
            if (utils_1.has(tokType, "LINE_BREAKS")) {
              return tokType.LINE_BREAKS;
            } else {
              if (checkLineBreaksIssues(tokType, lineTerminatorCharCodes) === false) {
                return reg_exp_1.canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
              }
            }
          });
        }
      });
      var patternIdxToIsCustom;
      var patternIdxToShort;
      var emptyGroups;
      var patternIdxToConfig;
      tracer("Misc Mapping #2", function() {
        patternIdxToIsCustom = utils_1.map(onlyRelevantTypes, isCustomPattern);
        patternIdxToShort = utils_1.map(allTransformedPatterns, isShortPattern);
        emptyGroups = utils_1.reduce(onlyRelevantTypes, function(acc, clazz) {
          var groupName = clazz.GROUP;
          if (utils_1.isString(groupName) && !(groupName === lexer_public_1.Lexer.SKIPPED)) {
            acc[groupName] = [];
          }
          return acc;
        }, {});
        patternIdxToConfig = utils_1.map(allTransformedPatterns, function(x, idx) {
          return {
            pattern: allTransformedPatterns[idx],
            longerAlt: patternIdxToLongerAltIdx[idx],
            canLineTerminator: patternIdxToCanLineTerminator[idx],
            isCustom: patternIdxToIsCustom[idx],
            short: patternIdxToShort[idx],
            group: patternIdxToGroup[idx],
            push: patternIdxToPushMode[idx],
            pop: patternIdxToPopMode[idx],
            tokenTypeIdx: patternIdxToType[idx],
            tokenType: onlyRelevantTypes[idx]
          };
        });
      });
      var canBeOptimized = true;
      var charCodeToPatternIdxToConfig = [];
      if (!options.safeMode) {
        tracer("First Char Optimization", function() {
          charCodeToPatternIdxToConfig = utils_1.reduce(onlyRelevantTypes, function(result, currTokType, idx) {
            if (typeof currTokType.PATTERN === "string") {
              var charCode = currTokType.PATTERN.charCodeAt(0);
              var optimizedIdx = charCodeToOptimizedIndex(charCode);
              addToMapOfArrays(result, optimizedIdx, patternIdxToConfig[idx]);
            } else if (utils_1.isArray(currTokType.START_CHARS_HINT)) {
              var lastOptimizedIdx_1;
              utils_1.forEach(currTokType.START_CHARS_HINT, function(charOrInt) {
                var charCode2 = typeof charOrInt === "string" ? charOrInt.charCodeAt(0) : charOrInt;
                var currOptimizedIdx = charCodeToOptimizedIndex(charCode2);
                if (lastOptimizedIdx_1 !== currOptimizedIdx) {
                  lastOptimizedIdx_1 = currOptimizedIdx;
                  addToMapOfArrays(result, currOptimizedIdx, patternIdxToConfig[idx]);
                }
              });
            } else if (utils_1.isRegExp(currTokType.PATTERN)) {
              if (currTokType.PATTERN.unicode) {
                canBeOptimized = false;
                if (options.ensureOptimizations) {
                  utils_1.PRINT_ERROR("" + reg_exp_1.failedOptimizationPrefixMsg + ("	Unable to analyze < " + currTokType.PATTERN.toString() + " > pattern.\n") + "	The regexp unicode flag is not currently supported by the regexp-to-ast library.\n	This will disable the lexer's first char optimizations.\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE");
                }
              } else {
                var optimizedCodes = reg_exp_1.getOptimizedStartCodesIndices(currTokType.PATTERN, options.ensureOptimizations);
                if (utils_1.isEmpty(optimizedCodes)) {
                  canBeOptimized = false;
                }
                utils_1.forEach(optimizedCodes, function(code) {
                  addToMapOfArrays(result, code, patternIdxToConfig[idx]);
                });
              }
            } else {
              if (options.ensureOptimizations) {
                utils_1.PRINT_ERROR("" + reg_exp_1.failedOptimizationPrefixMsg + ("	TokenType: <" + currTokType.name + "> is using a custom token pattern without providing <start_chars_hint> parameter.\n") + "	This will disable the lexer's first char optimizations.\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE");
              }
              canBeOptimized = false;
            }
            return result;
          }, []);
        });
      }
      tracer("ArrayPacking", function() {
        charCodeToPatternIdxToConfig = utils_1.packArray(charCodeToPatternIdxToConfig);
      });
      return {
        emptyGroups,
        patternIdxToConfig,
        charCodeToPatternIdxToConfig,
        hasCustom,
        canBeOptimized
      };
    }
    exports2.analyzeTokenTypes = analyzeTokenTypes;
    function validatePatterns(tokenTypes, validModesNames) {
      var errors = [];
      var missingResult = findMissingPatterns(tokenTypes);
      errors = errors.concat(missingResult.errors);
      var invalidResult = findInvalidPatterns(missingResult.valid);
      var validTokenTypes = invalidResult.valid;
      errors = errors.concat(invalidResult.errors);
      errors = errors.concat(validateRegExpPattern(validTokenTypes));
      errors = errors.concat(findInvalidGroupType(validTokenTypes));
      errors = errors.concat(findModesThatDoNotExist(validTokenTypes, validModesNames));
      errors = errors.concat(findUnreachablePatterns(validTokenTypes));
      return errors;
    }
    exports2.validatePatterns = validatePatterns;
    function validateRegExpPattern(tokenTypes) {
      var errors = [];
      var withRegExpPatterns = utils_1.filter(tokenTypes, function(currTokType) {
        return utils_1.isRegExp(currTokType[PATTERN]);
      });
      errors = errors.concat(findEndOfInputAnchor(withRegExpPatterns));
      errors = errors.concat(findStartOfInputAnchor(withRegExpPatterns));
      errors = errors.concat(findUnsupportedFlags(withRegExpPatterns));
      errors = errors.concat(findDuplicatePatterns(withRegExpPatterns));
      errors = errors.concat(findEmptyMatchRegExps(withRegExpPatterns));
      return errors;
    }
    function findMissingPatterns(tokenTypes) {
      var tokenTypesWithMissingPattern = utils_1.filter(tokenTypes, function(currType) {
        return !utils_1.has(currType, PATTERN);
      });
      var errors = utils_1.map(tokenTypesWithMissingPattern, function(currType) {
        return {
          message: "Token Type: ->" + currType.name + "<- missing static 'PATTERN' property",
          type: lexer_public_1.LexerDefinitionErrorType.MISSING_PATTERN,
          tokenTypes: [currType]
        };
      });
      var valid = utils_1.difference(tokenTypes, tokenTypesWithMissingPattern);
      return { errors, valid };
    }
    exports2.findMissingPatterns = findMissingPatterns;
    function findInvalidPatterns(tokenTypes) {
      var tokenTypesWithInvalidPattern = utils_1.filter(tokenTypes, function(currType) {
        var pattern = currType[PATTERN];
        return !utils_1.isRegExp(pattern) && !utils_1.isFunction(pattern) && !utils_1.has(pattern, "exec") && !utils_1.isString(pattern);
      });
      var errors = utils_1.map(tokenTypesWithInvalidPattern, function(currType) {
        return {
          message: "Token Type: ->" + currType.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
          type: lexer_public_1.LexerDefinitionErrorType.INVALID_PATTERN,
          tokenTypes: [currType]
        };
      });
      var valid = utils_1.difference(tokenTypes, tokenTypesWithInvalidPattern);
      return { errors, valid };
    }
    exports2.findInvalidPatterns = findInvalidPatterns;
    var end_of_input = /[^\\][\$]/;
    function findEndOfInputAnchor(tokenTypes) {
      var EndAnchorFinder = (
        /** @class */
        function(_super) {
          __extends(EndAnchorFinder2, _super);
          function EndAnchorFinder2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.found = false;
            return _this;
          }
          EndAnchorFinder2.prototype.visitEndAnchor = function(node) {
            this.found = true;
          };
          return EndAnchorFinder2;
        }(regexp_to_ast_1.BaseRegExpVisitor)
      );
      var invalidRegex = utils_1.filter(tokenTypes, function(currType) {
        var pattern = currType[PATTERN];
        try {
          var regexpAst = reg_exp_parser_1.getRegExpAst(pattern);
          var endAnchorVisitor = new EndAnchorFinder();
          endAnchorVisitor.visit(regexpAst);
          return endAnchorVisitor.found;
        } catch (e) {
          return end_of_input.test(pattern.source);
        }
      });
      var errors = utils_1.map(invalidRegex, function(currType) {
        return {
          message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain end of input anchor '$'\n	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
          type: lexer_public_1.LexerDefinitionErrorType.EOI_ANCHOR_FOUND,
          tokenTypes: [currType]
        };
      });
      return errors;
    }
    exports2.findEndOfInputAnchor = findEndOfInputAnchor;
    function findEmptyMatchRegExps(tokenTypes) {
      var matchesEmptyString = utils_1.filter(tokenTypes, function(currType) {
        var pattern = currType[PATTERN];
        return pattern.test("");
      });
      var errors = utils_1.map(matchesEmptyString, function(currType) {
        return {
          message: "Token Type: ->" + currType.name + "<- static 'PATTERN' must not match an empty string",
          type: lexer_public_1.LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,
          tokenTypes: [currType]
        };
      });
      return errors;
    }
    exports2.findEmptyMatchRegExps = findEmptyMatchRegExps;
    var start_of_input = /[^\\[][\^]|^\^/;
    function findStartOfInputAnchor(tokenTypes) {
      var StartAnchorFinder = (
        /** @class */
        function(_super) {
          __extends(StartAnchorFinder2, _super);
          function StartAnchorFinder2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.found = false;
            return _this;
          }
          StartAnchorFinder2.prototype.visitStartAnchor = function(node) {
            this.found = true;
          };
          return StartAnchorFinder2;
        }(regexp_to_ast_1.BaseRegExpVisitor)
      );
      var invalidRegex = utils_1.filter(tokenTypes, function(currType) {
        var pattern = currType[PATTERN];
        try {
          var regexpAst = reg_exp_parser_1.getRegExpAst(pattern);
          var startAnchorVisitor = new StartAnchorFinder();
          startAnchorVisitor.visit(regexpAst);
          return startAnchorVisitor.found;
        } catch (e) {
          return start_of_input.test(pattern.source);
        }
      });
      var errors = utils_1.map(invalidRegex, function(currType) {
        return {
          message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain start of input anchor '^'\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
          type: lexer_public_1.LexerDefinitionErrorType.SOI_ANCHOR_FOUND,
          tokenTypes: [currType]
        };
      });
      return errors;
    }
    exports2.findStartOfInputAnchor = findStartOfInputAnchor;
    function findUnsupportedFlags(tokenTypes) {
      var invalidFlags = utils_1.filter(tokenTypes, function(currType) {
        var pattern = currType[PATTERN];
        return pattern instanceof RegExp && (pattern.multiline || pattern.global);
      });
      var errors = utils_1.map(invalidFlags, function(currType) {
        return {
          message: "Token Type: ->" + currType.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
          type: lexer_public_1.LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,
          tokenTypes: [currType]
        };
      });
      return errors;
    }
    exports2.findUnsupportedFlags = findUnsupportedFlags;
    function findDuplicatePatterns(tokenTypes) {
      var found = [];
      var identicalPatterns = utils_1.map(tokenTypes, function(outerType) {
        return utils_1.reduce(tokenTypes, function(result, innerType) {
          if (outerType.PATTERN.source === innerType.PATTERN.source && !utils_1.contains(found, innerType) && innerType.PATTERN !== lexer_public_1.Lexer.NA) {
            found.push(innerType);
            result.push(innerType);
            return result;
          }
          return result;
        }, []);
      });
      identicalPatterns = utils_1.compact(identicalPatterns);
      var duplicatePatterns = utils_1.filter(identicalPatterns, function(currIdenticalSet) {
        return currIdenticalSet.length > 1;
      });
      var errors = utils_1.map(duplicatePatterns, function(setOfIdentical) {
        var tokenTypeNames = utils_1.map(setOfIdentical, function(currType) {
          return currType.name;
        });
        var dupPatternSrc = utils_1.first(setOfIdentical).PATTERN;
        return {
          message: "The same RegExp pattern ->" + dupPatternSrc + "<-" + ("has been used in all of the following Token Types: " + tokenTypeNames.join(", ") + " <-"),
          type: lexer_public_1.LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,
          tokenTypes: setOfIdentical
        };
      });
      return errors;
    }
    exports2.findDuplicatePatterns = findDuplicatePatterns;
    function findInvalidGroupType(tokenTypes) {
      var invalidTypes = utils_1.filter(tokenTypes, function(clazz) {
        if (!utils_1.has(clazz, "GROUP")) {
          return false;
        }
        var group = clazz.GROUP;
        return group !== lexer_public_1.Lexer.SKIPPED && group !== lexer_public_1.Lexer.NA && !utils_1.isString(group);
      });
      var errors = utils_1.map(invalidTypes, function(currType) {
        return {
          message: "Token Type: ->" + currType.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
          type: lexer_public_1.LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,
          tokenTypes: [currType]
        };
      });
      return errors;
    }
    exports2.findInvalidGroupType = findInvalidGroupType;
    function findModesThatDoNotExist(tokenTypes, validModes) {
      var invalidModes = utils_1.filter(tokenTypes, function(clazz) {
        return clazz.PUSH_MODE !== void 0 && !utils_1.contains(validModes, clazz.PUSH_MODE);
      });
      var errors = utils_1.map(invalidModes, function(tokType) {
        var msg = "Token Type: ->" + tokType.name + "<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->" + tokType.PUSH_MODE + "<-which does not exist";
        return {
          message: msg,
          type: lexer_public_1.LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,
          tokenTypes: [tokType]
        };
      });
      return errors;
    }
    exports2.findModesThatDoNotExist = findModesThatDoNotExist;
    function findUnreachablePatterns(tokenTypes) {
      var errors = [];
      var canBeTested = utils_1.reduce(tokenTypes, function(result, tokType, idx) {
        var pattern = tokType.PATTERN;
        if (pattern === lexer_public_1.Lexer.NA) {
          return result;
        }
        if (utils_1.isString(pattern)) {
          result.push({ str: pattern, idx, tokenType: tokType });
        } else if (utils_1.isRegExp(pattern) && noMetaChar(pattern)) {
          result.push({ str: pattern.source, idx, tokenType: tokType });
        }
        return result;
      }, []);
      utils_1.forEach(tokenTypes, function(tokType, testIdx) {
        utils_1.forEach(canBeTested, function(_a) {
          var str = _a.str, idx = _a.idx, tokenType = _a.tokenType;
          if (testIdx < idx && testTokenType(str, tokType.PATTERN)) {
            var msg = "Token: ->" + tokenType.name + "<- can never be matched.\n" + ("Because it appears AFTER the Token Type ->" + tokType.name + "<-") + "in the lexer's definition.\nSee https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE";
            errors.push({
              message: msg,
              type: lexer_public_1.LexerDefinitionErrorType.UNREACHABLE_PATTERN,
              tokenTypes: [tokType, tokenType]
            });
          }
        });
      });
      return errors;
    }
    exports2.findUnreachablePatterns = findUnreachablePatterns;
    function testTokenType(str, pattern) {
      if (utils_1.isRegExp(pattern)) {
        var regExpArray = pattern.exec(str);
        return regExpArray !== null && regExpArray.index === 0;
      } else if (utils_1.isFunction(pattern)) {
        return pattern(str, 0, [], {});
      } else if (utils_1.has(pattern, "exec")) {
        return pattern.exec(str, 0, [], {});
      } else if (typeof pattern === "string") {
        return pattern === str;
      } else {
        throw Error("non exhaustive match");
      }
    }
    function noMetaChar(regExp) {
      var metaChars = [
        ".",
        "\\",
        "[",
        "]",
        "|",
        "^",
        "$",
        "(",
        ")",
        "?",
        "*",
        "+",
        "{"
      ];
      return utils_1.find(metaChars, function(char) {
        return regExp.source.indexOf(char) !== -1;
      }) === void 0;
    }
    function addStartOfInput(pattern) {
      var flags = pattern.ignoreCase ? "i" : "";
      return new RegExp("^(?:" + pattern.source + ")", flags);
    }
    exports2.addStartOfInput = addStartOfInput;
    function addStickyFlag(pattern) {
      var flags = pattern.ignoreCase ? "iy" : "y";
      return new RegExp("" + pattern.source, flags);
    }
    exports2.addStickyFlag = addStickyFlag;
    function performRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
      var errors = [];
      if (!utils_1.has(lexerDefinition, exports2.DEFAULT_MODE)) {
        errors.push({
          message: "A MultiMode Lexer cannot be initialized without a <" + exports2.DEFAULT_MODE + "> property in its definition\n",
          type: lexer_public_1.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
        });
      }
      if (!utils_1.has(lexerDefinition, exports2.MODES)) {
        errors.push({
          message: "A MultiMode Lexer cannot be initialized without a <" + exports2.MODES + "> property in its definition\n",
          type: lexer_public_1.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
        });
      }
      if (utils_1.has(lexerDefinition, exports2.MODES) && utils_1.has(lexerDefinition, exports2.DEFAULT_MODE) && !utils_1.has(lexerDefinition.modes, lexerDefinition.defaultMode)) {
        errors.push({
          message: "A MultiMode Lexer cannot be initialized with a " + exports2.DEFAULT_MODE + ": <" + lexerDefinition.defaultMode + ">which does not exist\n",
          type: lexer_public_1.LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
        });
      }
      if (utils_1.has(lexerDefinition, exports2.MODES)) {
        utils_1.forEach(lexerDefinition.modes, function(currModeValue, currModeName) {
          utils_1.forEach(currModeValue, function(currTokType, currIdx) {
            if (utils_1.isUndefined(currTokType)) {
              errors.push({
                message: "A Lexer cannot be initialized using an undefined Token Type. Mode:" + ("<" + currModeName + "> at index: <" + currIdx + ">\n"),
                type: lexer_public_1.LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
              });
            }
          });
        });
      }
      return errors;
    }
    exports2.performRuntimeChecks = performRuntimeChecks;
    function performWarningRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
      var warnings = [];
      var hasAnyLineBreak = false;
      var allTokenTypes = utils_1.compact(utils_1.flatten(utils_1.mapValues(lexerDefinition.modes, function(tokTypes) {
        return tokTypes;
      })));
      var concreteTokenTypes = utils_1.reject(allTokenTypes, function(currType) {
        return currType[PATTERN] === lexer_public_1.Lexer.NA;
      });
      var terminatorCharCodes = getCharCodes(lineTerminatorCharacters);
      if (trackLines) {
        utils_1.forEach(concreteTokenTypes, function(tokType) {
          var currIssue = checkLineBreaksIssues(tokType, terminatorCharCodes);
          if (currIssue !== false) {
            var message = buildLineBreakIssueMessage(tokType, currIssue);
            var warningDescriptor = {
              message,
              type: currIssue.issue,
              tokenType: tokType
            };
            warnings.push(warningDescriptor);
          } else {
            if (utils_1.has(tokType, "LINE_BREAKS")) {
              if (tokType.LINE_BREAKS === true) {
                hasAnyLineBreak = true;
              }
            } else {
              if (reg_exp_1.canMatchCharCode(terminatorCharCodes, tokType.PATTERN)) {
                hasAnyLineBreak = true;
              }
            }
          }
        });
      }
      if (trackLines && !hasAnyLineBreak) {
        warnings.push({
          message: "Warning: No LINE_BREAKS Found.\n	This Lexer has been defined to track line and column information,\n	But none of the Token Types can be identified as matching a line terminator.\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n	for details.",
          type: lexer_public_1.LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS
        });
      }
      return warnings;
    }
    exports2.performWarningRuntimeChecks = performWarningRuntimeChecks;
    function cloneEmptyGroups(emptyGroups) {
      var clonedResult = {};
      var groupKeys = utils_1.keys(emptyGroups);
      utils_1.forEach(groupKeys, function(currKey) {
        var currGroupValue = emptyGroups[currKey];
        if (utils_1.isArray(currGroupValue)) {
          clonedResult[currKey] = [];
        } else {
          throw Error("non exhaustive match");
        }
      });
      return clonedResult;
    }
    exports2.cloneEmptyGroups = cloneEmptyGroups;
    function isCustomPattern(tokenType) {
      var pattern = tokenType.PATTERN;
      if (utils_1.isRegExp(pattern)) {
        return false;
      } else if (utils_1.isFunction(pattern)) {
        return true;
      } else if (utils_1.has(pattern, "exec")) {
        return true;
      } else if (utils_1.isString(pattern)) {
        return false;
      } else {
        throw Error("non exhaustive match");
      }
    }
    exports2.isCustomPattern = isCustomPattern;
    function isShortPattern(pattern) {
      if (utils_1.isString(pattern) && pattern.length === 1) {
        return pattern.charCodeAt(0);
      } else {
        return false;
      }
    }
    exports2.isShortPattern = isShortPattern;
    exports2.LineTerminatorOptimizedTester = {
      // implements /\n|\r\n?/g.test
      test: function(text2) {
        var len = text2.length;
        for (var i = this.lastIndex; i < len; i++) {
          var c = text2.charCodeAt(i);
          if (c === 10) {
            this.lastIndex = i + 1;
            return true;
          } else if (c === 13) {
            if (text2.charCodeAt(i + 1) === 10) {
              this.lastIndex = i + 2;
            } else {
              this.lastIndex = i + 1;
            }
            return true;
          }
        }
        return false;
      },
      lastIndex: 0
    };
    function checkLineBreaksIssues(tokType, lineTerminatorCharCodes) {
      if (utils_1.has(tokType, "LINE_BREAKS")) {
        return false;
      } else {
        if (utils_1.isRegExp(tokType.PATTERN)) {
          try {
            reg_exp_1.canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
          } catch (e) {
            return {
              issue: lexer_public_1.LexerDefinitionErrorType.IDENTIFY_TERMINATOR,
              errMsg: e.message
            };
          }
          return false;
        } else if (utils_1.isString(tokType.PATTERN)) {
          return false;
        } else if (isCustomPattern(tokType)) {
          return { issue: lexer_public_1.LexerDefinitionErrorType.CUSTOM_LINE_BREAK };
        } else {
          throw Error("non exhaustive match");
        }
      }
    }
    function buildLineBreakIssueMessage(tokType, details) {
      if (details.issue === lexer_public_1.LexerDefinitionErrorType.IDENTIFY_TERMINATOR) {
        return "Warning: unable to identify line terminator usage in pattern.\n" + ("	The problem is in the <" + tokType.name + "> Token Type\n") + ("	 Root cause: " + details.errMsg + ".\n") + "	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";
      } else if (details.issue === lexer_public_1.LexerDefinitionErrorType.CUSTOM_LINE_BREAK) {
        return "Warning: A Custom Token Pattern should specify the <line_breaks> option.\n" + ("	The problem is in the <" + tokType.name + "> Token Type\n") + "	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";
      } else {
        throw Error("non exhaustive match");
      }
    }
    exports2.buildLineBreakIssueMessage = buildLineBreakIssueMessage;
    function getCharCodes(charsOrCodes) {
      var charCodes = utils_1.map(charsOrCodes, function(numOrString) {
        if (utils_1.isString(numOrString) && numOrString.length > 0) {
          return numOrString.charCodeAt(0);
        } else {
          return numOrString;
        }
      });
      return charCodes;
    }
    function addToMapOfArrays(map2, key, value) {
      if (map2[key] === void 0) {
        map2[key] = [value];
      } else {
        map2[key].push(value);
      }
    }
    exports2.minOptimizationVal = 256;
    function charCodeToOptimizedIndex(charCode) {
      return charCode < exports2.minOptimizationVal ? charCode : charCodeToOptimizedIdxMap[charCode];
    }
    exports2.charCodeToOptimizedIndex = charCodeToOptimizedIndex;
    var charCodeToOptimizedIdxMap = [];
    function initCharCodeToOptimizedIndexMap() {
      if (utils_1.isEmpty(charCodeToOptimizedIdxMap)) {
        charCodeToOptimizedIdxMap = new Array(65536);
        for (var i = 0; i < 65536; i++) {
          charCodeToOptimizedIdxMap[i] = i > 255 ? 255 + ~~(i / 255) : i;
        }
      }
    }
  }
});

// node_modules/chevrotain/lib/src/scan/tokens.js
var require_tokens = __commonJS({
  "node_modules/chevrotain/lib/src/scan/tokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isTokenType = exports2.hasExtendingTokensTypesMapProperty = exports2.hasExtendingTokensTypesProperty = exports2.hasCategoriesProperty = exports2.hasShortKeyProperty = exports2.singleAssignCategoriesToksMap = exports2.assignCategoriesMapProp = exports2.assignCategoriesTokensProp = exports2.assignTokenDefaultProps = exports2.expandCategories = exports2.augmentTokenTypes = exports2.tokenIdxToClass = exports2.tokenShortNameIdx = exports2.tokenStructuredMatcherNoCategories = exports2.tokenStructuredMatcher = void 0;
    var utils_1 = require_utils();
    function tokenStructuredMatcher(tokInstance, tokConstructor) {
      var instanceType = tokInstance.tokenTypeIdx;
      if (instanceType === tokConstructor.tokenTypeIdx) {
        return true;
      } else {
        return tokConstructor.isParent === true && tokConstructor.categoryMatchesMap[instanceType] === true;
      }
    }
    exports2.tokenStructuredMatcher = tokenStructuredMatcher;
    function tokenStructuredMatcherNoCategories(token, tokType) {
      return token.tokenTypeIdx === tokType.tokenTypeIdx;
    }
    exports2.tokenStructuredMatcherNoCategories = tokenStructuredMatcherNoCategories;
    exports2.tokenShortNameIdx = 1;
    exports2.tokenIdxToClass = {};
    function augmentTokenTypes(tokenTypes) {
      var tokenTypesAndParents = expandCategories(tokenTypes);
      assignTokenDefaultProps(tokenTypesAndParents);
      assignCategoriesMapProp(tokenTypesAndParents);
      assignCategoriesTokensProp(tokenTypesAndParents);
      utils_1.forEach(tokenTypesAndParents, function(tokType) {
        tokType.isParent = tokType.categoryMatches.length > 0;
      });
    }
    exports2.augmentTokenTypes = augmentTokenTypes;
    function expandCategories(tokenTypes) {
      var result = utils_1.cloneArr(tokenTypes);
      var categories = tokenTypes;
      var searching = true;
      while (searching) {
        categories = utils_1.compact(utils_1.flatten(utils_1.map(categories, function(currTokType) {
          return currTokType.CATEGORIES;
        })));
        var newCategories = utils_1.difference(categories, result);
        result = result.concat(newCategories);
        if (utils_1.isEmpty(newCategories)) {
          searching = false;
        } else {
          categories = newCategories;
        }
      }
      return result;
    }
    exports2.expandCategories = expandCategories;
    function assignTokenDefaultProps(tokenTypes) {
      utils_1.forEach(tokenTypes, function(currTokType) {
        if (!hasShortKeyProperty(currTokType)) {
          exports2.tokenIdxToClass[exports2.tokenShortNameIdx] = currTokType;
          currTokType.tokenTypeIdx = exports2.tokenShortNameIdx++;
        }
        if (hasCategoriesProperty(currTokType) && !utils_1.isArray(currTokType.CATEGORIES)) {
          currTokType.CATEGORIES = [currTokType.CATEGORIES];
        }
        if (!hasCategoriesProperty(currTokType)) {
          currTokType.CATEGORIES = [];
        }
        if (!hasExtendingTokensTypesProperty(currTokType)) {
          currTokType.categoryMatches = [];
        }
        if (!hasExtendingTokensTypesMapProperty(currTokType)) {
          currTokType.categoryMatchesMap = {};
        }
      });
    }
    exports2.assignTokenDefaultProps = assignTokenDefaultProps;
    function assignCategoriesTokensProp(tokenTypes) {
      utils_1.forEach(tokenTypes, function(currTokType) {
        currTokType.categoryMatches = [];
        utils_1.forEach(currTokType.categoryMatchesMap, function(val, key) {
          currTokType.categoryMatches.push(exports2.tokenIdxToClass[key].tokenTypeIdx);
        });
      });
    }
    exports2.assignCategoriesTokensProp = assignCategoriesTokensProp;
    function assignCategoriesMapProp(tokenTypes) {
      utils_1.forEach(tokenTypes, function(currTokType) {
        singleAssignCategoriesToksMap([], currTokType);
      });
    }
    exports2.assignCategoriesMapProp = assignCategoriesMapProp;
    function singleAssignCategoriesToksMap(path, nextNode) {
      utils_1.forEach(path, function(pathNode) {
        nextNode.categoryMatchesMap[pathNode.tokenTypeIdx] = true;
      });
      utils_1.forEach(nextNode.CATEGORIES, function(nextCategory) {
        var newPath = path.concat(nextNode);
        if (!utils_1.contains(newPath, nextCategory)) {
          singleAssignCategoriesToksMap(newPath, nextCategory);
        }
      });
    }
    exports2.singleAssignCategoriesToksMap = singleAssignCategoriesToksMap;
    function hasShortKeyProperty(tokType) {
      return utils_1.has(tokType, "tokenTypeIdx");
    }
    exports2.hasShortKeyProperty = hasShortKeyProperty;
    function hasCategoriesProperty(tokType) {
      return utils_1.has(tokType, "CATEGORIES");
    }
    exports2.hasCategoriesProperty = hasCategoriesProperty;
    function hasExtendingTokensTypesProperty(tokType) {
      return utils_1.has(tokType, "categoryMatches");
    }
    exports2.hasExtendingTokensTypesProperty = hasExtendingTokensTypesProperty;
    function hasExtendingTokensTypesMapProperty(tokType) {
      return utils_1.has(tokType, "categoryMatchesMap");
    }
    exports2.hasExtendingTokensTypesMapProperty = hasExtendingTokensTypesMapProperty;
    function isTokenType(tokType) {
      return utils_1.has(tokType, "tokenTypeIdx");
    }
    exports2.isTokenType = isTokenType;
  }
});

// node_modules/chevrotain/lib/src/scan/lexer_errors_public.js
var require_lexer_errors_public = __commonJS({
  "node_modules/chevrotain/lib/src/scan/lexer_errors_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defaultLexerErrorProvider = void 0;
    exports2.defaultLexerErrorProvider = {
      buildUnableToPopLexerModeMessage: function(token) {
        return "Unable to pop Lexer Mode after encountering Token ->" + token.image + "<- The Mode Stack is empty";
      },
      buildUnexpectedCharactersMessage: function(fullText, startOffset, length, line, column) {
        return "unexpected character: ->" + fullText.charAt(startOffset) + "<- at offset: " + startOffset + "," + (" skipped " + length + " characters.");
      }
    };
  }
});

// node_modules/chevrotain/lib/src/scan/lexer_public.js
var require_lexer_public = __commonJS({
  "node_modules/chevrotain/lib/src/scan/lexer_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Lexer = exports2.LexerDefinitionErrorType = void 0;
    var lexer_1 = require_lexer();
    var utils_1 = require_utils();
    var tokens_1 = require_tokens();
    var lexer_errors_public_1 = require_lexer_errors_public();
    var reg_exp_parser_1 = require_reg_exp_parser();
    var LexerDefinitionErrorType;
    (function(LexerDefinitionErrorType2) {
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["MISSING_PATTERN"] = 0] = "MISSING_PATTERN";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["INVALID_PATTERN"] = 1] = "INVALID_PATTERN";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["EOI_ANCHOR_FOUND"] = 2] = "EOI_ANCHOR_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["UNSUPPORTED_FLAGS_FOUND"] = 3] = "UNSUPPORTED_FLAGS_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["DUPLICATE_PATTERNS_FOUND"] = 4] = "DUPLICATE_PATTERNS_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["INVALID_GROUP_TYPE_FOUND"] = 5] = "INVALID_GROUP_TYPE_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["PUSH_MODE_DOES_NOT_EXIST"] = 6] = "PUSH_MODE_DOES_NOT_EXIST";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE"] = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY"] = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST"] = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED"] = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["SOI_ANCHOR_FOUND"] = 11] = "SOI_ANCHOR_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["EMPTY_MATCH_PATTERN"] = 12] = "EMPTY_MATCH_PATTERN";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["NO_LINE_BREAKS_FLAGS"] = 13] = "NO_LINE_BREAKS_FLAGS";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["UNREACHABLE_PATTERN"] = 14] = "UNREACHABLE_PATTERN";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["IDENTIFY_TERMINATOR"] = 15] = "IDENTIFY_TERMINATOR";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["CUSTOM_LINE_BREAK"] = 16] = "CUSTOM_LINE_BREAK";
    })(LexerDefinitionErrorType = exports2.LexerDefinitionErrorType || (exports2.LexerDefinitionErrorType = {}));
    var DEFAULT_LEXER_CONFIG = {
      deferDefinitionErrorsHandling: false,
      positionTracking: "full",
      lineTerminatorsPattern: /\n|\r\n?/g,
      lineTerminatorCharacters: ["\n", "\r"],
      ensureOptimizations: false,
      safeMode: false,
      errorMessageProvider: lexer_errors_public_1.defaultLexerErrorProvider,
      traceInitPerf: false,
      skipValidations: false
    };
    Object.freeze(DEFAULT_LEXER_CONFIG);
    var Lexer = (
      /** @class */
      function() {
        function Lexer2(lexerDefinition, config) {
          var _this = this;
          if (config === void 0) {
            config = DEFAULT_LEXER_CONFIG;
          }
          this.lexerDefinition = lexerDefinition;
          this.lexerDefinitionErrors = [];
          this.lexerDefinitionWarning = [];
          this.patternIdxToConfig = {};
          this.charCodeToPatternIdxToConfig = {};
          this.modes = [];
          this.emptyGroups = {};
          this.config = void 0;
          this.trackStartLines = true;
          this.trackEndLines = true;
          this.hasCustom = false;
          this.canModeBeOptimized = {};
          if (typeof config === "boolean") {
            throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\na boolean 2nd argument is no longer supported");
          }
          this.config = utils_1.merge(DEFAULT_LEXER_CONFIG, config);
          var traceInitVal = this.config.traceInitPerf;
          if (traceInitVal === true) {
            this.traceInitMaxIdent = Infinity;
            this.traceInitPerf = true;
          } else if (typeof traceInitVal === "number") {
            this.traceInitMaxIdent = traceInitVal;
            this.traceInitPerf = true;
          }
          this.traceInitIndent = -1;
          this.TRACE_INIT("Lexer Constructor", function() {
            var actualDefinition;
            var hasOnlySingleMode = true;
            _this.TRACE_INIT("Lexer Config handling", function() {
              if (_this.config.lineTerminatorsPattern === DEFAULT_LEXER_CONFIG.lineTerminatorsPattern) {
                _this.config.lineTerminatorsPattern = lexer_1.LineTerminatorOptimizedTester;
              } else {
                if (_this.config.lineTerminatorCharacters === DEFAULT_LEXER_CONFIG.lineTerminatorCharacters) {
                  throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");
                }
              }
              if (config.safeMode && config.ensureOptimizations) {
                throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
              }
              _this.trackStartLines = /full|onlyStart/i.test(_this.config.positionTracking);
              _this.trackEndLines = /full/i.test(_this.config.positionTracking);
              if (utils_1.isArray(lexerDefinition)) {
                actualDefinition = { modes: {} };
                actualDefinition.modes[lexer_1.DEFAULT_MODE] = utils_1.cloneArr(lexerDefinition);
                actualDefinition[lexer_1.DEFAULT_MODE] = lexer_1.DEFAULT_MODE;
              } else {
                hasOnlySingleMode = false;
                actualDefinition = utils_1.cloneObj(lexerDefinition);
              }
            });
            if (_this.config.skipValidations === false) {
              _this.TRACE_INIT("performRuntimeChecks", function() {
                _this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(lexer_1.performRuntimeChecks(actualDefinition, _this.trackStartLines, _this.config.lineTerminatorCharacters));
              });
              _this.TRACE_INIT("performWarningRuntimeChecks", function() {
                _this.lexerDefinitionWarning = _this.lexerDefinitionWarning.concat(lexer_1.performWarningRuntimeChecks(actualDefinition, _this.trackStartLines, _this.config.lineTerminatorCharacters));
              });
            }
            actualDefinition.modes = actualDefinition.modes ? actualDefinition.modes : {};
            utils_1.forEach(actualDefinition.modes, function(currModeValue, currModeName) {
              actualDefinition.modes[currModeName] = utils_1.reject(currModeValue, function(currTokType) {
                return utils_1.isUndefined(currTokType);
              });
            });
            var allModeNames = utils_1.keys(actualDefinition.modes);
            utils_1.forEach(actualDefinition.modes, function(currModDef, currModName) {
              _this.TRACE_INIT("Mode: <" + currModName + "> processing", function() {
                _this.modes.push(currModName);
                if (_this.config.skipValidations === false) {
                  _this.TRACE_INIT("validatePatterns", function() {
                    _this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(lexer_1.validatePatterns(currModDef, allModeNames));
                  });
                }
                if (utils_1.isEmpty(_this.lexerDefinitionErrors)) {
                  tokens_1.augmentTokenTypes(currModDef);
                  var currAnalyzeResult_1;
                  _this.TRACE_INIT("analyzeTokenTypes", function() {
                    currAnalyzeResult_1 = lexer_1.analyzeTokenTypes(currModDef, {
                      lineTerminatorCharacters: _this.config.lineTerminatorCharacters,
                      positionTracking: config.positionTracking,
                      ensureOptimizations: config.ensureOptimizations,
                      safeMode: config.safeMode,
                      tracer: _this.TRACE_INIT.bind(_this)
                    });
                  });
                  _this.patternIdxToConfig[currModName] = currAnalyzeResult_1.patternIdxToConfig;
                  _this.charCodeToPatternIdxToConfig[currModName] = currAnalyzeResult_1.charCodeToPatternIdxToConfig;
                  _this.emptyGroups = utils_1.merge(_this.emptyGroups, currAnalyzeResult_1.emptyGroups);
                  _this.hasCustom = currAnalyzeResult_1.hasCustom || _this.hasCustom;
                  _this.canModeBeOptimized[currModName] = currAnalyzeResult_1.canBeOptimized;
                }
              });
            });
            _this.defaultMode = actualDefinition.defaultMode;
            if (!utils_1.isEmpty(_this.lexerDefinitionErrors) && !_this.config.deferDefinitionErrorsHandling) {
              var allErrMessages = utils_1.map(_this.lexerDefinitionErrors, function(error) {
                return error.message;
              });
              var allErrMessagesString = allErrMessages.join("-----------------------\n");
              throw new Error("Errors detected in definition of Lexer:\n" + allErrMessagesString);
            }
            utils_1.forEach(_this.lexerDefinitionWarning, function(warningDescriptor) {
              utils_1.PRINT_WARNING(warningDescriptor.message);
            });
            _this.TRACE_INIT("Choosing sub-methods implementations", function() {
              if (lexer_1.SUPPORT_STICKY) {
                _this.chopInput = utils_1.IDENTITY;
                _this.match = _this.matchWithTest;
              } else {
                _this.updateLastIndex = utils_1.NOOP;
                _this.match = _this.matchWithExec;
              }
              if (hasOnlySingleMode) {
                _this.handleModes = utils_1.NOOP;
              }
              if (_this.trackStartLines === false) {
                _this.computeNewColumn = utils_1.IDENTITY;
              }
              if (_this.trackEndLines === false) {
                _this.updateTokenEndLineColumnLocation = utils_1.NOOP;
              }
              if (/full/i.test(_this.config.positionTracking)) {
                _this.createTokenInstance = _this.createFullToken;
              } else if (/onlyStart/i.test(_this.config.positionTracking)) {
                _this.createTokenInstance = _this.createStartOnlyToken;
              } else if (/onlyOffset/i.test(_this.config.positionTracking)) {
                _this.createTokenInstance = _this.createOffsetOnlyToken;
              } else {
                throw Error('Invalid <positionTracking> config option: "' + _this.config.positionTracking + '"');
              }
              if (_this.hasCustom) {
                _this.addToken = _this.addTokenUsingPush;
                _this.handlePayload = _this.handlePayloadWithCustom;
              } else {
                _this.addToken = _this.addTokenUsingMemberAccess;
                _this.handlePayload = _this.handlePayloadNoCustom;
              }
            });
            _this.TRACE_INIT("Failed Optimization Warnings", function() {
              var unOptimizedModes = utils_1.reduce(_this.canModeBeOptimized, function(cannotBeOptimized, canBeOptimized, modeName) {
                if (canBeOptimized === false) {
                  cannotBeOptimized.push(modeName);
                }
                return cannotBeOptimized;
              }, []);
              if (config.ensureOptimizations && !utils_1.isEmpty(unOptimizedModes)) {
                throw Error("Lexer Modes: < " + unOptimizedModes.join(", ") + ' > cannot be optimized.\n	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.\n	 Or inspect the console log for details on how to resolve these issues.');
              }
            });
            _this.TRACE_INIT("clearRegExpParserCache", function() {
              reg_exp_parser_1.clearRegExpParserCache();
            });
            _this.TRACE_INIT("toFastProperties", function() {
              utils_1.toFastProperties(_this);
            });
          });
        }
        Lexer2.prototype.tokenize = function(text2, initialMode) {
          if (initialMode === void 0) {
            initialMode = this.defaultMode;
          }
          if (!utils_1.isEmpty(this.lexerDefinitionErrors)) {
            var allErrMessages = utils_1.map(this.lexerDefinitionErrors, function(error) {
              return error.message;
            });
            var allErrMessagesString = allErrMessages.join("-----------------------\n");
            throw new Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" + allErrMessagesString);
          }
          var lexResult = this.tokenizeInternal(text2, initialMode);
          return lexResult;
        };
        Lexer2.prototype.tokenizeInternal = function(text2, initialMode) {
          var _this = this;
          var i, j, matchAltImage, longerAltIdx, matchedImage, payload, altPayload, imageLength, group, tokType, newToken, errLength, droppedChar, msg, match;
          var orgText = text2;
          var orgLength = orgText.length;
          var offset = 0;
          var matchedTokensIndex = 0;
          var guessedNumberOfTokens = this.hasCustom ? 0 : Math.floor(text2.length / 10);
          var matchedTokens = new Array(guessedNumberOfTokens);
          var errors = [];
          var line = this.trackStartLines ? 1 : void 0;
          var column = this.trackStartLines ? 1 : void 0;
          var groups = lexer_1.cloneEmptyGroups(this.emptyGroups);
          var trackLines = this.trackStartLines;
          var lineTerminatorPattern = this.config.lineTerminatorsPattern;
          var currModePatternsLength = 0;
          var patternIdxToConfig = [];
          var currCharCodeToPatternIdxToConfig = [];
          var modeStack = [];
          var emptyArray = [];
          Object.freeze(emptyArray);
          var getPossiblePatterns = void 0;
          function getPossiblePatternsSlow() {
            return patternIdxToConfig;
          }
          function getPossiblePatternsOptimized(charCode) {
            var optimizedCharIdx = lexer_1.charCodeToOptimizedIndex(charCode);
            var possiblePatterns = currCharCodeToPatternIdxToConfig[optimizedCharIdx];
            if (possiblePatterns === void 0) {
              return emptyArray;
            } else {
              return possiblePatterns;
            }
          }
          var pop_mode = function(popToken) {
            if (modeStack.length === 1 && // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
            // So no error should occur.
            popToken.tokenType.PUSH_MODE === void 0) {
              var msg_1 = _this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(popToken);
              errors.push({
                offset: popToken.startOffset,
                line: popToken.startLine !== void 0 ? popToken.startLine : void 0,
                column: popToken.startColumn !== void 0 ? popToken.startColumn : void 0,
                length: popToken.image.length,
                message: msg_1
              });
            } else {
              modeStack.pop();
              var newMode = utils_1.last(modeStack);
              patternIdxToConfig = _this.patternIdxToConfig[newMode];
              currCharCodeToPatternIdxToConfig = _this.charCodeToPatternIdxToConfig[newMode];
              currModePatternsLength = patternIdxToConfig.length;
              var modeCanBeOptimized = _this.canModeBeOptimized[newMode] && _this.config.safeMode === false;
              if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
                getPossiblePatterns = getPossiblePatternsOptimized;
              } else {
                getPossiblePatterns = getPossiblePatternsSlow;
              }
            }
          };
          function push_mode(newMode) {
            modeStack.push(newMode);
            currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
            patternIdxToConfig = this.patternIdxToConfig[newMode];
            currModePatternsLength = patternIdxToConfig.length;
            currModePatternsLength = patternIdxToConfig.length;
            var modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
            if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
              getPossiblePatterns = getPossiblePatternsOptimized;
            } else {
              getPossiblePatterns = getPossiblePatternsSlow;
            }
          }
          push_mode.call(this, initialMode);
          var currConfig;
          while (offset < orgLength) {
            matchedImage = null;
            var nextCharCode = orgText.charCodeAt(offset);
            var chosenPatternIdxToConfig = getPossiblePatterns(nextCharCode);
            var chosenPatternsLength = chosenPatternIdxToConfig.length;
            for (i = 0; i < chosenPatternsLength; i++) {
              currConfig = chosenPatternIdxToConfig[i];
              var currPattern = currConfig.pattern;
              payload = null;
              var singleCharCode = currConfig.short;
              if (singleCharCode !== false) {
                if (nextCharCode === singleCharCode) {
                  matchedImage = currPattern;
                }
              } else if (currConfig.isCustom === true) {
                match = currPattern.exec(orgText, offset, matchedTokens, groups);
                if (match !== null) {
                  matchedImage = match[0];
                  if (match.payload !== void 0) {
                    payload = match.payload;
                  }
                } else {
                  matchedImage = null;
                }
              } else {
                this.updateLastIndex(currPattern, offset);
                matchedImage = this.match(currPattern, text2, offset);
              }
              if (matchedImage !== null) {
                longerAltIdx = currConfig.longerAlt;
                if (longerAltIdx !== void 0) {
                  var longerAltConfig = patternIdxToConfig[longerAltIdx];
                  var longerAltPattern = longerAltConfig.pattern;
                  altPayload = null;
                  if (longerAltConfig.isCustom === true) {
                    match = longerAltPattern.exec(orgText, offset, matchedTokens, groups);
                    if (match !== null) {
                      matchAltImage = match[0];
                      if (match.payload !== void 0) {
                        altPayload = match.payload;
                      }
                    } else {
                      matchAltImage = null;
                    }
                  } else {
                    this.updateLastIndex(longerAltPattern, offset);
                    matchAltImage = this.match(longerAltPattern, text2, offset);
                  }
                  if (matchAltImage && matchAltImage.length > matchedImage.length) {
                    matchedImage = matchAltImage;
                    payload = altPayload;
                    currConfig = longerAltConfig;
                  }
                }
                break;
              }
            }
            if (matchedImage !== null) {
              imageLength = matchedImage.length;
              group = currConfig.group;
              if (group !== void 0) {
                tokType = currConfig.tokenTypeIdx;
                newToken = this.createTokenInstance(matchedImage, offset, tokType, currConfig.tokenType, line, column, imageLength);
                this.handlePayload(newToken, payload);
                if (group === false) {
                  matchedTokensIndex = this.addToken(matchedTokens, matchedTokensIndex, newToken);
                } else {
                  groups[group].push(newToken);
                }
              }
              text2 = this.chopInput(text2, imageLength);
              offset = offset + imageLength;
              column = this.computeNewColumn(column, imageLength);
              if (trackLines === true && currConfig.canLineTerminator === true) {
                var numOfLTsInMatch = 0;
                var foundTerminator = void 0;
                var lastLTEndOffset = void 0;
                lineTerminatorPattern.lastIndex = 0;
                do {
                  foundTerminator = lineTerminatorPattern.test(matchedImage);
                  if (foundTerminator === true) {
                    lastLTEndOffset = lineTerminatorPattern.lastIndex - 1;
                    numOfLTsInMatch++;
                  }
                } while (foundTerminator === true);
                if (numOfLTsInMatch !== 0) {
                  line = line + numOfLTsInMatch;
                  column = imageLength - lastLTEndOffset;
                  this.updateTokenEndLineColumnLocation(newToken, group, lastLTEndOffset, numOfLTsInMatch, line, column, imageLength);
                }
              }
              this.handleModes(currConfig, pop_mode, push_mode, newToken);
            } else {
              var errorStartOffset = offset;
              var errorLine = line;
              var errorColumn = column;
              var foundResyncPoint = false;
              while (!foundResyncPoint && offset < orgLength) {
                droppedChar = orgText.charCodeAt(offset);
                text2 = this.chopInput(text2, 1);
                offset++;
                for (j = 0; j < currModePatternsLength; j++) {
                  var currConfig_1 = patternIdxToConfig[j];
                  var currPattern = currConfig_1.pattern;
                  var singleCharCode = currConfig_1.short;
                  if (singleCharCode !== false) {
                    if (orgText.charCodeAt(offset) === singleCharCode) {
                      foundResyncPoint = true;
                    }
                  } else if (currConfig_1.isCustom === true) {
                    foundResyncPoint = currPattern.exec(orgText, offset, matchedTokens, groups) !== null;
                  } else {
                    this.updateLastIndex(currPattern, offset);
                    foundResyncPoint = currPattern.exec(text2) !== null;
                  }
                  if (foundResyncPoint === true) {
                    break;
                  }
                }
              }
              errLength = offset - errorStartOffset;
              msg = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(orgText, errorStartOffset, errLength, errorLine, errorColumn);
              errors.push({
                offset: errorStartOffset,
                line: errorLine,
                column: errorColumn,
                length: errLength,
                message: msg
              });
            }
          }
          if (!this.hasCustom) {
            matchedTokens.length = matchedTokensIndex;
          }
          return {
            tokens: matchedTokens,
            groups,
            errors
          };
        };
        Lexer2.prototype.handleModes = function(config, pop_mode, push_mode, newToken) {
          if (config.pop === true) {
            var pushMode = config.push;
            pop_mode(newToken);
            if (pushMode !== void 0) {
              push_mode.call(this, pushMode);
            }
          } else if (config.push !== void 0) {
            push_mode.call(this, config.push);
          }
        };
        Lexer2.prototype.chopInput = function(text2, length) {
          return text2.substring(length);
        };
        Lexer2.prototype.updateLastIndex = function(regExp, newLastIndex) {
          regExp.lastIndex = newLastIndex;
        };
        Lexer2.prototype.updateTokenEndLineColumnLocation = function(newToken, group, lastLTIdx, numOfLTsInMatch, line, column, imageLength) {
          var lastCharIsLT, fixForEndingInLT;
          if (group !== void 0) {
            lastCharIsLT = lastLTIdx === imageLength - 1;
            fixForEndingInLT = lastCharIsLT ? -1 : 0;
            if (!(numOfLTsInMatch === 1 && lastCharIsLT === true)) {
              newToken.endLine = line + fixForEndingInLT;
              newToken.endColumn = column - 1 + -fixForEndingInLT;
            }
          }
        };
        Lexer2.prototype.computeNewColumn = function(oldColumn, imageLength) {
          return oldColumn + imageLength;
        };
        Lexer2.prototype.createTokenInstance = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return null;
        };
        Lexer2.prototype.createOffsetOnlyToken = function(image, startOffset, tokenTypeIdx, tokenType) {
          return {
            image,
            startOffset,
            tokenTypeIdx,
            tokenType
          };
        };
        Lexer2.prototype.createStartOnlyToken = function(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn) {
          return {
            image,
            startOffset,
            startLine,
            startColumn,
            tokenTypeIdx,
            tokenType
          };
        };
        Lexer2.prototype.createFullToken = function(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn, imageLength) {
          return {
            image,
            startOffset,
            endOffset: startOffset + imageLength - 1,
            startLine,
            endLine: startLine,
            startColumn,
            endColumn: startColumn + imageLength - 1,
            tokenTypeIdx,
            tokenType
          };
        };
        Lexer2.prototype.addToken = function(tokenVector, index, tokenToAdd) {
          return 666;
        };
        Lexer2.prototype.addTokenUsingPush = function(tokenVector, index, tokenToAdd) {
          tokenVector.push(tokenToAdd);
          return index;
        };
        Lexer2.prototype.addTokenUsingMemberAccess = function(tokenVector, index, tokenToAdd) {
          tokenVector[index] = tokenToAdd;
          index++;
          return index;
        };
        Lexer2.prototype.handlePayload = function(token, payload) {
        };
        Lexer2.prototype.handlePayloadNoCustom = function(token, payload) {
        };
        Lexer2.prototype.handlePayloadWithCustom = function(token, payload) {
          if (payload !== null) {
            token.payload = payload;
          }
        };
        Lexer2.prototype.match = function(pattern, text2, offset) {
          return null;
        };
        Lexer2.prototype.matchWithTest = function(pattern, text2, offset) {
          var found = pattern.test(text2);
          if (found === true) {
            return text2.substring(offset, pattern.lastIndex);
          }
          return null;
        };
        Lexer2.prototype.matchWithExec = function(pattern, text2) {
          var regExpArray = pattern.exec(text2);
          return regExpArray !== null ? regExpArray[0] : regExpArray;
        };
        Lexer2.prototype.TRACE_INIT = function(phaseDesc, phaseImpl) {
          if (this.traceInitPerf === true) {
            this.traceInitIndent++;
            var indent = new Array(this.traceInitIndent + 1).join("	");
            if (this.traceInitIndent < this.traceInitMaxIdent) {
              console.log(indent + "--> <" + phaseDesc + ">");
            }
            var _a = utils_1.timer(phaseImpl), time = _a.time, value = _a.value;
            var traceMethod = time > 10 ? console.warn : console.log;
            if (this.traceInitIndent < this.traceInitMaxIdent) {
              traceMethod(indent + "<-- <" + phaseDesc + "> time: " + time + "ms");
            }
            this.traceInitIndent--;
            return value;
          } else {
            return phaseImpl();
          }
        };
        Lexer2.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
        Lexer2.NA = /NOT_APPLICABLE/;
        return Lexer2;
      }()
    );
    exports2.Lexer = Lexer;
  }
});

// node_modules/chevrotain/lib/src/scan/tokens_public.js
var require_tokens_public = __commonJS({
  "node_modules/chevrotain/lib/src/scan/tokens_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.tokenMatcher = exports2.createTokenInstance = exports2.EOF = exports2.createToken = exports2.hasTokenLabel = exports2.tokenName = exports2.tokenLabel = void 0;
    var utils_1 = require_utils();
    var lexer_public_1 = require_lexer_public();
    var tokens_1 = require_tokens();
    function tokenLabel(tokType) {
      if (hasTokenLabel(tokType)) {
        return tokType.LABEL;
      } else {
        return tokType.name;
      }
    }
    exports2.tokenLabel = tokenLabel;
    function tokenName(tokType) {
      return tokType.name;
    }
    exports2.tokenName = tokenName;
    function hasTokenLabel(obj) {
      return utils_1.isString(obj.LABEL) && obj.LABEL !== "";
    }
    exports2.hasTokenLabel = hasTokenLabel;
    var PARENT = "parent";
    var CATEGORIES = "categories";
    var LABEL = "label";
    var GROUP = "group";
    var PUSH_MODE = "push_mode";
    var POP_MODE = "pop_mode";
    var LONGER_ALT = "longer_alt";
    var LINE_BREAKS = "line_breaks";
    var START_CHARS_HINT = "start_chars_hint";
    function createToken(config) {
      return createTokenInternal(config);
    }
    exports2.createToken = createToken;
    function createTokenInternal(config) {
      var pattern = config.pattern;
      var tokenType = {};
      tokenType.name = config.name;
      if (!utils_1.isUndefined(pattern)) {
        tokenType.PATTERN = pattern;
      }
      if (utils_1.has(config, PARENT)) {
        throw "The parent property is no longer supported.\nSee: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.";
      }
      if (utils_1.has(config, CATEGORIES)) {
        tokenType.CATEGORIES = config[CATEGORIES];
      }
      tokens_1.augmentTokenTypes([tokenType]);
      if (utils_1.has(config, LABEL)) {
        tokenType.LABEL = config[LABEL];
      }
      if (utils_1.has(config, GROUP)) {
        tokenType.GROUP = config[GROUP];
      }
      if (utils_1.has(config, POP_MODE)) {
        tokenType.POP_MODE = config[POP_MODE];
      }
      if (utils_1.has(config, PUSH_MODE)) {
        tokenType.PUSH_MODE = config[PUSH_MODE];
      }
      if (utils_1.has(config, LONGER_ALT)) {
        tokenType.LONGER_ALT = config[LONGER_ALT];
      }
      if (utils_1.has(config, LINE_BREAKS)) {
        tokenType.LINE_BREAKS = config[LINE_BREAKS];
      }
      if (utils_1.has(config, START_CHARS_HINT)) {
        tokenType.START_CHARS_HINT = config[START_CHARS_HINT];
      }
      return tokenType;
    }
    exports2.EOF = createToken({ name: "EOF", pattern: lexer_public_1.Lexer.NA });
    tokens_1.augmentTokenTypes([exports2.EOF]);
    function createTokenInstance(tokType, image, startOffset, endOffset, startLine, endLine, startColumn, endColumn) {
      return {
        image,
        startOffset,
        endOffset,
        startLine,
        endLine,
        startColumn,
        endColumn,
        tokenTypeIdx: tokType.tokenTypeIdx,
        tokenType: tokType
      };
    }
    exports2.createTokenInstance = createTokenInstance;
    function tokenMatcher(token, tokType) {
      return tokens_1.tokenStructuredMatcher(token, tokType);
    }
    exports2.tokenMatcher = tokenMatcher;
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/gast/gast_public.js
var require_gast_public = __commonJS({
  "node_modules/chevrotain/lib/src/parse/grammar/gast/gast_public.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.serializeProduction = exports2.serializeGrammar = exports2.Terminal = exports2.Alternation = exports2.RepetitionWithSeparator = exports2.Repetition = exports2.RepetitionMandatoryWithSeparator = exports2.RepetitionMandatory = exports2.Option = exports2.Alternative = exports2.Rule = exports2.NonTerminal = exports2.AbstractProduction = void 0;
    var utils_1 = require_utils();
    var tokens_public_1 = require_tokens_public();
    var AbstractProduction = (
      /** @class */
      function() {
        function AbstractProduction2(_definition) {
          this._definition = _definition;
        }
        Object.defineProperty(AbstractProduction2.prototype, "definition", {
          get: function() {
            return this._definition;
          },
          set: function(value) {
            this._definition = value;
          },
          enumerable: false,
          configurable: true
        });
        AbstractProduction2.prototype.accept = function(visitor) {
          visitor.visit(this);
          utils_1.forEach(this.definition, function(prod) {
            prod.accept(visitor);
          });
        };
        return AbstractProduction2;
      }()
    );
    exports2.AbstractProduction = AbstractProduction;
    var NonTerminal = (
      /** @class */
      function(_super) {
        __extends(NonTerminal2, _super);
        function NonTerminal2(options) {
          var _this = _super.call(this, []) || this;
          _this.idx = 1;
          utils_1.assign(_this, utils_1.pick(options, function(v) {
            return v !== void 0;
          }));
          return _this;
        }
        Object.defineProperty(NonTerminal2.prototype, "definition", {
          get: function() {
            if (this.referencedRule !== void 0) {
              return this.referencedRule.definition;
            }
            return [];
          },
          set: function(definition) {
          },
          enumerable: false,
          configurable: true
        });
        NonTerminal2.prototype.accept = function(visitor) {
          visitor.visit(this);
        };
        return NonTerminal2;
      }(AbstractProduction)
    );
    exports2.NonTerminal = NonTerminal;
    var Rule = (
      /** @class */
      function(_super) {
        __extends(Rule2, _super);
        function Rule2(options) {
          var _this = _super.call(this, options.definition) || this;
          _this.orgText = "";
          utils_1.assign(_this, utils_1.pick(options, function(v) {
            return v !== void 0;
          }));
          return _this;
        }
        return Rule2;
      }(AbstractProduction)
    );
    exports2.Rule = Rule;
    var Alternative = (
      /** @class */
      function(_super) {
        __extends(Alternative2, _super);
        function Alternative2(options) {
          var _this = _super.call(this, options.definition) || this;
          _this.ignoreAmbiguities = false;
          utils_1.assign(_this, utils_1.pick(options, function(v) {
            return v !== void 0;
          }));
          return _this;
        }
        return Alternative2;
      }(AbstractProduction)
    );
    exports2.Alternative = Alternative;
    var Option = (
      /** @class */
      function(_super) {
        __extends(Option2, _super);
        function Option2(options) {
          var _this = _super.call(this, options.definition) || this;
          _this.idx = 1;
          utils_1.assign(_this, utils_1.pick(options, function(v) {
            return v !== void 0;
          }));
          return _this;
        }
        return Option2;
      }(AbstractProduction)
    );
    exports2.Option = Option;
    var RepetitionMandatory = (
      /** @class */
      function(_super) {
        __extends(RepetitionMandatory2, _super);
        function RepetitionMandatory2(options) {
          var _this = _super.call(this, options.definition) || this;
          _this.idx = 1;
          utils_1.assign(_this, utils_1.pick(options, function(v) {
            return v !== void 0;
          }));
          return _this;
        }
        return RepetitionMandatory2;
      }(AbstractProduction)
    );
    exports2.RepetitionMandatory = RepetitionMandatory;
    var RepetitionMandatoryWithSeparator = (
      /** @class */
      function(_super) {
        __extends(RepetitionMandatoryWithSeparator2, _super);
        function RepetitionMandatoryWithSeparator2(options) {
          var _this = _super.call(this, options.definition) || this;
          _this.idx = 1;
          utils_1.assign(_this, utils_1.pick(options, function(v) {
            return v !== void 0;
          }));
          return _this;
        }
        return RepetitionMandatoryWithSeparator2;
      }(AbstractProduction)
    );
    exports2.RepetitionMandatoryWithSeparator = RepetitionMandatoryWithSeparator;
    var Repetition = (
      /** @class */
      function(_super) {
        __extends(Repetition2, _super);
        function Repetition2(options) {
          var _this = _super.call(this, options.definition) || this;
          _this.idx = 1;
          utils_1.assign(_this, utils_1.pick(options, function(v) {
            return v !== void 0;
          }));
          return _this;
        }
        return Repetition2;
      }(AbstractProduction)
    );
    exports2.Repetition = Repetition;
    var RepetitionWithSeparator = (
      /** @class */
      function(_super) {
        __extends(RepetitionWithSeparator2, _super);
        function RepetitionWithSeparator2(options) {
          var _this = _super.call(this, options.definition) || this;
          _this.idx = 1;
          utils_1.assign(_this, utils_1.pick(options, function(v) {
            return v !== void 0;
          }));
          return _this;
        }
        return RepetitionWithSeparator2;
      }(AbstractProduction)
    );
    exports2.RepetitionWithSeparator = RepetitionWithSeparator;
    var Alternation = (
      /** @class */
      function(_super) {
        __extends(Alternation2, _super);
        function Alternation2(options) {
          var _this = _super.call(this, options.definition) || this;
          _this.idx = 1;
          _this.ignoreAmbiguities = false;
          _this.hasPredicates = false;
          utils_1.assign(_this, utils_1.pick(options, function(v) {
            return v !== void 0;
          }));
          return _this;
        }
        Object.defineProperty(Alternation2.prototype, "definition", {
          get: function() {
            return this._definition;
          },
          set: function(value) {
            this._definition = value;
          },
          enumerable: false,
          configurable: true
        });
        return Alternation2;
      }(AbstractProduction)
    );
    exports2.Alternation = Alternation;
    var Terminal = (
      /** @class */
      function() {
        function Terminal2(options) {
          this.idx = 1;
          utils_1.assign(this, utils_1.pick(options, function(v) {
            return v !== void 0;
          }));
        }
        Terminal2.prototype.accept = function(visitor) {
          visitor.visit(this);
        };
        return Terminal2;
      }()
    );
    exports2.Terminal = Terminal;
    function serializeGrammar(topRules) {
      return utils_1.map(topRules, serializeProduction);
    }
    exports2.serializeGrammar = serializeGrammar;
    function serializeProduction(node) {
      function convertDefinition(definition) {
        return utils_1.map(definition, serializeProduction);
      }
      if (node instanceof NonTerminal) {
        return {
          type: "NonTerminal",
          name: node.nonTerminalName,
          idx: node.idx
        };
      } else if (node instanceof Alternative) {
        return {
          type: "Alternative",
          definition: convertDefinition(node.definition)
        };
      } else if (node instanceof Option) {
        return {
          type: "Option",
          idx: node.idx,
          definition: convertDefinition(node.definition)
        };
      } else if (node instanceof RepetitionMandatory) {
        return {
          type: "RepetitionMandatory",
          idx: node.idx,
          definition: convertDefinition(node.definition)
        };
      } else if (node instanceof RepetitionMandatoryWithSeparator) {
        return {
          type: "RepetitionMandatoryWithSeparator",
          idx: node.idx,
          separator: serializeProduction(new Terminal({ terminalType: node.separator })),
          definition: convertDefinition(node.definition)
        };
      } else if (node instanceof RepetitionWithSeparator) {
        return {
          type: "RepetitionWithSeparator",
          idx: node.idx,
          separator: serializeProduction(new Terminal({ terminalType: node.separator })),
          definition: convertDefinition(node.definition)
        };
      } else if (node instanceof Repetition) {
        return {
          type: "Repetition",
          idx: node.idx,
          definition: convertDefinition(node.definition)
        };
      } else if (node instanceof Alternation) {
        return {
          type: "Alternation",
          idx: node.idx,
          definition: convertDefinition(node.definition)
        };
      } else if (node instanceof Terminal) {
        var serializedTerminal = {
          type: "Terminal",
          name: node.terminalType.name,
          label: tokens_public_1.tokenLabel(node.terminalType),
          idx: node.idx
        };
        var pattern = node.terminalType.PATTERN;
        if (node.terminalType.PATTERN) {
          serializedTerminal.pattern = utils_1.isRegExp(pattern) ? pattern.source : pattern;
        }
        return serializedTerminal;
      } else if (node instanceof Rule) {
        return {
          type: "Rule",
          name: node.name,
          orgText: node.orgText,
          definition: convertDefinition(node.definition)
        };
      } else {
        throw Error("non exhaustive match");
      }
    }
    exports2.serializeProduction = serializeProduction;
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/rest.js
var require_rest = __commonJS({
  "node_modules/chevrotain/lib/src/parse/grammar/rest.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RestWalker = void 0;
    var utils_1 = require_utils();
    var gast_public_1 = require_gast_public();
    var RestWalker = (
      /** @class */
      function() {
        function RestWalker2() {
        }
        RestWalker2.prototype.walk = function(prod, prevRest) {
          var _this = this;
          if (prevRest === void 0) {
            prevRest = [];
          }
          utils_1.forEach(prod.definition, function(subProd, index) {
            var currRest = utils_1.drop(prod.definition, index + 1);
            if (subProd instanceof gast_public_1.NonTerminal) {
              _this.walkProdRef(subProd, currRest, prevRest);
            } else if (subProd instanceof gast_public_1.Terminal) {
              _this.walkTerminal(subProd, currRest, prevRest);
            } else if (subProd instanceof gast_public_1.Alternative) {
              _this.walkFlat(subProd, currRest, prevRest);
            } else if (subProd instanceof gast_public_1.Option) {
              _this.walkOption(subProd, currRest, prevRest);
            } else if (subProd instanceof gast_public_1.RepetitionMandatory) {
              _this.walkAtLeastOne(subProd, currRest, prevRest);
            } else if (subProd instanceof gast_public_1.RepetitionMandatoryWithSeparator) {
              _this.walkAtLeastOneSep(subProd, currRest, prevRest);
            } else if (subProd instanceof gast_public_1.RepetitionWithSeparator) {
              _this.walkManySep(subProd, currRest, prevRest);
            } else if (subProd instanceof gast_public_1.Repetition) {
              _this.walkMany(subProd, currRest, prevRest);
            } else if (subProd instanceof gast_public_1.Alternation) {
              _this.walkOr(subProd, currRest, prevRest);
            } else {
              throw Error("non exhaustive match");
            }
          });
        };
        RestWalker2.prototype.walkTerminal = function(terminal, currRest, prevRest) {
        };
        RestWalker2.prototype.walkProdRef = function(refProd, currRest, prevRest) {
        };
        RestWalker2.prototype.walkFlat = function(flatProd, currRest, prevRest) {
          var fullOrRest = currRest.concat(prevRest);
          this.walk(flatProd, fullOrRest);
        };
        RestWalker2.prototype.walkOption = function(optionProd, currRest, prevRest) {
          var fullOrRest = currRest.concat(prevRest);
          this.walk(optionProd, fullOrRest);
        };
        RestWalker2.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
          var fullAtLeastOneRest = [
            new gast_public_1.Option({ definition: atLeastOneProd.definition })
          ].concat(currRest, prevRest);
          this.walk(atLeastOneProd, fullAtLeastOneRest);
        };
        RestWalker2.prototype.walkAtLeastOneSep = function(atLeastOneSepProd, currRest, prevRest) {
          var fullAtLeastOneSepRest = restForRepetitionWithSeparator(atLeastOneSepProd, currRest, prevRest);
          this.walk(atLeastOneSepProd, fullAtLeastOneSepRest);
        };
        RestWalker2.prototype.walkMany = function(manyProd, currRest, prevRest) {
          var fullManyRest = [
            new gast_public_1.Option({ definition: manyProd.definition })
          ].concat(currRest, prevRest);
          this.walk(manyProd, fullManyRest);
        };
        RestWalker2.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
          var fullManySepRest = restForRepetitionWithSeparator(manySepProd, currRest, prevRest);
          this.walk(manySepProd, fullManySepRest);
        };
        RestWalker2.prototype.walkOr = function(orProd, currRest, prevRest) {
          var _this = this;
          var fullOrRest = currRest.concat(prevRest);
          utils_1.forEach(orProd.definition, function(alt) {
            var prodWrapper = new gast_public_1.Alternative({ definition: [alt] });
            _this.walk(prodWrapper, fullOrRest);
          });
        };
        return RestWalker2;
      }()
    );
    exports2.RestWalker = RestWalker;
    function restForRepetitionWithSeparator(repSepProd, currRest, prevRest) {
      var repSepRest = [
        new gast_public_1.Option({
          definition: [new gast_public_1.Terminal({ terminalType: repSepProd.separator })].concat(repSepProd.definition)
        })
      ];
      var fullRepSepRest = repSepRest.concat(currRest, prevRest);
      return fullRepSepRest;
    }
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/gast/gast_visitor_public.js
var require_gast_visitor_public = __commonJS({
  "node_modules/chevrotain/lib/src/parse/grammar/gast/gast_visitor_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GAstVisitor = void 0;
    var gast_public_1 = require_gast_public();
    var GAstVisitor = (
      /** @class */
      function() {
        function GAstVisitor2() {
        }
        GAstVisitor2.prototype.visit = function(node) {
          var nodeAny = node;
          switch (nodeAny.constructor) {
            case gast_public_1.NonTerminal:
              return this.visitNonTerminal(nodeAny);
            case gast_public_1.Alternative:
              return this.visitAlternative(nodeAny);
            case gast_public_1.Option:
              return this.visitOption(nodeAny);
            case gast_public_1.RepetitionMandatory:
              return this.visitRepetitionMandatory(nodeAny);
            case gast_public_1.RepetitionMandatoryWithSeparator:
              return this.visitRepetitionMandatoryWithSeparator(nodeAny);
            case gast_public_1.RepetitionWithSeparator:
              return this.visitRepetitionWithSeparator(nodeAny);
            case gast_public_1.Repetition:
              return this.visitRepetition(nodeAny);
            case gast_public_1.Alternation:
              return this.visitAlternation(nodeAny);
            case gast_public_1.Terminal:
              return this.visitTerminal(nodeAny);
            case gast_public_1.Rule:
              return this.visitRule(nodeAny);
            default:
              throw Error("non exhaustive match");
          }
        };
        GAstVisitor2.prototype.visitNonTerminal = function(node) {
        };
        GAstVisitor2.prototype.visitAlternative = function(node) {
        };
        GAstVisitor2.prototype.visitOption = function(node) {
        };
        GAstVisitor2.prototype.visitRepetition = function(node) {
        };
        GAstVisitor2.prototype.visitRepetitionMandatory = function(node) {
        };
        GAstVisitor2.prototype.visitRepetitionMandatoryWithSeparator = function(node) {
        };
        GAstVisitor2.prototype.visitRepetitionWithSeparator = function(node) {
        };
        GAstVisitor2.prototype.visitAlternation = function(node) {
        };
        GAstVisitor2.prototype.visitTerminal = function(node) {
        };
        GAstVisitor2.prototype.visitRule = function(node) {
        };
        return GAstVisitor2;
      }()
    );
    exports2.GAstVisitor = GAstVisitor;
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/gast/gast.js
var require_gast = __commonJS({
  "node_modules/chevrotain/lib/src/parse/grammar/gast/gast.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.collectMethods = exports2.DslMethodsCollectorVisitor = exports2.getProductionDslName = exports2.isBranchingProd = exports2.isOptionalProd = exports2.isSequenceProd = void 0;
    var utils_1 = require_utils();
    var gast_public_1 = require_gast_public();
    var gast_visitor_public_1 = require_gast_visitor_public();
    function isSequenceProd(prod) {
      return prod instanceof gast_public_1.Alternative || prod instanceof gast_public_1.Option || prod instanceof gast_public_1.Repetition || prod instanceof gast_public_1.RepetitionMandatory || prod instanceof gast_public_1.RepetitionMandatoryWithSeparator || prod instanceof gast_public_1.RepetitionWithSeparator || prod instanceof gast_public_1.Terminal || prod instanceof gast_public_1.Rule;
    }
    exports2.isSequenceProd = isSequenceProd;
    function isOptionalProd(prod, alreadyVisited) {
      if (alreadyVisited === void 0) {
        alreadyVisited = [];
      }
      var isDirectlyOptional = prod instanceof gast_public_1.Option || prod instanceof gast_public_1.Repetition || prod instanceof gast_public_1.RepetitionWithSeparator;
      if (isDirectlyOptional) {
        return true;
      }
      if (prod instanceof gast_public_1.Alternation) {
        return utils_1.some(prod.definition, function(subProd) {
          return isOptionalProd(subProd, alreadyVisited);
        });
      } else if (prod instanceof gast_public_1.NonTerminal && utils_1.contains(alreadyVisited, prod)) {
        return false;
      } else if (prod instanceof gast_public_1.AbstractProduction) {
        if (prod instanceof gast_public_1.NonTerminal) {
          alreadyVisited.push(prod);
        }
        return utils_1.every(prod.definition, function(subProd) {
          return isOptionalProd(subProd, alreadyVisited);
        });
      } else {
        return false;
      }
    }
    exports2.isOptionalProd = isOptionalProd;
    function isBranchingProd(prod) {
      return prod instanceof gast_public_1.Alternation;
    }
    exports2.isBranchingProd = isBranchingProd;
    function getProductionDslName(prod) {
      if (prod instanceof gast_public_1.NonTerminal) {
        return "SUBRULE";
      } else if (prod instanceof gast_public_1.Option) {
        return "OPTION";
      } else if (prod instanceof gast_public_1.Alternation) {
        return "OR";
      } else if (prod instanceof gast_public_1.RepetitionMandatory) {
        return "AT_LEAST_ONE";
      } else if (prod instanceof gast_public_1.RepetitionMandatoryWithSeparator) {
        return "AT_LEAST_ONE_SEP";
      } else if (prod instanceof gast_public_1.RepetitionWithSeparator) {
        return "MANY_SEP";
      } else if (prod instanceof gast_public_1.Repetition) {
        return "MANY";
      } else if (prod instanceof gast_public_1.Terminal) {
        return "CONSUME";
      } else {
        throw Error("non exhaustive match");
      }
    }
    exports2.getProductionDslName = getProductionDslName;
    var DslMethodsCollectorVisitor = (
      /** @class */
      function(_super) {
        __extends(DslMethodsCollectorVisitor2, _super);
        function DslMethodsCollectorVisitor2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.separator = "-";
          _this.dslMethods = {
            option: [],
            alternation: [],
            repetition: [],
            repetitionWithSeparator: [],
            repetitionMandatory: [],
            repetitionMandatoryWithSeparator: []
          };
          return _this;
        }
        DslMethodsCollectorVisitor2.prototype.reset = function() {
          this.dslMethods = {
            option: [],
            alternation: [],
            repetition: [],
            repetitionWithSeparator: [],
            repetitionMandatory: [],
            repetitionMandatoryWithSeparator: []
          };
        };
        DslMethodsCollectorVisitor2.prototype.visitTerminal = function(terminal) {
          var key = terminal.terminalType.name + this.separator + "Terminal";
          if (!utils_1.has(this.dslMethods, key)) {
            this.dslMethods[key] = [];
          }
          this.dslMethods[key].push(terminal);
        };
        DslMethodsCollectorVisitor2.prototype.visitNonTerminal = function(subrule) {
          var key = subrule.nonTerminalName + this.separator + "Terminal";
          if (!utils_1.has(this.dslMethods, key)) {
            this.dslMethods[key] = [];
          }
          this.dslMethods[key].push(subrule);
        };
        DslMethodsCollectorVisitor2.prototype.visitOption = function(option) {
          this.dslMethods.option.push(option);
        };
        DslMethodsCollectorVisitor2.prototype.visitRepetitionWithSeparator = function(manySep) {
          this.dslMethods.repetitionWithSeparator.push(manySep);
        };
        DslMethodsCollectorVisitor2.prototype.visitRepetitionMandatory = function(atLeastOne) {
          this.dslMethods.repetitionMandatory.push(atLeastOne);
        };
        DslMethodsCollectorVisitor2.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
          this.dslMethods.repetitionMandatoryWithSeparator.push(atLeastOneSep);
        };
        DslMethodsCollectorVisitor2.prototype.visitRepetition = function(many) {
          this.dslMethods.repetition.push(many);
        };
        DslMethodsCollectorVisitor2.prototype.visitAlternation = function(or) {
          this.dslMethods.alternation.push(or);
        };
        return DslMethodsCollectorVisitor2;
      }(gast_visitor_public_1.GAstVisitor)
    );
    exports2.DslMethodsCollectorVisitor = DslMethodsCollectorVisitor;
    var collectorVisitor = new DslMethodsCollectorVisitor();
    function collectMethods(rule) {
      collectorVisitor.reset();
      rule.accept(collectorVisitor);
      var dslMethods = collectorVisitor.dslMethods;
      collectorVisitor.reset();
      return dslMethods;
    }
    exports2.collectMethods = collectMethods;
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/first.js
var require_first = __commonJS({
  "node_modules/chevrotain/lib/src/parse/grammar/first.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.firstForTerminal = exports2.firstForBranching = exports2.firstForSequence = exports2.first = void 0;
    var utils_1 = require_utils();
    var gast_public_1 = require_gast_public();
    var gast_1 = require_gast();
    function first2(prod) {
      if (prod instanceof gast_public_1.NonTerminal) {
        return first2(prod.referencedRule);
      } else if (prod instanceof gast_public_1.Terminal) {
        return firstForTerminal(prod);
      } else if (gast_1.isSequenceProd(prod)) {
        return firstForSequence(prod);
      } else if (gast_1.isBranchingProd(prod)) {
        return firstForBranching(prod);
      } else {
        throw Error("non exhaustive match");
      }
    }
    exports2.first = first2;
    function firstForSequence(prod) {
      var firstSet = [];
      var seq = prod.definition;
      var nextSubProdIdx = 0;
      var hasInnerProdsRemaining = seq.length > nextSubProdIdx;
      var currSubProd;
      var isLastInnerProdOptional = true;
      while (hasInnerProdsRemaining && isLastInnerProdOptional) {
        currSubProd = seq[nextSubProdIdx];
        isLastInnerProdOptional = gast_1.isOptionalProd(currSubProd);
        firstSet = firstSet.concat(first2(currSubProd));
        nextSubProdIdx = nextSubProdIdx + 1;
        hasInnerProdsRemaining = seq.length > nextSubProdIdx;
      }
      return utils_1.uniq(firstSet);
    }
    exports2.firstForSequence = firstForSequence;
    function firstForBranching(prod) {
      var allAlternativesFirsts = utils_1.map(prod.definition, function(innerProd) {
        return first2(innerProd);
      });
      return utils_1.uniq(utils_1.flatten(allAlternativesFirsts));
    }
    exports2.firstForBranching = firstForBranching;
    function firstForTerminal(terminal) {
      return [terminal.terminalType];
    }
    exports2.firstForTerminal = firstForTerminal;
  }
});

// node_modules/chevrotain/lib/src/parse/constants.js
var require_constants = __commonJS({
  "node_modules/chevrotain/lib/src/parse/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.IN = void 0;
    exports2.IN = "_~IN~_";
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/follow.js
var require_follow = __commonJS({
  "node_modules/chevrotain/lib/src/parse/grammar/follow.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.buildInProdFollowPrefix = exports2.buildBetweenProdsFollowPrefix = exports2.computeAllProdsFollows = exports2.ResyncFollowsWalker = void 0;
    var rest_1 = require_rest();
    var first_1 = require_first();
    var utils_1 = require_utils();
    var constants_1 = require_constants();
    var gast_public_1 = require_gast_public();
    var ResyncFollowsWalker = (
      /** @class */
      function(_super) {
        __extends(ResyncFollowsWalker2, _super);
        function ResyncFollowsWalker2(topProd) {
          var _this = _super.call(this) || this;
          _this.topProd = topProd;
          _this.follows = {};
          return _this;
        }
        ResyncFollowsWalker2.prototype.startWalking = function() {
          this.walk(this.topProd);
          return this.follows;
        };
        ResyncFollowsWalker2.prototype.walkTerminal = function(terminal, currRest, prevRest) {
        };
        ResyncFollowsWalker2.prototype.walkProdRef = function(refProd, currRest, prevRest) {
          var followName = buildBetweenProdsFollowPrefix(refProd.referencedRule, refProd.idx) + this.topProd.name;
          var fullRest = currRest.concat(prevRest);
          var restProd = new gast_public_1.Alternative({ definition: fullRest });
          var t_in_topProd_follows = first_1.first(restProd);
          this.follows[followName] = t_in_topProd_follows;
        };
        return ResyncFollowsWalker2;
      }(rest_1.RestWalker)
    );
    exports2.ResyncFollowsWalker = ResyncFollowsWalker;
    function computeAllProdsFollows(topProductions) {
      var reSyncFollows = {};
      utils_1.forEach(topProductions, function(topProd) {
        var currRefsFollow = new ResyncFollowsWalker(topProd).startWalking();
        utils_1.assign(reSyncFollows, currRefsFollow);
      });
      return reSyncFollows;
    }
    exports2.computeAllProdsFollows = computeAllProdsFollows;
    function buildBetweenProdsFollowPrefix(inner, occurenceInParent) {
      return inner.name + occurenceInParent + constants_1.IN;
    }
    exports2.buildBetweenProdsFollowPrefix = buildBetweenProdsFollowPrefix;
    function buildInProdFollowPrefix(terminal) {
      var terminalName = terminal.terminalType.name;
      return terminalName + terminal.idx + constants_1.IN;
    }
    exports2.buildInProdFollowPrefix = buildInProdFollowPrefix;
  }
});

// node_modules/chevrotain/lib/src/parse/errors_public.js
var require_errors_public = __commonJS({
  "node_modules/chevrotain/lib/src/parse/errors_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defaultGrammarValidatorErrorProvider = exports2.defaultGrammarResolverErrorProvider = exports2.defaultParserErrorProvider = void 0;
    var tokens_public_1 = require_tokens_public();
    var utils = require_utils();
    var utils_1 = require_utils();
    var gast_public_1 = require_gast_public();
    var gast_1 = require_gast();
    exports2.defaultParserErrorProvider = {
      buildMismatchTokenMessage: function(_a) {
        var expected = _a.expected, actual = _a.actual, previous = _a.previous, ruleName = _a.ruleName;
        var hasLabel = tokens_public_1.hasTokenLabel(expected);
        var expectedMsg = hasLabel ? "--> " + tokens_public_1.tokenLabel(expected) + " <--" : "token of type --> " + expected.name + " <--";
        var msg = "Expecting " + expectedMsg + " but found --> '" + actual.image + "' <--";
        return msg;
      },
      buildNotAllInputParsedMessage: function(_a) {
        var firstRedundant = _a.firstRedundant, ruleName = _a.ruleName;
        return "Redundant input, expecting EOF but found: " + firstRedundant.image;
      },
      buildNoViableAltMessage: function(_a) {
        var expectedPathsPerAlt = _a.expectedPathsPerAlt, actual = _a.actual, previous = _a.previous, customUserDescription = _a.customUserDescription, ruleName = _a.ruleName;
        var errPrefix = "Expecting: ";
        var actualText = utils_1.first(actual).image;
        var errSuffix = "\nbut found: '" + actualText + "'";
        if (customUserDescription) {
          return errPrefix + customUserDescription + errSuffix;
        } else {
          var allLookAheadPaths = utils_1.reduce(expectedPathsPerAlt, function(result, currAltPaths) {
            return result.concat(currAltPaths);
          }, []);
          var nextValidTokenSequences = utils_1.map(allLookAheadPaths, function(currPath) {
            return "[" + utils_1.map(currPath, function(currTokenType) {
              return tokens_public_1.tokenLabel(currTokenType);
            }).join(", ") + "]";
          });
          var nextValidSequenceItems = utils_1.map(nextValidTokenSequences, function(itemMsg, idx) {
            return "  " + (idx + 1) + ". " + itemMsg;
          });
          var calculatedDescription = "one of these possible Token sequences:\n" + nextValidSequenceItems.join("\n");
          return errPrefix + calculatedDescription + errSuffix;
        }
      },
      buildEarlyExitMessage: function(_a) {
        var expectedIterationPaths = _a.expectedIterationPaths, actual = _a.actual, customUserDescription = _a.customUserDescription, ruleName = _a.ruleName;
        var errPrefix = "Expecting: ";
        var actualText = utils_1.first(actual).image;
        var errSuffix = "\nbut found: '" + actualText + "'";
        if (customUserDescription) {
          return errPrefix + customUserDescription + errSuffix;
        } else {
          var nextValidTokenSequences = utils_1.map(expectedIterationPaths, function(currPath) {
            return "[" + utils_1.map(currPath, function(currTokenType) {
              return tokens_public_1.tokenLabel(currTokenType);
            }).join(",") + "]";
          });
          var calculatedDescription = "expecting at least one iteration which starts with one of these possible Token sequences::\n  " + ("<" + nextValidTokenSequences.join(" ,") + ">");
          return errPrefix + calculatedDescription + errSuffix;
        }
      }
    };
    Object.freeze(exports2.defaultParserErrorProvider);
    exports2.defaultGrammarResolverErrorProvider = {
      buildRuleNotFoundError: function(topLevelRule, undefinedRule) {
        var msg = "Invalid grammar, reference to a rule which is not defined: ->" + undefinedRule.nonTerminalName + "<-\ninside top level rule: ->" + topLevelRule.name + "<-";
        return msg;
      }
    };
    exports2.defaultGrammarValidatorErrorProvider = {
      buildDuplicateFoundError: function(topLevelRule, duplicateProds) {
        function getExtraProductionArgument(prod) {
          if (prod instanceof gast_public_1.Terminal) {
            return prod.terminalType.name;
          } else if (prod instanceof gast_public_1.NonTerminal) {
            return prod.nonTerminalName;
          } else {
            return "";
          }
        }
        var topLevelName = topLevelRule.name;
        var duplicateProd = utils_1.first(duplicateProds);
        var index = duplicateProd.idx;
        var dslName = gast_1.getProductionDslName(duplicateProd);
        var extraArgument = getExtraProductionArgument(duplicateProd);
        var hasExplicitIndex = index > 0;
        var msg = "->" + dslName + (hasExplicitIndex ? index : "") + "<- " + (extraArgument ? "with argument: ->" + extraArgument + "<-" : "") + "\n                  appears more than once (" + duplicateProds.length + " times) in the top level rule: ->" + topLevelName + "<-.                  \n                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES \n                  ";
        msg = msg.replace(/[ \t]+/g, " ");
        msg = msg.replace(/\s\s+/g, "\n");
        return msg;
      },
      buildNamespaceConflictError: function(rule) {
        var errMsg = "Namespace conflict found in grammar.\n" + ("The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <" + rule.name + ">.\n") + "To resolve this make sure each Terminal and Non-Terminal names are unique\nThis is easy to accomplish by using the convention that Terminal names start with an uppercase letter\nand Non-Terminal names start with a lower case letter.";
        return errMsg;
      },
      buildAlternationPrefixAmbiguityError: function(options) {
        var pathMsg = utils_1.map(options.prefixPath, function(currTok) {
          return tokens_public_1.tokenLabel(currTok);
        }).join(", ");
        var occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
        var errMsg = "Ambiguous alternatives: <" + options.ambiguityIndices.join(" ,") + "> due to common lookahead prefix\n" + ("in <OR" + occurrence + "> inside <" + options.topLevelRule.name + "> Rule,\n") + ("<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n") + "See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX\nFor Further details.";
        return errMsg;
      },
      buildAlternationAmbiguityError: function(options) {
        var pathMsg = utils_1.map(options.prefixPath, function(currtok) {
          return tokens_public_1.tokenLabel(currtok);
        }).join(", ");
        var occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
        var currMessage = "Ambiguous Alternatives Detected: <" + options.ambiguityIndices.join(" ,") + "> in <OR" + occurrence + ">" + (" inside <" + options.topLevelRule.name + "> Rule,\n") + ("<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n");
        currMessage = currMessage + "See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\nFor Further details.";
        return currMessage;
      },
      buildEmptyRepetitionError: function(options) {
        var dslName = gast_1.getProductionDslName(options.repetition);
        if (options.repetition.idx !== 0) {
          dslName += options.repetition.idx;
        }
        var errMsg = "The repetition <" + dslName + "> within Rule <" + options.topLevelRule.name + "> can never consume any tokens.\nThis could lead to an infinite loop.";
        return errMsg;
      },
      // TODO: remove - `errors_public` from nyc.config.js exclude
      //       once this method is fully removed from this file
      buildTokenNameError: function(options) {
        return "deprecated";
      },
      buildEmptyAlternationError: function(options) {
        var errMsg = "Ambiguous empty alternative: <" + (options.emptyChoiceIdx + 1) + ">" + (" in <OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n") + "Only the last alternative may be an empty alternative.";
        return errMsg;
      },
      buildTooManyAlternativesError: function(options) {
        var errMsg = "An Alternation cannot have more than 256 alternatives:\n" + ("<OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n has " + (options.alternation.definition.length + 1) + " alternatives.");
        return errMsg;
      },
      buildLeftRecursionError: function(options) {
        var ruleName = options.topLevelRule.name;
        var pathNames = utils.map(options.leftRecursionPath, function(currRule) {
          return currRule.name;
        });
        var leftRecursivePath = ruleName + " --> " + pathNames.concat([ruleName]).join(" --> ");
        var errMsg = "Left Recursion found in grammar.\n" + ("rule: <" + ruleName + "> can be invoked from itself (directly or indirectly)\n") + ("without consuming any Tokens. The grammar path that causes this is: \n " + leftRecursivePath + "\n") + " To fix this refactor your grammar to remove the left recursion.\nsee: https://en.wikipedia.org/wiki/LL_parser#Left_Factoring.";
        return errMsg;
      },
      // TODO: remove - `errors_public` from nyc.config.js exclude
      //       once this method is fully removed from this file
      buildInvalidRuleNameError: function(options) {
        return "deprecated";
      },
      buildDuplicateRuleNameError: function(options) {
        var ruleName;
        if (options.topLevelRule instanceof gast_public_1.Rule) {
          ruleName = options.topLevelRule.name;
        } else {
          ruleName = options.topLevelRule;
        }
        var errMsg = "Duplicate definition, rule: ->" + ruleName + "<- is already defined in the grammar: ->" + options.grammarName + "<-";
        return errMsg;
      }
    };
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/resolver.js
var require_resolver = __commonJS({
  "node_modules/chevrotain/lib/src/parse/grammar/resolver.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GastRefResolverVisitor = exports2.resolveGrammar = void 0;
    var parser_1 = require_parser();
    var utils_1 = require_utils();
    var gast_visitor_public_1 = require_gast_visitor_public();
    function resolveGrammar(topLevels, errMsgProvider) {
      var refResolver = new GastRefResolverVisitor(topLevels, errMsgProvider);
      refResolver.resolveRefs();
      return refResolver.errors;
    }
    exports2.resolveGrammar = resolveGrammar;
    var GastRefResolverVisitor = (
      /** @class */
      function(_super) {
        __extends(GastRefResolverVisitor2, _super);
        function GastRefResolverVisitor2(nameToTopRule, errMsgProvider) {
          var _this = _super.call(this) || this;
          _this.nameToTopRule = nameToTopRule;
          _this.errMsgProvider = errMsgProvider;
          _this.errors = [];
          return _this;
        }
        GastRefResolverVisitor2.prototype.resolveRefs = function() {
          var _this = this;
          utils_1.forEach(utils_1.values(this.nameToTopRule), function(prod) {
            _this.currTopLevel = prod;
            prod.accept(_this);
          });
        };
        GastRefResolverVisitor2.prototype.visitNonTerminal = function(node) {
          var ref = this.nameToTopRule[node.nonTerminalName];
          if (!ref) {
            var msg = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, node);
            this.errors.push({
              message: msg,
              type: parser_1.ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,
              ruleName: this.currTopLevel.name,
              unresolvedRefName: node.nonTerminalName
            });
          } else {
            node.referencedRule = ref;
          }
        };
        return GastRefResolverVisitor2;
      }(gast_visitor_public_1.GAstVisitor)
    );
    exports2.GastRefResolverVisitor = GastRefResolverVisitor;
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/interpreter.js
var require_interpreter = __commonJS({
  "node_modules/chevrotain/lib/src/parse/grammar/interpreter.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.nextPossibleTokensAfter = exports2.possiblePathsFrom = exports2.NextTerminalAfterAtLeastOneSepWalker = exports2.NextTerminalAfterAtLeastOneWalker = exports2.NextTerminalAfterManySepWalker = exports2.NextTerminalAfterManyWalker = exports2.AbstractNextTerminalAfterProductionWalker = exports2.NextAfterTokenWalker = exports2.AbstractNextPossibleTokensWalker = void 0;
    var rest_1 = require_rest();
    var utils_1 = require_utils();
    var first_1 = require_first();
    var gast_public_1 = require_gast_public();
    var AbstractNextPossibleTokensWalker = (
      /** @class */
      function(_super) {
        __extends(AbstractNextPossibleTokensWalker2, _super);
        function AbstractNextPossibleTokensWalker2(topProd, path) {
          var _this = _super.call(this) || this;
          _this.topProd = topProd;
          _this.path = path;
          _this.possibleTokTypes = [];
          _this.nextProductionName = "";
          _this.nextProductionOccurrence = 0;
          _this.found = false;
          _this.isAtEndOfPath = false;
          return _this;
        }
        AbstractNextPossibleTokensWalker2.prototype.startWalking = function() {
          this.found = false;
          if (this.path.ruleStack[0] !== this.topProd.name) {
            throw Error("The path does not start with the walker's top Rule!");
          }
          this.ruleStack = utils_1.cloneArr(this.path.ruleStack).reverse();
          this.occurrenceStack = utils_1.cloneArr(this.path.occurrenceStack).reverse();
          this.ruleStack.pop();
          this.occurrenceStack.pop();
          this.updateExpectedNext();
          this.walk(this.topProd);
          return this.possibleTokTypes;
        };
        AbstractNextPossibleTokensWalker2.prototype.walk = function(prod, prevRest) {
          if (prevRest === void 0) {
            prevRest = [];
          }
          if (!this.found) {
            _super.prototype.walk.call(this, prod, prevRest);
          }
        };
        AbstractNextPossibleTokensWalker2.prototype.walkProdRef = function(refProd, currRest, prevRest) {
          if (refProd.referencedRule.name === this.nextProductionName && refProd.idx === this.nextProductionOccurrence) {
            var fullRest = currRest.concat(prevRest);
            this.updateExpectedNext();
            this.walk(refProd.referencedRule, fullRest);
          }
        };
        AbstractNextPossibleTokensWalker2.prototype.updateExpectedNext = function() {
          if (utils_1.isEmpty(this.ruleStack)) {
            this.nextProductionName = "";
            this.nextProductionOccurrence = 0;
            this.isAtEndOfPath = true;
          } else {
            this.nextProductionName = this.ruleStack.pop();
            this.nextProductionOccurrence = this.occurrenceStack.pop();
          }
        };
        return AbstractNextPossibleTokensWalker2;
      }(rest_1.RestWalker)
    );
    exports2.AbstractNextPossibleTokensWalker = AbstractNextPossibleTokensWalker;
    var NextAfterTokenWalker = (
      /** @class */
      function(_super) {
        __extends(NextAfterTokenWalker2, _super);
        function NextAfterTokenWalker2(topProd, path) {
          var _this = _super.call(this, topProd, path) || this;
          _this.path = path;
          _this.nextTerminalName = "";
          _this.nextTerminalOccurrence = 0;
          _this.nextTerminalName = _this.path.lastTok.name;
          _this.nextTerminalOccurrence = _this.path.lastTokOccurrence;
          return _this;
        }
        NextAfterTokenWalker2.prototype.walkTerminal = function(terminal, currRest, prevRest) {
          if (this.isAtEndOfPath && terminal.terminalType.name === this.nextTerminalName && terminal.idx === this.nextTerminalOccurrence && !this.found) {
            var fullRest = currRest.concat(prevRest);
            var restProd = new gast_public_1.Alternative({ definition: fullRest });
            this.possibleTokTypes = first_1.first(restProd);
            this.found = true;
          }
        };
        return NextAfterTokenWalker2;
      }(AbstractNextPossibleTokensWalker)
    );
    exports2.NextAfterTokenWalker = NextAfterTokenWalker;
    var AbstractNextTerminalAfterProductionWalker = (
      /** @class */
      function(_super) {
        __extends(AbstractNextTerminalAfterProductionWalker2, _super);
        function AbstractNextTerminalAfterProductionWalker2(topRule, occurrence) {
          var _this = _super.call(this) || this;
          _this.topRule = topRule;
          _this.occurrence = occurrence;
          _this.result = {
            token: void 0,
            occurrence: void 0,
            isEndOfRule: void 0
          };
          return _this;
        }
        AbstractNextTerminalAfterProductionWalker2.prototype.startWalking = function() {
          this.walk(this.topRule);
          return this.result;
        };
        return AbstractNextTerminalAfterProductionWalker2;
      }(rest_1.RestWalker)
    );
    exports2.AbstractNextTerminalAfterProductionWalker = AbstractNextTerminalAfterProductionWalker;
    var NextTerminalAfterManyWalker = (
      /** @class */
      function(_super) {
        __extends(NextTerminalAfterManyWalker2, _super);
        function NextTerminalAfterManyWalker2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        NextTerminalAfterManyWalker2.prototype.walkMany = function(manyProd, currRest, prevRest) {
          if (manyProd.idx === this.occurrence) {
            var firstAfterMany = utils_1.first(currRest.concat(prevRest));
            this.result.isEndOfRule = firstAfterMany === void 0;
            if (firstAfterMany instanceof gast_public_1.Terminal) {
              this.result.token = firstAfterMany.terminalType;
              this.result.occurrence = firstAfterMany.idx;
            }
          } else {
            _super.prototype.walkMany.call(this, manyProd, currRest, prevRest);
          }
        };
        return NextTerminalAfterManyWalker2;
      }(AbstractNextTerminalAfterProductionWalker)
    );
    exports2.NextTerminalAfterManyWalker = NextTerminalAfterManyWalker;
    var NextTerminalAfterManySepWalker = (
      /** @class */
      function(_super) {
        __extends(NextTerminalAfterManySepWalker2, _super);
        function NextTerminalAfterManySepWalker2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        NextTerminalAfterManySepWalker2.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
          if (manySepProd.idx === this.occurrence) {
            var firstAfterManySep = utils_1.first(currRest.concat(prevRest));
            this.result.isEndOfRule = firstAfterManySep === void 0;
            if (firstAfterManySep instanceof gast_public_1.Terminal) {
              this.result.token = firstAfterManySep.terminalType;
              this.result.occurrence = firstAfterManySep.idx;
            }
          } else {
            _super.prototype.walkManySep.call(this, manySepProd, currRest, prevRest);
          }
        };
        return NextTerminalAfterManySepWalker2;
      }(AbstractNextTerminalAfterProductionWalker)
    );
    exports2.NextTerminalAfterManySepWalker = NextTerminalAfterManySepWalker;
    var NextTerminalAfterAtLeastOneWalker = (
      /** @class */
      function(_super) {
        __extends(NextTerminalAfterAtLeastOneWalker2, _super);
        function NextTerminalAfterAtLeastOneWalker2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        NextTerminalAfterAtLeastOneWalker2.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
          if (atLeastOneProd.idx === this.occurrence) {
            var firstAfterAtLeastOne = utils_1.first(currRest.concat(prevRest));
            this.result.isEndOfRule = firstAfterAtLeastOne === void 0;
            if (firstAfterAtLeastOne instanceof gast_public_1.Terminal) {
              this.result.token = firstAfterAtLeastOne.terminalType;
              this.result.occurrence = firstAfterAtLeastOne.idx;
            }
          } else {
            _super.prototype.walkAtLeastOne.call(this, atLeastOneProd, currRest, prevRest);
          }
        };
        return NextTerminalAfterAtLeastOneWalker2;
      }(AbstractNextTerminalAfterProductionWalker)
    );
    exports2.NextTerminalAfterAtLeastOneWalker = NextTerminalAfterAtLeastOneWalker;
    var NextTerminalAfterAtLeastOneSepWalker = (
      /** @class */
      function(_super) {
        __extends(NextTerminalAfterAtLeastOneSepWalker2, _super);
        function NextTerminalAfterAtLeastOneSepWalker2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        NextTerminalAfterAtLeastOneSepWalker2.prototype.walkAtLeastOneSep = function(atleastOneSepProd, currRest, prevRest) {
          if (atleastOneSepProd.idx === this.occurrence) {
            var firstAfterfirstAfterAtLeastOneSep = utils_1.first(currRest.concat(prevRest));
            this.result.isEndOfRule = firstAfterfirstAfterAtLeastOneSep === void 0;
            if (firstAfterfirstAfterAtLeastOneSep instanceof gast_public_1.Terminal) {
              this.result.token = firstAfterfirstAfterAtLeastOneSep.terminalType;
              this.result.occurrence = firstAfterfirstAfterAtLeastOneSep.idx;
            }
          } else {
            _super.prototype.walkAtLeastOneSep.call(this, atleastOneSepProd, currRest, prevRest);
          }
        };
        return NextTerminalAfterAtLeastOneSepWalker2;
      }(AbstractNextTerminalAfterProductionWalker)
    );
    exports2.NextTerminalAfterAtLeastOneSepWalker = NextTerminalAfterAtLeastOneSepWalker;
    function possiblePathsFrom(targetDef, maxLength, currPath) {
      if (currPath === void 0) {
        currPath = [];
      }
      currPath = utils_1.cloneArr(currPath);
      var result = [];
      var i = 0;
      function remainingPathWith(nextDef) {
        return nextDef.concat(utils_1.drop(targetDef, i + 1));
      }
      function getAlternativesForProd(definition) {
        var alternatives = possiblePathsFrom(remainingPathWith(definition), maxLength, currPath);
        return result.concat(alternatives);
      }
      while (currPath.length < maxLength && i < targetDef.length) {
        var prod = targetDef[i];
        if (prod instanceof gast_public_1.Alternative) {
          return getAlternativesForProd(prod.definition);
        } else if (prod instanceof gast_public_1.NonTerminal) {
          return getAlternativesForProd(prod.definition);
        } else if (prod instanceof gast_public_1.Option) {
          result = getAlternativesForProd(prod.definition);
        } else if (prod instanceof gast_public_1.RepetitionMandatory) {
          var newDef = prod.definition.concat([
            new gast_public_1.Repetition({
              definition: prod.definition
            })
          ]);
          return getAlternativesForProd(newDef);
        } else if (prod instanceof gast_public_1.RepetitionMandatoryWithSeparator) {
          var newDef = [
            new gast_public_1.Alternative({ definition: prod.definition }),
            new gast_public_1.Repetition({
              definition: [new gast_public_1.Terminal({ terminalType: prod.separator })].concat(prod.definition)
            })
          ];
          return getAlternativesForProd(newDef);
        } else if (prod instanceof gast_public_1.RepetitionWithSeparator) {
          var newDef = prod.definition.concat([
            new gast_public_1.Repetition({
              definition: [new gast_public_1.Terminal({ terminalType: prod.separator })].concat(prod.definition)
            })
          ]);
          result = getAlternativesForProd(newDef);
        } else if (prod instanceof gast_public_1.Repetition) {
          var newDef = prod.definition.concat([
            new gast_public_1.Repetition({
              definition: prod.definition
            })
          ]);
          result = getAlternativesForProd(newDef);
        } else if (prod instanceof gast_public_1.Alternation) {
          utils_1.forEach(prod.definition, function(currAlt) {
            if (utils_1.isEmpty(currAlt.definition) === false) {
              result = getAlternativesForProd(currAlt.definition);
            }
          });
          return result;
        } else if (prod instanceof gast_public_1.Terminal) {
          currPath.push(prod.terminalType);
        } else {
          throw Error("non exhaustive match");
        }
        i++;
      }
      result.push({
        partialPath: currPath,
        suffixDef: utils_1.drop(targetDef, i)
      });
      return result;
    }
    exports2.possiblePathsFrom = possiblePathsFrom;
    function nextPossibleTokensAfter(initialDef, tokenVector, tokMatcher, maxLookAhead) {
      var EXIT_NON_TERMINAL = "EXIT_NONE_TERMINAL";
      var EXIT_NON_TERMINAL_ARR = [EXIT_NON_TERMINAL];
      var EXIT_ALTERNATIVE = "EXIT_ALTERNATIVE";
      var foundCompletePath = false;
      var tokenVectorLength = tokenVector.length;
      var minimalAlternativesIndex = tokenVectorLength - maxLookAhead - 1;
      var result = [];
      var possiblePaths = [];
      possiblePaths.push({
        idx: -1,
        def: initialDef,
        ruleStack: [],
        occurrenceStack: []
      });
      while (!utils_1.isEmpty(possiblePaths)) {
        var currPath = possiblePaths.pop();
        if (currPath === EXIT_ALTERNATIVE) {
          if (foundCompletePath && utils_1.last(possiblePaths).idx <= minimalAlternativesIndex) {
            possiblePaths.pop();
          }
          continue;
        }
        var currDef = currPath.def;
        var currIdx = currPath.idx;
        var currRuleStack = currPath.ruleStack;
        var currOccurrenceStack = currPath.occurrenceStack;
        if (utils_1.isEmpty(currDef)) {
          continue;
        }
        var prod = currDef[0];
        if (prod === EXIT_NON_TERMINAL) {
          var nextPath = {
            idx: currIdx,
            def: utils_1.drop(currDef),
            ruleStack: utils_1.dropRight(currRuleStack),
            occurrenceStack: utils_1.dropRight(currOccurrenceStack)
          };
          possiblePaths.push(nextPath);
        } else if (prod instanceof gast_public_1.Terminal) {
          if (currIdx < tokenVectorLength - 1) {
            var nextIdx = currIdx + 1;
            var actualToken = tokenVector[nextIdx];
            if (tokMatcher(actualToken, prod.terminalType)) {
              var nextPath = {
                idx: nextIdx,
                def: utils_1.drop(currDef),
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
              };
              possiblePaths.push(nextPath);
            }
          } else if (currIdx === tokenVectorLength - 1) {
            result.push({
              nextTokenType: prod.terminalType,
              nextTokenOccurrence: prod.idx,
              ruleStack: currRuleStack,
              occurrenceStack: currOccurrenceStack
            });
            foundCompletePath = true;
          } else {
            throw Error("non exhaustive match");
          }
        } else if (prod instanceof gast_public_1.NonTerminal) {
          var newRuleStack = utils_1.cloneArr(currRuleStack);
          newRuleStack.push(prod.nonTerminalName);
          var newOccurrenceStack = utils_1.cloneArr(currOccurrenceStack);
          newOccurrenceStack.push(prod.idx);
          var nextPath = {
            idx: currIdx,
            def: prod.definition.concat(EXIT_NON_TERMINAL_ARR, utils_1.drop(currDef)),
            ruleStack: newRuleStack,
            occurrenceStack: newOccurrenceStack
          };
          possiblePaths.push(nextPath);
        } else if (prod instanceof gast_public_1.Option) {
          var nextPathWithout = {
            idx: currIdx,
            def: utils_1.drop(currDef),
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPathWithout);
          possiblePaths.push(EXIT_ALTERNATIVE);
          var nextPathWith = {
            idx: currIdx,
            def: prod.definition.concat(utils_1.drop(currDef)),
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPathWith);
        } else if (prod instanceof gast_public_1.RepetitionMandatory) {
          var secondIteration = new gast_public_1.Repetition({
            definition: prod.definition,
            idx: prod.idx
          });
          var nextDef = prod.definition.concat([secondIteration], utils_1.drop(currDef));
          var nextPath = {
            idx: currIdx,
            def: nextDef,
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPath);
        } else if (prod instanceof gast_public_1.RepetitionMandatoryWithSeparator) {
          var separatorGast = new gast_public_1.Terminal({
            terminalType: prod.separator
          });
          var secondIteration = new gast_public_1.Repetition({
            definition: [separatorGast].concat(prod.definition),
            idx: prod.idx
          });
          var nextDef = prod.definition.concat([secondIteration], utils_1.drop(currDef));
          var nextPath = {
            idx: currIdx,
            def: nextDef,
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPath);
        } else if (prod instanceof gast_public_1.RepetitionWithSeparator) {
          var nextPathWithout = {
            idx: currIdx,
            def: utils_1.drop(currDef),
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPathWithout);
          possiblePaths.push(EXIT_ALTERNATIVE);
          var separatorGast = new gast_public_1.Terminal({
            terminalType: prod.separator
          });
          var nthRepetition = new gast_public_1.Repetition({
            definition: [separatorGast].concat(prod.definition),
            idx: prod.idx
          });
          var nextDef = prod.definition.concat([nthRepetition], utils_1.drop(currDef));
          var nextPathWith = {
            idx: currIdx,
            def: nextDef,
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPathWith);
        } else if (prod instanceof gast_public_1.Repetition) {
          var nextPathWithout = {
            idx: currIdx,
            def: utils_1.drop(currDef),
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPathWithout);
          possiblePaths.push(EXIT_ALTERNATIVE);
          var nthRepetition = new gast_public_1.Repetition({
            definition: prod.definition,
            idx: prod.idx
          });
          var nextDef = prod.definition.concat([nthRepetition], utils_1.drop(currDef));
          var nextPathWith = {
            idx: currIdx,
            def: nextDef,
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPathWith);
        } else if (prod instanceof gast_public_1.Alternation) {
          for (var i = prod.definition.length - 1; i >= 0; i--) {
            var currAlt = prod.definition[i];
            var currAltPath = {
              idx: currIdx,
              def: currAlt.definition.concat(utils_1.drop(currDef)),
              ruleStack: currRuleStack,
              occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(currAltPath);
            possiblePaths.push(EXIT_ALTERNATIVE);
          }
        } else if (prod instanceof gast_public_1.Alternative) {
          possiblePaths.push({
            idx: currIdx,
            def: prod.definition.concat(utils_1.drop(currDef)),
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          });
        } else if (prod instanceof gast_public_1.Rule) {
          possiblePaths.push(expandTopLevelRule(prod, currIdx, currRuleStack, currOccurrenceStack));
        } else {
          throw Error("non exhaustive match");
        }
      }
      return result;
    }
    exports2.nextPossibleTokensAfter = nextPossibleTokensAfter;
    function expandTopLevelRule(topRule, currIdx, currRuleStack, currOccurrenceStack) {
      var newRuleStack = utils_1.cloneArr(currRuleStack);
      newRuleStack.push(topRule.name);
      var newCurrOccurrenceStack = utils_1.cloneArr(currOccurrenceStack);
      newCurrOccurrenceStack.push(1);
      return {
        idx: currIdx,
        def: topRule.definition,
        ruleStack: newRuleStack,
        occurrenceStack: newCurrOccurrenceStack
      };
    }
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/lookahead.js
var require_lookahead = __commonJS({
  "node_modules/chevrotain/lib/src/parse/grammar/lookahead.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.areTokenCategoriesNotUsed = exports2.isStrictPrefixOfPath = exports2.containsPath = exports2.getLookaheadPathsForOptionalProd = exports2.getLookaheadPathsForOr = exports2.lookAheadSequenceFromAlternatives = exports2.buildSingleAlternativeLookaheadFunction = exports2.buildAlternativesLookAheadFunc = exports2.buildLookaheadFuncForOptionalProd = exports2.buildLookaheadFuncForOr = exports2.getProdType = exports2.PROD_TYPE = void 0;
    var utils_1 = require_utils();
    var interpreter_1 = require_interpreter();
    var rest_1 = require_rest();
    var tokens_1 = require_tokens();
    var gast_public_1 = require_gast_public();
    var gast_visitor_public_1 = require_gast_visitor_public();
    var PROD_TYPE;
    (function(PROD_TYPE2) {
      PROD_TYPE2[PROD_TYPE2["OPTION"] = 0] = "OPTION";
      PROD_TYPE2[PROD_TYPE2["REPETITION"] = 1] = "REPETITION";
      PROD_TYPE2[PROD_TYPE2["REPETITION_MANDATORY"] = 2] = "REPETITION_MANDATORY";
      PROD_TYPE2[PROD_TYPE2["REPETITION_MANDATORY_WITH_SEPARATOR"] = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR";
      PROD_TYPE2[PROD_TYPE2["REPETITION_WITH_SEPARATOR"] = 4] = "REPETITION_WITH_SEPARATOR";
      PROD_TYPE2[PROD_TYPE2["ALTERNATION"] = 5] = "ALTERNATION";
    })(PROD_TYPE = exports2.PROD_TYPE || (exports2.PROD_TYPE = {}));
    function getProdType(prod) {
      if (prod instanceof gast_public_1.Option) {
        return PROD_TYPE.OPTION;
      } else if (prod instanceof gast_public_1.Repetition) {
        return PROD_TYPE.REPETITION;
      } else if (prod instanceof gast_public_1.RepetitionMandatory) {
        return PROD_TYPE.REPETITION_MANDATORY;
      } else if (prod instanceof gast_public_1.RepetitionMandatoryWithSeparator) {
        return PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR;
      } else if (prod instanceof gast_public_1.RepetitionWithSeparator) {
        return PROD_TYPE.REPETITION_WITH_SEPARATOR;
      } else if (prod instanceof gast_public_1.Alternation) {
        return PROD_TYPE.ALTERNATION;
      } else {
        throw Error("non exhaustive match");
      }
    }
    exports2.getProdType = getProdType;
    function buildLookaheadFuncForOr(occurrence, ruleGrammar, maxLookahead, hasPredicates, dynamicTokensEnabled, laFuncBuilder) {
      var lookAheadPaths = getLookaheadPathsForOr(occurrence, ruleGrammar, maxLookahead);
      var tokenMatcher = areTokenCategoriesNotUsed(lookAheadPaths) ? tokens_1.tokenStructuredMatcherNoCategories : tokens_1.tokenStructuredMatcher;
      return laFuncBuilder(lookAheadPaths, hasPredicates, tokenMatcher, dynamicTokensEnabled);
    }
    exports2.buildLookaheadFuncForOr = buildLookaheadFuncForOr;
    function buildLookaheadFuncForOptionalProd(occurrence, ruleGrammar, k, dynamicTokensEnabled, prodType, lookaheadBuilder) {
      var lookAheadPaths = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k);
      var tokenMatcher = areTokenCategoriesNotUsed(lookAheadPaths) ? tokens_1.tokenStructuredMatcherNoCategories : tokens_1.tokenStructuredMatcher;
      return lookaheadBuilder(lookAheadPaths[0], tokenMatcher, dynamicTokensEnabled);
    }
    exports2.buildLookaheadFuncForOptionalProd = buildLookaheadFuncForOptionalProd;
    function buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled) {
      var numOfAlts = alts.length;
      var areAllOneTokenLookahead = utils_1.every(alts, function(currAlt) {
        return utils_1.every(currAlt, function(currPath) {
          return currPath.length === 1;
        });
      });
      if (hasPredicates) {
        return function(orAlts) {
          var predicates = utils_1.map(orAlts, function(currAlt2) {
            return currAlt2.GATE;
          });
          for (var t = 0; t < numOfAlts; t++) {
            var currAlt = alts[t];
            var currNumOfPaths = currAlt.length;
            var currPredicate = predicates[t];
            if (currPredicate !== void 0 && currPredicate.call(this) === false) {
              continue;
            }
            nextPath: for (var j = 0; j < currNumOfPaths; j++) {
              var currPath = currAlt[j];
              var currPathLength = currPath.length;
              for (var i = 0; i < currPathLength; i++) {
                var nextToken = this.LA(i + 1);
                if (tokenMatcher(nextToken, currPath[i]) === false) {
                  continue nextPath;
                }
              }
              return t;
            }
          }
          return void 0;
        };
      } else if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
        var singleTokenAlts = utils_1.map(alts, function(currAlt) {
          return utils_1.flatten(currAlt);
        });
        var choiceToAlt_1 = utils_1.reduce(singleTokenAlts, function(result, currAlt, idx) {
          utils_1.forEach(currAlt, function(currTokType) {
            if (!utils_1.has(result, currTokType.tokenTypeIdx)) {
              result[currTokType.tokenTypeIdx] = idx;
            }
            utils_1.forEach(currTokType.categoryMatches, function(currExtendingType) {
              if (!utils_1.has(result, currExtendingType)) {
                result[currExtendingType] = idx;
              }
            });
          });
          return result;
        }, []);
        return function() {
          var nextToken = this.LA(1);
          return choiceToAlt_1[nextToken.tokenTypeIdx];
        };
      } else {
        return function() {
          for (var t = 0; t < numOfAlts; t++) {
            var currAlt = alts[t];
            var currNumOfPaths = currAlt.length;
            nextPath: for (var j = 0; j < currNumOfPaths; j++) {
              var currPath = currAlt[j];
              var currPathLength = currPath.length;
              for (var i = 0; i < currPathLength; i++) {
                var nextToken = this.LA(i + 1);
                if (tokenMatcher(nextToken, currPath[i]) === false) {
                  continue nextPath;
                }
              }
              return t;
            }
          }
          return void 0;
        };
      }
    }
    exports2.buildAlternativesLookAheadFunc = buildAlternativesLookAheadFunc;
    function buildSingleAlternativeLookaheadFunction(alt, tokenMatcher, dynamicTokensEnabled) {
      var areAllOneTokenLookahead = utils_1.every(alt, function(currPath) {
        return currPath.length === 1;
      });
      var numOfPaths = alt.length;
      if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
        var singleTokensTypes = utils_1.flatten(alt);
        if (singleTokensTypes.length === 1 && utils_1.isEmpty(singleTokensTypes[0].categoryMatches)) {
          var expectedTokenType = singleTokensTypes[0];
          var expectedTokenUniqueKey_1 = expectedTokenType.tokenTypeIdx;
          return function() {
            return this.LA(1).tokenTypeIdx === expectedTokenUniqueKey_1;
          };
        } else {
          var choiceToAlt_2 = utils_1.reduce(singleTokensTypes, function(result, currTokType, idx) {
            result[currTokType.tokenTypeIdx] = true;
            utils_1.forEach(currTokType.categoryMatches, function(currExtendingType) {
              result[currExtendingType] = true;
            });
            return result;
          }, []);
          return function() {
            var nextToken = this.LA(1);
            return choiceToAlt_2[nextToken.tokenTypeIdx] === true;
          };
        }
      } else {
        return function() {
          nextPath: for (var j = 0; j < numOfPaths; j++) {
            var currPath = alt[j];
            var currPathLength = currPath.length;
            for (var i = 0; i < currPathLength; i++) {
              var nextToken = this.LA(i + 1);
              if (tokenMatcher(nextToken, currPath[i]) === false) {
                continue nextPath;
              }
            }
            return true;
          }
          return false;
        };
      }
    }
    exports2.buildSingleAlternativeLookaheadFunction = buildSingleAlternativeLookaheadFunction;
    var RestDefinitionFinderWalker = (
      /** @class */
      function(_super) {
        __extends(RestDefinitionFinderWalker2, _super);
        function RestDefinitionFinderWalker2(topProd, targetOccurrence, targetProdType) {
          var _this = _super.call(this) || this;
          _this.topProd = topProd;
          _this.targetOccurrence = targetOccurrence;
          _this.targetProdType = targetProdType;
          return _this;
        }
        RestDefinitionFinderWalker2.prototype.startWalking = function() {
          this.walk(this.topProd);
          return this.restDef;
        };
        RestDefinitionFinderWalker2.prototype.checkIsTarget = function(node, expectedProdType, currRest, prevRest) {
          if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdType) {
            this.restDef = currRest.concat(prevRest);
            return true;
          }
          return false;
        };
        RestDefinitionFinderWalker2.prototype.walkOption = function(optionProd, currRest, prevRest) {
          if (!this.checkIsTarget(optionProd, PROD_TYPE.OPTION, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, optionProd, currRest, prevRest);
          }
        };
        RestDefinitionFinderWalker2.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
          if (!this.checkIsTarget(atLeastOneProd, PROD_TYPE.REPETITION_MANDATORY, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, atLeastOneProd, currRest, prevRest);
          }
        };
        RestDefinitionFinderWalker2.prototype.walkAtLeastOneSep = function(atLeastOneSepProd, currRest, prevRest) {
          if (!this.checkIsTarget(atLeastOneSepProd, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, atLeastOneSepProd, currRest, prevRest);
          }
        };
        RestDefinitionFinderWalker2.prototype.walkMany = function(manyProd, currRest, prevRest) {
          if (!this.checkIsTarget(manyProd, PROD_TYPE.REPETITION, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, manyProd, currRest, prevRest);
          }
        };
        RestDefinitionFinderWalker2.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
          if (!this.checkIsTarget(manySepProd, PROD_TYPE.REPETITION_WITH_SEPARATOR, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, manySepProd, currRest, prevRest);
          }
        };
        return RestDefinitionFinderWalker2;
      }(rest_1.RestWalker)
    );
    var InsideDefinitionFinderVisitor = (
      /** @class */
      function(_super) {
        __extends(InsideDefinitionFinderVisitor2, _super);
        function InsideDefinitionFinderVisitor2(targetOccurrence, targetProdType, targetRef) {
          var _this = _super.call(this) || this;
          _this.targetOccurrence = targetOccurrence;
          _this.targetProdType = targetProdType;
          _this.targetRef = targetRef;
          _this.result = [];
          return _this;
        }
        InsideDefinitionFinderVisitor2.prototype.checkIsTarget = function(node, expectedProdName) {
          if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdName && (this.targetRef === void 0 || node === this.targetRef)) {
            this.result = node.definition;
          }
        };
        InsideDefinitionFinderVisitor2.prototype.visitOption = function(node) {
          this.checkIsTarget(node, PROD_TYPE.OPTION);
        };
        InsideDefinitionFinderVisitor2.prototype.visitRepetition = function(node) {
          this.checkIsTarget(node, PROD_TYPE.REPETITION);
        };
        InsideDefinitionFinderVisitor2.prototype.visitRepetitionMandatory = function(node) {
          this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY);
        };
        InsideDefinitionFinderVisitor2.prototype.visitRepetitionMandatoryWithSeparator = function(node) {
          this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR);
        };
        InsideDefinitionFinderVisitor2.prototype.visitRepetitionWithSeparator = function(node) {
          this.checkIsTarget(node, PROD_TYPE.REPETITION_WITH_SEPARATOR);
        };
        InsideDefinitionFinderVisitor2.prototype.visitAlternation = function(node) {
          this.checkIsTarget(node, PROD_TYPE.ALTERNATION);
        };
        return InsideDefinitionFinderVisitor2;
      }(gast_visitor_public_1.GAstVisitor)
    );
    function initializeArrayOfArrays(size) {
      var result = new Array(size);
      for (var i = 0; i < size; i++) {
        result[i] = [];
      }
      return result;
    }
    function pathToHashKeys(path) {
      var keys2 = [""];
      for (var i = 0; i < path.length; i++) {
        var tokType = path[i];
        var longerKeys = [];
        for (var j = 0; j < keys2.length; j++) {
          var currShorterKey = keys2[j];
          longerKeys.push(currShorterKey + "_" + tokType.tokenTypeIdx);
          for (var t = 0; t < tokType.categoryMatches.length; t++) {
            var categoriesKeySuffix = "_" + tokType.categoryMatches[t];
            longerKeys.push(currShorterKey + categoriesKeySuffix);
          }
        }
        keys2 = longerKeys;
      }
      return keys2;
    }
    function isUniquePrefixHash(altKnownPathsKeys, searchPathKeys, idx) {
      for (var currAltIdx = 0; currAltIdx < altKnownPathsKeys.length; currAltIdx++) {
        if (currAltIdx === idx) {
          continue;
        }
        var otherAltKnownPathsKeys = altKnownPathsKeys[currAltIdx];
        for (var searchIdx = 0; searchIdx < searchPathKeys.length; searchIdx++) {
          var searchKey = searchPathKeys[searchIdx];
          if (otherAltKnownPathsKeys[searchKey] === true) {
            return false;
          }
        }
      }
      return true;
    }
    function lookAheadSequenceFromAlternatives(altsDefs, k) {
      var partialAlts = utils_1.map(altsDefs, function(currAlt) {
        return interpreter_1.possiblePathsFrom([currAlt], 1);
      });
      var finalResult = initializeArrayOfArrays(partialAlts.length);
      var altsHashes = utils_1.map(partialAlts, function(currAltPaths) {
        var dict = {};
        utils_1.forEach(currAltPaths, function(item) {
          var keys2 = pathToHashKeys(item.partialPath);
          utils_1.forEach(keys2, function(currKey) {
            dict[currKey] = true;
          });
        });
        return dict;
      });
      var newData = partialAlts;
      for (var pathLength = 1; pathLength <= k; pathLength++) {
        var currDataset = newData;
        newData = initializeArrayOfArrays(currDataset.length);
        var _loop_1 = function(altIdx2) {
          var currAltPathsAndSuffixes = currDataset[altIdx2];
          for (var currPathIdx = 0; currPathIdx < currAltPathsAndSuffixes.length; currPathIdx++) {
            var currPathPrefix = currAltPathsAndSuffixes[currPathIdx].partialPath;
            var suffixDef = currAltPathsAndSuffixes[currPathIdx].suffixDef;
            var prefixKeys = pathToHashKeys(currPathPrefix);
            var isUnique = isUniquePrefixHash(altsHashes, prefixKeys, altIdx2);
            if (isUnique || utils_1.isEmpty(suffixDef) || currPathPrefix.length === k) {
              var currAltResult = finalResult[altIdx2];
              if (containsPath(currAltResult, currPathPrefix) === false) {
                currAltResult.push(currPathPrefix);
                for (var j = 0; j < prefixKeys.length; j++) {
                  var currKey = prefixKeys[j];
                  altsHashes[altIdx2][currKey] = true;
                }
              }
            } else {
              var newPartialPathsAndSuffixes = interpreter_1.possiblePathsFrom(suffixDef, pathLength + 1, currPathPrefix);
              newData[altIdx2] = newData[altIdx2].concat(newPartialPathsAndSuffixes);
              utils_1.forEach(newPartialPathsAndSuffixes, function(item) {
                var prefixKeys2 = pathToHashKeys(item.partialPath);
                utils_1.forEach(prefixKeys2, function(key) {
                  altsHashes[altIdx2][key] = true;
                });
              });
            }
          }
        };
        for (var altIdx = 0; altIdx < currDataset.length; altIdx++) {
          _loop_1(altIdx);
        }
      }
      return finalResult;
    }
    exports2.lookAheadSequenceFromAlternatives = lookAheadSequenceFromAlternatives;
    function getLookaheadPathsForOr(occurrence, ruleGrammar, k, orProd) {
      var visitor = new InsideDefinitionFinderVisitor(occurrence, PROD_TYPE.ALTERNATION, orProd);
      ruleGrammar.accept(visitor);
      return lookAheadSequenceFromAlternatives(visitor.result, k);
    }
    exports2.getLookaheadPathsForOr = getLookaheadPathsForOr;
    function getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k) {
      var insideDefVisitor = new InsideDefinitionFinderVisitor(occurrence, prodType);
      ruleGrammar.accept(insideDefVisitor);
      var insideDef = insideDefVisitor.result;
      var afterDefWalker = new RestDefinitionFinderWalker(ruleGrammar, occurrence, prodType);
      var afterDef = afterDefWalker.startWalking();
      var insideFlat = new gast_public_1.Alternative({ definition: insideDef });
      var afterFlat = new gast_public_1.Alternative({ definition: afterDef });
      return lookAheadSequenceFromAlternatives([insideFlat, afterFlat], k);
    }
    exports2.getLookaheadPathsForOptionalProd = getLookaheadPathsForOptionalProd;
    function containsPath(alternative, searchPath) {
      compareOtherPath: for (var i = 0; i < alternative.length; i++) {
        var otherPath = alternative[i];
        if (otherPath.length !== searchPath.length) {
          continue;
        }
        for (var j = 0; j < otherPath.length; j++) {
          var searchTok = searchPath[j];
          var otherTok = otherPath[j];
          var matchingTokens = searchTok === otherTok || otherTok.categoryMatchesMap[searchTok.tokenTypeIdx] !== void 0;
          if (matchingTokens === false) {
            continue compareOtherPath;
          }
        }
        return true;
      }
      return false;
    }
    exports2.containsPath = containsPath;
    function isStrictPrefixOfPath(prefix, other) {
      return prefix.length < other.length && utils_1.every(prefix, function(tokType, idx) {
        var otherTokType = other[idx];
        return tokType === otherTokType || otherTokType.categoryMatchesMap[tokType.tokenTypeIdx];
      });
    }
    exports2.isStrictPrefixOfPath = isStrictPrefixOfPath;
    function areTokenCategoriesNotUsed(lookAheadPaths) {
      return utils_1.every(lookAheadPaths, function(singleAltPaths) {
        return utils_1.every(singleAltPaths, function(singlePath) {
          return utils_1.every(singlePath, function(token) {
            return utils_1.isEmpty(token.categoryMatches);
          });
        });
      });
    }
    exports2.areTokenCategoriesNotUsed = areTokenCategoriesNotUsed;
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/checks.js
var require_checks = __commonJS({
  "node_modules/chevrotain/lib/src/parse/grammar/checks.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.checkPrefixAlternativesAmbiguities = exports2.validateSomeNonEmptyLookaheadPath = exports2.validateTooManyAlts = exports2.RepetionCollector = exports2.validateAmbiguousAlternationAlternatives = exports2.validateEmptyOrAlternative = exports2.getFirstNoneTerminal = exports2.validateNoLeftRecursion = exports2.validateRuleIsOverridden = exports2.validateRuleDoesNotAlreadyExist = exports2.OccurrenceValidationCollector = exports2.identifyProductionForDuplicates = exports2.validateGrammar = void 0;
    var utils = require_utils();
    var utils_1 = require_utils();
    var parser_1 = require_parser();
    var gast_1 = require_gast();
    var lookahead_1 = require_lookahead();
    var interpreter_1 = require_interpreter();
    var gast_public_1 = require_gast_public();
    var gast_visitor_public_1 = require_gast_visitor_public();
    function validateGrammar(topLevels, globalMaxLookahead, tokenTypes, errMsgProvider, grammarName) {
      var duplicateErrors = utils.map(topLevels, function(currTopLevel) {
        return validateDuplicateProductions(currTopLevel, errMsgProvider);
      });
      var leftRecursionErrors = utils.map(topLevels, function(currTopRule) {
        return validateNoLeftRecursion(currTopRule, currTopRule, errMsgProvider);
      });
      var emptyAltErrors = [];
      var ambiguousAltsErrors = [];
      var emptyRepetitionErrors = [];
      if (utils_1.every(leftRecursionErrors, utils_1.isEmpty)) {
        emptyAltErrors = utils_1.map(topLevels, function(currTopRule) {
          return validateEmptyOrAlternative(currTopRule, errMsgProvider);
        });
        ambiguousAltsErrors = utils_1.map(topLevels, function(currTopRule) {
          return validateAmbiguousAlternationAlternatives(currTopRule, globalMaxLookahead, errMsgProvider);
        });
        emptyRepetitionErrors = validateSomeNonEmptyLookaheadPath(topLevels, globalMaxLookahead, errMsgProvider);
      }
      var termsNamespaceConflictErrors = checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider);
      var tooManyAltsErrors = utils_1.map(topLevels, function(curRule) {
        return validateTooManyAlts(curRule, errMsgProvider);
      });
      var duplicateRulesError = utils_1.map(topLevels, function(curRule) {
        return validateRuleDoesNotAlreadyExist(curRule, topLevels, grammarName, errMsgProvider);
      });
      return utils.flatten(duplicateErrors.concat(emptyRepetitionErrors, leftRecursionErrors, emptyAltErrors, ambiguousAltsErrors, termsNamespaceConflictErrors, tooManyAltsErrors, duplicateRulesError));
    }
    exports2.validateGrammar = validateGrammar;
    function validateDuplicateProductions(topLevelRule, errMsgProvider) {
      var collectorVisitor = new OccurrenceValidationCollector();
      topLevelRule.accept(collectorVisitor);
      var allRuleProductions = collectorVisitor.allProductions;
      var productionGroups = utils.groupBy(allRuleProductions, identifyProductionForDuplicates);
      var duplicates = utils.pick(productionGroups, function(currGroup) {
        return currGroup.length > 1;
      });
      var errors = utils.map(utils.values(duplicates), function(currDuplicates) {
        var firstProd = utils.first(currDuplicates);
        var msg = errMsgProvider.buildDuplicateFoundError(topLevelRule, currDuplicates);
        var dslName = gast_1.getProductionDslName(firstProd);
        var defError = {
          message: msg,
          type: parser_1.ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,
          ruleName: topLevelRule.name,
          dslName,
          occurrence: firstProd.idx
        };
        var param = getExtraProductionArgument(firstProd);
        if (param) {
          defError.parameter = param;
        }
        return defError;
      });
      return errors;
    }
    function identifyProductionForDuplicates(prod) {
      return gast_1.getProductionDslName(prod) + "_#_" + prod.idx + "_#_" + getExtraProductionArgument(prod);
    }
    exports2.identifyProductionForDuplicates = identifyProductionForDuplicates;
    function getExtraProductionArgument(prod) {
      if (prod instanceof gast_public_1.Terminal) {
        return prod.terminalType.name;
      } else if (prod instanceof gast_public_1.NonTerminal) {
        return prod.nonTerminalName;
      } else {
        return "";
      }
    }
    var OccurrenceValidationCollector = (
      /** @class */
      function(_super) {
        __extends(OccurrenceValidationCollector2, _super);
        function OccurrenceValidationCollector2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.allProductions = [];
          return _this;
        }
        OccurrenceValidationCollector2.prototype.visitNonTerminal = function(subrule) {
          this.allProductions.push(subrule);
        };
        OccurrenceValidationCollector2.prototype.visitOption = function(option) {
          this.allProductions.push(option);
        };
        OccurrenceValidationCollector2.prototype.visitRepetitionWithSeparator = function(manySep) {
          this.allProductions.push(manySep);
        };
        OccurrenceValidationCollector2.prototype.visitRepetitionMandatory = function(atLeastOne) {
          this.allProductions.push(atLeastOne);
        };
        OccurrenceValidationCollector2.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
          this.allProductions.push(atLeastOneSep);
        };
        OccurrenceValidationCollector2.prototype.visitRepetition = function(many) {
          this.allProductions.push(many);
        };
        OccurrenceValidationCollector2.prototype.visitAlternation = function(or) {
          this.allProductions.push(or);
        };
        OccurrenceValidationCollector2.prototype.visitTerminal = function(terminal) {
          this.allProductions.push(terminal);
        };
        return OccurrenceValidationCollector2;
      }(gast_visitor_public_1.GAstVisitor)
    );
    exports2.OccurrenceValidationCollector = OccurrenceValidationCollector;
    function validateRuleDoesNotAlreadyExist(rule, allRules, className, errMsgProvider) {
      var errors = [];
      var occurrences = utils_1.reduce(allRules, function(result, curRule) {
        if (curRule.name === rule.name) {
          return result + 1;
        }
        return result;
      }, 0);
      if (occurrences > 1) {
        var errMsg = errMsgProvider.buildDuplicateRuleNameError({
          topLevelRule: rule,
          grammarName: className
        });
        errors.push({
          message: errMsg,
          type: parser_1.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
          ruleName: rule.name
        });
      }
      return errors;
    }
    exports2.validateRuleDoesNotAlreadyExist = validateRuleDoesNotAlreadyExist;
    function validateRuleIsOverridden(ruleName, definedRulesNames, className) {
      var errors = [];
      var errMsg;
      if (!utils.contains(definedRulesNames, ruleName)) {
        errMsg = "Invalid rule override, rule: ->" + ruleName + "<- cannot be overridden in the grammar: ->" + className + "<-as it is not defined in any of the super grammars ";
        errors.push({
          message: errMsg,
          type: parser_1.ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,
          ruleName
        });
      }
      return errors;
    }
    exports2.validateRuleIsOverridden = validateRuleIsOverridden;
    function validateNoLeftRecursion(topRule, currRule, errMsgProvider, path) {
      if (path === void 0) {
        path = [];
      }
      var errors = [];
      var nextNonTerminals = getFirstNoneTerminal(currRule.definition);
      if (utils.isEmpty(nextNonTerminals)) {
        return [];
      } else {
        var ruleName = topRule.name;
        var foundLeftRecursion = utils.contains(nextNonTerminals, topRule);
        if (foundLeftRecursion) {
          errors.push({
            message: errMsgProvider.buildLeftRecursionError({
              topLevelRule: topRule,
              leftRecursionPath: path
            }),
            type: parser_1.ParserDefinitionErrorType.LEFT_RECURSION,
            ruleName
          });
        }
        var validNextSteps = utils.difference(nextNonTerminals, path.concat([topRule]));
        var errorsFromNextSteps = utils.map(validNextSteps, function(currRefRule) {
          var newPath = utils.cloneArr(path);
          newPath.push(currRefRule);
          return validateNoLeftRecursion(topRule, currRefRule, errMsgProvider, newPath);
        });
        return errors.concat(utils.flatten(errorsFromNextSteps));
      }
    }
    exports2.validateNoLeftRecursion = validateNoLeftRecursion;
    function getFirstNoneTerminal(definition) {
      var result = [];
      if (utils.isEmpty(definition)) {
        return result;
      }
      var firstProd = utils.first(definition);
      if (firstProd instanceof gast_public_1.NonTerminal) {
        result.push(firstProd.referencedRule);
      } else if (firstProd instanceof gast_public_1.Alternative || firstProd instanceof gast_public_1.Option || firstProd instanceof gast_public_1.RepetitionMandatory || firstProd instanceof gast_public_1.RepetitionMandatoryWithSeparator || firstProd instanceof gast_public_1.RepetitionWithSeparator || firstProd instanceof gast_public_1.Repetition) {
        result = result.concat(getFirstNoneTerminal(firstProd.definition));
      } else if (firstProd instanceof gast_public_1.Alternation) {
        result = utils.flatten(utils.map(firstProd.definition, function(currSubDef) {
          return getFirstNoneTerminal(currSubDef.definition);
        }));
      } else if (firstProd instanceof gast_public_1.Terminal) {
      } else {
        throw Error("non exhaustive match");
      }
      var isFirstOptional = gast_1.isOptionalProd(firstProd);
      var hasMore = definition.length > 1;
      if (isFirstOptional && hasMore) {
        var rest = utils.drop(definition);
        return result.concat(getFirstNoneTerminal(rest));
      } else {
        return result;
      }
    }
    exports2.getFirstNoneTerminal = getFirstNoneTerminal;
    var OrCollector = (
      /** @class */
      function(_super) {
        __extends(OrCollector2, _super);
        function OrCollector2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.alternations = [];
          return _this;
        }
        OrCollector2.prototype.visitAlternation = function(node) {
          this.alternations.push(node);
        };
        return OrCollector2;
      }(gast_visitor_public_1.GAstVisitor)
    );
    function validateEmptyOrAlternative(topLevelRule, errMsgProvider) {
      var orCollector = new OrCollector();
      topLevelRule.accept(orCollector);
      var ors = orCollector.alternations;
      var errors = utils.reduce(ors, function(errors2, currOr) {
        var exceptLast = utils.dropRight(currOr.definition);
        var currErrors = utils.map(exceptLast, function(currAlternative, currAltIdx) {
          var possibleFirstInAlt = interpreter_1.nextPossibleTokensAfter([currAlternative], [], null, 1);
          if (utils.isEmpty(possibleFirstInAlt)) {
            return {
              message: errMsgProvider.buildEmptyAlternationError({
                topLevelRule,
                alternation: currOr,
                emptyChoiceIdx: currAltIdx
              }),
              type: parser_1.ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,
              ruleName: topLevelRule.name,
              occurrence: currOr.idx,
              alternative: currAltIdx + 1
            };
          } else {
            return null;
          }
        });
        return errors2.concat(utils.compact(currErrors));
      }, []);
      return errors;
    }
    exports2.validateEmptyOrAlternative = validateEmptyOrAlternative;
    function validateAmbiguousAlternationAlternatives(topLevelRule, globalMaxLookahead, errMsgProvider) {
      var orCollector = new OrCollector();
      topLevelRule.accept(orCollector);
      var ors = orCollector.alternations;
      ors = utils_1.reject(ors, function(currOr) {
        return currOr.ignoreAmbiguities === true;
      });
      var errors = utils.reduce(ors, function(result, currOr) {
        var currOccurrence = currOr.idx;
        var actualMaxLookahead = currOr.maxLookahead || globalMaxLookahead;
        var alternatives = lookahead_1.getLookaheadPathsForOr(currOccurrence, topLevelRule, actualMaxLookahead, currOr);
        var altsAmbiguityErrors = checkAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
        var altsPrefixAmbiguityErrors = checkPrefixAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
        return result.concat(altsAmbiguityErrors, altsPrefixAmbiguityErrors);
      }, []);
      return errors;
    }
    exports2.validateAmbiguousAlternationAlternatives = validateAmbiguousAlternationAlternatives;
    var RepetionCollector = (
      /** @class */
      function(_super) {
        __extends(RepetionCollector2, _super);
        function RepetionCollector2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.allProductions = [];
          return _this;
        }
        RepetionCollector2.prototype.visitRepetitionWithSeparator = function(manySep) {
          this.allProductions.push(manySep);
        };
        RepetionCollector2.prototype.visitRepetitionMandatory = function(atLeastOne) {
          this.allProductions.push(atLeastOne);
        };
        RepetionCollector2.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
          this.allProductions.push(atLeastOneSep);
        };
        RepetionCollector2.prototype.visitRepetition = function(many) {
          this.allProductions.push(many);
        };
        return RepetionCollector2;
      }(gast_visitor_public_1.GAstVisitor)
    );
    exports2.RepetionCollector = RepetionCollector;
    function validateTooManyAlts(topLevelRule, errMsgProvider) {
      var orCollector = new OrCollector();
      topLevelRule.accept(orCollector);
      var ors = orCollector.alternations;
      var errors = utils.reduce(ors, function(errors2, currOr) {
        if (currOr.definition.length > 255) {
          errors2.push({
            message: errMsgProvider.buildTooManyAlternativesError({
              topLevelRule,
              alternation: currOr
            }),
            type: parser_1.ParserDefinitionErrorType.TOO_MANY_ALTS,
            ruleName: topLevelRule.name,
            occurrence: currOr.idx
          });
        }
        return errors2;
      }, []);
      return errors;
    }
    exports2.validateTooManyAlts = validateTooManyAlts;
    function validateSomeNonEmptyLookaheadPath(topLevelRules, maxLookahead, errMsgProvider) {
      var errors = [];
      utils_1.forEach(topLevelRules, function(currTopRule) {
        var collectorVisitor = new RepetionCollector();
        currTopRule.accept(collectorVisitor);
        var allRuleProductions = collectorVisitor.allProductions;
        utils_1.forEach(allRuleProductions, function(currProd) {
          var prodType = lookahead_1.getProdType(currProd);
          var actualMaxLookahead = currProd.maxLookahead || maxLookahead;
          var currOccurrence = currProd.idx;
          var paths = lookahead_1.getLookaheadPathsForOptionalProd(currOccurrence, currTopRule, prodType, actualMaxLookahead);
          var pathsInsideProduction = paths[0];
          if (utils_1.isEmpty(utils_1.flatten(pathsInsideProduction))) {
            var errMsg = errMsgProvider.buildEmptyRepetitionError({
              topLevelRule: currTopRule,
              repetition: currProd
            });
            errors.push({
              message: errMsg,
              type: parser_1.ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,
              ruleName: currTopRule.name
            });
          }
        });
      });
      return errors;
    }
    exports2.validateSomeNonEmptyLookaheadPath = validateSomeNonEmptyLookaheadPath;
    function checkAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
      var foundAmbiguousPaths = [];
      var identicalAmbiguities = utils_1.reduce(alternatives, function(result, currAlt, currAltIdx) {
        if (alternation.definition[currAltIdx].ignoreAmbiguities === true) {
          return result;
        }
        utils_1.forEach(currAlt, function(currPath) {
          var altsCurrPathAppearsIn = [currAltIdx];
          utils_1.forEach(alternatives, function(currOtherAlt, currOtherAltIdx) {
            if (currAltIdx !== currOtherAltIdx && lookahead_1.containsPath(currOtherAlt, currPath) && // ignore (skip) ambiguities with this "other" alternative
            alternation.definition[currOtherAltIdx].ignoreAmbiguities !== true) {
              altsCurrPathAppearsIn.push(currOtherAltIdx);
            }
          });
          if (altsCurrPathAppearsIn.length > 1 && !lookahead_1.containsPath(foundAmbiguousPaths, currPath)) {
            foundAmbiguousPaths.push(currPath);
            result.push({
              alts: altsCurrPathAppearsIn,
              path: currPath
            });
          }
        });
        return result;
      }, []);
      var currErrors = utils.map(identicalAmbiguities, function(currAmbDescriptor) {
        var ambgIndices = utils_1.map(currAmbDescriptor.alts, function(currAltIdx) {
          return currAltIdx + 1;
        });
        var currMessage = errMsgProvider.buildAlternationAmbiguityError({
          topLevelRule: rule,
          alternation,
          ambiguityIndices: ambgIndices,
          prefixPath: currAmbDescriptor.path
        });
        return {
          message: currMessage,
          type: parser_1.ParserDefinitionErrorType.AMBIGUOUS_ALTS,
          ruleName: rule.name,
          occurrence: alternation.idx,
          alternatives: [currAmbDescriptor.alts]
        };
      });
      return currErrors;
    }
    function checkPrefixAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
      var errors = [];
      var pathsAndIndices = utils_1.reduce(alternatives, function(result, currAlt, idx) {
        var currPathsAndIdx = utils_1.map(currAlt, function(currPath) {
          return { idx, path: currPath };
        });
        return result.concat(currPathsAndIdx);
      }, []);
      utils_1.forEach(pathsAndIndices, function(currPathAndIdx) {
        var alternativeGast = alternation.definition[currPathAndIdx.idx];
        if (alternativeGast.ignoreAmbiguities === true) {
          return;
        }
        var targetIdx = currPathAndIdx.idx;
        var targetPath = currPathAndIdx.path;
        var prefixAmbiguitiesPathsAndIndices = utils_1.findAll(pathsAndIndices, function(searchPathAndIdx) {
          return (
            // ignore (skip) ambiguities with this "other" alternative
            alternation.definition[searchPathAndIdx.idx].ignoreAmbiguities !== true && searchPathAndIdx.idx < targetIdx && // checking for strict prefix because identical lookaheads
            // will be be detected using a different validation.
            lookahead_1.isStrictPrefixOfPath(searchPathAndIdx.path, targetPath)
          );
        });
        var currPathPrefixErrors = utils_1.map(prefixAmbiguitiesPathsAndIndices, function(currAmbPathAndIdx) {
          var ambgIndices = [currAmbPathAndIdx.idx + 1, targetIdx + 1];
          var occurrence = alternation.idx === 0 ? "" : alternation.idx;
          var message = errMsgProvider.buildAlternationPrefixAmbiguityError({
            topLevelRule: rule,
            alternation,
            ambiguityIndices: ambgIndices,
            prefixPath: currAmbPathAndIdx.path
          });
          return {
            message,
            type: parser_1.ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,
            ruleName: rule.name,
            occurrence,
            alternatives: ambgIndices
          };
        });
        errors = errors.concat(currPathPrefixErrors);
      });
      return errors;
    }
    exports2.checkPrefixAlternativesAmbiguities = checkPrefixAlternativesAmbiguities;
    function checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider) {
      var errors = [];
      var tokenNames = utils_1.map(tokenTypes, function(currToken) {
        return currToken.name;
      });
      utils_1.forEach(topLevels, function(currRule) {
        var currRuleName = currRule.name;
        if (utils_1.contains(tokenNames, currRuleName)) {
          var errMsg = errMsgProvider.buildNamespaceConflictError(currRule);
          errors.push({
            message: errMsg,
            type: parser_1.ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,
            ruleName: currRuleName
          });
        }
      });
      return errors;
    }
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/gast/gast_resolver_public.js
var require_gast_resolver_public = __commonJS({
  "node_modules/chevrotain/lib/src/parse/grammar/gast/gast_resolver_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.assignOccurrenceIndices = exports2.validateGrammar = exports2.resolveGrammar = void 0;
    var utils_1 = require_utils();
    var resolver_1 = require_resolver();
    var checks_1 = require_checks();
    var errors_public_1 = require_errors_public();
    var gast_1 = require_gast();
    function resolveGrammar(options) {
      options = utils_1.defaults(options, {
        errMsgProvider: errors_public_1.defaultGrammarResolverErrorProvider
      });
      var topRulesTable = {};
      utils_1.forEach(options.rules, function(rule) {
        topRulesTable[rule.name] = rule;
      });
      return resolver_1.resolveGrammar(topRulesTable, options.errMsgProvider);
    }
    exports2.resolveGrammar = resolveGrammar;
    function validateGrammar(options) {
      options = utils_1.defaults(options, {
        errMsgProvider: errors_public_1.defaultGrammarValidatorErrorProvider
      });
      return checks_1.validateGrammar(options.rules, options.maxLookahead, options.tokenTypes, options.errMsgProvider, options.grammarName);
    }
    exports2.validateGrammar = validateGrammar;
    function assignOccurrenceIndices(options) {
      utils_1.forEach(options.rules, function(currRule) {
        var methodsCollector = new gast_1.DslMethodsCollectorVisitor();
        currRule.accept(methodsCollector);
        utils_1.forEach(methodsCollector.dslMethods, function(methods) {
          utils_1.forEach(methods, function(currMethod, arrIdx) {
            currMethod.idx = arrIdx + 1;
          });
        });
      });
    }
    exports2.assignOccurrenceIndices = assignOccurrenceIndices;
  }
});

// node_modules/chevrotain/lib/src/parse/exceptions_public.js
var require_exceptions_public = __commonJS({
  "node_modules/chevrotain/lib/src/parse/exceptions_public.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EarlyExitException = exports2.NotAllInputParsedException = exports2.NoViableAltException = exports2.MismatchedTokenException = exports2.isRecognitionException = void 0;
    var utils_1 = require_utils();
    var MISMATCHED_TOKEN_EXCEPTION = "MismatchedTokenException";
    var NO_VIABLE_ALT_EXCEPTION = "NoViableAltException";
    var EARLY_EXIT_EXCEPTION = "EarlyExitException";
    var NOT_ALL_INPUT_PARSED_EXCEPTION = "NotAllInputParsedException";
    var RECOGNITION_EXCEPTION_NAMES = [
      MISMATCHED_TOKEN_EXCEPTION,
      NO_VIABLE_ALT_EXCEPTION,
      EARLY_EXIT_EXCEPTION,
      NOT_ALL_INPUT_PARSED_EXCEPTION
    ];
    Object.freeze(RECOGNITION_EXCEPTION_NAMES);
    function isRecognitionException(error) {
      return utils_1.contains(RECOGNITION_EXCEPTION_NAMES, error.name);
    }
    exports2.isRecognitionException = isRecognitionException;
    var RecognitionException = (
      /** @class */
      function(_super) {
        __extends(RecognitionException2, _super);
        function RecognitionException2(message, token) {
          var _newTarget = this.constructor;
          var _this = _super.call(this, message) || this;
          _this.token = token;
          _this.resyncedTokens = [];
          Object.setPrototypeOf(_this, _newTarget.prototype);
          if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, _this.constructor);
          }
          return _this;
        }
        return RecognitionException2;
      }(Error)
    );
    var MismatchedTokenException = (
      /** @class */
      function(_super) {
        __extends(MismatchedTokenException2, _super);
        function MismatchedTokenException2(message, token, previousToken) {
          var _this = _super.call(this, message, token) || this;
          _this.previousToken = previousToken;
          _this.name = MISMATCHED_TOKEN_EXCEPTION;
          return _this;
        }
        return MismatchedTokenException2;
      }(RecognitionException)
    );
    exports2.MismatchedTokenException = MismatchedTokenException;
    var NoViableAltException = (
      /** @class */
      function(_super) {
        __extends(NoViableAltException2, _super);
        function NoViableAltException2(message, token, previousToken) {
          var _this = _super.call(this, message, token) || this;
          _this.previousToken = previousToken;
          _this.name = NO_VIABLE_ALT_EXCEPTION;
          return _this;
        }
        return NoViableAltException2;
      }(RecognitionException)
    );
    exports2.NoViableAltException = NoViableAltException;
    var NotAllInputParsedException = (
      /** @class */
      function(_super) {
        __extends(NotAllInputParsedException2, _super);
        function NotAllInputParsedException2(message, token) {
          var _this = _super.call(this, message, token) || this;
          _this.name = NOT_ALL_INPUT_PARSED_EXCEPTION;
          return _this;
        }
        return NotAllInputParsedException2;
      }(RecognitionException)
    );
    exports2.NotAllInputParsedException = NotAllInputParsedException;
    var EarlyExitException = (
      /** @class */
      function(_super) {
        __extends(EarlyExitException2, _super);
        function EarlyExitException2(message, token, previousToken) {
          var _this = _super.call(this, message, token) || this;
          _this.previousToken = previousToken;
          _this.name = EARLY_EXIT_EXCEPTION;
          return _this;
        }
        return EarlyExitException2;
      }(RecognitionException)
    );
    exports2.EarlyExitException = EarlyExitException;
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/recoverable.js
var require_recoverable = __commonJS({
  "node_modules/chevrotain/lib/src/parse/parser/traits/recoverable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.attemptInRepetitionRecovery = exports2.Recoverable = exports2.InRuleRecoveryException = exports2.IN_RULE_RECOVERY_EXCEPTION = exports2.EOF_FOLLOW_KEY = void 0;
    var tokens_public_1 = require_tokens_public();
    var utils_1 = require_utils();
    var exceptions_public_1 = require_exceptions_public();
    var constants_1 = require_constants();
    var parser_1 = require_parser();
    exports2.EOF_FOLLOW_KEY = {};
    exports2.IN_RULE_RECOVERY_EXCEPTION = "InRuleRecoveryException";
    function InRuleRecoveryException(message) {
      this.name = exports2.IN_RULE_RECOVERY_EXCEPTION;
      this.message = message;
    }
    exports2.InRuleRecoveryException = InRuleRecoveryException;
    InRuleRecoveryException.prototype = Error.prototype;
    var Recoverable = (
      /** @class */
      function() {
        function Recoverable2() {
        }
        Recoverable2.prototype.initRecoverable = function(config) {
          this.firstAfterRepMap = {};
          this.resyncFollows = {};
          this.recoveryEnabled = utils_1.has(config, "recoveryEnabled") ? config.recoveryEnabled : parser_1.DEFAULT_PARSER_CONFIG.recoveryEnabled;
          if (this.recoveryEnabled) {
            this.attemptInRepetitionRecovery = attemptInRepetitionRecovery;
          }
        };
        Recoverable2.prototype.getTokenToInsert = function(tokType) {
          var tokToInsert = tokens_public_1.createTokenInstance(tokType, "", NaN, NaN, NaN, NaN, NaN, NaN);
          tokToInsert.isInsertedInRecovery = true;
          return tokToInsert;
        };
        Recoverable2.prototype.canTokenTypeBeInsertedInRecovery = function(tokType) {
          return true;
        };
        Recoverable2.prototype.tryInRepetitionRecovery = function(grammarRule, grammarRuleArgs, lookAheadFunc, expectedTokType) {
          var _this = this;
          var reSyncTokType = this.findReSyncTokenType();
          var savedLexerState = this.exportLexerState();
          var resyncedTokens = [];
          var passedResyncPoint = false;
          var nextTokenWithoutResync = this.LA(1);
          var currToken = this.LA(1);
          var generateErrorMessage = function() {
            var previousToken = _this.LA(0);
            var msg = _this.errorMessageProvider.buildMismatchTokenMessage({
              expected: expectedTokType,
              actual: nextTokenWithoutResync,
              previous: previousToken,
              ruleName: _this.getCurrRuleFullName()
            });
            var error = new exceptions_public_1.MismatchedTokenException(msg, nextTokenWithoutResync, _this.LA(0));
            error.resyncedTokens = utils_1.dropRight(resyncedTokens);
            _this.SAVE_ERROR(error);
          };
          while (!passedResyncPoint) {
            if (this.tokenMatcher(currToken, expectedTokType)) {
              generateErrorMessage();
              return;
            } else if (lookAheadFunc.call(this)) {
              generateErrorMessage();
              grammarRule.apply(this, grammarRuleArgs);
              return;
            } else if (this.tokenMatcher(currToken, reSyncTokType)) {
              passedResyncPoint = true;
            } else {
              currToken = this.SKIP_TOKEN();
              this.addToResyncTokens(currToken, resyncedTokens);
            }
          }
          this.importLexerState(savedLexerState);
        };
        Recoverable2.prototype.shouldInRepetitionRecoveryBeTried = function(expectTokAfterLastMatch, nextTokIdx, notStuck) {
          if (notStuck === false) {
            return false;
          }
          if (expectTokAfterLastMatch === void 0 || nextTokIdx === void 0) {
            return false;
          }
          if (this.tokenMatcher(this.LA(1), expectTokAfterLastMatch)) {
            return false;
          }
          if (this.isBackTracking()) {
            return false;
          }
          if (this.canPerformInRuleRecovery(expectTokAfterLastMatch, this.getFollowsForInRuleRecovery(expectTokAfterLastMatch, nextTokIdx))) {
            return false;
          }
          return true;
        };
        Recoverable2.prototype.getFollowsForInRuleRecovery = function(tokType, tokIdxInRule) {
          var grammarPath = this.getCurrentGrammarPath(tokType, tokIdxInRule);
          var follows = this.getNextPossibleTokenTypes(grammarPath);
          return follows;
        };
        Recoverable2.prototype.tryInRuleRecovery = function(expectedTokType, follows) {
          if (this.canRecoverWithSingleTokenInsertion(expectedTokType, follows)) {
            var tokToInsert = this.getTokenToInsert(expectedTokType);
            return tokToInsert;
          }
          if (this.canRecoverWithSingleTokenDeletion(expectedTokType)) {
            var nextTok = this.SKIP_TOKEN();
            this.consumeToken();
            return nextTok;
          }
          throw new InRuleRecoveryException("sad sad panda");
        };
        Recoverable2.prototype.canPerformInRuleRecovery = function(expectedToken, follows) {
          return this.canRecoverWithSingleTokenInsertion(expectedToken, follows) || this.canRecoverWithSingleTokenDeletion(expectedToken);
        };
        Recoverable2.prototype.canRecoverWithSingleTokenInsertion = function(expectedTokType, follows) {
          var _this = this;
          if (!this.canTokenTypeBeInsertedInRecovery(expectedTokType)) {
            return false;
          }
          if (utils_1.isEmpty(follows)) {
            return false;
          }
          var mismatchedTok = this.LA(1);
          var isMisMatchedTokInFollows = utils_1.find(follows, function(possibleFollowsTokType) {
            return _this.tokenMatcher(mismatchedTok, possibleFollowsTokType);
          }) !== void 0;
          return isMisMatchedTokInFollows;
        };
        Recoverable2.prototype.canRecoverWithSingleTokenDeletion = function(expectedTokType) {
          var isNextTokenWhatIsExpected = this.tokenMatcher(this.LA(2), expectedTokType);
          return isNextTokenWhatIsExpected;
        };
        Recoverable2.prototype.isInCurrentRuleReSyncSet = function(tokenTypeIdx) {
          var followKey = this.getCurrFollowKey();
          var currentRuleReSyncSet = this.getFollowSetFromFollowKey(followKey);
          return utils_1.contains(currentRuleReSyncSet, tokenTypeIdx);
        };
        Recoverable2.prototype.findReSyncTokenType = function() {
          var allPossibleReSyncTokTypes = this.flattenFollowSet();
          var nextToken = this.LA(1);
          var k = 2;
          while (true) {
            var nextTokenType = nextToken.tokenType;
            if (utils_1.contains(allPossibleReSyncTokTypes, nextTokenType)) {
              return nextTokenType;
            }
            nextToken = this.LA(k);
            k++;
          }
        };
        Recoverable2.prototype.getCurrFollowKey = function() {
          if (this.RULE_STACK.length === 1) {
            return exports2.EOF_FOLLOW_KEY;
          }
          var currRuleShortName = this.getLastExplicitRuleShortName();
          var currRuleIdx = this.getLastExplicitRuleOccurrenceIndex();
          var prevRuleShortName = this.getPreviousExplicitRuleShortName();
          return {
            ruleName: this.shortRuleNameToFullName(currRuleShortName),
            idxInCallingRule: currRuleIdx,
            inRule: this.shortRuleNameToFullName(prevRuleShortName)
          };
        };
        Recoverable2.prototype.buildFullFollowKeyStack = function() {
          var _this = this;
          var explicitRuleStack = this.RULE_STACK;
          var explicitOccurrenceStack = this.RULE_OCCURRENCE_STACK;
          return utils_1.map(explicitRuleStack, function(ruleName, idx) {
            if (idx === 0) {
              return exports2.EOF_FOLLOW_KEY;
            }
            return {
              ruleName: _this.shortRuleNameToFullName(ruleName),
              idxInCallingRule: explicitOccurrenceStack[idx],
              inRule: _this.shortRuleNameToFullName(explicitRuleStack[idx - 1])
            };
          });
        };
        Recoverable2.prototype.flattenFollowSet = function() {
          var _this = this;
          var followStack = utils_1.map(this.buildFullFollowKeyStack(), function(currKey) {
            return _this.getFollowSetFromFollowKey(currKey);
          });
          return utils_1.flatten(followStack);
        };
        Recoverable2.prototype.getFollowSetFromFollowKey = function(followKey) {
          if (followKey === exports2.EOF_FOLLOW_KEY) {
            return [tokens_public_1.EOF];
          }
          var followName = followKey.ruleName + followKey.idxInCallingRule + constants_1.IN + followKey.inRule;
          return this.resyncFollows[followName];
        };
        Recoverable2.prototype.addToResyncTokens = function(token, resyncTokens) {
          if (!this.tokenMatcher(token, tokens_public_1.EOF)) {
            resyncTokens.push(token);
          }
          return resyncTokens;
        };
        Recoverable2.prototype.reSyncTo = function(tokType) {
          var resyncedTokens = [];
          var nextTok = this.LA(1);
          while (this.tokenMatcher(nextTok, tokType) === false) {
            nextTok = this.SKIP_TOKEN();
            this.addToResyncTokens(nextTok, resyncedTokens);
          }
          return utils_1.dropRight(resyncedTokens);
        };
        Recoverable2.prototype.attemptInRepetitionRecovery = function(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
        };
        Recoverable2.prototype.getCurrentGrammarPath = function(tokType, tokIdxInRule) {
          var pathRuleStack = this.getHumanReadableRuleStack();
          var pathOccurrenceStack = utils_1.cloneArr(this.RULE_OCCURRENCE_STACK);
          var grammarPath = {
            ruleStack: pathRuleStack,
            occurrenceStack: pathOccurrenceStack,
            lastTok: tokType,
            lastTokOccurrence: tokIdxInRule
          };
          return grammarPath;
        };
        Recoverable2.prototype.getHumanReadableRuleStack = function() {
          var _this = this;
          return utils_1.map(this.RULE_STACK, function(currShortName) {
            return _this.shortRuleNameToFullName(currShortName);
          });
        };
        return Recoverable2;
      }()
    );
    exports2.Recoverable = Recoverable;
    function attemptInRepetitionRecovery(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
      var key = this.getKeyForAutomaticLookahead(dslMethodIdx, prodOccurrence);
      var firstAfterRepInfo = this.firstAfterRepMap[key];
      if (firstAfterRepInfo === void 0) {
        var currRuleName = this.getCurrRuleFullName();
        var ruleGrammar = this.getGAstProductions()[currRuleName];
        var walker = new nextToksWalker(ruleGrammar, prodOccurrence);
        firstAfterRepInfo = walker.startWalking();
        this.firstAfterRepMap[key] = firstAfterRepInfo;
      }
      var expectTokAfterLastMatch = firstAfterRepInfo.token;
      var nextTokIdx = firstAfterRepInfo.occurrence;
      var isEndOfRule = firstAfterRepInfo.isEndOfRule;
      if (this.RULE_STACK.length === 1 && isEndOfRule && expectTokAfterLastMatch === void 0) {
        expectTokAfterLastMatch = tokens_public_1.EOF;
        nextTokIdx = 1;
      }
      if (this.shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck)) {
        this.tryInRepetitionRecovery(prodFunc, args, lookaheadFunc, expectTokAfterLastMatch);
      }
    }
    exports2.attemptInRepetitionRecovery = attemptInRepetitionRecovery;
  }
});

// node_modules/chevrotain/lib/src/parse/grammar/keys.js
var require_keys = __commonJS({
  "node_modules/chevrotain/lib/src/parse/grammar/keys.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getKeyForAutomaticLookahead = exports2.AT_LEAST_ONE_SEP_IDX = exports2.MANY_SEP_IDX = exports2.AT_LEAST_ONE_IDX = exports2.MANY_IDX = exports2.OPTION_IDX = exports2.OR_IDX = exports2.BITS_FOR_ALT_IDX = exports2.BITS_FOR_RULE_IDX = exports2.BITS_FOR_OCCURRENCE_IDX = exports2.BITS_FOR_METHOD_TYPE = void 0;
    exports2.BITS_FOR_METHOD_TYPE = 4;
    exports2.BITS_FOR_OCCURRENCE_IDX = 8;
    exports2.BITS_FOR_RULE_IDX = 12;
    exports2.BITS_FOR_ALT_IDX = 8;
    exports2.OR_IDX = 1 << exports2.BITS_FOR_OCCURRENCE_IDX;
    exports2.OPTION_IDX = 2 << exports2.BITS_FOR_OCCURRENCE_IDX;
    exports2.MANY_IDX = 3 << exports2.BITS_FOR_OCCURRENCE_IDX;
    exports2.AT_LEAST_ONE_IDX = 4 << exports2.BITS_FOR_OCCURRENCE_IDX;
    exports2.MANY_SEP_IDX = 5 << exports2.BITS_FOR_OCCURRENCE_IDX;
    exports2.AT_LEAST_ONE_SEP_IDX = 6 << exports2.BITS_FOR_OCCURRENCE_IDX;
    function getKeyForAutomaticLookahead(ruleIdx, dslMethodIdx, occurrence) {
      return occurrence | dslMethodIdx | ruleIdx;
    }
    exports2.getKeyForAutomaticLookahead = getKeyForAutomaticLookahead;
    var BITS_START_FOR_ALT_IDX = 32 - exports2.BITS_FOR_ALT_IDX;
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/looksahead.js
var require_looksahead = __commonJS({
  "node_modules/chevrotain/lib/src/parse/parser/traits/looksahead.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LooksAhead = void 0;
    var lookahead_1 = require_lookahead();
    var utils_1 = require_utils();
    var parser_1 = require_parser();
    var keys_1 = require_keys();
    var gast_1 = require_gast();
    var LooksAhead = (
      /** @class */
      function() {
        function LooksAhead2() {
        }
        LooksAhead2.prototype.initLooksAhead = function(config) {
          this.dynamicTokensEnabled = utils_1.has(config, "dynamicTokensEnabled") ? config.dynamicTokensEnabled : parser_1.DEFAULT_PARSER_CONFIG.dynamicTokensEnabled;
          this.maxLookahead = utils_1.has(config, "maxLookahead") ? config.maxLookahead : parser_1.DEFAULT_PARSER_CONFIG.maxLookahead;
          this.lookAheadFuncsCache = utils_1.isES2015MapSupported() ? /* @__PURE__ */ new Map() : [];
          if (utils_1.isES2015MapSupported()) {
            this.getLaFuncFromCache = this.getLaFuncFromMap;
            this.setLaFuncCache = this.setLaFuncCacheUsingMap;
          } else {
            this.getLaFuncFromCache = this.getLaFuncFromObj;
            this.setLaFuncCache = this.setLaFuncUsingObj;
          }
        };
        LooksAhead2.prototype.preComputeLookaheadFunctions = function(rules) {
          var _this = this;
          utils_1.forEach(rules, function(currRule) {
            _this.TRACE_INIT(currRule.name + " Rule Lookahead", function() {
              var _a = gast_1.collectMethods(currRule), alternation = _a.alternation, repetition = _a.repetition, option = _a.option, repetitionMandatory = _a.repetitionMandatory, repetitionMandatoryWithSeparator = _a.repetitionMandatoryWithSeparator, repetitionWithSeparator = _a.repetitionWithSeparator;
              utils_1.forEach(alternation, function(currProd) {
                var prodIdx = currProd.idx === 0 ? "" : currProd.idx;
                _this.TRACE_INIT("" + gast_1.getProductionDslName(currProd) + prodIdx, function() {
                  var laFunc = lookahead_1.buildLookaheadFuncForOr(currProd.idx, currRule, currProd.maxLookahead || _this.maxLookahead, currProd.hasPredicates, _this.dynamicTokensEnabled, _this.lookAheadBuilderForAlternatives);
                  var key = keys_1.getKeyForAutomaticLookahead(_this.fullRuleNameToShort[currRule.name], keys_1.OR_IDX, currProd.idx);
                  _this.setLaFuncCache(key, laFunc);
                });
              });
              utils_1.forEach(repetition, function(currProd) {
                _this.computeLookaheadFunc(currRule, currProd.idx, keys_1.MANY_IDX, lookahead_1.PROD_TYPE.REPETITION, currProd.maxLookahead, gast_1.getProductionDslName(currProd));
              });
              utils_1.forEach(option, function(currProd) {
                _this.computeLookaheadFunc(currRule, currProd.idx, keys_1.OPTION_IDX, lookahead_1.PROD_TYPE.OPTION, currProd.maxLookahead, gast_1.getProductionDslName(currProd));
              });
              utils_1.forEach(repetitionMandatory, function(currProd) {
                _this.computeLookaheadFunc(currRule, currProd.idx, keys_1.AT_LEAST_ONE_IDX, lookahead_1.PROD_TYPE.REPETITION_MANDATORY, currProd.maxLookahead, gast_1.getProductionDslName(currProd));
              });
              utils_1.forEach(repetitionMandatoryWithSeparator, function(currProd) {
                _this.computeLookaheadFunc(currRule, currProd.idx, keys_1.AT_LEAST_ONE_SEP_IDX, lookahead_1.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currProd.maxLookahead, gast_1.getProductionDslName(currProd));
              });
              utils_1.forEach(repetitionWithSeparator, function(currProd) {
                _this.computeLookaheadFunc(currRule, currProd.idx, keys_1.MANY_SEP_IDX, lookahead_1.PROD_TYPE.REPETITION_WITH_SEPARATOR, currProd.maxLookahead, gast_1.getProductionDslName(currProd));
              });
            });
          });
        };
        LooksAhead2.prototype.computeLookaheadFunc = function(rule, prodOccurrence, prodKey, prodType, prodMaxLookahead, dslMethodName) {
          var _this = this;
          this.TRACE_INIT("" + dslMethodName + (prodOccurrence === 0 ? "" : prodOccurrence), function() {
            var laFunc = lookahead_1.buildLookaheadFuncForOptionalProd(prodOccurrence, rule, prodMaxLookahead || _this.maxLookahead, _this.dynamicTokensEnabled, prodType, _this.lookAheadBuilderForOptional);
            var key = keys_1.getKeyForAutomaticLookahead(_this.fullRuleNameToShort[rule.name], prodKey, prodOccurrence);
            _this.setLaFuncCache(key, laFunc);
          });
        };
        LooksAhead2.prototype.lookAheadBuilderForOptional = function(alt, tokenMatcher, dynamicTokensEnabled) {
          return lookahead_1.buildSingleAlternativeLookaheadFunction(alt, tokenMatcher, dynamicTokensEnabled);
        };
        LooksAhead2.prototype.lookAheadBuilderForAlternatives = function(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled) {
          return lookahead_1.buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled);
        };
        LooksAhead2.prototype.getKeyForAutomaticLookahead = function(dslMethodIdx, occurrence) {
          var currRuleShortName = this.getLastExplicitRuleShortName();
          return keys_1.getKeyForAutomaticLookahead(currRuleShortName, dslMethodIdx, occurrence);
        };
        LooksAhead2.prototype.getLaFuncFromCache = function(key) {
          return void 0;
        };
        LooksAhead2.prototype.getLaFuncFromMap = function(key) {
          return this.lookAheadFuncsCache.get(key);
        };
        LooksAhead2.prototype.getLaFuncFromObj = function(key) {
          return this.lookAheadFuncsCache[key];
        };
        LooksAhead2.prototype.setLaFuncCache = function(key, value) {
        };
        LooksAhead2.prototype.setLaFuncCacheUsingMap = function(key, value) {
          this.lookAheadFuncsCache.set(key, value);
        };
        LooksAhead2.prototype.setLaFuncUsingObj = function(key, value) {
          this.lookAheadFuncsCache[key] = value;
        };
        return LooksAhead2;
      }()
    );
    exports2.LooksAhead = LooksAhead;
  }
});

// node_modules/chevrotain/lib/src/parse/cst/cst.js
var require_cst = __commonJS({
  "node_modules/chevrotain/lib/src/parse/cst/cst.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.addNoneTerminalToCst = exports2.addTerminalToCst = exports2.setNodeLocationFull = exports2.setNodeLocationOnlyOffset = void 0;
    function setNodeLocationOnlyOffset(currNodeLocation, newLocationInfo) {
      if (isNaN(currNodeLocation.startOffset) === true) {
        currNodeLocation.startOffset = newLocationInfo.startOffset;
        currNodeLocation.endOffset = newLocationInfo.endOffset;
      } else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
        currNodeLocation.endOffset = newLocationInfo.endOffset;
      }
    }
    exports2.setNodeLocationOnlyOffset = setNodeLocationOnlyOffset;
    function setNodeLocationFull(currNodeLocation, newLocationInfo) {
      if (isNaN(currNodeLocation.startOffset) === true) {
        currNodeLocation.startOffset = newLocationInfo.startOffset;
        currNodeLocation.startColumn = newLocationInfo.startColumn;
        currNodeLocation.startLine = newLocationInfo.startLine;
        currNodeLocation.endOffset = newLocationInfo.endOffset;
        currNodeLocation.endColumn = newLocationInfo.endColumn;
        currNodeLocation.endLine = newLocationInfo.endLine;
      } else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
        currNodeLocation.endOffset = newLocationInfo.endOffset;
        currNodeLocation.endColumn = newLocationInfo.endColumn;
        currNodeLocation.endLine = newLocationInfo.endLine;
      }
    }
    exports2.setNodeLocationFull = setNodeLocationFull;
    function addTerminalToCst(node, token, tokenTypeName) {
      if (node.children[tokenTypeName] === void 0) {
        node.children[tokenTypeName] = [token];
      } else {
        node.children[tokenTypeName].push(token);
      }
    }
    exports2.addTerminalToCst = addTerminalToCst;
    function addNoneTerminalToCst(node, ruleName, ruleResult) {
      if (node.children[ruleName] === void 0) {
        node.children[ruleName] = [ruleResult];
      } else {
        node.children[ruleName].push(ruleResult);
      }
    }
    exports2.addNoneTerminalToCst = addNoneTerminalToCst;
  }
});

// node_modules/chevrotain/lib/src/lang/lang_extensions.js
var require_lang_extensions = __commonJS({
  "node_modules/chevrotain/lib/src/lang/lang_extensions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defineNameProp = exports2.functionName = exports2.classNameFromInstance = void 0;
    var utils_1 = require_utils();
    function classNameFromInstance(instance) {
      return functionName(instance.constructor);
    }
    exports2.classNameFromInstance = classNameFromInstance;
    var NAME = "name";
    function functionName(func) {
      var existingNameProp = func.name;
      if (existingNameProp) {
        return existingNameProp;
      } else {
        return "anonymous";
      }
    }
    exports2.functionName = functionName;
    function defineNameProp(obj, nameValue) {
      var namePropDescriptor = Object.getOwnPropertyDescriptor(obj, NAME);
      if (utils_1.isUndefined(namePropDescriptor) || namePropDescriptor.configurable) {
        Object.defineProperty(obj, NAME, {
          enumerable: false,
          configurable: true,
          writable: false,
          value: nameValue
        });
        return true;
      }
      return false;
    }
    exports2.defineNameProp = defineNameProp;
  }
});

// node_modules/chevrotain/lib/src/parse/cst/cst_visitor.js
var require_cst_visitor = __commonJS({
  "node_modules/chevrotain/lib/src/parse/cst/cst_visitor.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateRedundantMethods = exports2.validateMissingCstMethods = exports2.validateVisitor = exports2.CstVisitorDefinitionError = exports2.createBaseVisitorConstructorWithDefaults = exports2.createBaseSemanticVisitorConstructor = exports2.defaultVisit = void 0;
    var utils_1 = require_utils();
    var lang_extensions_1 = require_lang_extensions();
    function defaultVisit(ctx, param) {
      var childrenNames = utils_1.keys(ctx);
      var childrenNamesLength = childrenNames.length;
      for (var i = 0; i < childrenNamesLength; i++) {
        var currChildName = childrenNames[i];
        var currChildArray = ctx[currChildName];
        var currChildArrayLength = currChildArray.length;
        for (var j = 0; j < currChildArrayLength; j++) {
          var currChild = currChildArray[j];
          if (currChild.tokenTypeIdx === void 0) {
            this[currChild.name](currChild.children, param);
          }
        }
      }
      return void 0;
    }
    exports2.defaultVisit = defaultVisit;
    function createBaseSemanticVisitorConstructor(grammarName, ruleNames) {
      var derivedConstructor = function() {
      };
      lang_extensions_1.defineNameProp(derivedConstructor, grammarName + "BaseSemantics");
      var semanticProto = {
        visit: function(cstNode, param) {
          if (utils_1.isArray(cstNode)) {
            cstNode = cstNode[0];
          }
          if (utils_1.isUndefined(cstNode)) {
            return void 0;
          }
          return this[cstNode.name](cstNode.children, param);
        },
        validateVisitor: function() {
          var semanticDefinitionErrors = validateVisitor(this, ruleNames);
          if (!utils_1.isEmpty(semanticDefinitionErrors)) {
            var errorMessages = utils_1.map(semanticDefinitionErrors, function(currDefError) {
              return currDefError.msg;
            });
            throw Error("Errors Detected in CST Visitor <" + lang_extensions_1.functionName(this.constructor) + ">:\n	" + ("" + errorMessages.join("\n\n").replace(/\n/g, "\n	")));
          }
        }
      };
      derivedConstructor.prototype = semanticProto;
      derivedConstructor.prototype.constructor = derivedConstructor;
      derivedConstructor._RULE_NAMES = ruleNames;
      return derivedConstructor;
    }
    exports2.createBaseSemanticVisitorConstructor = createBaseSemanticVisitorConstructor;
    function createBaseVisitorConstructorWithDefaults(grammarName, ruleNames, baseConstructor) {
      var derivedConstructor = function() {
      };
      lang_extensions_1.defineNameProp(derivedConstructor, grammarName + "BaseSemanticsWithDefaults");
      var withDefaultsProto = Object.create(baseConstructor.prototype);
      utils_1.forEach(ruleNames, function(ruleName) {
        withDefaultsProto[ruleName] = defaultVisit;
      });
      derivedConstructor.prototype = withDefaultsProto;
      derivedConstructor.prototype.constructor = derivedConstructor;
      return derivedConstructor;
    }
    exports2.createBaseVisitorConstructorWithDefaults = createBaseVisitorConstructorWithDefaults;
    var CstVisitorDefinitionError;
    (function(CstVisitorDefinitionError2) {
      CstVisitorDefinitionError2[CstVisitorDefinitionError2["REDUNDANT_METHOD"] = 0] = "REDUNDANT_METHOD";
      CstVisitorDefinitionError2[CstVisitorDefinitionError2["MISSING_METHOD"] = 1] = "MISSING_METHOD";
    })(CstVisitorDefinitionError = exports2.CstVisitorDefinitionError || (exports2.CstVisitorDefinitionError = {}));
    function validateVisitor(visitorInstance, ruleNames) {
      var missingErrors = validateMissingCstMethods(visitorInstance, ruleNames);
      var redundantErrors = validateRedundantMethods(visitorInstance, ruleNames);
      return missingErrors.concat(redundantErrors);
    }
    exports2.validateVisitor = validateVisitor;
    function validateMissingCstMethods(visitorInstance, ruleNames) {
      var errors = utils_1.map(ruleNames, function(currRuleName) {
        if (!utils_1.isFunction(visitorInstance[currRuleName])) {
          return {
            msg: "Missing visitor method: <" + currRuleName + "> on " + lang_extensions_1.functionName(visitorInstance.constructor) + " CST Visitor.",
            type: CstVisitorDefinitionError.MISSING_METHOD,
            methodName: currRuleName
          };
        }
      });
      return utils_1.compact(errors);
    }
    exports2.validateMissingCstMethods = validateMissingCstMethods;
    var VALID_PROP_NAMES = ["constructor", "visit", "validateVisitor"];
    function validateRedundantMethods(visitorInstance, ruleNames) {
      var errors = [];
      for (var prop in visitorInstance) {
        if (utils_1.isFunction(visitorInstance[prop]) && !utils_1.contains(VALID_PROP_NAMES, prop) && !utils_1.contains(ruleNames, prop)) {
          errors.push({
            msg: "Redundant visitor method: <" + prop + "> on " + lang_extensions_1.functionName(visitorInstance.constructor) + " CST Visitor\nThere is no Grammar Rule corresponding to this method's name.\n",
            type: CstVisitorDefinitionError.REDUNDANT_METHOD,
            methodName: prop
          });
        }
      }
      return errors;
    }
    exports2.validateRedundantMethods = validateRedundantMethods;
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/tree_builder.js
var require_tree_builder = __commonJS({
  "node_modules/chevrotain/lib/src/parse/parser/traits/tree_builder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TreeBuilder = void 0;
    var cst_1 = require_cst();
    var utils_1 = require_utils();
    var cst_visitor_1 = require_cst_visitor();
    var parser_1 = require_parser();
    var TreeBuilder = (
      /** @class */
      function() {
        function TreeBuilder2() {
        }
        TreeBuilder2.prototype.initTreeBuilder = function(config) {
          this.CST_STACK = [];
          this.outputCst = config.outputCst;
          this.nodeLocationTracking = utils_1.has(config, "nodeLocationTracking") ? config.nodeLocationTracking : parser_1.DEFAULT_PARSER_CONFIG.nodeLocationTracking;
          if (!this.outputCst) {
            this.cstInvocationStateUpdate = utils_1.NOOP;
            this.cstFinallyStateUpdate = utils_1.NOOP;
            this.cstPostTerminal = utils_1.NOOP;
            this.cstPostNonTerminal = utils_1.NOOP;
            this.cstPostRule = utils_1.NOOP;
          } else {
            if (/full/i.test(this.nodeLocationTracking)) {
              if (this.recoveryEnabled) {
                this.setNodeLocationFromToken = cst_1.setNodeLocationFull;
                this.setNodeLocationFromNode = cst_1.setNodeLocationFull;
                this.cstPostRule = utils_1.NOOP;
                this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery;
              } else {
                this.setNodeLocationFromToken = utils_1.NOOP;
                this.setNodeLocationFromNode = utils_1.NOOP;
                this.cstPostRule = this.cstPostRuleFull;
                this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular;
              }
            } else if (/onlyOffset/i.test(this.nodeLocationTracking)) {
              if (this.recoveryEnabled) {
                this.setNodeLocationFromToken = cst_1.setNodeLocationOnlyOffset;
                this.setNodeLocationFromNode = cst_1.setNodeLocationOnlyOffset;
                this.cstPostRule = utils_1.NOOP;
                this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery;
              } else {
                this.setNodeLocationFromToken = utils_1.NOOP;
                this.setNodeLocationFromNode = utils_1.NOOP;
                this.cstPostRule = this.cstPostRuleOnlyOffset;
                this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular;
              }
            } else if (/none/i.test(this.nodeLocationTracking)) {
              this.setNodeLocationFromToken = utils_1.NOOP;
              this.setNodeLocationFromNode = utils_1.NOOP;
              this.cstPostRule = utils_1.NOOP;
              this.setInitialNodeLocation = utils_1.NOOP;
            } else {
              throw Error('Invalid <nodeLocationTracking> config option: "' + config.nodeLocationTracking + '"');
            }
          }
        };
        TreeBuilder2.prototype.setInitialNodeLocationOnlyOffsetRecovery = function(cstNode) {
          cstNode.location = {
            startOffset: NaN,
            endOffset: NaN
          };
        };
        TreeBuilder2.prototype.setInitialNodeLocationOnlyOffsetRegular = function(cstNode) {
          cstNode.location = {
            // without error recovery the starting Location of a new CstNode is guaranteed
            // To be the next Token's startOffset (for valid inputs).
            // For invalid inputs there won't be any CSTOutput so this potential
            // inaccuracy does not matter
            startOffset: this.LA(1).startOffset,
            endOffset: NaN
          };
        };
        TreeBuilder2.prototype.setInitialNodeLocationFullRecovery = function(cstNode) {
          cstNode.location = {
            startOffset: NaN,
            startLine: NaN,
            startColumn: NaN,
            endOffset: NaN,
            endLine: NaN,
            endColumn: NaN
          };
        };
        TreeBuilder2.prototype.setInitialNodeLocationFullRegular = function(cstNode) {
          var nextToken = this.LA(1);
          cstNode.location = {
            startOffset: nextToken.startOffset,
            startLine: nextToken.startLine,
            startColumn: nextToken.startColumn,
            endOffset: NaN,
            endLine: NaN,
            endColumn: NaN
          };
        };
        TreeBuilder2.prototype.cstInvocationStateUpdate = function(fullRuleName, shortName) {
          var cstNode = {
            name: fullRuleName,
            children: {}
          };
          this.setInitialNodeLocation(cstNode);
          this.CST_STACK.push(cstNode);
        };
        TreeBuilder2.prototype.cstFinallyStateUpdate = function() {
          this.CST_STACK.pop();
        };
        TreeBuilder2.prototype.cstPostRuleFull = function(ruleCstNode) {
          var prevToken = this.LA(0);
          var loc = ruleCstNode.location;
          if (loc.startOffset <= prevToken.startOffset === true) {
            loc.endOffset = prevToken.endOffset;
            loc.endLine = prevToken.endLine;
            loc.endColumn = prevToken.endColumn;
          } else {
            loc.startOffset = NaN;
            loc.startLine = NaN;
            loc.startColumn = NaN;
          }
        };
        TreeBuilder2.prototype.cstPostRuleOnlyOffset = function(ruleCstNode) {
          var prevToken = this.LA(0);
          var loc = ruleCstNode.location;
          if (loc.startOffset <= prevToken.startOffset === true) {
            loc.endOffset = prevToken.endOffset;
          } else {
            loc.startOffset = NaN;
          }
        };
        TreeBuilder2.prototype.cstPostTerminal = function(key, consumedToken) {
          var rootCst = this.CST_STACK[this.CST_STACK.length - 1];
          cst_1.addTerminalToCst(rootCst, consumedToken, key);
          this.setNodeLocationFromToken(rootCst.location, consumedToken);
        };
        TreeBuilder2.prototype.cstPostNonTerminal = function(ruleCstResult, ruleName) {
          var preCstNode = this.CST_STACK[this.CST_STACK.length - 1];
          cst_1.addNoneTerminalToCst(preCstNode, ruleName, ruleCstResult);
          this.setNodeLocationFromNode(preCstNode.location, ruleCstResult.location);
        };
        TreeBuilder2.prototype.getBaseCstVisitorConstructor = function() {
          if (utils_1.isUndefined(this.baseCstVisitorConstructor)) {
            var newBaseCstVisitorConstructor = cst_visitor_1.createBaseSemanticVisitorConstructor(this.className, utils_1.keys(this.gastProductionsCache));
            this.baseCstVisitorConstructor = newBaseCstVisitorConstructor;
            return newBaseCstVisitorConstructor;
          }
          return this.baseCstVisitorConstructor;
        };
        TreeBuilder2.prototype.getBaseCstVisitorConstructorWithDefaults = function() {
          if (utils_1.isUndefined(this.baseCstVisitorWithDefaultsConstructor)) {
            var newConstructor = cst_visitor_1.createBaseVisitorConstructorWithDefaults(this.className, utils_1.keys(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
            this.baseCstVisitorWithDefaultsConstructor = newConstructor;
            return newConstructor;
          }
          return this.baseCstVisitorWithDefaultsConstructor;
        };
        TreeBuilder2.prototype.getLastExplicitRuleShortName = function() {
          var ruleStack = this.RULE_STACK;
          return ruleStack[ruleStack.length - 1];
        };
        TreeBuilder2.prototype.getPreviousExplicitRuleShortName = function() {
          var ruleStack = this.RULE_STACK;
          return ruleStack[ruleStack.length - 2];
        };
        TreeBuilder2.prototype.getLastExplicitRuleOccurrenceIndex = function() {
          var occurrenceStack = this.RULE_OCCURRENCE_STACK;
          return occurrenceStack[occurrenceStack.length - 1];
        };
        return TreeBuilder2;
      }()
    );
    exports2.TreeBuilder = TreeBuilder;
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/lexer_adapter.js
var require_lexer_adapter = __commonJS({
  "node_modules/chevrotain/lib/src/parse/parser/traits/lexer_adapter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LexerAdapter = void 0;
    var parser_1 = require_parser();
    var LexerAdapter = (
      /** @class */
      function() {
        function LexerAdapter2() {
        }
        LexerAdapter2.prototype.initLexerAdapter = function() {
          this.tokVector = [];
          this.tokVectorLength = 0;
          this.currIdx = -1;
        };
        Object.defineProperty(LexerAdapter2.prototype, "input", {
          get: function() {
            return this.tokVector;
          },
          set: function(newInput) {
            if (this.selfAnalysisDone !== true) {
              throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
            }
            this.reset();
            this.tokVector = newInput;
            this.tokVectorLength = newInput.length;
          },
          enumerable: false,
          configurable: true
        });
        LexerAdapter2.prototype.SKIP_TOKEN = function() {
          if (this.currIdx <= this.tokVector.length - 2) {
            this.consumeToken();
            return this.LA(1);
          } else {
            return parser_1.END_OF_FILE;
          }
        };
        LexerAdapter2.prototype.LA = function(howMuch) {
          var soughtIdx = this.currIdx + howMuch;
          if (soughtIdx < 0 || this.tokVectorLength <= soughtIdx) {
            return parser_1.END_OF_FILE;
          } else {
            return this.tokVector[soughtIdx];
          }
        };
        LexerAdapter2.prototype.consumeToken = function() {
          this.currIdx++;
        };
        LexerAdapter2.prototype.exportLexerState = function() {
          return this.currIdx;
        };
        LexerAdapter2.prototype.importLexerState = function(newState) {
          this.currIdx = newState;
        };
        LexerAdapter2.prototype.resetLexerState = function() {
          this.currIdx = -1;
        };
        LexerAdapter2.prototype.moveToTerminatedState = function() {
          this.currIdx = this.tokVector.length - 1;
        };
        LexerAdapter2.prototype.getLexerPosition = function() {
          return this.exportLexerState();
        };
        return LexerAdapter2;
      }()
    );
    exports2.LexerAdapter = LexerAdapter;
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/recognizer_api.js
var require_recognizer_api = __commonJS({
  "node_modules/chevrotain/lib/src/parse/parser/traits/recognizer_api.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RecognizerApi = void 0;
    var utils_1 = require_utils();
    var exceptions_public_1 = require_exceptions_public();
    var parser_1 = require_parser();
    var errors_public_1 = require_errors_public();
    var checks_1 = require_checks();
    var gast_public_1 = require_gast_public();
    var RecognizerApi = (
      /** @class */
      function() {
        function RecognizerApi2() {
        }
        RecognizerApi2.prototype.ACTION = function(impl) {
          return impl.call(this);
        };
        RecognizerApi2.prototype.consume = function(idx, tokType, options) {
          return this.consumeInternal(tokType, idx, options);
        };
        RecognizerApi2.prototype.subrule = function(idx, ruleToCall, options) {
          return this.subruleInternal(ruleToCall, idx, options);
        };
        RecognizerApi2.prototype.option = function(idx, actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, idx);
        };
        RecognizerApi2.prototype.or = function(idx, altsOrOpts) {
          return this.orInternal(altsOrOpts, idx);
        };
        RecognizerApi2.prototype.many = function(idx, actionORMethodDef) {
          return this.manyInternal(idx, actionORMethodDef);
        };
        RecognizerApi2.prototype.atLeastOne = function(idx, actionORMethodDef) {
          return this.atLeastOneInternal(idx, actionORMethodDef);
        };
        RecognizerApi2.prototype.CONSUME = function(tokType, options) {
          return this.consumeInternal(tokType, 0, options);
        };
        RecognizerApi2.prototype.CONSUME1 = function(tokType, options) {
          return this.consumeInternal(tokType, 1, options);
        };
        RecognizerApi2.prototype.CONSUME2 = function(tokType, options) {
          return this.consumeInternal(tokType, 2, options);
        };
        RecognizerApi2.prototype.CONSUME3 = function(tokType, options) {
          return this.consumeInternal(tokType, 3, options);
        };
        RecognizerApi2.prototype.CONSUME4 = function(tokType, options) {
          return this.consumeInternal(tokType, 4, options);
        };
        RecognizerApi2.prototype.CONSUME5 = function(tokType, options) {
          return this.consumeInternal(tokType, 5, options);
        };
        RecognizerApi2.prototype.CONSUME6 = function(tokType, options) {
          return this.consumeInternal(tokType, 6, options);
        };
        RecognizerApi2.prototype.CONSUME7 = function(tokType, options) {
          return this.consumeInternal(tokType, 7, options);
        };
        RecognizerApi2.prototype.CONSUME8 = function(tokType, options) {
          return this.consumeInternal(tokType, 8, options);
        };
        RecognizerApi2.prototype.CONSUME9 = function(tokType, options) {
          return this.consumeInternal(tokType, 9, options);
        };
        RecognizerApi2.prototype.SUBRULE = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 0, options);
        };
        RecognizerApi2.prototype.SUBRULE1 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 1, options);
        };
        RecognizerApi2.prototype.SUBRULE2 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 2, options);
        };
        RecognizerApi2.prototype.SUBRULE3 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 3, options);
        };
        RecognizerApi2.prototype.SUBRULE4 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 4, options);
        };
        RecognizerApi2.prototype.SUBRULE5 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 5, options);
        };
        RecognizerApi2.prototype.SUBRULE6 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 6, options);
        };
        RecognizerApi2.prototype.SUBRULE7 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 7, options);
        };
        RecognizerApi2.prototype.SUBRULE8 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 8, options);
        };
        RecognizerApi2.prototype.SUBRULE9 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 9, options);
        };
        RecognizerApi2.prototype.OPTION = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 0);
        };
        RecognizerApi2.prototype.OPTION1 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 1);
        };
        RecognizerApi2.prototype.OPTION2 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 2);
        };
        RecognizerApi2.prototype.OPTION3 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 3);
        };
        RecognizerApi2.prototype.OPTION4 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 4);
        };
        RecognizerApi2.prototype.OPTION5 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 5);
        };
        RecognizerApi2.prototype.OPTION6 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 6);
        };
        RecognizerApi2.prototype.OPTION7 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 7);
        };
        RecognizerApi2.prototype.OPTION8 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 8);
        };
        RecognizerApi2.prototype.OPTION9 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 9);
        };
        RecognizerApi2.prototype.OR = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 0);
        };
        RecognizerApi2.prototype.OR1 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 1);
        };
        RecognizerApi2.prototype.OR2 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 2);
        };
        RecognizerApi2.prototype.OR3 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 3);
        };
        RecognizerApi2.prototype.OR4 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 4);
        };
        RecognizerApi2.prototype.OR5 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 5);
        };
        RecognizerApi2.prototype.OR6 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 6);
        };
        RecognizerApi2.prototype.OR7 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 7);
        };
        RecognizerApi2.prototype.OR8 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 8);
        };
        RecognizerApi2.prototype.OR9 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 9);
        };
        RecognizerApi2.prototype.MANY = function(actionORMethodDef) {
          this.manyInternal(0, actionORMethodDef);
        };
        RecognizerApi2.prototype.MANY1 = function(actionORMethodDef) {
          this.manyInternal(1, actionORMethodDef);
        };
        RecognizerApi2.prototype.MANY2 = function(actionORMethodDef) {
          this.manyInternal(2, actionORMethodDef);
        };
        RecognizerApi2.prototype.MANY3 = function(actionORMethodDef) {
          this.manyInternal(3, actionORMethodDef);
        };
        RecognizerApi2.prototype.MANY4 = function(actionORMethodDef) {
          this.manyInternal(4, actionORMethodDef);
        };
        RecognizerApi2.prototype.MANY5 = function(actionORMethodDef) {
          this.manyInternal(5, actionORMethodDef);
        };
        RecognizerApi2.prototype.MANY6 = function(actionORMethodDef) {
          this.manyInternal(6, actionORMethodDef);
        };
        RecognizerApi2.prototype.MANY7 = function(actionORMethodDef) {
          this.manyInternal(7, actionORMethodDef);
        };
        RecognizerApi2.prototype.MANY8 = function(actionORMethodDef) {
          this.manyInternal(8, actionORMethodDef);
        };
        RecognizerApi2.prototype.MANY9 = function(actionORMethodDef) {
          this.manyInternal(9, actionORMethodDef);
        };
        RecognizerApi2.prototype.MANY_SEP = function(options) {
          this.manySepFirstInternal(0, options);
        };
        RecognizerApi2.prototype.MANY_SEP1 = function(options) {
          this.manySepFirstInternal(1, options);
        };
        RecognizerApi2.prototype.MANY_SEP2 = function(options) {
          this.manySepFirstInternal(2, options);
        };
        RecognizerApi2.prototype.MANY_SEP3 = function(options) {
          this.manySepFirstInternal(3, options);
        };
        RecognizerApi2.prototype.MANY_SEP4 = function(options) {
          this.manySepFirstInternal(4, options);
        };
        RecognizerApi2.prototype.MANY_SEP5 = function(options) {
          this.manySepFirstInternal(5, options);
        };
        RecognizerApi2.prototype.MANY_SEP6 = function(options) {
          this.manySepFirstInternal(6, options);
        };
        RecognizerApi2.prototype.MANY_SEP7 = function(options) {
          this.manySepFirstInternal(7, options);
        };
        RecognizerApi2.prototype.MANY_SEP8 = function(options) {
          this.manySepFirstInternal(8, options);
        };
        RecognizerApi2.prototype.MANY_SEP9 = function(options) {
          this.manySepFirstInternal(9, options);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE = function(actionORMethodDef) {
          this.atLeastOneInternal(0, actionORMethodDef);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE1 = function(actionORMethodDef) {
          return this.atLeastOneInternal(1, actionORMethodDef);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE2 = function(actionORMethodDef) {
          this.atLeastOneInternal(2, actionORMethodDef);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE3 = function(actionORMethodDef) {
          this.atLeastOneInternal(3, actionORMethodDef);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE4 = function(actionORMethodDef) {
          this.atLeastOneInternal(4, actionORMethodDef);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE5 = function(actionORMethodDef) {
          this.atLeastOneInternal(5, actionORMethodDef);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE6 = function(actionORMethodDef) {
          this.atLeastOneInternal(6, actionORMethodDef);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE7 = function(actionORMethodDef) {
          this.atLeastOneInternal(7, actionORMethodDef);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE8 = function(actionORMethodDef) {
          this.atLeastOneInternal(8, actionORMethodDef);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE9 = function(actionORMethodDef) {
          this.atLeastOneInternal(9, actionORMethodDef);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE_SEP = function(options) {
          this.atLeastOneSepFirstInternal(0, options);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE_SEP1 = function(options) {
          this.atLeastOneSepFirstInternal(1, options);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE_SEP2 = function(options) {
          this.atLeastOneSepFirstInternal(2, options);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE_SEP3 = function(options) {
          this.atLeastOneSepFirstInternal(3, options);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE_SEP4 = function(options) {
          this.atLeastOneSepFirstInternal(4, options);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE_SEP5 = function(options) {
          this.atLeastOneSepFirstInternal(5, options);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE_SEP6 = function(options) {
          this.atLeastOneSepFirstInternal(6, options);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE_SEP7 = function(options) {
          this.atLeastOneSepFirstInternal(7, options);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE_SEP8 = function(options) {
          this.atLeastOneSepFirstInternal(8, options);
        };
        RecognizerApi2.prototype.AT_LEAST_ONE_SEP9 = function(options) {
          this.atLeastOneSepFirstInternal(9, options);
        };
        RecognizerApi2.prototype.RULE = function(name, implementation, config) {
          if (config === void 0) {
            config = parser_1.DEFAULT_RULE_CONFIG;
          }
          if (utils_1.contains(this.definedRulesNames, name)) {
            var errMsg = errors_public_1.defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({
              topLevelRule: name,
              grammarName: this.className
            });
            var error = {
              message: errMsg,
              type: parser_1.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
              ruleName: name
            };
            this.definitionErrors.push(error);
          }
          this.definedRulesNames.push(name);
          var ruleImplementation = this.defineRule(name, implementation, config);
          this[name] = ruleImplementation;
          return ruleImplementation;
        };
        RecognizerApi2.prototype.OVERRIDE_RULE = function(name, impl, config) {
          if (config === void 0) {
            config = parser_1.DEFAULT_RULE_CONFIG;
          }
          var ruleErrors = [];
          ruleErrors = ruleErrors.concat(checks_1.validateRuleIsOverridden(name, this.definedRulesNames, this.className));
          this.definitionErrors.push.apply(this.definitionErrors, ruleErrors);
          var ruleImplementation = this.defineRule(name, impl, config);
          this[name] = ruleImplementation;
          return ruleImplementation;
        };
        RecognizerApi2.prototype.BACKTRACK = function(grammarRule, args) {
          return function() {
            this.isBackTrackingStack.push(1);
            var orgState = this.saveRecogState();
            try {
              grammarRule.apply(this, args);
              return true;
            } catch (e) {
              if (exceptions_public_1.isRecognitionException(e)) {
                return false;
              } else {
                throw e;
              }
            } finally {
              this.reloadRecogState(orgState);
              this.isBackTrackingStack.pop();
            }
          };
        };
        RecognizerApi2.prototype.getGAstProductions = function() {
          return this.gastProductionsCache;
        };
        RecognizerApi2.prototype.getSerializedGastProductions = function() {
          return gast_public_1.serializeGrammar(utils_1.values(this.gastProductionsCache));
        };
        return RecognizerApi2;
      }()
    );
    exports2.RecognizerApi = RecognizerApi;
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/recognizer_engine.js
var require_recognizer_engine = __commonJS({
  "node_modules/chevrotain/lib/src/parse/parser/traits/recognizer_engine.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RecognizerEngine = void 0;
    var utils_1 = require_utils();
    var keys_1 = require_keys();
    var exceptions_public_1 = require_exceptions_public();
    var lookahead_1 = require_lookahead();
    var interpreter_1 = require_interpreter();
    var parser_1 = require_parser();
    var recoverable_1 = require_recoverable();
    var tokens_public_1 = require_tokens_public();
    var tokens_1 = require_tokens();
    var lang_extensions_1 = require_lang_extensions();
    var RecognizerEngine = (
      /** @class */
      function() {
        function RecognizerEngine2() {
        }
        RecognizerEngine2.prototype.initRecognizerEngine = function(tokenVocabulary, config) {
          this.className = lang_extensions_1.classNameFromInstance(this);
          this.shortRuleNameToFull = {};
          this.fullRuleNameToShort = {};
          this.ruleShortNameIdx = 256;
          this.tokenMatcher = tokens_1.tokenStructuredMatcherNoCategories;
          this.definedRulesNames = [];
          this.tokensMap = {};
          this.isBackTrackingStack = [];
          this.RULE_STACK = [];
          this.RULE_OCCURRENCE_STACK = [];
          this.gastProductionsCache = {};
          if (utils_1.has(config, "serializedGrammar")) {
            throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0\n	For Further details.");
          }
          if (utils_1.isArray(tokenVocabulary)) {
            if (utils_1.isEmpty(tokenVocabulary)) {
              throw Error("A Token Vocabulary cannot be empty.\n	Note that the first argument for the parser constructor\n	is no longer a Token vector (since v4.0).");
            }
            if (typeof tokenVocabulary[0].startOffset === "number") {
              throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0\n	For Further details.");
            }
          }
          if (utils_1.isArray(tokenVocabulary)) {
            this.tokensMap = utils_1.reduce(tokenVocabulary, function(acc, tokType) {
              acc[tokType.name] = tokType;
              return acc;
            }, {});
          } else if (utils_1.has(tokenVocabulary, "modes") && utils_1.every(utils_1.flatten(utils_1.values(tokenVocabulary.modes)), tokens_1.isTokenType)) {
            var allTokenTypes = utils_1.flatten(utils_1.values(tokenVocabulary.modes));
            var uniqueTokens = utils_1.uniq(allTokenTypes);
            this.tokensMap = utils_1.reduce(uniqueTokens, function(acc, tokType) {
              acc[tokType.name] = tokType;
              return acc;
            }, {});
          } else if (utils_1.isObject(tokenVocabulary)) {
            this.tokensMap = utils_1.cloneObj(tokenVocabulary);
          } else {
            throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
          }
          this.tokensMap["EOF"] = tokens_public_1.EOF;
          var noTokenCategoriesUsed = utils_1.every(utils_1.values(tokenVocabulary), function(tokenConstructor) {
            return utils_1.isEmpty(tokenConstructor.categoryMatches);
          });
          this.tokenMatcher = noTokenCategoriesUsed ? tokens_1.tokenStructuredMatcherNoCategories : tokens_1.tokenStructuredMatcher;
          tokens_1.augmentTokenTypes(utils_1.values(this.tokensMap));
        };
        RecognizerEngine2.prototype.defineRule = function(ruleName, impl, config) {
          if (this.selfAnalysisDone) {
            throw Error("Grammar rule <" + ruleName + "> may not be defined after the 'performSelfAnalysis' method has been called'\nMake sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");
          }
          var resyncEnabled = utils_1.has(config, "resyncEnabled") ? config.resyncEnabled : parser_1.DEFAULT_RULE_CONFIG.resyncEnabled;
          var recoveryValueFunc = utils_1.has(config, "recoveryValueFunc") ? config.recoveryValueFunc : parser_1.DEFAULT_RULE_CONFIG.recoveryValueFunc;
          var shortName = this.ruleShortNameIdx << keys_1.BITS_FOR_METHOD_TYPE + keys_1.BITS_FOR_OCCURRENCE_IDX;
          this.ruleShortNameIdx++;
          this.shortRuleNameToFull[shortName] = ruleName;
          this.fullRuleNameToShort[ruleName] = shortName;
          function invokeRuleWithTry(args) {
            try {
              if (this.outputCst === true) {
                impl.apply(this, args);
                var cst = this.CST_STACK[this.CST_STACK.length - 1];
                this.cstPostRule(cst);
                return cst;
              } else {
                return impl.apply(this, args);
              }
            } catch (e) {
              return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
            } finally {
              this.ruleFinallyStateUpdate();
            }
          }
          var wrappedGrammarRule;
          wrappedGrammarRule = function(idxInCallingRule, args) {
            if (idxInCallingRule === void 0) {
              idxInCallingRule = 0;
            }
            this.ruleInvocationStateUpdate(shortName, ruleName, idxInCallingRule);
            return invokeRuleWithTry.call(this, args);
          };
          var ruleNamePropName = "ruleName";
          wrappedGrammarRule[ruleNamePropName] = ruleName;
          wrappedGrammarRule["originalGrammarAction"] = impl;
          return wrappedGrammarRule;
        };
        RecognizerEngine2.prototype.invokeRuleCatch = function(e, resyncEnabledConfig, recoveryValueFunc) {
          var isFirstInvokedRule = this.RULE_STACK.length === 1;
          var reSyncEnabled = resyncEnabledConfig && !this.isBackTracking() && this.recoveryEnabled;
          if (exceptions_public_1.isRecognitionException(e)) {
            var recogError = e;
            if (reSyncEnabled) {
              var reSyncTokType = this.findReSyncTokenType();
              if (this.isInCurrentRuleReSyncSet(reSyncTokType)) {
                recogError.resyncedTokens = this.reSyncTo(reSyncTokType);
                if (this.outputCst) {
                  var partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
                  partialCstResult.recoveredNode = true;
                  return partialCstResult;
                } else {
                  return recoveryValueFunc();
                }
              } else {
                if (this.outputCst) {
                  var partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
                  partialCstResult.recoveredNode = true;
                  recogError.partialCstResult = partialCstResult;
                }
                throw recogError;
              }
            } else if (isFirstInvokedRule) {
              this.moveToTerminatedState();
              return recoveryValueFunc();
            } else {
              throw recogError;
            }
          } else {
            throw e;
          }
        };
        RecognizerEngine2.prototype.optionInternal = function(actionORMethodDef, occurrence) {
          var key = this.getKeyForAutomaticLookahead(keys_1.OPTION_IDX, occurrence);
          return this.optionInternalLogic(actionORMethodDef, occurrence, key);
        };
        RecognizerEngine2.prototype.optionInternalLogic = function(actionORMethodDef, occurrence, key) {
          var _this = this;
          var lookAheadFunc = this.getLaFuncFromCache(key);
          var action;
          var predicate;
          if (actionORMethodDef.DEF !== void 0) {
            action = actionORMethodDef.DEF;
            predicate = actionORMethodDef.GATE;
            if (predicate !== void 0) {
              var orgLookaheadFunction_1 = lookAheadFunc;
              lookAheadFunc = function() {
                return predicate.call(_this) && orgLookaheadFunction_1.call(_this);
              };
            }
          } else {
            action = actionORMethodDef;
          }
          if (lookAheadFunc.call(this) === true) {
            return action.call(this);
          }
          return void 0;
        };
        RecognizerEngine2.prototype.atLeastOneInternal = function(prodOccurrence, actionORMethodDef) {
          var laKey = this.getKeyForAutomaticLookahead(keys_1.AT_LEAST_ONE_IDX, prodOccurrence);
          return this.atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, laKey);
        };
        RecognizerEngine2.prototype.atLeastOneInternalLogic = function(prodOccurrence, actionORMethodDef, key) {
          var _this = this;
          var lookAheadFunc = this.getLaFuncFromCache(key);
          var action;
          var predicate;
          if (actionORMethodDef.DEF !== void 0) {
            action = actionORMethodDef.DEF;
            predicate = actionORMethodDef.GATE;
            if (predicate !== void 0) {
              var orgLookaheadFunction_2 = lookAheadFunc;
              lookAheadFunc = function() {
                return predicate.call(_this) && orgLookaheadFunction_2.call(_this);
              };
            }
          } else {
            action = actionORMethodDef;
          }
          if (lookAheadFunc.call(this) === true) {
            var notStuck = this.doSingleRepetition(action);
            while (lookAheadFunc.call(this) === true && notStuck === true) {
              notStuck = this.doSingleRepetition(action);
            }
          } else {
            throw this.raiseEarlyExitException(prodOccurrence, lookahead_1.PROD_TYPE.REPETITION_MANDATORY, actionORMethodDef.ERR_MSG);
          }
          this.attemptInRepetitionRecovery(this.atLeastOneInternal, [prodOccurrence, actionORMethodDef], lookAheadFunc, keys_1.AT_LEAST_ONE_IDX, prodOccurrence, interpreter_1.NextTerminalAfterAtLeastOneWalker);
        };
        RecognizerEngine2.prototype.atLeastOneSepFirstInternal = function(prodOccurrence, options) {
          var laKey = this.getKeyForAutomaticLookahead(keys_1.AT_LEAST_ONE_SEP_IDX, prodOccurrence);
          this.atLeastOneSepFirstInternalLogic(prodOccurrence, options, laKey);
        };
        RecognizerEngine2.prototype.atLeastOneSepFirstInternalLogic = function(prodOccurrence, options, key) {
          var _this = this;
          var action = options.DEF;
          var separator = options.SEP;
          var firstIterationLookaheadFunc = this.getLaFuncFromCache(key);
          if (firstIterationLookaheadFunc.call(this) === true) {
            ;
            action.call(this);
            var separatorLookAheadFunc = function() {
              return _this.tokenMatcher(_this.LA(1), separator);
            };
            while (this.tokenMatcher(this.LA(1), separator) === true) {
              this.CONSUME(separator);
              action.call(this);
            }
            this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
              prodOccurrence,
              separator,
              separatorLookAheadFunc,
              action,
              interpreter_1.NextTerminalAfterAtLeastOneSepWalker
            ], separatorLookAheadFunc, keys_1.AT_LEAST_ONE_SEP_IDX, prodOccurrence, interpreter_1.NextTerminalAfterAtLeastOneSepWalker);
          } else {
            throw this.raiseEarlyExitException(prodOccurrence, lookahead_1.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, options.ERR_MSG);
          }
        };
        RecognizerEngine2.prototype.manyInternal = function(prodOccurrence, actionORMethodDef) {
          var laKey = this.getKeyForAutomaticLookahead(keys_1.MANY_IDX, prodOccurrence);
          return this.manyInternalLogic(prodOccurrence, actionORMethodDef, laKey);
        };
        RecognizerEngine2.prototype.manyInternalLogic = function(prodOccurrence, actionORMethodDef, key) {
          var _this = this;
          var lookaheadFunction = this.getLaFuncFromCache(key);
          var action;
          var predicate;
          if (actionORMethodDef.DEF !== void 0) {
            action = actionORMethodDef.DEF;
            predicate = actionORMethodDef.GATE;
            if (predicate !== void 0) {
              var orgLookaheadFunction_3 = lookaheadFunction;
              lookaheadFunction = function() {
                return predicate.call(_this) && orgLookaheadFunction_3.call(_this);
              };
            }
          } else {
            action = actionORMethodDef;
          }
          var notStuck = true;
          while (lookaheadFunction.call(this) === true && notStuck === true) {
            notStuck = this.doSingleRepetition(action);
          }
          this.attemptInRepetitionRecovery(
            this.manyInternal,
            [prodOccurrence, actionORMethodDef],
            lookaheadFunction,
            keys_1.MANY_IDX,
            prodOccurrence,
            interpreter_1.NextTerminalAfterManyWalker,
            // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
            // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
            // An infinite loop cannot occur as:
            // - Either the lookahead is guaranteed to consume something (Single Token Separator)
            // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
            notStuck
          );
        };
        RecognizerEngine2.prototype.manySepFirstInternal = function(prodOccurrence, options) {
          var laKey = this.getKeyForAutomaticLookahead(keys_1.MANY_SEP_IDX, prodOccurrence);
          this.manySepFirstInternalLogic(prodOccurrence, options, laKey);
        };
        RecognizerEngine2.prototype.manySepFirstInternalLogic = function(prodOccurrence, options, key) {
          var _this = this;
          var action = options.DEF;
          var separator = options.SEP;
          var firstIterationLaFunc = this.getLaFuncFromCache(key);
          if (firstIterationLaFunc.call(this) === true) {
            action.call(this);
            var separatorLookAheadFunc = function() {
              return _this.tokenMatcher(_this.LA(1), separator);
            };
            while (this.tokenMatcher(this.LA(1), separator) === true) {
              this.CONSUME(separator);
              action.call(this);
            }
            this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
              prodOccurrence,
              separator,
              separatorLookAheadFunc,
              action,
              interpreter_1.NextTerminalAfterManySepWalker
            ], separatorLookAheadFunc, keys_1.MANY_SEP_IDX, prodOccurrence, interpreter_1.NextTerminalAfterManySepWalker);
          }
        };
        RecognizerEngine2.prototype.repetitionSepSecondInternal = function(prodOccurrence, separator, separatorLookAheadFunc, action, nextTerminalAfterWalker) {
          while (separatorLookAheadFunc()) {
            this.CONSUME(separator);
            action.call(this);
          }
          this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
            prodOccurrence,
            separator,
            separatorLookAheadFunc,
            action,
            nextTerminalAfterWalker
          ], separatorLookAheadFunc, keys_1.AT_LEAST_ONE_SEP_IDX, prodOccurrence, nextTerminalAfterWalker);
        };
        RecognizerEngine2.prototype.doSingleRepetition = function(action) {
          var beforeIteration = this.getLexerPosition();
          action.call(this);
          var afterIteration = this.getLexerPosition();
          return afterIteration > beforeIteration;
        };
        RecognizerEngine2.prototype.orInternal = function(altsOrOpts, occurrence) {
          var laKey = this.getKeyForAutomaticLookahead(keys_1.OR_IDX, occurrence);
          var alts = utils_1.isArray(altsOrOpts) ? altsOrOpts : altsOrOpts.DEF;
          var laFunc = this.getLaFuncFromCache(laKey);
          var altIdxToTake = laFunc.call(this, alts);
          if (altIdxToTake !== void 0) {
            var chosenAlternative = alts[altIdxToTake];
            return chosenAlternative.ALT.call(this);
          }
          this.raiseNoAltException(occurrence, altsOrOpts.ERR_MSG);
        };
        RecognizerEngine2.prototype.ruleFinallyStateUpdate = function() {
          this.RULE_STACK.pop();
          this.RULE_OCCURRENCE_STACK.pop();
          this.cstFinallyStateUpdate();
          if (this.RULE_STACK.length === 0 && this.isAtEndOfInput() === false) {
            var firstRedundantTok = this.LA(1);
            var errMsg = this.errorMessageProvider.buildNotAllInputParsedMessage({
              firstRedundant: firstRedundantTok,
              ruleName: this.getCurrRuleFullName()
            });
            this.SAVE_ERROR(new exceptions_public_1.NotAllInputParsedException(errMsg, firstRedundantTok));
          }
        };
        RecognizerEngine2.prototype.subruleInternal = function(ruleToCall, idx, options) {
          var ruleResult;
          try {
            var args = options !== void 0 ? options.ARGS : void 0;
            ruleResult = ruleToCall.call(this, idx, args);
            this.cstPostNonTerminal(ruleResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleToCall.ruleName);
            return ruleResult;
          } catch (e) {
            this.subruleInternalError(e, options, ruleToCall.ruleName);
          }
        };
        RecognizerEngine2.prototype.subruleInternalError = function(e, options, ruleName) {
          if (exceptions_public_1.isRecognitionException(e) && e.partialCstResult !== void 0) {
            this.cstPostNonTerminal(e.partialCstResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleName);
            delete e.partialCstResult;
          }
          throw e;
        };
        RecognizerEngine2.prototype.consumeInternal = function(tokType, idx, options) {
          var consumedToken;
          try {
            var nextToken = this.LA(1);
            if (this.tokenMatcher(nextToken, tokType) === true) {
              this.consumeToken();
              consumedToken = nextToken;
            } else {
              this.consumeInternalError(tokType, nextToken, options);
            }
          } catch (eFromConsumption) {
            consumedToken = this.consumeInternalRecovery(tokType, idx, eFromConsumption);
          }
          this.cstPostTerminal(options !== void 0 && options.LABEL !== void 0 ? options.LABEL : tokType.name, consumedToken);
          return consumedToken;
        };
        RecognizerEngine2.prototype.consumeInternalError = function(tokType, nextToken, options) {
          var msg;
          var previousToken = this.LA(0);
          if (options !== void 0 && options.ERR_MSG) {
            msg = options.ERR_MSG;
          } else {
            msg = this.errorMessageProvider.buildMismatchTokenMessage({
              expected: tokType,
              actual: nextToken,
              previous: previousToken,
              ruleName: this.getCurrRuleFullName()
            });
          }
          throw this.SAVE_ERROR(new exceptions_public_1.MismatchedTokenException(msg, nextToken, previousToken));
        };
        RecognizerEngine2.prototype.consumeInternalRecovery = function(tokType, idx, eFromConsumption) {
          if (this.recoveryEnabled && // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
          eFromConsumption.name === "MismatchedTokenException" && !this.isBackTracking()) {
            var follows = this.getFollowsForInRuleRecovery(tokType, idx);
            try {
              return this.tryInRuleRecovery(tokType, follows);
            } catch (eFromInRuleRecovery) {
              if (eFromInRuleRecovery.name === recoverable_1.IN_RULE_RECOVERY_EXCEPTION) {
                throw eFromConsumption;
              } else {
                throw eFromInRuleRecovery;
              }
            }
          } else {
            throw eFromConsumption;
          }
        };
        RecognizerEngine2.prototype.saveRecogState = function() {
          var savedErrors = this.errors;
          var savedRuleStack = utils_1.cloneArr(this.RULE_STACK);
          return {
            errors: savedErrors,
            lexerState: this.exportLexerState(),
            RULE_STACK: savedRuleStack,
            CST_STACK: this.CST_STACK
          };
        };
        RecognizerEngine2.prototype.reloadRecogState = function(newState) {
          this.errors = newState.errors;
          this.importLexerState(newState.lexerState);
          this.RULE_STACK = newState.RULE_STACK;
        };
        RecognizerEngine2.prototype.ruleInvocationStateUpdate = function(shortName, fullName, idxInCallingRule) {
          this.RULE_OCCURRENCE_STACK.push(idxInCallingRule);
          this.RULE_STACK.push(shortName);
          this.cstInvocationStateUpdate(fullName, shortName);
        };
        RecognizerEngine2.prototype.isBackTracking = function() {
          return this.isBackTrackingStack.length !== 0;
        };
        RecognizerEngine2.prototype.getCurrRuleFullName = function() {
          var shortName = this.getLastExplicitRuleShortName();
          return this.shortRuleNameToFull[shortName];
        };
        RecognizerEngine2.prototype.shortRuleNameToFullName = function(shortName) {
          return this.shortRuleNameToFull[shortName];
        };
        RecognizerEngine2.prototype.isAtEndOfInput = function() {
          return this.tokenMatcher(this.LA(1), tokens_public_1.EOF);
        };
        RecognizerEngine2.prototype.reset = function() {
          this.resetLexerState();
          this.isBackTrackingStack = [];
          this.errors = [];
          this.RULE_STACK = [];
          this.CST_STACK = [];
          this.RULE_OCCURRENCE_STACK = [];
        };
        return RecognizerEngine2;
      }()
    );
    exports2.RecognizerEngine = RecognizerEngine;
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/error_handler.js
var require_error_handler = __commonJS({
  "node_modules/chevrotain/lib/src/parse/parser/traits/error_handler.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ErrorHandler = void 0;
    var exceptions_public_1 = require_exceptions_public();
    var utils_1 = require_utils();
    var lookahead_1 = require_lookahead();
    var parser_1 = require_parser();
    var ErrorHandler = (
      /** @class */
      function() {
        function ErrorHandler2() {
        }
        ErrorHandler2.prototype.initErrorHandler = function(config) {
          this._errors = [];
          this.errorMessageProvider = utils_1.has(config, "errorMessageProvider") ? config.errorMessageProvider : parser_1.DEFAULT_PARSER_CONFIG.errorMessageProvider;
        };
        ErrorHandler2.prototype.SAVE_ERROR = function(error) {
          if (exceptions_public_1.isRecognitionException(error)) {
            error.context = {
              ruleStack: this.getHumanReadableRuleStack(),
              ruleOccurrenceStack: utils_1.cloneArr(this.RULE_OCCURRENCE_STACK)
            };
            this._errors.push(error);
            return error;
          } else {
            throw Error("Trying to save an Error which is not a RecognitionException");
          }
        };
        Object.defineProperty(ErrorHandler2.prototype, "errors", {
          get: function() {
            return utils_1.cloneArr(this._errors);
          },
          set: function(newErrors) {
            this._errors = newErrors;
          },
          enumerable: false,
          configurable: true
        });
        ErrorHandler2.prototype.raiseEarlyExitException = function(occurrence, prodType, userDefinedErrMsg) {
          var ruleName = this.getCurrRuleFullName();
          var ruleGrammar = this.getGAstProductions()[ruleName];
          var lookAheadPathsPerAlternative = lookahead_1.getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, this.maxLookahead);
          var insideProdPaths = lookAheadPathsPerAlternative[0];
          var actualTokens = [];
          for (var i = 1; i <= this.maxLookahead; i++) {
            actualTokens.push(this.LA(i));
          }
          var msg = this.errorMessageProvider.buildEarlyExitMessage({
            expectedIterationPaths: insideProdPaths,
            actual: actualTokens,
            previous: this.LA(0),
            customUserDescription: userDefinedErrMsg,
            ruleName
          });
          throw this.SAVE_ERROR(new exceptions_public_1.EarlyExitException(msg, this.LA(1), this.LA(0)));
        };
        ErrorHandler2.prototype.raiseNoAltException = function(occurrence, errMsgTypes) {
          var ruleName = this.getCurrRuleFullName();
          var ruleGrammar = this.getGAstProductions()[ruleName];
          var lookAheadPathsPerAlternative = lookahead_1.getLookaheadPathsForOr(occurrence, ruleGrammar, this.maxLookahead);
          var actualTokens = [];
          for (var i = 1; i <= this.maxLookahead; i++) {
            actualTokens.push(this.LA(i));
          }
          var previousToken = this.LA(0);
          var errMsg = this.errorMessageProvider.buildNoViableAltMessage({
            expectedPathsPerAlt: lookAheadPathsPerAlternative,
            actual: actualTokens,
            previous: previousToken,
            customUserDescription: errMsgTypes,
            ruleName: this.getCurrRuleFullName()
          });
          throw this.SAVE_ERROR(new exceptions_public_1.NoViableAltException(errMsg, this.LA(1), previousToken));
        };
        return ErrorHandler2;
      }()
    );
    exports2.ErrorHandler = ErrorHandler;
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/context_assist.js
var require_context_assist = __commonJS({
  "node_modules/chevrotain/lib/src/parse/parser/traits/context_assist.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ContentAssist = void 0;
    var interpreter_1 = require_interpreter();
    var utils_1 = require_utils();
    var ContentAssist = (
      /** @class */
      function() {
        function ContentAssist2() {
        }
        ContentAssist2.prototype.initContentAssist = function() {
        };
        ContentAssist2.prototype.computeContentAssist = function(startRuleName, precedingInput) {
          var startRuleGast = this.gastProductionsCache[startRuleName];
          if (utils_1.isUndefined(startRuleGast)) {
            throw Error("Rule ->" + startRuleName + "<- does not exist in this grammar.");
          }
          return interpreter_1.nextPossibleTokensAfter([startRuleGast], precedingInput, this.tokenMatcher, this.maxLookahead);
        };
        ContentAssist2.prototype.getNextPossibleTokenTypes = function(grammarPath) {
          var topRuleName = utils_1.first(grammarPath.ruleStack);
          var gastProductions = this.getGAstProductions();
          var topProduction = gastProductions[topRuleName];
          var nextPossibleTokenTypes = new interpreter_1.NextAfterTokenWalker(topProduction, grammarPath).startWalking();
          return nextPossibleTokenTypes;
        };
        return ContentAssist2;
      }()
    );
    exports2.ContentAssist = ContentAssist;
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js
var require_gast_recorder = __commonJS({
  "node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GastRecorder = void 0;
    var utils_1 = require_utils();
    var gast_public_1 = require_gast_public();
    var lexer_public_1 = require_lexer_public();
    var tokens_1 = require_tokens();
    var tokens_public_1 = require_tokens_public();
    var parser_1 = require_parser();
    var keys_1 = require_keys();
    var RECORDING_NULL_OBJECT = {
      description: "This Object indicates the Parser is during Recording Phase"
    };
    Object.freeze(RECORDING_NULL_OBJECT);
    var HANDLE_SEPARATOR = true;
    var MAX_METHOD_IDX = Math.pow(2, keys_1.BITS_FOR_OCCURRENCE_IDX) - 1;
    var RFT = tokens_public_1.createToken({ name: "RECORDING_PHASE_TOKEN", pattern: lexer_public_1.Lexer.NA });
    tokens_1.augmentTokenTypes([RFT]);
    var RECORDING_PHASE_TOKEN = tokens_public_1.createTokenInstance(
      RFT,
      "This IToken indicates the Parser is in Recording Phase\n	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details",
      // Using "-1" instead of NaN (as in EOF) because an actual number is less likely to
      // cause errors if the output of LA or CONSUME would be (incorrectly) used during the recording phase.
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    );
    Object.freeze(RECORDING_PHASE_TOKEN);
    var RECORDING_PHASE_CSTNODE = {
      name: "This CSTNode indicates the Parser is in Recording Phase\n	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details",
      children: {}
    };
    var GastRecorder = (
      /** @class */
      function() {
        function GastRecorder2() {
        }
        GastRecorder2.prototype.initGastRecorder = function(config) {
          this.recordingProdStack = [];
          this.RECORDING_PHASE = false;
        };
        GastRecorder2.prototype.enableRecording = function() {
          var _this = this;
          this.RECORDING_PHASE = true;
          this.TRACE_INIT("Enable Recording", function() {
            var _loop_1 = function(i2) {
              var idx = i2 > 0 ? i2 : "";
              _this["CONSUME" + idx] = function(arg1, arg2) {
                return this.consumeInternalRecord(arg1, i2, arg2);
              };
              _this["SUBRULE" + idx] = function(arg1, arg2) {
                return this.subruleInternalRecord(arg1, i2, arg2);
              };
              _this["OPTION" + idx] = function(arg1) {
                return this.optionInternalRecord(arg1, i2);
              };
              _this["OR" + idx] = function(arg1) {
                return this.orInternalRecord(arg1, i2);
              };
              _this["MANY" + idx] = function(arg1) {
                this.manyInternalRecord(i2, arg1);
              };
              _this["MANY_SEP" + idx] = function(arg1) {
                this.manySepFirstInternalRecord(i2, arg1);
              };
              _this["AT_LEAST_ONE" + idx] = function(arg1) {
                this.atLeastOneInternalRecord(i2, arg1);
              };
              _this["AT_LEAST_ONE_SEP" + idx] = function(arg1) {
                this.atLeastOneSepFirstInternalRecord(i2, arg1);
              };
            };
            for (var i = 0; i < 10; i++) {
              _loop_1(i);
            }
            _this["consume"] = function(idx, arg1, arg2) {
              return this.consumeInternalRecord(arg1, idx, arg2);
            };
            _this["subrule"] = function(idx, arg1, arg2) {
              return this.subruleInternalRecord(arg1, idx, arg2);
            };
            _this["option"] = function(idx, arg1) {
              return this.optionInternalRecord(arg1, idx);
            };
            _this["or"] = function(idx, arg1) {
              return this.orInternalRecord(arg1, idx);
            };
            _this["many"] = function(idx, arg1) {
              this.manyInternalRecord(idx, arg1);
            };
            _this["atLeastOne"] = function(idx, arg1) {
              this.atLeastOneInternalRecord(idx, arg1);
            };
            _this.ACTION = _this.ACTION_RECORD;
            _this.BACKTRACK = _this.BACKTRACK_RECORD;
            _this.LA = _this.LA_RECORD;
          });
        };
        GastRecorder2.prototype.disableRecording = function() {
          var _this = this;
          this.RECORDING_PHASE = false;
          this.TRACE_INIT("Deleting Recording methods", function() {
            for (var i = 0; i < 10; i++) {
              var idx = i > 0 ? i : "";
              delete _this["CONSUME" + idx];
              delete _this["SUBRULE" + idx];
              delete _this["OPTION" + idx];
              delete _this["OR" + idx];
              delete _this["MANY" + idx];
              delete _this["MANY_SEP" + idx];
              delete _this["AT_LEAST_ONE" + idx];
              delete _this["AT_LEAST_ONE_SEP" + idx];
            }
            delete _this["consume"];
            delete _this["subrule"];
            delete _this["option"];
            delete _this["or"];
            delete _this["many"];
            delete _this["atLeastOne"];
            delete _this.ACTION;
            delete _this.BACKTRACK;
            delete _this.LA;
          });
        };
        GastRecorder2.prototype.ACTION_RECORD = function(impl) {
          return;
        };
        GastRecorder2.prototype.BACKTRACK_RECORD = function(grammarRule, args) {
          return function() {
            return true;
          };
        };
        GastRecorder2.prototype.LA_RECORD = function(howMuch) {
          return parser_1.END_OF_FILE;
        };
        GastRecorder2.prototype.topLevelRuleRecord = function(name, def) {
          try {
            var newTopLevelRule = new gast_public_1.Rule({ definition: [], name });
            newTopLevelRule.name = name;
            this.recordingProdStack.push(newTopLevelRule);
            def.call(this);
            this.recordingProdStack.pop();
            return newTopLevelRule;
          } catch (originalError) {
            if (originalError.KNOWN_RECORDER_ERROR !== true) {
              try {
                originalError.message = originalError.message + '\n	 This error was thrown during the "grammar recording phase" For more info see:\n	https://chevrotain.io/docs/guide/internals.html#grammar-recording';
              } catch (mutabilityError) {
                throw originalError;
              }
            }
            throw originalError;
          }
        };
        GastRecorder2.prototype.optionInternalRecord = function(actionORMethodDef, occurrence) {
          return recordProd.call(this, gast_public_1.Option, actionORMethodDef, occurrence);
        };
        GastRecorder2.prototype.atLeastOneInternalRecord = function(occurrence, actionORMethodDef) {
          recordProd.call(this, gast_public_1.RepetitionMandatory, actionORMethodDef, occurrence);
        };
        GastRecorder2.prototype.atLeastOneSepFirstInternalRecord = function(occurrence, options) {
          recordProd.call(this, gast_public_1.RepetitionMandatoryWithSeparator, options, occurrence, HANDLE_SEPARATOR);
        };
        GastRecorder2.prototype.manyInternalRecord = function(occurrence, actionORMethodDef) {
          recordProd.call(this, gast_public_1.Repetition, actionORMethodDef, occurrence);
        };
        GastRecorder2.prototype.manySepFirstInternalRecord = function(occurrence, options) {
          recordProd.call(this, gast_public_1.RepetitionWithSeparator, options, occurrence, HANDLE_SEPARATOR);
        };
        GastRecorder2.prototype.orInternalRecord = function(altsOrOpts, occurrence) {
          return recordOrProd.call(this, altsOrOpts, occurrence);
        };
        GastRecorder2.prototype.subruleInternalRecord = function(ruleToCall, occurrence, options) {
          assertMethodIdxIsValid(occurrence);
          if (!ruleToCall || utils_1.has(ruleToCall, "ruleName") === false) {
            var error = new Error("<SUBRULE" + getIdxSuffix(occurrence) + "> argument is invalid" + (" expecting a Parser method reference but got: <" + JSON.stringify(ruleToCall) + ">") + ("\n inside top level rule: <" + this.recordingProdStack[0].name + ">"));
            error.KNOWN_RECORDER_ERROR = true;
            throw error;
          }
          var prevProd = utils_1.peek(this.recordingProdStack);
          var ruleName = ruleToCall["ruleName"];
          var newNoneTerminal = new gast_public_1.NonTerminal({
            idx: occurrence,
            nonTerminalName: ruleName,
            // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
            referencedRule: void 0
          });
          prevProd.definition.push(newNoneTerminal);
          return this.outputCst ? RECORDING_PHASE_CSTNODE : RECORDING_NULL_OBJECT;
        };
        GastRecorder2.prototype.consumeInternalRecord = function(tokType, occurrence, options) {
          assertMethodIdxIsValid(occurrence);
          if (!tokens_1.hasShortKeyProperty(tokType)) {
            var error = new Error("<CONSUME" + getIdxSuffix(occurrence) + "> argument is invalid" + (" expecting a TokenType reference but got: <" + JSON.stringify(tokType) + ">") + ("\n inside top level rule: <" + this.recordingProdStack[0].name + ">"));
            error.KNOWN_RECORDER_ERROR = true;
            throw error;
          }
          var prevProd = utils_1.peek(this.recordingProdStack);
          var newNoneTerminal = new gast_public_1.Terminal({
            idx: occurrence,
            terminalType: tokType
          });
          prevProd.definition.push(newNoneTerminal);
          return RECORDING_PHASE_TOKEN;
        };
        return GastRecorder2;
      }()
    );
    exports2.GastRecorder = GastRecorder;
    function recordProd(prodConstructor, mainProdArg, occurrence, handleSep) {
      if (handleSep === void 0) {
        handleSep = false;
      }
      assertMethodIdxIsValid(occurrence);
      var prevProd = utils_1.peek(this.recordingProdStack);
      var grammarAction = utils_1.isFunction(mainProdArg) ? mainProdArg : mainProdArg.DEF;
      var newProd = new prodConstructor({ definition: [], idx: occurrence });
      if (handleSep) {
        newProd.separator = mainProdArg.SEP;
      }
      if (utils_1.has(mainProdArg, "MAX_LOOKAHEAD")) {
        newProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
      }
      this.recordingProdStack.push(newProd);
      grammarAction.call(this);
      prevProd.definition.push(newProd);
      this.recordingProdStack.pop();
      return RECORDING_NULL_OBJECT;
    }
    function recordOrProd(mainProdArg, occurrence) {
      var _this = this;
      assertMethodIdxIsValid(occurrence);
      var prevProd = utils_1.peek(this.recordingProdStack);
      var hasOptions = utils_1.isArray(mainProdArg) === false;
      var alts = hasOptions === false ? mainProdArg : mainProdArg.DEF;
      var newOrProd = new gast_public_1.Alternation({
        definition: [],
        idx: occurrence,
        ignoreAmbiguities: hasOptions && mainProdArg.IGNORE_AMBIGUITIES === true
      });
      if (utils_1.has(mainProdArg, "MAX_LOOKAHEAD")) {
        newOrProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
      }
      var hasPredicates = utils_1.some(alts, function(currAlt) {
        return utils_1.isFunction(currAlt.GATE);
      });
      newOrProd.hasPredicates = hasPredicates;
      prevProd.definition.push(newOrProd);
      utils_1.forEach(alts, function(currAlt) {
        var currAltFlat = new gast_public_1.Alternative({ definition: [] });
        newOrProd.definition.push(currAltFlat);
        if (utils_1.has(currAlt, "IGNORE_AMBIGUITIES")) {
          currAltFlat.ignoreAmbiguities = currAlt.IGNORE_AMBIGUITIES;
        } else if (utils_1.has(currAlt, "GATE")) {
          currAltFlat.ignoreAmbiguities = true;
        }
        _this.recordingProdStack.push(currAltFlat);
        currAlt.ALT.call(_this);
        _this.recordingProdStack.pop();
      });
      return RECORDING_NULL_OBJECT;
    }
    function getIdxSuffix(idx) {
      return idx === 0 ? "" : "" + idx;
    }
    function assertMethodIdxIsValid(idx) {
      if (idx < 0 || idx > MAX_METHOD_IDX) {
        var error = new Error(
          // The stack trace will contain all the needed details
          "Invalid DSL Method idx value: <" + idx + ">\n	" + ("Idx value must be a none negative value smaller than " + (MAX_METHOD_IDX + 1))
        );
        error.KNOWN_RECORDER_ERROR = true;
        throw error;
      }
    }
  }
});

// node_modules/chevrotain/lib/src/parse/parser/traits/perf_tracer.js
var require_perf_tracer = __commonJS({
  "node_modules/chevrotain/lib/src/parse/parser/traits/perf_tracer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PerformanceTracer = void 0;
    var utils_1 = require_utils();
    var parser_1 = require_parser();
    var PerformanceTracer = (
      /** @class */
      function() {
        function PerformanceTracer2() {
        }
        PerformanceTracer2.prototype.initPerformanceTracer = function(config) {
          if (utils_1.has(config, "traceInitPerf")) {
            var userTraceInitPerf = config.traceInitPerf;
            var traceIsNumber = typeof userTraceInitPerf === "number";
            this.traceInitMaxIdent = traceIsNumber ? userTraceInitPerf : Infinity;
            this.traceInitPerf = traceIsNumber ? userTraceInitPerf > 0 : userTraceInitPerf;
          } else {
            this.traceInitMaxIdent = 0;
            this.traceInitPerf = parser_1.DEFAULT_PARSER_CONFIG.traceInitPerf;
          }
          this.traceInitIndent = -1;
        };
        PerformanceTracer2.prototype.TRACE_INIT = function(phaseDesc, phaseImpl) {
          if (this.traceInitPerf === true) {
            this.traceInitIndent++;
            var indent = new Array(this.traceInitIndent + 1).join("	");
            if (this.traceInitIndent < this.traceInitMaxIdent) {
              console.log(indent + "--> <" + phaseDesc + ">");
            }
            var _a = utils_1.timer(phaseImpl), time = _a.time, value = _a.value;
            var traceMethod = time > 10 ? console.warn : console.log;
            if (this.traceInitIndent < this.traceInitMaxIdent) {
              traceMethod(indent + "<-- <" + phaseDesc + "> time: " + time + "ms");
            }
            this.traceInitIndent--;
            return value;
          } else {
            return phaseImpl();
          }
        };
        return PerformanceTracer2;
      }()
    );
    exports2.PerformanceTracer = PerformanceTracer;
  }
});

// node_modules/chevrotain/lib/src/parse/parser/parser.js
var require_parser = __commonJS({
  "node_modules/chevrotain/lib/src/parse/parser/parser.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EmbeddedActionsParser = exports2.CstParser = exports2.Parser = exports2.EMPTY_ALT = exports2.ParserDefinitionErrorType = exports2.DEFAULT_RULE_CONFIG = exports2.DEFAULT_PARSER_CONFIG = exports2.END_OF_FILE = void 0;
    var utils_1 = require_utils();
    var follow_1 = require_follow();
    var tokens_public_1 = require_tokens_public();
    var errors_public_1 = require_errors_public();
    var gast_resolver_public_1 = require_gast_resolver_public();
    var recoverable_1 = require_recoverable();
    var looksahead_1 = require_looksahead();
    var tree_builder_1 = require_tree_builder();
    var lexer_adapter_1 = require_lexer_adapter();
    var recognizer_api_1 = require_recognizer_api();
    var recognizer_engine_1 = require_recognizer_engine();
    var error_handler_1 = require_error_handler();
    var context_assist_1 = require_context_assist();
    var gast_recorder_1 = require_gast_recorder();
    var perf_tracer_1 = require_perf_tracer();
    exports2.END_OF_FILE = tokens_public_1.createTokenInstance(tokens_public_1.EOF, "", NaN, NaN, NaN, NaN, NaN, NaN);
    Object.freeze(exports2.END_OF_FILE);
    exports2.DEFAULT_PARSER_CONFIG = Object.freeze({
      recoveryEnabled: false,
      maxLookahead: 3,
      dynamicTokensEnabled: false,
      outputCst: true,
      errorMessageProvider: errors_public_1.defaultParserErrorProvider,
      nodeLocationTracking: "none",
      traceInitPerf: false,
      skipValidations: false
    });
    exports2.DEFAULT_RULE_CONFIG = Object.freeze({
      recoveryValueFunc: function() {
        return void 0;
      },
      resyncEnabled: true
    });
    var ParserDefinitionErrorType;
    (function(ParserDefinitionErrorType2) {
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_RULE_NAME"] = 0] = "INVALID_RULE_NAME";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["DUPLICATE_RULE_NAME"] = 1] = "DUPLICATE_RULE_NAME";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_RULE_OVERRIDE"] = 2] = "INVALID_RULE_OVERRIDE";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["DUPLICATE_PRODUCTIONS"] = 3] = "DUPLICATE_PRODUCTIONS";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["UNRESOLVED_SUBRULE_REF"] = 4] = "UNRESOLVED_SUBRULE_REF";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["LEFT_RECURSION"] = 5] = "LEFT_RECURSION";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["NONE_LAST_EMPTY_ALT"] = 6] = "NONE_LAST_EMPTY_ALT";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["AMBIGUOUS_ALTS"] = 7] = "AMBIGUOUS_ALTS";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["CONFLICT_TOKENS_RULES_NAMESPACE"] = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_TOKEN_NAME"] = 9] = "INVALID_TOKEN_NAME";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["NO_NON_EMPTY_LOOKAHEAD"] = 10] = "NO_NON_EMPTY_LOOKAHEAD";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["AMBIGUOUS_PREFIX_ALTS"] = 11] = "AMBIGUOUS_PREFIX_ALTS";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["TOO_MANY_ALTS"] = 12] = "TOO_MANY_ALTS";
    })(ParserDefinitionErrorType = exports2.ParserDefinitionErrorType || (exports2.ParserDefinitionErrorType = {}));
    function EMPTY_ALT(value) {
      if (value === void 0) {
        value = void 0;
      }
      return function() {
        return value;
      };
    }
    exports2.EMPTY_ALT = EMPTY_ALT;
    var Parser = (
      /** @class */
      function() {
        function Parser2(tokenVocabulary, config) {
          this.definitionErrors = [];
          this.selfAnalysisDone = false;
          var that = this;
          that.initErrorHandler(config);
          that.initLexerAdapter();
          that.initLooksAhead(config);
          that.initRecognizerEngine(tokenVocabulary, config);
          that.initRecoverable(config);
          that.initTreeBuilder(config);
          that.initContentAssist();
          that.initGastRecorder(config);
          that.initPerformanceTracer(config);
          if (utils_1.has(config, "ignoredIssues")) {
            throw new Error("The <ignoredIssues> IParserConfig property has been deprecated.\n	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n	For further details.");
          }
          this.skipValidations = utils_1.has(config, "skipValidations") ? config.skipValidations : exports2.DEFAULT_PARSER_CONFIG.skipValidations;
        }
        Parser2.performSelfAnalysis = function(parserInstance) {
          throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
        };
        Parser2.prototype.performSelfAnalysis = function() {
          var _this = this;
          this.TRACE_INIT("performSelfAnalysis", function() {
            var defErrorsMsgs;
            _this.selfAnalysisDone = true;
            var className = _this.className;
            _this.TRACE_INIT("toFastProps", function() {
              utils_1.toFastProperties(_this);
            });
            _this.TRACE_INIT("Grammar Recording", function() {
              try {
                _this.enableRecording();
                utils_1.forEach(_this.definedRulesNames, function(currRuleName) {
                  var wrappedRule = _this[currRuleName];
                  var originalGrammarAction = wrappedRule["originalGrammarAction"];
                  var recordedRuleGast = void 0;
                  _this.TRACE_INIT(currRuleName + " Rule", function() {
                    recordedRuleGast = _this.topLevelRuleRecord(currRuleName, originalGrammarAction);
                  });
                  _this.gastProductionsCache[currRuleName] = recordedRuleGast;
                });
              } finally {
                _this.disableRecording();
              }
            });
            var resolverErrors = [];
            _this.TRACE_INIT("Grammar Resolving", function() {
              resolverErrors = gast_resolver_public_1.resolveGrammar({
                rules: utils_1.values(_this.gastProductionsCache)
              });
              _this.definitionErrors.push.apply(_this.definitionErrors, resolverErrors);
            });
            _this.TRACE_INIT("Grammar Validations", function() {
              if (utils_1.isEmpty(resolverErrors) && _this.skipValidations === false) {
                var validationErrors = gast_resolver_public_1.validateGrammar({
                  rules: utils_1.values(_this.gastProductionsCache),
                  maxLookahead: _this.maxLookahead,
                  tokenTypes: utils_1.values(_this.tokensMap),
                  errMsgProvider: errors_public_1.defaultGrammarValidatorErrorProvider,
                  grammarName: className
                });
                _this.definitionErrors.push.apply(_this.definitionErrors, validationErrors);
              }
            });
            if (utils_1.isEmpty(_this.definitionErrors)) {
              if (_this.recoveryEnabled) {
                _this.TRACE_INIT("computeAllProdsFollows", function() {
                  var allFollows = follow_1.computeAllProdsFollows(utils_1.values(_this.gastProductionsCache));
                  _this.resyncFollows = allFollows;
                });
              }
              _this.TRACE_INIT("ComputeLookaheadFunctions", function() {
                _this.preComputeLookaheadFunctions(utils_1.values(_this.gastProductionsCache));
              });
            }
            if (!Parser2.DEFER_DEFINITION_ERRORS_HANDLING && !utils_1.isEmpty(_this.definitionErrors)) {
              defErrorsMsgs = utils_1.map(_this.definitionErrors, function(defError) {
                return defError.message;
              });
              throw new Error("Parser Definition Errors detected:\n " + defErrorsMsgs.join("\n-------------------------------\n"));
            }
          });
        };
        Parser2.DEFER_DEFINITION_ERRORS_HANDLING = false;
        return Parser2;
      }()
    );
    exports2.Parser = Parser;
    utils_1.applyMixins(Parser, [
      recoverable_1.Recoverable,
      looksahead_1.LooksAhead,
      tree_builder_1.TreeBuilder,
      lexer_adapter_1.LexerAdapter,
      recognizer_engine_1.RecognizerEngine,
      recognizer_api_1.RecognizerApi,
      error_handler_1.ErrorHandler,
      context_assist_1.ContentAssist,
      gast_recorder_1.GastRecorder,
      perf_tracer_1.PerformanceTracer
    ]);
    var CstParser = (
      /** @class */
      function(_super) {
        __extends(CstParser2, _super);
        function CstParser2(tokenVocabulary, config) {
          if (config === void 0) {
            config = exports2.DEFAULT_PARSER_CONFIG;
          }
          var _this = this;
          var configClone = utils_1.cloneObj(config);
          configClone.outputCst = true;
          _this = _super.call(this, tokenVocabulary, configClone) || this;
          return _this;
        }
        return CstParser2;
      }(Parser)
    );
    exports2.CstParser = CstParser;
    var EmbeddedActionsParser = (
      /** @class */
      function(_super) {
        __extends(EmbeddedActionsParser2, _super);
        function EmbeddedActionsParser2(tokenVocabulary, config) {
          if (config === void 0) {
            config = exports2.DEFAULT_PARSER_CONFIG;
          }
          var _this = this;
          var configClone = utils_1.cloneObj(config);
          configClone.outputCst = false;
          _this = _super.call(this, tokenVocabulary, configClone) || this;
          return _this;
        }
        return EmbeddedActionsParser2;
      }(Parser)
    );
    exports2.EmbeddedActionsParser = EmbeddedActionsParser;
  }
});

// node_modules/chevrotain/lib/src/diagrams/render_public.js
var require_render_public = __commonJS({
  "node_modules/chevrotain/lib/src/diagrams/render_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createSyntaxDiagramsCode = void 0;
    var version_1 = require_version();
    function createSyntaxDiagramsCode(grammar, _a) {
      var _b = _a === void 0 ? {} : _a, _c = _b.resourceBase, resourceBase = _c === void 0 ? "https://unpkg.com/chevrotain@" + version_1.VERSION + "/diagrams/" : _c, _d = _b.css, css = _d === void 0 ? "https://unpkg.com/chevrotain@" + version_1.VERSION + "/diagrams/diagrams.css" : _d;
      var header = '\n<!-- This is a generated file -->\n<!DOCTYPE html>\n<meta charset="utf-8">\n<style>\n  body {\n    background-color: hsl(30, 20%, 95%)\n  }\n</style>\n\n';
      var cssHtml = "\n<link rel='stylesheet' href='" + css + "'>\n";
      var scripts = "\n<script src='" + resourceBase + "vendor/railroad-diagrams.js'></script>\n<script src='" + resourceBase + "src/diagrams_builder.js'></script>\n<script src='" + resourceBase + "src/diagrams_behavior.js'></script>\n<script src='" + resourceBase + "src/main.js'></script>\n";
      var diagramsDiv = '\n<div id="diagrams" align="center"></div>    \n';
      var serializedGrammar = "\n<script>\n    window.serializedGrammar = " + JSON.stringify(grammar, null, "  ") + ";\n</script>\n";
      var initLogic = '\n<script>\n    var diagramsDiv = document.getElementById("diagrams");\n    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);\n</script>\n';
      return header + cssHtml + scripts + diagramsDiv + serializedGrammar + initLogic;
    }
    exports2.createSyntaxDiagramsCode = createSyntaxDiagramsCode;
  }
});

// node_modules/chevrotain/lib/src/generate/generate.js
var require_generate = __commonJS({
  "node_modules/chevrotain/lib/src/generate/generate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.genSingleAlt = exports2.genAlternation = exports2.genNonTerminal = exports2.genTerminal = exports2.genRule = exports2.genAllRules = exports2.genClass = exports2.genWrapperFunction = exports2.genUmdModule = void 0;
    var utils_1 = require_utils();
    var gast_public_1 = require_gast_public();
    var NL = "\n";
    function genUmdModule(options) {
      return "\n(function (root, factory) {\n    if (typeof define === 'function' && define.amd) {\n        // AMD. Register as an anonymous module.\n        define(['chevrotain'], factory);\n    } else if (typeof module === 'object' && module.exports) {\n        // Node. Does not work with strict CommonJS, but\n        // only CommonJS-like environments that support module.exports,\n        // like Node.\n        module.exports = factory(require('chevrotain'));\n    } else {\n        // Browser globals (root is window)\n        root.returnExports = factory(root.b);\n    }\n}(typeof self !== 'undefined' ? self : this, function (chevrotain) {\n\n" + genClass(options) + "\n    \nreturn {\n    " + options.name + ": " + options.name + " \n}\n}));\n";
    }
    exports2.genUmdModule = genUmdModule;
    function genWrapperFunction(options) {
      return "    \n" + genClass(options) + "\nreturn new " + options.name + "(tokenVocabulary, config)    \n";
    }
    exports2.genWrapperFunction = genWrapperFunction;
    function genClass(options) {
      var result = "\nfunction " + options.name + "(tokenVocabulary, config) {\n    // invoke super constructor\n    // No support for embedded actions currently, so we can 'hardcode'\n    // The use of CstParser.\n    chevrotain.CstParser.call(this, tokenVocabulary, config)\n\n    const $ = this\n\n    " + genAllRules(options.rules) + "\n\n    // very important to call this after all the rules have been defined.\n    // otherwise the parser may not work correctly as it will lack information\n    // derived during the self analysis phase.\n    this.performSelfAnalysis(this)\n}\n\n// inheritance as implemented in javascript in the previous decade... :(\n" + options.name + ".prototype = Object.create(chevrotain.CstParser.prototype)\n" + options.name + ".prototype.constructor = " + options.name + "    \n    ";
      return result;
    }
    exports2.genClass = genClass;
    function genAllRules(rules) {
      var rulesText = utils_1.map(rules, function(currRule) {
        return genRule(currRule, 1);
      });
      return rulesText.join("\n");
    }
    exports2.genAllRules = genAllRules;
    function genRule(prod, n) {
      var result = indent(n, '$.RULE("' + prod.name + '", function() {') + NL;
      result += genDefinition(prod.definition, n + 1);
      result += indent(n + 1, "})") + NL;
      return result;
    }
    exports2.genRule = genRule;
    function genTerminal(prod, n) {
      var name = prod.terminalType.name;
      return indent(n, "$.CONSUME" + prod.idx + "(this.tokensMap." + name + ")" + NL);
    }
    exports2.genTerminal = genTerminal;
    function genNonTerminal(prod, n) {
      return indent(n, "$.SUBRULE" + prod.idx + "($." + prod.nonTerminalName + ")" + NL);
    }
    exports2.genNonTerminal = genNonTerminal;
    function genAlternation(prod, n) {
      var result = indent(n, "$.OR" + prod.idx + "([") + NL;
      var alts = utils_1.map(prod.definition, function(altDef) {
        return genSingleAlt(altDef, n + 1);
      });
      result += alts.join("," + NL);
      result += NL + indent(n, "])" + NL);
      return result;
    }
    exports2.genAlternation = genAlternation;
    function genSingleAlt(prod, n) {
      var result = indent(n, "{") + NL;
      result += indent(n + 1, "ALT: function() {") + NL;
      result += genDefinition(prod.definition, n + 1);
      result += indent(n + 1, "}") + NL;
      result += indent(n, "}");
      return result;
    }
    exports2.genSingleAlt = genSingleAlt;
    function genProd(prod, n) {
      if (prod instanceof gast_public_1.NonTerminal) {
        return genNonTerminal(prod, n);
      } else if (prod instanceof gast_public_1.Option) {
        return genDSLRule("OPTION", prod, n);
      } else if (prod instanceof gast_public_1.RepetitionMandatory) {
        return genDSLRule("AT_LEAST_ONE", prod, n);
      } else if (prod instanceof gast_public_1.RepetitionMandatoryWithSeparator) {
        return genDSLRule("AT_LEAST_ONE_SEP", prod, n);
      } else if (prod instanceof gast_public_1.RepetitionWithSeparator) {
        return genDSLRule("MANY_SEP", prod, n);
      } else if (prod instanceof gast_public_1.Repetition) {
        return genDSLRule("MANY", prod, n);
      } else if (prod instanceof gast_public_1.Alternation) {
        return genAlternation(prod, n);
      } else if (prod instanceof gast_public_1.Terminal) {
        return genTerminal(prod, n);
      } else if (prod instanceof gast_public_1.Alternative) {
        return genDefinition(prod.definition, n);
      } else {
        throw Error("non exhaustive match");
      }
    }
    function genDSLRule(dslName, prod, n) {
      var result = indent(n, "$." + (dslName + prod.idx) + "(");
      if (prod.separator) {
        result += "{" + NL;
        result += indent(n + 1, "SEP: this.tokensMap." + prod.separator.name) + "," + NL;
        result += "DEF: " + genDefFunction(prod.definition, n + 2) + NL;
        result += indent(n, "}") + NL;
      } else {
        result += genDefFunction(prod.definition, n + 1);
      }
      result += indent(n, ")") + NL;
      return result;
    }
    function genDefFunction(definition, n) {
      var def = "function() {" + NL;
      def += genDefinition(definition, n);
      def += indent(n, "}") + NL;
      return def;
    }
    function genDefinition(def, n) {
      var result = "";
      utils_1.forEach(def, function(prod) {
        result += genProd(prod, n + 1);
      });
      return result;
    }
    function indent(howMuch, text2) {
      var spaces = Array(howMuch * 4 + 1).join(" ");
      return spaces + text2;
    }
  }
});

// node_modules/chevrotain/lib/src/generate/generate_public.js
var require_generate_public = __commonJS({
  "node_modules/chevrotain/lib/src/generate/generate_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.generateParserModule = exports2.generateParserFactory = void 0;
    var generate_1 = require_generate();
    function generateParserFactory(options) {
      var wrapperText = generate_1.genWrapperFunction({
        name: options.name,
        rules: options.rules
      });
      var constructorWrapper = new Function("tokenVocabulary", "config", "chevrotain", wrapperText);
      return function(config) {
        return constructorWrapper(
          options.tokenVocabulary,
          config,
          // TODO: check how the require is transpiled/webpacked
          require_api()
        );
      };
    }
    exports2.generateParserFactory = generateParserFactory;
    function generateParserModule(options) {
      return generate_1.genUmdModule({ name: options.name, rules: options.rules });
    }
    exports2.generateParserModule = generateParserModule;
  }
});

// node_modules/chevrotain/lib/src/api.js
var require_api = __commonJS({
  "node_modules/chevrotain/lib/src/api.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Parser = exports2.generateParserModule = exports2.generateParserFactory = exports2.createSyntaxDiagramsCode = exports2.clearCache = exports2.validateGrammar = exports2.resolveGrammar = exports2.assignOccurrenceIndices = exports2.GAstVisitor = exports2.serializeProduction = exports2.serializeGrammar = exports2.Terminal = exports2.Rule = exports2.RepetitionWithSeparator = exports2.RepetitionMandatoryWithSeparator = exports2.RepetitionMandatory = exports2.Repetition = exports2.Option = exports2.NonTerminal = exports2.Alternative = exports2.Alternation = exports2.defaultLexerErrorProvider = exports2.NoViableAltException = exports2.NotAllInputParsedException = exports2.MismatchedTokenException = exports2.isRecognitionException = exports2.EarlyExitException = exports2.defaultParserErrorProvider = exports2.defaultGrammarValidatorErrorProvider = exports2.defaultGrammarResolverErrorProvider = exports2.tokenName = exports2.tokenMatcher = exports2.tokenLabel = exports2.EOF = exports2.createTokenInstance = exports2.createToken = exports2.LexerDefinitionErrorType = exports2.Lexer = exports2.EMPTY_ALT = exports2.ParserDefinitionErrorType = exports2.EmbeddedActionsParser = exports2.CstParser = exports2.VERSION = void 0;
    var version_1 = require_version();
    Object.defineProperty(exports2, "VERSION", { enumerable: true, get: function() {
      return version_1.VERSION;
    } });
    var parser_1 = require_parser();
    Object.defineProperty(exports2, "CstParser", { enumerable: true, get: function() {
      return parser_1.CstParser;
    } });
    Object.defineProperty(exports2, "EmbeddedActionsParser", { enumerable: true, get: function() {
      return parser_1.EmbeddedActionsParser;
    } });
    Object.defineProperty(exports2, "ParserDefinitionErrorType", { enumerable: true, get: function() {
      return parser_1.ParserDefinitionErrorType;
    } });
    Object.defineProperty(exports2, "EMPTY_ALT", { enumerable: true, get: function() {
      return parser_1.EMPTY_ALT;
    } });
    var lexer_public_1 = require_lexer_public();
    Object.defineProperty(exports2, "Lexer", { enumerable: true, get: function() {
      return lexer_public_1.Lexer;
    } });
    Object.defineProperty(exports2, "LexerDefinitionErrorType", { enumerable: true, get: function() {
      return lexer_public_1.LexerDefinitionErrorType;
    } });
    var tokens_public_1 = require_tokens_public();
    Object.defineProperty(exports2, "createToken", { enumerable: true, get: function() {
      return tokens_public_1.createToken;
    } });
    Object.defineProperty(exports2, "createTokenInstance", { enumerable: true, get: function() {
      return tokens_public_1.createTokenInstance;
    } });
    Object.defineProperty(exports2, "EOF", { enumerable: true, get: function() {
      return tokens_public_1.EOF;
    } });
    Object.defineProperty(exports2, "tokenLabel", { enumerable: true, get: function() {
      return tokens_public_1.tokenLabel;
    } });
    Object.defineProperty(exports2, "tokenMatcher", { enumerable: true, get: function() {
      return tokens_public_1.tokenMatcher;
    } });
    Object.defineProperty(exports2, "tokenName", { enumerable: true, get: function() {
      return tokens_public_1.tokenName;
    } });
    var errors_public_1 = require_errors_public();
    Object.defineProperty(exports2, "defaultGrammarResolverErrorProvider", { enumerable: true, get: function() {
      return errors_public_1.defaultGrammarResolverErrorProvider;
    } });
    Object.defineProperty(exports2, "defaultGrammarValidatorErrorProvider", { enumerable: true, get: function() {
      return errors_public_1.defaultGrammarValidatorErrorProvider;
    } });
    Object.defineProperty(exports2, "defaultParserErrorProvider", { enumerable: true, get: function() {
      return errors_public_1.defaultParserErrorProvider;
    } });
    var exceptions_public_1 = require_exceptions_public();
    Object.defineProperty(exports2, "EarlyExitException", { enumerable: true, get: function() {
      return exceptions_public_1.EarlyExitException;
    } });
    Object.defineProperty(exports2, "isRecognitionException", { enumerable: true, get: function() {
      return exceptions_public_1.isRecognitionException;
    } });
    Object.defineProperty(exports2, "MismatchedTokenException", { enumerable: true, get: function() {
      return exceptions_public_1.MismatchedTokenException;
    } });
    Object.defineProperty(exports2, "NotAllInputParsedException", { enumerable: true, get: function() {
      return exceptions_public_1.NotAllInputParsedException;
    } });
    Object.defineProperty(exports2, "NoViableAltException", { enumerable: true, get: function() {
      return exceptions_public_1.NoViableAltException;
    } });
    var lexer_errors_public_1 = require_lexer_errors_public();
    Object.defineProperty(exports2, "defaultLexerErrorProvider", { enumerable: true, get: function() {
      return lexer_errors_public_1.defaultLexerErrorProvider;
    } });
    var gast_public_1 = require_gast_public();
    Object.defineProperty(exports2, "Alternation", { enumerable: true, get: function() {
      return gast_public_1.Alternation;
    } });
    Object.defineProperty(exports2, "Alternative", { enumerable: true, get: function() {
      return gast_public_1.Alternative;
    } });
    Object.defineProperty(exports2, "NonTerminal", { enumerable: true, get: function() {
      return gast_public_1.NonTerminal;
    } });
    Object.defineProperty(exports2, "Option", { enumerable: true, get: function() {
      return gast_public_1.Option;
    } });
    Object.defineProperty(exports2, "Repetition", { enumerable: true, get: function() {
      return gast_public_1.Repetition;
    } });
    Object.defineProperty(exports2, "RepetitionMandatory", { enumerable: true, get: function() {
      return gast_public_1.RepetitionMandatory;
    } });
    Object.defineProperty(exports2, "RepetitionMandatoryWithSeparator", { enumerable: true, get: function() {
      return gast_public_1.RepetitionMandatoryWithSeparator;
    } });
    Object.defineProperty(exports2, "RepetitionWithSeparator", { enumerable: true, get: function() {
      return gast_public_1.RepetitionWithSeparator;
    } });
    Object.defineProperty(exports2, "Rule", { enumerable: true, get: function() {
      return gast_public_1.Rule;
    } });
    Object.defineProperty(exports2, "Terminal", { enumerable: true, get: function() {
      return gast_public_1.Terminal;
    } });
    var gast_public_2 = require_gast_public();
    Object.defineProperty(exports2, "serializeGrammar", { enumerable: true, get: function() {
      return gast_public_2.serializeGrammar;
    } });
    Object.defineProperty(exports2, "serializeProduction", { enumerable: true, get: function() {
      return gast_public_2.serializeProduction;
    } });
    var gast_visitor_public_1 = require_gast_visitor_public();
    Object.defineProperty(exports2, "GAstVisitor", { enumerable: true, get: function() {
      return gast_visitor_public_1.GAstVisitor;
    } });
    var gast_resolver_public_1 = require_gast_resolver_public();
    Object.defineProperty(exports2, "assignOccurrenceIndices", { enumerable: true, get: function() {
      return gast_resolver_public_1.assignOccurrenceIndices;
    } });
    Object.defineProperty(exports2, "resolveGrammar", { enumerable: true, get: function() {
      return gast_resolver_public_1.resolveGrammar;
    } });
    Object.defineProperty(exports2, "validateGrammar", { enumerable: true, get: function() {
      return gast_resolver_public_1.validateGrammar;
    } });
    function clearCache() {
      console.warn("The clearCache function was 'soft' removed from the Chevrotain API.\n	 It performs no action other than printing this message.\n	 Please avoid using it as it will be completely removed in the future");
    }
    exports2.clearCache = clearCache;
    var render_public_1 = require_render_public();
    Object.defineProperty(exports2, "createSyntaxDiagramsCode", { enumerable: true, get: function() {
      return render_public_1.createSyntaxDiagramsCode;
    } });
    var generate_public_1 = require_generate_public();
    Object.defineProperty(exports2, "generateParserFactory", { enumerable: true, get: function() {
      return generate_public_1.generateParserFactory;
    } });
    Object.defineProperty(exports2, "generateParserModule", { enumerable: true, get: function() {
      return generate_public_1.generateParserModule;
    } });
    var Parser = (
      /** @class */
      /* @__PURE__ */ function() {
        function Parser2() {
          throw new Error("The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	\nSee: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0");
        }
        return Parser2;
      }()
    );
    exports2.Parser = Parser;
  }
});

// node_modules/fast-formula-parser/grammar/lexing.js
var require_lexing = __commonJS({
  "node_modules/fast-formula-parser/grammar/lexing.js"(exports2, module2) {
    var { createToken, Lexer } = require_api();
    var FormulaError = require_error();
    var tokenVocabulary = {};
    var WhiteSpace = createToken({
      name: "WhiteSpace",
      pattern: /\s+/,
      group: Lexer.SKIPPED
    });
    var String2 = createToken({
      name: "String",
      pattern: /"(""|[^"])*"/
    });
    var SingleQuotedString = createToken({
      name: "SingleQuotedString",
      pattern: /'(''|[^'])*'/
    });
    var SheetQuoted = createToken({
      name: "SheetQuoted",
      pattern: /'((?![\\\/\[\]*?:]).)+?'!/
    });
    var Function2 = createToken({
      name: "Function",
      pattern: /[A-Za-z_]+[A-Za-z_0-9.]*\(/
    });
    var FormulaErrorT = createToken({
      name: "FormulaErrorT",
      pattern: /#NULL!|#DIV\/0!|#VALUE!|#NAME\?|#NUM!|#N\/A/
    });
    var RefError = createToken({
      name: "RefError",
      pattern: /#REF!/
    });
    var Name = createToken({
      name: "Name",
      pattern: /[a-zA-Z_][a-zA-Z0-9_.?]*/
      // longer_alt: RangeColumn // e.g. A:AA
    });
    var Sheet = createToken({
      name: "Sheet",
      pattern: /[A-Za-z_.\d\u007F-\uFFFF]+!/
    });
    var Cell = createToken({
      name: "Cell",
      pattern: /[$]?[A-Za-z]{1,3}[$]?[1-9][0-9]*/,
      longer_alt: Name
    });
    var Number2 = createToken({
      name: "Number",
      pattern: /[0-9]+[.]?[0-9]*([eE][+\-][0-9]+)?/
    });
    var Boolean2 = createToken({
      name: "Boolean",
      pattern: /TRUE|FALSE/i
    });
    var Column = createToken({
      name: "Column",
      pattern: /[$]?[A-Za-z]{1,3}/,
      longer_alt: Name
    });
    var At = createToken({
      name: "At",
      pattern: /@/
    });
    var Comma = createToken({
      name: "Comma",
      pattern: /,/
    });
    var Colon = createToken({
      name: "Colon",
      pattern: /:/
    });
    var Semicolon = createToken({
      name: "Semicolon",
      pattern: /;/
    });
    var OpenParen = createToken({
      name: "OpenParen",
      pattern: /\(/
    });
    var CloseParen = createToken({
      name: "CloseParen",
      pattern: /\)/
    });
    var OpenSquareParen = createToken({
      name: "OpenSquareParen",
      pattern: /\[/
    });
    var CloseSquareParen = createToken({
      name: "CloseSquareParen",
      pattern: /]/
    });
    var ExclamationMark = createToken({
      name: "exclamationMark",
      pattern: /!/
    });
    var OpenCurlyParen = createToken({
      name: "OpenCurlyParen",
      pattern: /{/
    });
    var CloseCurlyParen = createToken({
      name: "CloseCurlyParen",
      pattern: /}/
    });
    var QuoteS = createToken({
      name: "QuoteS",
      pattern: /'/
    });
    var MulOp = createToken({
      name: "MulOp",
      pattern: /\*/
    });
    var PlusOp = createToken({
      name: "PlusOp",
      pattern: /\+/
    });
    var DivOp = createToken({
      name: "DivOp",
      pattern: /\//
    });
    var MinOp = createToken({
      name: "MinOp",
      pattern: /-/
    });
    var ConcatOp = createToken({
      name: "ConcatOp",
      pattern: /&/
    });
    var ExOp = createToken({
      name: "ExOp",
      pattern: /\^/
    });
    var PercentOp = createToken({
      name: "PercentOp",
      pattern: /%/
    });
    var GtOp = createToken({
      name: "GtOp",
      pattern: />/
    });
    var EqOp = createToken({
      name: "EqOp",
      pattern: /=/
    });
    var LtOp = createToken({
      name: "LtOp",
      pattern: /</
    });
    var NeqOp = createToken({
      name: "NeqOp",
      pattern: /<>/
    });
    var GteOp = createToken({
      name: "GteOp",
      pattern: />=/
    });
    var LteOp = createToken({
      name: "LteOp",
      pattern: /<=/
    });
    var allTokens = [
      WhiteSpace,
      String2,
      SheetQuoted,
      SingleQuotedString,
      Function2,
      FormulaErrorT,
      RefError,
      Sheet,
      Cell,
      Boolean2,
      Column,
      Name,
      Number2,
      At,
      Comma,
      Colon,
      Semicolon,
      OpenParen,
      CloseParen,
      OpenSquareParen,
      CloseSquareParen,
      // ExclamationMark,
      OpenCurlyParen,
      CloseCurlyParen,
      QuoteS,
      MulOp,
      PlusOp,
      DivOp,
      MinOp,
      ConcatOp,
      ExOp,
      MulOp,
      PercentOp,
      NeqOp,
      GteOp,
      LteOp,
      GtOp,
      EqOp,
      LtOp
    ];
    var SelectLexer = new Lexer(allTokens, { ensureOptimizations: true });
    allTokens.forEach((tokenType) => {
      tokenVocabulary[tokenType.name] = tokenType;
    });
    module2.exports = {
      tokenVocabulary,
      lex: function(inputText) {
        const lexingResult = SelectLexer.tokenize(inputText);
        if (lexingResult.errors.length > 0) {
          const error = lexingResult.errors[0];
          const line = error.line, column = error.column;
          let msg = "\n" + inputText.split("\n")[line - 1] + "\n";
          msg += Array(column - 1).fill(" ").join("") + "^\n";
          error.message = msg + `Error at position ${line}:${column}
` + error.message;
          error.errorLocation = { line, column };
          throw FormulaError.ERROR(error.message, error);
        }
        return lexingResult;
      }
    };
  }
});

// node_modules/fast-formula-parser/grammar/parsing.js
var require_parsing = __commonJS({
  "node_modules/fast-formula-parser/grammar/parsing.js"(exports2, module2) {
    var lexer = require_lexing();
    var { EmbeddedActionsParser } = require_api();
    var tokenVocabulary = lexer.tokenVocabulary;
    var {
      String: String2,
      SheetQuoted,
      ExcelRefFunction,
      ExcelConditionalRefFunction,
      Function: Function2,
      FormulaErrorT,
      RefError,
      Cell,
      Sheet,
      Name,
      Number: Number2,
      Boolean: Boolean2,
      Column,
      // At,
      Comma,
      Colon,
      Semicolon,
      OpenParen,
      CloseParen,
      // OpenSquareParen,
      // CloseSquareParen,
      // ExclamationMark,
      OpenCurlyParen,
      CloseCurlyParen,
      MulOp,
      PlusOp,
      DivOp,
      MinOp,
      ConcatOp,
      ExOp,
      PercentOp,
      NeqOp,
      GteOp,
      LteOp,
      GtOp,
      EqOp,
      LtOp
    } = lexer.tokenVocabulary;
    var Parsing = class extends EmbeddedActionsParser {
      /**
       *
       * @param {FormulaParser|DepParser} context
       * @param {Utils} utils
       */
      constructor(context, utils) {
        super(tokenVocabulary, {
          outputCst: false,
          maxLookahead: 1,
          skipValidations: true
          // traceInitPerf: true,
        });
        this.utils = utils;
        this.binaryOperatorsPrecedence = [
          ["^"],
          ["*", "/"],
          ["+", "-"],
          ["&"],
          ["<", ">", "=", "<>", "<=", ">="]
        ];
        const $ = this;
        $.RULE("formulaWithBinaryOp", () => {
          const infixes = [];
          const values2 = [$.SUBRULE($.formulaWithPercentOp)];
          $.MANY(() => {
            infixes.push($.OR($.c1 || ($.c1 = [
              { ALT: () => $.CONSUME(GtOp).image },
              { ALT: () => $.CONSUME(EqOp).image },
              { ALT: () => $.CONSUME(LtOp).image },
              { ALT: () => $.CONSUME(NeqOp).image },
              { ALT: () => $.CONSUME(GteOp).image },
              { ALT: () => $.CONSUME(LteOp).image },
              { ALT: () => $.CONSUME(ConcatOp).image },
              { ALT: () => $.CONSUME(PlusOp).image },
              { ALT: () => $.CONSUME(MinOp).image },
              { ALT: () => $.CONSUME(MulOp).image },
              { ALT: () => $.CONSUME(DivOp).image },
              { ALT: () => $.CONSUME(ExOp).image }
            ])));
            values2.push($.SUBRULE2($.formulaWithPercentOp));
          });
          $.ACTION(() => {
            for (const ops of this.binaryOperatorsPrecedence) {
              for (let index = 0, length = infixes.length; index < length; index++) {
                const infix = infixes[index];
                if (!ops.includes(infix)) continue;
                infixes.splice(index, 1);
                values2.splice(index, 2, this.utils.applyInfix(values2[index], infix, values2[index + 1]));
                index--;
                length--;
              }
            }
          });
          return values2[0];
        });
        $.RULE("plusMinusOp", () => $.OR([
          { ALT: () => $.CONSUME(PlusOp).image },
          { ALT: () => $.CONSUME(MinOp).image }
        ]));
        $.RULE("formulaWithPercentOp", () => {
          let value = $.SUBRULE($.formulaWithUnaryOp);
          $.OPTION(() => {
            const postfix = $.CONSUME(PercentOp).image;
            value = $.ACTION(() => this.utils.applyPostfix(value, postfix));
          });
          return value;
        });
        $.RULE("formulaWithUnaryOp", () => {
          const prefixes = [];
          $.MANY(() => {
            const op = $.OR([
              { ALT: () => $.CONSUME(PlusOp).image },
              { ALT: () => $.CONSUME(MinOp).image }
            ]);
            prefixes.push(op);
          });
          const formula = $.SUBRULE($.formulaWithIntersect);
          if (prefixes.length > 0) return $.ACTION(() => this.utils.applyPrefix(prefixes, formula));
          return formula;
        });
        $.RULE("formulaWithIntersect", () => {
          let ref1 = $.SUBRULE($.formulaWithRange);
          const refs = [ref1];
          $.MANY({
            GATE: () => {
              const prevToken = $.LA(0);
              const nextToken = $.LA(1);
              return nextToken.startOffset > prevToken.endOffset + 1;
            },
            DEF: () => {
              refs.push($.SUBRULE3($.formulaWithRange));
            }
          });
          if (refs.length > 1) {
            return $.ACTION(() => $.ACTION(() => this.utils.applyIntersect(refs)));
          }
          return ref1;
        });
        $.RULE("formulaWithRange", () => {
          const ref1 = $.SUBRULE($.formula);
          const refs = [ref1];
          $.MANY(() => {
            $.CONSUME(Colon);
            refs.push($.SUBRULE2($.formula));
          });
          if (refs.length > 1)
            return $.ACTION(() => $.ACTION(() => this.utils.applyRange(refs)));
          return ref1;
        });
        $.RULE("formula", () => $.OR9([
          { ALT: () => $.SUBRULE($.referenceWithoutInfix) },
          { ALT: () => $.SUBRULE($.paren) },
          { ALT: () => $.SUBRULE($.constant) },
          { ALT: () => $.SUBRULE($.functionCall) },
          { ALT: () => $.SUBRULE($.constantArray) }
        ]));
        $.RULE("paren", () => {
          $.CONSUME(OpenParen);
          let result;
          const refs = [];
          refs.push($.SUBRULE($.formulaWithBinaryOp));
          $.MANY(() => {
            $.CONSUME(Comma);
            refs.push($.SUBRULE2($.formulaWithBinaryOp));
          });
          if (refs.length > 1)
            result = $.ACTION(() => this.utils.applyUnion(refs));
          else
            result = refs[0];
          $.CONSUME(CloseParen);
          return result;
        });
        $.RULE("constantArray", () => {
          const arr = [[]];
          let currentRow = 0;
          $.CONSUME(OpenCurlyParen);
          arr[currentRow].push($.SUBRULE($.constantForArray));
          $.MANY(() => {
            const sep = $.OR([
              { ALT: () => $.CONSUME(Comma).image },
              { ALT: () => $.CONSUME(Semicolon).image }
            ]);
            const constant = $.SUBRULE2($.constantForArray);
            if (sep === ",") {
              arr[currentRow].push(constant);
            } else {
              currentRow++;
              arr[currentRow] = [];
              arr[currentRow].push(constant);
            }
          });
          $.CONSUME(CloseCurlyParen);
          return $.ACTION(() => this.utils.toArray(arr));
        });
        $.RULE("constantForArray", () => $.OR([
          {
            ALT: () => {
              const prefix = $.OPTION(() => $.SUBRULE($.plusMinusOp));
              const image = $.CONSUME(Number2).image;
              const number = $.ACTION(() => this.utils.toNumber(image));
              if (prefix)
                return $.ACTION(() => this.utils.applyPrefix([prefix], number));
              return number;
            }
          },
          {
            ALT: () => {
              const str = $.CONSUME(String2).image;
              return $.ACTION(() => this.utils.toString(str));
            }
          },
          {
            ALT: () => {
              const bool = $.CONSUME(Boolean2).image;
              return $.ACTION(() => this.utils.toBoolean(bool));
            }
          },
          {
            ALT: () => {
              const err = $.CONSUME(FormulaErrorT).image;
              return $.ACTION(() => this.utils.toError(err));
            }
          },
          {
            ALT: () => {
              const err = $.CONSUME(RefError).image;
              return $.ACTION(() => this.utils.toError(err));
            }
          }
        ]));
        $.RULE("constant", () => $.OR([
          {
            ALT: () => {
              const number = $.CONSUME(Number2).image;
              return $.ACTION(() => this.utils.toNumber(number));
            }
          },
          {
            ALT: () => {
              const str = $.CONSUME(String2).image;
              return $.ACTION(() => this.utils.toString(str));
            }
          },
          {
            ALT: () => {
              const bool = $.CONSUME(Boolean2).image;
              return $.ACTION(() => this.utils.toBoolean(bool));
            }
          },
          {
            ALT: () => {
              const err = $.CONSUME(FormulaErrorT).image;
              return $.ACTION(() => this.utils.toError(err));
            }
          }
        ]));
        $.RULE("functionCall", () => {
          const functionName = $.CONSUME(Function2).image.slice(0, -1);
          const args = $.SUBRULE($.arguments);
          $.CONSUME(CloseParen);
          return $.ACTION(() => context.callFunction(functionName, args));
        });
        $.RULE("arguments", () => {
          $.MANY2(() => {
            $.CONSUME2(Comma);
          });
          const args = [];
          $.OPTION(() => {
            args.push($.SUBRULE($.formulaWithBinaryOp));
            $.MANY(() => {
              $.CONSUME1(Comma);
              args.push(null);
              $.OPTION3(() => {
                args.pop();
                args.push($.SUBRULE2($.formulaWithBinaryOp));
              });
            });
          });
          return args;
        });
        $.RULE("referenceWithoutInfix", () => $.OR([
          { ALT: () => $.SUBRULE($.referenceItem) },
          {
            // sheet name prefix
            ALT: () => {
              const sheetName = $.SUBRULE($.prefixName);
              const referenceItem = $.SUBRULE2($.formulaWithRange);
              $.ACTION(() => {
                if (this.utils.isFormulaError(referenceItem))
                  return referenceItem;
                referenceItem.ref.sheet = sheetName;
              });
              return referenceItem;
            }
          }
          // {ALT: () => $.SUBRULE('dynamicDataExchange')},
        ]));
        $.RULE("referenceItem", () => $.OR([
          {
            ALT: () => {
              const address = $.CONSUME(Cell).image;
              return $.ACTION(() => this.utils.parseCellAddress(address));
            }
          },
          {
            ALT: () => {
              const name = $.CONSUME(Name).image;
              return $.ACTION(() => context.getVariable(name));
            }
          },
          {
            ALT: () => {
              const column = $.CONSUME(Column).image;
              return $.ACTION(() => this.utils.parseCol(column));
            }
          },
          // A row check should be here, but the token is same with Number,
          // In other to resolve ambiguities, I leave this empty, and
          // parse the number to row number when needed.
          {
            ALT: () => {
              const err = $.CONSUME(RefError).image;
              return $.ACTION(() => this.utils.toError(err));
            }
          }
          // {ALT: () => $.SUBRULE($.udfFunctionCall)},
          // {ALT: () => $.SUBRULE($.structuredReference)},
        ]));
        $.RULE("prefixName", () => $.OR([
          { ALT: () => $.CONSUME(Sheet).image.slice(0, -1) },
          { ALT: () => $.CONSUME(SheetQuoted).image.slice(1, -2).replace(/''/g, "'") }
        ]));
        this.performSelfAnalysis();
      }
    };
    module2.exports = {
      Parser: Parsing
    };
  }
});

// node_modules/fast-formula-parser/grammar/utils.js
var require_utils2 = __commonJS({
  "node_modules/fast-formula-parser/grammar/utils.js"(exports2, module2) {
    var FormulaError = require_error();
    var { Address } = require_helpers();
    var { Prefix, Postfix, Infix, Operators } = require_operators();
    var Collection = require_collection();
    var MAX_ROW = 1048576;
    var MAX_COLUMN = 16384;
    var { NotAllInputParsedException } = require_api();
    var Utils = class {
      constructor(context) {
        this.context = context;
      }
      columnNameToNumber(columnName) {
        return Address.columnNameToNumber(columnName);
      }
      /**
       * Parse the cell address only.
       * @param {string} cellAddress
       * @return {{ref: {col: number, address: string, row: number}}}
       */
      parseCellAddress(cellAddress) {
        const res = cellAddress.match(/([$]?)([A-Za-z]{1,3})([$]?)([1-9][0-9]*)/);
        return {
          ref: {
            address: res[0],
            col: this.columnNameToNumber(res[2]),
            row: +res[4]
          }
        };
      }
      parseRow(row) {
        const rowNum = +row;
        if (!Number.isInteger(rowNum))
          throw Error("Row number must be integer.");
        return {
          ref: {
            col: void 0,
            row: +row
          }
        };
      }
      parseCol(col) {
        return {
          ref: {
            col: this.columnNameToNumber(col),
            row: void 0
          }
        };
      }
      parseColRange(col1, col2) {
        col1 = this.columnNameToNumber(col1);
        col2 = this.columnNameToNumber(col2);
        return {
          ref: {
            from: {
              col: Math.min(col1, col2),
              row: null
            },
            to: {
              col: Math.max(col1, col2),
              row: null
            }
          }
        };
      }
      parseRowRange(row1, row2) {
        return {
          ref: {
            from: {
              col: null,
              row: Math.min(row1, row2)
            },
            to: {
              col: null,
              row: Math.max(row1, row2)
            }
          }
        };
      }
      _applyPrefix(prefixes, val, isArray2) {
        if (this.isFormulaError(val))
          return val;
        return Prefix.unaryOp(prefixes, val, isArray2);
      }
      async applyPrefixAsync(prefixes, value) {
        const { val, isArray: isArray2 } = this.extractRefValue(await value);
        return this._applyPrefix(prefixes, val, isArray2);
      }
      /**
       * Apply + or - unary prefix.
       * @param {Array.<string>} prefixes
       * @param {*} value
       * @return {*}
       */
      applyPrefix(prefixes, value) {
        if (this.context.async) {
          return this.applyPrefixAsync(prefixes, value);
        } else {
          const { val, isArray: isArray2 } = this.extractRefValue(value);
          return this._applyPrefix(prefixes, val, isArray2);
        }
      }
      _applyPostfix(val, isArray2, postfix) {
        if (this.isFormulaError(val))
          return val;
        return Postfix.percentOp(val, postfix, isArray2);
      }
      async applyPostfixAsync(value, postfix) {
        const { val, isArray: isArray2 } = this.extractRefValue(await value);
        return this._applyPostfix(val, isArray2, postfix);
      }
      applyPostfix(value, postfix) {
        if (this.context.async) {
          return this.applyPostfixAsync(value, postfix);
        } else {
          const { val, isArray: isArray2 } = this.extractRefValue(value);
          return this._applyPostfix(val, isArray2, postfix);
        }
      }
      _applyInfix(res1, infix, res2) {
        const val1 = res1.val, isArray1 = res1.isArray;
        const val2 = res2.val, isArray2 = res2.isArray;
        if (this.isFormulaError(val1))
          return val1;
        if (this.isFormulaError(val2))
          return val2;
        if (Operators.compareOp.includes(infix))
          return Infix.compareOp(val1, infix, val2, isArray1, isArray2);
        else if (Operators.concatOp.includes(infix))
          return Infix.concatOp(val1, infix, val2, isArray1, isArray2);
        else if (Operators.mathOp.includes(infix))
          return Infix.mathOp(val1, infix, val2, isArray1, isArray2);
        else
          throw new Error(`Unrecognized infix: ${infix}`);
      }
      async applyInfixAsync(value1, infix, value2) {
        const res1 = this.extractRefValue(await value1);
        const res2 = this.extractRefValue(await value2);
        return this._applyInfix(res1, infix, res2);
      }
      applyInfix(value1, infix, value2) {
        if (this.context.async) {
          return this.applyInfixAsync(value1, infix, value2);
        } else {
          const res1 = this.extractRefValue(value1);
          const res2 = this.extractRefValue(value2);
          return this._applyInfix(res1, infix, res2);
        }
      }
      applyIntersect(refs) {
        if (this.isFormulaError(refs[0]))
          return refs[0];
        if (!refs[0].ref)
          throw Error(`Expecting a reference, but got ${refs[0]}.`);
        let maxRow, maxCol, minRow, minCol, sheet, res;
        const ref = refs.shift().ref;
        sheet = ref.sheet;
        if (!ref.from) {
          if (ref.row === void 0 || ref.col === void 0) {
            throw Error("Cannot intersect the whole row or column.");
          }
          maxRow = minRow = ref.row;
          maxCol = minCol = ref.col;
        } else {
          maxRow = Math.max(ref.from.row, ref.to.row);
          minRow = Math.min(ref.from.row, ref.to.row);
          maxCol = Math.max(ref.from.col, ref.to.col);
          minCol = Math.min(ref.from.col, ref.to.col);
        }
        let err;
        refs.forEach((ref2) => {
          if (this.isFormulaError(ref2))
            return ref2;
          ref2 = ref2.ref;
          if (!ref2) throw Error(`Expecting a reference, but got ${ref2}.`);
          if (!ref2.from) {
            if (ref2.row === void 0 || ref2.col === void 0) {
              throw Error("Cannot intersect the whole row or column.");
            }
            if (ref2.row > maxRow || ref2.row < minRow || ref2.col > maxCol || ref2.col < minCol || sheet !== ref2.sheet) {
              err = FormulaError.NULL;
            }
            maxRow = minRow = ref2.row;
            maxCol = minCol = ref2.col;
          } else {
            const refMaxRow = Math.max(ref2.from.row, ref2.to.row);
            const refMinRow = Math.min(ref2.from.row, ref2.to.row);
            const refMaxCol = Math.max(ref2.from.col, ref2.to.col);
            const refMinCol = Math.min(ref2.from.col, ref2.to.col);
            if (refMinRow > maxRow || refMaxRow < minRow || refMinCol > maxCol || refMaxCol < minCol || sheet !== ref2.sheet) {
              err = FormulaError.NULL;
            }
            maxRow = Math.min(maxRow, refMaxRow);
            minRow = Math.max(minRow, refMinRow);
            maxCol = Math.min(maxCol, refMaxCol);
            minCol = Math.max(minCol, refMinCol);
          }
        });
        if (err) return err;
        if (maxRow === minRow && maxCol === minCol) {
          res = {
            ref: {
              sheet,
              row: maxRow,
              col: maxCol
            }
          };
        } else {
          res = {
            ref: {
              sheet,
              from: { row: minRow, col: minCol },
              to: { row: maxRow, col: maxCol }
            }
          };
        }
        if (!res.ref.sheet)
          delete res.ref.sheet;
        return res;
      }
      applyUnion(refs) {
        const collection = new Collection();
        for (let i = 0; i < refs.length; i++) {
          if (this.isFormulaError(refs[i]))
            return refs[i];
          collection.add(this.extractRefValue(refs[i]).val, refs[i]);
        }
        return collection;
      }
      /**
       * Apply multiple references, e.g. A1:B3:C8:A:1:.....
       * @param refs
       // * @return {{ref: {from: {col: number, row: number}, to: {col: number, row: number}}}}
       */
      applyRange(refs) {
        let res, maxRow = -1, maxCol = -1, minRow = MAX_ROW + 1, minCol = MAX_COLUMN + 1;
        refs.forEach((ref) => {
          if (this.isFormulaError(ref))
            return ref;
          if (typeof ref === "number") {
            ref = this.parseRow(ref);
          }
          ref = ref.ref;
          if (ref.row === void 0) {
            minRow = 1;
            maxRow = MAX_ROW;
          }
          if (ref.col === void 0) {
            minCol = 1;
            maxCol = MAX_COLUMN;
          }
          if (ref.row > maxRow)
            maxRow = ref.row;
          if (ref.row < minRow)
            minRow = ref.row;
          if (ref.col > maxCol)
            maxCol = ref.col;
          if (ref.col < minCol)
            minCol = ref.col;
        });
        if (maxRow === minRow && maxCol === minCol) {
          res = {
            ref: {
              row: maxRow,
              col: maxCol
            }
          };
        } else {
          res = {
            ref: {
              from: { row: minRow, col: minCol },
              to: { row: maxRow, col: maxCol }
            }
          };
        }
        return res;
      }
      /**
       * Throw away the refs, and retrieve the value.
       * @return {{val: *, isArray: boolean}}
       */
      extractRefValue(obj) {
        let res = obj, isArray2 = false;
        if (Array.isArray(res))
          isArray2 = true;
        if (obj.ref) {
          return { val: this.context.retrieveRef(obj), isArray: isArray2 };
        }
        return { val: res, isArray: isArray2 };
      }
      /**
       *
       * @param array
       * @return {Array}
       */
      toArray(array) {
        return array;
      }
      /**
       * @param {string} number
       * @return {number}
       */
      toNumber(number) {
        return Number(number);
      }
      /**
       * @param {string} string
       * @return {string}
       */
      toString(string2) {
        return string2.substring(1, string2.length - 1).replace(/""/g, '"');
      }
      /**
       * @param {string} bool
       * @return {boolean}
       */
      toBoolean(bool) {
        return bool === "TRUE";
      }
      /**
       * Parse an error.
       * @param {string} error
       * @return {string}
       */
      toError(error) {
        return new FormulaError(error.toUpperCase());
      }
      isFormulaError(obj) {
        return obj instanceof FormulaError;
      }
      static formatChevrotainError(error, inputText) {
        let line, column, msg = "";
        if (error instanceof NotAllInputParsedException) {
          line = error.token.startLine;
          column = error.token.startColumn;
        } else {
          line = error.previousToken.startLine;
          column = error.previousToken.startColumn + 1;
        }
        msg += "\n" + inputText.split("\n")[line - 1] + "\n";
        msg += Array(column - 1).fill(" ").join("") + "^\n";
        msg += `Error at position ${line}:${column}
` + error.message;
        error.errorLocation = { line, column };
        return FormulaError.ERROR(msg, error);
      }
    };
    module2.exports = Utils;
  }
});

// node_modules/fast-formula-parser/grammar/hooks.js
var require_hooks = __commonJS({
  "node_modules/fast-formula-parser/grammar/hooks.js"(exports2, module2) {
    var TextFunctions = require_text();
    var MathFunctions = require_math();
    var TrigFunctions = require_trigonometry();
    var LogicalFunctions = require_logical();
    var EngFunctions = require_engineering();
    var ReferenceFunctions = require_reference();
    var InformationFunctions = require_information();
    var StatisticalFunctions = require_statistical();
    var DateFunctions = require_date();
    var WebFunctions = require_web();
    var FormulaError = require_error();
    var { FormulaHelpers } = require_helpers();
    var { Parser, allTokens } = require_parsing();
    var lexer = require_lexing();
    var Utils = require_utils2();
    var FormulaParser2 = class {
      /**
       * @param {{functions: {}, functionsNeedContext: {}, onVariable: function, onCell: function, onRange: function}} [config]
       * @param isTest - is in testing environment
       */
      constructor(config, isTest = false) {
        this.logs = [];
        this.isTest = isTest;
        this.utils = new Utils(this);
        config = Object.assign({
          functions: {},
          functionsNeedContext: {},
          onVariable: () => null,
          onCell: () => 0,
          onRange: () => [[0]]
        }, config);
        this.onVariable = config.onVariable;
        this.functions = Object.assign(
          {},
          DateFunctions,
          StatisticalFunctions,
          InformationFunctions,
          ReferenceFunctions,
          EngFunctions,
          LogicalFunctions,
          TextFunctions,
          MathFunctions,
          TrigFunctions,
          WebFunctions,
          config.functions,
          config.functionsNeedContext
        );
        this.onRange = config.onRange;
        this.onCell = config.onCell;
        this.funsNullAs0 = Object.keys(MathFunctions).concat(Object.keys(TrigFunctions)).concat(Object.keys(LogicalFunctions)).concat(Object.keys(EngFunctions)).concat(Object.keys(ReferenceFunctions)).concat(Object.keys(StatisticalFunctions)).concat(Object.keys(DateFunctions));
        this.funsNeedContextAndNoDataRetrieve = ["ROW", "ROWS", "COLUMN", "COLUMNS", "SUMIF", "INDEX", "AVERAGEIF", "IF"];
        this.funsNeedContext = [
          ...Object.keys(config.functionsNeedContext),
          ...this.funsNeedContextAndNoDataRetrieve,
          "INDEX",
          "OFFSET",
          "INDIRECT",
          "IF",
          "CHOOSE",
          "WEBSERVICE"
        ];
        this.funsPreserveRef = Object.keys(InformationFunctions);
        this.parser = new Parser(this, this.utils);
      }
      /**
       * Get all lexing token names. Webpack needs this.
       * @return {Array.<string>} - All token names that should not be minimized.
       */
      static get allTokens() {
        return allTokens;
      }
      /**
       * Get value from the cell reference
       * @param ref
       * @return {*}
       */
      getCell(ref) {
        if (ref.sheet == null)
          ref.sheet = this.position ? this.position.sheet : void 0;
        return this.onCell(ref);
      }
      /**
       * Get values from the range reference.
       * @param ref
       * @return {*}
       */
      getRange(ref) {
        if (ref.sheet == null)
          ref.sheet = this.position ? this.position.sheet : void 0;
        return this.onRange(ref);
      }
      /**
       * TODO:
       * Get references or values from a user defined variable.
       * @param name
       * @return {*}
       */
      getVariable(name) {
        const res = { ref: this.onVariable(name, this.position.sheet, this.position) };
        if (res.ref == null)
          return FormulaError.NAME;
        return res;
      }
      /**
       * Retrieve values from the given reference.
       * @param valueOrRef
       * @return {*}
       */
      retrieveRef(valueOrRef) {
        if (FormulaHelpers.isRangeRef(valueOrRef)) {
          return this.getRange(valueOrRef.ref);
        }
        if (FormulaHelpers.isCellRef(valueOrRef)) {
          return this.getCell(valueOrRef.ref);
        }
        return valueOrRef;
      }
      /**
       * Call an excel function.
       * @param name - Function name.
       * @param args - Arguments that pass to the function.
       * @return {*}
       */
      _callFunction(name, args) {
        if (name.indexOf("_xlfn.") === 0)
          name = name.slice(6);
        name = name.toUpperCase();
        const nullValue = this.funsNullAs0.includes(name) ? 0 : "";
        if (!this.funsNeedContextAndNoDataRetrieve.includes(name)) {
          args = args.map((arg) => {
            if (arg === null)
              return { value: nullValue, isArray: false, omitted: true };
            const res = this.utils.extractRefValue(arg);
            if (this.funsPreserveRef.includes(name)) {
              return { value: res.val, isArray: res.isArray, ref: arg.ref };
            }
            return {
              value: res.val,
              isArray: res.isArray,
              isRangeRef: !!FormulaHelpers.isRangeRef(arg),
              isCellRef: !!FormulaHelpers.isCellRef(arg)
            };
          });
        }
        if (this.functions[name]) {
          let res;
          try {
            if (!this.funsNeedContextAndNoDataRetrieve.includes(name) && !this.funsNeedContext.includes(name))
              res = this.functions[name](...args);
            else
              res = this.functions[name](this, ...args);
          } catch (e) {
            if (e instanceof FormulaError) {
              return e;
            } else {
              throw e;
            }
          }
          if (res === void 0) {
            if (this.isTest) {
              if (!this.logs.includes(name)) this.logs.push(name);
              return { value: 0, ref: {} };
            }
            throw FormulaError.NOT_IMPLEMENTED(name);
          }
          return res;
        } else {
          if (this.isTest) {
            if (!this.logs.includes(name)) this.logs.push(name);
            return { value: 0, ref: {} };
          }
          throw FormulaError.NOT_IMPLEMENTED(name);
        }
      }
      async callFunctionAsync(name, args) {
        const awaitedArgs = [];
        for (const arg of args) {
          awaitedArgs.push(await arg);
        }
        const res = await this._callFunction(name, awaitedArgs);
        return FormulaHelpers.checkFunctionResult(res);
      }
      callFunction(name, args) {
        if (this.async) {
          return this.callFunctionAsync(name, args);
        } else {
          const res = this._callFunction(name, args);
          return FormulaHelpers.checkFunctionResult(res);
        }
      }
      /**
       * Return currently supported functions.
       * @return {this}
       */
      supportedFunctions() {
        const supported = [];
        const functions = Object.keys(this.functions);
        functions.forEach((fun) => {
          try {
            const res = this.functions[fun](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            if (res === void 0) return;
            supported.push(fun);
          } catch (e) {
            if (e instanceof Error)
              supported.push(fun);
          }
        });
        return supported.sort();
      }
      /**
       * Check and return the appropriate formula result.
       * @param result
       * @param {boolean} [allowReturnArray] - If the formula can return an array
       * @return {*}
       */
      checkFormulaResult(result, allowReturnArray = false) {
        const type = typeof result;
        if (type === "number") {
          if (isNaN(result)) {
            return FormulaError.VALUE;
          } else if (!isFinite(result)) {
            return FormulaError.NUM;
          }
          result += 0;
        } else if (type === "object") {
          if (result instanceof FormulaError)
            return result;
          if (allowReturnArray) {
            if (result.ref) {
              result = this.retrieveRef(result);
            }
            if (typeof result === "object" && !Array.isArray(result) && result != null) {
              return FormulaError.VALUE;
            }
          } else {
            if (result.ref && result.ref.row && !result.ref.from) {
              result = this.retrieveRef(result);
            } else if (result.ref && result.ref.from && result.ref.from.col === result.ref.to.col) {
              result = this.retrieveRef({
                ref: {
                  row: result.ref.from.row,
                  col: result.ref.from.col
                }
              });
            } else if (Array.isArray(result)) {
              result = result[0][0];
            } else {
              return FormulaError.VALUE;
            }
          }
        }
        return result;
      }
      /**
       * Parse an excel formula.
       * @param {string} inputText
       * @param {{row: number, col: number}} [position] - The position of the parsed formula
       *              e.g. {row: 1, col: 1}
       * @param {boolean} [allowReturnArray] - If the formula can return an array. Useful when parsing array formulas,
       *                                      or data validation formulas.
       * @returns {*}
       */
      parse(inputText, position, allowReturnArray = false) {
        if (inputText.length === 0) throw Error("Input must not be empty.");
        this.position = position;
        this.async = false;
        const lexResult = lexer.lex(inputText);
        this.parser.input = lexResult.tokens;
        let res;
        try {
          res = this.parser.formulaWithBinaryOp();
          res = this.checkFormulaResult(res, allowReturnArray);
          if (res instanceof FormulaError) {
            return res;
          }
        } catch (e) {
          throw FormulaError.ERROR(e.message, e);
        }
        if (this.parser.errors.length > 0) {
          const error = this.parser.errors[0];
          throw Utils.formatChevrotainError(error, inputText);
        }
        return res;
      }
      /**
       * Parse an excel formula asynchronously.
       * Use when providing custom async functions.
       * @param {string} inputText
       * @param {{row: number, col: number}} [position] - The position of the parsed formula
       *              e.g. {row: 1, col: 1}
       * @param {boolean} [allowReturnArray] - If the formula can return an array. Useful when parsing array formulas,
       *                                      or data validation formulas.
       * @returns {*}
       */
      async parseAsync(inputText, position, allowReturnArray = false) {
        if (inputText.length === 0) throw Error("Input must not be empty.");
        this.position = position;
        this.async = true;
        const lexResult = lexer.lex(inputText);
        this.parser.input = lexResult.tokens;
        let res;
        try {
          res = await this.parser.formulaWithBinaryOp();
          res = this.checkFormulaResult(res, allowReturnArray);
          if (res instanceof FormulaError) {
            return res;
          }
        } catch (e) {
          throw FormulaError.ERROR(e.message, e);
        }
        if (this.parser.errors.length > 0) {
          const error = this.parser.errors[0];
          throw Utils.formatChevrotainError(error, inputText);
        }
        return res;
      }
    };
    module2.exports = {
      FormulaParser: FormulaParser2,
      FormulaHelpers
    };
  }
});

// node_modules/fast-formula-parser/grammar/dependency/utils.js
var require_utils3 = __commonJS({
  "node_modules/fast-formula-parser/grammar/dependency/utils.js"(exports2, module2) {
    var FormulaError = require_error();
    var { FormulaHelpers, Types, Address } = require_helpers();
    var { Prefix, Postfix, Infix, Operators } = require_operators();
    var Collection = require_collection();
    var MAX_ROW = 1048576;
    var MAX_COLUMN = 16384;
    var Utils = class {
      constructor(context) {
        this.context = context;
      }
      columnNameToNumber(columnName) {
        return Address.columnNameToNumber(columnName);
      }
      /**
       * Parse the cell address only.
       * @param {string} cellAddress
       * @return {{ref: {col: number, address: string, row: number}}}
       */
      parseCellAddress(cellAddress) {
        const res = cellAddress.match(/([$]?)([A-Za-z]{1,3})([$]?)([1-9][0-9]*)/);
        return {
          ref: {
            col: this.columnNameToNumber(res[2]),
            row: +res[4]
          }
        };
      }
      parseRow(row) {
        const rowNum = +row;
        if (!Number.isInteger(rowNum))
          throw Error("Row number must be integer.");
        return {
          ref: {
            col: void 0,
            row: +row
          }
        };
      }
      parseCol(col) {
        return {
          ref: {
            col: this.columnNameToNumber(col),
            row: void 0
          }
        };
      }
      /**
       * Apply + or - unary prefix.
       * @param {Array.<string>} prefixes
       * @param {*} value
       * @return {*}
       */
      applyPrefix(prefixes, value) {
        this.extractRefValue(value);
        return 0;
      }
      applyPostfix(value, postfix) {
        this.extractRefValue(value);
        return 0;
      }
      applyInfix(value1, infix, value2) {
        this.extractRefValue(value1);
        this.extractRefValue(value2);
        return 0;
      }
      applyIntersect(refs) {
        if (this.isFormulaError(refs[0]))
          return refs[0];
        if (!refs[0].ref)
          throw Error(`Expecting a reference, but got ${refs[0]}.`);
        let maxRow, maxCol, minRow, minCol, sheet, res;
        const ref = refs.shift().ref;
        sheet = ref.sheet;
        if (!ref.from) {
          if (ref.row === void 0 || ref.col === void 0) {
            throw Error("Cannot intersect the whole row or column.");
          }
          maxRow = minRow = ref.row;
          maxCol = minCol = ref.col;
        } else {
          maxRow = Math.max(ref.from.row, ref.to.row);
          minRow = Math.min(ref.from.row, ref.to.row);
          maxCol = Math.max(ref.from.col, ref.to.col);
          minCol = Math.min(ref.from.col, ref.to.col);
        }
        let err;
        refs.forEach((ref2) => {
          if (this.isFormulaError(ref2))
            return ref2;
          ref2 = ref2.ref;
          if (!ref2) throw Error(`Expecting a reference, but got ${ref2}.`);
          if (!ref2.from) {
            if (ref2.row === void 0 || ref2.col === void 0) {
              throw Error("Cannot intersect the whole row or column.");
            }
            if (ref2.row > maxRow || ref2.row < minRow || ref2.col > maxCol || ref2.col < minCol || sheet !== ref2.sheet) {
              err = FormulaError.NULL;
            }
            maxRow = minRow = ref2.row;
            maxCol = minCol = ref2.col;
          } else {
            const refMaxRow = Math.max(ref2.from.row, ref2.to.row);
            const refMinRow = Math.min(ref2.from.row, ref2.to.row);
            const refMaxCol = Math.max(ref2.from.col, ref2.to.col);
            const refMinCol = Math.min(ref2.from.col, ref2.to.col);
            if (refMinRow > maxRow || refMaxRow < minRow || refMinCol > maxCol || refMaxCol < minCol || sheet !== ref2.sheet) {
              err = FormulaError.NULL;
            }
            maxRow = Math.min(maxRow, refMaxRow);
            minRow = Math.max(minRow, refMinRow);
            maxCol = Math.min(maxCol, refMaxCol);
            minCol = Math.max(minCol, refMinCol);
          }
        });
        if (err) return err;
        if (maxRow === minRow && maxCol === minCol) {
          res = {
            ref: {
              sheet,
              row: maxRow,
              col: maxCol
            }
          };
        } else {
          res = {
            ref: {
              sheet,
              from: { row: minRow, col: minCol },
              to: { row: maxRow, col: maxCol }
            }
          };
        }
        if (!res.ref.sheet)
          delete res.ref.sheet;
        return res;
      }
      applyUnion(refs) {
        const collection = new Collection();
        for (let i = 0; i < refs.length; i++) {
          if (this.isFormulaError(refs[i]))
            return refs[i];
          collection.add(this.extractRefValue(refs[i]).val, refs[i]);
        }
        return collection;
      }
      /**
       * Apply multiple references, e.g. A1:B3:C8:A:1:.....
       * @param refs
       // * @return {{ref: {from: {col: number, row: number}, to: {col: number, row: number}}}}
       */
      applyRange(refs) {
        let res, maxRow = -1, maxCol = -1, minRow = MAX_ROW + 1, minCol = MAX_COLUMN + 1;
        refs.forEach((ref) => {
          if (this.isFormulaError(ref))
            return ref;
          if (typeof ref === "number") {
            ref = this.parseRow(ref);
          }
          ref = ref.ref;
          if (ref.row === void 0) {
            minRow = 1;
            maxRow = MAX_ROW;
          }
          if (ref.col === void 0) {
            minCol = 1;
            maxCol = MAX_COLUMN;
          }
          if (ref.row > maxRow)
            maxRow = ref.row;
          if (ref.row < minRow)
            minRow = ref.row;
          if (ref.col > maxCol)
            maxCol = ref.col;
          if (ref.col < minCol)
            minCol = ref.col;
        });
        if (maxRow === minRow && maxCol === minCol) {
          res = {
            ref: {
              row: maxRow,
              col: maxCol
            }
          };
        } else {
          res = {
            ref: {
              from: { row: minRow, col: minCol },
              to: { row: maxRow, col: maxCol }
            }
          };
        }
        return res;
      }
      /**
       * Throw away the refs, and retrieve the value.
       * @return {{val: *, isArray: boolean}}
       */
      extractRefValue(obj) {
        const isArray2 = Array.isArray(obj);
        if (obj.ref) {
          return { val: this.context.retrieveRef(obj), isArray: isArray2 };
        }
        return { val: obj, isArray: isArray2 };
      }
      /**
       *
       * @param array
       * @return {Array}
       */
      toArray(array) {
        return array;
      }
      /**
       * @param {string} number
       * @return {number}
       */
      toNumber(number) {
        return Number(number);
      }
      /**
       * @param {string} string
       * @return {string}
       */
      toString(string2) {
        return string2.substring(1, string2.length - 1).replace(/""/g, '"');
      }
      /**
       * @param {string} bool
       * @return {boolean}
       */
      toBoolean(bool) {
        return bool === "TRUE";
      }
      /**
       * Parse an error.
       * @param {string} error
       * @return {FormulaError}
       */
      toError(error) {
        return new FormulaError(error.toUpperCase());
      }
      isFormulaError(obj) {
        return obj instanceof FormulaError;
      }
    };
    module2.exports = Utils;
  }
});

// node_modules/fast-formula-parser/grammar/dependency/hooks.js
var require_hooks2 = __commonJS({
  "node_modules/fast-formula-parser/grammar/dependency/hooks.js"(exports2, module2) {
    var FormulaError = require_error();
    var { FormulaHelpers } = require_helpers();
    var { Parser } = require_parsing();
    var lexer = require_lexing();
    var Utils = require_utils3();
    var { formatChevrotainError } = require_utils2();
    var DepParser = class {
      /**
       *
       * @param {{onVariable: Function}} [config]
       */
      constructor(config) {
        this.data = [];
        this.utils = new Utils(this);
        config = Object.assign({
          onVariable: () => null
        }, config);
        this.utils = new Utils(this);
        this.onVariable = config.onVariable;
        this.functions = {};
        this.parser = new Parser(this, this.utils);
      }
      /**
       * Get value from the cell reference
       * @param ref
       * @return {*}
       */
      getCell(ref) {
        if (ref.row != null) {
          if (ref.sheet == null)
            ref.sheet = this.position ? this.position.sheet : void 0;
          const idx = this.data.findIndex((element) => {
            return element.from && element.from.row <= ref.row && element.to.row >= ref.row && element.from.col <= ref.col && element.to.col >= ref.col || element.row === ref.row && element.col === ref.col && element.sheet === ref.sheet;
          });
          if (idx === -1)
            this.data.push(ref);
        }
        return 0;
      }
      /**
       * Get values from the range reference.
       * @param ref
       * @return {*}
       */
      getRange(ref) {
        if (ref.from.row != null) {
          if (ref.sheet == null)
            ref.sheet = this.position ? this.position.sheet : void 0;
          const idx = this.data.findIndex((element) => {
            return element.from && element.from.row === ref.from.row && element.from.col === ref.from.col && element.to.row === ref.to.row && element.to.col === ref.to.col;
          });
          if (idx === -1)
            this.data.push(ref);
        }
        return [[0]];
      }
      /**
       * TODO:
       * Get references or values from a user defined variable.
       * @param name
       * @return {*}
       */
      getVariable(name) {
        const res = { ref: this.onVariable(name, this.position.sheet) };
        if (res.ref == null)
          return FormulaError.NAME;
        if (FormulaHelpers.isCellRef(res))
          this.getCell(res.ref);
        else {
          this.getRange(res.ref);
        }
        return 0;
      }
      /**
       * Retrieve values from the given reference.
       * @param valueOrRef
       * @return {*}
       */
      retrieveRef(valueOrRef) {
        if (FormulaHelpers.isRangeRef(valueOrRef)) {
          return this.getRange(valueOrRef.ref);
        }
        if (FormulaHelpers.isCellRef(valueOrRef)) {
          return this.getCell(valueOrRef.ref);
        }
        return valueOrRef;
      }
      /**
       * Call an excel function.
       * @param name - Function name.
       * @param args - Arguments that pass to the function.
       * @return {*}
       */
      callFunction(name, args) {
        args.forEach((arg) => {
          if (arg == null)
            return;
          this.retrieveRef(arg);
        });
        return { value: 0, ref: {} };
      }
      /**
       * Check and return the appropriate formula result.
       * @param result
       * @return {*}
       */
      checkFormulaResult(result) {
        this.retrieveRef(result);
      }
      /**
       * Parse an excel formula and return the dependencies
       * @param {string} inputText
       * @param {{row: number, col: number, sheet: string}} position
       * @param {boolean} [ignoreError=false] if true, throw FormulaError when error occurred.
       *                                      if false, the parser will return partial dependencies.
       * @returns {Array.<{}>}
       */
      parse(inputText, position, ignoreError = false) {
        if (inputText.length === 0) throw Error("Input must not be empty.");
        this.data = [];
        this.position = position;
        const lexResult = lexer.lex(inputText);
        this.parser.input = lexResult.tokens;
        try {
          const res = this.parser.formulaWithBinaryOp();
          this.checkFormulaResult(res);
        } catch (e) {
          if (!ignoreError) {
            throw FormulaError.ERROR(e.message, e);
          }
        }
        if (this.parser.errors.length > 0 && !ignoreError) {
          const error = this.parser.errors[0];
          throw formatChevrotainError(error, inputText);
        }
        return this.data;
      }
    };
    module2.exports = {
      DepParser
    };
  }
});

// node_modules/fast-formula-parser/index.js
var require_fast_formula_parser = __commonJS({
  "node_modules/fast-formula-parser/index.js"(exports2, module2) {
    var { FormulaParser: FormulaParser2 } = require_hooks();
    var { DepParser } = require_hooks2();
    var SSF = require_ssf();
    var FormulaError = require_error();
    Object.assign(FormulaParser2, {
      MAX_ROW: 1048576,
      MAX_COLUMN: 16384,
      SSF,
      DepParser,
      FormulaError,
      ...require_helpers()
    });
    module2.exports = FormulaParser2;
  }
});

// src/public-document.js
var import_fast_formula_parser = __toESM(require_fast_formula_parser(), 1);
import { Node, Extension as Extension2, getSchema } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Code from "@tiptap/extension-code";
import { generateHTML } from "@tiptap/html/server";

// src/text-color.js
import { Mark, Extension } from "@tiptap/core";
import { Plugin, PluginKey, TextSelection } from "@tiptap/pm/state";
import { closeHistory } from "@tiptap/pm/history";
function createTextColor({
  Mark: Mark2,
  Extension: Extension3,
  Plugin: Plugin2,
  PluginKey: PluginKey2,
  TextSelection: TextSelection3,
  closeHistory: closeHistory2,
  post,
  snapshot,
  selectionActive
}) {
  const key = new PluginKey2("vellixInlineTextColor");
  let sequence = 0;
  function color(value) {
    if (typeof value !== "string") return null;
    const hex = value.trim().match(/^#([a-f\d]{3}|[a-f\d]{6})$/i);
    if (hex) return "#" + (hex[1].length === 3 ? [...hex[1]].map((c) => c + c).join("") : hex[1]).toUpperCase();
    const rgb = value.trim().match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
    return rgb && rgb.slice(1).every((c) => +c <= 255) ? "#" + rgb.slice(1).map((c) => (+c).toString(16).padStart(2, "0")).join("").toUpperCase() : null;
  }
  function style2(value) {
    if (value?.kind === "solid") {
      const start2 = color(value.start);
      return start2 ? { kind: "solid", start: start2 } : null;
    }
    if (value?.kind !== "gradient") return null;
    const start = color(value.start), end = color(value.end), angle = value.angle;
    if (!start || !end || typeof angle !== "number" || !Number.isFinite(angle)) return null;
    return { kind: "gradient", start, end, angle: (Math.round(angle) % 360 + 360) % 360 };
  }
  function markStyle(attrs) {
    return style2(attrs?.gradient ? { ...attrs.gradient, kind: "gradient" } : { kind: "solid", start: attrs?.color });
  }
  function parseGradient(element) {
    try {
      return style2({ ...JSON.parse(element.getAttribute("data-vellix-gradient")), kind: "gradient" });
    } catch {
      return null;
    }
  }
  const mark = Mark2.create({
    name: "textStyle",
    priority: 50,
    inclusive: false,
    addAttributes() {
      return {
        color: { default: null, rendered: false, parseHTML: (el) => color(el.style.color) },
        gradient: { default: null, rendered: false, parseHTML: (el) => {
          const value = parseGradient(el);
          return value ? { start: value.start, end: value.end, angle: value.angle } : null;
        } }
      };
    },
    parseHTML() {
      return [{ tag: "span[data-vellix-gradient]" }, { tag: "span[style]", getAttrs: (el) => color(el.style.color) ? {} : false }];
    },
    renderHTML({ mark: mark2 }) {
      const value = markStyle(mark2.attrs);
      if (value?.kind === "gradient") {
        const gradient = { start: value.start, end: value.end, angle: value.angle };
        return ["span", {
          "data-vellix-gradient": JSON.stringify(gradient),
          style: `background-image:linear-gradient(${value.angle}deg,${value.start},${value.end});background-clip:text;-webkit-background-clip:text;color:transparent;-webkit-text-fill-color:transparent;box-decoration-break:clone;-webkit-box-decoration-break:clone`
        }, 0];
      }
      return ["span", value ? { style: `color:${value.start}` } : {}, 0];
    }
  });
  function ranges(editor, from, to) {
    const result = [], markType = editor.schema.marks.textStyle;
    editor.state.doc.nodesBetween(from, to, (node, pos, parent) => {
      if (node.isText && parent.type.allowsMarkType(markType)) {
        result.push({ from: Math.max(from, pos), to: Math.min(to, pos + node.nodeSize), node });
      }
    });
    return result;
  }
  function eligible(editor) {
    const selection = editor.state.selection;
    return editor.isEditable && !selectionActive() && selection instanceof TextSelection3 && !selection.empty && ranges(editor, selection.from, selection.to).length > 0;
  }
  function currentStyle(editor, from, to) {
    const values2 = ranges(editor, from, to).map(({ node }) => markStyle(node.marks.find((m) => m.type.name === "textStyle")?.attrs));
    const mixed = new Set(values2.map((v) => JSON.stringify(v))).size > 1;
    return { style: mixed ? null : values2[0] ?? null, mixed };
  }
  const integration = Extension3.create({
    name: "vellixTextColorSelection",
    addProseMirrorPlugins() {
      const editor = this.editor;
      return [new Plugin2({ key, state: {
        init: () => null,
        apply(tr, held) {
          const meta = tr.getMeta(key);
          if (meta !== void 0) return meta;
          if (held?.tracksSelection && !tr.docChanged && tr.selectionSet && editor.isFocused && (tr.selection.from !== held.from || tr.selection.to !== held.to)) return null;
          if (!held || !tr.docChanged) return held;
          const from = tr.mapping.map(held.from, 1), to = tr.mapping.map(held.to, -1);
          if (to <= from || tr.doc.textBetween(from, to, "\n") !== held.text) return null;
          return { ...held, from, to };
        }
      } })];
    }
  });
  function command(editor, name, args = {}) {
    const held = key.getState(editor.state);
    if (name === "setContent" || name === "setEditable" || name === "setSelectionMode") {
      if (held) editor.view.dispatch(editor.state.tr.setMeta(key, null).setMeta("addToHistory", false));
      return void 0;
    }
    if (name === "textColorBegin") {
      if (!eligible(editor)) return null;
      const { from: from2, to: to2 } = editor.state.selection;
      const request = {
        token: `text-color-${++sequence}`,
        from: from2,
        to: to2,
        text: editor.state.doc.textBetween(from2, to2, "\n"),
        tracksSelection: args.trackSelection === true
      };
      editor.view.dispatch(editor.state.tr.setMeta(key, request).setMeta("addToHistory", false));
      return { token: request.token, text: request.text, ...currentStyle(editor, from2, to2) };
    }
    if (name !== "textColorApply" && name !== "textColorEnd") return void 0;
    if (!held || held.token !== args.token || !editor.isEditable || selectionActive()) return false;
    const { from, to } = held;
    if (name === "textColorEnd") {
      const tr2 = editor.state.tr.setMeta(key, null).setMeta("addToHistory", false);
      if (args.restoreFocus) tr2.setSelection(TextSelection3.create(tr2.doc, from, to));
      editor.view.dispatch(tr2);
      if (args.restoreFocus) editor.view.focus();
      return true;
    }
    const value = args.style == null ? null : style2(args.style);
    if (args.style != null && !value) return false;
    const markType = editor.schema.marks.textStyle, parts = ranges(editor, from, to);
    if (!parts.length) return false;
    const tr = closeHistory2(editor.state.tr);
    const attrs = value?.kind === "gradient" ? { gradient: { start: value.start, end: value.end, angle: value.angle } } : { color: value?.start ?? null };
    for (const part of parts) {
      tr.removeMark(part.from, part.to, markType);
      if (value) tr.addMark(part.from, part.to, markType.create(attrs));
    }
    tr.setSelection(TextSelection3.create(tr.doc, from, to));
    editor.view.dispatch(tr);
    editor.view.dispatch(closeHistory2(editor.state.tr).setMeta("addToHistory", false));
    post("snapshot", snapshot());
    return true;
  }
  function formattingState(editor) {
    const canColorText = eligible(editor);
    const hasTextSelection = editor.isFocused && canColorText;
    return { hasTextSelection, canColorText, textColorToken: key.getState(editor.state)?.token ?? null, textColor: canColorText ? currentStyle(editor, editor.state.selection.from, editor.state.selection.to).style : null };
  }
  return { mark, integration, command, formattingState };
}
var textColorDependencies = { Mark, Extension, Plugin, PluginKey, TextSelection, closeHistory };

// src/inline-properties.js
var PROPERTY_KINDS = [
  { kind: "text", title: "Text", icon: "linedpages" },
  { kind: "number", title: "Number", icon: "numcal" },
  { kind: "date", title: "Date", icon: "numcal" },
  { kind: "select", title: "Select", icon: "listcircle" },
  { kind: "multiSelect", title: "Multi Select", icon: "listcircle" },
  { kind: "checkbox", title: "Checkbox", icon: "checkwavy" },
  { kind: "url", title: "URL", icon: "linkcircle" }
];
var string = (value) => typeof value === "string" ? value : "";
var decimal = (value) => {
  const clean = string(value).trim();
  return clean && Number.isFinite(Number(clean)) ? clean : "";
};
function normalizeProperty(raw = {}) {
  raw = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const kind = PROPERTY_KINDS.some((item) => item.kind === raw.kind) ? raw.kind : "text";
  const seen = /* @__PURE__ */ new Set();
  const options = (Array.isArray(raw.options) ? raw.options : []).flatMap((option) => {
    if (!option || typeof option.id !== "string" || !option.id || seen.has(option.id)) return [];
    seen.add(option.id);
    return [{
      id: option.id,
      name: string(option.name).trim() || "Option",
      color: /^#[0-9a-f]{6}$/i.test(option.color) ? option.color : "#2EC5F4"
    }];
  });
  const selectedOptionIDs = [...new Set(Array.isArray(raw.selectedOptionIDs) ? raw.selectedOptionIDs : [])].filter((id) => seen.has(id));
  return {
    kind,
    name: string(raw.name).trim(),
    value: string(raw.value),
    checked: raw.checked === true,
    options,
    selectedOptionIDs: kind === "select" ? selectedOptionIDs.slice(0, 1) : selectedOptionIDs,
    placeholder: string(raw.placeholder),
    prefix: string(raw.prefix),
    suffix: string(raw.suffix),
    minimum: decimal(raw.minimum),
    maximum: decimal(raw.maximum),
    step: Number(raw.step) > 0 ? decimal(raw.step) : "",
    includeTime: raw.includeTime === true,
    urlLabel: string(raw.urlLabel)
  };
}
function propertyURL(value) {
  const clean = string(value).trim();
  if (!clean || /[\s\u0000-\u001f]/.test(clean)) return null;
  try {
    const url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(clean) ? clean : `https://${clean}`);
    return ["https:", "http:"].includes(url.protocol) && url.hostname && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

// src/template-components.js
import { TextSelection as TextSelection2 } from "@tiptap/pm/state";
var kinds = /* @__PURE__ */ new Set(["rating", "singleSelect", "multiSelect", "slider"]);
function componentDefinition(value) {
  if (!value || !kinds.has(value.kind)) throw new Error("Choose a valid template component.");
  const definition = {
    kind: value.kind,
    label: String(value.label || ""),
    minimum: Number(value.minimum ?? (value.kind === "slider" ? 0 : 1)),
    maximum: Number(value.maximum ?? (value.kind === "slider" ? 100 : 5)),
    step: Number(value.step ?? 1),
    minimumLabel: String(value.minimumLabel || ""),
    maximumLabel: String(value.maximumLabel || ""),
    choices: Array.isArray(value.choices) ? value.choices.map((choice) => ({ id: String(choice.id || ""), label: String(choice.label || "").trim() })) : []
  };
  const { kind, minimum, maximum, step, choices } = definition;
  if (![minimum, maximum, step].every(Number.isFinite) || Math.abs(minimum) > 1e9 || Math.abs(maximum) > 1e9) throw new Error("Enter finite component values.");
  if (kind === "rating" && (!Number.isInteger(minimum) || !Number.isInteger(maximum) || maximum <= minimum || maximum - minimum > 49)) throw new Error("Choose 2 to 50 whole-number ratings.");
  if (kind === "slider" && (maximum <= minimum || step <= 0 || step > maximum - minimum || !Number.isFinite((maximum - minimum) / step) || minimum + step === minimum || maximum - step === maximum)) throw new Error("Choose a valid slider range and step.");
  if ((kind === "singleSelect" || kind === "multiSelect") && (!choices.length || choices.length > 100 || choices.some((choice) => !choice.id || !choice.label) || new Set(choices.map((choice) => choice.id)).size !== choices.length)) throw new Error("Add named, independently identified choices.");
  if (kind === "rating") definition.step = 1;
  return definition;
}
function componentResponse(definition, value) {
  const { kind, minimum, maximum, step, choices } = definition;
  if (kind === "multiSelect") return choices.filter((choice) => Array.isArray(value) && value.includes(choice.id)).map((choice) => choice.id);
  if (value == null) return null;
  if (kind === "singleSelect") return choices.some((choice) => choice.id === value) ? value : null;
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  if (kind === "rating") return Number.isInteger(value) && value >= minimum && value <= maximum ? value : null;
  const steps = Math.min(Math.floor((maximum - minimum) / step + 1e-9), Math.max(0, Math.round((value - minimum) / step)));
  return Number((minimum + steps * step).toPrecision(15));
}

// src/table-formulas.js
(function(global) {
  "use strict";
  function columnName(index) {
    let value = index + 1, name = "";
    while (value > 0) {
      value--;
      name = String.fromCharCode(65 + value % 26) + name;
      value = Math.floor(value / 26);
    }
    return name;
  }
  function columnIndex(name) {
    return [...name.toUpperCase()].reduce((value, letter) => value * 26 + letter.charCodeAt(0) - 64, 0) - 1;
  }
  function scalar(value, format) {
    if (typeof value !== "string") return value ?? null;
    const text2 = value.trim();
    if (!text2) return null;
    if (/^(TRUE|FALSE)$/i.test(text2)) return text2.toUpperCase() === "TRUE";
    if (/^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?%?$/.test(text2)) {
      return Number(text2.replace(/%$/, "")) / (text2.endsWith("%") ? 100 : 1);
    }
    if (format === "date" && /^\d{4}-\d{2}-\d{2}$/.test(text2)) {
      const time = Date.parse(text2 + "T00:00:00Z");
      if (Number.isFinite(time)) return time / 864e5 + 25569;
    }
    return value;
  }
  function createWorkbook(tables, Parser = global.FormulaParser) {
    if (!Parser) throw new Error("The formula engine is unavailable.");
    const byName = /* @__PURE__ */ new Map(), byID = /* @__PURE__ */ new Map(), cache = /* @__PURE__ */ new Map(), active = /* @__PURE__ */ new Set(), parsers = [];
    let evaluations = 0;
    for (const table of tables) {
      byID.set(table.id, table);
      const name = table.name.toLowerCase();
      byName.set(name, byName.has(name) ? null : table);
    }
    const ErrorType = Parser.FormulaError;
    function referenceTable(ref, owner) {
      if (!ref.sheet || ref.sheet.toLowerCase() === owner.name.toLowerCase()) return owner;
      const table = byName.get(ref.sheet.toLowerCase());
      if (!table) throw ErrorType.REF;
      return table;
    }
    function value(table, row, col) {
      if (++evaluations > 5e4 || active.size > 128) throw ErrorType.NUM;
      if (row < 0 || col < 0) throw ErrorType.REF;
      const cell = table.cells[row]?.[col];
      if (!cell) return null;
      const key = `${table.id}:${row}:${col}`;
      if (cache.has(key)) return cache.get(key);
      if (active.has(key)) return new ErrorType("#CYCLE!");
      if (!cell.formula) return scalar(cell.value, cell.format);
      if (cell.formula.length > 2048) throw ErrorType.NUM;
      active.add(key);
      try {
        const depth = active.size - 1;
        let parser = parsers[depth];
        if (!parser) parser = parsers[depth] = new Parser({
          onCell(ref) {
            return value(referenceTable(ref, parser.owner), ref.row - 1, ref.col - 1);
          },
          onRange(ref) {
            const target = referenceTable(ref, parser.owner);
            const lastRow = Math.min(ref.to.row, target.cells.length);
            const lastCol = Math.min(ref.to.col, target.cells[0]?.length || 0);
            if ((lastRow - ref.from.row + 1) * (lastCol - ref.from.col + 1) > 2e4) throw ErrorType.NUM;
            const result2 = [];
            for (let r = ref.from.row - 1; r < lastRow; r++) {
              const line = [];
              for (let c = ref.from.col - 1; c < lastCol; c++) line.push(value(target, r, c));
              result2.push(line);
            }
            return result2.length ? result2 : [[null]];
          },
          functionsNeedContext: { WEBSERVICE() {
            throw ErrorType.NAME;
          } }
        });
        parser.owner = table;
        const result = parser.parse(cell.formula.replace(/^=/, ""), { row: row + 1, col: col + 1, sheet: table.name }, true);
        cache.set(key, result);
        return result;
      } catch (error) {
        while (error?.details instanceof ErrorType) error = error.details;
        const result = error instanceof ErrorType ? error : new ErrorType("#ERROR!", error.message);
        cache.set(key, result);
        return result;
      } finally {
        active.delete(key);
      }
    }
    return {
      value(tableID, row, col) {
        evaluations = 0;
        try {
          return value(byID.get(tableID), row, col);
        } catch (error) {
          return error;
        }
      },
      preview(tableID, row, col, formula) {
        const table = byID.get(tableID);
        const cells = table.cells.map((line) => line.map((cell) => ({ ...cell })));
        cells[row][col] = { ...cells[row][col], formula };
        return createWorkbook(tables.map((item) => item.id === tableID ? { ...item, cells } : item), Parser).value(tableID, row, col);
      }
    };
  }
  function display(value, attrs = {}, Parser = global.FormulaParser) {
    if (value instanceof Error) return value.error || "#ERROR!";
    if (Array.isArray(value)) return value.map((line) => Array.isArray(line) ? line.join(", ") : line).join("; ");
    if (value == null) return "";
    if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
    if (typeof value !== "number") return String(value);
    if (!Number.isFinite(value)) return "#NUM!";
    const digits = Math.max(0, Math.min(10, Number(attrs.decimals ?? 2)));
    if (attrs.format === "date") {
      try {
        return Parser.SSF.format("yyyy-mm-dd", value);
      } catch (_) {
        return "#VALUE!";
      }
    }
    const options = { maximumFractionDigits: attrs.format === "text" ? 10 : digits };
    if (attrs.format === "percent") options.style = "percent";
    if (attrs.format === "currency") {
      options.style = "currency";
      options.currency = attrs.currency || "USD";
    }
    try {
      return new Intl.NumberFormat(void 0, options).format(value);
    } catch (_) {
      return String(value);
    }
  }
  function rewriteReferences(formula, owner, target, map2, Parser = global.FormulaParser) {
    const source = formula.replace(/^=/, "");
    const parser = new Parser.DepParser();
    try {
      parser.parse(source, { row: 1, col: 1, sheet: owner }, true);
    } catch (_) {
      return formula;
    }
    const tokens = parser.parser.input, replacements = [];
    let sheet = owner;
    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index], type = token.tokenType.name;
      if (type === "Sheet" || type === "SheetQuoted") {
        sheet = token.image.replace(/!$/, "").replace(/^'|'$/g, "").replace(/''/g, "'");
        continue;
      }
      if (type === "Cell" && sheet.toLowerCase() === target.toLowerCase()) {
        const match = /^(\$?)([A-Za-z]+)(\$?)(\d+)$/.exec(token.image);
        if (match) {
          const moved = map2(Number(match[4]) - 1, columnIndex(match[2]));
          const text2 = moved ? `${match[1]}${columnName(moved.col)}${match[3]}${moved.row + 1}` : "#REF!";
          replacements.push({ from: token.startOffset, to: token.endOffset + 1, text: text2 });
        }
      }
      if (type !== "Cell" && type !== "Column" && type !== "Number" && type !== "Colon") sheet = owner;
      else if (tokens[index + 1]?.tokenType.name !== "Colon" && tokens[index - 1]?.tokenType.name !== "Colon") sheet = owner;
    }
    let result = source;
    for (const replacement of replacements.reverse()) result = result.slice(0, replacement.from) + replacement.text + result.slice(replacement.to);
    return "=" + result;
  }
  function renameReferences(formula, owner, oldName, newName, Parser = global.FormulaParser) {
    const source = formula.replace(/^=/, ""), parser = new Parser.DepParser();
    try {
      parser.parse(source, { row: 1, col: 1, sheet: owner }, true);
    } catch (_) {
      return formula;
    }
    const tokens = parser.parser.input.filter((token) => ["Sheet", "SheetQuoted"].includes(token.tokenType.name));
    let result = source;
    for (const token of tokens.reverse()) {
      const name = token.image.replace(/!$/, "").replace(/^'|'$/g, "").replace(/''/g, "'");
      if (name.toLowerCase() !== oldName.toLowerCase()) continue;
      result = result.slice(0, token.startOffset) + `'${newName.replace(/'/g, "''")}'!` + result.slice(token.endOffset + 1);
    }
    return "=" + result;
  }
  global.VellixTableFormulas = { createWorkbook, display, scalar, columnName, columnIndex, rewriteReferences, renameReferences };
})(globalThis);

// src/public-document.js
var documentFonts = {
  rounded: 'ui-rounded,"SF Pro Rounded","Nunito Variable",Nunito,system-ui,sans-serif',
  system: "system-ui,sans-serif",
  serif: "ui-serif,Georgia,serif",
  mono: "ui-monospace,monospace"
};
var validColor = (value) => typeof value === "string" && /^#(?:[\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i.test(value) ? value : null;
var defaults2 = (values2) => Object.fromEntries(Object.entries(values2).map(([key, value]) => [key, { default: value, rendered: false }]));
var text = (node) => node.type === "text" ? node.text || "" : (node.content || []).map(text).join(node.type === "paragraph" || node.type === "heading" ? "" : "\n");
var noOp = () => {
};
var style = (values2) => Object.entries(values2).filter(([, value]) => value != null).map(([key, value]) => `${key}:${value}`).join(";");
function tablePresentation(root) {
  const records = [], cells = /* @__PURE__ */ new Map();
  function visit(node) {
    if (node.type === "table") {
      const grid = [], widths = [], id = `reader-table-${records.length}`;
      for (const [rowIndex, row] of (node.content || []).entries()) {
        grid[rowIndex] ||= [];
        let column = 0;
        for (const cell of row.content || []) {
          while (grid[rowIndex][column]) column++;
          const attrs = cell.attrs || {}, item = { value: text(cell), format: attrs.format, formula: attrs.formula || null };
          for (let r = rowIndex; r < rowIndex + (attrs.rowspan || 1); r++) {
            grid[r] ||= [];
            for (let c = column; c < column + (attrs.colspan || 1); c++) grid[r][c] = item;
          }
          if (Array.isArray(attrs.colwidth)) attrs.colwidth.forEach((width, i) => {
            widths[column + i] = Math.max(widths[column + i] || 0, width);
          });
          cells.set(cell, { id, row: rowIndex, column });
          column += attrs.colspan || 1;
        }
      }
      node.attrs ||= {};
      node.attrs.readerWidths = Array.from({ length: Math.max(1, ...grid.map((row) => row.length)) }, (_, i) => widths[i] || 140);
      records.push({ id, name: node.attrs.name || `Table${records.length + 1}`, cells: grid });
    }
    for (const child of node.content || []) visit(child);
  }
  visit(root);
  if (!records.length) return;
  const formulas = globalThis.VellixTableFormulas, workbook = formulas.createWorkbook(records, import_fast_formula_parser.default);
  for (const [cell, position] of cells) {
    const attrs = cell.attrs || {};
    if (attrs.formula || ["number", "currency", "percent", "date"].includes(attrs.format)) {
      const value = attrs.formula ? workbook.value(position.id, position.row, position.column) : formulas.scalar(text(cell), attrs.format);
      cell.content = [{ type: "paragraph", content: [{ type: "text", text: formulas.display(value, attrs, import_fast_formula_parser.default) || " " }] }];
    }
  }
}
function publicExtensions(options) {
  const assets = new Map(options.media.map((asset) => [asset.id.toLowerCase(), asset]));
  const media = (id) => {
    if (typeof id !== "string" || !assets.has(id.toLowerCase())) throw new Error("Publication media is not in its manifest");
    return options.mediaURL(id.toLowerCase());
  };
  const icon = (name) => {
    const source = options.iconURL(name);
    return source ? ["span", { class: "reader-icon", "aria-hidden": "true", style: `--reader-icon:url(${JSON.stringify(source)})` }] : ["span", { class: "reader-emoji", "aria-hidden": "true" }, String(name || "")];
  };
  const linked = (record, attributes, children) => {
    const canFollow = options.allowFollowLinkedContent && /^[a-z0-9][a-z0-9-]{1,78}[a-z0-9]$/.test(record.targetToken || "");
    return [canFollow ? "a" : "div", { ...attributes, ...canFollow ? { href: `/p/${record.targetToken}`, "data-reader-linked": "", rel: "noreferrer" } : {} }, ...children];
  };
  const cover = (record) => {
    if (record.cover?.mediaID) return ["img", { class: "reader-entry-cover", src: media(record.cover.mediaID), alt: "", loading: "lazy", decoding: "async" }];
    if (safePhoto(record.coverPhoto?.imageURL)) return ["img", { class: "reader-entry-cover", src: safePhoto(record.coverPhoto.imageURL), alt: "", loading: "lazy", decoding: "async" }];
    if (record.coverThemeID) return ["div", { class: "reader-theme-cover", "data-cover-theme": record.coverThemeID }, ["img", { src: options.iconURL(record.coverThemeID === "neonCode" ? "codewindow" : "moonzs"), alt: "", loading: "lazy" }]];
    return null;
  };
  const propertyValue = (value, kind) => {
    if (Array.isArray(value?.chips) && value.chips.length) return value.chips.map((chip) => ["span", { class: "penned-collection-chip", style: `--chip-color:${validColor(chip.color) || "#B59AD9"}` }, chip.name]);
    if (kind === "checkbox" && typeof value?.checked === "boolean") return [icon(value.checked ? "checkwavy" : "minuswavy"), ["span", {}, value.text || (value.checked ? "Checked" : "Unchecked")]];
    if (kind === "url" && propertyURL(value?.text)) return [["a", { href: propertyURL(value.text), rel: "noopener noreferrer", target: "_blank" }, value.text]];
    return [["span", { class: value?.empty ? "reader-muted" : "" }, value?.text || "Not set"]];
  };
  const page = (record) => {
    const card = record.cardStyle;
    if (!card) return linked(record, { class: "vellix-page-reference-button reader-page", id: record.readerAnchor }, [
      ["span", { class: "reader-page-thumbnail", "aria-hidden": "true" }, ...cover(record) ? [cover(record)] : [], ["strong", {}, record.title], ["span", {}, record.excerpt || ""]],
      ["span", { class: "vellix-page-reference-text" }, ["span", { class: "vellix-page-reference-title" }, record.title], ["span", { class: "vellix-page-reference-excerpt" }, record.excerpt || ""]]
    ]);
    const sizes = { compact: [154, 90], landscape: [154, 90], portrait: [154, 162], wide: [318, 90], large: [318, 154] };
    const [width, height] = sizes[card.size] || sizes.compact;
    const photo = card.mediaID ? media(card.mediaID) : safePhoto(card.remotePhoto?.imageURL);
    const background = card.backdrop === "none" ? "transparent" : card.backdrop === "photo" && photo ? `url(${JSON.stringify(photo)}) center/cover` : card.backdrop === "gradient" ? `linear-gradient(135deg,${validColor(card.startColor)},${validColor(card.endColor)})` : validColor(card.startColor);
    const color = card.backdrop === "photo" ? "#fff" : contrastColor(card.startColor);
    const miniature = (second) => [
      "span",
      { class: `reader-card-page${second ? " is-back" : ""}`, "aria-hidden": "true", style: `color:${validColor(record.textColorHex) || "#f7f7f7"};font-family:${documentFonts[record.fontStyle] || documentFonts.rounded}` },
      ...!second && cover(record) ? [cover(record)] : [],
      ...!second ? [["strong", {}, record.title], ["span", {}, record.excerpt || ""]] : []
    ];
    const result = linked(
      record,
      {
        class: "reader-page-card",
        "data-card-size": card.size,
        "data-card-pages": String(card.showsPages),
        "data-card-width": String(width),
        style: style({ "--card-width": `${width}px`, "--card-height": `${height}px`, "aspect-ratio": `${width}/${height}`, color })
      },
      [[
        "span",
        { class: "reader-page-card-face", style: style({ background, "font-family": documentFonts[record.fontStyle] || documentFonts.rounded }) },
        ...card.showsPages ? [["span", { class: "reader-card-pages" }, ...["wide", "large"].includes(card.size) ? [miniature(true)] : [], miniature(false)]] : [],
        ["span", { class: "reader-page-card-copy" }, ["strong", {}, record.title], ["span", {}, record.excerpt || ""]]
      ]]
    );
    return ["div", { class: "reader-page-card-block", id: record.readerAnchor }, result, ...photoCredit(card.remotePhoto), ...photoCredit(record.coverPhoto)];
  };
  const collection = (record) => {
    const views = record.views?.length ? record.views : [{ ...record, key: "view-0" }];
    const active = views.find((view) => view.key === record.activeViewKey) || views[0];
    const kindIcon = (kind) => ({ table: "table", gallery: "layoutgal", kanban: "gridboard" })[kind];
    const readingIcon = (name, className = "") => ["span", { class: `penned-collection-button ${className}`, "aria-hidden": "true" }, icon(name)];
    function viewContent(view) {
      const fields = view.fields || [], entries = view.entries || [];
      const values2 = (row) => fields.filter((field) => !row.values?.[field.key]?.empty).map((field) => ["div", { class: "penned-collection-value reader-collection-value" }, ...propertyValue(row.values?.[field.key], field.kind)]);
      let content;
      if (view.kind === "table") {
        content = [
          "div",
          { class: "penned-collection-scroll reader-collection-table-scroll", tabindex: "0", role: "region", "aria-label": `${record.name}, ${view.viewName}` },
          [
            "div",
            { class: "penned-collection-table reader-collection-table", role: "table", style: `--collection-tracks:220px ${fields.map((field) => ["number", "checkbox"].includes(field.kind) ? "120px" : "180px").join(" ")} 44px` },
            [
              "div",
              { class: "penned-collection-row penned-collection-heading", role: "row" },
              ["span", { role: "columnheader" }, "Title"],
              ...fields.map((field) => ["span", { class: "penned-collection-button", role: "columnheader" }, icon(field.icon), ["span", {}, field.name]]),
              readingIcon("addwavy")
            ],
            ...entries.map((row) => [
              "div",
              { class: "penned-collection-row", role: "row" },
              linked(row, { class: "penned-collection-button penned-collection-table-title reader-collection-title", role: "cell" }, [row.title]),
              ...fields.map((field) => ["div", { class: "penned-collection-button penned-collection-value reader-collection-value", role: "cell" }, ...propertyValue(row.values?.[field.key], field.kind)]),
              readingIcon("dotswavy")
            ])
          ]
        ];
      } else if (view.kind === "kanban") {
        content = ["div", { class: "reader-kanban-layout" }, ["div", { class: "reader-kanban", role: "region", "aria-label": `${record.name}, ${view.viewName}`, tabindex: "0" }, ...(view.groups || []).map((group) => {
          const rows = entries.filter((row) => row.group === group.key);
          return [
            "details",
            { class: "reader-kanban-column", ...group.collapsed ? {} : { open: "" }, style: `--column-color:${validColor(group.color) || "#34363f"};--column-ink:${contrastColor(group.color)}` },
            ["summary", {}, icon("sf:chevron.down"), ["strong", {}, group.name], ["span", { class: "reader-column-count" }, String(rows.length)], readingIcon("sf:plus", "reader-column-add")],
            ["div", { class: "reader-kanban-entries" }, ...rows.map((row) => [
              "div",
              { class: "reader-kanban-card" },
              linked(row, { class: "reader-kanban-title" }, [["span", {}, row.title], icon("sf:chevron.right")]),
              ...(() => {
                const tags = fields.filter((field) => !row.values?.[field.key]?.empty).flatMap((field) => {
                  const value = row.values?.[field.key];
                  return (value?.chips?.length ? value.chips : [{ name: value?.text || "", color: "#87B9D5" }]).map((chip) => ["span", { class: "reader-kanban-tag", style: `--chip-color:${validColor(chip.color) || "#87B9D5"}` }, chip.name]);
                }).filter((tag) => tag[2]);
                return tags.length ? [["div", { class: "reader-kanban-values" }, ...tags]] : [];
              })()
            ]), ...rows.length ? [readingIcon("sf:plus", "reader-kanban-add")] : []]
          ];
        })], ["div", { class: "reader-kanban-footer", "aria-hidden": "true" }, ["span", {}, icon("addwavy"), "Add Column"], readingIcon("dotswavy")]];
      } else {
        content = [
          "div",
          { class: "penned-collection-gallery-scroll", tabindex: "0", role: "region", "aria-label": `${record.name}, ${view.viewName}` },
          ["div", { class: "penned-collection-gallery reader-gallery", style: `--collection-columns:${Math.min(3, Math.max(1, view.galleryColumns || 2))}` }, ...entries.map((row) => [
            "div",
            { class: "penned-collection-card reader-collection-card" },
            linked(row, { class: "penned-collection-card-open" }, [
              ...view.showsCover ? [["div", { class: "penned-collection-cover" }, cover(row) || icon("imagesign")]] : [],
              ["span", { class: "penned-collection-card-title" }, row.title]
            ]),
            ["div", { class: "penned-collection-card-values" }, ...values2(row)],
            readingIcon("dotswavy", "penned-collection-entry-actions"),
            ...photoCredit(row.coverPhoto)
          ])],
          ...!entries.length ? [["p", { class: "penned-collection-empty" }, "No entries"]] : [],
          ["div", { class: "penned-collection-footer" }, readingIcon("addwavy")]
        ];
      }
      return ["div", {
        class: `reader-collection-view${view.compactCards ? " penned-collection-compact" : ""}`,
        "data-collection-view": view.key,
        "data-view-kind": view.kind,
        "data-view-name": view.viewName,
        ...view.key === active.key ? {} : { hidden: "" }
      }, content];
    }
    return [
      "section",
      { class: "penned-collection reader-collection", id: record.readerAnchor, "data-collection-kind": active.kind, "data-active-view": active.key },
      [
        "div",
        { class: "penned-collection-header" },
        ["span", { class: "penned-collection-button penned-collection-name" }, record.name],
        [
          "details",
          { class: "reader-view-menu" },
          ["summary", { class: "penned-collection-button penned-collection-selector", "aria-label": "Collection views" }, ["span", { "data-current-view-name": "" }, active.viewName], icon("chevdown")],
          ["div", { class: "reader-view-options", role: "group", "aria-label": "Saved collection views" }, ...views.map((view) => ["button", { type: "button", "data-select-collection-view": view.key, "aria-pressed": String(view.key === active.key) }, icon(kindIcon(view.kind)), ["span", {}, view.viewName], ["span", { class: "reader-view-check", "aria-hidden": "true" }, icon("checkwavy")]])]
        ],
        readingIcon("dotswavy")
      ],
      ...views.map(viewContent)
    ];
  };
  const atoms = [
    Node.create({ name: "publishedPage", group: "block", atom: true, addAttributes: () => defaults2({ preview: null }), renderHTML: ({ node }) => page(node.attrs.preview) }),
    Node.create({ name: "publishedCollection", group: "block", atom: true, addAttributes: () => defaults2({ projection: null }), renderHTML: ({ node }) => collection(node.attrs.projection) }),
    ...["privateReference", "privateCollection"].map((name) => Node.create({
      name,
      group: "block",
      atom: true,
      renderHTML: () => ["div", { class: "reader-legacy-reference" }, icon("linedpages"), ["span", {}, name === "privateReference" ? "Linked page unavailable in this saved publication" : "Collection unavailable in this saved publication"]]
    })),
    Node.create({ name: "divider", group: "block", atom: true, addAttributes: () => defaults2({ style: "thinLine" }), renderHTML: ({ node }) => {
      const type = ["thinLine", "thickLine", "dottedCircles", "fourCircles"].includes(node.attrs.style) ? node.attrs.style : "thinLine";
      return ["div", { "data-vellix-divider": "", "data-divider-style": type, role: "separator" }, type === "fourCircles" ? ["span", { class: "vellix-divider-four-circles" }, ...Array.from({ length: 4 }, () => ["i", { class: "vellix-divider-circle" }])] : ["span", { class: type === "dottedCircles" ? "vellix-divider-dots" : "vellix-divider-line" }]];
    } }),
    Node.create({ name: "pageBreak", group: "block", atom: true, renderHTML: () => ["div", { "data-vellix-page-break": "", "aria-hidden": "true" }] }),
    Node.create({
      name: "inlineTag",
      group: "inline",
      inline: true,
      atom: true,
      addAttributes: () => defaults2({ name: "" }),
      renderHTML: ({ node }) => ["span", { class: "penned-inline-tag" }, "#" + node.attrs.name]
    }),
    Node.create({ name: "attachment", group: "block", atom: true, addAttributes: () => defaults2({ file: null, displayMode: "auto", widthPercent: null }), renderHTML: ({ node }) => {
      const file = node.attrs.file, asset = assets.get(file.mediaID.toLowerCase());
      if (!asset) throw new Error("Missing attachment descriptor");
      const url = media(asset.id), isCard = ["card", "file"].includes(node.attrs.displayMode), width = Number(node.attrs.widthPercent);
      const link = [
        "a",
        { class: "penned-file-card", href: url, target: "_blank", rel: "noopener noreferrer", "data-reader-file": "" },
        icon(file.kind === "pdf" ? "linedpages" : "pagefold"),
        ["span", { class: "penned-file-info" }, ["strong", {}, asset.name], ["small", {}, `${asset.mimeType} \xB7 ${formatBytes(asset.size)}`]]
      ];
      const attrs = { class: "penned-attachment reader-attachment", style: Number.isFinite(width) && width >= 10 && width <= 100 ? `width:${width}%` : node.attrs.displayMode === "inline" ? "width:fit-content" : "" };
      if (!isCard && asset.mimeType.startsWith("image/")) return [
        "figure",
        attrs,
        ["a", { href: url, "data-reader-image": "", "aria-label": `View ${asset.name}` }, ["img", {
          src: /heic|heif/.test(asset.mimeType) && file.previewMediaID ? media(file.previewMediaID) : url,
          alt: asset.name,
          ...file.width && file.height ? { width: file.width, height: file.height, loading: "lazy" } : { loading: "eager" },
          decoding: "async"
        }]]
      ];
      if (!isCard && /^(audio|video)\//.test(asset.mimeType)) return [
        "figure",
        attrs,
        [asset.mimeType.startsWith("audio/") ? "audio" : "video", { controls: "", preload: "metadata", playsinline: "", src: url, ...file.previewMediaID ? { poster: media(file.previewMediaID) } : {}, "aria-label": asset.name }],
        ["figcaption", {}, link]
      ];
      if (!isCard && asset.mimeType === "application/pdf") return [
        "figure",
        attrs,
        ...file.previewMediaID ? [["a", { href: url, target: "_blank", rel: "noopener noreferrer" }, ["img", { src: media(file.previewMediaID), alt: asset.name, loading: "lazy" }]]] : [],
        link
      ];
      return ["figure", attrs, link];
    } }),
    Node.create({ name: "inlineProperty", group: "block", atom: true, addAttributes: () => defaults2({ property: null }), renderHTML: ({ node }) => {
      const property = normalizeProperty(node.attrs.property), kind = PROPERTY_KINDS.find((item) => item.kind === property.kind);
      const value = {
        text: property.kind === "number" && property.value ? `${property.prefix}${property.value}${property.suffix}` : property.value,
        checked: property.kind === "checkbox" ? property.checked : void 0,
        chips: property.options.filter((option) => property.selectedOptionIDs.includes(option.id))
      };
      if (property.kind === "date" && property.value) value.text = formatDate(property.value, property.includeTime);
      return [
        "div",
        { class: "vellix-property reader-property" },
        ["div", { class: "vellix-property-name" }, icon(kind?.icon || "linedpages"), ["span", {}, property.name || kind?.title || "Property"]],
        ["div", { class: "vellix-property-value" }, ...propertyValue(value, property.kind)]
      ];
    } }),
    Node.create({ name: "templateComponent", group: "block", atom: true, addAttributes: () => defaults2({ definition: null, response: null }), renderHTML: ({ node }) => {
      const definition = componentDefinition(node.attrs.definition), response = componentResponse(definition, node.attrs.response);
      const { kind, minimum, maximum } = definition;
      const label = definition.label ? [["strong", { class: "reader-component-label" }, definition.label]] : [];
      if (kind === "slider") return [
        "section",
        { class: "penned-template-component reader-component" },
        ...label,
        ["input", { type: "range", disabled: "", min: minimum, max: maximum, step: definition.step, value: response ?? minimum, "aria-label": definition.label || "Slider" }],
        ["div", { class: "reader-slider-values" }, ["span", {}, definition.minimumLabel || String(minimum)], ["strong", {}, response == null ? "Not set" : String(response)], ["span", {}, definition.maximumLabel || String(maximum)]]
      ];
      const choices = kind === "rating" ? Array.from({ length: maximum - minimum + 1 }, (_, i) => ({ id: minimum + i, label: String(minimum + i) })) : definition.choices;
      return ["section", { class: "penned-template-component reader-component" }, ...label, ["div", { class: "penned-component-choices" }, ...choices.map((choice) => {
        const selected = Array.isArray(response) ? response.includes(choice.id) : response === choice.id;
        return ["span", { class: `penned-component-choice reader-component-choice${selected ? " is-selected" : ""}` }, ...selected ? [icon("checkwavy")] : [], choice.label];
      })]];
    } })
  ];
  const blocks = [
    ...["callout", "plainCallout", "blockquote", "toggleItem"].map((name) => Node.create({
      name,
      group: "block",
      content: "block+",
      defining: true,
      addAttributes: () => defaults2({ color: "#ffffff", icon: "sparkle", open: true }),
      renderHTML: ({ node, HTMLAttributes }) => {
        const color = validColor(node.attrs.color) || "#ffffff";
        if (name === "toggleItem") return ["div", { ...HTMLAttributes, class: "reader-toggle", "data-reader-toggle": String(node.attrs.open !== false) }, 0];
        if (name === "blockquote") return ["blockquote", { ...HTMLAttributes, "data-blockquote-color": color, style: `--vellix-blockquote-color:${color}` }, 0];
        return [
          "div",
          { ...HTMLAttributes, class: name === "callout" ? "vellix-callout" : "vellix-plain-callout", style: `--vellix-callout-color:${color}` },
          ...name === "callout" ? [["span", { class: "vellix-callout-icon-button", "aria-hidden": "true", style: `color:${color}` }, icon(node.attrs.icon)]] : [],
          ["div", { class: name === "callout" ? "vellix-callout-text" : "vellix-plain-callout-text" }, 0]
        ];
      }
    })),
    Node.create({ name: "taskList", group: "block list", content: "taskItem+", renderHTML: () => ["ul", { "data-type": "taskList" }, 0] }),
    Node.create({ name: "taskItem", content: "paragraph block*", defining: true, addAttributes: () => defaults2({ checked: false, crossed: false }), renderHTML: ({ node }) => [
      "li",
      { "data-type": "taskItem", "data-crossed": String(node.attrs.crossed) },
      [
        "label",
        { "aria-label": node.attrs.crossed ? "Skipped task" : node.attrs.checked ? "Completed task" : "Incomplete task" },
        ["input", { type: "checkbox", disabled: "", ...node.attrs.checked || node.attrs.crossed ? { checked: "" } : {} }],
        ["span", { "aria-hidden": "true" }]
      ],
      ["div", {}, 0]
    ] }),
    Node.create({
      name: "table",
      group: "block",
      content: "tableRow*",
      addAttributes: () => defaults2({ name: "Table", readerWidths: [], leftOffset: 0, stripeColor: null, columnless: false, rowless: false, rowCount: 0, columnCount: 0, headerRow: true }),
      renderHTML: ({ node }) => [
        "div",
        { class: "vellix-table-wrapper reader-table-scroll", id: node.attrs.readerAnchor, role: "region", tabindex: "0", "aria-label": node.attrs.name },
        [
          "table",
          {
            class: "vellix-table",
            style: style({ width: `${node.attrs.readerWidths.reduce((sum, width) => sum + width, 0)}px`, "margin-left": `${Math.max(0, Math.min(1e3, Number(node.attrs.leftOffset) || 0))}px`, "--vellix-table-stripe": validColor(node.attrs.stripeColor) }),
            "data-columnless": String(node.attrs.columnless),
            "data-rowless": String(node.attrs.rowless)
          },
          ["colgroup", {}, ...node.attrs.readerWidths.map((width) => ["col", { style: `width:${width}px` }])],
          ["tbody", 0]
        ]
      ]
    }),
    Node.create({ name: "tableRow", content: "(tableCell | tableHeader)+", renderHTML: () => ["tr", {}, 0] }),
    ...["tableCell", "tableHeader"].map((name) => Node.create({
      name,
      content: "block+",
      isolating: true,
      addAttributes: () => defaults2({ colspan: 1, rowspan: 1, colwidth: null, fillColor: null, textColor: null, formula: null, calculated: null, font: null, bold: null, italic: false, strike: false, code: false, align: "left", format: "text", decimals: 2, currency: "USD" }),
      renderHTML: ({ node }) => {
        const a = node.attrs;
        return [name === "tableHeader" ? "th" : "td", { colspan: a.colspan, rowspan: a.rowspan, style: style({
          "background-color": validColor(a.fillColor),
          color: validColor(a.textColor),
          "font-family": a.code ? documentFonts.mono : documentFonts[a.font],
          "font-weight": a.bold == null ? null : a.bold ? 700 : 400,
          "font-style": a.italic ? "italic" : null,
          "text-decoration": a.strike ? "line-through" : null,
          "text-align": ["left", "center", "right", "justify"].includes(a.align) ? a.align : "left"
        }) }, 0];
      }
    }))
  ];
  const global = Extension2.create({ name: "pennedReadingAttributes", addGlobalAttributes: () => [{
    types: ["paragraph", "heading", "blockquote", "callout", "plainCallout", "toggleItem", "table", "attachment", "inlineProperty", "templateComponent", "publishedPage", "publishedCollection"],
    attributes: {
      readerAnchor: { default: null, renderHTML: (attrs) => attrs.readerAnchor ? { id: attrs.readerAnchor } : {} },
      textAlign: { default: null, renderHTML: (attrs) => ["left", "center", "right", "justify"].includes(attrs.textAlign) ? { "data-vellix-align": attrs.textAlign } : {} },
      indent: { default: 0, renderHTML: (attrs) => ({ "data-vellix-indent": String(Math.min(6, Math.max(0, Number(attrs.indent) || 0))) }) }
    }
  }] });
  const textStyle = createTextColor({ ...textColorDependencies, post: noOp, snapshot: noOp, selectionActive: () => false }).mark;
  return [
    StarterKit.configure({
      document: false,
      blockquote: false,
      horizontalRule: false,
      code: false,
      undoRedo: false,
      dropcursor: false,
      gapcursor: false,
      link: { openOnClick: true, HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" } }
    }),
    Node.create({ name: "doc", topNode: true, content: "block*" }),
    Code.extend({ excludes: "" }),
    textStyle,
    global,
    ...blocks,
    ...atoms
  ];
}
function renderPublicContent(document2, options) {
  const root = structuredClone(document2.content), toc = [];
  let count = 0;
  function headings(node, depth) {
    if (++count > 2e4 || depth > 64) throw new Error("Publication content exceeds its limits");
    const section = node.type === "publishedCollection" ? node.attrs?.projection?.name : node.type === "publishedPage" ? node.attrs?.preview?.title : node.type === "table" ? node.attrs?.name : null;
    if (node.type === "heading" || typeof section === "string" && section.trim()) {
      const id = `penned-heading-${toc.length}`;
      node.attrs = { ...node.attrs, readerAnchor: id };
      if (node.type === "publishedCollection") node.attrs.projection.readerAnchor = id;
      if (node.type === "publishedPage") node.attrs.preview.readerAnchor = id;
      toc.push({ id, level: node.attrs.level || 1, text: section || text(node) });
    }
    for (const child of node.content || []) headings(child, depth + 1);
  }
  headings(root, 0);
  tablePresentation(root);
  const extensions = publicExtensions({ ...options, media: document2.media });
  getSchema(extensions).nodeFromJSON(root).check();
  const segments = [[]];
  for (const node of root.content || []) {
    if (node.type === "pageBreak") segments.push([]);
    else segments.at(-1).push(node);
  }
  return { toc, segments: segments.map((content) => generateHTML({ type: "doc", content }, extensions)) };
}
function safePhoto(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "images.unsplash.com" && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}
function photoCredit(photo) {
  if (!safePhoto(photo?.imageURL)) return [];
  const link = (label, raw) => {
    try {
      const url = new URL(raw);
      if (url.protocol === "https:" && url.hostname === "unsplash.com") return ["a", { href: url.href, rel: "noopener noreferrer", target: "_blank" }, label];
    } catch {
    }
    return ["span", {}, label];
  };
  return [["small", { class: "reader-photo-credit" }, "Photo by ", link(photo.photographer || "Photographer", photo.photographerURL), " on ", link("Unsplash", photo.sourceURL)]];
}
function contrastColor(hex) {
  const value = (validColor(hex) || "#34363f").slice(1);
  const normalized = value.length === 3 ? [...value].map((c) => c + c).join("") : value;
  const rgb = [0, 2, 4].map((i) => parseInt(normalized.slice(i, i + 2), 16));
  return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 165 ? "#181821" : "#ffffff";
}
function formatBytes(size) {
  return size < 1024 ? `${size} B` : size < 1048576 ? `${(size / 1024).toFixed(1)} KB` : `${(size / 1048576).toFixed(1)} MB`;
}
function formatDate(value, includeTime) {
  const date = new Date(value.length === 10 ? value + "T12:00:00" : value);
  return Number.isFinite(date.getTime()) ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium", ...includeTime ? { timeStyle: "short", hour12: true } : {} }).format(date) : value;
}
export {
  contrastColor,
  documentFonts,
  publicExtensions,
  renderPublicContent,
  safePhoto,
  validColor
};

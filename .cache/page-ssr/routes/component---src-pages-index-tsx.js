exports.id = "component---src-pages-index-tsx";
exports.ids = ["component---src-pages-index-tsx"];
exports.modules = {

/***/ "./node_modules/@ethersproject/abi/lib.esm/_version.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/_version.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
const version = "abi/5.6.4";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/abi-coder.js":
/*!**************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/abi-coder.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbiCoder": () => (/* binding */ AbiCoder),
/* harmony export */   "defaultAbiCoder": () => (/* binding */ defaultAbiCoder)
/* harmony export */ });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/properties */ "./node_modules/@ethersproject/properties/lib.esm/index.js");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version */ "./node_modules/@ethersproject/abi/lib.esm/_version.js");
/* harmony import */ var _coders_abstract_coder__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./coders/abstract-coder */ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js");
/* harmony import */ var _coders_address__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./coders/address */ "./node_modules/@ethersproject/abi/lib.esm/coders/address.js");
/* harmony import */ var _coders_array__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./coders/array */ "./node_modules/@ethersproject/abi/lib.esm/coders/array.js");
/* harmony import */ var _coders_boolean__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./coders/boolean */ "./node_modules/@ethersproject/abi/lib.esm/coders/boolean.js");
/* harmony import */ var _coders_bytes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./coders/bytes */ "./node_modules/@ethersproject/abi/lib.esm/coders/bytes.js");
/* harmony import */ var _coders_fixed_bytes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./coders/fixed-bytes */ "./node_modules/@ethersproject/abi/lib.esm/coders/fixed-bytes.js");
/* harmony import */ var _coders_null__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./coders/null */ "./node_modules/@ethersproject/abi/lib.esm/coders/null.js");
/* harmony import */ var _coders_number__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./coders/number */ "./node_modules/@ethersproject/abi/lib.esm/coders/number.js");
/* harmony import */ var _coders_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./coders/string */ "./node_modules/@ethersproject/abi/lib.esm/coders/string.js");
/* harmony import */ var _coders_tuple__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./coders/tuple */ "./node_modules/@ethersproject/abi/lib.esm/coders/tuple.js");
/* harmony import */ var _fragments__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./fragments */ "./node_modules/@ethersproject/abi/lib.esm/fragments.js");

// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI




const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger(_version__WEBPACK_IMPORTED_MODULE_1__.version);











const paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
const paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);
class AbiCoder {
    constructor(coerceFunc) {
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__.defineReadOnly)(this, "coerceFunc", coerceFunc || null);
    }
    _getCoder(param) {
        switch (param.baseType) {
            case "address":
                return new _coders_address__WEBPACK_IMPORTED_MODULE_3__.AddressCoder(param.name);
            case "bool":
                return new _coders_boolean__WEBPACK_IMPORTED_MODULE_4__.BooleanCoder(param.name);
            case "string":
                return new _coders_string__WEBPACK_IMPORTED_MODULE_5__.StringCoder(param.name);
            case "bytes":
                return new _coders_bytes__WEBPACK_IMPORTED_MODULE_6__.BytesCoder(param.name);
            case "array":
                return new _coders_array__WEBPACK_IMPORTED_MODULE_7__.ArrayCoder(this._getCoder(param.arrayChildren), param.arrayLength, param.name);
            case "tuple":
                return new _coders_tuple__WEBPACK_IMPORTED_MODULE_8__.TupleCoder((param.components || []).map((component) => {
                    return this._getCoder(component);
                }), param.name);
            case "":
                return new _coders_null__WEBPACK_IMPORTED_MODULE_9__.NullCoder(param.name);
        }
        // u?int[0-9]*
        let match = param.type.match(paramTypeNumber);
        if (match) {
            let size = parseInt(match[2] || "256");
            if (size === 0 || size > 256 || (size % 8) !== 0) {
                logger.throwArgumentError("invalid " + match[1] + " bit length", "param", param);
            }
            return new _coders_number__WEBPACK_IMPORTED_MODULE_10__.NumberCoder(size / 8, (match[1] === "int"), param.name);
        }
        // bytes[0-9]+
        match = param.type.match(paramTypeBytes);
        if (match) {
            let size = parseInt(match[1]);
            if (size === 0 || size > 32) {
                logger.throwArgumentError("invalid bytes length", "param", param);
            }
            return new _coders_fixed_bytes__WEBPACK_IMPORTED_MODULE_11__.FixedBytesCoder(size, param.name);
        }
        return logger.throwArgumentError("invalid type", "type", param.type);
    }
    _getWordSize() { return 32; }
    _getReader(data, allowLoose) {
        return new _coders_abstract_coder__WEBPACK_IMPORTED_MODULE_12__.Reader(data, this._getWordSize(), this.coerceFunc, allowLoose);
    }
    _getWriter() {
        return new _coders_abstract_coder__WEBPACK_IMPORTED_MODULE_12__.Writer(this._getWordSize());
    }
    getDefaultValue(types) {
        const coders = types.map((type) => this._getCoder(_fragments__WEBPACK_IMPORTED_MODULE_13__.ParamType.from(type)));
        const coder = new _coders_tuple__WEBPACK_IMPORTED_MODULE_8__.TupleCoder(coders, "_");
        return coder.defaultValue();
    }
    encode(types, values) {
        if (types.length !== values.length) {
            logger.throwError("types/values length mismatch", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.INVALID_ARGUMENT, {
                count: { types: types.length, values: values.length },
                value: { types: types, values: values }
            });
        }
        const coders = types.map((type) => this._getCoder(_fragments__WEBPACK_IMPORTED_MODULE_13__.ParamType.from(type)));
        const coder = (new _coders_tuple__WEBPACK_IMPORTED_MODULE_8__.TupleCoder(coders, "_"));
        const writer = this._getWriter();
        coder.encode(writer, values);
        return writer.data;
    }
    decode(types, data, loose) {
        const coders = types.map((type) => this._getCoder(_fragments__WEBPACK_IMPORTED_MODULE_13__.ParamType.from(type)));
        const coder = new _coders_tuple__WEBPACK_IMPORTED_MODULE_8__.TupleCoder(coders, "_");
        return coder.decode(this._getReader((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_14__.arrayify)(data), loose));
    }
}
const defaultAbiCoder = new AbiCoder();
//# sourceMappingURL=abi-coder.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Coder": () => (/* binding */ Coder),
/* harmony export */   "Reader": () => (/* binding */ Reader),
/* harmony export */   "Writer": () => (/* binding */ Writer),
/* harmony export */   "checkResultErrors": () => (/* binding */ checkResultErrors)
/* harmony export */ });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/bignumber */ "./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/properties */ "./node_modules/@ethersproject/properties/lib.esm/index.js");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version */ "./node_modules/@ethersproject/abi/lib.esm/_version.js");






const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger(_version__WEBPACK_IMPORTED_MODULE_1__.version);
function checkResultErrors(result) {
    // Find the first error (if any)
    const errors = [];
    const checkErrors = function (path, object) {
        if (!Array.isArray(object)) {
            return;
        }
        for (let key in object) {
            const childPath = path.slice();
            childPath.push(key);
            try {
                checkErrors(childPath, object[key]);
            }
            catch (error) {
                errors.push({ path: childPath, error: error });
            }
        }
    };
    checkErrors([], result);
    return errors;
}
class Coder {
    constructor(name, type, localName, dynamic) {
        // @TODO: defineReadOnly these
        this.name = name;
        this.type = type;
        this.localName = localName;
        this.dynamic = dynamic;
    }
    _throwError(message, value) {
        logger.throwArgumentError(message, this.localName, value);
    }
}
class Writer {
    constructor(wordSize) {
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__.defineReadOnly)(this, "wordSize", wordSize || 32);
        this._data = [];
        this._dataLength = 0;
        this._padding = new Uint8Array(wordSize);
    }
    get data() {
        return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__.hexConcat)(this._data);
    }
    get length() { return this._dataLength; }
    _writeData(data) {
        this._data.push(data);
        this._dataLength += data.length;
        return data.length;
    }
    appendWriter(writer) {
        return this._writeData((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__.concat)(writer._data));
    }
    // Arrayish items; padded on the right to wordSize
    writeBytes(value) {
        let bytes = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__.arrayify)(value);
        const paddingOffset = bytes.length % this.wordSize;
        if (paddingOffset) {
            bytes = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__.concat)([bytes, this._padding.slice(paddingOffset)]);
        }
        return this._writeData(bytes);
    }
    _getValue(value) {
        let bytes = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__.arrayify)(_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__.BigNumber.from(value));
        if (bytes.length > this.wordSize) {
            logger.throwError("value out-of-bounds", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.BUFFER_OVERRUN, {
                length: this.wordSize,
                offset: bytes.length
            });
        }
        if (bytes.length % this.wordSize) {
            bytes = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__.concat)([this._padding.slice(bytes.length % this.wordSize), bytes]);
        }
        return bytes;
    }
    // BigNumberish items; padded on the left to wordSize
    writeValue(value) {
        return this._writeData(this._getValue(value));
    }
    writeUpdatableValue() {
        const offset = this._data.length;
        this._data.push(this._padding);
        this._dataLength += this.wordSize;
        return (value) => {
            this._data[offset] = this._getValue(value);
        };
    }
}
class Reader {
    constructor(data, wordSize, coerceFunc, allowLoose) {
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__.defineReadOnly)(this, "_data", (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__.arrayify)(data));
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__.defineReadOnly)(this, "wordSize", wordSize || 32);
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__.defineReadOnly)(this, "_coerceFunc", coerceFunc);
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__.defineReadOnly)(this, "allowLoose", allowLoose);
        this._offset = 0;
    }
    get data() { return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__.hexlify)(this._data); }
    get consumed() { return this._offset; }
    // The default Coerce function
    static coerce(name, value) {
        let match = name.match("^u?int([0-9]+)$");
        if (match && parseInt(match[1]) <= 48) {
            value = value.toNumber();
        }
        return value;
    }
    coerce(name, value) {
        if (this._coerceFunc) {
            return this._coerceFunc(name, value);
        }
        return Reader.coerce(name, value);
    }
    _peekBytes(offset, length, loose) {
        let alignedLength = Math.ceil(length / this.wordSize) * this.wordSize;
        if (this._offset + alignedLength > this._data.length) {
            if (this.allowLoose && loose && this._offset + length <= this._data.length) {
                alignedLength = length;
            }
            else {
                logger.throwError("data out-of-bounds", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.BUFFER_OVERRUN, {
                    length: this._data.length,
                    offset: this._offset + alignedLength
                });
            }
        }
        return this._data.slice(this._offset, this._offset + alignedLength);
    }
    subReader(offset) {
        return new Reader(this._data.slice(this._offset + offset), this.wordSize, this._coerceFunc, this.allowLoose);
    }
    readBytes(length, loose) {
        let bytes = this._peekBytes(0, length, !!loose);
        this._offset += bytes.length;
        // @TODO: Make sure the length..end bytes are all 0?
        return bytes.slice(0, length);
    }
    readValue() {
        return _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__.BigNumber.from(this.readBytes(this.wordSize));
    }
}
//# sourceMappingURL=abstract-coder.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/address.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/address.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddressCoder": () => (/* binding */ AddressCoder)
/* harmony export */ });
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/address */ "./node_modules/@ethersproject/address/lib.esm/index.js");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-coder */ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js");




class AddressCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_0__.Coder {
    constructor(localName) {
        super("address", "address", localName, false);
    }
    defaultValue() {
        return "0x0000000000000000000000000000000000000000";
    }
    encode(writer, value) {
        try {
            value = (0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_1__.getAddress)(value);
        }
        catch (error) {
            this._throwError(error.message, value);
        }
        return writer.writeValue(value);
    }
    decode(reader) {
        return (0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_1__.getAddress)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.hexZeroPad)(reader.readValue().toHexString(), 20));
    }
}
//# sourceMappingURL=address.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/anonymous.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/anonymous.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnonymousCoder": () => (/* binding */ AnonymousCoder)
/* harmony export */ });
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-coder */ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js");


// Clones the functionality of an existing Coder, but without a localName
class AnonymousCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_0__.Coder {
    constructor(coder) {
        super(coder.name, coder.type, undefined, coder.dynamic);
        this.coder = coder;
    }
    defaultValue() {
        return this.coder.defaultValue();
    }
    encode(writer, value) {
        return this.coder.encode(writer, value);
    }
    decode(reader) {
        return this.coder.decode(reader);
    }
}
//# sourceMappingURL=anonymous.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/array.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/array.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrayCoder": () => (/* binding */ ArrayCoder),
/* harmony export */   "pack": () => (/* binding */ pack),
/* harmony export */   "unpack": () => (/* binding */ unpack)
/* harmony export */ });
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version */ "./node_modules/@ethersproject/abi/lib.esm/_version.js");
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract-coder */ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js");
/* harmony import */ var _anonymous__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./anonymous */ "./node_modules/@ethersproject/abi/lib.esm/coders/anonymous.js");



const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger(_version__WEBPACK_IMPORTED_MODULE_1__.version);


function pack(writer, coders, values) {
    let arrayValues = null;
    if (Array.isArray(values)) {
        arrayValues = values;
    }
    else if (values && typeof (values) === "object") {
        let unique = {};
        arrayValues = coders.map((coder) => {
            const name = coder.localName;
            if (!name) {
                logger.throwError("cannot encode object for signature with missing names", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.INVALID_ARGUMENT, {
                    argument: "values",
                    coder: coder,
                    value: values
                });
            }
            if (unique[name]) {
                logger.throwError("cannot encode object for signature with duplicate names", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.INVALID_ARGUMENT, {
                    argument: "values",
                    coder: coder,
                    value: values
                });
            }
            unique[name] = true;
            return values[name];
        });
    }
    else {
        logger.throwArgumentError("invalid tuple value", "tuple", values);
    }
    if (coders.length !== arrayValues.length) {
        logger.throwArgumentError("types/value length mismatch", "tuple", values);
    }
    let staticWriter = new _abstract_coder__WEBPACK_IMPORTED_MODULE_2__.Writer(writer.wordSize);
    let dynamicWriter = new _abstract_coder__WEBPACK_IMPORTED_MODULE_2__.Writer(writer.wordSize);
    let updateFuncs = [];
    coders.forEach((coder, index) => {
        let value = arrayValues[index];
        if (coder.dynamic) {
            // Get current dynamic offset (for the future pointer)
            let dynamicOffset = dynamicWriter.length;
            // Encode the dynamic value into the dynamicWriter
            coder.encode(dynamicWriter, value);
            // Prepare to populate the correct offset once we are done
            let updateFunc = staticWriter.writeUpdatableValue();
            updateFuncs.push((baseOffset) => {
                updateFunc(baseOffset + dynamicOffset);
            });
        }
        else {
            coder.encode(staticWriter, value);
        }
    });
    // Backfill all the dynamic offsets, now that we know the static length
    updateFuncs.forEach((func) => { func(staticWriter.length); });
    let length = writer.appendWriter(staticWriter);
    length += writer.appendWriter(dynamicWriter);
    return length;
}
function unpack(reader, coders) {
    let values = [];
    // A reader anchored to this base
    let baseReader = reader.subReader(0);
    coders.forEach((coder) => {
        let value = null;
        if (coder.dynamic) {
            let offset = reader.readValue();
            let offsetReader = baseReader.subReader(offset.toNumber());
            try {
                value = coder.decode(offsetReader);
            }
            catch (error) {
                // Cannot recover from this
                if (error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.BUFFER_OVERRUN) {
                    throw error;
                }
                value = error;
                value.baseType = coder.name;
                value.name = coder.localName;
                value.type = coder.type;
            }
        }
        else {
            try {
                value = coder.decode(reader);
            }
            catch (error) {
                // Cannot recover from this
                if (error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.BUFFER_OVERRUN) {
                    throw error;
                }
                value = error;
                value.baseType = coder.name;
                value.name = coder.localName;
                value.type = coder.type;
            }
        }
        if (value != undefined) {
            values.push(value);
        }
    });
    // We only output named properties for uniquely named coders
    const uniqueNames = coders.reduce((accum, coder) => {
        const name = coder.localName;
        if (name) {
            if (!accum[name]) {
                accum[name] = 0;
            }
            accum[name]++;
        }
        return accum;
    }, {});
    // Add any named parameters (i.e. tuples)
    coders.forEach((coder, index) => {
        let name = coder.localName;
        if (!name || uniqueNames[name] !== 1) {
            return;
        }
        if (name === "length") {
            name = "_length";
        }
        if (values[name] != null) {
            return;
        }
        const value = values[index];
        if (value instanceof Error) {
            Object.defineProperty(values, name, {
                enumerable: true,
                get: () => { throw value; }
            });
        }
        else {
            values[name] = value;
        }
    });
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value instanceof Error) {
            Object.defineProperty(values, i, {
                enumerable: true,
                get: () => { throw value; }
            });
        }
    }
    return Object.freeze(values);
}
class ArrayCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_2__.Coder {
    constructor(coder, length, localName) {
        const type = (coder.type + "[" + (length >= 0 ? length : "") + "]");
        const dynamic = (length === -1 || coder.dynamic);
        super("array", type, localName, dynamic);
        this.coder = coder;
        this.length = length;
    }
    defaultValue() {
        // Verifies the child coder is valid (even if the array is dynamic or 0-length)
        const defaultChild = this.coder.defaultValue();
        const result = [];
        for (let i = 0; i < this.length; i++) {
            result.push(defaultChild);
        }
        return result;
    }
    encode(writer, value) {
        if (!Array.isArray(value)) {
            this._throwError("expected array value", value);
        }
        let count = this.length;
        if (count === -1) {
            count = value.length;
            writer.writeValue(value.length);
        }
        logger.checkArgumentCount(value.length, count, "coder array" + (this.localName ? (" " + this.localName) : ""));
        let coders = [];
        for (let i = 0; i < value.length; i++) {
            coders.push(this.coder);
        }
        return pack(writer, coders, value);
    }
    decode(reader) {
        let count = this.length;
        if (count === -1) {
            count = reader.readValue().toNumber();
            // Check that there is *roughly* enough data to ensure
            // stray random data is not being read as a length. Each
            // slot requires at least 32 bytes for their value (or 32
            // bytes as a link to the data). This could use a much
            // tighter bound, but we are erroring on the side of safety.
            if (count * 32 > reader._data.length) {
                logger.throwError("insufficient data length", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.BUFFER_OVERRUN, {
                    length: reader._data.length,
                    count: count
                });
            }
        }
        let coders = [];
        for (let i = 0; i < count; i++) {
            coders.push(new _anonymous__WEBPACK_IMPORTED_MODULE_3__.AnonymousCoder(this.coder));
        }
        return reader.coerce(this.name, unpack(reader, coders));
    }
}
//# sourceMappingURL=array.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/boolean.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/boolean.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BooleanCoder": () => (/* binding */ BooleanCoder)
/* harmony export */ });
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-coder */ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js");


class BooleanCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_0__.Coder {
    constructor(localName) {
        super("bool", "bool", localName, false);
    }
    defaultValue() {
        return false;
    }
    encode(writer, value) {
        return writer.writeValue(value ? 1 : 0);
    }
    decode(reader) {
        return reader.coerce(this.type, !reader.readValue().isZero());
    }
}
//# sourceMappingURL=boolean.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/bytes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/bytes.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BytesCoder": () => (/* binding */ BytesCoder),
/* harmony export */   "DynamicBytesCoder": () => (/* binding */ DynamicBytesCoder)
/* harmony export */ });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-coder */ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js");



class DynamicBytesCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_0__.Coder {
    constructor(type, localName) {
        super(type, type, localName, true);
    }
    defaultValue() {
        return "0x";
    }
    encode(writer, value) {
        value = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__.arrayify)(value);
        let length = writer.writeValue(value.length);
        length += writer.writeBytes(value);
        return length;
    }
    decode(reader) {
        return reader.readBytes(reader.readValue().toNumber(), true);
    }
}
class BytesCoder extends DynamicBytesCoder {
    constructor(localName) {
        super("bytes", localName);
    }
    decode(reader) {
        return reader.coerce(this.name, (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__.hexlify)(super.decode(reader)));
    }
}
//# sourceMappingURL=bytes.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/fixed-bytes.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/fixed-bytes.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FixedBytesCoder": () => (/* binding */ FixedBytesCoder)
/* harmony export */ });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-coder */ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js");



// @TODO: Merge this with bytes
class FixedBytesCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_0__.Coder {
    constructor(size, localName) {
        let name = "bytes" + String(size);
        super(name, name, localName, false);
        this.size = size;
    }
    defaultValue() {
        return ("0x0000000000000000000000000000000000000000000000000000000000000000").substring(0, 2 + this.size * 2);
    }
    encode(writer, value) {
        let data = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__.arrayify)(value);
        if (data.length !== this.size) {
            this._throwError("incorrect data length", value);
        }
        return writer.writeBytes(data);
    }
    decode(reader) {
        return reader.coerce(this.name, (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__.hexlify)(reader.readBytes(this.size)));
    }
}
//# sourceMappingURL=fixed-bytes.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/null.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/null.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NullCoder": () => (/* binding */ NullCoder)
/* harmony export */ });
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-coder */ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js");


class NullCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_0__.Coder {
    constructor(localName) {
        super("null", "", localName, false);
    }
    defaultValue() {
        return null;
    }
    encode(writer, value) {
        if (value != null) {
            this._throwError("not null", value);
        }
        return writer.writeBytes([]);
    }
    decode(reader) {
        reader.readBytes(0);
        return reader.coerce(this.name, null);
    }
}
//# sourceMappingURL=null.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/number.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/number.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NumberCoder": () => (/* binding */ NumberCoder)
/* harmony export */ });
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bignumber */ "./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js");
/* harmony import */ var _ethersproject_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/constants */ "./node_modules/@ethersproject/constants/lib.esm/bignumbers.js");
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-coder */ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js");




class NumberCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_0__.Coder {
    constructor(size, signed, localName) {
        const name = ((signed ? "int" : "uint") + (size * 8));
        super(name, name, localName, false);
        this.size = size;
        this.signed = signed;
    }
    defaultValue() {
        return 0;
    }
    encode(writer, value) {
        let v = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_1__.BigNumber.from(value);
        // Check bounds are safe for encoding
        let maxUintValue = _ethersproject_constants__WEBPACK_IMPORTED_MODULE_2__.MaxUint256.mask(writer.wordSize * 8);
        if (this.signed) {
            let bounds = maxUintValue.mask(this.size * 8 - 1);
            if (v.gt(bounds) || v.lt(bounds.add(_ethersproject_constants__WEBPACK_IMPORTED_MODULE_2__.One).mul(_ethersproject_constants__WEBPACK_IMPORTED_MODULE_2__.NegativeOne))) {
                this._throwError("value out-of-bounds", value);
            }
        }
        else if (v.lt(_ethersproject_constants__WEBPACK_IMPORTED_MODULE_2__.Zero) || v.gt(maxUintValue.mask(this.size * 8))) {
            this._throwError("value out-of-bounds", value);
        }
        v = v.toTwos(this.size * 8).mask(this.size * 8);
        if (this.signed) {
            v = v.fromTwos(this.size * 8).toTwos(8 * writer.wordSize);
        }
        return writer.writeValue(v);
    }
    decode(reader) {
        let value = reader.readValue().mask(this.size * 8);
        if (this.signed) {
            value = value.fromTwos(this.size * 8);
        }
        return reader.coerce(this.name, value);
    }
}
//# sourceMappingURL=number.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/string.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/string.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StringCoder": () => (/* binding */ StringCoder)
/* harmony export */ });
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/strings */ "./node_modules/@ethersproject/strings/lib.esm/utf8.js");
/* harmony import */ var _bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bytes */ "./node_modules/@ethersproject/abi/lib.esm/coders/bytes.js");



class StringCoder extends _bytes__WEBPACK_IMPORTED_MODULE_0__.DynamicBytesCoder {
    constructor(localName) {
        super("string", localName);
    }
    defaultValue() {
        return "";
    }
    encode(writer, value) {
        return super.encode(writer, (0,_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__.toUtf8Bytes)(value));
    }
    decode(reader) {
        return (0,_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__.toUtf8String)(super.decode(reader));
    }
}
//# sourceMappingURL=string.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/tuple.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/coders/tuple.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TupleCoder": () => (/* binding */ TupleCoder)
/* harmony export */ });
/* harmony import */ var _abstract_coder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-coder */ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ "./node_modules/@ethersproject/abi/lib.esm/coders/array.js");



class TupleCoder extends _abstract_coder__WEBPACK_IMPORTED_MODULE_0__.Coder {
    constructor(coders, localName) {
        let dynamic = false;
        const types = [];
        coders.forEach((coder) => {
            if (coder.dynamic) {
                dynamic = true;
            }
            types.push(coder.type);
        });
        const type = ("tuple(" + types.join(",") + ")");
        super("tuple", type, localName, dynamic);
        this.coders = coders;
    }
    defaultValue() {
        const values = [];
        this.coders.forEach((coder) => {
            values.push(coder.defaultValue());
        });
        // We only output named properties for uniquely named coders
        const uniqueNames = this.coders.reduce((accum, coder) => {
            const name = coder.localName;
            if (name) {
                if (!accum[name]) {
                    accum[name] = 0;
                }
                accum[name]++;
            }
            return accum;
        }, {});
        // Add named values
        this.coders.forEach((coder, index) => {
            let name = coder.localName;
            if (!name || uniqueNames[name] !== 1) {
                return;
            }
            if (name === "length") {
                name = "_length";
            }
            if (values[name] != null) {
                return;
            }
            values[name] = values[index];
        });
        return Object.freeze(values);
    }
    encode(writer, value) {
        return (0,_array__WEBPACK_IMPORTED_MODULE_1__.pack)(writer, this.coders, value);
    }
    decode(reader) {
        return reader.coerce(this.name, (0,_array__WEBPACK_IMPORTED_MODULE_1__.unpack)(reader, this.coders));
    }
}
//# sourceMappingURL=tuple.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/fragments.js":
/*!**************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/fragments.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConstructorFragment": () => (/* binding */ ConstructorFragment),
/* harmony export */   "ErrorFragment": () => (/* binding */ ErrorFragment),
/* harmony export */   "EventFragment": () => (/* binding */ EventFragment),
/* harmony export */   "FormatTypes": () => (/* binding */ FormatTypes),
/* harmony export */   "Fragment": () => (/* binding */ Fragment),
/* harmony export */   "FunctionFragment": () => (/* binding */ FunctionFragment),
/* harmony export */   "ParamType": () => (/* binding */ ParamType)
/* harmony export */ });
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/bignumber */ "./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/properties */ "./node_modules/@ethersproject/properties/lib.esm/index.js");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version */ "./node_modules/@ethersproject/abi/lib.esm/_version.js");





const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger(_version__WEBPACK_IMPORTED_MODULE_1__.version);
;
const _constructorGuard = {};
let ModifiersBytes = { calldata: true, memory: true, storage: true };
let ModifiersNest = { calldata: true, memory: true };
function checkModifier(type, name) {
    if (type === "bytes" || type === "string") {
        if (ModifiersBytes[name]) {
            return true;
        }
    }
    else if (type === "address") {
        if (name === "payable") {
            return true;
        }
    }
    else if (type.indexOf("[") >= 0 || type === "tuple") {
        if (ModifiersNest[name]) {
            return true;
        }
    }
    if (ModifiersBytes[name] || name === "payable") {
        logger.throwArgumentError("invalid modifier", "name", name);
    }
    return false;
}
// @TODO: Make sure that children of an indexed tuple are marked with a null indexed
function parseParamType(param, allowIndexed) {
    let originalParam = param;
    function throwError(i) {
        logger.throwArgumentError(`unexpected character at position ${i}`, "param", param);
    }
    param = param.replace(/\s/g, " ");
    function newNode(parent) {
        let node = { type: "", name: "", parent: parent, state: { allowType: true } };
        if (allowIndexed) {
            node.indexed = false;
        }
        return node;
    }
    let parent = { type: "", name: "", state: { allowType: true } };
    let node = parent;
    for (let i = 0; i < param.length; i++) {
        let c = param[i];
        switch (c) {
            case "(":
                if (node.state.allowType && node.type === "") {
                    node.type = "tuple";
                }
                else if (!node.state.allowParams) {
                    throwError(i);
                }
                node.state.allowType = false;
                node.type = verifyType(node.type);
                node.components = [newNode(node)];
                node = node.components[0];
                break;
            case ")":
                delete node.state;
                if (node.name === "indexed") {
                    if (!allowIndexed) {
                        throwError(i);
                    }
                    node.indexed = true;
                    node.name = "";
                }
                if (checkModifier(node.type, node.name)) {
                    node.name = "";
                }
                node.type = verifyType(node.type);
                let child = node;
                node = node.parent;
                if (!node) {
                    throwError(i);
                }
                delete child.parent;
                node.state.allowParams = false;
                node.state.allowName = true;
                node.state.allowArray = true;
                break;
            case ",":
                delete node.state;
                if (node.name === "indexed") {
                    if (!allowIndexed) {
                        throwError(i);
                    }
                    node.indexed = true;
                    node.name = "";
                }
                if (checkModifier(node.type, node.name)) {
                    node.name = "";
                }
                node.type = verifyType(node.type);
                let sibling = newNode(node.parent);
                //{ type: "", name: "", parent: node.parent, state: { allowType: true } };
                node.parent.components.push(sibling);
                delete node.parent;
                node = sibling;
                break;
            // Hit a space...
            case " ":
                // If reading type, the type is done and may read a param or name
                if (node.state.allowType) {
                    if (node.type !== "") {
                        node.type = verifyType(node.type);
                        delete node.state.allowType;
                        node.state.allowName = true;
                        node.state.allowParams = true;
                    }
                }
                // If reading name, the name is done
                if (node.state.allowName) {
                    if (node.name !== "") {
                        if (node.name === "indexed") {
                            if (!allowIndexed) {
                                throwError(i);
                            }
                            if (node.indexed) {
                                throwError(i);
                            }
                            node.indexed = true;
                            node.name = "";
                        }
                        else if (checkModifier(node.type, node.name)) {
                            node.name = "";
                        }
                        else {
                            node.state.allowName = false;
                        }
                    }
                }
                break;
            case "[":
                if (!node.state.allowArray) {
                    throwError(i);
                }
                node.type += c;
                node.state.allowArray = false;
                node.state.allowName = false;
                node.state.readArray = true;
                break;
            case "]":
                if (!node.state.readArray) {
                    throwError(i);
                }
                node.type += c;
                node.state.readArray = false;
                node.state.allowArray = true;
                node.state.allowName = true;
                break;
            default:
                if (node.state.allowType) {
                    node.type += c;
                    node.state.allowParams = true;
                    node.state.allowArray = true;
                }
                else if (node.state.allowName) {
                    node.name += c;
                    delete node.state.allowArray;
                }
                else if (node.state.readArray) {
                    node.type += c;
                }
                else {
                    throwError(i);
                }
        }
    }
    if (node.parent) {
        logger.throwArgumentError("unexpected eof", "param", param);
    }
    delete parent.state;
    if (node.name === "indexed") {
        if (!allowIndexed) {
            throwError(originalParam.length - 7);
        }
        if (node.indexed) {
            throwError(originalParam.length - 7);
        }
        node.indexed = true;
        node.name = "";
    }
    else if (checkModifier(node.type, node.name)) {
        node.name = "";
    }
    parent.type = verifyType(parent.type);
    return parent;
}
function populate(object, params) {
    for (let key in params) {
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__.defineReadOnly)(object, key, params[key]);
    }
}
const FormatTypes = Object.freeze({
    // Bare formatting, as is needed for computing a sighash of an event or function
    sighash: "sighash",
    // Human-Readable with Minimal spacing and without names (compact human-readable)
    minimal: "minimal",
    // Human-Readable with nice spacing, including all names
    full: "full",
    // JSON-format a la Solidity
    json: "json"
});
const paramTypeArray = new RegExp(/^(.*)\[([0-9]*)\]$/);
class ParamType {
    constructor(constructorGuard, params) {
        if (constructorGuard !== _constructorGuard) {
            logger.throwError("use fromString", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "new ParamType()"
            });
        }
        populate(this, params);
        let match = this.type.match(paramTypeArray);
        if (match) {
            populate(this, {
                arrayLength: parseInt(match[2] || "-1"),
                arrayChildren: ParamType.fromObject({
                    type: match[1],
                    components: this.components
                }),
                baseType: "array"
            });
        }
        else {
            populate(this, {
                arrayLength: null,
                arrayChildren: null,
                baseType: ((this.components != null) ? "tuple" : this.type)
            });
        }
        this._isParamType = true;
        Object.freeze(this);
    }
    // Format the parameter fragment
    //   - sighash: "(uint256,address)"
    //   - minimal: "tuple(uint256,address) indexed"
    //   - full:    "tuple(uint256 foo, address bar) indexed baz"
    format(format) {
        if (!format) {
            format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
            logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
            let result = {
                type: ((this.baseType === "tuple") ? "tuple" : this.type),
                name: (this.name || undefined)
            };
            if (typeof (this.indexed) === "boolean") {
                result.indexed = this.indexed;
            }
            if (this.components) {
                result.components = this.components.map((comp) => JSON.parse(comp.format(format)));
            }
            return JSON.stringify(result);
        }
        let result = "";
        // Array
        if (this.baseType === "array") {
            result += this.arrayChildren.format(format);
            result += "[" + (this.arrayLength < 0 ? "" : String(this.arrayLength)) + "]";
        }
        else {
            if (this.baseType === "tuple") {
                if (format !== FormatTypes.sighash) {
                    result += this.type;
                }
                result += "(" + this.components.map((comp) => comp.format(format)).join((format === FormatTypes.full) ? ", " : ",") + ")";
            }
            else {
                result += this.type;
            }
        }
        if (format !== FormatTypes.sighash) {
            if (this.indexed === true) {
                result += " indexed";
            }
            if (format === FormatTypes.full && this.name) {
                result += " " + this.name;
            }
        }
        return result;
    }
    static from(value, allowIndexed) {
        if (typeof (value) === "string") {
            return ParamType.fromString(value, allowIndexed);
        }
        return ParamType.fromObject(value);
    }
    static fromObject(value) {
        if (ParamType.isParamType(value)) {
            return value;
        }
        return new ParamType(_constructorGuard, {
            name: (value.name || null),
            type: verifyType(value.type),
            indexed: ((value.indexed == null) ? null : !!value.indexed),
            components: (value.components ? value.components.map(ParamType.fromObject) : null)
        });
    }
    static fromString(value, allowIndexed) {
        function ParamTypify(node) {
            return ParamType.fromObject({
                name: node.name,
                type: node.type,
                indexed: node.indexed,
                components: node.components
            });
        }
        return ParamTypify(parseParamType(value, !!allowIndexed));
    }
    static isParamType(value) {
        return !!(value != null && value._isParamType);
    }
}
;
function parseParams(value, allowIndex) {
    return splitNesting(value).map((param) => ParamType.fromString(param, allowIndex));
}
class Fragment {
    constructor(constructorGuard, params) {
        if (constructorGuard !== _constructorGuard) {
            logger.throwError("use a static from method", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "new Fragment()"
            });
        }
        populate(this, params);
        this._isFragment = true;
        Object.freeze(this);
    }
    static from(value) {
        if (Fragment.isFragment(value)) {
            return value;
        }
        if (typeof (value) === "string") {
            return Fragment.fromString(value);
        }
        return Fragment.fromObject(value);
    }
    static fromObject(value) {
        if (Fragment.isFragment(value)) {
            return value;
        }
        switch (value.type) {
            case "function":
                return FunctionFragment.fromObject(value);
            case "event":
                return EventFragment.fromObject(value);
            case "constructor":
                return ConstructorFragment.fromObject(value);
            case "error":
                return ErrorFragment.fromObject(value);
            case "fallback":
            case "receive":
                // @TODO: Something? Maybe return a FunctionFragment? A custom DefaultFunctionFragment?
                return null;
        }
        return logger.throwArgumentError("invalid fragment object", "value", value);
    }
    static fromString(value) {
        // Make sure the "returns" is surrounded by a space and all whitespace is exactly one space
        value = value.replace(/\s/g, " ");
        value = value.replace(/\(/g, " (").replace(/\)/g, ") ").replace(/\s+/g, " ");
        value = value.trim();
        if (value.split(" ")[0] === "event") {
            return EventFragment.fromString(value.substring(5).trim());
        }
        else if (value.split(" ")[0] === "function") {
            return FunctionFragment.fromString(value.substring(8).trim());
        }
        else if (value.split("(")[0].trim() === "constructor") {
            return ConstructorFragment.fromString(value.trim());
        }
        else if (value.split(" ")[0] === "error") {
            return ErrorFragment.fromString(value.substring(5).trim());
        }
        return logger.throwArgumentError("unsupported fragment", "value", value);
    }
    static isFragment(value) {
        return !!(value && value._isFragment);
    }
}
class EventFragment extends Fragment {
    format(format) {
        if (!format) {
            format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
            logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
            return JSON.stringify({
                type: "event",
                anonymous: this.anonymous,
                name: this.name,
                inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
            });
        }
        let result = "";
        if (format !== FormatTypes.sighash) {
            result += "event ";
        }
        result += this.name + "(" + this.inputs.map((input) => input.format(format)).join((format === FormatTypes.full) ? ", " : ",") + ") ";
        if (format !== FormatTypes.sighash) {
            if (this.anonymous) {
                result += "anonymous ";
            }
        }
        return result.trim();
    }
    static from(value) {
        if (typeof (value) === "string") {
            return EventFragment.fromString(value);
        }
        return EventFragment.fromObject(value);
    }
    static fromObject(value) {
        if (EventFragment.isEventFragment(value)) {
            return value;
        }
        if (value.type !== "event") {
            logger.throwArgumentError("invalid event object", "value", value);
        }
        const params = {
            name: verifyIdentifier(value.name),
            anonymous: value.anonymous,
            inputs: (value.inputs ? value.inputs.map(ParamType.fromObject) : []),
            type: "event"
        };
        return new EventFragment(_constructorGuard, params);
    }
    static fromString(value) {
        let match = value.match(regexParen);
        if (!match) {
            logger.throwArgumentError("invalid event string", "value", value);
        }
        let anonymous = false;
        match[3].split(" ").forEach((modifier) => {
            switch (modifier.trim()) {
                case "anonymous":
                    anonymous = true;
                    break;
                case "":
                    break;
                default:
                    logger.warn("unknown modifier: " + modifier);
            }
        });
        return EventFragment.fromObject({
            name: match[1].trim(),
            anonymous: anonymous,
            inputs: parseParams(match[2], true),
            type: "event"
        });
    }
    static isEventFragment(value) {
        return (value && value._isFragment && value.type === "event");
    }
}
function parseGas(value, params) {
    params.gas = null;
    let comps = value.split("@");
    if (comps.length !== 1) {
        if (comps.length > 2) {
            logger.throwArgumentError("invalid human-readable ABI signature", "value", value);
        }
        if (!comps[1].match(/^[0-9]+$/)) {
            logger.throwArgumentError("invalid human-readable ABI signature gas", "value", value);
        }
        params.gas = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_3__.BigNumber.from(comps[1]);
        return comps[0];
    }
    return value;
}
function parseModifiers(value, params) {
    params.constant = false;
    params.payable = false;
    params.stateMutability = "nonpayable";
    value.split(" ").forEach((modifier) => {
        switch (modifier.trim()) {
            case "constant":
                params.constant = true;
                break;
            case "payable":
                params.payable = true;
                params.stateMutability = "payable";
                break;
            case "nonpayable":
                params.payable = false;
                params.stateMutability = "nonpayable";
                break;
            case "pure":
                params.constant = true;
                params.stateMutability = "pure";
                break;
            case "view":
                params.constant = true;
                params.stateMutability = "view";
                break;
            case "external":
            case "public":
            case "":
                break;
            default:
                console.log("unknown modifier: " + modifier);
        }
    });
}
function verifyState(value) {
    let result = {
        constant: false,
        payable: true,
        stateMutability: "payable"
    };
    if (value.stateMutability != null) {
        result.stateMutability = value.stateMutability;
        // Set (and check things are consistent) the constant property
        result.constant = (result.stateMutability === "view" || result.stateMutability === "pure");
        if (value.constant != null) {
            if ((!!value.constant) !== result.constant) {
                logger.throwArgumentError("cannot have constant function with mutability " + result.stateMutability, "value", value);
            }
        }
        // Set (and check things are consistent) the payable property
        result.payable = (result.stateMutability === "payable");
        if (value.payable != null) {
            if ((!!value.payable) !== result.payable) {
                logger.throwArgumentError("cannot have payable function with mutability " + result.stateMutability, "value", value);
            }
        }
    }
    else if (value.payable != null) {
        result.payable = !!value.payable;
        // If payable we can assume non-constant; otherwise we can't assume
        if (value.constant == null && !result.payable && value.type !== "constructor") {
            logger.throwArgumentError("unable to determine stateMutability", "value", value);
        }
        result.constant = !!value.constant;
        if (result.constant) {
            result.stateMutability = "view";
        }
        else {
            result.stateMutability = (result.payable ? "payable" : "nonpayable");
        }
        if (result.payable && result.constant) {
            logger.throwArgumentError("cannot have constant payable function", "value", value);
        }
    }
    else if (value.constant != null) {
        result.constant = !!value.constant;
        result.payable = !result.constant;
        result.stateMutability = (result.constant ? "view" : "payable");
    }
    else if (value.type !== "constructor") {
        logger.throwArgumentError("unable to determine stateMutability", "value", value);
    }
    return result;
}
class ConstructorFragment extends Fragment {
    format(format) {
        if (!format) {
            format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
            logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
            return JSON.stringify({
                type: "constructor",
                stateMutability: ((this.stateMutability !== "nonpayable") ? this.stateMutability : undefined),
                payable: this.payable,
                gas: (this.gas ? this.gas.toNumber() : undefined),
                inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
            });
        }
        if (format === FormatTypes.sighash) {
            logger.throwError("cannot format a constructor for sighash", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "format(sighash)"
            });
        }
        let result = "constructor(" + this.inputs.map((input) => input.format(format)).join((format === FormatTypes.full) ? ", " : ",") + ") ";
        if (this.stateMutability && this.stateMutability !== "nonpayable") {
            result += this.stateMutability + " ";
        }
        return result.trim();
    }
    static from(value) {
        if (typeof (value) === "string") {
            return ConstructorFragment.fromString(value);
        }
        return ConstructorFragment.fromObject(value);
    }
    static fromObject(value) {
        if (ConstructorFragment.isConstructorFragment(value)) {
            return value;
        }
        if (value.type !== "constructor") {
            logger.throwArgumentError("invalid constructor object", "value", value);
        }
        let state = verifyState(value);
        if (state.constant) {
            logger.throwArgumentError("constructor cannot be constant", "value", value);
        }
        const params = {
            name: null,
            type: value.type,
            inputs: (value.inputs ? value.inputs.map(ParamType.fromObject) : []),
            payable: state.payable,
            stateMutability: state.stateMutability,
            gas: (value.gas ? _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_3__.BigNumber.from(value.gas) : null)
        };
        return new ConstructorFragment(_constructorGuard, params);
    }
    static fromString(value) {
        let params = { type: "constructor" };
        value = parseGas(value, params);
        let parens = value.match(regexParen);
        if (!parens || parens[1].trim() !== "constructor") {
            logger.throwArgumentError("invalid constructor string", "value", value);
        }
        params.inputs = parseParams(parens[2].trim(), false);
        parseModifiers(parens[3].trim(), params);
        return ConstructorFragment.fromObject(params);
    }
    static isConstructorFragment(value) {
        return (value && value._isFragment && value.type === "constructor");
    }
}
class FunctionFragment extends ConstructorFragment {
    format(format) {
        if (!format) {
            format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
            logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
            return JSON.stringify({
                type: "function",
                name: this.name,
                constant: this.constant,
                stateMutability: ((this.stateMutability !== "nonpayable") ? this.stateMutability : undefined),
                payable: this.payable,
                gas: (this.gas ? this.gas.toNumber() : undefined),
                inputs: this.inputs.map((input) => JSON.parse(input.format(format))),
                outputs: this.outputs.map((output) => JSON.parse(output.format(format))),
            });
        }
        let result = "";
        if (format !== FormatTypes.sighash) {
            result += "function ";
        }
        result += this.name + "(" + this.inputs.map((input) => input.format(format)).join((format === FormatTypes.full) ? ", " : ",") + ") ";
        if (format !== FormatTypes.sighash) {
            if (this.stateMutability) {
                if (this.stateMutability !== "nonpayable") {
                    result += (this.stateMutability + " ");
                }
            }
            else if (this.constant) {
                result += "view ";
            }
            if (this.outputs && this.outputs.length) {
                result += "returns (" + this.outputs.map((output) => output.format(format)).join(", ") + ") ";
            }
            if (this.gas != null) {
                result += "@" + this.gas.toString() + " ";
            }
        }
        return result.trim();
    }
    static from(value) {
        if (typeof (value) === "string") {
            return FunctionFragment.fromString(value);
        }
        return FunctionFragment.fromObject(value);
    }
    static fromObject(value) {
        if (FunctionFragment.isFunctionFragment(value)) {
            return value;
        }
        if (value.type !== "function") {
            logger.throwArgumentError("invalid function object", "value", value);
        }
        let state = verifyState(value);
        const params = {
            type: value.type,
            name: verifyIdentifier(value.name),
            constant: state.constant,
            inputs: (value.inputs ? value.inputs.map(ParamType.fromObject) : []),
            outputs: (value.outputs ? value.outputs.map(ParamType.fromObject) : []),
            payable: state.payable,
            stateMutability: state.stateMutability,
            gas: (value.gas ? _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_3__.BigNumber.from(value.gas) : null)
        };
        return new FunctionFragment(_constructorGuard, params);
    }
    static fromString(value) {
        let params = { type: "function" };
        value = parseGas(value, params);
        let comps = value.split(" returns ");
        if (comps.length > 2) {
            logger.throwArgumentError("invalid function string", "value", value);
        }
        let parens = comps[0].match(regexParen);
        if (!parens) {
            logger.throwArgumentError("invalid function signature", "value", value);
        }
        params.name = parens[1].trim();
        if (params.name) {
            verifyIdentifier(params.name);
        }
        params.inputs = parseParams(parens[2], false);
        parseModifiers(parens[3].trim(), params);
        // We have outputs
        if (comps.length > 1) {
            let returns = comps[1].match(regexParen);
            if (returns[1].trim() != "" || returns[3].trim() != "") {
                logger.throwArgumentError("unexpected tokens", "value", value);
            }
            params.outputs = parseParams(returns[2], false);
        }
        else {
            params.outputs = [];
        }
        return FunctionFragment.fromObject(params);
    }
    static isFunctionFragment(value) {
        return (value && value._isFragment && value.type === "function");
    }
}
//export class StructFragment extends Fragment {
//}
function checkForbidden(fragment) {
    const sig = fragment.format();
    if (sig === "Error(string)" || sig === "Panic(uint256)") {
        logger.throwArgumentError(`cannot specify user defined ${sig} error`, "fragment", fragment);
    }
    return fragment;
}
class ErrorFragment extends Fragment {
    format(format) {
        if (!format) {
            format = FormatTypes.sighash;
        }
        if (!FormatTypes[format]) {
            logger.throwArgumentError("invalid format type", "format", format);
        }
        if (format === FormatTypes.json) {
            return JSON.stringify({
                type: "error",
                name: this.name,
                inputs: this.inputs.map((input) => JSON.parse(input.format(format))),
            });
        }
        let result = "";
        if (format !== FormatTypes.sighash) {
            result += "error ";
        }
        result += this.name + "(" + this.inputs.map((input) => input.format(format)).join((format === FormatTypes.full) ? ", " : ",") + ") ";
        return result.trim();
    }
    static from(value) {
        if (typeof (value) === "string") {
            return ErrorFragment.fromString(value);
        }
        return ErrorFragment.fromObject(value);
    }
    static fromObject(value) {
        if (ErrorFragment.isErrorFragment(value)) {
            return value;
        }
        if (value.type !== "error") {
            logger.throwArgumentError("invalid error object", "value", value);
        }
        const params = {
            type: value.type,
            name: verifyIdentifier(value.name),
            inputs: (value.inputs ? value.inputs.map(ParamType.fromObject) : [])
        };
        return checkForbidden(new ErrorFragment(_constructorGuard, params));
    }
    static fromString(value) {
        let params = { type: "error" };
        let parens = value.match(regexParen);
        if (!parens) {
            logger.throwArgumentError("invalid error signature", "value", value);
        }
        params.name = parens[1].trim();
        if (params.name) {
            verifyIdentifier(params.name);
        }
        params.inputs = parseParams(parens[2], false);
        return checkForbidden(ErrorFragment.fromObject(params));
    }
    static isErrorFragment(value) {
        return (value && value._isFragment && value.type === "error");
    }
}
function verifyType(type) {
    // These need to be transformed to their full description
    if (type.match(/^uint($|[^1-9])/)) {
        type = "uint256" + type.substring(4);
    }
    else if (type.match(/^int($|[^1-9])/)) {
        type = "int256" + type.substring(3);
    }
    // @TODO: more verification
    return type;
}
// See: https://github.com/ethereum/solidity/blob/1f8f1a3db93a548d0555e3e14cfc55a10e25b60e/docs/grammar/SolidityLexer.g4#L234
const regexIdentifier = new RegExp("^[a-zA-Z$_][a-zA-Z0-9$_]*$");
function verifyIdentifier(value) {
    if (!value || !value.match(regexIdentifier)) {
        logger.throwArgumentError(`invalid identifier "${value}"`, "value", value);
    }
    return value;
}
const regexParen = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
function splitNesting(value) {
    value = value.trim();
    let result = [];
    let accum = "";
    let depth = 0;
    for (let offset = 0; offset < value.length; offset++) {
        let c = value[offset];
        if (c === "," && depth === 0) {
            result.push(accum);
            accum = "";
        }
        else {
            accum += c;
            if (c === "(") {
                depth++;
            }
            else if (c === ")") {
                depth--;
                if (depth === -1) {
                    logger.throwArgumentError("unbalanced parenthesis", "value", value);
                }
            }
        }
    }
    if (accum) {
        result.push(accum);
    }
    return result;
}
//# sourceMappingURL=fragments.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbiCoder": () => (/* reexport safe */ _abi_coder__WEBPACK_IMPORTED_MODULE_1__.AbiCoder),
/* harmony export */   "ConstructorFragment": () => (/* reexport safe */ _fragments__WEBPACK_IMPORTED_MODULE_0__.ConstructorFragment),
/* harmony export */   "ErrorFragment": () => (/* reexport safe */ _fragments__WEBPACK_IMPORTED_MODULE_0__.ErrorFragment),
/* harmony export */   "EventFragment": () => (/* reexport safe */ _fragments__WEBPACK_IMPORTED_MODULE_0__.EventFragment),
/* harmony export */   "FormatTypes": () => (/* reexport safe */ _fragments__WEBPACK_IMPORTED_MODULE_0__.FormatTypes),
/* harmony export */   "Fragment": () => (/* reexport safe */ _fragments__WEBPACK_IMPORTED_MODULE_0__.Fragment),
/* harmony export */   "FunctionFragment": () => (/* reexport safe */ _fragments__WEBPACK_IMPORTED_MODULE_0__.FunctionFragment),
/* harmony export */   "Indexed": () => (/* reexport safe */ _interface__WEBPACK_IMPORTED_MODULE_2__.Indexed),
/* harmony export */   "Interface": () => (/* reexport safe */ _interface__WEBPACK_IMPORTED_MODULE_2__.Interface),
/* harmony export */   "LogDescription": () => (/* reexport safe */ _interface__WEBPACK_IMPORTED_MODULE_2__.LogDescription),
/* harmony export */   "ParamType": () => (/* reexport safe */ _fragments__WEBPACK_IMPORTED_MODULE_0__.ParamType),
/* harmony export */   "TransactionDescription": () => (/* reexport safe */ _interface__WEBPACK_IMPORTED_MODULE_2__.TransactionDescription),
/* harmony export */   "checkResultErrors": () => (/* reexport safe */ _interface__WEBPACK_IMPORTED_MODULE_3__.checkResultErrors),
/* harmony export */   "defaultAbiCoder": () => (/* reexport safe */ _abi_coder__WEBPACK_IMPORTED_MODULE_1__.defaultAbiCoder)
/* harmony export */ });
/* harmony import */ var _fragments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fragments */ "./node_modules/@ethersproject/abi/lib.esm/fragments.js");
/* harmony import */ var _abi_coder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abi-coder */ "./node_modules/@ethersproject/abi/lib.esm/abi-coder.js");
/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interface */ "./node_modules/@ethersproject/abi/lib.esm/interface.js");
/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interface */ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js");





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/abi/lib.esm/interface.js":
/*!**************************************************************!*\
  !*** ./node_modules/@ethersproject/abi/lib.esm/interface.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorDescription": () => (/* binding */ ErrorDescription),
/* harmony export */   "Indexed": () => (/* binding */ Indexed),
/* harmony export */   "Interface": () => (/* binding */ Interface),
/* harmony export */   "LogDescription": () => (/* binding */ LogDescription),
/* harmony export */   "TransactionDescription": () => (/* binding */ TransactionDescription),
/* harmony export */   "checkResultErrors": () => (/* reexport safe */ _coders_abstract_coder__WEBPACK_IMPORTED_MODULE_2__.checkResultErrors)
/* harmony export */ });
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/address */ "./node_modules/@ethersproject/address/lib.esm/index.js");
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ethersproject/bignumber */ "./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _ethersproject_hash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/hash */ "./node_modules/@ethersproject/hash/lib.esm/id.js");
/* harmony import */ var _ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ethersproject/keccak256 */ "./node_modules/@ethersproject/keccak256/lib.esm/index.js");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/properties */ "./node_modules/@ethersproject/properties/lib.esm/index.js");
/* harmony import */ var _abi_coder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./abi-coder */ "./node_modules/@ethersproject/abi/lib.esm/abi-coder.js");
/* harmony import */ var _coders_abstract_coder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coders/abstract-coder */ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js");
/* harmony import */ var _fragments__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fragments */ "./node_modules/@ethersproject/abi/lib.esm/fragments.js");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version */ "./node_modules/@ethersproject/abi/lib.esm/_version.js");












const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger(_version__WEBPACK_IMPORTED_MODULE_1__.version);

class LogDescription extends _ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.Description {
}
class TransactionDescription extends _ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.Description {
}
class ErrorDescription extends _ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.Description {
}
class Indexed extends _ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.Description {
    static isIndexed(value) {
        return !!(value && value._isIndexed);
    }
}
const BuiltinErrors = {
    "0x08c379a0": { signature: "Error(string)", name: "Error", inputs: ["string"], reason: true },
    "0x4e487b71": { signature: "Panic(uint256)", name: "Panic", inputs: ["uint256"] }
};
function wrapAccessError(property, error) {
    const wrap = new Error(`deferred error during ABI decoding triggered accessing ${property}`);
    wrap.error = error;
    return wrap;
}
/*
function checkNames(fragment: Fragment, type: "input" | "output", params: Array<ParamType>): void {
    params.reduce((accum, param) => {
        if (param.name) {
            if (accum[param.name]) {
                logger.throwArgumentError(`duplicate ${ type } parameter ${ JSON.stringify(param.name) } in ${ fragment.format("full") }`, "fragment", fragment);
            }
            accum[param.name] = true;
        }
        return accum;
    }, <{ [ name: string ]: boolean }>{ });
}
*/
class Interface {
    constructor(fragments) {
        let abi = [];
        if (typeof (fragments) === "string") {
            abi = JSON.parse(fragments);
        }
        else {
            abi = fragments;
        }
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "fragments", abi.map((fragment) => {
            return _fragments__WEBPACK_IMPORTED_MODULE_4__.Fragment.from(fragment);
        }).filter((fragment) => (fragment != null)));
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "_abiCoder", (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.getStatic)(new.target, "getAbiCoder")());
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "functions", {});
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "errors", {});
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "events", {});
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "structs", {});
        // Add all fragments by their signature
        this.fragments.forEach((fragment) => {
            let bucket = null;
            switch (fragment.type) {
                case "constructor":
                    if (this.deploy) {
                        logger.warn("duplicate definition - constructor");
                        return;
                    }
                    //checkNames(fragment, "input", fragment.inputs);
                    (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "deploy", fragment);
                    return;
                case "function":
                    //checkNames(fragment, "input", fragment.inputs);
                    //checkNames(fragment, "output", (<FunctionFragment>fragment).outputs);
                    bucket = this.functions;
                    break;
                case "event":
                    //checkNames(fragment, "input", fragment.inputs);
                    bucket = this.events;
                    break;
                case "error":
                    bucket = this.errors;
                    break;
                default:
                    return;
            }
            let signature = fragment.format();
            if (bucket[signature]) {
                logger.warn("duplicate definition - " + signature);
                return;
            }
            bucket[signature] = fragment;
        });
        // If we do not have a constructor add a default
        if (!this.deploy) {
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "deploy", _fragments__WEBPACK_IMPORTED_MODULE_4__.ConstructorFragment.from({
                payable: false,
                type: "constructor"
            }));
        }
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "_isInterface", true);
    }
    format(format) {
        if (!format) {
            format = _fragments__WEBPACK_IMPORTED_MODULE_4__.FormatTypes.full;
        }
        if (format === _fragments__WEBPACK_IMPORTED_MODULE_4__.FormatTypes.sighash) {
            logger.throwArgumentError("interface does not support formatting sighash", "format", format);
        }
        const abi = this.fragments.map((fragment) => fragment.format(format));
        // We need to re-bundle the JSON fragments a bit
        if (format === _fragments__WEBPACK_IMPORTED_MODULE_4__.FormatTypes.json) {
            return JSON.stringify(abi.map((j) => JSON.parse(j)));
        }
        return abi;
    }
    // Sub-classes can override these to handle other blockchains
    static getAbiCoder() {
        return _abi_coder__WEBPACK_IMPORTED_MODULE_5__.defaultAbiCoder;
    }
    static getAddress(address) {
        return (0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_6__.getAddress)(address);
    }
    static getSighash(fragment) {
        return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.hexDataSlice)((0,_ethersproject_hash__WEBPACK_IMPORTED_MODULE_8__.id)(fragment.format()), 0, 4);
    }
    static getEventTopic(eventFragment) {
        return (0,_ethersproject_hash__WEBPACK_IMPORTED_MODULE_8__.id)(eventFragment.format());
    }
    // Find a function definition by any means necessary (unless it is ambiguous)
    getFunction(nameOrSignatureOrSighash) {
        if ((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.isHexString)(nameOrSignatureOrSighash)) {
            for (const name in this.functions) {
                if (nameOrSignatureOrSighash === this.getSighash(name)) {
                    return this.functions[name];
                }
            }
            logger.throwArgumentError("no matching function", "sighash", nameOrSignatureOrSighash);
        }
        // It is a bare name, look up the function (will return null if ambiguous)
        if (nameOrSignatureOrSighash.indexOf("(") === -1) {
            const name = nameOrSignatureOrSighash.trim();
            const matching = Object.keys(this.functions).filter((f) => (f.split("(" /* fix:) */)[0] === name));
            if (matching.length === 0) {
                logger.throwArgumentError("no matching function", "name", name);
            }
            else if (matching.length > 1) {
                logger.throwArgumentError("multiple matching functions", "name", name);
            }
            return this.functions[matching[0]];
        }
        // Normalize the signature and lookup the function
        const result = this.functions[_fragments__WEBPACK_IMPORTED_MODULE_4__.FunctionFragment.fromString(nameOrSignatureOrSighash).format()];
        if (!result) {
            logger.throwArgumentError("no matching function", "signature", nameOrSignatureOrSighash);
        }
        return result;
    }
    // Find an event definition by any means necessary (unless it is ambiguous)
    getEvent(nameOrSignatureOrTopic) {
        if ((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.isHexString)(nameOrSignatureOrTopic)) {
            const topichash = nameOrSignatureOrTopic.toLowerCase();
            for (const name in this.events) {
                if (topichash === this.getEventTopic(name)) {
                    return this.events[name];
                }
            }
            logger.throwArgumentError("no matching event", "topichash", topichash);
        }
        // It is a bare name, look up the function (will return null if ambiguous)
        if (nameOrSignatureOrTopic.indexOf("(") === -1) {
            const name = nameOrSignatureOrTopic.trim();
            const matching = Object.keys(this.events).filter((f) => (f.split("(" /* fix:) */)[0] === name));
            if (matching.length === 0) {
                logger.throwArgumentError("no matching event", "name", name);
            }
            else if (matching.length > 1) {
                logger.throwArgumentError("multiple matching events", "name", name);
            }
            return this.events[matching[0]];
        }
        // Normalize the signature and lookup the function
        const result = this.events[_fragments__WEBPACK_IMPORTED_MODULE_4__.EventFragment.fromString(nameOrSignatureOrTopic).format()];
        if (!result) {
            logger.throwArgumentError("no matching event", "signature", nameOrSignatureOrTopic);
        }
        return result;
    }
    // Find a function definition by any means necessary (unless it is ambiguous)
    getError(nameOrSignatureOrSighash) {
        if ((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.isHexString)(nameOrSignatureOrSighash)) {
            const getSighash = (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.getStatic)(this.constructor, "getSighash");
            for (const name in this.errors) {
                const error = this.errors[name];
                if (nameOrSignatureOrSighash === getSighash(error)) {
                    return this.errors[name];
                }
            }
            logger.throwArgumentError("no matching error", "sighash", nameOrSignatureOrSighash);
        }
        // It is a bare name, look up the function (will return null if ambiguous)
        if (nameOrSignatureOrSighash.indexOf("(") === -1) {
            const name = nameOrSignatureOrSighash.trim();
            const matching = Object.keys(this.errors).filter((f) => (f.split("(" /* fix:) */)[0] === name));
            if (matching.length === 0) {
                logger.throwArgumentError("no matching error", "name", name);
            }
            else if (matching.length > 1) {
                logger.throwArgumentError("multiple matching errors", "name", name);
            }
            return this.errors[matching[0]];
        }
        // Normalize the signature and lookup the function
        const result = this.errors[_fragments__WEBPACK_IMPORTED_MODULE_4__.FunctionFragment.fromString(nameOrSignatureOrSighash).format()];
        if (!result) {
            logger.throwArgumentError("no matching error", "signature", nameOrSignatureOrSighash);
        }
        return result;
    }
    // Get the sighash (the bytes4 selector) used by Solidity to identify a function
    getSighash(fragment) {
        if (typeof (fragment) === "string") {
            try {
                fragment = this.getFunction(fragment);
            }
            catch (error) {
                try {
                    fragment = this.getError(fragment);
                }
                catch (_) {
                    throw error;
                }
            }
        }
        return (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.getStatic)(this.constructor, "getSighash")(fragment);
    }
    // Get the topic (the bytes32 hash) used by Solidity to identify an event
    getEventTopic(eventFragment) {
        if (typeof (eventFragment) === "string") {
            eventFragment = this.getEvent(eventFragment);
        }
        return (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.getStatic)(this.constructor, "getEventTopic")(eventFragment);
    }
    _decodeParams(params, data) {
        return this._abiCoder.decode(params, data);
    }
    _encodeParams(params, values) {
        return this._abiCoder.encode(params, values);
    }
    encodeDeploy(values) {
        return this._encodeParams(this.deploy.inputs, values || []);
    }
    decodeErrorResult(fragment, data) {
        if (typeof (fragment) === "string") {
            fragment = this.getError(fragment);
        }
        const bytes = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.arrayify)(data);
        if ((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.hexlify)(bytes.slice(0, 4)) !== this.getSighash(fragment)) {
            logger.throwArgumentError(`data signature does not match error ${fragment.name}.`, "data", (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.hexlify)(bytes));
        }
        return this._decodeParams(fragment.inputs, bytes.slice(4));
    }
    encodeErrorResult(fragment, values) {
        if (typeof (fragment) === "string") {
            fragment = this.getError(fragment);
        }
        return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.hexlify)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.concat)([
            this.getSighash(fragment),
            this._encodeParams(fragment.inputs, values || [])
        ]));
    }
    // Decode the data for a function call (e.g. tx.data)
    decodeFunctionData(functionFragment, data) {
        if (typeof (functionFragment) === "string") {
            functionFragment = this.getFunction(functionFragment);
        }
        const bytes = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.arrayify)(data);
        if ((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.hexlify)(bytes.slice(0, 4)) !== this.getSighash(functionFragment)) {
            logger.throwArgumentError(`data signature does not match function ${functionFragment.name}.`, "data", (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.hexlify)(bytes));
        }
        return this._decodeParams(functionFragment.inputs, bytes.slice(4));
    }
    // Encode the data for a function call (e.g. tx.data)
    encodeFunctionData(functionFragment, values) {
        if (typeof (functionFragment) === "string") {
            functionFragment = this.getFunction(functionFragment);
        }
        return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.hexlify)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.concat)([
            this.getSighash(functionFragment),
            this._encodeParams(functionFragment.inputs, values || [])
        ]));
    }
    // Decode the result from a function call (e.g. from eth_call)
    decodeFunctionResult(functionFragment, data) {
        if (typeof (functionFragment) === "string") {
            functionFragment = this.getFunction(functionFragment);
        }
        let bytes = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.arrayify)(data);
        let reason = null;
        let message = "";
        let errorArgs = null;
        let errorName = null;
        let errorSignature = null;
        switch (bytes.length % this._abiCoder._getWordSize()) {
            case 0:
                try {
                    return this._abiCoder.decode(functionFragment.outputs, bytes);
                }
                catch (error) { }
                break;
            case 4: {
                const selector = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.hexlify)(bytes.slice(0, 4));
                const builtin = BuiltinErrors[selector];
                if (builtin) {
                    errorArgs = this._abiCoder.decode(builtin.inputs, bytes.slice(4));
                    errorName = builtin.name;
                    errorSignature = builtin.signature;
                    if (builtin.reason) {
                        reason = errorArgs[0];
                    }
                    if (errorName === "Error") {
                        message = `; VM Exception while processing transaction: reverted with reason string ${JSON.stringify(errorArgs[0])}`;
                    }
                    else if (errorName === "Panic") {
                        message = `; VM Exception while processing transaction: reverted with panic code ${errorArgs[0]}`;
                    }
                }
                else {
                    try {
                        const error = this.getError(selector);
                        errorArgs = this._abiCoder.decode(error.inputs, bytes.slice(4));
                        errorName = error.name;
                        errorSignature = error.format();
                    }
                    catch (error) { }
                }
                break;
            }
        }
        return logger.throwError("call revert exception" + message, _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.CALL_EXCEPTION, {
            method: functionFragment.format(),
            data: (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.hexlify)(data), errorArgs, errorName, errorSignature, reason
        });
    }
    // Encode the result for a function call (e.g. for eth_call)
    encodeFunctionResult(functionFragment, values) {
        if (typeof (functionFragment) === "string") {
            functionFragment = this.getFunction(functionFragment);
        }
        return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.hexlify)(this._abiCoder.encode(functionFragment.outputs, values || []));
    }
    // Create the filter for the event with search criteria (e.g. for eth_filterLog)
    encodeFilterTopics(eventFragment, values) {
        if (typeof (eventFragment) === "string") {
            eventFragment = this.getEvent(eventFragment);
        }
        if (values.length > eventFragment.inputs.length) {
            logger.throwError("too many arguments for " + eventFragment.format(), _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNEXPECTED_ARGUMENT, {
                argument: "values",
                value: values
            });
        }
        let topics = [];
        if (!eventFragment.anonymous) {
            topics.push(this.getEventTopic(eventFragment));
        }
        const encodeTopic = (param, value) => {
            if (param.type === "string") {
                return (0,_ethersproject_hash__WEBPACK_IMPORTED_MODULE_8__.id)(value);
            }
            else if (param.type === "bytes") {
                return (0,_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_9__.keccak256)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.hexlify)(value));
            }
            if (param.type === "bool" && typeof (value) === "boolean") {
                value = (value ? "0x01" : "0x00");
            }
            if (param.type.match(/^u?int/)) {
                value = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_10__.BigNumber.from(value).toHexString();
            }
            // Check addresses are valid
            if (param.type === "address") {
                this._abiCoder.encode(["address"], [value]);
            }
            return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.hexZeroPad)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.hexlify)(value), 32);
        };
        values.forEach((value, index) => {
            let param = eventFragment.inputs[index];
            if (!param.indexed) {
                if (value != null) {
                    logger.throwArgumentError("cannot filter non-indexed parameters; must be null", ("contract." + param.name), value);
                }
                return;
            }
            if (value == null) {
                topics.push(null);
            }
            else if (param.baseType === "array" || param.baseType === "tuple") {
                logger.throwArgumentError("filtering with tuples or arrays not supported", ("contract." + param.name), value);
            }
            else if (Array.isArray(value)) {
                topics.push(value.map((value) => encodeTopic(param, value)));
            }
            else {
                topics.push(encodeTopic(param, value));
            }
        });
        // Trim off trailing nulls
        while (topics.length && topics[topics.length - 1] === null) {
            topics.pop();
        }
        return topics;
    }
    encodeEventLog(eventFragment, values) {
        if (typeof (eventFragment) === "string") {
            eventFragment = this.getEvent(eventFragment);
        }
        const topics = [];
        const dataTypes = [];
        const dataValues = [];
        if (!eventFragment.anonymous) {
            topics.push(this.getEventTopic(eventFragment));
        }
        if (values.length !== eventFragment.inputs.length) {
            logger.throwArgumentError("event arguments/values mismatch", "values", values);
        }
        eventFragment.inputs.forEach((param, index) => {
            const value = values[index];
            if (param.indexed) {
                if (param.type === "string") {
                    topics.push((0,_ethersproject_hash__WEBPACK_IMPORTED_MODULE_8__.id)(value));
                }
                else if (param.type === "bytes") {
                    topics.push((0,_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_9__.keccak256)(value));
                }
                else if (param.baseType === "tuple" || param.baseType === "array") {
                    // @TODO
                    throw new Error("not implemented");
                }
                else {
                    topics.push(this._abiCoder.encode([param.type], [value]));
                }
            }
            else {
                dataTypes.push(param);
                dataValues.push(value);
            }
        });
        return {
            data: this._abiCoder.encode(dataTypes, dataValues),
            topics: topics
        };
    }
    // Decode a filter for the event and the search criteria
    decodeEventLog(eventFragment, data, topics) {
        if (typeof (eventFragment) === "string") {
            eventFragment = this.getEvent(eventFragment);
        }
        if (topics != null && !eventFragment.anonymous) {
            let topicHash = this.getEventTopic(eventFragment);
            if (!(0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.isHexString)(topics[0], 32) || topics[0].toLowerCase() !== topicHash) {
                logger.throwError("fragment/topic mismatch", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.INVALID_ARGUMENT, { argument: "topics[0]", expected: topicHash, value: topics[0] });
            }
            topics = topics.slice(1);
        }
        let indexed = [];
        let nonIndexed = [];
        let dynamic = [];
        eventFragment.inputs.forEach((param, index) => {
            if (param.indexed) {
                if (param.type === "string" || param.type === "bytes" || param.baseType === "tuple" || param.baseType === "array") {
                    indexed.push(_fragments__WEBPACK_IMPORTED_MODULE_4__.ParamType.fromObject({ type: "bytes32", name: param.name }));
                    dynamic.push(true);
                }
                else {
                    indexed.push(param);
                    dynamic.push(false);
                }
            }
            else {
                nonIndexed.push(param);
                dynamic.push(false);
            }
        });
        let resultIndexed = (topics != null) ? this._abiCoder.decode(indexed, (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.concat)(topics)) : null;
        let resultNonIndexed = this._abiCoder.decode(nonIndexed, data, true);
        let result = [];
        let nonIndexedIndex = 0, indexedIndex = 0;
        eventFragment.inputs.forEach((param, index) => {
            if (param.indexed) {
                if (resultIndexed == null) {
                    result[index] = new Indexed({ _isIndexed: true, hash: null });
                }
                else if (dynamic[index]) {
                    result[index] = new Indexed({ _isIndexed: true, hash: resultIndexed[indexedIndex++] });
                }
                else {
                    try {
                        result[index] = resultIndexed[indexedIndex++];
                    }
                    catch (error) {
                        result[index] = error;
                    }
                }
            }
            else {
                try {
                    result[index] = resultNonIndexed[nonIndexedIndex++];
                }
                catch (error) {
                    result[index] = error;
                }
            }
            // Add the keyword argument if named and safe
            if (param.name && result[param.name] == null) {
                const value = result[index];
                // Make error named values throw on access
                if (value instanceof Error) {
                    Object.defineProperty(result, param.name, {
                        enumerable: true,
                        get: () => { throw wrapAccessError(`property ${JSON.stringify(param.name)}`, value); }
                    });
                }
                else {
                    result[param.name] = value;
                }
            }
        });
        // Make all error indexed values throw on access
        for (let i = 0; i < result.length; i++) {
            const value = result[i];
            if (value instanceof Error) {
                Object.defineProperty(result, i, {
                    enumerable: true,
                    get: () => { throw wrapAccessError(`index ${i}`, value); }
                });
            }
        }
        return Object.freeze(result);
    }
    // Given a transaction, find the matching function fragment (if any) and
    // determine all its properties and call parameters
    parseTransaction(tx) {
        let fragment = this.getFunction(tx.data.substring(0, 10).toLowerCase());
        if (!fragment) {
            return null;
        }
        return new TransactionDescription({
            args: this._abiCoder.decode(fragment.inputs, "0x" + tx.data.substring(10)),
            functionFragment: fragment,
            name: fragment.name,
            signature: fragment.format(),
            sighash: this.getSighash(fragment),
            value: _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_10__.BigNumber.from(tx.value || "0"),
        });
    }
    // @TODO
    //parseCallResult(data: BytesLike): ??
    // Given an event log, find the matching event fragment (if any) and
    // determine all its properties and values
    parseLog(log) {
        let fragment = this.getEvent(log.topics[0]);
        if (!fragment || fragment.anonymous) {
            return null;
        }
        // @TODO: If anonymous, and the only method, and the input count matches, should we parse?
        //        Probably not, because just because it is the only event in the ABI does
        //        not mean we have the full ABI; maybe just a fragment?
        return new LogDescription({
            eventFragment: fragment,
            name: fragment.name,
            signature: fragment.format(),
            topic: this.getEventTopic(fragment),
            args: this.decodeEventLog(fragment, log.data, log.topics)
        });
    }
    parseError(data) {
        const hexData = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_7__.hexlify)(data);
        let fragment = this.getError(hexData.substring(0, 10).toLowerCase());
        if (!fragment) {
            return null;
        }
        return new ErrorDescription({
            args: this._abiCoder.decode(fragment.inputs, "0x" + hexData.substring(10)),
            errorFragment: fragment,
            name: fragment.name,
            signature: fragment.format(),
            sighash: this.getSighash(fragment),
        });
    }
    /*
    static from(value: Array<Fragment | string | JsonAbi> | string | Interface) {
        if (Interface.isInterface(value)) {
            return value;
        }
        if (typeof(value) === "string") {
            return new Interface(JSON.parse(value));
        }
        return new Interface(value);
    }
    */
    static isInterface(value) {
        return !!(value && value._isInterface);
    }
}
//# sourceMappingURL=interface.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/base64/lib.esm/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ethersproject/base64/lib.esm/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* reexport safe */ _base64__WEBPACK_IMPORTED_MODULE_0__.decode),
/* harmony export */   "encode": () => (/* reexport safe */ _base64__WEBPACK_IMPORTED_MODULE_0__.encode)
/* harmony export */ });
/* harmony import */ var _base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base64 */ "./node_modules/@ethersproject/base64/lib.esm/base64.js");


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/bignumber/lib.esm/fixednumber.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@ethersproject/bignumber/lib.esm/fixednumber.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FixedFormat": () => (/* binding */ FixedFormat),
/* harmony export */   "FixedNumber": () => (/* binding */ FixedNumber),
/* harmony export */   "formatFixed": () => (/* binding */ formatFixed),
/* harmony export */   "parseFixed": () => (/* binding */ parseFixed)
/* harmony export */ });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version */ "./node_modules/@ethersproject/bignumber/lib.esm/_version.js");
/* harmony import */ var _bignumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bignumber */ "./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js");




const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger(_version__WEBPACK_IMPORTED_MODULE_1__.version);

const _constructorGuard = {};
const Zero = _bignumber__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(0);
const NegativeOne = _bignumber__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(-1);
function throwFault(message, fault, operation, value) {
    const params = { fault: fault, operation: operation };
    if (value !== undefined) {
        params.value = value;
    }
    return logger.throwError(message, _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.NUMERIC_FAULT, params);
}
// Constant to pull zeros from for multipliers
let zeros = "0";
while (zeros.length < 256) {
    zeros += zeros;
}
// Returns a string "1" followed by decimal "0"s
function getMultiplier(decimals) {
    if (typeof (decimals) !== "number") {
        try {
            decimals = _bignumber__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(decimals).toNumber();
        }
        catch (e) { }
    }
    if (typeof (decimals) === "number" && decimals >= 0 && decimals <= 256 && !(decimals % 1)) {
        return ("1" + zeros.substring(0, decimals));
    }
    return logger.throwArgumentError("invalid decimal size", "decimals", decimals);
}
function formatFixed(value, decimals) {
    if (decimals == null) {
        decimals = 0;
    }
    const multiplier = getMultiplier(decimals);
    // Make sure wei is a big number (convert as necessary)
    value = _bignumber__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(value);
    const negative = value.lt(Zero);
    if (negative) {
        value = value.mul(NegativeOne);
    }
    let fraction = value.mod(multiplier).toString();
    while (fraction.length < multiplier.length - 1) {
        fraction = "0" + fraction;
    }
    // Strip training 0
    fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
    const whole = value.div(multiplier).toString();
    if (multiplier.length === 1) {
        value = whole;
    }
    else {
        value = whole + "." + fraction;
    }
    if (negative) {
        value = "-" + value;
    }
    return value;
}
function parseFixed(value, decimals) {
    if (decimals == null) {
        decimals = 0;
    }
    const multiplier = getMultiplier(decimals);
    if (typeof (value) !== "string" || !value.match(/^-?[0-9.]+$/)) {
        logger.throwArgumentError("invalid decimal value", "value", value);
    }
    // Is it negative?
    const negative = (value.substring(0, 1) === "-");
    if (negative) {
        value = value.substring(1);
    }
    if (value === ".") {
        logger.throwArgumentError("missing value", "value", value);
    }
    // Split it into a whole and fractional part
    const comps = value.split(".");
    if (comps.length > 2) {
        logger.throwArgumentError("too many decimal points", "value", value);
    }
    let whole = comps[0], fraction = comps[1];
    if (!whole) {
        whole = "0";
    }
    if (!fraction) {
        fraction = "0";
    }
    // Trim trailing zeros
    while (fraction[fraction.length - 1] === "0") {
        fraction = fraction.substring(0, fraction.length - 1);
    }
    // Check the fraction doesn't exceed our decimals size
    if (fraction.length > multiplier.length - 1) {
        throwFault("fractional component exceeds decimals", "underflow", "parseFixed");
    }
    // If decimals is 0, we have an empty string for fraction
    if (fraction === "") {
        fraction = "0";
    }
    // Fully pad the string with zeros to get to wei
    while (fraction.length < multiplier.length - 1) {
        fraction += "0";
    }
    const wholeValue = _bignumber__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(whole);
    const fractionValue = _bignumber__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(fraction);
    let wei = (wholeValue.mul(multiplier)).add(fractionValue);
    if (negative) {
        wei = wei.mul(NegativeOne);
    }
    return wei;
}
class FixedFormat {
    constructor(constructorGuard, signed, width, decimals) {
        if (constructorGuard !== _constructorGuard) {
            logger.throwError("cannot use FixedFormat constructor; use FixedFormat.from", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "new FixedFormat"
            });
        }
        this.signed = signed;
        this.width = width;
        this.decimals = decimals;
        this.name = (signed ? "" : "u") + "fixed" + String(width) + "x" + String(decimals);
        this._multiplier = getMultiplier(decimals);
        Object.freeze(this);
    }
    static from(value) {
        if (value instanceof FixedFormat) {
            return value;
        }
        if (typeof (value) === "number") {
            value = `fixed128x${value}`;
        }
        let signed = true;
        let width = 128;
        let decimals = 18;
        if (typeof (value) === "string") {
            if (value === "fixed") {
                // defaults...
            }
            else if (value === "ufixed") {
                signed = false;
            }
            else {
                const match = value.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
                if (!match) {
                    logger.throwArgumentError("invalid fixed format", "format", value);
                }
                signed = (match[1] !== "u");
                width = parseInt(match[2]);
                decimals = parseInt(match[3]);
            }
        }
        else if (value) {
            const check = (key, type, defaultValue) => {
                if (value[key] == null) {
                    return defaultValue;
                }
                if (typeof (value[key]) !== type) {
                    logger.throwArgumentError("invalid fixed format (" + key + " not " + type + ")", "format." + key, value[key]);
                }
                return value[key];
            };
            signed = check("signed", "boolean", signed);
            width = check("width", "number", width);
            decimals = check("decimals", "number", decimals);
        }
        if (width % 8) {
            logger.throwArgumentError("invalid fixed format width (not byte aligned)", "format.width", width);
        }
        if (decimals > 80) {
            logger.throwArgumentError("invalid fixed format (decimals too large)", "format.decimals", decimals);
        }
        return new FixedFormat(_constructorGuard, signed, width, decimals);
    }
}
class FixedNumber {
    constructor(constructorGuard, hex, value, format) {
        if (constructorGuard !== _constructorGuard) {
            logger.throwError("cannot use FixedNumber constructor; use FixedNumber.from", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "new FixedFormat"
            });
        }
        this.format = format;
        this._hex = hex;
        this._value = value;
        this._isFixedNumber = true;
        Object.freeze(this);
    }
    _checkFormat(other) {
        if (this.format.name !== other.format.name) {
            logger.throwArgumentError("incompatible format; use fixedNumber.toFormat", "other", other);
        }
    }
    addUnsafe(other) {
        this._checkFormat(other);
        const a = parseFixed(this._value, this.format.decimals);
        const b = parseFixed(other._value, other.format.decimals);
        return FixedNumber.fromValue(a.add(b), this.format.decimals, this.format);
    }
    subUnsafe(other) {
        this._checkFormat(other);
        const a = parseFixed(this._value, this.format.decimals);
        const b = parseFixed(other._value, other.format.decimals);
        return FixedNumber.fromValue(a.sub(b), this.format.decimals, this.format);
    }
    mulUnsafe(other) {
        this._checkFormat(other);
        const a = parseFixed(this._value, this.format.decimals);
        const b = parseFixed(other._value, other.format.decimals);
        return FixedNumber.fromValue(a.mul(b).div(this.format._multiplier), this.format.decimals, this.format);
    }
    divUnsafe(other) {
        this._checkFormat(other);
        const a = parseFixed(this._value, this.format.decimals);
        const b = parseFixed(other._value, other.format.decimals);
        return FixedNumber.fromValue(a.mul(this.format._multiplier).div(b), this.format.decimals, this.format);
    }
    floor() {
        const comps = this.toString().split(".");
        if (comps.length === 1) {
            comps.push("0");
        }
        let result = FixedNumber.from(comps[0], this.format);
        const hasFraction = !comps[1].match(/^(0*)$/);
        if (this.isNegative() && hasFraction) {
            result = result.subUnsafe(ONE.toFormat(result.format));
        }
        return result;
    }
    ceiling() {
        const comps = this.toString().split(".");
        if (comps.length === 1) {
            comps.push("0");
        }
        let result = FixedNumber.from(comps[0], this.format);
        const hasFraction = !comps[1].match(/^(0*)$/);
        if (!this.isNegative() && hasFraction) {
            result = result.addUnsafe(ONE.toFormat(result.format));
        }
        return result;
    }
    // @TODO: Support other rounding algorithms
    round(decimals) {
        if (decimals == null) {
            decimals = 0;
        }
        // If we are already in range, we're done
        const comps = this.toString().split(".");
        if (comps.length === 1) {
            comps.push("0");
        }
        if (decimals < 0 || decimals > 80 || (decimals % 1)) {
            logger.throwArgumentError("invalid decimal count", "decimals", decimals);
        }
        if (comps[1].length <= decimals) {
            return this;
        }
        const factor = FixedNumber.from("1" + zeros.substring(0, decimals), this.format);
        const bump = BUMP.toFormat(this.format);
        return this.mulUnsafe(factor).addUnsafe(bump).floor().divUnsafe(factor);
    }
    isZero() {
        return (this._value === "0.0" || this._value === "0");
    }
    isNegative() {
        return (this._value[0] === "-");
    }
    toString() { return this._value; }
    toHexString(width) {
        if (width == null) {
            return this._hex;
        }
        if (width % 8) {
            logger.throwArgumentError("invalid byte width", "width", width);
        }
        const hex = _bignumber__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(this._hex).fromTwos(this.format.width).toTwos(width).toHexString();
        return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__.hexZeroPad)(hex, width / 8);
    }
    toUnsafeFloat() { return parseFloat(this.toString()); }
    toFormat(format) {
        return FixedNumber.fromString(this._value, format);
    }
    static fromValue(value, decimals, format) {
        // If decimals looks more like a format, and there is no format, shift the parameters
        if (format == null && decimals != null && !(0,_bignumber__WEBPACK_IMPORTED_MODULE_2__.isBigNumberish)(decimals)) {
            format = decimals;
            decimals = null;
        }
        if (decimals == null) {
            decimals = 0;
        }
        if (format == null) {
            format = "fixed";
        }
        return FixedNumber.fromString(formatFixed(value, decimals), FixedFormat.from(format));
    }
    static fromString(value, format) {
        if (format == null) {
            format = "fixed";
        }
        const fixedFormat = FixedFormat.from(format);
        const numeric = parseFixed(value, fixedFormat.decimals);
        if (!fixedFormat.signed && numeric.lt(Zero)) {
            throwFault("unsigned value cannot be negative", "overflow", "value", value);
        }
        let hex = null;
        if (fixedFormat.signed) {
            hex = numeric.toTwos(fixedFormat.width).toHexString();
        }
        else {
            hex = numeric.toHexString();
            hex = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__.hexZeroPad)(hex, fixedFormat.width / 8);
        }
        const decimal = formatFixed(numeric, fixedFormat.decimals);
        return new FixedNumber(_constructorGuard, hex, decimal, fixedFormat);
    }
    static fromBytes(value, format) {
        if (format == null) {
            format = "fixed";
        }
        const fixedFormat = FixedFormat.from(format);
        if ((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__.arrayify)(value).length > fixedFormat.width / 8) {
            throw new Error("overflow");
        }
        let numeric = _bignumber__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(value);
        if (fixedFormat.signed) {
            numeric = numeric.fromTwos(fixedFormat.width);
        }
        const hex = numeric.toTwos((fixedFormat.signed ? 0 : 1) + fixedFormat.width).toHexString();
        const decimal = formatFixed(numeric, fixedFormat.decimals);
        return new FixedNumber(_constructorGuard, hex, decimal, fixedFormat);
    }
    static from(value, format) {
        if (typeof (value) === "string") {
            return FixedNumber.fromString(value, format);
        }
        if ((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_3__.isBytes)(value)) {
            return FixedNumber.fromBytes(value, format);
        }
        try {
            return FixedNumber.fromValue(value, 0, format);
        }
        catch (error) {
            // Allow NUMERIC_FAULT to bubble up
            if (error.code !== _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.INVALID_ARGUMENT) {
                throw error;
            }
        }
        return logger.throwArgumentError("invalid FixedNumber value", "value", value);
    }
    static isFixedNumber(value) {
        return !!(value && value._isFixedNumber);
    }
}
const ONE = FixedNumber.from(1);
const BUMP = FixedNumber.from("0.5");
//# sourceMappingURL=fixednumber.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/contracts/lib.esm/_version.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/contracts/lib.esm/_version.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
const version = "contracts/5.6.2";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/contracts/lib.esm/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ethersproject/contracts/lib.esm/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseContract": () => (/* binding */ BaseContract),
/* harmony export */   "Contract": () => (/* binding */ Contract),
/* harmony export */   "ContractFactory": () => (/* binding */ ContractFactory)
/* harmony export */ });
/* harmony import */ var _ethersproject_abi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ethersproject/abi */ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js");
/* harmony import */ var _ethersproject_abi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ethersproject/abi */ "./node_modules/@ethersproject/abi/lib.esm/interface.js");
/* harmony import */ var _ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ethersproject/abstract-provider */ "./node_modules/@ethersproject/abstract-provider/lib.esm/index.js");
/* harmony import */ var _ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/abstract-signer */ "./node_modules/@ethersproject/abstract-signer/lib.esm/index.js");
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/address */ "./node_modules/@ethersproject/address/lib.esm/index.js");
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/bignumber */ "./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/properties */ "./node_modules/@ethersproject/properties/lib.esm/index.js");
/* harmony import */ var _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/transactions */ "./node_modules/@ethersproject/transactions/lib.esm/index.js");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version */ "./node_modules/@ethersproject/contracts/lib.esm/_version.js");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger(_version__WEBPACK_IMPORTED_MODULE_1__.version);
;
;
///////////////////////////////
const allowedTransactionKeys = {
    chainId: true, data: true, from: true, gasLimit: true, gasPrice: true, nonce: true, to: true, value: true,
    type: true, accessList: true,
    maxFeePerGas: true, maxPriorityFeePerGas: true,
    customData: true,
    ccipReadEnabled: true
};
function resolveName(resolver, nameOrPromise) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = yield nameOrPromise;
        if (typeof (name) !== "string") {
            logger.throwArgumentError("invalid address or ENS name", "name", name);
        }
        // If it is already an address, just use it (after adding checksum)
        try {
            return (0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_2__.getAddress)(name);
        }
        catch (error) { }
        if (!resolver) {
            logger.throwError("a provider or signer is needed to resolve ENS names", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "resolveName"
            });
        }
        const address = yield resolver.resolveName(name);
        if (address == null) {
            logger.throwArgumentError("resolver or addr is not configured for ENS name", "name", name);
        }
        return address;
    });
}
// Recursively replaces ENS names with promises to resolve the name and resolves all properties
function resolveAddresses(resolver, value, paramType) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Array.isArray(paramType)) {
            return yield Promise.all(paramType.map((paramType, index) => {
                return resolveAddresses(resolver, ((Array.isArray(value)) ? value[index] : value[paramType.name]), paramType);
            }));
        }
        if (paramType.type === "address") {
            return yield resolveName(resolver, value);
        }
        if (paramType.type === "tuple") {
            return yield resolveAddresses(resolver, value, paramType.components);
        }
        if (paramType.baseType === "array") {
            if (!Array.isArray(value)) {
                return Promise.reject(logger.makeError("invalid value for array", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.INVALID_ARGUMENT, {
                    argument: "value",
                    value
                }));
            }
            return yield Promise.all(value.map((v) => resolveAddresses(resolver, v, paramType.arrayChildren)));
        }
        return value;
    });
}
function populateTransaction(contract, fragment, args) {
    return __awaiter(this, void 0, void 0, function* () {
        // If an extra argument is given, it is overrides
        let overrides = {};
        if (args.length === fragment.inputs.length + 1 && typeof (args[args.length - 1]) === "object") {
            overrides = (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.shallowCopy)(args.pop());
        }
        // Make sure the parameter count matches
        logger.checkArgumentCount(args.length, fragment.inputs.length, "passed to contract");
        // Populate "from" override (allow promises)
        if (contract.signer) {
            if (overrides.from) {
                // Contracts with a Signer are from the Signer's frame-of-reference;
                // but we allow overriding "from" if it matches the signer
                overrides.from = (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.resolveProperties)({
                    override: resolveName(contract.signer, overrides.from),
                    signer: contract.signer.getAddress()
                }).then((check) => __awaiter(this, void 0, void 0, function* () {
                    if ((0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_2__.getAddress)(check.signer) !== check.override) {
                        logger.throwError("Contract with a Signer cannot override from", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                            operation: "overrides.from"
                        });
                    }
                    return check.override;
                }));
            }
            else {
                overrides.from = contract.signer.getAddress();
            }
        }
        else if (overrides.from) {
            overrides.from = resolveName(contract.provider, overrides.from);
            //} else {
            // Contracts without a signer can override "from", and if
            // unspecified the zero address is used
            //overrides.from = AddressZero;
        }
        // Wait for all dependencies to be resolved (prefer the signer over the provider)
        const resolved = yield (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.resolveProperties)({
            args: resolveAddresses(contract.signer || contract.provider, args, fragment.inputs),
            address: contract.resolvedAddress,
            overrides: ((0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.resolveProperties)(overrides) || {})
        });
        // The ABI coded transaction
        const data = contract.interface.encodeFunctionData(fragment, resolved.args);
        const tx = {
            data: data,
            to: resolved.address
        };
        // Resolved Overrides
        const ro = resolved.overrides;
        // Populate simple overrides
        if (ro.nonce != null) {
            tx.nonce = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__.BigNumber.from(ro.nonce).toNumber();
        }
        if (ro.gasLimit != null) {
            tx.gasLimit = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__.BigNumber.from(ro.gasLimit);
        }
        if (ro.gasPrice != null) {
            tx.gasPrice = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__.BigNumber.from(ro.gasPrice);
        }
        if (ro.maxFeePerGas != null) {
            tx.maxFeePerGas = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__.BigNumber.from(ro.maxFeePerGas);
        }
        if (ro.maxPriorityFeePerGas != null) {
            tx.maxPriorityFeePerGas = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__.BigNumber.from(ro.maxPriorityFeePerGas);
        }
        if (ro.from != null) {
            tx.from = ro.from;
        }
        if (ro.type != null) {
            tx.type = ro.type;
        }
        if (ro.accessList != null) {
            tx.accessList = (0,_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_5__.accessListify)(ro.accessList);
        }
        // If there was no "gasLimit" override, but the ABI specifies a default, use it
        if (tx.gasLimit == null && fragment.gas != null) {
            // Compute the intrinsic gas cost for this transaction
            // @TODO: This is based on the yellow paper as of Petersburg; this is something
            // we may wish to parameterize in v6 as part of the Network object. Since this
            // is always a non-nil to address, we can ignore G_create, but may wish to add
            // similar logic to the ContractFactory.
            let intrinsic = 21000;
            const bytes = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.arrayify)(data);
            for (let i = 0; i < bytes.length; i++) {
                intrinsic += 4;
                if (bytes[i]) {
                    intrinsic += 64;
                }
            }
            tx.gasLimit = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__.BigNumber.from(fragment.gas).add(intrinsic);
        }
        // Populate "value" override
        if (ro.value) {
            const roValue = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__.BigNumber.from(ro.value);
            if (!roValue.isZero() && !fragment.payable) {
                logger.throwError("non-payable method cannot override value", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "overrides.value",
                    value: overrides.value
                });
            }
            tx.value = roValue;
        }
        if (ro.customData) {
            tx.customData = (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.shallowCopy)(ro.customData);
        }
        if (ro.ccipReadEnabled) {
            tx.ccipReadEnabled = !!ro.ccipReadEnabled;
        }
        // Remove the overrides
        delete overrides.nonce;
        delete overrides.gasLimit;
        delete overrides.gasPrice;
        delete overrides.from;
        delete overrides.value;
        delete overrides.type;
        delete overrides.accessList;
        delete overrides.maxFeePerGas;
        delete overrides.maxPriorityFeePerGas;
        delete overrides.customData;
        delete overrides.ccipReadEnabled;
        // Make sure there are no stray overrides, which may indicate a
        // typo or using an unsupported key.
        const leftovers = Object.keys(overrides).filter((key) => (overrides[key] != null));
        if (leftovers.length) {
            logger.throwError(`cannot override ${leftovers.map((l) => JSON.stringify(l)).join(",")}`, _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "overrides",
                overrides: leftovers
            });
        }
        return tx;
    });
}
function buildPopulate(contract, fragment) {
    return function (...args) {
        return populateTransaction(contract, fragment, args);
    };
}
function buildEstimate(contract, fragment) {
    const signerOrProvider = (contract.signer || contract.provider);
    return function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!signerOrProvider) {
                logger.throwError("estimate require a provider or signer", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "estimateGas"
                });
            }
            const tx = yield populateTransaction(contract, fragment, args);
            return yield signerOrProvider.estimateGas(tx);
        });
    };
}
function addContractWait(contract, tx) {
    const wait = tx.wait.bind(tx);
    tx.wait = (confirmations) => {
        return wait(confirmations).then((receipt) => {
            receipt.events = receipt.logs.map((log) => {
                let event = (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.deepCopy)(log);
                let parsed = null;
                try {
                    parsed = contract.interface.parseLog(log);
                }
                catch (e) { }
                // Successfully parsed the event log; include it
                if (parsed) {
                    event.args = parsed.args;
                    event.decode = (data, topics) => {
                        return contract.interface.decodeEventLog(parsed.eventFragment, data, topics);
                    };
                    event.event = parsed.name;
                    event.eventSignature = parsed.signature;
                }
                // Useful operations
                event.removeListener = () => { return contract.provider; };
                event.getBlock = () => {
                    return contract.provider.getBlock(receipt.blockHash);
                };
                event.getTransaction = () => {
                    return contract.provider.getTransaction(receipt.transactionHash);
                };
                event.getTransactionReceipt = () => {
                    return Promise.resolve(receipt);
                };
                return event;
            });
            return receipt;
        });
    };
}
function buildCall(contract, fragment, collapseSimple) {
    const signerOrProvider = (contract.signer || contract.provider);
    return function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extract the "blockTag" override if present
            let blockTag = undefined;
            if (args.length === fragment.inputs.length + 1 && typeof (args[args.length - 1]) === "object") {
                const overrides = (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.shallowCopy)(args.pop());
                if (overrides.blockTag != null) {
                    blockTag = yield overrides.blockTag;
                }
                delete overrides.blockTag;
                args.push(overrides);
            }
            // If the contract was just deployed, wait until it is mined
            if (contract.deployTransaction != null) {
                yield contract._deployed(blockTag);
            }
            // Call a node and get the result
            const tx = yield populateTransaction(contract, fragment, args);
            const result = yield signerOrProvider.call(tx, blockTag);
            try {
                let value = contract.interface.decodeFunctionResult(fragment, result);
                if (collapseSimple && fragment.outputs.length === 1) {
                    value = value[0];
                }
                return value;
            }
            catch (error) {
                if (error.code === _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.CALL_EXCEPTION) {
                    error.address = contract.address;
                    error.args = args;
                    error.transaction = tx;
                }
                throw error;
            }
        });
    };
}
function buildSend(contract, fragment) {
    return function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!contract.signer) {
                logger.throwError("sending a transaction requires a signer", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "sendTransaction"
                });
            }
            // If the contract was just deployed, wait until it is mined
            if (contract.deployTransaction != null) {
                yield contract._deployed();
            }
            const txRequest = yield populateTransaction(contract, fragment, args);
            const tx = yield contract.signer.sendTransaction(txRequest);
            // Tweak the tx.wait so the receipt has extra properties
            addContractWait(contract, tx);
            return tx;
        });
    };
}
function buildDefault(contract, fragment, collapseSimple) {
    if (fragment.constant) {
        return buildCall(contract, fragment, collapseSimple);
    }
    return buildSend(contract, fragment);
}
function getEventTag(filter) {
    if (filter.address && (filter.topics == null || filter.topics.length === 0)) {
        return "*";
    }
    return (filter.address || "*") + "@" + (filter.topics ? filter.topics.map((topic) => {
        if (Array.isArray(topic)) {
            return topic.join("|");
        }
        return topic;
    }).join(":") : "");
}
class RunningEvent {
    constructor(tag, filter) {
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "tag", tag);
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "filter", filter);
        this._listeners = [];
    }
    addListener(listener, once) {
        this._listeners.push({ listener: listener, once: once });
    }
    removeListener(listener) {
        let done = false;
        this._listeners = this._listeners.filter((item) => {
            if (done || item.listener !== listener) {
                return true;
            }
            done = true;
            return false;
        });
    }
    removeAllListeners() {
        this._listeners = [];
    }
    listeners() {
        return this._listeners.map((i) => i.listener);
    }
    listenerCount() {
        return this._listeners.length;
    }
    run(args) {
        const listenerCount = this.listenerCount();
        this._listeners = this._listeners.filter((item) => {
            const argsCopy = args.slice();
            // Call the callback in the next event loop
            setTimeout(() => {
                item.listener.apply(this, argsCopy);
            }, 0);
            // Reschedule it if it not "once"
            return !(item.once);
        });
        return listenerCount;
    }
    prepareEvent(event) {
    }
    // Returns the array that will be applied to an emit
    getEmit(event) {
        return [event];
    }
}
class ErrorRunningEvent extends RunningEvent {
    constructor() {
        super("error", null);
    }
}
// @TODO Fragment should inherit Wildcard? and just override getEmit?
//       or have a common abstract super class, with enough constructor
//       options to configure both.
// A Fragment Event will populate all the properties that Wildcard
// will, and additionally dereference the arguments when emitting
class FragmentRunningEvent extends RunningEvent {
    constructor(address, contractInterface, fragment, topics) {
        const filter = {
            address: address
        };
        let topic = contractInterface.getEventTopic(fragment);
        if (topics) {
            if (topic !== topics[0]) {
                logger.throwArgumentError("topic mismatch", "topics", topics);
            }
            filter.topics = topics.slice();
        }
        else {
            filter.topics = [topic];
        }
        super(getEventTag(filter), filter);
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "address", address);
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "interface", contractInterface);
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "fragment", fragment);
    }
    prepareEvent(event) {
        super.prepareEvent(event);
        event.event = this.fragment.name;
        event.eventSignature = this.fragment.format();
        event.decode = (data, topics) => {
            return this.interface.decodeEventLog(this.fragment, data, topics);
        };
        try {
            event.args = this.interface.decodeEventLog(this.fragment, event.data, event.topics);
        }
        catch (error) {
            event.args = null;
            event.decodeError = error;
        }
    }
    getEmit(event) {
        const errors = (0,_ethersproject_abi__WEBPACK_IMPORTED_MODULE_7__.checkResultErrors)(event.args);
        if (errors.length) {
            throw errors[0].error;
        }
        const args = (event.args || []).slice();
        args.push(event);
        return args;
    }
}
// A Wildcard Event will attempt to populate:
//  - event            The name of the event name
//  - eventSignature   The full signature of the event
//  - decode           A function to decode data and topics
//  - args             The decoded data and topics
class WildcardRunningEvent extends RunningEvent {
    constructor(address, contractInterface) {
        super("*", { address: address });
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "address", address);
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "interface", contractInterface);
    }
    prepareEvent(event) {
        super.prepareEvent(event);
        try {
            const parsed = this.interface.parseLog(event);
            event.event = parsed.name;
            event.eventSignature = parsed.signature;
            event.decode = (data, topics) => {
                return this.interface.decodeEventLog(parsed.eventFragment, data, topics);
            };
            event.args = parsed.args;
        }
        catch (error) {
            // No matching event
        }
    }
}
class BaseContract {
    constructor(addressOrName, contractInterface, signerOrProvider) {
        // @TODO: Maybe still check the addressOrName looks like a valid address or name?
        //address = getAddress(address);
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "interface", (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.getStatic)(new.target, "getInterface")(contractInterface));
        if (signerOrProvider == null) {
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "provider", null);
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "signer", null);
        }
        else if (_ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_8__.Signer.isSigner(signerOrProvider)) {
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "provider", signerOrProvider.provider || null);
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "signer", signerOrProvider);
        }
        else if (_ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_9__.Provider.isProvider(signerOrProvider)) {
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "provider", signerOrProvider);
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "signer", null);
        }
        else {
            logger.throwArgumentError("invalid signer or provider", "signerOrProvider", signerOrProvider);
        }
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "callStatic", {});
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "estimateGas", {});
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "functions", {});
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "populateTransaction", {});
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "filters", {});
        {
            const uniqueFilters = {};
            Object.keys(this.interface.events).forEach((eventSignature) => {
                const event = this.interface.events[eventSignature];
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this.filters, eventSignature, (...args) => {
                    return {
                        address: this.address,
                        topics: this.interface.encodeFilterTopics(event, args)
                    };
                });
                if (!uniqueFilters[event.name]) {
                    uniqueFilters[event.name] = [];
                }
                uniqueFilters[event.name].push(eventSignature);
            });
            Object.keys(uniqueFilters).forEach((name) => {
                const filters = uniqueFilters[name];
                if (filters.length === 1) {
                    (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this.filters, name, this.filters[filters[0]]);
                }
                else {
                    logger.warn(`Duplicate definition of ${name} (${filters.join(", ")})`);
                }
            });
        }
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "_runningEvents", {});
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "_wrappedEmits", {});
        if (addressOrName == null) {
            logger.throwArgumentError("invalid contract address or ENS name", "addressOrName", addressOrName);
        }
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "address", addressOrName);
        if (this.provider) {
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "resolvedAddress", resolveName(this.provider, addressOrName));
        }
        else {
            try {
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "resolvedAddress", Promise.resolve((0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_2__.getAddress)(addressOrName)));
            }
            catch (error) {
                // Without a provider, we cannot use ENS names
                logger.throwError("provider is required to use ENS name as contract address", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "new Contract"
                });
            }
        }
        // Swallow bad ENS names to prevent Unhandled Exceptions
        this.resolvedAddress.catch((e) => { });
        const uniqueNames = {};
        const uniqueSignatures = {};
        Object.keys(this.interface.functions).forEach((signature) => {
            const fragment = this.interface.functions[signature];
            // Check that the signature is unique; if not the ABI generation has
            // not been cleaned or may be incorrectly generated
            if (uniqueSignatures[signature]) {
                logger.warn(`Duplicate ABI entry for ${JSON.stringify(signature)}`);
                return;
            }
            uniqueSignatures[signature] = true;
            // Track unique names; we only expose bare named functions if they
            // are ambiguous
            {
                const name = fragment.name;
                if (!uniqueNames[`%${name}`]) {
                    uniqueNames[`%${name}`] = [];
                }
                uniqueNames[`%${name}`].push(signature);
            }
            if (this[signature] == null) {
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, signature, buildDefault(this, fragment, true));
            }
            // We do not collapse simple calls on this bucket, which allows
            // frameworks to safely use this without introspection as well as
            // allows decoding error recovery.
            if (this.functions[signature] == null) {
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this.functions, signature, buildDefault(this, fragment, false));
            }
            if (this.callStatic[signature] == null) {
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this.callStatic, signature, buildCall(this, fragment, true));
            }
            if (this.populateTransaction[signature] == null) {
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this.populateTransaction, signature, buildPopulate(this, fragment));
            }
            if (this.estimateGas[signature] == null) {
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this.estimateGas, signature, buildEstimate(this, fragment));
            }
        });
        Object.keys(uniqueNames).forEach((name) => {
            // Ambiguous names to not get attached as bare names
            const signatures = uniqueNames[name];
            if (signatures.length > 1) {
                return;
            }
            // Strip off the leading "%" used for prototype protection
            name = name.substring(1);
            const signature = signatures[0];
            // If overwriting a member property that is null, swallow the error
            try {
                if (this[name] == null) {
                    (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, name, this[signature]);
                }
            }
            catch (e) { }
            if (this.functions[name] == null) {
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this.functions, name, this.functions[signature]);
            }
            if (this.callStatic[name] == null) {
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this.callStatic, name, this.callStatic[signature]);
            }
            if (this.populateTransaction[name] == null) {
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this.populateTransaction, name, this.populateTransaction[signature]);
            }
            if (this.estimateGas[name] == null) {
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this.estimateGas, name, this.estimateGas[signature]);
            }
        });
    }
    static getContractAddress(transaction) {
        return (0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_2__.getContractAddress)(transaction);
    }
    static getInterface(contractInterface) {
        if (_ethersproject_abi__WEBPACK_IMPORTED_MODULE_10__.Interface.isInterface(contractInterface)) {
            return contractInterface;
        }
        return new _ethersproject_abi__WEBPACK_IMPORTED_MODULE_10__.Interface(contractInterface);
    }
    // @TODO: Allow timeout?
    deployed() {
        return this._deployed();
    }
    _deployed(blockTag) {
        if (!this._deployedPromise) {
            // If we were just deployed, we know the transaction we should occur in
            if (this.deployTransaction) {
                this._deployedPromise = this.deployTransaction.wait().then(() => {
                    return this;
                });
            }
            else {
                // @TODO: Once we allow a timeout to be passed in, we will wait
                // up to that many blocks for getCode
                // Otherwise, poll for our code to be deployed
                this._deployedPromise = this.provider.getCode(this.address, blockTag).then((code) => {
                    if (code === "0x") {
                        logger.throwError("contract not deployed", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                            contractAddress: this.address,
                            operation: "getDeployed"
                        });
                    }
                    return this;
                });
            }
        }
        return this._deployedPromise;
    }
    // @TODO:
    // estimateFallback(overrides?: TransactionRequest): Promise<BigNumber>
    // @TODO:
    // estimateDeploy(bytecode: string, ...args): Promise<BigNumber>
    fallback(overrides) {
        if (!this.signer) {
            logger.throwError("sending a transactions require a signer", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, { operation: "sendTransaction(fallback)" });
        }
        const tx = (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.shallowCopy)(overrides || {});
        ["from", "to"].forEach(function (key) {
            if (tx[key] == null) {
                return;
            }
            logger.throwError("cannot override " + key, _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, { operation: key });
        });
        tx.to = this.resolvedAddress;
        return this.deployed().then(() => {
            return this.signer.sendTransaction(tx);
        });
    }
    // Reconnect to a different signer or provider
    connect(signerOrProvider) {
        if (typeof (signerOrProvider) === "string") {
            signerOrProvider = new _ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_8__.VoidSigner(signerOrProvider, this.provider);
        }
        const contract = new (this.constructor)(this.address, this.interface, signerOrProvider);
        if (this.deployTransaction) {
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(contract, "deployTransaction", this.deployTransaction);
        }
        return contract;
    }
    // Re-attach to a different on-chain instance of this contract
    attach(addressOrName) {
        return new (this.constructor)(addressOrName, this.interface, this.signer || this.provider);
    }
    static isIndexed(value) {
        return _ethersproject_abi__WEBPACK_IMPORTED_MODULE_10__.Indexed.isIndexed(value);
    }
    _normalizeRunningEvent(runningEvent) {
        // Already have an instance of this event running; we can re-use it
        if (this._runningEvents[runningEvent.tag]) {
            return this._runningEvents[runningEvent.tag];
        }
        return runningEvent;
    }
    _getRunningEvent(eventName) {
        if (typeof (eventName) === "string") {
            // Listen for "error" events (if your contract has an error event, include
            // the full signature to bypass this special event keyword)
            if (eventName === "error") {
                return this._normalizeRunningEvent(new ErrorRunningEvent());
            }
            // Listen for any event that is registered
            if (eventName === "event") {
                return this._normalizeRunningEvent(new RunningEvent("event", null));
            }
            // Listen for any event
            if (eventName === "*") {
                return this._normalizeRunningEvent(new WildcardRunningEvent(this.address, this.interface));
            }
            // Get the event Fragment (throws if ambiguous/unknown event)
            const fragment = this.interface.getEvent(eventName);
            return this._normalizeRunningEvent(new FragmentRunningEvent(this.address, this.interface, fragment));
        }
        // We have topics to filter by...
        if (eventName.topics && eventName.topics.length > 0) {
            // Is it a known topichash? (throws if no matching topichash)
            try {
                const topic = eventName.topics[0];
                if (typeof (topic) !== "string") {
                    throw new Error("invalid topic"); // @TODO: May happen for anonymous events
                }
                const fragment = this.interface.getEvent(topic);
                return this._normalizeRunningEvent(new FragmentRunningEvent(this.address, this.interface, fragment, eventName.topics));
            }
            catch (error) { }
            // Filter by the unknown topichash
            const filter = {
                address: this.address,
                topics: eventName.topics
            };
            return this._normalizeRunningEvent(new RunningEvent(getEventTag(filter), filter));
        }
        return this._normalizeRunningEvent(new WildcardRunningEvent(this.address, this.interface));
    }
    _checkRunningEvents(runningEvent) {
        if (runningEvent.listenerCount() === 0) {
            delete this._runningEvents[runningEvent.tag];
            // If we have a poller for this, remove it
            const emit = this._wrappedEmits[runningEvent.tag];
            if (emit && runningEvent.filter) {
                this.provider.off(runningEvent.filter, emit);
                delete this._wrappedEmits[runningEvent.tag];
            }
        }
    }
    // Subclasses can override this to gracefully recover
    // from parse errors if they wish
    _wrapEvent(runningEvent, log, listener) {
        const event = (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.deepCopy)(log);
        event.removeListener = () => {
            if (!listener) {
                return;
            }
            runningEvent.removeListener(listener);
            this._checkRunningEvents(runningEvent);
        };
        event.getBlock = () => { return this.provider.getBlock(log.blockHash); };
        event.getTransaction = () => { return this.provider.getTransaction(log.transactionHash); };
        event.getTransactionReceipt = () => { return this.provider.getTransactionReceipt(log.transactionHash); };
        // This may throw if the topics and data mismatch the signature
        runningEvent.prepareEvent(event);
        return event;
    }
    _addEventListener(runningEvent, listener, once) {
        if (!this.provider) {
            logger.throwError("events require a provider or a signer with a provider", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, { operation: "once" });
        }
        runningEvent.addListener(listener, once);
        // Track this running event and its listeners (may already be there; but no hard in updating)
        this._runningEvents[runningEvent.tag] = runningEvent;
        // If we are not polling the provider, start polling
        if (!this._wrappedEmits[runningEvent.tag]) {
            const wrappedEmit = (log) => {
                let event = this._wrapEvent(runningEvent, log, listener);
                // Try to emit the result for the parameterized event...
                if (event.decodeError == null) {
                    try {
                        const args = runningEvent.getEmit(event);
                        this.emit(runningEvent.filter, ...args);
                    }
                    catch (error) {
                        event.decodeError = error.error;
                    }
                }
                // Always emit "event" for fragment-base events
                if (runningEvent.filter != null) {
                    this.emit("event", event);
                }
                // Emit "error" if there was an error
                if (event.decodeError != null) {
                    this.emit("error", event.decodeError, event);
                }
            };
            this._wrappedEmits[runningEvent.tag] = wrappedEmit;
            // Special events, like "error" do not have a filter
            if (runningEvent.filter != null) {
                this.provider.on(runningEvent.filter, wrappedEmit);
            }
        }
    }
    queryFilter(event, fromBlockOrBlockhash, toBlock) {
        const runningEvent = this._getRunningEvent(event);
        const filter = (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.shallowCopy)(runningEvent.filter);
        if (typeof (fromBlockOrBlockhash) === "string" && (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.isHexString)(fromBlockOrBlockhash, 32)) {
            if (toBlock != null) {
                logger.throwArgumentError("cannot specify toBlock with blockhash", "toBlock", toBlock);
            }
            filter.blockHash = fromBlockOrBlockhash;
        }
        else {
            filter.fromBlock = ((fromBlockOrBlockhash != null) ? fromBlockOrBlockhash : 0);
            filter.toBlock = ((toBlock != null) ? toBlock : "latest");
        }
        return this.provider.getLogs(filter).then((logs) => {
            return logs.map((log) => this._wrapEvent(runningEvent, log, null));
        });
    }
    on(event, listener) {
        this._addEventListener(this._getRunningEvent(event), listener, false);
        return this;
    }
    once(event, listener) {
        this._addEventListener(this._getRunningEvent(event), listener, true);
        return this;
    }
    emit(eventName, ...args) {
        if (!this.provider) {
            return false;
        }
        const runningEvent = this._getRunningEvent(eventName);
        const result = (runningEvent.run(args) > 0);
        // May have drained all the "once" events; check for living events
        this._checkRunningEvents(runningEvent);
        return result;
    }
    listenerCount(eventName) {
        if (!this.provider) {
            return 0;
        }
        if (eventName == null) {
            return Object.keys(this._runningEvents).reduce((accum, key) => {
                return accum + this._runningEvents[key].listenerCount();
            }, 0);
        }
        return this._getRunningEvent(eventName).listenerCount();
    }
    listeners(eventName) {
        if (!this.provider) {
            return [];
        }
        if (eventName == null) {
            const result = [];
            for (let tag in this._runningEvents) {
                this._runningEvents[tag].listeners().forEach((listener) => {
                    result.push(listener);
                });
            }
            return result;
        }
        return this._getRunningEvent(eventName).listeners();
    }
    removeAllListeners(eventName) {
        if (!this.provider) {
            return this;
        }
        if (eventName == null) {
            for (const tag in this._runningEvents) {
                const runningEvent = this._runningEvents[tag];
                runningEvent.removeAllListeners();
                this._checkRunningEvents(runningEvent);
            }
            return this;
        }
        // Delete any listeners
        const runningEvent = this._getRunningEvent(eventName);
        runningEvent.removeAllListeners();
        this._checkRunningEvents(runningEvent);
        return this;
    }
    off(eventName, listener) {
        if (!this.provider) {
            return this;
        }
        const runningEvent = this._getRunningEvent(eventName);
        runningEvent.removeListener(listener);
        this._checkRunningEvents(runningEvent);
        return this;
    }
    removeListener(eventName, listener) {
        return this.off(eventName, listener);
    }
}
class Contract extends BaseContract {
}
class ContractFactory {
    constructor(contractInterface, bytecode, signer) {
        let bytecodeHex = null;
        if (typeof (bytecode) === "string") {
            bytecodeHex = bytecode;
        }
        else if ((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.isBytes)(bytecode)) {
            bytecodeHex = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.hexlify)(bytecode);
        }
        else if (bytecode && typeof (bytecode.object) === "string") {
            // Allow the bytecode object from the Solidity compiler
            bytecodeHex = bytecode.object;
        }
        else {
            // Crash in the next verification step
            bytecodeHex = "!";
        }
        // Make sure it is 0x prefixed
        if (bytecodeHex.substring(0, 2) !== "0x") {
            bytecodeHex = "0x" + bytecodeHex;
        }
        // Make sure the final result is valid bytecode
        if (!(0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.isHexString)(bytecodeHex) || (bytecodeHex.length % 2)) {
            logger.throwArgumentError("invalid bytecode", "bytecode", bytecode);
        }
        // If we have a signer, make sure it is valid
        if (signer && !_ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_8__.Signer.isSigner(signer)) {
            logger.throwArgumentError("invalid signer", "signer", signer);
        }
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "bytecode", bytecodeHex);
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "interface", (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.getStatic)(new.target, "getInterface")(contractInterface));
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(this, "signer", signer || null);
    }
    // @TODO: Future; rename to populateTransaction?
    getDeployTransaction(...args) {
        let tx = {};
        // If we have 1 additional argument, we allow transaction overrides
        if (args.length === this.interface.deploy.inputs.length + 1 && typeof (args[args.length - 1]) === "object") {
            tx = (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.shallowCopy)(args.pop());
            for (const key in tx) {
                if (!allowedTransactionKeys[key]) {
                    throw new Error("unknown transaction override " + key);
                }
            }
        }
        // Do not allow these to be overridden in a deployment transaction
        ["data", "from", "to"].forEach((key) => {
            if (tx[key] == null) {
                return;
            }
            logger.throwError("cannot override " + key, _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, { operation: key });
        });
        if (tx.value) {
            const value = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__.BigNumber.from(tx.value);
            if (!value.isZero() && !this.interface.deploy.payable) {
                logger.throwError("non-payable constructor cannot override value", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "overrides.value",
                    value: tx.value
                });
            }
        }
        // Make sure the call matches the constructor signature
        logger.checkArgumentCount(args.length, this.interface.deploy.inputs.length, " in Contract constructor");
        // Set the data to the bytecode + the encoded constructor arguments
        tx.data = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.hexlify)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.concat)([
            this.bytecode,
            this.interface.encodeDeploy(args)
        ]));
        return tx;
    }
    deploy(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let overrides = {};
            // If 1 extra parameter was passed in, it contains overrides
            if (args.length === this.interface.deploy.inputs.length + 1) {
                overrides = args.pop();
            }
            // Make sure the call matches the constructor signature
            logger.checkArgumentCount(args.length, this.interface.deploy.inputs.length, " in Contract constructor");
            // Resolve ENS names and promises in the arguments
            const params = yield resolveAddresses(this.signer, args, this.interface.deploy.inputs);
            params.push(overrides);
            // Get the deployment transaction (with optional overrides)
            const unsignedTx = this.getDeployTransaction(...params);
            // Send the deployment transaction
            const tx = yield this.signer.sendTransaction(unsignedTx);
            const address = (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.getStatic)(this.constructor, "getContractAddress")(tx);
            const contract = (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.getStatic)(this.constructor, "getContract")(address, this.interface, this.signer);
            // Add the modified wait that wraps events
            addContractWait(contract, tx);
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.defineReadOnly)(contract, "deployTransaction", tx);
            return contract;
        });
    }
    attach(address) {
        return (this.constructor).getContract(address, this.interface, this.signer);
    }
    connect(signer) {
        return new (this.constructor)(this.interface, this.bytecode, signer);
    }
    static fromSolidity(compilerOutput, signer) {
        if (compilerOutput == null) {
            logger.throwError("missing compiler output", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.MISSING_ARGUMENT, { argument: "compilerOutput" });
        }
        if (typeof (compilerOutput) === "string") {
            compilerOutput = JSON.parse(compilerOutput);
        }
        const abi = compilerOutput.abi;
        let bytecode = null;
        if (compilerOutput.bytecode) {
            bytecode = compilerOutput.bytecode;
        }
        else if (compilerOutput.evm && compilerOutput.evm.bytecode) {
            bytecode = compilerOutput.evm.bytecode;
        }
        return new this(abi, bytecode, signer);
    }
    static getInterface(contractInterface) {
        return Contract.getInterface(contractInterface);
    }
    static getContractAddress(tx) {
        return (0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_2__.getContractAddress)(tx);
    }
    static getContract(address, contractInterface, signer) {
        return new Contract(address, contractInterface, signer);
    }
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/hash/lib.esm/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@ethersproject/hash/lib.esm/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_TypedDataEncoder": () => (/* reexport safe */ _typed_data__WEBPACK_IMPORTED_MODULE_3__.TypedDataEncoder),
/* harmony export */   "dnsEncode": () => (/* reexport safe */ _namehash__WEBPACK_IMPORTED_MODULE_1__.dnsEncode),
/* harmony export */   "hashMessage": () => (/* reexport safe */ _message__WEBPACK_IMPORTED_MODULE_2__.hashMessage),
/* harmony export */   "id": () => (/* reexport safe */ _id__WEBPACK_IMPORTED_MODULE_0__.id),
/* harmony export */   "isValidName": () => (/* reexport safe */ _namehash__WEBPACK_IMPORTED_MODULE_1__.isValidName),
/* harmony export */   "messagePrefix": () => (/* reexport safe */ _message__WEBPACK_IMPORTED_MODULE_2__.messagePrefix),
/* harmony export */   "namehash": () => (/* reexport safe */ _namehash__WEBPACK_IMPORTED_MODULE_1__.namehash)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "./node_modules/@ethersproject/hash/lib.esm/id.js");
/* harmony import */ var _namehash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./namehash */ "./node_modules/@ethersproject/hash/lib.esm/namehash.js");
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./message */ "./node_modules/@ethersproject/hash/lib.esm/message.js");
/* harmony import */ var _typed_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./typed-data */ "./node_modules/@ethersproject/hash/lib.esm/typed-data.js");






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/hash/lib.esm/message.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ethersproject/hash/lib.esm/message.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hashMessage": () => (/* binding */ hashMessage),
/* harmony export */   "messagePrefix": () => (/* binding */ messagePrefix)
/* harmony export */ });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/keccak256 */ "./node_modules/@ethersproject/keccak256/lib.esm/index.js");
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/strings */ "./node_modules/@ethersproject/strings/lib.esm/utf8.js");



const messagePrefix = "\x19Ethereum Signed Message:\n";
function hashMessage(message) {
    if (typeof (message) === "string") {
        message = (0,_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__.toUtf8Bytes)(message);
    }
    return (0,_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_1__.keccak256)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.concat)([
        (0,_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__.toUtf8Bytes)(messagePrefix),
        (0,_ethersproject_strings__WEBPACK_IMPORTED_MODULE_0__.toUtf8Bytes)(String(message.length)),
        message
    ]));
}
//# sourceMappingURL=message.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/hdnode/lib.esm/_version.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ethersproject/hdnode/lib.esm/_version.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
const version = "hdnode/5.6.2";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/hdnode/lib.esm/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ethersproject/hdnode/lib.esm/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HDNode": () => (/* binding */ HDNode),
/* harmony export */   "defaultPath": () => (/* binding */ defaultPath),
/* harmony export */   "entropyToMnemonic": () => (/* binding */ entropyToMnemonic),
/* harmony export */   "getAccountPath": () => (/* binding */ getAccountPath),
/* harmony export */   "isValidMnemonic": () => (/* binding */ isValidMnemonic),
/* harmony export */   "mnemonicToEntropy": () => (/* binding */ mnemonicToEntropy),
/* harmony export */   "mnemonicToSeed": () => (/* binding */ mnemonicToSeed)
/* harmony export */ });
/* harmony import */ var _ethersproject_basex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/basex */ "./node_modules/@ethersproject/basex/lib.esm/index.js");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bignumber */ "./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js");
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/strings */ "./node_modules/@ethersproject/strings/lib.esm/utf8.js");
/* harmony import */ var _ethersproject_pbkdf2__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ethersproject/pbkdf2 */ "./node_modules/@ethersproject/pbkdf2/lib.esm/pbkdf2.js");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ethersproject/properties */ "./node_modules/@ethersproject/properties/lib.esm/index.js");
/* harmony import */ var _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/signing-key */ "./node_modules/@ethersproject/signing-key/lib.esm/index.js");
/* harmony import */ var _ethersproject_sha2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/sha2 */ "./node_modules/@ethersproject/sha2/lib.esm/sha2.js");
/* harmony import */ var _ethersproject_sha2__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ethersproject/sha2 */ "./node_modules/@ethersproject/sha2/lib.esm/types.js");
/* harmony import */ var _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ethersproject/transactions */ "./node_modules/@ethersproject/transactions/lib.esm/index.js");
/* harmony import */ var _ethersproject_wordlists__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ethersproject/wordlists */ "./node_modules/@ethersproject/wordlists/lib.esm/wordlists.js");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version */ "./node_modules/@ethersproject/hdnode/lib.esm/_version.js");













const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger(_version__WEBPACK_IMPORTED_MODULE_1__.version);
const N = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
// "Bitcoin seed"
const MasterSecret = (0,_ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__.toUtf8Bytes)("Bitcoin seed");
const HardenedBit = 0x80000000;
// Returns a byte with the MSB bits set
function getUpperMask(bits) {
    return ((1 << bits) - 1) << (8 - bits);
}
// Returns a byte with the LSB bits set
function getLowerMask(bits) {
    return (1 << bits) - 1;
}
function bytes32(value) {
    return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexZeroPad)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexlify)(value), 32);
}
function base58check(data) {
    return _ethersproject_basex__WEBPACK_IMPORTED_MODULE_5__.Base58.encode((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.concat)([data, (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexDataSlice)((0,_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_6__.sha256)((0,_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_6__.sha256)(data)), 0, 4)]));
}
function getWordlist(wordlist) {
    if (wordlist == null) {
        return _ethersproject_wordlists__WEBPACK_IMPORTED_MODULE_7__.wordlists.en;
    }
    if (typeof (wordlist) === "string") {
        const words = _ethersproject_wordlists__WEBPACK_IMPORTED_MODULE_7__.wordlists[wordlist];
        if (words == null) {
            logger.throwArgumentError("unknown locale", "wordlist", wordlist);
        }
        return words;
    }
    return wordlist;
}
const _constructorGuard = {};
const defaultPath = "m/44'/60'/0'/0/0";
;
class HDNode {
    /**
     *  This constructor should not be called directly.
     *
     *  Please use:
     *   - fromMnemonic
     *   - fromSeed
     */
    constructor(constructorGuard, privateKey, publicKey, parentFingerprint, chainCode, index, depth, mnemonicOrPath) {
        /* istanbul ignore if */
        if (constructorGuard !== _constructorGuard) {
            throw new Error("HDNode constructor cannot be called directly");
        }
        if (privateKey) {
            const signingKey = new _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_8__.SigningKey(privateKey);
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "privateKey", signingKey.privateKey);
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "publicKey", signingKey.compressedPublicKey);
        }
        else {
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "privateKey", null);
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "publicKey", (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexlify)(publicKey));
        }
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "parentFingerprint", parentFingerprint);
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "fingerprint", (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexDataSlice)((0,_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_6__.ripemd160)((0,_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_6__.sha256)(this.publicKey)), 0, 4));
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "address", (0,_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_10__.computeAddress)(this.publicKey));
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "chainCode", chainCode);
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "index", index);
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "depth", depth);
        if (mnemonicOrPath == null) {
            // From a source that does not preserve the path (e.g. extended keys)
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "mnemonic", null);
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "path", null);
        }
        else if (typeof (mnemonicOrPath) === "string") {
            // From a source that does not preserve the mnemonic (e.g. neutered)
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "mnemonic", null);
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "path", mnemonicOrPath);
        }
        else {
            // From a fully qualified source
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "mnemonic", mnemonicOrPath);
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_9__.defineReadOnly)(this, "path", mnemonicOrPath.path);
        }
    }
    get extendedKey() {
        // We only support the mainnet values for now, but if anyone needs
        // testnet values, let me know. I believe current sentiment is that
        // we should always use mainnet, and use BIP-44 to derive the network
        //   - Mainnet: public=0x0488B21E, private=0x0488ADE4
        //   - Testnet: public=0x043587CF, private=0x04358394
        if (this.depth >= 256) {
            throw new Error("Depth too large!");
        }
        return base58check((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.concat)([
            ((this.privateKey != null) ? "0x0488ADE4" : "0x0488B21E"),
            (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexlify)(this.depth),
            this.parentFingerprint,
            (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexZeroPad)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexlify)(this.index), 4),
            this.chainCode,
            ((this.privateKey != null) ? (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.concat)(["0x00", this.privateKey]) : this.publicKey),
        ]));
    }
    neuter() {
        return new HDNode(_constructorGuard, null, this.publicKey, this.parentFingerprint, this.chainCode, this.index, this.depth, this.path);
    }
    _derive(index) {
        if (index > 0xffffffff) {
            throw new Error("invalid index - " + String(index));
        }
        // Base path
        let path = this.path;
        if (path) {
            path += "/" + (index & ~HardenedBit);
        }
        const data = new Uint8Array(37);
        if (index & HardenedBit) {
            if (!this.privateKey) {
                throw new Error("cannot derive child of neutered node");
            }
            // Data = 0x00 || ser_256(k_par)
            data.set((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.arrayify)(this.privateKey), 1);
            // Hardened path
            if (path) {
                path += "'";
            }
        }
        else {
            // Data = ser_p(point(k_par))
            data.set((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.arrayify)(this.publicKey));
        }
        // Data += ser_32(i)
        for (let i = 24; i >= 0; i -= 8) {
            data[33 + (i >> 3)] = ((index >> (24 - i)) & 0xff);
        }
        const I = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.arrayify)((0,_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_6__.computeHmac)(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_11__.SupportedAlgorithm.sha512, this.chainCode, data));
        const IL = I.slice(0, 32);
        const IR = I.slice(32);
        // The private key
        let ki = null;
        // The public key
        let Ki = null;
        if (this.privateKey) {
            ki = bytes32(_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__.BigNumber.from(IL).add(this.privateKey).mod(N));
        }
        else {
            const ek = new _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_8__.SigningKey((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexlify)(IL));
            Ki = ek._addPoint(this.publicKey);
        }
        let mnemonicOrPath = path;
        const srcMnemonic = this.mnemonic;
        if (srcMnemonic) {
            mnemonicOrPath = Object.freeze({
                phrase: srcMnemonic.phrase,
                path: path,
                locale: (srcMnemonic.locale || "en")
            });
        }
        return new HDNode(_constructorGuard, ki, Ki, this.fingerprint, bytes32(IR), index, this.depth + 1, mnemonicOrPath);
    }
    derivePath(path) {
        const components = path.split("/");
        if (components.length === 0 || (components[0] === "m" && this.depth !== 0)) {
            throw new Error("invalid path - " + path);
        }
        if (components[0] === "m") {
            components.shift();
        }
        let result = this;
        for (let i = 0; i < components.length; i++) {
            const component = components[i];
            if (component.match(/^[0-9]+'$/)) {
                const index = parseInt(component.substring(0, component.length - 1));
                if (index >= HardenedBit) {
                    throw new Error("invalid path index - " + component);
                }
                result = result._derive(HardenedBit + index);
            }
            else if (component.match(/^[0-9]+$/)) {
                const index = parseInt(component);
                if (index >= HardenedBit) {
                    throw new Error("invalid path index - " + component);
                }
                result = result._derive(index);
            }
            else {
                throw new Error("invalid path component - " + component);
            }
        }
        return result;
    }
    static _fromSeed(seed, mnemonic) {
        const seedArray = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.arrayify)(seed);
        if (seedArray.length < 16 || seedArray.length > 64) {
            throw new Error("invalid seed");
        }
        const I = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.arrayify)((0,_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_6__.computeHmac)(_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_11__.SupportedAlgorithm.sha512, MasterSecret, seedArray));
        return new HDNode(_constructorGuard, bytes32(I.slice(0, 32)), null, "0x00000000", bytes32(I.slice(32)), 0, 0, mnemonic);
    }
    static fromMnemonic(mnemonic, password, wordlist) {
        // If a locale name was passed in, find the associated wordlist
        wordlist = getWordlist(wordlist);
        // Normalize the case and spacing in the mnemonic (throws if the mnemonic is invalid)
        mnemonic = entropyToMnemonic(mnemonicToEntropy(mnemonic, wordlist), wordlist);
        return HDNode._fromSeed(mnemonicToSeed(mnemonic, password), {
            phrase: mnemonic,
            path: "m",
            locale: wordlist.locale
        });
    }
    static fromSeed(seed) {
        return HDNode._fromSeed(seed, null);
    }
    static fromExtendedKey(extendedKey) {
        const bytes = _ethersproject_basex__WEBPACK_IMPORTED_MODULE_5__.Base58.decode(extendedKey);
        if (bytes.length !== 82 || base58check(bytes.slice(0, 78)) !== extendedKey) {
            logger.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]");
        }
        const depth = bytes[4];
        const parentFingerprint = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexlify)(bytes.slice(5, 9));
        const index = parseInt((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexlify)(bytes.slice(9, 13)).substring(2), 16);
        const chainCode = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexlify)(bytes.slice(13, 45));
        const key = bytes.slice(45, 78);
        switch ((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexlify)(bytes.slice(0, 4))) {
            // Public Key
            case "0x0488b21e":
            case "0x043587cf":
                return new HDNode(_constructorGuard, null, (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexlify)(key), parentFingerprint, chainCode, index, depth, null);
            // Private Key
            case "0x0488ade4":
            case "0x04358394 ":
                if (key[0] !== 0) {
                    break;
                }
                return new HDNode(_constructorGuard, (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexlify)(key.slice(1)), null, parentFingerprint, chainCode, index, depth, null);
        }
        return logger.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]");
    }
}
function mnemonicToSeed(mnemonic, password) {
    if (!password) {
        password = "";
    }
    const salt = (0,_ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__.toUtf8Bytes)("mnemonic" + password, _ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__.UnicodeNormalizationForm.NFKD);
    return (0,_ethersproject_pbkdf2__WEBPACK_IMPORTED_MODULE_12__.pbkdf2)((0,_ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__.toUtf8Bytes)(mnemonic, _ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__.UnicodeNormalizationForm.NFKD), salt, 2048, 64, "sha512");
}
function mnemonicToEntropy(mnemonic, wordlist) {
    wordlist = getWordlist(wordlist);
    logger.checkNormalize();
    const words = wordlist.split(mnemonic);
    if ((words.length % 3) !== 0) {
        throw new Error("invalid mnemonic");
    }
    const entropy = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.arrayify)(new Uint8Array(Math.ceil(11 * words.length / 8)));
    let offset = 0;
    for (let i = 0; i < words.length; i++) {
        let index = wordlist.getWordIndex(words[i].normalize("NFKD"));
        if (index === -1) {
            throw new Error("invalid mnemonic");
        }
        for (let bit = 0; bit < 11; bit++) {
            if (index & (1 << (10 - bit))) {
                entropy[offset >> 3] |= (1 << (7 - (offset % 8)));
            }
            offset++;
        }
    }
    const entropyBits = 32 * words.length / 3;
    const checksumBits = words.length / 3;
    const checksumMask = getUpperMask(checksumBits);
    const checksum = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.arrayify)((0,_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_6__.sha256)(entropy.slice(0, entropyBits / 8)))[0] & checksumMask;
    if (checksum !== (entropy[entropy.length - 1] & checksumMask)) {
        throw new Error("invalid checksum");
    }
    return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.hexlify)(entropy.slice(0, entropyBits / 8));
}
function entropyToMnemonic(entropy, wordlist) {
    wordlist = getWordlist(wordlist);
    entropy = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.arrayify)(entropy);
    if ((entropy.length % 4) !== 0 || entropy.length < 16 || entropy.length > 32) {
        throw new Error("invalid entropy");
    }
    const indices = [0];
    let remainingBits = 11;
    for (let i = 0; i < entropy.length; i++) {
        // Consume the whole byte (with still more to go)
        if (remainingBits > 8) {
            indices[indices.length - 1] <<= 8;
            indices[indices.length - 1] |= entropy[i];
            remainingBits -= 8;
            // This byte will complete an 11-bit index
        }
        else {
            indices[indices.length - 1] <<= remainingBits;
            indices[indices.length - 1] |= entropy[i] >> (8 - remainingBits);
            // Start the next word
            indices.push(entropy[i] & getLowerMask(8 - remainingBits));
            remainingBits += 3;
        }
    }
    // Compute the checksum bits
    const checksumBits = entropy.length / 4;
    const checksum = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_4__.arrayify)((0,_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_6__.sha256)(entropy))[0] & getUpperMask(checksumBits);
    // Shift the checksum into the word indices
    indices[indices.length - 1] <<= checksumBits;
    indices[indices.length - 1] |= (checksum >> (8 - checksumBits));
    return wordlist.join(indices.map((index) => wordlist.getWord(index)));
}
function isValidMnemonic(mnemonic, wordlist) {
    try {
        mnemonicToEntropy(mnemonic, wordlist);
        return true;
    }
    catch (error) { }
    return false;
}
function getAccountPath(index) {
    if (typeof (index) !== "number" || index < 0 || index >= HardenedBit || index % 1) {
        logger.throwArgumentError("invalid account index", "index", index);
    }
    return `m/44'/60'/${index}'/0/0`;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/json-wallets/lib.esm/_version.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@ethersproject/json-wallets/lib.esm/_version.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
const version = "json-wallets/5.6.1";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/json-wallets/lib.esm/crowdsale.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@ethersproject/json-wallets/lib.esm/crowdsale.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CrowdsaleAccount": () => (/* binding */ CrowdsaleAccount),
/* harmony export */   "decrypt": () => (/* binding */ decrypt)
/* harmony export */ });
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aes-js */ "./node_modules/aes-js/index.js");
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aes_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/address */ "./node_modules/@ethersproject/address/lib.esm/index.js");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ethersproject/keccak256 */ "./node_modules/@ethersproject/keccak256/lib.esm/index.js");
/* harmony import */ var _ethersproject_pbkdf2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ethersproject/pbkdf2 */ "./node_modules/@ethersproject/pbkdf2/lib.esm/pbkdf2.js");
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/strings */ "./node_modules/@ethersproject/strings/lib.esm/utf8.js");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/properties */ "./node_modules/@ethersproject/properties/lib.esm/index.js");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version */ "./node_modules/@ethersproject/json-wallets/lib.esm/_version.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./node_modules/@ethersproject/json-wallets/lib.esm/utils.js");










const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_1__.Logger(_version__WEBPACK_IMPORTED_MODULE_2__.version);

class CrowdsaleAccount extends _ethersproject_properties__WEBPACK_IMPORTED_MODULE_3__.Description {
    isCrowdsaleAccount(value) {
        return !!(value && value._isCrowdsaleAccount);
    }
}
// See: https://github.com/ethereum/pyethsaletool
function decrypt(json, password) {
    const data = JSON.parse(json);
    password = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.getPassword)(password);
    // Ethereum Address
    const ethaddr = (0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_5__.getAddress)((0,_utils__WEBPACK_IMPORTED_MODULE_4__.searchPath)(data, "ethaddr"));
    // Encrypted Seed
    const encseed = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.looseArrayify)((0,_utils__WEBPACK_IMPORTED_MODULE_4__.searchPath)(data, "encseed"));
    if (!encseed || (encseed.length % 16) !== 0) {
        logger.throwArgumentError("invalid encseed", "json", json);
    }
    const key = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.arrayify)((0,_ethersproject_pbkdf2__WEBPACK_IMPORTED_MODULE_7__.pbkdf2)(password, password, 2000, 32, "sha256")).slice(0, 16);
    const iv = encseed.slice(0, 16);
    const encryptedSeed = encseed.slice(16);
    // Decrypt the seed
    const aesCbc = new (aes_js__WEBPACK_IMPORTED_MODULE_0___default().ModeOfOperation.cbc)(key, iv);
    const seed = aes_js__WEBPACK_IMPORTED_MODULE_0___default().padding.pkcs7.strip((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.arrayify)(aesCbc.decrypt(encryptedSeed)));
    // This wallet format is weird... Convert the binary encoded hex to a string.
    let seedHex = "";
    for (let i = 0; i < seed.length; i++) {
        seedHex += String.fromCharCode(seed[i]);
    }
    const seedHexBytes = (0,_ethersproject_strings__WEBPACK_IMPORTED_MODULE_8__.toUtf8Bytes)(seedHex);
    const privateKey = (0,_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_9__.keccak256)(seedHexBytes);
    return new CrowdsaleAccount({
        _isCrowdsaleAccount: true,
        address: ethaddr,
        privateKey: privateKey
    });
}
//# sourceMappingURL=crowdsale.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/json-wallets/lib.esm/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/json-wallets/lib.esm/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decryptCrowdsale": () => (/* reexport safe */ _crowdsale__WEBPACK_IMPORTED_MODULE_1__.decrypt),
/* harmony export */   "decryptJsonWallet": () => (/* binding */ decryptJsonWallet),
/* harmony export */   "decryptJsonWalletSync": () => (/* binding */ decryptJsonWalletSync),
/* harmony export */   "decryptKeystore": () => (/* reexport safe */ _keystore__WEBPACK_IMPORTED_MODULE_2__.decrypt),
/* harmony export */   "decryptKeystoreSync": () => (/* reexport safe */ _keystore__WEBPACK_IMPORTED_MODULE_2__.decryptSync),
/* harmony export */   "encryptKeystore": () => (/* reexport safe */ _keystore__WEBPACK_IMPORTED_MODULE_2__.encrypt),
/* harmony export */   "getJsonWalletAddress": () => (/* reexport safe */ _inspect__WEBPACK_IMPORTED_MODULE_0__.getJsonWalletAddress),
/* harmony export */   "isCrowdsaleWallet": () => (/* reexport safe */ _inspect__WEBPACK_IMPORTED_MODULE_0__.isCrowdsaleWallet),
/* harmony export */   "isKeystoreWallet": () => (/* reexport safe */ _inspect__WEBPACK_IMPORTED_MODULE_0__.isKeystoreWallet)
/* harmony export */ });
/* harmony import */ var _crowdsale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./crowdsale */ "./node_modules/@ethersproject/json-wallets/lib.esm/crowdsale.js");
/* harmony import */ var _inspect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inspect */ "./node_modules/@ethersproject/json-wallets/lib.esm/inspect.js");
/* harmony import */ var _keystore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keystore */ "./node_modules/@ethersproject/json-wallets/lib.esm/keystore.js");




function decryptJsonWallet(json, password, progressCallback) {
    if ((0,_inspect__WEBPACK_IMPORTED_MODULE_0__.isCrowdsaleWallet)(json)) {
        if (progressCallback) {
            progressCallback(0);
        }
        const account = (0,_crowdsale__WEBPACK_IMPORTED_MODULE_1__.decrypt)(json, password);
        if (progressCallback) {
            progressCallback(1);
        }
        return Promise.resolve(account);
    }
    if ((0,_inspect__WEBPACK_IMPORTED_MODULE_0__.isKeystoreWallet)(json)) {
        return (0,_keystore__WEBPACK_IMPORTED_MODULE_2__.decrypt)(json, password, progressCallback);
    }
    return Promise.reject(new Error("invalid JSON wallet"));
}
function decryptJsonWalletSync(json, password) {
    if ((0,_inspect__WEBPACK_IMPORTED_MODULE_0__.isCrowdsaleWallet)(json)) {
        return (0,_crowdsale__WEBPACK_IMPORTED_MODULE_1__.decrypt)(json, password);
    }
    if ((0,_inspect__WEBPACK_IMPORTED_MODULE_0__.isKeystoreWallet)(json)) {
        return (0,_keystore__WEBPACK_IMPORTED_MODULE_2__.decryptSync)(json, password);
    }
    throw new Error("invalid JSON wallet");
}

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/json-wallets/lib.esm/inspect.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@ethersproject/json-wallets/lib.esm/inspect.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getJsonWalletAddress": () => (/* binding */ getJsonWalletAddress),
/* harmony export */   "isCrowdsaleWallet": () => (/* binding */ isCrowdsaleWallet),
/* harmony export */   "isKeystoreWallet": () => (/* binding */ isKeystoreWallet)
/* harmony export */ });
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/address */ "./node_modules/@ethersproject/address/lib.esm/index.js");


function isCrowdsaleWallet(json) {
    let data = null;
    try {
        data = JSON.parse(json);
    }
    catch (error) {
        return false;
    }
    return (data.encseed && data.ethaddr);
}
function isKeystoreWallet(json) {
    let data = null;
    try {
        data = JSON.parse(json);
    }
    catch (error) {
        return false;
    }
    if (!data.version || parseInt(data.version) !== data.version || parseInt(data.version) !== 3) {
        return false;
    }
    // @TODO: Put more checks to make sure it has kdf, iv and all that good stuff
    return true;
}
//export function isJsonWallet(json: string): boolean {
//    return (isSecretStorageWallet(json) || isCrowdsaleWallet(json));
//}
function getJsonWalletAddress(json) {
    if (isCrowdsaleWallet(json)) {
        try {
            return (0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_0__.getAddress)(JSON.parse(json).ethaddr);
        }
        catch (error) {
            return null;
        }
    }
    if (isKeystoreWallet(json)) {
        try {
            return (0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_0__.getAddress)(JSON.parse(json).address);
        }
        catch (error) {
            return null;
        }
    }
    return null;
}
//# sourceMappingURL=inspect.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/json-wallets/lib.esm/keystore.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@ethersproject/json-wallets/lib.esm/keystore.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeystoreAccount": () => (/* binding */ KeystoreAccount),
/* harmony export */   "decrypt": () => (/* binding */ decrypt),
/* harmony export */   "decryptSync": () => (/* binding */ decryptSync),
/* harmony export */   "encrypt": () => (/* binding */ encrypt)
/* harmony export */ });
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aes-js */ "./node_modules/aes-js/index.js");
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aes_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scrypt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scrypt-js */ "./node_modules/scrypt-js/scrypt.js");
/* harmony import */ var scrypt_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(scrypt_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ethersproject/address */ "./node_modules/@ethersproject/address/lib.esm/index.js");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ethersproject/hdnode */ "./node_modules/@ethersproject/hdnode/lib.esm/index.js");
/* harmony import */ var _ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ethersproject/keccak256 */ "./node_modules/@ethersproject/keccak256/lib.esm/index.js");
/* harmony import */ var _ethersproject_pbkdf2__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ethersproject/pbkdf2 */ "./node_modules/@ethersproject/pbkdf2/lib.esm/pbkdf2.js");
/* harmony import */ var _ethersproject_random__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ethersproject/random */ "./node_modules/@ethersproject/random/lib.esm/random.js");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/properties */ "./node_modules/@ethersproject/properties/lib.esm/index.js");
/* harmony import */ var _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/transactions */ "./node_modules/@ethersproject/transactions/lib.esm/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./node_modules/@ethersproject/json-wallets/lib.esm/utils.js");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version */ "./node_modules/@ethersproject/json-wallets/lib.esm/_version.js");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};













const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_2__.Logger(_version__WEBPACK_IMPORTED_MODULE_3__.version);
// Exported Types
function hasMnemonic(value) {
    return (value != null && value.mnemonic && value.mnemonic.phrase);
}
class KeystoreAccount extends _ethersproject_properties__WEBPACK_IMPORTED_MODULE_4__.Description {
    isKeystoreAccount(value) {
        return !!(value && value._isKeystoreAccount);
    }
}
function _decrypt(data, key, ciphertext) {
    const cipher = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "crypto/cipher");
    if (cipher === "aes-128-ctr") {
        const iv = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.looseArrayify)((0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "crypto/cipherparams/iv"));
        const counter = new (aes_js__WEBPACK_IMPORTED_MODULE_0___default().Counter)(iv);
        const aesCtr = new (aes_js__WEBPACK_IMPORTED_MODULE_0___default().ModeOfOperation.ctr)(key, counter);
        return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.arrayify)(aesCtr.decrypt(ciphertext));
    }
    return null;
}
function _getAccount(data, key) {
    const ciphertext = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.looseArrayify)((0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "crypto/ciphertext"));
    const computedMAC = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.hexlify)((0,_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_7__.keccak256)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.concat)([key.slice(16, 32), ciphertext]))).substring(2);
    if (computedMAC !== (0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "crypto/mac").toLowerCase()) {
        throw new Error("invalid password");
    }
    const privateKey = _decrypt(data, key.slice(0, 16), ciphertext);
    if (!privateKey) {
        logger.throwError("unsupported cipher", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_2__.Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "decrypt"
        });
    }
    const mnemonicKey = key.slice(32, 64);
    const address = (0,_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_8__.computeAddress)(privateKey);
    if (data.address) {
        let check = data.address.toLowerCase();
        if (check.substring(0, 2) !== "0x") {
            check = "0x" + check;
        }
        if ((0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_9__.getAddress)(check) !== address) {
            throw new Error("address mismatch");
        }
    }
    const account = {
        _isKeystoreAccount: true,
        address: address,
        privateKey: (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.hexlify)(privateKey)
    };
    // Version 0.1 x-ethers metadata must contain an encrypted mnemonic phrase
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "x-ethers/version") === "0.1") {
        const mnemonicCiphertext = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.looseArrayify)((0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "x-ethers/mnemonicCiphertext"));
        const mnemonicIv = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.looseArrayify)((0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "x-ethers/mnemonicCounter"));
        const mnemonicCounter = new (aes_js__WEBPACK_IMPORTED_MODULE_0___default().Counter)(mnemonicIv);
        const mnemonicAesCtr = new (aes_js__WEBPACK_IMPORTED_MODULE_0___default().ModeOfOperation.ctr)(mnemonicKey, mnemonicCounter);
        const path = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "x-ethers/path") || _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_10__.defaultPath;
        const locale = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "x-ethers/locale") || "en";
        const entropy = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.arrayify)(mnemonicAesCtr.decrypt(mnemonicCiphertext));
        try {
            const mnemonic = (0,_ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_10__.entropyToMnemonic)(entropy, locale);
            const node = _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_10__.HDNode.fromMnemonic(mnemonic, null, locale).derivePath(path);
            if (node.privateKey != account.privateKey) {
                throw new Error("mnemonic mismatch");
            }
            account.mnemonic = node.mnemonic;
        }
        catch (error) {
            // If we don't have the locale wordlist installed to
            // read this mnemonic, just bail and don't set the
            // mnemonic
            if (error.code !== _ethersproject_logger__WEBPACK_IMPORTED_MODULE_2__.Logger.errors.INVALID_ARGUMENT || error.argument !== "wordlist") {
                throw error;
            }
        }
    }
    return new KeystoreAccount(account);
}
function pbkdf2Sync(passwordBytes, salt, count, dkLen, prfFunc) {
    return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.arrayify)((0,_ethersproject_pbkdf2__WEBPACK_IMPORTED_MODULE_11__.pbkdf2)(passwordBytes, salt, count, dkLen, prfFunc));
}
function pbkdf2(passwordBytes, salt, count, dkLen, prfFunc) {
    return Promise.resolve(pbkdf2Sync(passwordBytes, salt, count, dkLen, prfFunc));
}
function _computeKdfKey(data, password, pbkdf2Func, scryptFunc, progressCallback) {
    const passwordBytes = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.getPassword)(password);
    const kdf = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "crypto/kdf");
    if (kdf && typeof (kdf) === "string") {
        const throwError = function (name, value) {
            return logger.throwArgumentError("invalid key-derivation function parameters", name, value);
        };
        if (kdf.toLowerCase() === "scrypt") {
            const salt = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.looseArrayify)((0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "crypto/kdfparams/salt"));
            const N = parseInt((0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "crypto/kdfparams/n"));
            const r = parseInt((0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "crypto/kdfparams/r"));
            const p = parseInt((0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "crypto/kdfparams/p"));
            // Check for all required parameters
            if (!N || !r || !p) {
                throwError("kdf", kdf);
            }
            // Make sure N is a power of 2
            if ((N & (N - 1)) !== 0) {
                throwError("N", N);
            }
            const dkLen = parseInt((0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "crypto/kdfparams/dklen"));
            if (dkLen !== 32) {
                throwError("dklen", dkLen);
            }
            return scryptFunc(passwordBytes, salt, N, r, p, 64, progressCallback);
        }
        else if (kdf.toLowerCase() === "pbkdf2") {
            const salt = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.looseArrayify)((0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "crypto/kdfparams/salt"));
            let prfFunc = null;
            const prf = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "crypto/kdfparams/prf");
            if (prf === "hmac-sha256") {
                prfFunc = "sha256";
            }
            else if (prf === "hmac-sha512") {
                prfFunc = "sha512";
            }
            else {
                throwError("prf", prf);
            }
            const count = parseInt((0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "crypto/kdfparams/c"));
            const dkLen = parseInt((0,_utils__WEBPACK_IMPORTED_MODULE_5__.searchPath)(data, "crypto/kdfparams/dklen"));
            if (dkLen !== 32) {
                throwError("dklen", dkLen);
            }
            return pbkdf2Func(passwordBytes, salt, count, dkLen, prfFunc);
        }
    }
    return logger.throwArgumentError("unsupported key-derivation function", "kdf", kdf);
}
function decryptSync(json, password) {
    const data = JSON.parse(json);
    const key = _computeKdfKey(data, password, pbkdf2Sync, (scrypt_js__WEBPACK_IMPORTED_MODULE_1___default().syncScrypt));
    return _getAccount(data, key);
}
function decrypt(json, password, progressCallback) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = JSON.parse(json);
        const key = yield _computeKdfKey(data, password, pbkdf2, (scrypt_js__WEBPACK_IMPORTED_MODULE_1___default().scrypt), progressCallback);
        return _getAccount(data, key);
    });
}
function encrypt(account, password, options, progressCallback) {
    try {
        // Check the address matches the private key
        if ((0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_9__.getAddress)(account.address) !== (0,_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_8__.computeAddress)(account.privateKey)) {
            throw new Error("address/privateKey mismatch");
        }
        // Check the mnemonic (if any) matches the private key
        if (hasMnemonic(account)) {
            const mnemonic = account.mnemonic;
            const node = _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_10__.HDNode.fromMnemonic(mnemonic.phrase, null, mnemonic.locale).derivePath(mnemonic.path || _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_10__.defaultPath);
            if (node.privateKey != account.privateKey) {
                throw new Error("mnemonic mismatch");
            }
        }
    }
    catch (e) {
        return Promise.reject(e);
    }
    // The options are optional, so adjust the call as needed
    if (typeof (options) === "function" && !progressCallback) {
        progressCallback = options;
        options = {};
    }
    if (!options) {
        options = {};
    }
    const privateKey = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.arrayify)(account.privateKey);
    const passwordBytes = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.getPassword)(password);
    let entropy = null;
    let path = null;
    let locale = null;
    if (hasMnemonic(account)) {
        const srcMnemonic = account.mnemonic;
        entropy = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.arrayify)((0,_ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_10__.mnemonicToEntropy)(srcMnemonic.phrase, srcMnemonic.locale || "en"));
        path = srcMnemonic.path || _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_10__.defaultPath;
        locale = srcMnemonic.locale || "en";
    }
    let client = options.client;
    if (!client) {
        client = "ethers.js";
    }
    // Check/generate the salt
    let salt = null;
    if (options.salt) {
        salt = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.arrayify)(options.salt);
    }
    else {
        salt = (0,_ethersproject_random__WEBPACK_IMPORTED_MODULE_12__.randomBytes)(32);
        ;
    }
    // Override initialization vector
    let iv = null;
    if (options.iv) {
        iv = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.arrayify)(options.iv);
        if (iv.length !== 16) {
            throw new Error("invalid iv");
        }
    }
    else {
        iv = (0,_ethersproject_random__WEBPACK_IMPORTED_MODULE_12__.randomBytes)(16);
    }
    // Override the uuid
    let uuidRandom = null;
    if (options.uuid) {
        uuidRandom = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.arrayify)(options.uuid);
        if (uuidRandom.length !== 16) {
            throw new Error("invalid uuid");
        }
    }
    else {
        uuidRandom = (0,_ethersproject_random__WEBPACK_IMPORTED_MODULE_12__.randomBytes)(16);
    }
    // Override the scrypt password-based key derivation function parameters
    let N = (1 << 17), r = 8, p = 1;
    if (options.scrypt) {
        if (options.scrypt.N) {
            N = options.scrypt.N;
        }
        if (options.scrypt.r) {
            r = options.scrypt.r;
        }
        if (options.scrypt.p) {
            p = options.scrypt.p;
        }
    }
    // We take 64 bytes:
    //   - 32 bytes   As normal for the Web3 secret storage (derivedKey, macPrefix)
    //   - 32 bytes   AES key to encrypt mnemonic with (required here to be Ethers Wallet)
    return scrypt_js__WEBPACK_IMPORTED_MODULE_1___default().scrypt(passwordBytes, salt, N, r, p, 64, progressCallback).then((key) => {
        key = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.arrayify)(key);
        // This will be used to encrypt the wallet (as per Web3 secret storage)
        const derivedKey = key.slice(0, 16);
        const macPrefix = key.slice(16, 32);
        // This will be used to encrypt the mnemonic phrase (if any)
        const mnemonicKey = key.slice(32, 64);
        // Encrypt the private key
        const counter = new (aes_js__WEBPACK_IMPORTED_MODULE_0___default().Counter)(iv);
        const aesCtr = new (aes_js__WEBPACK_IMPORTED_MODULE_0___default().ModeOfOperation.ctr)(derivedKey, counter);
        const ciphertext = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.arrayify)(aesCtr.encrypt(privateKey));
        // Compute the message authentication code, used to check the password
        const mac = (0,_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_7__.keccak256)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.concat)([macPrefix, ciphertext]));
        // See: https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition
        const data = {
            address: account.address.substring(2).toLowerCase(),
            id: (0,_utils__WEBPACK_IMPORTED_MODULE_5__.uuidV4)(uuidRandom),
            version: 3,
            Crypto: {
                cipher: "aes-128-ctr",
                cipherparams: {
                    iv: (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.hexlify)(iv).substring(2),
                },
                ciphertext: (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.hexlify)(ciphertext).substring(2),
                kdf: "scrypt",
                kdfparams: {
                    salt: (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.hexlify)(salt).substring(2),
                    n: N,
                    dklen: 32,
                    p: p,
                    r: r
                },
                mac: mac.substring(2)
            }
        };
        // If we have a mnemonic, encrypt it into the JSON wallet
        if (entropy) {
            const mnemonicIv = (0,_ethersproject_random__WEBPACK_IMPORTED_MODULE_12__.randomBytes)(16);
            const mnemonicCounter = new (aes_js__WEBPACK_IMPORTED_MODULE_0___default().Counter)(mnemonicIv);
            const mnemonicAesCtr = new (aes_js__WEBPACK_IMPORTED_MODULE_0___default().ModeOfOperation.ctr)(mnemonicKey, mnemonicCounter);
            const mnemonicCiphertext = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.arrayify)(mnemonicAesCtr.encrypt(entropy));
            const now = new Date();
            const timestamp = (now.getUTCFullYear() + "-" +
                (0,_utils__WEBPACK_IMPORTED_MODULE_5__.zpad)(now.getUTCMonth() + 1, 2) + "-" +
                (0,_utils__WEBPACK_IMPORTED_MODULE_5__.zpad)(now.getUTCDate(), 2) + "T" +
                (0,_utils__WEBPACK_IMPORTED_MODULE_5__.zpad)(now.getUTCHours(), 2) + "-" +
                (0,_utils__WEBPACK_IMPORTED_MODULE_5__.zpad)(now.getUTCMinutes(), 2) + "-" +
                (0,_utils__WEBPACK_IMPORTED_MODULE_5__.zpad)(now.getUTCSeconds(), 2) + ".0Z");
            data["x-ethers"] = {
                client: client,
                gethFilename: ("UTC--" + timestamp + "--" + data.address),
                mnemonicCounter: (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.hexlify)(mnemonicIv).substring(2),
                mnemonicCiphertext: (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_6__.hexlify)(mnemonicCiphertext).substring(2),
                path: path,
                locale: locale,
                version: "0.1"
            };
        }
        return JSON.stringify(data);
    });
}
//# sourceMappingURL=keystore.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/json-wallets/lib.esm/utils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/json-wallets/lib.esm/utils.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPassword": () => (/* binding */ getPassword),
/* harmony export */   "looseArrayify": () => (/* binding */ looseArrayify),
/* harmony export */   "searchPath": () => (/* binding */ searchPath),
/* harmony export */   "uuidV4": () => (/* binding */ uuidV4),
/* harmony export */   "zpad": () => (/* binding */ zpad)
/* harmony export */ });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/strings */ "./node_modules/@ethersproject/strings/lib.esm/utf8.js");



function looseArrayify(hexString) {
    if (typeof (hexString) === 'string' && hexString.substring(0, 2) !== '0x') {
        hexString = '0x' + hexString;
    }
    return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__.arrayify)(hexString);
}
function zpad(value, length) {
    value = String(value);
    while (value.length < length) {
        value = '0' + value;
    }
    return value;
}
function getPassword(password) {
    if (typeof (password) === 'string') {
        return (0,_ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__.toUtf8Bytes)(password, _ethersproject_strings__WEBPACK_IMPORTED_MODULE_1__.UnicodeNormalizationForm.NFKC);
    }
    return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__.arrayify)(password);
}
function searchPath(object, path) {
    let currentChild = object;
    const comps = path.toLowerCase().split('/');
    for (let i = 0; i < comps.length; i++) {
        // Search for a child object with a case-insensitive matching key
        let matchingChild = null;
        for (const key in currentChild) {
            if (key.toLowerCase() === comps[i]) {
                matchingChild = currentChild[key];
                break;
            }
        }
        // Didn't find one. :'(
        if (matchingChild === null) {
            return null;
        }
        // Now check this child...
        currentChild = matchingChild;
    }
    return currentChild;
}
// See: https://www.ietf.org/rfc/rfc4122.txt (Section 4.4)
function uuidV4(randomBytes) {
    const bytes = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__.arrayify)(randomBytes);
    // Section: 4.1.3:
    // - time_hi_and_version[12:16] = 0b0100
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    // Section 4.4
    // - clock_seq_hi_and_reserved[6] = 0b0
    // - clock_seq_hi_and_reserved[7] = 0b1
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const value = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__.hexlify)(bytes);
    return [
        value.substring(2, 10),
        value.substring(10, 14),
        value.substring(14, 18),
        value.substring(18, 22),
        value.substring(22, 34),
    ].join("-");
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/pbkdf2/lib.esm/pbkdf2.js":
/*!**************************************************************!*\
  !*** ./node_modules/@ethersproject/pbkdf2/lib.esm/pbkdf2.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pbkdf2": () => (/* binding */ pbkdf2)
/* harmony export */ });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _ethersproject_sha2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/sha2 */ "./node_modules/@ethersproject/sha2/lib.esm/sha2.js");



function pbkdf2(password, salt, iterations, keylen, hashAlgorithm) {
    password = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__.arrayify)(password);
    salt = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__.arrayify)(salt);
    let hLen;
    let l = 1;
    const DK = new Uint8Array(keylen);
    const block1 = new Uint8Array(salt.length + 4);
    block1.set(salt);
    //salt.copy(block1, 0, 0, salt.length)
    let r;
    let T;
    for (let i = 1; i <= l; i++) {
        //block1.writeUInt32BE(i, salt.length)
        block1[salt.length] = (i >> 24) & 0xff;
        block1[salt.length + 1] = (i >> 16) & 0xff;
        block1[salt.length + 2] = (i >> 8) & 0xff;
        block1[salt.length + 3] = i & 0xff;
        //let U = createHmac(password).update(block1).digest();
        let U = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__.arrayify)((0,_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_1__.computeHmac)(hashAlgorithm, password, block1));
        if (!hLen) {
            hLen = U.length;
            T = new Uint8Array(hLen);
            l = Math.ceil(keylen / hLen);
            r = keylen - (l - 1) * hLen;
        }
        //U.copy(T, 0, 0, hLen)
        T.set(U);
        for (let j = 1; j < iterations; j++) {
            //U = createHmac(password).update(U).digest();
            U = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__.arrayify)((0,_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_1__.computeHmac)(hashAlgorithm, password, U));
            for (let k = 0; k < hLen; k++)
                T[k] ^= U[k];
        }
        const destPos = (i - 1) * hLen;
        const len = (i === l ? r : hLen);
        //T.copy(DK, destPos, 0, len)
        DK.set((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__.arrayify)(T).slice(0, len), destPos);
    }
    return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_0__.hexlify)(DK);
}
//# sourceMappingURL=pbkdf2.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/random/lib.esm/_version.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ethersproject/random/lib.esm/_version.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
const version = "random/5.6.1";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/random/lib.esm/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ethersproject/random/lib.esm/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomBytes": () => (/* reexport safe */ _random__WEBPACK_IMPORTED_MODULE_0__.randomBytes),
/* harmony export */   "shuffled": () => (/* reexport safe */ _shuffle__WEBPACK_IMPORTED_MODULE_1__.shuffled)
/* harmony export */ });
/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random */ "./node_modules/@ethersproject/random/lib.esm/random.js");
/* harmony import */ var _shuffle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shuffle */ "./node_modules/@ethersproject/random/lib.esm/shuffle.js");



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/random/lib.esm/random.js":
/*!**************************************************************!*\
  !*** ./node_modules/@ethersproject/random/lib.esm/random.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomBytes": () => (/* binding */ randomBytes)
/* harmony export */ });
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version */ "./node_modules/@ethersproject/random/lib.esm/_version.js");




const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger(_version__WEBPACK_IMPORTED_MODULE_1__.version);
// Debugging line for testing browser lib in node
//const window = { crypto: { getRandomValues: () => { } } };
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
function getGlobal() {
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error('unable to locate global object');
}
;
const anyGlobal = getGlobal();
let crypto = anyGlobal.crypto || anyGlobal.msCrypto;
if (!crypto || !crypto.getRandomValues) {
    logger.warn("WARNING: Missing strong random number source");
    crypto = {
        getRandomValues: function (buffer) {
            return logger.throwError("no secure random source avaialble", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "crypto.getRandomValues"
            });
        }
    };
}
function randomBytes(length) {
    if (length <= 0 || length > 1024 || (length % 1) || length != length) {
        logger.throwArgumentError("invalid length", "length", length);
    }
    const result = new Uint8Array(length);
    crypto.getRandomValues(result);
    return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.arrayify)(result);
}
;
//# sourceMappingURL=random.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/random/lib.esm/shuffle.js":
/*!***************************************************************!*\
  !*** ./node_modules/@ethersproject/random/lib.esm/shuffle.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shuffled": () => (/* binding */ shuffled)
/* harmony export */ });

function shuffled(array) {
    array = array.slice();
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
    return array;
}
//# sourceMappingURL=shuffle.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/sha2/lib.esm/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@ethersproject/sha2/lib.esm/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SupportedAlgorithm": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_1__.SupportedAlgorithm),
/* harmony export */   "computeHmac": () => (/* reexport safe */ _sha2__WEBPACK_IMPORTED_MODULE_0__.computeHmac),
/* harmony export */   "ripemd160": () => (/* reexport safe */ _sha2__WEBPACK_IMPORTED_MODULE_0__.ripemd160),
/* harmony export */   "sha256": () => (/* reexport safe */ _sha2__WEBPACK_IMPORTED_MODULE_0__.sha256),
/* harmony export */   "sha512": () => (/* reexport safe */ _sha2__WEBPACK_IMPORTED_MODULE_0__.sha512)
/* harmony export */ });
/* harmony import */ var _sha2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sha2 */ "./node_modules/@ethersproject/sha2/lib.esm/sha2.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./node_modules/@ethersproject/sha2/lib.esm/types.js");



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/solidity/lib.esm/_version.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/solidity/lib.esm/_version.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
const version = "solidity/5.6.1";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/solidity/lib.esm/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@ethersproject/solidity/lib.esm/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "keccak256": () => (/* binding */ keccak256),
/* harmony export */   "pack": () => (/* binding */ pack),
/* harmony export */   "sha256": () => (/* binding */ sha256)
/* harmony export */ });
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/bignumber */ "./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/keccak256 */ "./node_modules/@ethersproject/keccak256/lib.esm/index.js");
/* harmony import */ var _ethersproject_sha2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/sha2 */ "./node_modules/@ethersproject/sha2/lib.esm/sha2.js");
/* harmony import */ var _ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/strings */ "./node_modules/@ethersproject/strings/lib.esm/utf8.js");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version */ "./node_modules/@ethersproject/solidity/lib.esm/_version.js");






const regexBytes = new RegExp("^bytes([0-9]+)$");
const regexNumber = new RegExp("^(u?int)([0-9]*)$");
const regexArray = new RegExp("^(.*)\\[([0-9]*)\\]$");
const Zeros = "0000000000000000000000000000000000000000000000000000000000000000";


const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger(_version__WEBPACK_IMPORTED_MODULE_1__.version);
function _pack(type, value, isArray) {
    switch (type) {
        case "address":
            if (isArray) {
                return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.zeroPad)(value, 32);
            }
            return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.arrayify)(value);
        case "string":
            return (0,_ethersproject_strings__WEBPACK_IMPORTED_MODULE_3__.toUtf8Bytes)(value);
        case "bytes":
            return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.arrayify)(value);
        case "bool":
            value = (value ? "0x01" : "0x00");
            if (isArray) {
                return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.zeroPad)(value, 32);
            }
            return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.arrayify)(value);
    }
    let match = type.match(regexNumber);
    if (match) {
        //let signed = (match[1] === "int")
        let size = parseInt(match[2] || "256");
        if ((match[2] && String(size) !== match[2]) || (size % 8 !== 0) || size === 0 || size > 256) {
            logger.throwArgumentError("invalid number type", "type", type);
        }
        if (isArray) {
            size = 256;
        }
        value = _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_4__.BigNumber.from(value).toTwos(size);
        return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.zeroPad)(value, size / 8);
    }
    match = type.match(regexBytes);
    if (match) {
        const size = parseInt(match[1]);
        if (String(size) !== match[1] || size === 0 || size > 32) {
            logger.throwArgumentError("invalid bytes type", "type", type);
        }
        if ((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.arrayify)(value).byteLength !== size) {
            logger.throwArgumentError(`invalid value for ${type}`, "value", value);
        }
        if (isArray) {
            return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.arrayify)((value + Zeros).substring(0, 66));
        }
        return value;
    }
    match = type.match(regexArray);
    if (match && Array.isArray(value)) {
        const baseType = match[1];
        const count = parseInt(match[2] || String(value.length));
        if (count != value.length) {
            logger.throwArgumentError(`invalid array length for ${type}`, "value", value);
        }
        const result = [];
        value.forEach(function (value) {
            result.push(_pack(baseType, value, true));
        });
        return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.concat)(result);
    }
    return logger.throwArgumentError("invalid type", "type", type);
}
// @TODO: Array Enum
function pack(types, values) {
    if (types.length != values.length) {
        logger.throwArgumentError("wrong number of values; expected ${ types.length }", "values", values);
    }
    const tight = [];
    types.forEach(function (type, index) {
        tight.push(_pack(type, values[index]));
    });
    return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.hexlify)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.concat)(tight));
}
function keccak256(types, values) {
    return (0,_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_5__.keccak256)(pack(types, values));
}
function sha256(types, values) {
    return (0,_ethersproject_sha2__WEBPACK_IMPORTED_MODULE_6__.sha256)(pack(types, values));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/strings/lib.esm/bytes32.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ethersproject/strings/lib.esm/bytes32.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatBytes32String": () => (/* binding */ formatBytes32String),
/* harmony export */   "parseBytes32String": () => (/* binding */ parseBytes32String)
/* harmony export */ });
/* harmony import */ var _ethersproject_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/constants */ "./node_modules/@ethersproject/constants/lib.esm/hashes.js");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _utf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utf8 */ "./node_modules/@ethersproject/strings/lib.esm/utf8.js");




function formatBytes32String(text) {
    // Get the bytes
    const bytes = (0,_utf8__WEBPACK_IMPORTED_MODULE_0__.toUtf8Bytes)(text);
    // Check we have room for null-termination
    if (bytes.length > 31) {
        throw new Error("bytes32 string must be less than 32 bytes");
    }
    // Zero-pad (implicitly null-terminates)
    return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__.hexlify)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__.concat)([bytes, _ethersproject_constants__WEBPACK_IMPORTED_MODULE_2__.HashZero]).slice(0, 32));
}
function parseBytes32String(bytes) {
    const data = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_1__.arrayify)(bytes);
    // Must be 32 bytes with a null-termination
    if (data.length !== 32) {
        throw new Error("invalid bytes32 - not 32 bytes long");
    }
    if (data[31] !== 0) {
        throw new Error("invalid bytes32 string - no null terminator");
    }
    // Find the null termination
    let length = 31;
    while (data[length - 1] === 0) {
        length--;
    }
    // Determine the string value
    return (0,_utf8__WEBPACK_IMPORTED_MODULE_0__.toUtf8String)(data.slice(0, length));
}
//# sourceMappingURL=bytes32.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/strings/lib.esm/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@ethersproject/strings/lib.esm/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnicodeNormalizationForm": () => (/* reexport safe */ _utf8__WEBPACK_IMPORTED_MODULE_0__.UnicodeNormalizationForm),
/* harmony export */   "Utf8ErrorFuncs": () => (/* reexport safe */ _utf8__WEBPACK_IMPORTED_MODULE_0__.Utf8ErrorFuncs),
/* harmony export */   "Utf8ErrorReason": () => (/* reexport safe */ _utf8__WEBPACK_IMPORTED_MODULE_0__.Utf8ErrorReason),
/* harmony export */   "_toEscapedUtf8String": () => (/* reexport safe */ _utf8__WEBPACK_IMPORTED_MODULE_0__._toEscapedUtf8String),
/* harmony export */   "formatBytes32String": () => (/* reexport safe */ _bytes32__WEBPACK_IMPORTED_MODULE_1__.formatBytes32String),
/* harmony export */   "nameprep": () => (/* reexport safe */ _idna__WEBPACK_IMPORTED_MODULE_2__.nameprep),
/* harmony export */   "parseBytes32String": () => (/* reexport safe */ _bytes32__WEBPACK_IMPORTED_MODULE_1__.parseBytes32String),
/* harmony export */   "toUtf8Bytes": () => (/* reexport safe */ _utf8__WEBPACK_IMPORTED_MODULE_0__.toUtf8Bytes),
/* harmony export */   "toUtf8CodePoints": () => (/* reexport safe */ _utf8__WEBPACK_IMPORTED_MODULE_0__.toUtf8CodePoints),
/* harmony export */   "toUtf8String": () => (/* reexport safe */ _utf8__WEBPACK_IMPORTED_MODULE_0__.toUtf8String)
/* harmony export */ });
/* harmony import */ var _bytes32__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytes32 */ "./node_modules/@ethersproject/strings/lib.esm/bytes32.js");
/* harmony import */ var _idna__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./idna */ "./node_modules/@ethersproject/strings/lib.esm/idna.js");
/* harmony import */ var _utf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utf8 */ "./node_modules/@ethersproject/strings/lib.esm/utf8.js");





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/units/lib.esm/_version.js":
/*!***************************************************************!*\
  !*** ./node_modules/@ethersproject/units/lib.esm/_version.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
const version = "units/5.6.1";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/units/lib.esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@ethersproject/units/lib.esm/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "commify": () => (/* binding */ commify),
/* harmony export */   "formatEther": () => (/* binding */ formatEther),
/* harmony export */   "formatUnits": () => (/* binding */ formatUnits),
/* harmony export */   "parseEther": () => (/* binding */ parseEther),
/* harmony export */   "parseUnits": () => (/* binding */ parseUnits)
/* harmony export */ });
/* harmony import */ var _ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bignumber */ "./node_modules/@ethersproject/bignumber/lib.esm/fixednumber.js");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version */ "./node_modules/@ethersproject/units/lib.esm/_version.js");




const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger(_version__WEBPACK_IMPORTED_MODULE_1__.version);
const names = [
    "wei",
    "kwei",
    "mwei",
    "gwei",
    "szabo",
    "finney",
    "ether",
];
// Some environments have issues with RegEx that contain back-tracking, so we cannot
// use them.
function commify(value) {
    const comps = String(value).split(".");
    if (comps.length > 2 || !comps[0].match(/^-?[0-9]*$/) || (comps[1] && !comps[1].match(/^[0-9]*$/)) || value === "." || value === "-.") {
        logger.throwArgumentError("invalid value", "value", value);
    }
    // Make sure we have at least one whole digit (0 if none)
    let whole = comps[0];
    let negative = "";
    if (whole.substring(0, 1) === "-") {
        negative = "-";
        whole = whole.substring(1);
    }
    // Make sure we have at least 1 whole digit with no leading zeros
    while (whole.substring(0, 1) === "0") {
        whole = whole.substring(1);
    }
    if (whole === "") {
        whole = "0";
    }
    let suffix = "";
    if (comps.length === 2) {
        suffix = "." + (comps[1] || "0");
    }
    while (suffix.length > 2 && suffix[suffix.length - 1] === "0") {
        suffix = suffix.substring(0, suffix.length - 1);
    }
    const formatted = [];
    while (whole.length) {
        if (whole.length <= 3) {
            formatted.unshift(whole);
            break;
        }
        else {
            const index = whole.length - 3;
            formatted.unshift(whole.substring(index));
            whole = whole.substring(0, index);
        }
    }
    return negative + formatted.join(",") + suffix;
}
function formatUnits(value, unitName) {
    if (typeof (unitName) === "string") {
        const index = names.indexOf(unitName);
        if (index !== -1) {
            unitName = 3 * index;
        }
    }
    return (0,_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__.formatFixed)(value, (unitName != null) ? unitName : 18);
}
function parseUnits(value, unitName) {
    if (typeof (value) !== "string") {
        logger.throwArgumentError("value must be a string", "value", value);
    }
    if (typeof (unitName) === "string") {
        const index = names.indexOf(unitName);
        if (index !== -1) {
            unitName = 3 * index;
        }
    }
    return (0,_ethersproject_bignumber__WEBPACK_IMPORTED_MODULE_2__.parseFixed)(value, (unitName != null) ? unitName : 18);
}
function formatEther(wei) {
    return formatUnits(wei, 18);
}
function parseEther(ether) {
    return parseUnits(ether, 18);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/wallet/lib.esm/_version.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ethersproject/wallet/lib.esm/_version.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
const version = "wallet/5.6.2";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/wallet/lib.esm/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ethersproject/wallet/lib.esm/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Wallet": () => (/* binding */ Wallet),
/* harmony export */   "verifyMessage": () => (/* binding */ verifyMessage),
/* harmony export */   "verifyTypedData": () => (/* binding */ verifyTypedData)
/* harmony export */ });
/* harmony import */ var _ethersproject_address__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ethersproject/address */ "./node_modules/@ethersproject/address/lib.esm/index.js");
/* harmony import */ var _ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ethersproject/abstract-provider */ "./node_modules/@ethersproject/abstract-provider/lib.esm/index.js");
/* harmony import */ var _ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/abstract-signer */ "./node_modules/@ethersproject/abstract-signer/lib.esm/index.js");
/* harmony import */ var _ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
/* harmony import */ var _ethersproject_hash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ethersproject/hash */ "./node_modules/@ethersproject/hash/lib.esm/message.js");
/* harmony import */ var _ethersproject_hash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ethersproject/hash */ "./node_modules/@ethersproject/hash/lib.esm/typed-data.js");
/* harmony import */ var _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ethersproject/hdnode */ "./node_modules/@ethersproject/hdnode/lib.esm/index.js");
/* harmony import */ var _ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ethersproject/keccak256 */ "./node_modules/@ethersproject/keccak256/lib.esm/index.js");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ethersproject/properties */ "./node_modules/@ethersproject/properties/lib.esm/index.js");
/* harmony import */ var _ethersproject_random__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ethersproject/random */ "./node_modules/@ethersproject/random/lib.esm/random.js");
/* harmony import */ var _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ethersproject/signing-key */ "./node_modules/@ethersproject/signing-key/lib.esm/index.js");
/* harmony import */ var _ethersproject_json_wallets__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ethersproject/json-wallets */ "./node_modules/@ethersproject/json-wallets/lib.esm/keystore.js");
/* harmony import */ var _ethersproject_json_wallets__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ethersproject/json-wallets */ "./node_modules/@ethersproject/json-wallets/lib.esm/index.js");
/* harmony import */ var _ethersproject_transactions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ethersproject/transactions */ "./node_modules/@ethersproject/transactions/lib.esm/index.js");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version */ "./node_modules/@ethersproject/wallet/lib.esm/_version.js");

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};














const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger(_version__WEBPACK_IMPORTED_MODULE_1__.version);
function isAccount(value) {
    return (value != null && (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.isHexString)(value.privateKey, 32) && value.address != null);
}
function hasMnemonic(value) {
    const mnemonic = value.mnemonic;
    return (mnemonic && mnemonic.phrase);
}
class Wallet extends _ethersproject_abstract_signer__WEBPACK_IMPORTED_MODULE_3__.Signer {
    constructor(privateKey, provider) {
        super();
        if (isAccount(privateKey)) {
            const signingKey = new _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_4__.SigningKey(privateKey.privateKey);
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__.defineReadOnly)(this, "_signingKey", () => signingKey);
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__.defineReadOnly)(this, "address", (0,_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_6__.computeAddress)(this.publicKey));
            if (this.address !== (0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_7__.getAddress)(privateKey.address)) {
                logger.throwArgumentError("privateKey/address mismatch", "privateKey", "[REDACTED]");
            }
            if (hasMnemonic(privateKey)) {
                const srcMnemonic = privateKey.mnemonic;
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__.defineReadOnly)(this, "_mnemonic", () => ({
                    phrase: srcMnemonic.phrase,
                    path: srcMnemonic.path || _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_8__.defaultPath,
                    locale: srcMnemonic.locale || "en"
                }));
                const mnemonic = this.mnemonic;
                const node = _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_8__.HDNode.fromMnemonic(mnemonic.phrase, null, mnemonic.locale).derivePath(mnemonic.path);
                if ((0,_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_6__.computeAddress)(node.privateKey) !== this.address) {
                    logger.throwArgumentError("mnemonic/address mismatch", "privateKey", "[REDACTED]");
                }
            }
            else {
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__.defineReadOnly)(this, "_mnemonic", () => null);
            }
        }
        else {
            if (_ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_4__.SigningKey.isSigningKey(privateKey)) {
                /* istanbul ignore if */
                if (privateKey.curve !== "secp256k1") {
                    logger.throwArgumentError("unsupported curve; must be secp256k1", "privateKey", "[REDACTED]");
                }
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__.defineReadOnly)(this, "_signingKey", () => privateKey);
            }
            else {
                // A lot of common tools do not prefix private keys with a 0x (see: #1166)
                if (typeof (privateKey) === "string") {
                    if (privateKey.match(/^[0-9a-f]*$/i) && privateKey.length === 64) {
                        privateKey = "0x" + privateKey;
                    }
                }
                const signingKey = new _ethersproject_signing_key__WEBPACK_IMPORTED_MODULE_4__.SigningKey(privateKey);
                (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__.defineReadOnly)(this, "_signingKey", () => signingKey);
            }
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__.defineReadOnly)(this, "_mnemonic", () => null);
            (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__.defineReadOnly)(this, "address", (0,_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_6__.computeAddress)(this.publicKey));
        }
        /* istanbul ignore if */
        if (provider && !_ethersproject_abstract_provider__WEBPACK_IMPORTED_MODULE_9__.Provider.isProvider(provider)) {
            logger.throwArgumentError("invalid provider", "provider", provider);
        }
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__.defineReadOnly)(this, "provider", provider || null);
    }
    get mnemonic() { return this._mnemonic(); }
    get privateKey() { return this._signingKey().privateKey; }
    get publicKey() { return this._signingKey().publicKey; }
    getAddress() {
        return Promise.resolve(this.address);
    }
    connect(provider) {
        return new Wallet(this, provider);
    }
    signTransaction(transaction) {
        return (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_5__.resolveProperties)(transaction).then((tx) => {
            if (tx.from != null) {
                if ((0,_ethersproject_address__WEBPACK_IMPORTED_MODULE_7__.getAddress)(tx.from) !== this.address) {
                    logger.throwArgumentError("transaction from address mismatch", "transaction.from", transaction.from);
                }
                delete tx.from;
            }
            const signature = this._signingKey().signDigest((0,_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_10__.keccak256)((0,_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_6__.serialize)(tx)));
            return (0,_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_6__.serialize)(tx, signature);
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.joinSignature)(this._signingKey().signDigest((0,_ethersproject_hash__WEBPACK_IMPORTED_MODULE_11__.hashMessage)(message)));
        });
    }
    _signTypedData(domain, types, value) {
        return __awaiter(this, void 0, void 0, function* () {
            // Populate any ENS names
            const populated = yield _ethersproject_hash__WEBPACK_IMPORTED_MODULE_12__.TypedDataEncoder.resolveNames(domain, types, value, (name) => {
                if (this.provider == null) {
                    logger.throwError("cannot resolve ENS names without a provider", _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.errors.UNSUPPORTED_OPERATION, {
                        operation: "resolveName",
                        value: name
                    });
                }
                return this.provider.resolveName(name);
            });
            return (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.joinSignature)(this._signingKey().signDigest(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_12__.TypedDataEncoder.hash(populated.domain, types, populated.value)));
        });
    }
    encrypt(password, options, progressCallback) {
        if (typeof (options) === "function" && !progressCallback) {
            progressCallback = options;
            options = {};
        }
        if (progressCallback && typeof (progressCallback) !== "function") {
            throw new Error("invalid callback");
        }
        if (!options) {
            options = {};
        }
        return (0,_ethersproject_json_wallets__WEBPACK_IMPORTED_MODULE_13__.encrypt)(this, password, options, progressCallback);
    }
    /**
     *  Static methods to create Wallet instances.
     */
    static createRandom(options) {
        let entropy = (0,_ethersproject_random__WEBPACK_IMPORTED_MODULE_14__.randomBytes)(16);
        if (!options) {
            options = {};
        }
        if (options.extraEntropy) {
            entropy = (0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.arrayify)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.hexDataSlice)((0,_ethersproject_keccak256__WEBPACK_IMPORTED_MODULE_10__.keccak256)((0,_ethersproject_bytes__WEBPACK_IMPORTED_MODULE_2__.concat)([entropy, options.extraEntropy])), 0, 16));
        }
        const mnemonic = (0,_ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_8__.entropyToMnemonic)(entropy, options.locale);
        return Wallet.fromMnemonic(mnemonic, options.path, options.locale);
    }
    static fromEncryptedJson(json, password, progressCallback) {
        return (0,_ethersproject_json_wallets__WEBPACK_IMPORTED_MODULE_15__.decryptJsonWallet)(json, password, progressCallback).then((account) => {
            return new Wallet(account);
        });
    }
    static fromEncryptedJsonSync(json, password) {
        return new Wallet((0,_ethersproject_json_wallets__WEBPACK_IMPORTED_MODULE_15__.decryptJsonWalletSync)(json, password));
    }
    static fromMnemonic(mnemonic, path, wordlist) {
        if (!path) {
            path = _ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_8__.defaultPath;
        }
        return new Wallet(_ethersproject_hdnode__WEBPACK_IMPORTED_MODULE_8__.HDNode.fromMnemonic(mnemonic, null, wordlist).derivePath(path));
    }
}
function verifyMessage(message, signature) {
    return (0,_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_6__.recoverAddress)((0,_ethersproject_hash__WEBPACK_IMPORTED_MODULE_11__.hashMessage)(message), signature);
}
function verifyTypedData(domain, types, value, signature) {
    return (0,_ethersproject_transactions__WEBPACK_IMPORTED_MODULE_6__.recoverAddress)(_ethersproject_hash__WEBPACK_IMPORTED_MODULE_12__.TypedDataEncoder.hash(domain, types, value), signature);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/wordlists/lib.esm/_version.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/_version.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* binding */ version)
/* harmony export */ });
const version = "wordlists/5.6.1";
//# sourceMappingURL=_version.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/wordlists/lib.esm/lang-en.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/lang-en.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "langEn": () => (/* binding */ langEn)
/* harmony export */ });
/* harmony import */ var _wordlist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wordlist */ "./node_modules/@ethersproject/wordlists/lib.esm/wordlist.js");


const words = "AbandonAbilityAbleAboutAboveAbsentAbsorbAbstractAbsurdAbuseAccessAccidentAccountAccuseAchieveAcidAcousticAcquireAcrossActActionActorActressActualAdaptAddAddictAddressAdjustAdmitAdultAdvanceAdviceAerobicAffairAffordAfraidAgainAgeAgentAgreeAheadAimAirAirportAisleAlarmAlbumAlcoholAlertAlienAllAlleyAllowAlmostAloneAlphaAlreadyAlsoAlterAlwaysAmateurAmazingAmongAmountAmusedAnalystAnchorAncientAngerAngleAngryAnimalAnkleAnnounceAnnualAnotherAnswerAntennaAntiqueAnxietyAnyApartApologyAppearAppleApproveAprilArchArcticAreaArenaArgueArmArmedArmorArmyAroundArrangeArrestArriveArrowArtArtefactArtistArtworkAskAspectAssaultAssetAssistAssumeAsthmaAthleteAtomAttackAttendAttitudeAttractAuctionAuditAugustAuntAuthorAutoAutumnAverageAvocadoAvoidAwakeAwareAwayAwesomeAwfulAwkwardAxisBabyBachelorBaconBadgeBagBalanceBalconyBallBambooBananaBannerBarBarelyBargainBarrelBaseBasicBasketBattleBeachBeanBeautyBecauseBecomeBeefBeforeBeginBehaveBehindBelieveBelowBeltBenchBenefitBestBetrayBetterBetweenBeyondBicycleBidBikeBindBiologyBirdBirthBitterBlackBladeBlameBlanketBlastBleakBlessBlindBloodBlossomBlouseBlueBlurBlushBoardBoatBodyBoilBombBoneBonusBookBoostBorderBoringBorrowBossBottomBounceBoxBoyBracketBrainBrandBrassBraveBreadBreezeBrickBridgeBriefBrightBringBriskBroccoliBrokenBronzeBroomBrotherBrownBrushBubbleBuddyBudgetBuffaloBuildBulbBulkBulletBundleBunkerBurdenBurgerBurstBusBusinessBusyButterBuyerBuzzCabbageCabinCableCactusCageCakeCallCalmCameraCampCanCanalCancelCandyCannonCanoeCanvasCanyonCapableCapitalCaptainCarCarbonCardCargoCarpetCarryCartCaseCashCasinoCastleCasualCatCatalogCatchCategoryCattleCaughtCauseCautionCaveCeilingCeleryCementCensusCenturyCerealCertainChairChalkChampionChangeChaosChapterChargeChaseChatCheapCheckCheeseChefCherryChestChickenChiefChildChimneyChoiceChooseChronicChuckleChunkChurnCigarCinnamonCircleCitizenCityCivilClaimClapClarifyClawClayCleanClerkCleverClickClientCliffClimbClinicClipClockClogCloseClothCloudClownClubClumpClusterClutchCoachCoastCoconutCodeCoffeeCoilCoinCollectColorColumnCombineComeComfortComicCommonCompanyConcertConductConfirmCongressConnectConsiderControlConvinceCookCoolCopperCopyCoralCoreCornCorrectCostCottonCouchCountryCoupleCourseCousinCoverCoyoteCrackCradleCraftCramCraneCrashCraterCrawlCrazyCreamCreditCreekCrewCricketCrimeCrispCriticCropCrossCrouchCrowdCrucialCruelCruiseCrumbleCrunchCrushCryCrystalCubeCultureCupCupboardCuriousCurrentCurtainCurveCushionCustomCuteCycleDadDamageDampDanceDangerDaringDashDaughterDawnDayDealDebateDebrisDecadeDecemberDecideDeclineDecorateDecreaseDeerDefenseDefineDefyDegreeDelayDeliverDemandDemiseDenialDentistDenyDepartDependDepositDepthDeputyDeriveDescribeDesertDesignDeskDespairDestroyDetailDetectDevelopDeviceDevoteDiagramDialDiamondDiaryDiceDieselDietDifferDigitalDignityDilemmaDinnerDinosaurDirectDirtDisagreeDiscoverDiseaseDishDismissDisorderDisplayDistanceDivertDivideDivorceDizzyDoctorDocumentDogDollDolphinDomainDonateDonkeyDonorDoorDoseDoubleDoveDraftDragonDramaDrasticDrawDreamDressDriftDrillDrinkDripDriveDropDrumDryDuckDumbDuneDuringDustDutchDutyDwarfDynamicEagerEagleEarlyEarnEarthEasilyEastEasyEchoEcologyEconomyEdgeEditEducateEffortEggEightEitherElbowElderElectricElegantElementElephantElevatorEliteElseEmbarkEmbodyEmbraceEmergeEmotionEmployEmpowerEmptyEnableEnactEndEndlessEndorseEnemyEnergyEnforceEngageEngineEnhanceEnjoyEnlistEnoughEnrichEnrollEnsureEnterEntireEntryEnvelopeEpisodeEqualEquipEraEraseErodeErosionErrorEruptEscapeEssayEssenceEstateEternalEthicsEvidenceEvilEvokeEvolveExactExampleExcessExchangeExciteExcludeExcuseExecuteExerciseExhaustExhibitExileExistExitExoticExpandExpectExpireExplainExposeExpressExtendExtraEyeEyebrowFabricFaceFacultyFadeFaintFaithFallFalseFameFamilyFamousFanFancyFantasyFarmFashionFatFatalFatherFatigueFaultFavoriteFeatureFebruaryFederalFeeFeedFeelFemaleFenceFestivalFetchFeverFewFiberFictionFieldFigureFileFilmFilterFinalFindFineFingerFinishFireFirmFirstFiscalFishFitFitnessFixFlagFlameFlashFlatFlavorFleeFlightFlipFloatFlockFloorFlowerFluidFlushFlyFoamFocusFogFoilFoldFollowFoodFootForceForestForgetForkFortuneForumForwardFossilFosterFoundFoxFragileFrameFrequentFreshFriendFringeFrogFrontFrostFrownFrozenFruitFuelFunFunnyFurnaceFuryFutureGadgetGainGalaxyGalleryGameGapGarageGarbageGardenGarlicGarmentGasGaspGateGatherGaugeGazeGeneralGeniusGenreGentleGenuineGestureGhostGiantGiftGiggleGingerGiraffeGirlGiveGladGlanceGlareGlassGlideGlimpseGlobeGloomGloryGloveGlowGlueGoatGoddessGoldGoodGooseGorillaGospelGossipGovernGownGrabGraceGrainGrantGrapeGrassGravityGreatGreenGridGriefGritGroceryGroupGrowGruntGuardGuessGuideGuiltGuitarGunGymHabitHairHalfHammerHamsterHandHappyHarborHardHarshHarvestHatHaveHawkHazardHeadHealthHeartHeavyHedgehogHeightHelloHelmetHelpHenHeroHiddenHighHillHintHipHireHistoryHobbyHockeyHoldHoleHolidayHollowHomeHoneyHoodHopeHornHorrorHorseHospitalHostHotelHourHoverHubHugeHumanHumbleHumorHundredHungryHuntHurdleHurryHurtHusbandHybridIceIconIdeaIdentifyIdleIgnoreIllIllegalIllnessImageImitateImmenseImmuneImpactImposeImproveImpulseInchIncludeIncomeIncreaseIndexIndicateIndoorIndustryInfantInflictInformInhaleInheritInitialInjectInjuryInmateInnerInnocentInputInquiryInsaneInsectInsideInspireInstallIntactInterestIntoInvestInviteInvolveIronIslandIsolateIssueItemIvoryJacketJaguarJarJazzJealousJeansJellyJewelJobJoinJokeJourneyJoyJudgeJuiceJumpJungleJuniorJunkJustKangarooKeenKeepKetchupKeyKickKidKidneyKindKingdomKissKitKitchenKiteKittenKiwiKneeKnifeKnockKnowLabLabelLaborLadderLadyLakeLampLanguageLaptopLargeLaterLatinLaughLaundryLavaLawLawnLawsuitLayerLazyLeaderLeafLearnLeaveLectureLeftLegLegalLegendLeisureLemonLendLengthLensLeopardLessonLetterLevelLiarLibertyLibraryLicenseLifeLiftLightLikeLimbLimitLinkLionLiquidListLittleLiveLizardLoadLoanLobsterLocalLockLogicLonelyLongLoopLotteryLoudLoungeLoveLoyalLuckyLuggageLumberLunarLunchLuxuryLyricsMachineMadMagicMagnetMaidMailMainMajorMakeMammalManManageMandateMangoMansionManualMapleMarbleMarchMarginMarineMarketMarriageMaskMassMasterMatchMaterialMathMatrixMatterMaximumMazeMeadowMeanMeasureMeatMechanicMedalMediaMelodyMeltMemberMemoryMentionMenuMercyMergeMeritMerryMeshMessageMetalMethodMiddleMidnightMilkMillionMimicMindMinimumMinorMinuteMiracleMirrorMiseryMissMistakeMixMixedMixtureMobileModelModifyMomMomentMonitorMonkeyMonsterMonthMoonMoralMoreMorningMosquitoMotherMotionMotorMountainMouseMoveMovieMuchMuffinMuleMultiplyMuscleMuseumMushroomMusicMustMutualMyselfMysteryMythNaiveNameNapkinNarrowNastyNationNatureNearNeckNeedNegativeNeglectNeitherNephewNerveNestNetNetworkNeutralNeverNewsNextNiceNightNobleNoiseNomineeNoodleNormalNorthNoseNotableNoteNothingNoticeNovelNowNuclearNumberNurseNutOakObeyObjectObligeObscureObserveObtainObviousOccurOceanOctoberOdorOffOfferOfficeOftenOilOkayOldOliveOlympicOmitOnceOneOnionOnlineOnlyOpenOperaOpinionOpposeOptionOrangeOrbitOrchardOrderOrdinaryOrganOrientOriginalOrphanOstrichOtherOutdoorOuterOutputOutsideOvalOvenOverOwnOwnerOxygenOysterOzonePactPaddlePagePairPalacePalmPandaPanelPanicPantherPaperParadeParentParkParrotPartyPassPatchPathPatientPatrolPatternPausePavePaymentPeacePeanutPearPeasantPelicanPenPenaltyPencilPeoplePepperPerfectPermitPersonPetPhonePhotoPhrasePhysicalPianoPicnicPicturePiecePigPigeonPillPilotPinkPioneerPipePistolPitchPizzaPlacePlanetPlasticPlatePlayPleasePledgePluckPlugPlungePoemPoetPointPolarPolePolicePondPonyPoolPopularPortionPositionPossiblePostPotatoPotteryPovertyPowderPowerPracticePraisePredictPreferPreparePresentPrettyPreventPricePridePrimaryPrintPriorityPrisonPrivatePrizeProblemProcessProduceProfitProgramProjectPromoteProofPropertyProsperProtectProudProvidePublicPuddingPullPulpPulsePumpkinPunchPupilPuppyPurchasePurityPurposePursePushPutPuzzlePyramidQualityQuantumQuarterQuestionQuickQuitQuizQuoteRabbitRaccoonRaceRackRadarRadioRailRainRaiseRallyRampRanchRandomRangeRapidRareRateRatherRavenRawRazorReadyRealReasonRebelRebuildRecallReceiveRecipeRecordRecycleReduceReflectReformRefuseRegionRegretRegularRejectRelaxReleaseReliefRelyRemainRememberRemindRemoveRenderRenewRentReopenRepairRepeatReplaceReportRequireRescueResembleResistResourceResponseResultRetireRetreatReturnReunionRevealReviewRewardRhythmRibRibbonRiceRichRideRidgeRifleRightRigidRingRiotRippleRiskRitualRivalRiverRoadRoastRobotRobustRocketRomanceRoofRookieRoomRoseRotateRoughRoundRouteRoyalRubberRudeRugRuleRunRunwayRuralSadSaddleSadnessSafeSailSaladSalmonSalonSaltSaluteSameSampleSandSatisfySatoshiSauceSausageSaveSayScaleScanScareScatterSceneSchemeSchoolScienceScissorsScorpionScoutScrapScreenScriptScrubSeaSearchSeasonSeatSecondSecretSectionSecuritySeedSeekSegmentSelectSellSeminarSeniorSenseSentenceSeriesServiceSessionSettleSetupSevenShadowShaftShallowShareShedShellSheriffShieldShiftShineShipShiverShockShoeShootShopShortShoulderShoveShrimpShrugShuffleShySiblingSickSideSiegeSightSignSilentSilkSillySilverSimilarSimpleSinceSingSirenSisterSituateSixSizeSkateSketchSkiSkillSkinSkirtSkullSlabSlamSleepSlenderSliceSlideSlightSlimSloganSlotSlowSlushSmallSmartSmileSmokeSmoothSnackSnakeSnapSniffSnowSoapSoccerSocialSockSodaSoftSolarSoldierSolidSolutionSolveSomeoneSongSoonSorrySortSoulSoundSoupSourceSouthSpaceSpareSpatialSpawnSpeakSpecialSpeedSpellSpendSphereSpiceSpiderSpikeSpinSpiritSplitSpoilSponsorSpoonSportSpotSpraySpreadSpringSpySquareSqueezeSquirrelStableStadiumStaffStageStairsStampStandStartStateStaySteakSteelStemStepStereoStickStillStingStockStomachStoneStoolStoryStoveStrategyStreetStrikeStrongStruggleStudentStuffStumbleStyleSubjectSubmitSubwaySuccessSuchSuddenSufferSugarSuggestSuitSummerSunSunnySunsetSuperSupplySupremeSureSurfaceSurgeSurpriseSurroundSurveySuspectSustainSwallowSwampSwapSwarmSwearSweetSwiftSwimSwingSwitchSwordSymbolSymptomSyrupSystemTableTackleTagTailTalentTalkTankTapeTargetTaskTasteTattooTaxiTeachTeamTellTenTenantTennisTentTermTestTextThankThatThemeThenTheoryThereTheyThingThisThoughtThreeThriveThrowThumbThunderTicketTideTigerTiltTimberTimeTinyTipTiredTissueTitleToastTobaccoTodayToddlerToeTogetherToiletTokenTomatoTomorrowToneTongueTonightToolToothTopTopicToppleTorchTornadoTortoiseTossTotalTouristTowardTowerTownToyTrackTradeTrafficTragicTrainTransferTrapTrashTravelTrayTreatTreeTrendTrialTribeTrickTriggerTrimTripTrophyTroubleTruckTrueTrulyTrumpetTrustTruthTryTubeTuitionTumbleTunaTunnelTurkeyTurnTurtleTwelveTwentyTwiceTwinTwistTwoTypeTypicalUglyUmbrellaUnableUnawareUncleUncoverUnderUndoUnfairUnfoldUnhappyUniformUniqueUnitUniverseUnknownUnlockUntilUnusualUnveilUpdateUpgradeUpholdUponUpperUpsetUrbanUrgeUsageUseUsedUsefulUselessUsualUtilityVacantVacuumVagueValidValleyValveVanVanishVaporVariousVastVaultVehicleVelvetVendorVentureVenueVerbVerifyVersionVeryVesselVeteranViableVibrantViciousVictoryVideoViewVillageVintageViolinVirtualVirusVisaVisitVisualVitalVividVocalVoiceVoidVolcanoVolumeVoteVoyageWageWagonWaitWalkWallWalnutWantWarfareWarmWarriorWashWaspWasteWaterWaveWayWealthWeaponWearWeaselWeatherWebWeddingWeekendWeirdWelcomeWestWetWhaleWhatWheatWheelWhenWhereWhipWhisperWideWidthWifeWildWillWinWindowWineWingWinkWinnerWinterWireWisdomWiseWishWitnessWolfWomanWonderWoodWoolWordWorkWorldWorryWorthWrapWreckWrestleWristWriteWrongYardYearYellowYouYoungYouthZebraZeroZoneZoo";
let wordlist = null;
function loadWords(lang) {
    if (wordlist != null) {
        return;
    }
    wordlist = words.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ");
    // Verify the computed list matches the official list
    /* istanbul ignore if */
    if (_wordlist__WEBPACK_IMPORTED_MODULE_0__.Wordlist.check(lang) !== "0x3c8acc1e7b08d8e76f9fda015ef48dc8c710a73cb7e0f77b2c18a9b5a7adde60") {
        wordlist = null;
        throw new Error("BIP39 Wordlist for en (English) FAILED");
    }
}
class LangEn extends _wordlist__WEBPACK_IMPORTED_MODULE_0__.Wordlist {
    constructor() {
        super("en");
    }
    getWord(index) {
        loadWords(this);
        return wordlist[index];
    }
    getWordIndex(word) {
        loadWords(this);
        return wordlist.indexOf(word);
    }
}
const langEn = new LangEn();
_wordlist__WEBPACK_IMPORTED_MODULE_0__.Wordlist.register(langEn);

//# sourceMappingURL=lang-en.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/wordlists/lib.esm/wordlist.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/wordlist.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Wordlist": () => (/* binding */ Wordlist),
/* harmony export */   "logger": () => (/* binding */ logger)
/* harmony export */ });
/* harmony import */ var _ethersproject_hash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ethersproject/hash */ "./node_modules/@ethersproject/hash/lib.esm/id.js");
/* harmony import */ var _ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ethersproject/properties */ "./node_modules/@ethersproject/properties/lib.esm/index.js");
/* harmony import */ var _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version */ "./node_modules/@ethersproject/wordlists/lib.esm/_version.js");

// This gets overridden by rollup
const exportWordlist = false;




const logger = new _ethersproject_logger__WEBPACK_IMPORTED_MODULE_0__.Logger(_version__WEBPACK_IMPORTED_MODULE_1__.version);
class Wordlist {
    constructor(locale) {
        logger.checkAbstract(new.target, Wordlist);
        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__.defineReadOnly)(this, "locale", locale);
    }
    // Subclasses may override this
    split(mnemonic) {
        return mnemonic.toLowerCase().split(/ +/g);
    }
    // Subclasses may override this
    join(words) {
        return words.join(" ");
    }
    static check(wordlist) {
        const words = [];
        for (let i = 0; i < 2048; i++) {
            const word = wordlist.getWord(i);
            /* istanbul ignore if */
            if (i !== wordlist.getWordIndex(word)) {
                return "0x";
            }
            words.push(word);
        }
        return (0,_ethersproject_hash__WEBPACK_IMPORTED_MODULE_3__.id)(words.join("\n") + "\n");
    }
    static register(lang, name) {
        if (!name) {
            name = lang.locale;
        }
        /* istanbul ignore if */
        if (exportWordlist) {
            try {
                const anyGlobal = window;
                if (anyGlobal._ethers && anyGlobal._ethers.wordlists) {
                    if (!anyGlobal._ethers.wordlists[name]) {
                        (0,_ethersproject_properties__WEBPACK_IMPORTED_MODULE_2__.defineReadOnly)(anyGlobal._ethers.wordlists, name, lang);
                    }
                }
            }
            catch (error) { }
        }
    }
}
//# sourceMappingURL=wordlist.js.map

/***/ }),

/***/ "./node_modules/@ethersproject/wordlists/lib.esm/wordlists.js":
/*!********************************************************************!*\
  !*** ./node_modules/@ethersproject/wordlists/lib.esm/wordlists.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wordlists": () => (/* binding */ wordlists)
/* harmony export */ });
/* harmony import */ var _lang_en__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lang-en */ "./node_modules/@ethersproject/wordlists/lib.esm/lang-en.js");


const wordlists = {
    en: _lang_en__WEBPACK_IMPORTED_MODULE_0__.langEn
};
//# sourceMappingURL=wordlists.js.map

/***/ }),

/***/ "./node_modules/@web3-react/abstract-connector/dist/abstract-connector.esm.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@web3-react/abstract-connector/dist/abstract-connector.esm.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractConnector": () => (/* binding */ AbstractConnector)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "events");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _web3_react_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web3-react/types */ "./node_modules/@web3-react/types/dist/types.esm.js");



function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var AbstractConnector =
/*#__PURE__*/
function (_EventEmitter) {
  _inheritsLoose(AbstractConnector, _EventEmitter);

  function AbstractConnector(_temp) {
    var _this;

    var _ref = _temp === void 0 ? {} : _temp,
        supportedChainIds = _ref.supportedChainIds;

    _this = _EventEmitter.call(this) || this;
    _this.supportedChainIds = supportedChainIds;
    return _this;
  }

  var _proto = AbstractConnector.prototype;

  _proto.emitUpdate = function emitUpdate(update) {
    if (true) {
      console.log("Emitting '" + _web3_react_types__WEBPACK_IMPORTED_MODULE_1__.ConnectorEvent.Update + "' with payload", update);
    }

    this.emit(_web3_react_types__WEBPACK_IMPORTED_MODULE_1__.ConnectorEvent.Update, update);
  };

  _proto.emitError = function emitError(error) {
    if (true) {
      console.log("Emitting '" + _web3_react_types__WEBPACK_IMPORTED_MODULE_1__.ConnectorEvent.Error + "' with payload", error);
    }

    this.emit(_web3_react_types__WEBPACK_IMPORTED_MODULE_1__.ConnectorEvent.Error, error);
  };

  _proto.emitDeactivate = function emitDeactivate() {
    if (true) {
      console.log("Emitting '" + _web3_react_types__WEBPACK_IMPORTED_MODULE_1__.ConnectorEvent.Deactivate + "'");
    }

    this.emit(_web3_react_types__WEBPACK_IMPORTED_MODULE_1__.ConnectorEvent.Deactivate);
  };

  return AbstractConnector;
}(events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter);


//# sourceMappingURL=abstract-connector.esm.js.map


/***/ }),

/***/ "./node_modules/@web3-react/injected-connector/dist/injected-connector.esm.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@web3-react/injected-connector/dist/injected-connector.esm.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InjectedConnector": () => (/* binding */ InjectedConnector),
/* harmony export */   "NoEthereumProviderError": () => (/* binding */ NoEthereumProviderError),
/* harmony export */   "UserRejectedRequestError": () => (/* binding */ UserRejectedRequestError)
/* harmony export */ });
/* harmony import */ var _web3_react_abstract_connector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web3-react/abstract-connector */ "./node_modules/@web3-react/abstract-connector/dist/abstract-connector.esm.js");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");



function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

// A type of promise-like that resolves synchronously and supports only one observer
var _iteratorSymbol =
/*#__PURE__*/
typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator =
/*#__PURE__*/
Symbol("Symbol.iterator")) : "@@iterator"; // Asynchronously iterate through an object's values
var _asyncIteratorSymbol =
/*#__PURE__*/
typeof Symbol !== "undefined" ? Symbol.asyncIterator || (Symbol.asyncIterator =
/*#__PURE__*/
Symbol("Symbol.asyncIterator")) : "@@asyncIterator"; // Asynchronously iterate on a value using it's async iterator if present, or its synchronous iterator if missing

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
} // Asynchronously await a promise and pass the result to a finally continuation

function parseSendReturn(sendReturn) {
  return sendReturn.hasOwnProperty('result') ? sendReturn.result : sendReturn;
}

var NoEthereumProviderError =
/*#__PURE__*/
function (_Error) {
  _inheritsLoose(NoEthereumProviderError, _Error);

  function NoEthereumProviderError() {
    var _this;

    _this = _Error.call(this) || this;
    _this.name = _this.constructor.name;
    _this.message = 'No Ethereum provider was found on window.ethereum.';
    return _this;
  }

  return NoEthereumProviderError;
}(
/*#__PURE__*/
_wrapNativeSuper(Error));
var UserRejectedRequestError =
/*#__PURE__*/
function (_Error2) {
  _inheritsLoose(UserRejectedRequestError, _Error2);

  function UserRejectedRequestError() {
    var _this2;

    _this2 = _Error2.call(this) || this;
    _this2.name = _this2.constructor.name;
    _this2.message = 'The user rejected the request.';
    return _this2;
  }

  return UserRejectedRequestError;
}(
/*#__PURE__*/
_wrapNativeSuper(Error));
var InjectedConnector =
/*#__PURE__*/
function (_AbstractConnector) {
  _inheritsLoose(InjectedConnector, _AbstractConnector);

  function InjectedConnector(kwargs) {
    var _this3;

    _this3 = _AbstractConnector.call(this, kwargs) || this;
    _this3.handleNetworkChanged = _this3.handleNetworkChanged.bind(_assertThisInitialized(_this3));
    _this3.handleChainChanged = _this3.handleChainChanged.bind(_assertThisInitialized(_this3));
    _this3.handleAccountsChanged = _this3.handleAccountsChanged.bind(_assertThisInitialized(_this3));
    _this3.handleClose = _this3.handleClose.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  var _proto = InjectedConnector.prototype;

  _proto.handleChainChanged = function handleChainChanged(chainId) {
    if (true) {
      console.log("Handling 'chainChanged' event with payload", chainId);
    }

    this.emitUpdate({
      chainId: chainId,
      provider: window.ethereum
    });
  };

  _proto.handleAccountsChanged = function handleAccountsChanged(accounts) {
    if (true) {
      console.log("Handling 'accountsChanged' event with payload", accounts);
    }

    if (accounts.length === 0) {
      this.emitDeactivate();
    } else {
      this.emitUpdate({
        account: accounts[0]
      });
    }
  };

  _proto.handleClose = function handleClose(code, reason) {
    if (true) {
      console.log("Handling 'close' event with payload", code, reason);
    }

    this.emitDeactivate();
  };

  _proto.handleNetworkChanged = function handleNetworkChanged(networkId) {
    if (true) {
      console.log("Handling 'networkChanged' event with payload", networkId);
    }

    this.emitUpdate({
      chainId: networkId,
      provider: window.ethereum
    });
  };

  _proto.activate = function activate() {
    try {
      var _temp5 = function _temp5(_result) {
        if (_exit2) return _result;

        function _temp2() {
          return _extends({
            provider: window.ethereum
          }, account ? {
            account: account
          } : {});
        }

        var _temp = function () {
          if (!account) {
            // if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
            return Promise.resolve(window.ethereum.enable().then(function (sendReturn) {
              return sendReturn && parseSendReturn(sendReturn)[0];
            })).then(function (_window$ethereum$enab) {
              account = _window$ethereum$enab;
            });
          }
        }();

        // if unsuccessful, try enable
        return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
      };

      var _exit2 = false;

      var _this5 = this;

      if (!window.ethereum) {
        throw new NoEthereumProviderError();
      }

      if (window.ethereum.on) {
        window.ethereum.on('chainChanged', _this5.handleChainChanged);
        window.ethereum.on('accountsChanged', _this5.handleAccountsChanged);
        window.ethereum.on('close', _this5.handleClose);
        window.ethereum.on('networkChanged', _this5.handleNetworkChanged);
      }

      if (window.ethereum.isMetaMask) {
        ;
        window.ethereum.autoRefreshOnNetworkChange = false;
      } // try to activate + get account via eth_requestAccounts


      var account;

      var _temp6 = _catch(function () {
        return Promise.resolve(window.ethereum.send('eth_requestAccounts').then(function (sendReturn) {
          return parseSendReturn(sendReturn)[0];
        })).then(function (_window$ethereum$send) {
          account = _window$ethereum$send;
        });
      }, function (error) {
        if (error.code === 4001) {
          throw new UserRejectedRequestError();
        }

         true ? (0,tiny_warning__WEBPACK_IMPORTED_MODULE_1__["default"])(false, 'eth_requestAccounts was unsuccessful, falling back to enable') : 0;
      });

      return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(_temp5) : _temp5(_temp6));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getProvider = function getProvider() {
    try {
      return Promise.resolve(window.ethereum);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getChainId = function getChainId() {
    try {
      var _temp12 = function _temp12() {
        function _temp9() {
          if (!chainId) {
            try {
              chainId = parseSendReturn(window.ethereum.send({
                method: 'net_version'
              }));
            } catch (_unused) {
               true ? (0,tiny_warning__WEBPACK_IMPORTED_MODULE_1__["default"])(false, 'net_version v2 was unsuccessful, falling back to manual matches and static properties') : 0;
            }
          }

          if (!chainId) {
            if (window.ethereum.isDapper) {
              chainId = parseSendReturn(window.ethereum.cachedResults.net_version);
            } else {
              chainId = window.ethereum.chainId || window.ethereum.netVersion || window.ethereum.networkVersion || window.ethereum._chainId;
            }
          }

          return chainId;
        }

        var _temp8 = function () {
          if (!chainId) {
            var _temp14 = _catch(function () {
              return Promise.resolve(window.ethereum.send('net_version').then(parseSendReturn)).then(function (_window$ethereum$send3) {
                chainId = _window$ethereum$send3;
              });
            }, function () {
               true ? (0,tiny_warning__WEBPACK_IMPORTED_MODULE_1__["default"])(false, 'net_version was unsuccessful, falling back to net version v2') : 0;
            });

            if (_temp14 && _temp14.then) return _temp14.then(function () {});
          }
        }();

        return _temp8 && _temp8.then ? _temp8.then(_temp9) : _temp9(_temp8);
      };

      if (!window.ethereum) {
        throw new NoEthereumProviderError();
      }

      var chainId;

      var _temp13 = _catch(function () {
        return Promise.resolve(window.ethereum.send('eth_chainId').then(parseSendReturn)).then(function (_window$ethereum$send2) {
          chainId = _window$ethereum$send2;
        });
      }, function () {
         true ? (0,tiny_warning__WEBPACK_IMPORTED_MODULE_1__["default"])(false, 'eth_chainId was unsuccessful, falling back to net_version') : 0;
      });

      return Promise.resolve(_temp13 && _temp13.then ? _temp13.then(_temp12) : _temp12(_temp13));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getAccount = function getAccount() {
    try {
      var _temp20 = function _temp20() {
        function _temp17() {
          if (!account) {
            account = parseSendReturn(window.ethereum.send({
              method: 'eth_accounts'
            }))[0];
          }

          return account;
        }

        var _temp16 = function () {
          if (!account) {
            var _temp22 = _catch(function () {
              return Promise.resolve(window.ethereum.enable().then(function (sendReturn) {
                return parseSendReturn(sendReturn)[0];
              })).then(function (_window$ethereum$enab2) {
                account = _window$ethereum$enab2;
              });
            }, function () {
               true ? (0,tiny_warning__WEBPACK_IMPORTED_MODULE_1__["default"])(false, 'enable was unsuccessful, falling back to eth_accounts v2') : 0;
            });

            if (_temp22 && _temp22.then) return _temp22.then(function () {});
          }
        }();

        return _temp16 && _temp16.then ? _temp16.then(_temp17) : _temp17(_temp16);
      };

      if (!window.ethereum) {
        throw new NoEthereumProviderError();
      }

      var account;

      var _temp21 = _catch(function () {
        return Promise.resolve(window.ethereum.send('eth_accounts').then(function (sendReturn) {
          return parseSendReturn(sendReturn)[0];
        })).then(function (_window$ethereum$send4) {
          account = _window$ethereum$send4;
        });
      }, function () {
         true ? (0,tiny_warning__WEBPACK_IMPORTED_MODULE_1__["default"])(false, 'eth_accounts was unsuccessful, falling back to enable') : 0;
      });

      return Promise.resolve(_temp21 && _temp21.then ? _temp21.then(_temp20) : _temp20(_temp21));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.deactivate = function deactivate() {
    if (window.ethereum && window.ethereum.removeListener) {
      window.ethereum.removeListener('chainChanged', this.handleChainChanged);
      window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged);
      window.ethereum.removeListener('close', this.handleClose);
      window.ethereum.removeListener('networkChanged', this.handleNetworkChanged);
    }
  };

  _proto.isAuthorized = function isAuthorized() {
    try {
      if (!window.ethereum) {
        return Promise.resolve(false);
      }

      return Promise.resolve(_catch(function () {
        return Promise.resolve(window.ethereum.send('eth_accounts').then(function (sendReturn) {
          if (parseSendReturn(sendReturn).length > 0) {
            return true;
          } else {
            return false;
          }
        }));
      }, function () {
        return false;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return InjectedConnector;
}(_web3_react_abstract_connector__WEBPACK_IMPORTED_MODULE_0__.AbstractConnector);


//# sourceMappingURL=injected-connector.esm.js.map


/***/ }),

/***/ "./node_modules/aes-js/index.js":
/*!**************************************!*\
  !*** ./node_modules/aes-js/index.js ***!
  \**************************************/
/***/ (function(module) {

"use strict";


(function(root) {

    function checkInt(value) {
        return (parseInt(value) === value);
    }

    function checkInts(arrayish) {
        if (!checkInt(arrayish.length)) { return false; }

        for (var i = 0; i < arrayish.length; i++) {
            if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
                return false;
            }
        }

        return true;
    }

    function coerceArray(arg, copy) {

        // ArrayBuffer view
        if (arg.buffer && ArrayBuffer.isView(arg) && arg.name === 'Uint8Array') {

            if (copy) {
                if (arg.slice) {
                    arg = arg.slice();
                } else {
                    arg = Array.prototype.slice.call(arg);
                }
            }

            return arg;
        }

        // It's an array; check it is a valid representation of a byte
        if (Array.isArray(arg)) {
            if (!checkInts(arg)) {
                throw new Error('Array contains invalid value: ' + arg);
            }

            return new Uint8Array(arg);
        }

        // Something else, but behaves like an array (maybe a Buffer? Arguments?)
        if (checkInt(arg.length) && checkInts(arg)) {
            return new Uint8Array(arg);
        }

        throw new Error('unsupported array-like object');
    }

    function createArray(length) {
        return new Uint8Array(length);
    }

    function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
        if (sourceStart != null || sourceEnd != null) {
            if (sourceArray.slice) {
                sourceArray = sourceArray.slice(sourceStart, sourceEnd);
            } else {
                sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
            }
        }
        targetArray.set(sourceArray, targetStart);
    }



    var convertUtf8 = (function() {
        function toBytes(text) {
            var result = [], i = 0;
            text = encodeURI(text);
            while (i < text.length) {
                var c = text.charCodeAt(i++);

                // if it is a % sign, encode the following 2 bytes as a hex value
                if (c === 37) {
                    result.push(parseInt(text.substr(i, 2), 16))
                    i += 2;

                // otherwise, just the actual byte
                } else {
                    result.push(c)
                }
            }

            return coerceArray(result);
        }

        function fromBytes(bytes) {
            var result = [], i = 0;

            while (i < bytes.length) {
                var c = bytes[i];

                if (c < 128) {
                    result.push(String.fromCharCode(c));
                    i++;
                } else if (c > 191 && c < 224) {
                    result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
                    i += 2;
                } else {
                    result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
                    i += 3;
                }
            }

            return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();

    var convertHex = (function() {
        function toBytes(text) {
            var result = [];
            for (var i = 0; i < text.length; i += 2) {
                result.push(parseInt(text.substr(i, 2), 16));
            }

            return result;
        }

        // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
        var Hex = '0123456789abcdef';

        function fromBytes(bytes) {
                var result = [];
                for (var i = 0; i < bytes.length; i++) {
                    var v = bytes[i];
                    result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
                }
                return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();


    // Number of rounds by keysize
    var numberOfRounds = {16: 10, 24: 12, 32: 14}

    // Round constant words
    var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];

    // S-box and Inverse S-box (S is for Substitution)
    var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
    var Si =[0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];

    // Transformations for encryption
    var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
    var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
    var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
    var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];

    // Transformations for decryption
    var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
    var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
    var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
    var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];

    // Transformations for decryption key expansion
    var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
    var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
    var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
    var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];

    function convertToInt32(bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 4) {
            result.push(
                (bytes[i    ] << 24) |
                (bytes[i + 1] << 16) |
                (bytes[i + 2] <<  8) |
                 bytes[i + 3]
            );
        }
        return result;
    }

    var AES = function(key) {
        if (!(this instanceof AES)) {
            throw Error('AES must be instanitated with `new`');
        }

        Object.defineProperty(this, 'key', {
            value: coerceArray(key, true)
        });

        this._prepare();
    }


    AES.prototype._prepare = function() {

        var rounds = numberOfRounds[this.key.length];
        if (rounds == null) {
            throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
        }

        // encryption round keys
        this._Ke = [];

        // decryption round keys
        this._Kd = [];

        for (var i = 0; i <= rounds; i++) {
            this._Ke.push([0, 0, 0, 0]);
            this._Kd.push([0, 0, 0, 0]);
        }

        var roundKeyCount = (rounds + 1) * 4;
        var KC = this.key.length / 4;

        // convert the key into ints
        var tk = convertToInt32(this.key);

        // copy values into round key arrays
        var index;
        for (var i = 0; i < KC; i++) {
            index = i >> 2;
            this._Ke[index][i % 4] = tk[i];
            this._Kd[rounds - index][i % 4] = tk[i];
        }

        // key expansion (fips-197 section 5.2)
        var rconpointer = 0;
        var t = KC, tt;
        while (t < roundKeyCount) {
            tt = tk[KC - 1];
            tk[0] ^= ((S[(tt >> 16) & 0xFF] << 24) ^
                      (S[(tt >>  8) & 0xFF] << 16) ^
                      (S[ tt        & 0xFF] <<  8) ^
                       S[(tt >> 24) & 0xFF]        ^
                      (rcon[rconpointer] << 24));
            rconpointer += 1;

            // key expansion (for non-256 bit)
            if (KC != 8) {
                for (var i = 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }

            // key expansion for 256-bit keys is "slightly different" (fips-197)
            } else {
                for (var i = 1; i < (KC / 2); i++) {
                    tk[i] ^= tk[i - 1];
                }
                tt = tk[(KC / 2) - 1];

                tk[KC / 2] ^= (S[ tt        & 0xFF]        ^
                              (S[(tt >>  8) & 0xFF] <<  8) ^
                              (S[(tt >> 16) & 0xFF] << 16) ^
                              (S[(tt >> 24) & 0xFF] << 24));

                for (var i = (KC / 2) + 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }
            }

            // copy values into round key arrays
            var i = 0, r, c;
            while (i < KC && t < roundKeyCount) {
                r = t >> 2;
                c = t % 4;
                this._Ke[r][c] = tk[i];
                this._Kd[rounds - r][c] = tk[i++];
                t++;
            }
        }

        // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
        for (var r = 1; r < rounds; r++) {
            for (var c = 0; c < 4; c++) {
                tt = this._Kd[r][c];
                this._Kd[r][c] = (U1[(tt >> 24) & 0xFF] ^
                                  U2[(tt >> 16) & 0xFF] ^
                                  U3[(tt >>  8) & 0xFF] ^
                                  U4[ tt        & 0xFF]);
            }
        }
    }

    AES.prototype.encrypt = function(plaintext) {
        if (plaintext.length != 16) {
            throw new Error('invalid plaintext size (must be 16 bytes)');
        }

        var rounds = this._Ke.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(plaintext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Ke[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T1[(t[ i         ] >> 24) & 0xff] ^
                        T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
                        T3[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T4[ t[(i + 3) % 4]        & 0xff] ^
                        this._Ke[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Ke[rounds][i];
            result[4 * i    ] = (S[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (S[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (S[ t[(i + 3) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }

    AES.prototype.decrypt = function(ciphertext) {
        if (ciphertext.length != 16) {
            throw new Error('invalid ciphertext size (must be 16 bytes)');
        }

        var rounds = this._Kd.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(ciphertext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Kd[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T5[(t[ i          ] >> 24) & 0xff] ^
                        T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
                        T7[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T8[ t[(i + 1) % 4]        & 0xff] ^
                        this._Kd[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Kd[rounds][i];
            result[4 * i    ] = (Si[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (Si[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (Si[ t[(i + 1) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }


    /**
     *  Mode Of Operation - Electonic Codebook (ECB)
     */
    var ModeOfOperationECB = function(key) {
        if (!(this instanceof ModeOfOperationECB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Electronic Code Block";
        this.name = "ecb";

        this._aes = new AES(key);
    }

    ModeOfOperationECB.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);
            block = this._aes.encrypt(block);
            copyArray(block, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationECB.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);
            copyArray(block, plaintext, i);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Block Chaining (CBC)
     */
    var ModeOfOperationCBC = function(key, iv) {
        if (!(this instanceof ModeOfOperationCBC)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Block Chaining";
        this.name = "cbc";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastCipherblock = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCBC.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);

            for (var j = 0; j < 16; j++) {
                block[j] ^= this._lastCipherblock[j];
            }

            this._lastCipherblock = this._aes.encrypt(block);
            copyArray(this._lastCipherblock, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationCBC.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);

            for (var j = 0; j < 16; j++) {
                plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
            }

            copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Feedback (CFB)
     */
    var ModeOfOperationCFB = function(key, iv, segmentSize) {
        if (!(this instanceof ModeOfOperationCFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Feedback";
        this.name = "cfb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 size)');
        }

        if (!segmentSize) { segmentSize = 1; }

        this.segmentSize = segmentSize;

        this._shiftRegister = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCFB.prototype.encrypt = function(plaintext) {
        if ((plaintext.length % this.segmentSize) != 0) {
            throw new Error('invalid plaintext size (must be segmentSize bytes)');
        }

        var encrypted = coerceArray(plaintext, true);

        var xorSegment;
        for (var i = 0; i < encrypted.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);
            for (var j = 0; j < this.segmentSize; j++) {
                encrypted[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return encrypted;
    }

    ModeOfOperationCFB.prototype.decrypt = function(ciphertext) {
        if ((ciphertext.length % this.segmentSize) != 0) {
            throw new Error('invalid ciphertext size (must be segmentSize bytes)');
        }

        var plaintext = coerceArray(ciphertext, true);

        var xorSegment;
        for (var i = 0; i < plaintext.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);

            for (var j = 0; j < this.segmentSize; j++) {
                plaintext[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return plaintext;
    }

    /**
     *  Mode Of Operation - Output Feedback (OFB)
     */
    var ModeOfOperationOFB = function(key, iv) {
        if (!(this instanceof ModeOfOperationOFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Output Feedback";
        this.name = "ofb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastPrecipher = coerceArray(iv, true);
        this._lastPrecipherIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationOFB.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._lastPrecipherIndex === 16) {
                this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
                this._lastPrecipherIndex = 0;
            }
            encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;


    /**
     *  Counter object for CTR common mode of operation
     */
    var Counter = function(initialValue) {
        if (!(this instanceof Counter)) {
            throw Error('Counter must be instanitated with `new`');
        }

        // We allow 0, but anything false-ish uses the default 1
        if (initialValue !== 0 && !initialValue) { initialValue = 1; }

        if (typeof(initialValue) === 'number') {
            this._counter = createArray(16);
            this.setValue(initialValue);

        } else {
            this.setBytes(initialValue);
        }
    }

    Counter.prototype.setValue = function(value) {
        if (typeof(value) !== 'number' || parseInt(value) != value) {
            throw new Error('invalid counter value (must be an integer)');
        }

        for (var index = 15; index >= 0; --index) {
            this._counter[index] = value % 256;
            value = value >> 8;
        }
    }

    Counter.prototype.setBytes = function(bytes) {
        bytes = coerceArray(bytes, true);

        if (bytes.length != 16) {
            throw new Error('invalid counter bytes size (must be 16 bytes)');
        }

        this._counter = bytes;
    };

    Counter.prototype.increment = function() {
        for (var i = 15; i >= 0; i--) {
            if (this._counter[i] === 255) {
                this._counter[i] = 0;
            } else {
                this._counter[i]++;
                break;
            }
        }
    }


    /**
     *  Mode Of Operation - Counter (CTR)
     */
    var ModeOfOperationCTR = function(key, counter) {
        if (!(this instanceof ModeOfOperationCTR)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Counter";
        this.name = "ctr";

        if (!(counter instanceof Counter)) {
            counter = new Counter(counter)
        }

        this._counter = counter;

        this._remainingCounter = null;
        this._remainingCounterIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationCTR.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._remainingCounterIndex === 16) {
                this._remainingCounter = this._aes.encrypt(this._counter._counter);
                this._remainingCounterIndex = 0;
                this._counter.increment();
            }
            encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;


    ///////////////////////
    // Padding

    // See:https://tools.ietf.org/html/rfc2315
    function pkcs7pad(data) {
        data = coerceArray(data, true);
        var padder = 16 - (data.length % 16);
        var result = createArray(data.length + padder);
        copyArray(data, result);
        for (var i = data.length; i < result.length; i++) {
            result[i] = padder;
        }
        return result;
    }

    function pkcs7strip(data) {
        data = coerceArray(data, true);
        if (data.length < 16) { throw new Error('PKCS#7 invalid length'); }

        var padder = data[data.length - 1];
        if (padder > 16) { throw new Error('PKCS#7 padding byte out of range'); }

        var length = data.length - padder;
        for (var i = 0; i < padder; i++) {
            if (data[length + i] !== padder) {
                throw new Error('PKCS#7 invalid padding byte');
            }
        }

        var result = createArray(length);
        copyArray(data, result, 0, 0, length);
        return result;
    }

    ///////////////////////
    // Exporting


    // The block cipher
    var aesjs = {
        AES: AES,
        Counter: Counter,

        ModeOfOperation: {
            ecb: ModeOfOperationECB,
            cbc: ModeOfOperationCBC,
            cfb: ModeOfOperationCFB,
            ofb: ModeOfOperationOFB,
            ctr: ModeOfOperationCTR
        },

        utils: {
            hex: convertHex,
            utf8: convertUtf8
        },

        padding: {
            pkcs7: {
                pad: pkcs7pad,
                strip: pkcs7strip
            }
        },

        _arrayTest: {
            coerceArray: coerceArray,
            createArray: createArray,
            copyArray: copyArray,
        }
    };


    // node.js
    if (true) {
        module.exports = aesjs

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    } else {}


})(this);


/***/ }),

/***/ "./node_modules/camelcase/index.js":
/*!*****************************************!*\
  !*** ./node_modules/camelcase/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


const preserveCamelCase = string => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let i = 0; i < string.length; i++) {
		const character = string[i];

		if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
			string = string.slice(0, i) + '-' + string.slice(i);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
			string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
		}
	}

	return string;
};

const camelCase = (input, options) => {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	options = Object.assign({
		pascalCase: false
	}, options);

	const postProcess = x => options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;

	if (Array.isArray(input)) {
		input = input.map(x => x.trim())
			.filter(x => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	if (input.length === 1) {
		return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
	}

	const hasUpperCase = input !== input.toLowerCase();

	if (hasUpperCase) {
		input = preserveCamelCase(input);
	}

	input = input
		.replace(/^[_.\- ]+/, '')
		.toLowerCase()
		.replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase())
		.replace(/\d+(\w|$)/g, m => m.toUpperCase());

	return postProcess(input);
};

module.exports = camelCase;
// TODO: Remove this for the next major release
module.exports["default"] = camelCase;


/***/ }),

/***/ "./node_modules/ethers/lib/utils.js":
/*!******************************************!*\
  !*** ./node_modules/ethers/lib/utils.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.formatBytes32String = exports.Utf8ErrorFuncs = exports.toUtf8String = exports.toUtf8CodePoints = exports.toUtf8Bytes = exports._toEscapedUtf8String = exports.nameprep = exports.hexDataSlice = exports.hexDataLength = exports.hexZeroPad = exports.hexValue = exports.hexStripZeros = exports.hexConcat = exports.isHexString = exports.hexlify = exports.base64 = exports.base58 = exports.TransactionDescription = exports.LogDescription = exports.Interface = exports.SigningKey = exports.HDNode = exports.defaultPath = exports.isBytesLike = exports.isBytes = exports.zeroPad = exports.stripZeros = exports.concat = exports.arrayify = exports.shallowCopy = exports.resolveProperties = exports.getStatic = exports.defineReadOnly = exports.deepCopy = exports.checkProperties = exports.poll = exports.fetchJson = exports._fetchData = exports.RLP = exports.Logger = exports.checkResultErrors = exports.FormatTypes = exports.ParamType = exports.FunctionFragment = exports.EventFragment = exports.ErrorFragment = exports.ConstructorFragment = exports.Fragment = exports.defaultAbiCoder = exports.AbiCoder = void 0;
exports.Indexed = exports.Utf8ErrorReason = exports.UnicodeNormalizationForm = exports.SupportedAlgorithm = exports.mnemonicToSeed = exports.isValidMnemonic = exports.entropyToMnemonic = exports.mnemonicToEntropy = exports.getAccountPath = exports.verifyTypedData = exports.verifyMessage = exports.recoverPublicKey = exports.computePublicKey = exports.recoverAddress = exports.computeAddress = exports.getJsonWalletAddress = exports.TransactionTypes = exports.serializeTransaction = exports.parseTransaction = exports.accessListify = exports.joinSignature = exports.splitSignature = exports.soliditySha256 = exports.solidityKeccak256 = exports.solidityPack = exports.shuffled = exports.randomBytes = exports.sha512 = exports.sha256 = exports.ripemd160 = exports.keccak256 = exports.computeHmac = exports.commify = exports.parseUnits = exports.formatUnits = exports.parseEther = exports.formatEther = exports.isAddress = exports.getCreate2Address = exports.getContractAddress = exports.getIcapAddress = exports.getAddress = exports._TypedDataEncoder = exports.id = exports.isValidName = exports.namehash = exports.hashMessage = exports.dnsEncode = exports.parseBytes32String = void 0;
var abi_1 = __webpack_require__(/*! @ethersproject/abi */ "./node_modules/@ethersproject/abi/lib.esm/index.js");
Object.defineProperty(exports, "AbiCoder", ({ enumerable: true, get: function () { return abi_1.AbiCoder; } }));
Object.defineProperty(exports, "checkResultErrors", ({ enumerable: true, get: function () { return abi_1.checkResultErrors; } }));
Object.defineProperty(exports, "ConstructorFragment", ({ enumerable: true, get: function () { return abi_1.ConstructorFragment; } }));
Object.defineProperty(exports, "defaultAbiCoder", ({ enumerable: true, get: function () { return abi_1.defaultAbiCoder; } }));
Object.defineProperty(exports, "ErrorFragment", ({ enumerable: true, get: function () { return abi_1.ErrorFragment; } }));
Object.defineProperty(exports, "EventFragment", ({ enumerable: true, get: function () { return abi_1.EventFragment; } }));
Object.defineProperty(exports, "FormatTypes", ({ enumerable: true, get: function () { return abi_1.FormatTypes; } }));
Object.defineProperty(exports, "Fragment", ({ enumerable: true, get: function () { return abi_1.Fragment; } }));
Object.defineProperty(exports, "FunctionFragment", ({ enumerable: true, get: function () { return abi_1.FunctionFragment; } }));
Object.defineProperty(exports, "Indexed", ({ enumerable: true, get: function () { return abi_1.Indexed; } }));
Object.defineProperty(exports, "Interface", ({ enumerable: true, get: function () { return abi_1.Interface; } }));
Object.defineProperty(exports, "LogDescription", ({ enumerable: true, get: function () { return abi_1.LogDescription; } }));
Object.defineProperty(exports, "ParamType", ({ enumerable: true, get: function () { return abi_1.ParamType; } }));
Object.defineProperty(exports, "TransactionDescription", ({ enumerable: true, get: function () { return abi_1.TransactionDescription; } }));
var address_1 = __webpack_require__(/*! @ethersproject/address */ "./node_modules/@ethersproject/address/lib.esm/index.js");
Object.defineProperty(exports, "getAddress", ({ enumerable: true, get: function () { return address_1.getAddress; } }));
Object.defineProperty(exports, "getCreate2Address", ({ enumerable: true, get: function () { return address_1.getCreate2Address; } }));
Object.defineProperty(exports, "getContractAddress", ({ enumerable: true, get: function () { return address_1.getContractAddress; } }));
Object.defineProperty(exports, "getIcapAddress", ({ enumerable: true, get: function () { return address_1.getIcapAddress; } }));
Object.defineProperty(exports, "isAddress", ({ enumerable: true, get: function () { return address_1.isAddress; } }));
var base64 = __importStar(__webpack_require__(/*! @ethersproject/base64 */ "./node_modules/@ethersproject/base64/lib.esm/index.js"));
exports.base64 = base64;
var basex_1 = __webpack_require__(/*! @ethersproject/basex */ "./node_modules/@ethersproject/basex/lib.esm/index.js");
Object.defineProperty(exports, "base58", ({ enumerable: true, get: function () { return basex_1.Base58; } }));
var bytes_1 = __webpack_require__(/*! @ethersproject/bytes */ "./node_modules/@ethersproject/bytes/lib.esm/index.js");
Object.defineProperty(exports, "arrayify", ({ enumerable: true, get: function () { return bytes_1.arrayify; } }));
Object.defineProperty(exports, "concat", ({ enumerable: true, get: function () { return bytes_1.concat; } }));
Object.defineProperty(exports, "hexConcat", ({ enumerable: true, get: function () { return bytes_1.hexConcat; } }));
Object.defineProperty(exports, "hexDataSlice", ({ enumerable: true, get: function () { return bytes_1.hexDataSlice; } }));
Object.defineProperty(exports, "hexDataLength", ({ enumerable: true, get: function () { return bytes_1.hexDataLength; } }));
Object.defineProperty(exports, "hexlify", ({ enumerable: true, get: function () { return bytes_1.hexlify; } }));
Object.defineProperty(exports, "hexStripZeros", ({ enumerable: true, get: function () { return bytes_1.hexStripZeros; } }));
Object.defineProperty(exports, "hexValue", ({ enumerable: true, get: function () { return bytes_1.hexValue; } }));
Object.defineProperty(exports, "hexZeroPad", ({ enumerable: true, get: function () { return bytes_1.hexZeroPad; } }));
Object.defineProperty(exports, "isBytes", ({ enumerable: true, get: function () { return bytes_1.isBytes; } }));
Object.defineProperty(exports, "isBytesLike", ({ enumerable: true, get: function () { return bytes_1.isBytesLike; } }));
Object.defineProperty(exports, "isHexString", ({ enumerable: true, get: function () { return bytes_1.isHexString; } }));
Object.defineProperty(exports, "joinSignature", ({ enumerable: true, get: function () { return bytes_1.joinSignature; } }));
Object.defineProperty(exports, "zeroPad", ({ enumerable: true, get: function () { return bytes_1.zeroPad; } }));
Object.defineProperty(exports, "splitSignature", ({ enumerable: true, get: function () { return bytes_1.splitSignature; } }));
Object.defineProperty(exports, "stripZeros", ({ enumerable: true, get: function () { return bytes_1.stripZeros; } }));
var hash_1 = __webpack_require__(/*! @ethersproject/hash */ "./node_modules/@ethersproject/hash/lib.esm/index.js");
Object.defineProperty(exports, "_TypedDataEncoder", ({ enumerable: true, get: function () { return hash_1._TypedDataEncoder; } }));
Object.defineProperty(exports, "dnsEncode", ({ enumerable: true, get: function () { return hash_1.dnsEncode; } }));
Object.defineProperty(exports, "hashMessage", ({ enumerable: true, get: function () { return hash_1.hashMessage; } }));
Object.defineProperty(exports, "id", ({ enumerable: true, get: function () { return hash_1.id; } }));
Object.defineProperty(exports, "isValidName", ({ enumerable: true, get: function () { return hash_1.isValidName; } }));
Object.defineProperty(exports, "namehash", ({ enumerable: true, get: function () { return hash_1.namehash; } }));
var hdnode_1 = __webpack_require__(/*! @ethersproject/hdnode */ "./node_modules/@ethersproject/hdnode/lib.esm/index.js");
Object.defineProperty(exports, "defaultPath", ({ enumerable: true, get: function () { return hdnode_1.defaultPath; } }));
Object.defineProperty(exports, "entropyToMnemonic", ({ enumerable: true, get: function () { return hdnode_1.entropyToMnemonic; } }));
Object.defineProperty(exports, "getAccountPath", ({ enumerable: true, get: function () { return hdnode_1.getAccountPath; } }));
Object.defineProperty(exports, "HDNode", ({ enumerable: true, get: function () { return hdnode_1.HDNode; } }));
Object.defineProperty(exports, "isValidMnemonic", ({ enumerable: true, get: function () { return hdnode_1.isValidMnemonic; } }));
Object.defineProperty(exports, "mnemonicToEntropy", ({ enumerable: true, get: function () { return hdnode_1.mnemonicToEntropy; } }));
Object.defineProperty(exports, "mnemonicToSeed", ({ enumerable: true, get: function () { return hdnode_1.mnemonicToSeed; } }));
var json_wallets_1 = __webpack_require__(/*! @ethersproject/json-wallets */ "./node_modules/@ethersproject/json-wallets/lib.esm/index.js");
Object.defineProperty(exports, "getJsonWalletAddress", ({ enumerable: true, get: function () { return json_wallets_1.getJsonWalletAddress; } }));
var keccak256_1 = __webpack_require__(/*! @ethersproject/keccak256 */ "./node_modules/@ethersproject/keccak256/lib.esm/index.js");
Object.defineProperty(exports, "keccak256", ({ enumerable: true, get: function () { return keccak256_1.keccak256; } }));
var logger_1 = __webpack_require__(/*! @ethersproject/logger */ "./node_modules/@ethersproject/logger/lib.esm/index.js");
Object.defineProperty(exports, "Logger", ({ enumerable: true, get: function () { return logger_1.Logger; } }));
var sha2_1 = __webpack_require__(/*! @ethersproject/sha2 */ "./node_modules/@ethersproject/sha2/lib.esm/index.js");
Object.defineProperty(exports, "computeHmac", ({ enumerable: true, get: function () { return sha2_1.computeHmac; } }));
Object.defineProperty(exports, "ripemd160", ({ enumerable: true, get: function () { return sha2_1.ripemd160; } }));
Object.defineProperty(exports, "sha256", ({ enumerable: true, get: function () { return sha2_1.sha256; } }));
Object.defineProperty(exports, "sha512", ({ enumerable: true, get: function () { return sha2_1.sha512; } }));
var solidity_1 = __webpack_require__(/*! @ethersproject/solidity */ "./node_modules/@ethersproject/solidity/lib.esm/index.js");
Object.defineProperty(exports, "solidityKeccak256", ({ enumerable: true, get: function () { return solidity_1.keccak256; } }));
Object.defineProperty(exports, "solidityPack", ({ enumerable: true, get: function () { return solidity_1.pack; } }));
Object.defineProperty(exports, "soliditySha256", ({ enumerable: true, get: function () { return solidity_1.sha256; } }));
var random_1 = __webpack_require__(/*! @ethersproject/random */ "./node_modules/@ethersproject/random/lib.esm/index.js");
Object.defineProperty(exports, "randomBytes", ({ enumerable: true, get: function () { return random_1.randomBytes; } }));
Object.defineProperty(exports, "shuffled", ({ enumerable: true, get: function () { return random_1.shuffled; } }));
var properties_1 = __webpack_require__(/*! @ethersproject/properties */ "./node_modules/@ethersproject/properties/lib.esm/index.js");
Object.defineProperty(exports, "checkProperties", ({ enumerable: true, get: function () { return properties_1.checkProperties; } }));
Object.defineProperty(exports, "deepCopy", ({ enumerable: true, get: function () { return properties_1.deepCopy; } }));
Object.defineProperty(exports, "defineReadOnly", ({ enumerable: true, get: function () { return properties_1.defineReadOnly; } }));
Object.defineProperty(exports, "getStatic", ({ enumerable: true, get: function () { return properties_1.getStatic; } }));
Object.defineProperty(exports, "resolveProperties", ({ enumerable: true, get: function () { return properties_1.resolveProperties; } }));
Object.defineProperty(exports, "shallowCopy", ({ enumerable: true, get: function () { return properties_1.shallowCopy; } }));
var RLP = __importStar(__webpack_require__(/*! @ethersproject/rlp */ "./node_modules/@ethersproject/rlp/lib.esm/index.js"));
exports.RLP = RLP;
var signing_key_1 = __webpack_require__(/*! @ethersproject/signing-key */ "./node_modules/@ethersproject/signing-key/lib.esm/index.js");
Object.defineProperty(exports, "computePublicKey", ({ enumerable: true, get: function () { return signing_key_1.computePublicKey; } }));
Object.defineProperty(exports, "recoverPublicKey", ({ enumerable: true, get: function () { return signing_key_1.recoverPublicKey; } }));
Object.defineProperty(exports, "SigningKey", ({ enumerable: true, get: function () { return signing_key_1.SigningKey; } }));
var strings_1 = __webpack_require__(/*! @ethersproject/strings */ "./node_modules/@ethersproject/strings/lib.esm/index.js");
Object.defineProperty(exports, "formatBytes32String", ({ enumerable: true, get: function () { return strings_1.formatBytes32String; } }));
Object.defineProperty(exports, "nameprep", ({ enumerable: true, get: function () { return strings_1.nameprep; } }));
Object.defineProperty(exports, "parseBytes32String", ({ enumerable: true, get: function () { return strings_1.parseBytes32String; } }));
Object.defineProperty(exports, "_toEscapedUtf8String", ({ enumerable: true, get: function () { return strings_1._toEscapedUtf8String; } }));
Object.defineProperty(exports, "toUtf8Bytes", ({ enumerable: true, get: function () { return strings_1.toUtf8Bytes; } }));
Object.defineProperty(exports, "toUtf8CodePoints", ({ enumerable: true, get: function () { return strings_1.toUtf8CodePoints; } }));
Object.defineProperty(exports, "toUtf8String", ({ enumerable: true, get: function () { return strings_1.toUtf8String; } }));
Object.defineProperty(exports, "Utf8ErrorFuncs", ({ enumerable: true, get: function () { return strings_1.Utf8ErrorFuncs; } }));
var transactions_1 = __webpack_require__(/*! @ethersproject/transactions */ "./node_modules/@ethersproject/transactions/lib.esm/index.js");
Object.defineProperty(exports, "accessListify", ({ enumerable: true, get: function () { return transactions_1.accessListify; } }));
Object.defineProperty(exports, "computeAddress", ({ enumerable: true, get: function () { return transactions_1.computeAddress; } }));
Object.defineProperty(exports, "parseTransaction", ({ enumerable: true, get: function () { return transactions_1.parse; } }));
Object.defineProperty(exports, "recoverAddress", ({ enumerable: true, get: function () { return transactions_1.recoverAddress; } }));
Object.defineProperty(exports, "serializeTransaction", ({ enumerable: true, get: function () { return transactions_1.serialize; } }));
Object.defineProperty(exports, "TransactionTypes", ({ enumerable: true, get: function () { return transactions_1.TransactionTypes; } }));
var units_1 = __webpack_require__(/*! @ethersproject/units */ "./node_modules/@ethersproject/units/lib.esm/index.js");
Object.defineProperty(exports, "commify", ({ enumerable: true, get: function () { return units_1.commify; } }));
Object.defineProperty(exports, "formatEther", ({ enumerable: true, get: function () { return units_1.formatEther; } }));
Object.defineProperty(exports, "parseEther", ({ enumerable: true, get: function () { return units_1.parseEther; } }));
Object.defineProperty(exports, "formatUnits", ({ enumerable: true, get: function () { return units_1.formatUnits; } }));
Object.defineProperty(exports, "parseUnits", ({ enumerable: true, get: function () { return units_1.parseUnits; } }));
var wallet_1 = __webpack_require__(/*! @ethersproject/wallet */ "./node_modules/@ethersproject/wallet/lib.esm/index.js");
Object.defineProperty(exports, "verifyMessage", ({ enumerable: true, get: function () { return wallet_1.verifyMessage; } }));
Object.defineProperty(exports, "verifyTypedData", ({ enumerable: true, get: function () { return wallet_1.verifyTypedData; } }));
var web_1 = __webpack_require__(/*! @ethersproject/web */ "./node_modules/@ethersproject/web/lib.esm/index.js");
Object.defineProperty(exports, "_fetchData", ({ enumerable: true, get: function () { return web_1._fetchData; } }));
Object.defineProperty(exports, "fetchJson", ({ enumerable: true, get: function () { return web_1.fetchJson; } }));
Object.defineProperty(exports, "poll", ({ enumerable: true, get: function () { return web_1.poll; } }));
////////////////////////
// Enums
var sha2_2 = __webpack_require__(/*! @ethersproject/sha2 */ "./node_modules/@ethersproject/sha2/lib.esm/index.js");
Object.defineProperty(exports, "SupportedAlgorithm", ({ enumerable: true, get: function () { return sha2_2.SupportedAlgorithm; } }));
var strings_2 = __webpack_require__(/*! @ethersproject/strings */ "./node_modules/@ethersproject/strings/lib.esm/index.js");
Object.defineProperty(exports, "UnicodeNormalizationForm", ({ enumerable: true, get: function () { return strings_2.UnicodeNormalizationForm; } }));
Object.defineProperty(exports, "Utf8ErrorReason", ({ enumerable: true, get: function () { return strings_2.Utf8ErrorReason; } }));
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js":
/*!**********************************************************************!*\
  !*** ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GatsbyImage": () => (/* binding */ B),
/* harmony export */   "MainImage": () => (/* binding */ z),
/* harmony export */   "Placeholder": () => (/* binding */ O),
/* harmony export */   "StaticImage": () => (/* binding */ V),
/* harmony export */   "generateImageData": () => (/* binding */ f),
/* harmony export */   "getImage": () => (/* binding */ M),
/* harmony export */   "getImageData": () => (/* binding */ x),
/* harmony export */   "getLowResolutionImageURL": () => (/* binding */ m),
/* harmony export */   "getSrc": () => (/* binding */ S),
/* harmony export */   "getSrcSet": () => (/* binding */ N),
/* harmony export */   "withArtDirection": () => (/* binding */ I)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! camelcase */ "./node_modules/camelcase/index.js");
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(camelcase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);





function n() {
  return n = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];

      for (var i in a) {
        Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
      }
    }

    return e;
  }, n.apply(this, arguments);
}

function o(e, t) {
  if (null == e) return {};
  var a,
      i,
      r = {},
      n = Object.keys(e);

  for (i = 0; i < n.length; i++) {
    t.indexOf(a = n[i]) >= 0 || (r[a] = e[a]);
  }

  return r;
}

var s = [.25, .5, 1, 2],
    l = [750, 1080, 1366, 1920],
    d = [320, 654, 768, 1024, 1366, 1600, 1920, 2048, 2560, 3440, 3840, 4096],
    u = function u(e) {
  return console.warn(e);
},
    c = function c(e, t) {
  return e - t;
},
    h = function h(e) {
  return e.map(function (e) {
    return e.src + " " + e.width + "w";
  }).join(",\n");
};

function g(e) {
  var t = e.lastIndexOf(".");

  if (-1 !== t) {
    var a = e.slice(t + 1);
    if ("jpeg" === a) return "jpg";
    if (3 === a.length || 4 === a.length) return a;
  }
}

function p(e) {
  var t = e.layout,
      i = void 0 === t ? "constrained" : t,
      r = e.width,
      o = e.height,
      s = e.sourceMetadata,
      l = e.breakpoints,
      d = e.aspectRatio,
      u = e.formats,
      c = void 0 === u ? ["auto", "webp"] : u;
  return c = c.map(function (e) {
    return e.toLowerCase();
  }), i = camelcase__WEBPACK_IMPORTED_MODULE_1___default()(i), r && o ? n({}, e, {
    formats: c,
    layout: i,
    aspectRatio: r / o
  }) : (s.width && s.height && !d && (d = s.width / s.height), "fullWidth" === i ? (r = r || s.width || l[l.length - 1], o = o || Math.round(r / (d || 1.3333333333333333))) : (r || (r = o && d ? o * d : s.width ? s.width : o ? Math.round(o / 1.3333333333333333) : 800), d && !o ? o = Math.round(r / d) : d || (d = r / o)), n({}, e, {
    width: r,
    height: o,
    aspectRatio: d,
    layout: i,
    formats: c
  }));
}

function m(e, t) {
  var a;
  return void 0 === t && (t = 20), null == (a = (0, (e = p(e)).generateImageSource)(e.filename, t, Math.round(t / e.aspectRatio), e.sourceMetadata.format || "jpg", e.fit, e.options)) ? void 0 : a.src;
}

function f(e) {
  var t,
      a = (e = p(e)).pluginName,
      i = e.sourceMetadata,
      r = e.generateImageSource,
      o = e.layout,
      d = e.fit,
      c = e.options,
      m = e.width,
      f = e.height,
      b = e.filename,
      E = e.reporter,
      k = void 0 === E ? {
    warn: u
  } : E,
      M = e.backgroundColor,
      S = e.placeholderURL;
  if (a || k.warn('[gatsby-plugin-image] "generateImageData" was not passed a plugin name'), "function" != typeof r) throw new Error("generateImageSource must be a function");
  i && (i.width || i.height) ? i.format || (i.format = g(b)) : i = {
    width: m,
    height: f,
    format: (null == (t = i) ? void 0 : t.format) || g(b) || "auto"
  };
  var N = new Set(e.formats);
  (0 === N.size || N.has("auto") || N.has("")) && (N["delete"]("auto"), N["delete"](""), N.add(i.format)), N.has("jpg") && N.has("png") && (k.warn("[" + a + "] Specifying both 'jpg' and 'png' formats is not supported. Using 'auto' instead"), N["delete"]("jpg" === i.format ? "png" : "jpg"));

  var x = function (e) {
    var t = e.filename,
        a = e.layout,
        i = void 0 === a ? "constrained" : a,
        r = e.sourceMetadata,
        o = e.reporter,
        d = void 0 === o ? {
      warn: u
    } : o,
        c = e.breakpoints,
        h = void 0 === c ? l : c,
        g = Object.entries({
      width: e.width,
      height: e.height
    }).filter(function (e) {
      var t = e[1];
      return "number" == typeof t && t < 1;
    });
    if (g.length) throw new Error("Specified dimensions for images must be positive numbers (> 0). Problem dimensions you have are " + g.map(function (e) {
      return e.join(": ");
    }).join(", "));
    return "fixed" === i ? function (e) {
      var t = e.filename,
          a = e.sourceMetadata,
          i = e.width,
          r = e.height,
          n = e.fit,
          o = void 0 === n ? "cover" : n,
          l = e.outputPixelDensities,
          d = e.reporter,
          c = void 0 === d ? {
        warn: u
      } : d,
          h = a.width / a.height,
          g = v(void 0 === l ? s : l);

      if (i && r) {
        var p = y(a, {
          width: i,
          height: r,
          fit: o
        });
        i = p.width, r = p.height, h = p.aspectRatio;
      }

      i ? r || (r = Math.round(i / h)) : i = r ? Math.round(r * h) : 800;
      var m = i;

      if (a.width < i || a.height < r) {
        var f = a.width < i ? "width" : "height";
        c.warn("\nThe requested " + f + ' "' + ("width" === f ? i : r) + 'px" for the image ' + t + " was larger than the actual image " + f + " of " + a[f] + "px. If possible, replace the current image with a larger one."), "width" === f ? (i = a.width, r = Math.round(i / h)) : i = (r = a.height) * h;
      }

      return {
        sizes: g.filter(function (e) {
          return e >= 1;
        }).map(function (e) {
          return Math.round(e * i);
        }).filter(function (e) {
          return e <= a.width;
        }),
        aspectRatio: h,
        presentationWidth: m,
        presentationHeight: Math.round(m / h),
        unscaledWidth: i
      };
    }(e) : "constrained" === i ? w(e) : "fullWidth" === i ? w(n({
      breakpoints: h
    }, e)) : (d.warn("No valid layout was provided for the image at " + t + ". Valid image layouts are fixed, fullWidth, and constrained. Found " + i), {
      sizes: [r.width],
      presentationWidth: r.width,
      presentationHeight: r.height,
      aspectRatio: r.width / r.height,
      unscaledWidth: r.width
    });
  }(n({}, e, {
    sourceMetadata: i
  })),
      I = {
    sources: []
  },
      W = e.sizes;

  W || (W = function (e, t) {
    switch (t) {
      case "constrained":
        return "(min-width: " + e + "px) " + e + "px, 100vw";

      case "fixed":
        return e + "px";

      case "fullWidth":
        return "100vw";

      default:
        return;
    }
  }(x.presentationWidth, o)), N.forEach(function (e) {
    var t = x.sizes.map(function (t) {
      var i = r(b, t, Math.round(t / x.aspectRatio), e, d, c);
      if (null != i && i.width && i.height && i.src && i.format) return i;
      k.warn("[" + a + "] The resolver for image " + b + " returned an invalid value.");
    }).filter(Boolean);

    if ("jpg" === e || "png" === e || "auto" === e) {
      var i = t.find(function (e) {
        return e.width === x.unscaledWidth;
      }) || t[0];
      i && (I.fallback = {
        src: i.src,
        srcSet: h(t),
        sizes: W
      });
    } else {
      var n;
      null == (n = I.sources) || n.push({
        srcSet: h(t),
        sizes: W,
        type: "image/" + e
      });
    }
  });
  var R = {
    images: I,
    layout: o,
    backgroundColor: M
  };

  switch (S && (R.placeholder = {
    fallback: S
  }), o) {
    case "fixed":
      R.width = x.presentationWidth, R.height = x.presentationHeight;
      break;

    case "fullWidth":
      R.width = 1, R.height = 1 / x.aspectRatio;
      break;

    case "constrained":
      R.width = e.width || x.presentationWidth || 1, R.height = (R.width || 1) / x.aspectRatio;
  }

  return R;
}

var v = function v(e) {
  return Array.from(new Set([1].concat(e))).sort(c);
};

function w(e) {
  var t,
      a = e.sourceMetadata,
      i = e.width,
      r = e.height,
      n = e.fit,
      o = void 0 === n ? "cover" : n,
      l = e.outputPixelDensities,
      d = e.breakpoints,
      u = e.layout,
      h = a.width / a.height,
      g = v(void 0 === l ? s : l);

  if (i && r) {
    var p = y(a, {
      width: i,
      height: r,
      fit: o
    });
    i = p.width, r = p.height, h = p.aspectRatio;
  }

  i = i && Math.min(i, a.width), r = r && Math.min(r, a.height), i || r || (r = (i = Math.min(800, a.width)) / h), i || (i = r * h);
  var m = i;
  return (a.width < i || a.height < r) && (i = a.width, r = a.height), i = Math.round(i), (null == d ? void 0 : d.length) > 0 ? (t = d.filter(function (e) {
    return e <= a.width;
  })).length < d.length && !t.includes(a.width) && t.push(a.width) : t = (t = g.map(function (e) {
    return Math.round(e * i);
  })).filter(function (e) {
    return e <= a.width;
  }), "constrained" !== u || t.includes(i) || t.push(i), {
    sizes: t = t.sort(c),
    aspectRatio: h,
    presentationWidth: m,
    presentationHeight: Math.round(m / h),
    unscaledWidth: i
  };
}

function y(e, t) {
  var a = e.width / e.height,
      i = t.width,
      r = t.height;

  switch (t.fit) {
    case "fill":
      i = t.width ? t.width : e.width, r = t.height ? t.height : e.height;
      break;

    case "inside":
      var n = t.width ? t.width : Number.MAX_SAFE_INTEGER,
          o = t.height ? t.height : Number.MAX_SAFE_INTEGER;
      i = Math.min(n, Math.round(o * a)), r = Math.min(o, Math.round(n / a));
      break;

    case "outside":
      var s = t.width ? t.width : 0,
          l = t.height ? t.height : 0;
      i = Math.max(s, Math.round(l * a)), r = Math.max(l, Math.round(s / a));
      break;

    default:
      t.width && !t.height && (i = t.width, r = Math.round(t.width / a)), t.height && !t.width && (i = Math.round(t.height * a), r = t.height);
  }

  return {
    width: i,
    height: r,
    aspectRatio: i / r
  };
}

var b = ["baseUrl", "urlBuilder", "sourceWidth", "sourceHeight", "pluginName", "formats", "breakpoints", "options"],
    E = ["images", "placeholder"];

function k() {
  return "undefined" != typeof GATSBY___IMAGE && GATSBY___IMAGE;
}

var M = function M(e) {
  var t;
  return function (e) {
    var t, a;
    return Boolean(null == e || null == (t = e.images) || null == (a = t.fallback) ? void 0 : a.src);
  }(e) ? e : function (e) {
    return Boolean(null == e ? void 0 : e.gatsbyImageData);
  }(e) ? e.gatsbyImageData : function (e) {
    return Boolean(null == e ? void 0 : e.gatsbyImage);
  }(e) ? e.gatsbyImage : null == e || null == (t = e.childImageSharp) ? void 0 : t.gatsbyImageData;
},
    S = function S(e) {
  var t, a, i;
  return null == (t = M(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.src;
},
    N = function N(e) {
  var t, a, i;
  return null == (t = M(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.srcSet;
};

function x(e) {
  var t,
      a = e.baseUrl,
      i = e.urlBuilder,
      r = e.sourceWidth,
      s = e.sourceHeight,
      l = e.pluginName,
      u = void 0 === l ? "getImageData" : l,
      c = e.formats,
      h = void 0 === c ? ["auto"] : c,
      g = e.breakpoints,
      p = e.options,
      m = o(e, b);
  return null != (t = g) && t.length || "fullWidth" !== m.layout && "FULL_WIDTH" !== m.layout || (g = d), f(n({}, m, {
    pluginName: u,
    generateImageSource: function generateImageSource(e, t, a, r) {
      return {
        width: t,
        height: a,
        format: r,
        src: i({
          baseUrl: e,
          width: t,
          height: a,
          options: p,
          format: r
        })
      };
    },
    filename: a,
    formats: h,
    breakpoints: g,
    sourceMetadata: {
      width: r,
      height: s,
      format: "auto"
    }
  }));
}

function I(e, t) {
  var a,
      i,
      r,
      s = e.images,
      l = e.placeholder,
      d = n({}, o(e, E), {
    images: n({}, s, {
      sources: []
    }),
    placeholder: l && n({}, l, {
      sources: []
    })
  });
  return t.forEach(function (t) {
    var a,
        i = t.media,
        r = t.image;
    i ? (r.layout !== e.layout && "development" === "development" && console.warn('[gatsby-plugin-image] Mismatched image layout: expected "' + e.layout + '" but received "' + r.layout + '". All art-directed images use the same layout as the default image'), (a = d.images.sources).push.apply(a, r.images.sources.map(function (e) {
      return n({}, e, {
        media: i
      });
    }).concat([{
      media: i,
      srcSet: r.images.fallback.srcSet
    }])), d.placeholder && d.placeholder.sources.push({
      media: i,
      srcSet: r.placeholder.fallback
    })) :  true && console.warn("[gatsby-plugin-image] All art-directed images passed to must have a value set for `media`. Skipping.");
  }), (a = d.images.sources).push.apply(a, s.sources), null != l && l.sources && (null == (i = d.placeholder) || (r = i.sources).push.apply(r, l.sources)), d;
}

var W,
    R = ["src", "srcSet", "loading", "alt", "shouldLoad"],
    j = ["fallback", "sources", "shouldLoad"],
    _ = function _(t) {
  var a = t.src,
      i = t.srcSet,
      r = t.loading,
      s = t.alt,
      l = void 0 === s ? "" : s,
      d = t.shouldLoad,
      u = o(t, R);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", n({}, u, {
    decoding: "async",
    loading: r,
    src: d ? a : void 0,
    "data-src": d ? void 0 : a,
    srcSet: d ? i : void 0,
    "data-srcset": d ? void 0 : i,
    alt: l
  }));
},
    A = function A(t) {
  var a = t.fallback,
      i = t.sources,
      r = void 0 === i ? [] : i,
      s = t.shouldLoad,
      l = void 0 === s || s,
      d = o(t, j),
      u = d.sizes || (null == a ? void 0 : a.sizes),
      c = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_, n({}, d, a, {
    sizes: u,
    shouldLoad: l
  }));
  return r.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("picture", null, r.map(function (t) {
    var a = t.media,
        i = t.srcSet,
        r = t.type;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("source", {
      key: a + "-" + r + "-" + i,
      type: r,
      media: a,
      srcSet: l ? i : void 0,
      "data-srcset": l ? void 0 : i,
      sizes: u
    });
  }), c) : c;
};

_.propTypes = {
  src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool
}, A.displayName = "Picture", A.propTypes = {
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool,
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string
  }),
  sources: prop_types__WEBPACK_IMPORTED_MODULE_2__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  }), prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  })]))
};

var T = ["fallback"],
    O = function O(t) {
  var a = t.fallback,
      i = o(t, T);
  return a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, i, {
    fallback: {
      src: a
    },
    "aria-hidden": !0,
    alt: ""
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", n({}, i));
};

O.displayName = "Placeholder", O.propTypes = {
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  sources: null == (W = A.propTypes) ? void 0 : W.sources,
  alt: function alt(e, t, a) {
    return e[t] ? new Error("Invalid prop `" + t + "` supplied to `" + a + "`. Validation failed.") : null;
  }
};

var z = function z(t) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, t)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("noscript", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, t, {
    shouldLoad: !0
  }))));
};

z.displayName = "MainImage", z.propTypes = A.propTypes;

var L = ["children"],
    q = function q() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", {
    type: "module",
    dangerouslySetInnerHTML: {
      __html: 'const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img[data-main-image]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source[data-srcset]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1,e.parentNode.parentNode.querySelector("[data-placeholder-image]").style.opacity=0)}}'
    }
  });
},
    C = function C(t) {
  var a = t.layout,
      i = t.width,
      r = t.height;
  return "fullWidth" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    "aria-hidden": !0,
    style: {
      paddingTop: r / i * 100 + "%"
    }
  }) : "constrained" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      maxWidth: i,
      display: "block"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    alt: "",
    role: "presentation",
    "aria-hidden": "true",
    src: "data:image/svg+xml;charset=utf-8,%3Csvg height='" + r + "' width='" + i + "' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",
    style: {
      maxWidth: "100%",
      display: "block",
      position: "static"
    }
  })) : null;
},
    D = function D(a) {
  var i = a.children,
      r = o(a, L);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(C, n({}, r)), i, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(q, null));
},
    P = ["as", "className", "class", "style", "image", "loading", "imgClassName", "imgStyle", "backgroundColor", "objectFit", "objectPosition"],
    H = ["style", "className"],
    F = function F(e) {
  return e.replace(/\n/g, "");
},
    B = function B(t) {
  var a = t.as,
      i = void 0 === a ? "div" : a,
      r = t.className,
      s = t["class"],
      l = t.style,
      d = t.image,
      u = t.loading,
      c = void 0 === u ? "lazy" : u,
      h = t.imgClassName,
      g = t.imgStyle,
      p = t.backgroundColor,
      m = t.objectFit,
      f = t.objectPosition,
      v = o(t, P);
  if (!d) return console.warn("[gatsby-plugin-image] Missing image prop"), null;
  s && (r = s), g = n({
    objectFit: m,
    objectPosition: f,
    backgroundColor: p
  }, g);

  var w = d.width,
      y = d.height,
      b = d.layout,
      E = d.images,
      M = d.placeholder,
      S = d.backgroundColor,
      N = function (e, t, a) {
    var i = {},
        r = "gatsby-image-wrapper";
    return k() || (i.position = "relative", i.overflow = "hidden"), "fixed" === a ? (i.width = e, i.height = t) : "constrained" === a && (k() || (i.display = "inline-block", i.verticalAlign = "top"), r = "gatsby-image-wrapper gatsby-image-wrapper-constrained"), {
      className: r,
      "data-gatsby-image-wrapper": "",
      style: i
    };
  }(w, y, b),
      x = N.style,
      I = N.className,
      W = o(N, H),
      R = {
    fallback: void 0,
    sources: []
  };

  return E.fallback && (R.fallback = n({}, E.fallback, {
    srcSet: E.fallback.srcSet ? F(E.fallback.srcSet) : void 0
  })), E.sources && (R.sources = E.sources.map(function (e) {
    return n({}, e, {
      srcSet: F(e.srcSet)
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(i, n({}, W, {
    style: n({}, x, l, {
      backgroundColor: p
    }),
    className: I + (r ? " " + r : "")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(D, {
    layout: b,
    width: w,
    height: y
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(O, n({}, function (e, t, a, i, r, o, s, l) {
    var d = {};
    o && (d.backgroundColor = o, "fixed" === a ? (d.width = i, d.height = r, d.backgroundColor = o, d.position = "relative") : ("constrained" === a || "fullWidth" === a) && (d.position = "absolute", d.top = 0, d.left = 0, d.bottom = 0, d.right = 0)), s && (d.objectFit = s), l && (d.objectPosition = l);
    var u = n({}, e, {
      "aria-hidden": !0,
      "data-placeholder-image": "",
      style: n({
        opacity: 1,
        transition: "opacity 500ms linear"
      }, d)
    });
    return k() || (u.style = {
      height: "100%",
      left: 0,
      position: "absolute",
      top: 0,
      width: "100%"
    }), u;
  }(M, 0, b, w, y, S, m, f))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z, n({
    "data-gatsby-image-ssr": "",
    className: h
  }, v, function (e, t, a, i, r) {
    return void 0 === r && (r = {}), k() || (r = n({
      height: "100%",
      left: 0,
      position: "absolute",
      top: 0,
      transform: "translateZ(0)",
      transition: "opacity 250ms linear",
      width: "100%",
      willChange: "opacity"
    }, r)), n({}, a, {
      loading: i,
      shouldLoad: e,
      "data-main-image": "",
      style: n({}, r, {
        opacity: 0
      })
    });
  }("eager" === c, 0, R, c, g)))));
},
    G = ["src", "__imageData", "__error", "width", "height", "aspectRatio", "tracedSVGOptions", "placeholder", "formats", "quality", "transformOptions", "jpgOptions", "pngOptions", "webpOptions", "avifOptions", "blurredOptions"],
    V = function (t) {
  return function (a) {
    var i = a.src,
        r = a.__imageData,
        s = a.__error,
        l = o(a, G);
    return s && console.warn(s), r ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(t, n({
      image: r
    }, l)) : (console.warn("Image not loaded", i), s || "development" !== "development" || console.warn('Please ensure that "gatsby-plugin-image" is included in the plugins array in gatsby-config.js, and that your version of gatsby is at least 2.24.78'), null);
  };
}(B),
    U = function U(e, t) {
  return "fullWidth" !== e.layout || "width" !== t && "height" !== t || !e[t] ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().number.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t].concat([].slice.call(arguments, 2))) : new Error('"' + t + '" ' + e[t] + " may not be passed when layout is fullWidth.");
},
    X = new Set(["fixed", "fullWidth", "constrained"]),
    Y = {
  src: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.isRequired),
  alt: function alt(e, t, a) {
    return e.alt || "" === e.alt ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t, a].concat([].slice.call(arguments, 3))) : new Error('The "alt" prop is required in ' + a + '. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html');
  },
  width: U,
  height: U,
  sizes: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  layout: function layout(e) {
    if (void 0 !== e.layout && !X.has(e.layout)) return new Error("Invalid value " + e.layout + '" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".');
  }
};

V.displayName = "StaticImage", V.propTypes = Y;


/***/ }),

/***/ "./src/components/ActionPage/About.tsx":
/*!*********************************************!*\
  !*** ./src/components/ActionPage/About.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ About)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui */ "./src/components/ui/index.ts");
/* harmony import */ var _ui_Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/Text */ "./src/components/ui/Text.tsx");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/config */ "./src/lib/config.ts");





var AboutSection = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].section.withConfig({
  displayName: "About__AboutSection"
})([""]);
var AboutContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "About__AboutContainer"
})(["margin-bottom:20px;@media (min-width:768px){margin-bottom:50px;}"]);
var TitleContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "About__TitleContainer"
})(["margin-bottom:30px;"]);
var TextContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "About__TextContainer"
})(["margin-bottom:24px;@media (min-width:768px){margin-bottom:50px;}"]);
var ButtonContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "About__ButtonContainer"
})(["display:flex;justify-content:center;@media (min-width:768px){justify-content:flex-start;}"]);
function About() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AboutSection, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.TopComponent, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AboutContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(TitleContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Subtitle, null, "About this demo")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(TextContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.NORMAL
  }, "This page is an example dApp that requires KYC and uses the Fractal DID Registry.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ButtonContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.AnchorButton, {
    href: _lib_config__WEBPACK_IMPORTED_MODULE_3__.DOCS_URL,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "Developer documentation"))))));
}

/***/ }),

/***/ "./src/components/ActionPage/CallToAction.tsx":
/*!****************************************************!*\
  !*** ./src/components/ActionPage/CallToAction.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CallToAction)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui */ "./src/components/ui/index.ts");
/* harmony import */ var _ui_Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/Text */ "./src/components/ui/Text.tsx");




var CallToActionSection = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].section.withConfig({
  displayName: "CallToAction__CallToActionSection"
})([""]);
var CallToActionContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "CallToAction__CallToActionContainer"
})(["margin-bottom:146px;"]);
var TitleContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "CallToAction__TitleContainer"
})(["text-align:center;margin-bottom:86px;"]);
var ActionsContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "CallToAction__ActionsContainer"
})(["display:flex;flex-direction:column;align-items:center;@media (min-width:768px){flex-direction:row;justify-content:center;}"]);
var ButtonContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "CallToAction__ButtonContainer"
})(["margin-top:20px;@media (min-width:768px){margin-top:0;margin-left:67px;}"]);
function CallToAction() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CallToActionSection, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.TopComponent, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CallToActionContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(TitleContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Subtitle, null, "Stay updated to the latest news")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActionsContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    type: "email",
    placeholder: "Enter your email address here"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ButtonContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    height: "50px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.LARGE,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "Sign Up")))))));
}

/***/ }),

/***/ "./src/components/ActionPage/Connect.tsx":
/*!***********************************************!*\
  !*** ./src/components/ActionPage/Connect.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Connect": () => (/* binding */ Connect),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _web3_react_injected_connector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @web3-react/injected-connector */ "./node_modules/@web3-react/injected-connector/dist/injected-connector.esm.js");
/* harmony import */ var _hooks_web3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/web3 */ "./src/hooks/web3.ts");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui */ "./src/components/ui/index.ts");
/* harmony import */ var _ui_Text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/Text */ "./src/components/ui/Text.tsx");
/* harmony import */ var _ui_CenteredElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ui/CenteredElement */ "./src/components/ui/CenteredElement.tsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/constants */ "./src/lib/constants.ts");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) {
            if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
          }

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}









var injectedConnector = new _web3_react_injected_connector__WEBPACK_IMPORTED_MODULE_1__.InjectedConnector({});
var ConnectContainer = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].div.withConfig({
  displayName: "Connect__ConnectContainer"
})([""]);
var CardBodyContainer = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].div.withConfig({
  displayName: "Connect__CardBodyContainer"
})(["display:flex;flex-direction:column;justify-content:space-between;height:100%;"]);
var Connect = function Connect() {
  var _useWeb = (0,_hooks_web3__WEBPACK_IMPORTED_MODULE_2__["default"])(),
      activate = _useWeb.activate,
      active = _useWeb.active,
      account = _useWeb.account,
      chainId = _useWeb.chainId,
      deactivate = _useWeb.deactivate,
      library = _useWeb.library;

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (active && chainId !== _lib_constants__WEBPACK_IMPORTED_MODULE_6__.GOERLI_CHAIN_ID) {
      void switchToGoerliChain();
    }
  }, [active, chainId]);

  var connect = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return activate(injectedConnector, undefined, true);

            case 3:
              _context.next = 8;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0); // eslint-disable-next-line no-console

              console.error(_context.t0);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 5]]);
    }));

    return function connect() {
      return _ref.apply(this, arguments);
    };
  }();

  var switchToGoerliChain = function switchToGoerliChain() {
    if (library && library.provider && library.provider.request) {
      void library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{
          chainId: "0x".concat(_lib_constants__WEBPACK_IMPORTED_MODULE_6__.GOERLI_CHAIN_ID)
        }]
      });
    }
  };

  var shortAddress = account ? "".concat(account.substring(0, 5), "...").concat(account.substring(38)) : "";
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ConnectContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_3__.Card, {
    title: "My wallet"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CardBodyContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_4__.TextSizes.EXTRA_SMALL
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Account:"), " ", account ? shortAddress : "Not connected"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_4__.TextSizes.EXTRA_SMALL
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "G\xF6rli chain:"), " ", chainId === _lib_constants__WEBPACK_IMPORTED_MODULE_6__.GOERLI_CHAIN_ID ? "🟢" : "🔴"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui_CenteredElement__WEBPACK_IMPORTED_MODULE_5__.CenteredElement, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), !active ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    width: "50%",
    onClick: connect
  }, "Connect wallet") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    width: "50%",
    onClick: deactivate
  }, "Disconnect wallet")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Connect);

/***/ }),

/***/ "./src/components/ActionPage/Footer.tsx":
/*!**********************************************!*\
  !*** ./src/components/ActionPage/Footer.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui */ "./src/components/ui/index.ts");
/* harmony import */ var _ui_Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/Text */ "./src/components/ui/Text.tsx");




var FooterSection = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].section.withConfig({
  displayName: "Footer__FooterSection"
})(["background-color:rgba(209,151,255,0.13);"]);
var FooterContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Footer__FooterContainer"
})(["display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:auto;grid-column-gap:18px;grid-row-gap:18px;@media (min-width:768px){margin:0 107px;grid-template-columns:repeat(3,1fr);}"]);
var LinkContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Footer__LinkContainer"
})(["margin-bottom:10px;"]);
var Link = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].a.withConfig({
  displayName: "Footer__Link"
})(["text-decoration:none;color:var(--c-black);:hover{color:var(--c-pink);}"]);
var FooterLinksContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Footer__FooterLinksContainer"
})([""]);
var FooterAboutContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Footer__FooterAboutContainer"
})(["grid-column:1 / span 2;@media (min-width:768px){grid-column:3;}"]);
var FooterSupportContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Footer__FooterSupportContainer"
})([""]);
var FooterHeaderContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Footer__FooterHeaderContainer"
})(["margin-bottom:39px;"]);
var FooterContentContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Footer__FooterContentContainer"
})([""]);
var EmailContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Footer__EmailContainer"
})(["margin-top:27px;"]);
function Footer() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FooterSection, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.TopComponent, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FooterContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FooterLinksContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FooterHeaderContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "QUICK LINKS")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FooterContentContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LinkContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "Home"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LinkContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "What we do"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LinkContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "News"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LinkContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "Contact"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FooterSupportContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FooterHeaderContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "SUPPORT")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FooterContentContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LinkContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "Help center"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LinkContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "Discussions"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LinkContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "Contact"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LinkContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "Blog"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LinkContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "FAQ"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FooterAboutContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FooterHeaderContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "ABOUT DEFISTARTER")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FooterContentContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LinkContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "1337 Stallman Drive Muh Freedomsville, 3141592"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LinkContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(EmailContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "E: julio@frctls.com T: 0800 420 420 420")))))))));
}

/***/ }),

/***/ "./src/components/ActionPage/Header.tsx":
/*!**********************************************!*\
  !*** ./src/components/ActionPage/Header.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui */ "./src/components/ui/index.ts");
/* harmony import */ var _ui_Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/Text */ "./src/components/ui/Text.tsx");




var HeaderSection = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].section.withConfig({
  displayName: "Header__HeaderSection"
})(["min-height:76px;"]);
var HeaderContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Header__HeaderContainer"
})(["display:flex;align-items:center;justify-content:space-between;"]);
var LogoContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Header__LogoContainer"
})(["flex:1;"]);
var LinksContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Header__LinksContainer"
})(["display:none;@media (min-width:768px){flex:1;display:flex;align-items:center;justify-content:space-between;}"]);
var Link = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].a.withConfig({
  displayName: "Header__Link"
})(["text-decoration:none;color:var(--c-black);:hover{color:var(--c-pink);}"]);
var Logo = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Header__Logo"
})(["cursor:pointer;"]);
function Header() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(HeaderSection, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.TopComponent, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(HeaderContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LogoContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Logo, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Subtitle, null, "Defistarter"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LinksContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.LARGE,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "home")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.LARGE,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "products")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.LARGE,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "our team")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.LARGE,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "contact us"))))));
}

/***/ }),

/***/ "./src/components/ActionPage/Hero.tsx":
/*!********************************************!*\
  !*** ./src/components/ActionPage/Hero.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Hero)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui */ "./src/components/ui/index.ts");
/* harmony import */ var _ui_Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/Text */ "./src/components/ui/Text.tsx");
/* harmony import */ var _ui_Collapsible__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/Collapsible */ "./src/components/ui/Collapsible.tsx");
/* harmony import */ var _hooks_web3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/web3 */ "./src/hooks/web3.ts");
/* harmony import */ var _Connect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Connect */ "./src/components/ActionPage/Connect.tsx");
/* harmony import */ var _MiniBackoffice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MiniBackoffice */ "./src/components/ActionPage/MiniBackoffice.tsx");
/* harmony import */ var _PurchaseEligibility__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PurchaseEligibility */ "./src/components/ActionPage/PurchaseEligibility.tsx");
/* harmony import */ var _assets_images_hero_dots_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../assets/images/hero_dots.svg */ "./src/assets/images/hero_dots.svg");
/* harmony import */ var _assets_images_hero_dots_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_images_hero_dots_svg__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _hooks_miniBackoffice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../hooks/miniBackoffice */ "./src/hooks/miniBackoffice.ts");
/* harmony import */ var _lib_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib/types */ "./src/lib/types.ts");
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}













var HeroSection = styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].section.withConfig({
  displayName: "Hero__HeroSection"
})(["height:calc(100vh - 76px);display:flex;@media (min-width:768px){height:auto;}"]);
var HeroContainer = styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "Hero__HeroContainer"
})(["height:100%;display:flex;flex-direction:column;justify-content:space-around;@media (min-width:768px){display:block;margin-bottom:100px;}"]);
var HeroDotsContainer = styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "Hero__HeroDotsContainer"
})(["position:absolute;top:0;z-index:-10;display:flex;justify-content:center;width:100vw;"]);
var HeroRow = styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "Hero__HeroRow"
})(["display:flex;width:100%;flex-direction:column;@media (min-width:768px){text-align:left;flex-direction:row;justify-content:", ";margin-bottom:2em;}"], function (props) {
  var _props$justifyContent;

  return (_props$justifyContent = props.justifyContent) !== null && _props$justifyContent !== void 0 ? _props$justifyContent : "space-between";
});
var HeroTitleColumn = styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "Hero__HeroTitleColumn"
})(["display:flex;flex-direction:column;"]);
var SubtitleContainer = styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "Hero__SubtitleContainer"
})(["margin:0.5em;text-align:center;@media (min-width:768px){text-align:left;}p:empty::before{content:\"\";display:inline-block;}"]);

var NewLine = function NewLine() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null);
};

function Hero() {
  var _useWeb = (0,_hooks_web3__WEBPACK_IMPORTED_MODULE_4__["default"])(),
      active = _useWeb.active,
      account = _useWeb.account,
      chainId = _useWeb.chainId,
      library = _useWeb.library;

  var backoffice = (0,_hooks_miniBackoffice__WEBPACK_IMPORTED_MODULE_9__["default"])(account, chainId, library);

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      registryStatus = _useState2[0],
      setRegistryStatus = _useState2[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var status = "";

    switch (backoffice.status) {
      case "UnregisteredUser":
        status = " but your address is not in the DID Registry. So, you can't purchase yet! Use the Backoffice control in step #2 to update the DID Registry.";
        break;

      case "KYCApproved":
        status = ", your address is in the DID Registry AND you are in the KYC List. So, you can purchase! ";
        break;

      case "Loading":
        status = " but your status is getting updated in the Registry.";
        break;

      case "Error":
        status = " but there was an error accessing the Registry.";
        break;

      case "Unconfigured":
        status = " but the Registry thinks your wallet is not connected.";
        break;

      default:
        (0,_lib_types__WEBPACK_IMPORTED_MODULE_10__.unreachable)(backoffice);
    }

    setRegistryStatus(status);
  }, [backoffice.status]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HeroSection, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HeroDotsContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((_assets_images_hero_dots_svg__WEBPACK_IMPORTED_MODULE_8___default()), null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.TopComponent, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HeroContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HeroRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HeroTitleColumn, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Title, null, "Fractal's DID Registry User Demo"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui_Collapsible__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SubtitleContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: "20px",
    lineHeight: "30px"
  }, "This demo shows you how changes to the", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "DID Registry"), " impact how your users will experience logging in to your dApp.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NewLine, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NewLine, null), "When you connect your wallet to this dApp in Step #1 below, the dApp automatically checks the DID Registry to see if you are eligible to purchase. If your wallet address is in the DID Registry and you are in the KYC List, then you are eligible to purchase.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NewLine, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NewLine, null), "You can use Step #2 below to update the DID Registry. If your wallet address is not in the DID Registry, you can add it. If you are not in the KYC List, you can add yourself. In a similar way, you can remove yourself from the KYC List or remove your wallet address from DID Registry. These are NOT actions your user can take but meant to demonstrate how your dApp can query the DID Registry and you can show or hide actions (like voting or purchasing) based on the status in the DID Registry.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NewLine, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NewLine, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "You will need G\xF6rli ETH"), " to complete this demo - get some", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://goerli-faucet.pk910.de/"
  }, "here"), " or", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://goerlifaucet.com/"
  }, "here.")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HeroRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SubtitleContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD,
    lineHeight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextLineHeights.NORMAL
  }, "1.", active ? " Your wallet is connected".concat(registryStatus) : " Connect your wallet."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HeroRow, {
    justifyContent: "space-evenly"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      width: "40%"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Connect__WEBPACK_IMPORTED_MODULE_5__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      width: "40%"
    }
  }, active ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PurchaseEligibility__WEBPACK_IMPORTED_MODULE_7__["default"], null) : "")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SubtitleContainer, null, active ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HeroRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD,
    lineHeight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextLineHeights.NORMAL
  }, "2. BackOffice Control that you can use to update the DID Registry.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HeroRow, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_MiniBackoffice__WEBPACK_IMPORTED_MODULE_6__["default"], {
    backoffice: backoffice
  }))) : ""))));
}

/***/ }),

/***/ "./src/components/ActionPage/MiniBackoffice.tsx":
/*!******************************************************!*\
  !*** ./src/components/ActionPage/MiniBackoffice.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MiniBackoffice": () => (/* binding */ MiniBackoffice),
/* harmony export */   "SingleText": () => (/* binding */ SingleText),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui */ "./src/components/ui/index.ts");
/* harmony import */ var _ui_Collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/Collapsible */ "./src/components/ui/Collapsible.tsx");
/* harmony import */ var _ui_Text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/Text */ "./src/components/ui/Text.tsx");
/* harmony import */ var _ui_CenteredElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/CenteredElement */ "./src/components/ui/CenteredElement.tsx");
/* harmony import */ var _lib_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/types */ "./src/lib/types.ts");







var Card = (0,styled_components__WEBPACK_IMPORTED_MODULE_6__["default"])(_ui__WEBPACK_IMPORTED_MODULE_1__.Card).withConfig({
  displayName: "MiniBackoffice__Card"
})(["color:white;background-color:black;"]);

var NewLine = function NewLine() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null);
};

var CardBodyContainer = styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div.withConfig({
  displayName: "MiniBackoffice__CardBodyContainer"
})(["display:flex;flex-direction:column;justify-content:space-between;height:100%;"]);
var SingleText = function SingleText(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, null, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, null, "\xA0"));
};
var MiniBackoffice = function MiniBackoffice(_ref2) {
  var backoffice = _ref2.backoffice;
  var content;

  switch (backoffice.status) {
    case "Unconfigured":
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SingleText, null, "Please connect your wallet first.");
      break;

    case "UnregisteredUser":
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
        size: _ui_Text__WEBPACK_IMPORTED_MODULE_3__.TextSizes.SMALL
      }, "You are not in the Registry. Click the button to add yourself."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui_Collapsible__WEBPACK_IMPORTED_MODULE_2__["default"], {
        fill: "white"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, "Normally, you would need to onboard with a KYC level like", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Plus"), ". Then, once your information is approved you would be added to Registry by Fractal. Clicking the", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Add ME to Registry"), " button", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "simulates"), " that process.", " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NewLine, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui_CenteredElement__WEBPACK_IMPORTED_MODULE_4__.CenteredElement, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
        onClick: function onClick() {
          return void backoffice.addUserToRegistry();
        }
      }, "Add ME to Registry")));
      break;

    case "KYCApproved":
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
        size: _ui_Text__WEBPACK_IMPORTED_MODULE_3__.TextSizes.SMALL
      }, "You are KYC Approved! Clicking the button will remove you from the KYC List."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NewLine, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui_CenteredElement__WEBPACK_IMPORTED_MODULE_4__.CenteredElement, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
        onClick: function onClick() {
          return void backoffice.removeUserFromRegistry();
        }
      }, "Remove ME from Registry")));
      break;

    case "Loading":
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SingleText, null, "Updating the Registry...");
      break;

    case "Error":
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SingleText, null, "Something went wrong! See the console got more information.");
      break;

    default:
      (0,_lib_types__WEBPACK_IMPORTED_MODULE_5__.unreachable)(backoffice);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Card, {
    title: "Actions performed by Fractal's servers",
    width: "90%"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CardBodyContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, null, "This window shows you how Fractal updates the DID Registry. The user would not be asked to do these transactions but you can perform them for this demo."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, null), content));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MiniBackoffice);

/***/ }),

/***/ "./src/components/ActionPage/News.tsx":
/*!********************************************!*\
  !*** ./src/components/ActionPage/News.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ News)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui */ "./src/components/ui/index.ts");
/* harmony import */ var _ui_Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/Text */ "./src/components/ui/Text.tsx");
/* harmony import */ var _ui_Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/Image */ "./src/components/ui/Image.tsx");





var NewsSection = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].section.withConfig({
  displayName: "News__NewsSection"
})([""]);
var NewsContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "News__NewsContainer"
})(["margin-bottom:20px;@media (min-width:768px){margin-bottom:50px;}"]);
var TitleContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "News__TitleContainer"
})(["margin-bottom:30px;@media (min-width:768px){text-align:center;}"]);
var CardsContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "News__CardsContainer"
})(["display:grid;overflow-x:scroll;grid-template-columns:repeat(3,1fr);grid-template-rows:auto;grid-column-gap:18px;grid-row-gap:22px;"]);
var ImageContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "News__ImageContainer"
})(["margin-bottom:17px;"]);
var LabelContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "News__LabelContainer"
})([""]);
var DescriptionContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "News__DescriptionContainer"
})([""]);
var Link = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].a.withConfig({
  displayName: "News__Link"
})(["text-decoration:none;color:var(--c-black);:hover{color:var(--c-pink);}"]);
function News() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(NewsSection, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.TopComponent, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(NewsContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(TitleContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Subtitle, null, "In the news")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CardsContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ImageContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Image, {
    name: _ui_Image__WEBPACK_IMPORTED_MODULE_3__.ImageNames.EXPLORING_BLOCKCHAIN
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ImageContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Image, {
    name: _ui_Image__WEBPACK_IMPORTED_MODULE_3__.ImageNames.BLOCKCHAIN_INDUSTRY
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ImageContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Image, {
    name: _ui_Image__WEBPACK_IMPORTED_MODULE_3__.ImageNames.CRYPTO_TODAY
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LabelContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.LARGE,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "Exploring blockchain technology"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LabelContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.LARGE,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "Blockchain Industry News"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LabelContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.LARGE,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, "Crypto world today")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DescriptionContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.SMALL
  }, "This article will discuss the critical terminologies of blockchain technology")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DescriptionContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.SMALL
  }, "Stay tuned to blockchain news, industry analysis and in-depth articles")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DescriptionContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.SMALL
  }, "Latest cryptocurrency news, updates, values, price predictions, and more")))))));
}

/***/ }),

/***/ "./src/components/ActionPage/PurchaseEligibility.tsx":
/*!***********************************************************!*\
  !*** ./src/components/ActionPage/PurchaseEligibility.tsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PurchaseEligibility": () => (/* binding */ PurchaseEligibility),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui */ "./src/components/ui/index.ts");
/* harmony import */ var _ui_Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/Text */ "./src/components/ui/Text.tsx");
/* harmony import */ var _ui_CenteredElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/CenteredElement */ "./src/components/ui/CenteredElement.tsx");
/* harmony import */ var _contracts_FractalRegistry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../contracts/FractalRegistry */ "./src/contracts/FractalRegistry.ts");
/* harmony import */ var _hooks_web3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/web3 */ "./src/hooks/web3.ts");
/* harmony import */ var _hooks_miniBackoffice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/miniBackoffice */ "./src/hooks/miniBackoffice.ts");
/* harmony import */ var _lib_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/types */ "./src/lib/types.ts");
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}










var CardBodyContainer = styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div.withConfig({
  displayName: "PurchaseEligibility__CardBodyContainer"
})(["display:flex;flex-direction:column;justify-content:space-between;height:100%;"]);

var NewLine = function NewLine() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null);
};

var ONE_SECOND = 1000;
var PurchaseEligibility = function PurchaseEligibility() {
  var _useWeb = (0,_hooks_web3__WEBPACK_IMPORTED_MODULE_5__["default"])(),
      account = _useWeb.account,
      library = _useWeb.library;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      userInList = _useState2[0],
      setUserInList = _useState2[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!account || !library) {
      setUserInList(undefined);
      return function () {
        return undefined;
      };
    }

    var connectRegistry = _contracts_FractalRegistry__WEBPACK_IMPORTED_MODULE_4__["default"].connect(library.getSigner());
    var interval = setInterval(function () {
      connectRegistry.getFractalId(account).then(function (fractalId) {
        return connectRegistry.isUserInList(fractalId, _hooks_miniBackoffice__WEBPACK_IMPORTED_MODULE_6__.KYCList);
      }).then(setUserInList) // eslint-disable-next-line no-console
      ["catch"](function (e) {
        return console.error(e);
      });
    }, ONE_SECOND);
    return function () {
      return clearInterval(interval);
    };
  }, [account]);
  var content;

  if (!account) {
    content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, "Connect your wallet. \uD83D\uDC5B");
  } else if (userInList === undefined) {
    content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, "Checking chain state... \u23F1");
  } else if (userInList === false) {
    content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, "You are ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "NOT"), " in the KYC List in the DID Registry so are not able to make purchase.");
  } else if (userInList === true) {
    content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, "You ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "ARE"), " in the KYC List in the DID Registry so you are cleared to make a purchase!");
  } else {
    (0,_lib_types__WEBPACK_IMPORTED_MODULE_7__.unreachable)(userInList);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Card, {
    title: "Purchase eligibility"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CardBodyContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui_CenteredElement__WEBPACK_IMPORTED_MODULE_3__.CenteredElement, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.EXTRA_SMALL
  }, content)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui_CenteredElement__WEBPACK_IMPORTED_MODULE_3__.CenteredElement, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NewLine, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    width: "50%",
    disabled: !userInList
  }, "Purchase"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PurchaseEligibility);

/***/ }),

/***/ "./src/components/ActionPage/Socials.tsx":
/*!***********************************************!*\
  !*** ./src/components/ActionPage/Socials.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Socials)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui */ "./src/components/ui/index.ts");
/* harmony import */ var _ui_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/Icon */ "./src/components/ui/Icon.tsx");
/* harmony import */ var _ui_Text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/Text */ "./src/components/ui/Text.tsx");





var SocialsSection = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].section.withConfig({
  displayName: "Socials__SocialsSection"
})([""]);
var SocialsContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "Socials__SocialsContainer"
})(["margin-bottom:20px;@media (min-width:768px){margin-bottom:50px;}"]);
var TitleContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "Socials__TitleContainer"
})(["margin-bottom:30px;@media (min-width:768px){text-align:center;}"]);
var TextContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "Socials__TextContainer"
})(["margin-bottom:24px;@media (min-width:768px){margin-bottom:50px;text-align:center;}"]);
var ButtonsContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "Socials__ButtonsContainer"
})(["display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;@media (min-width:768px){flex-direction:row;}"]);
var ButtonContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "Socials__ButtonContainer"
})(["margin-bottom:12px;@media (min-width:768px){margin-bottom:0;button{height:60px;}}"]);
function Socials() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SocialsSection, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.TopComponent, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SocialsContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(TitleContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Subtitle, null, "We are a global community")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(TextContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_3__.TextSizes.NORMAL
  }, "Learn more about us, talk with others in the community and participate in creating the future")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ButtonsContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ButtonContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    leftIcon: _ui_Icon__WEBPACK_IMPORTED_MODULE_2__.IconNames.TELEGRAM
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_3__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_3__.TextWeights.BOLD
  }, "Telegram"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ButtonContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    leftIcon: _ui_Icon__WEBPACK_IMPORTED_MODULE_2__.IconNames.TWITTER
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_3__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_3__.TextWeights.BOLD
  }, "Twitter"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ButtonContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    leftIcon: _ui_Icon__WEBPACK_IMPORTED_MODULE_2__.IconNames.DISCORD
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_3__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_3__.TextWeights.BOLD
  }, "Discord"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ButtonContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    leftIcon: _ui_Icon__WEBPACK_IMPORTED_MODULE_2__.IconNames.REDDIT
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _ui_Text__WEBPACK_IMPORTED_MODULE_3__.TextSizes.EXTRA_SMALL,
    weight: _ui_Text__WEBPACK_IMPORTED_MODULE_3__.TextWeights.BOLD
  }, "Reddit")))))));
}

/***/ }),

/***/ "./src/components/ui/Button.tsx":
/*!**************************************!*\
  !*** ./src/components/ui/Button.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnchorButton": () => (/* binding */ AnchorButton),
/* harmony export */   "default": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Text */ "./src/components/ui/Text.tsx");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon */ "./src/components/ui/Icon.tsx");
var _excluded = ["loading", "disabled", "type", "alt"],
    _excluded2 = ["loading", "disabled", "href", "target", "alt"];

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}





var buttonStyles = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(["user-select:none;background-color:var(--c-orange);color:var(--c-white);border-radius:10px;padding-left:15px;padding-right:15px;height:40px;min-width:170px;display:flex;align-items:center;justify-content:center;transition:all 0.5s;transform:scale(1);:hover{", "}", " ", " ", " ", ""], function (props) {
  return !props.disabled && !props.loading && (0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(["opacity:0.8;"]);
}, function (props) {
  return props.alt === "true" && (0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(["background-color:var(--c-light-pink);box-shadow:0px 3px 3px var(--c-pink);border-radius:5px;padding-left:10px;padding-right:16x;justify-content:flex-start;height:30px;"]);
}, function (props) {
  return props.height !== undefined && (0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(["height:", ";"], props.height);
}, function (props) {
  return props.width !== undefined && (0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(["width:", ";"], props.width);
}, function (props) {
  return props.disabled && (0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(["opacity:0.4;background-color:var(--c-red);"]);
});
var ButtonContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].button.withConfig({
  displayName: "Button__ButtonContainer"
})(["", ""], buttonStyles);
var LeftIconContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Button__LeftIconContainer"
})(["margin-right:16px;display:flex;"]);
var RightIconContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Button__RightIconContainer"
})(["margin-left:16px;display:flex;"]);

function ButtonContent(props) {
  var loading = props.loading,
      leftIcon = props.leftIcon,
      rightIcon = props.rightIcon,
      children = props.children;

  if (loading) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Text__WEBPACK_IMPORTED_MODULE_1__["default"], null, "Loading...");
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, leftIcon !== undefined && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LeftIconContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: leftIcon
  })), children, rightIcon !== undefined && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RightIconContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: rightIcon
  })));
}

Button.defaultProps = {
  type: "button",
  alt: false,
  disabled: false,
  loading: false
};
function Button(props) {
  var loading = props.loading,
      disabled = props.disabled,
      type = props.type,
      alt = props.alt,
      otherProps = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ButtonContainer, _extends({
    type: type,
    alt: alt === null || alt === void 0 ? void 0 : alt.toString(),
    disabled: disabled || loading
  }, otherProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ButtonContent, props));
}
var AnchorContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].a.withConfig({
  displayName: "Button__AnchorContainer"
})(["", " cursor:pointer;text-decoration:none;width:fit-content;"], buttonStyles);
AnchorButton.defaultProps = {
  target: "_blank",
  alt: false,
  disabled: false,
  loading: false
};
function AnchorButton(props) {
  var loading = props.loading,
      disabled = props.disabled,
      href = props.href,
      target = props.target,
      alt = props.alt,
      otherProps = _objectWithoutProperties(props, _excluded2);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AnchorContainer, _extends({
    href: href,
    target: target,
    alt: alt === null || alt === void 0 ? void 0 : alt.toString(),
    disabled: disabled || loading
  }, otherProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ButtonContent, props));
}

/***/ }),

/***/ "./src/components/ui/Card.tsx":
/*!************************************!*\
  !*** ./src/components/ui/Card.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Card)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui */ "./src/components/ui/index.ts");
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Text */ "./src/components/ui/Text.tsx");
var _excluded = ["title", "children"];

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}





var cardStyles = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(["background-color:var(--c-white);border-radius:10px;padding:10px;min-height:100px;min-width:170px;display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;-webkit-box-shadow:3px 3px 14px 0px rgba(231,205,252,1);-moz-box-shadow:3px 3px 14px 0px rgba(231,205,252,1);box-shadow:3px 3px 14px 0px rgba(231,205,252,1);", " ", ""], function (props) {
  return props.height !== undefined && (0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(["height:", ";"], props.height);
}, function (props) {
  return props.width !== undefined && (0,styled_components__WEBPACK_IMPORTED_MODULE_3__.css)(["width:", ";"], props.width);
});
var CardContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Card__CardContainer"
})(["", ""], cardStyles);
var CardTitleContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Card__CardTitleContainer"
})(["display:flex;justify-content:center;align-items:center;height:40px;border-bottom:1px solid var(--c-gray);"]);
var CardContentContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Card__CardContentContainer"
})(["padding:20px 12px 0px 12px;min-width:0;flex-grow:1;"]);

function CardContent(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CardContentContainer, null, children);
}

function CardTitle(_ref2) {
  var title = _ref2.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CardTitleContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    size: _Text__WEBPACK_IMPORTED_MODULE_2__.TextSizes.NORMAL,
    weight: _Text__WEBPACK_IMPORTED_MODULE_2__.TextWeights.BOLD
  }, title));
}

function Card(_ref3) {
  var title = _ref3.title,
      children = _ref3.children,
      otherProps = _objectWithoutProperties(_ref3, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CardContainer, otherProps, title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CardTitle, {
    title: title
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CardContent, null, children));
}

/***/ }),

/***/ "./src/components/ui/CenteredElement.tsx":
/*!***********************************************!*\
  !*** ./src/components/ui/CenteredElement.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CenteredElement": () => (/* binding */ CenteredElement),
/* harmony export */   "CenteredFlexElement": () => (/* binding */ CenteredFlexElement)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");

var CenteredElement = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div.withConfig({
  displayName: "CenteredElement"
})(["margin:auto;button{margin:auto;}"]);
var CenteredFlexElement = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__["default"])(CenteredElement).withConfig({
  displayName: "CenteredElement__CenteredFlexElement"
})(["display:flex;justify-content:space-evenly;"]);

/***/ }),

/***/ "./src/components/ui/Collapsible.tsx":
/*!*******************************************!*\
  !*** ./src/components/ui/Collapsible.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _assets_icons_arrow_right_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/icons/arrow-right.svg */ "./src/assets/icons/arrow-right.svg");
/* harmony import */ var _assets_icons_arrow_right_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_arrow_right_svg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_icons_arrow_down_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/icons/arrow-down.svg */ "./src/assets/icons/arrow-down.svg");
/* harmony import */ var _assets_icons_arrow_down_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_arrow_down_svg__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}





var StyledContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "Collapsible__StyledContainer"
})(["font-size:15px;line-height:22px;.toggle{padding:10px;}"]);

var Collapsible = function Collapsible(_ref) {
  var _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? "black" : _ref$fill,
      children = _ref.children;
  var height = 24;
  var width = 24;

  var Open = function Open() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((_assets_icons_arrow_down_svg__WEBPACK_IMPORTED_MODULE_2___default()), {
      fill: fill,
      width: height,
      height: width
    });
  };

  var Closed = function Closed() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((_assets_icons_arrow_right_svg__WEBPACK_IMPORTED_MODULE_1___default()), {
      fill: fill,
      width: height,
      height: width
    });
  };

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var toggle = function toggle() {
    return setOpen(!open);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledContainer, {
    onClick: function onClick() {
      return toggle();
    }
  }, open ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Open, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Closed, null), open && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "toggle"
  }, children));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Collapsible);

/***/ }),

/***/ "./src/components/ui/Head.tsx":
/*!************************************!*\
  !*** ./src/components/ui/Head.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_63159454_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../public/page-data/sq/d/63159454.json */ "./public/page-data/sq/d/63159454.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");

/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */



Head.defaultProps = {
  lang: "en",
  meta: []
};

function Head(_ref) {
  var _site$siteMetadata;

  var description = _ref.description,
      lang = _ref.lang,
      meta = _ref.meta,
      title = _ref.title;
  var site = _public_page_data_sq_d_63159454_json__WEBPACK_IMPORTED_MODULE_0__.data.site;
  var metaDescription = description || site.siteMetadata.description;
  var websiteTitle = title || site.siteMetadata.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_2__.Helmet, {
    htmlAttributes: {
      lang: lang
    },
    title: websiteTitle,
    meta: (meta || []).concat([{
      name: "description",
      content: metaDescription
    }, {
      property: "og:title",
      content: title
    }, {
      property: "og:description",
      content: metaDescription
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }, {
      name: "twitter:creator",
      content: ((_site$siteMetadata = site.siteMetadata) === null || _site$siteMetadata === void 0 ? void 0 : _site$siteMetadata.author) || ""
    }, {
      name: "twitter:title",
      content: title
    }, {
      name: "twitter:description",
      content: metaDescription
    }])
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Head);

/***/ }),

/***/ "./src/components/ui/Icon.tsx":
/*!************************************!*\
  !*** ./src/components/ui/Icon.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IconNames": () => (/* binding */ IconNames),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _assets_icons_discord_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/icons/discord.svg */ "./src/assets/icons/discord.svg");
/* harmony import */ var _assets_icons_discord_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_discord_svg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_icons_reddit_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/icons/reddit.svg */ "./src/assets/icons/reddit.svg");
/* harmony import */ var _assets_icons_reddit_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_reddit_svg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_icons_telegram_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/icons/telegram.svg */ "./src/assets/icons/telegram.svg");
/* harmony import */ var _assets_icons_telegram_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_telegram_svg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_icons_twitter_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assets/icons/twitter.svg */ "./src/assets/icons/twitter.svg");
/* harmony import */ var _assets_icons_twitter_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_twitter_svg__WEBPACK_IMPORTED_MODULE_4__);
var _excluded = ["name", "clickable", "onClick"];

var _Icons;

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}







var RootContainer = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div.withConfig({
  displayName: "Icon__RootContainer"
})(["", ""], function (props) {
  return props.clickable && (0,styled_components__WEBPACK_IMPORTED_MODULE_5__.css)(["cursor:pointer;"]);
});
var IconNames = {
  DISCORD: "discord",
  REDDIT: "reddit",
  TELEGRAM: "telegram",
  TWITTER: "twitter"
};
var Icons = (_Icons = {}, _defineProperty(_Icons, IconNames.DISCORD, (_assets_icons_discord_svg__WEBPACK_IMPORTED_MODULE_1___default())), _defineProperty(_Icons, IconNames.REDDIT, (_assets_icons_reddit_svg__WEBPACK_IMPORTED_MODULE_2___default())), _defineProperty(_Icons, IconNames.TELEGRAM, (_assets_icons_telegram_svg__WEBPACK_IMPORTED_MODULE_3___default())), _defineProperty(_Icons, IconNames.TWITTER, (_assets_icons_twitter_svg__WEBPACK_IMPORTED_MODULE_4___default())), _Icons);
Icon.defaultProps = {
  clickable: false
};

function Icon(props) {
  var name = props.name,
      clickable = props.clickable,
      onClick = props.onClick,
      otherProps = _objectWithoutProperties(props, _excluded);

  var Svg = Icons[name];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RootContainer, {
    clickable: clickable,
    onClick: onClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Svg, _extends({
    alt: name
  }, otherProps)));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Icon);

/***/ }),

/***/ "./src/components/ui/Image.tsx":
/*!*************************************!*\
  !*** ./src/components/ui/Image.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageNames": () => (/* binding */ ImageNames),
/* harmony export */   "default": () => (/* binding */ Image)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_2187342950_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../public/page-data/sq/d/2187342950.json */ "./public/page-data/sq/d/2187342950.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");




var RootContainer = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div.withConfig({
  displayName: "Image__RootContainer"
})(["", ""], function (props) {
  return props.clickable && (0,styled_components__WEBPACK_IMPORTED_MODULE_2__.css)(["cursor:pointer;"]);
});
var ImageNames = {
  BLOCKCHAIN_INDUSTRY: "blockchain_industry",
  CRYPTO_TODAY: "crypto_today",
  EXPLORING_BLOCKCHAIN: "exploring_blockchain"
};
function Image(props) {
  var name = props.name,
      clickable = props.clickable,
      onClick = props.onClick;
  var data = _public_page_data_sq_d_2187342950_json__WEBPACK_IMPORTED_MODULE_0__.data;
  var image = (0,gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__.getImage)(data[name]);

  if (image === undefined) {
    throw new Error("Unknown image: ".concat(name));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(RootContainer, {
    clickable: clickable,
    onClick: onClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__.GatsbyImage, {
    image: image,
    alt: name
  }));
}

/***/ }),

/***/ "./src/components/ui/Input.tsx":
/*!*************************************!*\
  !*** ./src/components/ui/Input.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");


var InputContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].input.withConfig({
  displayName: "Input__InputContainer"
})(["background-color:var(--c-dark-pink);color:var(--c-white);border-color:var(--c-dark-pink);border-width:0px;border-radius:10px;padding-left:15px;padding-right:15px;height:50px;min-width:300px;font-size:16px;line-height:16px;color:var(--c-white);@media (min-width:768px){min-width:500px;font-size:24px;line-height:24px;}:focus{outline:none;}::placeholder{font-weight:bold;font-size:16px;line-height:16px;@media (min-width:768px){font-size:24px;line-height:24px;}text-align:center;color:var(--c-white);}:focus{color:var(--c-dark-pink);background-color:var(--c-white);border-width:1px;}"]);
function Input(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(InputContainer, props);
}

/***/ }),

/***/ "./src/components/ui/Layout/fonts/GlobalFonts.ts":
/*!*******************************************************!*\
  !*** ./src/components/ui/Layout/fonts/GlobalFonts.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _NexaLight_otf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NexaLight.otf */ "./src/components/ui/Layout/fonts/NexaLight.otf");
/* harmony import */ var _NexaBold_otf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NexaBold.otf */ "./src/components/ui/Layout/fonts/NexaBold.otf");



var fonts = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__.createGlobalStyle)(["@font-face{font-family:\"Nexa\";font-weight:normal;font-style:normal;src:url(", ") format(\"opentype\");font-display:fallback;}@font-face{font-family:\"Nexa\";font-weight:bold;font-style:normal;src:url(", ") format(\"opentype\");font-display:fallback;}"], _NexaLight_otf__WEBPACK_IMPORTED_MODULE_0__["default"], _NexaBold_otf__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fonts);

/***/ }),

/***/ "./src/components/ui/Layout/index.tsx":
/*!********************************************!*\
  !*** ./src/components/ui/Layout/index.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _Head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Head */ "./src/components/ui/Head.tsx");
/* harmony import */ var _styles_GlobalStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/GlobalStyle */ "./src/components/ui/Layout/styles/GlobalStyle.ts");
/* harmony import */ var _fonts_GlobalFonts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fonts/GlobalFonts */ "./src/components/ui/Layout/fonts/GlobalFonts.ts");





var LayoutContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "Layout__LayoutContainer"
})(["max-width:100%;min-height:100vh;overflow:hidden;"]);
function Layout(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styles_GlobalStyle__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_fonts_GlobalFonts__WEBPACK_IMPORTED_MODULE_3__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Head__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LayoutContainer, {
    className: "Layout"
  }, children));
}

/***/ }),

/***/ "./src/components/ui/Layout/styles/GlobalStyle.ts":
/*!********************************************************!*\
  !*** ./src/components/ui/Layout/styles/GlobalStyle.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalStyle": () => (/* binding */ GlobalStyle),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _ResetStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResetStyle */ "./src/components/ui/Layout/styles/ResetStyle.ts");
/* harmony import */ var _NormalizeStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NormalizeStyle */ "./src/components/ui/Layout/styles/NormalizeStyle.ts");



var GlobalStyle = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__.createGlobalStyle)(["", " ", " :root{--c-white:#ffffff;--c-black:#000000;--c-gray:#f5f0f8;--c-lightest-pink:rgba(209,151,255,0.1);--c-light-pink:rgba(209,151,255,0.74);--c-pink:#d197ff;--c-dark-pink:#cc8bff;--c-red:rgba(239,68,68);--c-orange:rgba(255,103,29,0.8);}html{background-color:var(--c-white);color:var(--c-black);}html,body{font-family:Nexa,Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;}"], _ResetStyle__WEBPACK_IMPORTED_MODULE_0__["default"], _NormalizeStyle__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GlobalStyle);

/***/ }),

/***/ "./src/components/ui/Layout/styles/NormalizeStyle.ts":
/*!***********************************************************!*\
  !*** ./src/components/ui/Layout/styles/NormalizeStyle.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NormalizeStyle": () => (/* binding */ NormalizeStyle),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");

var NormalizeStyle = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */ html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0;}main{display:block;}h1{font-size:2em;margin:0.67em 0;}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace,monospace;font-size:1em;}a{background-color:transparent;}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted;}b,strong{font-weight:bolder;}code,kbd,samp{font-family:monospace,monospace;font-size:1em;}small{font-size:80%;}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline;}sub{bottom:-0.25em;}sup{top:-0.5em;}img{border-style:none;}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible;}button,select{text-transform:none;}button,[type=\"button\"],[type=\"reset\"],[type=\"submit\"]{-webkit-appearance:button;}button::-moz-focus-inner,[type=\"button\"]::-moz-focus-inner,[type=\"reset\"]::-moz-focus-inner,[type=\"submit\"]::-moz-focus-inner{border-style:none;padding:0;}button:-moz-focusring,[type=\"button\"]:-moz-focusring,[type=\"reset\"]:-moz-focusring,[type=\"submit\"]:-moz-focusring{outline:1px dotted ButtonText;}fieldset{padding:0.35em 0.75em 0.625em;}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline;}textarea{overflow:auto;}[type=\"checkbox\"],[type=\"radio\"]{box-sizing:border-box;padding:0;}[type=\"number\"]::-webkit-inner-spin-button,[type=\"number\"]::-webkit-outer-spin-button{height:auto;}[type=\"search\"]{-webkit-appearance:textfield;outline-offset:-2px;}[type=\"search\"]::-webkit-search-decoration{-webkit-appearance:none;}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block;}summary{display:list-item;}template{display:none;}[hidden]{display:none;}"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NormalizeStyle);

/***/ }),

/***/ "./src/components/ui/Layout/styles/ResetStyle.ts":
/*!*******************************************************!*\
  !*** ./src/components/ui/Layout/styles/ResetStyle.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResetStyle": () => (/* binding */ ResetStyle),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");

var ResetStyle = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__.css)(["html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block;}body{line-height:1;}ol,ul{list-style:none;}blockquote,q{quotes:none;}blockquote:before,blockquote:after,q:before,q:after{content:\"\";content:none;}table{border-collapse:collapse;border-spacing:0;}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block;}ol,ul{list-style:none;}blockquote,q{quotes:none;}blockquote::before,blockquote::after,q::before,q::after{content:\"\";content:none;}table{border-collapse:collapse;border-spacing:0;}button{border-style:none;cursor:pointer;&::-moz-focus-inner{border:none;}}"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResetStyle);

/***/ }),

/***/ "./src/components/ui/Subtitle.tsx":
/*!****************************************!*\
  !*** ./src/components/ui/Subtitle.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Subtitle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");


var SubtitleContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].h2.withConfig({
  displayName: "Subtitle__SubtitleContainer"
})(["font-weight:bold;font-size:36px;line-height:36px;"]);
function Subtitle(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SubtitleContainer, null, children);
}

/***/ }),

/***/ "./src/components/ui/Text.tsx":
/*!************************************!*\
  !*** ./src/components/ui/Text.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextLineHeights": () => (/* binding */ TextLineHeights),
/* harmony export */   "TextSizes": () => (/* binding */ TextSizes),
/* harmony export */   "TextWeights": () => (/* binding */ TextWeights),
/* harmony export */   "default": () => (/* binding */ Text)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
var _excluded = ["children"];

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}



var TextSizes = {
  EXTRA_EXTRA_SMALL: "14px",
  EXTRA_SMALL: "17px",
  SMALL: "20px",
  NORMAL: "22px",
  LARGE: "24px",
  EXTRA_LARGE: "27px"
};
var TextLineHeights = {
  EXTRA_EXTRA_SMALL: "17px",
  EXTRA_SMALL: "21px",
  SMALL: "25px",
  NORMAL: "30px",
  LARGE: "32px",
  EXTRA_LARGE: "35px"
};
var TextWeights = {
  LIGHT: "normal",
  NORMAL: "normal",
  BOLD: "bold"
};
var TextContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].p.withConfig({
  displayName: "Text__TextContainer"
})(["", ""], function (props) {
  return (0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(["font-size:", ";line-height:", ";font-weight:", ";"], props.size, props.lineHeight, props.weight);
});
Text.defaultProps = {
  size: TextSizes.NORMAL,
  weight: TextWeights.NORMAL,
  lineHeight: TextLineHeights.NORMAL
};
function Text(_ref) {
  var children = _ref.children,
      otherProps = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(TextContainer, otherProps, children);
}

/***/ }),

/***/ "./src/components/ui/Title.tsx":
/*!*************************************!*\
  !*** ./src/components/ui/Title.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Title)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");


var TitleContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].h2.withConfig({
  displayName: "Title__TitleContainer"
})(["font-weight:bold;font-size:48px;line-height:48px;"]);
function Title(props) {
  var children = props.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(TitleContainer, null, children);
}

/***/ }),

/***/ "./src/components/ui/TopComponent.tsx":
/*!********************************************!*\
  !*** ./src/components/ui/TopComponent.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TopComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");


var RootContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div.withConfig({
  displayName: "TopComponent__RootContainer"
})(["padding:20px;@media (min-width:768px){padding:50px 122px 50px 122px;max-width:1440px;margin:0px;}"]);
function TopComponent(props) {
  var children = props.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RootContainer, null, children);
}

/***/ }),

/***/ "./src/components/ui/index.ts":
/*!************************************!*\
  !*** ./src/components/ui/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnchorButton": () => (/* reexport safe */ _Button__WEBPACK_IMPORTED_MODULE_0__.AnchorButton),
/* harmony export */   "Button": () => (/* reexport safe */ _Button__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Card": () => (/* reexport safe */ _Card__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Head": () => (/* reexport safe */ _Head__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "Icon": () => (/* reexport safe */ _Icon__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "Image": () => (/* reexport safe */ _Image__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "Input": () => (/* reexport safe */ _Input__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "Layout": () => (/* reexport safe */ _Layout__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "Subtitle": () => (/* reexport safe */ _Subtitle__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "Text": () => (/* reexport safe */ _Text__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "Title": () => (/* reexport safe */ _Title__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "TopComponent": () => (/* reexport safe */ _TopComponent__WEBPACK_IMPORTED_MODULE_10__["default"])
/* harmony export */ });
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Button */ "./src/components/ui/Button.tsx");
/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Card */ "./src/components/ui/Card.tsx");
/* harmony import */ var _Head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Head */ "./src/components/ui/Head.tsx");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Icon */ "./src/components/ui/Icon.tsx");
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Image */ "./src/components/ui/Image.tsx");
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Input */ "./src/components/ui/Input.tsx");
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Layout */ "./src/components/ui/Layout/index.tsx");
/* harmony import */ var _Subtitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Subtitle */ "./src/components/ui/Subtitle.tsx");
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Text */ "./src/components/ui/Text.tsx");
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Title */ "./src/components/ui/Title.tsx");
/* harmony import */ var _TopComponent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TopComponent */ "./src/components/ui/TopComponent.tsx");













/***/ }),

/***/ "./src/contracts/FractalRegistry.ts":
/*!******************************************!*\
  !*** ./src/contracts/FractalRegistry.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abi": () => (/* binding */ abi),
/* harmony export */   "address": () => (/* binding */ address),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "fractalRegistry": () => (/* binding */ fractalRegistry)
/* harmony export */ });
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethers */ "./node_modules/@ethersproject/contracts/lib.esm/index.js");

var abi = [{
  inputs: [{
    internalType: "address",
    name: "_root",
    type: "address"
  }],
  stateMutability: "nonpayable",
  type: "constructor"
}, {
  inputs: [{
    internalType: "address",
    name: "addr",
    type: "address"
  }],
  name: "addDelegate",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "addr",
    type: "address"
  }, {
    internalType: "bytes32",
    name: "fractalId",
    type: "bytes32"
  }],
  name: "addUserAddress",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "bytes32",
    name: "userId",
    type: "bytes32"
  }, {
    internalType: "string",
    name: "listId",
    type: "string"
  }],
  name: "addUserToList",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "",
    type: "address"
  }],
  name: "delegates",
  outputs: [{
    internalType: "bool",
    name: "",
    type: "bool"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "addr",
    type: "address"
  }],
  name: "getFractalId",
  outputs: [{
    internalType: "bytes32",
    name: "",
    type: "bytes32"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [{
    internalType: "bytes32",
    name: "userId",
    type: "bytes32"
  }, {
    internalType: "string",
    name: "listId",
    type: "string"
  }],
  name: "isUserInList",
  outputs: [{
    internalType: "bool",
    name: "",
    type: "bool"
  }],
  stateMutability: "view",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "addr",
    type: "address"
  }],
  name: "removeDelegate",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "address",
    name: "addr",
    type: "address"
  }],
  name: "removeUserAddress",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "bytes32",
    name: "userId",
    type: "bytes32"
  }, {
    internalType: "string",
    name: "listId",
    type: "string"
  }],
  name: "removeUserFromList",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}];
var address = "0x4D9DE1bb481B9dA37A7a7E3a07F6f60654fEe7BB";
var fractalRegistry = new ethers__WEBPACK_IMPORTED_MODULE_0__.Contract(address, abi);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fractalRegistry);

/***/ }),

/***/ "./src/contracts/SelfServeRegistryOperator.ts":
/*!****************************************************!*\
  !*** ./src/contracts/SelfServeRegistryOperator.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abi": () => (/* binding */ abi),
/* harmony export */   "address": () => (/* binding */ address),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "selfServeRegistryOperator": () => (/* binding */ selfServeRegistryOperator)
/* harmony export */ });
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethers */ "./node_modules/@ethersproject/contracts/lib.esm/index.js");

var abi = [{
  inputs: [{
    internalType: "address",
    name: "registryAddr",
    type: "address"
  }],
  stateMutability: "nonpayable",
  type: "constructor"
}, {
  inputs: [{
    internalType: "bytes32",
    name: "fractalId",
    type: "bytes32"
  }],
  name: "addSelf",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "string",
    name: "listId",
    type: "string"
  }],
  name: "addSelfToList",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "bytes32",
    name: "fractalId",
    type: "bytes32"
  }, {
    internalType: "string",
    name: "listId",
    type: "string"
  }],
  name: "addSelfToRegistry",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [],
  name: "removeSelf",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "string",
    name: "listId",
    type: "string"
  }],
  name: "removeSelfFromList",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}, {
  inputs: [{
    internalType: "string",
    name: "listId",
    type: "string"
  }],
  name: "removeSelfFromRegistry",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
}];
var address = "0x2e190e260EcCd70f8b73F646F37a72D1271a8854";
var selfServeRegistryOperator = new ethers__WEBPACK_IMPORTED_MODULE_0__.Contract(address, abi);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selfServeRegistryOperator);

/***/ }),

/***/ "./src/hooks/miniBackoffice.ts":
/*!*************************************!*\
  !*** ./src/hooks/miniBackoffice.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KYCList": () => (/* binding */ KYCList),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "useMiniBackoffice": () => (/* binding */ useMiniBackoffice)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ethers_lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ethers/lib/utils */ "./node_modules/ethers/lib/utils.js");
/* harmony import */ var ethers_lib_utils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ethers_lib_utils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/constants */ "./src/lib/constants.ts");
/* harmony import */ var _contracts_FractalRegistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contracts/FractalRegistry */ "./src/contracts/FractalRegistry.ts");
/* harmony import */ var _contracts_SelfServeRegistryOperator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contracts/SelfServeRegistryOperator */ "./src/contracts/SelfServeRegistryOperator.ts");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) {
            if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
          }

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}






var KYCList = "plus";
var ZERO_USER = "0x0000000000000000000000000000000000000000000000000000000000000000";

var present = function present(value) {
  return value !== "loading" && value !== "error" && value !== "go_fetch";
};

var fetchFractalId = function fetchFractalId(signer, account) {
  return _contracts_FractalRegistry__WEBPACK_IMPORTED_MODULE_2__["default"].connect(signer).getFractalId(account);
};

var fetchKycStatus = function fetchKycStatus(signer, fractalId) {
  return _contracts_FractalRegistry__WEBPACK_IMPORTED_MODULE_2__["default"].connect(signer).isUserInList(fractalId, KYCList);
};

var ensure_loaded = function ensure_loaded(value, reporter, fetcher) {
  if (present(value)) return true;

  if (value === "go_fetch") {
    reporter("loading");
    fetcher().then(reporter)["catch"](function () {
      reporter("error");
    });
  }

  return false;
};

var reportTransactionTo = function reportTransactionTo(reporter, promiser) {
  return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var tx;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return promiser();

          case 3:
            tx = _context.sent;
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0); // Typically, the user rejected the transaction. However, let's keep it
            // here to debug other cases.
            // eslint-disable-next-line no-console

            console.error(_context.t0);
            return _context.abrupt("return");

          case 10:
            reporter("loading");
            _context.next = 13;
            return tx.wait();

          case 13:
            reporter("go_fetch");

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));
};

var useMiniBackoffice = function useMiniBackoffice(account, chainId, library) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("go_fetch"),
      _useState2 = _slicedToArray(_useState, 2),
      fractalId = _useState2[0],
      setFractalId = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("go_fetch"),
      _useState4 = _slicedToArray(_useState3, 2),
      kycStatus = _useState4[0],
      setKycStatus = _useState4[1];

  var signer = library === null || library === void 0 ? void 0 : library.getSigner();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setFractalId("go_fetch");
    setKycStatus("go_fetch");
  }, [account]);

  if (!account || !signer || !chainId || chainId !== _lib_constants__WEBPACK_IMPORTED_MODULE_1__.GOERLI_CHAIN_ID) {
    return {
      status: "Unconfigured"
    };
  }

  if (fractalId === "error" || kycStatus === "error") {
    return {
      status: "Error"
    };
  }

  if (!ensure_loaded(fractalId, setFractalId, function () {
    return fetchFractalId(signer, account);
  })) {
    return {
      status: "Loading"
    };
  }

  if (fractalId === ZERO_USER) {
    return {
      status: "UnregisteredUser",
      addUserToRegistry: reportTransactionTo(setFractalId, function () {
        return _contracts_SelfServeRegistryOperator__WEBPACK_IMPORTED_MODULE_3__["default"].connect(signer).addSelfToRegistry((0,ethers_lib_utils__WEBPACK_IMPORTED_MODULE_4__.keccak256)(account), KYCList);
      })
    };
  }

  if (!ensure_loaded(kycStatus, setKycStatus, function () {
    return fetchKycStatus(signer, fractalId);
  })) {
    return {
      status: "Loading"
    };
  }

  return {
    status: "KYCApproved",
    fractalId: fractalId,
    removeUserFromRegistry: reportTransactionTo(setFractalId, function () {
      return _contracts_SelfServeRegistryOperator__WEBPACK_IMPORTED_MODULE_3__["default"].connect(signer).removeSelfFromRegistry(KYCList);
    })
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useMiniBackoffice);

/***/ }),

/***/ "./src/hooks/web3.ts":
/*!***************************!*\
  !*** ./src/hooks/web3.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "useWeb3": () => (/* binding */ useWeb3)
/* harmony export */ });
/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @web3-react/core */ "./node_modules/@web3-react/core/dist/core.esm.js");

var useWeb3 = function useWeb3() {
  return (0,_web3_react_core__WEBPACK_IMPORTED_MODULE_0__.useWeb3React)();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useWeb3);

/***/ }),

/***/ "./src/lib/config.ts":
/*!***************************!*\
  !*** ./src/lib/config.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOCS_URL": () => (/* binding */ DOCS_URL)
/* harmony export */ });
var DOCS_URL = "https://docs.developer.fractal.id/fractal-did-registry";

/***/ }),

/***/ "./src/lib/constants.ts":
/*!******************************!*\
  !*** ./src/lib/constants.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GOERLI_CHAIN_ID": () => (/* binding */ GOERLI_CHAIN_ID)
/* harmony export */ });
var GOERLI_CHAIN_ID = 5;

/***/ }),

/***/ "./src/lib/types.ts":
/*!**************************!*\
  !*** ./src/lib/types.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unreachable": () => (/* binding */ unreachable)
/* harmony export */ });
var unreachable = function unreachable(obj) {
  throw Error("Reached unreachable: ".concat(JSON.stringify(obj)));
};

/***/ }),

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/ui */ "./src/components/ui/index.ts");
/* harmony import */ var _components_ActionPage_About__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ActionPage/About */ "./src/components/ActionPage/About.tsx");
/* harmony import */ var _components_ActionPage_CallToAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ActionPage/CallToAction */ "./src/components/ActionPage/CallToAction.tsx");
/* harmony import */ var _components_ActionPage_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ActionPage/Footer */ "./src/components/ActionPage/Footer.tsx");
/* harmony import */ var _components_ActionPage_Hero__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ActionPage/Hero */ "./src/components/ActionPage/Hero.tsx");
/* harmony import */ var _components_ActionPage_Header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/ActionPage/Header */ "./src/components/ActionPage/Header.tsx");
/* harmony import */ var _components_ActionPage_News__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ActionPage/News */ "./src/components/ActionPage/News.tsx");
/* harmony import */ var _components_ActionPage_Socials__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/ActionPage/Socials */ "./src/components/ActionPage/Socials.tsx");










var HeroContainer = styled_components__WEBPACK_IMPORTED_MODULE_9__["default"].section.withConfig({
  displayName: "pages__HeroContainer"
})(["background:linear-gradient( 0deg,rgba(209,151,255,0.13),rgba(209,151,255,0.13) );@media (min-width:768px){border-radius:0% 100% 100% 0% / 100% 0% 100% 0%;}"]);

var IndexPage = function IndexPage() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ui__WEBPACK_IMPORTED_MODULE_1__.Layout, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HeroContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ActionPage_Header__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ActionPage_Hero__WEBPACK_IMPORTED_MODULE_5__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ActionPage_About__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ActionPage_Socials__WEBPACK_IMPORTED_MODULE_8__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ActionPage_News__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ActionPage_CallToAction__WEBPACK_IMPORTED_MODULE_3__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ActionPage_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], null));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IndexPage);

/***/ }),

/***/ "./node_modules/scrypt-js/scrypt.js":
/*!******************************************!*\
  !*** ./node_modules/scrypt-js/scrypt.js ***!
  \******************************************/
/***/ (function(module) {

"use strict";


(function(root) {
    const MAX_VALUE = 0x7fffffff;

    // The SHA256 and PBKDF2 implementation are from scrypt-async-js:
    // See: https://github.com/dchest/scrypt-async-js
    function SHA256(m) {
        const K = new Uint32Array([
           0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
           0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
           0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
           0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
           0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
           0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
           0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
           0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
           0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
           0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
           0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
           0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
           0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
       ]);

        let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
        let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
        const w = new Uint32Array(64);

        function blocks(p) {
            let off = 0, len = p.length;
            while (len >= 64) {
                let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7, u, i, j, t1, t2;

                for (i = 0; i < 16; i++) {
                    j = off + i*4;
                    w[i] = ((p[j] & 0xff)<<24) | ((p[j+1] & 0xff)<<16) |
                    ((p[j+2] & 0xff)<<8) | (p[j+3] & 0xff);
                }

                for (i = 16; i < 64; i++) {
                    u = w[i-2];
                    t1 = ((u>>>17) | (u<<(32-17))) ^ ((u>>>19) | (u<<(32-19))) ^ (u>>>10);

                    u = w[i-15];
                    t2 = ((u>>>7) | (u<<(32-7))) ^ ((u>>>18) | (u<<(32-18))) ^ (u>>>3);

                    w[i] = (((t1 + w[i-7]) | 0) + ((t2 + w[i-16]) | 0)) | 0;
                }

                for (i = 0; i < 64; i++) {
                    t1 = ((((((e>>>6) | (e<<(32-6))) ^ ((e>>>11) | (e<<(32-11))) ^
                             ((e>>>25) | (e<<(32-25)))) + ((e & f) ^ (~e & g))) | 0) +
                          ((h + ((K[i] + w[i]) | 0)) | 0)) | 0;

                    t2 = ((((a>>>2) | (a<<(32-2))) ^ ((a>>>13) | (a<<(32-13))) ^
                           ((a>>>22) | (a<<(32-22)))) + ((a & b) ^ (a & c) ^ (b & c))) | 0;

                    h = g;
                    g = f;
                    f = e;
                    e = (d + t1) | 0;
                    d = c;
                    c = b;
                    b = a;
                    a = (t1 + t2) | 0;
                }

                h0 = (h0 + a) | 0;
                h1 = (h1 + b) | 0;
                h2 = (h2 + c) | 0;
                h3 = (h3 + d) | 0;
                h4 = (h4 + e) | 0;
                h5 = (h5 + f) | 0;
                h6 = (h6 + g) | 0;
                h7 = (h7 + h) | 0;

                off += 64;
                len -= 64;
            }
        }

        blocks(m);

        let i, bytesLeft = m.length % 64,
        bitLenHi = (m.length / 0x20000000) | 0,
        bitLenLo = m.length << 3,
        numZeros = (bytesLeft < 56) ? 56 : 120,
        p = m.slice(m.length - bytesLeft, m.length);

        p.push(0x80);
        for (i = bytesLeft + 1; i < numZeros; i++) { p.push(0); }
        p.push((bitLenHi >>> 24) & 0xff);
        p.push((bitLenHi >>> 16) & 0xff);
        p.push((bitLenHi >>> 8)  & 0xff);
        p.push((bitLenHi >>> 0)  & 0xff);
        p.push((bitLenLo >>> 24) & 0xff);
        p.push((bitLenLo >>> 16) & 0xff);
        p.push((bitLenLo >>> 8)  & 0xff);
        p.push((bitLenLo >>> 0)  & 0xff);

        blocks(p);

        return [
            (h0 >>> 24) & 0xff, (h0 >>> 16) & 0xff, (h0 >>> 8) & 0xff, (h0 >>> 0) & 0xff,
            (h1 >>> 24) & 0xff, (h1 >>> 16) & 0xff, (h1 >>> 8) & 0xff, (h1 >>> 0) & 0xff,
            (h2 >>> 24) & 0xff, (h2 >>> 16) & 0xff, (h2 >>> 8) & 0xff, (h2 >>> 0) & 0xff,
            (h3 >>> 24) & 0xff, (h3 >>> 16) & 0xff, (h3 >>> 8) & 0xff, (h3 >>> 0) & 0xff,
            (h4 >>> 24) & 0xff, (h4 >>> 16) & 0xff, (h4 >>> 8) & 0xff, (h4 >>> 0) & 0xff,
            (h5 >>> 24) & 0xff, (h5 >>> 16) & 0xff, (h5 >>> 8) & 0xff, (h5 >>> 0) & 0xff,
            (h6 >>> 24) & 0xff, (h6 >>> 16) & 0xff, (h6 >>> 8) & 0xff, (h6 >>> 0) & 0xff,
            (h7 >>> 24) & 0xff, (h7 >>> 16) & 0xff, (h7 >>> 8) & 0xff, (h7 >>> 0) & 0xff
        ];
    }

    function PBKDF2_HMAC_SHA256_OneIter(password, salt, dkLen) {
        // compress password if it's longer than hash block length
        password = (password.length <= 64) ? password : SHA256(password);

        const innerLen = 64 + salt.length + 4;
        const inner = new Array(innerLen);
        const outerKey = new Array(64);

        let i;
        let dk = [];

        // inner = (password ^ ipad) || salt || counter
        for (i = 0; i < 64; i++) { inner[i] = 0x36; }
        for (i = 0; i < password.length; i++) { inner[i] ^= password[i]; }
        for (i = 0; i < salt.length; i++) { inner[64 + i] = salt[i]; }
        for (i = innerLen - 4; i < innerLen; i++) { inner[i] = 0; }

        // outerKey = password ^ opad
        for (i = 0; i < 64; i++) outerKey[i] = 0x5c;
        for (i = 0; i < password.length; i++) outerKey[i] ^= password[i];

        // increments counter inside inner
        function incrementCounter() {
            for (let i = innerLen - 1; i >= innerLen - 4; i--) {
                inner[i]++;
                if (inner[i] <= 0xff) return;
                inner[i] = 0;
            }
        }

        // output blocks = SHA256(outerKey || SHA256(inner)) ...
        while (dkLen >= 32) {
            incrementCounter();
            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))));
            dkLen -= 32;
        }
        if (dkLen > 0) {
            incrementCounter();
            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))).slice(0, dkLen));
        }

        return dk;
    }

    // The following is an adaptation of scryptsy
    // See: https://www.npmjs.com/package/scryptsy
    function blockmix_salsa8(BY, Yi, r, x, _X) {
        let i;

        arraycopy(BY, (2 * r - 1) * 16, _X, 0, 16);
        for (i = 0; i < 2 * r; i++) {
            blockxor(BY, i * 16, _X, 16);
            salsa20_8(_X, x);
            arraycopy(_X, 0, BY, Yi + (i * 16), 16);
        }

        for (i = 0; i < r; i++) {
            arraycopy(BY, Yi + (i * 2) * 16, BY, (i * 16), 16);
        }

        for (i = 0; i < r; i++) {
            arraycopy(BY, Yi + (i * 2 + 1) * 16, BY, (i + r) * 16, 16);
        }
    }

    function R(a, b) {
        return (a << b) | (a >>> (32 - b));
    }

    function salsa20_8(B, x) {
        arraycopy(B, 0, x, 0, 16);

        for (let i = 8; i > 0; i -= 2) {
            x[ 4] ^= R(x[ 0] + x[12], 7);
            x[ 8] ^= R(x[ 4] + x[ 0], 9);
            x[12] ^= R(x[ 8] + x[ 4], 13);
            x[ 0] ^= R(x[12] + x[ 8], 18);
            x[ 9] ^= R(x[ 5] + x[ 1], 7);
            x[13] ^= R(x[ 9] + x[ 5], 9);
            x[ 1] ^= R(x[13] + x[ 9], 13);
            x[ 5] ^= R(x[ 1] + x[13], 18);
            x[14] ^= R(x[10] + x[ 6], 7);
            x[ 2] ^= R(x[14] + x[10], 9);
            x[ 6] ^= R(x[ 2] + x[14], 13);
            x[10] ^= R(x[ 6] + x[ 2], 18);
            x[ 3] ^= R(x[15] + x[11], 7);
            x[ 7] ^= R(x[ 3] + x[15], 9);
            x[11] ^= R(x[ 7] + x[ 3], 13);
            x[15] ^= R(x[11] + x[ 7], 18);
            x[ 1] ^= R(x[ 0] + x[ 3], 7);
            x[ 2] ^= R(x[ 1] + x[ 0], 9);
            x[ 3] ^= R(x[ 2] + x[ 1], 13);
            x[ 0] ^= R(x[ 3] + x[ 2], 18);
            x[ 6] ^= R(x[ 5] + x[ 4], 7);
            x[ 7] ^= R(x[ 6] + x[ 5], 9);
            x[ 4] ^= R(x[ 7] + x[ 6], 13);
            x[ 5] ^= R(x[ 4] + x[ 7], 18);
            x[11] ^= R(x[10] + x[ 9], 7);
            x[ 8] ^= R(x[11] + x[10], 9);
            x[ 9] ^= R(x[ 8] + x[11], 13);
            x[10] ^= R(x[ 9] + x[ 8], 18);
            x[12] ^= R(x[15] + x[14], 7);
            x[13] ^= R(x[12] + x[15], 9);
            x[14] ^= R(x[13] + x[12], 13);
            x[15] ^= R(x[14] + x[13], 18);
        }

        for (let i = 0; i < 16; ++i) {
            B[i] += x[i];
        }
    }

    // naive approach... going back to loop unrolling may yield additional performance
    function blockxor(S, Si, D, len) {
        for (let i = 0; i < len; i++) {
            D[i] ^= S[Si + i]
        }
    }

    function arraycopy(src, srcPos, dest, destPos, length) {
        while (length--) {
            dest[destPos++] = src[srcPos++];
        }
    }

    function checkBufferish(o) {
        if (!o || typeof(o.length) !== 'number') { return false; }

        for (let i = 0; i < o.length; i++) {
            const v = o[i];
            if (typeof(v) !== 'number' || v % 1 || v < 0 || v >= 256) {
                return false;
            }
        }

        return true;
    }

    function ensureInteger(value, name) {
        if (typeof(value) !== "number" || (value % 1)) { throw new Error('invalid ' + name); }
        return value;
    }

    // N = Cpu cost, r = Memory cost, p = parallelization cost
    // callback(error, progress, key)
    function _scrypt(password, salt, N, r, p, dkLen, callback) {

        N = ensureInteger(N, 'N');
        r = ensureInteger(r, 'r');
        p = ensureInteger(p, 'p');

        dkLen = ensureInteger(dkLen, 'dkLen');

        if (N === 0 || (N & (N - 1)) !== 0) { throw new Error('N must be power of 2'); }

        if (N > MAX_VALUE / 128 / r) { throw new Error('N too large'); }
        if (r > MAX_VALUE / 128 / p) { throw new Error('r too large'); }

        if (!checkBufferish(password)) {
            throw new Error('password must be an array or buffer');
        }
        password = Array.prototype.slice.call(password);

        if (!checkBufferish(salt)) {
            throw new Error('salt must be an array or buffer');
        }
        salt = Array.prototype.slice.call(salt);

        let b = PBKDF2_HMAC_SHA256_OneIter(password, salt, p * 128 * r);
        const B = new Uint32Array(p * 32 * r)
        for (let i = 0; i < B.length; i++) {
            const j = i * 4;
            B[i] = ((b[j + 3] & 0xff) << 24) |
                   ((b[j + 2] & 0xff) << 16) |
                   ((b[j + 1] & 0xff) << 8) |
                   ((b[j + 0] & 0xff) << 0);
        }

        const XY = new Uint32Array(64 * r);
        const V = new Uint32Array(32 * r * N);

        const Yi = 32 * r;

        // scratch space
        const x = new Uint32Array(16);       // salsa20_8
        const _X = new Uint32Array(16);      // blockmix_salsa8

        const totalOps = p * N * 2;
        let currentOp = 0;
        let lastPercent10 = null;

        // Set this to true to abandon the scrypt on the next step
        let stop = false;

        // State information
        let state = 0;
        let i0 = 0, i1;
        let Bi;

        // How many blockmix_salsa8 can we do per step?
        const limit = callback ? parseInt(1000 / r): 0xffffffff;

        // Trick from scrypt-async; if there is a setImmediate shim in place, use it
        const nextTick = (typeof(setImmediate) !== 'undefined') ? setImmediate : setTimeout;

        // This is really all I changed; making scryptsy a state machine so we occasionally
        // stop and give other evnts on the evnt loop a chance to run. ~RicMoo
        const incrementalSMix = function() {
            if (stop) {
                return callback(new Error('cancelled'), currentOp / totalOps);
            }

            let steps;

            switch (state) {
                case 0:
                    // for (var i = 0; i < p; i++)...
                    Bi = i0 * 32 * r;

                    arraycopy(B, Bi, XY, 0, Yi);                       // ROMix - 1

                    state = 1;                                         // Move to ROMix 2
                    i1 = 0;

                    // Fall through

                case 1:

                    // Run up to 1000 steps of the first inner smix loop
                    steps = N - i1;
                    if (steps > limit) { steps = limit; }
                    for (let i = 0; i < steps; i++) {                  // ROMix - 2
                        arraycopy(XY, 0, V, (i1 + i) * Yi, Yi)         // ROMix - 3
                        blockmix_salsa8(XY, Yi, r, x, _X);             // ROMix - 4
                    }

                    // for (var i = 0; i < N; i++)
                    i1 += steps;
                    currentOp += steps;

                    if (callback) {
                        // Call the callback with the progress (optionally stopping us)
                        const percent10 = parseInt(1000 * currentOp / totalOps);
                        if (percent10 !== lastPercent10) {
                            stop = callback(null, currentOp / totalOps);
                            if (stop) { break; }
                            lastPercent10 = percent10;
                        }
                    }

                    if (i1 < N) { break; }

                    i1 = 0;                                          // Move to ROMix 6
                    state = 2;

                    // Fall through

                case 2:

                    // Run up to 1000 steps of the second inner smix loop
                    steps = N - i1;
                    if (steps > limit) { steps = limit; }
                    for (let i = 0; i < steps; i++) {                // ROMix - 6
                        const offset = (2 * r - 1) * 16;             // ROMix - 7
                        const j = XY[offset] & (N - 1);
                        blockxor(V, j * Yi, XY, Yi);                 // ROMix - 8 (inner)
                        blockmix_salsa8(XY, Yi, r, x, _X);           // ROMix - 9 (outer)
                    }

                    // for (var i = 0; i < N; i++)...
                    i1 += steps;
                    currentOp += steps;

                    // Call the callback with the progress (optionally stopping us)
                    if (callback) {
                        const percent10 = parseInt(1000 * currentOp / totalOps);
                        if (percent10 !== lastPercent10) {
                            stop = callback(null, currentOp / totalOps);
                            if (stop) { break; }
                            lastPercent10 = percent10;
                        }
                    }

                    if (i1 < N) { break; }

                    arraycopy(XY, 0, B, Bi, Yi);                     // ROMix - 10

                    // for (var i = 0; i < p; i++)...
                    i0++;
                    if (i0 < p) {
                        state = 0;
                        break;
                    }

                    b = [];
                    for (let i = 0; i < B.length; i++) {
                        b.push((B[i] >>  0) & 0xff);
                        b.push((B[i] >>  8) & 0xff);
                        b.push((B[i] >> 16) & 0xff);
                        b.push((B[i] >> 24) & 0xff);
                    }

                    const derivedKey = PBKDF2_HMAC_SHA256_OneIter(password, b, dkLen);

                    // Send the result to the callback
                    if (callback) { callback(null, 1.0, derivedKey); }

                    // Done; don't break (which would reschedule)
                    return derivedKey;
            }

            // Schedule the next steps
            if (callback) { nextTick(incrementalSMix); }
        }

        // Run the smix state machine until completion
        if (!callback) {
            while (true) {
                const derivedKey = incrementalSMix();
                if (derivedKey != undefined) { return derivedKey; }
            }
        }

        // Bootstrap the async incremental smix
        incrementalSMix();
    }

    const lib = {
        scrypt: function(password, salt, N, r, p, dkLen, progressCallback) {
            return new Promise(function(resolve, reject) {
                let lastProgress = 0;
                if (progressCallback) { progressCallback(0); }
                _scrypt(password, salt, N, r, p, dkLen, function(error, progress, key) {
                    if (error) {
                        reject(error);
                    } else if (key) {
                        if (progressCallback && lastProgress !== 1) {
                            progressCallback(1);
                        }
                        resolve(new Uint8Array(key));
                    } else if (progressCallback && progress !== lastProgress) {
                        lastProgress = progress;
                        return progressCallback(progress);
                    }
                });
            });
        },
        syncScrypt: function(password, salt, N, r, p, dkLen) {
            return new Uint8Array(_scrypt(password, salt, N, r, p, dkLen));
        }
    };

    // node.js
    if (true) {
       module.exports = lib;

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    } else {}

})(this);


/***/ }),

/***/ "./src/assets/icons/arrow-down.svg":
/*!*****************************************!*\
  !*** ./src/assets/icons/arrow-down.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(/*! react */ "react");

function ArrowDown (props) {
    return React.createElement("svg",props,[React.createElement("path",{"d":"M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z","key":0}),React.createElement("path",{"d":"M12 12.586 8.707 9.293l-1.414 1.414L12 15.414l4.707-4.707-1.414-1.414L12 12.586z","key":1})]);
}

ArrowDown.defaultProps = {"width":"24","height":"24"};

module.exports = ArrowDown;

ArrowDown.default = ArrowDown;


/***/ }),

/***/ "./src/assets/icons/arrow-right.svg":
/*!******************************************!*\
  !*** ./src/assets/icons/arrow-right.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(/*! react */ "react");

function ArrowRight (props) {
    return React.createElement("svg",props,[React.createElement("path",{"d":"M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z","key":0}),React.createElement("path",{"d":"M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z","key":1})]);
}

ArrowRight.defaultProps = {"width":"24","height":"24"};

module.exports = ArrowRight;

ArrowRight.default = ArrowRight;


/***/ }),

/***/ "./src/assets/icons/discord.svg":
/*!**************************************!*\
  !*** ./src/assets/icons/discord.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(/*! react */ "react");

function Discord (props) {
    return React.createElement("svg",props,React.createElement("path",{"d":"M24.9573 2.28657C22.4525 0.598299 18.4918 0.312298 18.3244 0.300165C18.0598 0.281098 17.8087 0.406765 17.7002 0.609565C17.6961 0.616499 17.475 1.1547 17.2611 1.67383C20.172 2.1011 22.1498 3.04923 22.2552 3.10123C22.7491 3.34217 22.9144 3.87343 22.6261 4.28683C22.435 4.56243 22.0888 4.7167 21.7333 4.7167C21.5566 4.7167 21.3789 4.67943 21.2156 4.5997C21.1867 4.58497 18.2851 3.20003 14.5021 3.20003C10.718 3.20003 7.81536 4.58583 7.78642 4.5997C7.29352 4.83977 6.66112 4.6985 6.37489 4.28423C6.08866 3.8717 6.25502 3.34217 6.74689 3.10123C6.85229 3.04923 8.83732 2.09763 11.7565 1.67123C11.5312 1.14603 11.3039 0.616499 11.2998 0.609565C11.1913 0.405899 10.9402 0.277632 10.6756 0.300165C10.5082 0.311432 6.54746 0.597432 4.00959 2.3091C2.68279 3.33697 0.0333252 9.34643 0.0333252 14.5421C0.0333252 14.634 0.0612252 14.7232 0.115992 14.803C1.94603 17.4983 6.93496 18.2038 8.07162 18.2341C8.07886 18.235 8.08506 18.235 8.09126 18.235C8.29172 18.235 8.48082 18.1544 8.59966 18.0183L9.82932 16.6212C7.13232 16.0761 5.70632 15.219 5.62056 15.1661C5.16176 14.8827 5.06256 14.3402 5.40046 13.9545C5.73732 13.5706 6.38212 13.4856 6.84092 13.7673C6.87916 13.7881 9.51106 15.3334 14.5 15.3334C19.5086 15.3334 22.1332 13.782 22.1591 13.7664C22.6179 13.4874 23.2647 13.5714 23.6006 13.958C23.9354 14.3428 23.8382 14.8818 23.3815 15.1644C23.2957 15.2172 21.877 16.0726 19.1862 16.6178L20.4003 18.0174C20.5192 18.1544 20.7083 18.2341 20.9087 18.2341C20.916 18.2341 20.9222 18.2341 20.9284 18.2332C22.0661 18.2029 27.055 17.4974 28.884 14.8021C28.9388 14.7224 28.9667 14.6331 28.9667 14.5412C28.9667 9.34643 26.3172 3.33697 24.9573 2.28657ZM10.3667 12.7334C9.22482 12.7334 8.29999 11.7636 8.29999 10.5667C8.29999 9.36983 9.22482 8.40003 10.3667 8.40003C11.5085 8.40003 12.4333 9.36983 12.4333 10.5667C12.4333 11.7636 11.5085 12.7334 10.3667 12.7334ZM18.6333 12.7334C17.4915 12.7334 16.5667 11.7636 16.5667 10.5667C16.5667 9.36983 17.4915 8.40003 18.6333 8.40003C19.7752 8.40003 20.7 9.36983 20.7 10.5667C20.7 11.7636 19.7752 12.7334 18.6333 12.7334Z","fill":"white"}));
}

Discord.defaultProps = {"width":"29","height":"19","viewBox":"0 0 29 19","fill":"none"};

module.exports = Discord;

Discord.default = Discord;


/***/ }),

/***/ "./src/assets/icons/reddit.svg":
/*!*************************************!*\
  !*** ./src/assets/icons/reddit.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(/*! react */ "react");

function Reddit (props) {
    return React.createElement("svg",props,React.createElement("path",{"d":"M17.6601 0C15.563 0 13.998 1.48472 13.998 3.17383V6.09714C11.2477 6.22361 8.7325 6.85911 6.72458 7.85586C5.9508 7.21188 4.9147 6.92592 3.91012 6.92656C2.82093 6.92726 1.70747 7.25436 0.939419 8.00312L0.921841 8.02005L0.904263 8.03698C0.167492 8.835 -0.124243 9.90405 0.0722316 10.9654C0.251663 11.9346 0.899384 12.9076 2.02536 13.5451C2.01798 13.6526 1.99801 13.758 1.99801 13.8667C1.99801 18.1671 7.83001 21.6667 14.998 21.6667C22.166 21.6667 27.998 18.1671 27.998 13.8667C27.998 13.758 27.978 13.6526 27.9707 13.5451C29.0966 12.9076 29.7444 11.9346 29.9238 10.9654C30.1203 9.90405 29.8285 8.835 29.0918 8.03698L29.0742 8.02005L29.0566 8.00312C28.2885 7.25425 27.1752 6.92726 26.0859 6.92656C25.0812 6.92592 24.045 7.21165 23.2714 7.85586C21.2635 6.85911 18.7483 6.22361 15.998 6.09714V3.17383C15.998 2.32534 16.5632 1.73333 17.6601 1.73333C18.1808 1.73333 18.8151 1.95945 19.8086 2.26146C20.6484 2.51676 21.7413 2.77481 23.1386 2.85221C23.4729 3.70854 24.4008 4.33333 25.498 4.33333C26.873 4.33333 27.998 3.35833 27.998 2.16667C27.998 0.975 26.873 0 25.498 0C24.5592 0 23.7456 0.459698 23.3183 1.12734C22.1238 1.07001 21.2463 0.86208 20.4707 0.626302C19.5669 0.351544 18.7364 0 17.6601 0ZM3.91012 8.6599C4.30526 8.65964 4.68068 8.74951 4.9902 8.89518C3.88621 9.69381 3.04858 10.6269 2.54293 11.6458C2.27445 11.3586 2.11266 11.0361 2.04879 10.6911C1.94103 10.109 2.14203 9.50391 2.4609 9.1457C2.76223 8.86461 3.31247 8.66028 3.91012 8.6599ZM26.0839 8.6599C26.6818 8.66028 27.2339 8.86469 27.5351 9.1457C27.854 9.50391 28.055 10.109 27.9472 10.6911C27.8834 11.0361 27.7216 11.3586 27.4531 11.6458C26.9474 10.6269 26.1098 9.69381 25.0058 8.89518C25.3146 8.74969 25.689 8.65964 26.0839 8.6599ZM9.99801 10.4C11.103 10.4 11.998 11.1757 11.998 12.1333C11.998 13.091 11.103 13.8667 9.99801 13.8667C8.89301 13.8667 7.99801 13.091 7.99801 12.1333C7.99801 11.1757 8.89301 10.4 9.99801 10.4ZM19.998 10.4C21.103 10.4 21.998 11.1757 21.998 12.1333C21.998 13.091 21.103 13.8667 19.998 13.8667C18.893 13.8667 17.998 13.091 17.998 12.1333C17.998 11.1757 18.893 10.4 19.998 10.4ZM20.2363 15.1954C19.5973 16.8135 17.554 18.2 14.998 18.2C12.442 18.2 10.3987 16.8142 9.75973 15.3122C10.9097 16.1208 12.826 16.6986 14.998 16.6986C17.17 16.6986 19.0863 16.1202 20.2363 15.1954Z","fill":"white"}));
}

Reddit.defaultProps = {"width":"30","height":"22","viewBox":"0 0 30 22","fill":"none"};

module.exports = Reddit;

Reddit.default = Reddit;


/***/ }),

/***/ "./src/assets/icons/telegram.svg":
/*!***************************************!*\
  !*** ./src/assets/icons/telegram.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(/*! react */ "react");

function Telegram (props) {
    return React.createElement("svg",props,React.createElement("path",{"d":"M20.8894 0.944006C20.5155 0.908756 20.1091 0.960662 19.7007 1.10416C19.1944 1.28116 11.2618 4.24732 3.86719 7.01432L1.42383 7.92838C0.477703 8.26938 0 8.82396 0 9.57096C0 10.094 0.249012 10.8033 1.43701 11.2213L5.56128 12.6901C5.9179 13.6411 6.74622 15.8492 6.95435 16.4362C7.0781 16.7842 7.39067 17.6609 8.18042 17.8659C8.34242 17.9149 8.51147 17.9401 8.68359 17.9401C9.18197 17.9401 9.54081 17.7339 9.71631 17.6139L12.3376 15.6432L15.5215 18.2604C15.6441 18.3714 16.2932 18.9323 17.165 18.9323C18.2529 18.9323 19.0781 18.1273 19.2502 17.3483C19.3436 16.9213 22.4143 3.21935 22.4143 3.22135C22.6899 2.12235 22.1944 1.55224 21.876 1.30924C21.6032 1.10174 21.2633 0.979256 20.8894 0.944006ZM20.1445 3.10416C19.7204 4.99416 17.4084 15.3105 17.0574 16.7975L12.4036 12.9713L9.24609 15.3483L10.1206 12.3073C10.1206 12.3073 16.1535 6.87915 16.5168 6.56315C16.8093 6.31015 16.8706 6.22146 16.8706 6.13346C16.8706 6.01646 16.8029 5.93229 16.6465 5.93229C16.5059 5.93229 16.3149 6.05207 16.2136 6.10807C14.9274 6.82088 9.45021 9.59453 6.75439 10.9577L2.84326 9.56901L4.7417 8.86002C9.57807 7.05002 18.1915 3.82616 20.1445 3.10416Z","fill":"white"}));
}

Telegram.defaultProps = {"width":"23","height":"19","viewBox":"0 0 23 19","fill":"none"};

module.exports = Telegram;

Telegram.default = Telegram;


/***/ }),

/***/ "./src/assets/icons/twitter.svg":
/*!**************************************!*\
  !*** ./src/assets/icons/twitter.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(/*! react */ "react");

function Twitter (props) {
    return React.createElement("svg",props,React.createElement("path",{"d":"M27.0325 3.06793C26.0717 3.44527 25.0419 3.69863 23.9592 3.81363C25.0642 3.22785 25.9133 2.30066 26.3114 1.19738C25.2795 1.73824 24.1319 2.13176 22.9152 2.34379C21.9402 1.42379 20.5508 0.850586 19.0131 0.850586C16.0597 0.850586 13.6649 2.9673 13.6649 5.57996C13.6649 5.95012 13.7136 6.31129 13.805 6.65809C9.36064 6.46043 5.42204 4.5773 2.78345 1.71488C2.32236 2.41566 2.06032 3.22785 2.06032 4.09395C2.06032 5.73449 3.00282 7.18277 4.43892 8.03269C3.56142 8.00754 2.73673 7.79371 2.01564 7.43973C2.01564 7.45949 2.01564 7.47926 2.01564 7.49902C2.01564 9.79184 3.86001 11.7019 6.30361 12.1386C5.85673 12.2464 5.38345 12.3039 4.89595 12.3039C4.55064 12.3039 4.21548 12.2751 3.88845 12.2176C4.57095 14.0954 6.54532 15.4664 8.88329 15.5041C7.05517 16.7727 4.7497 17.5274 2.24314 17.5274C1.81048 17.5274 1.38595 17.5058 0.969543 17.4609C3.33392 18.805 6.14517 19.5866 9.16564 19.5866C19.0009 19.5866 24.3797 12.3793 24.3797 6.1298C24.3797 5.92496 24.3736 5.71832 24.3655 5.51707C25.4095 4.85043 26.3155 4.01668 27.0325 3.06793Z","fill":"white"}));
}

Twitter.defaultProps = {"width":"28","height":"20","viewBox":"0 0 28 20","fill":"none"};

module.exports = Twitter;

Twitter.default = Twitter;


/***/ }),

/***/ "./src/assets/images/hero_dots.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/hero_dots.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var React = __webpack_require__(/*! react */ "react");

function HeroDots (props) {
    return React.createElement("svg",props,[React.createElement("circle",{"cx":"709.5","cy":"456.5","r":"24.5","fill":"#D197FF","fillOpacity":"0.5","key":0}),React.createElement("circle",{"cx":"476.5","cy":"490.5","r":"24.5","fill":"#D197FF","fillOpacity":"0.6","key":1}),React.createElement("circle",{"cx":"936","cy":"566","r":"51","fill":"#D197FF","fillOpacity":"0.4","key":2}),React.createElement("circle",{"cx":"1090.5","cy":"1149.5","r":"24.5","fill":"#D197FF","fillOpacity":"0.3","key":3}),React.createElement("circle",{"cx":"712.5","cy":"1185.5","r":"40.5","fill":"#D197FF","fillOpacity":"0.3","key":4}),React.createElement("circle",{"cx":"1242.5","cy":"1023.5","r":"14.5","fill":"#D197FF","fillOpacity":"0.5","key":5}),React.createElement("circle",{"cx":"548.5","cy":"957.5","r":"26.5","fill":"#D197FF","fillOpacity":"0.3","key":6}),React.createElement("circle",{"cx":"819","cy":"313","r":"44","fill":"#D197FF","fillOpacity":"0.2","key":7}),React.createElement("circle",{"cx":"1076","cy":"392","r":"89","fill":"#D197FF","fillOpacity":"0.4","key":8})]);
}

HeroDots.defaultProps = {"width":"1600","height":"1226","viewBox":"0 0 1600 1226","fill":"none"};

module.exports = HeroDots;

HeroDots.default = HeroDots;


/***/ }),

/***/ "./src/components/ui/Layout/fonts/NexaBold.otf":
/*!*****************************************************!*\
  !*** ./src/components/ui/Layout/fonts/NexaBold.otf ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "static/NexaBold-c2b99812f7617bd31a220050147e457d.otf");

/***/ }),

/***/ "./src/components/ui/Layout/fonts/NexaLight.otf":
/*!******************************************************!*\
  !*** ./src/components/ui/Layout/fonts/NexaLight.otf ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "static/NexaLight-2bac835e8aabddeb710cb1bf9b39c0ed.otf");

/***/ }),

/***/ "./public/page-data/sq/d/2187342950.json":
/*!***********************************************!*\
  !*** ./public/page-data/sq/d/2187342950.json ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"data":{"blockchain_industry":{"childImageSharp":{"gatsbyImageData":{"layout":"constrained","backgroundColor":"#082858","images":{"fallback":{"src":"/static/ae9bd29df3f7474a44bce118e0ce4dbc/20850/blockchain_industry.png","srcSet":"/static/ae9bd29df3f7474a44bce118e0ce4dbc/994f0/blockchain_industry.png 100w,\\n/static/ae9bd29df3f7474a44bce118e0ce4dbc/4bbad/blockchain_industry.png 200w,\\n/static/ae9bd29df3f7474a44bce118e0ce4dbc/20850/blockchain_industry.png 400w","sizes":"(min-width: 400px) 400px, 100vw"},"sources":[{"srcSet":"/static/ae9bd29df3f7474a44bce118e0ce4dbc/90ebf/blockchain_industry.webp 100w,\\n/static/ae9bd29df3f7474a44bce118e0ce4dbc/59b5d/blockchain_industry.webp 200w,\\n/static/ae9bd29df3f7474a44bce118e0ce4dbc/697e6/blockchain_industry.webp 400w","type":"image/webp","sizes":"(min-width: 400px) 400px, 100vw"}]},"width":400,"height":250}}},"crypto_today":{"childImageSharp":{"gatsbyImageData":{"layout":"constrained","backgroundColor":"#180808","images":{"fallback":{"src":"/static/3c007ab8aa5db48358b517275e01553d/20850/crypto_today.png","srcSet":"/static/3c007ab8aa5db48358b517275e01553d/994f0/crypto_today.png 100w,\\n/static/3c007ab8aa5db48358b517275e01553d/4bbad/crypto_today.png 200w,\\n/static/3c007ab8aa5db48358b517275e01553d/20850/crypto_today.png 400w","sizes":"(min-width: 400px) 400px, 100vw"},"sources":[{"srcSet":"/static/3c007ab8aa5db48358b517275e01553d/90ebf/crypto_today.webp 100w,\\n/static/3c007ab8aa5db48358b517275e01553d/59b5d/crypto_today.webp 200w,\\n/static/3c007ab8aa5db48358b517275e01553d/697e6/crypto_today.webp 400w","type":"image/webp","sizes":"(min-width: 400px) 400px, 100vw"}]},"width":400,"height":250}}},"exploring_blockchain":{"childImageSharp":{"gatsbyImageData":{"layout":"constrained","backgroundColor":"#e8e848","images":{"fallback":{"src":"/static/2f8d6baa92884a4900b578cd30cec219/20850/exploring_blockchain.png","srcSet":"/static/2f8d6baa92884a4900b578cd30cec219/994f0/exploring_blockchain.png 100w,\\n/static/2f8d6baa92884a4900b578cd30cec219/4bbad/exploring_blockchain.png 200w,\\n/static/2f8d6baa92884a4900b578cd30cec219/20850/exploring_blockchain.png 400w","sizes":"(min-width: 400px) 400px, 100vw"},"sources":[{"srcSet":"/static/2f8d6baa92884a4900b578cd30cec219/90ebf/exploring_blockchain.webp 100w,\\n/static/2f8d6baa92884a4900b578cd30cec219/59b5d/exploring_blockchain.webp 200w,\\n/static/2f8d6baa92884a4900b578cd30cec219/697e6/exploring_blockchain.webp 400w","type":"image/webp","sizes":"(min-width: 400px) 400px, 100vw"}]},"width":400,"height":250}}}}}');

/***/ }),

/***/ "./public/page-data/sq/d/63159454.json":
/*!*********************************************!*\
  !*** ./public/page-data/sq/d/63159454.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"data":{"site":{"siteMetadata":{"title":"DID registry demo","description":null,"author":"@trustfractal"}}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-index-tsx.js.map
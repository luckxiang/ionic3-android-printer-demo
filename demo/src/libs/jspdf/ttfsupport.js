"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var putFont = exports.putFont = function putFont(_ref) {
    var font = _ref.font,
        newObject = _ref.newObject,
        out = _ref.out;

    if (font.id.slice(1) < 15) return;

    var dictionary = font.metadata.embedTTF(font.encoding, newObject, out);
    if (dictionary) {
        font.objectNumber = dictionary;
        font.isAlreadyPutted = true;
    }
};

var postProcessText = exports.postProcessText = function postProcessText(args) {
    var text = args.text,
        _args$mutex = args.mutex,
        activeFontKey = _args$mutex.activeFontKey,
        fonts = _args$mutex.fonts;

    var isHex = activeFontKey.slice(1) >= 15;
    var activeFont = fonts[activeFontKey];
    var _activeFont$metadata = activeFont.metadata,
        encode = _activeFont$metadata.encode,
        subset = _activeFont$metadata.subset;


    args.text = isHex ? text.map(function (str) {
        return Array.isArray(str) ? [encode(subset, str[0]), str[1], str[2]] : encode(subset, str);
    }) : text;
    args.mutex.isHex = isHex;
};

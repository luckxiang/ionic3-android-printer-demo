'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.jsPdfcust = jsPdfcust;

var _ttffont = require('./ttffont');

var _ttffont2 = _interopRequireDefault(_ttffont);

var _babelttfsupport = require('./ttfsupport');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function jsPdfcust(jsPDF) {
    jsPDF.API.TTFFont = _ttffont2.default;

    jsPDF.API.events.splice(-4);

    jsPDF.API.events.push(['addFont', function (font) {
        var id = font.id,
            fontName = font.fontName,
            postScriptName = font.postScriptName;

        if (jsPDF.API.existsFileInVFS(postScriptName)) {
            font.metadata = jsPDF.API.TTFFont.open(postScriptName, fontName, jsPDF.API.getFileFromVFS(postScriptName));
            var _font$metadata = font.metadata,
                widths = _font$metadata.hmtx.widths,
                capHeight = _font$metadata.capHeight;

            font.encoding = widths.length < 500 && capHeight < 800 ? "WinAnsiEncoding" : "MacRomanEncoding";
        } else if (id.slice(1) >= 15) {
            console.error('Font does not exist in FileInVFS, import fonts or remove declaration doc.addFont(\'' + postScriptName + '\').');
        }
    }]);

    jsPDF.API.events.push(['putFont', _babelttfsupport.putFont]);

    jsPDF.API.events.push(['postProcessText', _babelttfsupport.postProcessText]);
}

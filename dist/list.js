var List;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 302:
/***/ (function(module) {

module.exports = function (list) {
  var addAsync = function addAsync(values, callback, items) {
    var valuesToAdd = values.splice(0, 50);
    items = items || [];
    items = items.concat(list.add(valuesToAdd));

    if (values.length > 0) {
      setTimeout(function () {
        addAsync(values, callback, items);
      }, 1);
    } else {
      list.update();
      callback(items);
    }
  };

  return addAsync;
};

/***/ }),

/***/ 448:
/***/ (function(module) {

module.exports = function (list) {
  // Add handlers
  list.handlers.filterStart = list.handlers.filterStart || [];
  list.handlers.filterComplete = list.handlers.filterComplete || [];
  return function (filterFunction) {
    list.trigger('filterStart');
    list.i = 1; // Reset paging

    list.reset.filter();

    if (filterFunction === undefined) {
      list.filtered = false;
    } else {
      list.filtered = true;
      var is = list.items;

      for (var i = 0, il = is.length; i < il; i++) {
        var item = is[i];

        if (filterFunction(item)) {
          item.filtered = true;
        } else {
          item.filtered = false;
        }
      }
    }

    list.update();
    list.trigger('filterComplete');
    return list.visibleItems;
  };
};

/***/ }),

/***/ 277:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classes = __webpack_require__(700),
    events = __webpack_require__(95),
    extend = __webpack_require__(114),
    toString = __webpack_require__(757),
    getByClass = __webpack_require__(153),
    fuzzy = __webpack_require__(180);

module.exports = function (list, options) {
  options = options || {};
  options = extend({
    location: 0,
    distance: 100,
    threshold: 0.4,
    multiSearch: true,
    searchClass: 'fuzzy-search'
  }, options);
  var fuzzySearch = {
    search: function search(searchString, columns) {
      // Substract arguments from the searchString or put searchString as only argument
      var searchArguments = options.multiSearch ? searchString.replace(/ +$/, '').split(/ +/) : [searchString];

      for (var k = 0, kl = list.items.length; k < kl; k++) {
        fuzzySearch.item(list.items[k], columns, searchArguments);
      }
    },
    item: function item(_item, columns, searchArguments) {
      var found = true;

      for (var i = 0; i < searchArguments.length; i++) {
        var foundArgument = false;

        for (var j = 0, jl = columns.length; j < jl; j++) {
          if (fuzzySearch.values(_item.values(), columns[j], searchArguments[i])) {
            foundArgument = true;
          }
        }

        if (!foundArgument) {
          found = false;
        }
      }

      _item.found = found;
    },
    values: function values(_values, value, searchArgument) {
      if (_values.hasOwnProperty(value)) {
        var text = toString(_values[value]).toLowerCase();

        if (fuzzy(text, searchArgument, options)) {
          return true;
        }
      }

      return false;
    }
  };
  events.bind(getByClass(list.listContainer, options.searchClass), 'keyup', list.utils.events.debounce(function (e) {
    var target = e.target || e.srcElement; // IE have srcElement

    list.search(target.value, fuzzySearch.search);
  }, list.searchDelay));
  return function (str, columns) {
    list.search(str, columns, fuzzySearch.search);
  };
};

/***/ }),

/***/ 352:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Latinise = {};
Latinise.latin_map = {
  Á: 'A',
  Ă: 'A',
  Ắ: 'A',
  Ặ: 'A',
  Ằ: 'A',
  Ẳ: 'A',
  Ẵ: 'A',
  Ǎ: 'A',
  Â: 'A',
  Ấ: 'A',
  Ậ: 'A',
  Ầ: 'A',
  Ẩ: 'A',
  Ẫ: 'A',
  Ä: 'A',
  Ǟ: 'A',
  Ȧ: 'A',
  Ǡ: 'A',
  Ạ: 'A',
  Ȁ: 'A',
  À: 'A',
  Ả: 'A',
  Ȃ: 'A',
  Ā: 'A',
  Ą: 'A',
  Å: 'A',
  Ǻ: 'A',
  Ḁ: 'A',
  Ⱥ: 'A',
  Ã: 'A',
  Ꜳ: 'AA',
  Æ: 'AE',
  Ǽ: 'AE',
  Ǣ: 'AE',
  Ꜵ: 'AO',
  Ꜷ: 'AU',
  Ꜹ: 'AV',
  Ꜻ: 'AV',
  Ꜽ: 'AY',
  Ḃ: 'B',
  Ḅ: 'B',
  Ɓ: 'B',
  Ḇ: 'B',
  Ƀ: 'B',
  Ƃ: 'B',
  Ć: 'C',
  Č: 'C',
  Ç: 'C',
  Ḉ: 'C',
  Ĉ: 'C',
  Ċ: 'C',
  Ƈ: 'C',
  Ȼ: 'C',
  Ď: 'D',
  Ḑ: 'D',
  Ḓ: 'D',
  Ḋ: 'D',
  Ḍ: 'D',
  Ɗ: 'D',
  Ḏ: 'D',
  ǲ: 'D',
  ǅ: 'D',
  Đ: 'D',
  Ƌ: 'D',
  Ǳ: 'DZ',
  Ǆ: 'DZ',
  É: 'E',
  Ĕ: 'E',
  Ě: 'E',
  Ȩ: 'E',
  Ḝ: 'E',
  Ê: 'E',
  Ế: 'E',
  Ệ: 'E',
  Ề: 'E',
  Ể: 'E',
  Ễ: 'E',
  Ḙ: 'E',
  Ë: 'E',
  Ė: 'E',
  Ẹ: 'E',
  Ȅ: 'E',
  È: 'E',
  Ẻ: 'E',
  Ȇ: 'E',
  Ē: 'E',
  Ḗ: 'E',
  Ḕ: 'E',
  Ę: 'E',
  Ɇ: 'E',
  Ẽ: 'E',
  Ḛ: 'E',
  Ꝫ: 'ET',
  Ḟ: 'F',
  Ƒ: 'F',
  Ǵ: 'G',
  Ğ: 'G',
  Ǧ: 'G',
  Ģ: 'G',
  Ĝ: 'G',
  Ġ: 'G',
  Ɠ: 'G',
  Ḡ: 'G',
  Ǥ: 'G',
  Ḫ: 'H',
  Ȟ: 'H',
  Ḩ: 'H',
  Ĥ: 'H',
  Ⱨ: 'H',
  Ḧ: 'H',
  Ḣ: 'H',
  Ḥ: 'H',
  Ħ: 'H',
  Í: 'I',
  Ĭ: 'I',
  Ǐ: 'I',
  Î: 'I',
  Ï: 'I',
  Ḯ: 'I',
  İ: 'I',
  Ị: 'I',
  Ȉ: 'I',
  Ì: 'I',
  Ỉ: 'I',
  Ȋ: 'I',
  Ī: 'I',
  Į: 'I',
  Ɨ: 'I',
  Ĩ: 'I',
  Ḭ: 'I',
  Ꝺ: 'D',
  Ꝼ: 'F',
  Ᵹ: 'G',
  Ꞃ: 'R',
  Ꞅ: 'S',
  Ꞇ: 'T',
  Ꝭ: 'IS',
  Ĵ: 'J',
  Ɉ: 'J',
  Ḱ: 'K',
  Ǩ: 'K',
  Ķ: 'K',
  Ⱪ: 'K',
  Ꝃ: 'K',
  Ḳ: 'K',
  Ƙ: 'K',
  Ḵ: 'K',
  Ꝁ: 'K',
  Ꝅ: 'K',
  Ĺ: 'L',
  Ƚ: 'L',
  Ľ: 'L',
  Ļ: 'L',
  Ḽ: 'L',
  Ḷ: 'L',
  Ḹ: 'L',
  Ⱡ: 'L',
  Ꝉ: 'L',
  Ḻ: 'L',
  Ŀ: 'L',
  Ɫ: 'L',
  ǈ: 'L',
  Ł: 'L',
  Ǉ: 'LJ',
  Ḿ: 'M',
  Ṁ: 'M',
  Ṃ: 'M',
  Ɱ: 'M',
  Ń: 'N',
  Ň: 'N',
  Ņ: 'N',
  Ṋ: 'N',
  Ṅ: 'N',
  Ṇ: 'N',
  Ǹ: 'N',
  Ɲ: 'N',
  Ṉ: 'N',
  Ƞ: 'N',
  ǋ: 'N',
  Ñ: 'N',
  Ǌ: 'NJ',
  Ó: 'O',
  Ŏ: 'O',
  Ǒ: 'O',
  Ô: 'O',
  Ố: 'O',
  Ộ: 'O',
  Ồ: 'O',
  Ổ: 'O',
  Ỗ: 'O',
  Ö: 'O',
  Ȫ: 'O',
  Ȯ: 'O',
  Ȱ: 'O',
  Ọ: 'O',
  Ő: 'O',
  Ȍ: 'O',
  Ò: 'O',
  Ỏ: 'O',
  Ơ: 'O',
  Ớ: 'O',
  Ợ: 'O',
  Ờ: 'O',
  Ở: 'O',
  Ỡ: 'O',
  Ȏ: 'O',
  Ꝋ: 'O',
  Ꝍ: 'O',
  Ō: 'O',
  Ṓ: 'O',
  Ṑ: 'O',
  Ɵ: 'O',
  Ǫ: 'O',
  Ǭ: 'O',
  Ø: 'O',
  Ǿ: 'O',
  Õ: 'O',
  Ṍ: 'O',
  Ṏ: 'O',
  Ȭ: 'O',
  Ƣ: 'OI',
  Ꝏ: 'OO',
  Ɛ: 'E',
  Ɔ: 'O',
  Ȣ: 'OU',
  Ṕ: 'P',
  Ṗ: 'P',
  Ꝓ: 'P',
  Ƥ: 'P',
  Ꝕ: 'P',
  Ᵽ: 'P',
  Ꝑ: 'P',
  Ꝙ: 'Q',
  Ꝗ: 'Q',
  Ŕ: 'R',
  Ř: 'R',
  Ŗ: 'R',
  Ṙ: 'R',
  Ṛ: 'R',
  Ṝ: 'R',
  Ȑ: 'R',
  Ȓ: 'R',
  Ṟ: 'R',
  Ɍ: 'R',
  Ɽ: 'R',
  Ꜿ: 'C',
  Ǝ: 'E',
  Ś: 'S',
  Ṥ: 'S',
  Š: 'S',
  Ṧ: 'S',
  Ş: 'S',
  Ŝ: 'S',
  Ș: 'S',
  Ṡ: 'S',
  Ṣ: 'S',
  Ṩ: 'S',
  Ť: 'T',
  Ţ: 'T',
  Ṱ: 'T',
  Ț: 'T',
  Ⱦ: 'T',
  Ṫ: 'T',
  Ṭ: 'T',
  Ƭ: 'T',
  Ṯ: 'T',
  Ʈ: 'T',
  Ŧ: 'T',
  Ɐ: 'A',
  Ꞁ: 'L',
  Ɯ: 'M',
  Ʌ: 'V',
  Ꜩ: 'TZ',
  Ú: 'U',
  Ŭ: 'U',
  Ǔ: 'U',
  Û: 'U',
  Ṷ: 'U',
  Ü: 'U',
  Ǘ: 'U',
  Ǚ: 'U',
  Ǜ: 'U',
  Ǖ: 'U',
  Ṳ: 'U',
  Ụ: 'U',
  Ű: 'U',
  Ȕ: 'U',
  Ù: 'U',
  Ủ: 'U',
  Ư: 'U',
  Ứ: 'U',
  Ự: 'U',
  Ừ: 'U',
  Ử: 'U',
  Ữ: 'U',
  Ȗ: 'U',
  Ū: 'U',
  Ṻ: 'U',
  Ų: 'U',
  Ů: 'U',
  Ũ: 'U',
  Ṹ: 'U',
  Ṵ: 'U',
  Ꝟ: 'V',
  Ṿ: 'V',
  Ʋ: 'V',
  Ṽ: 'V',
  Ꝡ: 'VY',
  Ẃ: 'W',
  Ŵ: 'W',
  Ẅ: 'W',
  Ẇ: 'W',
  Ẉ: 'W',
  Ẁ: 'W',
  Ⱳ: 'W',
  Ẍ: 'X',
  Ẋ: 'X',
  Ý: 'Y',
  Ŷ: 'Y',
  Ÿ: 'Y',
  Ẏ: 'Y',
  Ỵ: 'Y',
  Ỳ: 'Y',
  Ƴ: 'Y',
  Ỷ: 'Y',
  Ỿ: 'Y',
  Ȳ: 'Y',
  Ɏ: 'Y',
  Ỹ: 'Y',
  Ź: 'Z',
  Ž: 'Z',
  Ẑ: 'Z',
  Ⱬ: 'Z',
  Ż: 'Z',
  Ẓ: 'Z',
  Ȥ: 'Z',
  Ẕ: 'Z',
  Ƶ: 'Z',
  Ĳ: 'IJ',
  Œ: 'OE',
  ᴀ: 'A',
  ᴁ: 'AE',
  ʙ: 'B',
  ᴃ: 'B',
  ᴄ: 'C',
  ᴅ: 'D',
  ᴇ: 'E',
  ꜰ: 'F',
  ɢ: 'G',
  ʛ: 'G',
  ʜ: 'H',
  ɪ: 'I',
  ʁ: 'R',
  ᴊ: 'J',
  ᴋ: 'K',
  ʟ: 'L',
  ᴌ: 'L',
  ᴍ: 'M',
  ɴ: 'N',
  ᴏ: 'O',
  ɶ: 'OE',
  ᴐ: 'O',
  ᴕ: 'OU',
  ᴘ: 'P',
  ʀ: 'R',
  ᴎ: 'N',
  ᴙ: 'R',
  ꜱ: 'S',
  ᴛ: 'T',
  ⱻ: 'E',
  ᴚ: 'R',
  ᴜ: 'U',
  ᴠ: 'V',
  ᴡ: 'W',
  ʏ: 'Y',
  ᴢ: 'Z',
  á: 'a',
  ă: 'a',
  ắ: 'a',
  ặ: 'a',
  ằ: 'a',
  ẳ: 'a',
  ẵ: 'a',
  ǎ: 'a',
  â: 'a',
  ấ: 'a',
  ậ: 'a',
  ầ: 'a',
  ẩ: 'a',
  ẫ: 'a',
  ä: 'a',
  ǟ: 'a',
  ȧ: 'a',
  ǡ: 'a',
  ạ: 'a',
  ȁ: 'a',
  à: 'a',
  ả: 'a',
  ȃ: 'a',
  ā: 'a',
  ą: 'a',
  ᶏ: 'a',
  ẚ: 'a',
  å: 'a',
  ǻ: 'a',
  ḁ: 'a',
  ⱥ: 'a',
  ã: 'a',
  ꜳ: 'aa',
  æ: 'ae',
  ǽ: 'ae',
  ǣ: 'ae',
  ꜵ: 'ao',
  ꜷ: 'au',
  ꜹ: 'av',
  ꜻ: 'av',
  ꜽ: 'ay',
  ḃ: 'b',
  ḅ: 'b',
  ɓ: 'b',
  ḇ: 'b',
  ᵬ: 'b',
  ᶀ: 'b',
  ƀ: 'b',
  ƃ: 'b',
  ɵ: 'o',
  ć: 'c',
  č: 'c',
  ç: 'c',
  ḉ: 'c',
  ĉ: 'c',
  ɕ: 'c',
  ċ: 'c',
  ƈ: 'c',
  ȼ: 'c',
  ď: 'd',
  ḑ: 'd',
  ḓ: 'd',
  ȡ: 'd',
  ḋ: 'd',
  ḍ: 'd',
  ɗ: 'd',
  ᶑ: 'd',
  ḏ: 'd',
  ᵭ: 'd',
  ᶁ: 'd',
  đ: 'd',
  ɖ: 'd',
  ƌ: 'd',
  ı: 'i',
  ȷ: 'j',
  ɟ: 'j',
  ʄ: 'j',
  ǳ: 'dz',
  ǆ: 'dz',
  é: 'e',
  ĕ: 'e',
  ě: 'e',
  ȩ: 'e',
  ḝ: 'e',
  ê: 'e',
  ế: 'e',
  ệ: 'e',
  ề: 'e',
  ể: 'e',
  ễ: 'e',
  ḙ: 'e',
  ë: 'e',
  ė: 'e',
  ẹ: 'e',
  ȅ: 'e',
  è: 'e',
  ẻ: 'e',
  ȇ: 'e',
  ē: 'e',
  ḗ: 'e',
  ḕ: 'e',
  ⱸ: 'e',
  ę: 'e',
  ᶒ: 'e',
  ɇ: 'e',
  ẽ: 'e',
  ḛ: 'e',
  ꝫ: 'et',
  ḟ: 'f',
  ƒ: 'f',
  ᵮ: 'f',
  ᶂ: 'f',
  ǵ: 'g',
  ğ: 'g',
  ǧ: 'g',
  ģ: 'g',
  ĝ: 'g',
  ġ: 'g',
  ɠ: 'g',
  ḡ: 'g',
  ᶃ: 'g',
  ǥ: 'g',
  ḫ: 'h',
  ȟ: 'h',
  ḩ: 'h',
  ĥ: 'h',
  ⱨ: 'h',
  ḧ: 'h',
  ḣ: 'h',
  ḥ: 'h',
  ɦ: 'h',
  ẖ: 'h',
  ħ: 'h',
  ƕ: 'hv',
  í: 'i',
  ĭ: 'i',
  ǐ: 'i',
  î: 'i',
  ï: 'i',
  ḯ: 'i',
  ị: 'i',
  ȉ: 'i',
  ì: 'i',
  ỉ: 'i',
  ȋ: 'i',
  ī: 'i',
  į: 'i',
  ᶖ: 'i',
  ɨ: 'i',
  ĩ: 'i',
  ḭ: 'i',
  ꝺ: 'd',
  ꝼ: 'f',
  ᵹ: 'g',
  ꞃ: 'r',
  ꞅ: 's',
  ꞇ: 't',
  ꝭ: 'is',
  ǰ: 'j',
  ĵ: 'j',
  ʝ: 'j',
  ɉ: 'j',
  ḱ: 'k',
  ǩ: 'k',
  ķ: 'k',
  ⱪ: 'k',
  ꝃ: 'k',
  ḳ: 'k',
  ƙ: 'k',
  ḵ: 'k',
  ᶄ: 'k',
  ꝁ: 'k',
  ꝅ: 'k',
  ĺ: 'l',
  ƚ: 'l',
  ɬ: 'l',
  ľ: 'l',
  ļ: 'l',
  ḽ: 'l',
  ȴ: 'l',
  ḷ: 'l',
  ḹ: 'l',
  ⱡ: 'l',
  ꝉ: 'l',
  ḻ: 'l',
  ŀ: 'l',
  ɫ: 'l',
  ᶅ: 'l',
  ɭ: 'l',
  ł: 'l',
  ǉ: 'lj',
  ſ: 's',
  ẜ: 's',
  ẛ: 's',
  ẝ: 's',
  ḿ: 'm',
  ṁ: 'm',
  ṃ: 'm',
  ɱ: 'm',
  ᵯ: 'm',
  ᶆ: 'm',
  ń: 'n',
  ň: 'n',
  ņ: 'n',
  ṋ: 'n',
  ȵ: 'n',
  ṅ: 'n',
  ṇ: 'n',
  ǹ: 'n',
  ɲ: 'n',
  ṉ: 'n',
  ƞ: 'n',
  ᵰ: 'n',
  ᶇ: 'n',
  ɳ: 'n',
  ñ: 'n',
  ǌ: 'nj',
  ó: 'o',
  ŏ: 'o',
  ǒ: 'o',
  ô: 'o',
  ố: 'o',
  ộ: 'o',
  ồ: 'o',
  ổ: 'o',
  ỗ: 'o',
  ö: 'o',
  ȫ: 'o',
  ȯ: 'o',
  ȱ: 'o',
  ọ: 'o',
  ő: 'o',
  ȍ: 'o',
  ò: 'o',
  ỏ: 'o',
  ơ: 'o',
  ớ: 'o',
  ợ: 'o',
  ờ: 'o',
  ở: 'o',
  ỡ: 'o',
  ȏ: 'o',
  ꝋ: 'o',
  ꝍ: 'o',
  ⱺ: 'o',
  ō: 'o',
  ṓ: 'o',
  ṑ: 'o',
  ǫ: 'o',
  ǭ: 'o',
  ø: 'o',
  ǿ: 'o',
  õ: 'o',
  ṍ: 'o',
  ṏ: 'o',
  ȭ: 'o',
  ƣ: 'oi',
  ꝏ: 'oo',
  ɛ: 'e',
  ᶓ: 'e',
  ɔ: 'o',
  ᶗ: 'o',
  ȣ: 'ou',
  ṕ: 'p',
  ṗ: 'p',
  ꝓ: 'p',
  ƥ: 'p',
  ᵱ: 'p',
  ᶈ: 'p',
  ꝕ: 'p',
  ᵽ: 'p',
  ꝑ: 'p',
  ꝙ: 'q',
  ʠ: 'q',
  ɋ: 'q',
  ꝗ: 'q',
  ŕ: 'r',
  ř: 'r',
  ŗ: 'r',
  ṙ: 'r',
  ṛ: 'r',
  ṝ: 'r',
  ȑ: 'r',
  ɾ: 'r',
  ᵳ: 'r',
  ȓ: 'r',
  ṟ: 'r',
  ɼ: 'r',
  ᵲ: 'r',
  ᶉ: 'r',
  ɍ: 'r',
  ɽ: 'r',
  ↄ: 'c',
  ꜿ: 'c',
  ɘ: 'e',
  ɿ: 'r',
  ś: 's',
  ṥ: 's',
  š: 's',
  ṧ: 's',
  ş: 's',
  ŝ: 's',
  ș: 's',
  ṡ: 's',
  ṣ: 's',
  ṩ: 's',
  ʂ: 's',
  ᵴ: 's',
  ᶊ: 's',
  ȿ: 's',
  ɡ: 'g',
  ᴑ: 'o',
  ᴓ: 'o',
  ᴝ: 'u',
  ť: 't',
  ţ: 't',
  ṱ: 't',
  ț: 't',
  ȶ: 't',
  ẗ: 't',
  ⱦ: 't',
  ṫ: 't',
  ṭ: 't',
  ƭ: 't',
  ṯ: 't',
  ᵵ: 't',
  ƫ: 't',
  ʈ: 't',
  ŧ: 't',
  ᵺ: 'th',
  ɐ: 'a',
  ᴂ: 'ae',
  ǝ: 'e',
  ᵷ: 'g',
  ɥ: 'h',
  ʮ: 'h',
  ʯ: 'h',
  ᴉ: 'i',
  ʞ: 'k',
  ꞁ: 'l',
  ɯ: 'm',
  ɰ: 'm',
  ᴔ: 'oe',
  ɹ: 'r',
  ɻ: 'r',
  ɺ: 'r',
  ⱹ: 'r',
  ʇ: 't',
  ʌ: 'v',
  ʍ: 'w',
  ʎ: 'y',
  ꜩ: 'tz',
  ú: 'u',
  ŭ: 'u',
  ǔ: 'u',
  û: 'u',
  ṷ: 'u',
  ü: 'u',
  ǘ: 'u',
  ǚ: 'u',
  ǜ: 'u',
  ǖ: 'u',
  ṳ: 'u',
  ụ: 'u',
  ű: 'u',
  ȕ: 'u',
  ù: 'u',
  ủ: 'u',
  ư: 'u',
  ứ: 'u',
  ự: 'u',
  ừ: 'u',
  ử: 'u',
  ữ: 'u',
  ȗ: 'u',
  ū: 'u',
  ṻ: 'u',
  ų: 'u',
  ᶙ: 'u',
  ů: 'u',
  ũ: 'u',
  ṹ: 'u',
  ṵ: 'u',
  ᵫ: 'ue',
  ꝸ: 'um',
  ⱴ: 'v',
  ꝟ: 'v',
  ṿ: 'v',
  ʋ: 'v',
  ᶌ: 'v',
  ⱱ: 'v',
  ṽ: 'v',
  ꝡ: 'vy',
  ẃ: 'w',
  ŵ: 'w',
  ẅ: 'w',
  ẇ: 'w',
  ẉ: 'w',
  ẁ: 'w',
  ⱳ: 'w',
  ẘ: 'w',
  ẍ: 'x',
  ẋ: 'x',
  ᶍ: 'x',
  ý: 'y',
  ŷ: 'y',
  ÿ: 'y',
  ẏ: 'y',
  ỵ: 'y',
  ỳ: 'y',
  ƴ: 'y',
  ỷ: 'y',
  ỿ: 'y',
  ȳ: 'y',
  ẙ: 'y',
  ɏ: 'y',
  ỹ: 'y',
  ź: 'z',
  ž: 'z',
  ẑ: 'z',
  ʑ: 'z',
  ⱬ: 'z',
  ż: 'z',
  ẓ: 'z',
  ȥ: 'z',
  ẕ: 'z',
  ᵶ: 'z',
  ᶎ: 'z',
  ʐ: 'z',
  ƶ: 'z',
  ɀ: 'z',
  ﬀ: 'ff',
  ﬃ: 'ffi',
  ﬄ: 'ffl',
  ﬁ: 'fi',
  ﬂ: 'fl',
  ĳ: 'ij',
  œ: 'oe',
  ﬆ: 'st',
  ₐ: 'a',
  ₑ: 'e',
  ᵢ: 'i',
  ⱼ: 'j',
  ₒ: 'o',
  ᵣ: 'r',
  ᵤ: 'u',
  ᵥ: 'v',
  ₓ: 'x'
};

String.prototype.latinise = function () {
  return this.replace(/[^A-Za-z0-9\[\] ]/g, function (a) {
    return Latinise.latin_map[a] || a;
  });
};

String.prototype.latinize = String.prototype.latinise;

String.prototype.isLatin = function () {
  return this == this.latinise();
};

var naturalSort = __webpack_require__(915),
    getByClass = __webpack_require__(153),
    extend = __webpack_require__(114),
    indexOf = __webpack_require__(557),
    events = __webpack_require__(95),
    toString = __webpack_require__(757),
    classes = __webpack_require__(700),
    getAttribute = __webpack_require__(826),
    toArray = __webpack_require__(117);

module.exports = function (id, options, values) {
  var self = this,
      init,
      Item = __webpack_require__(423)(self),
      addAsync = __webpack_require__(302)(self),
      initPagination = __webpack_require__(664)(self);

  init = {
    start: function start() {
      self.listClass = 'list';
      self.searchClass = 'search';
      self.sortClass = 'sort';
      self.page = 10000;
      self.i = 1;
      self.items = [];
      self.visibleItems = [];
      self.matchingItems = [];
      self.searched = false;
      self.filtered = false;
      self.searchColumns = undefined;
      self.searchDelay = 0;
      self.handlers = {
        updated: []
      };
      self.valueNames = [];
      self.utils = {
        getByClass: getByClass,
        extend: extend,
        indexOf: indexOf,
        events: events,
        toString: toString,
        naturalSort: naturalSort,
        classes: classes,
        getAttribute: getAttribute,
        toArray: toArray
      };
      self.utils.extend(self, options);
      self.listContainer = typeof id === 'string' ? document.getElementById(id) : id;

      if (!self.listContainer) {
        return;
      }

      self.list = getByClass(self.listContainer, self.listClass, true);
      self.parse = __webpack_require__(805)(self);
      self.templater = __webpack_require__(561)(self);
      self.search = __webpack_require__(821)(self);
      self.filter = __webpack_require__(448)(self);
      self.sort = __webpack_require__(745)(self);
      self.fuzzySearch = __webpack_require__(277)(self, options.fuzzySearch);
      this.handlers();
      this.items();
      this.pagination();
      self.update();
    },
    handlers: function handlers() {
      for (var handler in self.handlers) {
        if (self[handler] && self.handlers.hasOwnProperty(handler)) {
          self.on(handler, self[handler]);
        }
      }
    },
    items: function items() {
      self.parse(self.list);

      if (values !== undefined) {
        self.add(values);
      }
    },
    pagination: function pagination() {
      if (options.pagination !== undefined) {
        if (options.pagination === true) {
          options.pagination = [{}];
        }

        if (options.pagination[0] === undefined) {
          options.pagination = [options.pagination];
        }

        for (var i = 0, il = options.pagination.length; i < il; i++) {
          initPagination(options.pagination[i]);
        }
      }
    }
  };
  /*
   * Re-parse the List, use if html have changed
   */

  this.reIndex = function () {
    self.items = [];
    self.visibleItems = [];
    self.matchingItems = [];
    self.searched = false;
    self.filtered = false;
    self.parse(self.list);
  };

  this.toJSON = function () {
    var json = [];

    for (var i = 0, il = self.items.length; i < il; i++) {
      json.push(self.items[i].values());
    }

    return json;
  };
  /*
   * Add object to list
   */


  this.add = function (values, callback) {
    if (values.length === 0) {
      return;
    }

    if (callback) {
      addAsync(values.slice(0), callback);
      return;
    }

    var added = [],
        notCreate = false;

    if (values[0] === undefined) {
      values = [values];
    }

    for (var i = 0, il = values.length; i < il; i++) {
      var item = null;
      notCreate = self.items.length > self.page ? true : false;
      item = new Item(values[i], undefined, notCreate);
      self.items.push(item);
      added.push(item);
    }

    self.update();
    return added;
  };

  this.show = function (i, page) {
    this.i = i;
    this.page = page;
    self.update();
    return self;
  };
  /* Removes object from list.
   * Loops through the list and removes objects where
   * property "valuename" === value
   */


  this.remove = function (valueName, value, options) {
    var found = 0;

    for (var i = 0, il = self.items.length; i < il; i++) {
      if (self.items[i].values()[valueName] == value) {
        self.templater.remove(self.items[i], options);
        self.items.splice(i, 1);
        il--;
        i--;
        found++;
      }
    }

    self.update();
    return found;
  };
  /* Gets the objects in the list which
   * property "valueName" === value
   */


  this.get = function (valueName, value) {
    var matchedItems = [];

    for (var i = 0, il = self.items.length; i < il; i++) {
      var item = self.items[i];

      if (item.values()[valueName] == value) {
        matchedItems.push(item);
      }
    }

    return matchedItems;
  };
  /*
   * Get size of the list
   */


  this.size = function () {
    return self.items.length;
  };
  /*
   * Removes all items from the list
   */


  this.clear = function () {
    self.templater.clear();
    self.items = [];
    return self;
  };

  this.on = function (event, callback) {
    self.handlers[event].push(callback);
    return self;
  };

  this.off = function (event, callback) {
    var e = self.handlers[event];
    var index = indexOf(e, callback);

    if (index > -1) {
      e.splice(index, 1);
    }

    return self;
  };

  this.trigger = function (event) {
    var i = self.handlers[event].length;

    while (i--) {
      self.handlers[event][i](self);
    }

    return self;
  };

  this.reset = {
    filter: function filter() {
      var is = self.items,
          il = is.length;

      while (il--) {
        is[il].filtered = false;
      }

      return self;
    },
    search: function search() {
      var is = self.items,
          il = is.length;

      while (il--) {
        is[il].found = false;
      }

      return self;
    }
  };

  this.update = function () {
    var is = self.items,
        il = is.length;
    self.visibleItems = [];
    self.matchingItems = [];
    self.templater.clear();

    for (var i = 0; i < il; i++) {
      if (is[i].matching() && self.matchingItems.length + 1 >= self.i && self.visibleItems.length < self.page) {
        is[i].show();
        self.visibleItems.push(is[i]);
        self.matchingItems.push(is[i]);
      } else if (is[i].matching()) {
        self.matchingItems.push(is[i]);
        is[i].hide();
      } else {
        is[i].hide();
      }
    }

    self.trigger('updated');
    return self;
  };

  init.start();
};

/***/ }),

/***/ 423:
/***/ (function(module) {

module.exports = function (list) {
  return function (initValues, element, notCreate) {
    var item = this;
    this._values = {};
    this.found = false; // Show if list.searched == true and this.found == true

    this.filtered = false; // Show if list.filtered == true and this.filtered == true

    if (element !== undefined) {
      this.alwaysVisible = element.getAttribute('data-always-visible');
    }

    var init = function init(initValues, element, notCreate) {
      if (element === undefined) {
        if (notCreate) {
          item.values(initValues, notCreate);
        } else {
          item.values(initValues);
        }
      } else {
        item.elm = element;
        var values = list.templater.get(item, initValues);
        item.values(values);
      }
    };

    this.values = function (newValues, notCreate) {
      if (newValues !== undefined) {
        for (var name in newValues) {
          item._values[name] = newValues[name];
        }

        if (notCreate !== true) {
          list.templater.set(item, item.values());
        }
      } else {
        return item._values;
      }
    };

    this.show = function () {
      list.templater.show(item);
    };

    this.hide = function () {
      list.templater.hide(item);
    };

    this.matching = function () {
      return item.alwaysVisible || list.filtered && list.searched && item.found && item.filtered || list.filtered && !list.searched && item.filtered || !list.filtered && list.searched && item.found || !list.filtered && !list.searched;
    };

    this.visible = function () {
      return item.elm && item.elm.parentNode == list.list ? true : false;
    };

    init(initValues, element, notCreate);
  };
};

/***/ }),

/***/ 664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classes = __webpack_require__(700),
    events = __webpack_require__(95),
    List = __webpack_require__(352);

module.exports = function (list) {
  var isHidden = false;

  var refresh = function refresh(pagingList, options) {
    if (list.page < 1) {
      list.listContainer.style.display = 'none';
      isHidden = true;
      return;
    } else if (isHidden) {
      list.listContainer.style.display = 'block';
    }

    var item,
        l = list.matchingItems.length,
        index = list.i,
        page = list.page,
        pages = Math.ceil(l / page),
        currentPage = Math.ceil(index / page),
        innerWindow = options.innerWindow || 2,
        left = options.left || options.outerWindow || 0,
        right = options.right || options.outerWindow || 0;
    right = pages - right;
    pagingList.clear();

    for (var i = 1; i <= pages; i++) {
      var className = currentPage === i ? 'active' : ''; //console.log(i, left, right, currentPage, (currentPage - innerWindow), (currentPage + innerWindow), className);

      if (is.number(i, left, right, currentPage, innerWindow)) {
        item = pagingList.add({
          page: i,
          dotted: false
        })[0];

        if (className) {
          classes(item.elm).add(className);
        }

        item.elm.firstChild.setAttribute('data-i', i);
        item.elm.firstChild.setAttribute('data-page', page);
      } else if (is.dotted(pagingList, i, left, right, currentPage, innerWindow, pagingList.size())) {
        item = pagingList.add({
          page: '...',
          dotted: true
        })[0];
        classes(item.elm).add('disabled');
      }
    }
  };

  var is = {
    number: function number(i, left, right, currentPage, innerWindow) {
      return this.left(i, left) || this.right(i, right) || this.innerWindow(i, currentPage, innerWindow);
    },
    left: function left(i, _left) {
      return i <= _left;
    },
    right: function right(i, _right) {
      return i > _right;
    },
    innerWindow: function innerWindow(i, currentPage, _innerWindow) {
      return i >= currentPage - _innerWindow && i <= currentPage + _innerWindow;
    },
    dotted: function dotted(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
      return this.dottedLeft(pagingList, i, left, right, currentPage, innerWindow) || this.dottedRight(pagingList, i, left, right, currentPage, innerWindow, currentPageItem);
    },
    dottedLeft: function dottedLeft(pagingList, i, left, right, currentPage, innerWindow) {
      return i == left + 1 && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
    },
    dottedRight: function dottedRight(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
      if (pagingList.items[currentPageItem - 1].values().dotted) {
        return false;
      } else {
        return i == right && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
      }
    }
  };
  return function (options) {
    var pagingList = new List(list.listContainer.id, {
      listClass: options.paginationClass || 'pagination',
      item: options.item || "<li><a class='page' href='#'></a></li>",
      valueNames: ['page', 'dotted'],
      searchClass: 'pagination-search-that-is-not-supposed-to-exist',
      sortClass: 'pagination-sort-that-is-not-supposed-to-exist'
    });
    events.bind(pagingList.listContainer, 'click', function (e) {
      var target = e.target || e.srcElement,
          page = list.utils.getAttribute(target, 'data-page'),
          i = list.utils.getAttribute(target, 'data-i');

      if (i) {
        list.show((i - 1) * page + 1, page);
      }
    });
    list.on('updated', function () {
      refresh(pagingList, options);
    });
    refresh(pagingList, options);
  };
};

/***/ }),

/***/ 805:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = function (list) {
  var Item = __webpack_require__(423)(list);

  var getChildren = function getChildren(parent) {
    var nodes = parent.childNodes,
        items = [];

    for (var i = 0, il = nodes.length; i < il; i++) {
      // Only textnodes have a data attribute
      if (nodes[i].data === undefined) {
        items.push(nodes[i]);
      }
    }

    return items;
  };

  var parse = function parse(itemElements, valueNames) {
    for (var i = 0, il = itemElements.length; i < il; i++) {
      list.items.push(new Item(valueNames, itemElements[i]));
    }
  };

  var parseAsync = function parseAsync(itemElements, valueNames) {
    var itemsToIndex = itemElements.splice(0, 50); // TODO: If < 100 items, what happens in IE etc?

    parse(itemsToIndex, valueNames);

    if (itemElements.length > 0) {
      setTimeout(function () {
        parseAsync(itemElements, valueNames);
      }, 1);
    } else {
      list.update();
      list.trigger('parseComplete');
    }
  };

  list.handlers.parseComplete = list.handlers.parseComplete || [];
  return function () {
    var itemsToIndex = getChildren(list.list),
        valueNames = list.valueNames;

    if (list.indexAsync) {
      parseAsync(itemsToIndex, valueNames);
    } else {
      parse(itemsToIndex, valueNames);
    }
  };
};

/***/ }),

/***/ 821:
/***/ (function(module) {

module.exports = function (_list) {
  var item, text, columns, searchString, customSearch;
  var prepare = {
    resetList: function resetList() {
      _list.i = 1;

      _list.templater.clear();

      customSearch = undefined;
    },
    setOptions: function setOptions(args) {
      if (args.length == 2 && args[1] instanceof Array) {
        columns = args[1];
      } else if (args.length == 2 && typeof args[1] == 'function') {
        columns = undefined;
        customSearch = args[1];
      } else if (args.length == 3) {
        columns = args[1];
        customSearch = args[2];
      } else {
        columns = undefined;
      }
    },
    setColumns: function setColumns() {
      if (_list.items.length === 0) return;

      if (columns === undefined) {
        columns = _list.searchColumns === undefined ? prepare.toArray(_list.items[0].values()) : _list.searchColumns;
      }
    },
    setSearchString: function setSearchString(s) {
      s = _list.utils.toString(s).toLowerCase().latinize();
      s = s.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&'); // Escape regular expression characters

      searchString = s;
    },
    toArray: function toArray(values) {
      var tmpColumn = [];

      for (var name in values) {
        tmpColumn.push(name);
      }

      return tmpColumn;
    }
  };
  var search = {
    list: function list() {
      // Extract quoted phrases "word1 word2" from original searchString
      // searchString is converted to lowercase by List.js
      var words = [],
          phrase,
          ss = searchString;

      while ((phrase = ss.match(/"([^"]+)"/)) !== null) {
        words.push(phrase[1]);
        ss = ss.substring(0, phrase.index) + ss.substring(phrase.index + phrase[0].length);
      } // Get remaining space-separated words (if any)


      ss = ss.trim();
      if (ss.length) words = words.concat(ss.split(/\s+/));

      for (var k = 0, kl = _list.items.length; k < kl; k++) {
        var item = _list.items[k];
        item.found = false;
        if (!words.length) continue;

        for (var i = 0, il = words.length; i < il; i++) {
          var word_found = false;

          for (var j = 0, jl = columns.length; j < jl; j++) {
            var values = item.values(),
                column = columns[j];

            if (values.hasOwnProperty(column) && values[column] !== undefined && values[column] !== null) {
              var text = typeof values[column] !== 'string' ? values[column].toString() : values[column];

              if (text.toLowerCase().indexOf(words[i]) !== -1) {
                // word found, so no need to check it against any other columns
                word_found = true;
                break;
              }
            }
          } // this word not found? no need to check any other words, the item cannot match


          if (!word_found) break;
        }

        item.found = word_found;
      }
    },
    // Removed search.item() and search.values()
    reset: function reset() {
      _list.reset.search();

      _list.searched = false;
    }
  };

  var searchMethod = function searchMethod(str) {
    _list.trigger('searchStart');

    prepare.resetList();
    prepare.setSearchString(str);
    prepare.setOptions(arguments); // str, cols|searchFunction, searchFunction

    prepare.setColumns();

    if (searchString === '') {
      search.reset();
    } else {
      _list.searched = true;

      if (customSearch) {
        customSearch(searchString, columns);
      } else {
        search.list();
      }
    }

    _list.update();

    _list.trigger('searchComplete');

    return _list.visibleItems;
  };

  _list.handlers.searchStart = _list.handlers.searchStart || [];
  _list.handlers.searchComplete = _list.handlers.searchComplete || [];

  _list.utils.events.bind(_list.utils.getByClass(_list.listContainer, _list.searchClass), 'keyup', _list.utils.events.debounce(function (e) {
    var target = e.target || e.srcElement,
        // IE have srcElement
    alreadyCleared = target.value === '' && !_list.searched;

    if (!alreadyCleared) {
      // If oninput already have resetted the list, do nothing
      searchMethod(target.value);
    }
  }, _list.searchDelay)); // Used to detect click on HTML5 clear button


  _list.utils.events.bind(_list.utils.getByClass(_list.listContainer, _list.searchClass), 'input', function (e) {
    var target = e.target || e.srcElement;

    if (target.value === '') {
      searchMethod('');
    }
  });

  return searchMethod;
};

/***/ }),

/***/ 745:
/***/ (function(module) {

module.exports = function (list) {
  var buttons = {
    els: undefined,
    clear: function clear() {
      for (var i = 0, il = buttons.els.length; i < il; i++) {
        list.utils.classes(buttons.els[i]).remove('asc');
        list.utils.classes(buttons.els[i]).remove('desc');
      }
    },
    getOrder: function getOrder(btn) {
      var predefinedOrder = list.utils.getAttribute(btn, 'data-order');

      if (predefinedOrder == 'asc' || predefinedOrder == 'desc') {
        return predefinedOrder;
      } else if (list.utils.classes(btn).has('desc')) {
        return 'asc';
      } else if (list.utils.classes(btn).has('asc')) {
        return 'desc';
      } else {
        return 'asc';
      }
    },
    getInSensitive: function getInSensitive(btn, options) {
      var insensitive = list.utils.getAttribute(btn, 'data-insensitive');

      if (insensitive === 'false') {
        options.insensitive = false;
      } else {
        options.insensitive = true;
      }
    },
    setOrder: function setOrder(options) {
      for (var i = 0, il = buttons.els.length; i < il; i++) {
        var btn = buttons.els[i];

        if (list.utils.getAttribute(btn, 'data-sort') !== options.valueName) {
          continue;
        }

        var predefinedOrder = list.utils.getAttribute(btn, 'data-order');

        if (predefinedOrder == 'asc' || predefinedOrder == 'desc') {
          if (predefinedOrder == options.order) {
            list.utils.classes(btn).add(options.order);
          }
        } else {
          list.utils.classes(btn).add(options.order);
        }
      }
    }
  };

  var sort = function sort() {
    list.trigger('sortStart');
    var options = {};
    var target = arguments[0].currentTarget || arguments[0].srcElement || undefined;

    if (target) {
      options.valueName = list.utils.getAttribute(target, 'data-sort');
      buttons.getInSensitive(target, options);
      options.order = buttons.getOrder(target);
    } else {
      options = arguments[1] || options;
      options.valueName = arguments[0];
      options.order = options.order || 'asc';
      options.insensitive = typeof options.insensitive == 'undefined' ? true : options.insensitive;
    }

    buttons.clear();
    buttons.setOrder(options); // caseInsensitive
    // alphabet

    var customSortFunction = options.sortFunction || list.sortFunction || null,
        multi = options.order === 'desc' ? -1 : 1,
        sortFunction;

    if (customSortFunction) {
      sortFunction = function sortFunction(itemA, itemB) {
        return customSortFunction(itemA, itemB, options) * multi;
      };
    } else {
      sortFunction = function sortFunction(itemA, itemB) {
        var sort = list.utils.naturalSort;
        sort.alphabet = list.alphabet || options.alphabet || undefined;

        if (!sort.alphabet && options.insensitive) {
          sort = list.utils.naturalSort.caseInsensitive;
        }

        return sort(itemA.values()[options.valueName], itemB.values()[options.valueName]) * multi;
      };
    }

    list.items.sort(sortFunction);
    list.update();
    list.trigger('sortComplete');
  }; // Add handlers


  list.handlers.sortStart = list.handlers.sortStart || [];
  list.handlers.sortComplete = list.handlers.sortComplete || [];
  buttons.els = list.utils.getByClass(list.listContainer, list.sortClass);
  list.utils.events.bind(buttons.els, 'click', sort);
  list.on('searchStart', buttons.clear);
  list.on('filterStart', buttons.clear);
  return sort;
};

/***/ }),

/***/ 561:
/***/ (function(module) {

var Templater = function Templater(list) {
  var createItem,
      templater = this;

  var init = function init() {
    var itemSource;

    if (typeof list.item === 'function') {
      createItem = function createItem(values) {
        var item = list.item(values);
        return getItemSource(item);
      };

      return;
    }

    if (typeof list.item === 'string') {
      if (list.item.indexOf('<') === -1) {
        itemSource = document.getElementById(list.item);
      } else {
        itemSource = getItemSource(list.item);
      }
    } else {
      /* If item source does not exists, use the first item in list as
      source for new items */
      itemSource = getFirstListItem();
    }

    if (!itemSource) {
      throw new Error("The list needs to have at least one item on init otherwise you'll have to add a template.");
    }

    itemSource = createCleanTemplateItem(itemSource, list.valueNames);

    createItem = function createItem() {
      return itemSource.cloneNode(true);
    };
  };

  var createCleanTemplateItem = function createCleanTemplateItem(templateNode, valueNames) {
    var el = templateNode.cloneNode(true);
    el.removeAttribute('id');

    for (var i = 0, il = valueNames.length; i < il; i++) {
      var elm = undefined,
          valueName = valueNames[i];

      if (valueName.data) {
        for (var j = 0, jl = valueName.data.length; j < jl; j++) {
          el.setAttribute('data-' + valueName.data[j], '');
        }
      } else if (valueName.attr && valueName.name) {
        elm = list.utils.getByClass(el, valueName.name, true);

        if (elm) {
          elm.setAttribute(valueName.attr, '');
        }
      } else {
        elm = list.utils.getByClass(el, valueName, true);

        if (elm) {
          elm.innerHTML = '';
        }
      }
    }

    return el;
  };

  var getFirstListItem = function getFirstListItem() {
    var nodes = list.list.childNodes;

    for (var i = 0, il = nodes.length; i < il; i++) {
      // Only textnodes have a data attribute
      if (nodes[i].data === undefined) {
        return nodes[i].cloneNode(true);
      }
    }

    return undefined;
  };

  var getItemSource = function getItemSource(itemHTML) {
    if (typeof itemHTML !== 'string') return undefined;

    if (/<tr[\s>]/g.exec(itemHTML)) {
      var tbody = document.createElement('tbody');
      tbody.innerHTML = itemHTML;
      return tbody.firstElementChild;
    } else if (itemHTML.indexOf('<') !== -1) {
      var div = document.createElement('div');
      div.innerHTML = itemHTML;
      return div.firstElementChild;
    }

    return undefined;
  };

  var getValueName = function getValueName(name) {
    for (var i = 0, il = list.valueNames.length; i < il; i++) {
      var valueName = list.valueNames[i];

      if (valueName.data) {
        var data = valueName.data;

        for (var j = 0, jl = data.length; j < jl; j++) {
          if (data[j] === name) {
            return {
              data: name
            };
          }
        }
      } else if (valueName.attr && valueName.name && valueName.name == name) {
        return valueName;
      } else if (valueName === name) {
        return name;
      }
    }
  };

  var setValue = function setValue(item, name, value) {
    var elm = undefined,
        valueName = getValueName(name);
    if (!valueName) return;

    if (valueName.data) {
      item.elm.setAttribute('data-' + valueName.data, value);
    } else if (valueName.attr && valueName.name) {
      elm = list.utils.getByClass(item.elm, valueName.name, true);

      if (elm) {
        elm.setAttribute(valueName.attr, value);
      }
    } else {
      elm = list.utils.getByClass(item.elm, valueName, true);

      if (elm) {
        elm.innerHTML = value;
      }
    }
  };

  this.get = function (item, valueNames) {
    templater.create(item);
    var values = {};

    for (var i = 0, il = valueNames.length; i < il; i++) {
      var elm = undefined,
          valueName = valueNames[i];

      if (valueName.data) {
        for (var j = 0, jl = valueName.data.length; j < jl; j++) {
          values[valueName.data[j]] = list.utils.getAttribute(item.elm, 'data-' + valueName.data[j]);
        }
      } else if (valueName.attr && valueName.name) {
        elm = list.utils.getByClass(item.elm, valueName.name, true);
        values[valueName.name] = elm ? list.utils.getAttribute(elm, valueName.attr) : '';
      } else {
        elm = list.utils.getByClass(item.elm, valueName, true);
        values[valueName] = elm ? elm.innerHTML : '';
      }
    }

    return values;
  };

  this.set = function (item, values) {
    if (!templater.create(item)) {
      for (var v in values) {
        if (values.hasOwnProperty(v)) {
          setValue(item, v, values[v]);
        }
      }
    }
  };

  this.create = function (item) {
    if (item.elm !== undefined) {
      return false;
    }

    item.elm = createItem(item.values());
    templater.set(item, item.values());
    return true;
  };

  this.remove = function (item) {
    if (item.elm.parentNode === list.list) {
      list.list.removeChild(item.elm);
    }
  };

  this.show = function (item) {
    templater.create(item);
    list.list.appendChild(item.elm);
  };

  this.hide = function (item) {
    if (item.elm !== undefined && item.elm.parentNode === list.list) {
      list.list.removeChild(item.elm);
    }
  };

  this.clear = function () {
    /* .innerHTML = ''; fucks up IE */
    if (list.list.hasChildNodes()) {
      while (list.list.childNodes.length >= 1) {
        list.list.removeChild(list.list.firstChild);
      }
    }
  };

  init();
};

module.exports = function (list) {
  return new Templater(list);
};

/***/ }),

/***/ 700:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var index = __webpack_require__(557);
/**
 * Whitespace regexp.
 */


var re = /\s+/;
/**
 * toString reference.
 */

var toString = Object.prototype.toString;
/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function (el) {
  return new ClassList(el);
};
/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */


function ClassList(el) {
  if (!el || !el.nodeType) {
    throw new Error('A DOM element reference is required');
  }

  this.el = el;
  this.list = el.classList;
}
/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */


ClassList.prototype.add = function (name) {
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  } // fallback


  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};
/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */


ClassList.prototype.remove = function (name) {
  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  } // fallback


  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};
/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */


ClassList.prototype.toggle = function (name, force) {
  // classList
  if (this.list) {
    if ('undefined' !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }

    return this;
  } // fallback


  if ('undefined' !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};
/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */


ClassList.prototype.array = function () {
  var className = this.el.getAttribute('class') || '';
  var str = className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};
/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */


ClassList.prototype.has = ClassList.prototype.contains = function (name) {
  return this.list ? this.list.contains(name) : !!~index(this.array(), name);
};

/***/ }),

/***/ 95:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '',
    toArray = __webpack_require__(117);
/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el, NodeList, HTMLCollection or Array
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */


exports.bind = function (el, type, fn, capture) {
  el = toArray(el);

  for (var i = 0, il = el.length; i < il; i++) {
    el[i][bind](prefix + type, fn, capture || false);
  }
};
/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el, NodeList, HTMLCollection or Array
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */


exports.unbind = function (el, type, fn, capture) {
  el = toArray(el);

  for (var i = 0, il = el.length; i < il; i++) {
    el[i][unbind](prefix + type, fn, capture || false);
  }
};
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * `wait` milliseconds. If `immediate` is true, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @param {Function} fn
 * @param {Integer} wait
 * @param {Boolean} immediate
 * @api public
 */


exports.debounce = function (fn, wait, immediate) {
  var timeout;
  return wait ? function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) fn.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fn.apply(context, args);
  } : fn;
};

/***/ }),

/***/ 114:
/***/ (function(module) {

/*
 * Source: https://github.com/segmentio/extend
 */
module.exports = function extend(object) {
  // Takes an unlimited number of extenders.
  var args = Array.prototype.slice.call(arguments, 1); // For each extender, copy their properties on our object.

  for (var i = 0, source; source = args[i]; i++) {
    if (!source) continue;

    for (var property in source) {
      object[property] = source[property];
    }
  }

  return object;
};

/***/ }),

/***/ 180:
/***/ (function(module) {

module.exports = function (text, pattern, options) {
  // Aproximately where in the text is the pattern expected to be found?
  var Match_Location = options.location || 0; //Determines how close the match must be to the fuzzy location (specified above). An exact letter match which is 'distance' characters away from the fuzzy location would score as a complete mismatch. A distance of '0' requires the match be at the exact location specified, a threshold of '1000' would require a perfect match to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.

  var Match_Distance = options.distance || 100; // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match (of both letters and location), a threshold of '1.0' would match anything.

  var Match_Threshold = options.threshold || 0.4;
  if (pattern === text) return true; // Exact match

  if (pattern.length > 32) return false; // This algorithm cannot be used
  // Set starting location at beginning text and initialise the alphabet.

  var loc = Match_Location,
      s = function () {
    var q = {},
        i;

    for (i = 0; i < pattern.length; i++) {
      q[pattern.charAt(i)] = 0;
    }

    for (i = 0; i < pattern.length; i++) {
      q[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
    }

    return q;
  }(); // Compute and return the score for a match with e errors and x location.
  // Accesses loc and pattern through being a closure.


  function match_bitapScore_(e, x) {
    var accuracy = e / pattern.length,
        proximity = Math.abs(loc - x);

    if (!Match_Distance) {
      // Dodge divide by zero error.
      return proximity ? 1.0 : accuracy;
    }

    return accuracy + proximity / Match_Distance;
  }

  var score_threshold = Match_Threshold,
      // Highest score beyond which we give up.
  best_loc = text.indexOf(pattern, loc); // Is there a nearby exact match? (speedup)

  if (best_loc != -1) {
    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold); // What about in the other direction? (speedup)

    best_loc = text.lastIndexOf(pattern, loc + pattern.length);

    if (best_loc != -1) {
      score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
    }
  } // Initialise the bit arrays.


  var matchmask = 1 << pattern.length - 1;
  best_loc = -1;
  var bin_min, bin_mid;
  var bin_max = pattern.length + text.length;
  var last_rd;

  for (var d = 0; d < pattern.length; d++) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from 'loc' we can stray at this
    // error level.
    bin_min = 0;
    bin_mid = bin_max;

    while (bin_min < bin_mid) {
      if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
        bin_min = bin_mid;
      } else {
        bin_max = bin_mid;
      }

      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
    } // Use the result from this iteration as the maximum for the next.


    bin_max = bin_mid;
    var start = Math.max(1, loc - bin_mid + 1);
    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
    var rd = Array(finish + 2);
    rd[finish + 1] = (1 << d) - 1;

    for (var j = finish; j >= start; j--) {
      // The alphabet (s) is a sparse hash, so the following line generates
      // warnings.
      var charMatch = s[text.charAt(j - 1)];

      if (d === 0) {
        // First pass: exact match.
        rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
      } else {
        // Subsequent passes: fuzzy match.
        rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
      }

      if (rd[j] & matchmask) {
        var score = match_bitapScore_(d, j - 1); // This match will almost certainly be better than any existing match.
        // But check anyway.

        if (score <= score_threshold) {
          // Told you so.
          score_threshold = score;
          best_loc = j - 1;

          if (best_loc > loc) {
            // When passing loc, don't exceed our current distance from loc.
            start = Math.max(1, 2 * loc - best_loc);
          } else {
            // Already passed loc, downhill from here on in.
            break;
          }
        }
      }
    } // No hope for a (better) match at greater error levels.


    if (match_bitapScore_(d + 1, loc) > score_threshold) {
      break;
    }

    last_rd = rd;
  }

  return best_loc < 0 ? false : true;
};

/***/ }),

/***/ 826:
/***/ (function(module) {

/**
 * A cross-browser implementation of getAttribute.
 * Source found here: http://stackoverflow.com/a/3755343/361337 written by Vivin Paliath
 *
 * Return the value for `attr` at `element`.
 *
 * @param {Element} el
 * @param {String} attr
 * @api public
 */
module.exports = function (el, attr) {
  var result = el.getAttribute && el.getAttribute(attr) || null;

  if (!result) {
    var attrs = el.attributes;
    var length = attrs.length;

    for (var i = 0; i < length; i++) {
      if (attrs[i] !== undefined) {
        if (attrs[i].nodeName === attr) {
          result = attrs[i].nodeValue;
        }
      }
    }
  }

  return result;
};

/***/ }),

/***/ 153:
/***/ (function(module) {

/**
 * A cross-browser implementation of getElementsByClass.
 * Heavily based on Dustin Diaz's function: http://dustindiaz.com/getelementsbyclass.
 *
 * Find all elements with class `className` inside `container`.
 * Use `single = true` to increase performance in older browsers
 * when only one element is needed.
 *
 * @param {String} className
 * @param {Element} container
 * @param {Boolean} single
 * @api public
 */
var getElementsByClassName = function getElementsByClassName(container, className, single) {
  if (single) {
    return container.getElementsByClassName(className)[0];
  } else {
    return container.getElementsByClassName(className);
  }
};

var querySelector = function querySelector(container, className, single) {
  className = '.' + className;

  if (single) {
    return container.querySelector(className);
  } else {
    return container.querySelectorAll(className);
  }
};

var polyfill = function polyfill(container, className, single) {
  var classElements = [],
      tag = '*';
  var els = container.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp('(^|\\s)' + className + '(\\s|$)');

  for (var i = 0, j = 0; i < elsLen; i++) {
    if (pattern.test(els[i].className)) {
      if (single) {
        return els[i];
      } else {
        classElements[j] = els[i];
        j++;
      }
    }
  }

  return classElements;
};

module.exports = function () {
  return function (container, className, single, options) {
    options = options || {};

    if (options.test && options.getElementsByClassName || !options.test && document.getElementsByClassName) {
      return getElementsByClassName(container, className, single);
    } else if (options.test && options.querySelector || !options.test && document.querySelector) {
      return querySelector(container, className, single);
    } else {
      return polyfill(container, className, single);
    }
  };
}();

/***/ }),

/***/ 557:
/***/ (function(module) {

var indexOf = [].indexOf;

module.exports = function (arr, obj) {
  if (indexOf) return arr.indexOf(obj);

  for (var i = 0, il = arr.length; i < il; ++i) {
    if (arr[i] === obj) return i;
  }

  return -1;
};

/***/ }),

/***/ 117:
/***/ (function(module) {

/**
 * Source: https://github.com/timoxley/to-array
 *
 * Convert an array-like object into an `Array`.
 * If `collection` is already an `Array`, then will return a clone of `collection`.
 *
 * @param {Array | Mixed} collection An `Array` or array-like object to convert e.g. `arguments` or `NodeList`
 * @return {Array} Naive conversion of `collection` to a new `Array`.
 * @api public
 */
module.exports = function toArray(collection) {
  if (typeof collection === 'undefined') return [];
  if (collection === null) return [null];
  if (collection === window) return [window];
  if (typeof collection === 'string') return [collection];
  if (isArray(collection)) return collection;
  if (typeof collection.length != 'number') return [collection];
  if (typeof collection === 'function' && collection instanceof Function) return [collection];
  var arr = [];

  for (var i = 0, il = collection.length; i < il; i++) {
    if (Object.prototype.hasOwnProperty.call(collection, i) || i in collection) {
      arr.push(collection[i]);
    }
  }

  if (!arr.length) return [];
  return arr;
};

function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

/***/ }),

/***/ 757:
/***/ (function(module) {

module.exports = function (s) {
  s = s === undefined ? '' : s;
  s = s === null ? '' : s;
  s = s.toString();
  return s;
};

/***/ }),

/***/ 915:
/***/ (function(module) {

"use strict";


var alphabet;
var alphabetIndexMap;
var alphabetIndexMapLength = 0;

function isNumberCode(code) {
  return code >= 48 && code <= 57;
}

function naturalCompare(a, b) {
  var lengthA = (a += '').length;
  var lengthB = (b += '').length;
  var aIndex = 0;
  var bIndex = 0;

  while (aIndex < lengthA && bIndex < lengthB) {
    var charCodeA = a.charCodeAt(aIndex);
    var charCodeB = b.charCodeAt(bIndex);

    if (isNumberCode(charCodeA)) {
      if (!isNumberCode(charCodeB)) {
        return charCodeA - charCodeB;
      }

      var numStartA = aIndex;
      var numStartB = bIndex;

      while (charCodeA === 48 && ++numStartA < lengthA) {
        charCodeA = a.charCodeAt(numStartA);
      }
      while (charCodeB === 48 && ++numStartB < lengthB) {
        charCodeB = b.charCodeAt(numStartB);
      }

      var numEndA = numStartA;
      var numEndB = numStartB;

      while (numEndA < lengthA && isNumberCode(a.charCodeAt(numEndA))) {
        ++numEndA;
      }
      while (numEndB < lengthB && isNumberCode(b.charCodeAt(numEndB))) {
        ++numEndB;
      }

      var difference = numEndA - numStartA - numEndB + numStartB; // numA length - numB length
      if (difference) {
        return difference;
      }

      while (numStartA < numEndA) {
        difference = a.charCodeAt(numStartA++) - b.charCodeAt(numStartB++);
        if (difference) {
          return difference;
        }
      }

      aIndex = numEndA;
      bIndex = numEndB;
      continue;
    }

    if (charCodeA !== charCodeB) {
      if (
        charCodeA < alphabetIndexMapLength &&
        charCodeB < alphabetIndexMapLength &&
        alphabetIndexMap[charCodeA] !== -1 &&
        alphabetIndexMap[charCodeB] !== -1
      ) {
        return alphabetIndexMap[charCodeA] - alphabetIndexMap[charCodeB];
      }

      return charCodeA - charCodeB;
    }

    ++aIndex;
    ++bIndex;
  }

  if (aIndex >= lengthA && bIndex < lengthB && lengthA >= lengthB) {
    return -1;
  }

  if (bIndex >= lengthB && aIndex < lengthA && lengthB >= lengthA) {
    return 1;
  }

  return lengthA - lengthB;
}

naturalCompare.caseInsensitive = naturalCompare.i = function(a, b) {
  return naturalCompare(('' + a).toLowerCase(), ('' + b).toLowerCase());
};

Object.defineProperties(naturalCompare, {
  alphabet: {
    get: function() {
      return alphabet;
    },

    set: function(value) {
      alphabet = value;
      alphabetIndexMap = [];

      var i = 0;

      if (alphabet) {
        for (; i < alphabet.length; i++) {
          alphabetIndexMap[alphabet.charCodeAt(i)] = i;
        }
      }

      alphabetIndexMapLength = alphabetIndexMap.length;

      for (i = 0; i < alphabetIndexMapLength; i++) {
        if (alphabetIndexMap[i] === undefined) {
          alphabetIndexMap[i] = -1;
        }
      }
    },
  },
});

module.exports = naturalCompare;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(352);
/******/ 	List = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=list.js.map
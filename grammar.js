; (function(g) {
  'use strict';

  function merge() {
    var target = arguments[0];
    
    Array.prototype.slice.call(arguments, 1).forEach(function(obj) {
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          target[p] = obj[p];
        }
      }
    });
    
    return target;
  }

  var Grammar = g.Grammar || {};
  
  var defaultConfig = {
    bindToNatives: false,
    nativesPrefix: 'gr'
  };
  
  Grammar.config = {};
  
  merge(Grammar.config, defaultConfig, g.GrammarConfig || {});
  
  g.GrammarConfig = undefined;
  
  var toLowerCase = Function.prototype.call.bind(String.prototype.toLowerCase);
  var toUpperCase = Function.prototype.call.bind(String.prototype.toUpperCase);
  
  function firstToUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  }

  function firstToLowerCase(str) {
    return str.charAt(0).toLowerCase() + str.substr(1);
  }
  
  function fromCamelCase(str) {
    return str.split(/(?=[A-Z])/);
  }

  function fromSnakeCase(str) {
    return str.split('_');
  }

  function fromSlug(str) {
    return str.split('-');
  }

  function toStudlyCaps(words) {
    return words.map(firstToUpperCase).join('');
  }

  function toCamelCase(words) {
    return firstToLowerCase(toStudlyCaps(words));
  }

  function toSnakeCase(words) {
    return words.map(toLowerCase).join('_');
  }

  function toSlug(words) {
    return words.map(toLowerCase).join('-');
  }

  function words(str) {
    return str.split(/[\s+]/);
  }

  // function sentences(str) {
  //   return str.split(/(?<=[.!?])\s+/);
  // }

  function pluralize(zero, one, many, count) {
    if (count < 0) {
      throw new RangeError('count must be a non-negative number');
    }
    
    switch (parseInt(count, 10)) {
      case 0: return zero.replace('{0}', count); break;
      case 1: return one.replace('{0}', count); break;
      default: return many.replace('{0}', count); break;
    }
  }

  Grammar.fromStudlyCaps = fromCamelCase;
  Grammar.fromCamelCase = fromCamelCase;
  Grammar.fromSnakeCase = fromSnakeCase;
  Grammar.fromSlug = fromSlug;
  Grammar.toStudlyCaps = toStudlyCaps;
  Grammar.toCamelCase = toCamelCase;
  Grammar.toSnakeCase = toSnakeCase;
  Grammar.toSlug = toSlug;
  Grammar.words = words;
  // Grammar.sentences = sentences;
  Grammar.pluralize = pluralize;
  
  if (Grammar.config.bindToNatives) {
    var stringMethods = ['fromStudlyCaps', 'fromCamelCase', 'fromSnakeCase', 'fromSlug', 'words'];
    var arrayMethods = ['toStudlyCaps', 'toCamelCase', 'toSnakeCase', 'toSlug'];
    // var numberMethods = ['pluralize'];
    
    var bindToNatives = function bindToNatives(object, fns, prefix) {
      fns.forEach(function(fn) {
        var fnName = prefix ? prefix + firstToUpperCase(fn) : fn;

        if (object.prototype[fnName] === undefined) {
          object.prototype[fnName] = function() {
            return Grammar[fn](this);
          }
        }
      });
    }
    
    bindToNatives(String, stringMethods, Grammar.config.nativesPrefix);
    bindToNatives(Array, arrayMethods, Grammar.config.nativesPrefix);

    var fnPluralize = Grammar.config.nativesPrefix ? Grammar.config.nativesPrefix + firstToUpperCase('pluralize') : 'pluralize';
    if (Number.prototype[fnPluralize] === undefined) {
      Number.prototype[fnPluralize] = function(zero, one, many) {
        return Grammar['pluralize'](zero, one, many, this);
      }
    }
  }
  
  if (!('Grammar' in g)) {
    g.Grammar = Grammar;
  }
})(this);
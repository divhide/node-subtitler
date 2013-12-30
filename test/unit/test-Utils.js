var test = require('utest');
var utils = require('../../lib/Utils.js');
var assert = require('assert');

test('Utils#getOpenSubtitlesLanguage', {
  'takes a valid openSubtitlesLanguage acronym and returns itself': function(){
  	var key = 'pob';
  	var returnedKey = utils.getOpenSubtitlesLanguage(key);
  	assert.equal(key, returnedKey);
  },
  'takes the iso acronym and return the openSubtitlesLanguage acronym': function(){
  	var key = 'pt-BR';
  	var returnedKey = utils.getOpenSubtitlesLanguage(key);
  	assert.equal('pob', returnedKey);
  }
});
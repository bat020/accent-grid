// Accent Grid v1.1 options.js
// script code for options.html
// written by bat020@gmail.com, last updated 26 April 2013

// loads user preferences from localStorage, defaults them if that can't be found
function restoreOptions() {
	var storedValues = [], inputList = document.getElementsByName('inputbox');
	if (!localStorage.gridValues) { defaultOptions(); }
	storedValues = JSON.parse(localStorage.gridValues);
	for (var i = 0; i < inputList.length; i++) { inputList[i].value = storedValues[i]; }
	setStatus('Options loaded.');
}

// attaches clickHandler() event listener to each input box
function addListenersToInputs() {
	var inputList = document.getElementsByName('inputbox');
	for (var i = 0; i < inputList.length; i++) {
		inputList[i].addEventListener('click', clickHandler, false);
	}
}

// warns user of unsaved changes
function clickHandler() {
	setStatus('Changes not yet saved.');
}

// writes preferences to localStorage if they are valid
function saveOptions() {
	var valuesToStore = [], inputList = document.getElementsByName('inputbox');
	for (var i = 0; i < inputList.length; i++) {
		if (!checkEntity(inputList[i].value)) {
			inputList[i].focus();
			document.execCommand('selectAll');
			setStatus('Error. Please enter a valid HTML entity or a single character.');
			return;
		}
	}
	for (i = 0; i < inputList.length; i++) {
		valuesToStore[i] = inputList[i].value;
	}
	localStorage.gridValues = JSON.stringify(valuesToStore);
	setStatus('Options successfully saved.');
}

// checks that a string is either a single character or a valid HTML entity
function checkEntity(string) {
	var dummy, bool = true;
	if (string.length !== 1) { 
		dummy = document.createElement('div');
		dummy.innerHTML = string;
		bool = (dummy.textContent.length === 1);
	}
	return bool;
}

// sets preferences to defaults, writes them to localStorage
function defaultOptions() {
	var defaultValues = [
		'&agrave;', '&acirc;', '&egrave;', '&ecirc;', 
		'&ccedil;', '&auml;', '&euml;', '&iuml;', 
		'&ouml;', '&uuml;', '&lsquo;', '&rsquo;', 
		'&ndash;', '&szlig;', '&bull;', '&hellip;',
		'&Agrave;', '&Acirc;', '&Egrave;', '&Ecirc;', 
		'&Ccedil;', '&Auml;', '&Euml;', '&Iuml;', 
		'&Ouml;', '&Uuml;', '&ldquo;', '&rdquo;', 
		'&mdash;', '&copy;', '&#9679;', '&sect;' 
	];
	var inputList = document.getElementsByName('inputbox');
	for (var i = 0; i < inputList.length; i++) {
		inputList[i].value = defaultValues[i];
	}
	localStorage.gridValues = JSON.stringify(defaultValues);
	setStatus('Default options restored.');
}

// closes the options page
function closeTab() {
	window.close();
}

// sets the status message
function setStatus(string) {
	document.getElementById('status').innerHTML = string;
}

// main script
document.addEventListener('DOMContentLoaded', restoreOptions);
addListenersToInputs();
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('defaults').addEventListener('click', defaultOptions);
document.getElementById('close').addEventListener('click', closeTab);

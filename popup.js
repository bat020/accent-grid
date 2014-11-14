// Accent Grid v1.1 popup.js
// script code for popup.html
// written by bat020@gmail.com, last updated 26 April 2013

// copies button label to clipboard via background.html, then closes popup window
function pressButton(button) {
	var bg = chrome.extension.getBackgroundPage();
	var bgBox = bg.document.getElementById('textbox');
	bgBox.value = button.textContent;
	bgBox.focus();
	bgBox.select();
	bg.document.execCommand('copy');
	window.close();
}

// presses button on click
function clickHandler(event) {
	pressButton(event.target);
}

// changes button labels if shift key is down, changes button class if button key is down
function keydownHandler(event) {
	if (event.which === 16) { setButtonLabels('shift'); }
	var button = checkButtonKey(event.which);
	if (button !== null) { button.className = 'pressed'; }
}

// resets button labels if shift key is up, presses button class if button key is up
function keyupHandler(event) {
	if (event.which === 16) { setButtonLabels('normal'); }
	var button = checkButtonKey(event.which);
	if (button !== null) { pressButton(button);	}
}

// switches between normal and shifted button labels
function setButtonLabels(labelSet) {
	var labelList, buttonList = document.getElementsByTagName('button'), i;
	if (localStorage.gridValues) {
		labelList = JSON.parse(localStorage.gridValues);
	} else {
		labelList = [
			'&agrave;', '&acirc;', '&egrave;', '&ecirc;',
			'&ccedil;', '&auml;', '&euml;', '&iuml;',
			'&ouml;', '&uuml;', '&lsquo;', '&rsquo;',
			'&ndash;', '&szlig;', '&bull;', '&hellip;',
			'&Agrave;', '&Acirc;', '&Egrave;', '&Ecirc;',
			'&Ccedil;', '&Auml;', '&Euml;', '&Iuml;',
			'&Ouml;', '&Uuml;', '&ldquo;', '&rdquo;',
			'&mdash;', '&copy;', '&#9679;', '&sect;'
		];
	}
	if (labelSet === 'shift') {
		for (i = 0; i < buttonList.length; i++) {
			buttonList[i].innerHTML = labelList[i + 16];
		}
	} else {
		for (i = 0; i < buttonList.length; i++) {
			buttonList[i].innerHTML = labelList[i];
		}
	}
}

// returns button corresponding to key code, or null otherwise
function checkButtonKey(keyCode) {
	var button = null, buttonList = document.getElementsByTagName('button');
	var codeList = [
		49, 50, 51, 52,
		81, 87, 69, 82,
		65, 83, 68, 70,
		90, 88, 67, 86
		];
	for (var i = 0; i < codeList.length; i++) {
		if (keyCode === codeList[i]) { button = buttonList[i]; }
	}
	return button;
}

// attaches clickHandler() event listener to each button
function addListenersToButtons() {
	var buttonList = document.getElementsByTagName('button');
	for (var i = 0; i < buttonList.length; i++) {
		buttonList[i].addEventListener('click', clickHandler, false);
	}
}

// main script executed when popup loads
document.addEventListener('DOMContentLoaded', function () {
	document.addEventListener('keydown', keydownHandler, true);
	document.addEventListener('keyup', keyupHandler, true);
	addListenersToButtons();
	setButtonLabels(document.getElementsByTagName('button'), 'normal');
});

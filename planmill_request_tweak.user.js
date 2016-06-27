// ==UserScript==
// @name         Planmill Request Tweak
// @namespace    Planmill
// @description  Customizations to PlanMill UI
// @downloadURL  https://github.com/KimeT/PlanMill-Tweaks/raw/master/planmill_request_tweak.user.js
// @icon         https://online.planmill.com/pmtrial/generic/login/favicon.ico
// @match        https://online.planmill.com/*/index.jsp?category=Sales%20management.Requests
// @version      0.0.3
// @author       KimeT
// @homepage     https://github.com/KimeT/PlanMill-Tweaks
// @grant        none
// ==/UserScript==


// FUNCTIONS

// SET DIM ON NON-ACCOUNT ROWS
function setDimNonAccountRows() {
	var yIndex;
	var opacity = $('#tools-dim-nonaccount-rows').hasClass('ui-state-active') ? '0.5' : '';

	// Find Account column
	$('#data table th a').each(function () {
		if ($(this).text() === "Yritys" || $(this).text() === "Account" || $(this).text() === "Firma") {
			yIndex = $(this).closest('th').index(); return false;
		}
	});

	// Set opacity to rows, where Account column is empty
	if (yIndex !== undefined) {
		$('#data table tr').each(function () {
			if ($(this).children('td:nth(' + yIndex + ')').text() === '') {
				$(this).closest('tr').css('opacity', opacity);
			}
		});
	}
}

// TOGGLE DIM BUTTON STATE
function toggleDimButtonState() {
	$('#tools-dim-nonaccount-rows').toggleClass('ui-state-active');
	setDimNonAccountRows();
}

// ADD DIM BUTTON
function addDimButton() {
	var headerText = $('#top-bar-subject').text().trim().toLowerCase();
	var btnTexts = { fi: 'Yrityksettömien rivien himmennys', en: 'Dimming of accountless rows' };
	var $div = $('<div>');
	var $btn = $('<button type="button" id="tools-dim-nonaccount-rows" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button"></button>');
	var $span = $('<span class="ui-button-icon-primary ui-icon ui-icon-cancel"></span>');
	$btn.append($span);
	$span = $('<span class="ui-button-text"></span>');
	switch (headerText) {
		case 'palvelupyynnöt':
			$span.text(btnTexts.fi);
			break;
		case 'requests':
		default:
			$span.text(btnTexts.en);
	}
	$btn.append($span);

	$btn.click(toggleDimButtonState);
	$btn.hover(
		function () {
			$(this).addClass('ui-state-hover');
		}, function () {
			$(this).removeClass('ui-state-hover');
		}
	);

	$div.append($btn);
	$('#tools-content-left-links').append($div);
}

// ACTIONS
addDimButton();
$(document).ajaxComplete(setDimNonAccountRows);

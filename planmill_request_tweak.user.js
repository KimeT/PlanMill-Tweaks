// ==UserScript==
// @name         Planmill Request Tweak
// @namespace    Planmill
// @description  Customizations to PlanMill UI
// @downloadURL  https://github.com/KimeT/PlanMill-Tweaks/raw/master/planmill_request_tweak.user.js
// @icon         https://online.planmill.com/javerdel/generic/pictures/favicon.ico
// @match        https://online.planmill.com/javerdel/index.jsp?category=Sales%20management.Requests
// @version      0.0.2
// @author       KimeT
// @homepage     https://github.com/KimeT/PlanMill-Tweaks
// @grant        none
// ==/UserScript==


// FUNCTIONS

// DIM NON-ACCOUNT ROWS
function dimNonAccountRows() {
	var yIndex;
	$('#data table th a').each(function () {
		if ($(this).text() === "Yritys" || $(this).text() === "Account" || $(this).text() === "Firma") {
			yIndex = $(this).closest('th').index(); return false;
		}
	});

	if (yIndex !== undefined) {
		$('#data table tr').each(function () {
			if ($(this).children('td:nth(' + yIndex + ')').text() === '') {
				$(this).closest('tr').css('opacity', '0.5');
			}
		});
	}
}

// UNDIM NON-ACCOUNT ROWS
function undimNonAccountRows() {
	var yIndex;
	$('#data table th a').each(function () {
		if ($(this).text() === "Yritys" || $(this).text() === "Account" || $(this).text() === "Firma") {
			yIndex = $(this).closest('th').index(); return false;
		}
	});

	if (yIndex !== undefined) {
		$('#data table tr').each(function () {
			if ($(this).children('td:nth(' + yIndex + ')').text() === '') {
				$(this).closest('tr').css('opacity', '');
			}
		});
	}
}

// ADD DIM BUTTON
function addDimButton() {
	var $pDiv = $('<div>');
	var $btn = $('<button type="button" id="tools-dim-nonaccount-rows" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button"></button>');
	$btn.append($('<span class="ui-button-icon-primary ui-icon ui-icon-cancel"></span>'));
	$btn.append($('<span class="ui-button-text">Himmennä yrityksettömät rivit</span>'));
	$btn.click(dimNonAccountRows);
	$btn.click(function () {
		$(this).toggleClass('ui-state-active');
  });
	$btn.hover(
		function () {
			$(this).addClass('ui-state-hover');
		}, function () {
			$(this).removeClass('ui-state-hover');
  	}
	);

	$pDiv.append($btn);
	$('#tools-content-left-links').append($pDiv);
}

// ACTIONS
//addDimButton();
dimNonAccountRows();

//$('#paging-pages button').on("click", dimNonAccountRows);

//$('#paging-pages button').on("click", function () { alert('Clicked'); });

/*$(document).ajaxComplete(function(event, request, settings) {
	alert('Ajax completed!');
});*/

$(document).ajaxComplete(dimNonAccountRows);

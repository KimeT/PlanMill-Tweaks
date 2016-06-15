// ==UserScript==
// @name         Planmill Request Tweak
// @namespace    Planmill
// @description  Customizations to PlanMill UI
// @downloadURL  https://github.com/KimeT/PlanMill-Tweaks/raw/master/planmill_request_tweak.user.js
// @icon         https://tv.dna.fi/images/matkatv/favicon.ico
// @match        https://online.planmill.com/javerdel/index.jsp?category=Sales%20management.Requests
// @version      0.0.1
// @author       KimeT
// @homepage     https://github.com/KimeT/PlanMill-Tweaks
// @grant        none
// ==/UserScript==


// ADD OPACITY BUTTON
var yIndex;
$('#data table th a').each(function () {
  if ($(this).text() === "Yritys" || $(this).text() === "Account" || $(this).text() === "Firma") {
    yIndex = $(this).closest('th').index(); return false;
  }
});

if (yIndex !== undefined) {
	$('#data table tr').each(function () {
    if ($(this).children('td:nth(' + yIndex + ')').text() == '') {
      $(this).closest('tr').css('opacity', '0.5');
    }
  });
}

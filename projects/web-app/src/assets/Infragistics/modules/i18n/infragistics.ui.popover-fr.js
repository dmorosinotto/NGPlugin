﻿/*!@license
* Infragistics.Web.ClientUI Popover localization resources 14.2.20142.1024
*
* Copyright (c) 2011-2014 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global jQuery */
(function ($) {
$.ig = $.ig || {};

if (!$.ig.Popover) {
	$.ig.Popover = {};

	$.extend( $.ig.Popover, {
		locale: {
			popoverOptionChangeNotSupported: "La modification de l'option suivante après l'initialisation de FinPopig n'est pas prise en charge :",
			popoverShowMethodWithoutTarget: "Le paramètre target de la fonction show est obligatoire lorsque l'option selectors est utilisée"
		}
	});

}
})(jQuery);
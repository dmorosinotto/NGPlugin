﻿/*!@license
* Infragistics.Web.ClientUI Zoombar localization resources 14.2.20142.1024
*
* Copyright (c) 2011-2014 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global jQuery */
(function ($) {
$.ig = $.ig || {};

if (!$.ig.Zoombar) {
	$.ig.Zoombar = {};

	$.extend($.ig.Zoombar, {

	    locale: {
	        zoombarTargetNotSpecified: "igZoombar a besoin d'une cible valide à laquelle s'attacher.",
	        zoombarTypeNotSupported: "Le type de widget auquel la barre de zoom tente de s'attacher n'est pas pris en charge.",
	        optionChangeNotSupported: "La modification de l'option suivante après la création de igZoombar n'est pas prise en charge :"
		}
	});

}
})(jQuery);
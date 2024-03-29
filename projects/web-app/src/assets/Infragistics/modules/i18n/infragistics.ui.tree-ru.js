﻿/*!@license
* Infragistics.Web.ClientUI Tree localization resources 14.2.20142.1024
*
* Copyright (c) 2011-2014 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.Tree) {
	    $.ig.Tree = {};

	    $.extend($.ig.Tree, {
		    locale: {
			    invalidArgumentType: 'Неправильный тип аргумента.',
			    errorOnRequest: 'Произошла ошибка при запросе данных: ',
			    noDataSourceUrl: 'Необходимо установить опцию dataSourceUrl, чтобы igTree смог произвести запрос данных с указанного URL.',
			    incorrectPath: 'Узел не найден по указанному пути: ',
			    incorrectNodeObject: 'Указанный аргумент не соответствует узлу jQuery.',
			    setOptionError: 'Динамические изменения следующей опции не поддерживаются: ',
			    moveTo: '<strong>Перенести в</strong> {0}',
			    moveBetween: '<strong>Перенести между</strong> {0} и {1}',
			    moveAfter: '<strong>Перенести после</strong> {0}',
			    moveBefore: '<strong>Перенести до</strong> {0}',
			    copyTo: '<strong>Копировать в</strong> {0}',
			    copyBetween: '<strong>Копировать между</strong> {0} и {1}',
			    copyAfter: '<strong>Копировать после</strong> {0}',
			    copyBefore: '<strong>Копировать до</strong> {0}',
			    and: 'и'
		    }
	    });

    }
})(jQuery);
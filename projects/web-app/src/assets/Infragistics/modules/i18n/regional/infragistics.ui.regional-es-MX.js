/* Mexico, Spain +*/

/*global jQuery */
(function ($) {
	$.ig = $.ig || {};
	$.ig.regional = $.ig.regional || {};
	if ($.datepicker && $.datepicker.regional) {
		$.datepicker.regional['es-MX'] = {
			closeText: 'Cerrar',
			prevText: '&#x3C;Ant',
			nextText: 'Sig&#x3E;',
			currentText: 'Hoy',
			monthNames: ['enero','febrero','marzo','abril','mayo','junio', 'julio','agosto','septiembre','octubre','noviembre','diciembre'],
			monthNamesShort: ['ene.','feb.','mar.','abr.','may.','jun.', 'jul.', 'ago.','sep.','oct.','nov.','dic.'],
			dayNames: ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],
			dayNamesShort: ['dom.','lun.','mar.','mié.','jue.','vie.','sáb.'],
			dayNamesMin: ['do.','lu.','ma.','mi.','ju.','vi.','sá.'],
			weekHeader: 'Sm',
			dateFormat: 'dd/MM/yyyy',
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
	}
	$.ig.regional['es-MX'] = {
		monthNames: ['enero','febrero','marzo','abril','mayo','junio', 'julio','agosto','septiembre','octubre','noviembre','diciembre'],
		monthNamesShort: ['ene.','feb.','mar.','abr.','may.','jun.', 'jul.', 'ago.','sep.','oct.','nov.','dic.'],
		dayNames: ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],
		dayNamesShort: ['dom.','lun.','mar.','mié.','jue.','vie.','sáb.'],
		datePattern: 'dd/MM/yyyy',
		dateLongPattern: 'dddd, dd \\de MMMM \\de yyyy',
		dateTimePattern: 'dd/MM/yyyy HH:mm',
		timePattern: 'hh:mm tt',
		timeLongPattern: 'hh:mm:ss tt',
		am: 'a. m.',
		pm: 'p. m.',
		numericNegativePattern: '-n',
		numericDecimalSeparator: '.',
		numericGroupSeparator: ',',
		numericMaxDecimals: 2,
		currencyPositivePattern: '$n',
		currencyNegativePattern: '-$n',
		currencySymbol: '$',
		currencyDecimalSeparator: '.',
		currencyGroupSeparator: ',',
		percentPositivePattern: 'n %',
		percentNegativePattern: '-n %',
		percentDecimalSeparator: '.',
		percentGroupSeparator: ','
	};
	if ($.ig.setRegionalDefault) {
		$.ig.setRegionalDefault('es-MX');
	}
})(jQuery);
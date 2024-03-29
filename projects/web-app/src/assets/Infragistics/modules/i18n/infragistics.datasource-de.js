﻿/*!@license
* Infragistics.Web.ClientUI data source localization resources 14.2.20142.1024
*
* Copyright (c) 2011-2014 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global jQuery */
(function ($) {

    $.ig = $.ig || {};

    if (!$.ig.DataSourceLocale) {
	    $.ig.DataSourceLocale = {};

	    $.extend($.ig.DataSourceLocale, {

		    locale: {
			    invalidDataSource: "Die angegebene Datenquelle ist ungültig. Es kann ein Skalar sein.",
			    unknownDataSource: "Der Datenquellentyp kann nicht bestimmt werden. Bitte angeben, ob es sich um JSON- oder XML-Daten handelt.",
			    errorParsingArrays: "Bei der Analyse der Arraydaten und der Anwendung des definierten Datenschemas ist ein Fehler aufgetreten: ",
			    errorParsingJson: "Bei der Analyse der JSON-Daten und der Anwendung des definierten Datenschemas ist ein Fehler aufgetreten: ",
			    errorParsingXml: "Bei der Analyse der XML-Daten und der Anwendung des definierten Datenschemas ist ein Fehler aufgetreten: ",
			    errorParsingHtmlTable: "Beim Extrahieren der Daten aus der HTML-Tabelle und der Anwendung des Schemas ist ein Fehler aufgetreten: ",
			    errorExpectedTbodyParameter: "tbody oder table wurde als Parameter erwartet.",
			    errorTableWithIdNotFound: "Die HTML-Tabelle mit der folgenden ID wurde nicht gefunden: ",
			    errorParsingHtmlTableNoSchema: "Bei der Analyse der Tabelle DOM ist ein Fehler aufgetreten: ",
			    errorParsingJsonNoSchema: "Bei der Analyse/Auswertung der JSON-Zeichenfolge ist ein Fehler aufgetreten: ",
			    errorParsingXmlNoSchema: "Bei der Analyse der XML-Zeichenfolge ist ein Fehler aufgetreten: ",
			    errorXmlSourceWithoutSchema: "Die angegebene Datenquelle ist ein XML-Dokument, aber es gibt kein definiertes Datenschema ($.IgDataSchema). ",
			    errorUnrecognizedFilterCondition: " Die angegebene Filterbedingung wurde nicht erkannt: ",
			    errorRemoteRequest: "Die Remoteanforderung zum Abrufen von Daten ist fehlgeschlagen: ",
			    errorSchemaMismatch: "Die Eingabedaten stimmen nicht mit dem Schema überein, das folgende Feld konnte nicht zugeordnet werden: ",
			    errorSchemaFieldCountMismatch: "Die Eingabedaten stimmen in Bezug auf die Anzahl Felder nicht mit dem Schema überein. ",
			    errorUnrecognizedResponseType: "Der Antworttyp wurde entweder nicht korrekt eingestellt oder konnte nicht automatisch erkannt werden. Bitte settings.responseDataType und/oder settings.responseContentType einstellen.",
			    hierarchicalTablesNotSupported: "Tabellen werden nicht für HierarchicalSchema unterstützt.",
			    cannotBuildTemplate: "Die jQuery-Vorlage konnte nicht erstellt werden. Es gibt keine Datensätze in der Datenquelle und keine definierten Spalten.",
			    unrecognizedCondition: "Nicht erkannte Filterbedingung im folgenden Ausdruck: ",
			    fieldMismatch: "Der folgende Ausdruck enthält ein ungültiges Feld oder eine ungültige Filterbedingung: ",
			    noSortingFields: "Es wurden keine Felder angegeben. Beim Aufrufen von sort() muss mindestens ein Feld zum Sortieren angegeben werden.",
			    filteringNoSchema: "Es wurden kein Schema / Felder angegeben. Es muss ein Schema mit Felddefinitionen und Feldtypen angegeben werden, um die Datenquelle filtern zu können."
		    }
	    });

    }
})(jQuery);

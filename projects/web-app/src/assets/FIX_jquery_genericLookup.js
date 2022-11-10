; (function ($, window, document, undefined) {
    // inizio provider per lookup
    if ($.lookupProvider != null) throw 'lookupProvider already exist';
    $.lookupProvider = (function () {
        var _computeCommonOptions = function (options) {
            var result = {};
            if (!options || ((typeof options != 'object') || !(options.constructor instanceof result.constructor)) || !options.type)
                throw 'options argument is not valid';
            result = { type: options.type, url: !options.url ? '' : options.url, urlAutocomplete: !options.urlAutocomplete ? '' : options.urlAutocomplete, maxDigit: !options.maxDigit ? '' : options.maxDigit }
            if (options.idField) result.idField = options.idField; //MD NVW HACK 10/11/2022 prima si perdeva idField passato su options e faceva sempre ovverride con logica in base a type / ora e' fixato !!!
            switch (options.type) {
                case "Aircraft":
                    result.title = 'Scegli aeromobile';
                    if (result.url == "") result.url = "/Lookup/GetAircrafts";
                    if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetAircraft";
                    if (result.maxDigit == null) result.maxDigit = 4;
                    break;
                case "Airport":
                    result.title = 'Scegli scalo';
                    if (result.url == "") result.url = "/Lookup/GetAirports";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetAirport";
                                if (result.maxDigit == null) result.maxDigit = 4;
                                break;
                case "ServiceType":
                    result.title = 'Scegli tipo servizio';
                                if (result.url == "") result.url = "/Lookup/GetServiceTypes";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetServiceType";
                                if (result.idField == null) result.idField = "Service_Type";
                                if (result.maxDigit == null) result.maxDigit = 1;
                                break;
                case "PEAgent":
                    result.title = 'Scegli l&#39;agente';
                                if (result.url == "") result.url = "/Lookup/GetPEAgents";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetPEAgent";
                                if (result.idField == null) result.idField = "Agent";
                                if (result.maxDigit == null) result.maxDigit = 6;
                                break;
                case "FlightType":
                    result.title = 'Scegli tipo volo';
                                if (result.url == "") result.url = "/Lookup/GetFlightTypes";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetFlightType";
                                if (result.idField == null) result.idField = "GA_FLIGHT_TYPE";
                                if (result.maxDigit == null) result.maxDigit = 3;
                                break;
                case "FlightTypeCommercial":
                    result.title = 'Scegli tipo volo';
                                if (result.url == "") result.url = "/Lookup/GetFlightTypesCommercial";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetFlightTypeCommercial";
                                if (result.idField == null) result.idField = "FLIGHT_TYPE";
                                if (result.maxDigit == null) result.maxDigit = 3;
                                break;
                case "FlightQualification":
                    result.title = 'Scegli qualifica volo';
                                if (result.url == "") result.url = "/Lookup/GetFlightQualifications";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetFlightQualification";
                                if (result.idField == null) result.idField = "FLIGHT_QUALIFICATION";
                                if (result.maxDigit == null) result.maxDigit = 2;
                                break;
                case "Handler":
                    result.title = 'Scegli handler';
                                if (result.url == "") result.url = "/Lookup/GetHandlers";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetHandler";
                                if (result.idField == null) result.idField = "HANDLER";
                                if (result.maxDigit == null) result.maxDigit = 2;
                                break;
                case "Registration":
                    result.title = 'Scegli registrazione';
                                if (result.url == "") result.url = "/Lookup/GetRegistrations";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetRegistration";
                                if (result.idField == null) result.idField = "Registration";
                                if (result.maxDigit == null) result.maxDigit = 10;
                                break;
                case "RemOperative":
                    result.title = 'Choose remark operative';
                                if (result.url == "") result.url = "/Lookup/GetListRemarkOperative";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetRemarkOperative";
                                if (result.idField == null) result.idField = "Note";
                                if (result.maxDigit == null) result.maxDigit = 3;
                                break;
                case "RemPublic":
                    result.title = 'Choose remark public';
                                if (result.url == "") result.url = "/Lookup/GetListRemarkPublic";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetRemarkPublic";
                                if (result.idField == null) result.idField = "Note";
                                if (result.maxDigit == null) result.maxDigit = 3;
                                break;
                case "Terminals":
                    result.title = 'Choose Terminal';
                                if (result.url == "") result.url = "/Lookup/GetTerminals";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetTerminal";
                                if (result.idField == null) result.idField = "Terminal";
                                if (result.maxDigit == null) result.maxDigit = 5;
                                break;
                case "Country":
                    result.title = 'Scegli nazione';
                                if (result.url == "") result.url = "/Lookup/GetCountries";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetCountry";
                                break;
                case "City":
                    result.title = 'Scegli citt&#224;';
                                if (result.url == "") result.url = "/Lookup/GetCities";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetCity";
                                if (result.idField == null) result.idField = "City";
                                if (result.maxDigit == null) result.maxDigit = 3;
                                break;
                case "Continent":
                    result.title = 'Scegli continente';
                                if (result.url == "") result.url = "/Lookup/GetContinents";
                                break;
                case "Language":
                    result.title = 'Scegli la lingua';
                                if (result.url == "") result.url = "/Lookup/GetLanguages";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetLanguage";
                                if (result.idField == null) result.idField = "Language";
                                if (result.maxDigit == null) result.maxDigit = 2;
                                break;
                case "TechnicalAirportType":
                    result.title = 'Scegli tipo scalo tecnico';
                                if (result.url == "") result.url = "/Lookup/GetTechnicalAirportTypes";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetTechnicalAirportType";
                                if (result.maxDigit == null) result.maxDigit = 1;
                                break;
                case "TimeBand":
                    result.title = 'Scegli fascia oraria';
                                if (result.url == "") result.url = "/Lookup/GetTimeBands";
                                break;
                case "LegType":
                    result.title = 'Scegli tipo tratta';
                                if (result.url == "") result.url = "/Lookup/GetLegTypes";
                                break;
                case "TransportType":
                    result.title = 'Tipo trasporto';
                                if (result.url == "") result.url = "/Lookup/GetTransportTypes";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetTransportType";
                                if (result.maxDigit == null) result.maxDigit = 1;
                                break;
                case "ResourceStand":
                    result.title = 'Stand';
                                if (result.url == "") result.url = "/Lookup/GetResourceStands";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetResourceStand";
                                break;
                case "ResourceGate":
                    result.title = 'Gate';
                                if (result.url == "") result.url = "/Lookup/GetResourceGates";
                                break;
                case "ResourceArrivalBelt":
                    result.title = 'Nastro arrivo';
                                if (result.url == "") result.url = "/Lookup/GetResourceArrivalBelts";
                                break;
                case "ResourceDepartureBelt":
                    result.title = 'Nastro partenza';
                                if (result.url == "") result.url = "/Lookup/GetResourceDepartureBelts";
                                break;
                case "ResourceCheckIn":
                    result.title = 'Check In';
                                if (result.url == "") result.url = "/Lookup/GetResourceCheckIn";
                                break;
                case 'IcaoCategory':
                    result.title = 'Scegli categoria Icao';
                                if (result.url == "") result.url = "/Lookup/GetIcaoCategories";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetIcaoCategory";
                                if (result.idField == null) result.idField = "Code";
                                break;
                case "Customers":
                    result.title = 'Clienti';
                                if (result.url == "") result.url = "/Lookup/GetCustomers";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetCustomer";
                                if (result.idField == null) result.idField = "Code";
                                if (result.maxDigit == null) result.maxDigit = 10;
                                break;
                case "RunWay":
                    result.title = 'RunWay';
                                if (result.url == "") result.url = "/Lookup/GetRunWays";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetRunWay";
                                if (result.idField == null) result.idField = "RunWay";
                                if (result.maxDigit == null) result.maxDigit = 3;
                                break;
                case "Airline":
                    result.title = 'Scegli vettore';
                                if (result.url == "") result.url = "/Lookup/GetAirlines";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetAirline";
                                if (result.idField == null) result.idField = "AirlineInternal";
                                if (result.maxDigit == null) result.maxDigit = 3;
                                break;
                case "AirlineMovement":
                    result.title = 'Scegli volo';
                                if (result.url == "") result.url = "/Lookup/GetAirlineMovements";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetAirlineMovement";
                                if (result.maxDigit == null) result.maxDigit = 8;
                                break;
                case "Reason":
                    result.title = 'Scegli motivazione';
                                if (result.url == "") result.url = "/Lookup/GetReasons";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetReason";
                                if (result.maxDigit == null) result.maxDigit = 2;
                                break;
                case "ResponsabilityUnit":
                    result.title = 'Scegli unit&#224; di responsabilit&#224;';
                                if (result.url == "") result.url = "/Lookup/GetResponsabilityUnits";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetResponsabilityUnit";
                                if (result.maxDigit == null) result.maxDigit = 2;
                                break;
                case "ResponsabilityType":
                    result.title = 'Scegli tipo di responsabilit&#224;';
                                if (result.url == "") result.url = "/Lookup/GetResponsabilityTypes";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetResponsabilityType";
                                if (result.maxDigit == null) result.maxDigit = 2;
                                break;
                case "CheckInArea":
                    result.title = 'Choose Terminal';
                                if (result.url == "") result.url = "/Lookup/GetCheckinAreas";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetCheckinArea";
                                if (result.idField == null) result.idField = "CheckInArea";
                                if (result.maxDigit == null) result.maxDigit = 5;
                                break;
                case "SsrCode":
                    result.title = 'Choose SSR Code';
                                if (result.url == "") result.url = "/Lookup/GetSsrCodes";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetSsrCode";
                                if (result.idField == null) result.idField = "Code";
                                if (result.maxDigit == null) result.maxDigit = 4;
                                break;
                case "RemoteSystem":
                    result.title = 'Scegli Remote System';
                                if (result.url == "") result.url = "/Lookup/GetRemoteSystems";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetRemoteSystem";
                                if (result.idField == null) result.idField = "RemoteSystem";
                                if (result.maxDigit == null) result.maxDigit = 1;
                                break;
                case "DelayGroup":
                    result.title = 'Scegli gruppo ritardi';
                                if (result.url == "") result.url = "/Lookup/GetDelayGroups";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetDelayGroup";
                                if (result.idField == null) result.idField = "GroupCode";
                                if (result.maxDigit == null) result.maxDigit = 3;
                                break;
                case "CLMatrixNoteType":
                    result.title = 'Scegli tipo nota';
                                if (result.url == "") result.url = "/Lookup/GetCLMatrixNoteTypes";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetCLMatrixNoteType";
                                if (result.idField == null) result.idField = "NoteType";
                                if (result.maxDigit == null) result.maxDigit = 10;
                                break;
                case "NoiseCategory":
                    result.title = 'Scegli Categoria Rumore';
                                if (result.url == "") result.url = "/Lookup/GetNoises";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetNoise";
                                if (result.idField == null) result.idField = "NoiseCategory";
                                if (result.maxDigit == null) result.maxDigit = 2;
                                break;
                case "AirframeType":
                    result.title = 'Scegli Tipologia Aeromobile';
                                if (result.url == "") result.url = "/Lookup/GetAirframeTypes";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetAirframeType";
                                if (result.idField == null) result.idField = "AirframeType";
                                if (result.maxDigit == null) result.maxDigit = 2;
                                break;
                case "EngineType":
                    result.title = 'Scegli Tipo Motore';
                                if (result.url == "") result.url = "/Lookup/GetEngineTypes";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetEngineType";
                                if (result.idField == null) result.idField = "EngineType";
                                if (result.maxDigit == null) result.maxDigit = 1;
                                break;
                case "FuelType":
                    result.title = 'Scegli Tipo Carburante';
                                if (result.url == "") result.url = "/Lookup/GetFuelTypes";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetFuelType";
                                if (result.idField == null) result.idField = "FuelType";
                                if (result.maxDigit == null) result.maxDigit = 5;
                                break;
                case "LandingGearType":
                    result.title = 'Scegli Tipo Carrelli';
                                if (result.url == "") result.url = "/Lookup/GetLandingGearTypes";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetLandingGearType";
                                if (result.idField == null) result.idField = "LandingGearType";
                                if (result.maxDigit == null) result.maxDigit = 1;
                                break;
                case "IataAircraft":
                    result.title = 'Scegli aeromobile IATA';
                                if (result.url == "") result.url = "/Lookup/GetIataAircrafts";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetIataAircraft";
                                if (result.idField == null) result.idField = "IataAircraft";
                                if (result.maxDigit == null) result.maxDigit = 3;
                                break;
                case "MarketingType":
                    result.title = 'Scegli tipo marketing';
                                if (result.url == "") result.url = "/Lookup/GetMarketingTypes";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetMarketingType";
                                if (result.idField == null) result.idField = "MarketingType";
                                if (result.maxDigit == null) result.maxDigit = 1;
                                break;
                case "SubiataAircraft":
                    result.title = 'Scegli aeromobile SUBIATA';
                                if (result.url == "") result.url = "/Lookup/GetSubiataAircrafts";
                                if (result.urlAutocomplete == "") result.urlAutocomplete = "/Lookup/GetSubiataAircraft";
                                if (result.idField == null) result.idField = "SubiataAircraft";
                                if (result.maxDigit == null) result.maxDigit = 3;
                                break;
                            }
             
            return result;
        };

        return {
            computeBaseOptions: function(options) { return _computeCommonOptions(options); },
            getObject: function(value, options)
                        {
                            if (!options || (typeof options != 'object')) throw 'options is not valid';
                            var urlWithParameters = '';
                            if (!options.type || !value || value.toString().trim().length == 0)
                                throw 'not valid parameters';
                            var opts = _computeCommonOptions(options);
                            urlWithParameters = opts.urlAutocomplete + "?";
                            // + "parameters=";
                            //if (options.datasourceParameters)
                            //  urlWithParameters += options.datasourceParameters;
                            urlWithParameters += "&filter=" + value + "&loggerName=";
                            if (options.loggerName)
                                urlWithParameters += options.loggerName;
                            //if ((typeof options.getRuntimeParameters == 'function') && options.getRuntimeParameters())
                            urlWithParameters = urlWithParameters + "&" + deserializeGetRuntimeParameters(options);
                            return $.ajax({ url: urlWithParameters });
                        }
                    };
    })();
    // fine provider per lookup

    // Create the defaults once
    var pluginName = 'genericLookup',
        defaults = {
            type: "", //Obbligatorio, Tipo del lookup [Aircraft,Airport,ServiceType,PEAgent,FlightType,FlightQualification,Handler,Registration,Country,City,RunWay, Airline,CheckInArea]
            button: "", //Obbligatorio, selettore o oggetto jquery del button su cui agganciare l'apertura del lookup
            datasourceParameters: "", //parametri opzionali per il caricamento del datasource
            getRuntimeParameters: function () { return null }, //callback che chiamata al click e all' autocompletamento del Lookup mi restituisce un oggetto contenente i parametri da deserializzare
            getCustomColumns: function (cols, type) { return null }, //callback che restituisce l'oggetto delle colonne
            IcaoIataOrder: "IcaoIata", //Indica l'ordine dei codici [IcaoIata , IataIcao]
            url: "", //url da richiamare per ottenere il datasource, di default è calcolato in base al type
            urlAutocomplete: "", //url da richiamare per autocmpletare il campo, di default è calcolato in base al type
            selectedElement: function (element) { }, //callback chiamata alla selezione di una riga o di un elemento tramite autocomplete, element può essere null nel caso di autocompletamento fallito
            loggerName: "Application", // Nome del logger da utilizzare durante il recupero del datasource, di default è Application
            remote: false,// Indica se la griglia deve lavorare con dati in memoria o caricarli da remoto a runtime [false , true]
            hiddenControl: null, //selettore del controllo hidden che contiene l'id selezionato, opzionale
            idField: null,//nome della proprietà che contiene la chiave primaria o funzione function(selectedElement) che ritorna a partire dall'elemento selezionato la/le chiave/i primaria, di default calcolato in base al type
            autocomplete: false,//indice se deve eseguire anche l'autocmpletamento sul campo cercando il valore immesso come chiave primaria, attivabile solo in modalità remota
            autocompleteOnLoad: false,//indice se deve autocompletare in automatico al caricamento del plugi, utile per compilare campi descrittivi a partire dall'id hidden
            maxDigit: null,//opzionale, indica il numero massimo di caratteri digitabile all'interno del controllo
            gridPlaceholder: null,
        };
    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;

        // jQuery has an extend method that merges the 
        // contents of two or more objects, storing the 
        // result in the first object. The first object 
        // is generally empty because we don't want to alter 
        // the default options for future instances of the plugin
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;
 
        function showLookup()
        {
          
        }

        this.init();

        //return {
        //showLookup:showLookup
        //}

    }

    Plugin.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element 
        // and this.options

        var that = this;
        $.each($.lookupProvider.computeBaseOptions(this.options), function (name, val) {
            that.options[name] = val;
        });

        //Configuro tutte le label
        labels.ok = ' Ok';
        labels.cancel = ' Annulla ';

        //configuro a partire dai data attribute
        if ($(this.element).data("genericlookup-button") != null)
            this.options.button = $(this.element).data("genericlookup-button");
        if ($(this.element).data("genericlookup-hiddencontrol") != null)
            this.options.hiddenControl = $(this.element).data("genericlookup-hiddencontrol");

        

        if(typeof this.options.button=="object")
                this.options.button.on('click', this, this.showLookup);
        else
                $(this.options.button).on('click', this, this.showLookup);
      

        ////l'autocomplete funziona solo in modalità remote
        //if (!this.options.remote && this.options.autocomplete) {
        //    console.log("Per attivare l'autompletamento occorre usare il plugin in modalità remota");
        //    this.options.autocomplete = false;
        //}

        if (this.options.autocomplete)
            $(this.element).on('change', this, this.autoComplete);
        if (this.options.autocomplete && this.options.autocompleteOnLoad && $(this.options.hiddenControl).val() != '')
            this.autoComplete({ data: this, value: $(this.options.hiddenControl).val() });
        if (this.options.maxDigit) {
            var maxDigit = this.options.maxDigit;
            $(this.element).on('keydown', function (e) {
                if (e.keyCode != 8 && e.keyCode != 9 && e.keyCode != 13 && e.keyCode != 35 && e.keyCode != 36 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 46 &&
                    this.selectionStart == this.selectionEnd && $(this).val().length >= maxDigit)
                    e.preventDefault();
            });
            $(this.element).on('focus', function (e) {
                $(this).select().one('mouseup', function (e) {
                    $(this).off('keyup');
                    e.preventDefault();
                }).one('keyup', function () {
                    $(this).select().off('mouseup');
                });
            });
        }

    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations 
    $.fn[pluginName] = function (options) {


 // If the first parameter is a string, treat this as a call to
        // a public method.
        var returnVal;
        if (typeof arguments[0] === 'string') {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);

            this.each(function () {
                // Check that the element has a plugin instance, and that
                // the requested public method exists.
                if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
                    // Call the method of the Plugin instance, and Pass it
                    // the supplied arguments.
                    //while (!this.initialized);
                    //returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
                    returnVal = $.data(this, 'plugin_' + pluginName)[methodName](args);
                } else {
                    throw new Error('Method ' + methodName + ' does not exist on jQuery.' + pluginName);
                }
            });

        } else if (typeof options === "object" || !options) {
            this.each(function () {
                // Only allow the plugin to be instantiated once.
                if (!$.data(this, 'plugin_' + pluginName)) {
                    // Pass options to Plugin constructor, and store Plugin
                    // instance in the elements jQuery data object.
                    returnVal = $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        }
        return returnVal;




       // return this.each(function () {
       //     if (!$.data(this, 'plugin_' + pluginName)) {
       //         $.data(this, 'plugin_' + pluginName,
       //         new Plugin(this, options));
       //     }
       // });
    }

    var labels = {};

    Plugin.prototype.autoComplete = function (event) {
        var self = event.data ? event.data : this;
        var value = event.length > 0 ? event[0].value : $(self.element).val();
        if (event.value != null)
            value = event.value.toString().trim();

        if (value == "") {
            self.onSelectedElement(null);
            return;
        }

        $.lookupProvider
            .getObject(value, self.options)
            .success(function (data) {
                var obj = (data.length > 0) ? data[0] : data;
                var found = false;
                if (data != '')
                    $.each(obj, function (id, prop) { if (prop) found = true; });
                self.onSelectedElement(found ? obj : null);
            });
    }
 Plugin.prototype.closeLookupManually = function (event) {
	var obj = event.data != null ? event.data : this;
      if(this.igGrid.data('igGrid'))
        $(obj.igGrid).igGrid('destroy');
 		obj.modal.detach();
        obj.modal= null;
}
   Plugin.prototype.showLookup = function (event) {
	var obj = event.data != null ? event.data : this;
	preSetFilter = true;
	//obj.options.gridPlaceholder
	if (!obj.modal) {
	  if(obj.options.gridPlaceholder == null)
{
		obj.modal = $('<div id="lookup-modal-containerId-'+obj.options.type+'" class="modal-container">\
		<div class="modal fade">\
		<div  class="modal-dialog">\
		<div  class="modal-content">\
		<div class="modal-header">\
		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
		<h4 class="modal-title" id="changePasswordLabel"></h4>\
		</div>\
		<div class="modal-body widget-content">'
		+ obj.createCustomFilter() + obj.createTable(obj.element.id) +
		'</div>\
		<div class="modal-footer">\
		<button type="button" class="btn btn-success" data-lookup-role="ok">\
		<i class="glyphicon glyphicon-ok"></i>'+ labels.ok + ' \
		</button>\
		<button type="reset" class="btn" data-dismiss="modal">\
		<i class="glyphicon glyphicon-ban-circle"></i>'+ labels.cancel + ' \
		</button>\
		</div>\
		</div>\
		</div>\
		</div>\
		</div>');
}
else{
obj.modal = $(
    '<div id="lookup-modal-containerId-'+obj.options.type+'" class="modal-container">\
		<div>\
		    <div>\
		        <div>'
		            + obj.createCustomFilter() + obj.createTable(obj.element.id) +
		        '</div>\
		    </div>\
		    </div>\
		</div>');
}

        if(obj.options.gridPlaceholder == null)
       	    obj.modal.appendTo($('body'));
        else
       	    obj.modal.appendTo($('#'+obj.options.gridPlaceholder));
	        
		
		$('[data-lookup-role="ok"]', obj.modal).on('click', function () {
			obj.onSelectedRow.call(obj);
		});
		
		$("input", obj.modal).on('click', function (event) {
			obj.applyCustomFilter();
		});
		
        $(".modal-title", obj.modal).html(obj.options.title);
		if(obj.options.gridPlaceholder == null)
			$('.modal', obj.modal).modal();
		else
			$('.modal', obj.modal).show();

	if(obj.options.gridPlaceholder == null)
{
        $('.modal', obj.modal).off('hidden.bs.modal');
        $('.modal', obj.modal).on('hidden.bs.modal', function (e) {
			$(obj.igGrid).igGrid('destroy');
			obj.modal = null;
		})
		}

	if(obj.options.gridPlaceholder == null)
        $('.modal', obj.modal).draggable({
            handle: ".modal-header"
		});
		
        obj.getDataSourceForLookupGrid.call(obj);
		
	}
	
}
 

    Plugin.prototype.getDataSourceForLookupGrid = function () {

        var urlWithParameters = this.options.url;
        //if (this.options.datasourceParameters != "")
        //urlWithParameters = urlWithParameters + "?parameters=" + this.options.datasourceParameters + "&filter=";
        urlWithParameters = urlWithParameters + "?filter=";

        if (this.options.hiddenControl == null)
            urlWithParameters += $(this.element).val();

        if (this.options.getRuntimeParameters())
            urlWithParameters = urlWithParameters + "&" + deserializeGetRuntimeParameters(this.options);


        
        urlWithParameters += "&loggerName=" + this.options.loggerName;

        if (!this.options.remote) {

            var obj = this;

            $.ajax({
                url: urlWithParameters,
                success: function (data) { obj.createGrid(data); }
            });
        }
        else {//remote
            this.createGrid(urlWithParameters);
        }
    }

    var rowIndex;
    var pageIndex;
    var preSetFilter = true; //vero se al primo caricamento occorre presettare i filtri di ricerca

    Plugin.prototype.createGrid = function (data) {
        rowIndex = null;
        pageIndex = 0;
        var cols, i, pageSize = 20, icao = '';
        if (this.options.pageSize != null && parseInt(this.options.pageSize) > 0) pageSize = parseInt(this.options.pageSize);

        cols = this.getGridColumns(this.options.IcaoIataOrder == "IcaoIata");


        if ($(this.element).val() != "") {
            if (!this.options.remote) {
                for (i = 0; i < data.length; i++) {
                    if (data[i].Selected) {
                        rowIndex = i;
                        break;
                    }
                }
            }

            pageIndex = Math.floor((rowIndex) / pageSize);
            rowIndex = Math.floor((rowIndex + 1) % pageSize) - 1;
        }

        var self = this;

        var ds = new $.ig.DataSource({
            dataSource: data,
            urlParamsEncoding: function (owner, params) {
                //Filtri custom applicati in modalità remote
                if (self.options.type == "Customers") {
                    if ($("#customer-filters-onlyvalid:checked", self.modal).length > 0)
                        owner.settings.filtering.expressions.push({
                            fieldName: "IsValid",
                            expr: "",
                            cond: "true"
                        });

                }

                if (preSetFilter && self.options.hiddenControl != null && $(self.options.hiddenControl).val() != '') {
                    owner.settings.filtering.expressions.push({
                        fieldName: self.options.idField,
                        expr: $(self.options.hiddenControl).val(),
                        cond: "equals"
                    });

                    preSetFilter = false;
                }
                return true;
            }
        });

        var igGridOptions = {
            autoGenerateColumns: false,
            columns: cols,
            dataSource: ds,

            width: '100%',

            features: [
                { name: 'Selection', mode: 'row' },
                {
                    name: 'Paging',
                    type: 'local',
                    pageSize: pageSize,
                    showPageSizeDropDown: false,
                    currentPageIndex: pageIndex,

                },
                {
                    name: 'Filtering',
                    columnSettings: [{ columnKey: "CustomerUser", condition: "equals" }]
                },
                {
                    name: 'Sorting',
                    applySortedColumnCss: false,
                }
            ],
            dataRendered: function (evt, ui) {
                if (rowIndex != null) {
                    $(this).igGridSelection("selectRow", rowIndex);

                }
                if (self.options.type == "Customers")
                    ui.owner.rows().each(
                       function (idx, row) {
                           if (!ui.owner.dataSource.dataView()[idx].IsValid)
                               $(row).addClass("customer-invalid");
                       });
            }
        };

        if (this.options.remote) {
            igGridOptions.responseDataKey = 'Records';
            igGridOptions.features = [
                { name: 'Selection', mode: 'row' },
                { sortUrlKey: 'sort', sortUrlKeyAscValue: 'asc', sortUrlKeyDescValue: 'desc', name: 'Sorting', type: 'remote' },
                { filterExprUrlKey: 'filter', filterLogicUrlKey: 'filterLogic', name: 'Filtering', type: 'remote' },
                { recordCountKey: 'TotalRecordsCount', pageIndexUrlKey: 'page', pageSizeUrlKey: 'pageSize', pageSize: pageSize, name: 'Paging', type: 'remote' },

            ];
        }


        this.igGrid = $('[id$="LookupGrid"]', this.modal).igGrid(igGridOptions);

        //Aggiorna l'interfaccia con i filtri iniziali impostati
        //http://www.infragistics.com/community/forums/t/75870.aspx
        //usa un metodo privato che potrebbe cambiare nel tempo
        $('[id$="LookupGrid_table"]', this.modal).data("igGridFiltering")._updateFiltersUI($('[id$="LookupGrid"]', this.modal).data("igGrid").dataSource.settings.filtering.expressions);


        if (!this.options.remote)
            $('[id$="LookupGrid_table"]', this.igGrid).igGridPaging("option", "currentPageIndex", pageIndex);


        //Visualizzazione colonne senza la proprietà filter perché in IE9 non vengono mostrate correttamente
        for (i = 0; i < cols.length; i++)
            $('#' + this.igGrid[0].id + '_table_' + cols[i].key).attr('style', 'filter:none');

        $(this.igGrid).off('dblclick');
        $(this.igGrid).on('dblclick', 'tr', this, function (event) {
            var obj = event.data;
            obj.onSelectedRow();
        });


        this.formatGrid();

    }

    Plugin.prototype.formatGrid = function formatGrid() {

        switch (this.options.type) {
            case "Aircraft":
                $("#lookup-modal-containerId-"+this.options.type+" .modal-dialog").attr("style", "width: 950px");
                $("#lookup-modal-containerId-"+this.options.type+" .modal-dialog").attr("style", "width: 950px;");
                break;
            case "Airport":
                $("#lookup-modal-containerId-"+this.options.type+" .modal-dialog").attr("style", "width: 750px");
                $("#lookup-modal-containerId-"+this.options.type+" .modal-dialog").attr("style", "width: 750px");
                break;
            case "Country":
            case "Continent":
            case "Language":
            case "TechnicalAirportType":
            case "TimeBand":
            case "ResourceStand":
            case "RemOperative":
            case "RemPublic":
            case "ResourceGate":
            case "ResourceArrivalBelt":
            case "ResourceDepartureBelt":
            case "ResourceCheckIn":
            case "LegType":
            case "TransportType":
            case "City":
            case "ServiceType":
            case "PEAgent":
            case "IcaoCategory":
            case "RemoteSystem":
            case "DelayGroup":
                $("#lookup-modal-containerId-"+this.options.type+" .modal-dialog").attr("style", "width: 650px");
                $("#lookup-modal-containerId-"+this.options.type+" .modal-dialog").attr("style", "width: 650px");
                break;
            case "FlightType":

                break;
            case "CLMatrixNoteType":
            case "FlightQualification":

                break;
            case "Handler":

                break;
            case "Reason":
            case "Registration":
                $("#lookup-modal-containerId-"+this.options.type+" .modal-dialog").attr("style", "width: 1260px");
                $("#lookup-modal-containerId-"+this.options.type+" .modal-dialog").attr("style", "width: 1260px");
                break;
            case "ResponsabilityUnit":
            case "ResponsabilityType":
            case "Customers":
                $("#lookup-modal-containerId-"+this.options.type+" .modal-dialog").attr("style", "width: 950px");
                $("#lookup-modal-containerId-"+this.options.type+" .modal-dialog").attr("style", "width: 950px");
                break;
        }
    }
    Plugin.prototype.applyCustomFilter = function () {

        if (!this.options.remote) {
            if (this.options.type == "Customers") {
                if ($("#customer-filters-onlyvalid:checked", this.modal).length > 0)
                    $('[id$="LookupGrid_table"]', this.igGrid).igGridFiltering("filter", ([{ fieldName: "IsValid", expr: '', cond: "true" }]));
                else
                    $('[id$="LookupGrid_table"]', this.igGrid).igGridFiltering("filter", ([]));
            }
        }
        else
            $(this.igGrid).igGrid('dataBind');
    }

    Plugin.prototype.getGridColumns = function (nIcao) {
        var cols = [];

        switch (this.options.type) {
            case 'Aircraft':
                if (nIcao == 'true') {
                    cols.push({ headerText: 'ICAO', key: 'Aircraft_Icao', width: '8%' });
                    cols.push({ headerText: 'IATA', key: 'Aircraft_Sub_Iata', width: '10%' });
                } else {
                    cols.push({ headerText: 'IATA', key: 'Aircraft_Sub_Iata', width: '10%' });
                    cols.push({ headerText: 'ICAO', key: 'Aircraft_Icao', width: '8%' });
                }
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '30%' });
                cols.push({ headerText: 'SEAT', key: 'Seats', width: '6%', dataType: 'number' });
                cols.push({ headerText: 'MTOW', key: 'Mtow', width: '6%', dataType: 'number' });
                cols.push({ headerText: 'Cat. Icao', key: 'Icao_Category', width: '7%' });
                cols.push({ headerText: 'Larghezza', key: 'Width', width: '8%', dataType: 'number' });
                cols.push({ headerText: 'Lunghezza', key: 'Length', width: '8%', dataType: 'number' });
                cols.push({ headerText: 'Altezza', key: 'Height', width: '7%', dataType: 'number' });
                cols.push({ headerText: 'Holds', key: 'Holds', width: '10%' });
                break;
            case 'Airport':
                if (nIcao == 'true') {
                    cols.push({ headerText: 'ICAO', key: 'Airport_Icao', width: '10%' });
                    cols.push({ headerText: 'Cod. Iata', key: 'Airport', width: '10%' });
                } else {
                    cols.push({ headerText: 'Cod. Iata', key: 'Airport', width: '10%' });
                    cols.push({ headerText: 'ICAO', key: 'Airport_Icao', width: '10%' });
                }
                cols.push({ headerText: 'Citt&#224;', key: 'City', width: '10%' });
                cols.push({ headerText: 'Nazione', key: 'Country', width: '10%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '60%' });
                break;
            case 'ServiceType':
                cols.push({ headerText: 'Codice', key: 'Service_Type', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'PEAgent':
                cols.push({ headerText: 'Codice', key: 'Agent', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'Country':
                cols.push({ headerText: 'Codice', key: 'Country', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'City':
                cols.push({ headerText: 'Codice', key: 'City', width: '25%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '75%' });
                break;
            case 'FlightType':
                cols.push({ headerText: 'Codice', key: 'GA_FLIGHT_TYPE', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'DESCRIPTION', width: '85%' });
                break;
            case 'FlightTypeCommercial':
                cols.push({ headerText: 'Codice', key: 'FLIGHT_TYPE', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'DESCRIPTION', width: '85%' });
                break;
            case 'FlightQualification':
                cols.push({ headerText: 'Codice', key: 'FLIGHT_QUALIFICATION', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'DESCRIPTION', width: '70%' });
                cols.push({ headerText: 'Tipo tratta', key: 'LEG_TYPE', width: '15%' });
                break;
            case 'Handler':
                cols.push({ headerText: 'Descrizione', key: 'DESCRIPTION', width: '70%' });
                cols.push({ headerText: 'Code', key: 'SHORT_DESCRIPTION', width: '15%' });
                cols.push({ headerText: 'Handler interno', key: 'HANDLER', hidden: false, width: '15%' });
                break;
            case 'Registration':
                cols.push({ headerText: 'Tipo Aviazione', key: 'AviationType', width: '5%' });
                cols.push({ headerText: 'Registrazione', key: 'Registration', width: '10%' });
                if (nIcao == 'true') {
                    cols.push({ headerText: 'ICAO', key: 'AircraftIcao', width: '5%' });
                    cols.push({ headerText: 'IATA', key: 'AircraftSubIata', width: '5%' });
                } else {
                    cols.push({ headerText: 'IATA', key: 'AircraftSubIata', width: '5%' });
                    cols.push({ headerText: 'ICAO', key: 'AircraftIcao', width: '5%' });
                }
                cols.push({ headerText: 'SEAT', key: 'Seats', width: '5%', dataType: 'number' });
                cols.push({ headerText: 'MTOW', key: 'Mtow', width: '5%', dataType: 'number' });
                cols.push({ headerText: 'Descrizione', key: 'AircraftDescription', width: '25%', formatter: aircraftMaxLengthFormatter });
                
                cols.push({ headerText: 'Vettore Proprietario', key: 'AirlineDescription', width: '10%' });
                cols.push({ headerText: 'Cliente Proprietario', key: 'CustomerDescription', width: '20%' });
                
                cols.push({ headerText: 'Airline', key: 'InternalAirline', width: '0%', hidden: true });
                cols.push({ headerText: 'Customer', key: 'InternalCustomer', width: '0%', hidden: true });
                break;
            case 'Continent':
                cols.push({ headerText: 'Codice', key: 'Continent', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'Language':
                cols.push({ headerText: 'Codice', key: 'Language', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'TechnicalAirportType':
                cols.push({ headerText: 'Codice', key: 'TechnicalAirportType', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'TimeBand':
                cols.push({ headerText: 'Codice', key: 'TimeBand', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'LegType':
                cols.push({ headerText: 'Codice', key: 'LegType', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'TransportType':
                cols.push({ headerText: 'Tipo trasporto', key: 'TransportType', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'RemPublic':
            case 'RemOperative':
                cols.push({ headerText: 'Note', key: 'Note', width: '30%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '70%' });
                break;
            case 'Terminals':
                cols.push({ headerText: 'Terminal', key: 'Terminal', width: '30%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '70%' });
                break;
            case 'IcaoCategory':
                cols.push({ headerText: 'Cat. Icao', key: 'Code', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'Customers':
                cols.push({ headerText: 'Cod. Interno', key: 'Code', width: '5%', hidden: true, dataType: 'code' });
                cols.push({ headerText: 'Cod. Societario', key: 'CustomerUser', width: '15%', dataType: 'code' });
                cols.push({ headerText: 'Nazione', key: 'Country', width: '15%', dataType: 'string' });
                cols.push({ headerText: 'Ragione sociale 1', key: 'CorporateName1', width: '30%', dataType: 'string' });
                cols.push({ headerText: 'Ragione sociale 2', key: 'CorporateName2', width: '30%', dataType: 'string' });
                cols.push({ headerText: 'Iva domestica', key: 'DomesticVat', width: '15%', dataType: 'string' });
                cols.push({ headerText: 'Is Valid', key: 'IsValid', width: '5%', hidden: true, dataType: 'boolean' });
                break;
            case 'RunWay':
                cols.push({ headerText: 'Codice', key: 'RunWay', width: '20%', dataType: 'code' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '80%', dataType: 'code' });
                break;
            case 'Airline':
                cols.push({ headerText: 'Vettore (2)', key: 'Airline2', width: '20%' });
                cols.push({ headerText: 'Vettore (3)', key: 'Airline3', width: '30%' });
                cols.push({ headerText: 'Vettore (Interno)', key: 'AirlineInternal', hidden: true });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '50%' });
                break;
            case 'AirlineMovement':
                cols.push({ headerText: 'Vettore', key: 'Airline', width: '40%' });
                cols.push({ headerText: 'Volo', key: 'Flight', width: '40%' });
                cols.push({ headerText: 'Movimento', key: 'MovementType', width: '20%' });
                cols.push({ headerText: 'Vettore (Interno)', key: 'AirlineInternal', hidden: true });
                cols.push({ headerText: 'Gruppo', key: 'FlightGroup', hidden: true });
                break;
            case "Reason":
                cols.push({ headerText: 'Delay iata', key: 'DelayIata', width: '7%' });
                cols.push({ headerText: 'Delay iata lett', key: 'DelayIataLett', width: '7%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '61%', formatter: reasonDescrMaxLengthFormatter });
                cols.push({ headerText: 'Gruppo', key: 'Group', width: '25%', formatter: reasonGroupMaxLengthFormatter });
                cols.push({ headerText: 'Resp. Unit', key: 'RespUnit', hidden: true });
                break;
            case "ResponsabilityUnit":
                cols.push({ headerText: 'Codice', key: 'RespUnit', width: '20%', dataType: 'code' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '80%', dataType: 'string' });
                cols.push({ headerText: 'RespType', key: 'RespType', hidden: true });
                break;
            case "ResponsabilityType":
                cols.push({ headerText: 'Codice', key: 'RespType', width: '20%', dataType: 'code' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '80%', dataType: 'string' });
                break;
            case "CheckInArea":
                cols.push({ headerText: 'Area check in', key: 'CheckInArea', width: '30%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '70%' });
                break;
            case 'SsrCode':
                cols.push({ headerText: 'Codice', key: 'Code', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '65%' });
                cols.push({ headerText: 'PRM', key: 'PrmFlag', width: '20%' });
                cols.push({ headerText: 'Is Prm', key: 'IsPrm', width: '5%', hidden: true, dataType: 'boolean' });
                break;
            case 'RemoteSystem':
                cols.push({ headerText: 'Codice', key: 'RemoteSystem', width: '10%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '90%' });
                break;
            case 'DelayGroup':
                cols.push({ headerText: 'Codice', key: 'GroupCode', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'CLMatrixNoteType':
                cols.push({ headerText: 'Codice', key: 'NoteType', width: '25%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '75%' });
                break;
            case 'NoiseCategory':
                cols.push({ headerText: 'Codice', key: 'NoiseCategory', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'AirframeType':
                cols.push({ headerText: 'Codice', key: 'AirframeType', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'EngineType':
                cols.push({ headerText: 'Codice', key: 'EngineType', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'FuelType':
                cols.push({ headerText: 'Codice', key: 'FuelType', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'LandingGearType':
                cols.push({ headerText: 'Codice', key: 'LandingGearType', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'IataAircraft':
                cols.push({ headerText: 'Codice', key: 'IataAircraft', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'MarketingType':
                cols.push({ headerText: 'Codice', key: 'MarketingType', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
            case 'SubiataAircraft':
                cols.push({ headerText: 'Codice', key: 'SubiataAircraft', width: '15%' });
                cols.push({ headerText: 'Descrizione', key: 'Description', width: '85%' });
                break;
        }


        if (this.options.getCustomColumns)
            this.options.getCustomColumns(cols, this.options.type);

        return cols;
    }
    
    function maxLengthFormatter(val, numberMaxLength)
    {
        if(val) {
            if(val.length > numberMaxLength)
                return val.substring(0, (numberMaxLength-1)) + "...";
            return val;
        }
        else
        {
            return "";
        }
    }
    function aircraftMaxLengthFormatter(val) {
        return maxLengthFormatter(val,30);
    }
    function reasonDescrMaxLengthFormatter(val) {
        return maxLengthFormatter(val,120);
    }
    function reasonGroupMaxLengthFormatter(val) {
        return maxLengthFormatter(val,30);
    }

    Plugin.prototype.createCustomFilter = function () {

        var pre = '<div class="filter-container" style="padding: 5px; margin: 5px;">';
        var post = '</div>';
        if (this.options.type == "Customers") {
            return pre + '<input type="checkbox" checked="checked" id="customer-filters-onlyvalid"><label for="customer-filters-onlyvalid">Solo Validi</label>' + post;
        }
        return "";
    }

 Plugin.prototype.createTable = function (id) {

        var pre = '<div id="' + id + 'LookupGrid" style="padding: 5px"></div>';
       
        return pre;
    }
    Plugin.prototype.close = function () {
        $('.modal', this.modal).modal('hide');
        
    }

    Plugin.prototype.onSelectedRow = function () {
        var row = this.igGrid.igGrid("selectedRow");
        if (row != null) {
            var selectedItem = this.igGrid.data('igGrid').dataSource.dataView()[$(row.element[0]).parent().children().index(row.element[0])];
            /*
                fix temporaneo FL: se la griglia è paginata il comportamento del lookup non è adeguato: non viene selezionata la prima riga all'avvio (vedi funzione passata a 'dataRendered')
                temporaneamente il fix seleziona di default il primo elemento della griglia (considerato che questo è il comportamento atteso)
            */
            if ((selectedItem == undefined) && row.id == '0') {
                selectedItem = this.igGrid.data('igGrid').dataSource.dataView()[0];
            }
            /*
                fine fix temporaneo FL
            */
            if (selectedItem != null) {
                this.onSelectedElement(selectedItem);
                this.close();
            }
        }
    }

    Plugin.prototype.onSelectedElement = function (selectedItem) {
        
        if (this.options.hiddenControl != null && this.options.idField != null) {
            if (selectedItem != null) {
                var id;
                if ($.isFunction(this.options.idField))
                    id = this.options.idField(selectedItem);
                else
                    id = eval("selectedItem." + this.options.idField);

                $(this.options.hiddenControl).val(id).trigger('change');
            }
            else
                $(this.options.hiddenControl).val('').trigger('change');

        }

        this.options.selectedElement.call(this.element, selectedItem);

    }

    function deserializeGetRuntimeParameters(options) {
        var element =options.getRuntimeParameters!=null ? options.getRuntimeParameters() : null;
        if (element == null) 
            element={};
        element.parameters= 
        (element.parameters!=null ? element.parameters+"|" : "")+
            (options.datasourceParameters!=null ? options.datasourceParameters : "");  

        return jQuery.param(element);
    }
})(jQuery, window, document);
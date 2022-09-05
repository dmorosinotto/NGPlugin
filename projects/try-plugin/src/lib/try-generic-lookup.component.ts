import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";

declare var $: any;
@Component({
    selector: "try-generic-lookup",
    standalone: true,
    // imports: [CommonModule],
    template: `
        <form>
            <fieldset>
                <label>Prova con #ID:</label>
                <input type="text" id="txt" /><button type="button" id="btn">...</button>
                <input type="text" id="hid" value="101" />
            </fieldset>
            <fieldset>
                <label>Prova con #NG nativeElement:</label>
                <input type="text" #txt /><button type="button" #btn>...</button>
                <input type="text" #hid value="100" />
            </fieldset>
        </form>
    `,
    styles: ["form { background-color: lightblue; padding: 10px }", "fieldset { display: flex; }"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TryGenericLookupComponent<D = Date | null, T = string | null, I = string> implements AfterViewInit {
    @ViewChild("txt", { read: ElementRef, static: true }) txt!: ElementRef;
    @ViewChild("btn", { read: ElementRef, static: true }) btn!: ElementRef;
    @ViewChild("hid", { read: ElementRef, static: true }) hid!: ElementRef;

    constructor() {
        console.log("on ctor", this.txt?.nativeElement ?? "NOT READY!");
    }

    @Input() set model(model: D) {
        if (model === undefined) {
            console.info("IGNORE MODEL NOT SET === undefined");
            return;
        }
        if (this._model !== model) {
            console.info("SET MODEL", model);
            this._update(model, true, "model");
        } else {
            console.info(model, "MODEL IS SAME");
        }
    }
    get model(): D {
        return this._model!;
    }
    private _model?: D;
    @Output() modelChange = new EventEmitter<D>();

    @Input() format = "dd/mm/yy";
    @Input() set value(value: T) {
        if (value === undefined) {
            console.info("IGNORE MODEL NOT SET === undefined");
            return;
        }
        if (this._value !== value) {
            console.info("SET VALUE", value);
            var model = value ? $.datepicker.parseDate("UTC_FORMAT", value) : null;
            this._update(model, true, "value");
            // if (D != null) {
            //     this._value = value;
            //     this.valueUTCChange.emit(value);
            //     setTimeout(() => (this.inp.nativeElement.value = $.datepicker.formatDate(this.format, D)));
            // }
        } else {
            console.info(value, "VALUE IS SAME");
        }
    }
    get value(): T {
        return this._value!;
    }
    @Output() valueChange = new EventEmitter<T>();
    private _value?: T;

    private _formatterFn = (model: D): I => $.datepicker.formatDate(this.format, model);
    private _parserFn = (view: I): D | undefined => {
        try {
            return $.datepicker.parseDate(this.format, view);
        } catch (err) {
            // console.info("PARSING ERROR", err);
            return undefined;
        }
    };
    private _update(model: D | undefined, setinp: boolean = true, noemit: "" | "model" | "value" = "") {
        if (model === undefined) return; //EVITO INIZIALIZZAZIONE SE VALORE NON SPECIFICATO
        if (model === null) {
            this._model = model; //null
            this._value = null as any;
        } else {
            this._model = model;
            this._value = $.datepicker.formatDate("UTC_FORMAT", model);
        }
        if (noemit != "model") {
            console.info("EMIT model CHANGE");
            this.modelChange.emit(model);
        }
        if (noemit != "value") {
            console.info("EMIT value CHANGE");
            this.valueChange.emit(this._value);
        }
        if (setinp) {
            setTimeout(() => (this.txt.nativeElement.value = this._formatterFn(model)));
        }
    }

    ngOnChange() {
        console.log("on ngOnChange", this.txt?.nativeElement ?? "NOT READY!");
    }

    ngOnInit() {
        console.log("on ngOnInit", this.txt?.nativeElement ?? "NOT READY!");
    }

    ngAfterViewInit(): void {
        console.log("on ngAfterViewInit", this.txt?.nativeElement ?? "NOT READY!");
        //$(function () {
        var formatter = function (o: any) {
            return (o && `${o.Aircraft_Icao} (${o.Aircraft_Sub_Iata})- ${o.Description}`) || "";
        };
        $("#txt").genericLookup({
            type: "Aircraft",
            button: "#btn",
            hiddenControl: "#hid",
            //remote: true,
            idField: "Aircraft_Sub_Iata",
            //idField: function (...args) { console.log("idField->", args); var o=args[0]; return `${o.Aircraft_Sub_Iata},${o.Seats},${o.Mtow}`  },
            autocomplete: true,
            autocompleteOnLoad: true,
            pageSize: 5,
            selectedElement: function (o: any) {
                console.warn("selectedElement ->", o, "ID=", $("#hid").val());
                $("#txt").val(formatter(o));
            },
        });

        $(this.txt.nativeElement).genericLookup({
            type: "Aircraft",
            button: $(this.btn.nativeElement),
            hiddenControl: $(this.hid.nativeElement),
            //remote: true,
            idField: "Aircraft_Sub_Iata",
            //idField: function (...args) { console.log("idField->", args); var o=args[0]; return `${o.Aircraft_Sub_Iata},${o.Seats},${o.Mtow}`  },
            autocomplete: true,
            autocompleteOnLoad: true,
            pageSize: 5,
            selectedElement: (o: any) => {
                console.warn("selectedElement nativeElement ->", o, "ID=", $(this.hid.nativeElement).val());
                $(this.txt.nativeElement).val(formatter(o));
            },
        });

        //});
    }

    parse() {
        var inputText = this.txt.nativeElement.value;
        console.log(this.txt, "INPUT.value", inputText);
        var model = this._parserFn(inputText);
        if (model != null) {
            // this.valueUTC = $.datepicker.formatDate(UTC_FORMAT, D);
            this._update(model, false, "");
        } else if (!inputText) {
            this._update(null as any, false, "");
        }

        //     $(this.inp.nativeElement)
        //         .datepicker({
        //             dateFormat: this.format,
        //             showOn: "button",
        //             disabled: false,
        //             onSelect: (dateText: string, dp: any) => {
        //
        //                 console.log(dateText, "parse", parse);
        //                 // this.birthday = parse;
        //                 $(dp.input).datepicker("option", "disabled", !dateText);
        //             },
        //         })
        //         .datepicker("option", "disabled", false);
    }

    dialog(e: MouseEvent) {
        console.log("$event", e);
        $(e.target).datepicker(
            "dialog",
            this.value,
            (...args: any[]) => {
                console.log("OnSelect", args);
                var model = $.datepicker.parseDate("UTC_FORMAT", args[0]); //STRING FORMATTED
                var model = $(args[1].input).datepicker("getDate"); //D OBJECT LT
                // this.valueUTC = args[0]; //STRING FORMATTED
                this._update(model, true, "");
                console.log("model", model);
            },
            { showButtonPanel: true, dateFormat: "UTC_FORMAT", altField: this.txt.nativeElement, altFormat: this.format },
            [e.clientX, e.clientY]
        );
    }
}

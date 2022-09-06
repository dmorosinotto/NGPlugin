import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";

declare var $: any;
@Component({
    selector: "try-generic-lookup",
    standalone: true,
    imports: [CommonModule],
    template: `
        <form>
            <fieldset>
                <label>Prova con #ID:</label>
                <input type="text" id="lookupTxt" /><button type="button" id="lookupBtn">...</button>
                <input type="text" id="lookupHid" value="101" />
            </fieldset>
            <fieldset>
                <label>Prova con #NG nativeElement:</label>
                <input type="text" #txt /><button type="button" #btn>...</button>
                <input type="hidden" #hid />
            </fieldset>
            <fieldset>
                <span>Model: {{ model | json }} <-> Value: {{ value }}</span>
            </fieldset>
        </form>
    `,
    styles: ["form { background-color: lightblue; padding: 10px }", "fieldset { display: flex; }"],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TryGenericLookupComponent<T = any> implements AfterViewInit {
    @ViewChild("txt", { read: ElementRef, static: true }) txt!: ElementRef;
    @ViewChild("btn", { read: ElementRef, static: true }) btn!: ElementRef;
    @ViewChild("hid", { read: ElementRef, static: true }) hid!: ElementRef;

    constructor() {
        console.log("on ctor", this.txt?.nativeElement ?? "NOT READY!");
    }

    ngOnChange() {
        console.log("on ngOnChange", this.txt?.nativeElement ?? "NOT READY!");
    }

    ngOnInit() {
        console.log("on ngOnInit", this.txt?.nativeElement ?? "NOT READY!");
    }

    ngAfterViewInit(): void {
        console.log("on ngAfterViewInit", this.txt?.nativeElement ?? "NOT READY!");
        console.log("on ngAfterViewInit CURRENT", this.type, this.idField);
        //$(function () {
        $("#lookupTxt").genericLookup({
            type: "Aircraft",
            button: "#lookupBtn",
            hiddenControl: "#lookupHid",
            //remote: true,
            idField: "Aircraft_Sub_Iata",
            //idField: function (...args) { console.log("idField->", args); var o=args[0]; return `${o.Aircraft_Sub_Iata},${o.Seats},${o.Mtow}`  },
            autocomplete: true,
            autocompleteOnLoad: true,
            pageSize: 5,
            selectedElement: function (o: any) {
                console.warn("selectedElement ->", o, "ID=", $("#lookupHid").val());
                var formatter = function (o: any) {
                    return (o && `${o.Aircraft_Icao} (${o.Aircraft_Sub_Iata}) - ${o.Description}`) || "";
                };
                $("#lookupTxt").val(formatter(o));
            },
        });

        $(this.txt.nativeElement).genericLookup({
            type: this.type,
            button: $(this.btn.nativeElement),
            hiddenControl: $(this.hid.nativeElement),
            //remote: true,
            idField: (model: T | null) => {
                const val = this._hidFn(model);
                console.warn("idField nativeElement ->", model, val);
                this.value = val; //this._hidFn(model);
                console.info("idField after ID=", val, " <-> ", $(this.hid.nativeElement).val());
            },
            autocomplete: true,
            autocompleteOnLoad: true,
            pageSize: 5,
            selectedElement: (model: T | null) => {
                console.warn("selectedElement nativeElement ->", model, "ID=", $(this.hid.nativeElement).val());
                $(this.txt.nativeElement).val(this._txtFn(model));
                this.model = model;
            },
        });

        //});
    }

    @Input() pageSize: number = 5;
    @Input() type: string = "Aircraft";
    @Input() idField: string = "Aircraft_Sub_Iata";

    @Input() set model(model: T | null) {
        if (model === undefined) {
            console.info("IGNORE MODEL NOT SET === undefined");
            return;
        }
        if (this._model !== model) {
            console.info("SET MODEL", model);
            this._model = model;
            // this._update(model, true, "model");
            console.info("EMIT model CHANGE");
            this.modelChange.emit(this._model);
        } else {
            console.info(model, "MODEL IS SAME");
        }
    }
    get model(): T | null {
        return this._model!;
    }
    private _model?: T | null;
    @Output() modelChange = new EventEmitter<T | null>();

    @Input() set value(value: string | null) {
        if (value === undefined) {
            console.info("IGNORE VALUE NOT SET === undefined");
            return;
        }
        if (this._value !== value) {
            console.info("SET VALUE", value);
            this._value = value;
            $(this.hid.nativeElement).val(value);
            // this.hid.nativeElement.value = value;
            console.info("EMIT value CHANGE");
            this.valueChange.emit(this._value);
            // var model = value ? $.datepicker.parseDate("UTC_FORMAT", value) : null;
            // this._update(model, true, "value");
        } else {
            console.info(value, "VALUE IS SAME");
        }
    }
    get value(): string | null {
        return this._value!;
    }
    @Output() valueChange = new EventEmitter<string | null>();
    private _value?: string | null;

    private _txtFn = (model: T | null): string => {
        if (model == null) return "";
        else {
            const m: any = model;
            return `${m.Aircraft_Icao} (${m.Aircraft_Sub_Iata}) - ${m.Description}`;
        }
    };
    private _hidFn = (model: T | null): string | null => {
        if (model == null) return null as string | null;
        const m: any = model;
        return `${m.Aircraft_Sub_Iata}` as string | null;
    };
    /*
    @Input() format = "@"
    private _formatterFn = (model: M): string => {
        if (model == null) return "" ;
        else {
            const m: any = model;
            return `${m.Aircraft_Icao} (${m.Aircraft_Sub_Iata}) - ${m.Description}`;
        }
    };
    private _parserFn = (view: string): M| undefined => {
        try {
            return $.datepicker.parseDate(this.format, view);
        } catch (err) {
            // console.info("PARSING ERROR", err);
            return undefined;
        }
    };
    private _update(model: M | undefined, setinp: boolean = true, noemit: "" | "model" | "value" = "") {
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
*/
}

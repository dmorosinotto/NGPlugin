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
                <input type="text" #hid [value]="value" />
            </fieldset>
            <fieldset>
                <span>Model: {{ model | json }} <-> Value: {{ value }}</span>
            </fieldset>
        </form>
    `,
    styles: ["form { background-color: lightblue; padding: 10px }", "fieldset { display: flex; }"],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TryGenericLookupComponent<M = any | null, I = string | null, T = string> implements AfterViewInit {
    @ViewChild("txt", { read: ElementRef, static: true }) txt!: ElementRef;
    @ViewChild("btn", { read: ElementRef, static: true }) btn!: ElementRef;
    @ViewChild("hid", { read: ElementRef, static: true }) hid!: ElementRef;
    private init: any;

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
        console.info("on ngAfterViewInit CURRENT", this.type, this.idField);
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

        this.init = $(this.txt.nativeElement).genericLookup({
            type: this.type,
            button: $(this.btn.nativeElement),
            hiddenControl: $(this.hid.nativeElement),
            remote: false, //this.remote,
            idField: (model: M) => {
                const val: I = this._hidFn(model);
                console.warn("idField nativeElement", model, "->", val);
                this._update(model, "");
            },
            autocomplete: true,
            autocompleteOnLoad: true,
            pageSize: 5, //this.pageSize,
            selectedElement: (model: M) => {
                const text: T = this._txtFn(model);
                console.warn(
                    "selectedElement nativeElement after idField ->",
                    model,
                    "FORMAT=",
                    text,
                    " <=> $",
                    $(this.txt.nativeElement).val()
                );
                if (model == null) this._update(model, ""); //GESTIONE DEL CASO DI null NON PASSA PER idField
                //VOLENDO POTREI FARE QUI AGGIORNAMETNI INPUT nativeElement AL POSTO DEL _update
                this.hid.nativeElement.value = this.value; // $(this.hid.nativeElement).val(value);
                this.txt.nativeElement.value = text; // $(this.txt.nativeElement).val(text);
                //EMIT Change + OnTouch
                console.info(
                    "EMIT Change + OnTouch ID=",
                    this.value,
                    " <-> $",
                    $(this.hid.nativeElement).val(),
                    " =?= ",
                    this.hid.nativeElement.value,
                    "TEXT=",
                    text,
                    " <-> $",
                    $(this.txt.nativeElement).val(),
                    " =?= ",
                    this.txt.nativeElement.value
                );
            },
        });

        //});
    }

    @Input() type: string = "Aircraft";
    @Input() idField: string = "Aircraft_Sub_Iata";
    // @Input() pageSize?: number = 5;
    // @Input() remote?: boolean = false;

    @Input() set model(model: M) {
        if (model === undefined) {
            console.info("IGNORE MODEL NOT SET === undefined");
            return;
        }
        if (this._model !== model) {
            console.info("SET MODEL", model);
            this._update(model, "model");
        } else {
            console.info(model, "MODEL IS SAME");
        }
    }
    get model(): M {
        return this._model!;
    }
    private _model?: M;
    @Output() modelChange = new EventEmitter<M>();

    @Input() set value(value: I) {
        if (value === undefined) {
            console.info("IGNORE VALUE NOT SET === undefined");
            return;
        }
        if (this._value !== value) {
            if (this.init && this.hid) {
                console.info("SET VALUE", value);
                $(this.hid.nativeElement).val(value);
                this.init.autoComplete({ data: this.init, value }); //autoComplete IMPLICIT CALL IdField(model) ==> _update
            } else {
                console.warn("SET VALUE", value, "DELAY WAITING init..."); //TEORICAMENTE DOVREBBE PARTIRE CON autocompleteOnLoad=true
                this._value = value;
                //setTimeout(() => this.value = value);
            }
        } else {
            console.info(value, "VALUE IS SAME");
        }
    }
    get value(): I {
        return this._value!;
    }
    @Output() valueChange = new EventEmitter<I>();
    private _value?: I;

    private _txtFn = (model: M): T => {
        if (model == null) return "" as any as T;
        else {
            const m: any = model;
            return `${m.Aircraft_Icao} (${m.Aircraft_Sub_Iata}) - ${m.Description}` as any as T;
        }
    };
    private _hidFn = (model: M): I => {
        const m: any = model;
        if (m == null) return m as I; //null
        return m[this.idField] as I;
    };

    private _update(model: M, noemit: "" | "model" | "value" = "") {
        if (model === undefined) return; //EVITO INIZIALIZZAZIONE SE VALORE NON SPECIFICATO
        const changed = !!(this.model !== model);
        const value: I = this._hidFn(model);
        const text: T = this._txtFn(model);
        this._model = model;
        this._value = value;
        // this.hid.nativeElement.value = value; // $(this.hid.nativeElement).val(value);
        // this.txt.nativeElement.value = text; // $(this.txt.nativeElement).val(text);
        if (noemit != "model") {
            console.info("EMIT model CHANGE");
            this.modelChange.emit(model);
        }
        if (noemit != "value") {
            console.info("EMIT value CHANGE");
            this.valueChange.emit(this._value);
        }
        console.warn("FINE _update", this.value, "<->", $(this.hid.nativeElement).val(), text, "<==>", $(this.txt.nativeElement).val());
    }
}

import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CommonModule } from "@angular/common";
declare var $: any;
const UTC_FORMAT = "yy-mm-ddZ";
type stringUTC = string;
@Component({
    selector: "app-valacc-plugin",
    standalone: true,
    imports: [CommonModule],
    template: `
        <div>
            <input type="text" #inp (input)="parse()" />
            <button type="button" id="show" (click)="dialog($event)">...</button>
            <span>Model: {{ model }} <-> Value: {{ value }}</span>
        </div>
    `,
    styles: ["div { display: flex }"],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: ValAccPluginComponent, multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValAccPluginComponent<D = Date | null, T = stringUTC | null, I = string> implements AfterViewInit, ControlValueAccessor {
    constructor() {
        console.log("on ctor", this.inp?.nativeElement ?? "NOT READY!");
    }
    writeValue(value: any): void {
        console.info("writeValue", value);
        this.value = value;
    }
    private _OnChange?: (_: any) => void;
    registerOnChange(fn: (_: any) => void): void {
        console.info("registerOnChange", fn);
        this._OnChange = fn;
    }
    private _OnTouhed?: () => void;
    registerOnTouched(fn: () => void): void {
        console.info("registerOnTouched", fn);
        this._OnTouhed = fn;
    }
    private _disabled = false;
    setDisabledState(isDisabled: boolean): void {
        this._disabled = isDisabled;
        console.info("setDisabledState", isDisabled);
        $(this.inp.nativeElement).datepicker("option", "disabled", this._disabled);
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
            var model = value ? $.datepicker.parseDate(UTC_FORMAT, value) : null;
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
        const changed = !!(this.model !== model);
        if (model === null) {
            this._model = model; //null
            this._value = null as any;
        } else {
            this._model = model;
            this._value = $.datepicker.formatDate(UTC_FORMAT, model);
        }
        if (noemit != "model") {
            console.info("EMIT model CHANGE");
            this.modelChange.emit(model);
        }
        if (noemit != "value") {
            console.info("EMIT value CHANGE");
            this.valueChange.emit(this._value);
        }
        if (this._OnChange && changed) {
            console.info("EMIT _OnChange", this._value);
            this._OnChange(this._value);
        }
        if (this._OnTouhed && changed) {
            console.info("EMIT _OnTouhed");
            this._OnTouhed();
        }
        if (setinp) {
            setTimeout(() => (this.inp.nativeElement.value = this._formatterFn(model)));
        }
    }

    ngOnChange() {
        console.log("on ngOnChange", this.inp?.nativeElement ?? "NOT READY!");
    }

    ngOnInit() {
        console.log("on ngOnInit", this.inp?.nativeElement ?? "NOT READY!");
    }

    ngAfterViewInit(): void {
        console.log("on ngAfterViewInit", this.inp?.nativeElement ?? "NOT READY!");
        // $(function () {
        $("#sampleDTPicker").datepicker({ showButtonPanel: true, showOn: "button", dateFormat: this.format });
        var str = $.datepicker.formatDate("yy-mm-dd", new Date(1975, 3 - 1, 20)); //LOCALTIME
        var d = $.datepicker.parseDate("yy-mm-dd", str); //LOCALTIME
        console.log("format", str, "parse", d, "UTC", d.toISOString());
        // });
    }

    @ViewChild("inp", { read: ElementRef, static: true }) inp!: ElementRef;
    parse() {
        var inputText = this.inp.nativeElement.value;
        console.log(this.inp, "INPUT.value", inputText);
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
                var model = $.datepicker.parseDate(UTC_FORMAT, args[0]); //STRING FORMATTED
                var model = $(args[1].input).datepicker("getDate"); //DATE OBJECT LT
                // this.valueUTC = args[0]; //STRING FORMATTED
                this._update(model, true, "");
                console.log("model", model);
            },
            { showButtonPanel: true, dateFormat: UTC_FORMAT, altField: this.inp.nativeElement, altFormat: this.format },
            [e.clientX, e.clientY]
        );
    }
}

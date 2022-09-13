import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CommonModule } from "@angular/common";
declare var $: any;
const UTC_FORMAT = "yy-mm-ddZ";
type stringUTC = string;
@Component({
    selector: "n-date-picker",
    standalone: true,
    // imports: [CommonModule],
    template: `
        <div>
            <input type="text" #inp (input)="parse()" />
            <button type="button" id="show" (click)="dialog($event)">#</button>
            <span>Model: {{ model }} <-> Value: {{ value }}</span>
        </div>
    `,
    styles: ["div { display: flex }"],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NDatePickerComponent, multi: true }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NDatePickerComponent<D = Date | null, V = stringUTC | null, F = string>
    implements AfterViewInit, OnDestroy, ControlValueAccessor
{
    constructor() {
        console.log(this.constructor.name, "on ctor", this.inp?.nativeElement ?? "NOT READY!");
    }
    writeValue(value: any): void {
        console.info(this.constructor.name, "writeValue", value);
        this.value = value;
    }
    private _OnChange?: (_: any) => void;
    registerOnChange(fn: (_: any) => void): void {
        console.info(this.constructor.name, "registerOnChange", fn);
        this._OnChange = fn;
    }
    private _OnTouhed?: () => void;
    registerOnTouched(fn: () => void): void {
        console.info(this.constructor.name, "registerOnTouched", fn);
        this._OnTouhed = fn;
    }
    private _disabled = false;
    setDisabledState(isDisabled: boolean): void {
        this._disabled = isDisabled;
        console.info(this.constructor.name, "setDisabledState", isDisabled);
        $(this.inp.nativeElement).datepicker("option", "disabled", this._disabled);
        $(this.inp.nativeElement).prop("disabled", this._disabled);
    }

    @Input() set model(model: D) {
        if (model === undefined) {
            console.info(this.constructor.name, "IGNORE MODEL NOT SET === undefined");
            return;
        }
        if (!this._issame(this._model, model)) {
            console.info(this.constructor.name, "SET MODEL", model);
            this._update(model, true, "model");
        } else {
            console.info(this.constructor.name, model, "MODEL IS SAME");
        }
    }
    get model(): D {
        return this._model!;
    }
    private _model?: D;
    @Output() modelChange = new EventEmitter<D>();

    @Input() format = "dd/mm/yy";
    @Input() set value(value: V) {
        if (value === undefined) {
            console.info(this.constructor.name, "IGNORE MODEL NOT SET === undefined");
            return;
        }
        if (!this._issame(this._value, value)) {
            console.info(this.constructor.name, "SET VALUE", value);
            var model = value ? $.datepicker.parseDate(UTC_FORMAT, value) : null;
            this._update(model, true, "value");
            // if (D != null) {
            //     this._value = value;
            //     this.valueUTCChange.emit(value);
            //     setTimeout(() => (this.inp.nativeElement.value = $.datepicker.formatDate(this.format, D)));
            // }
        } else {
            console.info(this.constructor.name, value, "VALUE IS SAME");
        }
    }
    get value(): V {
        return this._value!;
    }
    @Output() valueChange = new EventEmitter<V>();
    private _value?: V;

    private _formatterFn = (model: D): F => $.datepicker.formatDate(this.format, model);
    private _parserFn = (view: F): D | undefined => {
        try {
            return $.datepicker.parseDate(this.format, view);
        } catch (err) {
            // console.info("PARSING ERROR", err);
            return undefined;
        }
    };

    @Input() immutable?: boolean;
    @Output() change = new EventEmitter<{ text: F; value: V; model: D; old: D }>();
    private _issame = (old: any, cur: any) => (this.immutable && old === cur) || JSON.stringify(old) == JSON.stringify(cur);
    private _update(model: D | undefined, setinp: boolean = true, noemit: "" | "model" | "value" = "") {
        if (model === undefined) return; //EVITO INIZIALIZZAZIONE SE VALORE NON SPECIFICATO
        const old = this.model;
        const changed = !this._issame(old, model);
        if (model === null) {
            this._model = model; //null
            this._value = null as any;
        } else {
            this._model = model;
            this._value = $.datepicker.formatDate(UTC_FORMAT, model);
        }
        const text = this._formatterFn(model);
        if (noemit != "model") {
            console.info(this.constructor.name, "EMIT model CHANGE");
            this.modelChange.emit(model);
        }
        if (noemit != "value") {
            console.info(this.constructor.name, "EMIT value CHANGE");
            this.valueChange.emit(this._value);
        }
        if (this._OnChange && changed) {
            console.info(this.constructor.name, "EMIT _OnChange", this._value);
            this._OnChange(this._value);
        }
        if (this._OnTouhed && changed) {
            console.info(this.constructor.name, "EMIT _OnTouhed");
            this._OnTouhed();
        }
        if (changed) {
            this.change.emit({ value: this.value, text, model, old });
        }
        if (setinp) {
            setTimeout(() => (this.inp.nativeElement.value = text));
        }
    }

    ngOnChange() {
        console.log(this.constructor.name, "on ngOnChange", this.inp?.nativeElement ?? "NOT READY!");
    }

    ngOnInit() {
        console.log(this.constructor.name, "on ngOnInit", this.inp?.nativeElement ?? "NOT READY!");
    }

    ngAfterViewInit(): void {
        console.log(this.constructor.name, "on ngAfterViewInit", this.inp?.nativeElement ?? "NOT READY!");
        //$(function () {
        //  $("#sampleDTPicker").datepicker({ showButtonPanel: true, showOn: "button", dateFormat: this.format });
        //  var str = $.datepicker.formatDate("yy-mm-dd", new Date(1975, 3 - 1, 20)); //LOCALTIME
        //  var d = $.datepicker.parseDate("yy-mm-dd", str); //LOCALTIME
        //  console.log("format", str, "parse", d, "UTC", d.toISOString());
        //});
    }

    @ViewChild("inp", { read: ElementRef, static: true }) inp!: ElementRef;
    parse() {
        var inputText = this.inp.nativeElement.value;
        console.log(this.constructor.name, this.inp, "INPUT.value", inputText);
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
        console.log(this.constructor.name, "$event", e);
        this.init = $(e.target).datepicker(
            "dialog",
            this.value,
            (...args: any[]) => {
                console.log(this.constructor.name, "OnSelect", args);
                var model = $.datepicker.parseDate(UTC_FORMAT, args[0]); //STRING FORMATTED
                var model = $(args[1].input).datepicker("getDate"); //DATE OBJECT LT
                // this.valueUTC = args[0]; //STRING FORMATTED
                this._update(model, true, "");
                console.log(this.constructor.name, "model", model);
            },
            { showButtonPanel: true, dateFormat: UTC_FORMAT, altField: this.inp.nativeElement, altFormat: this.format },
            [e.clientX, e.clientY]
        );
    }

    private init: any;
    ngOnDestroy(): void {
        if (this.init)
            try {
                this.init.destroy();
                this.init.options.OnSelect = function () {};
            } catch (err) {
                console.error(this.constructor.name, "ERROR ngOnDestroy", err);
            }
    }
}

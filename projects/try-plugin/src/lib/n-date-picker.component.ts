import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NBaseFormCtrlComponent } from "./n-base-formctrl.directive";
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
export class NDatePickerComponent extends NBaseFormCtrlComponent<stringUTC, Date> implements OnInit, OnChanges, OnDestroy, AfterViewInit {
    constructor() {
        super();
        console.log(this.constructor.name, "on ctor", this.inp?.nativeElement ?? "NOT READY!");
    }

    override _onDisabling(disabled: boolean): boolean {
        //CUSTOM LOGIC TO HANDLE disabled AND RETURN disabled FLAG
        $(this.inp.nativeElement).datepicker("option", "disabled", disabled);
        $(this.inp.nativeElement).prop("disabled", disabled);
        return super._onDisabling(disabled);
    }

    protected _parseValueToModel(value: string | null): Date | null {
        //CUSTOM LOGIC TO SET INTERNAL _model WHEN value IS CHANGE/SETED
        return value ? $.datepicker.parseDate(UTC_FORMAT, value) : null;
    }
    protected _formatModelToValue(model: Date | null): string | null {
        //CUSTOM LOGIC TO SET BACK value WHEN INTERNAL _model IS CHANGED
        return model ? $.datepicker.formatDate(UTC_FORMAT, model) : null;
    }

    @Input() format = "dd/mm/yy"; //FORMAT STRING TO SHOW DATE
    //ESPOSE THE INTERNAL MODEL FOR TWO-WAY DATABIND [(model)]
    @Input() set model(model: Date | null) {
        if (model === undefined) {
            console.info(this.constructor.name, "IGNORE MODEL NOT SET === undefined");
            return;
        }
        if (!this._issame(this._model, model)) {
            console.info(this.constructor.name, "SET MODEL", model);
            this._nofixinp = false;
            this._update("model", model);
        } else {
            console.info(this.constructor.name, model, "MODEL IS SAME");
        }
    }
    get model(): Date | null {
        return this._model!;
    }
    @Output() modelChange = new EventEmitter<Date | null>();

    private _nofixinp = false;
    @Output() change = new EventEmitter<{ text: string; value: stringUTC | null; model: Date | null; old: Date | null }>();
    override _onChanging(from: "value" | "model", changed: boolean): boolean {
        const old = this.model;
        const text = $.datepicker.formatDate(this.format, this.model);
        if (from != "model") {
            console.info(this.constructor.name, "EMIT model CHANGE");
            this.modelChange.emit(this.model);
        }
        if (changed) {
            this.change.emit({ value: this.value, text, model: this.model, old });
        }
        if (this._nofixinp) {
            setTimeout(() => (this.inp.nativeElement.value = text));
            this._nofixinp = false;
        }
        return changed;
    }

    ngOnChanges(changes: SimpleChanges) {
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
        var model: Date | undefined;
        try {
            model = $.datepicker.parseDate(this.format, inputText);
        } catch (err) {
            // console.info("PARSING ERROR", err);
            model = undefined;
        }
        // this.valueUTC = $.datepicker.formatDate(UTC_FORMAT, D);
        this._nofixinp = true;
        this._update("model", model || null);
    }

    dialog(e: MouseEvent) {
        console.log(this.constructor.name, "$event", e);
        this.init = $(e.target).datepicker(
            "dialog",
            this.value,
            (...args: any[]) => {
                console.log(this.constructor.name, "OnSelect", args);
                //var model = $.datepicker.parseDate(UTC_FORMAT, args[0]); //STRING FORMATTED
                var model: Date | null = $(args[1].input).datepicker("getDate"); //DATE OBJECT LT
                // this.valueUTC = args[0]; //STRING FORMATTED
                this._nofixinp = false;
                this._update("model", model);
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

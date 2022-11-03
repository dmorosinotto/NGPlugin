import { AfterViewInit, OnDestroy, Directive, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
declare var $: any;
@Directive({
    selector: "n-base-lookup",
    standalone: true,
    // providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NBaseLookupComponent, multi: true }], //PURTROPPO QUESTO NON FUNZIONA SULLA ABSTRACT DEVO FARE IL PROVIDER NELLA CLASSE EREDITARE
})
export abstract class NBaseLookupComponent<M = any, I = string, T = string> implements AfterViewInit, OnDestroy, ControlValueAccessor {
    constructor() {
        console.log(this.constructor.name, "on ctor", this.txt?.nativeElement ?? "NOT READY!"); //NOT READY
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
        $(this.txt.nativeElement).prop("disabled", this._disabled);
        $(this.btn.nativeElement).prop("disabled", this._disabled);
        $(this.hid.nativeElement).prop("disabled", this._disabled);
    }

    @ViewChild("txt", { read: ElementRef, static: true }) txt!: ElementRef;
    @ViewChild("btn", { read: ElementRef, static: true }) btn!: ElementRef;
    @ViewChild("hid", { read: ElementRef, static: true }) hid!: ElementRef;
    private init: any; //PLUGIN INSTANCE $.genericLookup

    ngAfterViewInit(): void {
        console.log(this.constructor.name, "on ngAfterViewInit", this.txt?.nativeElement ?? "NOT READY!"); //OK
        console.info(this.constructor.name, "on ngAfterViewInit CURRENT", this.type, typeof this._txtFn, typeof this._hidFn);
        if (!this.type) {
            console.error("CAN'T INIT BaseLookup PLUGIN MISSING TYPE!!!", this.type);
        } else {
            //$(function () {
            this.init = $(this.txt.nativeElement).genericLookup({
                type: this.type,
                button: $(this.btn.nativeElement),
                hiddenControl: $(this.hid.nativeElement),
                remote: false, //this.remote,
                idField: (model: M | null) => {
                    const value = model == null ? null : this._hidFn(model);
                    console.warn(this.constructor.name, "idField nativeElement", model, "->", value);
                    this._update(model, "");
                },
                autocomplete: true,
                autocompleteOnLoad: true,
                pageSize: 5, //this.pageSize,
                selectedElement: (model: M | null) => {
                    const text = model == null ? "" : this._txtFn(model);
                    console.warn(
                        this.constructor.name,
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
                        this.constructor.name,
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
    }

    ngOnDestroy(): void {
        if (this.init)
            try {
                console.log("destroy LOOKUP ", obj);
                // this.init.closeLookupManually({ data: null });
                var obj = this.init; //COPIATO DA closeLookupManually
                obj.igGrid && $(obj.igGrid).igGrid("destroy");
                obj.modal && obj.modal.detach();
                obj.options.idField = null;
                obj.options.selectedElement = function () {};
                obj.options.getCustomColumns = function () {};
                obj.options.getRuntimeParameters = function () {};
            } catch (err) {
                console.error(this.constructor.name, "ERROR ngOnDestroy", err);
            }
    }

    @Input() type!: string; // = "Aircraft";
    // @Input() pageSize?: number = 5;
    // @Input() remote?: boolean = false;

    @Input() set model(model: M | null) {
        if (model === undefined) {
            console.info(this.constructor.name, "IGNORE MODEL NOT SET === undefined");
            return;
        }
        if (this._model !== model) {
            console.info(this.constructor.name, "SET MODEL", model);
            this._update(model, "model");
        } else {
            console.info(this.constructor.name, model, "MODEL IS SAME");
        }
    }
    get model(): M | null {
        return this._model!;
    }
    private _model?: M | null;
    @Output() modelChange = new EventEmitter<M | null>();

    @Input() set value(value: I | null) {
        if (value === undefined) {
            console.info(this.constructor.name, "IGNORE VALUE NOT SET === undefined");
            return;
        }
        if (this._value !== value) {
            if (this.init && this.hid) {
                console.info(this.constructor.name, "SET VALUE", value);
                $(this.hid.nativeElement).val(value);
                this.init.autoComplete({ data: this.init, value }); //autoComplete IMPLICIT CALL IdField(model) ==> _update
            } else {
                console.warn(this.constructor.name, "SET VALUE", value, "DELAY WAITING init..."); //TEORICAMENTE DOVREBBE PARTIRE CON autocompleteOnLoad=true
                this._value = value;
                //setTimeout(() => this.value = value);
            }
        } else {
            console.info(this.constructor.name, value, "VALUE IS SAME");
        }
    }
    get value(): I | null {
        return this._value!;
    }
    @Output() valueChange = new EventEmitter<I | null>();
    private _value?: I | null;

    protected abstract _txtFn: (model: M | null) => T;
    protected abstract _hidFn: (model: M | null) => I;

    @Input() immutable?: boolean;
    @Output() change = new EventEmitter<{ text: T | ""; value: I | null; model: M | null; old: M | null }>();
    private _issame = (old: M | null, cur: M | null) => (!!this.immutable && old === cur) || JSON.stringify(old) == JSON.stringify(cur);

    private _update(model: M | null, noemit: "" | "model" | "value" = "") {
        if (model === undefined) return; //EVITO INIZIALIZZAZIONE SE VALORE NON SPECIFICATO
        const old = this.model;
        const changed = !this._issame(old, model);
        const value = model == null ? null : this._hidFn(model);
        const text = model == null ? "" : this._txtFn(model);
        this._model = model;
        this._value = value;
        // this.hid.nativeElement.value = value; // $(this.hid.nativeElement).val(value);
        // this.txt.nativeElement.value = text; // $(this.txt.nativeElement).val(text);
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
        if (changed) this.change.emit({ text, value, model, old });
        console.warn(
            this.constructor.name,
            "FINE _update",
            this.value,
            "<->",
            $(this.hid.nativeElement).val(),
            text,
            "<==>",
            $(this.txt.nativeElement).val() //QUESTO NON E' ANCORA AGGIORNATO (CAMBIA SUBITO DOPO...)
        );
    }
}

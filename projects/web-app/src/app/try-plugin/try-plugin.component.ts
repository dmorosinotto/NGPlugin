import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
declare var $: any;
const UTC_FORMAT = "yy-mm-ddZ";
type stringUTC = string;
@Component({
    selector: "app-try-plugin",
    standalone: true,
    imports: [CommonModule],
    template: ` <p>Date: <input type="text" id="sampleDTPicker" /></p>
        <div class="flex">
            <input type="text" #inp (input)="parse()" />
            <span>Date: {{ valueUTC }}<button id="show" (click)="dialog($event)">x</button></span>
        </div>`,
    styles: ["div { display: flex }"],
})
export class TryPluginComponent implements AfterViewInit {
    constructor() {
        console.log("on ctor", this.inp?.nativeElement ?? "NOT READY!");
    }

    @Input() format = "dd/mm/yyyy";
    @Input() set valueUTC(value: stringUTC) {
        if (this._value != value) {
            console.info("SET", value);
            var date = $.datepicker.parseDate(UTC_FORMAT, value);
            if (date != null) {
                this._value = value;
                this.valueUTCChange.emit(value);
                setTimeout(() => (this.inp.nativeElement.value = $.datepicker.formatDate(this.format, date)));
            }
        } else {
            console.info(value, "IS SAME");
        }
    }
    get valueUTC(): stringUTC {
        return this._value;
    }
    private _value!: stringUTC;
    private _onChange = (v: string) => this.valueUTCChange.emit(v);
    @Output() valueUTCChange = new EventEmitter<string>();

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
        var dateText = this.inp.nativeElement.value;
        console.log(this.inp, "value", dateText);
        var date = $.datepicker.parseDate(this.format, dateText);
        if (date != null) {
            this.valueUTC = $.datepicker.formatDate(UTC_FORMAT, date);
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
            this.valueUTC,
            (...args: any[]) => {
                console.log("OnSelect", args);
                this.valueUTC = args[0]; //STRING FORMATTED
                var date = $(args[1].input).datepicker("getDate");
                console.log("model", date); //Date OBJECT LT
            },
            { showButtonPanel: true, dateFormat: UTC_FORMAT, altField: this.inp.nativeElement, altFormat: this.format },
            [e.clientX, e.clientY]
        );
    }
}

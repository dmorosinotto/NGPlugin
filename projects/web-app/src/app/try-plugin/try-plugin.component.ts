import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
declare var $: any;
@Component({
    selector: "app-try-plugin",
    standalone: true,
    imports: [CommonModule],
    template: ` <p>Date: <input type="text" id="sampleDTPicker" /></p>
        <div class="flex">
            <div>Date: <input type="text" #dtp /><button (click)="open()">DTP</button></div>
            <span>{{ birthday }}<button id="show" (click)="dialog($event)">x</button></span>
        </div>`,
    styles: [".flex { display: flex }"],
})
export class TryPluginComponent implements AfterViewInit {
    constructor() {}

    ngAfterViewInit(): void {
        // $(function () {
        $("#sampleDTPicker").datepicker({ showButtonPanel: true, showOn: "button", dateFormat: "dd/mm/yy" });
        var str = $.datepicker.formatDate("yy-mm-dd", new Date(1975, 3 - 1, 20)); //LOCALTIME
        var d = $.datepicker.parseDate("yy-mm-dd", str); //LOCALTIME
        console.log("format", str, "parse", d, "UTC", d.toISOString());
        // });
    }

    @ViewChild("dtp", { read: ElementRef, static: true }) inp!: ElementRef;
    open() {
        console.log(this.inp);
        $(this.inp.nativeElement).datepicker({ dateFormat: "dd/mm/yy" });
    }

    birthday = "1975-03-20";
    dialog(e: MouseEvent) {
        console.log("$event", e);
        $(e.target).datepicker(
            "dialog",
            this.birthday,
            (...args: any[]) => {
                console.log("OnSelect", args);
                this.birthday = args[0];
            },
            { showButtonPanel: true, dateFormat: "yy-mm-dd" },
            [e.clientX, e.clientY]
        );
    }
}

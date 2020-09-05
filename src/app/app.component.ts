import { Component } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { AppService, NestedArray } from "./app-service.service";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
})

export class AppComponent {
    NestedArray$: BehaviorSubject<any[]>;
    ReductionOperator$: BehaviorSubject<string>;
    Calculated$: Observable<number>;
    title: string = "Daxta - Phase 1 Technical Screening";

    constructor(private _svc: AppService, private titleService: Title) {
        this.titleService.setTitle(this.title);
        this.ReductionOperator$ = new BehaviorSubject<string>("Add");
        this.NestedArray$ = new BehaviorSubject<any>(_svc.GetNestedArray());
        this.Calculated$ = new Observable<number>((observer) => {
            this.ReductionOperator$.subscribe(reductionOperator => {
                this.NestedArray$.subscribe(array => {
                    var arr = this.flattenArray(array);
                    var values = this.totalArray(reductionOperator, arr);
                    observer.next(values);
                });
            });
        });
    }

    emitNewArray(e) {
        //Do not alter
        this.NestedArray$.next(this._svc.GetNestedArray());
    }

    toggleOperator(e) {
        //Do not alter
        if (this.ReductionOperator$.value === "Add") {
            this.ReductionOperator$.next("Multiply");
        } else {
            this.ReductionOperator$.next("Add");
        }
    }

    totalArray(operation: string, array: Array<number>): number {
        if (array.length == 0) return 0;

        var total = array[0];
        for (var i = 1; i < array.length; i++) {
            if (operation == 'Add')
                total += array[i];
            else if (operation == 'Multiply')
                total *= array[i];
        }

        return total;
    }

    flattenArray(array: NestedArray | Array<number>): Array<number> {
        var ret = [];
        for (var i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                ret = ret.concat(this.flattenArray(array[i] as Array<number>));
            } else {
                ret.push(array[i]);
            }
        }
        return ret;
    }
}

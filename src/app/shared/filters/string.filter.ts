import {ClrDatagridStringFilterInterface} from "@clr/angular";
import { Component } from "@angular/core";
import { Application } from "../models/applications"


class AppFilter implements ClrDatagridStringFilterInterface<Application> {
    accepts(app: Application, search: string):boolean {
        return "" + app.name == search
        || app.name.toLowerCase().indexOf(search) >= 0;
    };

}

@Component({})

class MyComponent {
    public appFilter = new AppFilter()
}

import { NgModule } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@NgModule({})
export class iconModule{
    constructor(
        private _domZanitizer: DomSanitizer,
        private _matIconRegistry: MatIconRegistry 
    ){
        this._matIconRegistry.addSvgIcon('save',this._domZanitizer.bypassSecurityTrustResourceUrl('assets/icons/save.svg'));
    }
}
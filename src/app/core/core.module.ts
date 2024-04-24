import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SettingsService } from './settings/settings.service';
import { MenuService } from './menu/menu.service';

@NgModule({
    imports: [
    ],
    providers: [
        SettingsService,
        MenuService
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    }
}

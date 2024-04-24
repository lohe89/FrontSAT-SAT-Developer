import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class SettingsService {

    public user: any;
    public app: any;
    public layout: any;

    constructor() {

        // User Settings
        // -----------------------------------
        this.user = {
            name: 'John',
            job: 'ng-developer',
            picture: ''
        };

        // App Settings
        // -----------------------------------
        this.app = {
            name: 'SuKarne',
            description: '',
            year: ((new Date()).getFullYear())
        };

        // Layout Settings
        // -----------------------------------
        this.layout = {
            isFixed: true,
            isCollapsed: false,
            isBoxed: false,
            isRTL: false,
            horizontal: false,
            isFloat: false,
            asideHover: false,
            theme: null,
            asideScrollbar: false,
            isCollapsedText: false,
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp'
        };

    }

    getAppSetting(name: any) {
        return name ? this.app[name] : this.app;
    }
    getUserSetting(name: any) {
        return name ? this.user[name] : this.user;
    }
    getLayoutSetting(name: any) {
        return name ? this.layout[name] : this.layout;
    }

    setAppSetting(name: any, value: any) {
        if (typeof this.app[name] !== 'undefined') {
            this.app[name] = value;
        }
    }
    setUserSetting(name: any, value: any) {
        if (typeof this.user[name] !== 'undefined') {
            this.user[name] = value;
        }
    }
    setLayoutSetting(name: any, value: any) {
        if (typeof this.layout[name] !== 'undefined') {
            return this.layout[name] = value;
        }
    }

    toggleLayoutSetting(name: any) {
        return this.setLayoutSetting(name, !this.getLayoutSetting(name));
    }

}

System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            // import * as io from 'socket.io-client';
            AppComponent = (function () {
                function AppComponent() {
                    this.socket = null;
                    this.title = 'Gabba';
                    this.username = '';
                    console.log('AppComponent loaded');
                    this.socket = io();
                    this.socket.on('connected', function (data) {
                        console.log('socket connected', data);
                        this.connected = true;
                    }.bind(this));
                    this.socket.on('disconnect', function (data) {
                        console.log('socket connected', data);
                        this.connected = false;
                    }.bind(this));
                    this.socket.on('error', function (data) {
                        console.log('Socket Error');
                        console.error(data.err);
                        this.connected = false;
                    }.bind(this));
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'gabba',
                        templateUrl: 'ng/gabba'
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=gabba.component.js.map

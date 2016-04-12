System.register(['angular2/core'], function(exports_1, context_1) {
    'use strict';
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
    var InputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            // import * as io from 'socket.io-client';
            InputComponent = (function () {
                function InputComponent() {
                    this.socket = null;
                    this.placeholder = 'Type here to start talking...';
                    console.log('input component loaded');
                    // this.sessionID = Cookie.getCookie('gabba.sid');
                    this.socket = io();
                    var self = this;
                    this.socket.on('connected', function (data) {
                        console.log('input: socket connected');
                        self.socket.emit('user:login', {
                            room: 'default',
                            session: data.session
                        });
                    });
                    this.socket.on('user:connected', function (data) {
                        console.log('input: user logged in.');
                    });
                }
                InputComponent.prototype.connect = function (data) {
                    // console.log('attempt login', data);
                };
                InputComponent.prototype.sendMessage = function (event) {
                    console.log('message: ' + event.target.value);
                };
                InputComponent = __decorate([
                    core_1.Component({
                        selector: 'gabba-input',
                        templateUrl: 'ng/chat/input'
                    }), 
                    __metadata('design:paramtypes', [])
                ], InputComponent);
                return InputComponent;
            }());
            exports_1("InputComponent", InputComponent);
        }
    }
});

//# sourceMappingURL=input.component.js.map

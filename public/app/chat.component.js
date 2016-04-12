System.register(['angular2/core', 'ng2-cookies/ng2-cookies'], function(exports_1, context_1) {
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
    var core_1, ng2_cookies_1;
    var ChatComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_cookies_1_1) {
                ng2_cookies_1 = ng2_cookies_1_1;
            }],
        execute: function() {
            ChatComponent = (function () {
                function ChatComponent() {
                    this.socket = null;
                    this.connecting = 'Waiting for connection to chat server...';
                    var self = this;
                    var sessionID = ng2_cookies_1.Cookie.getCookie('gabba.sid');
                    this.socket = io();
                    this.socket.on('connected', function (data) {
                        console.log('chat: socket connected');
                    });
                    this.socket.on('user:connected', function (data) {
                        console.log('input: user logged in.');
                        self.connecting = 'Hola ' + data.info.name.first + '!';
                    });
                }
                ChatComponent = __decorate([
                    core_1.Component({
                        selector: 'gabba-chat',
                        templateUrl: 'ng/chat/chat'
                    }), 
                    __metadata('design:paramtypes', [])
                ], ChatComponent);
                return ChatComponent;
            }());
            exports_1("ChatComponent", ChatComponent);
        }
    }
});

//# sourceMappingURL=chat.component.js.map

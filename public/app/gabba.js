System.register(['angular2/platform/browser', './sidebar.component', './chat.component', './input.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, sidebar_component_1, chat_component_1, input_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (sidebar_component_1_1) {
                sidebar_component_1 = sidebar_component_1_1;
            },
            function (chat_component_1_1) {
                chat_component_1 = chat_component_1_1;
            },
            function (input_component_1_1) {
                input_component_1 = input_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(sidebar_component_1.SidebarComponent);
            browser_1.bootstrap(chat_component_1.ChatComponent);
            browser_1.bootstrap(input_component_1.InputComponent);
        }
    }
});

//# sourceMappingURL=gabba.js.map

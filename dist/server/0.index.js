exports.ids = [0];
exports.modules = {

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var shared_module_1 = __webpack_require__(48);
var lazy_component_1 = __webpack_require__(433);
var lazy_routing_module_1 = __webpack_require__(434);
var LazyModule = (function () {
    function LazyModule() {
    }
    return LazyModule;
}());
LazyModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            lazy_routing_module_1.LazyRoutingModule
        ],
        declarations: [
            lazy_component_1.LazyComponent
        ]
    }),
    __metadata("design:paramtypes", [])
], LazyModule);
exports.LazyModule = LazyModule;


/***/ },

/***/ 433:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var LazyComponent = (function () {
    function LazyComponent() {
    }
    return LazyComponent;
}());
LazyComponent = __decorate([
    core_1.Component({
        changeDetection: core_1.ChangeDetectionStrategy.Default,
        encapsulation: core_1.ViewEncapsulation.Emulated,
        selector: 'lazy',
        template: "\n    <p>\n      Lazy component\n    </p>\n  "
    }),
    __metadata("design:paramtypes", [])
], LazyComponent);
exports.LazyComponent = LazyComponent;


/***/ },

/***/ 434:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(37);
var lazy_component_1 = __webpack_require__(433);
var LazyRoutingModule = (function () {
    function LazyRoutingModule() {
    }
    return LazyRoutingModule;
}());
LazyRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild([
                { path: '', component: lazy_component_1.LazyComponent }
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], LazyRoutingModule);
exports.LazyRoutingModule = LazyRoutingModule;


/***/ }

};;
//# sourceMappingURL=0.index.js.map
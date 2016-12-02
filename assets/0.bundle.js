webpackJsonp([0],{

/***/ 343:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(1);
var shared_module_1 = __webpack_require__(64);
var lazy_component_1 = __webpack_require__(739);
var lazy_routing_module_1 = __webpack_require__(740);
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

/***/ 739:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(1);
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

/***/ 740:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(51);
var lazy_component_1 = __webpack_require__(739);
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

});
//# sourceMappingURL=0.bundle.js.map
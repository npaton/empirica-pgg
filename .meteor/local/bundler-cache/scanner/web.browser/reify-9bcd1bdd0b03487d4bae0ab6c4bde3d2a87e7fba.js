module.export({ResizeSensor:()=>ResizeSensor});let __extends;module.link("tslib",{__extends(v){__extends=v}},0);let ResizeObserver;module.link("@juggle/resize-observer",{ResizeObserver(v){ResizeObserver=v}},1);let React;module.link("react",{"*"(v){React=v}},2);let findDOMNode;module.link("react-dom",{findDOMNode(v){findDOMNode=v}},3);let AbstractPureComponent2;module.link("../../common",{AbstractPureComponent2(v){AbstractPureComponent2=v}},4);let DISPLAYNAME_PREFIX;module.link("../../common/props",{DISPLAYNAME_PREFIX(v){DISPLAYNAME_PREFIX=v}},5);/*
 * Copyright 2018 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/** `ResizeSensor` requires a single DOM element child and will error otherwise. */
var ResizeSensor = /** @class */ (function (_super) {
    __extends(ResizeSensor, _super);
    function ResizeSensor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = null;
        _this.observer = new ResizeObserver(function (entries) { var _a, _b; return (_b = (_a = _this.props).onResize) === null || _b === void 0 ? void 0 : _b.call(_a, entries); });
        return _this;
    }
    ResizeSensor.prototype.render = function () {
        // pass-through render of single child
        return React.Children.only(this.props.children);
    };
    ResizeSensor.prototype.componentDidMount = function () {
        this.observeElement();
    };
    ResizeSensor.prototype.componentDidUpdate = function (prevProps) {
        this.observeElement(this.props.observeParents !== prevProps.observeParents);
    };
    ResizeSensor.prototype.componentWillUnmount = function () {
        this.observer.disconnect();
        this.element = null;
    };
    /**
     * Observe the DOM element, if defined and different from the currently
     * observed element. Pass `force` argument to skip element checks and always
     * re-observe.
     */
    ResizeSensor.prototype.observeElement = function (force) {
        if (force === void 0) { force = false; }
        var element = this.getElement();
        if (!(element instanceof Element)) {
            // stop everything if not defined
            this.observer.disconnect();
            return;
        }
        if (element === this.element && !force) {
            // quit if given same element -- nothing to update (unless forced)
            return;
        }
        else {
            // clear observer list if new element
            this.observer.disconnect();
            // remember element reference for next time
            this.element = element;
        }
        // observer callback is invoked immediately when observing new elements
        this.observer.observe(element);
        if (this.props.observeParents) {
            var parent_1 = element.parentElement;
            while (parent_1 != null) {
                this.observer.observe(parent_1);
                parent_1 = parent_1.parentElement;
            }
        }
    };
    ResizeSensor.prototype.getElement = function () {
        try {
            // using findDOMNode for two reasons:
            // 1. cloning to insert a ref is unwieldy and not performant.
            // 2. ensure that we resolve to an actual DOM node (instead of any JSX ref instance).
            // HACKHACK: see https://github.com/palantir/blueprint/issues/3979
            /* eslint-disable-next-line react/no-find-dom-node */
            return findDOMNode(this);
        }
        catch (_a) {
            // swallow error if findDOMNode is run on unmounted component.
            return null;
        }
    };
    ResizeSensor.displayName = "".concat(DISPLAYNAME_PREFIX, ".ResizeSensor");
    return ResizeSensor;
}(AbstractPureComponent2));

//# sourceMappingURL=resizeSensor.js.map
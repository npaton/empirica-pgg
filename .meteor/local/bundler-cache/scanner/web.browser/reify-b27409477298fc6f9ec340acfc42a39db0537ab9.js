module.export({Button:()=>Button,AnchorButton:()=>AnchorButton});let __assign,__extends;module.link("tslib",{__assign(v){__assign=v},__extends(v){__extends=v}},0);let React;module.link("react",{"*"(v){React=v}},1);let DISPLAYNAME_PREFIX,removeNonHTMLProps;module.link("../../common/props",{DISPLAYNAME_PREFIX(v){DISPLAYNAME_PREFIX=v},removeNonHTMLProps(v){removeNonHTMLProps=v}},2);let refHandler,setRef;module.link("../../common/refs",{refHandler(v){refHandler=v},setRef(v){setRef=v}},3);let AbstractButton;module.link("./abstractButton",{AbstractButton(v){AbstractButton=v}},4);/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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

// HACKHACK: these components should go in separate files
/* eslint-disable max-classes-per-file */




var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // need to keep this ref so that we can access it in AbstractButton#handleKeyUp
        _this.buttonRef = null;
        _this.handleRef = refHandler(_this, "buttonRef", _this.props.elementRef);
        return _this;
    }
    Button.prototype.render = function () {
        return (React.createElement("button", __assign({ type: "button", ref: this.handleRef }, removeNonHTMLProps(this.props), this.getCommonButtonProps()), this.renderChildren()));
    };
    Button.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.elementRef !== this.props.elementRef) {
            setRef(prevProps.elementRef, null);
            this.handleRef = refHandler(this, "buttonRef", this.props.elementRef);
            setRef(this.props.elementRef, this.buttonRef);
        }
    };
    Button.displayName = "".concat(DISPLAYNAME_PREFIX, ".Button");
    return Button;
}(AbstractButton));

var AnchorButton = /** @class */ (function (_super) {
    __extends(AnchorButton, _super);
    function AnchorButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // need to keep this ref so that we can access it in AbstractButton#handleKeyUp
        _this.buttonRef = null;
        _this.handleRef = refHandler(_this, "buttonRef", _this.props.elementRef);
        return _this;
    }
    AnchorButton.prototype.render = function () {
        var _a = this.props, href = _a.href, _b = _a.tabIndex, tabIndex = _b === void 0 ? 0 : _b;
        var commonProps = this.getCommonButtonProps();
        return (React.createElement("a", __assign({ role: "button", ref: this.handleRef }, removeNonHTMLProps(this.props), commonProps, { href: commonProps.disabled ? undefined : href, tabIndex: commonProps.disabled ? -1 : tabIndex }), this.renderChildren()));
    };
    AnchorButton.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.elementRef !== this.props.elementRef) {
            setRef(prevProps.elementRef, null);
            this.handleRef = refHandler(this, "buttonRef", this.props.elementRef);
            setRef(this.props.elementRef, this.buttonRef);
        }
    };
    AnchorButton.displayName = "".concat(DISPLAYNAME_PREFIX, ".AnchorButton");
    return AnchorButton;
}(AbstractButton));

//# sourceMappingURL=buttons.js.map
module.export({MultistepDialog:()=>MultistepDialog});let __assign,__extends,__rest;module.link("tslib",{__assign(v){__assign=v},__extends(v){__extends=v},__rest(v){__rest=v}},0);let classNames;module.link("classnames",{default(v){classNames=v}},1);let React;module.link("react",{"*"(v){React=v}},2);let AbstractPureComponent2,Classes,Utils;module.link("../../common",{AbstractPureComponent2(v){AbstractPureComponent2=v},Classes(v){Classes=v},Utils(v){Utils=v}},3);let DISPLAYNAME_PREFIX;module.link("../../common/props",{DISPLAYNAME_PREFIX(v){DISPLAYNAME_PREFIX=v}},4);let Button;module.link("../button/buttons",{Button(v){Button=v}},5);let Dialog;module.link("./dialog",{Dialog(v){Dialog=v}},6);let DialogStep;module.link("./dialogStep",{DialogStep(v){DialogStep=v}},7);/*
 * Copyright 2020 Palantir Technologies, Inc. All rights reserved.
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








var PADDING_BOTTOM = 0;
var MIN_WIDTH = 800;
var MultistepDialog = /** @class */ (function (_super) {
    __extends(MultistepDialog, _super);
    function MultistepDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = _this.getInitialIndexFromProps(_this.props);
        _this.renderDialogStep = function (step, index) {
            var _a;
            var stepNumber = index + 1;
            var hasBeenViewed = _this.state.lastViewedIndex >= index;
            var currentlySelected = _this.state.selectedIndex === index;
            return (React.createElement("div", { className: classNames(Classes.DIALOG_STEP_CONTAINER, (_a = {},
                    _a[Classes.ACTIVE] = currentlySelected,
                    _a[Classes.DIALOG_STEP_VIEWED] = hasBeenViewed,
                    _a)), key: index },
                React.createElement("div", { className: Classes.DIALOG_STEP, onClick: _this.handleClickDialogStep(index) },
                    React.createElement("div", { className: Classes.DIALOG_STEP_ICON }, stepNumber),
                    React.createElement("div", { className: Classes.DIALOG_STEP_TITLE }, step.props.title))));
        };
        _this.handleClickDialogStep = function (index) {
            if (index > _this.state.lastViewedIndex) {
                return;
            }
            return _this.getDialogStepChangeHandler(index);
        };
        return _this;
    }
    MultistepDialog.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className, navigationPosition = _b.navigationPosition, showCloseButtonInFooter = _b.showCloseButtonInFooter, isCloseButtonShown = _b.isCloseButtonShown, otherProps = __rest(_b, ["className", "navigationPosition", "showCloseButtonInFooter", "isCloseButtonShown"]);
        // Only one close button should be displayed. If the footer close button
        // is shown, we need to ensure the dialog close button is not displayed.
        var isCloseButtonVisible = !showCloseButtonInFooter && isCloseButtonShown;
        return (React.createElement(Dialog, __assign({ isCloseButtonShown: isCloseButtonVisible }, otherProps, { className: classNames((_a = {},
                _a[Classes.MULTISTEP_DIALOG_NAV_RIGHT] = navigationPosition === "right",
                _a[Classes.MULTISTEP_DIALOG_NAV_TOP] = navigationPosition === "top",
                _a), className), style: this.getDialogStyle() }),
            React.createElement("div", { className: Classes.MULTISTEP_DIALOG_PANELS },
                this.renderLeftPanel(),
                this.maybeRenderRightPanel())));
    };
    MultistepDialog.prototype.componentDidUpdate = function (prevProps) {
        if ((prevProps.resetOnClose || prevProps.initialStepIndex !== this.props.initialStepIndex) &&
            !prevProps.isOpen &&
            this.props.isOpen) {
            this.setState(this.getInitialIndexFromProps(this.props));
        }
    };
    MultistepDialog.prototype.getDialogStyle = function () {
        return __assign({ minWidth: MIN_WIDTH, paddingBottom: PADDING_BOTTOM }, this.props.style);
    };
    MultistepDialog.prototype.renderLeftPanel = function () {
        return (React.createElement("div", { className: Classes.MULTISTEP_DIALOG_LEFT_PANEL }, this.getDialogStepChildren().filter(isDialogStepElement).map(this.renderDialogStep)));
    };
    MultistepDialog.prototype.maybeRenderRightPanel = function () {
        var steps = this.getDialogStepChildren();
        if (steps.length <= this.state.selectedIndex) {
            return null;
        }
        var _a = steps[this.state.selectedIndex].props, className = _a.className, panel = _a.panel, panelClassName = _a.panelClassName;
        return (React.createElement("div", { className: classNames(Classes.MULTISTEP_DIALOG_RIGHT_PANEL, className, panelClassName) },
            panel,
            this.renderFooter()));
    };
    MultistepDialog.prototype.renderFooter = function () {
        var _a = this.props, closeButtonProps = _a.closeButtonProps, isCloseButtonShown = _a.isCloseButtonShown, showCloseButtonInFooter = _a.showCloseButtonInFooter, onClose = _a.onClose;
        var isFooterCloseButtonVisible = showCloseButtonInFooter && isCloseButtonShown;
        var maybeCloseButton = !isFooterCloseButtonVisible ? undefined : (React.createElement(Button, __assign({ text: "Close", onClick: onClose }, closeButtonProps)));
        return (React.createElement("div", { className: Classes.MULTISTEP_DIALOG_FOOTER },
            maybeCloseButton,
            React.createElement("div", { className: Classes.DIALOG_FOOTER_ACTIONS }, this.renderButtons())));
    };
    MultistepDialog.prototype.renderButtons = function () {
        var _a, _b;
        var selectedIndex = this.state.selectedIndex;
        var steps = this.getDialogStepChildren();
        var buttons = [];
        if (this.state.selectedIndex > 0) {
            var backButtonProps = (_a = steps[selectedIndex].props.backButtonProps) !== null && _a !== void 0 ? _a : this.props.backButtonProps;
            buttons.push(React.createElement(Button, __assign({ key: "back", onClick: this.getDialogStepChangeHandler(selectedIndex - 1), text: "Back" }, backButtonProps)));
        }
        if (selectedIndex === this.getDialogStepChildren().length - 1) {
            buttons.push(React.createElement(Button, __assign({ intent: "primary", key: "final", text: "Submit" }, this.props.finalButtonProps)));
        }
        else {
            var nextButtonProps = (_b = steps[selectedIndex].props.nextButtonProps) !== null && _b !== void 0 ? _b : this.props.nextButtonProps;
            buttons.push(React.createElement(Button, __assign({ intent: "primary", key: "next", onClick: this.getDialogStepChangeHandler(selectedIndex + 1), text: "Next" }, nextButtonProps)));
        }
        return buttons;
    };
    MultistepDialog.prototype.getDialogStepChangeHandler = function (index) {
        var _this = this;
        return function (event) {
            if (_this.props.onChange !== undefined) {
                var steps = _this.getDialogStepChildren();
                var prevStepId = steps[_this.state.selectedIndex].props.id;
                var newStepId = steps[index].props.id;
                _this.props.onChange(newStepId, prevStepId, event);
            }
            _this.setState({
                lastViewedIndex: Math.max(_this.state.lastViewedIndex, index),
                selectedIndex: index,
            });
        };
    };
    /** Filters children to only `<DialogStep>`s */
    MultistepDialog.prototype.getDialogStepChildren = function (props) {
        if (props === void 0) { props = this.props; }
        return React.Children.toArray(props.children).filter(isDialogStepElement);
    };
    MultistepDialog.prototype.getInitialIndexFromProps = function (props) {
        if (props.initialStepIndex !== undefined) {
            var boundedInitialIndex = Math.max(0, Math.min(props.initialStepIndex, this.getDialogStepChildren(props).length - 1));
            return {
                lastViewedIndex: boundedInitialIndex,
                selectedIndex: boundedInitialIndex,
            };
        }
        else {
            return {
                lastViewedIndex: 0,
                selectedIndex: 0,
            };
        }
    };
    MultistepDialog.displayName = "".concat(DISPLAYNAME_PREFIX, ".MultistepDialog");
    MultistepDialog.defaultProps = {
        canOutsideClickClose: true,
        isOpen: false,
        navigationPosition: "left",
        resetOnClose: true,
        showCloseButtonInFooter: false,
    };
    return MultistepDialog;
}(AbstractPureComponent2));

function isDialogStepElement(child) {
    return Utils.isElementOfType(child, DialogStep);
}
//# sourceMappingURL=multistepDialog.js.map
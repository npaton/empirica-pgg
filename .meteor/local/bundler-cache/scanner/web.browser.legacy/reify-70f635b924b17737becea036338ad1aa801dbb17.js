"use strict";
/*
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverflowList = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var boundary_1 = require("../../common/boundary");
var Classes = tslib_1.__importStar(require("../../common/classes"));
var errors_1 = require("../../common/errors");
var props_1 = require("../../common/props");
var utils_1 = require("../../common/utils");
var resizeSensor_1 = require("../resize-sensor/resizeSensor");
var OverflowList = /** @class */ (function (_super) {
    tslib_1.__extends(OverflowList, _super);
    function OverflowList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            chopSize: _this.defaultChopSize(),
            lastChopSize: null,
            lastOverflowCount: 0,
            overflow: [],
            repartitioning: false,
            visible: _this.props.items,
        };
        _this.spacer = null;
        _this.resize = function () {
            _this.repartition();
        };
        return _this;
    }
    OverflowList.ofType = function () {
        return OverflowList;
    };
    OverflowList.prototype.componentDidMount = function () {
        this.repartition();
    };
    OverflowList.prototype.shouldComponentUpdate = function (_nextProps, nextState) {
        // We want this component to always re-render, even when props haven't changed, so that
        // changes in the renderers' behavior can be reflected.
        // The following statement prevents re-rendering only in the case where the state changes
        // identity (i.e. setState was called), but the state is still the same when
        // shallow-compared to the previous state.
        return !(this.state !== nextState && (0, utils_1.shallowCompareKeys)(this.state, nextState));
    };
    OverflowList.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a, _b;
        if (prevProps.observeParents !== this.props.observeParents) {
            console.warn(errors_1.OVERFLOW_LIST_OBSERVE_PARENTS_CHANGED);
        }
        if (prevProps.collapseFrom !== this.props.collapseFrom ||
            prevProps.items !== this.props.items ||
            prevProps.minVisibleItems !== this.props.minVisibleItems ||
            prevProps.overflowRenderer !== this.props.overflowRenderer ||
            prevProps.alwaysRenderOverflow !== this.props.alwaysRenderOverflow ||
            prevProps.visibleItemRenderer !== this.props.visibleItemRenderer) {
            // reset visible state if the above props change.
            this.setState({
                chopSize: this.defaultChopSize(),
                lastChopSize: null,
                lastOverflowCount: 0,
                overflow: [],
                repartitioning: true,
                visible: this.props.items,
            });
        }
        var _c = this.state, repartitioning = _c.repartitioning, overflow = _c.overflow, lastOverflowCount = _c.lastOverflowCount;
        if (
        // if a resize operation has just completed
        repartitioning === false &&
            prevState.repartitioning === true) {
            // only invoke the callback if the UI has actually changed
            if (overflow.length !== lastOverflowCount) {
                (_b = (_a = this.props).onOverflow) === null || _b === void 0 ? void 0 : _b.call(_a, overflow.slice());
            }
        }
        else if (!(0, utils_1.shallowCompareKeys)(prevState, this.state)) {
            this.repartition();
        }
    };
    OverflowList.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, collapseFrom = _a.collapseFrom, observeParents = _a.observeParents, style = _a.style, _b = _a.tagName, tagName = _b === void 0 ? "div" : _b, visibleItemRenderer = _a.visibleItemRenderer;
        var overflow = this.maybeRenderOverflow();
        var list = React.createElement(tagName, {
            className: (0, classnames_1.default)(Classes.OVERFLOW_LIST, className),
            style: style,
        }, collapseFrom === boundary_1.Boundary.START ? overflow : null, this.state.visible.map(visibleItemRenderer), collapseFrom === boundary_1.Boundary.END ? overflow : null, React.createElement("div", { className: Classes.OVERFLOW_LIST_SPACER, ref: function (ref) { return (_this.spacer = ref); } }));
        return (React.createElement(resizeSensor_1.ResizeSensor, { onResize: this.resize, observeParents: observeParents }, list));
    };
    OverflowList.prototype.maybeRenderOverflow = function () {
        var overflow = this.state.overflow;
        if (overflow.length === 0 && !this.props.alwaysRenderOverflow) {
            return null;
        }
        return this.props.overflowRenderer(overflow.slice());
    };
    OverflowList.prototype.repartition = function () {
        var _this = this;
        var _a;
        if (this.spacer == null) {
            return;
        }
        // if lastChopSize was 1, then our binary search has exhausted.
        var partitionExhausted = this.state.lastChopSize === 1;
        var minVisible = (_a = this.props.minVisibleItems) !== null && _a !== void 0 ? _a : 0;
        // spacer has flex-shrink and width 1px so if it's much smaller then we know to shrink
        var shouldShrink = this.spacer.offsetWidth < 0.9 && this.state.visible.length > minVisible;
        // we only check partitionExhausted for shouldGrow to ensure shrinking is the final operation.
        var shouldGrow = (this.spacer.offsetWidth >= 1 || this.state.visible.length < minVisible) &&
            this.state.overflow.length > 0 &&
            !partitionExhausted;
        if (shouldShrink || shouldGrow) {
            this.setState(function (state) {
                var visible;
                var overflow;
                if (_this.props.collapseFrom === boundary_1.Boundary.END) {
                    var result = shiftElements(state.visible, state.overflow, _this.state.chopSize * (shouldShrink ? 1 : -1));
                    visible = result[0];
                    overflow = result[1];
                }
                else {
                    var result = shiftElements(state.overflow, state.visible, _this.state.chopSize * (shouldShrink ? -1 : 1));
                    overflow = result[0];
                    visible = result[1];
                }
                return {
                    chopSize: halve(state.chopSize),
                    lastChopSize: state.chopSize,
                    // if we're starting a new partition cycle, record the last overflow count so we can track whether the UI changes after the new overflow is calculated
                    lastOverflowCount: _this.isFirstPartitionCycle(state.chopSize)
                        ? state.overflow.length
                        : state.lastOverflowCount,
                    overflow: overflow,
                    repartitioning: true,
                    visible: visible,
                };
            });
        }
        else {
            // repartition complete!
            this.setState({
                chopSize: this.defaultChopSize(),
                lastChopSize: null,
                repartitioning: false,
            });
        }
    };
    OverflowList.prototype.defaultChopSize = function () {
        return halve(this.props.items.length);
    };
    OverflowList.prototype.isFirstPartitionCycle = function (currentChopSize) {
        return currentChopSize === this.defaultChopSize();
    };
    OverflowList.displayName = "".concat(props_1.DISPLAYNAME_PREFIX, ".OverflowList");
    OverflowList.defaultProps = {
        alwaysRenderOverflow: false,
        collapseFrom: boundary_1.Boundary.START,
        minVisibleItems: 0,
    };
    return OverflowList;
}(React.Component));
exports.OverflowList = OverflowList;
function halve(num) {
    return Math.ceil(num / 2);
}
function shiftElements(leftArray, rightArray, num) {
    // if num is positive then elements are shifted from left-to-right, if negative then right-to-left
    var allElements = leftArray.concat(rightArray);
    var newLeftLength = leftArray.length - num;
    if (newLeftLength <= 0) {
        return [[], allElements];
    }
    else if (newLeftLength >= allElements.length) {
        return [allElements, []];
    }
    var sliceIndex = allElements.length - newLeftLength;
    return [allElements.slice(0, -sliceIndex), allElements.slice(-sliceIndex)];
}
//# sourceMappingURL=overflowList.js.map
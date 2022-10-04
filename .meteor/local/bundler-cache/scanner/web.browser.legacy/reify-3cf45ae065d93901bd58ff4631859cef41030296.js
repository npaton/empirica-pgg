"use strict";
/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
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
exports.MenuItem = void 0;
var tslib_1 = require("tslib");
/* eslint-disable deprecation/deprecation */
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var common_1 = require("../../common");
var props_1 = require("../../common/props");
var icon_1 = require("../icon/icon");
var popover_1 = require("../popover/popover");
var text_1 = require("../text/text");
var menu_1 = require("./menu");
/** @deprecated use { MenuItem2 } from "@blueprintjs/popover2" instead */
var MenuItem = /** @class */ (function (_super) {
    tslib_1.__extends(MenuItem, _super);
    function MenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuItem.prototype.render = function () {
        var _a, _b;
        var _c = this.props, 
        // eslint-disable-next-line deprecation/deprecation
        active = _c.active, className = _c.className, children = _c.children, disabled = _c.disabled, icon = _c.icon, intent = _c.intent, labelClassName = _c.labelClassName, labelElement = _c.labelElement, multiline = _c.multiline, popoverProps = _c.popoverProps, _d = _c.roleStructure, roleStructure = _d === void 0 ? "menuitem" : _d, selected = _c.selected, shouldDismissPopover = _c.shouldDismissPopover, submenuProps = _c.submenuProps, text = _c.text, textClassName = _c.textClassName, _e = _c.tagName, tagName = _e === void 0 ? "a" : _e, htmlTitle = _c.htmlTitle, htmlProps = tslib_1.__rest(_c, ["active", "className", "children", "disabled", "icon", "intent", "labelClassName", "labelElement", "multiline", "popoverProps", "roleStructure", "selected", "shouldDismissPopover", "submenuProps", "text", "textClassName", "tagName", "htmlTitle"]);
        var hasIcon = icon != null;
        var hasSubmenu = children != null;
        var intentClass = common_1.Classes.intentClass(intent);
        var anchorClasses = (0, classnames_1.default)(common_1.Classes.MENU_ITEM, intentClass, (_a = {},
            _a[common_1.Classes.ACTIVE] = active,
            _a[common_1.Classes.DISABLED] = disabled,
            // prevent popover from closing when clicking on submenu trigger or disabled item
            _a[common_1.Classes.POPOVER_DISMISS] = shouldDismissPopover && !disabled && !hasSubmenu,
            _a[common_1.Classes.SELECTED] = selected || (active && intentClass === undefined),
            _a), className);
        var _f = roleStructure === "listoption"
            ? ["option", undefined, active || selected] // parent has listbox role, or is a <select>
            : ["none", "menuitem", undefined], liRole = _f[0], targetRole = _f[1], ariaSelected = _f[2]; // parent has menu role
        var target = React.createElement(tagName, tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ role: targetRole, tabIndex: 0 }, htmlProps), (disabled ? DISABLED_PROPS : {})), { className: anchorClasses }), hasIcon ? (
        // wrap icon in a <span> in case `icon` is a custom element rather than a built-in icon identifier,
        // so that we always render this class
        React.createElement("span", { className: common_1.Classes.MENU_ITEM_ICON },
            React.createElement(icon_1.Icon, { icon: icon, "aria-hidden": true, tabIndex: -1 }))) : undefined, React.createElement(text_1.Text, { className: (0, classnames_1.default)(common_1.Classes.FILL, textClassName), ellipsize: !multiline, title: htmlTitle }, text), this.maybeRenderLabel(labelElement), hasSubmenu ? React.createElement(icon_1.Icon, { className: common_1.Classes.MENU_SUBMENU_ICON, icon: "caret-right" }) : undefined);
        var liClasses = (0, classnames_1.default)((_b = {}, _b[common_1.Classes.MENU_SUBMENU] = hasSubmenu, _b));
        return (React.createElement("li", { className: liClasses, role: liRole, "aria-selected": ariaSelected }, this.maybeRenderPopover(target, children)));
    };
    MenuItem.prototype.maybeRenderLabel = function (labelElement) {
        var _a = this.props, label = _a.label, labelClassName = _a.labelClassName;
        if (label == null && labelElement == null) {
            return null;
        }
        return (React.createElement("span", { className: (0, classnames_1.default)(common_1.Classes.MENU_ITEM_LABEL, labelClassName) },
            label,
            labelElement));
    };
    MenuItem.prototype.maybeRenderPopover = function (target, children) {
        if (children == null) {
            return target;
        }
        var _a = this.props, disabled = _a.disabled, popoverProps = _a.popoverProps, submenuProps = _a.submenuProps;
        return (React.createElement(popover_1.Popover, tslib_1.__assign({ autoFocus: false, captureDismiss: false, disabled: disabled, enforceFocus: false, hoverCloseDelay: 0, interactionKind: popover_1.PopoverInteractionKind.HOVER, modifiers: SUBMENU_POPOVER_MODIFIERS, position: common_1.Position.RIGHT_TOP, usePortal: false }, popoverProps, { content: React.createElement(menu_1.Menu, tslib_1.__assign({}, submenuProps), children), minimal: true, popoverClassName: (0, classnames_1.default)(common_1.Classes.MENU_SUBMENU, popoverProps === null || popoverProps === void 0 ? void 0 : popoverProps.popoverClassName), target: target })));
    };
    MenuItem.defaultProps = {
        active: false,
        disabled: false,
        multiline: false,
        popoverProps: {},
        selected: false,
        shouldDismissPopover: true,
        text: "",
    };
    MenuItem.displayName = "".concat(props_1.DISPLAYNAME_PREFIX, ".MenuItem");
    return MenuItem;
}(common_1.AbstractPureComponent2));
exports.MenuItem = MenuItem;
var SUBMENU_POPOVER_MODIFIERS = {
    // 20px padding - scrollbar width + a bit
    flip: { boundariesElement: "viewport", padding: 20 },
    // shift popover up 5px so MenuItems align
    offset: { offset: -5 },
    preventOverflow: { boundariesElement: "viewport", padding: 20 },
};
// props to ignore when disabled
var DISABLED_PROPS = {
    href: undefined,
    onClick: undefined,
    onMouseDown: undefined,
    onMouseEnter: undefined,
    onMouseLeave: undefined,
    tabIndex: -1,
};
//# sourceMappingURL=menuItem.js.map
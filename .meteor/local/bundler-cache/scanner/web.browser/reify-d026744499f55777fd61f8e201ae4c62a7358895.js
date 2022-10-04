module.export({elementIsOrContains:()=>elementIsOrContains,getActiveElement:()=>getActiveElement,throttleEvent:()=>throttleEvent,throttleReactEventCallback:()=>throttleReactEventCallback,throttle:()=>throttle});/*
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
function elementIsOrContains(element, testElement) {
    return element === testElement || element.contains(testElement);
}
/**
 * Gets the active element in the document or shadow root (if an element is provided, and it's in the shadow DOM).
 */
function getActiveElement(element, options) {
    var _a;
    if (element == null) {
        return document.activeElement;
    }
    var rootNode = ((_a = element.getRootNode(options)) !== null && _a !== void 0 ? _a : document);
    return rootNode.activeElement;
}
/**
 * Throttle an event on an EventTarget by wrapping it in a
 * `requestAnimationFrame` call. Returns the event handler that was bound to
 * given eventName so you can clean up after yourself.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
 */
/* istanbul ignore next */
function throttleEvent(target, eventName, newEventName) {
    var throttledFunc = throttleImpl(function (event) {
        target.dispatchEvent(new CustomEvent(newEventName, event));
    });
    target.addEventListener(eventName, throttledFunc);
    return throttledFunc;
}
/**
 * Throttle a callback by wrapping it in a `requestAnimationFrame` call. Returns
 * the throttled function.
 *
 * @see https://www.html5rocks.com/en/tutorials/speed/animations/
 */
function throttleReactEventCallback(callback, options) {
    if (options === void 0) { options = {}; }
    var throttledFunc = throttleImpl(callback, function (event2) {
        if (options.preventDefault) {
            event2.preventDefault();
        }
    }, 
    // prevent React from reclaiming the event object before we reference it
    function (event2) { return event2.persist(); });
    return throttledFunc;
}
/**
 * Throttle a method by wrapping it in a `requestAnimationFrame` call. Returns
 * the throttled function.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function throttle(method) {
    return throttleImpl(method);
}
// eslint-disable-next-line @typescript-eslint/ban-types
function throttleImpl(onAnimationFrameRequested, onBeforeIsRunningCheck, onAfterIsRunningCheck) {
    var isRunning = false;
    var func = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        onBeforeIsRunningCheck === null || onBeforeIsRunningCheck === void 0 ? void 0 : onBeforeIsRunningCheck.apply(void 0, args);
        if (isRunning) {
            return;
        }
        isRunning = true;
        onAfterIsRunningCheck === null || onAfterIsRunningCheck === void 0 ? void 0 : onAfterIsRunningCheck.apply(void 0, args);
        requestAnimationFrame(function () {
            onAnimationFrameRequested.apply(void 0, args);
            isRunning = false;
        });
    };
    return func;
}
//# sourceMappingURL=domUtils.js.map
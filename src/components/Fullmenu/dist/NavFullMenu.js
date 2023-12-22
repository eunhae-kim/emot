"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.NavFullMenu = void 0;
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
var react_1 = require("react");
function NavFullMenu(_a) {
    var title = _a.title, fullNavList = _a.fullNavList, edited = _a.edited, props = __rest(_a, ["title", "fullNavList", "edited"]);
    var _b = react_1.useState(0), activeIndex = _b[0], setActiveIndex = _b[1]; // active한 index값을 관리하는 State
    var tabClickHandler = function (index) {
        // 웹접근성 포커스 이동 작업 할 것
        setActiveIndex(index);
    };
    return (react_1["default"].createElement("div", { className: "nav-wrap" },
        react_1["default"].createElement("ul", { className: "nav-subject" }, fullNavList.map(function (obj, index) { return (
        // li선택 .active 추가
        react_1["default"].createElement("li", { key: index, className: activeIndex === index ? 'active' : null },
            react_1["default"].createElement("button", { type: "button", className: "btn-icon", onClick: function () { return tabClickHandler(index); } },
                react_1["default"].createElement("i", { className: obj.icon }),
                react_1["default"].createElement("span", null, obj.navTitle)))); })),
        fullNavList.map(function (objs, index) { return (react_1["default"].createElement("ul", { key: index, className: "nav-sub-depth " + (activeIndex === index ? 'active' : '') }, objs.navList.map(function (obj, i) { return (react_1["default"].createElement("li", { key: i, className: "sub-depth-li" },
            edited !== true ? (react_1["default"].createElement("a", { href: "/", className: "nav-subtitle" },
                react_1["default"].createElement("i", { className: "bl-arr" }),
                obj.subtitle)) : (react_1["default"].createElement("span", { className: "check-box depth-1" },
                react_1["default"].createElement("input", { type: "checkbox", id: "ck-" + objs.id + "-" + i }),
                react_1["default"].createElement("span", { className: "check-ico" },
                    react_1["default"].createElement("i", { className: "bl-check" })),
                react_1["default"].createElement("label", { htmlFor: "ck-" + objs.id + "-" + i }, obj.subtitle))),
            obj.sublist.length !== 0 ? (react_1["default"].createElement("ul", { className: "nav-sublist" }, obj.sublist.map(function (navlist, subindex) { return (react_1["default"].createElement("li", { key: subindex }, edited !== true ? (react_1["default"].createElement("a", { href: navlist.href }, navlist.name)) : (react_1["default"].createElement("span", { className: "check-box depth-2" },
                react_1["default"].createElement("input", { type: "checkbox", id: "cks-" + objs.id + "-" + i + "-" + subindex }),
                react_1["default"].createElement("span", { className: "check-ico" },
                    react_1["default"].createElement("i", { className: "bl-check" })),
                react_1["default"].createElement("label", { htmlFor: "cks-" + objs.id + "-" + i + "-" + subindex }, navlist.name))))); }))) : (''))); }))); })));
}
exports.NavFullMenu = NavFullMenu;

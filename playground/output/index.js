var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// playground/View.tsx
var import_react = __toESM(require("react"));
var dummyTrueValue = Date.now();
var View = () => {
  return /* @__PURE__ */ import_react.default.createElement("div", null, dummyTrueValue && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, "Preserve in production"));
};

// playground/index.ts
console.log("text in prod");
var API_LINK = "https://myserver.com";
if (typeof Date.now() == "number") {
  console.log("This will be preserved. It will become if(anotherConditiion) {...}");
} else {
  console.log("This one too will be preserved");
}
var anotherExample = "text in production";
if (Date.now() > 234253) {
  console.log("Preserve me", API_LINK, anotherExample, View);
}

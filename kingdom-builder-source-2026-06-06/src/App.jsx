import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1cd573cc"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/app/src/App.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import { Toaster } from "/src/components/ui/toaster.jsx";
import { QueryClientProvider } from "/node_modules/.vite/deps/@tanstack_react-query.js?v=67634bec";
import { queryClientInstance } from "/src/lib/query-client.js";
import { BrowserRouter as Router, Route, Routes } from "/node_modules/.vite/deps/react-router-dom.js?v=a803305c";
import PageNotFound from "/src/lib/PageNotFound.jsx";
import { AuthProvider, useAuth } from "/src/lib/AuthContext.jsx";
import UserNotRegisteredError from "/src/components/UserNotRegisteredError.jsx";
import Game from "/src/pages/Game.jsx?t=1780754825034";
const AuthenticatedApp = () => {
  _s();
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  if (isLoadingPublicSettings || isLoadingAuth) {
    return /* @__PURE__ */ jsxDEV("div", { "data-source-location": "App:16:6", "data-dynamic-content": "false", className: "fixed inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { "data-source-location": "App:17:8", "data-dynamic-content": "false", className: "w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 36,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 35,
      columnNumber: 7
    }, this);
  }
  if (authError) {
    if (authError.type === "user_not_registered") {
      return /* @__PURE__ */ jsxDEV(UserNotRegisteredError, { "data-source-location": "App:25:13", "data-dynamic-content": "false" }, void 0, false, {
        fileName: "/app/src/App.jsx",
        lineNumber: 44,
        columnNumber: 14
      }, this);
    } else if (authError.type === "auth_required") {
      navigateToLogin();
      return null;
    }
  }
  return /* @__PURE__ */ jsxDEV(Routes, { "data-source-location": "App:35:4", "data-dynamic-content": "true", children: [
    /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:36:6", "data-dynamic-content": "true", path: "/", element: /* @__PURE__ */ jsxDEV(Game, { "data-source-location": "App:36:31", "data-dynamic-content": "false" }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 55,
      columnNumber: 92
    }, this) }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { "data-source-location": "App:37:6", "data-dynamic-content": "true", path: "*", element: /* @__PURE__ */ jsxDEV(PageNotFound, { "data-source-location": "App:37:31", "data-dynamic-content": "false" }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 56,
      columnNumber: 92
    }, this) }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 56,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/App.jsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
};
_s(AuthenticatedApp, "hc27/Ofx9hlCa4t19zXbf5czR38=", false, function() {
  return [useAuth];
});
_c = AuthenticatedApp;
function App() {
  return /* @__PURE__ */ jsxDEV(AuthProvider, { "data-source-location": "App:46:4", "data-dynamic-content": "true", children: /* @__PURE__ */ jsxDEV(QueryClientProvider, { "data-source-location": "App:47:6", "data-dynamic-content": "true", client: queryClientInstance, children: [
    /* @__PURE__ */ jsxDEV(Router, { "data-source-location": "App:48:8", "data-dynamic-content": "false", children: /* @__PURE__ */ jsxDEV(AuthenticatedApp, { "data-source-location": "App:49:10", "data-dynamic-content": "false" }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 68,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 67,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(Toaster, { "data-source-location": "App:51:8", "data-dynamic-content": "false" }, void 0, false, {
      fileName: "/app/src/App.jsx",
      lineNumber: 70,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/App.jsx",
    lineNumber: 66,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/App.jsx",
    lineNumber: 65,
    columnNumber: 5
  }, this);
}
_c2 = App;
export default App;
var _c, _c2;
$RefreshReg$(_c, "AuthenticatedApp");
$RefreshReg$(_c2, "App");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/app/src/App.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/app/src/App.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBZ0JROzs7Ozs7Ozs7Ozs7Ozs7OztBQWhCUixTQUFTQSxlQUFlO0FBQ3hCLFNBQVNDLDJCQUEyQjtBQUNwQyxTQUFTQywyQkFBMkI7QUFDcEMsU0FBU0MsaUJBQWlCQyxRQUFRQyxPQUFPQyxjQUFjO0FBQ3ZELE9BQU9DLGtCQUFrQjtBQUN6QixTQUFTQyxjQUFjQyxlQUFlO0FBQ3RDLE9BQU9DLDRCQUE0QjtBQUNuQyxPQUFPQyxVQUFVO0FBRWpCLE1BQU1DLG1CQUFtQkEsTUFBTTtBQUFBQyxLQUFBO0FBQzdCLFFBQU0sRUFBRUMsZUFBZUMseUJBQXlCQyxXQUFXQyxnQkFBZ0IsSUFBSVIsUUFBUTtBQUd2RixNQUFJTSwyQkFBMkJELGVBQWU7QUFDNUMsV0FDRSx1QkFBQyxTQUFJLHdCQUFxQixZQUFXLHdCQUFxQixTQUFRLFdBQVUsa0RBQzFFLGlDQUFDLFNBQUksd0JBQXFCLFlBQVcsd0JBQXFCLFNBQVEsV0FBVSxvRkFBNUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUE2SixLQUQvSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBRUE7QUFBQSxFQUVKO0FBR0EsTUFBSUUsV0FBVztBQUNiLFFBQUlBLFVBQVVFLFNBQVMsdUJBQXVCO0FBQzVDLGFBQU8sdUJBQUMsMEJBQXVCLHdCQUFxQixhQUFZLHdCQUFxQixXQUE5RTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQXFGO0FBQUEsSUFDOUYsV0FBV0YsVUFBVUUsU0FBUyxpQkFBaUI7QUFFN0NELHNCQUFnQjtBQUNoQixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFHQSxTQUNFLHVCQUFDLFVBQU8sd0JBQXFCLFlBQVcsd0JBQXFCLFFBQzNEO0FBQUEsMkJBQUMsU0FBTSx3QkFBcUIsWUFBVyx3QkFBcUIsUUFBTyxNQUFLLEtBQUksU0FBUyx1QkFBQyxRQUFLLHdCQUFxQixhQUFZLHdCQUFxQixXQUE1RDtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQW1FLEtBQXhKO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBNEo7QUFBQSxJQUM1Six1QkFBQyxTQUFNLHdCQUFxQixZQUFXLHdCQUFxQixRQUFPLE1BQUssS0FBSSxTQUFTLHVCQUFDLGdCQUFhLHdCQUFxQixhQUFZLHdCQUFxQixXQUFwRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQTJFLEtBQWhLO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBb0s7QUFBQSxPQUZ0SztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBR0E7QUFFSjtBQUFFSixHQTlCSUQsa0JBQWdCO0FBQUEsVUFDMkRILE9BQU87QUFBQTtBQUFBLEtBRGxGRztBQWlDTixTQUFTTyxNQUFNO0FBRWIsU0FDRSx1QkFBQyxnQkFBYSx3QkFBcUIsWUFBVyx3QkFBcUIsUUFDakUsaUNBQUMsdUJBQW9CLHdCQUFxQixZQUFXLHdCQUFxQixRQUFPLFFBQVFqQixxQkFDdkY7QUFBQSwyQkFBQyxVQUFPLHdCQUFxQixZQUFXLHdCQUFxQixTQUMzRCxpQ0FBQyxvQkFBaUIsd0JBQXFCLGFBQVksd0JBQXFCLFdBQXhFO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBK0UsS0FEakY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUVBO0FBQUEsSUFDQSx1QkFBQyxXQUFRLHdCQUFxQixZQUFXLHdCQUFxQixXQUE5RDtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQXFFO0FBQUEsT0FKdkU7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUtBLEtBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQU9BO0FBRUo7QUFBQ2tCLE1BWlFEO0FBY1QsZUFBZUE7QUFBSSxJQUFBRSxJQUFBRDtBQUFBLGFBQUFDLElBQUE7QUFBQSxhQUFBRCxLQUFBIiwibmFtZXMiOlsiVG9hc3RlciIsIlF1ZXJ5Q2xpZW50UHJvdmlkZXIiLCJxdWVyeUNsaWVudEluc3RhbmNlIiwiQnJvd3NlclJvdXRlciIsIlJvdXRlciIsIlJvdXRlIiwiUm91dGVzIiwiUGFnZU5vdEZvdW5kIiwiQXV0aFByb3ZpZGVyIiwidXNlQXV0aCIsIlVzZXJOb3RSZWdpc3RlcmVkRXJyb3IiLCJHYW1lIiwiQXV0aGVudGljYXRlZEFwcCIsIl9zIiwiaXNMb2FkaW5nQXV0aCIsImlzTG9hZGluZ1B1YmxpY1NldHRpbmdzIiwiYXV0aEVycm9yIiwibmF2aWdhdGVUb0xvZ2luIiwidHlwZSIsIkFwcCIsIl9jMiIsIl9jIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkFwcC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9hc3RlciB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvdG9hc3RlclwiO1xuaW1wb3J0IHsgUXVlcnlDbGllbnRQcm92aWRlciB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XG5pbXBvcnQgeyBxdWVyeUNsaWVudEluc3RhbmNlIH0gZnJvbSAnQC9saWIvcXVlcnktY2xpZW50JztcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIgYXMgUm91dGVyLCBSb3V0ZSwgUm91dGVzIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgUGFnZU5vdEZvdW5kIGZyb20gJy4vbGliL1BhZ2VOb3RGb3VuZCc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIsIHVzZUF1dGggfSBmcm9tICdAL2xpYi9BdXRoQ29udGV4dCc7XG5pbXBvcnQgVXNlck5vdFJlZ2lzdGVyZWRFcnJvciBmcm9tICdAL2NvbXBvbmVudHMvVXNlck5vdFJlZ2lzdGVyZWRFcnJvcic7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9wYWdlcy9HYW1lXCI7XG5cbmNvbnN0IEF1dGhlbnRpY2F0ZWRBcHAgPSAoKSA9PiB7XG4gIGNvbnN0IHsgaXNMb2FkaW5nQXV0aCwgaXNMb2FkaW5nUHVibGljU2V0dGluZ3MsIGF1dGhFcnJvciwgbmF2aWdhdGVUb0xvZ2luIH0gPSB1c2VBdXRoKCk7XG5cbiAgLy8gU2hvdyBsb2FkaW5nIHNwaW5uZXIgd2hpbGUgY2hlY2tpbmcgYXBwIHB1YmxpYyBzZXR0aW5ncyBvciBhdXRoXG4gIGlmIChpc0xvYWRpbmdQdWJsaWNTZXR0aW5ncyB8fCBpc0xvYWRpbmdBdXRoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6MTY6NlwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgIDxkaXYgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6MTc6OFwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiBjbGFzc05hbWU9XCJ3LTggaC04IGJvcmRlci00IGJvcmRlci1zbGF0ZS0yMDAgYm9yZGVyLXQtc2xhdGUtODAwIHJvdW5kZWQtZnVsbCBhbmltYXRlLXNwaW5cIj48L2Rpdj5cbiAgICAgIDwvZGl2Pik7XG5cbiAgfVxuXG4gIC8vIEhhbmRsZSBhdXRoZW50aWNhdGlvbiBlcnJvcnNcbiAgaWYgKGF1dGhFcnJvcikge1xuICAgIGlmIChhdXRoRXJyb3IudHlwZSA9PT0gJ3VzZXJfbm90X3JlZ2lzdGVyZWQnKSB7XG4gICAgICByZXR1cm4gPFVzZXJOb3RSZWdpc3RlcmVkRXJyb3IgZGF0YS1zb3VyY2UtbG9jYXRpb249XCJBcHA6MjU6MTNcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cImZhbHNlXCIgLz47XG4gICAgfSBlbHNlIGlmIChhdXRoRXJyb3IudHlwZSA9PT0gJ2F1dGhfcmVxdWlyZWQnKSB7XG4gICAgICAvLyBSZWRpcmVjdCB0byBsb2dpbiBhdXRvbWF0aWNhbGx5XG4gICAgICBuYXZpZ2F0ZVRvTG9naW4oKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlbmRlciB0aGUgbWFpbiBhcHBcbiAgcmV0dXJuIChcbiAgICA8Um91dGVzIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjM1OjRcIiBkYXRhLWR5bmFtaWMtY29udGVudD1cInRydWVcIj5cbiAgICAgIDxSb3V0ZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDozNjo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgcGF0aD1cIi9cIiBlbGVtZW50PXs8R2FtZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDozNjozMVwiIGRhdGEtZHluYW1pYy1jb250ZW50PVwiZmFsc2VcIiAvPn0gLz5cbiAgICAgIDxSb3V0ZSBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDozNzo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgcGF0aD1cIipcIiBlbGVtZW50PXs8UGFnZU5vdEZvdW5kIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjM3OjMxXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIC8+fSAvPlxuICAgIDwvUm91dGVzPik7XG5cbn07XG5cblxuZnVuY3Rpb24gQXBwKCkge1xuXG4gIHJldHVybiAoXG4gICAgPEF1dGhQcm92aWRlciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo0Njo0XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCI+XG4gICAgICA8UXVlcnlDbGllbnRQcm92aWRlciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo0Nzo2XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJ0cnVlXCIgY2xpZW50PXtxdWVyeUNsaWVudEluc3RhbmNlfT5cbiAgICAgICAgPFJvdXRlciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo0ODo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiPlxuICAgICAgICAgIDxBdXRoZW50aWNhdGVkQXBwIGRhdGEtc291cmNlLWxvY2F0aW9uPVwiQXBwOjQ5OjEwXCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIC8+XG4gICAgICAgIDwvUm91dGVyPlxuICAgICAgICA8VG9hc3RlciBkYXRhLXNvdXJjZS1sb2NhdGlvbj1cIkFwcDo1MTo4XCIgZGF0YS1keW5hbWljLWNvbnRlbnQ9XCJmYWxzZVwiIC8+XG4gICAgICA8L1F1ZXJ5Q2xpZW50UHJvdmlkZXI+XG4gICAgPC9BdXRoUHJvdmlkZXI+KTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7Il0sImZpbGUiOiIvYXBwL3NyYy9BcHAuanN4In0=
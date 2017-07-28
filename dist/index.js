"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mustache = require("mustache");
var path_1 = require("path");
var fs_1 = require("fs");
exports.default = function (views_path, opts) {
    opts = opts || {};
    var ext = '.' + (opts.extension || 'html');
    return function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var render, global_partials, defaultLayout;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!ctx.render) return [3 /*break*/, 2];
                    return [4 /*yield*/, next()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    render = mustache.render;
                    global_partials = Object.assign({}, opts.partials || {});
                    defaultLayout = opts['defaultLayout'];
                    ctx.render = function (view, obj, _opts) {
                        if (obj === void 0) { obj = {}; }
                        if (_opts === void 0) { _opts = {}; }
                        return __awaiter(_this, void 0, void 0, function () {
                            var html;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, ctx.renderView(view, obj, _opts)];
                                    case 1:
                                        html = _a.sent();
                                        ctx.type = ctx.type || 'html';
                                        ctx.body = html;
                                        return [2 /*return*/];
                                }
                            });
                        });
                    };
                    ctx.renderView = function (view, obj, _opts) {
                        if (obj === void 0) { obj = {}; }
                        if (_opts === void 0) { _opts = {}; }
                        return __awaiter(_this, void 0, void 0, function () {
                            var partials, layout, view_path, view_data, all_partials, all_partials_data_obj, layout_file_path, layout_file_data, body, _obj, default_layout_file_path, default_layout_file_data, body, _obj;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        partials = _opts.partials || {};
                                        layout = _opts.layout === false ? false : _opts.layout;
                                        obj = Object.assign({}, ctx.state, obj);
                                        view = view + ext;
                                        view_path = path_1.resolve(views_path, view);
                                        view_data = fs_1.readFileSync(view_path, 'utf-8');
                                        all_partials = Object.assign({}, global_partials, partials);
                                        all_partials_data_obj = Object.keys(all_partials).reduce(function (current, key) {
                                            var partial_file_path = path_1.resolve(views_path, all_partials[key] + ext);
                                            var partial_file_data = fs_1.readFileSync(partial_file_path, 'utf-8');
                                            return Object.assign(current, (_a = {}, _a[key] = partial_file_data, _a));
                                            var _a;
                                        }, {});
                                        if (!layout) return [3 /*break*/, 3];
                                        layout_file_path = path_1.resolve(views_path, layout + ext);
                                        layout_file_data = fs_1.readFileSync(layout_file_path, 'utf-8');
                                        return [4 /*yield*/, render(view_data, obj, all_partials_data_obj)];
                                    case 1:
                                        body = _a.sent();
                                        _obj = Object.assign(obj, { body: body });
                                        return [4 /*yield*/, render(layout_file_data, _obj, all_partials_data_obj)];
                                    case 2: return [2 /*return*/, _a.sent()];
                                    case 3:
                                        if (!defaultLayout) return [3 /*break*/, 6];
                                        default_layout_file_path = path_1.resolve(views_path, defaultLayout + ext);
                                        default_layout_file_data = fs_1.readFileSync(default_layout_file_path, 'utf-8');
                                        return [4 /*yield*/, render(view_data, obj, all_partials_data_obj)];
                                    case 4:
                                        body = _a.sent();
                                        _obj = Object.assign(obj, { body: body });
                                        return [4 /*yield*/, render(default_layout_file_data, _obj, all_partials_data_obj)];
                                    case 5: return [2 /*return*/, _a.sent()];
                                    case 6: return [4 /*yield*/, render(view_data, obj, all_partials_data_obj)];
                                    case 7: return [2 /*return*/, _a.sent()];
                                }
                            });
                        });
                    };
                    return [4 /*yield*/, next()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
};

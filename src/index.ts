import * as mustache from 'mustache';
import { resolve } from 'path';
import { readFileSync } from 'fs';
interface test {
    obj: string,
    partials: string;
}
export default (views_path, opts?) => {
    opts = opts || {};
    const ext = '.' + (opts.extension || 'html');
    return async (ctx, next) => {
        if (ctx.render) return await next();
        const render = mustache.render;
        const global_partials = Object.assign({}, opts.partials || {});
        const defaultLayout = opts['defaultLayout'];
        ctx.render = async (view, obj = {}, _opts: { [key: string]: any } = {}) => {
            const html = await ctx.renderView(view, obj, _opts);
            ctx.type = ctx.type || 'html';
            ctx.body = html;
        }
        ctx.renderView = async (view, obj = {}, _opts: { [key: string]: any } = {}) => {
            const partials = _opts.partials || {};
            const layout = _opts.layout === false ? false : _opts.layout;
            obj = Object.assign({}, ctx.state, obj);
            view = view + ext;
            const view_path = resolve(views_path, view);
            const view_data = readFileSync(view_path, 'utf-8');
            const all_partials = Object.assign({}, global_partials, partials);
            const all_partials_data_obj = Object.keys(all_partials).reduce((current, key) => {
                const partial_file_path = resolve(views_path, all_partials[key] + ext);
                const partial_file_data = readFileSync(partial_file_path, 'utf-8');
                return Object.assign(current, { [key]: partial_file_data });
            }, {});
            if (layout) {
                const layout_file_path = resolve(views_path, layout + ext);
                const layout_file_data = readFileSync(layout_file_path, 'utf-8');
                const body = await render(view_data, obj, all_partials_data_obj);
                const _obj = Object.assign(obj, { body: body });
                return await render(layout_file_data, _obj, all_partials_data_obj);
            } else if (defaultLayout) {
                const default_layout_file_path = resolve(views_path, defaultLayout + ext);
                const default_layout_file_data = readFileSync(default_layout_file_path, 'utf-8');
                const body = await render(view_data, obj, all_partials_data_obj);
                const _obj = Object.assign(obj, { body: body });
                return await render(default_layout_file_data, _obj, all_partials_data_obj);
            } else {
                return await render(view_data, obj, all_partials_data_obj);
            }
        }
        await next();
    }
}
import * as mustache from 'mustache';
import { resolve } from 'path';
import { readFileSync } from 'fs';
export default (views_path, opts?) => {
    opts = opts || {};
    const ext = '.' + (opts.extension || 'html');
    return async (ctx, next) => {
        if (ctx.render) return await next();
        const render = mustache.render;
        const global_partials = Object.assign({}, opts.partials || {});
        ctx.render = async (view, obj = {}, partials?: { [key: string]: string }) => {
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
            const html = await render(view_data, obj, all_partials_data_obj);
            ctx.type = ctx.type || 'html';
            ctx.body = html;
        }
        await next();
    }
}
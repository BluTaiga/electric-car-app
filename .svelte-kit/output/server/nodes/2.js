

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.BdskzvWk.js","_app/immutable/chunks/scheduler.KIPEeUFd.js","_app/immutable/chunks/index.CJzG2D__.js"];
export const stylesheets = [];
export const fonts = [];



export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.bgIjqY7Z.js","_app/immutable/chunks/scheduler.KIPEeUFd.js","_app/immutable/chunks/index.CJzG2D__.js","_app/immutable/chunks/entry.D9C0CAoD.js"];
export const stylesheets = [];
export const fonts = [];

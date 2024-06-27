

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.5Hy1ccTI.js","_app/immutable/chunks/scheduler.KIPEeUFd.js","_app/immutable/chunks/index.CJzG2D__.js"];
export const stylesheets = ["_app/immutable/assets/0.CA6mlyYk.css"];
export const fonts = [];

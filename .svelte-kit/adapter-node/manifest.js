export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","images/Rivian-R1T.jpg","images/Tesla-M3.jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.73oy1VER.js","app":"_app/immutable/entry/app.IoyGE1Zc.js","imports":["_app/immutable/entry/start.73oy1VER.js","_app/immutable/chunks/entry.D9C0CAoD.js","_app/immutable/chunks/scheduler.KIPEeUFd.js","_app/immutable/entry/app.IoyGE1Zc.js","_app/immutable/chunks/scheduler.KIPEeUFd.js","_app/immutable/chunks/index.CJzG2D__.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";
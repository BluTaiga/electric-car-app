import { c as create_ssr_component, d as each, v as validate_component, e as escape, f as add_attribute } from './ssr-DdlStX9y.js';

const CarCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { car } = $$props;
  if ($$props.car === void 0 && $$bindings.car && car !== void 0) $$bindings.car(car);
  return `<div class="bg-white shadow-md rounded-lg overflow-hidden"><img src="${"/images/" + escape(car.imageName, true)}"${add_attribute("alt", car.name, 0)} class="w-full h-48 object-cover" loading="lazy"> <div class="p-4"><h2 class="text-xl font-bold mb-2">${escape(car.name)}</h2> <p class="mb-1">Price: $${escape(car.price.toLocaleString())}</p> <p class="mb-1">Battery: ${escape(car.batterySize)} kWh</p> <p>Charging Speed: ${escape(car.chargingSpeed)} kW</p></div></div>`;
});
const cars = [
  {
    id: 1,
    name: "Rivian R1T 2024",
    price: "75000",
    batterySize: 135,
    chargingSpeed: 220,
    imageName: "Rivian-R1T.jpg"
  },
  {
    id: 2,
    name: "Tesla Model 3",
    price: 39990,
    batterySize: 82,
    chargingSpeed: 250,
    imageName: "Tesla-M3.jpg"
  }
];
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="container mx-auto p-4"><h1 class="text-3xl font-bold mb-6" data-svelte-h="svelte-8ta9m7">Our Electric Vehicles</h1> <div class="grid grid-cols-1 md:grid-cols-2 gap-6">${each(cars, (car) => {
    return `${validate_component(CarCard, "CarCard").$$render($$result, { car }, {}, {})}`;
  })}</div></main>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CwAd97Js.js.map

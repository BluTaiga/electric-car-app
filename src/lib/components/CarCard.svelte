<script>
  export let car;
</script>

<div class="bg-white shadow-md rounded-lg overflow-hidden">
  <img src="/images/{car.imageName}" alt={car.name} class="w-full h-48 object-cover" loading="lazy" />
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">{car.name}</h2>
    <p class="mb-1">Price: ${car.price.toLocaleString()}</p>
    <p class="mb-1">Battery: {car.batterySize} kWh</p>
    <p>Charging Speed: {car.chargingSpeed} kW</p>
  </div>
</div>
<script>
  import { slide } from 'svelte/transition';
  export let car;
  let isExpanded = false;

  function toggleExpand() {
    isExpanded = !isExpanded;
  }
</script>

<div class="bg-white shadow-md rounded-lg overflow-hidden">
  <img src="/images/{car.imageName}" alt={car.name} class="w-full h-48 object-cover" loading="lazy" />
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">{car.name}</h2>
    <p class="mb-1">Price: ${car.price.toLocaleString()}</p>
    <p class="mb-1">Battery: {car.batterySize} kWh</p>
    <p>Charging Speed: {car.chargingSpeed} kW</p>

    <button
      on:click={toggleExpand}
      class="text-blue-600 hover:text-blue-800 mt-2 focus:outline-none"
    >
      {isExpanded ? 'Read Less' : 'Read More'}
    </button>

    {#if isExpanded}
      <p transition:slide="{{ duration: 300}}" class="mt-2 text-gray-700">
        <!-- Insert paragraph summary here -->
         {car.summary}
      </p>
    {/if}
  </div>
</div>
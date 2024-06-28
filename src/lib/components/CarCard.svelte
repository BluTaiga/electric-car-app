<script>
  import { slide } from 'svelte/transition';
  export let car;
  let isExpanded = false;

  function toggleExpand() {
    isExpanded = !isExpanded;
  }
</script>

<div class="bg-white shadow-md rounded-lg overflow-hidden">
  <div class="relative w-full" style="padding-top: 56.25%;"> <!-- Aspect ratio box (16:9) -->
    <img src="/images/{car.imageName}" alt={car.name} class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
  </div>
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
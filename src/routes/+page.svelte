<script>
  import CarCard from '$lib/components/CarCard.svelte';
  import Header from '$lib/components/Header.svelte';
  import cars from '$lib/data/cars.json';
</script>

<Header />

<main class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6">Our Electric Vehicles</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each cars as car (car.id)}
      <CarCard {car} />
    {/each}
  </div>
</main>
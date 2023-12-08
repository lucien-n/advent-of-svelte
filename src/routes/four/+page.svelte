<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import { getSantaHeartRate } from '$lib/four/shrm';
	import Counter from '$shadcn/counter.svelte';
	import Button from '$shadcn/ui/button/button.svelte';

	export let data: PageServerData;

	let heartRate = 0;
	let targetHeartRate = 0;
	let interval: number;

	onMount(async () => {
		await updateHeartRate();
		heartRate = targetHeartRate;
		interval = setInterval(() => updateHeartRate(), 1000);
	});

	const updateHeartRate = async () => {
		targetHeartRate = await getSantaHeartRate(fetch);

		const difference = targetHeartRate - heartRate;
		const duration = 150;
		const incrementPerMs = difference / duration;
		const startTime = performance.now();

		const updateCounter = (currentTime: number) => {
			const elapsedTime = currentTime - startTime;
			const increment = elapsedTime * incrementPerMs;
			heartRate += Math.floor(increment);

			if (elapsedTime < duration) {
				requestAnimationFrame(updateCounter);
			} else {
				heartRate = targetHeartRate;
			}
		};

		requestAnimationFrame(updateCounter);
	};

	const stopMonitoring = () => {
		clearInterval(interval);
		targetHeartRate = 0;
	};
</script>

<div class="flex flex-col gap-3 h-full justify-center items-center">
	{#if targetHeartRate}
		<span class="scale-150">
			<Counter count={heartRate} />
		</span>
		<Button variant="ghost" on:click={stopMonitoring}>Stop</Button>
	{:else}
		<h1 class="text-center text-6xl">
			Santa is either offline or <span class="text-red-600">dead 💀</span>
		</h1>
	{/if}
</div>

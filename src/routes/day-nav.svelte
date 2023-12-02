<script lang="ts">
	import { page } from '$app/stores';
	import { days } from '$lib/constants';
	import { CaretLeft } from 'radix-icons-svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let day: number = 0;

	onMount(() => (day = getNumericalDay()));

	const getNumericalDay = () => {
		const currentDay = $page.url.pathname.split('/')[1];
		const numericalDay = days.map((day) => day.toLowerCase()).indexOf(currentDay) + 1;
		return numericalDay;
	};
</script>

{#if day}
	<nav
		class="absolute flex flex-col ml-10 rounded-b-md border shadow-md px-2 w-20 bg-background"
		transition:fly={{ y: -200, duration: 150 }}
	>
		<a href="/">
			<CaretLeft size={24} />
		</a>
		<h1 class="text-4xl pt-2 pb-5 font-extrabold text-center">
			{day}
		</h1>
	</nav>
{/if}

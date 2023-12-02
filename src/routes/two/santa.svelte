<script lang="ts">
	import { fly } from 'svelte/transition';

	export let cookies: number;

	const santaFaces = [
		{ cookies: 500, img: 'santa-flabbergasted.jpg' },
		{ cookies: 100, img: 'santa-awkward.jpg' },
		{ cookies: 0, img: 'santa-happy.jpg' }
	];
</script>

{#each santaFaces as santaFace}
	{#if cookies <= 0}
		<img
			src="santa-angry.jpg"
			alt="santa angry"
			class="rounded-full w-fit aspect-square object-cover"
		/>
	{:else if cookies >= santaFace.cookies}
		<img
			in:fly={{ x: -200, duration: 150, delay: 150 }}
			out:fly={{ x: -200, duration: 150 }}
			src={santaFace.img}
			alt="santa"
			class="rounded-full w-fit aspect-square object-cover"
		/>
	{/if}
{/each}

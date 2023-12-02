<script lang="ts">
	import { onMount } from 'svelte';

	export let parentNode: HTMLElement;

	let node: HTMLSpanElement;
	let x = 0;
	let y = 0;

	onMount(() => {
		x = Math.floor(Math.random() * parentNode.clientWidth);
		y = Math.floor(Math.random() * parentNode.clientHeight);

		node.style.left = `${x}px`;
		node.style.top = `${y}px`;
	});
</script>

<span class="absolute cookie-popup pointer-events-none" bind:this={node}>
	<p class="text-3xl">+1</p>
</span>

<style>
	.cookie-popup {
		animation: fly-fade-out 0.8s 0.05s forwards;
	}

	@keyframes fly-fade-out {
		from {
			opacity: 100%;
		}
		to {
			opacity: 0%;
			translate: 0px -150px;
		}
	}
</style>

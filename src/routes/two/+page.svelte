<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import CookiePopup from './cookie-popup.svelte';
	import Cookie from './cookie.svelte';

	let cookies = 0;
	let parentNode: HTMLElement;
	let cookiePopups: { id: number; comp: any }[] = [];

	onMount(() => (cookies = getLocalCookies()));

	const handleCookieClick = ({ detail: click }: { detail: 'left' | 'right' }) => {
		if (click === 'left') cookies += 1;
		else cookies -= 1;
		if (cookies < 0) cookies = 0;
		setLocalCookies(cookies);
		createCookiePopup();
	};

	const setLocalCookies = (count: number) =>
		localStorage.setItem('two:cookies', JSON.stringify(count));

	const getLocalCookies = () => JSON.parse(localStorage.getItem('two:cookies') ?? '0');

	const createCookiePopup = () => {
		const id = Math.floor(Math.random() * 9999);
		const comp = CookiePopup;
		cookiePopups = [...cookiePopups, { id, comp }];
		setTimeout(() => {
			cookiePopups = cookiePopups.filter((popup) => popup.id !== id);
		}, 1500);
	};
</script>

<div class="flex flex-col items-center justify-center h-full" in:fly={{ y: -200 }}>
	<div class="flex flex-col relative gap-8" bind:this={parentNode}>
		<h1 class="text-5xl font-extrabold text-center">{cookies}</h1>
		<Cookie on:click={handleCookieClick} />
		{#each cookiePopups as cookiePopup (cookiePopup.id)}
			{#if parentNode}
				<svelte:component this={cookiePopup.comp} {parentNode} />
			{/if}
		{/each}
	</div>
</div>

<script lang="ts">
	import Counter from '$shadcn/counter.svelte';
	import { Button } from '$shadcn/ui/button';
	import { RotateCw } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import CookiePopup from './cookie-popup.svelte';
	import Cookie from './cookie.svelte';

	let cookies = 0;
	let parentNode: HTMLElement;
	let cookiePopups: { id: number; comp: any; symbol: '+' | '-' }[] = [];

	onMount(() => setCookies(getLocalCookies()));

	const handleCookieClick = ({ detail: click }: { detail: 'left' | 'right' }) => {
		setCookies(click === 'left' ? cookies + 1 : cookies - 1);
		createCookiePopup(click === 'left' ? '+' : '-');
	};

	const setCookies = (count: number) => {
		if (count < 0) count = 0;
		cookies = count;
		setLocalCookies(count);
	};

	const setLocalCookies = (count: number) =>
		localStorage.setItem('two:cookies', JSON.stringify(count));

	const getLocalCookies = () => JSON.parse(localStorage.getItem('two:cookies') ?? '0');

	const createCookiePopup = (symbol: '+' | '-') => {
		const id = Math.floor(Math.random() * 9999);
		const comp = CookiePopup;
		cookiePopups = [...cookiePopups, { id, comp, symbol }];
		setTimeout(() => {
			cookiePopups = cookiePopups.filter((popup) => popup.id !== id);
		}, 1500);
	};
</script>

<div class="flex flex-col items-center justify-center h-full">
	<div class="flex flex-col relative gap-8" bind:this={parentNode}>
		<div class="mx-auto">
			<Counter count={cookies} />
		</div>
		<Cookie on:click={handleCookieClick} />
		{#each cookiePopups as cookiePopup (cookiePopup.id)}
			{#if parentNode}
				<svelte:component this={cookiePopup.comp} {parentNode} symbol={cookiePopup.symbol} />
			{/if}
		{/each}
	</div>
	<div class="mx-auto bottom-3 absolute">
		<Button variant="ghost" on:click={() => setCookies(0)}>
			<RotateCw />
			<p>Reset</p></Button
		>
	</div>
</div>

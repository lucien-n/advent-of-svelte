<script lang="ts">
	import { cn } from '$lib/utils';
	import Counter from '$shadcn/counter.svelte';
	import { Button } from '$shadcn/ui/button';
	import { RotateCw } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import CookiePopup from './cookie-popup.svelte';
	import Cookie from './cookie.svelte';

	let cookies = 0;
	let parentNode: HTMLElement;
	let cookiePopups: { id: number; comp: any; symbol: '+' | '-' }[] = [];
	let rotateCookie = false;

	const santaFaces = [
		{ cookies: 500, img: 'santa-flabbergasted.jpg' },
		{ cookies: 100, img: 'santa-awkward.jpg' },
		{ cookies: 0, img: 'santa-happy.jpg' }
	];

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
		const id = new Date().getTime();
		const comp = CookiePopup;
		cookiePopups = [...cookiePopups, { id, comp, symbol }];
		setTimeout(() => {
			cookiePopups = cookiePopups.filter((popup) => popup.id !== id);
		}, 1500);
	};

	const resetCookies = () => {
		setCookies(0);
		rotateCookie = true;
		setTimeout(() => (rotateCookie = false), 500);
	};
</script>

<div class="flex flex-col items-center justify-center h-full">
	<div class="flex flex-col relative gap-8" bind:this={parentNode}>
		<div
			class="absolute w-24 aspect-square overflow-hidden -left-12 -top-12 rounded-full border-8 border-[#835cb6] bg-[#835cb6]"
		>
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
		</div>
		<div class="mx-auto">
			<Counter count={cookies} />
		</div>
		<span class={cn(rotateCookie && 'rotate-[360deg] transition-all duration-500')}>
			<Cookie on:click={handleCookieClick} />
		</span>
		{#each cookiePopups as cookiePopup (cookiePopup.id)}
			{#if parentNode}
				<svelte:component this={cookiePopup.comp} {parentNode} symbol={cookiePopup.symbol} />
			{/if}
		{/each}
	</div>
	<div class="mx-auto bottom-3 absolute">
		<Button variant="ghost" on:click={resetCookies}>
			<RotateCw />
			<p>Reset</p></Button
		>
	</div>
</div>

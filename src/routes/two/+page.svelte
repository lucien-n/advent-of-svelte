<script lang="ts">
	import { createCookiesStore } from '$lib/two/cookies';
	import { cn } from '$lib/utils';
	import Counter from '$shadcn/counter.svelte';
	import { Button } from '$shadcn/ui/button';
	import { RotateCw } from 'lucide-svelte';
	import CookiePopup from './cookie-popup.svelte';
	import Cookie from './cookie.svelte';
	import Santa from './santa.svelte';

	let cookies = createCookiesStore('two:cookies');
	let parentNode: HTMLElement;
	let cookiePopups: { id: number; comp: any; symbol: '+' | '-' }[] = [];
	let rotateCookie = false;

	const handleCookieClick = ({ detail: click }: { detail: 'left' | 'right' }) => {
		if (click === 'left') cookies.increment();
		else cookies.decrement();
		createCookiePopup(click === 'left' ? '+' : '-');
	};

	const createCookiePopup = (symbol: '+' | '-') => {
		const id = new Date().getTime();
		const comp = CookiePopup;
		cookiePopups = [...cookiePopups, { id, comp, symbol }];
		setTimeout(() => {
			cookiePopups = cookiePopups.filter((popup) => popup.id !== id);
		}, 1500);
	};

	const resetCookies = () => {
		cookies.reset();
		rotateCookie = true;
		setTimeout(() => (rotateCookie = false), 500);
	};
</script>

<div class="flex flex-col items-center justify-center h-full">
	<div class="flex flex-col relative gap-8" bind:this={parentNode}>
		<div
			class="absolute w-24 aspect-square overflow-hidden -left-12 -top-12 rounded-full border-8 border-[#835cb6] bg-[#835cb6]"
		>
			<Santa cookies={$cookies} />
		</div>
		<div class="mx-auto">
			<Counter count={$cookies} />
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

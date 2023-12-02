<script lang="ts">
	import { onMount } from 'svelte';
	import Cookie from './cookie.svelte';

	let cookies = 0;

	onMount(() => (cookies = getLocalCookies()));

	const handleCookieClick = ({ detail: click }: { detail: 'left' | 'right' }) => {
		if (click === 'left') cookies += 1;
		else cookies -= 1;
		if (cookies < 0) cookies = 0;
		setLocalCookies(cookies);
	};

	const setLocalCookies = (count: number) =>
		localStorage.setItem('two:cookies', JSON.stringify(count));

	const getLocalCookies = () => JSON.parse(localStorage.getItem('two:cookies') ?? '0');
</script>

<div class="flex flex-col items-center gap-8 justify-center h-full">
	<h1 class="text-5xl font-extrabold text-center">{cookies}</h1>
	<Cookie on:click={handleCookieClick} />
</div>

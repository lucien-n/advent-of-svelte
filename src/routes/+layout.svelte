<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import '../app.pcss';
	import DayNav from './day-nav.svelte';
</script>

{#key $page.url}
	<main class="w-full h-full overflow-hidden" in:fade={{ duration: 200 }}>
		<DayNav />
		<slot />
	</main>
{/key}

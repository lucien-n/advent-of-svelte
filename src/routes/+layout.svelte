<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import '../app.pcss';
</script>

{#key $page.url}
	<main class="w-full h-full overflow-hidden" in:fade={{ duration: 200 }}>
		<slot />
	</main>
{/key}

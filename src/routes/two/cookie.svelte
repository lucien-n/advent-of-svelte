<script lang="ts">
	import { cn } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let clicked = false;
</script>

<button
	on:mousedown={() => (clicked = true)}
	on:mouseup={() => (clicked = false)}
	on:mouseleave={() => (clicked = false)}
	on:click={() => dispatch('click', 'left')}
	on:auxclick={() => dispatch('click', 'right')}
	on:contextmenu={(e) => e.preventDefault()}
>
	<img
		src="cookie.png"
		alt="Cookie"
		class={cn('transition-all duration-100 select-none', clicked && 'scale-95')}
	/>
</button>

<script lang="ts">
	import { days } from '$lib/constants';
	import * as Card from '$shadcn/ui/card';

	const today = new Date().getUTCDate();
</script>

<div class="grid grid-cols-6 grid-rows-4 w-fit h-fit gap-3">
	{#each days as day, i}
		{@const disabled = i + 1 > today}
		<a href="/{day.toLowerCase()}" class:disabled class="hover:scale-105 transition-all">
			<Card.Root class="w-36 aspect-square">
				<Card.Header class="p-2">
					<h1 class="font-extrabold text-3xl">{i + 1}</h1>
				</Card.Header>
			</Card.Root>
		</a>
	{/each}
</div>

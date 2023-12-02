<script lang="ts">
	export let count: number;

	$: digits = count
		.toString()
		.split('')
		.map((char) => parseInt(char));

	let columns: HTMLSpanElement[] = [];

	$: {
		columns.forEach((col, index) => {
			if (!col) return;
			const digit = digits[index];
			col.style.translate = `0em ${digit * -1.5}em`;
		});
	}
</script>

<div class="flex text-center overflow-hidden text-4xl font-extrabold h-[2rem]">
	{#each { length: digits.length } as _, digitIndex}
		<span
			style="writing-mode: vertical-lr; text-orientation: upright;"
			class="transition-all w-8"
			bind:this={columns[digitIndex]}
		>
			{#each { length: 10 } as _, i}
				{i}
			{/each}
		</span>
	{/each}
</div>

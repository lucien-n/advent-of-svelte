<script lang="ts">
	import type { Child } from '$lib/one/types';
	import * as Card from '$shadcn/ui/card';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import NewForm from './new-form.svelte';
	import Table from './table.svelte';

	export let data: PageData;

	const { form } = data;
	$: ({
		streamed: { childrenPromise }
	} = data);

	let showAddModal = false;
	let children: Child[] = [];

	onMount(async () => {
		const fetchedChildren = await childrenPromise;
		children = [...fetchedChildren, ...getLocalStorageChildren()];
	});

	const getLocalStorageChildren = (): Child[] =>
		JSON.parse(localStorage.getItem('one:children') ?? '[]');

	const handleChildCreation = ({ detail }: CustomEvent) => {
		const child = detail;
		const localChildren = getLocalStorageChildren();
		localStorage.setItem('one:children', JSON.stringify([...localChildren, child]));
		children = [...children, child];
		showAddModal = false;
	};
</script>

<div class="py-10 container h-full">
	{#key children.length}
		<Table {children} on:add={() => (showAddModal = true)} />
	{/key}
</div>

{#if showAddModal}
	<button
		transition:fade={{ duration: 100 }}
		class="absolute top-0 flex items-center justify-center left-0 w-full h-full bg-neutral-700 bg-opacity-40 cursor-default"
		on:click={() => (showAddModal = false)}
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="w-1/4" on:click|stopPropagation transition:fly={{ y: -300, duration: 150 }}>
			<Card.Root class="p-5 w-full pb-3">
				<Card.Header>
					<h1 class="text-3xl font-bold text-center">Add a child</h1>
				</Card.Header>
				<Card.Content class="text-left">
					<NewForm {form} on:success={handleChildCreation} />
				</Card.Content>
			</Card.Root>
		</div>
	</button>
{/if}

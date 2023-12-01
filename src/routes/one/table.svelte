<script lang="ts">
	import type { Child } from '$lib/one/types';
	import { cn } from '$lib/utils';
	import { Button } from '$shadcn/ui/button';
	import { Input } from '$shadcn/ui/input';
	import * as Table from '$shadcn/ui/table';
	import { ArrowUpDown, Plus } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { Render, Subscribe, createTable } from 'svelte-headless-table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';

	export let children: Child[];

	const dispatch = createEventDispatcher();

	const table = createTable(readable(children), {
		page: addPagination({ initialPageSize: 15 }),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'name',
			header: 'Child'
		}),
		table.column({
			accessor: 'tally',
			header: 'Tally',
			filter: {
				exclude: true
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageCount, pageIndex } = pluginStates.page;

	const { filterValue } = pluginStates.filter;
</script>

<div class="w-full">
	<div class="flex items-center py-4 justify-between">
		<Input class="max-w-sm" placeholder="Search by name..." type="text" bind:value={$filterValue} />
		<Button on:click={() => dispatch('add')}
			><p>Add</p>
			<Plus /></Button
		>
	</div>
	<div class="rounded-md border w-full">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class={cn(cell.id === 'tally' && 'text-right')}>
										{#if ['tally', 'name'].includes(cell.id)}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown class={'ml-2 h-4 w-4'} />
											</Button>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell
										{...attrs}
										class={cn(
											cell.id === 'tally' && (cell.value > 0 ? 'text-green-600' : 'text-red-600'),
											cell.id === 'tally' && 'text-right'
										)}
									>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<p>
			{$pageIndex + 1} / {$pageCount}
		</p>
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>

<script>
	import { Table } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import EnterDataForm from '$lib/components/EnterDataForm.svelte';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { invalidate } from '$app/navigation';
	import { Paginator } from '@skeletonlabs/skeleton';

	import { enhance } from '$app/forms';

	export let form;
	export let data;
	const { role } = data;

	let tableData = [];

	// tableData reacts to data changes
	$: {
		tableData = data.data.map((obj) => {
			const { item, batch, data, ...rest } = obj;
			return {
				item,
				batch,
				...data,
				...rest
			};
		});
		// console.log('tableData', tableData);
	}

	$: length = tableData.length;

	// Paginator Settings
	$: page = {
		limit: 10,
		offset: 0,
		size: length,
		amounts: [10, 50]
	};

	$: console.log(page);

	$: paginatedSource = tableData.slice(
		page.offset * page.limit, // start
		page.offset * page.limit + page.limit // end
	);

	// table reacts to tableData changes
	$: table = {
		// A list of heading labels.
		head: ['item', 'batch', 'alcohol', 'turbidity', 'EBC'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(paginatedSource, ['item', 'batch', 'alcohol', 'turbidity', 'EBC']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(paginatedSource, ['id', 'item', 'batch', 'alcohol', 'turbidity', 'EBC'])
		// Optional: A list of footer labels.
		// foot: ['Total', '', '<code class="code">5</code>']
	};

	let tabSet = 0;

	// Check for form changes, if status 201 shoot toaster and invalidate
	// The load function from this page.server.js
	$: if (form?.status === 201) {
		const toastSettings = {
			message: form.message,
			timeout: 3000,
			background: 'variant-filled-success'
		};
		toastStore.trigger(toastSettings);

		invalidate('getData');
	}
</script>

<h1>Data page</h1>
<TabGroup>
	<Tab bind:group={tabSet} name="table" value={0}>Table</Tab>
	{#if role != 'operator'}
		<Tab bind:group={tabSet} name="enter-data" value={1}>Enter Data</Tab>
	{/if}

	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<Table source={table} class=" p-4" interactive="true" />
			<Paginator bind:settings={page} class="px-4" />
		{:else if tabSet === 1}
			<EnterDataForm {form} />
		{/if}
	</svelte:fragment>
</TabGroup>

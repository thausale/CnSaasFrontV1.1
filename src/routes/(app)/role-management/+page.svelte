<script>
	// import { goto } from '$app/navigation';
	// import { onMount } from 'svelte';
	import RoleManagement from '$lib/components/RoleManagement.svelte';
	import RoleCreation from '$lib/components/RoleCreation.svelte';
	import { ProgressBar, InputChip, modalStore, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { Table } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';

	let loading = false;
	export let data;
	export let form;

	$: roles = data.roles;

	//  Makes the table layout
	$: table = {
		// A list of heading labels.
		head: ['id', 'role name'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(roles, ['id', 'name']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(roles, ['id', 'name']),
		// Optional: A list of footer labels.
		foot: ['Total', '', `<code class="code">${roles.length}</code>`]
	};

	function selectionHandler(e) {
		console.log(e.detail);
		form = null;
		const modalComponent = {
			ref: RoleManagement,
			props: { role: e.detail[1], id: e.detail[0] }
		};
		const modal = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	}

	$: tabSet = 0;
	$: console.log(tabSet);
</script>

<TabGroup>
	<Tab bind:group={tabSet} name="Users" value={0}>Overview</Tab>
	<Tab bind:group={tabSet} name="New User" value={1}>Create Role</Tab>
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			{#if loading}
				<ProgressBar meter="variant-filled-primary" />
			{:else}
				<Table source={table} class=" p-4" interactive="true" on:selected={selectionHandler} />
			{/if}
		{:else if tabSet === 1}
			<RoleCreation />
		{/if}
	</svelte:fragment>
</TabGroup>

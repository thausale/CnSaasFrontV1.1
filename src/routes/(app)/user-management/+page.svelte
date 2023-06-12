<script>
	// import { goto } from '$app/navigation';
	// import { onMount } from 'svelte';
	import UserManagement from '$lib/components/UserManagement.svelte';
	import UserCreation from '$lib/components/UserCreation.svelte';
	import { ProgressBar, InputChip, modalStore, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { Table } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';

	let loading = false;
	export let data;
	export let form;

	$: users = data.users;
	$: roles = data.roles;

	// console.log(roles);

	let searchTerm = [];

	//  Filters the users data according to searchTerms from the input field
	$: filteredUsers =
		searchTerm.length > 0
			? users.filter((user) =>
					searchTerm.every(
						(term) =>
							user.firstName.toLowerCase().includes(term.toLowerCase()) ||
							user.lastName.toLowerCase().includes(term.toLowerCase()) ||
							user.role_name.toLowerCase().includes(term.toLowerCase()) ||
							user.email.toLowerCase().includes(term.toLowerCase())
					)
			  )
			: users;

	//  Makes the table layout
	$: table = {
		// A list of heading labels.
		head: ['firstName', 'lastName', 'role', 'email'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(filteredUsers, ['firstName', 'lastName', 'role_name', 'email']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(filteredUsers, ['firstName', 'lastName', 'role_name', 'email', 'id']),
		// Optional: A list of footer labels.
		foot: ['Total', '', `<code class="code">${filteredUsers.length}</code>`]
	};

	function selectionHandler(e) {
		form = null;
		const modalComponent = {
			ref: UserManagement,
			props: { User: e.detail, roles }
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
	<Tab bind:group={tabSet} name="New User" value={1}>Create User</Tab>
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			{#if loading}
				<ProgressBar meter="variant-filled-primary" />
			{:else}
				<InputChip
					bind:value={searchTerm}
					name="chips"
					placeholder="Search users ..."
					class="m-4"
				/>
				<Table source={table} class=" p-4" interactive="true" on:selected={selectionHandler} />
			{/if}
		{:else if tabSet === 1}
			<UserCreation {roles} {tabSet} />
		{/if}
	</svelte:fragment>
</TabGroup>

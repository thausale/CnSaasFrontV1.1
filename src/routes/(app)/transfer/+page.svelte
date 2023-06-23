<script>
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import { NotificationsController } from '$lib/api/NotificationsController.js';
	// import { page } from '$app/stores';
	// console.log('page', $page);
	export let data;
	// console.log(data);
	const entries = data.entries.data;
	const { user } = data;
	// console.log(user);

	let selection = '';
	let id;
	let volume;

	// Format the selections for the autocomplete
	const entriesSelection = entries.map((entry) => ({
		label: entry.batch,
		value: entry.id,
		keywords: entry.item
	}));

	//  Format the roles for the chip selection
	$: targets = data.roles.reduce((acc, role) => {
		acc[role.name] = false; // set initial value for each role
		return acc;
	}, {});

	// $: console.log(targets);

	// Function to change chip selection status from true to false and back
	function filter(role) {
		targets[role] = !targets[role];
	}

	function onSelection(e) {
		selection = e.detail.label;
		// console.log(selection);
		id = e.detail.value;
	}

	function onSubmit() {
		// console.log(selection);
		const beer = entries.filter((entry) => entry.batch == selection)[0];
		// console.log(beer);

		const trueTargets = Object.entries(targets)
			.filter(([_, value]) => value === true)
			.map(([target]) => target);

		const roleIds = Object.values(data.roles)
			.filter((role) => trueTargets.includes(role.name))
			.map((role) => role.id);

		// console.log(roleIds);

		const beerData = JSON.stringify(beer.data);
		const message = `${user.firstName} ${user.lastName} would like to transfer ${volume}hl of ${beer.item}. 
data: ${beerData}`;

		const promises = roleIds.map((roleId) =>
			NotificationsController.postNotification(roleId, message)
		);

		Promise.all(promises)
			.then(() => {
				// console.log('All notifications sent successfully.');
			})
			.catch((error) => {
				console.error('Failed to send notifications:', error);
			});
	}

	// Popup settings for the autocomplete
	let popupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};
</script>

<div class="p-10 flex flex-col gap-2 w-full items-center">
	<h1>Beer transfer</h1>

	<h3>Select beer batch number</h3>
	<input
		class="input autocomplete w-auto"
		type="search"
		name="autocomplete-search"
		bind:value={selection}
		placeholder="Choose Batch "
		use:popup={popupSettings}
	/>
	<div
		data-popup="popupAutocomplete"
		class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto"
		tabindex="-1"
		style="z-index: 10;"
	>
		<Autocomplete
			bind:input={selection}
			options={entriesSelection}
			allowlist={entriesSelection}
			on:selection={onSelection}
		/>
	</div>
	<h3>Enter the volume of the beer</h3>

	<div class="input-container">
		<input type="number" class="input volume" bind:value={volume} />
		<span class="unit-label">hL</span>
	</div>

	<br />

	<h3>Who would you like to notify ?</h3>
	<div class="flex gap-2">
		{#each Object.keys(targets) as f}
			<span
				class="chip {targets[f] ? 'variant-filled' : 'variant-soft'}"
				on:click={() => {
					filter(f);
				}}
				on:keypress
			>
				{#if targets[f]}<span />{/if}
				<span class="capitalize">{f}</span>
			</span>
		{/each}
	</div>
	<button class="btn variant-filled-primary mt-5" on:click={onSubmit}>Send notification</button>
</div>

<style>
	.input-container {
		position: relative;
		display: inline-block;
	}

	.unit-label {
		position: absolute;
		right: 50px;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none; /* Ignore clicks and other events */
	}
</style>

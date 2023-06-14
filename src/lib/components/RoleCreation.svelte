<script>
	import { toastStore } from '@skeletonlabs/skeleton';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { invalidate } from '$app/navigation';
	import { RoleController } from '$lib/api/RoleController';

	let loading = false;

	let name;

	const submitHandler = async () => {
		loading = true;

		const body = { name };

		const response = await RoleController.createRole(body);

		loading = false;

		if (response.status === 201) {
			const t = {
				message: 'Role Created !',
				background: 'variant-filled-success'
			};
			toastStore.trigger(t);
			invalidate('Roles');
		}
	};
</script>

<h1 class="p-10">Create Role</h1>
<form class="mx-10" on:submit|preventDefault={submitHandler}>
	<label for="name">Role Name:</label>
	<input
		class="input"
		type="text"
		id="name"
		name="name"
		placeholder="role name"
		bind:value={name}
	/><br /><br />

	<div class="buttonHolder">
		<button class="btn variant-filled-primary" type="submit">
			{#if loading}
				<ProgressRadial width="w-5" />
			{:else}
				<p>Submit</p>
			{/if}
		</button>
	</div>
</form>

<style>
	.buttonHolder {
		display: flex;
		gap: 10px;
	}
</style>

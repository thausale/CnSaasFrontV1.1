<script>
	import { modalStore, toastStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { onDestroy } from 'svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { UserApi } from '$lib/api/UserApi';
	import { invalidate } from '$app/navigation';

	export let roles;
	export let tabSet;
	// console.log(tabSet);
	let loading = false;

	let firstName;
	let lastName;
	let role_id;
	let email;
	let password;

	const submitHandler = async () => {
		loading = true;

		const body = { firstName, lastName, role_id, email, password };

		const response = await UserApi.createUser(body);

		loading = false;

		if (response.status === 201) {
			const t = {
				message: 'User Created !',
				background: 'variant-filled-success'
			};
			toastStore.trigger(t);
			invalidate('Users');
		}
	};
</script>

<h1 class="p-10">Create User</h1>
<form class="mx-10" on:submit|preventDefault={submitHandler}>
	<label for="firstName">First Name:</label>
	<input
		class="input"
		type="text"
		id="firstName"
		name="firstName"
		placeholder="first name"
		bind:value={firstName}
	/><br /><br />

	<label for="lastName">Last Name:</label>
	<input
		class="input"
		type="text"
		id="lastName"
		name="lastName"
		placeholder="last name"
		bind:value={lastName}
	/><br /><br />

	<label for="lastName">Password:</label>
	<input
		class="input"
		type="text"
		id="password"
		name="password"
		placeholder="password"
		bind:value={password}
	/><br /><br />

	<label for="role">Role:</label>
	<select class="input" id="role_id" name="role_id" bind:value={role_id}>
		{#each roles as role (role.id)}
			<option value={role.id}>{role.name}</option>
		{/each}
	</select>
	<!-- Optional field -->

	<label class="pt-5" for="email">Email:</label>
	<input
		class="input"
		type="email"
		id="email"
		name="email"
		placeholder="email"
		bind:value={email}
	/><br /><br />
	<!-- Optional field -->
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

<script>
	import { modalStore, toastStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { onDestroy } from 'svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { UserApi } from '$lib/api/UserApi';
	import { invalidate } from '$app/navigation';

	export let User;
	export let roles;
	let loading = false;

	const id = User[4];

	let firstName;
	let lastName;
	let role_id;
	let email;

	const submitHandler = async () => {
		loading = true;

		const body = { firstName, lastName, role_id, email };
		console.log('body', body);
		const filtered = Object.keys(body).reduce((result, key) => {
			if (typeof body[key] !== 'undefined') {
				result[key] = body[key];
			}
			return result;
		}, {});

		const response = await UserApi.editUser(body, id);

		loading = false;

		if (response.status === 200) {
			modalStore.close();
			const t = {
				message: 'Data updated !',
				background: 'variant-filled-success'
			};
			toastStore.trigger(t);
			invalidate('Users');
		}
	};

	const deleteHandler = async () => {
		modalStore.close();
		const modal = {
			type: 'confirm',
			title: `are you sure you want to delete ${User[0]} ${User[1]} ?`,
			response: (r) => {
				if (r) {
					console.log('deleting');
				}
			}
		};
		modalStore.trigger(modal);

		invalidate('Users');
	};
</script>

<body class="w-modal">
	<h1 class="p-10">Adjust User</h1>
	<form class="mx-10" on:submit|preventDefault={submitHandler}>
		<label for="firstName">First Name:</label>
		<input
			class="input"
			type="text"
			id="firstName"
			name="firstName"
			placeholder={User[0]}
			bind:value={firstName}
		/><br /><br />

		<label for="lastName">Last Name:</label>
		<input
			class="input"
			type="text"
			id="lastName"
			name="lastName"
			placeholder={User[1]}
			bind:value={lastName}
		/><br /><br />

		<label for="role">Role:</label>
		<select class="input" id="role_id" name="role_id" bind:value={role_id}>
			{#each roles as role (role.id)}
				<option value={role.id} selected={role.name === User[2]}>{role.name}</option>
			{/each}
		</select>
		<!-- Optional field -->

		<label class="pt-5" for="email">Email:</label>
		<input
			class="input"
			type="email"
			id="email"
			name="email"
			placeholder={User[3]}
			bind:value={email}
		/><br /><br />
		<!-- Optional field -->
		<div class="buttonHolder">
			<button class="btn variant-filled-primary" type="submit">
				{#if loading}
					<ProgressRadial width="w-5" />
				{:else}
					<p>Confirm</p>
				{/if}
			</button>
			<button
				class="btn variant-filled-secondary"
				type="button"
				id="deleteButton"
				on:click={deleteHandler}
			>
				Delete
			</button>
			<button class="btn variant-filled-error" type="button" on:click={() => modalStore.close()}>
				Cancel
			</button>
		</div>
	</form>
</body>

<style>
	.buttonHolder {
		display: flex;
		gap: 10px;
	}
</style>

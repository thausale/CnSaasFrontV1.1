<script>
	import { modalStore } from '@skeletonlabs/skeleton';

	export let User;
	export let roles;
	console.log(roles);
	import { enhance } from '$app/forms';
	const userId = User[4];
	let firstName;
	let lastName;
	let Role;
	let email;
</script>

<body class="w-modal">
	<h1 class="p-10">Adjust User</h1>
	<form use:enhance method="POST" class="mx-10">
		<label for="firstName">First Name:</label>
		<input class="input" type="text" id="firstName" name="firstName" placeholder={User[0]} /><br
		/><br />

		<label for="lastName">Last Name:</label>
		<input class="input" type="text" id="lastName" name="lastName" placeholder={User[1]} /><br /><br
		/>

		<label for="role">Role:</label>
		<select class="input" id="role" name="role">
			{#each roles as role (role.id)}
				<option value={role.id}>{role.name}</option>
			{/each}
		</select>
		<!-- Optional field -->

		<label class="pt-5" for="email">Email:</label>
		<input class="input" type="email" id="email" name="email" placeholder={User[3]} /><br /><br />
		<!-- Optional field -->

		<button class="btn variant-filled-primary" type="submit"> Confirm </button>
		<button class="btn variant-filled-secondary" type="button" id="deleteButton"> Delete </button>
		<button class="btn variant-filled-error" type="button" on:click={() => modalStore.close()}>
			Cancel
		</button>
	</form>
</body>

<style>
</style>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import { User } from '$lib/components/stores';

	// console.log('page.svelte', $User);
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1>Welcome {$User.firstName} !</h1>
	</div>
</div>

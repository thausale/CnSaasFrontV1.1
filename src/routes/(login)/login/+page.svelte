<script>
    	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
    	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';

	import '../../../app.postcss';


</script>




<div class="flex  items-center justify-center h-screen flex-col">

	<div class="border p-10 rounded-container-token border-primary-400 w-screen md:w-auto">

<h1 class="p-10">
Login to cnSaas</h1>
<form action="" >


	
	<label class="label">
		<span>Email</span>
		<input class="input" title="Input (text)" type="text" placeholder="Input" />
	</label>
	<label class="label">
		<span>Password</span>
		<input class="input" type="text" placeholder="Input" />
	</label>
	<button type="button" class="btn variant-filled-primary  mt-5">Login</button>

</form>
</div>
</div>

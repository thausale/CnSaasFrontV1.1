<script>
	import { drawerStore } from "@skeletonlabs/skeleton";

    function drawerClose(){
        drawerStore.close()
    }
</script>




<nav class="list-nav p-04">
	<!-- (optionally you can provide a label here) -->
	<ul>
		<li>
			<a href="/elements/lists" on:click={drawerClose} >
				<span class="badge bg-primary-500">10</span>
				<span class="flex-auto">Notifications</span>
			</a>
		</li>
		<li>
			<a href="/login" on:click={drawerClose} >
				<span class="badge bg-primary-500">💀</span>
				<span class="flex-auto">Logout</span>
			</a>
		</li>
		<li>
			<a href="/" on:click={drawerClose} >
				<span class="badge bg-primary-500">🏠</span>
				<span class="flex-auto">Home</span>
			</a>
		</li>
		<!-- ... -->
	</ul>
</nav>
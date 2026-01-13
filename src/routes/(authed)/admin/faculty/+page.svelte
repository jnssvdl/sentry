<script lang="ts">
	import type { PageProps } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import AdminUserTable from '$lib/components/AdminUserTable.svelte';

	let { data, form }: PageProps = $props();
</script>

<div class="px-4 py-8 sm:px-6 lg:px-8">
	<header class="container mx-auto mb-12 max-w-7xl">
		<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 class="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">Faculty</h1>
				<p class="text-lg text-muted-foreground">Manage faculty accounts</p>
			</div>

			<Button>Register</Button>
		</div>
	</header>

	<main class="container mx-auto max-w-7xl">
		<div class="overflow-hidden rounded-xl border shadow-sm">
			<div class="overflow-x-auto">
				<AdminUserTable role="Faculty" users={data.facultyUsers} />
			</div>
		</div>
	</main>
</div>

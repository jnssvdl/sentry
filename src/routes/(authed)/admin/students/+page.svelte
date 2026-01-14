<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import RegistrationForm from '$lib/components/RegistrationForm.svelte';
	import AdminUserTable from '$lib/components/AdminUserTable.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { UserPlus } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: PageProps = $props();
	let isOpen = $state(false);
</script>

<div class="px-4 py-8 sm:px-6 lg:px-8">
	<header class="container mx-auto mb-12 max-w-7xl">
		<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 class="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">Students</h1>
				<p class="text-lg text-muted-foreground">Manage student accounts</p>
			</div>

			<Dialog.Root bind:open={isOpen}>
				<Dialog.Trigger>
					<Button>
						<UserPlus />
						Add Account
					</Button>
				</Dialog.Trigger>

				<Dialog.Content interactOutsideBehavior="ignore">
					<Dialog.Header>
						<Dialog.Title>Add Faculty</Dialog.Title>
						<Dialog.Description>
							Provide the information for the new faculty member.
						</Dialog.Description>
					</Dialog.Header>

					<form
						id="form"
						method="POST"
						action="?/add"
						use:enhance={() => {
							return async ({ result, update }) => {
								await update();

								if (result.type === 'success') {
									isOpen = false;
								}
							};
						}}
					>
						<RegistrationForm role="student" {form} />
					</form>

					<Dialog.Footer>
						<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
						<Button form="form" type="submit">Save</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</header>

	<main class="container mx-auto max-w-7xl">
		<div class="overflow-hidden rounded-xl border shadow-sm">
			<div class="overflow-x-auto">
				<AdminUserTable role="Student" users={data.studentUsers} />
			</div>
		</div>
	</main>
</div>

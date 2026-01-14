<script lang="ts">
	import { UserRoundCogIcon, Calendar } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import { formatDate } from '$lib/utils';

	let { role, users } = $props();
</script>

<Table.Root>
	<Table.Header>
		<Table.Row class="border-b bg-card">
			<Table.Head class="px-6 py-4 font-semibold">
				{role.charAt(0).toUpperCase() + role.slice(1)} Name
			</Table.Head>
			<Table.Head class="px-6 py-4 font-semibold">Username</Table.Head>
			<!-- {#if role === 'faculty'}
				<Table.Head class="px-6 py-4 font-semibold">Categories</Table.Head>
			{/if} -->

			{#if role === 'student'}
				<Table.Head class="px-6 py-4 font-semibold">Tag</Table.Head>
			{/if}
			<Table.Head class="px-6 py-4 font-semibold">Joined</Table.Head>
		</Table.Row>
	</Table.Header>

	<Table.Body>
		{#if users.length === 0}
			<Table.Row>
				<Table.Cell colspan={5} class="px-6 py-12 text-center text-muted-foreground">
					<div class="flex flex-col items-center gap-2">
						<UserRoundCogIcon class="h-8 w-8 opacity-40" />
						<p>No users yet</p>
					</div>
				</Table.Cell>
			</Table.Row>
		{:else}
			{#each users as user (user.id)}
				<Table.Row class="border-b">
					<!-- User -->
					<Table.Cell class="px-6 py-4 font-medium">
						<div class="flex items-center gap-3">
							<div class="shrink-0">
								<div class="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
									<span class="text-sm font-semibold text-accent-foreground">
										{user.firstName.charAt(0)}{user.lastName.charAt(0)}
									</span>
								</div>
							</div>

							<div>
								<p class="font-medium">
									{user.firstName}
									{user.lastName}
								</p>
								<a
									href={`mailto:${user.email}`}
									class="text-xs text-muted-foreground underline-offset-4 hover:underline"
								>
									{user.email}
								</a>
							</div>
						</div>
					</Table.Cell>

					<!-- Username -->
					<Table.Cell class="px-6 py-4">
						<span
							class="inline-flex rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground"
						>
							@{user.username}
						</span>
					</Table.Cell>

					<!-- Categories -->
					<!-- {#if role === 'faculty'}
						<Table.Cell class="px-6 py-4">
							<Button variant="link">Show</Button>
						</Table.Cell>
					{/if} -->

					<!-- RFID Tag -->
					{#if role === 'student'}
						<Table.Cell class="px-6 py-4">
							<span
								class="inline-flex rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground"
							>
								{user.tag}
							</span>
						</Table.Cell>
					{/if}

					<!-- Date -->
					<Table.Cell class="px-6 py-4 text-sm">
						<div class="flex items-center gap-2">
							<Calendar class="h-4 w-4 text-muted-foreground" />
							{formatDate(user.createdAt)}
						</div>
					</Table.Cell>
				</Table.Row>
			{/each}
		{/if}
	</Table.Body>
</Table.Root>

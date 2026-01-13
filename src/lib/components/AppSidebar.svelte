<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Box } from '@lucide/svelte';
	import { UserRoundCogIcon } from '@lucide/svelte';
	import { GraduationCapIcon } from '@lucide/svelte';

	// Menu items.
	const items = [
		{
			title: 'Faculty',
			url: '/admin/faculty',
			icon: UserRoundCogIcon
		},
		{
			title: 'Students',
			url: '/admin/students',
			icon: GraduationCapIcon
		}
	];
</script>

<Sidebar.Root>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:p-1.5!">
					{#snippet child({ props })}
						<a href="/admin" {...props}>
							<Box class="size-4!" />
							<span class="text-base font-semibold">Sentry</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Users Management</Sidebar.GroupLabel>

			<Sidebar.GroupContent>
				{#each items as item (item.title)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							{#snippet child({ props })}
								<a href={item.url} {...props}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>

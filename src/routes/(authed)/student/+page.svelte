<script lang="ts">
	import type { PageProps } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	import { FileText, Calendar, ChartBarStacked, Users } from '@lucide/svelte';

	let { data }: PageProps = $props();

	const formatDate = (value: string | Date) =>
		new Intl.DateTimeFormat('en-US', {
			dateStyle: 'medium',
			timeStyle: 'short'
		}).format(new Date(value));

	const submissionCount = $derived(data.submissions.length);
</script>

<div class="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
	<!-- Header Section -->
	<div class="mx-auto mb-12 max-w-6xl">
		<div class="mb-8">
			<h1 class="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">Submissions</h1>
			<p class="text-lg">Manage and review all submitted works</p>
		</div>

		<!-- Stats Bar -->
		<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
			<div class="rounded-lg border bg-card p-6 shadow-sm">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium">Total Submissions</p>
						<p class="mt-1 text-3xl font-bold">{submissionCount}</p>
					</div>
					<div class="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
						<FileText class="h-6 w-6 text-blue-600 dark:text-blue-400" />
					</div>
				</div>
			</div>

			<div class="rounded-lg border bg-card p-6 shadow-sm">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium">Categories</p>
						<p class="mt-1 text-3xl font-bold">
							{new Set(data.submissions.map((s) => s.categoryName)).size}
						</p>
					</div>
					<div class="rounded-lg bg-emerald-100 p-3 dark:bg-emerald-900/30">
						<ChartBarStacked class="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
					</div>
				</div>
			</div>

			<div class="rounded-lg border bg-card p-6 shadow-sm">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium">Reviewers</p>
						<p class="mt-1 text-3xl font-bold">
							{new Set(data.submissions.map((s) => s.facultyFirstName + ' ' + s.facultyLastName))
								.size}
						</p>
					</div>
					<div class="rounded-lg bg-violet-100 p-3 dark:bg-violet-900/30">
						<Users class="h-6 w-6 text-violet-600 dark:text-violet-400" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Table Section -->
	<div class="mx-auto max-w-6xl">
		<div class="overflow-hidden rounded-xl border shadow-sm">
			<div class="overflow-x-auto">
				<Table.Root>
					<Table.Header>
						<Table.Row class="border-b bg-card">
							<Table.Head class="px-6 py-4 text-left font-semibold">Submitted to</Table.Head>
							<Table.Head class="px-6 py-4 text-left font-semibold">Category</Table.Head>
							<Table.Head class="px-6 py-4 text-left font-semibold">Date submitted</Table.Head>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{#if data.submissions.length === 0}
							<Table.Row class="border-b ">
								<Table.Cell
									colspan={3}
									class="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
								>
									<div class="flex flex-col items-center gap-2">
										<FileText class="h-8 w-8 opacity-40" />
										<p class="text-base">No submissions found yet</p>
									</div>
								</Table.Cell>
							</Table.Row>
						{:else}
							{#each data.submissions as submission (submission.submissionId)}
								<Table.Row class="border-b">
									<Table.Cell class="px-6 py-4 font-medium">
										<div class="flex items-center gap-3">
											<div class="shrink-0">
												<div
													class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30"
												>
													<span class="text-sm font-semibold text-blue-600 dark:text-blue-400">
														{submission.facultyFirstName.charAt(
															0
														)}{submission.facultyLastName.charAt(0)}
													</span>
												</div>
											</div>
											<div>
												<p class="font-medium">
													{submission.facultyFirstName}
													{submission.facultyLastName}
												</p>
											</div>
										</div>
									</Table.Cell>

									<Table.Cell class="px-6 py-4 ">
										<span
											class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
										>
											{submission.categoryName}
										</span>
									</Table.Cell>

									<Table.Cell class="px-6 py-4 text-sm">
										<div class="flex items-center gap-2">
											<Calendar class="h-4 w-4 text-muted-foreground" />
											{formatDate(submission.createdAt.toString())}
										</div>
									</Table.Cell>
								</Table.Row>
							{/each}
						{/if}
					</Table.Body>
				</Table.Root>
			</div>

			<!-- Footer Info -->
			{#if data.submissions.length > 0}
				<div class="border-t bg-card px-6 py-4">
					<p class="text-sm">
						Showing <span class="font-medium">{submissionCount}</span>
						submission{submissionCount !== 1 ? 's' : ''}
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>

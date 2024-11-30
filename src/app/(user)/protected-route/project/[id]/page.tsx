import React from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { projectApi } from "@/services/project/project-api";
import ProjectDashboard from "../project-dashboard/project-dashboard";

// Dynamic `params` fetching within Next.js App Router
export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const { id } = await params;

  // Prefetch data
  await queryClient.prefetchQuery({
    queryKey: ["projects", id],
    queryFn: () => projectApi.getOne(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectDashboard id={id} />
    </HydrationBoundary>
  );
}

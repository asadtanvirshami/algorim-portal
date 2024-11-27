import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { projectApi } from "@/services/project/project-api";
import ProjectDashboard from "../project-dashboard/project-dashboard";

async function page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  // Prefetch the first page of data
  await queryClient.prefetchQuery({
    queryKey: ["projects", params.id],
    queryFn: () => projectApi.getOne(params?.id),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <Project id={params.id} /> */}
        <ProjectDashboard id={params.id} />
      </HydrationBoundary>
    </>
  );
}

export default page;

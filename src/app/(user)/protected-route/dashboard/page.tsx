import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { projectApi } from "@/services/project/project-api";
import { cookies } from "next/headers";
import DataTable from "@/components/shared/data-table/project/data-table";
import Projects from "./dashboard";

async function page() {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("user");

  // if (!userCookie) return null; // If no cookie found, return null

  // const parsedCookie = JSON.parse(userCookie.value);
  // console.log(parsedCookie?.sub);

  // Prefetch the first page of data
  await queryClient.prefetchQuery({
    queryKey: ["projects", 1, 8], // Page 1 and page size 8
    queryFn: () => projectApi.getAll(1, 8, ""),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Projects initialPage={1} initialPageSize={8} />
      </HydrationBoundary>
    </>
  );
}

export default page;

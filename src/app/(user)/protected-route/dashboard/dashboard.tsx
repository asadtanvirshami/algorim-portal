"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { projectApi } from "@/services/project/project-api";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import DataTable from "@/components/shared/data-table/project/data-table";
import { columns } from "@/components/shared/data-table/project/column";

type Props = {
  initialPage: number;
  initialPageSize: number;
};

const Projects = ({ initialPage, initialPageSize }: Props) => {
  const [query, setQuery] = useState({
    active: 0,
    status: "",
    page: initialPage,
    pageSize: initialPageSize,
  });

  const user = useSelector((state: any) => state.user.user);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["projects", query.page, query.pageSize, query.status, user?.sub],
    queryFn: () => projectApi.getAll(query.page, query.pageSize, query.status),
  });

  const totalPages = Math.ceil(data?.total / query.pageSize);

  //   const handlePreviousPage = () => {
  //     if (query.page > 1) {
  //       setQuery((prev) => ({ ...prev, page: prev.page - 1 }));
  //     }
  //   };

  //   const handleNextPage = () => {
  //     setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
  //   };

  //   const handlePageClick = (pageNumber: number) => {
  //     if (pageNumber >= 1 && pageNumber <= totalPages) {
  //       setQuery((prev) => ({ ...prev, page: pageNumber }));
  //     }
  //   };

  if (isLoading || !data) {
    return (
      <div className="flex justify-center mt-5 gap-4 h-screen ">
        <Loader2 className="h-96 animate-spin" color="orange" />
      </div>
    );
  }

  return (
    <div className="h-screen flex mt-5 gap-4 justify-center align-middle w-full ">
      <div className="w-fit">
        {data?.data?.map((project) => (
          <DataTable
            key={project.id}
            data={data.data}
            isLoading={isLoading}
            query={query}
            columns={columns}
            totalCount={data.total}
            setQuery={setQuery}
          />
        ))}
      </div>

      {/* <div className="flex justify-end mt-4 gap-4">
        <button onClick={handlePreviousPage} disabled={query.page === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={page === query.page ? "font-bold" : ""}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={query.page === totalPages}>
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Projects;

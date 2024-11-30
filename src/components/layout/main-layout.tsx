import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isAuthPath = path === "/auth";
  const isProtectedRoute = path.startsWith("/protected-route");

  // Extract path segments
  const pathSegments = path.split("/").filter(Boolean); // Remove empty segments

  // Helper to create accumulated paths for breadcrumb links
  const buildLink = (index: number) => {
    return "/" + pathSegments.slice(0, index + 1).join("/");
  };

  return (
    <React.Fragment>
      {isAuthPath && <div>{children}</div>}
      {isProtectedRoute && (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {pathSegments.length > 0 && <BreadcrumbSeparator />}

                  {/* Map each path segment to a breadcrumb item */}
                  {pathSegments.map((segment, index) => {
                    const isLast = index === pathSegments.length - 1;
                    const formattedSegment = segment
                      .replace(/-/g, " ") // Replace hyphens with spaces
                      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter

                    return (
                      <React.Fragment key={index}>
                        <BreadcrumbItem>
                          {isLast ? (
                            // Current page (non-clickable)
                            <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                          ) : (
                            // Intermediate links (clickable)
                            <BreadcrumbLink href={buildLink(index)}>
                              {formattedSegment}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator />}
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="flex-1  overflow-auto p-5 relative rounded-xl bg-card shadow-lg ">
                {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      )}
    </React.Fragment>
  );
}

"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; value: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

export default function FilterIssuesByStatus() {
  const router = useRouter();

  const handleRouterRedirection = (status: Status | "ALL") => {
    const queryParam = status === "ALL" ? "" : `?status=${status}`;

    // issues/lists?status=OPEN
    router.push("/issues/list" + queryParam);
  };

  return (
    <Select.Root onValueChange={handleRouterRedirection}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

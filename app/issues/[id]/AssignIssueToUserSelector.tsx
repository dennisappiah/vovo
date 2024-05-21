"use client";

import { Select } from "@radix-ui/themes";
import React from "react";
import useUsers from "../_hooks/useUsers";
import { Issue } from "@prisma/client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  issue: Issue;
}

export default function AssignIssueToUserSelector({ issue }: Props) {
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;

  const assignIssue = (userId: string | null) => {
    axios
      .patch("/api/issues/" + issue.id, {
        userId: userId || null,
      })
      .catch(() => {
        toast.error("Issue could be assigned ");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.userId || "unassigned"}
        onValueChange={(value) =>
          assignIssue(value === "unassigned" ? null : value)
        }
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}

//because of onChange event and user interabilty , we use useQuery

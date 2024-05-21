import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import FilterIssuesByStatus from "./FilterIssuesByStatus";

export default function IssueActions() {
  return (
    <Flex mb="5" justify="between">
      {/* filter issues button */}
      <FilterIssuesByStatus />

      {/* add new button */}
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
}

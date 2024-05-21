import React from "react";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import IssueTable from "./IssueTable";

// issues/lists?status=OPEN

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <>
      <IssueActions />
      <IssueTable issues={issues} />
    </>
  );
}

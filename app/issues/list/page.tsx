import React from "react";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery } from "./IssueTable";
import { Status } from "@prisma/client";

// issues/lists?status=OPEN&orderBy=&page=2

interface Props {
  searchParams: IssueQuery;
}

export default async function IssuesPage({ searchParams }: Props) {
  // returns an array of statuses ['OPEN', 'CLOSED']
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const issues = await prisma.issue.findMany({
    where,
  });

  return (
    <>
      <IssueActions />
      <IssueTable issues={issues} searchPrams={searchParams} />
    </>
  );
}

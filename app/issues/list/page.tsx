import React from "react";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Status } from "@prisma/client";

// issues/lists?status=OPEN&orderBy=title&page=2

interface Props {
  searchParams: IssueQuery;
}

export default async function IssuesPage({ searchParams }: Props) {
  // returns an array of statuses ['OPEN', 'CLOSED']
  const statuses = Object.values(Status);

  // validate if searchParam status is inclusive
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <>
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
    </>
  );
}

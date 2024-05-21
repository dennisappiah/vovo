import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Grid, Heading, Text, Box, Button } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssignIssueToUserSelector from "./AssignIssueToUserSelector";

interface Props {
  params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
  // get current auth session - server side
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  //80% (4/5) of width to issue details (box1), 20% to actions (Box 2)
  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      {/* grid box 1 */}
      <Box className="col-span-4">
        <Heading>{issue.title}</Heading>
        <Flex className="space-x-3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="pros max-w-full">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      {/* grid box 2 */}
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            {/* Assignee selector */}
            <AssignIssueToUserSelector issue={issue} />
            {/* edit button */}
            <EditIssueButton issueId={issue.id} />
            {/* delete button */}
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

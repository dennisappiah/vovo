import dynamic from "next/dynamic";
import React from "react";
import IssueFormSkeleton from "./loading";

// disable server-side rendering completely
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default function NewPage() {
  return <IssueForm />;
}

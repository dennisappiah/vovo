"use client";

import {
  TextField,
  TextArea,
  Button,
  Callout,
  Text,
  Box,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validation";
import Spinner from "@/app/components/Spinner";
import "easymde/dist/easymde.min.css";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";

interface IssueFormData {
  title: string;
  description: string;
}

interface Props {
  issue?: Issue;
}

export default function IssueForm({ issue }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      // call server to save changes

      //if issue, update issue otherwise add new
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
      } else {
        await axios.post("/api/issues", data);
      }

      // redirect after successful save
      router.push("/issues/list");

      // refresh automatcally to fix caching issues
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      // catch and update
      setError("An unexpected error occured");
    }
  });

  return (
    <Box>
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        {/* title */}
        <TextField.Root
          placeholder="Title"
          {...register("title")}
          //populating data for editing
          defaultValue={issue?.title}
        ></TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        {/* description */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
          //populating data for editing
          defaultValue={issue?.description}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Box>
  );
}

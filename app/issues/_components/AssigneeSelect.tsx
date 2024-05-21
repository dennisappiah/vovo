import { Select } from "@radix-ui/themes";
import React from "react";

export default function AssigneeSelect() {
  return (
    <Select.Root>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="orange">Orange</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

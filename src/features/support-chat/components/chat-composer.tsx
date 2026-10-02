"use client";

import { useState } from "react";
import { SendIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

interface ChatComposerProps {
  disabled: boolean;
  onSend: (text: string) => void;
}

export default function ChatComposer({ disabled, onSend }: ChatComposerProps) {
  const [value, setValue] = useState("");
  const empty = value.trim().length === 0;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (empty || disabled) return;
        onSend(value);
        setValue("");
      }}
      className="border-t border-border p-3"
    >
      <InputGroup className="h-11 rounded-full">
        <InputGroupInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Type your question"
          aria-label="Message"
          maxLength={500}
          autoComplete="off"
          autoFocus
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="submit"
            variant="default"
            size="icon-sm"
            className="rounded-full"
            aria-label="Send message"
            disabled={empty || disabled}
          >
            <SendIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}

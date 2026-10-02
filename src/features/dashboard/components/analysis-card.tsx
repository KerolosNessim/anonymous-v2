"use client";

import { DownloadIcon, EyeIcon, FileArchiveIcon, FileIcon, MoreVerticalIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { formatBytes, formatDateTime, formatRelative } from "@/features/shared/utils/format";
import { cn } from "@/lib/utils";
import type { AnalysisRecord } from "../types";
import VerdictBadge, { verdictStyles } from "./verdict-badge";

interface AnalysisCardProps {
  record: AnalysisRecord;
  busy: boolean;
  onView: (record: AnalysisRecord) => void;
  onReanalyze: (record: AnalysisRecord) => void;
  onDownload: (record: AnalysisRecord) => void;
  onDelete: (record: AnalysisRecord) => void;
}

export default function AnalysisCard({ record, busy, onView, onReanalyze, onDownload, onDelete }: AnalysisCardProps) {
  const style = verdictStyles[record.verdict];
  const FileTypeIcon = record.kind === "archive" ? FileArchiveIcon : FileIcon;

  return (
    <Card
      aria-busy={busy}
      className={cn(
        "gap-3 overflow-hidden border border-border py-4 ring-0 transition-colors duration-300 hover:border-primary/60",
        busy && "opacity-70"
      )}
    >
      <CardHeader className="gap-1 px-4">
        <CardTitle className="flex min-w-0 items-center gap-2 text-base">
          {/* the tinted icon tells malicious from benign at a glance */}
          <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", style.tint)}>
            <FileTypeIcon aria-hidden className="size-5" />
          </span>
          <span className="truncate" title={record.fileName}>
            {record.fileName}
          </span>
        </CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-x-2">
          <span>{formatDateTime(record.analyzedAt)}</span>
          <span aria-hidden>·</span>
          <span suppressHydrationWarning>{formatRelative(record.analyzedAt)}</span>
          <span aria-hidden>·</span>
          <span>{formatBytes(record.size)}</span>
        </CardDescription>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${record.fileName}`} disabled={busy}>
                {busy ? <Spinner /> : <MoreVerticalIcon />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-48 border border-border">
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => onView(record)}>
                  <EyeIcon />
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => onReanalyze(record)}>
                  <RefreshCwIcon />
                  Reanalyze
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => onDownload(record)}>
                  <DownloadIcon />
                  Download report
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive" onSelect={() => onDelete(record)}>
                  <Trash2Icon />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3 px-4">
        <div className="flex flex-wrap items-center gap-2">
          <VerdictBadge verdict={record.verdict} />
          <Badge
            variant="outline"
            className={cn(
              "h-auto rounded-full px-2.5 py-1 text-xs font-bold",
              record.family ? "border-primary/60 bg-primary/10 text-primary" : "border-border text-muted-foreground"
            )}
          >
            {record.family ?? "No family found"}
          </Badge>
          <span className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            Confidence
            <span className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10" aria-hidden>
              <span className={cn("block h-full rounded-full", style.bar)} style={{ width: `${record.confidence}%` }} />
            </span>
            <span className={cn("font-mono font-bold", style.text)}>{record.confidence}%</span>
          </span>
        </div>
        <p className="text-sm leading-relaxed text-amber-300">{record.note}</p>
      </CardContent>

      <CardFooter className="border-t-0 bg-transparent px-4 pt-0">
        <Button type="button" variant="outline" size="sm" onClick={() => onView(record)} className="rounded-full border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground">
          <EyeIcon data-icon="inline-start" />
          View details
        </Button>
      </CardFooter>
    </Card>
  );
}

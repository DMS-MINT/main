"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnHeader } from "@/components/shared/tableComponents";
import { Circle } from "lucide-react";
import { letterTableColumnLookup } from "@/typing/dictionary";
import { LetterTableColumnEnum, ParticipantRolesEnum } from "@/typing/enum";
import { Badge } from "@/components/ui/badge";
import {
  ILetterListInputSerializer,
  IParticipantInputSerializer,
} from "@/typing/interface";
import { format } from "date-fns";
import { getParticipantInfo, getTranslatedLetterStatus } from "@/utils";

const DateFormat: string = "eee MMM dd";

export const archiveTableColumns: ColumnDef<ILetterListInputSerializer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="ሁሉንም ምረጥ"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="ረድፍ ይምረጡ"
      />
    ),
    size: 10,
  },
  {
    accessorKey: "has_read",
    header: () => <Circle size={13} className="text-gray-400" />,
    cell: ({ row }) => {
      const has_read: boolean = row.getValue("has_read");
      return (
        <Circle
          size={13}
          className={
            has_read
              ? "bg-primary rounded-full text-transparent"
              : "text-gray-400"
          }
        />
      );
    },
    size: 10,
  },
  {
    accessorKey: LetterTableColumnEnum.REFERENCE_NUMBER,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.REFERENCE_NUMBER]}
      />
    ),
    size: 50,
  },
  {
    accessorKey: LetterTableColumnEnum.SENDER,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.SENDER]}
      />
    ),
    cell: ({ row }) => {
      const participants: IParticipantInputSerializer[] =
        row.original.participants;

      const senders = getParticipantInfo(
        ParticipantRolesEnum.AUTHOR,
        participants
      );
      return <p>{senders ? senders : ""}</p>;
    },
    size: 300,
  },
  {
    accessorKey: LetterTableColumnEnum.RECIPIENT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.RECIPIENT]}
      />
    ),
    cell: ({ row }) => {
      const participants: IParticipantInputSerializer[] =
        row.original.participants;

      const recipients = getParticipantInfo(
        ParticipantRolesEnum["PRIMARY RECIPIENT"],
        participants
      );
      return <p>{recipients ? recipients : ""}</p>;
    },
    size: 300,
  },
  {
    accessorKey: LetterTableColumnEnum.SUBJECT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.SUBJECT]}
      />
    ),
    size: 250,
  },
  {
    accessorKey: LetterTableColumnEnum.LETTER_TYPE,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.LETTER_TYPE]}
      />
    ),
    size: 10,
  },
  {
    accessorKey: LetterTableColumnEnum.CURRENT_STATE,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.CURRENT_STATE]}
      />
    ),
    cell: ({ row }) => {
      const current_state: { name: string } = row.getValue(
        LetterTableColumnEnum.CURRENT_STATE
      );
      const { amharicTranslation, badgeVariant } = getTranslatedLetterStatus(
        current_state.name
      );
      return (
        <Badge
          variant="default"
          className="rounded-md flex items-center justify-between min-w-fit"
        >
          {amharicTranslation}
        </Badge>
      );
    },
    size: 20,
  },
  {
    accessorKey: LetterTableColumnEnum.SENT_AT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.SENT_AT]}
        className="w-fit ml-auto"
      />
    ),
    cell: ({ row }) => {
      const sent_at: string = row.getValue(LetterTableColumnEnum.SENT_AT);
      return (
        <div className="text-right font-medium px-4 py-1">
          {sent_at ? format(new Date(sent_at), DateFormat) : ""}
        </div>
      );
    },
    size: 10,
  },
  {
    accessorKey: LetterTableColumnEnum.CREATED_AT,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        title={letterTableColumnLookup[LetterTableColumnEnum.CREATED_AT]}
        className="w-fit ml-auto"
      />
    ),
    cell: ({ row }) => {
      const created_at: string = row.getValue(LetterTableColumnEnum.CREATED_AT);
      return (
        <div className="text-right font-medium px-4 py-1">
          {created_at ? format(new Date(created_at), DateFormat) : ""}
        </div>
      );
    },
    size: 10,
  },
];

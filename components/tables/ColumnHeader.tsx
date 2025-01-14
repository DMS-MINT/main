import type { Column } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, EyeOff, MoveDown, MoveUp } from "lucide-react";

interface ColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
}

export default function ColumnHeader<TData, TValue>({
	column,
	title,
	className,
}: ColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	return (
		<div className={cn("flex items-center space-x-2", className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className=" -ml-3 h-8 data-[state=open]:bg-accent"
					>
						<span>{title}</span>
						{column.getIsSorted() === "desc" ? (
							<MoveDown size={15} className="ml-2" />
						) : column.getIsSorted() === "asc" ? (
							<MoveUp size={15} className="ml-2" />
						) : (
							<ChevronsUpDown size={15} className="ml-2" />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<MoveUp size={15} className="mr-2 text-muted-foreground/70" />
						ከታች ወደ ላይ ቅደም ተከተል
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<MoveDown size={15} className="mr-2 text-muted-foreground/70" />
						ከላይ ወደ ታች በቅደም ተከተል
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
						<EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						ዓምዱን አታሳይ
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

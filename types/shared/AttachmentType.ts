import type { UserType } from "../user_module";

export type UploadedAttachmentType = {
	id: string;
	file: string;
	file_name: string;
	file_type: string;
	file_size: string;
	description: string;
	uploaded_by: UserType;
	created_at: string;
};

export type NewAttachmentType = {
	id: string;
	file: File;
	description: string;
};

export type IFiletype = "file" | "folder";
export interface IFileItem {
	id: string;
	name: string;
	type: IFiletype;
	size: number;
	modified: Date;
}

export type SortOption = "name" | "size" | "modified";
export type ViewOption = "list" | "grid";

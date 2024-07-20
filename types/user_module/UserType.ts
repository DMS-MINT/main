export type MemberType = {
	id: string;
	full_name: string;
	job_title: string;
	user_type: "member";
	user_id: string;
	permissions: string[];
	is_current_user: boolean;
};

export type GuestType = {
	id: string;
	name: string;
	user_type: "guest";
};

export type CurrentUserType = {
	id: string;
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	full_name: string;
	job_title: string;
	department: string;
	phone_number: string;
	is_staff: boolean;
};
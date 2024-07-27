"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { BrandingSection } from "@/components/user_module";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/actions/auth/action";
import type { ICredentials } from "@/actions/auth/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LetterSkeleton } from "@/components/letter_module";

const formSchema = z.object({
	email: z.string().email({ message: "እባክዎ ትክክለኛ ኢሜል ያስገቡ።" }),
	password: z.string().min(1, { message: "እባክዎ የይለፍ ቃሎን ያስገቡ።" }),
});

export default function SignIn() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const { mutate, isSuccess, isPending } = useMutation({
		mutationKey: ["signIn"],
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			const response = await signIn(values);

			if (!response.ok) throw response;

			return response;
		},
		onMutate: () => {
			toast.dismiss();
			toast.loading("ኢሜልዎን እና የይለፍ ቃልዎን በማረጋገጥ ላይ፣ እባክዎ ይጠብቁ...");
		},
		onSuccess: (data) => {
			toast.dismiss();
			toast.success(data.message);
			router.push("/letters/inbox");
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values as ICredentials);
	}

	return !isSuccess ? (
		<main className="grid h-full grid-cols-2">
			<BrandingSection />
			<section className="flex h-full flex-col justify-center gap-7 px-24">
				<div>
					<h2 className="mb-2 mt-5 text-xl font-medium text-gray-900">
						እንኳን ደህና መጡ!
					</h2>
					<p className="text-sm font-light text-gray-700">
						እባክዎ ለመግባት የተጠቃሚ መለያዎን እና የይለፍ ቃልዎን ያስገቡ።
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>የኢሜይል አድራሻዎን ያስገቡ</FormLabel>
									<FormControl>
										<Input readOnly={isPending} tabIndex={1} {...field} />
									</FormControl>
									<FormMessage className="form-error-message" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex justify-between">
										የይለፍ ቃልዎን ያስገቡ
										<Link href="/forgot-password" tabIndex={4}>
											<Button type="button" variant="link" className="h-fit py-0">
												የይለፍ ቃልዎን ረስተዋል?
											</Button>
										</Link>
									</FormLabel>
									<FormControl>
										<div className="relative ">
											<Input
												readOnly={isPending}
												type={showPassword ? "text" : "password"}
												tabIndex={2}
												{...field}
											/>
											<Button
												type="button"
												size={"icon"}
												variant={"ghost"}
												className="absolute right-1 top-0 hover:bg-transparent"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
											</Button>
										</div>
									</FormControl>
									<FormMessage className="form-error-message" />
								</FormItem>
							)}
						/>
						<Button
							disabled={isPending || !form.formState.isValid}
							type="submit"
							variant="secondary"
							className="flex w-full items-center gap-2"
							tabIndex={3}
						>
							<LogIn size={20} />
							ግባ
						</Button>
					</form>
				</Form>

				<div className="flex items-center gap-2 self-center">
					<p className="text-gray-800">የቴክኒክ ድጋፍ ለማግኘት </p>
					<Button variant="link" className="h-fit p-0 text-base">
						እኛን ያነጋግሩን
					</Button>
				</div>
			</section>
		</main>
	) : (
		<LetterSkeleton />
	);
}

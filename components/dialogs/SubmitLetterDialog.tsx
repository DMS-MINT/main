"use client";

import { getDefaultSignature } from "@/actions/signature_module/action";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { LINKS } from "@/constants";
import { useOTP, useWorkflowDispatcher } from "@/hooks";
import type { LetterDetailType } from "@/types/letter_module";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { OTPInputForm } from "../shared";

export default function SubmitLetterDialog({
	letter,
}: {
	letter: LetterDetailType;
}) {
	const { form, getOTP, handleInputChange } = useOTP();
	const { mutate, isPending } = useWorkflowDispatcher();

	const getDefaultSignatureMutation = useMutation({
		mutationKey: ["getDefaultSignature"],
		mutationFn: async (otp: number) => {
			const response = await getDefaultSignature(otp);

			if (!response.ok) throw response;

			return response.message;
		},
		onMutate: () => {
			toast.dismiss();
			toast.loading("የእርስዎን የማረጋገጫ ኮድ በማረጋገጥ ላይ። እባክዎ ይጠብቁ...");
		},
		onSuccess: (data) => {
			toast.dismiss();
			return data.e_signature;
		},
		onError: (error) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="button"
					onClick={() => {
						form.reset();
					}}
				>
					ወደ መዝገብ ቢሮ አስተላልፍ
				</Button>
			</DialogTrigger>
			<DialogContent className="">
				<DialogHeader className="gap-2">
					{getDefaultSignatureMutation.isSuccess ? (
						<DialogTitle>ወደ መዝገብ ቢሮ አስተላልፍ</DialogTitle>
					) : (
						<DialogTitle>ማንነትዎን ያረጋግጡ</DialogTitle>
					)}
					{getDefaultSignatureMutation.isSuccess ? (
						<DialogDescription>
							እርግጠኛ ኖት ደብዳቤውን ወደ መዝገብ ቢሮ ማስገባት ይፈልጋሉ? እባክዎ ለመቀጠል ውሳኔዎን ያረጋግጡ።
						</DialogDescription>
					) : (
						<DialogDescription>
							ይህን ደብዳቤ ደህንነቱ በተጠበቀ መልኩ ለመፈረም፣ እባክዎ በእርስዎ
							{
								<Link
									href={LINKS.google_authenticator}
									className="text-blue-800"
									target="_blank"
								>
									{" Google Authenticator "}
								</Link>
							}
							መተግበሪያ የመነጨውን የአንድ ጊዜ የይለፍ ቃል ያስገቡ።
						</DialogDescription>
					)}
				</DialogHeader>
				<div className="px-2">
					{getDefaultSignatureMutation.isSuccess ? (
						<div className="flex h-60 justify-center">
							<Image
								src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${getDefaultSignatureMutation.data.e_signature}`}
								alt="Your Signature"
								width={446}
								height={260}
							/>
						</div>
					) : (
						<OTPInputForm form={form} onChange={handleInputChange} />
					)}
				</div>
				<DialogFooter>
					<DialogClose asChild>
						{getDefaultSignatureMutation.isSuccess ? (
							<Button variant="outline" onClick={getDefaultSignatureMutation.reset}>
								አይ
							</Button>
						) : (
							<Button variant="outline">ሰርዝ</Button>
						)}
					</DialogClose>
					{getDefaultSignatureMutation.isSuccess ? (
						<Button
							disabled={isPending}
							type="button"
							onClick={() => {
								mutate({
									actionType: "submit_letter",
									params: { referenceNumber: letter.reference_number },
								});
							}}
						>
							አዎ
						</Button>
					) : (
						<Button
							disabled={
								getOTP()?.toString().length !== 6 ||
								getDefaultSignatureMutation.isPending
							}
							type="submit"
							onClick={() => {
								const otp = getOTP();
								getDefaultSignatureMutation.mutate(otp);
							}}
						>
							ቀጥል
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
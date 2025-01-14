"use client";

import { verifyOTP } from "@/actions/auth/action";
import { BrandingSection } from "@/components/helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Verify() {
	const OTP_Array: number[] = [1, 2, 3, 4, 5, 6];
	const [otpInput, setOtpInput] = useState<number[]>(Array(6).fill(0));
	const router = useRouter();

	const handleOTPVerification = async () => {
		console.log("Submitting OTP:", otpInput);
		const response = await verifyOTP(otpInput);

		if (response.ok) {
			console.log("OTP verified successfully");
			router.push("/forgot-password/reset");
		} else {
			console.error("OTP verification failed", response.message);
		}
	};

	return (
		<main className="grid h-full grid-cols-2">
			<BrandingSection />
			<section className="flex h-full flex-col justify-center gap-7 px-24">
				<div>
					<h2 className="mb-2 mt-5 text-xl font-medium text-gray-900">
						የተጠቃሚ መታወቂያው የእርስዎ መሆኑን ያረጋግጡ።
					</h2>
					<p className="text-sm font-light text-gray-700">
						እባክህ የተላከልህን ባለ ስድስት አሃዝ ኮድ አስገባ።
					</p>
				</div>
				<form className="flex flex-col gap-9" onSubmit={(e) => e.preventDefault()}>
					<div className="grid grid-cols-6 gap-5">
						{OTP_Array.map((value, index) => (
							<Input
								key={value}
								type="number"
								id={`otpDigit${value}`}
								className="py-8 text-center text-4xl text-gray-900"
								onChange={(e) => {
									const newOtp = [...otpInput];
									newOtp[index] = Number(e.target.value);
									setOtpInput(newOtp);
								}}
							/>
						))}
					</div>
					<Button
						variant="default"
						className="w-full"
						onClick={handleOTPVerification}
					>
						አረጋግጥ
					</Button>
				</form>
				<div className="flex items-center justify-between">
					<Link href="/forgot-password">
						<Button variant="outline" className="flex items-center gap-2">
							<ChevronLeft size={20} />
							ተመለስ
						</Button>
					</Link>
					<Button variant="link" className="h-fit p-0 text-base">
						የማረጋገጫ ኮድ አልተላከሎትም?
					</Button>
				</div>
			</section>
		</main>
	);
}

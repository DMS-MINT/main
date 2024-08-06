import { ErrorCodeEnum, type ErrorMessageType } from "@/types/shared";

export const curdErrorMessages: ErrorMessageType = {
	[ErrorCodeEnum.INTERNAL_SERVER_ERROR]:
		"ቅርታ እንጠይቃለን፣ ነገር ግን ጥያቄዎን በማስኬድ ላይ ያልተጠበቀ ስህተት ተፈጥሯል። እባክዎ ቆየት ብለው ይሞክሩ።",
	[ErrorCodeEnum.VALIDATION_ERROR]:
		"እባክዎ ደብዳቤው ርዕሰ ጉዳይ፣ ይዘት እና ቢያንስ አንድ ተቀባይ እንዳለው ያረጋግጡ። ለመቀጠል ሁሉም ያስፈልጋሉ።",
	[ErrorCodeEnum.INVALID_OTP]:
		"ያስገቡት የአንድ ጊዜ የይለፍ ቃሎ ልክ ያልሆነ ነው። እባክዎ ያረጋግጡ እና እንደገና ይሞክሩ።",
	[ErrorCodeEnum.EMPTY_CONTENT]: "የደብዳቤው ይዘት ባዶ ሊሆን አይችልም።",
	[ErrorCodeEnum.UNSIGNED_LETTER]: "ደብዳቤው ከመቀጠልዎ በፊት መፈረም አለበት።",
	[ErrorCodeEnum.SIGNATURE_NOT_FOUND]: "ፊርማዎን ማግኘት አልተቻለም።",
};

export const workflowErrorMessages: ErrorMessageType = {
	[ErrorCodeEnum.INTERNAL_SERVER_ERROR]:
		"ቅርታ እንጠይቃለን፣ ነገር ግን ጥያቄዎን በማስኬድ ላይ ያልተጠበቀ ስህተት ተፈጥሯል። እባክዎ ቆየት ብለው ይሞክሩ።",
	[ErrorCodeEnum.INVALID_OTP]:
		"ያስገቡት የአንድ ጊዜ የይለፍ ቃሎ ልክ ያልሆነ ነው። እባክዎ ያረጋግጡ እና እንደገና ይሞክሩ።",
	[ErrorCodeEnum.EMPTY_CONTENT]: "የደብዳቤው ይዘት ባዶ ሊሆን አይችልም።",
	[ErrorCodeEnum.MISSING_ATTACHMENT]: "ደብዳቤው ቢያንስ አንድ አባሪ ሊኖረው ይገባል።",
	[ErrorCodeEnum.UNSIGNED_LETTER]: "ደብዳቤው ከመቀጠልዎ በፊት መፈረም አለበት።",
	[ErrorCodeEnum.SIGNATURE_NOT_FOUND]: "ፊርማዎን ማግኘት አልተቻለም።",
	[ErrorCodeEnum.Letter_NOT_FOUND]: "የተሰጠው የመዝገብ ቁጥር ያለው ደብዳቤ ሊገኝ አልቻለም።",
};

import {
  ILetterDetailInputSerializer,
  ILetterUpdateSerializer,
  ParticipantRolesEnum,
} from "@/typing";

const updateLetterSerializer = (
  letter: ILetterDetailInputSerializer
): ILetterUpdateSerializer => {
  const participants = letter.participants.map((participant) => ({
    user: participant.user,
    role: ParticipantRolesEnum[
      participant.role as keyof typeof ParticipantRolesEnum
    ],
    message: participant.message,
  }));

  const subject = letter.subject ? letter.subject : undefined;
  const content = letter.content ? letter.content : undefined;

  return {
    ...(subject && { subject }),
    ...(content && { content }),
    participants,
  };
};

export default updateLetterSerializer;

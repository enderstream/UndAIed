import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import { Socket } from "socket.io-client";
import { useRef } from "react";

interface IFormProps {
  socket: Socket | null; // 부모에서 전달받을 소켓 인스턴스
  isDead: boolean;
  onSendChat: (input: string) => void;
  isVote: boolean;
  isSubjectDebate: boolean;
  isFreeDebate: boolean;
}
interface IForm {
  chat: string;
}

function ChatForm({
  // socket,
  isDead,
  onSendChat,
  isVote,
  isSubjectDebate,
  isFreeDebate,
}: IFormProps) {
  const paperPlane: IconDefinition = faPaperPlane;
  const {
    register,
    handleSubmit,
    resetField,
    // formState: { errors },
  } = useForm<IForm>();

  // 마지막 채팅 전송 시간을 기록할 ref
  const lastChatTimeRef = useRef<number>(0);

  const onValidSubmit = async (data: IForm, e?: React.BaseSyntheticEvent) => {
    //local storage에서 토큰 가져오기, player num 가져오기기
    //axios api 작성성
    e?.preventDefault();

    // 현재 시간
    const currentTime = Date.now();
    // 마지막 채팅 이후 1초 이내인 경우 도배로 판단
    if (currentTime - lastChatTimeRef.current < 1000) {
      toast.error("작성한지 1초 이내의 반복 채팅은 도배로 판단됩니다.");
      return;
    }

    try {
      onSendChat(data.chat);
      resetField("chat");
      // 마지막 채팅 시간 갱신
      lastChatTimeRef.current = currentTime;
      if (isSubjectDebate) {
        toast.success("주제 토론 답변이 제출되었습니다.");
      }
    } catch (error) {
      // 에러 처리
      console.error(error);
    }
  };

  const onInvalidSubmit = (errors: FieldErrors<IForm>) => {
    if (errors.chat?.type === "required") {
      toast.error(errors.chat.message);
    }
  };

  // isDead에 따라 채팅 제출 여부 조절하기
  const handleFormSubmit = isDead
    ? (e: React.FormEvent) => e.preventDefault() // 아무 동작도 안 함
    : handleSubmit(onValidSubmit, onInvalidSubmit);

  return (
    <form
      className="w-full h-full bg-[#07070a4d] focus-within:bg-neutral-900 rounded-lg shadow-lg border-2 border-solid border-[#555555] px-4 flex items-center text-sm"
      onSubmit={handleFormSubmit}
      action=""
    >
      <input
        {...register("chat", {
          required: "빈 채팅을 입력할 수 없습니다.",
          maxLength: {
            value: 200,
            message: "최대 200자리까지 입력할 수 있습니다",
          },
        })}
        className="bg-transparent text-[#848484] focus:text-[#dddddd] w-full"
        placeholder={
          isDead
            ? "죽은 자는 말이 없다."
            : isVote
            ? "우측 초상화에서 투표하기."
            : isSubjectDebate || isFreeDebate
            ? "채팅 입력하기"
            : "토론 시간에 채팅을 작성할 수 있습니다"
        }
        disabled={isDead || !(isSubjectDebate || isFreeDebate)}
        type="text"
        autoComplete="off"
      />
      <div className="bg-[#848484] w-[1px] h-6"></div>
      <button className="w-6 h-6 ml-2">
        <FontAwesomeIcon icon={paperPlane} className="text-[#848484]" />
      </button>
    </form>
  );
}

export default ChatForm;

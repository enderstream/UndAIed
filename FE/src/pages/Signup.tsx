import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import Header from "../components/Header";
import HeaderTemp from "../components/HeaderTemp";
import { toast } from "sonner";
import { Link } from "react-router";
// import axios from "axios";

interface IProfile {
  nickname: string;
  profileImage: number;
  avatar: string;
  gender: boolean;
  age: string;
}

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfile>();

  const onValidSubmit: SubmitHandler<IProfile> = async () => {
    // const onValidSubmit: SubmitHandler<IProfile> = async (data) => {
    try {
      //바꾸지 않은 값은 null이 되어야 한다.
      // const response = await axios.patch("api/v1/user/profile", {
      //   sex: data.gender, // 남자는 true, 여자는 false
      //   profile_image: null, // 프론트에서 랜덤으로 지정하여 보내줄 것.
      //   avatar: null, // 프론트에서 랜덤으로 지정하여 보내줄 것.
      //   age: data.age,
      //   nickname: data.nickname,
      // });
    } catch (error) {}
  };
  const onInvalidSubmit = (errors: FieldErrors<IProfile>) => {
    if (errors.nickname?.type === "required") {
      // "빈 채팅을 입력할 수 없습니다" 에러 발생 시, 원하는 custom function 실행
      toast.error(errors.nickname.message);
    } else if (errors.nickname?.type === "required") {
    }
  };

  return (
    <div>
      <Header scrollRatio={0} />
      <HeaderTemp />
      <div className="flex justify-center items-center bg-[#f7f7f7] h-[calc(100vh-3.5rem)]">
        <div className="relative white-container py-10 flex flex-col items-center bg-[#121212] shadow-lg w-[90%] max-w-lg border-[1px] border-[#f74a5c] rounded-sm text-white mb-[2rem]">
          <h1 className="text-2xl font-bold mb-8">회원정보 수정</h1>
          <form
            onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
            className="w-full px-6 space-y-6 flex flex-col justify-"
          >
            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="nickname"
              >
                닉네임
              </label>
              <input
                id="nickname"
                {...register("nickname", {
                  required: "닉네임을 입력해주세요.",
                })}
                className="w-full px-4 py-2 bg-[#2c1a23] rounded-lg border border-[#5c2f3d] focus:ring-2 focus:ring-[#7a3f4f] focus:outline-none"
                placeholder="닉네임"
              />
              {errors.nickname && (
                <span className="text-red-600 text-sm">
                  {errors.nickname.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">성별</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="true"
                    {...register("gender", {
                      required: "성별을 선택해주세요.",
                    })}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-600"
                  />
                  <span className="ml-2">남자</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="false"
                    {...register("gender", {
                      required: "성별을 선택해주세요.",
                    })}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-600"
                  />
                  <span className="ml-2">여자</span>
                </label>
              </div>
              {errors.gender && (
                <span className="text-red-600 text-sm">
                  {errors.gender.message}
                </span>
              )}
            </div>
            {/* <div>
              <label className="block text-sm font-medium mb-2" htmlFor="sex">
                성별
              </label>
              <input
                id="sex"
                {...register("sex", {
                  required: "성별을 입력해주세요.",
                })}
                className="w-full px-4 py-2 bg-[#2c2c3a] rounded-lg border border-[#443344] focus:ring-2 focus:ring-[#f74a5c] focus:outline-none"
                placeholder="example@domain.com"
              />
              {errors.sex && (
                <span className="text-red-500 text-sm">
                  {errors.sex.message}
                </span>
              )}
            </div> */}

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="age">
                나이
              </label>
              <input
                id="age"
                type="number"
                {...register("age", {
                  required: "나이를 입력해주세요.",
                  min: { value: 0, message: "나이는 0 이상이어야 합니다." },
                })}
                className="w-full px-4 py-2 bg-[#2c1a23] rounded-lg border border-[#5c2f3d] focus:ring-2 focus:ring-[#7a3f4f] focus:outline-none"
                placeholder="나이"
              />
              {errors.age && (
                <span className="text-red-600 text-sm">
                  {errors.age.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-full items-center">
              <button
                type="submit"
                className="w-full py-2 bg-[#8a404a] rounded-sm text-white font-semibold hover:bg-[#a14e5c] transition"
              >
                프로필 변경하기
              </button>
              <Link
                className="py-2 text-gray-200 text-sm flex justify-center"
                to={"/"}
              >
                나중에 변경하기
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

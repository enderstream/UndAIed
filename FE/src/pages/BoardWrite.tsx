import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import bugReportImage from "../assets/board/bugReport.png";
import Banner from "./Board/components/Banner";
import Header from "../components/Header";
import { useCreatePost } from "../hooks/useBoard";
import { BoardRequest } from "../types/board";

interface FormInputs {
  title: string;
  content: string;
  category: number;
}

interface JWTPayload {
  roles: string;
}

function BoardWrite() {
  const location = useLocation();
  const navigate = useNavigate();
  const prevPath = location.state?.from || "/board";

  // 현재 사용자가 ADMIN인지 확인
  const isAdmin = () => {
    try {
      const userData = localStorage.getItem("userPersist");
      if (!userData) return false;

      const { userState } = JSON.parse(userData);
      const decoded = jwtDecode<JWTPayload>(userState.token);
      return decoded.roles === "ROLE_ADMIN";
    } catch {
      return false;
    }
  };

  const createPost = useCreatePost();

  const handleCreatePost = async (data: BoardRequest) => {
    try {
      await createPost.mutateAsync(data, {
        onSuccess: () => {
          navigate("/board");
        },
        onError: (error) => {
          console.error("Post 생성 실패했습니다", error);
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      category: 1, // 기본값 설정
    },
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      if (!data.content.trim()) {
        throw new Error("내용을 입력하세요.");
      }

      const postData: BoardRequest = {
        title: data.title,
        content: data.content,
        category: data.category,
      };

      await handleCreatePost(postData);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <Header scrollRatio={100} />
      <div className="h-14"></div>
      <Banner bannerImage={bugReportImage} category="write" />
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {isAdmin() && (
            <div className="mb-4">
              <Controller
                name="category"
                defaultValue={0}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-32 p-2 border border-gray-300 rounded focus:outline-none"
                  >
                    <option value={1}>버그 제보</option>

                    <option value={0}>공지사항</option>
                  </select>
                )}
              />
            </div>
          )}
          <div className="mb-4 border-t-2 border-t-black">
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "제목을 입력하세요." }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="제목을 입력하세요"
                  className="focus:outline-none w-full py-2 px-4 border border-gray-300"
                />
              )}
            />
            {errors.title && typeof errors.title.message === "string" && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Controller
              name="content"
              control={control}
              defaultValue=""
              rules={{ required: "내용을 입력하세요." }}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="내용을 입력하세요"
                  className="w-full h-96 p-4 border border-gray-300 focus:outline-none resize-none"
                />
              )}
            />
            {errors.content && typeof errors.content.message === "string" && (
              <p className="text-red-500">{errors.content.message}</p>
            )}
          </div>
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="mx-1.5 px-9 py-2 bg-[#000000c0] text-white hover:bg-black border border-black"
            >
              확인
            </button>
            <Link
              to={prevPath}
              className="mx-1.5 px-9 py-2 bg-white border border-transparent text-black hover:border hover:border-black"
            >
              취소
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default BoardWrite;

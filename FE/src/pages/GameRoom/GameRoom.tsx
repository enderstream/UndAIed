import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import SystemBubble from "../GamePlay/components/SystemBubble";
import ChatForm from "./components/ChatForm";
import { useSocket } from "../../hooks/useSocket";
import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import { IMessage, IPlayer } from "../../types/gameroom";
import AudioPlayer from "../../util/AudioPlayer";
import gameRoomBgm from "../../assets/bgm/game-room.mp3";
import { getPlayerIcon } from "../../util/PlayerIcon";
import ChatBubble from "./components/ChatBuble";
import Settings from "../../util/Setting";

interface IRoomInfo {
  roomId: number;
  roomTitle: string;
  isPrivate: boolean;
  playing: boolean;
  currentPlayers: IPlayer[];
}

interface IEmitDone {
  success: boolean;
  errorMessage: string;
  enterId: number;
  data: IRoomInfo;
}
interface ILeaveDone {
  success: boolean;
  errorMessage?: string;
}

interface IGameStartDone {
  success: boolean;
  errorMessage?: string;
  data: number;
}

interface IChatDone {
  success: boolean;
  errorMessage?: string;
  data: null;
}

interface IChatInfo {
  nickname: string;
  message: string;
}

function GameRoom() {
  const { number: roomIdParam } = useParams();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const password = searchParams.get("pwd");

  //socket 훅 사용
  const socket = useSocket();

  // const [roomError, setRoomError] = useState(false);
  // const [roomErrorMessage, setRoomErrorMessage] = useState("");

  //본인 엔터 아이다와 정보 각각
  const [playerEnterId, setPlayerEnterId] = useState<number>();
  const [playerInfo, setPlayerInfo] = useState<IPlayer | undefined>();

  //방 전체 정보보
  const [roomInfo, setRoomInfo] = useState<IRoomInfo>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ block: "end" });
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    //여기서 받는 데이터는 data.아래에 바로 데이터 존재
    socket.on("room:enter:send", (data: IRoomInfo) => {
      debugger;
      if (data.currentPlayers) {
        const newUsers: IPlayer[] = data.currentPlayers.sort(
          (a: IPlayer, b: IPlayer) => a.enterId - b.enterId
        );
        const data_ = data;
        data_.currentPlayers = newUsers;
        setRoomInfo(data_);
        debugger;
      }
    });

    // 누군가(또는 내가) 방에서 나갔을 때 (서버에서 send ('room:leave:send', data))
    socket.on("room:leave:send", (data: IRoomInfo) => {
      debugger;
      if (data.currentPlayers) {
        const newUsers: IPlayer[] = data.currentPlayers.sort(
          (a: IPlayer, b: IPlayer) => a.enterId - b.enterId
        );
        const data_ = data;
        data_.currentPlayers = newUsers;
        setRoomInfo(data_);
      }
    });

    socket.on("room:chat:send", (data: IChatInfo) => {
      debugger;
      if (data.message && data.nickname && roomInfo) {
        if (data.nickname === "system") {
          const newMessage: IMessage = {
            player: -1,
            nickname: data.nickname,
            text: data.message,
            isMine: false,
          };
          debugger;
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } else {
          const player = roomInfo.currentPlayers.find(
            (player) => player.nickname === data.nickname
          );

          if (player) {
            const newMessage: IMessage = {
              player: player.enterId,
              nickname: data.nickname,
              text: data.message,
              isMine: Boolean(player.enterId === playerEnterId),
            };
            debugger;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        }
      }
    });

    socket.on("game:init:send", (data: { gameId: number }) => {
      navigate(`/game/play/${data.gameId}`);
    });

    return () => {
      socket.off("room:enter:send");
      socket.off("room:leave:send");
      socket.off("room:chat:send");
      socket.off("game:init:send");
    };
  }, [socket, messages, playerEnterId, roomInfo]);

  //나 찾기기
  useEffect(() => {
    setPlayerInfo(
      roomInfo?.currentPlayers.find(
        (player) => player.enterId === playerEnterId
      )
    );
  }, [roomInfo, playerEnterId]);

  const handleEnterRoom = useCallback(() => {
    // 방 입장 요청
    if (!socket || !roomIdParam) {
      return;
    }

    socket.emit(
      "room:enter:emit",
      {
        roomId: Number(roomIdParam),
        password: password,
      },
      ({ success, errorMessage, enterId }: IEmitDone) => {
        //여기서 받는 건 없음
        if (success) {
          setPlayerEnterId(enterId);
          return;
        } else {
          // setRoomError(true);
          // setRoomErrorMessage(
          //   errorMessage || "입장 도중 에러러가 발생했습니다."
          // );
          toast.error(errorMessage);
          return;
        }
      }
    );
  }, [socket]);

  const handleLeaveRoom = useCallback(() => {
    // 방 퇴장 요청
    if (!socket || !roomIdParam) {
      return;
    }
    socket.emit(
      "room:leave:emit",
      {
        roomId: Number(roomIdParam),
      },
      ({ success, errorMessage }: ILeaveDone) => {
        if (success) {
          navigate("/game");
        } else {
          console.error("방 퇴장 중 오류:", errorMessage);
          toast.error(errorMessage);
        }
      }
    );
  }, [socket]);

  const handleRoomChat = useCallback(
    (input: string) => {
      debugger;
      if (!socket || !roomIdParam) {
        return;
      }
      socket.emit(
        "room:chat:emit",
        {
          roomId: Number(roomIdParam),
          message: input,
        },
        ({ success, errorMessage }: IChatDone) => {
          if (success) {
            debugger;
          } else {
            console.error("채팅 전송 오류:", errorMessage);
            toast.error(errorMessage);
          }
        }
      );
    },
    [socket]
  );

  const handleGameStart = useCallback(() => {
    //게임 시작 요청청
    if (!socket || !roomIdParam) {
      return;
    }
    //확인
    //방장 정보?
    socket.emit(
      "game:init:emit",
      { roomId: Number(roomIdParam) },
      //데이터 형식 맞는지 잘 확인하기. 현재 백에서 data는 gameId임!!
      ({ success, errorMessage }: IGameStartDone) => {
        if (success) {
        } else {
          //게임 시작 실패 안내내
          toast.error(errorMessage);
        }
      }
    );
  }, [socket]);

  useEffect(() => {
    if (socket && roomIdParam) {
      handleEnterRoom();
    }
  }, [socket, roomIdParam, handleEnterRoom]);

  // (1) chat-input-temp 너비를 저장할 state
  const [chatInputWidth, setChatInputWidth] = useState<number>(0);

  //새로고침 관련
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (socket) {
        event.preventDefault();
        // 보안 및 사용자 정책에 의해 현재는 개발자가 출력 문구를 정할 수 없음.
        // event.returnValue = "게임에서 나가시겠습니까?";
      }
    };

    const handleUnload = () => {
      if (socket) {
        socket.emit("pre-disconnect");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [socket]); // socket을 의존성 배열에 추가

  useEffect(() => {
    // (3) ResizeObserver를 통한 너비 측정
    const ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // contentRect.width가 실제 요소의 넓이
        setChatInputWidth(entry.contentRect.width);
      }
    });
    if (scrollRef.current) {
      ro.observe(scrollRef.current);
    }
    return () => {
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    // 새로운 메시지가 추가될 때 스크롤을 아래로 이동
    scrollToBottom();
  }, [messages]);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <>
      <AudioPlayer src={gameRoomBgm} isPlaying={true} shouldLoop={true} />

      <div className="bg-[#07070a]">
        <div className="background-gradient max-w-[90rem] mx-auto px-4 sm:px-4 md:px-6">
          <LeftSideBar
            roomId={roomInfo?.roomId}
            roomTitle={roomInfo?.roomTitle}
            nickname={playerInfo ? playerInfo.nickname : "연결이 끊어졌습니다."}
            icon={getPlayerIcon(playerInfo ? playerInfo.profileImage : 0)}
            socket={socket}
            onLeaveRoom={handleLeaveRoom}
            onGameStart={handleGameStart}
            player={playerInfo}
            onSettingsClick={() => setIsSettingsOpen(true)}
          />
          <div className="lg:pl-[19.5rem]">
            <div className="max-w-3xl mx-auto xl:max-w-none xl:ml-0 xl:mr-[32rem]">
              <div className="chat-container flex flex-col h-screen overflow-auto">
                {/* 메시지 리스트 영역 */}
                <div className="flex-1 px-5 pt-4">
                  {messages.map((msg: IMessage, index) => {
                    if (msg.player === -1) {
                      return <SystemBubble key={index} message={msg} />;
                    } else {
                      return (
                        <ChatBubble
                          key={index}
                          message={msg}
                          playerName={
                            roomInfo?.currentPlayers.find(
                              (user) => user.enterId === msg.player
                            )?.nickname
                          }
                          icon={
                            roomInfo?.currentPlayers.find(
                              (user) => user.enterId === msg.player
                            )?.profileImage
                          }
                        />
                      );
                    }
                  })}
                  <div
                    ref={scrollRef}
                    className="chat-input-temp h-[4.5rem] w-full"
                  ></div>
                  <div
                    className="chat-input fixed z-10 h-10 bottom-4"
                    style={{ width: chatInputWidth }}
                  >
                    <ChatForm
                      playerNum={playerInfo?.enterId}
                      socket={socket}
                      onSendChat={handleRoomChat}
                    />
                  </div>
                </div>
                <RightSideBar
                  players={roomInfo?.currentPlayers}
                  messages={messages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSettingsOpen && (
        <Settings
          title="설정"
          first={false}
          setFirst={() => {}}
          onClose={() => setIsSettingsOpen(false)}
          isSettingsOpen={isSettingsOpen}
        />
      )}
    </>
  );
}

export default GameRoom;

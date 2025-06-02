export {};

declare global {
  namespace google {
    namespace accounts {
      namespace id {
        interface CredentialResponse {
          credential: string;
          select_by?: string;
        }

        interface IdConfiguration {
          client_id: string;
          callback: (response: CredentialResponse) => void;
          auto_select?: boolean;
          cancel_on_tap_outside?: boolean;
          // 그 외 필요한 옵션들...
        }

        function initialize(input: IdConfiguration): void;

        function renderButton(
          parent: HTMLElement,
          options: {
            theme?: "outline" | "filled_blue";
            size?: "large" | "medium" | "small";
            text?: "signin_with" | "signup_with" | "continue_with" | "signin";
            shape?: "rectangular" | "pill" | "circle" | "square";
            logo_alignment?: "left" | "center";
            width?: string;
          },
        ): void;
      }
    }
  }
}

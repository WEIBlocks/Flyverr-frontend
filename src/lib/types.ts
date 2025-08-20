export interface ErrorResponse {
  data: {
    response: {
      message: string;
      success: boolean;
      error?: string[];
      code?: string;
    };
  };
}

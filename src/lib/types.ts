export interface ErrorResponse {
  response: {
    data: {
      message: string;
      success: boolean;
      error?: string[];
      code?: string;
      link?: string;
    };
  };
}

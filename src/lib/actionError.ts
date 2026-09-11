export class ActionError extends Error {
  constructor(
    public code: string,
    public message: string,
    public field?: string
  ) {
    super(message);
    this.name = 'ActionError';
  }
}

export function handleActionError(error: unknown): { success: false; error: { code: string; message: string; field?: string } } {
  if (error instanceof ActionError) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        field: error.field,
      },
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message,
      },
    };
  }

  return {
    success: false,
    error: {
      code: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred',
    },
  };
}

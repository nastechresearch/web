type Message = { role: "user" | "assistant"; content: string };
type FailureHandler = (error: Error) => void;

export const trpc = {
  gemma: { chat: { useMutation: ({ onSuccess, onError: _onError }: { onSuccess?: (response: { message: string; model: string }) => void; onError?: FailureHandler } = {}) => ({ isPending: false, mutate: (input: { messages: Message[] }) => onSuccess?.({ model: "Gemma 4 31B", message: `The public NasTech build received: “${input.messages.at(-1)?.content ?? "your question"}”. Connect an Ollama Cloud-compatible backend to enable live model responses.` }) }) } },
  subscribers: { join: { useMutation: ({ onSuccess, onError: _onError }: { onSuccess?: (response: { status: "subscribed"; alertSent: boolean }) => void; onError?: FailureHandler } = {}) => ({ isPending: false, mutate: (_input: { email: string; consent: boolean }) => onSuccess?.({ status: "subscribed", alertSent: false }) }) } },
};

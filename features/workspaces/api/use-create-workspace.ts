import { toast } from 'sonner';
// 非同期操作を簡単に扱うためのツールを提供。
import { useMutation, useQueryClient } from '@tanstack/react-query';
// APIのリクエスト型とレスポンス型を自動的に取得し、型安全を保証する。
import { InferRequestType, InferResponseType } from 'hono';

// clientを使ってAPIエンドポイントにリクエストを送信する。
import { client } from '@/lib/rpc';

// レスポンスを型として利用可能にする
type ResponseType = InferResponseType<(typeof client.api.workspaces)['$post']>;
// リクエストを型として利用可能にする
type RequestType = InferRequestType<(typeof client.api.workspaces)['$post']>;

// useCreateWorkspaceとして作成し、再利用可能にする
export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  // 第1型引数 (ResponseType): 成功時のレスポンス型。
  // 第2型引数 (Error): エラー時の型。
  // 第3型引数 (RequestType): リクエスト時の型。
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspaces['$post']({ form });
      if (!response.ok) {
        throw new Error('Failed to create workspace');
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Workspace created');
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
    onError: () => {
      toast.error('Failed to create workspace');
    },
  });
  return mutation;
};

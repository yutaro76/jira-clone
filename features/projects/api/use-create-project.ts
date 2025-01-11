import { toast } from 'sonner';
// 非同期操作を簡単に扱うためのツールを提供。
import { useMutation, useQueryClient } from '@tanstack/react-query';
// APIのリクエスト型とレスポンス型を自動的に取得し、型安全を保証する。
import { InferRequestType, InferResponseType } from 'hono';

// clientを使ってAPIエンドポイントにリクエストを送信する。
import { client } from '@/lib/rpc';

// レスポンスを型として利用可能にする
type ResponseType = InferResponseType<
  (typeof client.api.projects)['$post'],
  200
>;
// リクエストを型として利用可能にする
type RequestType = InferRequestType<(typeof client.api.projects)['$post']>;

// useCreateWorkspaceとして作成し、再利用可能にする
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  // 第1型引数 (ResponseType): 成功時のレスポンス型。
  // 第2型引数 (Error): エラー時の型。
  // 第3型引数 (RequestType): リクエスト時の型。
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.projects['$post']({ form });
      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Peoject created');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: () => {
      toast.error('Failed to create project');
    },
  });
  return mutation;
};

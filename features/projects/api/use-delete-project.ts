import { toast } from 'sonner';
// 非同期操作を簡単に扱うためのツールを提供。
import { useMutation, useQueryClient } from '@tanstack/react-query';
// APIのリクエスト型とレスポンス型を自動的に取得し、型安全を保証する。
import { InferRequestType, InferResponseType } from 'hono';

// clientを使ってAPIエンドポイントにリクエストを送信する。
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';

// レスポンスを型として利用可能にする
type ResponseType = InferResponseType<
  (typeof client.api.projects)[':projectId']['$delete'],
  200
>;
// リクエストを型として利用可能にする
type RequestType = InferRequestType<
  (typeof client.api.projects)[':projectId']['$delete']
>;

// useCreateWorkspaceとして作成し、再利用可能にする
export const useDeleteProject = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  // 第1型引数 (ResponseType): 成功時のレスポンス型。
  // 第2型引数 (Error): エラー時の型。
  // 第3型引数 (RequestType): リクエスト時の型。
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[':projectId']['$delete']({
        param,
      });
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success('Peoject deleted');
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', data.$id] });
    },
    onError: () => {
      toast.error('Failed to delete project');
    },
  });
  return mutation;
};

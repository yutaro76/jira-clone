import { toast } from 'sonner';
// 非同期操作を簡単に扱うためのツールを提供。
import { useMutation, useQueryClient } from '@tanstack/react-query';
// APIのリクエスト型とレスポンス型を自動的に取得し、型安全を保証する。
import { InferRequestType, InferResponseType } from 'hono';

// clientを使ってAPIエンドポイントにリクエストを送信する。
import { client } from '@/lib/rpc';
import { use } from 'react';
import { useRouter } from 'next/navigation';

// レスポンスを型として利用可能にする
type ResponseType = InferResponseType<
  (typeof client.api.tasks)[':taskId']['$patch'],
  200
>;
// リクエストを型として利用可能にする
type RequestType = InferRequestType<
  (typeof client.api.tasks)[':taskId']['$patch']
>;

// useCreateTaskとして作成し、再利用可能にする
export const useUpdateTask = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  // 第1型引数 (ResponseType): 成功時のレスポンス型。
  // 第2型引数 (Error): エラー時の型。
  // 第3型引数 (RequestType): リクエスト時の型。
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.tasks[':taskId']['$patch']({
        json,
        param,
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success('Task updated');

      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', data.$id] });
    },
    onError: () => {
      toast.error('Failed to update task');
    },
  });
  return mutation;
};

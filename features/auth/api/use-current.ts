import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/rpc';

// ログインユーザーを取得する
export const useCurrent = () => {
  const query = useQuery({
    // セッションがcurrentに格納される
    queryKey: ['current'],
    queryFn: async () => {
      const response = await client.api.auth.current.$get();

      if (!response.ok) {
        return null;
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};

import { hc } from 'hono/client';

import { AppType } from '@/app/api/[[...route]]/route';

// 他の部分のコードでclientをインポートし、型安全な方法でAPIと通信することができる。
// ベースのURLに型を設定して他のファイルでも使えるようにする。
export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);

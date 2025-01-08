import 'server-only';

import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  type Account as AccountType,
  type Databases as DatabasesType,
  type Storage as StorageType,
  type Users as UsersType,
} from 'node-appwrite';

import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';

import { AUTH_COOKIE } from '@/features/auth/constants';

// 別ファイルに値を渡したときに型を明確にする
type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    // クッキーからセッションを取得
    const session = getCookie(c, AUTH_COOKIE);

    // セッションが存在しない場合は、Unauthorizedエラーを返す
    if (!session) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // クライアントにセッションを追加
    client.setSession(session);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    // ユーザー情報を取得
    const user = await account.get();

    // セッション情報をコンテキストに設定
    c.set('account', account);
    c.set('databases', databases);
    c.set('storage', storage);
    c.set('user', user);

    await next();
  }
);

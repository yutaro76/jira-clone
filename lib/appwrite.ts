import 'server-only';

import { Client, Account, Storage, Users, Databases } from 'node-appwrite';

export async function createAdminClient() {
  // Client()は上記のパッケージからインポートされている
  // Appwriteのサーバーの接続に必要な情報を設定する
  const client = new Client()
    // !はnullかundefinedでないことを示す
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
  };
}

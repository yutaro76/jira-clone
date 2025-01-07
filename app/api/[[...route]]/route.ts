import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import auth from '@/features/auth/server/route';

// Honoフレームワークの新しいインスタンスを作成し、ベースパスを/apiに設定。
// これにより、すべてのルートが/apiから始まるようになる。
const app = new Hono().basePath('/api');

// /authパスに対してauthハンドラを設定。
// これにより、/api/authに対するリクエストがauthハンドラで処理されます。
const routes = app.route('/auth', auth);

// appインスタンスをhandle関数に渡し、GETリクエストのハンドラをエクスポート。
// これにより、GETリクエストがappで定義されたルートに従って処理される。
export const GET = handle(app);
export const POST = handle(app);

// ルートの型をエクスポート。
// これにより、他のファイルでルートをインポートして型を使用できる。
export type AppType = typeof routes;

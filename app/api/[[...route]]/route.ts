import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import auth from '@/features/auth/server/route';
import members from '@/features/members/server/route';
import workspaces from '@/features/workspaces/server/route';
import projects from '@/features/projects/server/route';
import tasks from '@/features/tasks/server/route';

// Honoフレームワークの新しいインスタンスを作成し、ベースパスを/apiに設定。
// これにより、すべてのルートが/apiから始まるようになる。
const app = new Hono().basePath('/api');

// /authパスに対してauthハンドラを設定。
// これにより、/api/authに対するリクエストがauthハンドラで処理される。
// eslint-disable-next-line
const routes = app
  .route('/auth', auth)
  .route('/workspaces', workspaces)
  .route('/members', members)
  .route('/projects', projects)
  .route('/tasks', tasks);

// appインスタンスをhandle関数に渡し、GETリクエストのハンドラをエクスポート。
// これにより、GETリクエストがappで定義されたルートに従って処理される。
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

// ルートの型をエクスポート。
// これにより、他のファイルでルートをインポートして型を使用できる。
export type AppType = typeof routes;

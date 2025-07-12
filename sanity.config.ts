'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import React from 'react'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // タイトルとロゴのカスタマイズ
  title: 'ブログ管理画面',
  projectInfo: {
    projectName: 'ブログ管理画面',
  },
  // デフォルトのドキュメントタイプを設定
  defaultDocumentNode: (S: any) =>
    S.document().views([
      S.view.form(),
      S.view.component(() => 
        React.createElement('div', { style: { padding: '1rem' } },
          React.createElement('p', null, 'このドキュメントは自動保存されます。変更はすぐに反映されます。')
        )
      ).title('ヘルプ'),
    ]),
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({
      structure,
      // サイドバーのタイトルを日本語化
      title: 'コンテンツ',
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({
      defaultApiVersion: apiVersion,
      // ビジョンのタイトルを日本語化
      title: 'クエリ',
    }),
  ],
})

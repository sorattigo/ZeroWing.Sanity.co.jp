export default {
  name: 'post',
  title: '記事',
  type: 'document',
  icon: () => '📝',
  fields: [
    {
      name: 'title',
      title: 'タイトル',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('タイトルは必須です'),
      description: '記事のタイトルを入力してください',
    },
    {
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required().error('スラッグは必須です'),
      description: 'URLの一部として使用されます。通常はタイトルから自動生成されます',
    },
    {
      name: 'excerpt',
      title: '抜粋',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(200).error('200文字以内で入力してください'),
      description: '記事の要約を入力してください（検索エンジンやカード表示に使用されます）',
    },
    {
      name: 'mainImage',
      title: 'メイン画像',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: '記事のメイン画像をアップロードしてください',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '代替テキスト',
          description: '画像の説明を入力してください（アクセシビリティのため）',
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      name: 'categories',
      title: 'カテゴリー',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: (Rule: any) => Rule.required().error('少なくとも1つのカテゴリーを選択してください'),
      description: 'この記事のカテゴリーを選択してください（複数選択可）',
    },
    {
      name: 'tags',
      title: 'タグ',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      description: 'この記事に関連するタグを選択してください（任意・複数選択可）',
    },
    {
      name: 'publishedAt',
      title: '公開日時',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
      description: '記事を公開する日時を設定してください',
    },
    {
      name: 'body',
      title: '本文',
      type: 'blockContent',
      description: '記事の本文を入力してください',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
}

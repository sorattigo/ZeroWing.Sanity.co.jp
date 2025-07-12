export default {
  name: 'category',
  title: 'カテゴリー',
  type: 'document',
  icon: () => '📁',
  fields: [
    {
      name: 'title',
      title: 'カテゴリー名',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('カテゴリー名は必須です'),
    },
    {
      name: 'description',
      title: '説明',
      type: 'text',
      description: 'カテゴリーの説明を入力してください',
    },
    {
      name: 'color',
      title: 'カラー',
      type: 'string',
      description: 'カテゴリーの色を選択してください',
      options: {
        list: [
          { title: '青', value: '#3B82F6' },
          { title: '緑', value: '#10B981' },
          { title: '紫', value: '#8B5CF6' },
          { title: 'ピンク', value: '#EC4899' },
          { title: 'オレンジ', value: '#F59E0B' },
        ],
      },
    },
  ],
}

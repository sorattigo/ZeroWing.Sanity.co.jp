export default {
  name: 'tag',
  title: 'タグ',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    {
      name: 'title',
      title: 'タグ名',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('タグ名は必須です'),
      description: 'タグ名を入力してください（例: 技術, デザイン, 旅行）',
    },
    {
      name: 'description',
      title: '説明',
      type: 'text',
      description: 'タグの説明を入力してください（任意）',
    },
  ],
}

import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'カテゴリー',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'カテゴリー名',
      type: 'string',
      validation: (Rule) => Rule.required().error('カテゴリー名は必須です'),
      description: 'カテゴリー名を入力してください（例: 技術, デザイン, 旅行）',
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      description: 'URLに使用されるユニークな識別子です。通常は自動生成されます。',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('スラッグは必須です'),
    }),
    defineField({
      name: 'description',
      title: '説明',
      type: 'text',
      description: 'カテゴリーの説明を入力してください（任意）',
    }),

  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare(selection) {
      const {title, description} = selection
      return {
        title: title || 'タイトルなし',
        subtitle: description || '説明なし',
        media: TagIcon,
      }
    },
  },
})

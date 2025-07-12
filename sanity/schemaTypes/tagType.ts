import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const tagType = defineType({
  name: 'tag',
  title: 'タグ',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'タグ名',
      type: 'string',
      validation: (Rule) => Rule.required().error('タグ名は必須です'),
      description: 'タグ名を入力してください（例: 技術, デザイン, 旅行）',
    }),
    defineField({
      name: 'description',
      title: '説明',
      type: 'text',
      description: 'タグの説明を入力してください（任意）',
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

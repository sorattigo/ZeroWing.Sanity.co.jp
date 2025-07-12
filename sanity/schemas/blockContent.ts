export default {
  title: 'リッチテキスト',
  name: 'blockContent',
  type: 'array',
  description: '記事の本文を入力してください。見出しやリスト、画像などを追加できます。',
  of: [
    {
      title: 'ブロック',
      type: 'block',
      styles: [
        { title: '標準', value: 'normal' },
        { title: '見出し1', value: 'h1' },
        { title: '見出し2', value: 'h2' },
        { title: '見出し3', value: 'h3' },
        { title: '引用', value: 'blockquote' },
      ],
      lists: [
        { title: '箇条書き', value: 'bullet' },
        { title: '番号付きリスト', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: '太字', value: 'strong' },
          { title: '斜体', value: 'em' },
          { title: 'コード', value: 'code' },
        ],
        annotations: [
          {
            title: 'リンク',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                description: 'リンク先のURLを入力してください',
              },
              {
                title: '新しいタブで開く',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
                description: 'チェックを入れると別タブで開きます',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      title: '画像',
      options: { 
        hotspot: true,
        metadata: ['lqip', 'palette', 'exif', 'location'],
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '代替テキスト',
          description: '画像の説明を入力してください（SEOとアクセシビリティのため重要です）',
          validation: (Rule: any) => Rule.required().error('代替テキストは必須です'),
          options: {
            isHighlighted: true,
          },
        },
        {
          name: 'caption',
          type: 'string',
          title: 'キャプション',
          description: '画像の下に表示されるキャプション（任意）',
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      type: 'code',
      title: 'コードブロック',
      options: {
        language: 'javascript',
        languageAlternatives: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSON', value: 'json' },
          { title: 'Bash', value: 'bash' },
          { title: 'Python', value: 'python' },
          { title: 'Java', value: 'java' },
          { title: 'PHP', value: 'php' },
          { title: 'Ruby', value: 'ruby' },
          { title: 'プレーンテキスト', value: 'text' },
        ],
      },
    },
  ],
}

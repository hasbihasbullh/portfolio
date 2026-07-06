import { defineType, defineField } from 'sanity'
import { Code2 } from 'lucide-react'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  icon: Code2,
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Tools', value: 'tools' },
          { title: 'AI/ML', value: 'ai' },
        ]
      }
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name (react-icons)',
      type: 'string',
      description: 'e.g. SiReact, SiNextdotjs',
    }),
    orderRankField({ type: 'skill' })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    }
  }
})

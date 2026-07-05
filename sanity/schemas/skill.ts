import { defineType, defineField } from 'sanity'

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
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
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    })
  ],
})

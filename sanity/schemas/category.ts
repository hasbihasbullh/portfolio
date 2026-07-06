import { defineType, defineField } from 'sanity'
import { Tags } from 'lucide-react'

export const category = defineType({
  name: 'category',
  title: 'Project Category',
  type: 'document',
  icon: Tags,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. Web App, Mobile App, UI/UX',
    }),
  ],
})

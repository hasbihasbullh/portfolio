import { defineType, defineField } from 'sanity'
import { Rocket } from 'lucide-react'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: Rocket,
  groups: [
    { name: 'general', title: 'General Info' },
    { name: 'media', title: 'Media & Images' },
    { name: 'tech', title: 'Tech Stack & Links' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'date',
      title: 'Release Date',
      type: 'date',
      options: { dateFormat: 'DD-MM-YYYY' },
      group: 'general',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'general',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      group: 'general',
    }),
    defineField({
      name: 'isPinned',
      title: 'Is Pinned (Featured)',
      type: 'boolean',
      initialValue: false,
      group: 'general',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
    }),
    defineField({
      name: 'fullPageImage',
      title: 'Full Page Image',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      group: 'tech',
      of: [
        {
          name: 'techItem',
          type: 'object',
          fields: [
            { name: 'name', title: 'Name (e.g. React)', type: 'string' },
            { name: 'icon', title: 'React Icon Name (e.g. FaReact, SiNextdotjs)', type: 'string' },
            { name: 'color', title: 'Tailwind Color (e.g. text-blue-500)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'linkDemo',
      title: 'Demo Link',
      type: 'url',
      group: 'tech',
    }),
    defineField({
      name: 'linkGithub',
      title: 'GitHub Link',
      type: 'url',
      group: 'tech',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      media: 'image',
    },
  },
})

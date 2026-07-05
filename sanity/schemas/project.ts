import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
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
    }),
    defineField({
      name: 'linkGithub',
      title: 'GitHub Link',
      type: 'url',
    }),
    defineField({
      name: 'fullPageImage',
      title: 'Full Page Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'isPinned',
      title: 'Is Pinned (Featured)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
  ],
})

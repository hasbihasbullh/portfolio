import { defineType, defineField } from 'sanity'
import { User } from 'lucide-react'

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: User,
  groups: [
    { name: 'general', title: 'General Info' },
    { name: 'media', title: 'Media & Images' },
    { name: 'links', title: 'Links & Socials' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'role',
      title: 'Role / Headline',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'description',
      title: 'Short Description (For Home/Welcome)',
      type: 'localeText',
      group: 'general',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'Long Description (For About Page)',
      type: 'localeBlock',
      group: 'general',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images (For Home Stack)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      group: 'media',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'links',
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Upload Resume (PDF)',
      type: 'file',
      options: { accept: '.pdf' },
      group: 'links',
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      group: 'links',
      fields: [
        { name: 'github', title: 'GitHub', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})

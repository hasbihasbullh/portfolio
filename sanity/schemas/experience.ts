import { defineType, defineField } from 'sanity'
import { Briefcase } from 'lucide-react'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: Briefcase,
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: 'company', title: 'Company', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'position', title: 'Position', type: 'localeString' }),
    defineField({ name: 'duration', title: 'Duration', type: 'localeString' }),
    defineField({ name: 'description', title: 'Description', type: 'localeText' }),
    defineField({ name: 'logo', title: 'Company Logo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Internship', value: 'internship' },
          { title: 'Training', value: 'training' },
          { title: 'Apprentice', value: 'apprentice' },
        ],
      },
    }),
    defineField({
      name: 'workMode',
      title: 'Work Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Remote', value: 'remote' },
          { title: 'Onsite', value: 'onsite' },
          { title: 'Hybrid', value: 'hybrid' },
        ],
      },
    }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'responsibilities', title: 'Responsibilities', type: 'array', of: [{ type: 'localeText' }] }),
    orderRankField({ type: 'experience' })
  ],
  preview: {
    select: {
      title: 'position.en',
      company: 'company',
      media: 'logo',
    },
    prepare(selection) {
      const {title, company, media} = selection
      return {
        title: title || company,
        subtitle: title ? company : undefined,
        media: media,
      }
    }
  }
})

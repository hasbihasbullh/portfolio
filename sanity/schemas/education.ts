import { defineType, defineField } from 'sanity'
import { GraduationCap } from 'lucide-react'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: GraduationCap,
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: 'institution', title: 'Institution', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'major', title: 'Major', type: 'localeString' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'details', title: 'Details', type: 'localeText' }),
    defineField({ name: 'logo', title: 'Institution Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'gpa', title: 'GPA / Score', type: 'string' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
          { title: 'Paused', value: 'paused' },
        ],
      },
    }),
    orderRankField({ type: 'education' })
  ],
  preview: {
    select: {
      title: 'institution',
      subtitle: 'major.en',
      media: 'logo',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title,
        subtitle: subtitle || 'Education',
        media: media,
      }
    }
  }
})

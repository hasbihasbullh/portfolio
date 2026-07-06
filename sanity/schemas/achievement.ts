import { defineType, defineField } from 'sanity'
import { Award } from 'lucide-react'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const achievement = defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  icon: Award,
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'issuer', title: 'Issuer', type: 'string' }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'DD-MM-YYYY' }
    }),
    defineField({ name: 'certificateUrl', title: 'Certificate URL', type: 'url' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Certificate', value: 'certificate' },
          { title: 'Badge', value: 'badge' },
        ],
      },
      initialValue: 'certificate',
    }),
    defineField({ name: 'credentialId', title: 'Credential ID', type: 'string' }),
    orderRankField({ type: 'achievement' })
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
    },
    prepare(selection) {
      const {title, date, media} = selection
      return {
        title: title,
        subtitle: date ? `Issued: ${date}` : '',
        media: media,
      }
    }
  }
})

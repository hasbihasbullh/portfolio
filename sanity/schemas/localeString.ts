import { defineType, defineField } from 'sanity'

export const localeString = defineType({
  title: 'Localized String',
  name: 'localeString',
  type: 'object',
  fields: [
    defineField({
      title: 'English',
      name: 'en',
      type: 'string',
    }),
    defineField({
      title: 'Indonesian',
      name: 'id',
      type: 'string',
    }),
  ],
})

export const localeText = defineType({
  title: 'Localized Text',
  name: 'localeText',
  type: 'object',
  fields: [
    defineField({
      title: 'English',
      name: 'en',
      type: 'text',
    }),
    defineField({
      title: 'Indonesian',
      name: 'id',
      type: 'text',
    }),
  ],
})

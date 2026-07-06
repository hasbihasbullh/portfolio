'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { User, Briefcase, GraduationCap, Award, Code2, Rocket, Tags } from 'lucide-react'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Singleton Profile
            S.listItem()
              .title('Profile Settings')
              .id('profileSettings')
              .icon(User)
              .child(
                S.document()
                  .schemaType('profile')
                  .documentId('profileSettings')
              ),
            
            S.divider(),
            
            // Standard Documents
            S.documentTypeListItem('category').title('Project Categories').icon(Tags),
            S.documentTypeListItem('project').title('Projects').icon(Rocket),
            
            S.divider(),
            
            // Orderable Documents
            orderableDocumentListDeskItem({ type: 'experience', title: 'Experience', icon: Briefcase, S, context }),
            orderableDocumentListDeskItem({ type: 'education', title: 'Education', icon: GraduationCap, S, context }),
            orderableDocumentListDeskItem({ type: 'achievement', title: 'Achievements', icon: Award, S, context }),
            orderableDocumentListDeskItem({ type: 'skill', title: 'Skills', icon: Code2, S, context }),
          ])
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})

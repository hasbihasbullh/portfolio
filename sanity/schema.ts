import { type SchemaTypeDefinition } from 'sanity'

import { localeString, localeText, localeBlock } from './schemas/localeString'
import { profile } from './schemas/profile'
import { project } from './schemas/project'
import { achievement } from './schemas/achievement'
import { experience } from './schemas/experience'
import { education } from './schemas/education'
import { skill } from './schemas/skill'
import { category } from './schemas/category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [localeString, localeText, localeBlock, profile, category, project, achievement, experience, education, skill],
}


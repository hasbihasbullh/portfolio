import { type SchemaTypeDefinition } from 'sanity'

import { localeString, localeText } from './schemas/localeString'
import { profile } from './schemas/profile'
import { project } from './schemas/project'
import { achievement } from './schemas/achievement'
import { experience } from './schemas/experience'
import { education } from './schemas/education'
import { skill } from './schemas/skill'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [localeString, localeText, profile, project, achievement, experience, education, skill],
}


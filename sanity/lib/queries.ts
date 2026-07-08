import { groq } from 'next-sanity'

export const profileQuery = groq`*[_type == "profile" && _id == "profileSettings"][0]{
  name,
  role,
  "description": {
    "en": description.en,
    "id": description.id
  },
  "aboutDescription": {
    "en": aboutDescription.en,
    "id": aboutDescription.id
  },
  "imageUrl": image.asset->url,
  "galleryUrls": gallery[].asset->url,
  email,
  "resumeUrl": resumeUrl.asset->url,
  socials
}`

export const projectsQuery = groq`*[_type == "project"] | order(date desc, _createdAt desc){
  title,
  slug,
  date,
  "description": {
    "en": description.en,
    "id": description.id
  },
  "imageUrl": image.asset->url,
  "fullPageImageUrl": fullPageImage.asset->url,
  techStack,
  linkDemo,
  linkGithub,
  isPinned,
  "category": category->title,
  _createdAt
}`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  title,
  slug,
  date,
  "description": {
    "en": description.en,
    "id": description.id
  },
  "imageUrl": image.asset->url,
  "fullPageImageUrl": fullPageImage.asset->url,
  techStack,
  linkDemo,
  linkGithub,
  isPinned,
  "category": category->title,
  _createdAt
}`

export const experiencesQuery = groq`*[_type == "experience"] | order(orderRank){
  company,
  "position": {
    "en": position.en,
    "id": position.id
  },
  "duration": {
    "en": duration.en,
    "id": duration.id
  },
  "description": {
    "en": description.en,
    "id": description.id
  },
  "logo": logo.asset->url,
  type,
  workMode,
  location,
  responsibilities
}`

export const educationQuery = groq`*[_type == "education"] | order(orderRank){
  institution,
  "major": {
    "en": major.en,
    "id": major.id
  },
  year,
  "details": {
    "en": details.en,
    "id": details.id
  },
  "logo": logo.asset->url,
  location,
  gpa,
  status
}`

export const skillsQuery = groq`*[_type == "skill"] | order(orderRank){
  name,
  category,
  icon
}`

export const achievementsQuery = groq`*[_type == "achievement"] | order(date desc){
  title,
  issuer,
  date,
  year,
  certificateUrl,
  credentialId,
  "imageUrl": image.asset->url,
  type
}`

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDir = path.join(process.cwd(), 'projects')
const encoding = 'utf8'

const getProjects = async () => {
  const names = fs.readdirSync(projectsDir)
  const projects = names.map(name => {
    const slug = path.basename(name, '.mdx')
    const location = path.join(projectsDir, name)
    const contents = fs.readFileSync(location, { encoding })
    const preparsed = matter(contents)

    return {
      slug,
      location,
      metadata: preparsed.data,
      content: preparsed.content
    }
  })

  return { props: { projects: projects.sort(featuredSort) } }
}

const featuredSort = (a, b) => {
  const aGrid = a.metadata.grid || 4
  const bGrid = b.metadata.grid || 4

  return bGrid - aGrid
}

export default getProjects

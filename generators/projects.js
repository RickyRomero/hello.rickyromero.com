import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDir = path.join(process.cwd(), 'projects')
const encoding = 'utf8'

const getProjectSlugs = async () => {
  return fs.readdirSync(projectsDir)
    .filter(item => !/^\./.test(path.basename(item)))
}

const getProjectsMeta = async () => {
  const names = await getProjectSlugs()
  const projects = names.map(name => {
    const slug = path.basename(name)
    const location = path.join(projectsDir, name, 'index.mdx')
    const contents = fs.readFileSync(location, { encoding })
    const preparsed = matter(contents)

    return {
      slug,
      location,
      metadata: preparsed.data,
      content: preparsed.content
    }
  })

  return projects.sort(featuredSort)
}

const getProject = async slug => {
  // TODO: Less hacky version
  const projects = await getProjectsMeta()
  return projects.filter(p => p.slug === slug).pop()
}

const featuredSort = (a, b) => {
  const aGrid = a.metadata.grid || 4
  const bGrid = b.metadata.grid || 4

  return bGrid - aGrid
}

export { getProjectSlugs, getProjectsMeta, getProject }

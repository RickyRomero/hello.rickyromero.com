import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDir = path.join(process.cwd(), 'projects')
const encoding = 'utf8'

const getProjectSlugs = async () => {
  return fs.readdirSync(projectsDir)
    .filter(item => !/^\./.test(path.basename(item)))
}

const getProjects = async getFull => {
  const names = await getProjectSlugs()
  const projects = await Promise.all(names.map(async name => {
    const slug = path.basename(name)
    const location = path.join(projectsDir, name, 'index.md')
    const contents = fs.readFileSync(location, { encoding })
    const preparsed = matter(contents)

    const addendum = {}
    if (getFull) {
      addendum.contents = preparsed.content
    }

    return {
      slug,
      location,
      metadata: preparsed.data,
      ...addendum
    }
  }))

  return projects.sort(featuredSort)
}

const getProjectsMeta = async () => {
  return await getProjects(false)
}

const getProject = async slug => {
  const projects = await getProjects(true)
  return projects.filter(p => p.slug === slug).pop()
}

const featuredSort = (a, b) => {
  const aGrid = a.metadata.grid || 4
  const bGrid = b.metadata.grid || 4

  return bGrid - aGrid
}

export { getProjectSlugs, getProjectsMeta, getProject }

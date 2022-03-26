// This hook lets us run multiple transformations on a given spring value.
// This gives us a bit more control over how a single spring runs a given
// animation (and works around a bug in useTransform; it's supposed to
// map non-number transformation values and isn't actually doing that).

import { useMotionValue, useTransform } from 'framer-motion'

const useProjectMvTransform = (expanded, properties) => {
  const transformHooks = {}
  const projectMotionValue = useMotionValue(Number(expanded))

  Object.keys(properties).forEach(p => {
    transformHooks[p] = useTransform(projectMotionValue, properties[p])
  })

  const setProjectMotionValue = ({ progress }) => {
    projectMotionValue.set(progress)
  }

  return [transformHooks, setProjectMotionValue]
}

export default useProjectMvTransform

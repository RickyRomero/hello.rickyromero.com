// This hook lets us convert a non-zero spring to a value, instead of
// solely relying on the expanded boolean prop. This is useful if we
// need a value in force for the entire open phase of the project's
// expansion/contraction animation.

import { useMotionValue, useTransform } from 'framer-motion'

const useProjectMvTransform = (expanded, targets) => {
  const projectMotionValue = useMotionValue(Number(expanded))
  const computedTarget = useTransform(
    projectMotionValue,
    [0, 0.0001],
    targets
  )

  const setProjectMotionValue = ({ progress }) => {
    projectMotionValue.set(Number(progress !== 0))
  }

  return [computedTarget, setProjectMotionValue]
}

export default useProjectMvTransform

const classList = (...classes) => {
  const fullList = classes
    .flatMap(group => group.split(/\s+/))
    .filter(entry => entry.length > 0)
  const uniqueClasses = [...(new Set(fullList))]

  return uniqueClasses.join(' ')
}

export default classList

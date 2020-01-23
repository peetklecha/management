const findEmployeeByName = (name, arr) => {
  return arr.find(elem => elem.name === name)
}





const findManagerFor = (obj, arr) => {
  if (obj.managerId !== undefined) {
    return arr.find(elem => elem.id === obj.managerId)
  } else {
    return []
  }
}






const findCoworkersFor = (obj, arr) => {
  const idvalue = obj.managerId
  let coworkers = []
  arr.forEach(elem => {
    if (elem.managerId === idvalue) {
      coworkers.push(elem)
    }
  })
  return coworkers.slice(1)
}






const findManagementChainForEmployee = (obj, arr) => {
  let newArr = []
  let upperManager = findManagerFor(obj, arr)
  while (upperManager.managerId !== undefined) {
    newArr.push(upperManager)
    upperManager = findManagerFor(upperManager, arr)
  }
  newArr = newArr.reverse()
  return [arr[0], ...newArr]
}





const generateManagementTree = (employees) => {
  let tree = {}
  const manager = employees.find(employObj => employObj.managerId === undefined)
  tree = {...manager}

  const findEmployeesFor = (manager, employees) => {
    const underlings = employees.filter(employee => employee.managerId === manager.id)

    manager.reports = underlings

    underlings.forEach(emply => {
      findEmployeesFor(emply, employees)
    })
  }
  findEmployeesFor(tree, employees) 
  return tree
}





const displayManagementTree = (obj) => {
  let resultStri = ''
  resultStri += obj.name + '\n'

  for (key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach(lowerObj => {
        lowerObj.name = `-${lowerObj.name}`
        return resultStri += displayManagementTree(lowerObj)
      }) 
    }
  }
  return resultStri
}

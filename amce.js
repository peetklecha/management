
//[pk] nice!
const findEmployeeByName = (name, arr) => {
  return arr.find(elem => elem.name === name)
}




//[pk] why return [] when there is no manager? undefined or null would be better
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
  //[pk] i see what you are trying to do but this is not the way to do it.
  //[pk] you're sort of cheating because you are just exploiting the fact that you know that
  //[pk] the first one happens to be the obj it gets called on. but that won't always be the case
  //[pk] see solution for how to do it automatically
  //[pk] also using the "filter" array method would be much less verbose
}





//[pk] adding arr[0] to the beginning is causing your output to not be right -- and again it's cheating like above!
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




//[pk] good!
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




//[pk] good but not generating the different numbers of dashes -- see solution
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

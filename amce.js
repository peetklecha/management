const employees = [
    { id: 1, name: 'moe'},
    { id: 2, name: 'larry', managerId: 1},
    { id: 4, name: 'shep', managerId: 2},
    { id: 3, name: 'curly', managerId: 1},
    { id: 5, name: 'groucho', managerId: 3},
    { id: 6, name: 'harpo', managerId: 5},
    { id: 8, name: 'shep Jr.', managerId: 4},
    { id: 99, name: 'lucy', managerId: 1}
  ];
  
  const spacer = (text)=> {
    if(!text){
      return console.log('');
    }
    const stars = new Array(5).fill('*').join('');
    console.log(`${stars} ${text} ${stars}`);
  }
  
  
  
  
  
  const findEmployeeByName = (name, arr) => {
    return arr.find(elem => elem.name === name)
  }
  
  spacer('findEmployeeByName Moe')
  // given a name and array of employees, return employee
  console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
  spacer('')
  
  
  // testing
  
  
  
  const findManagerFor = (obj, arr) => {
    if (obj.managerId !== undefined) {
      return arr.find(elem => elem.id === obj.managerId)
    } else {
      return []
    }
  }
  
  spacer('findManagerFor shep Jr')
  //given an employee and a list of employees, return the employee who is the manager
  console.log(findManagerFor(findEmployeeByName('harpo', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
  spacer('')
  
  
  
  
  
  
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
  
  spacer('findCoworkersFor Larry')
  //given an employee and a list of employees, return the employees who report to the same manager
  console.log(findCoworkersFor(findEmployeeByName('lucy', employees), employees));/*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */
  spacer('');
  
  
  
  
  
  
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
  
  
  spacer('findManagementChain for moe')
  //given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
  console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
  spacer('');
  spacer('findManagementChain for shep Jr.')
  console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
  spacer('');
  
  
  
  
  
  // const generateManagementTree = (arrOfEmp) => {
  //   if (arrOfEmp[0].managerId === undefined) {
  //     const treeObj = arrOfEmp[0]
  //     //treeObj.reports = []
      
  //   }
  //   else {
  //     const newEmpArr = arrOfEmp.map(empObj => {
  //       if (empObj.managerId === empObj.id) {
  //         treeObj.reports = empObj
  //         return treeObj.reports.push(generateManagementTree(arrOfEmp.slice(1)))
  //       }
  //     })
  //   }
  //   return treeObj
  // }
  
  //   arrOfEmp.map((emply) => {
  //     if (emply.managerId === undefined) {
  //     return emply
  //   } else {
  //     if (emply.managerId === emplyid) {
  //       emply.reports = [emply]
  //     }
  //   }
  //   })
    
  // }
  
  // const employees = [
  //   { id: 1, name: 'moe'},
  //   { id: 2, name: 'larry', managerId: 1},
  //   { id: 4, name: 'shep', managerId: 2},
  //   { id: 3, name: 'curly', managerId: 1},
  //   { id: 5, name: 'groucho', managerId: 3},
  //   { id: 6, name: 'harpo', managerId: 5},
  //   { id: 8, name: 'shep Jr.', managerId: 4},
  //   { id: 99, name: 'lucy', managerId: 1}
  // ];
  
  
  const generateManagementTree = (employees) => {
    let tree = {}
    const rootEmploy = employees.map(employObj => {
      if (employObj.managerId === undefined) {
        employObj.reports = []
        return employObj
      } 
      else {
        if (empObj.managerId === tree.id) {
          tree.reports.push(empObj)
      }
    })
  
  
  
  
  
  
  
  spacer('generateManagementTree')
  //given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
  console.log(JSON.stringify(generateManagementTree(employees), null, 2));
  /*
  {
    "id": 1,
    "name": "moe",
    "reports": [
      {
        "id": 2,
        "name": "larry",
        "managerId": 1,
        "reports": [
          {
            "id": 4,
            "name": "shep",
            "managerId": 2,
            "reports": [
              {
                "id": 8,
                "name": "shep Jr.",
                "managerId": 4,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "curly",
        "managerId": 1,
        "reports": [
          {
            "id": 5,
            "name": "groucho",
            "managerId": 3,
            "reports": [
              {
                "id": 6,
                "name": "harpo",
                "managerId": 5,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 99,
        "name": "lucy",
        "managerId": 1,
        "reports": []
      }
    ]
  }
  */
  spacer('');
  
// Your code here
function createEmployeeRecord(array) {
  let Obj = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
  return Obj
}

const createEmployeeRecords = (arrays) => {
  return arrays.map(array => createEmployeeRecord(array))
}




const createTimeInEvent = (obj, dateStamp) => {
  const [date, hour] = dateStamp.split(' ')

  let timeInEvent = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  }
  obj.timeInEvents.push(timeInEvent)
  return obj
}


const createTimeOutEvent = (obj, dateStamp) => {
  const [date, hour] = dateStamp.split(' ')

  let timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  }
  obj.timeOutEvents.push(timeOutEvent)
  return obj
}

const hoursWorkedOnDate = (obj, date) => {
  let checkInHour;
  let checkOutHour;
  for (let event in obj.timeInEvents) {
    if (date === obj.timeInEvents[event]["date"]) {
      checkInHour = obj.timeInEvents[event]["hour"]
    }
  } for (let event in obj.timeOutEvents) {
    if (date === obj.timeOutEvents[event]["date"]) {
      checkOutHour = obj.timeOutEvents[event]["hour"]
    }
  } return ((checkOutHour - checkInHour) / 100)
}

const wagesEarnedOnDate = (obj, date) => {

  return hoursWorkedOnDate(obj, date) * obj.payPerHour

}

const allWagesFor = (obj) => {
  let total = []
  for (let event in obj.timeInEvents) {
    total.push(wagesEarnedOnDate(obj, obj.timeInEvents[event]['date']))


  }
  return total.reduce((sum, a) => sum + a, 0)

}

const calculatePayroll = (array) => {
  return array.map(rec => allWagesFor(rec)).reduce((sum, a) => sum + a, 0)
}



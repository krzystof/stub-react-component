export default {
  fetchAll(shouldFail) {
    if (shouldFail) {
      return Promise.reject(new Error('Could not retrieve people.'))
    }
    return Promise.resolve([
      {name: 'Bob'},
      {name: 'Fred'},
      {name: 'Brandon'},
    ])
  },

  getByName(name) {
    const stubs = {
      Bob: {name: 'Bob', bio: 'Coding night and day.'},
      Fred: {name: 'Bob', bio: 'Essential. Friends of all.'},
      Brandon: {name: 'Brandon', bio: 'A modern time adventurer.'},
    }
    if (!stubs[name]) {
      return Promise.reject(new Error(`${name} is not a valid person.`))
    }
    return Promise.resolve(stubs[name])
  },

  getBestFriend(name) {
    const stubs = {
      Bob: {name: 'Martin'},
      Fred: {name: 'Julie'},
      Brandon: {name: 'Kim'},
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!stubs[name]) {
          return reject(new Error(`${name} is not a valid person.`))
        }
        return resolve(stubs[name])
      }, 50)
    })
  }
}

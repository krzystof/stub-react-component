const data = [
  {id: 1, name: 'Broom', description: 'Can be used as a weapon.'},
  {id: 2, name: 'Hoover', description: 'Expensive but handy.'},
  {id: 3, name: 'Dustpan', description: 'Better than with your bare hands.'},
  {id: 4, name: 'Wipes', description: 'Smells soooo good.'},
  {id: 5, name: 'Detergent', description: 'DO. NOT. DRINK.'},
]

const fakeApi = {
  getProducts(page = 1) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (page !== 1) {
          return reject(new Error('Page not found.'))
        }
        return resolve(data.map(({id, name}) => ({id, name})))
      }, 500)
    })
  }

  // createProduct(name, description) {

  // }
}

export default fakeApi

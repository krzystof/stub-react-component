/**

Edit this file with the same shape of data returned by your server.

It is better if the data can be a copy of what is really returned,
and if the result is always the same. It will prove very useful
when running the integration test using the real api.

**/

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
  },

  getProduct(id = null) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id === null) {
          return reject(new Error('Product does not exists.'))
        }
        return resolve(data.find(product => product.id === id))
      }, 500)
    })
  },

  saveProduct(name, description) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || !description) {
          return reject(new Error('The name and description are required'))
        }
        const ids = data.map(({id}) => id)
        const nextId = Math.max(...ids) + 1
        const newProduct = {id: nextId, name, description}
        data.push(newProduct)
        return resolve(newProduct)
      }, 500)
    })
  },
}

export default fakeApi

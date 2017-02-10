
const routes = [
  {
    method: 'post',
    path: '/load',
    handle: require('./controllers/Load')
  },
  {
    method: 'post',
    path: '/active',
    handle: require('./controllers/Active')
  },
  {
    method: 'post',
    path: '/create',
    handle: require('./controllers/Create')
  },
  {
    method: 'post',
    path: '/update',
    handle: require('./controllers/Update')
  },
  {
    method: 'post',
    path: '/delete',
    handle: require('./controllers/Delete')
  }
]

module.exports = routes

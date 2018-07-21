import PropTypes from 'prop-types'

export const ProductListItemType = {
  id: PropTypes.number.isRequired,
  name: PropTypes.number.isRequired,
}

export const AsyncFunctionType = PropTypes.shape({
  when: PropTypes.func.isRequired,
  whenIdle: PropTypes.func.isRequired,
  whenPending: PropTypes.func.isRequired,
  whenOk: PropTypes.func.isRequired,
  whenFailure: PropTypes.func.isRequired,
  toIdle: PropTypes.func.isRequired,
  toPending: PropTypes.func.isRequired,
  toOk: PropTypes.func.isRequired,
  toFailure: PropTypes.func.isRequired,
})

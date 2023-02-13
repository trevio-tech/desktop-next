import { createError } from '#imports'

export default (error) => {
  if (error[0].message !== 'validation') {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
}
/**
 * Returns the element that has the ID attribute with the specified value.
 * @param {string} idName - element ID
 * @returns {object} DOM object associated with id (null if none).
 */
function id (idName) {
  return document.getElementById(idName)
}

/**
 * Removes the hidden class from the element making it visible to the user. If the element
 * already does not have the hidden class method does nothing.
 * @param {object} element DOM object you want the hidden class removed from
 */
function show (element) {
  element.classList.remove('hidden')
}

/**
 * Adds the hidden class from the element making it invisible to the user. If the element
 * already has the hidden class method does nothing.
 * @param {object} element DOM object you want the hidden class added to
 */
function hide (element) {
  element.classList.add('hidden')
}

/**
 * Generates a new document element with the given tagName.
 * @param {string} tagName the name of the tag to create
 * @returns {object} DOM created object with the given tag.
 */
function gen (tagName) {
  return document.createElement(tagName)
}

/**
 * Helper function to return the response's result text if successful, otherwise
 * returns the rejected Promise result with an error status and corresponding text
 * @param {object} response - response to check for success/error
 * @return {object} - valid response if response was successful, otherwise rejected
 *                    Promise result
 */
function checkStatus (response) {
  if (response.ok) {
    return response
  } else {
    throw Error('Error in request: ' + response.statusText)
  }
}

export { id, show, hide, gen, checkStatus }

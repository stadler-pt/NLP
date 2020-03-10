// Import all .js files
import { formHandler, postData, retrieveData } from "./js/formHandler.js"
import { testing } from "./js/testing"

// Import main style file
import './style/style.scss'

// Export js functionality to be used by Webpack
// (don't forget to update javascript functions with the Client object)
export {
    // functions to export
    formHandler,
    postData,
    retrieveData,
    testing
}
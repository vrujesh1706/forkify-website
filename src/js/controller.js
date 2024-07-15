import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeview from './view/recipeview.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import bookmarksView from './view/bookmarksView.js';
// import PaginationView from './view/paginationView.js';
import paginationView from './view/paginationView.js';
import AddRecipeView from './view/addRecipeView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';


// const recipeContainer = document.querySelector('.recipe');
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlrecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeview.renderSpinner();

    // 0. update results view to mark selected search result
    resultView.update(model.getSearchResultsPage());

    //1.updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    //2.loading recipe
    await model.loadrecipe(id);
    // const { recipe } = model.state;

    //3.rendering recipe
    recipeview.render(model.state.recipe);

    // console.log(res, data);
  } catch (err) {
    recipeview.renderError();
    console.error(err);
  }
};
//controlrecipes();
const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    //1. get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2. load search results
    await model.loadSearchResults(query);
    //3. render results
    resultView.render(model.getSearchResultsPage());

    //4. render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    // resultView.renderError();
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1. render new results
  resultView.render(model.getSearchResultsPage(goToPage));

  //2. render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings
  model.updateServings(newServings);
  //update the recipe view
  // recipeview.render(model.state.recipe);
  recipeview.update(model.state.recipe);
  //
};

const controlAddBookmark = function () {
  //1. add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);

  //2. update recipe view
  recipeview.update(model.state.recipe);

  //3.render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show loading spinner
    addRecipeView.renderSpinner();

    //upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render recipe
    recipeview.render(model.state.recipe);

    //SUCCESS MESSAGE
    addRecipeView.renderMessage();

    //render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeview.addHandlerRender(controlrecipes);
  recipeview.addHandlerUpdateServings(controlServings);
  recipeview.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('test');
  
};
init();

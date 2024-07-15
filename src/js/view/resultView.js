import View from './view.js';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg';

class ResulView extends View {
  _parentElement = document.querySelector('.results');

  _errorMessage = 'we could not found your query.please try another one!';

  _message = '';

  // _generateMarkup() {
  //   console.log(this._data);

  //   return this._data.map(this._generateMarkupPreview).join('');
  // }

  // _generateMarkupPreview(result) {
  //   const id = window.location.hash.slice(1);

  //   return `
  //   <li class="preview">
  //           <a class="preview__link ${
  //             result.id === id ? 'preview__link--active' : ''
  //           }" href="#${result.id}"> 
  //             <figure class="preview__fig">
  //               <img src="${result.image}" alt="${result.title}" />
  //             </figure>
  //             <div class="preview__data">
  //               <h4 class="preview__title">${result.title}</h4>
  //               <p class="preview__publisher">${result.publisher}</p>
               
  //             </div>
  //           </a>
  //         </li>
  //   `;
  // }

  _generateMarkup() {
    console.log(this._data);

    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResulView();

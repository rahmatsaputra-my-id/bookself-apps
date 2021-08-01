function _handlerSubmit(updateData) {

   var idValue = +new Date();
   var titleValue = inputBookTitle.value;
   var authorValue = inputBookAuthor.value;
   var yearValue = inputBookYear.value;
   var checkboxValue = checkBox.checked;

   if (this._handlerCheckForStorage()) {
      if(updateData){

         if (!this._handlerGetItem(localStorageKey)) {
   
            const createFirstData = [updateData];
            this._handlerNotifMove(updateData.checkboxValue, updateData.title);
            this._handlerSetItem(localStorageKey, createFirstData);
            window.location.reload();

         } else {
            const oldData = this._handlerParseGetItem(localStorageKey);
            oldData.push(updateData);
            this._handlerNotifMove(updateData.checkboxValue, updateData.title);
            this._handlerSetItem(localStorageKey, oldData);
            window.location.reload();
         }

      } else {
         if (titleValue && authorValue && yearValue) {
   
            var newData = {
               "id": idValue,
               "title": titleValue,
               "author": authorValue,
               "year": yearValue,
               "isComplete": checkboxValue
            }
   
            if (!this._handlerGetItem(localStorageKey)) {
   
               const createFirstData = [newData];
               this._handlerNotifInsert(checkboxValue, titleValue);
               this._handlerSetItem(localStorageKey, createFirstData);
   
            } else {
               const oldData = this._handlerParseGetItem(localStorageKey);
               oldData.push(newData);
               this._handlerNotifInsert(checkboxValue, titleValue);
               this._handlerSetItem(localStorageKey, oldData);
            }
   
            // event.preventDefault();
   
         } else {
            alert("Not Found Data Value");
         }
      }
   } else {
      alert("Browser yang Anda gunakan tidak mendukung Web Storage")
   }
}

function _handlerShowData(data) {

   data.map(items => {
      if (!items.isComplete) {

         let element = `
            <article class="book_item">
               <h3 style="text-align:justify;">${items.title}</h3>
               <p style="text-align:justify;">Penulis: ${items.author}</p>
               <p>Tahun: ${items.year}</p>

               <div class="action" style="margin-top: 30px;">
                     <button class="green" onclick="_handlerMoveToFinishedReading('${items.id}')">
                        <span>Pindah ke rak selesai dibaca</span>
                     </button>
                     <button class="red" onclick="_handlerDeleteData('${items.id}')">
                        <span>Hapus buku</span>
                     </button>
               </div>
            </article>
         `

         notFinishedReadingList.innerHTML += element;
      } else {
         let element = `
            <article class="book_item">
               <h3 style="text-align:justify;">${items.title}</h3>
               <p style="text-align:justify;">Penulis: ${items.author}</p>
               <p>Tahun: ${items.year}</p>

               <div class="action" style="margin-top: 30px;">
                     <button class="green" onclick="_handlerMoveToNotFinishedReading('${items.id}')"> 
                        <span>Pindah ke rak Belum selesai dibaca</span>
                     </button>
                     <button class="red" onclick="_handlerDeleteData('${items.id}')">
                        <span>Hapus buku</span>
                     </button>
               </div>
            </article>
         `
         finishedReadingList.innerHTML += element;
      }
   });
}

function _handlerDeleteData(id) {
   const bookDataDetail = this._handlerParseGetItem(localStorageKey).filter(a => a.id == id);
   const bookData = this._handlerParseGetItem(localStorageKey).filter(a => a.id != id);
   const confirmDelete = confirm(`Anda yakin akan menghapus data buku ${bookDataDetail[0].title} ini ?`);

   if (confirmDelete) {

      this._handlerSetItem(localStorageKey, bookData);
      window.location.reload();
      alert(`Buku ${bookDataDetail[0].title} [BERHASIL DIHAPUS] dari rak ${bookDataDetail[0].isComplete ? "Selesai Dibaca" : "Belum Selesai Dibaca"}`);

   } else {
      return false;
   }
}

function _handlerSearchData(params) {

   searchResult.innerHTML = '';

   params.forEach(items => {

      let element = `
         <article class="book_item">
            <h3>${items.title}</h3>
            <p>Penulis: ${items.author}</p>
            <p>Tahun: ${items.year}</p>
            <p class="ket">Keterangan : <span>${items.isComplete ? 'Selesai dibaca' : 'Belum selesai dibaca'}</span></p>
         </article>
      `
      
      searchResult.innerHTML += element;
   });
}

function _handlerMoveToFinishedReading(id) {
   let confirmationValue = confirm("Pindahkan buku ke rak selesai dibaca ?");

   if (confirmationValue) {
      const bookDataDetail = this._handlerParseGetItem(localStorageKey).filter(a => a.id == id);
      const newBook = {
         id: bookDataDetail[0].id,
         title: bookDataDetail[0].title,
         author: bookDataDetail[0].author,
         year: bookDataDetail[0].year,
         isComplete: true
      }

      const bookData = this._handlerParseGetItem(localStorageKey).filter(a => a.id != id);
      this._handlerSetItem(localStorageKey, bookData);

      this._handlerSubmit(newBook);
   } else {
      return false;
   }
}

function _handlerMoveToNotFinishedReading(id) {
   let confirmationValue = confirm("Pindahkan buku ke rak belum selesai dibaca ?")

   if (confirmationValue) {
      const bookDataDetail = this._handlerParseGetItem(localStorageKey).filter(a => a.id == id);
      const newBook = {
         id: bookDataDetail[0].id,
         title: bookDataDetail[0].title,
         author: bookDataDetail[0].author,
         year: bookDataDetail[0].year,
         isComplete: false
      }

      const bookData = this._handlerParseGetItem(localStorageKey).filter(a => a.id != id);
      this._handlerSetItem(localStorageKey, bookData);

      this._handlerSubmit(newBook);
   } else {
      return false;
   }
}
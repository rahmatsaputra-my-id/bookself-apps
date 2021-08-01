window.addEventListener("load", function () {
   if (this._handlerGetItem(localStorageKey)) {
      _handlerShowData(this._handlerParseGetItem(localStorageKey));
   }
})

bookSubmit.addEventListener("click", () => {
   this._handlerSubmit();
});

checkBox.addEventListener("click", () => {
   this._handlerCheckBox();
});

searchSubmit.addEventListener("click", () =>  {
   event.preventDefault();

   if (!this._handlerGetItem(localStorageKey)) {
      alert("Tidak ada data buku");
      return window.location.reload();
   } else {
      const getByTitle = this._handlerParseGetItem(localStorageKey).filter(a => a.title == searchBookValue.value.trim());

      if (!getByTitle.length) {
         const getByAuthor = this._handlerParseGetItem(localStorageKey).filter(a => a.author == searchBookValue.value.trim());

         if (!getByAuthor.length) {
            const getByYear = this._handlerParseGetItem(localStorageKey).filter(a => a.year == searchBookValue.value.trim());

            if (!getByYear.length) {
               alert(`Data yang anda cari tidak ditemukan`);
               return location.reload();
            } else {
               this._handlerSearchData(getByYear);
            }
         } else {
            this._handlerSearchData(getByAuthor);
         }
      } else {
         this._handlerSearchData(getByTitle);
      }
   }

   searchBookValue.value = '';
});
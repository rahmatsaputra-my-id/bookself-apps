function _handlerCheckForStorage() {

   return typeof (Storage) !== "undefined"

}

function _handlerCreateTextNode(textNodeValue) {

   while (isUnread.firstChild) {
      isUnread.removeChild(isUnread.firstChild);
   }

   const resultTextNode = isUnread.appendChild(document.createTextNode(textNodeValue));

   return resultTextNode;
}

function _handlerCheckBox() {

   if (checkBox.checked) {

      const textNodeValue = "Selesai dibaca";
      this._handlerCreateTextNode(textNodeValue);

   } else {

      const textNodeValue = "Belum selesai Dibaca";
      this._handlerCreateTextNode(textNodeValue);

   }
}

function _handlerNotifInsert(checkboxValue, title) {

   const notifMessage =
      checkboxValue ?
         `Buku ${title} [BERHASIL DITAMBAHKAN] ke rak selesai dibaca` :
         `Buku ${title} [BERHASIL DITAMBAHKAN] ke rak belum selesai dibaca`;

   const popUpMessage = alert(notifMessage);

   return popUpMessage
}

function _handlerNotifMove(checkboxValue, title) {

   const notifMessage =
      checkboxValue ?
         `Buku ${title} [BERHASIL DIPINDAHKAN] ke rak selesai dibaca` :
         `Buku ${title} [BERHASIL DIPINDAHKAN] ke rak belum selesai dibaca`;

   const popUpMessage = alert(notifMessage);

   return popUpMessage
}

function _handlerSetItem(key, params) {

   const resultSetItem = localStorage.setItem(key, JSON.stringify(params)) || [];

   return resultSetItem;
}

function _handlerGetItem(key) {

   const resultGetItem = localStorage.getItem(key) || [];

   return resultGetItem;
}

function _handlerParseGetItem(params) {

   const resultParseGetItem = JSON.parse(localStorage.getItem(params)) || [];

   return resultParseGetItem;
}


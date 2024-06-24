
let dataBase = [] //массив отправки данных в 1с
let buttonSendTime = document.querySelector('.time_button')
let carouselBox = document.querySelector('.carousel_box')
let listGalleryBox = document.querySelector('.gallery_list_box')
let listGallery = document.querySelector('.gallery_list')
let tablePane = document.querySelector('.table_pane')
let tableContainer = document.querySelector('.table_container')
let blockChecked = document.querySelector('.block_checked')
let selectionChoose = 0 // для сортировки,включена или нет
let htmlBox = ''
let checkBox = 0
let allButtonsIn = []
let checkBoxAll = 0
let checkBoxItemSkusSerial = []
let allSkusSerialItem = []
let checkBoxItem = 0
let countButtonSkusSerial = false
let buttonPrevSkusSerial = ''
let countButton = false
let buttonPrev = ''
let buttonActiveBoxserial = ''
let GlobalTimer;
let allDataAboutOperations = new Map();
let localData = {}
let microPartions_global = new Map();
let connetcClient = false
let buttonListOrDocument = false
let position = 0;
let boxesObject = new Object()
// const client = Stomp.client('ws://localhost:15674/ws');
// const on_connect = function () {
//     connetcClient = true
//     console.log('Connected to WS');
// };
// const on_error = function () {
//     connetcClient = false
//     console.log('error');
// };
// client.connect('rmuser', 'rmpassword', on_connect, on_error, '/');

//БДА 2023-11-06 Массив, который отсылается в мидлэнд со всеми нажатиями

const executors = new Map();
executors.set("24ae3488-6419-11ee-8c48-00505681f37b", "БТМК");
executors.set("f5857713-2171-11ee-8c43-00505681f37b", "Жильцова Анастасия Сергеевна");
executors.set("24608102-ec2f-11ee-8c53-00505681f37b", "Гончарова Лидия Ивановна");
executors.set("d223a1f4-2172-11ee-8c43-00505681f37b", "Чувилина Екатерина Вадимовна");
executors.set("366f9139-2172-11ee-8c43-00505681f37b", "Матвеев Иван Александрович");
executors.set("db9d3bf2-2171-11ee-8c43-00505681f37b", "Григорьев Сергей Васильевич");
executors.set("39d903a2-2172-11ee-8c43-00505681f37b", "Петрухин Иван Юрьевич");
executors.set("4e4f31ee-2172-11ee-8c43-00505681f37b", "Семешкина Дианна Васильевна");
executors.set("e96b00d6-2171-11ee-8c43-00505681f37b", "Дашкова Алёна Владимировна");
executors.set("fd2caab6-2171-11ee-8c43-00505681f37b", "Зубков Дмитрий Владимирович");
executors.set("172603d5-085a-11ef-8c55-00505681f37b", "Рябков Михаил Юрьевич");
executors.set("804092a0-ec2f-11ee-8c53-00505681f37b", "Новикова Алина Анатольевна");
executors.set("55ee0682-2172-11ee-8c43-00505681f37b", "Фрекауцан Олеся Анатольевна");
executors.set("1d09989d-a9dc-11ec-8c0f-00505681efea", "Кривошеев Юрий Борисович");
executors.set("170996f8-a9dc-11ec-8c0f-00505681efea", "Бубынин Александр Александрович");
executors.set("1d09989f-a9dc-11ec-8c0f-00505681efea", "Москвичев Михаил Николаевич");
executors.set("71690b93-c863-11ed-8c3b-00505681f37b", "Копцов Александр Сергеевич");

class TimerManeger {
    constructor(allSkuSerialsArray) {
        this.allTimers = allSkuSerialsArray;
    }

    // startOrStop - булево
    changeTimerState(skuserial, operationNumber, startOrStop, length) {
        if (this.allTimers.get(skuserial).has(operationNumber)) {
            if (startOrStop) {
                this.allTimers.get(skuserial).get(operationNumber).start();
            } else {
                this.allTimers.get(skuserial).get(operationNumber).stop(length);
            }
        } else {
            this.allTimers.get(skuserial).set(operationNumber, new BtmcTimer());
            this.allTimers.get(skuserial).get(operationNumber).start();
        }
    }
}

class BtmcTimer {
    constructor(durationFrom1c = 0) {
        this.operationalDuration = durationFrom1c;
        this.isRunning = false;
        this.startTime = 0;
        this.overallTime = 0;
    }

    _getTimeElapsedSinceLastStart() {
        if (!this.startTime) {
            return 0;
        }
        return Date.now() - this.startTime;
    }

    start() {
        if (this.isRunning) {
            return console.error('Таймер уже запущен');
        }

        this.isRunning = true;

        this.startTime = Date.now();
    }

    stop(length) {
        if (!this.isRunning) {
            return console.error('Таймер уже остановлен');
        }

        this.isRunning = false;
        let tem_time = this._getTimeElapsedSinceLastStart();
        this.overallTime = this.overallTime + Math.round((tem_time / length) / 1000);

    }

    reset() {
        this.overallTime = 0;

        if (this.isRunning) {
            this.startTime = Date.now();
            return;
        }

        this.startTime = 0;
    }

    getTime() {
        if (!this.startTime) {
            return 0;
        }

        if (this.isRunning) {
            return this.overallTime + this._getTimeElapsedSinceLastStart() + this.operationalDuration;
        }

        return this.overallTime + this.operationalDuration;

    }
}

const IS_PRODUCTION = false
let mainUrl = ""
let mainUrlNewBoxSerial = ""
let mainUrlDeleteBoxSerial = ""
let micropartionsUrl = ""
let microPartionsSaveAllUrl = ""
let micropartionResizeUrl = ""

if (!IS_PRODUCTION) {
    mainUrl = "http://localhost:5103/api/"
    mainUrlNewBoxSerial = "http://localhost:5103/api/addwctosuplst"
    mainUrlDeleteBoxSerial = "http://localhost:5103/api/deletewcfromsuplst"

    micropartionsUrl = "http://localhost:5167/micro_recieve"
    microPartionsSaveAllUrl = "http://localhost:5167/micro_save"
    micropartionResizeUrl = "http://localhost:5167/micro_change"
} else {
    mainUrl = "https://172.16.0.99:444/api/"
    mainUrlNewBoxSerial = "https://172.16.0.99:444/api/addwctosuplst"
    mainUrlDeleteBoxSerial = "https://172.16.0.99:444/api/deletewcfromsuplst"

    micropartionsUrl = "https://172.16.0.99:445/micro_recieve"
    microPartionsSaveAllUrl = "https://172.16.0.99:445/micro_save"
    micropartionResizeUrl = "https://172.16.0.99:445/micro_change"
}


//вывод имени пользователя
const handlerGuidName = () => {
    let guidName = ''
    localData.OperationsLists.find(itemGuid => {
        const name_to_show = "";
        if (executors.has(itemGuid.WcGuid)) {
            guidName = executors.get(itemGuid.WcGuid);
        } else {
            guidName = itemGuid.WcGuid;
        }
    })
    let htmlGuid = (`<p class="mt-3">${guidName}</p>`)
    document.querySelector('.guid-name').insertAdjacentHTML('afterend', htmlGuid)
}
// рисует кнопки вперед назад и саму карусель
const slideCarouselBox = () => {
    let i = 1;
    for (let li of document.querySelectorAll('.htm_box')) {
        li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
        i++;
    }

    /* конфигурация */
    let width = 180; // ширина картинки 146
    let count = 1; // видимое количество изображений

    // let list = document.querySelector('.gallery_list_box');
    let listElems = document.querySelectorAll('.htm_box');

    // let position = 0; // положение ленты прокрутки

    document.querySelector('.prev_box').onclick = function () {
        // сдвиг влево
        position += width * count;
        // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
        position = Math.min(position, 0)
        // position = Math.max(position, -width * (listElems.length - count));

        listGalleryBox.style.marginLeft = position + 'px';
    };

    document.querySelector('.next_box').onclick = function () {
        // сдвиг вправо
        position -= width * count;
        // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
        position = Math.min(position, 0)
        // position = Math.max(position, +width * (listElems.length - count));
        listGalleryBox.style.marginLeft = position + 'px';
    }
}
//функция удаляет елементы
const deleteElems = (elems) => {
    for (let elem of elems) {
        elem.remove()
    }
}

//функция удаляет классы
const deleteClassList = (elem, classElem) => {
    elem.classList.remove(classElem)
}

//функция добавляет классы
const addClassList = (elem, classElem) => {
    elem.classList.add(classElem)
}

//функция добавляет классы всем
const addClassListAll = (elems, classElem) => {
    for (let elem of elems) {
        elem.classList.add(classElem)
    }
}

//функция удаляет классы всем
const deleteClassListAll = (elems, classElem) => {
    for (let elem of elems) {
        elem.classList.remove(classElem)
    }
}

//проверяет было ли ранее загружен вывод серий
const handlerControlLoadingSkusSerial = () => {
    checkBoxAll = 0
    checkBoxItem = 0
    checkBoxItemSkusSerial = []
    allSkusSerialItem = []
    if (listGallery.classList.contains('gallery_opacity')) {
        deleteClassList(listGallery, 'gallery_opacity') //проверяем было ли выбрано все серии
    }
    if (listGallery.classList.contains('hidden')) {
        deleteClassList(listGallery, 'hidden') //удаляем при первой загрузки серий класс невидимости чтобы было видно серии
    }
    if (listGallery.classList.contains('load')) {//проверка были ли уже выведены кнопки с сериями,если да то удаляем старые и рисуем новые
        deleteElems(document.querySelectorAll('.liButton'))
        addClassList(tablePane, 'hidden')//прячем таблицу(шапку)
        deleteElems(document.querySelectorAll('.control_table'))
        deleteElems(document.querySelectorAll('.checkButton1'))
    }
}

//функция скрывает ненужные кнопки при загрузки
const handlerButtonHidden = (allButtons) => {
    allButtons.find(itemId => {
        if (document.getElementById(itemId.itemStatusId).textContent.toLowerCase() == 'сформировано') {
            addClassList(document.getElementById(itemId.itemButtonPause), 'hidden')
            addClassList(document.getElementById(itemId.itemButtonFinish), 'hidden')
            addClassList(document.getElementById(itemId.itemButtonDefect), 'hidden')
        }
        if (document.getElementById(itemId.itemStatusId).textContent.toLowerCase() == 'начато') {
            addClassList(document.getElementById(itemId.itemButtonBegin), 'hidden')
        }
        if (document.getElementById(itemId.itemStatusId).textContent.toLowerCase() == 'пауза') {
            document.getElementById(itemId.itemButtonPause).textContent = ('Продолжить')
            document.getElementById(itemId.itemButtonPause).style.opacity = '0.6'
            addClassList(document.getElementById(itemId.itemButtonBegin), 'hidden')
            addClassList(document.getElementById(itemId.itemButtonFinish), 'hidden')
            addClassList(document.getElementById(itemId.itemButtonDefect), 'hidden')
        }
        if (document.getElementById(itemId.itemStatusId).textContent.toLowerCase() == 'закончено') {
            deleteClassList(document.getElementById(itemId.itemButtonBegin), 'hidden')
            addClassList(document.getElementById(itemId.itemButtonFinish), 'hidden')
            addClassList(document.getElementById(itemId.itemButtonPause), 'hidden')
            addClassList(document.getElementById(itemId.itemButtonDefect), 'hidden')
        }
    })
}

//функция скрывает ненужные кнопки и показывает нужные при клике на кнопки
const handlerSearchButtons = (InOperationNumber, SkusSerial, OperationNumber) => {
    if (document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent.toLowerCase() == 'начато') {
        addClassList(document.getElementById(`${InOperationNumber}begin${SkusSerial}`), 'hidden')
        deleteClassList(document.getElementById(`${InOperationNumber}finish${SkusSerial}`), 'hidden')
        deleteClassList(document.getElementById(`${InOperationNumber}pause${SkusSerial}`), 'hidden')
        deleteClassList(document.getElementById(`${InOperationNumber}defect${SkusSerial}`), 'hidden')
    }
    if (document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent.toLowerCase() == 'пауза') {
        document.getElementById(`${InOperationNumber}pause${SkusSerial}`).textContent = ('Продолжить')
        document.getElementById(`${InOperationNumber}pause${SkusSerial}`).style.opacity = '0.6'
        addClassList(document.getElementById(`${InOperationNumber}begin${SkusSerial}`), 'hidden')
        addClassList(document.getElementById(`${InOperationNumber}finish${SkusSerial}`), 'hidden')
        addClassList(document.getElementById(`${InOperationNumber}defect${SkusSerial}`), 'hidden')

    }
    if (document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent.toLowerCase() == 'закончено') {
        deleteClassList(document.getElementById(`${InOperationNumber}begin${SkusSerial}`), 'hidden')
        addClassList(document.getElementById(`${InOperationNumber}finish${SkusSerial}`), 'hidden')
        addClassList(document.getElementById(`${InOperationNumber}pause${SkusSerial}`), 'hidden')
        addClassList(document.getElementById(`${InOperationNumber}defect${SkusSerial}`), 'hidden')
    }
}

//функция рисует спинер загрузки

const htmlSpiner = () => {
    let htmlSpiner = (`<div class="text-center spinerLoading">
<button class="btn btn-primary " type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Загрузка...
</button>
</div>`)
    document.querySelector('.gallery_box').insertAdjacentHTML('afterbegin', htmlSpiner)
}

//функция удаляет спинер загрузки
const handlerDeleteSpiner = () => {
    if (document.querySelector('.spinerLoading')) {
        deleteElems(document.querySelectorAll('.spinerLoading'))
    }
}

//функция рисует модальное окно добавления новой бокссерии
const htmlModalGetList = () => {
    let htmlModalGetList = (`
<div class="modal-wrap">
  <div class="modal-win" >
      <div class="modal-dialog">
        <h2 class="text-center mb-1">Поиск листа</h2>
      </div>
      <div class="m-4"> 
      <input type="text" id="inputGetNewBoxserial" class="inputGetList" placeholder="Поиск листа...">
      </div>
      <div class="text-end " >
        <button type="button" class="btn btn-secondary " onclick="handlerGetNewBoxserial(document.getElementById('inputGetNewBoxserial').value),deleteElems(document.querySelectorAll('.modal-wrap'))">Найти</button>
        <button type="button" class="btn btn-secondary " onclick="deleteElems(document.querySelectorAll('.modal-wrap'))">Закрыть</button>
      </div>
  </div>
</div>
    `)
    document.body.insertAdjacentHTML('afterbegin', htmlModalGetList)
}

//модальное окно ошибки запроса новой бокссерии
const htmlModalErrorNewBoxSerial = () => {
    let htmlModalError = (`
<div class="modal-wrap">
  <div class="modal-win" >
      <div class="modal-dialog">
        <h2 class="text-center mb-1">Ошибка</h2>
      </div>
      <div class="m-4">
        <p>Данного листа нету</p>
     
      </div>
      <div class="text-end " >
        <button type="button" class="btn btn-secondary " onclick="deleteElems(document.querySelectorAll('.modal-wrap'))">Закрыть</button>
      </div>
  </div>
</div>
    `)
    document.body.insertAdjacentHTML('afterbegin', htmlModalError)
}

// модальное окно удаления имеющийся бокссерии
const htmlModalDeleteList = () => {
    if (buttonActiveBoxserial != '') {
        let htmlModalDeleteList = (`
        <div class="modal-wrap">
  <div class="modal-win" >
      <div class="modal-dialog">
        <h2 class="text-center mb-1">Вы действительно хотите удалить себя как исполнителя из данного сопроводительного листа</h2>
      </div>
      <div class="m-4"> 
      <h3>${buttonActiveBoxserial}</h3>
      </div>
      <div class="text-end " >
        <button type="button" class="btn btn-secondary " onclick="handlerDeleteBoxserialLocalData(buttonActiveBoxserial),deleteElems(document.querySelectorAll('.modal-wrap'))">Да</button>
        <button type="button" class="btn btn-secondary " onclick="deleteElems(document.querySelectorAll('.modal-wrap'))">Закрыть</button>
      </div>
  </div>
</div>`)
        document.body.insertAdjacentHTML('afterbegin', htmlModalDeleteList)
    }

}

//функция удаления выбранной серии
const handlerDeleteBoxserialLocalData = (buttonActive) => {
    deleteElems(document.querySelectorAll('.html_box'))
    htmlSpiner()
    let newObjectBoxserial = new Object()
    newObjectBoxserial.wcguid = localData.OperationsLists[0].WcGuid
    newObjectBoxserial.boxserial = buttonActive
    for (let i = 0; i < localData.OperationsLists[0].Boxes.length; i++) {
        if (localData.OperationsLists[0].Boxes[i].BoxSerial === buttonActive) {
            localData.OperationsLists[0].Boxes.splice(i, 1)
        }
    }
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let jsonBoxSerial = JSON.stringify(newObjectBoxserial)
    let requestOptionsDeleteBoxserial = {
        method: 'POST',
        headers: myHeaders,
        body: jsonBoxSerial,
        redirect: 'follow'
    };
    fetch(mainUrlDeleteBoxSerial, requestOptionsDeleteBoxserial)
    handlerControlLoadingSkusSerial()
    handlerBoxSerial()
}


//модальное окно фильтра
const handlerModalFilter = () => {
    let htmlModalFilter = (`
<div class="modal-wrap">
  <div class="modal-win" >
      <div class="modal-dialog">
        <h2 class="text-center mb-1"></h2>
      </div>
      <div class="m-4">
       <select class="form-select select_option form-select-sm" aria-label="Пример выбора по умолчанию"
                                            id="selectedChoose">
                                            <option value="0" selected="selected">Откройте меню выбора</option>
                                            <option value="1">Все</option>
                                            <option value="2">Пауза</option>
                                            <option value="3">Начато</option>
                                        </select>
      </div>
      <div class="text-end m-3" >
        <button type="button" class="btn btn-secondary " onclick="deleteElems(document.querySelectorAll('.modal-wrap'))">Закрыть</button>
      </div>
  </div>
</div>
    `)
    document.body.insertAdjacentHTML('afterbegin', htmlModalFilter)
    //отслеживает есть ли сортировка
    document.querySelector('#selectedChoose').addEventListener('change', function (e) {
        selectionChoose = e.target.value
        handlerControlLoadingSkusSerial()
        deleteElems(document.querySelectorAll('.html_box')) //нельзя вынести переменную
        handlerBoxSerial()//запускаем заново отрисовку в соответствии с параметрами сортировки
    })
}

//модальное окно с ошибкой
const htmlModalWindow = (headText, text, serialControl) => {
    let htmlModal = (`
<div class="modal-wrap">
  <div class="modal-win" >
      <div class="modal-dialog">
        <h2 class="text-center mb-1">${headText}</h2>
      </div>
      <div class="">
        <p>${text}</p>
        <p>${serialControl}</p>
      </div>
      <div class="text-end " >
        <button type="button" class="btn btn-secondary " onclick="deleteElems(document.querySelectorAll('.modal-wrap'))">Закрыть</button>
      </div>
  </div>
</div>
    `)
    document.body.insertAdjacentHTML('afterbegin', htmlModal)
}

//функция показывает модальное окно предупрежденя брака
const htmlModalWindowDefect = (BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber, Status) => {
    let htmlModalDefect = (`
<div class="modal-wrap">
  <div class="modal-win" >
      <div class="modal-dialog">
        <h2 class="text-center mb-1">Предупреждение</h2>
      </div>
      <div class="">
        <p>Вы уверены, что данная операция не соответствует технологическому процессу</p>
      </div>
      <div class="text-end " >
        <button type="button" class="btn btn-secondary " onclick="deleteElems(document.querySelectorAll('.modal-wrap'))">Нет</button>
        <button type="button" class="btn btn-secondary " onclick="microPartionChecker('${BoxSerial}','${InOperationNumber}', '${SkusSerial}', '${OperationNumber}', '${textStatus}', '${WcGuid}', Number('${num}')),deleteElems(document.querySelectorAll('.modal-wrap'))">Да</button>
      </div>
  </div>
</div>
    `)
    document.body.insertAdjacentHTML('afterbegin', htmlModalDefect)
}

// функция передает данные запуска времени
const handlerControlMapTimeAndButton = (BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber, length) => {
    if (num === 1) {
        document.getElementById(`${InOperationNumber}status${SkusSerial}`).innerHTML = ('Начато')
        handlerSearchTimerMap(SkusSerial, BoxSerial, InOperationNumber, OperationNumber, checkBoxItemSkusSerial, true, length)
        handlerSearchButtons(InOperationNumber, SkusSerial, OperationNumber)

    }
    if (num === 2) {
        document.getElementById(`${InOperationNumber}pause${SkusSerial}`).textContent = ('Продолжить')
        document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Пауза')
        handlerSearchTimerMap(SkusSerial, BoxSerial, InOperationNumber, OperationNumber, checkBoxItemSkusSerial, false, length)
        handlerSearchButtons(InOperationNumber, SkusSerial, OperationNumber)
        let some = GlobalTimer.allTimers.get(SkusSerial).get(Number(OperationNumber)).getTime();
        // console.log(Math.round(some / 1000));
        // console.log(num, 'pause')
    }
    if (num === 1985) {

        document.getElementById(`${InOperationNumber}pause${SkusSerial}`).textContent = ('Пауза')
        document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Начато')
        handlerSearchTimerMap(SkusSerial, BoxSerial, InOperationNumber, OperationNumber, checkBoxItemSkusSerial, true, length)
        handlerSearchButtons(InOperationNumber, SkusSerial, OperationNumber)
        console.log(num, 'prodol')
    }

    if (num === 3) {
        document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Закончено')
        handlerSearchTimerMap(SkusSerial, BoxSerial, InOperationNumber, OperationNumber, checkBoxItemSkusSerial, false, length)
        console.log(GlobalTimer.allTimers.get(SkusSerial).get(Number(OperationNumber)).getTime() / 1000)
        handlerSearchButtons(InOperationNumber, SkusSerial, OperationNumber)
    }
    if (num === 0) {

        handlerSearchTimerMap(SkusSerial, BoxSerial, InOperationNumber, OperationNumber, checkBoxItemSkusSerial, false, length)
    }
}

// данная функция нужна для работы коректной проверки контроля статуса
const handlerControlStatus = (BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber, Status) => {
    let errorsControl = []
    let headText = "Ошибка в статусах"
    let textControl = "У изделий в операциях разный статус"
    let controlStatus = 0
    localData.OperationsLists.find(itemBox => {
        itemBox.Boxes.find(itemBoxSerial => {
            if (itemBoxSerial.BoxSerial === BoxSerial) {
                itemBoxSerial.Skus.find(itemSkusSerial => {
                    checkBoxItemSkusSerial.find(itemAllSkusSerialItem => {
                        if (itemSkusSerial.SkusSerial == itemAllSkusSerialItem.SkusSerial) {
                            itemSkusSerial.Operations.find(itemNumOperationsStatus => {
                                if (itemNumOperationsStatus.OperationNumber == parseInt(InOperationNumber)) { //
                                    if (itemNumOperationsStatus.Status.toLowerCase() != Status.toLowerCase()) {
                                        controlStatus++
                                        errorsControl.push(itemSkusSerial.SkusSerial)
                                        if (checkBoxAll === 1) {
                                            document.getElementById('checkButton1').textContent = ('Отметить все')
                                            deleteClassList(listGallery, 'gallery_opacity')
                                            deleteClassListAll(document.querySelectorAll('.btnSkusSerialIn'), 'btnSkusSerialInCheckAll')
                                            deleteClassListAll(document.querySelectorAll('.checkButtonInput '), 'switch-on')
                                            checkBoxAll = 0
                                            checkBoxItemSkusSerial = []
                                        } else if (checkBoxItem > 0) {
                                            checkBoxItem = checkBoxItem - 1
                                            deleteClassList(document.getElementById(`${itemSkusSerial.SkusSerial}flexCheckDefault`), 'switch-on')
                                            deleteClassList(document.getElementById(`${itemSkusSerial.SkusSerial}`), 'btnSkusSerialInCheckAll')
                                            checkBoxItemSkusSerial = checkBoxItemSkusSerial.filter(item => (item.SkusSerial !== itemSkusSerial.SkusSerial))
                                            console.log(998)
                                        }
                                    }
                                }
                            })
                        }
                    })
                })
            }
        })
    })
    if (controlStatus > 0) {
        htmlModalWindow(headText, textControl, errorsControl.join(' ,'))
        controlStatus = 0
        errorsControl = []
    } else {
        microPartionChecker(BoxSerial, InOperationNumber, SkusSerial, OperationNumber, textStatus, WcGuid, num)
    }
}

//Удаляет данные с браком в LocalData
function handlerDeleteLocalDataDefect(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber) {
    localData.OperationsLists.find(itemBox => {
        itemBox.Boxes.find(itemBoxSerial => {
            if (itemBoxSerial.BoxSerial == BoxSerial) {
                itemBoxSerial.Skus.find(itemSkusSerial => {
                    if (itemSkusSerial.SkusSerial == SkusSerial) {
                        itemSkusSerial.Operations.find(itemSkusSerialIn => {
                            if (itemSkusSerialIn.OperationNumber == parseInt(InOperationNumber)) {
                                deleteElems(document.querySelectorAll('.control_table'))
                                document.getElementById(`${itemSkusSerial.SkusSerial}liButton`).remove()
                                let data = new Date()
                                let dataBaseAll = new Object()
                                dataBaseAll.WcGuid = WcGuid
                                dataBaseAll.SkusSerial = itemSkusSerial.SkusSerial
                                dataBaseAll.BoxSerial = BoxSerial
                                dataBaseAll.Operation = itemSkusSerialIn.Operation
                                dataBaseAll.ActionNumber = parseInt(num)
                                dataBaseAll.OperationNumber = parseInt(itemSkusSerialIn.OperationNumber)
                                dataBaseAll.CheckBox = checkBox
                                dataBaseAll.DateNow = data.toISOString()
                                dataBaseAll.OperationalDuration = GlobalTimer.allTimers.get(itemSkusSerial.SkusSerial).get(Number(itemSkusSerialIn.OperationNumber)).getTime()
                                dataBase.push(dataBaseAll)
                                itemSkusSerial.SkusSerial = 'Несоответствие'
                            }
                        })
                    }
                })
            }
        })
    })
}


//функция запускает и останавливает время у соответсвующих изделий
const handlerSearchTimerMap = (SkusSerial, BoxSerial, InOperationNumber, OperationNumber, aryName, startOrStop, length) => {
    localData.OperationsLists.find(itemBox => {
        itemBox.Boxes.find(itemBoxSerial => {
            if (itemBoxSerial.BoxSerial === BoxSerial) {
                itemBoxSerial.Skus.find(itemSkusSerial => {
                    aryName.find(itemAllSkusSerialItem => {
                        if (itemAllSkusSerialItem.SkusSerial == itemSkusSerial.SkusSerial) {
                            itemSkusSerial.Operations.find(itemNumOperationsStatus => {
                                if (itemNumOperationsStatus.OperationNumber == parseInt(InOperationNumber)) {//
                                    GlobalTimer.changeTimerState(itemAllSkusSerialItem.SkusSerial, Number(itemNumOperationsStatus.OperationNumber), startOrStop, length)
                                }
                            })
                        }
                    })
                })
            }
        })

    })
}

// //функция  останавливает время у изделий с браком,но ей мы не пользуемся пока
// const handlerSearchTimerMapOneDefect = (SkusSerial, BoxSerial, InOperationNumber, OperationNumber, startOrStop, length) => {
//     localData.OperationsLists.find(itemBox => {
//         itemBox.Boxes.find(itemBoxSerial => {
//             if (itemBoxSerial.BoxSerial === BoxSerial) {
//                 itemBoxSerial.Skus.find(itemSkusSerial => {
//                     if (itemSkusSerial.SkusSerial == SkusSerial) {
//                         itemSkusSerial.Operations.find(itemNumOperationsStatus => {
//                             if (itemNumOperationsStatus.OperationNumber == parseInt(InOperationNumber)) {
//                                 GlobalTimer.changeTimerState(itemSkusSerial.SkusSerial, Number(itemNumOperationsStatus.OperationNumber), startOrStop, length)
//                                 console.log(GlobalTimer.allTimers.get(SkusSerial).get(Number(OperationNumber)).getTime() / 1000)
//                             }
//                         })
//                     }
//                 })
//             }
//         })
//
//     })
// }

//создаем кнопки серий
const htmlButtonSkusSerial = (itemSkusSerial, itemBoxSerial, itemSkusFriendlyName) => {
    let htmlButton = (`<li  class="liButton "  id ="${itemSkusSerial}liButton">
                        <div class="container_button_serial">
                        <button class="btn  m-1 btn-sm align-content-center btnIn btnSkusSerialIn" id ='${itemSkusSerial}' onclick="handlerShowTable('${itemBoxSerial}','${itemSkusSerial}'),handlerButtonSkusSerialStyle('${itemSkusSerial}')">${itemSkusFriendlyName}<br>${itemSkusSerial}</button>
                        <div class="d-flex flex-grow-1 justify-content-end" >
                        <div class="switch-btn checkButtonInput align-self-center  ${itemSkusSerial}" type="button"  id="${itemSkusSerial}flexCheckDefault" onclick="handlerInputCheck('${itemSkusSerial}')">
                        </div></div></li>`)
    listGallery.insertAdjacentHTML('afterbegin', htmlButton)
    addClassList(listGallery, 'load')
}

//создаем боксы
const htmlBoxSerial = (itemBoxSerial, itemWcGuid, itemClientOrder) => {
    htmlBox = (`<li id='' class="html_box">
                <button class=" btn btn_carousel btnIn btnSBoxSerial" id ='${itemBoxSerial}' onclick="handlerBoxSkusSerial('${itemBoxSerial}')"><span class="clientOrder ">${itemClientOrder}</span><p class="boxSerialNumber m-0 p-0">${itemBoxSerial}</p></button>
                </li>`)
    listGalleryBox.insertAdjacentHTML('afterbegin', htmlBox)
    if (!buttonListOrDocument) {
        addClassListAll(document.querySelectorAll('.boxSerialNumber'), 'hidden')
    } else {
        addClassListAll(document.querySelectorAll('.clientOrder'), 'hidden')
    }
}
// функция переводит микропартию в объект json
const createJsonForBackend = (micropartions) => {
    let raw_for_json = [];
    micropartions.forEach(function (value, key, map) {
        // key - это micropartion_guid
        let object = new Object();
        object['MicropartionGuid'] = key;
        object['Box'] = new Object();
        // key - это box_serial
        // этим булевом управляем установкой даты, если ложь - value_2 - это дата, иначе это бокссериал
        dateCheckerForJsonCreation = false;
        value.forEach(function (value_2, key_2, map_2) {
            if (!dateCheckerForJsonCreation) {
                object['Box']['OperationDate'] = value_2;
                dateCheckerForJsonCreation = true;
            } else {
                object['Box']['BoxSerial'] = key_2;
                object['Box']['Skus'] = [];

                // key - это sku_serial
                value_2.forEach(function (value_3, key_3, map_3) {
                    let temp_obj = new Object();
                    temp_obj['SkuSerial'] = key_3;
                    // key - это operation_guid value - это номер операции
                    value_3.forEach(function (value_4, key_4, map_4) {
                        let fin_temp_obj = new Object();
                        fin_temp_obj['OperationGuid'] = key_4;
                        fin_temp_obj['OperationNumber'] = value_4;
                        temp_obj['PartionOperations'] = fin_temp_obj;
                    })
                    object['Box']['Skus'].push(temp_obj);
                })
            }

        })

        raw_for_json.push(object)
    })
    const mapToJson = JSON.stringify(raw_for_json);
    return mapToJson;

}

// функция переводит микропартию из json
const createParseJsonForFront = (micropartions) => {
    for (let key in micropartions) {
        let dateNow = 'operation_date'
        let micropartionsGuid = key
        let micropartionsBox = micropartions[key].BoxSerial
        microPartions_global.set(key, new Map())
        microPartions_global.get(key).set(dateNow, micropartions[key].OperationDate)
        microPartions_global.get(key).set(micropartions[key].BoxSerial, new Map());
        micropartions[key].Skus.forEach(itemSkus => {
            microPartions_global.get(key).get(micropartions[key].BoxSerial).set(itemSkus.SkusSerial, new Map());
            itemSkus.PartionOperations.forEach(itemOperatios => {
                microPartions_global.get(key).get(micropartions[key].BoxSerial).get(itemSkus.SkusSerial,).set(itemOperatios.OperationGuid, itemOperatios.OpertionNumber);
            })
        })

    }
    // console.log(microPartions_global)
}

//функция отправки нового листа для добавления в данные
function handlerGetNewBoxserial(newBoxSerial) {
    deleteElems(document.querySelectorAll('.html_box'))
    htmlSpiner()
    let newBoxSerialObject = new Object()
    newBoxSerialObject.boxserial = newBoxSerial
    localData.OperationsLists.find(itemGuid => {
        newBoxSerialObject.wcguid = itemGuid.WcGuid
    })
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let jsonBoxSerial = JSON.stringify(newBoxSerialObject)
    let requestOptionsNewBoxserial = {
        method: 'POST',
        headers: myHeaders,
        body: jsonBoxSerial,
        redirect: 'follow'
    };
    fetch(mainUrlNewBoxSerial, requestOptionsNewBoxserial)
        .then(function (response) {
            if (response.ok) {
                response = response.json()
                    .then(function (result) {
                        result.OperationsLists.find(itemBoxResult => {
                            localData.OperationsLists.find(itemBox => {
                                itemBox.Boxes.push(itemBoxResult.Boxes[0])
                            })
                        })
                        handlerSortOperationNumber()
                        handlerControlLoadingSkusSerial()
                        handlerBoxSerial()
                    })
            } else {
                htmlModalErrorNewBoxSerial()
                handlerControlLoadingSkusSerial()
                handlerBoxSerial()
            }
        })
        // .then(function (result){
        //
        // })
        .catch(error => {
            htmlModalErrorNewBoxSerial()
            handlerControlLoadingSkusSerial()
            handlerBoxSerial()
        })

}

// функция поиска нужной боксерии через инпут
function handlerSearchDocumentBox() {
    let searchBox
    let nameTag
    let i
    let txtValue;
    let input = document.getElementById('inputBoxserial');
    let filter = input.value.toLowerCase();
    let ul = document.querySelector(".gallery_list_box");
    let li = ul.getElementsByTagName('li');
    if (buttonListOrDocument) {
        nameTag = 'p'
    } else {
        nameTag = 'span'
    }

    for (i = 0; i < li.length; i++) {
        searchBox = li[i].getElementsByTagName(nameTag)[0];
        txtValue = searchBox.textContent || searchBox.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            position = 0
            listGalleryBox.style.marginLeft = position + 'px';
        } else {
            li[i].style.display = "none"
            position = 0
        }
    }
}

//функция выбора показа договора или листа
function handlerTextButoonBoxSerial() {
    if (document.querySelector('.btnUpList').textContent === 'Договор') {
        document.querySelector('.btnUpList').textContent = 'Лист'
        deleteClassListAll(document.querySelectorAll('.boxSerialNumber'), 'hidden')
        addClassListAll(document.querySelectorAll('.clientOrder'), 'hidden')
        buttonListOrDocument = true
    } else if (document.querySelector('.btnUpList').textContent === 'Лист') {
        document.querySelector('.btnUpList').textContent = 'Договор'
        addClassListAll(document.querySelectorAll('.boxSerialNumber'), 'hidden')
        deleteClassListAll(document.querySelectorAll('.clientOrder'), 'hidden')
        buttonListOrDocument = false
    }
}

//отправка всего в 1с
function handlerSendAllDataBase() {
    let dateTimeButton = new Date()
    let hours = dateTimeButton.getHours()
    let minutes = dateTimeButton.getMinutes()
    buttonSendTime.textContent = `Отправлено ${hours}:${minutes}`
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let allData = JSON.stringify(dataBase);
    let requestOptionsAllData = {
        method: 'POST',
        headers: myHeaders,
        body: allData,
        redirect: 'follow'
    };
    fetch(mainUrl + "changeFull", requestOptionsAllData)
        .then(response => response.json())
        .then(function (result) {
        })
        .catch(error => console.log('error', error));
    // BAO отправка микропартий
    if (microPartions_global.size > 0) {
        let mapToJson = createJsonForBackend(microPartions_global)
        let requestOptionsMapMicropartion = {
            method: 'POST',
            headers: myHeaders,
            body: mapToJson,
            redirect: 'follow'
        };
        fetch(microPartionsSaveAllUrl, requestOptionsMapMicropartion)
            .then(response => response.json())
            .then(function (result) {
            })
            .catch(error => console.log('error', error));
    }


    // if (connetcClient) {
    //     client.send('/queue/btmchash_2', {"content-type": "text/plain"}, raw)
    //     dataBase = []
    // }

}

// функция отслеживает нажатие на бокс и меняет цвет кнопки
function handlerButtonBoxSerialStyle(item) {
    let buttonThis = document.getElementById(`${item}`)
    buttonActiveBoxserial = item
    if (countButton === false) {
        buttonThis.style = "background-color:#006400;color:white !important;box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px !important;"
        if (buttonPrev === '') {
            buttonPrev = buttonThis
        } else if (buttonPrev !== '') {
            buttonPrev.style = "background-color: white;color:green;box-shadow:none !important;"
            buttonPrev = buttonThis
        }
        countButton = true

    } else if (countButton === true) {
        buttonThis.style = "background-color:#006400;color:white!important;box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px !important;"
        buttonPrev.style = "background-color: white;color:green;box-shadow:none !important;"
        countButton = false
        buttonPrev = buttonThis
    }

}

//функция отслеживает нажатие на серию и меняет цвет кнопки
function handlerButtonSkusSerialStyle(item) {
    let buttonThisSkusSerial = document.getElementById(`${item}`)
    if (countButtonSkusSerial === false) {
        buttonThisSkusSerial.style = "background-color: #00008B;color:white !important;box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px !important;"
        if (buttonPrevSkusSerial === '') {
            buttonPrevSkusSerial = buttonThisSkusSerial
        } else if (buttonPrevSkusSerial !== '') {
            buttonPrevSkusSerial.style = "background-color: white;color:#0000CD;;box-shadow:none !important;"
            buttonPrevSkusSerial = buttonThisSkusSerial
        }
        countButtonSkusSerial = true

    } else if (countButtonSkusSerial === true) {
        buttonThisSkusSerial.style = "background-color: #00008B;color:white !important;box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px !important;"
        buttonPrevSkusSerial.style = "background-color: white;color:#0000CD;;box-shadow:none !important;"
        countButtonSkusSerial = false
        buttonPrevSkusSerial = buttonThisSkusSerial
    }

}

//функция меняет данные загруженные из 1с при клике на соответствующие кнопки
function handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber) {
    localData.OperationsLists.find(itemBox => {
        itemBox.Boxes.find(itemBoxSerial => {
            if (itemBoxSerial.BoxSerial === BoxSerial) {// если выбрано у нескольких серий
                itemBoxSerial.Skus.find(itemSkusSerial => {
                    checkBoxItemSkusSerial.find(itemCheckBoxSkusSerial => {
                        if (itemSkusSerial.SkusSerial == itemCheckBoxSkusSerial.SkusSerial) {
                            itemSkusSerial.Operations.find(itemNumOperationsStatus => {
                                if (itemNumOperationsStatus.OperationNumber == parseInt(InOperationNumber)) { //
                                    let data = new Date()
                                    let dataBaseAll = new Object()
                                    dataBaseAll.WcGuid = WcGuid
                                    dataBaseAll.SkusSerial = itemCheckBoxSkusSerial.SkusSerial
                                    dataBaseAll.BoxSerial = BoxSerial
                                    dataBaseAll.Operation = itemNumOperationsStatus.Operation
                                    dataBaseAll.ActionNumber = parseInt(num)
                                    dataBaseAll.OperationNumber = parseInt(itemNumOperationsStatus.OperationNumber)
                                    dataBaseAll.CheckBox = checkBox
                                    dataBaseAll.DateNow = data.toISOString()
                                    dataBaseAll.OperationalDuration = GlobalTimer.allTimers.get(itemCheckBoxSkusSerial.SkusSerial).get(Number(itemNumOperationsStatus.OperationNumber)).getTime()
                                    dataBase.push(dataBaseAll)
                                    // console.log(dataBase)
                                    itemNumOperationsStatus.Status = textStatus
                                }
                            })
                        }
                    })
                })
            }
        })
    })
}

//функция собирает данные для микропартии

function handlerMicropartionCheckBoxItemSkusSerial(BoxSerial, SkusSerial, InOperationNumber) {
    let partion;
    localData.OperationsLists.find(itemBox => {
        itemBox.Boxes.find(itemBoxSerial => {
            if (itemBoxSerial.BoxSerial === BoxSerial) {
                itemBoxSerial.Skus.find(itemSkusSerial => {
                    if (itemSkusSerial.SkusSerial === SkusSerial) {
                        itemSkusSerial.Operations.find(itemOperationNumber => {
                            if (itemOperationNumber.OperationNumber === parseInt(InOperationNumber)) {
                                partion = []
                                partion.push(BoxSerial, SkusSerial, itemOperationNumber.Operation, parseInt(itemOperationNumber.OperationNumber), InOperationNumber)

                            }
                        })
                    }
                })
            }
        })
    })
    return partion;
}

//функция оправки для микропартии с браком
function handlerDeleteDateMicropartionDefect(guidMicro, BoxSerial, SkusSerial) {
    let dateDefect = new Date().toISOString()
    // let defectData = []
    let microDataDefect = new Object()
    microDataDefect.GuidMcro = guidMicro
    microDataDefect.OperationDate = dateDefect
    microDataDefect.BoxSerial = BoxSerial
    microDataDefect.SkusSerial = SkusSerial
    // defectData.push(microDataDefect)
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let allDataDefectMicro = JSON.stringify(microDataDefect);
    let requestOptionsAllData = {
        method: 'POST',
        headers: myHeaders,
        body: allDataDefectMicro,
        redirect: 'follow'
    };
    fetch(micropartionResizeUrl, requestOptionsAllData)
        .then(response => response.json())
        .then(function (result) {
        })
        .catch(error => console.log('error', error));
}

//гениратор id для микропартии

function microPartionSerialCodeGenerator() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}

// функция создает микропартию

function create_new_micropartion(main_micropartion_object, micropartion_guid, sku_serials_array, box_serial, operation_guid, operation_number) {
    let dateNow = 'operation_date'
    main_micropartion_object.set(micropartion_guid, new Map());
    let start = true
    sku_serials_array.forEach(serial => {
        if (start) {
            main_micropartion_object.get(micropartion_guid).set(dateNow, new Date().toISOString())
            main_micropartion_object.get(micropartion_guid).set(box_serial, new Map());
            start = false;

        }
        main_micropartion_object.get(micropartion_guid).get(box_serial).set(serial, new Map());
        main_micropartion_object.get(micropartion_guid).get(box_serial).get(serial).set(operation_guid, operation_number, dateNow);
    });
}

function check_do_we_have_micropartion_with_this_operation(all_micropartions, box_serial, sku_serial, operation_guid, operation_number) {
    let have_micropartion = false;
    all_micropartions.forEach(function (value, key, map) {
        if (value.has(box_serial)) {
            // 2) проверяем, есть ли в принципе в микропартиях в этом боксе эти серийники (skuserial)
            if (value.get(box_serial).has(sku_serial)) {
                if (value.get(box_serial).get(sku_serial).has(operation_guid)) {
                    if (value.get(box_serial).get(sku_serial).get(operation_guid) === operation_number) {
                        have_micropartion = true;
                    }
                }
            }
        }
    })
    return have_micropartion;
}

function get_micropartion_guid(all_micropartions, box_serial, sku_serial, operation_guid, operation_number) {
    let micropartion_guid = "temp_guid";
    all_micropartions.forEach(function (value, key, map) {
        if (value.has(box_serial)) {
            // 2) проверяем, есть ли в принципе в микропартиях в этом боксе эти серийники (skuserial)
            if (value.get(box_serial).has(sku_serial)) {
                if (value.get(box_serial).get(sku_serial).has(operation_guid)) {
                    if (value.get(box_serial).get(sku_serial).get(operation_guid) === operation_number) {
                        micropartion_guid = key;
                    }
                }
            }
        }
    })
    return micropartion_guid;
}

// Получаем длину / количество изделий микропартии
function check_micropartion_size(all_micropartions, micropartion_guid) {
    let counter = 0;
    all_micropartions.get(micropartion_guid).forEach(function (value, key, map) {
        map.forEach(function (value_2, key_2, value) {
            counter = value_2.size;
        })
    })

    return counter;
}


//Проверяем данные ...есть ли такая микропартия
function microPartionChecker(BoxSerial, InOperationNumber, SkusSerial, OperationNumber, textStatus, WcGuid, num) {
    let allOperationsArray = []
    let currentMicropartion = "empty"
    for (let i = checkBoxItemSkusSerial.length - 1; i >= 0; i--) {
        allOperationsArray.push(handlerMicropartionCheckBoxItemSkusSerial(BoxSerial, checkBoxItemSkusSerial[i].SkusSerial, InOperationNumber));
    }
    // BAO: micro partions control
    // проверяем все операции на принадлежность микропартиям, если есть - записываем в массив guid, если нет - пишем empty
    // потом проходимся по все получившейся коллекции и проверяем идентичны ли все элементы в ней
    let allMicropartionsGuidsForControll = [];
    let guidMicro = ''
    for (let x = 0; x < allOperationsArray.length; x++) {
        if (check_do_we_have_micropartion_with_this_operation(microPartions_global, allOperationsArray[x][0], allOperationsArray[x][1], allOperationsArray[x][2], allOperationsArray[x][3])) {
            let guid = get_micropartion_guid(microPartions_global, allOperationsArray[x][0], allOperationsArray[x][1], allOperationsArray[x][2], allOperationsArray[x][3]);
            currentMicropartion = guid;
            allMicropartionsGuidsForControll.push(guid);
            guidMicro = guid


        } else {
            allMicropartionsGuidsForControll.push("empty");
        }
    }
    // на этом этапе мы сделали список все микропартий к этим операциям (если есть - та что есть, если нет - empty), теперь смотрим чтобы все они были одинаковы
    let currentPartionForLocalCheck = allMicropartionsGuidsForControll[0];
    let allMicropartionsAreEqual = true;
    for (let x = 0; x < allMicropartionsGuidsForControll.length; x++) {
        if (allMicropartionsGuidsForControll[x] !== currentPartionForLocalCheck) {
            allMicropartionsAreEqual = false;
            //TODO: тут надо записать, какие микропартии отличаются для того чтобы в конце вывести пользователю
            break;
        }
    }

    if (currentMicropartion === "empty" && allMicropartionsAreEqual) {
        // если все epmty и они все одинаковы - создаем микропартию новую
        let newMicropartionGuid = microPartionSerialCodeGenerator()
        let skusSerialArray = []
        allOperationsArray.forEach(itemArray => {
            skusSerialArray.push(itemArray[1])
        })
        create_new_micropartion(microPartions_global, newMicropartionGuid, skusSerialArray, allOperationsArray[0][0], allOperationsArray[0][2], allOperationsArray[0][3])
        handlerControlMapTimeAndButton(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber, allOperationsArray.length)
        handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber)
    } else if (allMicropartionsAreEqual) {
        let size_of_micropartion = check_micropartion_size(microPartions_global, allMicropartionsGuidsForControll[0]);
        if (size_of_micropartion === allOperationsArray.length) {
            if (num != 0) {
                handlerControlMapTimeAndButton(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber, allOperationsArray.length)
                handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber)
                console.log(microPartions_global)
            } else {
                handlerControlMapTimeAndButton(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, parseInt(num), InOperationNumber, allOperationsArray.length)
                handlerDeleteLocalDataDefect(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber)
                checkBoxItem = checkBoxItem - 1
                checkBoxItemSkusSerial = checkBoxItemSkusSerial.filter(item => (item.SkusSerial !== SkusSerial))
                handlerSearchTimerMap(SkusSerial, BoxSerial, InOperationNumber, OperationNumber, checkBoxItemSkusSerial, true, length)
                handlerDeleteDateMicropartionDefect(guidMicro, BoxSerial, SkusSerial)
                microPartions_global.get(guidMicro).get(BoxSerial).delete(SkusSerial)
            }
            // если все одинаковы и НЕ равны empty
            // Запись времени. Если статус завершить или пауза, то при записи время надо поделить на длину allOperationsArray.length
        } else {
            //TODO: тут надо будет вывести сообщение пользователю какие серийники отличаются по микропариям -
            htmlModalWindow('Ошибка ', 'Микропартии не одинаковы в операциях,выберите серии из одной микропартии', '')
            // alert("Микропартии не одинаковы в операциях, ничего записывать не буду !");
        }
    } else {
        //TODO: тут надо будет вывести сообщение пользователю какие серийники отличаются по микропариям -
        htmlModalWindow('Ошибка ', 'Микропартии не одинаковы в операциях,выберите серии из одной микропартии', '')
        // alert("Микропартии не одинаковы в операциях, ничего записывать не буду !");
    }
}

//функция собирает данные отправленные пользователем при нажатии на кнопки и отправляеи их в функцию handlerControlStatus
function handlerSendInLocal(SkusSerial, WcGuid, BoxSerial, Operation, num, Status2, InOperationNumber, OperationNumber, Status) {
    let textStatus = ''
    if (checkBoxItem > 0 || checkBoxAll > 0) {
        if (num === 1) {
            textStatus = 'Начато'
            handlerControlStatus(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber, Status)
        }
        if (num === 2) {
            if (document.getElementById(`${InOperationNumber}pause${SkusSerial}`).textContent === 'Продолжить') {
                textStatus = 'Начато'
                num = 1985
                handlerControlStatus(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber, Status)
            } else {
                textStatus = 'Пауза'
                num = 2
                handlerControlStatus(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber, Status)
            }
        }
        if (num === 3) {
            textStatus = 'Закончено'
            handlerControlStatus(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber, Status)
        }
        if (num === 0) {
            textStatus = 'Несоответствие'
            htmlModalWindowDefect(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber, Status)
            // handlerControlStatus(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber, Status)
        }
    } else {
        htmlModalWindow('Ошибка серии не выбраны', 'Выберите серии', '')
    }

}

//функция отображает таблицу
function handlerShowTable(BoxSerial, SkusSerial) {
    if (document.querySelector('.table_container').classList.contains('loading')) {
        deleteElems(document.querySelectorAll('.control_table'))
    }
    document.querySelector('.col_operation').textContent = `Операции для ${SkusSerial}`
    localData.OperationsLists.find(item => {
        item.Boxes.find(itemBoxSerial => {
            if (itemBoxSerial.BoxSerial == BoxSerial) {
                itemBoxSerial.Skus.find(itemSkusSerial => {
                    if (itemSkusSerial.SkusSerial == SkusSerial) {
                        for (let i = itemSkusSerial.Operations.length - 1; i >= 0; i--) {
                            deleteClassList(tablePane, 'hidden')
                            addClassList(tablePane, 'loading')
                            addClassList(tableContainer, 'loading')
                            allButtonsIn = []
                            let table = (`
                                <tbody class="control_table ${itemSkusSerial.Operations[i].Status} " id="${SkusSerial}"  >
                                <tr  class="tr_table" id="" >
                                   <td class="m-1 " id="numOperation">${itemSkusSerial.Operations[i].OperationNumber}</td>
                                     <td>${itemSkusSerial.Operations[i].OperationHumanName}</td>
                                     <td id="${itemSkusSerial.Operations[i].OperationNumber}status${SkusSerial}" class="${itemSkusSerial.Operations[i].OperationNumber}status">${itemSkusSerial.Operations[i].Status}</td>
                                   <td id="${itemSkusSerial.Operations[i].Status}">
                                     <button type="button"  class="btn btnBegin btnIn" id="${itemSkusSerial.Operations[i].OperationNumber}begin${SkusSerial}" onclick="handlerSendInLocal('${SkusSerial}','${item.WcGuid}','${BoxSerial}','${itemSkusSerial.Operations[i].Operation}',1,'${itemSkusSerial.Operations[i].Status}','${itemSkusSerial.Operations[i].OperationNumber}','${itemSkusSerial.Operations[i].OperationNumber}',
                                     document.getElementById('${itemSkusSerial.Operations[i].OperationNumber}status${SkusSerial}').textContent)"><i class="far fa-eye"></i>Начать</button>
                                     <button type="button"  class="btn btnPause btnIn" id="${itemSkusSerial.Operations[i].OperationNumber}pause${SkusSerial}" onclick="handlerSendInLocal('${SkusSerial}','${item.WcGuid}','${BoxSerial}','${itemSkusSerial.Operations[i].Operation}',2,'${itemSkusSerial.Operations[i].Status}','${itemSkusSerial.Operations[i].OperationNumber}','${itemSkusSerial.Operations[i].OperationNumber}',document.getElementById('${itemSkusSerial.Operations[i].OperationNumber}status${SkusSerial}').textContent)"><i class="fas fa-edit"></i>Пауза</button>
                                     <button type="button"  class="btn btnFinish btnIn" id="${itemSkusSerial.Operations[i].OperationNumber}finish${SkusSerial}" onclick="handlerSendInLocal('${SkusSerial}','${item.WcGuid}','${BoxSerial}','${itemSkusSerial.Operations[i].Operation}',3,'${itemSkusSerial.Operations[i].Status}','${itemSkusSerial.Operations[i].OperationNumber}','${itemSkusSerial.Operations[i].OperationNumber}',document.getElementById('${itemSkusSerial.Operations[i].OperationNumber}status${SkusSerial}').textContent)"><i class="far fa-trash-alt"></i>Закончить</button>
                                   <button type="button"  class="btn btnDefect btnIn" id="${itemSkusSerial.Operations[i].OperationNumber}defect${SkusSerial}" onclick="handlerSendInLocal('${SkusSerial}','${item.WcGuid}','${BoxSerial}','${itemSkusSerial.Operations[i].Operation}',0,'${itemSkusSerial.Operations[i].Status}','${itemSkusSerial.Operations[i].OperationNumber}','${itemSkusSerial.Operations[i].OperationNumber}',
                                     document.getElementById('${itemSkusSerial.Operations[i].OperationNumber}status${SkusSerial}').textContent)"><i class="far fa-eye"></i>Несоответствие</button>
                                   </td>
                                </tr>
                                </tbody>`)
                            document.querySelector('.header_control').insertAdjacentHTML('afterend', table)
                            let buttonsIn = {
                                itemStatusId: `${itemSkusSerial.Operations[i].OperationNumber}status${SkusSerial}`,
                                itemButtonBegin: `${itemSkusSerial.Operations[i].OperationNumber}begin${SkusSerial}`,
                                itemButtonPause: `${itemSkusSerial.Operations[i].OperationNumber}pause${SkusSerial}`,
                                itemButtonFinish: `${itemSkusSerial.Operations[i].OperationNumber}finish${SkusSerial}`,
                                itemButtonDefect: `${itemSkusSerial.Operations[i].OperationNumber}defect${SkusSerial}`
                            }
                            allButtonsIn.push(buttonsIn)
                            handlerButtonHidden(allButtonsIn)
                            // console.log(document.getElementById(`${itemSkusSerial.Operations[i].OperationNumber}status${SkusSerial}`).textContent.toLowerCase())
                            // if(document.getElementById(`${itemSkusSerial.Operations[i].OperationNumber}status${SkusSerial}`).textContent.toLowerCase() == "несоответствие"){
                            //     document.getElementById(`${itemSkusSerial.SkusSerial}liButton`).remove()
                            // }
                        }
                    }
                })
            }
        })
    })
}

//функция собирает массив со всеми сериями для кнопки выбрать все
function handlerSearchSkusSerial(boxSerial) {
    localData.OperationsLists.find(itemBox => {
        itemBox.Boxes.find(itemBoxSerial => {
            if (itemBoxSerial.BoxSerial == boxSerial) {
                itemBoxSerial.Skus.find(itemSkusSerial => {
                    let skusSerialAll = new Object()
                    skusSerialAll.SkusSerial = itemSkusSerial.SkusSerial
                    checkBoxItemSkusSerial.push(skusSerialAll)
                    // console.log(allSkusSerialItem)
                })
            }
        })
    })

}

// функция отвечает за выбор всех серий или удаление выбранного
function handlerBlockButtonChecked(id, boxSerial) {
    if (checkBoxItem === 0) {
        if (document.getElementById(id).textContent.toLowerCase() == 'отметить все') {
            document.getElementById(id).textContent = ('Убрать у всех')
            addClassListAll(document.querySelectorAll('.btnSkusSerialIn'), 'btnSkusSerialInCheckAll')
            addClassList(listGallery, 'gallery_opacity')
            addClassListAll(document.querySelectorAll('.checkButtonInput '), 'switch-on')
            checkBoxAll = 1
            handlerSearchSkusSerial(boxSerial)
        } else {
            document.getElementById(id).textContent = ('Отметить все')
            deleteClassList(listGallery, 'gallery_opacity')
            deleteClassListAll(document.querySelectorAll('.btnSkusSerialIn'), 'btnSkusSerialInCheckAll')
            deleteClassListAll(document.querySelectorAll('.checkButtonInput '), 'switch-on')
            checkBoxAll = 0
            // allSkusSerialItem = []
            checkBoxItemSkusSerial = []
        }
    } else {
        htmlModalWindow('Ошибка нельзя выбрать все серии', 'Отмените выбор по конкретным сериям', '')
    }
}


// функция отвечает за конкретный выбор серии по галкам
function handlerInputCheck(skusSerial) {
    if (this.event && checkBoxAll === 0) {
        let elems = document.getElementById(`${skusSerial}flexCheckDefault`)
        elems.classList.toggle('switch-on')
        if (elems.classList.contains('switch-on')) {
            checkBoxItem = checkBoxItem + 1
            addClassList(document.getElementById(`${skusSerial}`), 'btnSkusSerialInCheckAll')
            addClassList(document.getElementById(`${skusSerial}flexCheckDefault`), 'switch-on')
            let itemSkusSerial = new Object()
            itemSkusSerial.SkusSerial = skusSerial
            checkBoxItemSkusSerial.push(itemSkusSerial)
        } else {
            checkBoxItem = checkBoxItem - 1
            deleteClassList(document.getElementById(`${skusSerial}`), 'btnSkusSerialInCheckAll')
            deleteClassList(document.getElementById(`${skusSerial}`), 'btnSkusSerialInCheckAll')
            checkBoxItemSkusSerial = checkBoxItemSkusSerial.filter(item => (item.SkusSerial !== skusSerial))
        }
    }

}

// функция рисует сами серии
function handlerBoxSkusSerial(itemBoxSerial) {
    let filterSerial = []
    handlerControlLoadingSkusSerial() //проверяет было ли ранее загружен вывод серий
    handlerButtonBoxSerialStyle(itemBoxSerial) //отрабатываем клик по серии и добавляем стили к кнопкам
    localData.OperationsLists.find(itemBox => {
        itemBox.Boxes.find(itemSkusSerial => {
            if (itemSkusSerial.BoxSerial == itemBoxSerial) {
                itemSkusSerial.Skus.find(itemSerial => {
                    itemSerial.Operations.find(itemSerialStatus => {
                        if (itemSerial.SkusSerial != 'Несоответствие') {
                            if (selectionChoose == 1 || selectionChoose == 0) {
                                let statusControl = new Object()
                                statusControl.SkusSerial = itemSerial.SkusSerial
                                statusControl.BoxSerial = itemSkusSerial.BoxSerial
                                statusControl.SkusFriendlyName = itemSerial.SkusFriendlyName
                                filterSerial.push(statusControl)
                            }
                            if (selectionChoose == 2) {
                                if (itemSerialStatus.Status.toLowerCase() === 'пауза') {
                                    let statusControl = new Object()
                                    statusControl.SkusSerial = itemSerial.SkusSerial
                                    statusControl.BoxSerial = itemSkusSerial.BoxSerial
                                    statusControl.SkusFriendlyName = itemSerial.SkusFriendlyName
                                    filterSerial.push(statusControl)
                                }
                            }
                            if (selectionChoose == 3) {
                                if (itemSerialStatus.Status.toLowerCase() === 'начато') {
                                    let statusControl = new Object()
                                    statusControl.SkusSerial = itemSerial.SkusSerial
                                    statusControl.BoxSerial = itemSkusSerial.BoxSerial
                                    statusControl.SkusFriendlyName = itemSerial.SkusFriendlyName
                                    filterSerial.push(statusControl)
                                }
                            }
                        }
                    })

                })
            }
        })

    })
    filterSerial = filterSerial.reduce((r, i) => !r.some(j => !Object.keys(i).some(k => i[k] !== j[k])) ? [...r, i] : r, [])
    filterSerial.find(item => {
        htmlButtonSkusSerial(item.SkusSerial, item.BoxSerial, item.SkusFriendlyName)
    })
    let htmlBlockChecked = (`
                    <button type="button" class="btn  btn-sm checkButton btnCheckIn btnIn checkButton1" id="checkButton1" onclick="handlerBlockButtonChecked('checkButton1','${itemBoxSerial}')" >Отметить все</button>`)
    blockChecked.insertAdjacentHTML('afterbegin', htmlBlockChecked)
}

//функция фильтрует бокс серии по выборки
const handlerSelectionStatusSearchBox = (text) => {
    let filterStatus = []
    for (let a = 0; a < localData.OperationsLists.length; a++) {
        for (let i = 0; i < localData.OperationsLists[a].Boxes.length; i++) {
            for (let j = 0; j < localData.OperationsLists[a].Boxes[i].Skus.length; j++) {
                for (let k = 0; k < localData.OperationsLists[a].Boxes[i].Skus[j].Operations.length; k++) {
                    if (localData.OperationsLists[a].Boxes[i].Skus[j].Operations[k].Status.toLowerCase() == text) {
                        let statusControl = new Object()
                        statusControl.WcGuid = localData.OperationsLists[a].WcGuid
                        statusControl.BoxSerial = localData.OperationsLists[a].Boxes[i].BoxSerial
                        statusControl.ClientOrder = localData.OperationsLists[a].Boxes[i].ClientOrder
                        filterStatus.push(statusControl)
                    }
                }
            }
        }

    }
    filterStatus = filterStatus.reduce((r, i) => !r.some(j => !Object.keys(i).some(k => i[k] !== j[k])) ? [...r, i] : r, [])
    filterStatus.find(item => {
        htmlBoxSerial(item.BoxSerial, item.WcGuid, item.ClientOrder)
    })
}

// вывожу серии бокса,взависимости от сортировки
function handlerBoxSerial() {
    handlerDeleteSpiner()
    if (selectionChoose == 1 || selectionChoose == 0) {
        localData.OperationsLists.find(item => {
            item.Boxes.find(itemBoxSerial => {
                htmlBoxSerial(itemBoxSerial.BoxSerial, item.WcGuid, itemBoxSerial.ClientOrder)
            })
        })
    }
    if (selectionChoose == 2) {
        handlerSelectionStatusSearchBox('пауза')
    }
    if (selectionChoose == 3) {
        handlerSelectionStatusSearchBox('начато')
    }
}

// функция добавляет новые ключ в обьект,номер строки
function handlerAddObject() {
    for (let i = 0; i < localData.OperationsLists.length; i++) {
        for (let j = 0; j < localData.OperationsLists[i].Boxes.length; j++) {
            for (let a = 0; a < localData.OperationsLists[i].Boxes[j].Skus.length; a++) {
                let num = 1
                for (let l = 0; l < localData.OperationsLists[i].Boxes[j].Skus[a].Operations.length; l++) {
                    localData.OperationsLists[i].Boxes[j].Skus[a].Operations[l].InOperationNumber = `${num++}`
                }
            }

        }
    }
}

// функция связанная с таймером
function handlerSkusSerial() {
    let allBoxLenght = localData.OperationsLists[0].Boxes.length
    for (let box = 0; box < allBoxLenght; box++) {
        let allSkuInBoxLength = localData.OperationsLists[0].Boxes[box].Skus.length;
        for (let concreteSku = 0; concreteSku < allSkuInBoxLength; concreteSku++) {
            let allOperationsOfSkuLenght = localData.OperationsLists[0].Boxes[box].Skus[concreteSku].Operations.length;
            for (let concreteOperationNumber = 0; concreteOperationNumber < allOperationsOfSkuLenght; concreteOperationNumber++) {
                if (!allDataAboutOperations.has(localData.OperationsLists[0].Boxes[box].Skus[concreteSku].SkusSerial)) {
                    allDataAboutOperations.set(localData.OperationsLists[0].Boxes[box].Skus[concreteSku].SkusSerial, new Map());
                    allDataAboutOperations.get(localData.OperationsLists[0].Boxes[box].Skus[concreteSku].SkusSerial).set(localData.OperationsLists[0].Boxes[box].Skus[concreteSku].Operations[concreteOperationNumber].OperationNumber, new BtmcTimer(localData.OperationsLists[0].Boxes[box].Skus[concreteSku].Operations[concreteOperationNumber].OperationalDuration));
                } else {
                    if (allDataAboutOperations.has(localData.OperationsLists[0].Boxes[box].Skus[concreteSku].Operations[concreteOperationNumber].OperationNumber)) {
                        console.log("Ошибка в разобре, повторно встретился номера операции уже существующий в нашей структуре");
                    } else {
                        allDataAboutOperations.get(localData.OperationsLists[0].Boxes[box].Skus[concreteSku].SkusSerial).set(localData.OperationsLists[0].Boxes[box].Skus[concreteSku].Operations[concreteOperationNumber].OperationNumber, new BtmcTimer(localData.OperationsLists[0].Boxes[box].Skus[concreteSku].Operations[concreteOperationNumber].OperationalDuration));
                    }
                }
            }
        }
    }
}

//функция вытаскивает все получившие боксерии для запроса в миропартии

function handlerBoxSerialForMicropartion() {
    let boxesArray = []
    localData.OperationsLists.find(itemBox => {
        itemBox.Boxes.find(itemBoxSerial => {
            boxesArray.push(itemBoxSerial.BoxSerial)
        })
    })
    boxesObject.boxes = boxesArray
}

//функция сортирует полученные данные по номеру операций
function handlerSortOperationNumber() {
    localData.OperationsLists.find(itemBox => {
        itemBox.Boxes.find(itemSkusSerial => {
            itemSkusSerial.Skus.find(itemOperations => {
                itemOperations.Operations.sort((a, b) => {
                    return a.OperationNumber - b.OperationNumber
                })
                itemOperations.Operations.find(itemStatus => {
                    if (itemStatus.Status.toLowerCase() == 'несоответствие') {
                        itemOperations.SkusSerial = 'Несоответствие'
                    }
                })
            })

        })

    })
}

//функция запроса микропартии
function handlerFetchMicropartion() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let jsonBox = JSON.stringify(boxesObject)
    let param = (new URL(document.location)).searchParams;
    let requestOptionsMicroPartion = {
        method: 'POST',
        headers: myHeaders,
        body: jsonBox,
        redirect: 'follow'
    };
    fetch(micropartionsUrl, requestOptionsMicroPartion)
        .then(response => response.json())
        .then(function (result) {
            if (Object.keys(result).length != 0) {
                createParseJsonForFront(result)
            }

        })
        .catch(error => console.log('error', error))
}
//запуск всех функций
function axiosLogin() {
    htmlSpiner()
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let param = (new URL(document.location)).searchParams;
    let raw = JSON.stringify({
        "Guid": param.get('id')
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(mainUrl + "geterp", requestOptions)
        .then(response => response.json())
        .then(function (result) {
            localData = result
            handlerBoxSerialForMicropartion()
            handlerGuidName()
            handlerSortOperationNumber()
            handlerSkusSerial()
            handlerFetchMicropartion()
            setTimeout(handlerBoxSerial, 1000)
        })
        .catch(error => console.log('error', error));

}

GlobalTimer = new TimerManeger(allDataAboutOperations);

axiosLogin()
slideCarouselBox()



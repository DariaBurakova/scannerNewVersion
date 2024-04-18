// import localData from "./mockLocalData.mjs";

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
let GlobalTimer;
let allDataAboutOperations = new Map();
// let localData = {}
let microPartions_global = new Map();
let connetcClient = false
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

let micropartions= {
    "32f1cfae-8e39-4985-a3bd-d52027a5d693": {
    "BoxSerial": "БТМК ТЕСТ",
        "Skus": [
        {
            "SkusSerial": "2592403",
            "PartionOperations": [
                {
                    "OperationGuid": "f8caa9e0-eb3d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 2
                }
            ]
        },
        {
            "SkusSerial": "2602403",
            "PartionOperations": [
                {
                    "OperationGuid": "f8caa9e0-eb3d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 2
                }
            ]
        }
    ]
},
    "358569c0-4030-4a81-9c32-6939d9adcb85": {
    "BoxSerial": "ФЛ44-03/24",
        "Skus": [
        {
            "SkusSerial": "4202403",
            "PartionOperations": [
                {
                    "OperationGuid": "1f06b009-eb4f-11ee-8c53-00505681f37b",
                    "OpertionNumber": 68
                }
            ]
        },
        {
            "SkusSerial": "4192403",
            "PartionOperations": [
                {
                    "OperationGuid": "1f06b009-eb4f-11ee-8c53-00505681f37b",
                    "OpertionNumber": 68
                }
            ]
        },
        {
            "SkusSerial": "4182403",
            "PartionOperations": [
                {
                    "OperationGuid": "1f06b009-eb4f-11ee-8c53-00505681f37b",
                    "OpertionNumber": 68
                }
            ]
        },
        {
            "SkusSerial": "4172403",
            "PartionOperations": [
                {
                    "OperationGuid": "1f06b009-eb4f-11ee-8c53-00505681f37b",
                    "OpertionNumber": 68
                }
            ]
        },
        {
            "SkusSerial": "4162403",
            "PartionOperations": [
                {
                    "OperationGuid": "1f06b009-eb4f-11ee-8c53-00505681f37b",
                    "OpertionNumber": 68
                }
            ]
        },
        {
            "SkusSerial": "4152403",
            "PartionOperations": [
                {
                    "OperationGuid": "1f06b009-eb4f-11ee-8c53-00505681f37b",
                    "OpertionNumber": 68
                }
            ]
        },
        {
            "SkusSerial": "4142403",
            "PartionOperations": [
                {
                    "OperationGuid": "1f06b009-eb4f-11ee-8c53-00505681f37b",
                    "OpertionNumber": 68
                }
            ]
        },
        {
            "SkusSerial": "4132403",
            "PartionOperations": [
                {
                    "OperationGuid": "1f06b009-eb4f-11ee-8c53-00505681f37b",
                    "OpertionNumber": 68
                }
            ]
        },
        {
            "SkusSerial": "4122403",
            "PartionOperations": [
                {
                    "OperationGuid": "1f06b009-eb4f-11ee-8c53-00505681f37b",
                    "OpertionNumber": 68
                }
            ]
        },
        {
            "SkusSerial": "4112403",
            "PartionOperations": [
                {
                    "OperationGuid": "1f06b009-eb4f-11ee-8c53-00505681f37b",
                    "OpertionNumber": 68
                }
            ]
        }
    ]
},
    "b70dfed1-4000-4cc2-9165-39b8ed4435d9": {
    "BoxSerial": "ФЛ44-03/24",
        "Skus": [
        {
            "SkusSerial": "4202403",
            "PartionOperations": [
                {
                    "OperationGuid": "f5489b75-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 61
                }
            ]
        },
        {
            "SkusSerial": "4192403",
            "PartionOperations": [
                {
                    "OperationGuid": "f5489b75-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 61
                }
            ]
        },
        {
            "SkusSerial": "4182403",
            "PartionOperations": [
                {
                    "OperationGuid": "f5489b75-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 61
                }
            ]
        },
        {
            "SkusSerial": "4172403",
            "PartionOperations": [
                {
                    "OperationGuid": "f5489b75-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 61
                }
            ]
        },
        {
            "SkusSerial": "4162403",
            "PartionOperations": [
                {
                    "OperationGuid": "f5489b75-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 61
                }
            ]
        },
        {
            "SkusSerial": "4152403",
            "PartionOperations": [
                {
                    "OperationGuid": "f5489b75-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 61
                }
            ]
        },
        {
            "SkusSerial": "4142403",
            "PartionOperations": [
                {
                    "OperationGuid": "f5489b75-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 61
                }
            ]
        },
        {
            "SkusSerial": "4132403",
            "PartionOperations": [
                {
                    "OperationGuid": "f5489b75-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 61
                }
            ]
        },
        {
            "SkusSerial": "4122403",
            "PartionOperations": [
                {
                    "OperationGuid": "f5489b75-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 61
                }
            ]
        },
        {
            "SkusSerial": "4112403",
            "PartionOperations": [
                {
                    "OperationGuid": "f5489b75-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 61
                }
            ]
        }
    ]
},
    "ff9515c5-4a80-4887-b2f0-94b7f8574bf8": {
    "BoxSerial": "ФЛ44-03/24",
        "Skus": [
        {
            "SkusSerial": "4202403",
            "PartionOperations": [
                {
                    "OperationGuid": "c12a8cec-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 59
                }
            ]
        },
        {
            "SkusSerial": "4192403",
            "PartionOperations": [
                {
                    "OperationGuid": "c12a8cec-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 59
                }
            ]
        },
        {
            "SkusSerial": "4182403",
            "PartionOperations": [
                {
                    "OperationGuid": "c12a8cec-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 59
                }
            ]
        },
        {
            "SkusSerial": "4172403",
            "PartionOperations": [
                {
                    "OperationGuid": "c12a8cec-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 59
                }
            ]
        },
        {
            "SkusSerial": "4162403",
            "PartionOperations": [
                {
                    "OperationGuid": "c12a8cec-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 59
                }
            ]
        },
        {
            "SkusSerial": "4152403",
            "PartionOperations": [
                {
                    "OperationGuid": "c12a8cec-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 59
                }
            ]
        },
        {
            "SkusSerial": "4142403",
            "PartionOperations": [
                {
                    "OperationGuid": "c12a8cec-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 59
                }
            ]
        },
        {
            "SkusSerial": "4132403",
            "PartionOperations": [
                {
                    "OperationGuid": "c12a8cec-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 59
                }
            ]
        },
        {
            "SkusSerial": "4122403",
            "PartionOperations": [
                {
                    "OperationGuid": "c12a8cec-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 59
                }
            ]
        },
        {
            "SkusSerial": "4112403",
            "PartionOperations": [
                {
                    "OperationGuid": "c12a8cec-eb4d-11ee-8c53-00505681f37b",
                    "OpertionNumber": 59
                }
            ]
        }
    ]
},


//     "2c0119db-0219-499f-8dc9-4cb98bf9ae89": {
//     "BoxSerial": "ФЛ44-03/24",
//         "Skus": [
//         {
//             "SkusSerial": "4202403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "adef0801-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 58
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4192403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "adef0801-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 58
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4182403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "adef0801-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 58
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4172403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "adef0801-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 58
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4162403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "adef0801-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 58
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4152403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "adef0801-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 58
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4142403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "adef0801-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 58
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4132403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "adef0801-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 58
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4122403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "adef0801-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 58
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4112403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "adef0801-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 58
//                 }
//             ]
//         }
//     ]
// },
//     "dc6276db-c33d-4f42-b8fd-2481e08bc3f7": {
//     "BoxSerial": "ФЛ44-03/24",
//         "Skus": [
//         {
//             "SkusSerial": "4202403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "da024dcc-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 60
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4192403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "da024dcc-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 60
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4182403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "da024dcc-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 60
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4172403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "da024dcc-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 60
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4162403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "da024dcc-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 60
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4152403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "da024dcc-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 60
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4142403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "da024dcc-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 60
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4132403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "da024dcc-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 60
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4122403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "da024dcc-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 60
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "4112403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "da024dcc-eb4d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 60
//                 }
//             ]
//         }
//     ]
// },
//     "05987a8c-d4bf-4d16-adf8-7732f8dd52e6": {
//     "BoxSerial": "БТМК ТЕСТ",
//         "Skus": [
//         {
//             "SkusSerial": "2592403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "3be50e1a-eb3e-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 4
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2602403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "3be50e1a-eb3e-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 4
//                 }
//             ]
//         }
//     ]
// },
//     "8de184ea-b31a-4c51-85ea-ce4482f83398": {
//     "BoxSerial": "БТМК ТЕСТ",
//         "Skus": [
//         {
//             "SkusSerial": "2582403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5d1fc3f4-eb3e-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 6
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2592403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5d1fc3f4-eb3e-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 6
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2602403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5d1fc3f4-eb3e-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 6
//                 }
//             ]
//         }
//     ]
// },
//     "85ae929a-c0a5-47c2-9e7f-99ea2cf3f55c": {
//     "BoxSerial": "БТМК ТЕСТ",
//         "Skus": [
//         {
//             "SkusSerial": "2582403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "89df4fd2-eb3e-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 7
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2592403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "89df4fd2-eb3e-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 7
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2602403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "89df4fd2-eb3e-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 7
//                 }
//             ]
//         }
//     ]
// },
//     "534feec2-03bb-4b0e-9174-97fc5ade4774": {
//     "BoxSerial": "БТМК ТЕСТ",
//         "Skus": [
//         {
//             "SkusSerial": "2512403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "f8caa9e0-eb3d-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 2
//                 }
//             ]
//         }
//     ]
// },
//     "2fcc29c7-e8b0-46e7-9357-c9f5c95957ba": {
//     "BoxSerial": "0002702024041001",
//         "Skus": [
//         {
//             "SkusSerial": "000270202404100124",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100123",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100122",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100121",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100120",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100119",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100118",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100117",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100116",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100115",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100114",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100113",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100112",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100111",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100110",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410019",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410018",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410017",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410016",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410015",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410014",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410013",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410012",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410011",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         }
//     ]
// },
//     "2ee1335c-b53c-46e3-a4ab-c414dd00ad8c": {
//     "BoxSerial": "0002702024041001",
//         "Skus": [
//         {
//             "SkusSerial": "000270202404100124",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100123",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100122",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100121",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100120",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100119",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100118",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100117",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100116",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100115",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100114",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100113",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100112",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100111",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100110",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410019",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410018",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410017",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410016",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410015",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410014",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410013",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410012",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410011",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         }
//     ]
// },
//     "1f0b8e6a-fdf3-45eb-9f88-4972bb98d9c8": {
//     "BoxSerial": "БТМК ТЕСТ",
//         "Skus": [
//         {
//             "SkusSerial": "2602403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 78
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2592403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 78
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2582403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 78
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2572403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 78
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2562403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 78
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2552403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 78
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2542403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 78
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2532403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 78
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2522403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 78
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2512403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 78
//                 }
//             ]
//         }
//     ]
// },
//     "e66e2749-63ee-4ac3-9598-a16642b3889a": {
//     "BoxSerial": "БТМК ТЕСТ",
//         "Skus": [
//         {
//             "SkusSerial": "2602403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 73
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2592403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 73
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2582403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 73
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2572403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 73
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2562403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 73
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2552403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 73
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2542403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 73
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2532403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 73
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2522403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 73
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "2512403",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5371426b-eb4c-11ee-8c53-00505681f37b",
//                     "OpertionNumber": 73
//                 }
//             ]
//         }
//     ]
// },
//     "148f17ac-a4f9-4a18-98a2-6f70ab07ad51": {
//     "BoxSerial": "0002702024041001",
//         "Skus": [
//         {
//             "SkusSerial": "000270202404100124",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100123",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100122",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100121",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100120",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100119",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100118",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100117",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100116",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100115",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100114",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100113",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100112",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100111",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100110",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410019",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410018",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410017",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410016",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410015",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410014",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410013",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410012",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410011",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         }
//     ]
// },
//     "fc94da07-06c7-46ec-b1ad-4bb61bbd88dc": {
//     "BoxSerial": "0002702024041001",
//         "Skus": [
//         {
//             "SkusSerial": "000270202404100124",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100123",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100122",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100121",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100120",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100119",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100118",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100117",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100116",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100115",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100114",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100113",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100112",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100111",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100110",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410019",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410018",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410017",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410016",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410015",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410014",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410013",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410012",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410011",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "5bc0d294-6aff-11ed-8c34-00505681efea",
//                     "OpertionNumber": 2
//                 }
//             ]
//         }
//     ]
// },
//     "6d4bcd01-0436-420e-a701-60de5255fc76": {
//     "BoxSerial": "0002702024041001",
//         "Skus": [
//         {
//             "SkusSerial": "000270202404100124",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100123",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100122",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100121",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100120",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100119",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100118",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100117",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100116",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100115",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100114",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100113",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100112",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100111",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100110",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410019",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410018",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410017",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410016",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410015",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410014",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410013",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410012",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410011",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         }
//     ]
// },
//     "70833bac-e0ed-470b-85cf-b15e1db97e01": {
//     "BoxSerial": "0002702024041001",
//         "Skus": [
//         {
//             "SkusSerial": "000270202404100124",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100123",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100122",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100121",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100120",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100119",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100118",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100117",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100116",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100115",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100114",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100113",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100112",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100111",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "000270202404100110",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410019",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410018",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410017",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410016",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410015",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410014",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410013",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410012",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         },
//         {
//             "SkusSerial": "00027020240410011",
//             "PartionOperations": [
//                 {
//                     "OperationGuid": "ce1cf905-72ce-11ec-8c01-00505681efea",
//                     "OpertionNumber": 3
//                 }
//             ]
//         }
//     ]
// }
}



let localData = {
    "OperationsLists": [{
        "WcGuid": "1d09989e-a9dc-11ec-8c0f-00505681efea",
        "Boxes": [
            {
                "BoxSerial": "00000010442 02308", "ClientOrder": "270-23/Ц   ",
                "Skus": [{
                "SkusID": "12226bea-3b65-11ee-8c44-00505681f37b",
                "SkusFriendlyName": "КБСО - -3,0ESFC2Л ΔL\u003d+0,03м ",
                "SkusSerial": "00000010442 023081",
                "Operations": [{
                    "OperationNumber": 2,
                    "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                    "OperationHumanName": "Маркировка кабеля (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "Сформировано",
                    "OperationalDuration": 0,
                }, {
                    "OperationNumber": 1,
                    "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                    "OperationHumanName": "Сдача ОТК (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "пауза",
                    "OperationalDuration": 0
                }, {
                    "OperationNumber": 4,
                    "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                    "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "начато",
                    "OperationalDuration": 0
                }, {
                    "OperationNumber": 3,
                    "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                    "OperationHumanName": "Упаковка (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "начато",
                    "OperationalDuration": 0
                }]
            }, {
                "SkusID": "12226bea-3b65-11ee-8c44-00505681f37bc",
                "SkusFriendlyName": "КБСО - -3,0ESFC2Л ΔL\u003d+0,03м ",
                "SkusSerial": "00000010442 023082",
                "Operations": [{
                    "OperationNumber": 1,
                    "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                    "OperationHumanName": "Маркировка кабеля (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "Сформировано",
                    "OperationalDuration": 0
                }, {
                    "OperationNumber": 2,
                    "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                    "OperationHumanName": "Сдача ОТК (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "Сформировано",
                    "OperationalDuration": 0
                }, {
                    "OperationNumber": 3,
                    "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                    "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "Сформировано",
                    "OperationalDuration": 0,
                }, {
                    "OperationNumber": 4,
                    "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                    "OperationHumanName": "Упаковка (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "начато",
                    "OperationalDuration": 0
                }]
            }, {
                "SkusID": "12226bea-3b65-11ee-8c44-00505681f37b7",
                "SkusFriendlyName": "КБСО - -3,0ESFC2Л ΔL\u003d+0,03м ",
                "SkusSerial": "00000010442 023083",
                "Operations": [{
                    "OperationNumber": 1,
                    "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                    "OperationHumanName": "Маркировка кабеля (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "Сформировано",
                    "OperationalDuration": 0
                }, {
                    "OperationNumber": 2,
                    "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                    "OperationHumanName": "Сдача ОТК (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "Сформировано",
                    "OperationalDuration": 0,
                }, {
                    "OperationNumber": 3,
                    "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                    "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "Сформировано",
                    "OperationalDuration": 0
                }, {
                    "OperationNumber": 4,
                    "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                    "OperationHumanName": "Упаковка (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "Сформировано",
                    "OperationalDuration": 0
                }]
            },
            ]
        },
            {
            "BoxSerial": "00000010442 9999", "ClientOrder": "1985/Ц   ", "Skus": [{
                "SkusID": "12226bea-3b65-11ee-8c44-00505681f37b",
                "SkusFriendlyName": "КБСО  ",
                "SkusSerial": "00000010442 989891",
                "Operations": [
                    {
                        "OperationNumber": 3,
                        "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                        "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                        "DateOfChange": "27.10.2023 13.20.55",
                        "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        "Status": "Сформировано",
                        "OperationalDuration": 0
                    },
                    {
                    "OperationNumber": 1,
                    "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                    "OperationHumanName": "Маркировка кабеля (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "Сформировано",
                    "OperationalDuration": 0
                },  {
                    "OperationNumber": 4,
                    "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                    "OperationHumanName": "Упаковка (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "Пауза",
                    "OperationalDuration": 0
                },
                    {
                        "OperationNumber": 2,
                        "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                        "OperationHumanName": "Сдача ОТК (Армирование)",
                        "DateOfChange": "27.10.2023 13.20.55",
                        "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        "Status": "пауза",
                        "OperationalDuration": 0
                    }]
            }, {
                "SkusID": "12226bea-3b65-11ee-8c44-00505681f37b",
                "SkusFriendlyName": "КБСО2 ",
                "SkusSerial": "00000010442 80976",
                "Operations": [
                    {
                        "OperationNumber": 4,
                        "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                        "OperationHumanName": "Упаковка (Армирование)",
                        "DateOfChange": "27.10.2023 13.20.55",
                        "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        "Status": "Сформировано",
                        "OperationalDuration": 0
                    },
                    {
                    "OperationNumber": 1,
                    "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                    "OperationHumanName": "Маркировка кабеля (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "Сформировано",
                    "OperationalDuration": 0
                }, {
                    "OperationNumber": 2,
                    "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                    "OperationHumanName": "Сдача ОТК (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "Сформировано",
                    "OperationalDuration": 0
                }, {
                    "OperationNumber": 3,
                    "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                    "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                    "DateOfChange": "27.10.2023 13.20.55",
                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                    "Status": "начато",
                    "OperationalDuration": 0
                }, ]
            },
            ]
        },
            {
                "BoxSerial": "00000010442 9990", "ClientOrder": "1985/Ц   ", "Skus": [{
                    "SkusID": "12226bea-3b65-11ee-8c44-00505681f37b",
                    "SkusFriendlyName": "КБСО  ",
                    "SkusSerial": "00000010442 989891",
                    "Operations": [
                        {
                            "OperationNumber": 3,
                            "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                            "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                            "DateOfChange": "27.10.2023 13.20.55",
                            "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                            "Status": "Сформировано",
                            "OperationalDuration": 0
                        },
                        {
                            "OperationNumber": 1,
                            "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                            "OperationHumanName": "Маркировка кабеля (Армирование)",
                            "DateOfChange": "27.10.2023 13.20.55",
                            "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                            "Status": "Сформировано",
                            "OperationalDuration": 0
                        },  {
                            "OperationNumber": 4,
                            "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                            "OperationHumanName": "Упаковка (Армирование)",
                            "DateOfChange": "27.10.2023 13.20.55",
                            "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                            "Status": "Пауза",
                            "OperationalDuration": 0
                        },
                        {
                            "OperationNumber": 2,
                            "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                            "OperationHumanName": "Сдача ОТК (Армирование)",
                            "DateOfChange": "27.10.2023 13.20.55",
                            "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                            "Status": "пауза",
                            "OperationalDuration": 0
                        }]
                }, {
                    "SkusID": "12226bea-3b65-11ee-8c44-00505681f37b",
                    "SkusFriendlyName": "КБСО2 ",
                    "SkusSerial": "00000010442 80976",
                    "Operations": [
                        {
                            "OperationNumber": 4,
                            "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                            "OperationHumanName": "Упаковка (Армирование)",
                            "DateOfChange": "27.10.2023 13.20.55",
                            "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                            "Status": "Сформировано",
                            "OperationalDuration": 0
                        },
                        {
                            "OperationNumber": 1,
                            "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                            "OperationHumanName": "Маркировка кабеля (Армирование)",
                            "DateOfChange": "27.10.2023 13.20.55",
                            "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                            "Status": "Сформировано",
                            "OperationalDuration": 0
                        }, {
                            "OperationNumber": 2,
                            "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                            "OperationHumanName": "Сдача ОТК (Армирование)",
                            "DateOfChange": "27.10.2023 13.20.55",
                            "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                            "Status": "Сформировано",
                            "OperationalDuration": 0
                        }, {
                            "OperationNumber": 3,
                            "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                            "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                            "DateOfChange": "27.10.2023 13.20.55",
                            "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                            "Status": "начато",
                            "OperationalDuration": 0
                        }, ]
                },
                ]
            },


        ]
    }]
}

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
        let tem_time =  this._getTimeElapsedSinceLastStart();
        this.overallTime = this.overallTime + Math.round((tem_time / length)/1000);

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

let isProduction = false
let mainUrl = ""
let mainUrlMicroParti = ""

if (!isProduction) {
    mainUrl = "http://localhost:5103/api/"
    mainUrlMicroParti = "http://127.0.0.1:3000/micro"
} else {
    mainUrl = "https://prod.centervospi.ru:444/api/"
    mainUrlMicroParti = "http://127.0.0.1:3000/micro"
}

//отслеживает есть ли сортировка
document.querySelector('#selectedChoose').addEventListener('change', function (e) {
    selectionChoose = e.target.value
    handlerControlLoadingSkusSerial()
    deleteElems(document.querySelectorAll('.html_box')) //нельзя вынести переменную
    handlerBoxSerial()//запускаем заново отрисовку в соответствии с параметрами сортировки
})

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

    let list = document.querySelector('.gallery_list_box');
    let listElems = document.querySelectorAll('.htm_box');

    let position = 0; // положение ленты прокрутки

    document.querySelector('.prev_box').onclick = function () {
        // сдвиг влево
        position += width * count;
        // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
        position = Math.min(position, 0)
        // position = Math.max(position, -width * (listElems.length - count));

        list.style.marginLeft = position + 'px';
    };

    document.querySelector('.next_box').onclick = function () {
        // сдвиг вправо
        position -= width * count;
        // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
        // position = Math.min(position, 0)
        position = Math.max(position, +width * (listElems.length - count));
        list.style.marginLeft = position + 'px';
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
        }
        if (document.getElementById(itemId.itemStatusId).textContent.toLowerCase() == 'начато') {
            addClassList(document.getElementById(itemId.itemButtonBegin), 'hidden')
        }
        if (document.getElementById(itemId.itemStatusId).textContent.toLowerCase() == 'пауза') {
            document.getElementById(itemId.itemButtonPause).textContent = ('Продолжить')
            document.getElementById(itemId.itemButtonPause).style.opacity = '0.6'
            addClassList(document.getElementById(itemId.itemButtonBegin), 'hidden')
            addClassList(document.getElementById(itemId.itemButtonFinish), 'hidden')
        }
        if (document.getElementById(itemId.itemStatusId).textContent.toLowerCase() == 'закончено') {
            deleteClassList(document.getElementById(itemId.itemButtonBegin), 'hidden')
            addClassList(document.getElementById(itemId.itemButtonFinish), 'hidden')
            addClassList(document.getElementById(itemId.itemButtonPause), 'hidden')
        }
    })
}

//функция скрывает ненужные кнопки и показывает нужные при клике на кнопки
const handlerSearchButtons = (InOperationNumber, SkusSerial, OperationNumber) => {
    if (document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent.toLowerCase() == 'начато') {
        addClassList(document.getElementById(`${InOperationNumber}begin${SkusSerial}`), 'hidden')
        deleteClassList(document.getElementById(`${InOperationNumber}finish${SkusSerial}`), 'hidden')
        deleteClassList(document.getElementById(`${InOperationNumber}pause${SkusSerial}`), 'hidden')
    }
    if (document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent.toLowerCase() == 'пауза') {
        document.getElementById(`${InOperationNumber}pause${SkusSerial}`).textContent = ('Продолжить')
        document.getElementById(`${InOperationNumber}pause${SkusSerial}`).style.opacity = '0.6'
        addClassList(document.getElementById(`${InOperationNumber}begin${SkusSerial}`), 'hidden')
        addClassList(document.getElementById(`${InOperationNumber}finish${SkusSerial}`), 'hidden')
    }
    if (document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent.toLowerCase() == 'закончено') {
        deleteClassList(document.getElementById(`${InOperationNumber}begin${SkusSerial}`), 'hidden')
        addClassList(document.getElementById(`${InOperationNumber}finish${SkusSerial}`), 'hidden')
        addClassList(document.getElementById(`${InOperationNumber}pause${SkusSerial}`), 'hidden')
    }
}

//модальное окно с ошибкой
const htmlModalWindow = (headText, text, serialControl) => {
    let htmlModal = (`
  <div class="modal-win" >
      <div class="modal-dialog">
        <h2 class="text-center mb-1">${headText}</h2>
      </div>
      <div class="">
        <p>${text}</p>
        <p>${serialControl}</p>
      </div>
      <div class="text-end " >
        <button type="button" class="btn btn-secondary " onclick="deleteElems(document.querySelectorAll('.modal-win'))">Закрыть</button>
      </div>
  </div>

    `)
    document.body.insertAdjacentHTML('afterbegin', htmlModal)
}

const handlerControlMapTimeAndButton = (BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber, length) => {
    if (num === 1) {
        document.getElementById(`${InOperationNumber}status${SkusSerial}`).innerHTML = ('Начато')
        handlerSearchTimerMap(SkusSerial, BoxSerial, InOperationNumber, OperationNumber, checkBoxItemSkusSerial, true, length)
        handlerSearchButtons(InOperationNumber, SkusSerial, OperationNumber)

    }
    if(num === 2){
                document.getElementById(`${InOperationNumber}pause${SkusSerial}`).textContent = ('Продолжить')
                document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Пауза')
                handlerSearchTimerMap(SkusSerial, BoxSerial, InOperationNumber, OperationNumber, checkBoxItemSkusSerial, false, length)
                handlerSearchButtons(InOperationNumber, SkusSerial, OperationNumber)
                let some = GlobalTimer.allTimers.get(SkusSerial).get(Number(OperationNumber)).getTime();
                console.log(Math.round(some / 1000));
                console.log(num, 'pause')
    }
    if(num === 1985){
                document.getElementById(`${InOperationNumber}pause${SkusSerial}`).textContent = ('Пауза')
                document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Начато')
                handlerSearchTimerMap(SkusSerial, BoxSerial, InOperationNumber, OperationNumber, checkBoxItemSkusSerial, true, length)
                handlerSearchButtons(InOperationNumber, SkusSerial, OperationNumber)
    }

    if (num === 3) {
        document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Закончено')
        handlerSearchTimerMap(SkusSerial, BoxSerial, InOperationNumber, OperationNumber, checkBoxItemSkusSerial, false, length)
        console.log(GlobalTimer.allTimers.get(SkusSerial).get(Number(OperationNumber)).getTime() / 1000)
        handlerSearchButtons(InOperationNumber, SkusSerial, OperationNumber)
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

//создаем кнопки серий
const htmlButtonSkusSerial = (itemSkusSerial, itemBoxSerial, itemSkusFriendlyName) => {
    let htmlButton = (`<li  class="liButton "  id =''>
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
                <button class=" btn btn_carousel btnIn btnSBoxSerial" id ='${itemBoxSerial}' onclick="handlerBoxSkusSerial('${itemBoxSerial}')">${itemBoxSerial}</button>
                </li>`)
    listGalleryBox.insertAdjacentHTML('afterbegin', htmlBox)
}
// функция перводит микропартию в объект json
const createJsonForBackend = (micropartions) => {
    let raw_for_json = [];
    micropartions.forEach(function (value, key, map) {
        // key - это micropartion_guid
        let object = new Object();
        object['MicropartionGuid'] = key;
        object['Box'] = new Object();
        // key - это box_serial
        value.forEach(function (value_2, key_2, map_2) {
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
        })

        raw_for_json.push(object)
    })
    const mapToJson = JSON.stringify(raw_for_json);
    return mapToJson;
}

// функция переводит микропартию из json
const createParseJsonForFront = (micropartions) => {
    // micropartions.forEach(item => {
    //     let arrayIn = []
    //     let micropartionsGuid = item.MicropartionGuid
    //     let micropartionsBox = item.Box.BoxSerial
    //     microPartions_global.set(item.MicropartionGuid, new Map())
    //     microPartions_global.get(item.MicropartionGuid).set(item.Box.BoxSerial, new Map());
    //     item.Box.Skus.forEach(itemIn => {
    //         microPartions_global.get(item.MicropartionGuid).get(item.Box.BoxSerial).set(itemIn.SkuSerial, new Map());
    //         microPartions_global.get(item.MicropartionGuid).get(item.Box.BoxSerial).get(itemIn.SkuSerial).set(itemIn.PartionOperations.OperationGuid, itemIn.PartionOperations.OperationNumber);
    //         console.log(microPartions_global)
    //
    //     })
    // })
    for (let key in micropartions) {
        let micropartionsGuid = key
        // console.log(micropartions[key])
        let micropartionsBox = micropartions[key].BoxSerial
        // console.log(micropartionsGuid,micropartionsBox )
        microPartions_global.set(key, new Map())
        microPartions_global.get(key).set(micropartions[key].BoxSerial, new Map());
        micropartions[key].Skus.forEach( itemSkus=>{
            // console.log(itemSkus.SkusSerial)
            microPartions_global.get(key).get(micropartions[key].BoxSerial).set(itemSkus.SkusSerial, new Map());
                itemSkus.PartionOperations.forEach( itemOperatios =>{
                    // console.log(itemOperatios.OperationGuid, itemOperatios.OpertionNumber)
                    microPartions_global.get(key).get(micropartions[key].BoxSerial).get(itemSkus.SkusSerial,).set(itemOperatios.OperationGuid, itemOperatios.OpertionNumber);
                })
            })

    }
    console.log(microPartions_global)

}

//отправка всего в 1с
function handlerSendAllDataBase() {
    let dateTimeButton = new Date()
    // dateTimeButton = dateTimeButton.toLocaleTimeString()
    let hours =dateTimeButton.getHours()
    let minutes=dateTimeButton.getMinutes()
    buttonSendTime.textContent = `Отправлено ${hours}:${minutes}`
    // buttonSendTime.textContent = `Отправлено ${dateTimeButton}`
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
    if(microPartions_global.size>0){
        let mapToJson = createJsonForBackend(microPartions_global)
        let requestOptionsMapMicropartion = {
            method: 'POST',
            headers: myHeaders,
            body: mapToJson,
            redirect: 'follow'
        };
        fetch(mainUrlMicroParti, requestOptionsMapMicropartion)
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
                                    dataBaseAll.ActionNumber = num
                                    dataBaseAll.OperationNumber = parseInt(itemNumOperationsStatus.OperationNumber)
                                    dataBaseAll.CheckBox = checkBox
                                    dataBaseAll.DateNow = data.toISOString()
                                    dataBaseAll.OperationalDuration = GlobalTimer.allTimers.get(itemCheckBoxSkusSerial.SkusSerial).get(Number(itemNumOperationsStatus.OperationNumber)).getTime()
                                    dataBase.push(dataBaseAll)
                                    console.log(dataBase)
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

//гениратор id для микропартии

function microPartionSerialCodeGenerator() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}

// функция создает микропартию

function create_new_micropartion(main_micropartion_object, micropartion_guid, sku_serials_array, box_serial, operation_guid, operation_number) {
    main_micropartion_object.set(micropartion_guid, new Map());
    let start = true
    sku_serials_array.forEach(serial => {
        if (start) {
            main_micropartion_object.get(micropartion_guid).set(box_serial, new Map());
            start = false;
        }
        main_micropartion_object.get(micropartion_guid).get(box_serial).set(serial, new Map());
        main_micropartion_object.get(micropartion_guid).get(box_serial).get(serial).set(operation_guid, operation_number);
    });
    console.log(microPartions_global)
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
    for (let x = 0; x < allOperationsArray.length; x++) {
        if (check_do_we_have_micropartion_with_this_operation(microPartions_global, allOperationsArray[x][0], allOperationsArray[x][1], allOperationsArray[x][2], allOperationsArray[x][3])) {
            let guid = get_micropartion_guid(microPartions_global, allOperationsArray[x][0], allOperationsArray[x][1], allOperationsArray[x][2], allOperationsArray[x][3]);
            currentMicropartion = guid;
            allMicropartionsGuidsForControll.push(guid);
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
            handlerControlMapTimeAndButton(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber, allOperationsArray.length)
            handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num, InOperationNumber)
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
                                <tbody class="control_table " id="${SkusSerial}"  >
                                <tr  class="tr_table" id="" >
                                   <td class="m-1 " id="numOperation">${itemSkusSerial.Operations[i].OperationNumber}</td>
                                     <td>${itemSkusSerial.Operations[i].OperationHumanName}</td>
                                     <td id="${itemSkusSerial.Operations[i].OperationNumber}status${SkusSerial}" class="${itemSkusSerial.Operations[i].OperationNumber}status">${itemSkusSerial.Operations[i].Status}</td>
                                   <td id="${itemSkusSerial.Operations[i].Status}">
                                     <button type="button"  class="btn btnBegin btnIn" id="${itemSkusSerial.Operations[i].OperationNumber}begin${SkusSerial}" onclick="handlerSendInLocal('${SkusSerial}','${item.WcGuid}','${BoxSerial}','${itemSkusSerial.Operations[i].Operation}',1,'${itemSkusSerial.Operations[i].Status}','${itemSkusSerial.Operations[i].OperationNumber}','${itemSkusSerial.Operations[i].OperationNumber}',
                                     document.getElementById('${itemSkusSerial.Operations[i].OperationNumber}status${SkusSerial}').textContent)"><i class="far fa-eye"></i>Начать</button>
                                     <button type="button"  class="btn btnPause btnIn" id="${itemSkusSerial.Operations[i].OperationNumber}pause${SkusSerial}" onclick="handlerSendInLocal('${SkusSerial}','${item.WcGuid}','${BoxSerial}','${itemSkusSerial.Operations[i].Operation}',2,'${itemSkusSerial.Operations[i].Status}','${itemSkusSerial.Operations[i].OperationNumber}','${itemSkusSerial.Operations[i].OperationNumber}',document.getElementById('${itemSkusSerial.Operations[i].OperationNumber}status${SkusSerial}').textContent)"><i class="fas fa-edit"></i>Пауза</button>
                                     <button type="button"  class="btn btnFinish btnIn" id="${itemSkusSerial.Operations[i].OperationNumber}finish${SkusSerial}" onclick="handlerSendInLocal('${SkusSerial}','${item.WcGuid}','${BoxSerial}','${itemSkusSerial.Operations[i].Operation}',3,'${itemSkusSerial.Operations[i].Status}','${itemSkusSerial.Operations[i].OperationNumber}','${itemSkusSerial.Operations[i].OperationNumber}',document.getElementById('${itemSkusSerial.Operations[i].OperationNumber}status${SkusSerial}').textContent)"><i class="far fa-trash-alt"></i>Закончить</button>
                                   </td>
                                </tr>
                                </tbody>`)
                            document.querySelector('.header_control').insertAdjacentHTML('afterend', table)
                            let buttonsIn = {
                                itemStatusId: `${itemSkusSerial.Operations[i].OperationNumber}status${SkusSerial}`,
                                itemButtonBegin: `${itemSkusSerial.Operations[i].OperationNumber}begin${SkusSerial}`,
                                itemButtonPause: `${itemSkusSerial.Operations[i].OperationNumber}pause${SkusSerial}`,
                                itemButtonFinish: `${itemSkusSerial.Operations[i].OperationNumber}finish${SkusSerial}`
                            }
                            allButtonsIn.push(buttonsIn)
                            handlerButtonHidden(allButtonsIn)
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


// функция отвечает за кокретный выбор серии по галкам
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


//запуск всех функций
function axiosLogin() {
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

    let requestOptionsMicroPartion = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(mainUrl + "geterp", requestOptions)
        .then(response => response.json())
        .then(function (result) {
            localData = result
            handlerAddObject()
            handlerSkusSerial()
            setTimeout(handlerBoxSerial, 1000)
        })
        .catch(error => console.log('error', error));

    fetch(`${mainUrlMicroParti}?=${param.get('id')}`, requestOptionsMicroPartion)
        .then(response => response.json())
        .then(function (result) {
            if(result.length>0){
                createParseJsonForFront(result)
            }

        })
        .catch(error => console.log('error', error))

}

function handlerSortOperationNumber(){
    localData.OperationsLists.find(itemBox => {
        itemBox.Boxes.find(itemSkusSerial => {
            itemSkusSerial.Skus.find(itemOperations=>{
                itemOperations.Operations.sort((a,b)=>{
                    return a.OperationNumber - b.OperationNumber
                })
            })

        })

    })
}

handlerSkusSerial()
GlobalTimer = new TimerManeger(allDataAboutOperations);
handlerSortOperationNumber()
setTimeout(handlerBoxSerial, 1000)
// handlerAddObject()
// axiosLogin()
createParseJsonForFront(micropartions)
slideCarouselBox()


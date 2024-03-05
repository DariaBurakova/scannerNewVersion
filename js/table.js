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
let checkBoxItemSkusSerial=[]
let allSkusSerialItem = []
let checkBoxItem=0
let countButtonSkusSerial = false
let buttonPrevSkusSerial = ''
let countButton = false
let buttonPrev = ''
let GlobalTimer;
let allDataAboutOperations = new Map();
// БДА 2023-11-06 Массив, который отсылается в мидлэнд со всеми нажатиями
let localData = {
    "OperationsLists": [
        {
            "WcGuid": "1d09989e-a9dc-11ec-8c0f-00505681efea",
            "Boxes": [
                {
                    "BoxSerial": "00000010442 02308",
                    "ClientOrder": "270-23/Ц   ",
                    "Skus": [
                        {
                            "SkusID": "12226bea-3b65-11ee-8c44-00505681f37b",
                            "SkusFriendlyName": "КБСО - -3,0ESFC2Л ΔL\u003d+0,03м ",
                            "SkusSerial": "00000010442 023081",
                            "Operations": [
                                {
                                    "OperationNumber": 13,
                                    "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Маркировка кабеля (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "Сформировано",
                                    "OperationalDuration": 665,
                                },
                                {
                                    "OperationNumber": 14,
                                    "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Сдача ОТК (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "пауза",
                                    "OperationalDuration": 66614
                                },
                                {
                                    "OperationNumber": 15,
                                    "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                                    "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "начато",
                                    "OperationalDuration": 66619
                                },
                                {
                                    "OperationNumber": 16,
                                    "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Упаковка (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "начато",
                                    "OperationalDuration": 6668
                                }
                            ]
                        },
                        {
                            "SkusID": "12226bea-3b65-11ee-8c44-00505681f37bc",
                            "SkusFriendlyName": "КБСО - -3,0ESFC2Л ΔL\u003d+0,03м ",
                            "SkusSerial": "00000010442 023082",
                            "Operations": [
                                {
                                    "OperationNumber": 29,
                                    "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Маркировка кабеля (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "Сформировано",
                                    "OperationalDuration": 454
                                },
                                {
                                    "OperationNumber": 30,
                                    "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Сдача ОТК (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "Сформировано",
                                    "OperationalDuration": 457
                                },
                                {
                                    "OperationNumber": 31,
                                    "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                                    "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "Сформировано",
                                    "OperationalDuration": 455,
                                },
                                {
                                    "OperationNumber": 32,
                                    "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Упаковка (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "начато",
                                    "OperationalDuration": 454
                                }
                            ]
                        },
                        {
                            "SkusID": "12226bea-3b65-11ee-8c44-00505681f37b7",
                            "SkusFriendlyName": "КБСО - -3,0ESFC2Л ΔL\u003d+0,03м ",
                            "SkusSerial": "00000010442 023083",
                            "Operations": [
                                {
                                    "OperationNumber": 45,
                                    "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Маркировка кабеля (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "Сформировано",
                                    "OperationalDuration": 453
                                },
                                {
                                    "OperationNumber": 46,
                                    "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Сдача ОТК (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "Сформировано",
                                    "OperationalDuration": 457,
                                },
                                {
                                    "OperationNumber": 47,
                                    "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                                    "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "Сформировано",
                                    "OperationalDuration": 422
                                },
                                {
                                    "OperationNumber": 48,
                                    "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Упаковка (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "Сформировано",
                                    "OperationalDuration": 411
                                }
                            ]
                        },
                        // {
                        //     "SkusID": "12226bea-3b65-11ee-8c44-00505681f37b",
                        //     "SkusFriendlyName": "КБСО - -3,0ESFC2Л ΔL\u003d+0,03м ",
                        //     "SkusSerial": "00000010442 023084",
                        //     "Operations": [
                        //         {
                        //             "OperationNumber": 61,
                        //             "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                        //             "OperationHumanName": "Маркировка кабеля (Армирование)",
                        //             "DateOfChange": "27.10.2023 13.20.55",
                        //             "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        //             "Status": "Сформировано"
                        //         },
                        //         {
                        //             "OperationNumber": 62,
                        //             "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                        //             "OperationHumanName": "Сдача ОТК (Армирование)",
                        //             "DateOfChange": "27.10.2023 13.20.55",
                        //             "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        //             "Status": "Сформировано"
                        //         },
                        //         {
                        //             "OperationNumber": 63,
                        //             "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                        //             "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                        //             "DateOfChange": "27.10.2023 13.20.55",
                        //             "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        //             "Status": "Сформировано"
                        //         },
                        //         {
                        //             "OperationNumber": 64,
                        //             "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                        //             "OperationHumanName": "Упаковка (Армирование)",
                        //             "DateOfChange": "27.10.2023 13.20.55",
                        //             "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        //             "Status": "Сформировано"
                        //         }
                        //     ]
                        // }
                    ]
                },
                {
                    "BoxSerial": "00000010442 9999",
                    "ClientOrder": "1985/Ц   ",
                    "Skus": [
                        {
                            "SkusID": "12226bea-3b65-11ee-8c44-00505681f37b",
                            "SkusFriendlyName": "КБСО  ",
                            "SkusSerial": "00000010442 989891",
                            "Operations": [
                                {
                                    "OperationNumber": 54,
                                    "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Маркировка кабеля (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "Сформировано",
                                    "OperationalDuration": 454
                                },
                                {
                                    "OperationNumber": 53,
                                    "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Сдача ОТК (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "пауза",
                                    "OperationalDuration": 454
                                },
                                {
                                    "OperationNumber": 52,
                                    "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                                    "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "Сформировано",
                                    "OperationalDuration": 454
                                },
                                {
                                    "OperationNumber": 234,
                                    "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Упаковка (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "Пауза",
                                    "OperationalDuration": 454
                                }
                            ]
                        },
                        {
                            "SkusID": "12226bea-3b65-11ee-8c44-00505681f37b",
                            "SkusFriendlyName": "КБСО2 ",
                            "SkusSerial": "00000010442 80976",
                            "Operations": [
                                {
                                    "OperationNumber": 675,
                                    "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Маркировка кабеля (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "Сформировано",
                                    "OperationalDuration": 454
                                },
                                {
                                    "OperationNumber": 676,
                                    "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Сдача ОТК (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "Сформировано",
                                    "OperationalDuration": 454
                                },
                                {
                                    "OperationNumber": 678,
                                    "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                                    "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "начато",
                                    "OperationalDuration": 454
                                },
                                {
                                    "OperationNumber": 679,
                                    "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                                    "OperationHumanName": "Упаковка (Армирование)",
                                    "DateOfChange": "27.10.2023 13.20.55",
                                    "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                                    "Status": "Сформировано",
                                    "OperationalDuration": 454
                                }
                            ]
                        },
                        // {
                        //     "SkusID": "12226bea-3b65-11ee-8c44-00505681f37b",
                        //     "SkusFriendlyName": "КБСО3",
                        //     "SkusSerial": "00000010442 9564321",
                        //     "Operations": [
                        //         {
                        //             "OperationNumber": 45,
                        //             "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                        //             "OperationHumanName": "Маркировка кабеля (Армирование)",
                        //             "DateOfChange": "27.10.2023 13.20.55",
                        //             "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        //             "Status": "Сформировано"
                        //         },
                        //         {
                        //             "OperationNumber": 46,
                        //             "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                        //             "OperationHumanName": "Сдача ОТК (Армирование)",
                        //             "DateOfChange": "27.10.2023 13.20.55",
                        //             "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        //             "Status": "Сформировано"
                        //         },
                        //         {
                        //             "OperationNumber": 47,
                        //             "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                        //             "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                        //             "DateOfChange": "27.10.2023 13.20.55",
                        //             "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        //             "Status": "Сформировано"
                        //         },
                        //         {
                        //             "OperationNumber": 48,
                        //             "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                        //             "OperationHumanName": "Упаковка (Армирование)",
                        //             "DateOfChange": "27.10.2023 13.20.55",
                        //             "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        //             "Status": "Сформировано"
                        //         }
                        //     ]
                        // },
                        // {
                        //     "SkusID": "12226bea-3b65-11ee-8c44-00505681f37b",
                        //     "SkusFriendlyName": "КБСО4 ",
                        //     "SkusSerial": "00000010442 0000876543",
                        //     "Operations": [
                        //         {
                        //             "OperationNumber": 61,
                        //             "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                        //             "OperationHumanName": "Маркировка кабеля (Армирование)",
                        //             "DateOfChange": "27.10.2023 13.20.55",
                        //             "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        //             "Status": "Пауза"
                        //         },
                        //         {
                        //             "OperationNumber": 62,
                        //             "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                        //             "OperationHumanName": "Сдача ОТК (Армирование)",
                        //             "DateOfChange": "27.10.2023 13.20.55",
                        //             "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        //             "Status": "Сформировано"
                        //         },
                        //         {
                        //             "OperationNumber": 63,
                        //             "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                        //             "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                        //             "DateOfChange": "27.10.2023 13.20.55",
                        //             "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        //             "Status": "Сформировано"
                        //         },
                        //         {
                        //             "OperationNumber": 64,
                        //             "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                        //             "OperationHumanName": "Упаковка (Армирование)",
                        //             "DateOfChange": "27.10.2023 13.20.55",
                        //             "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                        //             "Status": "Сформировано"
                        //         }
                        //     ]
                        // }
                    ]
                },
                // {
                //     "BoxSerial": "00000003292 02304",
                //     "ClientOrder": "147-23/Ц   ",
                //     "Skus": [
                //         {
                //             "SkusID": "b4c7d695-640e-11e8-a80c-74d02b97bd04",
                //             "SkusFriendlyName": "КБСО - -20,0GL ΔL\u003d+0,1м",
                //             "SkusSerial": "00000003292 023041",
                //             "Operations": [
                //                 {
                //                     "OperationNumber": 1,
                //                     "Operation": "0ce82e67-72d4-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Заготовительная (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 2,
                //                     "Operation": "5bc0d294-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Разделка кабеля (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Начато"
                //                 },
                //                 {
                //                     "OperationNumber": 3,
                //                     "Operation": "abcd8e61-72d0-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Установка опор и пружин оптических контактов на кабель (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 4,
                //                     "Operation": "751733bc-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Разделка концов кабеля по трафарету (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 5,
                //                     "Operation": "d24c3eee-52e4-11ea-8854-0c9d925bfc99",
                //                     "OperationHumanName": "Вклейка феррул (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 6,
                //                     "Operation": "8d54089e-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Сушка (Армирование) (чел)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 7,
                //                     "Operation": "66d826e6-c337-11ed-8c3b-00505681f37b",
                //                     "OperationHumanName": "Сушка (Армирование) (маш)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 8,
                //                     "Operation": "ac142012-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Скалывание волокна (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 9,
                //                     "Operation": "ce1cf907-72ce-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Контроль прочности вклейки контактов (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 10,
                //                     "Operation": "0158b552-52e5-11ea-8854-0c9d925bfc99",
                //                     "OperationHumanName": "Полировка оптических коннекторов (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 11,
                //                     "Operation": "ce1cf908-72ce-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Контроль качества торца ОВ (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 12,
                //                     "Operation": "bef78d96-52e5-11ea-8854-0c9d925bfc99",
                //                     "OperationHumanName": "Контроль затухания (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 13,
                //                     "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Маркировка кабеля (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 14,
                //                     "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Сдача ОТК (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 15,
                //                     "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 16,
                //                     "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Упаковка (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 }
                //             ]
                //         },
                //         {
                //             "SkusID": "b4c7d695-640e-11e8-a80c-74d02b97bd04",
                //             "SkusFriendlyName": "КБСО - -20,0GL ΔL\u003d+0,1м",
                //             "SkusSerial": "00000003292 023042",
                //             "Operations": [
                //                 {
                //                     "OperationNumber": 17,
                //                     "Operation": "0ce82e67-72d4-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Заготовительная (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 18,
                //                     "Operation": "5bc0d294-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Разделка кабеля (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 19,
                //                     "Operation": "abcd8e61-72d0-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Установка опор и пружин оптических контактов на кабель (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 20,
                //                     "Operation": "751733bc-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Разделка концов кабеля по трафарету (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 21,
                //                     "Operation": "d24c3eee-52e4-11ea-8854-0c9d925bfc99",
                //                     "OperationHumanName": "Вклейка феррул (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 22,
                //                     "Operation": "8d54089e-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Сушка (Армирование) (чел)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 23,
                //                     "Operation": "66d826e6-c337-11ed-8c3b-00505681f37b",
                //                     "OperationHumanName": "Сушка (Армирование) (маш)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 24,
                //                     "Operation": "ac142012-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Скалывание волокна (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 25,
                //                     "Operation": "ce1cf907-72ce-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Контроль прочности вклейки контактов (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 26,
                //                     "Operation": "0158b552-52e5-11ea-8854-0c9d925bfc99",
                //                     "OperationHumanName": "Полировка оптических коннекторов (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 27,
                //                     "Operation": "ce1cf908-72ce-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Контроль качества торца ОВ (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 28,
                //                     "Operation": "bef78d96-52e5-11ea-8854-0c9d925bfc99",
                //                     "OperationHumanName": "Контроль затухания (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 29,
                //                     "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Маркировка кабеля (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 30,
                //                     "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Сдача ОТК (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 31,
                //                     "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 32,
                //                     "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Упаковка (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 }
                //             ]
                //         },
                //         {
                //             "SkusID": "b4c7d695-640e-11e8-a80c-74d02b97bd04",
                //             "SkusFriendlyName": "КБСО - -20,0GL ΔL\u003d+0,1м",
                //             "SkusSerial": "00000003292 023043",
                //             "Operations": [
                //                 {
                //                     "OperationNumber": 33,
                //                     "Operation": "0ce82e67-72d4-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Заготовительная (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 34,
                //                     "Operation": "5bc0d294-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Разделка кабеля (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 35,
                //                     "Operation": "abcd8e61-72d0-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Установка опор и пружин оптических контактов на кабель (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 36,
                //                     "Operation": "751733bc-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Разделка концов кабеля по трафарету (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 37,
                //                     "Operation": "d24c3eee-52e4-11ea-8854-0c9d925bfc99",
                //                     "OperationHumanName": "Вклейка феррул (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 38,
                //                     "Operation": "8d54089e-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Сушка (Армирование) (чел)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 39,
                //                     "Operation": "66d826e6-c337-11ed-8c3b-00505681f37b",
                //                     "OperationHumanName": "Сушка (Армирование) (маш)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 40,
                //                     "Operation": "ac142012-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Скалывание волокна (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 41,
                //                     "Operation": "ce1cf907-72ce-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Контроль прочности вклейки контактов (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 42,
                //                     "Operation": "0158b552-52e5-11ea-8854-0c9d925bfc99",
                //                     "OperationHumanName": "Полировка оптических коннекторов (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 43,
                //                     "Operation": "ce1cf908-72ce-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Контроль качества торца ОВ (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 44,
                //                     "Operation": "bef78d96-52e5-11ea-8854-0c9d925bfc99",
                //                     "OperationHumanName": "Контроль затухания (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 45,
                //                     "Operation": "55cf64f2-6b04-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Маркировка кабеля (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 46,
                //                     "Operation": "c2c5fb0e-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Сдача ОТК (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 47,
                //                     "Operation": "8541472a-72d0-11ec-8c01-00505681efea",
                //                     "OperationHumanName": "Приёмо-сдаточные испытания и оформление документации (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 },
                //                 {
                //                     "OperationNumber": 48,
                //                     "Operation": "e1e19658-6aff-11ed-8c34-00505681efea",
                //                     "OperationHumanName": "Упаковка (Армирование)",
                //                     "DateOfChange": "27.10.2023 13.20.55",
                //                     "RealExecutor": "Рабочий стол 3 (Сапрыкин)",
                //                     "Status": "Сформировано"
                //                 }
                //             ]
                //         },
                //
                //
                //     ]
                // },

            ]
        }
    ]
}

class TimerManeger {
    constructor(allSkuSerialsArray) {
        this.allTimers = allSkuSerialsArray;
    }

    // startOrStop - булево
    changeTimerState(skuserial, operationNumber, startOrStop) {
        if (this.allTimers.get(skuserial).has(operationNumber)) {
            if (startOrStop) {
                this.allTimers.get(skuserial).get(operationNumber).start();
            } else {
                this.allTimers.get(skuserial).get(operationNumber).stop();
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

    stop() {
        if (!this.isRunning) {
            return console.error('Таймер уже остановлен');
        }

        this.isRunning = false;

        this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
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

// TODO: вывыести на форму
let isProduction = false
let mainUrl = ""

// if (!isProduction) {
//     mainUrl = "http://localhost:5103/api/"
// } else {
//     mainUrl = "https://prod.centervospi.ru:444/api/"
// }

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
    for (let li of carouselBox.querySelectorAll('li')) {
        li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
        i++;
    }

    /* конфигурация */
    let width = 149; // ширина картинки
    let count = 4; // видимое количество изображений

    let list = carouselBox.querySelector('ul');
    let listElems = carouselBox.querySelectorAll('li');

    let position = 0; // положение ленты прокрутки

    carouselBox.querySelector('.prev_box').onclick = function () {
        // сдвиг влево
        position += width * count;
        // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
        position = Math.min(position, 0)
        // position = Math.max(position, -width * (listElems.length - count));

        list.style.marginLeft = position + 'px';
    };

    carouselBox.querySelector('.next_box').onclick = function () {
        // сдвиг вправо
        position -= width * count;
        // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
        position = Math.min(position, 0)
        // position = Math.max(position, -width * (listElems.length - count));
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
    checkBoxAll=0
    checkBoxItem=0
    checkBoxItemSkusSerial=[]
    allSkusSerialItem=[]
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
        if (document.getElementById(itemId.itemStatusId).textContent.toLowerCase() == 'начато' ) {
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
const handlerSearchButtons = (InOperationNumber,SkusSerial,OperationNumber) =>{
    if(document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent.toLowerCase() == 'начато' ){
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
const htmlModalWindow = (text,serialControl)=>{
    let htmlModal=(`
  <div class="modal-win" >
      <div class="modal-dialog">
        <h2 class="text-center mb-1">Ошибка в статусах</h2>
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
    document.body.insertAdjacentHTML('afterbegin',htmlModal)
}

//меняет предворительно статус при выборе всех или нескольких серий
const handlerChangeStatus=(BoxSerial, SkusSerial, textStatus,InOperationNumber)=>{
    localData.OperationsLists.find(itemBox=>{
        itemBox.Boxes.find(itemBoxSerial=>{
            if (itemBoxSerial.BoxSerial === BoxSerial){
                itemBoxSerial.Skus.find(itemSkusSerial=>{
                    if(itemSkusSerial.SkusSerial === SkusSerial){
                        itemSkusSerial.Operations.find(itemNumOperationsStatus=>{
                            if (itemNumOperationsStatus.InOperationNumber == InOperationNumber){
                                itemNumOperationsStatus.Status = textStatus
                            }
                        })
                    }
                })
            }
        })
    })
}

// данная функция нужна для работы коректной проверки контроля статуса
const handlerControlStatus=(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)=>{
    let errorsControl=[]
    let textControl="Невозможно изменить статус, ранее серия не была выбрана"
    let controlStatus=0
    if(num===2 || num===1985){
        if(checkBoxAll === 1){
            localData.OperationsLists.find(itemBox=>{
                itemBox.Boxes.find(itemBoxSerial=>{
                    if (itemBoxSerial.BoxSerial === BoxSerial){
                        itemBoxSerial.Skus.find(itemSkusSerial=>{
                            allSkusSerialItem.find(itemAllSkusSerialItem=>{
                                if (itemSkusSerial.SkusSerial == itemAllSkusSerialItem.SkusSerial){
                                    itemSkusSerial.Operations.find(itemNumOperationsStatus => {
                                        if (itemNumOperationsStatus.InOperationNumber == InOperationNumber){
                                            if(itemNumOperationsStatus.Status.toLowerCase() == 'сформировано' || itemNumOperationsStatus.Status.toLowerCase() == 'закончено'){
                                                allSkusSerialItem = allSkusSerialItem.filter(item => (item.SkusSerial !== itemSkusSerial.SkusSerial))
                                                controlStatus++
                                                errorsControl.push(itemSkusSerial.SkusSerial)
                                            }
                                        }
                                    })
                                }
                            })
                        })
                    }
                })
            })
            if(controlStatus>0){
                htmlModalWindow(textControl,errorsControl.join(' ,'))
                controlStatus=0
                errorsControl=[]
            }
            handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)
        }
        if(checkBoxItem > 0){
            localData.OperationsLists.find(itemBox=>{
                itemBox.Boxes.find(itemBoxSerial=>{
                    if (itemBoxSerial.BoxSerial === BoxSerial){
                        itemBoxSerial.Skus.find(itemSkusSerial=>{
                            checkBoxItemSkusSerial.find(itemAllSkusSerialItem=>{
                                if (itemSkusSerial.SkusSerial == itemAllSkusSerialItem.SkusSerial){
                                    itemSkusSerial.Operations.find(itemNumOperationsStatus => {
                                        if (itemNumOperationsStatus.InOperationNumber == InOperationNumber){
                                            if(itemNumOperationsStatus.Status.toLowerCase() == 'сформировано'  || itemNumOperationsStatus.Status.toLowerCase() == 'закончено'){
                                                checkBoxItemSkusSerial = checkBoxItemSkusSerial.filter(item => (item.SkusSerial !== itemSkusSerial.SkusSerial))
                                                controlStatus++
                                                errorsControl.push(itemSkusSerial.SkusSerial)
                                            }
                                        }
                                    })
                                }
                            })
                        })
                    }
                })
            })
            if(controlStatus>0){
                htmlModalWindow(textControl,errorsControl.join(' ,'))
                controlStatus=0
                errorsControl=[]
            }
            handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)
        }
    }
    if(num===3){
        if(checkBoxAll === 1){
            localData.OperationsLists.find(itemBox=>{
                itemBox.Boxes.find(itemBoxSerial=>{
                    if (itemBoxSerial.BoxSerial === BoxSerial){
                        itemBoxSerial.Skus.find(itemSkusSerial=>{
                            allSkusSerialItem.find(itemAllSkusSerialItem=>{
                                if (itemSkusSerial.SkusSerial == itemAllSkusSerialItem.SkusSerial){
                                    itemSkusSerial.Operations.find(itemNumOperationsStatus => {
                                        if (itemNumOperationsStatus.InOperationNumber == InOperationNumber){
                                            if(itemNumOperationsStatus.Status.toLowerCase() == 'сформировано'  || itemNumOperationsStatus.Status.toLowerCase() == 'пауза'){
                                                allSkusSerialItem = allSkusSerialItem.filter(item => (item.SkusSerial !== itemSkusSerial.SkusSerial))
                                                controlStatus++
                                                errorsControl.push(itemSkusSerial.SkusSerial)
                                            }
                                        }
                                    })
                                }
                            })
                        })
                    }
                })
            })
            if(controlStatus>0){
                htmlModalWindow(textControl,errorsControl.join(' ,'))
                controlStatus=0
                errorsControl=[]
            }
            handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)
        }
        if(checkBoxItem > 0){
            localData.OperationsLists.find(itemBox=>{
                itemBox.Boxes.find(itemBoxSerial=>{
                    if (itemBoxSerial.BoxSerial === BoxSerial){
                        itemBoxSerial.Skus.find(itemSkusSerial=>{
                            checkBoxItemSkusSerial.find(itemAllSkusSerialItem=>{
                                if (itemSkusSerial.SkusSerial == itemAllSkusSerialItem.SkusSerial){
                                    itemSkusSerial.Operations.find(itemNumOperationsStatus => {
                                        if (itemNumOperationsStatus.InOperationNumber == InOperationNumber){
                                            if(itemNumOperationsStatus.Status.toLowerCase() == 'сформировано'  || itemNumOperationsStatus.Status.toLowerCase() == 'пауза'){
                                                checkBoxItemSkusSerial = checkBoxItemSkusSerial.filter(item => (item.SkusSerial !== itemSkusSerial.SkusSerial))
                                                controlStatus++
                                                errorsControl.push(itemSkusSerial.SkusSerial)
                                            }
                                        }
                                    })
                                }
                            })
                        })
                    }
                })
            })
            if(controlStatus>0){
                htmlModalWindow(textControl,errorsControl.join(' ,'))
                controlStatus=0
                errorsControl=[]
            }
            handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)
        }
    }
}

//функция запускает и останавливает время у соответсвующих изделий
const handlerSearchTimerMap=(SkusSerial,BoxSerial,InOperationNumber,OperationNumber,aryName,startOrStop)=>{
    localData.OperationsLists.find(itemBox => {
        itemBox.Boxes.find(itemBoxSerial => {
            if(itemBoxSerial.BoxSerial === BoxSerial) {
                itemBoxSerial.Skus.find(itemSkusSerial => {
                    aryName.find(itemAllSkusSerialItem => {
                        if (itemAllSkusSerialItem.SkusSerial == itemSkusSerial.SkusSerial) {
                            itemSkusSerial.Operations.find(itemNumOperationsStatus => {
                                if (itemNumOperationsStatus.InOperationNumber == InOperationNumber) {
                                    GlobalTimer.changeTimerState(itemAllSkusSerialItem.SkusSerial, Number(itemNumOperationsStatus.OperationNumber), startOrStop)
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
    let htmlButton = (`<li  class="liButton list-group-item "  style="border: 1px solid #e9e9e9;" id =''>
                        <div class="d-flex ">
                        <button class="btn  m-1 btn-sm align-content-center btnIn btnSkusSerialIn" id ='${itemSkusSerial}' onclick="handlerShowTable('${itemBoxSerial}','${itemSkusSerial}'),handlerButtonSkusSerialStyle('${itemSkusSerial}')">${itemSkusFriendlyName}<br>${itemSkusSerial}</button>
                        <div class="d-flex flex-grow-1 justify-content-end" >
                        <div class="switch-btn checkButtonInput align-self-center  ${itemSkusSerial}" type="button"  id="${itemSkusSerial}flexCheckDefault" onclick="handlerInputCheck('${itemSkusSerial}')">
                        </div></div></li>`)
    // console.log(htmlButton)
    listGallery.insertAdjacentHTML('afterbegin', htmlButton)
    addClassList(listGallery, 'load')
}

//создаем боксы
const htmlBoxSerial = (itemBoxSerial, itemWcGuid, itemClientOrder) => {
    htmlBox = (`<li id='' class="html_box">
                <button class=" btn btn_carousel btnIn btnSBoxSerial" id ='${itemBoxSerial}' onclick="handlerBoxSkusSerial('${itemBoxSerial}')">${itemClientOrder}</button>
                </li>`)
    listGalleryBox.insertAdjacentHTML('afterbegin', htmlBox)
}

//отправка всего в 1с
function handlerSendAllDataBase() {
    let dateTimeButton = new Date()
    dateTimeButton = dateTimeButton.toLocaleTimeString()
    buttonSendTime.textContent = `${dateTimeButton}`
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify(dataBase);
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let pipe = function (send) {
        if (send) {
            send(raw)
            return false;
        }
    };
    let client = Stomp.client('ws://localhost:15674/ws');
    let print_first = pipe(function (data) {
        client.send('/topic/test', { "content-type": "text/plain" }, data);
        console.log(data)
    });
    // let on_connect = function (x) {
    //     id = client.subscribe("/topic/test", function (d) {
    //         print_first(d.body);
    //     });
    // };
    let on_error = function () {
        console.log('error');
    };
    client.connect('rmuser', 'rmpassword', on_connect, on_error, '/');
    // fetch(mainUrl + "changeFull", requestOptions)
    //     .then(response => response.json())
    //     .then(function (result) {
    //     })
    //     .catch(error => console.log('error', error));

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
        buttonPrevSkusSerial.style = "background-color: white;color:#0000CD ;box-shadow:none !important;"
        countButtonSkusSerial = false
        buttonPrevSkusSerial = buttonThisSkusSerial
    }

}

//функция меняет данные загруженные из 1с при клике на соответствующие кнопки
function handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber) {
    localData.OperationsLists.find(itemBox => {
        itemBox.Boxes.find(itemBoxSerial => {
            if (itemBoxSerial.BoxSerial === BoxSerial) {
                if (checkBoxItem > 0) {// если выбрано у нескольких серий
                    itemBoxSerial.Skus.find(itemSkusSerial => {
                        checkBoxItemSkusSerial.find(itemCheckBoxSkusSerial => {
                            if (itemSkusSerial.SkusSerial == itemCheckBoxSkusSerial.SkusSerial) {
                                itemSkusSerial.Operations.find(itemNumOperationsStatus => {
                                    if (itemNumOperationsStatus.InOperationNumber == InOperationNumber) {
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
                                        // console.log(dataBase)
                                        itemNumOperationsStatus.Status = textStatus
                                    }
                                })
                            }
                        })
                    })
                } else if (checkBoxAll === 1) {
                    itemBoxSerial.Skus.find(itemSkusSerial => {
                        allSkusSerialItem.find(itemAllSkusSerialItem => {
                            if (itemSkusSerial.SkusSerial == itemAllSkusSerialItem.SkusSerial) {
                                itemSkusSerial.Operations.find(itemNumOperationsStatus => {
                                    if (itemNumOperationsStatus.InOperationNumber == InOperationNumber) {
                                        let data = new Date()
                                        let dataBaseAll = new Object()
                                        dataBaseAll.WcGuid = WcGuid
                                        dataBaseAll.SkusSerial = itemAllSkusSerialItem.SkusSerial
                                        dataBaseAll.BoxSerial = BoxSerial
                                        dataBaseAll.Operation = itemNumOperationsStatus.Operation
                                        dataBaseAll.ActionNumber = num
                                        dataBaseAll.OperationNumber = parseInt(itemNumOperationsStatus.OperationNumber)
                                        dataBaseAll.CheckBox = checkBox
                                        dataBaseAll.DateNow = data.toISOString()
                                        dataBaseAll.OperationalDuration = GlobalTimer.allTimers.get(itemAllSkusSerialItem.SkusSerial).get(Number(itemNumOperationsStatus.OperationNumber)).getTime()
                                        dataBase.push(dataBaseAll)
                                        // console.log(dataBase)
                                        itemNumOperationsStatus.Status = textStatus
                                    }
                                })
                            }
                        })
                    })
                } else if (checkBoxAll === 0 && checkBoxItem === 0 ) {
                    itemBoxSerial.Skus.find(itemSkusSerial => {
                        if (itemSkusSerial.SkusSerial == SkusSerial) {
                            itemSkusSerial.Operations.find(itemOperationNumber => {
                                if (itemOperationNumber.InOperationNumber == InOperationNumber) {
                                    let data = new Date()
                                    let dataBaseAll = new Object()
                                    dataBaseAll.WcGuid = WcGuid
                                    dataBaseAll.SkusSerial = SkusSerial
                                    dataBaseAll.BoxSerial = BoxSerial
                                    dataBaseAll.Operation = itemOperationNumber.Operation
                                    dataBaseAll.ActionNumber = num
                                    dataBaseAll.OperationNumber = parseInt(OperationNumber)
                                    dataBaseAll.CheckBox = checkBox
                                    dataBaseAll.DateNow = data.toISOString()
                                    dataBaseAll.OperationalDuration = GlobalTimer.allTimers.get(SkusSerial).get(Number(OperationNumber)).getTime()
                                    dataBase.push(dataBaseAll)
                                    // console.log(dataBase)
                                    itemOperationNumber.Status = textStatus
                                }
                            })
                        }


                    })
                }

            }
        })
    })
}

//функция собирает данные отправленные пользователем при нажатии на кнопки и отправляеи их в функцию handlerSearchLocalData
function handlerSendInLocal(SkusSerial,WcGuid,BoxSerial,Operation,num,Status,InOperationNumber,OperationNumber){
    let textStatus = ''
    if (num === 1) {
        textStatus = 'Начато'
        if (checkBoxAll === 1) {
            checkBoxItemSkusSerial = []
            handlerSearchTimerMap(SkusSerial,BoxSerial,InOperationNumber,OperationNumber,allSkusSerialItem,true)
            document.getElementById(`${InOperationNumber}status${SkusSerial}`).innerHTML = ('Начато')
            handlerSearchButtons(InOperationNumber,SkusSerial,OperationNumber)
            handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)

        }else
        if (checkBoxItem > 0) {
            document.getElementById(`${InOperationNumber}status${SkusSerial}`).innerHTML = ('Начато')
            handlerSearchTimerMap(SkusSerial,BoxSerial,InOperationNumber,OperationNumber,checkBoxItemSkusSerial,true)
            handlerSearchButtons(InOperationNumber,SkusSerial,OperationNumber)
            handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)

        }else
        if(checkBoxItem == 0 && checkBoxAll == 0){
            GlobalTimer.changeTimerState(SkusSerial, Number(OperationNumber), true)
            document.getElementById(`${InOperationNumber}status${SkusSerial}`).innerHTML = ('Начато')
            handlerSearchButtons(InOperationNumber,SkusSerial,OperationNumber)
            handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)
        }
    }
    if (num === 2) {
        if (document.getElementById(`${InOperationNumber}pause${SkusSerial}`).textContent === 'Продолжить') {
            textStatus = 'Начато'
            num = 1985
            if (checkBoxAll === 1) {
                checkBoxItemSkusSerial = []
                document.getElementById(`${InOperationNumber}pause${SkusSerial}`).textContent = ('Пауза')
                document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Начато')
                handlerChangeStatus(BoxSerial, SkusSerial, textStatus,InOperationNumber)
                handlerSearchTimerMap(SkusSerial,BoxSerial,InOperationNumber,OperationNumber,allSkusSerialItem,true)
                handlerSearchButtons(InOperationNumber,SkusSerial,OperationNumber)
                handlerControlStatus(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)


            }else
            if (checkBoxItem > 0) {
                document.getElementById(`${InOperationNumber}pause${SkusSerial}`).textContent = ('Пауза')
                document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Начато')
                handlerChangeStatus(BoxSerial, SkusSerial, textStatus,InOperationNumber)
                handlerSearchTimerMap(SkusSerial,BoxSerial,InOperationNumber,OperationNumber,checkBoxItemSkusSerial,true)
                handlerSearchButtons(InOperationNumber,SkusSerial,OperationNumber)
                handlerControlStatus(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)
            }else
            if(checkBoxItem == 0 && checkBoxAll == 0){
                document.getElementById(`${InOperationNumber}pause${SkusSerial}`).textContent = ('Пауза')
                document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Начато')
                handlerSearchButtons(InOperationNumber,SkusSerial,OperationNumber)
                GlobalTimer.changeTimerState(SkusSerial, Number(OperationNumber), true)
                handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)
            }

        } else {
            textStatus = 'Пауза'
            num = 2
            if (checkBoxAll === 1) {
                checkBoxItemSkusSerial = []
                document.getElementById(`${InOperationNumber}pause${SkusSerial}`).textContent = ('Продолжить')
                document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Пауза')
                handlerChangeStatus(BoxSerial, SkusSerial, textStatus,InOperationNumber)
                handlerSearchTimerMap(SkusSerial,BoxSerial,InOperationNumber,OperationNumber,allSkusSerialItem,false)
                handlerSearchButtons(InOperationNumber,SkusSerial,OperationNumber)
                let some = GlobalTimer.allTimers.get(SkusSerial).get(Number(OperationNumber)).getTime();
                console.log(some / 1000);
                handlerControlStatus(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)
                console.log(num,'pause')
            }else
            if (checkBoxItem > 0) {
                document.getElementById(`${InOperationNumber}pause${SkusSerial}`).textContent = ('Продолжить')
                document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Пауза')
                handlerChangeStatus(BoxSerial, SkusSerial, textStatus,InOperationNumber)
                handlerSearchTimerMap(SkusSerial,BoxSerial,InOperationNumber,OperationNumber,checkBoxItemSkusSerial,false)
                handlerSearchButtons(InOperationNumber,SkusSerial,OperationNumber)
                let some = GlobalTimer.allTimers.get(SkusSerial).get(Number(OperationNumber)).getTime();
                console.log(some / 1000);
                handlerControlStatus(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)


            }else
            if(checkBoxItem == 0 && checkBoxAll == 0){
                document.getElementById(`${InOperationNumber}pause${SkusSerial}`).textContent = ('Продолжить')
                document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Пауза')
                GlobalTimer.changeTimerState(SkusSerial, Number(OperationNumber), false)
                handlerSearchButtons(InOperationNumber,SkusSerial,OperationNumber)
                let some = GlobalTimer.allTimers.get(SkusSerial).get(Number(OperationNumber)).getTime();
                console.log(some / 1000);
                handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)

            }

        }
    }
    if (num === 3) {
        textStatus = 'Закончено'
        if (checkBoxAll === 1) {
            checkBoxItemSkusSerial = []
            document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Закончено')
            handlerChangeStatus(BoxSerial, SkusSerial, textStatus,InOperationNumber)
            handlerSearchTimerMap(SkusSerial,BoxSerial,InOperationNumber,OperationNumber,allSkusSerialItem,false)
            handlerSearchButtons(InOperationNumber,SkusSerial,OperationNumber)
            console.log(GlobalTimer.allTimers.get(SkusSerial).get(Number(OperationNumber)).getTime() / 1000)
            handlerControlStatus(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)

        }else if (checkBoxItem > 0) {
            document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Закончено')
            handlerChangeStatus(BoxSerial, SkusSerial, textStatus,InOperationNumber)
            handlerSearchTimerMap(SkusSerial,BoxSerial,InOperationNumber,OperationNumber,checkBoxItemSkusSerial,false)
            console.log(GlobalTimer.allTimers.get(SkusSerial).get(Number(OperationNumber)).getTime() / 1000)
            handlerSearchButtons(InOperationNumber,SkusSerial,OperationNumber)
            handlerControlStatus(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)
        }else if (checkBoxItem == 0 && checkBoxAll == 0){
            document.getElementById(`${InOperationNumber}status${SkusSerial}`).textContent = ('Закончено')
            GlobalTimer.changeTimerState(SkusSerial, Number(OperationNumber), false)
            console.log(GlobalTimer.allTimers.get(SkusSerial).get(Number(OperationNumber)).getTime() / 1000)
            handlerSearchButtons(InOperationNumber,SkusSerial,OperationNumber)
            handlerSearchLocalData(BoxSerial, SkusSerial, OperationNumber, textStatus, WcGuid, num,InOperationNumber)
        }

    }
}

//функция отображает таблицу
function handlerShowTable(BoxSerial, SkusSerial) {
    if (document.querySelector('.table_container').classList.contains('loading')) {
        deleteElems(document.querySelectorAll('.control_table'))
    }
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
                                   <td class="m-1 " id="numOperation">${itemSkusSerial.Operations[i].InOperationNumber}</td>
                                     <td>${itemSkusSerial.Operations[i].OperationHumanName}</td>
                                     <td id="${itemSkusSerial.Operations[i].InOperationNumber}status${SkusSerial}" class="${itemSkusSerial.Operations[i].InOperationNumber}status">${itemSkusSerial.Operations[i].Status}</td>
                                   <td id="${itemSkusSerial.Operations[i].Status}">
                                     <button type="button"  class="btn btnBegin btnIn" id="${itemSkusSerial.Operations[i].InOperationNumber}begin${SkusSerial}" onclick="handlerSendInLocal('${SkusSerial}','${item.WcGuid}','${BoxSerial}','${itemSkusSerial.Operations[i].Operation}',1,'${itemSkusSerial.Operations[i].Status}','${itemSkusSerial.Operations[i].InOperationNumber}','${itemSkusSerial.Operations[i].OperationNumber}','${itemSkusSerial.Operations[i].NumOperationsStatus}')"><i class="far fa-eye"></i>Начать</button>
                                     <button type="button"  class="btn btnPause btnIn" id="${itemSkusSerial.Operations[i].InOperationNumber}pause${SkusSerial}" onclick="handlerSendInLocal('${SkusSerial}','${item.WcGuid}','${BoxSerial}','${itemSkusSerial.Operations[i].Operation}',2,'${itemSkusSerial.Operations[i].Status}','${itemSkusSerial.Operations[i].InOperationNumber}','${itemSkusSerial.Operations[i].OperationNumber}','${itemSkusSerial.Operations[i].NumOperationsStatus}')"><i class="fas fa-edit"></i>Пауза</button>
                                     <button type="button"  class="btn btnFinish btnIn" id="${itemSkusSerial.Operations[i].InOperationNumber}finish${SkusSerial}" onclick="handlerSendInLocal('${SkusSerial}','${item.WcGuid}','${BoxSerial}','${itemSkusSerial.Operations[i].Operation}',3,'${itemSkusSerial.Operations[i].Status}','${itemSkusSerial.Operations[i].InOperationNumber}','${itemSkusSerial.Operations[i].OperationNumber}','${itemSkusSerial.Operations[i].NumOperationsStatus}')"><i class="far fa-trash-alt"></i>Закончить</button>
                                   </td>
                                </tr>
                                </tbody>`)
                            document.querySelector('.header_control').insertAdjacentHTML('afterend', table)
                            let buttonsIn = {
                                itemStatusId: `${itemSkusSerial.Operations[i].InOperationNumber}status${SkusSerial}`,
                                itemButtonBegin: `${itemSkusSerial.Operations[i].InOperationNumber}begin${SkusSerial}`,
                                itemButtonPause: `${itemSkusSerial.Operations[i].InOperationNumber}pause${SkusSerial}`,
                                itemButtonFinish: `${itemSkusSerial.Operations[i].InOperationNumber}finish${SkusSerial}`
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
function handlerSearchSkusSerial(boxSerial){
    localData.OperationsLists.find(itemBox=>{
        itemBox.Boxes.find(itemBoxSerial=>{
            if(itemBoxSerial.BoxSerial == boxSerial){
                itemBoxSerial.Skus.find(itemSkusSerial=>{
                    let skusSerialAll = new Object()
                    skusSerialAll.SkusSerial = itemSkusSerial.SkusSerial
                    allSkusSerialItem.push(skusSerialAll)
                    // console.log(allSkusSerialItem)
                })
            }
        })
    })

}

// функция отвечает за выбор всех серий или удаление выбранного
function handlerBlockButtonChecked(id,boxSerial){
    if(checkBoxItem === 0){
        if(document.getElementById(id).textContent.toLowerCase() == 'отметить все'){
            document.getElementById(id).textContent = ('Убрать у всех')
            addClassListAll(document.querySelectorAll('.btnSkusSerialIn'),'btnSkusSerialInCheckAll')
            addClassList(listGallery,'gallery_opacity')
            addClassListAll(document.querySelectorAll('.checkButtonInput '),'switch-on')
            checkBoxAll=1
            handlerSearchSkusSerial(boxSerial)
        }else{
            document.getElementById(id).textContent = ('Отметить все')
            deleteClassList(listGallery,'gallery_opacity')
            deleteClassListAll(document.querySelectorAll('.btnSkusSerialIn'),'btnSkusSerialInCheckAll')
            deleteClassListAll(document.querySelectorAll('.checkButtonInput '),'switch-on')
            checkBoxAll=0
            allSkusSerialItem=[]
        }
    }
}

// функция отвечает за кокретный выбор серии по галкам
function handlerInputCheck(skusSerial) {
    if (this.event && checkBoxAll === 0) {
        let elems = document.getElementById(`${skusSerial}flexCheckDefault`)
        elems.classList.toggle('switch-on')
        addClassList(document.getElementById(`${skusSerial}`),'btnSkusSerialInCheckAll')
        if (elems.classList.contains('switch-on')) {
            checkBoxItem = checkBoxItem + 1
            let itemSkusSerial = new Object()
            itemSkusSerial.SkusSerial = skusSerial
            checkBoxItemSkusSerial.push(itemSkusSerial)
        } else {
            checkBoxItem = checkBoxItem - 1
            deleteClassList(document.getElementById(`${skusSerial}`),'btnSkusSerialInCheckAll')
            checkBoxItemSkusSerial = checkBoxItemSkusSerial.filter(item => (item.SkusSerial !== skusSerial))

        }
    }

}
// функция рисует сами серии
function handlerBoxSkusSerial(itemBoxSerial) {
    let filterSerial=[]
    handlerControlLoadingSkusSerial() //проверяет было ли ранее загружен вывод серий
    handlerButtonBoxSerialStyle(itemBoxSerial) //отрабатываем клик по серии и добавляем стили к кнопкам
    localData.OperationsLists.find(itemBox => {
        itemBox.Boxes.find(itemSkusSerial => {
            if (itemSkusSerial.BoxSerial == itemBoxSerial) {

                itemSkusSerial.Skus.find(itemSerial => {
                    itemSerial.Operations.find(itemSerialStatus=>{
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
                            if ( itemSerialStatus.Status.toLowerCase() === 'начато') {
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
    filterSerial= filterSerial.reduce((r, i) =>
            !r.some(j => !Object.keys(i).some(k => i[k] !== j[k])) ? [...r, i] : r
        , [])
    filterSerial.find(item=>{
        htmlButtonSkusSerial(item.SkusSerial, item.BoxSerial, item.SkusFriendlyName)
    })
    let htmlBlockChecked = (`
                    <button type="button" class="btn  btn-sm checkButton btnCheckIn btnIn checkButton1" id="checkButton1" onclick="handlerBlockButtonChecked('checkButton1','${itemBoxSerial}')" >Отметить все</button>`)
    blockChecked.insertAdjacentHTML('afterbegin', htmlBlockChecked)
}

//функция фильтрует бокс серии по выборки
const handlerSelectionStatusSearchBox = (text) => {
    let filterStatus=[]
    for(let a=0;a<localData.OperationsLists.length;a++) {
        for (let i = 0; i < localData.OperationsLists[a].Boxes.length; i++) {
            for (let j = 0; j <localData.OperationsLists[a].Boxes[i].Skus.length; j++) {
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
    filterStatus= filterStatus.reduce((r, i) =>
            !r.some(j => !Object.keys(i).some(k => i[k] !== j[k])) ? [...r, i] : r
        , [])
    filterStatus.find(item=>{
            htmlBoxSerial(item.BoxSerial, item.WcGuid, item.ClientOrder)
    })
}
// вывожу серии бокса,взависимости от сортировки
function handlerBoxSerial() {
    if (selectionChoose == 1 || selectionChoose == 0){
        localData.OperationsLists.find(item => {
                item.Boxes.find(itemBoxSerial => {
                        htmlBoxSerial(itemBoxSerial.BoxSerial, item.WcGuid, itemBoxSerial.ClientOrder)
                })
        })
    }
    if(selectionChoose == 2){
        handlerSelectionStatusSearchBox('пауза')
    }
    if(selectionChoose == 3){
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

    fetch(mainUrl + "geterp", requestOptions)
        .then(response => response.json())
        .then(function (result) {
            localData = result
            handlerAddObject()
            handlerSkusSerial()
            setTimeout(handlerBoxSerial, 1000)
        })
        .catch(error => console.log('error', error));

}
handlerSkusSerial()
GlobalTimer = new TimerManeger(allDataAboutOperations);
setTimeout(handlerBoxSerial, 1000)
handlerAddObject()
// axiosLogin()
slideCarouselBox()


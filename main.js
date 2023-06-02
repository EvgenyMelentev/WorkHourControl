let dateDiv = document.querySelector('#date_range');
let today = document.querySelector('.choose_today');
let four_days = document.querySelector('.four_days');
let week = document.querySelector('.week');
let month = document.querySelector('.month');
let mainTable = document.querySelector('.main_table');
let main_table_mobile = document.querySelector('.main_table_moble')
let todayDate = new Date();
let daysBefore = 0;
dateDiv.innerHTML = `Сегодня: ${todayDate.getDate() < 10 ? '0' +todayDate.getDate(): todayDate.getDate() }.${todayDate.getMonth()+1 < 10 ? '0'+(todayDate.getMonth()+1) : todayDate.getMonth()+1}.${todayDate.getFullYear()}г.`
let db = [[
    {
        "employee": "Алексей",
        "shop": "World of cats",
        "role": "admin",
        "datePlanFrom": "08:00",
        "datePlanTo": "19:00",
        "date": "31.05"
    },
    {
        "employee": "Алексей",
        "shop": "World of cats",
        "role": "admin",
        "datePlanFrom": "08:00",
        "datePlanTo": "19:00",
        "date": "30.05"
    },
    {
        "employee": "Алексей",
        "shop": "World of cats",
        "role": "admin",
        "datePlanFrom": "08:00",
        "datePlanTo": "19:00",
        "date": "1.06"
    },
    {
        "employee": "Валера",
        "shop": "World of cats",
        "role": "genius",
        "datePlanFrom": "08:00",
        "datePlanTo": "19:00",
        "date": "31.05"
    },
    {
        "employee": "Семён",
        "shop": "World of dogs",
        "role": "shopMaster",
        "datePlanFrom": "08:00",
        "datePlanTo": "19:00",
        "date": "31.05"
    },
    {
        "employee": "Алёна",
        "shop": "World of dogs",
        "role": "localCrazy",
        "datePlanFrom": "08:00",
        "datePlanTo": "19:00",
        "date": "31.05"
    }
],
[
    {
        "employee": "Алексей",
        "shop": "World of cats",
        "role": "admin",
        "dateFactFrom": "09:00",
        "dateFactTo": "18:00",
        "date": "31.05"
    },
    {
        "employee": "Валера",
        "shop": "World of cats",
        "role": "genius",
        "dateFactFrom": "08:00",
        "dateFactTo": "19:00",
        "date": "31.05"
    },
    {
        "employee": "Семён",
        "shop": "World of dogs",
        "role": "shopMaster",
        "dateFactFrom": "08:00",
        "dateFactTo": "19:00",
        "date": "31.05"
    }
]
];

changeButtonStatus('choose_today')

// async function getDb(){
//     let response = await fetch("fakedb.json",{mode:"no-cors"});
//     let result = await response.json();
//      db = result;
//      rendrer(4,result) 
// }
// getDb()

window.addEventListener('resize',()=>{
    rendrer(daysBefore,db)
})

function rendrer(before,dataBase){
    mainTable.innerHTML =''
    main_table_mobile.innerHTML = '';
    let arr = getDays(todayDate,before);
    let divMainContentDescr = elementFactory('main_content_descr');
    let divMainContent = elementFactory('main_content');
    mainTable.append(divMainContentDescr);
    mainTable.append(divMainContent);
    
    let shopsNames = shopSeparator(dataBase);
    
    if(window.innerWidth < 1001){
        for(let i = arr.length; i > 0; i--){
            createGroupMobileDate(i,arr,divMainContentDescr,divMainContent);
            shopsNames.forEach(element => {
                let shopName = elementFactory('shop_name');
                let cellShop = elementFactory('item_shop_name','item');
                divMainContentDescr.append(shopName);
                divMainContent.append(cellShop);
                shopName.innerText = element;
                shopName.dataset.shop = element;
                let employees = employesWorkInShop(element,dataBase);
                if(arr.length > 3){
                    window.scroll(0,1000000);
                }
                for(let a = 0; a < employees.length;a++){
                    let employee = elementFactory('employee');
                    let item = elementFactory('item');
                    let employeeName = employees[a]
                    employee.innerText = employees[a];
                    employee.dataset.name = employees[a];
                    employee.dataset.shop = element;
                    divMainContentDescr.append(employee);
                    divMainContent.append(item);
                    let employeeCell = elementFactory('item_employee','cell');
                    item.append(employeeCell);
                    let plan_work = elementFactory('plan_work');
                    let factWork = elementFactory('fact_work');
                    let employeeAlert = elementFactory('employee_alert');
                    
                    let planHours = addPlanHours(dataBase,employeeName,element,arr[i-1])
                    let factHours = addFactHours(dataBase,employeeName,element,arr[i-1])
                    
                    if(planHours.length > 0){
                        plan_work.innerHTML = `${planHours[0].datePlanFrom} - ${planHours[0].datePlanTo}`; 
                        employeeCell.append(plan_work)
                        let arrViolations = checkEmployeeViolations(planHours, factHours);
                        if(arrViolations.length > 0 ){
                            employeeCell.append(employeeAlert);
                                    let tooltipAlert = document.createElement('span');
                                    tooltipAlert.classList.add('tooltip');
                                    tooltipAlert.innerText = arrViolations.join(" ");
                                    employeeAlert.append(tooltipAlert)
                    }}
                    if(factHours.length > 0){
                        factWork.innerHTML = `${factHours[0].dateFactFrom} - ${factHours[0].dateFactTo}`;
                        employeeCell.append(factWork);
                    }
                }
            });
        }
    }else{
        let dateClear = elementFactory('date_clear');
        let itemDate = elementFactory('item');
            for(let i = arr.length; i > 0; i--){
                divMainContentDescr.append(dateClear);
                divMainContent.append(itemDate)
                let dateCell = elementFactory('cell', 'date');
                let {day,month} = arr[i-1]
                dateCell.innerText=`${day}.${month < 10 ? '0'+month: month}`
                itemDate.append(dateCell);
                if(arr.length > 5){
                    divMainContent.scroll(100000,0);
                }
    }
    shopsNames.forEach(element => {
        let shopName = elementFactory('shop_name');
        let cellShop = elementFactory('item_shop_name','item');
        divMainContentDescr.append(shopName);
        divMainContent.append(cellShop);
        shopName.innerText = element;
        shopName.dataset.shop = element;
        let employees = employesWorkInShop(element,dataBase);
        for(let i = 0; i < employees.length;i++){
            let employee = elementFactory('employee');
            let item = elementFactory('item');
            let employeeName = employees[i]
            employee.innerText = employees[i];
            employee.dataset.name = employees[i];
            employee.dataset.shop = element;
            divMainContentDescr.append(employee);
            divMainContent.append(item);
        for(let a = 0; a < arr.length; a++){
            let employeeCell = elementFactory('item_employee','cell');
            item.append(employeeCell);
            let plan_work = elementFactory('plan_work');
            let factWork = elementFactory('fact_work');
            let employeeAlert = elementFactory('employee_alert');
            
            let planHours = addPlanHours(dataBase,employeeName,element,arr[arr.length - 1 - a])
            let factHours = addFactHours(dataBase,employeeName,element,arr[arr.length - 1 - a])
            if(planHours.length > 0){
                plan_work.innerHTML = `${planHours[0].datePlanFrom} - ${planHours[0].datePlanTo}`; 
                factWork.innerHTML = `31.05`
                employeeCell.append(plan_work);
                let arrViolations = checkEmployeeViolations(planHours, factHours);
                if(arrViolations.length > 0 ){
                    employeeCell.append(employeeAlert);
                    let tooltipAlert = document.createElement('span');
                    tooltipAlert.classList.add('tooltip');
                    tooltipAlert.innerText = arrViolations.join(" ");
                    employeeAlert.append(tooltipAlert)
                }
            }
            if(factHours.length > 0){
                factWork.innerHTML = `${factHours[0].dateFactFrom} - ${factHours[0].dateFactTo}`
                employeeCell.append(factWork);
            }
        }
        }
    });
    }   
 }
 
 function  getDays(today,before){
    let arr = []
    let daysInCurrentMonth = today.getDate();
    if( before === 0){
        arr.push({day: today.getDate(), month: today.getMonth()+1})
    }else if(daysInCurrentMonth - before <= 0){
        let date = new Date(today.getFullYear(), today.getMonth(), 0);
        for(let i = 0; i <= before; i++){
               if(daysInCurrentMonth - i > 0){
                arr.push({day: today.getDate()-i, month: today.getMonth()+1})
               }else{
                arr.push({day: (date.getDate() - i +daysInCurrentMonth),month: date.getMonth()+1})
               }
     }
    }else if(daysInCurrentMonth - before > 0){
        for(let i = 0; i <= before; i++){
            arr.push({day: today.getDate()-i, month: today.getMonth()+1})
        }
    }
    return arr;
}
 function createGroupMobileDate(i,arrs,divMainContentDescr,divMainContent){
    let dateClear = elementFactory('date_clear');
    let itemDate = elementFactory('item');
    dateClear.style.marginTop = '30px'
    itemDate.style.marginTop = '30px'
    divMainContentDescr.append(dateClear);
    divMainContent.append(itemDate)
    let dateCell = elementFactory('cell', 'date');
    let {day,month} = arrs[i-1]
    dateCell.innerText=`${day}.${month < 10 ? '0'+month: month}`
    itemDate.append(dateCell);
 }
 function createGroupDate(i,arrs,divMainContentDescr,divMainContent){
    let dateClear = elementFactory('date_clear');
    let itemDate = elementFactory('item');
    divMainContentDescr.append(dateClear);
    divMainContent.append(itemDate)
    let dateCell = elementFactory('cell', 'date');
    let {day,month} = arrs[i-1]
    dateCell.innerText=`${day}.${month < 10 ? '0'+month: month}`
    itemDate.append(dateCell);
 }

 function addPlanHours(dataBase,employeeName,shopName,dates){
    let date = `${dates.day}.${dates.month < 10 ? '0'+dates.month: dates.month}`
    let arrdate = dataBase[0].filter(i => i.date === date).filter(i=> i.shop === shopName).filter(i => i.employee === employeeName);
    return arrdate;
 }
 function addFactHours(dataBase,employeeName,shopName,dates){
    let date = `${dates.day}.${dates.month < 10 ? '0'+dates.month: dates.month}`
    let arrdate = dataBase[1].filter(i => i.date === date).filter(i=> i.shop === shopName).filter(i => i.employee === employeeName);
    return arrdate;
 }

 function checkEmployeeViolations(planHours, factHours){
    let arrViolations = []
    let datePlanFrom, datePlanTo,dateFactFrom,dateFactTo
    if(planHours && planHours.length > 0){
        datePlanFrom = +planHours[0].datePlanFrom.slice(0,2);
        datePlanTo = +planHours[0].datePlanTo.slice(0,2);
    }
    if(factHours && factHours.length > 0){
        dateFactFrom = +factHours[0].dateFactFrom.slice(0,2);
        dateFactTo = +factHours[0].dateFactTo.slice(0,2);
    }else{
        arrViolations.push('Прогул');
    }
    if(planHours && factHours && planHours.length > 0 && factHours.length > 0){
        datePlanFrom < dateFactFrom ? arrViolations.push('Опоздание') :'';
        datePlanTo > dateFactTo ? arrViolations.push('Ранний уход') :'';
    }
    return arrViolations;
 }

function shopSeparator(dataBase){
    let arr = dataBase[0].reduce((acc,item)=>{
        if(acc.includes(item.shop)){
            return acc;
        }else{
            return [...acc, item.shop]
        }
    },[]);
    return arr;
}

function employesWorkInShop(shopName, dataBase){
    let arr = dataBase[0].reduce((acc,item)=>{
        if(item.shop !== shopName){
            return acc;
        }else{
        if(acc.includes(item.employee)){
            return acc;
        }else{
            return [...acc, item.employee]
        }}
    },[]);
    return arr;

}

 function elementFactory(...classes){
    let item = document.createElement('div');
    item.classList.add(...classes);
    return item;
 }

function changeButtonStatus(target){
    switch(target){
        case 'choose_today':
            today.classList.add('active_button');
            four_days.classList.remove('active_button');
            week.classList.remove('active_button');
            month.classList.remove('active_button');
            break;
        case 'four_days':
            today.classList.remove('active_button');
            four_days.classList.add('active_button');
            week.classList.remove('active_button');
            month.classList.remove('active_button');
            break;
        case 'week':
                today.classList.remove('active_button');
                four_days.classList.remove('active_button');
                week.classList.add('active_button');
                month.classList.remove('active_button');
                break;
        case 'month':
                 today.classList.remove('active_button');
                four_days.classList.remove('active_button');
                week.classList.remove('active_button');
                month.classList.add('active_button');
                break;
    }
}

today.addEventListener('click',(e)=>{
    changeButtonStatus(e.target.className)
    daysBefore = 0;
    rendrer(0,db);
});
four_days.addEventListener('click',(e)=>{
    changeButtonStatus(e.target.className)
    daysBefore = 3;
    rendrer(3,db);
});
week.addEventListener('click',(e)=>{
    changeButtonStatus(e.target.className)
    daysBefore = 6;
    rendrer(6,db);
});
month.addEventListener('click',(e)=>{
    changeButtonStatus(e.target.className)
    daysBefore = 30;
    rendrer(30,db);
});
rendrer(4,db);


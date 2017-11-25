const storageVersion = '1.';
const doorItem = {
    number: 0,
    name: '',
    description: '',
    date: '',
    weekday: '',
    time: '',
    color: ''
};
var areaItem = {
    key: '',
    name: '',
    from: 1,
    to: 9,
    date: '',
    weekday: '',
    time: '',
    doors: [],
    createdAt: ''
};



function createArea(name, from, to) {
    areaItem.key = storageVersion + Date.now().toString();
    areaItem.name = name;
    areaItem.from = from;
    areaItem.to = to;
    areaItem.createdAt = new Date().toUTCString();
    
    for (var i = Number(from); i <= Number(to); i++) {
        doorItem.number = i;
        areaItem.doors.push( { number: i } );
    }
    
    window.localStorage.setItem(areaItem.key, JSON.stringify(areaItem));
    
    return areaItem;
}


function removeArea(key) {
    console.log('removeArea: ' + key);
    window.localStorage.removeItem(key);
}


function getAreaNameDeprecated(key) {
    return window.localStorage.getItem(key);
}


function getAreaFromDeprecated(area) {
    var key = area + '_from'
    return window.localStorage.getItem(key);
}


function getAreaToDeprecated(area) {
    var key = area + '_to'
    return window.localStorage.getItem(key);
}


function getWeekDay() {
    const WEEK_DAYS = ['SU', 'MA', 'TI', 'KE', 'TO', 'PE', 'LA'];
    var d = new Date();
    
    return WEEK_DAYS[d.getDay()];
}


function getDate() {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    
    return day + '.' + month;
}


function getTime() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    minutes = minutes > 9 ? minutes : '0' + minutes;
    
    return hours + ':' + minutes;
}


function getDateAndTime() {
    return getDate() + ' ' + getTime();
}


function getAreasDeprecated() {            
    var res = [];
    
    var i;
    for (i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);
        
        if (key.search(/[._]/g) === -1) {
            console.log('vanha: ' + key);
            res.push(key);
        }
    }
    
    return res;
}


function getDoorsDeprecated(area) {            
    var res = [];
    
    var i;
    for (i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);
        
        if (key.search('_') === -1) {
            res.push(key);
        }
    }
    
    return res;
}


function setSelectedArea(area) {
    window.sessionStorage.selectedArea = area;
}


function getSelectedArea() {
    return window.sessionStorage.selectedArea;
}


function setDoorDeprecated(area, door, color) {
    var key = area + '__' + door;
    var value = color + ' ' + getDateAndTime() + ' ' + getWeekDay();
    
    window.localStorage.setItem(key, value);
}


function getDoorDeprecated(area, door) {
    var key = area + '__' + door;
    return window.localStorage.getItem(key);
}

function getAreas() {            
    var res = [];
    
    var i;
    for (i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);
        
        if (key.search(/[.]/g) !== -1) {
            var item = window.localStorage.getItem(key);
            console.log('uusi: ' + item);
            res.push(JSON.parse(item));
        }
    }
    
    return res;
}

function getArea(key) {            
    return JSON.parse(window.localStorage.getItem(key));
}

function setArea(area) {
    window.localStorage.setItem(area.key, JSON.stringify(area));
}

function setDoor(key, number, color) {
    var area = getArea(key);
    
    area.doors.forEach(function(door) {
        if (door.number === number ) {
            door.color = color;
            door.date = getDate();
            door.weekday = getWeekDay();
            door.time = getTime();
        }
    });
    
    setArea(area);
}

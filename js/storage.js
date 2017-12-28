const storageVersion = '1.';
const doorModel= {
    number: 0,
    name: '',
    description: '',
    date: '',
    weekday: '',
    time: '',
    color: ''
};
const areaModel = {
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
    var area = Object.assign({}, areaModel);
    area.key = storageVersion + Date.now().toString();
    area.name = name;
    area.from = from;
    area.to = to;
    area.createdAt = new Date().toUTCString();

    for (var i = Number(from); i <= Number(to); i++) {
        var door = Object.assign({}, doorModel);
        door.number = i;
        area.doors.push(door);
    }

    window.localStorage.setItem(area.key, JSON.stringify(area));

    return area;
}

function removeArea(key) {
    console.log('removeArea: ' + key);
    window.localStorage.removeItem(key);
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

function setSelectedArea(area) {
    window.sessionStorage.selectedArea = area;
}

function getSelectedArea() {
    return window.sessionStorage.selectedArea;
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

function getDoor(key, number) {
    var area = getArea(key);
    var res = null;

    area.doors.forEach(function(door) {
        if (door.number == number) {
          res = door;
        }
    });

    return res;
}

function setDoor(key, number, color, description) {
    var area = getArea(key);

    area.doors.forEach(function(door) {
        if (door.number == number ) {
            door.color = color;
            door.name = description;
            door.description = description;
            door.date = getDate();
            door.weekday = getWeekDay();
            door.time = getTime();
        }
    });

    setArea(area);
}

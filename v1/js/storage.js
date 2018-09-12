
function createArea2(name, from, to) {
    var area = {
      name: name,
      from: from,
      to: to,
      doors:[],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    var i;
    for (i = from; i <= Number(to); i++) {
        area.doors.push({
          name: '',
          note: '',
          code: 'empty',
          updatedAt: Date.now()
        });
    }

    window.localStorage.setItem(name, JSON.stringify(area));
}


function createArea(name, from, to) {
    var key = Date.now();
    window.localStorage.setItem(key.toString(), name);
    window.localStorage.setItem(key + '_from', from);
    window.localStorage.setItem(key + '_to', to);

    var i;
    for (i = Number(from); i <= Number(to); i++) {
        window.localStorage.setItem(key + '__' + i, 'empty');
    }

    return key.toString();
}


function removeArea(area) {
    window.localStorage.removeItem(area);
}


function removeArea2(keyName) {
    if (window.localStorage.getItem(keyName) !== null) {
        window.localStorage.removeItem(keyName);
    }
}


function getAreaName(key) {
    return window.localStorage.getItem(key);
}


function getAreaFrom(area) {
    var key = area + '_from';
    return window.localStorage.getItem(key);
}


function getAreaTo(area) {
    var key = area + '_to';
    return window.localStorage.getItem(key);
}


function getWeekDay() {
    const WEEK_DAYS = ['SU', 'MA', 'TI', 'KE', 'TO', 'PE', 'LA'];
    var d = new Date();

    return WEEK_DAYS[d.getDay()];
}


function getDateAndTime() {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var hours = d.getHours();
    var minutes = d.getMinutes();
    minutes = minutes > 9 ? minutes : '0' + minutes;

    return day + '.' + month + ' ' + hours + ':' + minutes;
}


function getAreas() {
    var res = [];

    var i;
    for (i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);

        if (key.search(/_/) === -1 && Number.isInteger(Number(key))) {
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


function setDoor(area, door, color) {
    var key = area + '__' + door;
    var value = color + ' ' + getDateAndTime() + ' ' + getWeekDay();

    window.localStorage.setItem(key, value);
}


function setDoor2(keyName, door, code) {
    keyName = window.localStorage.getItem(keyName);
    if (window.localStorage.getItem(keyName) === null) {
        return;
    }

    var area = getArea(keyName);
    var index = door - area.from;
    var door = area.doors[index];

    door.updatedAt = Date.now();
    door.code = code;

    area.updatedAt = door.updatedAt;
    area.doors[index] = door;

    window.localStorage.setItem(keyName, JSON.stringify(area));
}


function getArea(keyName) {
    var area = window.localStorage.getItem(keyName);

    return JSON.parse(area);
}


function getDoor(area, door) {
    var key = area + '__' + door;
    return window.localStorage.getItem(key);
}

function createArea(name, from, to) {
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

    return name;
}


function removeArea(area) {
    window.localStorage.removeItem(area);
}


function removeArea2(keyName) {
    if (window.localStorage.getItem(keyName) !== null) {
        window.localStorage.removeItem(keyName);
    }
}


function getWeekDay(date) {
    const WEEK_DAYS = ['SU', 'MA', 'TI', 'KE', 'TO', 'PE', 'LA'];

    return WEEK_DAYS[date.getDay()];
}


function getDateAndTime(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var hours = date.getHours();
    var minutes = date.getMinutes();
    minutes = minutes > 9 ? minutes : '0' + minutes;

    return day + '.' + month + ' ' + hours + ':' + minutes;
}


function getAreas() {
    var res = [];

    var i;
    for (i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);
        var item = window.localStorage.getItem(key);

        if (isNaN(item)) {
            try {
                JSON.parse(item);
                res.push(item);
            } catch (e) {
                console.log(e.toString());
            }
        }
    }

    return res;
}


function setSelectedArea(key) {
    sessionStorage.setItem('selectedArea', key);
}


function getSelectedArea() {
    return sessionStorage.getItem('selectedArea');
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


function getDoor(index) {
    var door = window.selectedArea.doors[index];

    return JSON.parse(door);
}

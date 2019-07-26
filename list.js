let users = [
    {"name":"Степан", "surname":"Филонов", "comments_count":3, "timestamp":1531826581, "created":"17.07.2018 13:23"},
    {"name":"Андрей", "surname":"Панов", "comments_count":26, "timestamp":1490336325, "created":"24.03.2017 07:18"},
    {"name":"Елисей", "surname":"Кузьмин", "comments_count":19, "timestamp":1440504955, "created":"25.08.2015 14:15"},
    {"name":"Даниил", "surname":"Хромов", "comments_count":45, "timestamp":1551073047, "created":"25.02.2019 06:37"},
    {"name":"Светлана", "surname":"Горина", "comments_count":39, "timestamp":1507309617, "created":"06.10.2017 19:06"}
];


class DisplayBasis {
    setData(users) {
        this.users = users.slice();
    }

    sortData(key = 'surname') {
        this.users.sort(this.compare(key));
    }

    compare(key) {
        return function(a, b) {
            let comparison = 0;
            if (a[key] > b[key]) {
                comparison = 1;
            } else if (a[key] < b[key]) {
                comparison = -1;
            }
            return comparison;
        }
    }

    getBlock(tag = 'div', className = '') {
        let block = document.createElement(tag);
        if (className) block.className = className;
        return block;
    }
}

    
class Table extends DisplayBasis {
    getTable() {
        let table = this.getBlock('table');
        table.append( this.getThead());
        table.append( this.getTbody());
        return table;
    }

    getThead() {
        let thead = this.getBlock('thead');
        thead.append( this.getRowCol('Пользователь', 'Зарегистрирован', 'Количество комментариев'));
        return thead;
    }

    getTbody() {
        let tbody = this.getBlock('tbody');
        for (let i = 0; i < this.users.length; i++) {
            tbody.append( this.getRowCol(`${this.users[i].name} ${this.users[i].surname}`, this.users[i].created, this.users[i].comments_count));
        }
        return tbody;
    }

    getRowCol(colText1 = 'Данные отсутствуют', colText2 = 'Данные отсутствуют', colText3 = 'Данные отсутствуют') {
        let row = this.getBlock('tr');
        let col1 = this.getBlock('td'), col2 = this.getBlock('td'), col3 = this.getBlock('td');
        col1.innerText = colText1;
        col2.innerText = colText2;
        col3.innerText = colText3;
        row.append(col1);
        row.append(col2);
        row.append(col3);
        return row;
    }

    draw(target) {
        target = document.querySelector(target);
        return target.appendChild(this.getTable());
    }
}


class List extends DisplayBasis {
    getList() {
        let list = this.getBlock(undefined, 'list');
        let listHeader = this.getBlock(undefined, 'bold');
        listHeader.innerText = 'Список пользователей:';
        list.append( listHeader);
        let ol = this.getBlock('ol');
        for (let i = 0; i < this.users.length; i++) {
            ol.append( this.getLi(`${this.users[i].surname} ${this.users[i].name}`));
        }
        list.append( ol);
        return list;
    }

    getLi(fullName) {
        let li = this.getBlock('li');
        li.innerText = fullName;
        return li;
    }

    draw(target) {
        target = document.querySelector(target);
        return target.appendChild(this.getList());
    }
}


let table = new Table();
table.setData(users);
table.sortData('timestamp');
table.draw('body');

let list = new List();
list.setData(users);
list.sortData();
list.draw('body');
(function() {
    document.getElementById("showAllBtn").addEventListener("click", showAllTask);
    document.getElementById("showActiveBtn").addEventListener("click", showActiveTask);
    document.getElementById("showCompleteBtn").addEventListener("click", showCompleteTask);
    document.getElementById("sortTimeBtn").addEventListener("click", sortTaskTime);
    document.getElementById("sortLexicoBtn").addEventListener("click", sortTaskLexico);
    document.getElementById("form").addEventListener("submit", formSubmit);

    var res = document.getElementById("result");
    var image_ele = document.getElementById("img");
    res.innerHTML = "<h3>Select Button to View</h3>";
    var tasks = [];
    var tab = "";
    var tLength = 0;

    function formSubmit(e) {
        e.preventDefault();

        var check_ele = e.target.elements;

        //Recording text input
        var inputText1 = check_ele[0].value;

        //Recording state of checkbox
        var inputCheck1 = check_ele[1].checked;

        if (inputText1.trim()) { //Check for space string
            var t1 = createObj(inputText1, inputCheck1, +new Date());
            addTask(t1);
        }

        e.target.reset();

        var index = tasks.length - 1;
        //Handling append event
        if (tab == "showAllBtn") {
            append(tasks[index].taskName, index, 1);
        } else if (tab == "showActiveBtn") {
            append(tasks[index].taskName, index, 0);
        } else if (tab == "showCompleteBtn") {
            append(tasks[index].taskName, index, 0);
        } else if (tab == "sortLexicoBtn") {
            sortTaskLexico();
        } else if (tab == "sortTimeBtn") {
            sortTaskTime();
        } else {
            //Showing Default Start Page
        }
    }

    function append(name, inDex, offset) {
        var ul = document.createElement("ul");
        res.appendChild(ul);

        var li = document.createElement("li");
        li.id = inDex;
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.id = inDex;
        deleteBtn.className = "btns";
        deleteBtn.addEventListener('click', handleButtons);

        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "check";
        checkBox.id = inDex;
        (tasks[inDex].done == true) ? checkBox.checked = true: checkBox.checked = false;
        checkBox.addEventListener('click', handleCheckBox);

        if (offset == 1) {
            li.appendChild(checkBox);
            li.appendChild(document.createTextNode(name));
            li.appendChild(deleteBtn);
        } else {
            li.appendChild(document.createTextNode(name));
        }
        ul.appendChild(li);
    }

    function Task(name, done, time) {
        this.taskName = name;
        this.time = time;
        this.done = done;
    }

    function createObj(name, done, time) {
        var obj = new Task(name, done, time);
        Object.defineProperties(obj, {
            property1: {
                configurable: false
            },
            property2: {
                configurable: false
            }
        });
        return obj;
    }

    function addTask(obj) {
        tasks.push(obj);
    }

    function display(arr, temp) {

        var list = "<ul>";
        for (var i = 0; i < arr.length; i++) {
            { list += "<li>" + arr[i].taskName + "</li>" }
        }
        list += "</ul>";
        res.innerHTML = temp + list;
    }

    function showAllTask(e) {
        var presentTab = "showAllBtn";
        image_ele.style.display = "none";
        if (tab != presentTab) {
            res.innerHTML = "<h3> All Tasks</h3>";
            for (var i = 0; i < tasks.length; i++) {
                append(tasks[i].taskName, i, 1);
            }
            tab = presentTab;
        }
    }

    function handleCheckBox(e) {
        var index = e.target.getAttribute("id");
        if (tasks[index].done == 0) { tasks[index].done = 1; } else { tasks[index].done = 0; }

    }

    function handleButtons(e) {
        var index = e.target.getAttribute("id");
        tasks.splice(index, 1);
        var element = document.getElementById(index);
        element.parentNode.removeChild(element);
    }

    function showActiveTask() {
        var presentTab = "showActiveBtn";
        image_ele.style.display = "none";
        if (tab != presentTab) {
            var res = tasks.filter(task => task.done == false);
            var temp = "<h3>" + res.length + " Tasks Still On Progress</h3>";
            display(res, temp);
            tab = presentTab;
        }
    }

    function showCompleteTask() {
        var presentTab = "showCompleteBtn";
        image_ele.style.display = "none";
        if (tab != presentTab) {
            var res = tasks.filter(task => task.done == true);
            var temp = "<h3>" + res.length + " Tasks Completed</h3>";
            display(res, temp);
            tab = presentTab;
        }
    }

    function sortTaskLexico() {
        var presentTab = "sortLexicoBtn";
        image_ele.style.display = "none";
        if (tab != presentTab) {
            tasks.sort((a, b) => { if (a.taskName < b.taskName) { return -1; } else { return 1; } });
            var temp = "<h3>Sorted Tasks Lexicographically</h3>";
            display(tasks, temp);
            tab = presentTab;
        }
    }


    function sortTaskTime() {
        var presentTab = "showTimeBtn";
        image_ele.style.display = "none";
        if (tab != presentTab) {
            tasks.sort((a, b) => { return b.time - a.time; });
            var temp = "<h3>Sorted Tasks Time Based</h3>";
            display(tasks, temp);
            presentTab = tab;
        }
    }
}())

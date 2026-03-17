class Student {
    constructor(name) {
        this.name = name;
        this.isPresent = null;
    }
}

const input = document.getElementById("Sname");
const button = document.getElementById("addStudentBtn");
const list = document.getElementById("studentList");

button.addEventListener("click", function () {
    const name = input.value.trim();

    if (name === "") {
        alert("Please enter a student name");
        return;
    }

    const student = new Student(name);
    console.log(student);

    addStudent(student);
    input.value = "";
});

function addStudent(student) {
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = student.name;

    const statusSpan = document.createElement("span");
    statusSpan.style.marginLeft = "8px";
    statusSpan.style.fontWeight = "bold";
    statusSpan.style.color = "#555";

    li.appendChild(nameSpan);
    li.appendChild(statusSpan);


    const presentBtn = document.createElement("button");
    presentBtn.textContent = "Mark Present";
    presentBtn.classList.add("presentBtn");

    const absentBtn = document.createElement("button");
    absentBtn.textContent = "Mark Absent";
    absentBtn.classList.add("absentBtn");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("removeBtn");

    li.appendChild(presentBtn);
    li.appendChild(absentBtn);
    li.appendChild(removeBtn);

    list.appendChild(li);


    presentBtn.addEventListener("click", function () {
        li.classList.remove("absent");
        li.classList.add("present");
        student.isPresent = true;

        statusSpan.textContent = "(Present)";
        statusSpan.style.color = "#003049 "; 
    });

    absentBtn.addEventListener("click", function () {
        li.classList.remove("present");
        li.classList.add("absent");
        student.isPresent = false;

        statusSpan.textContent = "(Absent)";
        statusSpan.style.color = "#d62828"; 
    });

    removeBtn.addEventListener("click", function () {
        li.remove();
    });
}

// #eae2b7
// #fcbf49
// #f77f00 #e7af73
// #d62828 #f37373
// #003049 #93c1da
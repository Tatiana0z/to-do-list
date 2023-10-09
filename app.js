console.log("To-Do List");
function addNote() {
    const box = document.createElement("div");
    const content = document.createElement("div");
    const p = document.createElement("p");
    const p1 = document.createElement("p");
    const title = document.createTextNode("Title");
    const text = document.createTextNode("Text");
    const btns = document.createElement("div");
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );

    box.classList = "box";
    p.appendChild(title);
    p.classList.add("title");
    p1.appendChild(text);
    p1.classList.add("text");

    content.classList.add("content");
    content.appendChild(p);
    content.appendChild(p1);

    btns.classList.add("btns");

    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("viewBox", "0 0 24 24");    

    path.setAttribute("d", "M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z");

    svg.appendChild(path);
    btn1.appendChild(svg);
    btn1.classList.add("edit");
    btn1.onclick = function() {
        edit(this);
    }
    btns.appendChild(btn1);

    const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path2 = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
        );
    svg2.setAttribute("width","20");
    svg2.setAttribute("height", "20");
    svg2.setAttribute("viewBox", "0 0 24 24");

    path2.setAttribute("d", "M20 7v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7H2V5h20v2h-2zm-9 3v7h2v-7h-2zM7 2h10v2H7V2z");

    svg2.appendChild(path2);
    btn2.appendChild(svg2);
    btn2.classList.add("delete");
    btn2.onclick = function() {
        remove(this);
    }
    btns.appendChild(btn2);


    const currentBox = document.querySelector(".box:last-child");
    const container = document.querySelector(".container");

    if( currentBox ) {
        currentBox.insertAdjacentElement('afterend', box);
        box.appendChild(content);
        box.appendChild(btns);
    } else {
        container.appendChild(box);
        box.appendChild(content);
        box.appendChild(btns);
    }
}

function edit(btn) {
    const box = btn.closest(".box");

    const edit = box.querySelector(".edit");
    const del = box.querySelector(".delete");
    del.style.display = "none";
    edit.style.display = "none";

    const btns = box.querySelector(".btns");
    const btnSave = document.createElement("button");
    btnSave.classList.add("save");
    btnSave.innerHTML = "Save";
    btnSave.onclick = function() {
        save(this);
    }
    box.appendChild(btns);
    btns.appendChild(btnSave)

    const title = box.querySelector(".title");
    const t = title.innerHTML;
    const text = box.querySelector(".text");
    const t2 = text.innerHTML;

    title.parentNode.removeChild(title);
    text.parentNode.removeChild(text);

    const content = box.querySelector(".content");
    const inpTitle = document.createElement("input");
    const inpText = document.createElement("textarea");

    inpTitle.value = t;
    inpTitle.classList.add("title-inp");
    content.appendChild(inpTitle);

    inpText.value = t2;
    inpText.classList.add("text-inp");
    content.appendChild(inpText);

}

function save(btn) {
    const box = btn.closest(".box");
    const content = box.querySelector(".content");
    const inpTitle = content.querySelector(".title-inp");
    const inpText = content.querySelector(".text-inp");
    localStorage.setItem("newTitle", inpTitle.value);
    localStorage.setItem("newText", inpText.value);
    console.log(localStorage.getItem("newTitle"));
    console.log(localStorage.getItem("newText"));

    inpTitle.parentNode.removeChild(inpTitle);
    inpText.parentNode.removeChild(inpText);

    const title = document.createElement("p");
    const text = document.createElement("p");

    title.innerHTML = localStorage.getItem("newTitle");
    title.classList.add("title");
    content.appendChild(title);

    text.innerHTML = localStorage.getItem("newText");
    text.classList.add("text");
    content.appendChild(text);

    const btnEdit = box.querySelector(".edit");
    const btnDel = box.querySelector(".delete");

    btnEdit.style.display = "inline";
    btnDel.style.display = "inline";

    const save = box.querySelector(".save");
    save.parentNode.removeChild(save);
}

function remove(btn) {
    const box = btn.closest(".box");
    box.parentNode.removeChild(box);
}

// DOM Element
const main = document.querySelector("#main");
const addBtn = document.querySelector("#addBtn");

// Load save note from localStorage on page load
document.addEventListener("DOMContentLoaded", loadNotes);

addBtn.addEventListener('click', () => addNotes());

function addNotes(title = '', content = '') {

  const note = document.createElement('div');
  note.classList.add('note');
  note.innerHTML = `
   <div class="tool">
      <img class="save" width="20" src="./assets/images/edit.png" alt="Edit Note">
      <img class="trash" width="20" src="./assets/images/delete.png" alt="Delete Note">
    </div>
    <input class="title" type="text" placeholder="Title" value="${title}">
    <textarea class="content">${content}</textarea>
  `;
  main.appendChild(note);

  note.querySelector(".trash").addEventListener('click', () => deleteNotes(note));

  note.querySelector(".title").addEventListener('input', saveNotes)
  note.querySelector(".content").addEventListener('input', saveNotes)
}

function saveNotes() {
  const notes = [];
  document.querySelectorAll('.note').forEach((note) => {
    const title = note.querySelector('.title').value;
    const content = note.querySelector('.content').value;
    notes.push({ title, content });
  })
  localStorage.setItem('notes', JSON.stringify(notes));
}

function deleteNotes(note) {
  note.remove();
  saveNotes();
}

function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

  savedNotes.forEach(note => addNotes(note.title, note.content));
}
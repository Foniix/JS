let draggedNote = null;

function dragstart_noteHandler (event){
    draggedNote = this;
    this.classList.add('dragged');
    event.stopPropagation();
}

const dragend_noteHandler = function () {
    draggedNote = null;
    this.classList.remove('dragged');

    document
        .querySelectorAll('.note')
        .forEach(x => x.classList.remove('under'));
};

const dragenter_noteHandler = function () {
    if(this === draggedNote){
        return;
    }
    this.classList.add('under');
};

function dragover_noteHandler (event){
    if(this === draggedNote){
        return;
    }
    event.preventDefault();
}

const dragleave_noteHandler = function () {
    if(this === draggedNote){
        return;
    }
    this.classList.remove('under');
};

const drop_noteHandler = function () {
    if(this === draggedNote){
        return;
    }

    if (this.parentElement === draggedNote.parentElement ) {
        const note = Array.from(this.parentElement.querySelectorAll('.note'));
        const indexA = note.indexOf(this);
        const indexB = note.indexOf(draggedNote);
        if (indexA < indexB) {
            this.parentElement.insertBefore(draggedNote,this);
        }
        else {
            this.parentElement.insertBefore(draggedNote,this.nextElementSibling);
        }
    }
    else {
        this.parentElement.insertBefore(draggedNote,this);
    }
};

document
    .querySelectorAll('.note')
    .forEach(noteProcess);

function noteProcess (noteElement) {
    noteElement.addEventListener('dragstart', dragstart_noteHandler);
    noteElement.addEventListener('dragend', dragend_noteHandler);
    noteElement.addEventListener('dragenter', dragenter_noteHandler);
    noteElement.addEventListener('dragover', dragover_noteHandler);
    noteElement.addEventListener('dragleave', dragleave_noteHandler);
    noteElement.addEventListener('drop', drop_noteHandler);
}

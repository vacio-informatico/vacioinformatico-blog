"use strict"

const getGithubDatesAndNoteList = async () => {
    const request = await fetch('./src/notes.json')
    return await request.json()
}

const createNoteDatesList = async () => {
    const { githubDates, noteList } = await getGithubDatesAndNoteList()
    const githubUrl = `https://github.com/${githubDates.userName}/${githubDates.nameRepository}/blob/${githubDates.branchName}/`

    return noteList.map(noteDates => ({
        noteName: noteDates.name,
        noteUrl: `${githubUrl}${noteDates.name}.md`.split(' ').join('%20')
    }))
}

const createNoteHTML = ({ noteName, noteUrl }) => {
    const noteElement = document.createElement('Li')
    noteElement.classList.add('list__item')
    noteElement.innerHTML = `
        <img src="./src/pictures/chevron-right.svg" class="list__item-icon">
        <a href="${noteUrl}" class="list__item-link" target="_blank" title="El enlace te llavara a Github">${noteName}</a>
    `

    return noteElement
}

const renderNoteList = async () => {
    const noteDatesList = await createNoteDatesList()

    const noteListFragment = document.createDocumentFragment()
    noteDatesList.forEach(noteDates => {
        const noteHTML = createNoteHTML(noteDates)
        noteListFragment.appendChild(noteHTML)
    })

    document.getElementById('note-list').appendChild(noteListFragment)
    document.getElementById('noteCount').innerText = noteDatesList.length
}

renderNoteList()


const switchBtn = document.getElementById('switch')

switchBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    switchBtn.classList.toggle('active')
})

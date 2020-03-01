const app = {}

app.instrumentArray = [
    "tuba", "drums", "8-string guitar", "trumpet", "flute", "harp", "saxophone", "lute", "oboe", "tin can", "upright bass", "xylophone", "pan flute", "hollowed out carrot", "tree stump", "acoustic guitar", "ukulele", "timpani", "accordion", "didgeridoo", "sitar", "bagpipes", "ocarina", "handpan", "theremin", "synthesizer", "cello", "harmonica", "banjo", "trombone"
]

app.randomItem = array => {
    return array[Math.floor(Math.random() * array.length)]
}

app.getGenre = () => {
    return axios({
        method: "GET",
        url: "https://binaryjazz.us/wp-json/genrenator/v1/genre",
        dataType: "json",
    })
}

app.getMember = () => {
    return axios({
        method: "GET",
        url: "https://randomuser.me/api/",
        dataType: "json",
    })
}

app.setGenre = () => {
    app.getGenre()
        .then(response => {
            document.querySelector(".bandGenre").innerHTML =
            `<p>Your band's genre is: ${response.data}!</p>`
        })
        .catch(() => {
            app.failMessage()
        })
}

app.setMember = () => {
    let userSelection = Number(document.querySelector("select").value)
    let instrument = app.randomItem(app.instrumentArray)

    for (let i = 0; i < userSelection; i++) {
        app.getMember()
            .then(response => {
                app.addMember(response.data.results[0], instrument)
            })
            .catch(() => {
                app.failMessage()
            })
        }

    app.reveal()
}

app.addMember = (memberInfo, instrument) => {
    let { name, picture } = memberInfo

    let member = document.createElement("DIV")
    member.innerHTML = `
        <img src="${picture.large}" 
        alt="A picture of ${name.first} ${name.last}"/>

        <p>This is ${name.first} ${name.last}</p>

        <p>Instrument: ${instrument}</p>
    `

    document.querySelector(`.members`).appendChild(member)
}

app.reveal = () => {
    setTimeout(() => {
        document.querySelector(`.bandDisplay`).hidden = false
    }, 500);
}

app.failMessage = () => {
    alert("Failed! Please try again!")
}

app.startABand = () => {
    app.setGenre()
    app.setMember()
}

app.clearPage = () => {
    document.querySelector(".members").innerHTML = ""
    document.querySelector(`.bandDisplay`).hidden = true
}

document.querySelector("button").addEventListener("click", event => {
    event.preventDefault();
    app.clearPage()
    app.startABand()
})
const play = document.querySelector('.play');
const prevBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');

const singer = document.querySelector('.singer');
const song = document.querySelector('.song');

const avatar = document.querySelector('.avatar');
const wrapper = document.querySelector('.wrapper')

const currentDuration = document.querySelector('.duration');
const current = document.querySelector('.current')

const seekBar = document.querySelector('.seek-bar')

console.log(
    'Я собрала плейлист из любимой музыки своего маленького сына.\nПриятного прослушивания. И не судите строго за вкус. Ему только 4 года\nСамооценка 60/60'
)
let isPlay = false;

const playList = [
    {
        src: 'music/Alessandra - Queen Of Kings.mp3',
        singer: 'Alessandra',
        song: 'Queen Of Kings',
        avatar: 'img/avatar/Alessandra - Queen Of Kings.jpg',
    },
    {
        src: 'music/Blanka - Solo.mp3',
        singer: 'Blanka',
        song: 'Solo',
        avatar: 'img/avatar/Blanka - Solo.jpeg',
    },
    {
        src: 'music/Brunette - Future Lover.mp3',
        singer: 'Brunette',
        song: 'Future Lover',
        avatar: 'img/avatar/Brunette - Future Lover.jpg',
    },
    {
        src: 'music/Kaarija - Cha Cha Cha.mp3',
        singer: 'Kaarija',
        song: 'Cha Cha Cha',
        avatar: 'img/avatar/Kaarija - Cha Cha Cha.jpg',
    },
    {
        src: 'music/La Zarra - Evidemment.mp3',
        singer: 'La Zarra',
        song: 'Evidemment',
        avatar: 'img/avatar/La Zarra - Evidemment.jpg',
    },
    {
        src: 'music/Loreen - Tattoo.mp3',
        singer: 'Loreen',
        song: 'Tatto',
        avatar: 'img/avatar/Loreen - Tattoo.jpg',
    },
    {
        src: 'music/Mae Muller - I Wrote A Song.mp3',
        singer: 'Mae Muller',
        song: 'I Wrote A Song',
        avatar: 'img/avatar/Mae Muller - I Wrote A Song.jpg',
    },
    {
        src: 'music/Noa Kirel - Unicorn.mp3',
        singer: 'Noa Kirel',
        song: 'Unicorn',
        avatar: 'img/avatar/Noa Kirel - Unicorn.jpg',
    },
    {
        src: 'music/Vesna - My Sister`s Crown.mp3',
        singer: 'Vesna',
        song: 'My Sister`s Crown',
        avatar: 'img/avatar/Vesna - My Sister`s Crown.png',
    },
    {
        src: 'music/Cornelia Jakobs - Hold Me Closer.mp3',
        singer: 'Cornelia Jakobs',
        song: 'Hold Me Closer',
        avatar: 'img/avatar/Cornelia Jakobs - Hold Me Closer.jpg',
    }

]
let  audio = new Audio();
let audioIndex = 0;

audio.src = playList[audioIndex].src;
playNow(audioIndex)

function playAudio() {   /// создает трек
    play.classList.toggle('pause');
    if (isPlay === false) {
        audio.play();
        isPlay = true;
        playNow(audioIndex);

    } else {
        audio.pause();
        isPlay = false;
    }
}

function formatTime (time) {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`
    }
    return `${min}:${sec}`;
}

setInterval(function () {
    seekBar.value = audio.currentTime;
    current.textContent = formatTime(audio.currentTime);
}, 500)


seekBar.addEventListener('change', function () {
    audio.currentTime = seekBar.value;
})

function playNow (audioIndex) {
    let url = playList[audioIndex].avatar;
    wrapper.style.backgroundImage = `url("${url}")`;
    avatar.style.backgroundImage = `url("${url}")`;

    singer.textContent = playList[audioIndex].singer;
    song.textContent = playList[audioIndex].song;

    audio.addEventListener('loadedmetadata', () => {
        let time = audio.duration;
        currentDuration.textContent = formatTime(time);
        seekBar.max = Math.floor(audio.duration);
    })
}

play.addEventListener('click', playAudio);
audio.addEventListener('ended', playNext);

function changeTrack() {
    audio.src = playList[audioIndex].src;
    play.classList.remove('pause');
    isPlay = false;
    playAudio();
    playNow(audioIndex);
}

function playNext() {
    audioIndex++

    if (audioIndex >= playList.length) {
        audioIndex = 0;
    }

    changeTrack()
}
function playPrev() {
    audioIndex--

    if (audioIndex < 0) {
        audioIndex = playList.length - 1
    }

    changeTrack()
}
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);


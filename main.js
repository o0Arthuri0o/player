//получение элементов со страницы 
const cover = document.querySelector('.player__cover'),
	trackName = document.querySelector('.player__track'),
	volumeBar = document.querySelector('.player__volume-bar'),
	progressBar = document.querySelector('.player__progress_margin'),
	progressFillBar = document.querySelector('.player__progress-fill'),
	prevBtn = document.querySelector('.player__prev'),
	playPause = document.querySelector('.player__play-pause'),
	nextBtn = document.querySelector('.player__next'),
	audio = document.querySelector('audio');

//установка изначальных значений
const songs = ['High octane', 'Happy rock', 'A new beginning'];
let songsIndex = 0;

progressBar.style.visibility = 'hidden';
progressFillBar.style.width = '0%';


function renderSong(song) {
	trackName.textContent = song;
	cover.src = `./img/${song}.png`;
	audio.src = `./music/${song}.mp3`;
	audio.volume = volumeBar.value / 10
}
renderSong(songs[songsIndex])

//пуск и пауза трека
function playSong() {
	playPause.classList.add('play');
	audio.play();
	playPause.src = './img/pause.svg';
	progressBar.style.visibility = 'visible';
	cover.classList.add('animate_cover');
}


function pauseSong() {
	playPause.classList.remove('play')
	audio.pause();
	playPause.src = './img/play.svg';
	progressBar.style.visibility = 'hidden';
	cover.classList.remove('animate_cover')
}

playPause.addEventListener('click', () => {
	let checkStatus = playPause.classList.contains('play');
	if (checkStatus) {
		pauseSong();
	} else {
		playSong();
	}
})

//переключение треков
nextBtn.addEventListener('click', () => {
	songsIndex++;
	if(songsIndex > songs.length-1) {
		songsIndex = 0;
	}
	renderSong(songs[songsIndex]);
	playSong();
})

prevBtn.addEventListener('click', () => {
	songsIndex--;
	if(songsIndex < 0) {
		songsIndex = songs.length-1;
	}
	renderSong(songs[songsIndex]);
	playSong();
})

//установка громкости
volumeBar.addEventListener('change', ()=> {
	audio.volume = volumeBar.value / 10
})

//обновление прогресс бара
function updateProgressBar() {
	let duration = audio.duration;
	let currentTime = audio.currentTime;
	let progressPercent = (currentTime/duration)*100;
	progressFillBar.style.width = `${progressPercent}%`;
}

audio.addEventListener('timeupdate', updateProgressBar)

//перемотка трека
function setProgress(e) {
	let width = this.clientWidth;
	let clickX = e.offsetX;
	let duration = audio.duration;
	audio.currentTime = (clickX/width) * duration;
}
progressBar.addEventListener('click', setProgress)

//автоплей
audio.addEventListener('ended', () => {
	songsIndex++;
	if(songsIndex > songs.length-1) {
		songsIndex = 0;
	}
	renderSong(songs[songsIndex]);
	playSong();
})
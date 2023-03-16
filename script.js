let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZHxzGmmbFUik0FxoD-08OwpkmtrtcOJndIw&usqp=CAU',
        name : 'Dhaka FM 90.4',
        artist : 'Dhaka, Bangladesh',
        music : 'https://stream-68.zeno.fm/u9mphfk604zuv?zs=TNHUJvWlRGqdWmtq-RpyIA'
    },
    {
        img : 'https://upload.wikimedia.org/wikipedia/commons/2/28/ABC_Radio_Logo.png',
        name : 'ABC Radio 89.2 FM',
        artist : 'Dhaka, Bangladesh',
        music : 'https://stream.zeno.fm/h7n8ug96eeruv'
    },
    {
        img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlizxajuhk3BpHSt03FNVOSl8EBOSwekRtqA&usqp=CAU',
        name : 'Radio Foorti 88.0 FM',
        artist : 'Dhaka, Bangladesh',
        music : 'https://stream-51.zeno.fm/cwa3vg8s8druv?zs=izCVxIVMTPuEYJiniQ9pwQ'
    },
    {
        img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCWtTbA1DUxZxtJUQLKa0mHYK8_IK-V9qz1A&usqp=CAU',
        name : 'Bangla Radio 95.2 FM',
        artist : 'Dhaka, Bangladesh',
        music : 'https://radio.jagobd.com:444/radio/banglaradio-fm.stream/icecast.audio'
    },
    {
        img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4LLd0CiQoHQNjcVp_bcgcJJQY08Q6z3cN9RPgbiZLj1SU9kchEjN_GoYc&s=10',
        name : 'Radio Bhumi 92.8 FM',
        artist : 'Dhaka, Bangladesh',
        music : 'https://stream.zeno.fm/ybf1umk1k18uv'
    },
    {
        img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiyFXnZTbTEq3V02an2O-Inc1BcE_yPw59gw&usqp=CAU',
        name : 'FOLK NAMA',
        artist : 'Dhaka, Bangladesh',
        music : 'https://stream.zeno.fm/z5r35gyr6x8uv'
    },
    {
        img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwsPsZ8ydAQQ_Qq5CYuqdlhzCBze53_7NzCg&usqp=CAU',
        name : 'Radio Today 89.6 FM',
        artist : 'Dhaka, Bangladesh',
        music : 'https://stream.zeno.fm/0zha3rfq02quv'
    },
    {
        img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBggH_Ymok7SEY-F6_ubI6SFbDmqBklVaP-SO5l6WbvjROpfNgDVj0KRU&s=10',
        name : 'Radio Bongonet',
        artist : 'Kalkata, India',
        music : 'https://stream.bongonet.net/proxy/radiobongonet?mp=/stream/1/'
    },
    {
        img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW71VSli3smbLBVGgKekFPqHh96W2wV9BvoQ&usqp=CAU',
        name : 'Radio Carnival',
        artist : 'Dhaka, Bangladesh',
        music : 'https://centova32.instainternet.com/proxy/radiocarnival?mp=/stream/1/'
    },
    
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "RADIO STATION " + (track_index + 1) + " OF " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

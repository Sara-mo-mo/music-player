const audioTrack = document.getElementById('audio-track');
const progressInput = document.getElementById('progress');
const playBtn = document.getElementById('playBtn');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');


// دالة تحويل الوقت لشكل (00:00)
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// 1. تشغيل وإيقاف
playBtn.addEventListener('click', () => {
    if (audioTrack.paused) {
        audioTrack.play();
        playBtn.innerHTML = "||";
    } else {
        audioTrack.pause();
        playBtn.innerHTML = "▶";
    }
});

const lyricLines = document.querySelectorAll('.lyric-line');


audioTrack.addEventListener('timeupdate', () => {
    const currentTime = audioTrack.currentTime;

    // 1. تحديث شريط التقدم (البروجرس)
    const progress = (currentTime / audioTrack.duration) * 100;
    progressInput.value = progress || 0;

    // 2. البحث عن السطر المناسب للوقت الحالي
    let currentLine = null;

    lyricLines.forEach((line) => {
        const lineTime = parseFloat(line.getAttribute('data-time'));
        
        // لو وقت الأغنية أكبر من وقت السطر، يبقى ده سطر محتمل
        if (currentTime >= lineTime) {
            currentLine = line;
        }
        // نشيل الإضاءة من كل السطور
        line.classList.remove('active');
    });

    // 3. تنوير السطر الحالي وتحريكه لنص الشاشة
    if (currentLine) {
        currentLine.classList.add('active');
        
        // دي أهم حتة: بتخلي السطر يجي في نص الـ Container بالظبط
        currentLine.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
});

// إضافة ميزة: لو دوست على سطر يودي الأغنية لوقته
lyricLines.forEach(line => {
    line.addEventListener('click', () => {
        const time = parseFloat(line.getAttribute('data-time'));
        audioTrack.currentTime = time;
    });
});
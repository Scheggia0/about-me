document.getElementById('timestamp').innerText = formatDate(new Date());
setInterval(function () {
    document.getElementById('timestamp').innerText = formatDate(new Date());
}, 1000)

function formatDate(date) {
    var options = {
      timeZone: "Europe/Rome",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };
    return date.toLocaleTimeString("en-US", options);
}

setInterval(() => {
    if (window.pageYOffset !== 0) Array.from(document.getElementsByTagName("nav"))[0].classList = "scrool"
    if (window.pageYOffset == 0) Array.from(document.getElementsByTagName("nav"))[0].classList = "not-scrool"
}, 100);

document.addEventListener('contextmenu', event => {
    if (event.target.tagName.toLowerCase() === 'img') {
        event.preventDefault();
    }
});
document.addEventListener('dragstart', event => event.preventDefault());

var icon = document.getElementById('icon');
icon.addEventListener('mousemove', function (e) {
    var boundingRect = this.getBoundingClientRect();
    var mouseX = e.clientX - boundingRect.left;
    var mouseY = e.clientY - boundingRect.top;
    var rotateXAmt = ((mouseY / this.offsetHeight) - 0.5) * 10;
    var rotateYAmt = ((mouseX / this.offsetWidth) - 0.5) * 10;
    icon.style.transform = 'perspective(500px) scale(1.05) rotateX(' + (rotateXAmt - (rotateXAmt * 2)) + 'deg) rotateY(' + rotateYAmt + 'deg)';
});

icon.addEventListener('mouseleave', function () {
    this.style.transform = 'none';
});


var customCursor = document.getElementById('custom-cursor');
var isCursorVisible = false;
var timeout;

function showCursor() {
    customCursor.style.opacity = 1;
    isCursorVisible = true;
}

function hideCursor() {
    customCursor.style.opacity = 0;
    isCursorVisible = false;
}

function resetTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(hideCursor, 3000);
}

document.addEventListener('mousemove', function (e) {
    if (!isCursorVisible) {
        showCursor();
    }
    customCursor.style.transform = `translate(${e.clientX - 13}px, ${e.clientY - 13}px)`;
    resetTimeout();
});

document.addEventListener('mousedown', function (e) {
    document.getElementById("clickSound").play()
    if (e.button === 0) {
        customCursor.style.transform = `translate(${e.clientX - 13}px, ${e.clientY - 13}px) scale(1.5)`;
    }
});

document.addEventListener('mouseup', function (e) {
    if (e.button === 0) {
        customCursor.style.transform = `translate(${e.clientX - 13}px, ${e.clientY - 13}px) scale(1)`;
    }
});

document.addEventListener('mouseleave', function (e) {
    hideCursor();
});

document.addEventListener('mouseenter', function (e) {
    showCursor();
});

function cloneSocial() {
    let original = document.getElementById("original").innerHTML
    document.getElementById("clone").innerHTML = original
}

cloneSocial()

function hiddenLoader() {
    document.getElementById("loader").classList.add("hidden")
    setTimeout(() => {
        document.getElementById("loader").style.visibility = "hidden"
        document.getElementById("loader").style.zIndex = "-1"
    }, 1000);
}

async function loadData() {
    await fetch(`https://api.lanyard.rest/v1/users/503997987425353729`).then(r => r.json()).then(res => {
        if (res.success == true) {
            document.getElementById('discord-avatar').src = `https://cdn.discordapp.com/avatars/503997987425353729/${res.data.discord_user.avatar}.webp`;

            var status; var status_class;
            switch (res.data.discord_status) {
                case 'online': status = 'Online'; status_class = 'online'; break;
                case 'idle': status = 'Idle'; status_class = 'idle'; break;
                case 'dnd': status = 'Do not Disturb'; status_class = 'dnd'; break;
                case 'offline': status = 'Offline'; status_class = 'offline'; break;
                default: status = 'Error'; status_class = 'offline';
            }

            document.getElementById('discord-presence').innerText = status;
            document.getElementById('discord-avatar').className = status_class;
        }
    })

    await fetch(`https://api.scheggia.me/v1/bio/getdata`).then(r => r.json()).then(res => {
        if (res.success == true) {
            document.getElementById('links-container').innerHTML = res.links.join('')
            document.getElementById('projects-container').innerHTML = res.projects.join('');
            document.getElementById('supporters-container').innerHTML = res.supporters.join('');
            if (res.links_long.length > 0) {
                document.getElementById('links-container-long').innerHTML = res.links_long.join('');
            }
        }
    })

    setTimeout(function() {
        hiddenLoader()
    }, 300)
}

loadData()

function purgePoint() {
    Array.from(document.getElementsByClassName("nav-point")).forEach(element => element.classList = "nav-point")
}
window.addEventListener('scroll', () => {
    if (window.scrollY > document.getElementById('about').offsetTop - 200) {
        purgePoint()
        document.getElementById("nav-about").classList.add("select")
    }
    if (window.scrollY > document.getElementById('links').offsetTop - 200) {
        purgePoint()
        document.getElementById("nav-links").classList.add("select")
    }
    if (window.scrollY > document.getElementById('projects').offsetTop - 200) {
        purgePoint()
        document.getElementById("nav-projects").classList.add("select")
    }
    if (window.scrollY == 0) {
        purgePoint()
        document.getElementById("nav-/").classList.add("select")
    }
});